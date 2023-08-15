import axios from './apiconfigs'
import qs from 'qs'
const VPATH = '/v9'
const NVPATH = '/v9'
import * as http_infos from "./http_infos";

export const get = () => {
    return axios.get(VPATH + '/customer/get', {_: new Date().getTime()}, {}).then(data => data.result).catch(err => console.log(err))
}
//logout
export function logout(){
    return axios.get(VPATH + '/login-customer/logout')
}
//读取count
export const getOrderCountAll = () => {
    return axios.get(NVPATH + '/order/orders-count2').then(data => data.result)
}
export const getOrderCountProcessing = () => {
    return axios.get(NVPATH + '/order/proccessing-orders-count').then(data => data.result)
}

export const getOrderCountShipped = () => {
    return axios.get(NVPATH + '/order/shipped-orders-count').then(data => data.result)
}

export const getOrderCountCanceled = () => {
    return axios.get(NVPATH + '/order/canceled-orders-count').then(data => data.result)
}
export const getOrderCountReceipt = () => {
    return axios.get(NVPATH + '/order/receipt-orders-count').then(data => data.result)
}
export const getOrderCountUnpaid = () => {
    return axios.get(NVPATH + '/order/unpaid-orders-count2').then(data => data.result)
}
export const getOrderCountPaid = () => {
    return axios.get(NVPATH + '/order/paid-orders-count').then(data => data.result)
}
export const getOrderCountReturns = () => {
    return axios.get('/return-order/count').then(data => data.result)
}
//orders
export const getOrder = (id) => {
    return axios.cpost(NVPATH + '/order/get-order-details',id).then(data => data.result)
}
export const getOrderByCode = (id) => {
    return axios.cpost(NVPATH + '/order/anon/get-order-details-by-code',id).then(data => data.result)
}
export const getOrders =(skip, api_suffix) => {
    return axios.get(`${NVPATH}/order/${skip}/20/${api_suffix}`).then(data => data.result)
}
export const getReturns = (skip) => {
    return axios.get(`/return-order/${skip}/20/get-return-orders`).then(data => data.result)
}
export const confirmOrder = (id) =>{
    return axios.get(VPATH+'/order/'+id+'/receipt')
}
export const cancelOrder = (id,reason) =>{
    return axios.get(VPATH+'/order/cancel',{orderId:id,cancelReason:reason})
}
//coupons
export const getCoupons = () => {
    return axios.get(VPATH + '/coupon/get-coupon-selections').then(data => data.result)
}
export const getWalletCoupons = (headers) => {
    return axios.get(`/wallet/get-coupons`, {}, headers).then(data => data.result)
}
export function useCoupon(id) {
    return axios.get(VPATH + '/shopping-cart/anon/use-coupon/' + id).then(data => data.result)
}
export const getCouponsHistory = ({state, skip, limit}) => {
    return axios.get(VPATH + `/coupon/${skip}/${limit}/history?status=${state}`)
}
//credits
export const getCredits = (skip) => {
    return axios.get('/pointsHistory/' + skip + '/0/getAll', {}, {}).then((data) => {
        return data.result
    })
}
//credits-tip-msg
export const getMessage = (code) => {
    return axios.get('/message/get/'+code).then((data) => {
        return data.result
    })
}
//wishlist
export const getWishProducts = (customerId, skip) => {
    return axios.get(VPATH + '/wanna-list/anon/' + customerId + '/' + skip + '/20/all-products', {}, {}).then((data) => {
        return data.result
    })
}
//remove-wishlist-product
export const removeWishProducts = (data) => {
    return axios.post(VPATH + '/wanna-list/remove-products', qs.stringify(data), {'Content-Type': http_infos.default_post_content_type}).then(data => data.result)
}
//remove-all-expiredproducts
export const removeExpiredProducts = () => axios.get(VPATH + '/wanna-list/clear-products')

export const fetchWishListFilterResult = (filter) => {
	return axios.post(`/wishlist/filter`, filter)
}

export const fetchWishListCount = (filter) => {
	return axios.post('/wishlist/count', filter)
}

export const getWishListFilter = () => {
	return axios.get(`/wishlist/get-filter`)
}

