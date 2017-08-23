/**
 * Created by shao_ on 2017/7/20.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import {shoppingcart} from '../shoppingcart/router'
import Me from '../me/router'
import Page404 from '../pages/404.vue'
import Page500 from '../pages/500.vue'

Vue.use(VueRouter)

const routes = [
    {path:'*', name:'404', component: Page404},
    shoppingcart,
    ...Me
]


const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})

export default router