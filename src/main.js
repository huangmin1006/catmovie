import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store/index'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI);

Vue.config.productionTip = false;


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  render: h => h(App),
  components: { App }
});
