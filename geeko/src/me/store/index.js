/**
 * Created by shao_ on 2017/8/23.
 */
import * as types from './mutation_types'
import * as api  from '../api'
import _ from 'lodash'
import * as utils from '../../utils/geekoutils'
import {creditcards} from "../../../../shoppingcart/src/api";

const state = {
    me: null,
    addresses: null,
    coupons: null,
    feed: null,
/*    allPoints:[],*/
    credits: [],
    initialized: false,
    wishlist: null,
    save:[],
    orderNotifications: [],
    promotionNotifications: [],
    otherNotifications: [],
    wishProducts: [],
    refreshProducts:[],
    wishskip: 0,
    youlikeProducts:[],
    youlikeskip:0,
    creditskip: 0,
    headerImage: null,
    promotionNtSkip: 0,
    promotionNtLoaded: false,
    promotionNtFinished: false,
    orderNtSkip: 0,
    orderNtLoaded: false,
    orderNtFinished: false,
    otherNtSkip: 0,
    otherNtLoaded: false,
    otherNtFinished: false,
    notificationCount: 0,
    orderCountProcessing: 0,
    orderCountShipped: 0,
    orderCountReceipt: 0,
    orderCountCanceled: 0,
    orderCountUnpaid: 0,
    message:[],
    creditcards:[],
}

const getters = {
    me: state => state.me,
    feed: state => state.feed,
    addresses: state => state.addresses,
    coupons: state => state.coupons,
    credits: state => state.credits,
    creditskip: state => state.creditskip,
/*    allPoints: state => state.allPoints,*/
    initialized: state => state.initialized,
    wishlist: state => state.wishlist,
    save: state => state.save,
    orderNotifications: state => state.orderNotifications,
    promotionNotifications: state => state.promotionNotifications,
    otherNotifications: state => state.otherNotifications,
    wishProducts: state => state.wishProducts,
    refreshProducts: state => state.refreshProducts,
    wishskip: state => state.wishskip,
    youlikeProducts: state => state.youlikeProducts,
    youlikeskip:state => state.youlikeskip,
    headerImage: state => state.headerImage,
    promotionNtSkip: state => state.promotionNtSkip,
    promotionNtLoaded: state => state.promotionNtLoaded,
    promotionNtFinished: state => state.promotionNtFinished,
    orderNtSkip: state => state.orderNtSkip,
    orderNtLoaded: state => state.orderNtLoaded,
    orderNtFinished: state => state.orderNtFinished,
    otherNtSkip: state => state.otherNtSkip,
    otherNtLoaded: state => state.otherNtLoaded,
    otherNtFinished: state => state.otherNtFinished,
    notificationCount: state => state.notificationCount,
    orderCountProcessing: state => state.orderCountProcessing,
    orderCountShipped: state => state.orderCountShipped,
    orderCountReceipt: state => state.orderCountReceipt,
    orderCountCanceled: state => state.orderCountCanceled,
    orderCountUnpaid: state => state.orderCountUnpaid,
    message: state => state.message,
    creditcards: state =>state.creditcards,
}

