import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);
Vue.config.productionTip = false


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
    router,
    render: h => h(App)
}).$mount('#app')
