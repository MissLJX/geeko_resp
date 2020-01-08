import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../pages/index.vue'

Vue.use(VueRouter)

const routes = [
  {path:'/review', name: 'review', component: Index, meta: {title: 'Index'}}
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