const mutations = {
    [types.ME_GET](state, _me){
        state.me = _me
        state.headerImage = utils.IMAGE_PREFIX + '/icon/' + _me.id
    },
    [types.ME_GET_FEED](state, _feed){
        state.feed = _feed
    },
/*    [types.ME_GET_All_Points](state,_AllPoints){
        state.allPoints = _AllPoints
    },*/
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
        state.orderNotifications = _.concat(state.orderNotifications,orderNotifications)
    },
    [types.ME_GET_NOTIFICATION_O_SKIP](state){
        state.orderNtSkip += 20
    },
    [types.ME_GET_NOTIFICATION_O_LOADED](state){
        state.orderNtLoaded = true
    },
    [types.ME_GET_NOTIFICATION_O_FINISHED](state){
        state.orderNtFinished = true
    },
    [types.ME_GET_NOTIFICATIONS_PROMOTION](state, promotionNotifications){
        state.promotionNotifications = _.concat(state.promotionNotifications, promotionNotifications)
    },
    [types.ME_GET_NOTIFICATION_P_SKIP](state){
        state.promotionNtSkip += 20
    },
    [types.ME_GET_NOTIFICATION_P_LOADED](state){
        state.promotionNtLoaded = true
    },
    [types.ME_GET_NOTIFICATION_P_FINISHED](state){
        state.promotionNtFinished = true
    },
    [types.ME_GET_NOTIFICATIONS_OTHER](state, otherNotifications){
        state.otherNotifications = _.concat(state.otherNotifications, otherNotifications)
    },
    [types.ME_GET_NOTIFICATION_OT_SKIP](state){
        state.otherNtSkip += 20
    },
    [types.ME_GET_NOTIFICATION_OT_LOADED](state){
        state.otherNtLoaded = true
    },
    [types.ME_GET_NOTIFICATION_OT_FINISHED](state){
        state.otherNtFinished = true
    },
    [types.ME_GET_WISH_PRODUCTS](state, wishProducts){
        state.wishProducts = _.concat(state.wishProducts, wishProducts)
    },
    [types.ME_GET_WISH_SKIP](state){
        state.wishskip += 20
    },
    [types.ME_GET_YOU_LIKE_PRODUCTS](state,youlikeProducts){
        state.youlikeProducts = _.concat(state.youlikeProducts,youlikeProducts)
    },
    [types.ME_GET_YOU_LIKE_SKIP](state){
        state.youlikeskip += 20
    },
    [types.ME_GET_CREDITS_SKIP](state){
        state.creditskip += 20
    },
    [types.ME_HEADER_IMAGE](state, headerImage){
        state.headerImage = headerImage
    },
    [types.ME_CHANGE_EMAIL](state, email){
        state.me.communicationEmail = email
    },
    [types.ME_UPDATE_ADDRESS](state, address){
        var _address
        if (state.addresses && (_address = state.addresses.find(o => o.id === address.id))) {
            _address.name = address.name
            _address.country = address.country
            _address.phoneNumber = address.phoneNumber
            _address.zipCode = address.zipCode
            _address.unit = address.unit
            _address.state = address.state
            _address.streetAddress1 = address.streetAddress1
            _address.city = address.city

        }

    },
    [types.ME_DELETE_ADDRESS](state, addressId){
        var _index = 0
        _.each(state.addresses, (address, index) => {
            if (address.id === addressId) {
                _index = index
                return false
            }
        })
        state.addresses.splice(_index, 1)
    },
    [types.ME_ADD_ADDRESS](state, address){
        state.addresses.unshift(address)
    },
    [types.ME_GET_NOTIFICATION_COUNT](state, count){
        state.notificationCount = count
    },
    [types.ME_CHANGE_CURRENCY](state, currency){
        state.me.currency = currency
    },
    [types.ME_ORDER_COUNT_PROCESSING](state, count){
        state.orderCountProcessing = count
    },
    [types.ME_ORDER_COUNT_SHIPPED](state, count){
        state.orderCountShipped = count
    },
    [types.ME_ORDER_COUNT_RECEIPT](state, count){
        state.orderCountReceipt = count
    },
    [types.ME_ORDER_COUNT_CANCELED](state, count){
        state.orderCountCanceled = count
    },
    [types.ME_ORDER_COUNT_UNPAID](state, count){
        state.orderCountUnpaid = count
    },
    [types.ME_GET_MESSAGE](state, code){
        state.message = code
    },
    [types.Me_GET_CREDITCARDS](state,creditcards){
        state.creditcards = creditcards
    },
    [types.ME_DEL_CREDIT_CARD](state,id){
        state.id = id
    },
    [types.ME_DEL_MERCADO_CARD](state,id){
        state.id = id
    },
    [types.ME_REMOVE_EXPIRED_PRODUCTS](state){

    }

}