export const getWishListTotalCount = () => {
	return axios.get(`/wishlist/get-total-count`, {_:new Date().getTime()})
}

export const removeWishListProduct = (productIds) => {
	return axios.postStringify(`/wishlist/remove`, {productIds, _:new Date().getTime()})
}

export const saveWishListProduct = (productId) => {
	return axios.postStringify(`/wishlist/save`, {productId, _:new Date().getTime()})
}

export const removeWishListExpired = () => {
    return axios.get(`/wishlist/clear-off-shelf-products`, {_:new Date().getTime()})
}

//get-credit-cards

export const getCreditCards = () => {
    return axios.get('/quickpay-record/history').then(data => data.result)
}
export const getMercadoCreditCards = () => {
    return axios.get('/mercadopago/get-cards').then(data => data.result)
}
//delete-credit-cards
export const deleteCreditCard = (cardId) => axios.get('/quickpay-record/'+cardId+'/remove')
export const deleteMercadoCard = (cardId) => axios.get('/mercadopago/remove-card?token='+cardId)

//address-book
export const getAddresses = () => {
    return axios.get(VPATH + '/customer/get-shipping-details', {}, {}).then((data) => {
        return data.result
    })
}
export const makeDefaultAddress = (id) => {
    return axios.get(VPATH + '/customer/' + id + '/set-default-shipping-detail')
}
export const deleteAddress = (id) => {
    return axios.cpost('/customer/delete-address', {shippingDetailId: id}).then(data => data.result)
}
export function getDictionary(type) {
    return axios.get('/dictionary/anon/get', {typeCode: type}).then(data => data.result)
}
export function getCancelOrderReason(){
    return getDictionary('cancel-order-reasons')
}
export function getCountries() {
    return getDictionary('country')
}
export function getStates(country) {
    return getDictionary('state-' + country)
}
export function getCurrencies(){
    return getDictionary('currency')
}
export const updateAddress = (data) => {
    return axios.cpost('/customer/update-address', data).then(data => data.result)
}
export const addAddress = (address) => {
    return axios.cpost(VPATH + '/customer/add-address', address).then(data => data.result)
}
//change-pwd
export function forgetPwd(email){
    return axios.get(VPATH + '/customer/anon/get-change-password-url?email='+email).then(data => data.result)
}
export const changePassword = (data) => {
    return axios.post(VPATH + '/customer/update-password', qs.stringify(data), {'Content-Type': http_infos.default_post_content_type}).then(data => data.result)
}
//change-email
export const changeAccountEmail = (data) => {
    return axios.post(VPATH + '/customer/send-change-account-email', qs.stringify(data), {'Content-Type': http_infos.default_post_content_type}).then(data => data.result)
}
export const confirmEmail = (email) => {
    return axios.cpost(VPATH + '/customer/send-confirm-email',{email:email});
}

export const changeEmail = (data) => {
    return axios.cpost(VPATH + '/customer/change-email', data).then(data => data.result)
}
//upload-header-img
export const postHeaderImage = (files) => {
    return axios.post(VPATH + '/customer/upload-icon', files, {'Content-Type': http_infos.upload_image_content_type}).then(data => data.result)
}
export const postProfile = (data) => {
    return axios.cpost(VPATH + '/customer/edit', data).then(data => data.result)
}
//make-suggestion
export const makeSuggestion = (files) => {
    return axios.post('/ticket/add', files, {'Content-Type': http_infos.upload_image_content_type}).then(data => data)
}

