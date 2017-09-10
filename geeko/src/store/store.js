/**
 * Created by shao_ on 2017/9/4.
 */

import * as types from './mutation_types'
import * as api from '../api'
import _ from 'lodash'

export const state = {
    paging:false,
    countries: null,
    states: null
}


export const getters = {
    countries: state => state.countries,
    states: state => state.states,
    paging: state => state.paging,

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
    [types.GLOBAL_LIKE](state, productId){
        api.like(productId).then(() => {
            state.me.wishlist[0].productIds.push(productId)
        })
    },
    [types.GLOBAL_UN_LIKE](state, productId){
        var wishlist = state.me.wishlist,index = _.indexOf(wishlist[0].productIds, productId)
        api.unlike(productId).then(() => {
            wishlist[0].productIds.splice(index, 1)
        })
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
    paging({commit}, {paging}){
        commit(types.GLOBAL_PAGING, paging)
    },
    like({commit}, productId){
        commit(types.GLOBAL_LIKE, productId)
    },
    unlike({commit}, productId){
        commit(types.GLOBAL_UN_LIKE, productId)
    },
    useCoupon(context, couponId){
        return api.useCoupon(couponId)
    }
}
