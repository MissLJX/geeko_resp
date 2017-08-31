/**
 * Created by shao_ on 2017/8/23.
 */
import * as types from './mutation_types'
import * as api  from '../api'
import _ from 'lodash'

const state = {
    me: null,
    addresses: null,
    coupons: null,
    feed: null,
    credits: null,
    initialized: false,
    youlikes: null,
    wishlist: null
}

const getters = {
    me: state => state.me,
    feed: state => state.feed,
    addresses: state => state.addresses,
    coupons: state => state.coupons,
    credits: state => state.credits,
    initialized: state => state.initialized,
    youlikes: state => state.youlikes,
    wishlist: state => state.wishlist
}

const mutations = {
    [types.ME_GET](state, _me){
        state.me = _me
    },
    [types.ME_GET_FEED](state, _feed){
        state.feed = _feed
    },
    [types.ME_GET_ADDRESSES](state, _addresses){
        state.addresses = _addresses
    },
    [types.ME_GET_COUPONS](state, _coupons){
        state.coupons = _coupons
    },
    [types.ME_GET_CREDITS](state, _credits){
        state.credits = _credits
    },
    [types.ME_INITIALIZED](state){
        state.initialized = true
    },
    [types.ME_GET_YOU_LIKES](state, youlikes){
        state.youlikes = youlikes
    },
    [types.ME_GET_WISH_LIST](state, wishlist){
        state.wishlist = wishlist
    }
}

const actions = {
    init({dispatch, commit, state}){
        if (!state.initialized) {
            return Promise.all([
                dispatch('getMe'),
                dispatch('getFeed'),
                dispatch('getWishlist')
            ]).then(([me, feed, wishlist]) => {
                commit(types.ME_GET, me)
                commit(types.ME_GET_FEED, feed)
                commit(types.ME_INITIALIZED)
                commit(types.ME_GET_WISH_LIST, wishlist)
            })
        }


    },
    getMe({commit}){
        return new Promise((resolve, reject) => {
            api.get().then(me => {
                commit(types.ME_GET, me)
                resolve(me)
            }).catch(e => {
                reject(e)
            })
        })

    },
    getFeed({commit}){
        return new Promise((resolve, reject) => {
            api.getFeed().then(feed => {
                commit(types.ME_GET_FEED, feed)
                resolve(feed)
            }).catch(e => {
                reject(e)
            })
        })
    },
    getAddresses({commit}){

        return new Promise((resolve, reject) => {
            api.getShippingDetails().then(addresses => {
                commit(types.ME_GET_ADDRESSES, addresses)
                resolve()
            }).catch(e => {
                reject(e)
            })
        })


    },
    getCoupons({commit}){
        return new Promise((resolve, reject) => {
            api.getCoupons().then(coupons => {
                commit(types.ME_GET_COUPONS, coupons)
                resolve()
            }).catch(e => {
                reject(e)
            })
        })
    },

    makeDefault({commit, state}, id){
        return new Promise((resolve, reject) => {
            api.makeDefaultAddress(id).then(() => {

                _.each(state.addresses, (a) => {
                    a.isDefaultAddress = false
                    if (a.id === id) {
                        a.isDefaultAddress = true
                    }
                })

                resolve()
            }).catch(e => {
                reject(e)
            })
        })
    },

    getCredits({commit}){
        return new Promise((resolve, reject) => {
            api.getCredits().then(credits => {
                commit(types.ME_GET_CREDITS, credits)
                resolve()
            }).catch(e => {
                reject(e)
            })
        })
    },

    getYoulikes({commit}){
        return new Promise((resolve, reject) => {
            api.getMayLikes().then(products => {
                commit(types.ME_GET_YOU_LIKES, products)
                resolve()
            }).catch(e => {
                reject(e)
            })
        })
    },

    getWishlist({commit}){
        return new Promise((resolve, reject) => {
            api.getWishlist().then(wishlist => {
                commit(types.ME_GET_WISH_LIST, wishlist)
                resolve(wishlist)
            }).catch(e => {
                reject(e)
            })
        })
    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}