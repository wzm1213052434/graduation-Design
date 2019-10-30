import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
Vue.config.productionTip = false


const Axios = axios.create({
    baseURL: "199.166.1.1:8080/api",
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
