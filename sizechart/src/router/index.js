import Vue from 'vue'
import VueRouter from 'vue-router'
import Page404 from '../pages/404.vue'
import Index from '../pages/index.vue'
import mIndex from '../pages/m-index.vue'

Vue.use(VueRouter)

const routes = [
  {path: '*', name: '404', component: Page404, meta: {title:'404'}},

  // PC
  // {path:'/', name: 'Index', component: Index, meta: {title: 'Index'}}

  // Msite
  {path:'/', name: 'mIndex', component: mIndex, meta: {title: 'mIndex'}}
]


const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next();
})

router.afterEach(route => {

})

export default router
