import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import CatMain from '../components/catMain'
import Admin from '../components/admin'
import Coming from '../components/coming'
import Hot from '../components/hot'
import Movie from '../components/movie'
import News from '../components/news'
import User from '../components/user'
import Theater from '../components/theater'
import Sign from '../components/sign'

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'App',
    component: App
  }, {
    path: '/Sign',
    name: 'Sign',
    component: Sign
  }, {
    path: '/CatMain',
    name: 'CatMain',
    component: CatMain,
    children: [{
      path: '/Admin',
      component: Admin
    }, {
      path: '/Coming',
      component: Coming
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
