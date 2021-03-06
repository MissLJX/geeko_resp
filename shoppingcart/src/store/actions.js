import Cookie from 'js-cookie'
import {get,
	select,
	selectAll,
	me,
	changeShippingMethod,
	editProduct,
	selectGift,
	removeGift,
	mercadocards,
	creditcards,
	getDCards,
	getMultiMethodCards,
	getpaypal,
	getcoupons,
	deleteitem,
	deleteitems,
	getSessionShipping,
	gettransaction,
	getMessage,
	getaddresses,
	selectPayMethod,
	checkout, addToWishList, addProduct} from '../api'
import quantity from '../components/quantity'
 
export const SET_LANG = 'SET_LANG'
export const LOADING = 'LOADING'
export const LOADED = 'LOADED'
export const REFRESHING = 'REFRESHING'
export const REFRESHED = 'REFRESHED'
export const SELECTITEMS = 'SELECTITEMS'
export const SELECTALL = 'SELECTALL'
export const EDITING = 'EDITING'
export const EDITED = 'EDITED'
export const SELECT_PAY = 'SELECT_PAY'
export const CPF = 'CPF'
export const EMAIL = 'EMAIL'
export const MERCADO_CARDS = 'MERCADO_CARDS'
export const TOGGLE_CREDIT = 'TOGGLE_CREDIT'
export const SET_SECURITY_CODE = 'SET_SECURITY_CODE'
export const CREDIT_CARDS = 'CREDIT_CARDS'
export const SET_INSTALLMENTS = 'SET_INSTALLMENTS'
export const GET_COUPONS = 'GET_COUPONS'
export const SET_MERCAODO_INSTALLMENTS = 'SET_MERCAODO_INSTALLMENTS'
export const CREDIT_STATUS = 'CREDIT_STATUS'
export const ATM_METHOD = 'ATM_METHOD'
export const TICKET_METHOD = 'TICKET_METHOD'
export const SET_COUPON_CODE = 'SET_COUPON_CODE'
export const DLOCAL_CARDS = 'DLOCAL_CARDS'

export const SET_DOCUMENT = 'SET_DOCUMENT'

export const SET_CASH_OUT = 'SET_CASH_OUT'


// order confirm
export const GET_TRANSACTION_PAGE = 'GET_TRANSACTION_PAGE'
export const GET_TRANSACTION = 'GET_TRANSACTION'

export const GET_ADDRESSES = 'GET_ADDRESSES'

export const UPDATE_ADDRESS = 'UPDATE_ADDRESS'
export const SET_ME = 'SET_ME'
export const SET_CHECKOUT = 'SET_CHECKOUT'

export const setLang = (lang) => {
	return {
		type: SET_LANG,
		lang
	}
}

export const loading = () => {
	return {
		type: LOADING
	}
}

export const loaded = (values) => {
	return {
		type: LOADED,
		values
	}
}

export const refresing = () => {
	return {
		type: REFRESHING
	}
}

export const refreshed = (cart) => {
	return {
		type: REFRESHED,
		cart
	}
}

export const editing = (item) => {
	return {
		type: EDITING,
		item
	}
}

export const edited = () => {
	return {
		type: EDITED
	}
}

export const setMercadoCards = (cards) => {
	return {
		type: 'MERCADO_CARDS',
		cards
	}
}

export const toggleCreditStatus = (status) => {
	return {
		type: CREDIT_STATUS,
		status
	}
}

export const toggleCredit = (isShow) => {
	return {
		type: TOGGLE_CREDIT,
		isShow
	}
}

export const setSecurityCode = (code) => {
	return {
		type: SET_SECURITY_CODE,
		securityCode: code
	}
}

export const setInstallments = (installments) => {
	return {
		type: SET_INSTALLMENTS,
		installments
	}
}

export const setMercadoInstallments = (installments) => {
	return {
		type: SET_MERCAODO_INSTALLMENTS,
		installments
	}
}

export const setAtmMethod = (method) => {
	return {
		type: ATM_METHOD,
		method
	}
}

export const setTicketMethod = (method) => {
	return {
		type: TICKET_METHOD,
		method
	}
}

