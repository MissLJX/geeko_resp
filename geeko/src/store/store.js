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
    [types.GLOBAL_CANCEL_SAVE](state,productId){
        let idlist = state.me.save, index = _.indexOf(idlist,productId)
        if(index === -1){
            state.me.save.push(productId)
        }else{
            _.pull(state.me.save,productId)
        }
    },
    [types.GLOBAL_CLEAR_ID](state){
        state.me.save = [];
        state.me.wishskip = 0;
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
    unsave({commit},productId){
        commit(types.GLOBAL_CANCEL_SAVE,productId)
    },
    clearId({commit}){
        commit(types.GLOBAL_CLEAR_ID)
    },
    clearskip({commit}){
        commit(types.GLOBAL_CLEAR_SKIP)
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
