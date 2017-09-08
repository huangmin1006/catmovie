import Vue from "vue"
import Vuex from "vuex"
// 影厅
import videoHall from "../components/videoHall/store.js"
// 电影
import movie from "../components/movie/store"
// 影院
import cinema from "../components/cinema/store"
// 排片
import rowPiece from "../components/rowPiece/store"
// 资讯
import news from "../components/news/store"

Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    cinema,
    movie,
    videoHall,
    rowPiece,
    news
  }
})

