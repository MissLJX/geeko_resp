/**
 * Created by shao_ on 2017/7/20.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import shoppingcart from '../shoppingcart/store'
import me from '../me/store'
import {state, getters, mutations, actions} from './store'

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        shoppingcart: shoppingcart,
        me: me
    }
})