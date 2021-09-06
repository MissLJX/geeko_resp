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
    return axios.get('/product/1/'+skip+'/20/show', {}, {}).then((data) => {
        return data.result
    })
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

export const countUnreadNotification = () => {
    return axios.get('/notification/no-read-notifications').then(data => data.result)
}

export const getWishProducts = (customerId, skip) => {
    return axios.get(VPATH + '/wanna-list/anon/' + customerId + '/' + skip + '/20/all-products', {}, {}).then((data) => {
        return data.result
    })
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
    return axios.post(VPATH + '/customer/send-change-account-email', qs.stringify(data), {'Content-Type': http_infos.default_post_content_type}).then(data => data.result)
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
    return axios.cpost(VPATH + '/customer/send-confirm-email',{email:email}).then(data => data.result)
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
    return axios.get(VPATH+"/product/anon/"+ skip+"/20/0/APP0010/list-by-menu",{},{}).then((data) => {
        return data.result;
    });
}

//make-suggestion
export const makeSuggestion = (files) => {
    return axios.post('/ticket/add', files, {'Content-Type': http_infos.upload_image_content_type}).then(data => data.result)
}

// get cart product num
export const getShoppingCartNum = () => {
    return axios.get(VPATH + "/shopping-cart/count-products",{},{}).then(data => data.result);
}

export const updateCustomerSave = (customer) => {
    console.log("customer",customer);
    return axios.post(VPATH + "/customer/save",customer,{}).then(data => data.result);
}

// /context/anon/get-currency-list
export const getCurrencyList =() => {
    return axios.get("/context/anon/get-currency-list",{},{}).then(data => data.result);
}

// https://www.chicme.xyz/L/1F4Q3Z7A81P7G8G3w3D5m9a4w/product/0/20/29b78253-be62-483a-9852-cbd23d5e7bf1/scp-show2
// 通过productId获取相似产品
export const getRelationProducts = ({productId,skip}) => {
    return axios.get(`/L/1F4Q3Z7A81P7G8G3w3D5m9a4w/product/${skip}/20/${productId}/scp-show2`);
}

