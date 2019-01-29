import axios from './apiconfigs'
import qs from 'qs'
const VPATH = '/v8'
const NVPATH = '/v8'
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
    return axios.get(NVPATH + '/order/anon/get-order-details',{orderId:id}).then(data => data.result)
}
export const getOrders =(skip, api_suffix) => {
    return axios.get(`${NVPATH}/order/${skip}/20/${api_suffix}`).then(data => data.result)
}
export const confirmOrder = (id) =>{
    return axios.get('/v8/order/'+id+'/receipt')
}
export const cancelOrder = (id,reason) =>{
    return axios.get('/v8/order/cancel',{orderId:id,cancelReason:reason})
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
    return axios.post('/comment/add2', comment, {'Content-Type': http_infos.upload_image_content_type}).then(data => data.result)
}
export const updateComment = (comment) => {
    return axios.post('/comment/update2', comment, {'Content-Type': http_infos.upload_image_content_type}).then(data => data.result)
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
    return axios.post('/v8/shopping-cart/add-products',products)
}

