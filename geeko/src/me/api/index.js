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

export const getFeed = (customerId) => {
    return axios.get(VPATH + '/customer/anon/' + customerId + '/feed-summary', {}, {}).then(data => data.result)
}


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

export const getCredits = (skip) => {
    return axios.get('/pointsHistory/' + skip + '/20/getAll', {}, {}).then((data) => {
        return data.result
    })
}

export const getMayLikes = () => {
    return axios.get('/product/1/0/20/show', {}, {}).then((data) => {
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
    return axios.get(VPATH + '/msite/order/unshipped-order-count').then(data => data.result)
}

export const getOrderCountShipped = () => {
    return axios.get(VPATH + '/msite/order/shipped-order-count').then(data => data.result)
}

export const getOrderCountCanceled = () => {
    return axios.get(VPATH + '/msite/order/canceled-count').then(data => data.result)
}

export const getOrderCountReceipt = () => {
    return axios.get(VPATH + '/msite/order/receipt-count').then(data => data.result)
}

export const getOrderCountUnpaid = () => {
  return axios.get(VPATH + '/msite/order/unpayed-order-count').then(data => data.result)
}




