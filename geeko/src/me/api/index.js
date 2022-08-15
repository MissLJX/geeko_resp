/**
 * Created by shao_ on 2017/8/23.
 */

import axios from '../../api/apiconfigs'
import qs from 'qs'
import * as http_infos from '../../api/http_infos'
import {VPATH} from '../../utils/geekoutils'


export const get = () => {
    return axios.get(VPATH + '/customer/get', {}, {}).then(data => data.result)
}

// c-log中获取用户头上的关注数
export const getFeed = (customerId) => {
    return axios.get(VPATH + '/customer/anon/' + customerId + '/feed-summary', {}, {}).then(data => data.result)
}

/*export const getAllPoints = () => {
    return axios.get('/pointsHistory/0/0/getAll?categoryIds=categoryIds').then(data => data.result)
}*/


export const getShippingDetails = () => {
    return axios.get(VPATH + '/customer/get-shipping-details', {}, {}).then((data) => {
        return data.result
    })
}

export const makeDefaultAddress = (id) => {
    return axios.get(VPATH + '/customer/' + id + '/set-default-shipping-detail')
}

export const getCoupons = () => {
    return axios.get(VPATH + '/coupon/get-coupon-selections').then(data => data.result)
}

// 参数：status（1：已使用，2：已过期）
export const getExpiredCoupons = (skip,status) => {
    return axios.get(VPATH + '/coupon/'+ skip +'/20/history',{status}).then(data => data.result);
}

export const getCredits = (skip) => {
    return axios.get('/pointsHistory/' + skip + '/20/getAll', {}, {}).then((data) => {
        return data.result
    })
}

export const creditcards = getCredits

export const getYouLikeProducts = (skip) => {
    return axios.get('/product/1/'+skip+'/20/show', {}, {});
}

export const getWishlist = () => {
    return axios.get(VPATH + '/wanna-list/show', {}, {}).then((data) => {
        return data.result
    })
}

export const getOrderNotifications = (skip) => {
    return axios.get('/notification/' + skip + '/20/get-order-notifications').then(data => data.result)
}

export const getPromotionNotification = (skip) => {
    return axios.get('/notification/' + skip + '/20/get-promotion-notifications').then(data => data.result)
}

export const getOtherNotification = (skip) => {
    return axios.get('/notification/' + skip + '/20/get-other-notifications').then(data => data.result)
}

export const getActivityNotification = (skip) => {
    return axios.get('/notification/' + skip + '/20//get-activity-notifications').then(data => data.result)
}

export const getActivityNotificationNoRead = (skip) => {
    return axios.get('/notification/no-read-activity-notifications')
}

export const getPromoNotification = (skip) => {
    return axios.get('/notification/' + skip + '/20/get-promotion2-notifications').then(data => data.result)
}
export const getPromoNotificationNoRead = (skip) => {
    return axios.get('/notification/no-read-promotion2-notifications')
}

export const getOthersNotification = (skip) => {
    return axios.get('/notification/' + skip + '/20/get-other2-notifications').then(data => data.result)
}
export const getOthersNotificationNoRead = (skip) => {
    return axios.get('/notification/no-read-other2-notifications')
}
export const getTicketNotification = (skip) => {
    return axios.get('/notification/' + skip + '/20/get-other2-ticket-notifications').then(data => data.result)
}
export const getTicketNotificationNoRead = (skip) => {
    return axios.get('/notification/no-read-other2-ticket-notifications')
}
export const getNewsNotification = (skip) => {
    return axios.get('/notification/'+skip+'/20/get-other2-news-notifications').then(data => data.result)
}
export const getNewsNotificationNoRead = (skip) => {
    return axios.get('/notification/no-read-other2-news-notifications')
}
export const getOrdersNewNotification = (skip) => {
    return axios.get('/notification/'+skip+'/20/get-other2-orders-notifications').then(data => data.result)
}
export const getOrdersNotificationNoRead = (skip) => {
    return axios.get('/notification/no-read-other2-orders-notifications')
}

export const countUnreadNotification = () => {
    return axios.get('/notification/no-read-notifications').then(data => data.result)
}

export const getWishProducts = (customerId, skip) => {
    return axios.get(VPATH + '/wanna-list/anon/' + customerId + '/' + skip + '/20/all-products', {}, {});
}

export const postProfile = (data) => {
    return axios.cpost(VPATH + '/customer/edit', data).then(data => data.result)
}

