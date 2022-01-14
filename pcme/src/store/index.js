import Vue from 'vue'
import Vuex from 'vuex'
import * as api from "../api";
import * as types from "./mutation_types";
import _ from 'lodash'
import axios from '../api/apiconfigs'

import point from "./module/point/index.js";
import * as utils from "../utils/geekoutil.js"

Vue.use(Vuex)

const state = {
    me:'',

    orderCountAll: 0,
    orderCountProcessing: 0,
    orderCountShipped: 0,
    orderCountReceipt: 0,
    orderCountCanceled: 0,
    orderCountUnpaid: 0,
    orderCountPaid: 0,
    orderCountHistory: 0,

    all: [],
    orderdetail:{},
    processing: [],
    shipped: [],
    confirmed: [],
    canceled: [],
    unpaid: [],
    paid:[],
    history:[],

    allLoading: false,
    processingLoading: false,
    shippedLoading: false,
    confirmedLoading: false,
    canceledLoading: false,
    unpaidLoading: false,
    paidLoading: false,
    historyLoading: false,

    tab: 'all',
    allSkip: 0,
    processingSkip: 0,
    confirmedSkip: 0,
    canceledSkip: 0,
    shippedSkip: 0,
    unpaidSkip: 0,
    paidSkip:0,
    historySkip:0,

    allDone: false,
    processingDone: false,
    confirmedDone: false,
    canceledDone: false,
    shippedDone: false,
    unpaidDone: false,
    paidDone: false,
    historyDone: false,

    bbmessage: null,
    orderid:'',

    coupons:'',
    message:'',
    credits:[],
    wishProducts: [],
    wishskip: 0,
    creditcards:[],
    mercadocreditcards:[],
    addresses: [],

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
    ticket_sub:[],
    ticketid:'',
    shareurl:'',
    logistics:[],
    packagelogistics:[],
    cancelReasons:[],

    orderNotifications: [],
    promotionNotifications: [],
    otherNotifications: [],
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
    wannalistNum:0,
    returnLabelPdf:null,

    logisticsCompanies:null,

    returnLogistics:null,
    feed:null,
    paging: false,
    initialized:false,
    youlikeProducts:[],
    youlikeskip:0,
    messageM1521:null,
    orderStatus:0,
    
    survey: {},

    questionType: [],

    dobulePoints:null,

    showTip: false,
    tipContent: '',
    tipType: 'no-points', // points

    oftenBoughtWithList: [],
    reviewOrderList: [],
};
const getters = {
    me: state => state.me,

    orderCountAll: state => state.orderCountAll,
    orderCountProcessing: state => state.orderCountProcessing,
    orderCountShipped: state => state.orderCountShipped,
    orderCountReceipt: state => state.orderCountReceipt,
    orderCountCanceled: state => state.orderCountCanceled,
    orderCountUnpaid: state => state.orderCountUnpaid,
    orderCountPaid: state => state.orderCountPaid,

    all: state => state.all,
    orderdetail:state => state.orderdetail,
    processing: state => state.processing,
    shipped: state => state.shipped,
    confirmed: state => state.confirmed,
    canceled: state => state.canceled,
    unpaid: state => state.unpaid,
    paid: state => state.paid,

    allLoading: state => state.allLoading,
    processingLoading: state => state.processingLoading,
    confirmedLoading: state => state.confirmedLoading,
    canceledLoading: state => state.canceledLoading,
    shippedLoading: state => state.shippedLoading,
    unpaidLoading: state => state.unpaidLoading,
    paidLoading: state => state.paidLoading,

    tab: state => state.tab,
    allSkip: state => state.allSkip,
    processingSkip: state => state.processingSkip,
    confirmedSkip: state => state.confirmedSkip,
    canceledSkip: state => state.canceledSkip,
    shippedSkip: state => state.shippedSkip,
    unpaidSkip: state => state.unpaidSkip,
    paidSkip: state => state.paidSkip,

    allDone: state => state.allDone,
    processingDone: state => state.processingDone,
    confirmedDone: state => state.confirmedDone,
    canceledDone: state => state.canceledDone,
    shippedDone: state => state.shippedDone,
    unpaidDone: state => state.unpaidDone,
    paidDone: state => state.paidDone,
    historyDone: state => state.historyDone,

    bbmessage: state => state.bbmessage,
    orderid: state => state.orderid,

    coupons: state => state.coupons,
    message: state => state.message,
    credits: credits => state.credits,
    wishProducts: state => state.wishProducts,
    wishskip: state => state.wishskip,
    creditcards: state =>state.creditcards,
    mercadocreditcards: state =>state.mercadocreditcards,
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
    ticket_sub: state => state.ticket_sub,
    ticketid:state => state.ticketid,
    shareurl:state => state.shareurl,
    logistics: state => state.logistics,
    packagelogistics: state => state.packagelogistics,

    cancelReasons:state => state.cancelReasons,

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
    orderNotifications: state => state.orderNotifications,
    promotionNotifications: state => state.promotionNotifications,
    otherNotifications: state => state.otherNotifications,
    wannalistNum: state => state.wannalistNum,
    returnLabelPdf:state => state.returnLabelPdf,

    logisticsCompanies:state => state.logisticsCompanies,

    returnLogistics: state => state.returnLogistics,
    feed:state => state.feed,
    paging:state => state.paging,
    initialized:state => state.initialized,

    youlikeProducts:state => state.youlikeProducts,
    youlikeskip:state => state.youlikeskip,
    messageM1521:state => state.messageM1521,
    orderStatus:state => state.orderStatus,
    
    survey: state => state.survey,
    questionType: state => state.questionType,
    dobulePoints:state => state.dobulePoints,

    showTip: state => state.showTip,
    tipContent: state => state.tipContent,
    tipType: state => state.tipType,

    oftenBoughtWithList: state => state.oftenBoughtWithList,
    reviewOrderList: state => state.reviewOrderList,
};
const mutations = {
    [types.INIT_ME](state, me){
        state.me = me
    },
    [types.ME_GET](state, _me){
        state.me = _me;
        state.headerImage = utils.imageutil.getHeaderImg(_me.id);
    },
    [types.ME_INITIALIZED](state){
        state.initialized = true
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
    [types.ME_ORDER_COUNT_PAID](state, count){
        state.orderCountPaid = count
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

    [types.HOME_ORDERS_HISTORY](state, orders) {
        state.history.push(...orders);
    },
    [types.HOME_LOADING_HISTORY](state, loading) {
        state.historyLoading = loading;
    },
    [types.HOME_ORDERS_HISTORY_SKIP](state, limit) {
        state.historySkip += limit;
    },
    [types.HOME_HISTORY_DONE](state) {
        state.historyDone = true;
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

    [types.HOME_ORDERS_PAID](state, orders) {
        state.paid.push(...orders);
    },
    [types.HOME_LOADING_PAID](state, loading) {
        state.paidLoading = loading;
    },
    [types.HOME_ORDER_PAID_SKIP](state, limit) {
        state.paidSkip += limit;
    },
    [types.HOME_PAID_DONE](state) {
        state.paidDone = true;
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
    [types.ME_GET_MERCADOCREDITCARDS](state,mercadocreditcards){
        state.mercadocreditcards = mercadocreditcards
    },
    //address-book
    [types.ME_GET_ADDRESSES](state, _addresses){
        if(_addresses){
            state.addresses = _addresses
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
        state.addresses.forEach(item => {
            if(item && item.isDefaultAddress){
                item.isDefaultAddress = false;
            }
        });
        state.addresses.unshift(address)
    },
    //cancel-order-reasons
    [types.GLOBAL_CANCEL_REASONS](state,cancelReasons){
        state.cancelReasons = cancelReasons
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
        // console.log(ticket)
        state.ticket_con =  _.cloneDeep(ticket)
    },
    [types.GLOBAL_GET_TICKET_ID](state,ticketid){
        state.ticketid =  ticketid
    },
    [types.GLOBAL_GET_TICKET_SUB](state,ticket_sub){
        state.ticket_sub =  _.cloneDeep(ticket_sub)
    },
    [types.ME_SHARE_URL](state,shareurl){
        state.shareurl = shareurl
    },
    [types.GLOBAL_GET_LOGISTICS](state,logistics){
        state.logistics = _.cloneDeep(logistics)
    },
    [types.GLOBAL_GET_PACKAGE_LOGISTICS](state,logistics){
        state.packagelogistics = _.cloneDeep(logistics)
    },
    //notification
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
    [types.ME_GET_FEED_SUMMARY](state,wannalistNum){
        state.wannalistNum = wannalistNum
    },
    [types.GLOBAL_GET_RETURNLABEL](state,returnLabelPdf){
        state.returnLabelPdf = returnLabelPdf
    },
    [types.LOGISTICS_COMPANIES](state,logisticsCompanies){
        state.logisticsCompanies = logisticsCompanies;
    },
    [types.GET_RETURN_LOGISTICS](state,returnLogistics){
        state.returnLogistics = returnLogistics;
    },
    [types.ME_GET_FEED_SUMMARYRY_ALL_DATA](state,_feed){
        state.feed = _feed;
    },
    [types.GLOBAL_PAGING](state, paging){
        state.paging = paging
    },
    [types.GET_INDEX_YOU_MAY_ALSO_LIKES_PRODUCTS](state,products){
        state.youlikeProducts = _.concat(state.youlikeProducts,products);
    },
    [types.GET_INDEX_YOU_MAY_ALSO_LIKES_PRODUCTS_SKIP](state){
        state.youlikeskip += 20;
    },
    [types.CHANGE_GET_ME_DATA](state,customer){
        console.log("customer",customer)
        let name = customer.name;
        let changeValue = customer.customer[name];
        state.me[name] = _.cloneDeep(changeValue);
    },
    [types.GET_MY_PREFERENCES_MESSAGE_CODE](state,message){
        state.messageM1521 = message;
    },
    [types.CHANGE_ORDER_ACTIVE_STATUS](state,status){
        state.orderStatus = status;
    },
    [types.GET_SURVEY_ANSWER](state, obj){
      state.survey = obj
    },
    [types.GET_QUESTION_TYPE](state, list){
        state.questionType = list
    },
    [types.GET_DOBULE_POINTS_DATA](state,points){
        state.dobulePoints = points;
    },
    [types.GET_SHOW_TIP](state, flag){
        state.showTip = flag
    },
    [types.GET_TIP_CONTENT](state, content){
        state.tipContent = content
    },
    [types.GET_TIP_TYPE](state, type){
        state.tipType = type == 'points'?'points':'no-points';
    },
    [types.GET_OFTEN_BOUGHT_WITH_LIST](state, list){
        state.oftenBoughtWithList = list
    },
    [types.GET_REVIEW_ORDER](state, list){
        state.reviewOrderList = list
    }
}
const actions = {
    // init({commit}){
    //     return api.get().then(data => data.result).then((me) => {
    //         commit(types.INIT_ME, me)
    //         return me
    //     })
    // },
    init({dispatch, commit, state}){
        if (!state.initialized) {
            return Promise.all([
                dispatch('getMe'),
            ]).then(([me]) => {
                commit(types.ME_GET, me)
                return me
            }).then((me) => {
                return dispatch('getFeedSummary', me.id)
            }).then((feed) => {
                commit(types.ME_GET_FEED_SUMMARYRY_ALL_DATA, feed)
                commit(types.ME_INITIALIZED)
            }).catch((e) => {
                console.log("e",e);
            });
        }
    },
    getMe({commit}){
        return new Promise((resolve, reject) => {
            api.get().then(me => {
                commit(types.ME_GET, me)
                resolve(me)
            }).catch(e => {
                window.location.href = "/i/login";
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
    getOrderCountPaid({commit}){
        return api.getOrderCountPaid().then((count) => {
            commit(types.ME_ORDER_COUNT_PAID, count)
        })
    },
    loadHistory({commit,state}, limit){
        if(state.historyDone){
            return
        }
        commit(types.HOME_LOADING_HISTORY,true);
        return api.getHistoryOrder(state.historySkip).then(orders => {
            let list = orders.result?order.result:[];
            if(list && list.length > 0){
                commit(types.HOME_ORDERS_HISTORY,list);
                commit(types.HOME_ORDERS_HISTORY_SKIP,limit);
            } else {
                commit(types.HOME_ORDERS_HISTORY,[]);
                commit(types.HOME_HISTORY_DONE);
            }
            commit(types.HOME_LOADING_HISTORY, false);
            return list
        })
    },
    //order
    loadAll({ commit, state }, limit) {
        if (state.allDone) return;
        commit(types.HOME_LOADING_ALL, true);

        return api.getOrders(state.allSkip, 'get-orders2').then( orders => {
            if (orders && orders.length > 0) {
                commit(types.HOME_ORDERS_ALL, orders);
                commit(types.HOME_ORDER_ALL_SKIP, limit);
            } else {
                commit(types.HOME_ALL_DONE);
            }

            commit(types.HOME_LOADING_ALL, false);

            return orders
        } );
    },
    loadProcessing({ commit, state }, limit) {
        if (state.processingDone) {
            return;
        }
        commit(types.HOME_LOADING_PROCESSING, true);

        return api.getOrders(state.processingSkip, 'get-proccessing-orders').then( orders => {
            if (orders && orders.length > 0) {
                commit(types.HOME_ORDERS_PROCESSING, orders);
                commit(types.HOME_ORDER_PROCESSING_SKIP, limit);
            } else {
                commit(types.HOME_PROCESSING_DONE);
            }

            commit(types.HOME_LOADING_PROCESSING, false);
            return orders
        });
    },


    loadUnpaid({ commit, state }, limit) {
        commit(types.HOME_LOADING_UNPAID, true);
        if(state.unpaidDone){return}
         return api.getOrders(state.unpaidSkip, 'get-unpaid-orders2').then( orders => {
            if (orders && orders.length > 0) {
                commit(types.HOME_ORDERS_UNPAID, orders);
                commit(types.HOME_ORDER_UNPAID_SKIP, limit);
            } else {
                commit(types.HOME_UNPAID_DONE);
            }
             return orders
        });
    },

    loadPaid({ commit, state }, limit) {
        commit(types.HOME_LOADING_PAID, true);
        if(state.paidDone){return}
        return api.getOrders(state.paidSkip, 'get-paid-orders').then( orders => {
            if (orders && orders.length > 0) {
                commit(types.HOME_ORDERS_PAID, orders);
                commit(types.HOME_ORDER_PAID_SKIP, limit);
            } else {
                commit(types.HOME_PAID_DONE);
            }
            return orders
        });
    },


    loadConfirmed({ commit }, limit) {
        if (state.confirmedDone) {
            return;
        }
        commit(types.HOME_LOADING_CONFIRMED, true);
        return api.getOrders(state.confirmedSkip, 'get-receipt-orders').then( orders => {
            if (orders && orders.length > 0) {
                commit(types.HOME_ORDERS_CONFIRMED, orders);
                commit(types.HOME_ORDER_CONFIRMED_SKIP, limit);
            } else {
                commit(types.HOME_CONFIRMED_DONE);
            }

            commit(types.HOME_LOADING_CONFIRMED, false);
            return orders
        });
    },

    loadShipped({ commit }, limit) {
        if (state.shippedDone) {
            return;
        }
        return api.getOrders(state.shippedSkip, 'get-shipped-orders').then( orders => {
            if (orders && orders.length > 0) {
                commit(types.HOME_ORDERS_SHIPPED, orders);
                commit(types.HOME_ORDER_SHIPPED_SKIP, limit);
            } else {
                commit(types.HOME_SHIPPED_DONE);
            }

            commit(types.HOME_LOADING_SHIPPED, false);
            return orders
        });
    },

    loadCanceled({ commit }, limit) {
        if (state.canceledDone) {
            return;
        }
        commit(types.HOME_LOADING_CANCELED, true);
        return api.getOrders(state.canceledSkip, 'get-canceled-orders').then( orders => {
            if (orders && orders.length > 0) {
                commit(types.HOME_ORDERS_CANCELED, orders);
                commit(types.HOME_ORDER_CANCELED_SKIP, limit);
            } else {
                commit(types.HOME_CANCELED_DONE);
            }

            commit(types.HOME_LOADING_CANCELED, false);
            return orders
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
        return new Promise((reslove,reject) => {
            api.getOrder({orderId:id}).then((order) => {
                commit(types.ME_ORDER_DETAIL, order)
                reslove(order);
            })
        });
    },
    getOrderByCode({commit},id){
        return api.getOrderByCode({code:id}).then((order) => {
            commit(types.ME_ORDER_DETAIL, order)
        })
    },
    confirmOrder({commit},id){
        return api.confirmOrder(id)
    },
    cancelOrder({commit},{id,reason}){
        return api.cancelOrder(id,reason)
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
    getMercadoCreditCards({commit}){
        return api.getMercadoCreditCards().then((mercadocreditcards) =>{
            commit(types.ME_GET_MERCADOCREDITCARDS,mercadocreditcards)
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
    getCancelOrderReason({commit}){
        api.getCancelOrderReason().then((reasons)=>{
            commit(types.GLOBAL_CANCEL_REASONS,reasons)
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

    setHeaderImage2({commit},imageUrl){
        commit(types.ME_HEADER_IMAGE,imageUrl);
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
    loadComment({commit}, productId){
        return api.getComment(productId).then((comment) => {
            commit(types.REVIEW_LOAD_COMMENT, comment);
        })
    },
    sendComment({commit},  {reply }){
        commit(types.REVIEW_SENDING, true)
        return new Promise((resolve) => {
            let send = api.sendComment
            if(!!reply.get('id') && reply.get('id') !== null){
                send = api.updateComment
            }
            send(reply).then((comment) => {
                commit(types.REVIEW_SENDING, false)
                resolve(comment)
            }).catch((e) => {
                console.error(e)
                commit(types.REVIEW_SENDING, false)
            });
        });
    },
    addReturnLogistics({commit} , logistics){
        return new Promise((reslove,reject) => {
            api.addReturnLogistics(logistics).then(message => {
                console.log("message",message);
                reslove(message);
            });
        });
    },
    getLogisticsCompanies({commit}){
        return new Promise((reslove,reject) => {
            api.getLogisticsCompanies().then((data) => {
                commit(types.LOGISTICS_COMPANIES,data.result);
            });
        });
    },
    getReturnLogistics({commit},orderId){
        return new Promise((reslove,reject) => {
            api.getReturnLogistics(orderId).then((data) => {
                let result = data.result;
                if(!!result && result != null && result.length > 0 && result.length < 2){
                    commit(types.GET_RETURN_LOGISTICS,result);
                }else if(!!result && result != null && result.length > 1){
                    result.splice(0,result.length - 1);
                    commit(types.GET_RETURN_LOGISTICS,result);
                }
                reslove(result);
            });
        });
    },
    getTickets({commit},params){
        api.getTickets(params.skip,params.state).then((tickets) => {
            commit(types.GLOBAL_GET_TICKETS, tickets)
        })
    },
    clearTickets({commit},id){
        console.log('ss')
        commit(types.GLOBAL_GET_TICKETS, [])
    },
    getTicket({commit},id){
        api.getTicket(id).then((ticket) => {
            if(ticket){
                // console.log(ticket)
                commit(types.GLOBAL_GET_TICKET, ticket.order?ticket.order:{})
                commit(types.GLOBAL_GET_TICKET_CON, ticket.ticket?ticket.ticket:{})
                commit(types.GLOBAL_GET_TICKET_ID, ticket.order?ticket.order.id:(ticket.ticket?ticket.ticket.operaId:''))
                commit(types.GLOBAL_GET_TICKET_SUB, ticket.subjectSelections)
            }
        })
    },
    getTicketByTicketId({commit},id){
        api.getTicketByTicketId(id).then((ticket) => {
            if(ticket){
                //  console.log(ticket.order?ticket.order.id:(ticket.ticket?ticket.ticket.operaId:''))
                commit(types.GLOBAL_GET_TICKET, ticket.order?ticket.order:{})
                commit(types.GLOBAL_GET_TICKET_CON, ticket.ticket?ticket.ticket:{})
                commit(types.GLOBAL_GET_TICKET_ID, ticket.order?ticket.order.id:(ticket.ticket?ticket.ticket.operaId:''))
                commit(types.GLOBAL_GET_TICKET_SUB, ticket.subjectSelections)
            }
        })
    },
    getTicketByCode({commit},code){
        api.getTicketByCode(code).then((ticket) => {
            if(ticket){
                // console.log(ticket)
                commit(types.GLOBAL_GET_TICKET, ticket.order?ticket.order:{})
                commit(types.GLOBAL_GET_TICKET_CON, ticket.ticket?ticket.ticket:{})
                commit(types.GLOBAL_GET_TICKET_ID, ticket.order?ticket.order.id:(ticket.ticket?ticket.ticket.operaId:''))
                commit(types.GLOBAL_GET_TICKET_SUB, ticket.subjectSelections)
            }
        })
    },
    clearTicket({commit},id){
        commit(types.GLOBAL_GET_TICKET, {})
        commit(types.GLOBAL_GET_TICKET_CON, {})
        commit(types.GLOBAL_GET_TICKET_ID, '')
        commit(types.GLOBAL_GET_TICKET_SUB, '')
    },
    addTicket({commit},formData){
        return api.addTicket(formData)
    },
    getLogistics({commit},id){
        return api.getLogistics(id).then((logistics) => {
            commit(types.GLOBAL_GET_LOGISTICS,logistics)
        })
    },
    getPackageLogistics({commit},{type,packageId}){
        return api.getPackageLogistics(type,packageId).then((logistics) => {
            commit(types.GLOBAL_GET_PACKAGE_LOGISTICS,logistics)
        })
    },
    rate({commit},formData){
        return axios.post('/ticket/rate-service', formData)
    },
    //Add To Cart
    addProducts({commit},formData){
        return  api.addProducts(formData)
    },

    //notification
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
    getFeedSummary({commit, state}){
        return api.getFeedSummary(state.me.id).then((userinfo) => {
            if(userinfo) {
                commit(types.ME_GET_FEED_SUMMARY, userinfo.wannaListNum);
                commit(types.ME_GET_FEED_SUMMARYRY_ALL_DATA, userinfo)
            }
            return userinfo;
        })
    },
    //getReturnLabel
    getReturnLabel({commit},id){
        return api.getReturnLabel(id).then((returnLabelPdf) => {
            commit(types.GLOBAL_GET_RETURNLABEL,returnLabelPdf)
        })
    },

    // 上传图片通用接口
    generalUploadImage({commit},{formData}){
        return new Promise((reslove,reject) => {
            api.generalUploadImage(formData).then((data) => {
                reslove(data.result);
            });
        });
    },
    paging({commit}, {paging}){
        commit(types.GLOBAL_PAGING, paging)
    },
    getYouLikeProducts({commit},{skip}){
        return api.getYouLikeProducts(skip).then((result) => {
            if(result && result.length > 0){
                commit(types.GET_INDEX_YOU_MAY_ALSO_LIKES_PRODUCTS,result);
                return {finished:false,empty:true}
            }else{
                return {finished:true,empty:false};
            }
        });
    },
    getYouLikeProductsSkip({commit}){
        commit(types.GET_INDEX_YOU_MAY_ALSO_LIKES_PRODUCTS_SKIP);
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

                if(customer.name === 'name'){
                    commit(types.CHANGE_GET_ME_DATA,{name:"nickname",customer:{nickname:customer.customer.nickname}});
                }
                commit(types.CHANGE_GET_ME_DATA,customer);
            });
        });
    },
    getMyPreferenceMessageCode({commit},code){
        return api.getMessageToObject(code).then(result => {
            commit(types.GET_MY_PREFERENCES_MESSAGE_CODE,result);
        });
    },
    changeOrderStatus({commit},status){
        commit(types.CHANGE_ORDER_ACTIVE_STATUS,status);
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
      getQuestionType({commit}, params){
          return new Promise((reslove, reject) => {
              api.getQuestionType(params).then(res => {
                  reslove(res);
                  commit(types.GET_QUESTION_TYPE, res.result? res.result : [])
              })
          })
      },
      getDobulePointsData({commit},code){
        return api.getMessageToObject(code).then(result => {
            result && commit(types.GET_DOBULE_POINTS_DATA,result);
        });
      },
      setShowTip({commit}, flag){
         commit(types.GET_SHOW_TIP, flag);
      },
      setTipContent({commit}, content){
         commit(types.GET_TIP_CONTENT, content);
      },
      setTipType({commit}, type){
          commit(types.GET_TIP_TYPE, type);
      },
      getOftenBoughtWithList({commit}, {id}){
          return api.getOftenBoughtWith(id).then(res => {
              res && res.code==200 && commit(types.GET_OFTEN_BOUGHT_WITH_LIST, res.result)
          })
      },
      getReviewOrder({commit}){
          return api.getReviewOrder().then(res => {
                console.log(res)
                res && commit(types.GET_REVIEW_ORDER, res.result)
          })
      }
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules:{
        point
    }
})