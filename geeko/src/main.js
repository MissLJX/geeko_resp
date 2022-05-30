/**
 * Created by shao_ on 2017/7/20.
 */
 import "@babel/polyfill";
import Vue from 'vue'
import store from './store'
import i18n from './i18n'
import router from './router'
import App from './app.vue'
import {sync} from 'vuex-router-sync'
// import VeeValidate from 'vee-validate'

import Loading from "./components/loading.vue"
import Toast from "./components/toast/index"

// import _global from "./components/Global.vue"
import common from "./common.js"

Vue.prototype.$toast = Toast;

Vue.prototype.GLOBAL = common

import './css/style.scss'
import 'swiper/css/swiper.css'


// Vue.use(VeeValidate)

// Vue.config.devtools = true


sync(store, router)

Vue.component('loading',Loading);


new Vue({
    store,
    i18n,
    router,
    el:'#app',
    render: (h) => h(App)
})


//init countries
store.dispatch('getCountries')