export const setCreditCards = (cards) => {
	return {
		type: 'CREDIT_CARDS',
		cards
	}
}

export const setDLocalCards = (cards) => {
	return {
		type: DLOCAL_CARDS,
		cards
	}
}

export const getCoupons = (coupons) => {
	return {
		type: GET_COUPONS,
		coupons
	}
}

export const setAddresses = (addresses) => {
	return {
		type: GET_ADDRESSES,
		addresses
	}
}

export const updateAddress = (updating) => {
	return {
		type: UPDATE_ADDRESS,
		updating
	}
}

export const setMe = (me) => {
	return {
		type: SET_ME,
		me
	}
}

export const setCouponCode = (couponCode) => {
	return {
		type: SET_COUPON_CODE,
		couponCode
	}
}

export const fetchAll = () => {
	const fetchCart = get().then(data => data.result)
	const fetchMe = me().then(data => data.result)
	const paypalUrl = getpaypal().then(data => data.result)

	const excuteArr = window.__is_login__ ? [fetchCart, paypalUrl, fetchMe] : [fetchCart, paypalUrl]

	return dispatch => {
		dispatch(loading())
		return Promise.all(excuteArr).then(values => {
			if (values.length === 2) {
				values.push({})
			}

			dispatch(loaded(values))
			return values
		})
	}
}

export const refreshCart = (cart) => {
	const fetchCoupon = getcoupons().then(data => data.result)
	if (cart) {
		return dispatch => {
			dispatch(refreshed(cart))
			return fetchCoupon.then(coupons => dispatch(getCoupons(coupons)))
		}
	} else {
		const fetchCart = get().then(data => data.result)
		return dispatch => {
			dispatch(refresing())
			return Promise.all([fetchCart, fetchCoupon]).then(values => {
				dispatch(refreshed(values[0]))
				dispatch(getCoupons(values[1]))
			})
		}
	}
}

export const changeLang = (lang) => {
	return dispatch => {
		Cookie.set('lang', lang, {expires: 365})
		return dispatch(refreshCart()).then(() => {
			dispatch(setLang(lang))
		})
	}
}

export const changeLang1 = (lang) => {
	return dispatch => {
		Cookie.set('lang', lang, {expires: 365})
		return dispatch(setLang(lang))
	}
}

export const selectPay = (payMethod) => {
	return dispatch => {
		dispatch(refresing())
		dispatch({
			type: SELECT_PAY,
			payMethod
		})
		return selectPayMethod(payMethod.id).then(data => data.result).then(cart => {
			dispatch(refreshCart(cart))
			return cart
		})
	}
}

export const selectItem = (params) => {
	return dispatch => {
		dispatch(refresing())
		return select(params).then(data => data.result).then(cart => dispatch(refreshCart(cart)))
	}
}

export const selectAllItems = (selected) => {
	return dispatch => {
		dispatch(refresing())
		return selectAll(selected).then(data => data.result).then(cart => dispatch(refreshCart(cart)))
	}
}

export const selectMethod = (method) => {
	return dispatch => {
		dispatch(refresing())
		return changeShippingMethod(method).then(() => {
			dispatch(refreshCart())
		})
	}
}

export const editItem = (oldId, newId, quantity) => {
	return dispatch => {
		dispatch(refresing())
		return editProduct(oldId, newId, quantity).then(data => data.result).then(cart => {
			dispatch(refreshCart(cart))
			dispatch(edited())
		})
	}
}

export const editGift = variantId => {
	return dispatch => {
		dispatch(refresing())
		return selectGift(variantId).then(() => {
			dispatch(refreshCart(null))
			dispatch(edited())
		})
	}
}

export const addItem = (variantId, quantity) => {
	return dispatch => {
		dispatch(refresing())
		return addProduct(variantId, quantity).then(() => {
			dispatch(refreshCart(null))
		})
	}
}

export const deleteItem = (itemId) => {
	return dispatch => {
		dispatch(refresing())
		return deleteitem(itemId).then(data => data.result).then(cart => {
			dispatch(refreshCart(cart))
			return cart
		})
	}
}

