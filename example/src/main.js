import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index';
import $ from 'jquery';

Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.use(ElementUI);

const Axios = axios.create({
  baseURL: "http://127.0.0.1:3000/",
  timeout: 8000,
  headers: {
      "accept": "application/json",
      'Content-Type': 'application/json',
  }
})

Vue.prototype.$http = Axios;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