export const postHeaderImage = (files) => {
    return axios.post(VPATH + '/customer/upload-icon', files, {'Content-Type': http_infos.upload_image_content_type}).then(data => data.result)
}

export const changePassword = (data) => {
    return axios.post(VPATH + '/customer/update-password', qs.stringify(data), {'Content-Type': http_infos.default_post_content_type}).then(data => data.result)
}

export const changeAccountEmail = (data) => {
    return axios.post(VPATH + '/customer/send-change-account-email', qs.stringify(data), {'Content-Type': http_infos.default_post_content_type});
}

export const changeEmail = (data) => {
    return axios.cpost(VPATH + '/customer/change-email', data).then(data => data.result)
}

export const updateAddress = (data) => {
    return axios.cpost('/customer/update-address', data).then(data => data.result)
}

export const deleteAddress = (id) => {
    return axios.cpost('/customer/delete-address', {shippingDetailId: id}).then(data => data.result)
}

export const addAddress = (address) => {
    return axios.cpost(VPATH + '/customer/add-address', address).then(data => data.result)
}

export const changeCurrency = (currency) => {
    return axios.get(VPATH + '/customer/update-currency',{currency}).then(data => data.result)
}


export const getOrderCountProcessing = () => {
    return axios.get(VPATH + '/order/proccessing-orders-count').then(data => data.result)
}

export const getOrderCountShipped = () => {
    return axios.get(VPATH + '/order/shipped-orders-count').then(data => data.result)
}

export const getOrderCountCanceled = () => {
    return axios.get(VPATH + '/order/canceled-orders-count').then(data => data.result)
}

export const getOrderCountReceipt = () => {
    return axios.get(VPATH + '/order/receipt-orders-count').then(data => data.result)
}

export const getOrderCountUnpaid = () => {
  return axios.get(VPATH + '/order/unpaid-orders-count2').then(data => data.result)
}

export const getMessage = (code) => {
    return axios.get('/message/get/'+code).then((data) => {
        return data.result
    })
}

export const getMessage2 = (code) => {
    return axios.get("/message/anon/country-message/"+code).then(data => data.result);
}

// 如果message的结构为Object
// /v9/message/anon/get-object/{code}
export const getMessageToObject = (code) => {
    return axios.get(VPATH + "/message/anon/get-object/"+code).then(data => data.result);
}

// 如果message的结构为数组
// /v9/message/anon/get-list/{code}
export const getMessageToArray = (code) => {
    return axios.get(VPATH + "/message/anon/get-list/"+code).then(data => data.result);
}

export const getCreditCards = () => {
    return axios.get('/quickpay-record/history').then(data => data.result)
}

export const getMercadoCreditCards = () => {
    return axios.get('/mercadopago/get-cards').then(data => data.result)
}

export const deleteCreditCard = (cardId) => axios.get('/quickpay-record/'+cardId+'/remove')

export const deleteMercadoCard = (cardId) => axios.get('/mercadopago/remove-card?token='+cardId)

export const removeExpiredProducts = () => axios.get(VPATH + '/wanna-list/clear-products')

export const removeWishProducts = (data) => {
    return axios.post(VPATH + '/wanna-list/remove-products', qs.stringify(data), {'Content-Type': http_infos.default_post_content_type}).then(data => data.result)
}
export const confirmEmail = (email) => {
    return axios.cpost(VPATH + '/customer/send-confirm-email',{email:email})
}

// track order
// http://localhost:8080/wanna/v9/tracking/get-packages?skip=0&limit=20
export const getTrackOrderMessage = (skip) => {
    return axios.get(VPATH + '/tracking/get-packages',{skip,limit:"20"}).then((data) => data.result)
}

export const generalUploadImage = (imageFile) =>{
    return axios.post('/context/upload',imageFile,{'Content-Type': http_infos.default_post_content_type});
}


// 获取所有积分历史记录
// 接口：/points-history-record/{skip}/{limit}/get-all
export const getPointsAll = (skip) => {
    return axios.get('/points-history-record/' + skip + '/20/get-all', {}, {}).then((data) => {
        return data.result
    })
}

// 获取所得积分历史记录
// 接口：/points-history-record/{skip}/{limit}/get-recived
export const getPointsRecived = (skip) => {
    return axios.get('/points-history-record/' + skip + '/20/get-recived', {}, {}).then((data) => {
        return data.result
    })
}

// 获取使用积分历史记录
// 接口：/points-history-record/{skip}/{limit}/get-used
export const getPointsUsed = (skip) => {
    return axios.get('/points-history-record/' + skip + '/20/get-used', {}, {}).then((data) => {
        return data.result
    })
}

