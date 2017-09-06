import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
import CatMain from '../components/catMain/catMain.vue'
import Admin from '../components/admin/admin.vue'
import Coming from '../components/coming/coming.vue'
import Hot from '../components/hot/hot.vue'
import Movie from '../components/movie/movie.vue'
import News from '../components/news/news.vue'
import User from '../components/user/user.vue'
import Theater from '../components/theater/theater.vue'
import Sign from '../components/sign/sign.vue'

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
