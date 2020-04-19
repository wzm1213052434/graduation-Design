import vueRouter from 'vue-router';
import login from './../pages/login';
import mainContent from './../pages/mainContent'
import admianMian from './../pages/admin/main'
import createNewChar from './../pages/admin/createNewChar'
import inspectors from './../pages/admin/inspectors'
import verificate from './../pages/Inspector/main'

var ano = [
    {
        path:'*',
        redirect:'/login'
    },
    {
        path:'/login',
        component:login
    },
    {
        path: '/homePage',
        component: mainContent,
        redirect: '/homePage/',
        permission: 0,
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
        permission: 1,
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
        permission: 1,
        name: '鉴定员列表页',
        children: [{
            path: '', 
            component: inspectors,
            meta: { title: '鉴定员列表', icon: 'el-icon-user' }
        }]
    },
    {
        path: '/verificate',
        component: mainContent,
        permission: 0,
        name: '评估鉴定页',
        children: [{
            path: '', 
            component: verificate,
            meta: { title: '评估鉴定', icon: 'el-icon-user' }
        }]
    }
]



var router = new vueRouter({
    routes: ano
})

export default router;