// 获取过期积分历史记录
// 接口：/points-history-record/{skip}/{limit}/get-expired
export const getPointsExpired = (skip) => {
    return axios.get('/points-history-record/' + skip + '/20/get-expired', {}, {}).then((data) => {
        return data.result
    })
}

// 获取当前用户积分信息
// 接口：/points-history-record/{skip}/{limit}/get-points
export const getCustomerPointsNum = () => {
    return axios.get('/points-history-record/get-points', {}, {}).then((data) => {
        return data.result
    })
}


// 获取积分页面产品列表的接口
// groupNo  0
// menuId   APP0010
// product/anon/{skip}/{limit}/{groupNo}/{menuId}/list-by-menu
export const getPointsProductList = (skip) => {
    return axios.get(VPATH+"/product/anon/"+ skip+"/20/0/APP0010/list-by-menu",{},{});
}

//make-suggestion
export const makeSuggestion = (files) => {
    return axios.post('/ticket/add', files, {'Content-Type': http_infos.upload_image_content_type});
}

// get cart product num
export const getShoppingCartNum = () => {
    return axios.get(VPATH + "/shopping-cart/count-products",{},{}).then(data => data.result);
}

export const updateCustomerSave = (customer) => {
    return axios.post(VPATH + "/customer/save",customer,{});
}

export const surveySave = (params) => {
    return axios.cpost('/questionnaire-answer/anon/save',params,{}).then(data => data);
}

export const surveyGet = () => {
    return axios.get('/questionnaire-answer/anon/get',{},{}).then(data => data)
}

// /context/anon/get-currency-list
export const getCurrencyList =() => {
    return axios.get("/context/anon/get-currency-list",{},{}).then(data => data.result);
}

// https://www.chicme.xyz/L/1F4Q3Z7A81P7G8G3w3D5m9a4w/product/0/20/29b78253-be62-483a-9852-cbd23d5e7bf1/scp-show2
// 通过productId获取相似产品
export const getRelationProducts = ({productId,skip}) => {
    return axios.get(`/product/${skip}/20/${productId}/scp-show2`);
}
// 获取是否存在未评论的订单
export const getNoCommentOrder = () => {
    // console.log('api 请求')
    return axios.get("/v9/order/exists-order-without-comment",{},{}).then(data => data)
}

// 获取用户历史积分获得情况
export const getPointsHistory = (start,end) => {
    return axios.get("/v9/luck-draw/"+start+"/"+end+"/history")
}

// survey 获取问题配置
export const getSurveyQuestions = (config) => {
    return axios.get('/message/anon/get-list/'+config,{},{}).then(data => data)
}

// 获取积分产品列表
export const getPointsMallProduct = ({skip, collectionId}) => {
    return axios.get(VPATH+"/product/"+ skip+"/20/"+collectionId+"/c/show",{},{}).then(data => data)
}

// 获取积分商城collection列表
export const getPointsMallCollectionId = () => {
    return axios.get(VPATH+'/collection/anon/get-points-mall-collections',{},{}).then(data => data)
}

// 获取积分商城优惠券列表
export const getPointsCouponList = () => {
    return axios.get(`/points-exchange-coupon/get-list?_=${new Date().getTime()}`,{},{}).then(data => data)
}

// 积分商城优惠券兑换
export const pointsCouponExchange = (id) => {
    return axios.post('/points-exchange-coupon/exchange',qs.stringify({id}),{}).then(data => data)
}

// 获取积分商城go shopping的collection id
export const getPointsGoShoppingId = () => {
    return axios.get('/message/get/M1586',{},{}).then(data=>data);
}

// 积分兑换优惠券通过后台系统参数 0336-w 是否显示
export const getShowRedeemCoupons = () =>{
    return axios.get('/context/show-coupon-points-rule-list',{},{});
}

export const getUserVipData = () =>{
    return axios.get(`${VPATH}/customer/vip-show`,{},{});
}

export const redeemFreeShipping = (path) =>{
    return axios.get(path,{},{});
}

// vip 开关接口：/context/show-vip
export const getWhetherShowVip = () =>{
    return axios.get(`/context/show-vip`,{},{});
}

export const getCashHistoryRecord = ({skip, limit, path}) =>{
    return axios.get(`/cash-history-record/${skip}/${limit}/${path}`, {}, {})
}
// 
export const getCashWallet = () =>{
    return axios.get(`/wallet/get-cash`, {}, {})
}