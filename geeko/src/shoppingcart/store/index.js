/**
 * Created by shao_ on 2017/7/14.
 */
import {UPDATE_SHOPPING_CART, UPDATE_COUNTRIES, UPDATE_STATES} from './mutation_types'
import {get} from '../api'
import {getCountries, getStates} from '../../api'

const state = {
    shoppingcart: null,
    countries: null,
    states: null
}

const getters = {
    shoppingcart: state => state.shoppingcart,
    countries: state => state.countries,
    states: state => state.states
}

const mutations = {
    [UPDATE_SHOPPING_CART](state, _shoppingcart){
        state.shoppingcart = _shoppingcart
    },
}


const actions = {
    updateShoppingcart({commit}, _shoppingcart){
        if (!!!_shoppingcart) {
            get().then((shoppingcart) => {
                console.log(shoppingcart)
                commit(UPDATE_SHOPPING_CART, shoppingcart)
            })
        }else {
            commit(UPDATE_SHOPPING_CART, _shoppingcart)
        }
    },
    getCountries(){

    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}


