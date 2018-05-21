/**
 * Created by shao_ on 2017/9/4.
 */

import * as types from './mutation_types'
import * as api from '../api'
import _ from 'lodash'

export const state = {
    paging: false,
    screenLoading: false,
    countries: null,
    states: null,
    currencies: null
}


export const getters = {
    countries: state => state.countries,
    states: state => state.states,
    paging: state => state.paging,
    screenLoading: state => state.screenLoading,
    currencies: state => state.currencies
}


export const mutations = {
    [types.GLOBAL_GET_COUNTRIES](state, countries){
        state.countries = countries
    },
    [types.GLOBAL_GET_STATES](state, states){
        state.states = states
    },
    [types.GLOBAL_PAGING](state, paging){
        state.paging = paging
    },
    [types.GLOBAL_SCREEN_LOADING](state, loading){
        state.screenLoading = loading
    },
    [types.GLOBAL_LIKE](state, productId){
        api.like(productId).then(() => {
            state.me.wishlist[0].productIds.push(productId)
        })
    },
    [types.GLOBAL_UN_LIKE](state, productId){
        var wishlist = state.me.wishlist, index = _.indexOf(wishlist[0].productIds, productId)
        api.unlike(productId).then(() => {
            wishlist[0].productIds.splice(index, 1)
        })
    },
    [types.GLOBAL_GET_CURRENCIES](state, currencies){
        state.currencies = currencies
    }
}


export const actions = {
    getCountries({commit}){
        api.getCountries().then((countries) => {
            commit(types.GLOBAL_GET_COUNTRIES, countries)
        })
    },
    getStates({commit}, {country}){
        api.getStates(country).then((states) => {
            commit(types.GLOBAL_GET_STATES, states)
        })
    },
    getCurrencies({commit}){
        api.getCurrencies().then((currencies) => {
            commit(types.GLOBAL_GET_CURRENCIES, currencies)
        })
    },
    paging({commit}, {paging}){
        commit(types.GLOBAL_PAGING, paging)
    },
    screenLoading({commit}, {loading}){
        commit(types.GLOBAL_SCREEN_LOADING, loading)
    },
    like({commit}, productId){
        commit(types.GLOBAL_LIKE, productId)
    },
    unlike({commit}, productId){
        commit(types.GLOBAL_UN_LIKE, productId)
    },
    useCoupon(context, couponId){
        return api.useCoupon(couponId)
    },
    logout(){
        return api.logout()
    },
    logoff(closedReason){
        return api.logoff(closedReason)
    }
}
