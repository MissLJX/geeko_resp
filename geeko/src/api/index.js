/**
 * Created by shao_ on 2017/7/14.
 */
import axios from './apiconfigs'
import {VPATH} from '../utils/geekoutils'

export function getDictionary(type) {
    return axios.get('/dictionary/anon/get', {typeCode: type}).then(data => data.result)
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

export function like(productId) {
    return axios.get(VPATH + '/wanna-list/' + productId + '/add-product').then(data => data.result)
}

export function unlike(productId) {
    return axios.get(VPATH + '/wanna-list/remove-products?productIds=' + productId).then(data => data.result)
}

export function useCoupon(id) {
    return axios.get(VPATH + '/shopping-cart/anon/use-coupon/' + id).then(data => data.result)
}

export function logout(){
    return axios.get(VPATH + '/login-customer/logout')
}
export function logoff(closedReason) {
    return axios.post(VPATH+'/login-customer/close',closedReason)
}

// add to cart 
// params {} {"variantId":product.variantId,"quantity":'1'}
export const addProducts = (products) => {
    return axios.cpost('/v9/shopping-cart/add-products', products)
}


// https://www.chicme.com/v9/product/anon/e3a51d8d-045b-46d8-a937-9c76f0466d6e/show2
export const getProductDetailMessage = (productId) => {
    return axios.get(`/v9/product/anon/${productId}/show2`);
}
