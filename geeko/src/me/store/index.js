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
    credits: [],
    initialized: false,
    youlikes: null,
    wishlist: null,
    orderNotifications: null,
    promotionNotifications: null,
    otherNotifications: null,
    wishProducts: [],
    wishskip: 0,
    creditskip: 0
}

const getters = {
    me: state => state.me,
    feed: state => state.feed,
    addresses: state => state.addresses,
    coupons: state => state.coupons,
    credits: state => state.credits,
    creditskip: state => state.creditskip,
    initialized: state => state.initialized,
    youlikes: state => state.youlikes,
    wishlist: state => state.wishlist,
    orderNotifications: state => state.orderNotifications,
    promotionNotifications: state => state.promotionNotifications,
    otherNotifications: state => state.otherNotifications,
    wishProducts: state => state.wishProducts,
    wishskip: state => state.wishskip
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
        state.credits = _.concat(state.credits, _credits)
    },
    [types.ME_INITIALIZED](state){
        state.initialized = true
    },
    [types.ME_GET_YOU_LIKES](state, youlikes){
        state.youlikes = youlikes
    },
    [types.ME_GET_WISH_LIST](state, wishlist){
        state.wishlist = wishlist
    },
    [types.ME_GET_NOTIFICATIONS_ORDER](state, orderNotifications){
        state.orderNotifications = orderNotifications
    },
    [types.ME_GET_NOTIFICATIONS_PROMOTION](state, promotionNotifications){
        state.promotionNotifications = promotionNotifications
    },
    [types.ME_GET_NOTIFICATIONS_OTHER](state, otherNotifications){
        state.otherNotifications = otherNotifications
    },
    [types.ME_GET_WISH_PRODUCTS](state, wishProducts){
        state.wishProducts = _.concat(state.wishProducts, wishProducts)
    },
    [types.ME_GET_WISH_SKIP](state){
        state.wishskip += 20
    },
    [types.ME_GET_CREDITS_SKIP](state){
        state.creditskip += 20
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

    getCredits({commit},{skip}){
        return api.getCredits(skip).then((credits) => {
            if(credits && credits.length){
                commit(types.ME_GET_CREDITS, credits)
                return {}
            }else{
                if(skip === 0){
                    return {empty: true, finished: true}
                }
                return {finished: true}
            }
        })
    },

    getCreditskip({commit}){
        commit(types.ME_GET_CREDITS_SKIP)
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
    },

    getOrderNotifications({commit}, {skip}){
        return new Promise((resolve, reject) => {
            api.getOrderNotifications(skip).then(nts => {
                commit(types.ME_GET_NOTIFICATIONS_ORDER, nts)
                resolve({empty: skip === 0 && (!nts || !nts.length), nts})
            }).catch(e => {
                reject(e)
            })
        })
    },

    getPromotionNotifications({commit}, {skip}){
        return new Promise((resolve, reject) => {
            api.getPromotionNotification(skip).then(nts => {
                commit(types.ME_GET_NOTIFICATIONS_PROMOTION, nts)
                resolve({empty: skip === 0 && (!nts || !nts.length), nts})
            }).catch(e => {
                reject(e)
            })
        })
    },

    getOtherNotifications({commit}, {skip}){
        return new Promise((resolve, reject) => {
            api.getOtherNotification(skip).then(nts => {
                commit(types.ME_GET_NOTIFICATIONS_OTHER, nts)
                resolve({empty: skip === 0 && (!nts || !nts.length), nts})
            }).catch(e => {
                reject(e)
            })
        })
    },

    getWishproducts({commit}, {skip}){
        return api.getWishProducts(skip).then((products) => {
            if(products && products.length){
                commit(types.ME_GET_WISH_PRODUCTS, products)
            }else{
                if(skip ===0){
                    return {empty: true, finished: true}
                }
                return {finished: true}
            }
        })
    },

    getWishskip({commit}){
        commit(types.ME_GET_WISH_SKIP)
    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}