//share-to-friend
export const getShareKey = (type) => {
    return axios.post(VPATH + '/customer/get-register-share-key?shareTo='+type).then(data => data.result)
}
export const sendShareEmail = (data) => {
    return axios.post(VPATH + '/customer/send-share-via-emails', qs.stringify(data), {'Content-Type': http_infos.default_post_content_type}).then(data => data.result)
}
export const shareProduct = (id) => {
    return axios.post(VPATH + '/product/anon/'+id+'/show').then(data => data.result)
}
//comments
export const getComment = (productId) => {
    return axios.get('/comment/' + productId + '/get', {_:new Date().getTime()}).then(data => data.result)
}
export const sendComment = (comment) => {
    return axios.post('/product-comment/add', comment, {'Content-Type': http_infos.upload_image_content_type}).then(data => data)
}
export const updateComment = (comment) => {
    return axios.post('/product-comment/update', comment, {'Content-Type': http_infos.upload_image_content_type}).then(data => data)
}
//tickets
export const getTickets = (skip,state) => {
    return axios.get('/ticket/'+ skip + '/20/show?state='+state).then(data => data.result)
}
export const getTicket = (id) => {
    return axios.get('/ticket/'+id+'/order/get').then(data => data.result)
}
export const getTicketByTicketId = (id) => {
    return axios.get('/ticket/'+id+'/get').then(data => data.result)
}
export const getTicketByCode = (code) => {
    return axios.get('/ticket/' + code + '/get-by-order').then(data => data.result)
}
export const addTicket = (ticket) => {
    return axios.post('/ticket/order/add', ticket, {'Content-Type': http_infos.upload_image_content_type}).then(data => data.result)
}
export const makeReturnTicket = (ticket) => {
    return axios.post('/ticket/order/add', ticket, {'Content-Type': 'application/json'}).then(data => data.result)
}
export const getM1135 = () =>{
    return axios.get('/message/get-m1135')
}
//getLogistics
export const getLogistics = (id) =>{
    return axios.get(NVPATH +'/tracking/anon/get-by-order-id',{orderId:id}).then(data => data.result)
}
export const getPackageLogistics = (type,id) =>{
    return axios.get(NVPATH +'/tracking/get-by-id',{type:type, id:id}).then(data => data.result)
}
//rate
export const rate = (rate) =>{
    return axios.post('/ticket/rate-service', rate)
}
//addProducts
export const addProducts = (products) =>{
    return axios.post('/v9/shopping-cart/add-products',products)
}

//notifications
export const getOrderNotifications = (skip) => {
    return axios.get('/notification/' + skip + '/20/get-order-notifications').then(data => data.result)
}