export const deleteGift = itemId => {
	return dispatch => {
		dispatch(refresing())
		return removeGift(itemId).then(() => {
			dispatch(refreshCart(null))
			return null
		})
	}
}

export const deleteItems = (itemIds) => {
	return dispatch => {
		dispatch(refresing())
		return deleteitems(itemIds).then(data => data.result).then(cart => {
			dispatch(refreshCart(cart))
			return cart
		})
	}
}

export const wishItem = (productIds, variantIds) => {
	return dispatch => {
		dispatch(refresing())
		return addToWishList(productIds, variantIds).then(data => data.result).then(cart => {
			dispatch(refreshCart(cart))
			return cart
		})
	}
}

export const getMercadoCards = () => {
	return dispatch => {
		return mercadocards().then(data => data.result).then(cards => {
			dispatch(setMercadoCards(cards))
			return cards
		})
	}
}

export const getCreditCards = (payMethod, multi) => {
	const getcards = multi ? getMultiMethodCards : creditcards

	return dispatch => {
		return getcards(payMethod).then(data => data.result).then(cards => {
			dispatch(setCreditCards(cards))
			return cards
		})
	}
}

export const getDLocalCards = (payMethod) => {
	return dispatch => {
		return getDCards({payMethod}).then(data => data.result).then(cards => {
			dispatch(setDLocalCards(cards))
			return cards
		})
	}
}

export const fetchCoupons = () => {
	return dispatch => {
		return getcoupons().then(data => data.result).then(coupons => {
			dispatch(getCoupons(coupons))
		})
	}
}

export const getTransactionPage = (page) => {
	return {
		type: GET_TRANSACTION_PAGE,
		page
	}
}

export const getTransaction = (transaction) => {
	return {
		type: GET_TRANSACTION,
		transaction
	}
}

export const fetchTransactionPage = (transactionId) => {
	const __get_transaction = gettransaction(transactionId)
	const __get_me = me()
	const __m1186__ = getMessage('M1186')
	const __mx_m1147__ = getMessage('M1147')
	const __normal_m1073 = getMessage('M1073')

	const excuteArr = window.__is_login__ ? [__get_transaction, __m1186__, __mx_m1147__, __normal_m1073, __get_me] : [__get_transaction, __m1186__, __mx_m1147__, __normal_m1073]

	return dispatch => {
		return Promise.all(excuteArr).then(values => {
			const transactionPage = {
				transaction: values[0].result,
				m1186: values[1].result,
				m1147: values[2].result,
				m1073: values[3].result,
				me: values[4] ? values[4].result : window.__session_customer__
			}
			dispatch(getTransactionPage(transactionPage))
			return transactionPage
		})
	}
}

export const fetchTransaction = (transactionId) => {
	return dispatch => {
		return gettransaction(transactionId).then(({result}) => {
			dispatch(getTransaction(result))
			return result
		})
	}
}

export const fetchAddresses = () => {
	return dispatch => {
		return getaddresses().then(({result}) => {
			dispatch(setAddresses(result))
			return result
		})
	}
}

export const fetchMe = (_me) => {
	return dispatch => {
		if (_me) {
			dispatch(setMe(_me))
			return _me
		} else {
			return me().then(({result}) => {
				dispatch(setMe(result))
				return result
			})
		}
	}
}

export const setCheckout = (c) => {
	return {
		type: SET_CHECKOUT,
		checkout: c
	}
}

export const fetchCheckout = (orderId) => {
	return dispatch => {
		return checkout(orderId).then(({result}) => {
			dispatch(setCheckout(result))
			return result
		})
	}
}

export const fetchPaypalUrl = () => {
	return dispatch => {
		return getpaypal().then(data => data.result).then(paypal => {
			dispatch({
				type: 'SET_PAYPAL',
				paypal
			})
			return paypal
		})
	}
}

export const setDocument = (doc) => {
	return {
		type: SET_DOCUMENT,
		doc
	}
}



export const setCashout = (method) => {
	return {
		type: SET_CASH_OUT,
		method
	}
}

