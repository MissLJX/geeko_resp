import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "./route.js"

import store from "../store/index.js"

import { ROUTER_PATH_ME_M } from "../utils/geekoutil.js"

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});

router.beforeEach((to, from, next) => {
    if(!window.__is_login__){
        window.location.href = "/i/login?redirectUrl=/me/m";
    }

    store.dispatch('paging', {paging: true})

    document.title = to.meta.title
    if (to.path.startsWith(ROUTER_PATH_ME_M)) {
        store.dispatch('init').then(() => {
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


export default router;
