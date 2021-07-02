/**
 * autor s_lei
 */
import 'babel-polyfill'
import Vue from 'vue'

// ChiCme PC
// import App from './pages/chicme/index.vue'

// ChiCme Msite
import App from './pages/chicme/m-index.vue'

// Belle PC
// import App from './pages/belle/index.vue'

// Belle Msite
// import App from './pages/belle/m-index.vue'

import i18n from './i18n'

new Vue({
  i18n,
  el:'#app',
  render: (h) => h(App)
})


