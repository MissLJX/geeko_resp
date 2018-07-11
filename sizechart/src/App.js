/**
 * autor s_lei
 */
import 'babel-polyfill'
import Vue from 'vue'
import App from './pages/m-index.vue'
import i18n from './i18n'

new Vue({
  i18n,
  el:'#app',
  render: (h) => h(App)
})


