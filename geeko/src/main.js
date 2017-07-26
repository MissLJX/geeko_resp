/**
 * Created by shao_ on 2017/7/20.
 */
import 'babel-polyfill'
import Vue from 'vue'
import store from './store'
import i18n from './i18n'
import router from './router'
import App from './app.vue'
import {sync} from 'vuex-router-sync'

import './css/style.scss'

sync(store, router)

new Vue({
    store,
    i18n,
    router,
    el:'#app',
    render: (h) => h(App)
});