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

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'App',
    component: App
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
    }]
  }]
})
