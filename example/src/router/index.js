import vueRouter from 'vue-router';
import login from './../pages/login'
var router = new vueRouter({
    routes:[
        {
            path:'*',
            redirect:'/login'
        },
        {
            path:'/login',
            component:login
        },
        {
            path:'/main'
        }
    ]
})

export default router;