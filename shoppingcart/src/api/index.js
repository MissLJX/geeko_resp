import axios from './apiconfigs'
const VPATH = '/v9'
export const getMessage = (code) => axios.get(`${VPATH}/message/get/${code}`)
export const getCountryMessage = code => axios.get(`${VPATH}/message/anon/country-message/${code}`)
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
export const getCites = (countryCode, stateCode) => axios.get('/context/anon/get-cities', {countryCode, stateCode})
export const getCityByZip = (countryCode, zipCode) => axios.get('/context/anon/get-address', {countryCode, zipCode})


export const getCurrencies = () => getDictionary('currency')
export const updateCurrency = (currency) => axios.post('/context/anon/update-currency', {currency})

export const changeShippingMethod = (method) => axios.get(`${VPATH}/shopping-cart/anon/${method}/update-shipping-method`)

export const product = (id) => axios.get(`${VPATH}/product/anon/${id}/show`)
export const product2 = (id) => axios.get(`${VPATH}/product/anon/${id}/show2`)

export const me = () => axios.get(`${VPATH}/customer/get`)
export const changeCommunicationEmail = (transactionId, email) => axios.post('/order/anon/change-communication-email', {transactionId, email})

export const mercadocards = () => {
	if(window.__is_login__){
		return axios.get(`${VPATH}/mercadopago/get-cards?_=${new Date().getTime()}`)
	}else{
		return Promise.resolve({
			code: 200,
			result: null
		})
	}
}
export const mercadopay = (params) => axios.post(`${VPATH}/mercadopago/pay`, params)
export const useMercadocard = (cardId) => axios.get(`${VPATH}/mercadopago/use-card?cardId=${cardId}&_=${new Date().getTime()}`)
export const addMercadoCard = (token) => axios.post(`${VPATH}/mercadopago/add-card`, {token})
export const removeMercadoCard = (token) => axios.post(`${VPATH}/mercadopago/remove-card`, {token})
export const mercadopay_order = (params) => axios.post(`${VPATH}/mercadopago/pay-by-order`, params)

export const usePoint = (isopen) => axios.get(`${VPATH}/shopping-cart/set-point/${isopen}`)
export const useInsurance = (isuse) => axios.get(`${VPATH}/shopping-cart/anon/${isuse}/update-insurance`)

export const creditcards = (payMethod) => {
	if(window.__is_login__){
		return axios.get(`/quickpay-record/${payMethod}/history?_=${new Date().getTime()}`)
	}else{
		return Promise.resolve({
			code: 200,
			result: null
		})
	}
}
export const creditpay = (params) => axios.post(`${VPATH}/pay/quickpay`, params)
export const usecreditcard = (id) => axios.get(`/quickpay-record/${id}/use`)
export const deletecreditcard = (id) => axios.get(`/quickpay-record/${id}/remove`)

export const getpaypal = () => axios.get(`${VPATH}/paypal2/anon/client-get-url`)
export const paypalpay = (method) => axios.get(`${VPATH}/webpaypal/anon/pay`, {method})
export const quickpaypal = () => axios.get(`${VPATH}/webpaypal/anon/quickpay`)
export const normalpaypal = () => axios.get(`${VPATH}/paypal2/pay`)


export const paypal_check_out = () => axios.get(`${VPATH}/paypal3/checkout`)

export const paypal_pay = (params) => axios.get(`${VPATH}/paypal3/pay`, params)
export const paypal_capture = (paypalOrderId) => axios.get(`${VPATH}/paypal3/capture`, {paypalOrderId})
export const paypal_quick_pay = params => axios.get(`${VPATH}/paypal3/quickpay`, params)
export const paypal_get_shipping_details = paypalOrderId => axios.get(`${VPATH}/paypal3/get-shipping-details`, {paypalOrderId})
export const paypal_set_shipping_details = shippingDetail => axios.get(`${VPATH}/paypal3/anon/shipping-details-save`, shippingDetail)

export const paypal_pay_order = params => axios.get(`${VPATH}/paypal3/pay-by-order`, params)




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

export const getSafeCharge = (payMethod) => axios.get(`${VPATH}/safe-charge/get-pay-params`, {payMethod, _: new Date().getTime()})
export const openSafeChargeOrder = orderId => axios.get(`${VPATH}/safe-charge/open-order`, {orderId, _: new Date().getTime()})
export const setSafeChargeStatus = sessionToken => axios.get(`${VPATH}/safe-charge/set-payment-status`, {sessionToken, _: new Date().getTime()})


export const getMultiMethodCards = (payMethods) => {
	if(window.__is_login__){
		return axios.get(`/quickpay-record/history-by-pay-methods?payMethods=${payMethods.join(',')}`)
	}else{
		return Promise.resolve({
			code: 200,
			result: null
		})
	}
}

export const getApacPay = (params) => axios.get(`${VPATH}/apacpay/get-pay-params`, params)

export const apacPay = (params) => axios.get(`${VPATH}/apacpay/pay`, params)

export const getDLocalPayLink = (params) => axios.get(`${VPATH}/dlocal/get-pay-link`, params)

