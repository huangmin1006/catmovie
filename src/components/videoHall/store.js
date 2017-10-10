
//****************放映厅******************


import axios from 'axios'


export const GET_ROWS_CINEMA_LIST = "GET_ROWS_CINEMA_LIST";
export const GET_ROWS_HALL_LIST = "GET_ROWS_HALL_LIST";


export const ASYNC_ADD_HALL = "ASYNC_ADD_HALL";
export const ASYNC_GET_CINEMA_LIST = "ASYNC_GET_CINEMA_LIST";
export const ASYNC_CINEMAID_GET_HALL_LIST = "ASYNC_CINEMAID_GET_HALL_LIST";
export const ASYNC_GET_HALL_LIST = "ASYNC_ADD_GET_HALL_LIST";
export const ASYNC_DEL_HALL = "ASYNC_DEL_HALL";
export const ASYNC_ROWS_CINEMA = "ASYNC_ROWS_CINEMA";
export const ASYNC_ROWS_HALL = "ASYNC_ROWS_HALL";


let getHallList = null;


const store = {
  namespaced: true,

  state:{

    // 影厅分页
    cinemaRowsList: [],


    // 影厅分页数据
    hallRowsList: []
  },


  // 同步函数，数据的内容
  mutations:{


    [GET_ROWS_CINEMA_LIST](state, cinemaRowsList) {
      state.cinemaRowsList = cinemaRowsList;
    },

    [GET_ROWS_HALL_LIST](state, hallRowsList) {
      state.hallRowsList = hallRowsList;
    },


  },

  actions:{

    // 增加影厅
    async[ASYNC_ADD_HALL]({dispatch}, videoHall) {
      getHallList = videoHall.cinemaID;
      function sets(seatLine, seatList) {
        let arr = [];
        for(let i = 1; i <= seatLine;i++ ){
          let content = [];
          for(let j = 1;j <= seatList ;j++){
            content.push({seatLine:i,seatList:j,green:false,red:false});
          }
          arr.push(content);
        }
        return arr;
      }
      await axios.get("http://localhost:8888/videoHall/add", {
        params:{
          cinemaID: videoHall.cinemaID,
          hallName: videoHall.hallName,
          seatData: JSON.stringify(sets(10,10))
        }
      }, videoHall);

      // 遍历出所有影厅ID
      const {
        data
      } = await axios.get("http://localhost:8888/videoHall/find",{
        params: {
          findType:"exact",
          cinemaID: videoHall.cinemaID
        }
      });
      let hallIdArr = new Set();
      data.filter((item) => {
        return hallIdArr.add(item._id);
      });
      await axios.get("http://localhost:8888/cinema/update", {
        params:{
          _id:videoHall.cinemaID,
          hallIdArr: hallIdArr
        }
      });
      dispatch(ASYNC_GET_HALL_LIST);
    },


    //删除数据
    async[ASYNC_DEL_HALL]({dispatch}, videoHall) {
      getHallList = videoHall.cinemaID;
      let val = axios.get("http://localhost:8888/videoHall/del", {
        params:{
          _id: videoHall._id
        }
      }, videoHall);
      // 数据改变自动刷新数据
      dispatch(ASYNC_GET_HALL_LIST);
    },


    // 根据影院的ID来刷新影厅数据
    async[ASYNC_GET_CINEMA_LIST]({commit},videoHall) {
      const {
        data
      } = await axios.get("http://localhost:8888/videoHall/find",{
        params: {
          findType:"exact",
          cinemaID: videoHall._id
        }
      },videoHall);
      commit(GET_ROWS_HALL_LIST,data);
    },


    //增加删除时刷新相关影院的影厅
    async[ASYNC_GET_HALL_LIST]({commit},videoHall){
      const {
        data
      } = await axios.get("http://localhost:8888/videoHall/find",{
        params: {
          findType:"exact",
          cinemaID: getHallList
        }
      });
      commit(GET_ROWS_HALL_LIST,data);
    },


    //影厅界面的影院分页
    async[ASYNC_ROWS_CINEMA]({commit},cinema) {
      const {
        data
      } = await axios.get("http://localhost:8888/cinema/find",{
        params: {
          rows: cinema.rows,
          page: cinema.page
        }
      });
      commit(GET_ROWS_CINEMA_LIST,data.rows)
    },



    //影厅界面的影厅分页
    async[ASYNC_ROWS_HALL]({commit},videoHall) {
      const {
        data
      } = await axios.get("http://localhost:8888/videoHall/find",{
        params: {
          rows: videoHall.rows,
          page: videoHall.page
        }
      });
      commit(GET_ROWS_HALL_LIST,data.rows)
    }



  }

};


export default store;
