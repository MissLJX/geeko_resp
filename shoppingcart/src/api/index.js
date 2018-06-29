import axios from './apiconfigs'
const VPATH = '/v7'
export const get = () => axios.get(`${VPATH}/shopping-cart/show`)
export const selectAll = () => axios.get(`${VPATH}/shopping-cart/select-all?_=${new Date().getTime()}`)
export const select = (params) => axios.post(`${VPATH}/shopping-cart/select?_=${new Date().getTime()}`, params)
export const editProduct = (oldId, newId, quantity) => axios.get(`${VPATH}/shopping-cart/${oldId}/${newId}/${quantity}/change-product`)

export const addAddress = (address) => axios.post('/customer/add/address2', address)
export const editAddress = (address) => axios.post('/customer/update-address', address)
export const paypalAddress = (address) => axios.post(`${VPATH}/paypal2/anon/shipping-details-save`, address)
export const getDictionary = (type) => axios.get('/dictionary/anon/get', {typeCode: type})
export const getCountries = () => getDictionary('country')
export const getStates = (country) => getDictionary(`state-${country}`)

export const changeShippingMethod = (method) => axios.get(`${VPATH}/shopping-cart/anon/${method}/update-shipping-method`)

export const product = (id) => axios.get(`${VPATH}/product/anon/${id}/show`)

export const me = () => axios.get(`${VPATH}/customer/get`)

export const mercadocards = () => axios.get(`${VPATH}/mercadopago/get-cards`)
export const mercadopay = (params) => axios.post(`${VPATH}/mercadopago/pay`, params)
