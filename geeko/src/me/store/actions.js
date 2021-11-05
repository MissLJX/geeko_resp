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
                commit(types.ME_GET_NO_LOGIN,true);
                return me
            }).then((me) => {
                // console.log(me)
                return dispatch('getFeed', me.id)
            }).then((feed) => {
                commit(types.ME_GET_FEED, feed)
                commit(types.ME_INITIALIZED)
            }).catch((e) => {
                console.log("initcatch",e);
                commit(types.ME_GET_NO_LOGIN,false);
            });
        }
    },
    getMe({commit}){
        return api.get().then(me => {
            commit(types.ME_GET, me)
            return me
        }).catch(e => {
            console.log("e",e);
            commit(types.ME_GET_NO_LOGIN,false);
            return null
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
                if(addresses && addresses.length > 0){
                    commit(types.ME_GET_ADDRESSES, addresses);
                    resolve();
                }else{
                    resolve({finished:true});
                }
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
        return api.getWishlist().then(wishlist => {
            commit(types.ME_GET_WISH_LIST, wishlist)
            return wishlist
        }).catch(e => {
            console.log("wishlistcatch",e);
            return [];
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
        return api.getWishProducts(state.me.id, skip).then((data) => {
            let products = data.result;

            if (products && products.length) {
                let wishlistEvent = {"requestId":data.requestId,"experimentId":data.experimentId};
                commit(types.GET_RECORD_WISHLIST_EVENT,wishlistEvent);
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
        return api.getYouLikeProducts(skip).then((data) => {
            let products = data.result;
            if (products && products.length) {
                commit(types.ME_GET_YOU_LIKE_PRODUCTS, products)
            } else {
                if (skip === 0) {
                    return {empty: true, finished: true,"requestId":data.requestId,"experimentId":data.experimentId}
                }
                return {finished: true,"requestId":data.requestId,"experimentId":data.experimentId}
            }
            return {"requestId":data.requestId,"experimentId":data.experimentId}
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
        return api.changeAccountEmail(data).then((result) => {
            return result;
        })
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
        return new Promise((reslove,reject) => {
            api.changeCurrency(currency.value).then(() => {
                commit(types.ME_CHANGE_CURRENCY, currency);
                reslove(currency);
            })
        });
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
        return api.getMessage(code);
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
        // return new Promise((reslove,reject) => {
        //     console.log("email",email);
        //     reslove(true);
        // });
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
    },
    updateCustomerSave({commit},customer){
        return new Promise((reslove,reject) => {
            api.updateCustomerSave({"customer":customer.customer}).then((result) => {
                reslove(result);
                console.log("customer",customer);
                if(customer.name === 'myPreference'){
                    console.log("customer",customer.name);
                    customer["customer"] = customer["definition"];
                }
                commit(types.CHANGE_GET_ME_DATA,customer);
            });
        });
    },
    getCurrencyList({commit}){
        return new Promise((reslove,reject) => {
            api.getCurrencyList().then((result) => {
                commit(types.GET_ME_CURRENCY_LIST,result.currencies);
                reslove();
            });
        });
    },
    getShoppingCartNum({commit}){
        return api.getShoppingCartNum().then(result => {
            commit(types.GET_SHOPPING_CART_NUM,result);
        });
    },
    getIndexLoginMessageCode({commit},code){
        return api.getMessage(code).then(result => {
            // commit(types.GET_INDEX_MESSAGE_CODE_LOGIN,result.message);
            return result && result.message;
        });
    },
    getMyPreferenceMessageCode({commit},code){
        return api.getMessageToObject(code).then(result => {
            commit(types.GET_MY_PREFERENCES_MESSAGE_CODE,result);
        });
    },
    getRelationProducts({commit,state},{productId,skip}){
        return api.getRelationProducts({productId,skip}).then((result) => {
            let products = result.result;
            if(products && products.length > 0){
                if(skip === 0){
                    state.relationProducts = [];
                    state.relationProductsSkip = 0;
                }
                commit(types.GET_RELATION_PRODUCTS,products);
            }else{
                if (skip === 0) {
                    return {empty: true, finished: true}
                }
                return {finished: true}
            }
            return {}
        });
    },
    getRelationProductsSkip({commit}){
        commit(types.GET_RELATION_PRODUCTS_SKIP);
    },
    updateSurvey({commit},params){
        console.log(params)
        return new Promise((reslove,reject) => {
            api.surveySave(params).then((result) => {
                reslove(result);
                commit(types.GET_SURVEY_ANSWER, params);
            });
        });
    },
    getSurvey({commit},params){
        // console.log(params)
        return new Promise((reslove,reject) => {
            api.surveyGet(params).then((result) => {
                console.log(result)
                reslove(result);
                commit(types.GET_SURVEY_ANSWER, params);
            });
        });
    },
    getPointsRulesGuide({commit},code){
        return api.getMessageToArray(code);
    },
    getHasNoCommentOrder({commit},params){
        return new Promise((resolve, reject) => {
            api.getNoCommentOrder().then(result => {
                // console.log(result)
                resolve(result)
                commit(types.GET_HAS_NO_COMMENT_ORDER, result.result?result.result:false)
            })
        })
    }
}

export default actions;