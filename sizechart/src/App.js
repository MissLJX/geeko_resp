/**
 * autor s_lei
 */
import 'babel-polyfill'
import Vue from 'vue'

// PC
import App from './pages/index.vue'

// Msite
// import App from './pages/m-index.vue'

import i18n from './i18n'

new Vue({
  i18n,
  el:'#app',
  render: (h) => h(App)
})


