import * as types from './mutation_types'
import * as api  from '../api'

const actions = {
    init({dispatch, commit, state}){
        if (!state.initialized) {
            return Promise.all([
                dispatch('getMe'),
                dispatch('getWishlist'),
                // dispatch('getAllPoints')
            ]).then(([me, wishlist]) => {
                commit(types.ME_GET, me)
                commit(types.ME_GET_WISH_LIST, wishlist)
                return me
            }).then((me) => {
                // return dispatch('getFeed', me.id)
                return me;
            }).then((feed) => {
                // commit(types.ME_GET_FEED, feed)
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
                resolve(coupons)
            }).catch(e => {
                reject(e)
            })
        })
    },

    getExpiredCoupons({commit},{skip}){
        return api.getExpiredCoupons(skip,"2").then((coupons) => {
            if(coupons && coupons.length > 0){
                commit(types.ME_GET_EXPIRED_COUPONS,coupons);
                return {empty:true}
            }else{
                return {finished:true}
            }
            return {};
        }).catch(error => {
            console.log("error",error);
        });
    },

    getExpiredCouponsSkip({commit}){
        commit(types.ME_GET_EXPIRED_COUPONS_SKIP);
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

            return {}
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
                    state.wishProducts = [];
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

    getMercadoCreditCards({commit}){
        return api.getMercadoCreditCards().then((mercadocreditcards) =>{
            commit(types.Me_GET_MERCADOCREDITCARDS,mercadocreditcards)
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
    getTrackOrderMessage({commit},{skip}){
        return api.getTrackOrderMessage(skip).then((track) => {
            if (track && track.length) {
                commit(types.ME_GET_TRACK_ORDER_MESSAGE,track);
            } else {
                return {finished: true,empty:true}
            }
            return {}
        });
    },
    getTrackOrderSkip({commit}){
        commit(types.ME_TRACK_ORDER_SKIP);
    },
    generalUploadImage({commit},{formData}){
        return new Promise((reslove,reject) => {
            console.log("formData",formData);
            api.generalUploadImage(formData).then((result) => {
                reslove(result);
            });
        });
    }
}

export default actions;