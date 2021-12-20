import 'babel-polyfill'
import Vue from 'vue'
import store from './store'
import router from './router'
import App from './app.vue'
import {sync} from 'vuex-router-sync'
import i18n from './i18n'
import './css/style.scss'
// import global_ from './components/Global.vue'
import common from "./common.js"
import './utils/validate.js'
Vue.prototype.GLOBAL = common

sync(store, router)

new Vue({
  store,
  i18n,
  router,
  el:'#app',
  render: (h) => h(App)
})


