import axios from './apiconfigs'
const VPATH = '/v7'
export const getMessage = (code) => axios.get(`/message/get/${code}`)
export const get = () => axios.get(`${VPATH}/shopping-cart/show?_=${new Date().getTime()}&payMethod=${window.token ? '1' : ''}`)
export const selectAll = (select) => axios.get(`${VPATH}/shopping-cart/select-all?_=${new Date().getTime()}`, {select})
export const select = (params) => axios.post(`${VPATH}/shopping-cart/select?_=${new Date().getTime()}`, params)
export const editProduct = (oldId, newId, quantity) => axios.get(`${VPATH}/shopping-cart/${oldId}/${newId}/${quantity}/change-product`)
export const selectPayMethod = (payMethod) => axios.get(`${VPATH}/shopping-cart/anon/use-pay-method`, {payMethod})
export const useMercadoCoupon = (couponCode) => axios.get(`${VPATH}/shopping-cart/use-mercadopago-coupon`, {couponCode})

export const addAddress = (address) => axios.post('/customer/add/address2', address)
export const editAddress = (address) => axios.post('/customer/update-address', address)
export const paypalAddress = (address) => axios.post(`${VPATH}/paypal2/anon/shipping-details-save`, address)
export const getDictionary = (type) => axios.get('/dictionary/anon/get', {typeCode: type})
export const getCountries = () => getDictionary('country')
export const getStates = (country) => getDictionary(`state-${country}`)
export const getCurrencies = () => getDictionary('currency')
export const updateCurrency = (currency) => axios.post(`/context/anon/update-currency`, {currency})

export const changeShippingMethod = (method) => axios.get(`${VPATH}/shopping-cart/anon/${method}/update-shipping-method`)

export const product = (id) => axios.get(`${VPATH}/product/anon/${id}/show`)
export const product2 = (id) => axios.get(`${VPATH}/product/anon/${id}/show2`)

export const me = () => axios.get(`${VPATH}/customer/get`)
export const changeCommunicationEmail = (customerId, email) => axios.post(`${VPATH}/customer/anon/change-email`, {customerId, email})

export const mercadocards = () => axios.get(`${VPATH}/mercadopago/get-cards?_=${new Date().getTime()}`)
export const mercadopay = (params) => axios.post(`${VPATH}/mercadopago/pay`, params)
export const useMercadocard = (cardId) => axios.get(`${VPATH}/mercadopago/use-card?cardId=${cardId}&_=${new Date().getTime()}`)
export const addMercadoCard = (token) => axios.post(`${VPATH}/mercadopago/add-card`, {token})
export const removeMercadoCard = (token) => axios.post(`${VPATH}/mercadopago/remove-card`, {token})

export const usePoint = (isopen) => axios.get(`${VPATH}/shopping-cart/set-point/${isopen}`)
export const useInsurance = (isuse) => axios.get(`${VPATH}/shopping-cart/anon/${isuse}/update-insurance`)

export const creditcards = (payMethod) => axios.get(`/quickpay-record/${payMethod}/history?_=${new Date().getTime()}`)
export const creditpay = (params) => axios.post(`/quickpay/pay`, params)
export const usecreditcard = (id) => axios.get(`/quickpay-record/${id}/use`)
export const deletecreditcard = (id) => axios.get(`/quickpay-record/${id}/remove`)

export const getpaypal = () => axios.get(`${VPATH}/paypal/anon/client-get-url`)
export const paypalpay = (method) => siteType === 'new' ? axios.get(`${VPATH}/shoppingcart/pay/paypal/pay`, {method}) : axios.get(`${VPATH}/webpaypal/anon/pay`, {method})

export const getcoupons = () => axios.get(`${VPATH}/coupon/anon/get-coupon-selections?_=${new Date().getTime()}`)
export const usecoupon = (id) => axios.get(`${VPATH}/shopping-cart/anon/use-coupon/${id}`)
export const unusecoupon = () => axios.get(`${VPATH}/shopping-cart/anon/unuse-coupon?_=${new Date().getTime()}`)
export const usecouponcode = (code) => axios.post(`${VPATH}/coupon/anon/use-coupon-by-code`, {code})

export const movetooverseas = (params) => axios.post(`${VPATH}/shopping-cart/move-to-overseas?_=${new Date().getTime()}`, params)
export const deleteitem = (itemid) => axios.get(`${VPATH}/shopping-cart/${itemid}/remove`)
export const deleteitems = (variantIds) => axios.post(`${VPATH}/shopping-cart/remove`, {variantIds})

export const getSessionShipping = () => axios.get(`${VPATH}/webpaypal/anon/shipping-detail?_=${new Date().getTime()}`)
export const placepaypal = () => axios.get(`${VPATH}/webpaypal/anon/checkout`)
export const givingCoupon = () => axios.get(`${VPATH}/order/anon/giving`)

export const atmPay = (paymentMethodId) => axios.post(`${VPATH}/money-transfer/pay`, {paymentMethodId})
export const ticketPay = (paymentMethodId) => axios.post(`${VPATH}/cash/pay`, {paymentMethodId})

export const getSafeCharge = () => axios.get('/safe-charge/get-pay-params')

export const getMultiMethodCards = (payMethods) => axios.get(`/quickpay-record/history-by-pay-methods?payMethods=${payMethods.join(',')}`)

export const getApacPay = (params) => axios.get('/apacpay/get-pay-params', params)

export const apacPay = (params) => axios.get('/apacpay/pay', params)

// order
export const gettransaction = (id) => axios.get(`${VPATH}/order/anon/${id}/show`)
export const updateorderaddress = (address) => axios.post(`${VPATH}/order/anon/shipping-detail-update`, address)
export const gettransactionrelatedproducts = (id, skip, limit) => axios.get(`${VPATH}/order/anon/${skip}/${limit}/${id}/get-same-category-products`)
export const changepassword = (password) => axios.post(`${VPATH}/customer/anon/change-pwd`, {password})

export const getaddresses = () => axios.get(`${VPATH}/customer/get-shipping-details`)
export const setdefaultaddress = (id) => axios.get(`${VPATH}/customer/${id}/set-default-shipping-detail`)

export const getLeaveImage = () => axios.get(`${VPATH}/coupon/anon/get-shopping-cart-message`)
export const getRecentlyProducts = () => axios.get(`${VPATH}/product/anon/get-browsing-history`)
