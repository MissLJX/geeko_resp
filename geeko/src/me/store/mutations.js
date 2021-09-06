import * as types from './mutation_types'
import * as utils from '../../utils/geekoutils'
import _ from 'lodash'

const mutations = {
    [types.ME_GET](state, _me){
        state.me = _me
        state.headerImage = utils.IMAGE_PREFIX + '/icon/' + _me.id
    },
    [types.ME_GET_NO_LOGIN](state,flag){
        state.isLogin = flag;
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
        state.addresses.forEach(item => {
            if(item && item.isDefaultAddress){
                item.isDefaultAddress = false;
            }
        });
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
    [types.Me_GET_MERCADOCREDITCARDS](state,mercadocreditcards){
        state.mercadocreditcards = mercadocreditcards
    },
    [types.ME_DEL_CREDIT_CARD](state,id){
        state.id = id
    },
    [types.ME_DEL_MERCADO_CARD](state,id){
        state.id = id
    },
    [types.ME_REMOVE_EXPIRED_PRODUCTS](state){

    },
    [types.ME_GET_TRACK_ORDER_MESSAGE](state,track){
        state.trackOrder = _.concat(state.trackOrder,track)
    },
    [types.ME_TRACK_ORDER_SKIP](state){
        state.trackOrderSkip += 20;
    },
    [types.ME_GET_EXPIRED_COUPONS](state,expiredCoupons){
        state.expiredCoupons = _.concat(state.expiredCoupons,expiredCoupons);
    },
    [types.ME_GET_EXPIRED_COUPONS_SKIP](state){
        state.expiredCouponsSkip += 20;
    },
    [types.CHANGE_GET_ME_DATA](state,customer){
        let name = customer.name;
        let changeValue = customer.customer[name];
        state.me[name] = _.cloneDeep(changeValue);
    },
    [types.GET_ME_CURRENCY_LIST](state,currency){
        state.currencyList = _.concat(state.currencyList,currency);
    },
    [types.GET_SHOPPING_CART_NUM](state,num){
        state.shoppingCartCount = num;
    },
    [types.GET_INDEX_MESSAGE_CODE_LOGIN](state,message){
        state.messageM1518 = message;
    },
    [types.GET_MY_PREFERENCES_MESSAGE_CODE](state,message){
        state.messageM1521 = message;
    },
    [types.GET_RELATION_PRODUCTS](state,products){
        state.relationProducts = _.concat(state.relationProducts,products);
    },
    [types.GET_RELATION_PRODUCTS_SKIP](state){
        state.relationProductsSkip += 20;
    }
}

export default mutations;