export const bindDLocal = (params) => axios.post(`${VPATH}/dlocal/bind-card`, params)
export const payDLocal = (params) => axios.post(`${VPATH}/dlocal/pay`, params)
export const getDCards = (params) => {
	if(window.__is_login__){
		return axios.get(`${VPATH}/dlocal/get-cards`, {...params, _: new Date().getTime()})
	}else{
		return Promise.resolve({
			code: 200,
			result: null
		})
	}
}
export const getDInstallments = (params) => axios.post(`${VPATH}/dlocal/get-installments-plans`, params)
export const getDPaymethods = (payMethod) => axios.get(`${VPATH}/dlocal/get-payment-methods`, {payMethod})

export const payCredit = (params) => axios.post(`${VPATH}/pay/quickpay`, {...params, _: new Date().getTime()})
export const pay = params => axios.post(`${VPATH}/pay/pay`, params)
export const get_pay_params = params => axios.post(`${VPATH}/pay/get-pay-params`, params)

// checkout
export const checkout = (orderId) => axios.get(`${VPATH}/order/checkout?_=${new Date().getTime()}`, {orderId})
export const checkout_updatepaymethod = (orderId, payMethod) => axios.post(`${VPATH}/order/update-pay-method`, {orderId, payMethod})
export const checkout_getparams = (params) => axios.get(`${VPATH}/pay/get-pay-params-by-order`, params)
export const checkout_pay = (params) => axios.get(`${VPATH}/pay/pay-by-order`, params)
export const checkout_credit = (params) => axios.post(`${VPATH}/pay/quickpay-by-order`, params)
export const checkout_paypal = (params) => axios.post(`${VPATH}/paypal2/pay-by-order`, params)
export const checkout_computop = (params) => axios.post(`${VPATH}/computop/get-pay-params-by-order`, {...params, _: new Date().getTime()})

//order
export const gettransaction = (id) => axios.get(`${VPATH}/order/anon/order-confim`, {transactionId: id})
export const updateorderaddress = (address) => axios.post(`${VPATH}/order/anon/shipping-detail-update`, address)
export const gettransactionrelatedproducts = (id, skip, limit) => axios.get(`${VPATH}/order/anon/${skip}/${limit}/get-same-category-products
`, {orderId: id})
export const changepassword = (password) => axios.post(`${VPATH}/customer/anon/change-pwd`, {password})

export const getaddresses = () => axios.get(`${VPATH}/customer/get-shipping-details`)
export const setdefaultaddress = (id) => axios.get(`${VPATH}/customer/${id}/set-default-shipping-detail`)

export const getLeaveImage = () => axios.get(`${VPATH}/coupon/anon/get-shopping-cart-message`)
export const getRecentlyProducts = () => axios.get(`${VPATH}/product/anon/get-browsing-history`)
export const clientcall = (transationId) => axios.get(`${VPATH}/pay/client-call/${transationId}/true`)

export const placeOrderAll = payMethod => axios.get(`${VPATH}/pay/place-order`, {payMethod, _: new Date().getTime()})

//new pay
export const placeorder = () => axios.get(`${VPATH}/oceanpayment/place-order`, {_: new Date().getTime()})

//new oceanpay
export const getJwt = (orderId) => axios.get(`${VPATH}/oceanpayment/request-jwt`, {orderId, _: new Date().getTime()})
export const getLookup = (referenceId, orderId) => axios.get(`${VPATH}/oceanpayment/request-lookup`,{referenceId, orderId, _: new Date().getTime()})
/**
 * orderId，cardEci （可选），cardCavv （可选），cardXid （可选）
 * @param {*} params 
 */
export const oceanpay3d = (params) => axios.post(`${VPATH}/oceanpayment/pay-with-3d`, {...params, _: new Date().getTime()})




/**
 * 购物车不登录改造
 */

export const saveTempAddress = (address) => axios.post(`${VPATH}/pay/save-address`, address)


export const getGifts = collectionId => axios.get(`${VPATH}/product/0/20/${collectionId}/c/show`)
export const getGiftId = () => axios.get(`/context/anon/get-gift-collection-id`)
export const selectGift = variantId => axios.post(`${VPATH}/shopping-cart/update-gift`, {variantId})

/**
 分享页面添加接口
 */

 export const getFaceBookUrl = () => axios.get(`${VPATH}/customer/get-register-share-key`,{shareTo:'facebook'})
 export const getShareInputUrl = () => axios.get(`${VPATH}/customer/get-register-share-key`,{shareTo:'copy'})

//  Handler.ajaxLoaddingHandler(ctx + '/' + VERSION + '','POST', paylod, function(data){
 export const toShareEmail = (paylod) => axios.post(`${VPATH}/customer/send-share-via-emails`,paylod);


 export const addToWishList = (productIds, variantIds) => axios.get(`${VPATH}/shopping-cart/move-to-wish-list`, {productIds, variantIds})





 export const klarna_create_session = params => axios.get(`${VPATH}/klarna/create-session`,params)
 export const klarna_get_params = params => axios.get(`${VPATH}/klarna/get-order-details`,params)
 export const klarna_place_order = params => axios.post(`${VPATH}/klarna/authorizations-order`,params)



 export const klarna_order_create_session = params => axios.get(`${VPATH}/klarna/create-session-by-order`,params)
 export const klarna_order_get_params = params => axios.get(`${VPATH}/klarna/get-order-details-by-order`,params)
 export const klarna_order_place_order = params => axios.post(`${VPATH}/klarna/authorizations-by-order`,params)




 //you can catch with
 export const product_get_catch_with = params => axios.get(`${VPATH}/shopping-cart/get-shopping-cart-recommended-products`, params)

 export const addProduct = params => axios.post(`${VPATH}/shopping-cart/add-product`, params)