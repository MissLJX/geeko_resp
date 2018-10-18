import 'babel-polyfill'
import Vue from 'vue'
import store from './store'
import router from './router'
import App from './app.vue'
import {sync} from 'vuex-router-sync'
import i18n from './i18n'
import './css/style.scss'
import VeeValidate from 'vee-validate'
import global_ from './components/Global.vue'

Vue.prototype.GLOBAL = global_

Vue.use(VeeValidate)

sync(store, router)

new Vue({
  store,
  i18n,
  router,
  el:'#app',
  render: (h) => h(App)
})


