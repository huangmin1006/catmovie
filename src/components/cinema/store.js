import axios from 'axios'
export const GET_CINEMA_LIST = "GET_CINEMA_LIST";
export const GET_ROWS_CINEMA_LIST = "GET_ROWS_CINEMA_LIST";


export const ASYNC_ADD_CINEMA = "ASYNC_ADD_CINEMA";
export const ASYNC_GET_CINEMA_LIST = "ASYNC_GET_CINEMA_LIST";
export const ASYNC_DEL_CINEMA = "ASYNC_DEL_CINEMA";
export const ASYNC_DEL_HALL = "ASYNC_DEL_HALL";
export const ASYNC_ROWS_CINEMA = "ASYNC_ROWS_CINEMA";


let delCinemaId = null;

const store = {
  namespaced: true,
  state:{

    // 列表数据
    cinemaList: [],


    // 分页数据
    cinemaRowsList: []


  },

  mutations:{

    [GET_CINEMA_LIST](state, cinemaList) {
      state.cinemaList = cinemaList;
    },


    [GET_ROWS_CINEMA_LIST](state, cinemaRowsList) {
      state.cinemaRowsList = cinemaRowsList;
    }
  },

  getters: {

  },

  actions:{

    // 增加数据
    async[ASYNC_ADD_CINEMA]({dispatch}, cinema) {
      await axios.get("http://localhost:8888/cinema/add", {
        params:{
          cinemaName: cinema.cinemaName,
          cityName: cinema.cityName,
          address: cinema.address,
          telephone: cinema.telephone
        }
      }, cinema);
      // 数据改变自动刷新数据
      dispatch(ASYNC_GET_CINEMA_LIST);
    },

    //删除影院数据
    async[ASYNC_DEL_CINEMA]({dispatch}, cinema) {
      await axios.get("http://localhost:8888/cinema/del", {
        params:{
          _id: cinema._id
        }
      }, cinema);
      // 数据改变自动刷新数据
      // 同时删除影厅数据
      const {data} = await axios.get("http://localhost:8888/videoHall/find", {
        params:{
          cinemaID: cinema._id
        }
      });
      data.map( (item) => {
        axios.get("http://localhost:8888/videoHall/del", {
          params:{
            _id: item._id
          }
        });
      });
      dispatch(ASYNC_GET_CINEMA_LIST);
    },


    // 获取影院数据
    async[ASYNC_GET_CINEMA_LIST]({commit}) {
      const {
        data
      } = await axios.get("http://localhost:8888/cinema/find");
      commit(GET_ROWS_CINEMA_LIST,data)
    },


    //分页
    async[ASYNC_ROWS_CINEMA]({commit},cinema) {
      const {
        data
      } = await axios.get("http://localhost:8888/cinema/find",{
        params: {
          rows: cinema.rows,
          page: cinema.curpage
        }
      });
      commit(GET_ROWS_CINEMA_LIST,data.rows)
    }
  }

};


export default store;
