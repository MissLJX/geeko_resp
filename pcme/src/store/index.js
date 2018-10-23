import Vue from 'vue'
import Vuex from 'vuex'
import * as api from "../api";
import * as types from "./mutation_types";
import _ from 'lodash'
import axios from '../api/apiconfigs'

Vue.use(Vuex)

const state = {
    me:'',

    orderCountAll: 0,
    orderCountProcessing: 0,
    orderCountShipped: 0,
    orderCountReceipt: 0,
    orderCountCanceled: 0,
    orderCountUnpaid: 0,

    all: [],
    orderdetail:{},
    processing: [],
    shipped: [],
    confirmed: [],
    canceled: [],
    unpaid: [],
    allLoading: false,
    processingLoading: false,
    shippedLoading: false,
    confirmedLoading: false,
    canceledLoading: false,
    unpaidLoading: false,
    tab: 'all',
    allSkip: 0,
    processingSkip: 0,
    confirmedSkip: 0,
    canceledSkip: 0,
    shippedSkip: 0,
    unpaidSkip: 0,
    allDone: false,
    processingDone: false,
    confirmedDone: false,
    canceledDone: false,
    shippedDone: false,
    unpaidDone: false,
    bbmessage: null,
    orderid:'',

    coupons:'',
    message:'',
    credits:[],
    wishProducts: [],
    wishskip: 0,
    creditcards:[],
    addresses: null,

    countries: null,
    states: null,
    currencies: null,

    headerImage: null,

    sharekey:'',
    copylink:'',

    comment: {
        content: '',
        id: null,
        productId: null,
        score: 5,
        sizingRecommendation: '2'
    },
    reviewSending: false,

    tickets : [],
    ticket:[],
    ticket_con:[],
    ticketid:'',
    shareurl:'',
    logistics:[]
}
const getters = {
    me: state => state.me,

    orderCountAll: state => state.orderCountAll,
    orderCountProcessing: state => state.orderCountProcessing,
    orderCountShipped: state => state.orderCountShipped,
    orderCountReceipt: state => state.orderCountReceipt,
    orderCountCanceled: state => state.orderCountCanceled,
    orderCountUnpaid: state => state.orderCountUnpaid,

    all: state => state.all,
    orderdetail:state => state.orderdetail,
    processing: state => state.processing,
    shipped: state => state.shipped,
    confirmed: state => state.confirmed,
    canceled: state => state.canceled,
    unpaid: state => state.unpaid,
    allLoading: state => state.allLoading,
    processingLoading: state => state.processingLoading,
    confirmedLoading: state => state.confirmedLoading,
    canceledLoading: state => state.canceledLoading,
    shippedLoading: state => state.shippedLoading,
    unpaidLoading: state => state.unpaidLoading,
    tab: state => state.tab,
    allSkip: state => state.allSkip,
    processingSkip: state => state.processingSkip,
    confirmedSkip: state => state.confirmedSkip,
    canceledSkip: state => state.canceledSkip,
    shippedSkip: state => state.shippedSkip,
    unpaidSkip: state => state.unpaidSkip,
    allDone: state => state.allDone,
    processingDone: state => state.processingDone,
    confirmedDone: state => state.confirmedDone,
    canceledDone: state => state.canceledDone,
    shippedDone: state => state.shippedDone,
    unpaidDone: state => state.unpaidDone,
    bbmessage: state => state.bbmessage,
    orderid: state => state.orderid,

    coupons: state => state.coupons,
    message: state => state.message,
    credits: credits => state.credits,
    wishProducts: state => state.wishProducts,
    wishskip: state => state.wishskip,
    creditcards: state =>state.creditcards,
    addresses: state => state.addresses,
    countries: state => state.countries,
    states: state => state.states,
    currencies: state => state.currencies,

    headerImage: state => state.headerImage,
    sharekey: state => state.sharekey,
    copylink: state => state.copylink,
    comment: state => state.comment,
    reviewSending: state => state.reviewSending,

    tickets: state => state.tickets,
    ticket: state => state.ticket,
    ticket_con: state => state.ticket_con,
    ticketid:state => state.ticketid,
    shareurl:state => state.shareurl,
    logistics: state => state.logistics
}
const mutations = {
    [types.INIT_ME](state, me){
        state.me = me
    },
    [types.ME_GET](state, _me){
        state.me = _me
    },
    //order count
    [types.ME_ORDER_COUNT_ALL](state, count){
        state.orderCountAll = count
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
    //orders
    [types.HOME_ORDERS_ALL](state, orders) {
        state.all.push(...orders);
    },
    [types.ME_ORDER_DETAIL](state,order){
        state.orderdetail= _.cloneDeep(order)
    },
    [types.HOME_LOADING_ALL](state, loading) {
        state.allLoading = loading;
    },
    [types.HOME_ORDER_ALL_SKIP](state, limit) {
        state.allSkip += limit;
    },
    [types.HOME_ALL_DONE](state) {
        state.allDone = true;
    },
    [types.HOME_ORDERS_PROCESSING](state, orders) {
        state.processing.push(...orders);
    },
    [types.HOME_LOADING_PROCESSING](state, loading) {
        state.processingLoading = loading;
    },
    [types.HOME_ORDER_PROCESSING_SKIP](state, limit) {
        state.processingSkip += limit;
    },
    [types.HOME_PROCESSING_DONE](state) {
        state.processingDone = true;
    },

    [types.HOME_ORDERS_UNPAID](state, orders) {
        state.unpaid.push(...orders);
    },
    [types.HOME_LOADING_UNPAID](state, loading) {
        state.unpaidLoading = loading;
    },
    [types.HOME_ORDER_UNPAID_SKIP](state, limit) {
        state.unpaidSkip += limit;
    },
    [types.HOME_UNPAID_DONE](state) {
        state.unpaidDone = true;
    },


    [types.HOME_ORDERS_SHIPPED](state, orders) {
        state.shipped.push(...orders);
    },
    [types.HOME_LOADING_SHIPPED](state, loading) {
        state.shippedLoading = loading;
    },
    [types.HOME_ORDER_SHIPPED_SKIP](state, limit) {
        state.shippedSkip += limit;
    },
    [types.HOME_SHIPPED_DONE](state) {
        state.shippedDone = true;
    },
    [types.HOME_ORDERS_CONFIRMED](state, orders) {
        state.confirmed.push(...orders);
    },
    [types.HOME_LOADING_CONFIRMED](state, loading) {
        state.confirmedLoading = loading;
    },
    [types.HOME_ORDER_CONFIRMED_SKIP](state, limit) {
        state.confirmedSkip += limit;
    },
    [types.HOME_CONFIRMED_DONE](state) {
        state.confirmedDone = true;
    },
    [types.HOME_ORDERS_CANCELED](state, orders) {
        state.canceled.push(...orders);
    },
    [types.HOME_LOADING_CANCELED](state, loading) {
        state.canceledLoading = loading;
    },
    [types.HOME_ORDER_CANCELED_SKIP](state, limit) {
        state.canceledSkip += limit;
    },
    [types.HOME_CANCELED_DONE](state) {
        state.canceledDone = true;
    },

    [types.HOME_CHANGE_TAB](state, tab) {
        state.tab = tab;
    },
    [types.HOME_ORDERS_STATUS_UPDATE](state, { id, status }) {
        var order;
        state.all && (order = state.all.find(o => o.id === id)) && (order.order.status = status);
    },
    [types.HOME_GET_M1135](state, result){
        const message = result ? result.message : '';
        state.bbmessage = message;
    },

    [types.HOME_ORDER_ID](state,id){
        state.orderid = id;
    },
    //coupons
    [types.ME_COUPONS](state,coupons) {
        state.coupons = coupons;
    },
    //credits
    [types.ME_GET_CREDITS](state, _credits){
        /*state.credits = _.concat(state.credits, _credits)*/
        state.credits = _credits
    },
    //credits-tips msg
    [types.ME_GET_MESSAGE](state,message){
        state.message = message;
    },
    //wishlist
    [types.ME_GET_WISH_PRODUCTS](state, wishProducts){
        state.wishProducts = _.concat(state.wishProducts, wishProducts)
    },
    [types.ME_GET_WISH_SKIP](state){
        state.wishskip += 20
    },
    //crdits-cards
    [types.ME_GET_CREDITCARDS](state,creditcards){
        state.creditcards = creditcards
    },
    //address-book
    [types.ME_GET_ADDRESSES](state, _addresses){
        state.addresses = _addresses
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
    [types.GLOBAL_GET_COUNTRIES](state, countries){
        state.countries = countries
    },
    [types.GLOBAL_GET_STATES](state, states){
        state.states = states
    },
    [types.GLOBAL_GET_CURRENCIES](state, currencies){
        state.currencies = currencies
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
    [types.ME_ADD_ADDRESS](state, address){
        state.addresses.unshift(address)
    },
    //change-email
    [types.ME_CHANGE_EMAIL](state, email){
        state.me.communicationEmail = email
    },
    //upload-header-img
    [types.ME_HEADER_IMAGE](state, headerImage){
        state.headerImage = headerImage
    },

    //share-to-friend
    [types.ME_SHARE_KEY](state, sharekey){
        state.sharekey = sharekey
    },
    [types.ME_COPY_LINK](state, sharekey){
        state.copylink = sharekey
    },

    //comments
    [types.REVIEW_LOAD_COMMENT](state, comment){
        if (!comment)
            comment = {
                content: '',
                id: null,
                productId: null,
                score: 5,
                sizingRecommendation: '2'
            };

        state.comment = comment;
    },

    [types.REVIEW_SEND_COMMENT](state, comment){
        state.comment = comment;
    },

    [types.REVIEW_SENDING](state, sending){
        state.reviewSending = sending
    },

    //tickets
    [types.GLOBAL_GET_TICKETS](state,tickets){
        state.tickets =  _.cloneDeep(tickets)
    },
    [types.HOME_GET_M1135](state, result){
        const message = result ? result.message : '';
        state.bbmessage = message;
    },
    [types.GLOBAL_GET_TICKET](state,ticket){
        state.ticket =  _.cloneDeep(ticket)
    },
    [types.GLOBAL_GET_TICKET_CON](state,ticket){
        state.ticket_con =  _.cloneDeep(ticket)
    },
    [types.GLOBAL_GET_TICKET_ID](state,ticketid){
        state.ticketid =  ticketid
    },
    [types.ME_SHARE_URL](state,shareurl){
        state.shareurl = shareurl
    },
    [types.GLOBAL_GET_LOGISTICS](state,logistics){
        state.logistics = _.cloneDeep(logistics)
    }
}
const actions = {
    init({commit}){
        return api.get().then(data => data.result).then((me) => {
            commit(types.INIT_ME, me)
            return me
        })
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
    //logout
    logout(){
        return api.logout();
    },
    //order count
    getOrderCountAll({commit}){
        return api.getOrderCountAll().then((count) => {
            commit(types.ME_ORDER_COUNT_ALL, count)
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
    //order
    loadAll({ commit, state }, limit) {

        if (state.allDone) return;

        commit(types.HOME_LOADING_ALL, true);
        api.getOrders({
            skip: state.allSkip,
            api_suffix: 'get-order-list'
        }, (orders) => {
            if (orders && orders.length > 0) {
                commit(types.HOME_ORDERS_ALL, orders);
                commit(types.HOME_ORDER_ALL_SKIP, limit);
            } else {
                commit(types.HOME_ALL_DONE);
            }

            commit(types.HOME_LOADING_ALL, false);

        });
    },
    loadProcessing({ commit, state }, limit) {
        if (state.processingDone) {
            return;
        }
        commit(types.HOME_LOADING_PROCESSING, true);
        api.getOrders({
            skip: state.processingSkip,
            api_suffix: 'get-unshipped-order-list'
        }, (orders) => {
            if (orders && orders.length > 0) {
                commit(types.HOME_ORDERS_PROCESSING, orders);
                commit(types.HOME_ORDER_PROCESSING_SKIP, limit);
            } else {
                commit(types.HOME_PROCESSING_DONE);
            }

            commit(types.HOME_LOADING_PROCESSING, false);

        });
    },


    loadUnpaid({ commit, state }, limit) {
        commit(types.HOME_LOADING_UNPAID, true);
        return api.getOrders({
            skip: state.unpaidSkip,
            api_suffix: 'get-unpayed-order-list'
        }, (orders) => {
            if (orders && orders.length > 0) {
                commit(types.HOME_ORDERS_UNPAID, orders);
                commit(types.HOME_ORDER_UNPAID_SKIP, limit);
                return {finished: false}
            } else {
                return {finished: true}
            }
        });
    },


    loadConfirmed({ commit }, limit) {
        if (state.confirmedDone) {
            return;
        }

        commit(types.HOME_LOADING_CONFIRMED, true);
        api.getOrders({
            skip: state.confirmedSkip,
            api_suffix: 'get-receipt-order-list'
        }, (orders) => {
            if (orders && orders.length > 0) {
                commit(types.HOME_ORDERS_CONFIRMED, orders);
                commit(types.HOME_ORDER_CONFIRMED_SKIP, limit);
            } else {
                commit(types.HOME_CONFIRMED_DONE);
            }

            commit(types.HOME_LOADING_CONFIRMED, false);

        });
    },

    loadShipped({ commit }, limit) {
        if (state.shippedDone) {
            return;
        }
        api.getOrders({
            skip: state.shippedSkip,
            api_suffix: 'get-shipped-order-list'
        }, (orders) => {
            if (orders && orders.length > 0) {
                commit(types.HOME_ORDERS_SHIPPED, orders);
                commit(types.HOME_ORDER_SHIPPED_SKIP, limit);
            } else {
                commit(types.HOME_SHIPPED_DONE);
            }

            commit(types.HOME_LOADING_SHIPPED, false);

        });
    },

    loadCanceled({ commit }, limit) {
        if (state.canceledDone) {
            return;
        }
        commit(types.HOME_LOADING_CANCELED, true);
        api.getOrders({
            skip: state.canceledSkip,
            api_suffix: 'get-canceled-order-list'
        }, (orders) => {
            if (orders && orders.length > 0) {
                commit(types.HOME_ORDERS_CANCELED, orders);
                commit(types.HOME_ORDER_CANCELED_SKIP, limit);
            } else {
                commit(types.HOME_CANCELED_DONE);
            }

            commit(types.HOME_LOADING_CANCELED, false);

        });
    },


    changeTab({ commit }, { tab }) {
        commit(types.HOME_CHANGE_TAB, tab);
        return new Promise(function (resolve) {
            resolve(tab);
        });
    },
    updateStatusInOrders({ commit }, { id, status }) {
        commit(types.HOME_ORDERS_STATUS_UPDATE, {
            id,
            status
        });
    },
    getM1135({commit}){
        api.getM1135().then((reslut) => {
            commit(types.HOME_GET_M1135, reslut)
        })
    },
    getOrderDetail({commit},id){
      commit(types.HOME_ORDER_ID,id)
    },

    getOrder({commit},id){
        return api.getOrder(id).then((order) => {
            commit(types.ME_ORDER_DETAIL, order)
        })
    },
    confirmOrder({commit},id){
        return api.confirmOrder(id)
    },
    cancelOrder({commit},id){
        return api.cancelOrder(id)
    },
    //coupons
    getCoupons({commit}){
        return api.getCoupons().then((coupons) => {
            commit(types.ME_COUPONS,coupons)
        })
    },
    useCoupon(context, couponId){
        return api.useCoupon(couponId)
    },
    //credits
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
    //credits-tips msg
    getMessage({commit},code){
        return api.getMessage(code).then((code) =>{
            commit(types.ME_GET_MESSAGE,code)
        })
    },
    //wishlist
    getWishproducts({commit, state}, skip){
            return api.getWishProducts(state.me.id, skip).then((products) => {
                if (products && products.length) {
                    if (skip === 0){
                        state.wishProducts = [];
                        commit(types.ME_GET_WISH_PRODUCTS, products)
                    }else{
                        commit(types.ME_GET_WISH_PRODUCTS, products)
                    }
                    return {finished:false}
                } else {
                    if (skip === 0) {
                        return {finished: true}
                    }
                    return {finished: true}
                }

            })
    },
    getWishskip({commit}){
        commit(types.ME_GET_WISH_SKIP)
    },
    //remove-wishlist-product
    removeWishProducts(context,data){
        return api.removeWishProducts(data)
    },
    //remove-all-expiredproducts
    removeExpiredProducts({commit}){
        return api.removeExpiredProducts()
    },
    //get-credit-cards
    getCreditCards({commit}){
        return api.getCreditCards().then((creditcards) =>{
            commit(types.ME_GET_CREDITCARDS,creditcards)
        })
    },
    //delete-credit-card
    deleteCreditCard({commit},{cardId}){
        return api.deleteCreditCard(cardId)
    },
    deleteMercadoCard({commit},{cardId}){
        return api.deleteMercadoCard(cardId)
    },
    //address-book
    getAddresses({commit}){
        return new Promise((resolve, reject) => {
            api.getAddresses().then(addresses => {
                commit(types.ME_GET_ADDRESSES, addresses)
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
    deleteAddress({commit}, {id}){
        return api.deleteAddress(id).then(() => {
            commit(types.ME_DELETE_ADDRESS, id)
        })
    },
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
    updateAddress({commit}, data){
        return api.updateAddress(data).then((address) => {
            commit(types.ME_UPDATE_ADDRESS, address)
        })
    },
    addAddress({commit}, address){
        return api.addAddress(address).then((address) => {
            commit(types.ME_ADD_ADDRESS, address)
        })
    },

    //forget-pwd
    forgetPwd({commit, state}){
        return api.forgetPwd(state.me.email)
    },
    changePassword(context, data){
        return api.changePassword(data)
    },

    //change-confirm-email
    changeAccountEmail(context, data){
        return api.changeAccountEmail(data)
    },
    confirmEmail({commit},email){
        return api.confirmEmail(email)
    },
    changeEmail({commit}, data){
        return api.changeEmail(data).then(() => {
            commit(types.ME_CHANGE_EMAIL, data.email)
        })
    },

    //upload-header-img
    setHeaderImage({commit}, formData){
        return api.postHeaderImage(formData)
    },
    postProfile({}, postData){
        return api.postProfile(postData)
    },

    //make-suggestion
    makeSuggestion({commit},formData){
        return  api.makeSuggestion(formData)
    },

    //share-to-friend
    getShareKey({commit},type){
        return api.getShareKey(type).then((sharekey) => {
            if(type && type==="facebook"){
                commit(types.ME_SHARE_KEY, sharekey)
            }else{
                commit(types.ME_COPY_LINK, sharekey)
            }

        })
    },
    sendShareEmail({commit},formData){
        return  api.sendShareEmail(formData)
    },
    shareProduct({commit},pid){
        return api.shareProduct(pid).then((shareurl)=>{
            commit(types.ME_SHARE_URL,shareurl)
        })
    },

    //comments
    loadComment({commit}, {productId}){
        return api.getComment(productId).then((comment) => {
            commit(types.REVIEW_LOAD_COMMENT, comment);
        })
    },
    sendComment({commit},  {reply, files }){
        commit(types.REVIEW_SENDING, true)
        return new Promise((resolve) => {
            let send = api.sendComment
            if(reply.get('id') !== 'null'){
                send = api.updateComment
            }
            send(reply).then((comment) => {
                commit(types.REVIEW_SENDING, false)
                if(files){
                    var file = files[0]
                }
                if(file){
                    var src = window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1 ? window.webkitURL.createObjectURL(file) : window.URL.createObjectURL(file);
                }else{
                    var src =''
                }
                reply.imageUrls = [src]
                resolve(reply)
            }).catch((e) => {
                console.error(e)
                commit(types.REVIEW_SENDING, false)
            });
        });
    },
    getTickets({commit},skip){
        api.getTickets(skip).then((tickets) => {
            commit(types.GLOBAL_GET_TICKETS, tickets)
        })
    },
    getTicket({commit},id){
        api.getTicket(id).then((ticket) => {
            if(ticket){
                commit(types.GLOBAL_GET_TICKET, ticket.order)
                commit(types.GLOBAL_GET_TICKET_CON, ticket.ticket)
                commit(types.GLOBAL_GET_TICKET_ID, ticket.order.id)
            }
        })
    },
    addTicket({commit},formData){
        return api.addTicket(formData)
    },
    getLogistics({commit},id){
        return api.getLogistics(id).then((logistics) => {
            commit(types.GLOBAL_GET_LOGISTICS,logistics)
        })
    }
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})