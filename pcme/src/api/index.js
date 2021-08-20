import axios from './apiconfigs'
import qs from 'qs'
const VPATH = '/v9'
const NVPATH = '/v9'
import * as http_infos from "./http_infos";

export const get = () => {
    return axios.get(VPATH + '/customer/get', {}, {}).then(data => data.result)
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
export const confirmOrder = (id) =>{
    return axios.get('/v9/order/'+id+'/receipt')
}
export const cancelOrder = (id,reason) =>{
    return axios.get('/v9/order/cancel',{orderId:id,cancelReason:reason})
}
//coupons
export const getCoupons = () => {
    return axios.get(VPATH + '/coupon/get-coupon-selections').then(data => data.result)
}
export function useCoupon(id) {
    return axios.get(VPATH + '/shopping-cart/anon/use-coupon/' + id).then(data => data.result)
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
    return axios.cpost(VPATH + '/customer/send-confirm-email',{email:email}).then(data => data.result)
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
    return axios.post('/ticket/add', files, {'Content-Type': http_infos.upload_image_content_type}).then(data => data.result)
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
    return axios.get('/comment/' + productId + '/get').then(data => data.result)
}
export const sendComment = (comment) => {
    return axios.post('/product-comment/add', comment, {'Content-Type': http_infos.upload_image_content_type}).then(data => data.result)
}
export const updateComment = (comment) => {
    return axios.post('/product-comment/update', comment, {'Content-Type': http_infos.upload_image_content_type}).then(data => data.result)
}
//tickets
export const getTickets = (skip) => {
    return axios.get('/ticket/'+ skip + '/20/show').then(data => data.result)
}
export const getTicket = (id) => {
    return axios.get('/ticket/'+id+'/order/get').then(data => data.result)
}
export const addTicket = (ticket) => {
    return axios.post('/ticket/order/add', ticket, {'Content-Type': http_infos.upload_image_content_type}).then(data => data.result)
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
    return axios.post('/v9/order/add-return-logistics',JSON.stringify(logistics) , {'Content-Type':"application/json"}).then(data => data.result);
}

// 获取配置物流信息
export const getLogisticsCompanies = () => {
    return axios.get('/context/anon/get-logistics-companies');
}

export const getReturnLogistics  = function(orderId){
    return axios.get("/v9/order/get-return-logistics",{orderId});
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

// 传body体修改用户的信息
export const updateCustomerSave = (customer) => {
    console.log("customer",customer);
    return axios.post(VPATH + "/customer/save",customer,{}).then(data => data.result);
}

// 如果message的结构为Object
// /v9/message/anon/get-object/{code}
export const getMessageToObject = (code) => {
    return axios.get(VPATH + "/message/anon/get-object/"+code).then(data => data.result);
}


