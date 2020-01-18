import Vue from 'vue'
import VueRouter from 'vue-router'
import Test from '../views/Test'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Test',
        component: Test
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/print',
        name: 'print',
        component: () => import('../views/Print.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
