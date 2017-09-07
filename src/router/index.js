import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
import CatMain from '../components/catMain/catMain.vue'
import Admin from '../components/admin/admin.vue'
import MovieHall from '../components/movieHall/movieHall.vue'
import Hot from '../components/hot/hot.vue'
import Movie from '../components/movie/movie.vue'
import News from '../components/news/news.vue'
import User from '../components/user/user.vue'
import Theater from '../components/theater/theater.vue'
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
      path: '/MovieHall',
      name: 'MovieHall',
      component: MovieHall
    }, {
      path: '/Movie',
      component: Movie
    }, {
      path: '/Hot',
      component: Hot
    }, {
      path: '/User',
      component: User
    }, {
      path: '/News',
      component: News
    }, {
      path: '/Theater',
      component: Theater
    }]
  }]
})