const actions = {
    init({dispatch, commit, state}){
        if (!state.initialized) {
            return Promise.all([
                dispatch('getMe'),
                dispatch('getWishlist'),
                dispatch('getAllPoints')
            ]).then(([me, wishlist]) => {
                commit(types.ME_GET, me)
                commit(types.ME_GET_WISH_LIST, wishlist)
                return me
            }).then((me) => {
                return dispatch('getFeed', me.id)
            }).then((feed) => {
                commit(types.ME_GET_FEED, feed)
                commit(types.ME_INITIALIZED)
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
    getFeed({commit}, customerId){
        return new Promise((resolve, reject) => {
            api.getFeed(customerId).then(feed => {
                commit(types.ME_GET_FEED, feed)
                resolve(feed)
            }).catch(e => {
                reject(e)
            })
        })
    },
/*    getAllPoints({commit}){
        return new Promise((resolve, reject) => {
            api.getAllPoints().then(AllPoints => {
                commit(types.ME_GET_All_Points, AllPoints)
                resolve()
            }).catch(e => {
                reject(e)
            })
        })
    },*/
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

    getCredits({commit}, {skip}){
        return api.getCredits(skip).then((credits) => {
            if (credits && credits.length) {
                commit(types.ME_GET_CREDITS, credits)
            } else {
                if (skip === 0) {
                    return {empty: true, finished: true}
                }
                return {finished: true}
            }
        })
    },

    getCreditskip({commit}){
        commit(types.ME_GET_CREDITS_SKIP)
    },

    /*getYoulikes({commit},{skip}){
        return new Promise((resolve, reject) => {
            api.getMayLikes(skip).then(products => {
                if(products && products.length){
                    commit(types.ME_GET_YOU_LIKES, products)
                }else{
                    if (skip === 0) {
                        return {empty: true, finished: true}
                    }
                    return {finished: true}
                }

                resolve()
            }).catch(e => {
                reject(e)
            })
        })
    },*/

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
        return api.getOrderNotifications(skip).then((nts) => {
            commit(types.ME_GET_NOTIFICATION_O_LOADED)

            if (nts && nts.length) {
                commit(types.ME_GET_NOTIFICATIONS_ORDER, nts)
            } else {
                commit(types.ME_GET_NOTIFICATION_O_FINISHED)
            }
        })
    },

    getOrderNtSkip({commit}){
        commit(types.ME_GET_NOTIFICATION_O_SKIP)
    },

    getPromotionNotifications({commit}, {skip}){
        return api.getPromotionNotification(skip).then((nts) => {
            commit(types.ME_GET_NOTIFICATION_P_LOADED)
            if (nts && nts.length) {
                commit(types.ME_GET_NOTIFICATIONS_PROMOTION, nts)
            } else {
                commit(types.ME_GET_NOTIFICATION_P_FINISHED)
            }
        })
    },
    getPromotionNtSkip({commit}){
        commit(types.ME_GET_NOTIFICATION_P_SKIP)
    },

    getOtherNotifications({commit}, {skip}){
        return api.getOtherNotification(skip).then((nts) => {
            commit(types.ME_GET_NOTIFICATION_OT_LOADED)
            if (nts && nts.length) {
                commit(types.ME_GET_NOTIFICATIONS_OTHER, nts)
            } else {
                commit(types.ME_GET_NOTIFICATION_OT_FINISHED)
            }
        })
    },

    getOtherNtSkip({commit}){
        commit(types.ME_GET_NOTIFICATION_OT_SKIP)
    },

    getWishproducts({commit, state}, {skip}){
        return api.getWishProducts(state.me.id, skip).then((products) => {
            if (products && products.length) {
                if (skip === 0){
                    state.wishProducts = [];
                    commit(types.ME_GET_WISH_PRODUCTS, products)
                }else{
                    commit(types.ME_GET_WISH_PRODUCTS, products)
                }

            } else {
                if (skip === 0) {
                    return {empty: true, finished: true}
                }
                return {finished: true}
            }

            return {finished:false}
        })
    },
    getYouLikeProducts({commit}, {skip}){
        return api.getYouLikeProducts(skip).then((products) => {
            if (products && products.length) {
                commit(types.ME_GET_YOU_LIKE_PRODUCTS, products)
            } else {
                if (skip === 0) {
                    return {empty: true, finished: true}
                }
                return {finished: true}
            }

            return {}
        })
    },

    getWishskip({commit}){
        commit(types.ME_GET_WISH_SKIP)
    },

    getYouLikeSkip({commit}){
        commit(types.ME_GET_YOU_LIKE_SKIP)
    },

    postProfile({}, postData){
        return api.postProfile(postData)
    },

    setHeaderImage({commit}, {formData, imageUrl}){
        commit(types.ME_HEADER_IMAGE, imageUrl)
        return api.postHeaderImage(formData)
    },

    changePassword(context, data){
        return api.changePassword(data)
    },

    changeAccountEmail(context, data){
        return api.changeAccountEmail(data)
    },

    changeEmail({commit}, data){
        return api.changeEmail(data).then(() => {
            commit(types.ME_CHANGE_EMAIL, data.email)
        })
    },

    updateAddress({commit}, data){
        return api.updateAddress(data).then((address) => {
            commit(types.ME_UPDATE_ADDRESS, address)
        })
    },

    deleteAddress({commit}, {id}){
        return api.deleteAddress(id).then(() => {
            commit(types.ME_DELETE_ADDRESS, id)
        })
    },

    addAddress({commit}, address){
        return api.addAddress(address).then((address) => {
            commit(types.ME_ADD_ADDRESS, address)
        })
    },

    countNotifications({commit}){
        return api.countUnreadNotification().then((count) => {
            commit(types.ME_GET_NOTIFICATION_COUNT, count)
        })
    },

    changeCurrency({commit},currency){
        return api.changeCurrency(currency.value).then(() => {
            commit(types.ME_CHANGE_CURRENCY, currency)
        })
    },


    getOrderCountProcessing({commit}){
        return api.getOrderCountProcessing().then((count) => {
            commit(types.ME_ORDER_COUNT_PROCESSING, count)
        })
    },

    getOrderCountShipped({commit}){
        return api.getOrderCountShipped().then((count) => {
            commit(types.ME_ORDER_COUNT_SHIPPED, count)
        })
    },

    getOrderCountReceipt({commit}){
        return api.getOrderCountReceipt().then((count) => {
            commit(types.ME_ORDER_COUNT_RECEIPT, count)
        })
    },

    getOrderCountCanceled({commit}){
        return api.getOrderCountCanceled().then((count) => {
            commit(types.ME_ORDER_COUNT_CANCELED, count)
        })
    },

    getOrderCountUnpaid({commit}){
        return api.getOrderCountUnpaid().then((count) => {
          commit(types.ME_ORDER_COUNT_UNPAID, count)
        })
    },

    getMessage({commit},code){
        return api.getMessage(code).then((code) =>{
            commit(types.ME_GET_MESSAGE,code)
        })
    },

    getCreditCards({commit}){
        return api.getCreditCards().then((creditcards) =>{
            commit(types.Me_GET_CREDITCARDS,creditcards)
        })
    },

    deleteCreditCard({commit},{cardId}){
        return api.deleteCreditCard(cardId).then(() => {
            commit(types.ME_DEL_CREDIT_CARD, cardId)
        })
    },

    deleteMercadoCard({commit},{cardId}){
        return api.deleteMercadoCard(cardId).then(() => {
            commit(types.ME_DEL_MERCADO_CARD, cardId)
        })
    },

    removeExpiredProducts({commit}){
        return api.removeExpiredProducts().then(() => {
            commit(types.ME_REMOVE_EXPIRED_PRODUCTS)
        })
    },

    removeWishProducts(context,data){
        return api.removeWishProducts(data)
    },

    confirmEmail({commit},email){
        return api.confirmEmail(email)
    },
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
