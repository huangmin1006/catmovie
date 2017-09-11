import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
import CatMain from '../components/catMain/catMain.vue'
import Admin from '../components/admin/admin.vue'
import VideoHall from '../components/videoHall/videoHall.vue'
import Movie from '../components/movie/movie.vue'
import News from '../components/news/news.vue'
import Cinema from '../components/cinema/cinema.vue'
import movieMsg from '../components/movieMsg/movieMsg.vue'
import Login from '../components/login/login.vue'

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'App',
    component: App
  }, {
    path: '/Login',
    name: 'Login',
    component: Login
  }, {
    path: '/CatMain',
    name: 'CatMain',
    component: CatMain,
    children: [{
      path: '/Admin',
      component: Admin
    }, {
      path: '/VideoHall',
      name: 'VideoHall',
      component: VideoHall
    }, {
      path: '/Movie',
      component: Movie
    }, {
      path: '/movieMsg',
      component: movieMsg
    }, {
      path: '/Cinema',
      component: Cinema
    }, {
      path: '/News',
      component: News
    }]
  }]
})
