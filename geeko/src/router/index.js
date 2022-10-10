/**
 * Created by shao_ on 2017/7/20.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Me from '../me/router'
import Page404 from '../pages/404.vue'
import Page500 from '../pages/500.vue'
import {ROUTER_PATH_ME} from '../utils/geekoutils'

import store from '../store'

Vue.use(VueRouter)

const routes = [
    {path: '*', name: '404', component: Page404},
    ...Me
]


const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})

router.beforeEach((to, from, next) => {
    if(to.fullPath == `${window.ctx || ''}/me/m/support`){
        let baseurl = window.location.href.split(to.fullPath)[0];
        window.location.href = baseurl + `${window.ctx || ''}/support`
    }

    store.dispatch('paging', {paging: true})

    document.title = to.meta.title

    if(to.path.startsWith(ROUTER_PATH_ME)){
        store.dispatch('me/init').then((data) => {
            next()
        }).catch(e => {
            next();
        });
    } else {
        next()
    }
})

router.afterEach(route => {
    store.dispatch('paging', {paging: false})
})

export default router