import axios from 'axios'
export const GET_CINEMA_LIST = "GET_CINEMA_LIST";
export const ASYNC_ADD_CINEMA = "ASYNC_ADD_CINEMA";
export const ASYNC_GET_CINEMA_LIST = "ASYNC_GET_CINEMA_LIST";
export const ASYNC_DEL_CINEMA = "ASYNC_DEL_CINEMA";


const store = {
  namespaced: true,
  state:{

    // DIV内容显示选择
    divShow: [{
      a:1
    }],

    // 列表数据
    tableList: [],

  },

  mutations:{
    [GET_CINEMA_LIST](state, tableList) {
      state.tableList = tableList.obj;
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

    //删除数据
    async[ASYNC_DEL_CINEMA]({dispatch}, cinema) {
      await axios.get("http://localhost:8888/cinema/del", {
        params:{
          _id: cinema._id
        }
      }, cinema);
      // 数据改变自动刷新数据
      dispatch(ASYNC_GET_CINEMA_LIST);
    },


    async[ASYNC_GET_CINEMA_LIST](context) {
      const {
        data
      } = await axios.get("http://localhost:8888/cinema/find");
      context.commit({type:GET_CINEMA_LIST,obj:data})
    }
  }

};


export default store;