export const getPromotionNotification = (skip) => {
    return axios.get('/notification/' + skip + '/20/get-promotion-notifications').then(data => data.result)
}
export const getOtherNotification = (skip) => {
    return axios.get('/notification/' + skip + '/20/get-other-notifications').then(data => data.result)
}
// 新notification
export const getActivityNotification = (skip) => {
    return axios.get('/notification/' + skip + '/20/get-activity-notifications').then(data => data.result)
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
//用户个人信息集合
export const getFeedSummary = (customerId) => {
    return axios.get(VPATH +'/customer/anon/'+customerId+'/feed-summary').then(data => data.result)
}
//getReturnLabel
export const getReturnLabel = (id) =>{
    return axios.get(NVPATH +'/order/anon/report-return-label',{orderId:id}).then(data => data.result)

}

// 退货用户上传物流信息
export const addReturnLogistics = (logistics) => {
    return axios.post('/return-order/add-return-logistics',JSON.stringify(logistics),{'Content-Type':"application/json"});
    // return axios.post('/v9/order/add-return-logistics',JSON.stringify(logistics) , {'Content-Type':"application/json"}).then(data => data.result);
}
// 退货用户物流信息修改
export const editReturnLogistics = (logistics) => {
    return axios.post('/return-order/edit-return-logistics',JSON.stringify(logistics),{'Content-Type':"application/json"});
}
// 取消退货
export const cancelReturnOrder = (id) => {
    return axios.postStringify("/return-order/cancel",{id});
}

// 获取配置物流信息
export const getLogisticsCompanies = () => {
    return axios.get('/context/anon/get-logistics-companies');
}

export const getReturnLogistics  = function(id){
    // return axios.get("/v9/order/get-return-logistics",{orderId});
    return axios.postStringify("/return-order/get",{id});
}

export const generalUploadImage = (imageFile) =>{
    return axios.post('/context/upload',imageFile,{'Content-Type': http_infos.upload_image_content_type});
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

// 获取you may also likes产品
export const getYouLikeProducts = (skip) => {
    return axios.get('/product/1/'+skip+'/20/show', {}, {}).then((data) => {
        return data.result
    })
}

// 获取recently view产品
export const getRecentlyViewProducts = (productIds) => {
    return axios.cpost(VPATH + '/product/anon/get-by-ids', {productIds}, {}).then((data) => {
        return data.result
    })
}

// 传body体修改用户的信息
export const updateCustomerSave = (customer) => {
    // console.log("customer",customer);
    return axios.post(VPATH + "/customer/save",customer,{}).then(data => data);
}

// 如果message的结构为Object
// /v9/message/anon/get-object/{code}
export const getMessageToObject = (code) => {
    return axios.get(VPATH + "/message/anon/get-object/"+code).then(data => data.result);
}

// survey
export const surveySave = (params) => {
    return axios.cpost('/questionnaire-answer/anon/save',params,{}).then(data => data);
}

export const surveyGet = () => {
    return axios.get('/questionnaire-answer/anon/get',{},{}).then(data => data)
}

// ticket 获取问题类型
export const getQuestionType = () => {
    return axios.get('/message/anon/get-list/M1551',{},{}).then(data => data)
}

// survey 获取问题配置
export const getSurveyQuestions = (config) => {
    return axios.get('/message/anon/get-list/'+config,{},{}).then(data => data)
}

// 获取历史订单记录
export const getHistoryOrder = (skip) => {
    return axios.get('/v9/order/'+skip+'/'+20+'/get-order-history',{},{}).then(data => data)
}

// often bought with
export const getOftenBoughtWith = (id) => {
    // return axios.get('/v9/collection/anon/get-products-by-main-product-category-id?productId='+id,{},{}).then(data => data)
    return axios.specialGet('/v9/order/anon/0/20/get-same-category-products?orderId='+id,{}, {}).then(data => data)
}

// wait for review
export const getReviewOrder = () => {
    return axios.get(`${NVPATH}/order/10/get-not-comment-orders`, {}, {}).then(data => data)
}

// 获取积分商城优惠券列表
export const getPointsCouponList = () => {
    return axios.get(`/points-exchange-coupon/get-list?_=${new Date().getTime()}`,{},{}).then(data => data)
}

// 积分商城优惠券兑换
export const pointsCouponExchange = (id) => {
    return axios.post('/points-exchange-coupon/exchange',qs.stringify({id:id}),{}).then(data => data)
}

// 积分兑换优惠券通过后台系统参数 0336-w 是否显示
export const getShowRedeemCoupons = () =>{
    return axios.get('/context/show-coupon-points-rule-list',{},{});
}

// 消息未读数量
export const getNoReadNotificationNum = () => {
    return axios.get('/notification/no-read-notifications');
}

// 获取vip信息
export const getVipConfig = () => {
    return axios.get(NVPATH+'/customer/vip-show');
}

export const getApi = (url) => {
    return axios.get(url, {}, {});
}

export const getIsShowVip = () => {
    return axios.get('/context/show-vip');
}

export const getCashHistory = (skip, limit, type) => {
    return axios.get(`/cash-history-record/${skip}/${limit}/get-${type}`);
}

export const getUserCash = () => {
    return axios.get(`/wallet/get-cash`);
} 

// 参数：status（1：已使用，2：已过期）
export const getExpiredCoupons = (skip,status) => {
    return axios.get(NVPATH + '/coupon/'+ skip +'/20/history',{status})
}

// 获取选中国家电话区号
export const fetchPhoneAreaCode = headers => {
	return axios.get(`/context/get-config?code=0482-W`,headers)
}

export const fetchUploadImage = (imageFile, headers) =>{
	return axios.post(`/context/upload`, imageFile,  headers);
}

export const fetchOrderReviewByOrderId = (orderId, headers) =>{
	return axios.postStringify(`/product-comment/get-product-comments-by-order-id`, {orderId}, headers);
}

export const fetchSaveComments = (comments, headers) =>{
	return axios.post(`/product-comment/save`, comments, {}, headers);
}

// 获取support所有数据
export const fetchTicketQuestionsTree = (headers) => {
	return axios.get(`/shop/support/get-tree`, { _:new Date().getTime() }, headers);
}