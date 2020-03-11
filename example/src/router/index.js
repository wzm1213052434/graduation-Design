import vueRouter from 'vue-router';
import login from './../pages/login';
import mainContent from './../pages/mainContent'
import admianMian from './../pages/admin/main'
import createNewChar from './../pages/admin/createNewChar'
import inspectors from './../pages/admin/inspectors'

var ano = [
    {
        path:'*',
        redirect:'/login'
    },
    {
        path:'/login',
        component:login
    }
]
var adminRouter = [
    {
        path: '/homePage',
        component: mainContent,
        redirect: '/homePage/',
        name: '首页',
        children: [{
            path: '', 
            component: admianMian,
            meta: { title: '符号列表', icon: 'el-icon-tickets' }
        }]
    },
    {
        path: '/createNewChar',
        component: mainContent,
        name: '新建页',
        children: [{
            path: '', 
            component: createNewChar,
            meta: { title: '新建符号', icon: 'el-icon-edit' }
        }]
    },
    {
        path: '/inspectors',
        component: mainContent,
        name: '鉴定员列表页',
        children: [{
            path: '', 
            component: inspectors,
            meta: { title: '鉴定员列表', icon: 'el-icon-user' }
        }]
    },
];

var inspector = [
    {
        path: ''
    }
]

var router = new vueRouter({
    routes: ano.concat(adminRouter)
})

export default router;