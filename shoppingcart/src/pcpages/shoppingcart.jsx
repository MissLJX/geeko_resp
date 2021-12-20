import React from 'react'
import styled from 'styled-components'
import { injectIntl, FormattedMessage } from 'react-intl'
import { __route_root__, storage } from '../utils/utils.js'
import _ from 'lodash'

import { submit } from '../utils/common-pay.js'
import { CountDownBlock } from '../components/msite/countdowns.jsx'
import AddressFrom from '../components/pc/address-form.jsx'
import Mask from '../components/mask.jsx'
import SUCCESSTIP from '../components/pc/successtip.jsx'
import Confirm from '../components/pc/confirm.jsx'
import { producturl, unitprice } from '../utils/utils'

import { connect } from 'react-redux'
import {
	fetchAll,
	refreshCart,
	fetchCoupons,
	selectItem,
	selectMethod,
	editItem,
	setAtmMethod,
	setTicketMethod,
	selectPay,
	setInstallments,
	setMercadoInstallments,
	setSecurityCode,
	CPF, EMAIL,
	fetchAddresses,
	getCreditCards,
	deleteItem,
	deleteGift,
	deleteItems,
	updateAddress,
	setCouponCode,
	changeLang,
	getDLocalCards,
	setCashout,
	setDocument,
	editGift
} from '../store/actions.js'

import Loading from '../components/msite/loading.jsx'
import Refreshing from '../components/msite/refreshing.jsx'

import PromotionGroup from '../components/pc/promotion-group.jsx'

import GroupLocalItems from '../components/pc/group-local-items.jsx'
import GroupIvalidItems from '../components/pc/group-invalid-items.jsx'
import Empty from '../components/pc/empty.jsx'
import { Boxs, Box, SecondBox } from '../components/pc/layouts.jsx'
import CheckBox from '../components/checkbox.jsx'
import LabelCheck from '../components/label-check.jsx'
import Address from '../components/pc/address.jsx'
import Addresses from '../components/pc/shipping-details.jsx'
import ItemTableHead from '../components/pc/item-table-head.jsx'
import { Red } from '../components/text.jsx'
import CouponSelect from '../components/pc/coupon-select.jsx'
import Money from '../components/money.jsx'
import Ask from '../components/pc/ask.jsx'
import OrderSummary from '../components/pc/order-summary.jsx'
import { BigButton } from '../components/msite/buttons.jsx'
import MessageTip from '../components/pc/message-tip.jsx'
import ShippingMethods from '../components/pc/shipping-methods.jsx'
import PayMethods from '../components/pc/pay-methods.jsx'
import Icon from '../components/icon.jsx'
import { Modal } from '../components/pc/modal.jsx'

import Loadable from 'react-loadable'
import Cookie from 'js-cookie'

import Ellipsis from '../components/ellipsis.jsx'
import { Link } from 'react-router-dom'
import SwiperGifts from '../components/pc/gifts.jsx'
import Items from '../components/pc/items.jsx'


import {
	paypalpay,
	setdefaultaddress,
	atmPay,
	ticketPay,
	getSafeCharge,
	addAddress,
	saveTempAddress,
	paypalAddress,
	useInsurance,
	usePoint,
	selectAll,
	getMessage,
	placepaypal,
	getApacPay,
	apacPay,
	givingCoupon,
	movetooverseas,
	unusecoupon,
	product2,
	getLeaveImage,
	useMercadoCoupon,
	payDLocal,
	quickpaypal,
	normalpaypal,
	paypal_pay,
	paypal_quick_pay,
	paypal_capture,
	paypal_check_out,
	paypal_get_shipping_details,
	paypal_set_shipping_details,
	klarna_get_params,
	klarna_create_session,
	klarna_place_order,
	pay,
	get_pay_params, placeOrderAll
} from '../api'
import deeplink from '../utils/deeplink.js'

export const __address_token__ = window.token


const getPayImage = country => {
	switch (country) {
	case 'BR':
		return 'https://s3-us-west-2.amazonaws.com/wanna/pt_BR.png'
	case 'DE':
		return 'https://s3-us-west-2.amazonaws.com/wanna/de_DE.png'
	case 'MX':
		return 'https://s3-us-west-2.amazonaws.com/wanna/es_ES.png'
	case 'AR':
		return 'https://s3-us-west-2.amazonaws.com/wanna/es_AR.png'
	case 'CO':
		return 'https://s3-us-west-2.amazonaws.com/wanna/es_CO.png'
	case 'CL':
		return 'https://s3-us-west-2.amazonaws.com/wanna/es_CL.png'
	case 'UY':
		return 'https://s3-us-west-2.amazonaws.com/wanna/es_UY.png'
	default:
		return 'https://s3-us-west-2.amazonaws.com/wanna/pc_default.png'
	}
}

const ItemEditor = Loadable({
	loader: () => import(/* webpackChunkName: "component--pc-item_editor" */ '../components/pc/item-editor.jsx'),
	loading: Loading
})

const SHOPPINGBODY = styled.div`
	width:1150px;
	margin:auto;
	&::after{
		content: '';
		display: block;
		clear: both;
	}

	& > .__left{
		width: 726px;
		float: left;
		padding-top: 50px;
	}

	& > .__right{
		width: 314px;
		float: right;
	}
`

const AddressBTN = styled.div`
	width: 280px;
	height: 40px;
	border-radius: 2px;
	border: solid 1px #222222;
	color: #222;
	text-transform: uppercase;
	text-align: center;
	line-height: 40px;
	cursor: pointer;
`

const SelectLine = styled.div`
	border-bottom: 1px solid #e6e6e6;
	padding-bottom: 12px;
`

const FixedTop = styled.div`
	&.__fixed{
		position: fixed;
		top: 0;
		background-color: #fff;
		z-index: 5;
	}
`

const DISCOUNTTIP = styled.span`
	background-color:#fff9fc;
	border: 1px solid #f3a6c0;
	padding: 4px;
	font-size: 12px;
	position: relative;
	&::before{
		content:'';
		border-left: 1px solid #f3a6c0;
		border-top: 1px solid #f3a6c0;
		background-color:#fff9fc;
		transform: rotate(-135deg);
		position:absolute;
		left: 50%;
		bottom: -5px;
		width: 8px;
		height: 8px;
	}
`

const mapStateToProps = (state) => {
	return {
		...state
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		INIT: () => {
			return dispatch(fetchAll())
		},
		REFRESHCART: (cart) => {
			return dispatch(refreshCart(cart))
		},
		SELECT: (params) => {
			dispatch(selectItem(params))
		},
		EDITITEM: (oldId, newId, quantity) => {
			dispatch(editItem(oldId, newId, quantity))
		},
		EDITGIFT: variantId => {
			dispatch(editGift(variantId))
		},
		DELETEITEM: (itemId) => {
			return dispatch(deleteItem(itemId))
		},
		DELETEGIFT: itemId => {
			return dispatch(deleteGift(itemId))
		},
		DELETEITEMS: (itemIds) => {
			return dispatch(deleteItems(itemIds))
		},
		SETATMMETHOD: (method) => {
			dispatch(setAtmMethod(method))
		},
		SETTICKETMETHOD: (method) => {
			dispatch(setTicketMethod(method))
		},
		SELECTPAY: (paymethod) => {
			return dispatch(selectPay(paymethod))
		},
		SETINSTALLMENTS: (installments) => {
			dispatch(setInstallments(installments))
		},
		SETMERCADOINTALLMENTS: (installments) => {
			dispatch(setMercadoInstallments(installments))
		},
		SETSECURITYCODE: (securityCode) => {
			dispatch(setSecurityCode(securityCode))
		},
		SETCPF: (cpf) => {
			dispatch({
				type: CPF,
				cpf
			})
		},
		SETEMAIL: (email) => {
			dispatch({
				type: EMAIL,
				email
			})
		},
		SETCOUPONCODE: (couponCode) => {
			dispatch(setCouponCode(couponCode))
		},
		GETADDRESSES: () => {
			return dispatch(fetchAddresses())
		},
		SELECTSHIPPINGMETHOD: (method) => {
			dispatch(selectMethod(method))
		},
		FETCHCOUPONS: () => {
			dispatch(fetchCoupons())
		},
		GETCREDITCARDS: (payMethod, multi) => {
			return dispatch(getCreditCards(payMethod, multi))
		},
		UPDATINGADDRESS: (updating) => {
			dispatch(updateAddress(updating))
		},
		CHANGELANG: (lang) => {
			return dispatch(changeLang(lang))
		},
		GETDLOCALCARDS: (payMethod) => {
			return dispatch(getDLocalCards(payMethod))
		},
		SETDOCUMENT: (document) => {
			return dispatch(setDocument(document))
		},
		SETCASHOUT: (method) => {
			return dispatch(setCashout(method))
		}

	}
}

const ShoppingCart = class extends React.Component {
	constructor(props) {
		super(props)
		this.scrollhandle = this.scrollhandle.bind(this)
		this.leavehandle = this.leavehandle.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.processCallBack = this.processCallBack.bind(this)
		this.processErrorBack = this.processErrorBack.bind(this)

		this.state = {
			ticketMethods: [],
			atmMethods: [],
			showAddresses: false,
			refreshing: false,
			paypalAddressConfirmed: false,
			pointMessage: null,
			cpfMessage: null,
			editing: null,
			paypaling: false,
			showLeaveImage: false,
			leaveImage: '',
			successTip: null,
			showDeleteConfirm: false,
			itemDelete: null,
			klarnaParams: {},
			payImages: [],
			policySelected: true
		}


	}

	processCallBack({ isFree, success, transactionId, details, orderId, solutions = '' }) {
		if (isFree) {
			window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
		} else if (success) {

			window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`

		} else {
			alert(details + '\n' + solutions)
			if (orderId && window.__is_login__) {
				this.props.history.push(`${window.ctx || ''}/checkout/${orderId}`)
			}
		}
		this.setState({
			checking: false
		})
	}

	processErrorBack({ result }) {
		alert(result)
		this.setState({
			checking: false
		})
	}

	showSuccessTip(tip) {
		this.setState({
			successTip: tip
		})
		setTimeout(() => {
			this.setState({
				successTip: null
			})
		}, 2000)
	}

	componentDidUpdate(prevProps) {
		const { cart: oldCart } = prevProps
		const { cart } = this.props
		const oldServerTime = oldCart ? oldCart.serverTime : 0

		if (cart && cart.serverTime !== oldServerTime) {
			if (cart.selectedPayMethod && cart.selectedPayMethod.type === '27' && cart.payMethodList.some(p => p.id === cart.selectedPayMethod.id)) {
				this.loadKlarna(cart.selectedPayMethod)
			}
		}

	}

	componentDidMount() {
		if (!this.props.cart) {
			this.props.INIT().then(() => {
				var { cart } = this.props
				if (cart) {
					if (window.enterCart) {
						window.enterCart(cart)
					}
				}
			})
		}
		this.props.FETCHCOUPONS()

		getLeaveImage().then(({ result }) => {
			this.setState({
				leaveImage: result
			})
		})

		window.addEventListener('scroll', this.scrollhandle, false)
		window.addEventListener('resize', this.scrollhandle, false)
		window.document.addEventListener('mouseleave', this.leavehandle, false)

		getMessage('M1136').then(({ result }) => {
			this.setState({
				pointMessage: result.message,
				cpfMessage: 'CPF (Cadastro de Pessoa Física), utilizado para tributação, é necessário para todos os produtos enviados ao Brasil, independentemente de encomendas expressas ou contêineres logísticos.Quando preenchemos o conhecimento de embarque e fatura, por favor, não esqueça de preencher o número de contribuinte do destinatário.Na maioria dos casos, sua forma é o número digital como abaixo, XXX.XXX.XXX-XX'
			})
		})

		getMessage('M1142').then(({ result }) => {

			try {
				var m1142 = JSON.parse(result.message)
				if (m1142) {
					this.setState({
						payImages: m1142.result,
					})
				}
			} catch (e) {

			}

		})

		if (window.Mercadopago) {
			/*global Mercadopago b:true*/
			/*eslint no-undef: "error"*/
			Mercadopago.getAllPaymentMethods((status, methods) => {
				if (status === 200) {
					const tickets = methods.filter(method => method.payment_type_id === 'ticket')
					const atms = methods.filter(method => method.payment_type_id === 'atm')

					if (tickets && tickets.length === 1) {
						this.props.SETTICKETMETHOD(tickets[0].id)
					}

					if (atms && atms.length === 1) {
						this.props.SETATMMETHOD(atms[0].id)
					}

					this.setState({
						ticketMethods: tickets,
						atmMethods: atms
					})
				}
			})
		}

		window.saveKlarnaAddress = callbackData => {
			this.selectPayHandle({ id: 51 })
			if (callbackData && callbackData.address) {
				this.editAddress(
					{
						city: callbackData.address.city,
						country: callbackData.address.country,
						email: callbackData.email,
						isDefaultAddress: true,
						name: `${callbackData.first_name} ${callbackData.last_name}`,
						phoneNumber: callbackData.phone,
						state: callbackData.address.region,
						streetAddress1: callbackData.address.street_address,
						unit: callbackData.address.street_address2,
						zipCode: callbackData.address.postal_code
					}
				)
			}
		}


		window.notifyAfterpay = () => {
			// if (window.AfterPay) {
			// 	AfterPay.initializeForPopup({
			// 		countryCode: window.__country,
			// 		onCommenceCheckout: function (actions) {
			// 			/* retrieve afterpay token from your server */
			// 			/* then call `actions.resolve(token)` */
			// 			pay({ payMethod: '83' }).then(data => data.result).then(({ token }) => {
			// 				actions.resolve(token)
			// 			})
			// 		},
			// 		onComplete: function (data) {
			// 			/* handle success/failure of checkout */
			// 		},
			// 		target: '#afterpay-express-button',
			// 		shippingOptionRequired: false,
			// 	})
			// }
		}
	}

	createKlarnaSession(paymethod) {
		return klarna_create_session({ payMethod: paymethod.id }).then(data => data.result)
	}

	initKlarna(paymethod) {
		return this.createKlarnaSession(paymethod).then(res => {
			const { client_token } = res
			Klarna.Payments.init({
				client_token
			})
			return client_token
		})
	}

	loadKlarna(paymethod) {
		this.initKlarna(paymethod).then(() => {
			klarna_get_params({ payMethod: paymethod.id }).then(data => data.result).then(params => {

				this.setState({
					klarnaParams: params
				})

				Klarna.Payments.load({
					container: `#klarna-payments-container-${paymethod.id}`,
					payment_method_category: paymethod.description
				}, {
					'locale': params.locale,
					'purchase_country': params.purchase_country,
					'purchase_currency': params.purchase_currency,
					'order_amount': params.order_amount,
					'order_lines': params.order_lines
				}, function (res) {
					console.debug(res)
				})
			})
		})
	}

	overseasHandle(variantId) {
		this.setState({
			refreshing: true
		})
		movetooverseas({ variantId }).then(({ result }) => {
			this.setState({
				refreshing: false
			})
			this.props.REFRESHCART(result)
			this.showSuccessTip('Changed Successed')
		})
	}

	togglePaypalButton(actions) {
		const { cart } = this.props
		return cart.shippingDetail && cart.shippingDetail.phoneNumber ? actions.enable() : actions.disable()
	}

	getProps() {
		return this.props
	}

	paypalcheck(method) {
		if ('quick' === method) {
			return paypal_check_out
		} else {
			return paypal_pay
		}
	}

	paypalRender(c, method) {
		const self = this

		if (!window.paypal)
			return



		const __confirm_address__ = this.props.intl.formatMessage({ id: 'please_confirm_address' })

		const { cart } = self.getProps()

		const isprogresspage = window.__is_login__ || (cart && cart.shippingDetail) || (self.props.location.pathname && self.props.location.pathname.indexOf('/cart/checkout') >= 0)

		let isCheckout = this.props.location.pathname && this.props.location.pathname.indexOf('/cart/checkout') >= 0

		let alloweds = []

		if (cart && cart.currency === 'EUR') {
			alloweds = [
				paypal.FUNDING.BANCONTACT,
				paypal.FUNDING.EPS,
				paypal.FUNDING.GIROPAY,
				paypal.FUNDING.IDEAL,
				paypal.FUNDING.MYBANK,
				paypal.FUNDING.SOFORT
			]
		}


		let locale = cart && cart.locale && cart.locale !== 'nb_NO' && cart.locale !== 'is_IS' ? cart.locale : 'en_US'


		if (c) {

			c.innerHTML = ''

			/*global paypal b:true*/
			/*eslint no-undef: "error"*/
			// paypal.Button.render({
			// 	env: window.paypalEnv,
			// 	commit: isprogresspage,
			// 	locale: locale,
			// 	onClick: function () {
			// 		const { cart, history } = self.getProps()
			// 		if (!cart.shippingDetail && method !== 'quick') {
			// 			alert(__confirm_address__)
			// 			self.$addressdom.scrollIntoView()
			// 			return false
			// 		}

			// 		if (cart.shippingDetail && !cart.shippingDetail.phoneNumber && method !== 'quick') {
			// 			const path = {
			// 				pathname: isCheckout ? `${window.ctx || ''}${__route_root__}/checkout/address` : `${window.ctx || ''}${__route_root__}/address`,
			// 				state: {
			// 					validate: true
			// 				}
			// 			}
			// 			this.props.history.push(path)
			// 			return false
			// 		}
			// 	},

			// 	validate: function (actions) {
			// 		if (method !== 'quick') {
			// 			self.togglePaypalButton(actions)
			// 			self.actions = actions
			// 		}

			// 	},

			// 	payment: function () {
			// 		return self.paypalcheck(method).then(data => data.result).then(({ TOKEN, success, tokenSuccess, transactionId, orderId, ACK, L_LONGMESSAGE0, method }) => {


			// 			if (success && transactionId && !TOKEN || method === 'DoReferenceTransaction' && tokenSuccess) {
			// 				window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
			// 				throw new Error('free')
			// 			}
			// 			if (ACK === 'Failure') {
			// 				throw new Error(L_LONGMESSAGE0)
			// 			}

			// 			if (method == 'normal') {
			// 				storage.add('temp-order', orderId, 1 * 60 * 60)
			// 			}

			// 			return TOKEN
			// 		}).catch((err) => {
			// 			if (err.result) {
			// 				throw new Error(err.result)
			// 			} else {
			// 				throw new Error(err)
			// 			}

			// 		})
			// 	},
			// 	onAuthorize: function (data, actions) {
			// 		console.log(data)
			// 		return actions.redirect()
			// 	},

			// 	onCancel: function (data, actions) {
			// 		return actions.redirect()
			// 	},

			// 	onError: function (err) {
			// 		var msg = err.stack
			// 		if (msg.indexOf('free') >= 0) {
			// 			console.log('free order')
			// 		} else {
			// 			alert(msg.substring(0, msg.indexOf('\n')))
			// 		}
			// 	},
			// 	style: {
			// 		label: isprogresspage ? 'pay' : 'checkout',
			// 		shape: 'rect',
			// 		size: 'responsive',
			// 		tagline: false,
			// 		layout: 'vertical'
			// 	},
			// 	funding: {
			// 		allowed: alloweds
			// 	}
			// }, '#ip-paypal-pay')



			paypal.Buttons({
				env: window.paypalEnv,
				commit: isprogresspage,
				locale: locale,
				// intent: isprogresspage? 'capture': 'authorize',
				style: {
					label: isprogresspage ? 'pay' : 'checkout',
					shape: 'rect',
					size: 'responsive',
					tagline: false,
					layout: 'vertical'
				},

				createOrder: function (data, actions) {
					const createPaypal = self.paypalcheck(method)
					return createPaypal({ payMethod: 1 }).then(data => {
						const payResult = data.result
						const { payPalOrder, isFree, transactionId, orderId, success } = payResult
						self.orderId = orderId

						if (isFree && transactionId && orderId) {
							window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
							throw new Error('free')
						}
						return payPalOrder.id
					}).catch(data => {
						throw new Error(data.result)
					})
				},
				onApprove: function (data, actions) {
					// This function captures the funds from the transaction.
					const { orderID } = data
					if (method === 'quick') {

						paypal_get_shipping_details(orderID).then(() => {
							window.location.href = `${window.ctx || ''}/cart?token=${orderID}`
						}).catch(data => {
							if (data && data.result) {
								alert(data.result)
							} else {
								alert(data)
							}
						})

					} else {
						paypal_capture(orderID).then(data => data.result).then(result => {
							window.location.href = `${window.ctx || ''}/order-confirm/${result}`
						}).catch(data => {
							if (data) {
								if (data.result) {
									alert(data.result)
								} else {
									alert(data)
								}
							}
						})
					}
				},
				onClick: function () {
					const { cart, history } = self.getProps()
					if (!cart.shippingDetail && method !== 'quick') {
						alert(__confirm_address__)
						self.$addressdom.scrollIntoView()
						return false
					}

					if (cart.shippingDetail && !cart.shippingDetail.phoneNumber && method !== 'quick') {
						const path = {
							pathname: isCheckout ? `${window.ctx || ''}${__route_root__}/checkout/address` : `${window.ctx || ''}${__route_root__}/address`,
							state: {
								validate: true
							}
						}
						this.props.history.push(path)
						return false
					}
				},
				onCancel: function (data, actions) {
					if (method === 'normal' && window.__is_login__) {
						window.location.href = `${window.ctx || ''}/checkout/${self.orderId}`
					}
				},
				onError: function (err) {
					if (err) {
						const msg = err.stack
						if (msg.indexOf('free') >= 0) {
							console.log('free order')
						} else {
							alert(msg.substring(0, msg.indexOf('\n')))
						}
					}
				}

			}).render(c)

		}


	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.scrollhandle, false)
		window.removeEventListener('resize', this.scrollhandle, false)
		window.removeEventListener('mouseleave', this.leavehandle, false)
	}

	// 支付
	checkout(event) {
		event.preventDefault()
		const { payMethod, cart, paypal, payType } = this.props
		const __confirm_address__ = this.props.intl.formatMessage({ id: 'please_confirm_address' })
		const __confirm_paymethod__ = this.props.intl.formatMessage({ id: 'please_select_paymethod' })

		const isRequireEmail = !window.__is_login__ && !window.token && this.props.location.pathname && this.props.location.pathname.indexOf('/cart/checkout') >= 0

		let isCheckout = this.props.location.pathname && this.props.location.pathname.indexOf('/cart/checkout') >= 0

		const { selectedPayMethod } = cart

		if (!payType) {
			alert(__confirm_paymethod__)
			this.$paylistdom.scrollIntoView()
			return
		}

		if (!cart.shippingDetail) {

			if (this.$addressdom) {
				this.$addressdom.scrollIntoView()
				alert(__confirm_address__)
			} else {
				if (isCheckout) {
					this.props.history.push(`${window.ctx || ''}${__route_root__}/checkout/address/add`)
				} else {
					this.props.history.push(`${window.ctx || ''}${__route_root__}/address/add`)
				}

			}


			return
		}


		if (cart.shippingDetail.country && cart.shippingDetail.country.value === 'BR' && !cart.shippingDetail.cpf || (isRequireEmail && !cart.shippingDetail.email) || !cart.shippingDetail.phoneNumber) {
			const path = {
				pathname: isCheckout ? `${window.ctx || ''}${__route_root__}/checkout/address` : `${window.ctx || ''}${__route_root__}/address`,
				state: {
					validate: true
				}
			}
			this.props.history.push(path)
			return
		}


		if(payType === '30'){
			this.setState({
				checking: true
			})
			placeOrderAll(payMethod).then(data => data.result).then(result => {
				const { orderId } = result
				this.props.history.push(`${window.ctx || ''}/checkout/${orderId}/credit?payMethod=${payMethod}`)
				this.setState({
					checking: false
				})
			}).catch(data => {
				alert(data.result)
				this.setState({
					checking: false
				})
			})
		}else if (payType === '2' || payType === '7') {
			if (payMethod === '17') {
				const { cpf } = this.props
				this.brazilOceanForm.validateAll()
				if (!this.brazilOcean.context._errors || !this.brazilOcean.context._errors.length) {
					this.props.history.push(`${window.ctx || ''}${__route_root__}/credit-card`)
				}
			} else {
				this.props.history.push(`${window.ctx || ''}${__route_root__}/credit-card`)
			}
		} else if (payType === '3') {
			window.location.href = `${window.ctx || ''}/computoppay/pay?payMethod=${payMethod}`
		} else if (payType === '5') {
			const { cpf, email } = this.props
			this.boletoForm.validateAll()
			if (!this.boleto.context._errors || !this.boleto.context._errors.length) {
				window.location.href = `${window.ctx || ''}/geekopay/pay?cpf=${cpf}&email=${email}&payMethod=${payMethod}`
			}
		} else if (payType === '8') {
			// TODO
			this.setState({
				checking: true
			})

			this.props.GETCREDITCARDS(['3', '18'], true).then(cards => {
				if (!cards || !cards.length) {
					getSafeCharge(payMethod).then(({ result }) => {
						const { isFree, payURL, params, transactionId, orderId } = result
						if (isFree) {
							window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
						} else {
							storage.add('temp-order', orderId, 1 * 60 * 60)
							submit(result)

							// window.location.href = `${payURL}?${qs.stringify(params, true)}`
						}
					}).catch(({ result }) => {
						alert(result)
						this.setState({
							checking: false
						})
					})
				} else {
					this.setState({
						checking: false
					})
					this.props.history.push(`${window.ctx || ''}${__route_root__}/credit-card`)
				}
			})
		} else if (payType === '26') {
			this.setState({
				checking: true
			})

			getSafeCharge(payMethod).then(({ result }) => {
				const { isFree, payURL, params, transactionId, orderId } = result
				if (isFree) {
					window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
				} else {
					storage.add('temp-order', orderId, 1 * 60 * 60)
					submit(result)

					// window.location.href = `${payURL}?${qs.stringify(params, true)}`
				}
			}).catch(({ result }) => {
				alert(result)
				this.setState({
					checking: false
				})
			})
		} else if (payType === '9') {
			if (!this.props.atmMethod) {
				alert(__confirm_paymethod__)
				this.$paylistdom.scrollIntoView()
				return
			}

			this.setState({
				checking: true
			})

			atmPay(this.props.atmMethod).then(data => data.result).then(this.processCallBack).catch(this.processErrorBack)
		} else if (payType === '10') {
			// if (!this.props.ticketMethod) {
			//   alert('Please select a pay method!')
			//   this.$paylistdom.scrollIntoView()
			//   return
			// }

			this.setState({
				checking: true
			})

			// ticketPay(this.props.ticketMethod).then(({result}) => {
			ticketPay('oxxo').then(data => data.result).then(this.processCallBack).catch(this.processErrorBack)
		} else if (payType === '11') {
			this.setState({
				checking: true
			})

			if (payMethod === '23') {
				const { cpf } = this.props
				// this.apac.validateAll()
				// if (this.apacBB.context._errors && this.apacBB.context._errors.length) {
				//   this.setState({
				//     checking: false
				//   })
				//   return
				// }

				this.apacPay(payMethod, this.props.cpf)
			} else {
				this.props.GETCREDITCARDS(['17', '22'], true).then((cards) => {
					if (!cards || cards.length < 1) {
						this.getApacPay(payMethod, this.props.cpf, (result) => {
							this.setState({
								checking: false
							})
							alert(result)
						})
					} else {
						this.setState({
							checking: false
						})
						this.props.history.push(`${window.ctx || ''}${__route_root__}/credit-card`)
					}
				}).catch(() => {
					this.setState({
						checking: false
					})
				})
			}
		} else if (payType === '12') {

			this.props.GETDLOCALCARDS(payMethod).then(cards => {
				this.props.history.push(`${window.ctx || ''}${__route_root__}/credit-card`)
			})

		} else if (payType === '13') {
			//Brazil BB
			this.dLocalPay({ payMethod, paymentMethodId: 'BL' })
		} else if (payType === '14' || payType === '15' || payType === '16' || payType === '17' || payType === '18' || payType === '19' || payType === '20' || payType === '21' || payType === '22' || payType === '23' || payType === '24' || payType === '25') {

			const paymentMethodId = this.getTcMethod()
			if (!paymentMethodId) {
				alert('Please select a pay method!')
				this.$paylistdom.scrollIntoView()
				return
			}

			if (payType !== '14') {
				this.documentForm.validateAll()
				if (this.documentRef.context && this.documentRef.context._errors && this.documentRef.context._errors.length > 0) {
					return
				}
			}

			this.dLocalPay({ payMethod, paymentMethodId, document: this.props.document })
		} else if (payType === '27') {
			const self = this
			this.setState({
				checking: true
			})

			Klarna.Payments.authorize({
				payment_method_category: selectedPayMethod.description
			}, {
				'shipping_address': this.state.klarnaParams.shipping_address,
				'billing_address': this.state.klarnaParams.shipping_address
			}, function (res) {

				const {
					authorization_token,
					approved,
					show_form,
					error
				} = res

				if (approved && authorization_token) {
					klarna_place_order({ authorizationToken: authorization_token, payMethod }).then(data => data.result).then(response => {

						const {
							order_id,
							redirect_url,
							fraud_status,
							authorized_payment_method,
							correlation_id,
							error_code,
							error_messages
						} = response

						if (error_code) {
							alert(error_messages)
							if (orderId && window.__is_login__) {
								self.props.history.push(`${window.ctx || ''}/checkout/${orderId}`)
							}
						} else if (fraud_status === 'ACCEPTED') {
							window.location.href = redirect_url
						}

						self.setState({ checking: false })
					}).catch(data => {
						alert(data.result)
						self.setState({ checking: false })
					})
				} else {
					self.setState({ checking: false })
					try {
						if(window.GeekoSensors){
							window.GeekoSensors.Track('pay_error', {
								payMethod,
								error: error ? JSON.stringify(error): ''
							})
						}
					}catch (e){
						console.error(e)
					}
				}



			})



		} else if (payType === '28') {
			this.setState({
				checking: true
			})
			pay({ payMethod: selectedPayMethod.id }).then(data => {
				const payResult = data.result
				if (payResult.success) {
					if (payResult.isFree) {
						window.location.href = window.ctx + '/order-confirm/' + payResult.transactionId
					} else {
						window.location.href = payResult.redirectCheckoutUrl
					}
				} else {
					alert(payResult.details)

					if (payResult.orderId && window.__is_login__) {
						this.props.history.push(`${window.ctx || ''}/checkout/${payResult.orderId}`)
					}
				}
				this.setState({
					checking: false
				})

			}).catch(data => {
				if (data.result) {
					alert(data.result)
				} else {
					alert(data)
				}
				this.setState({
					checking: false
				})

			})
		} else if (payType === '29') {
			this.setState({
				checking: true
			})
			get_pay_params({ payMethod: selectedPayMethod.id }).then(({ result }) => {
				const { isFree, payURL, params, transactionId, orderId } = result
				if (isFree) {
					window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
				} else {
					storage.add('temp-order', orderId, 1 * 60 * 60)
					submit(result)
				}
			}).catch(({ result }) => {
				alert(result)
				this.setState({
					checking: false
				})
			})
		}

		if (this.getCountdown(this.props.cart) > 0) {
			givingCoupon()
		}
		window.eventcheck(cart, payMethod)
	}


	dLocalPay(params) {

		this.setState({
			checking: true
		})
		payDLocal(params).then(data => data.result).then(this.processCallBack).catch(this.processErrorBack)
	}

	getApacPay(payMethod, cpf, fail) {
		getApacPay({ payMethod, cpfNumber: cpf }).then(({ result }) => {
			const { isFree, transactionId, orderId, success, details, solutions } = result
			if (isFree) {
				window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
			} else {
				storage.add('temp-order', orderId, 1 * 60 * 60)
				submit(result)
				// console.log(result)
			}
		}).catch(({ result }) => {
			fail(result)
		})
	}

	apacPay(payMethod, cpf, fail) {
		apacPay({ payMethod, cpfNumber: cpf }).then(data => data.result).then(this.processCallBack).catch(this.processErrorBack)
	}

	quickPlace(evt) {
		const { cart, paypal } = this.props

		const __confirm_address__ = this.props.intl.formatMessage({ id: 'please_confirm_address' })

		if (!cart.shippingDetail || !this.state.paypalAddressConfirmed) {
			alert(__confirm_address__)
			return
		}

		this.setState({
			paypaling: true
		})

		paypal_quick_pay({ payMethod: 1, paypalOrderId: window.token }).then(({ result }) => {
			window.location.href = `${window.ctx || ''}/order-confirm/${result}`
		}).catch(({ result }) => {
			this.setState({
				paypaling: false
			})
			alert(result)
			window.location.href = `${window.ctx || ''}${__route_root__}/`
		})
	}

	getCountdown(cart) {
		const { sendCouponMessage } = cart || { sendCouponMessage: null }
		let couponcountdown = 0
		if (sendCouponMessage) {
			// 设置15分钟后的毫秒数
			let endcounpontime = storage.get('_end_coupon_time')
			if (!endcounpontime) {
				endcounpontime = new Date().getTime() + 30 * 60 * 1000
				storage.add('_end_coupon_time', endcounpontime)
			}
			couponcountdown = Number(endcounpontime) - new Date().getTime()
		}
		return couponcountdown
	}

	chooseAnthorAddresHandle() {
		this.setState({
			refreshing: true
		})
		this.props.GETADDRESSES().then(() => {
			this.setState({
				showAddresses: true,
				refreshing: false
			})
		}).catch(() => {
			this.setState({
				refreshing: false,
				showAddresses: false
			})
		})
	}

	closeAddressesHandle() {
		this.setState({
			showAddresses: false
		})
	}
	//TODO
	addressEditHandle(shipping) {
		this.props.history.push(`${window.ctx || ''}${__route_root__}/address/${shipping.id}`)
	}

	addressEditHandle1() {
		this.goAddress()

	}

	goAddress() {
		let isp = this.props.location.pathname && this.props.location.pathname.indexOf('/cart/checkout') >= 0

		let goPage = isp ? `${window.ctx || ''}${__route_root__}/checkout/address` : `${window.ctx || ''}${__route_root__}/address`

		this.props.history.push(goPage)
	}

	addressSelectHandle(shipping) {
		this.setState({
			refreshing: true
		})
		setdefaultaddress(shipping.id).then(() => {
			this.props.GETADDRESSES().then(() => {
				this.setState({
					refreshing: false

				})
			}).catch(() => {
				this.setState({
					refreshing: false
				})
			})


			let __refreshCart
			if (shipping.country.value === 'BR') {
				Cookie.set('currency', 'BRL', { expires: 365 })
				__refreshCart = this.props.CHANGELANG('pt_BR')
			} else if (shipping.country.value === 'MX') {
				Cookie.set('currency', 'MXN', { expires: 365 })
				__refreshCart = this.props.CHANGELANG('es_MX')
			} else {
				__refreshCart = this.props.REFRESHCART()
			}



			__refreshCart.then(() => {

				this.setState({
					showAddresses: false
				})

				const { cart } = this.props

				if (cart.currency !== window.__currency__) {
					window.location.reload()
				}
			})
		}).catch(() => {
			this.setState({
				refreshing: false
			})
		})
	}

	selectShippingMethodHandle(method) {
		this.props.SELECTSHIPPINGMETHOD(method)
	}

	handleInputChange(event) {
		const target = event.target
		const value = target.type === 'checkbox' ? target.checked : target.value
		const name = target.name
		switch (name) {
		case 'cpf':
			this.props.SETCPF(value)
			break
		case 'email':
			this.props.SETEMAIL(value)
			break
		case 'securityCode':
			this.props.SETSECURITYCODE(value)
			break
		case 'installments':
			this.props.SETINSTALLMENTS(value)
			break
		case 'mercado-installments':
			this.props.SETMERCADOINTALLMENTS(value)
			break
		case 'document':
			this.props.SETDOCUMENT(value)
			break
		default:
			break
		}
	}

	leavehandle(evt) {
		const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
		if (evt.pageY - scrollTop <= 0 && !storage.get('leaveImageShowed') && this.state.leaveImage) {
			this.setState({
				showLeaveImage: true
			})
			storage.add('leaveImageShowed', 1, 24 * 60 * 60)
		}
	}

	scrollhandle(evt) {
		if (this.fixedCart && this.fixedCartWrapper) {
			const { clientHeight } = this.fixedCart
			this.fixedCartWrapper.style.height = clientHeight + 'px'
			const rect = this.fixedCartWrapper.getBoundingClientRect()
			if (rect.top <= 0) {
				this.fixedCart.classList.add('__fixed')
				this.fixedCart.style.left = `${Math.floor((document.body.clientWidth - 1150) / 2)}px`
			} else {
				this.fixedCart.classList.remove('__fixed')
			}
		}

		if (this.fixedSummary && this.fixedSummaryWrapper) {
			this.fixedSmall.classList.remove('__fixed')
			const { clientHeight } = document.getElementById('fixedSummary')
			if (window.innerHeight > clientHeight) {
				this.fixedSummaryWrapper.style.height = clientHeight + 'px'
				const rect = this.fixedSummaryWrapper.getBoundingClientRect()
				if (rect.top <= 0) {
					this.fixedSummary.classList.add('__fixed')
					this.fixedSummary.style.right = `${Math.floor((document.body.clientWidth - 1150) / 2)}px`
				} else {
					this.fixedSummary.classList.remove('__fixed')
				}
			} else {
				this.fixedSummary.classList.remove('__fixed')
				this.fixedSmall.classList.remove('__fixed')
				const { clientHeight } = this.fixedSmall

				if (clientHeight < window.innerHeight - 40) {
					this.fixedSmallWrapper.style.height = clientHeight + 'px'
					const rect = this.fixedSmallWrapper.getBoundingClientRect()
					if (rect.top <= 0) {
						this.fixedSmall.classList.add('__fixed')
						this.fixedSmall.style.right = `${Math.floor((document.body.clientWidth - 1150) / 2)}px`
					} else {
						this.fixedSmall.classList.remove('__fixed')
					}
				}


			}
		}
	}

	isOutStock(item) {
		return (item.inventory <= 0 && !item.isDomesticDelivery) && !item.isAutoInventory || item.status !== '1'
	}

	getValidItems(items = []) {
		return items.filter(item => !this.isOutStock(item))
	}

	getInvalidItems({ shoppingCartProductsByOverseas, domesticDeliveryCases }) {
		const invalidItems = []
		if (shoppingCartProductsByOverseas) {
			_.each(shoppingCartProductsByOverseas, (item) => {
				if (this.isOutStock(item)) invalidItems.push(item)
			})
		}

		if (domesticDeliveryCases) {
			_.each(domesticDeliveryCases, ({ shoppingCartProducts }) => {
				_.each(shoppingCartProducts, (item) => {
					if (this.isOutStock(item)) invalidItems.push(item)
				})
			})
		}
		return invalidItems
	}

	// PayMethods
	selectPayHandle(paymethod) {
		this.props.SELECTPAY(paymethod).then((cart) => {
			if (cart && cart.changeCurrencyMsg) {
				alert(cart.changeCurrencyMsg)
				window.location.reload()
			}
		})

		// storage.add('payMethod', paymethod.id, 365 * 24 * 60 * 60)
		// storage.add('payType', paymethod.type, 365 * 24 * 60 * 60)
	}

	atmClickHandle(method) {
		this.props.SETATMMETHOD(method.id)
		storage.add('atmMethod', method.id, 365 * 24 * 60 * 60)
	}

	tcClickHandle(method) {
		const { payMethod } = this.props.cart
		let _c = storage.get('cashoutMethod') || {}
		let cashoutMethod = { ..._c, [payMethod]: method }
		this.props.SETCASHOUT(cashoutMethod)
		storage.add('cashoutMethod', cashoutMethod, 365 * 24 * 60 * 60)
	}

	getTcMethod() {
		const { payMethod } = this.props.cart
		return (this.props.cashoutMethod || {})[payMethod]
	}

	initCashmethod(payMethod, method) {
		let _c = storage.get('cashoutMethod') || {}

		if (!_c[payMethod]) {
			let cashoutMethod = { ..._c, [payMethod]: method.id }
			this.props.SETCASHOUT(cashoutMethod)
			storage.add('cashoutMethod', cashoutMethod, 365 * 24 * 60 * 60)
		}

	}

	ticketClickHandle(method) {
		this.props.SETTICKETMETHOD(method.id)
		storage.add('ticketMethod', method.id, 365 * 24 * 60 * 60)
	}

	editAddress(address) {
		const { cart } = this.props
		this.props.UPDATINGADDRESS(true)
		if (__address_token__ && cart.shippingDetail) {
			paypal_set_shipping_details({ ...address, id: cart.shippingDetail.id, token: __address_token__ }).then(() => {
				this.props.UPDATINGADDRESS(false)
				this.setState({
					paypalAddressConfirmed: true
				})
				this.props.REFRESHCART()
			}).catch(({ result }) => {
				alert(result)
				this.props.UPDATINGADDRESS(false)
			})
		} else {

			let addressOpreator

			if (window.__is_login__) {
				addressOpreator = addAddress
			} else {
				addressOpreator = saveTempAddress
			}



			addressOpreator(address).then(() => {

				let __refreshCart
				if (address.country === 'BR') {
					Cookie.set('currency', 'BRL', { expires: 365 })
					__refreshCart = this.props.CHANGELANG('pt_BR')
				} else if (address.country === 'MX') {
					Cookie.set('currency', 'MXN', { expires: 365 })
					__refreshCart = this.props.CHANGELANG('es_MX')
				} else {
					__refreshCart = this.props.REFRESHCART()
				}

				__refreshCart.then(() => {
					this.props.UPDATINGADDRESS(false)
					if (this.actions) {
						this.togglePaypalButton(this.actions)
					}

					const { cart } = this.props

					if (cart.currency !== window.__currency__) {
						window.location.reload()
					}
				}).catch(() => {
					this.props.UPDATINGADDRESS(false)
				})


			}).catch(({ result }) => {
				alert(result)
				this.props.UPDATINGADDRESS(false)
			})
		}
	}

	openPoints() {
		this.setState({ refreshing: true })
		usePoint(!this.props.cart.openPointUse).then(data => data.result).then((cart) => {
			this.setState({ refreshing: false })
			this.props.REFRESHCART(cart)
		}).catch(() => {
			this.setState({ refreshing: false })
		})
	}

	openInsurance() {
		this.setState({ refreshing: true })
		useInsurance(!this.props.cart.insurance).then(data => data.result).then(cart => {
			this.setState({ refreshing: false })
			this.props.REFRESHCART(cart)
		}).catch(() => {
			this.setState({ refreshing: false })
		})
	}

	getItemUnselected(items) {
		return items && items.length > 0 && items.find(item => !item.selected)
	}

	getLocalFullSelected() {
		const { cart } = this.props
		const { domesticDeliveryCases } = cart

		if (!domesticDeliveryCases || domesticDeliveryCases.length < 1) { return true }

		return !domesticDeliveryCases.find(domestic => this.getItemUnselected(this.getValidItems(domestic.shoppingCartProducts)))
	}

	getOverseasFullSelected() {
		const { cart } = this.props

		const shoppingCartProductsByOverseas = this.getValidItems(cart.shoppingCartProductsByOverseas)

		if (!shoppingCartProductsByOverseas || shoppingCartProductsByOverseas.length < 1) { return true }
		return !this.getItemUnselected(shoppingCartProductsByOverseas)
	}

	getFullSelected() {
		return this.getOverseasFullSelected() && this.getLocalFullSelected()
	}

	selectAllHandle(select) {
		this.setState({
			refreshing: true
		})
		selectAll(select).then(data => data.result).then(cart => {
			this.props.REFRESHCART(cart)
			this.setState({
				refreshing: false
			})
		})
	}

	itemSelect(variantId, selected) {
		this.props.SELECT({
			variantIds: variantId,
			select: selected
		})
	}

	groupClick(variantIds, selected) {
		this.props.SELECT({
			variantIds: variantIds.join(','),
			select: selected
		})
	}

	itemDelete(item) {

		this.setState({
			showDeleteConfirm: true,
			itemDelete: () => {

				this.setState({
					showDeleteConfirm: false
				})
				this.props.DELETEITEM(item.variantId).then(() => {
					this.showSuccessTip('Removed Successed')
				})
			}
		})

	}

	giftDelete(item) {
		this.props.DELETEGIFT(item.variantId)
	}

	itemIdDelete(itemId) {
		this.setState({
			showDeleteConfirm: true,
			itemDelete: () => {

				this.setState({
					showDeleteConfirm: false
				})
				this.props.DELETEITEM(itemId).then(() => {
					this.showSuccessTip('Removed Successed')
				})
			}
		})
	}

	itemEdit(item) {
		this.setState({
			refreshing: true
		})
		product2(item.productId).then(({ result }) => {
			this.setState({
				refreshing: false,
				editing: {
					quantity: item.quantity,
					products: result.products,
					variantId: item.variantId,
					productId: result.selectedProductId,
					isGift: item.isGift
				}
			})
		})
	}

	itemEditClose() {
		this.setState({
			editing: null
		})
	}

	unSelectCoupon() {
		unusecoupon().then(() => {
			this.props.REFRESHCART()
		})
	}

	editHandle(oldId, newId, quantity) {
		this.props.EDITITEM(oldId, newId, quantity)
		this.itemEditClose()
	}

	editGiftHandle(oldId, newId, quantity) {
		this.props.EDITGIFT(newId)
		this.itemEditClose()
	}

	clearall() {
		const { cart } = this.props
		const ivalidItems = this.getInvalidItems(cart)
		const itemIds = (ivalidItems || []).map(item => item.variantId)

		this.props.DELETEITEMS(itemIds.join(',')).then(() => {
			this.showSuccessTip('Changed Successed')
		})
	}

	quantityChange(itemId, quantity, isRemove) {
		if (isRemove) {
			this.itemIdDelete(itemId)
		} else {
			this.props.EDITITEM(itemId, itemId, quantity)
		}
	}

	useMercadoCoupon(couponCode) {

		if (!couponCode) return

		this.setState({
			refreshing: true
		})
		useMercadoCoupon(couponCode).then(({ result }) => {
			this.setState({
				refreshing: false
			})
			this.props.REFRESHCART(result)
			this.showSuccessTip('Used Successed')

		}).catch(({ result }) => {
			this.setState({
				refreshing: false
			})
			alert(result)
		})
	}


	hasSelectedItem(items) {
		return items && !!items.find(item => item.selected)
	}

	formatOverseasDelivery(overseasDelivery) {
		const deliveryItems = overseasDelivery ? overseasDelivery.deliveryItems : []
		let hasSelectedItem = false

		if (deliveryItems && deliveryItems.length) {
			deliveryItems.forEach(deliveryItem => {
				let items = this.getValidItems(deliveryItem.shoppingCartProducts)
				deliveryItem.shoppingCartProducts = items || []

				if (!hasSelectedItem) hasSelectedItem = this.hasSelectedItem(items)

			})
		}

		return {
			overseasDelivery,
			hasSelectedItem
		}
	}

	formatDomesticDeliveryCases(domesticDeliveryCases) {
		let hasSelectedItem = false
		if (domesticDeliveryCases && domesticDeliveryCases.length) {
			domesticDeliveryCases.forEach(domestic => {
				let items = this.getValidItems(domestic.shoppingCartProducts)
				domestic.shoppingCartProducts = items || []
				if (!hasSelectedItem) hasSelectedItem = this.hasSelectedItem(items)
			})
		}
		return {
			domesticDeliveryCases,
			hasSelectedItem
		}
	}


	formatData(cart) {
		const invalidItems = this.getInvalidItems(cart)
		let data1 = this.formatOverseasDelivery(cart.overseasDelivery)
		let data2 = this.formatDomesticDeliveryCases(cart.domesticDeliveryCases)

		return {
			invalidItems,
			overseasDelivery: data1.overseasDelivery,
			domesticDeliveryCases: data2.domesticDeliveryCases,
			hasSelectedItem: data1.hasSelectedItem || data2.hasSelectedItem,
			hasSelectedItem1: data1.hasSelectedItem,
			hasSelectedItem2: data2.hasSelectedItem
		}
	}

	countCart(overseasDelivery, domesticDeliveryCases) {
		let count = 0

		const deliveryItems = overseasDelivery ? overseasDelivery.deliveryItems : null

		if (deliveryItems && deliveryItems.length) {
			deliveryItems.forEach(deliveryItem => {
				let items = deliveryItem.shoppingCartProducts
				if (items && items.length) {
					items.forEach(item => {
						if (item.selected) count += item.quantity
					})
				}
			})
		}


		if (domesticDeliveryCases && domesticDeliveryCases.length) {
			domesticDeliveryCases.forEach(domestic => {
				let items = domestic.shoppingCartProducts
				if (items && items.length) {
					items.forEach(item => {
						if (item.selected) count += item.quantity
					})
				}
			})
		}

		return count

	}

	render() {
		const { cart, loading, empty, intl } = this.props

		let isprogresspage


		let formatedData, invalidItems, cancheckout, hasLocalItems, sendCouponMessage, couponcountdown, totalCount = 0, hasOverseas
		let hasOverseasHead, fullSelected, cancheckout1, hasQuickPay, tcMethod
		let gifts
		let giftList
		if (cart) {
			isprogresspage = window.__is_login__ || (!window.token && cart.shippingDetail) || (this.props.location.pathname && this.props.location.pathname.indexOf('/cart/checkout') >= 0)
			formatedData = this.formatData(cart)
			invalidItems = formatedData.invalidItems
			sendCouponMessage = cart.sendCouponMessage
			couponcountdown = this.getCountdown(cart)
			cancheckout = formatedData.hasSelectedItem
			cancheckout1 = formatedData.hasSelectedItem1
			hasLocalItems = formatedData.domesticDeliveryCases && !!formatedData.domesticDeliveryCases.find(domestic => domestic.shoppingCartProducts && domestic.shoppingCartProducts.length)
			totalCount = this.countCart(formatedData.overseasDelivery, formatedData.domesticDeliveryCases)

			let validateOverseasItems = this.getValidItems(cart.shoppingCartProductsByOverseas)
			hasOverseas = validateOverseasItems && validateOverseasItems.length > 0
			hasOverseasHead = hasOverseas && hasLocalItems
			fullSelected = this.getFullSelected()

			//是否显示快捷支付按钮
			hasQuickPay = cart.isSupportPaypal

			tcMethod = this.getTcMethod()
			gifts = cart.gifts
			giftList = cart.giftList
		}


		const Address1 = cart && <Box title={intl.formatMessage({ id: 'shipping_address' })}>
			<div style={{ position: 'relative' }}>

				{
					this.state.showAddresses && this.props.addresses ? (
						<React.Fragment>
							<Icon onClick={this.closeAddressesHandle.bind(this)} style={{ position: 'absolute', right: 0, top: -35, fontSize: 28, cursor: 'pointer' }}>&#xe69a;</Icon>
							<Addresses shippings={this.props.addresses} onSelect={this.addressSelectHandle.bind(this)} onEdit={this.addressEditHandle.bind(this)} />
						</React.Fragment>

					) : (

						<div className="x-table x-fw __fixed __vm" style={{ paddingTop: 15 }}>
							<div className="x-cell" style={{ width: 362 }}>
								<Address onEdit={this.addressEditHandle1.bind(this)} address={cart.shippingDetail} />
							</div>
							{
								!window.token && window.__is_login__ && <div className="x-cell">
									<AddressBTN onClick={this.chooseAnthorAddresHandle.bind(this)} style={{ marginBottom: 10 }}>{intl.formatMessage({ id: 'choose_anthor_address' })}</AddressBTN>
									<AddressBTN onClick={() => { this.props.history.push(`${window.ctx || ''}${__route_root__}/address/add`) }} >+ {intl.formatMessage({ id: 'add_new_address' })}</AddressBTN>
								</div>
							}

						</div>

					)
				}

			</div>
		</Box>

		const Address2 = cart && <Box title={intl.formatMessage({ id: 'shipping_address' })}>
			<div style={{ paddingTop: 20 }}>
				<AddressFrom isConfirm={true} updating={this.props.addressUpdating} address={cart.shippingDetail} editAddress={this.editAddress.bind(this)} isNew={true} />
			</div>
		</Box>

		//TODO
		const AddressBook = () => {
			if (isprogresspage) {
				if (cart.shippingDetail) {
					return Address1
				}
				return Address2
			} else {
				if (__address_token__) {
					if (this.state.paypalAddressConfirmed) {
						return Address1
					}
					return Address2
				} else {
					return null
				}
			}
		}

		const __addressbook = cart ? AddressBook() : null


		const shippingLabel = !hasLocalItems ? intl.formatMessage({ id: 'shipping_method' }) : 'Shipping Method For Overseas Warehouse'


		const country = cart && cart.shippingDetail && cart.shippingDetail.country ? cart.shippingDetail.country.value : window.__country



		return loading ? <Loading /> : (empty ? <Empty /> : cart && <div>
			{(this.props.refreshing || this.state.refreshing) && <Refreshing />}
			<SHOPPINGBODY>

				<div className="__left">

					<Boxs>
						{
							__addressbook && <div ref={c => { this.$addressdom = c }}>
								{__addressbook}
							</div>
						}




						{
							isprogresspage && <div ref={c => this.$paylistdom = c}>
								<Box title={intl.formatMessage({ id: 'payment_method' })}>
									<div style={{ paddingTop: 20 }}>
										<PayMethods

											couponCode={this.props.couponCode}
											cpf={this.props.cpf}
											email={this.props.email}
											payMethodList={cart.payMethodList}
											selectedPayId={this.props.payMethod}
											selectPayHandle={this.selectPayHandle.bind(this)}
											ticketMethods={this.state.ticketMethods}
											atmClickHandle={this.atmClickHandle.bind(this)}
											ticketClickHandle={this.ticketClickHandle.bind(this)}
											atmMethod={this.props.atmMethod}
											ticketMethod={this.props.ticketMethod}
											atmMethods={this.state.atmMethods}
											handleInputChange={this.handleInputChange}
											installmentoptions={this.props.cart.payInstalmentsByOceanpaymentBRACreditCard || []}
											installments={this.props.installments}
											orderTotal={cart.orderSummary.orderTotal}
											paypalDiscountMessage={cart.paypalDiscountMessage}
											showMercadopagoCouponField={cart.showMercadopagoCouponField}

											boletoForm={(c) => this.boletoForm = c}
											boleto={(c) => { this.boleto = c }}

											apac={c => this.apac = c}
											apacBB={c => this.apacBB = c}

											brazilOceanForm={c => this.brazilOceanForm = c}
											brazilOcean={c => this.brazilOcean = c}

											setCouponHandle={this.useMercadoCoupon.bind(this)}
											couponCode={this.props.couponCode}

											tcClickHandle={this.tcClickHandle.bind(this)}
											tcMethod={tcMethod}

											documentForm={c => this.documentForm = c}
											documentRef={c => this.documentRef = c}
											document={this.props.document}
											initCashmethod={this.initCashmethod.bind(this)}
										/>
									</div>
								</Box>
							</div>
						}

						{
							(cart.shippingDetail && (cancheckout1 || !hasLocalItems) || (window.token && cancheckout1)) && <Box title={shippingLabel}>
								<ShippingMethods onSelect={this.selectShippingMethodHandle.bind(this)} shippingMethodList={cart.shippingMethodList} selectedShippingMethod={cart.shippingMethod} />
								{
									cart.shippingInsurancePrice2 && <div style={{ borderTop: '1px solid #e6e6e6', paddingTop: 10 }}>
										<LabelCheck clickHandle={this.openInsurance.bind(this)} disabled={cart.isShippingInsuranceMust} selected={cart.insurance}>
											<FormattedMessage id="add_shipping_insurance" values={{ price: <Red><Money money={cart.shippingInsurancePrice2} /></Red> }} />
										</LabelCheck>
										<Ask style={{ marginLeft: 5 }} message={cart.shippingInsuranceMsg2} />
									</div>
								}


							</Box>
						}

						<Box title={`${intl.formatMessage({ id: 'shopping_bag' })} (${totalCount})`} ignoreLine={true}>

							{
								giftList && giftList.length > 0 && <SwiperGifts onSelect={(vairant, product) => {
									this.itemEdit({
										productId: product.id,
										variantId: vairant.id,
										quantity: 1,
										isGift: true
									})
								}} products={giftList} giftWarnMsg={cart.giftWarnMsg} canBuyGift={cart.canBuyGift} />
							}






							{/* {
								cart.giftWarnMsg && <div style={{ padding: 14, backgroundColor: '#fafafa' }}>
									<span className="iconfont" style={{ color: '#ff8454', fontSize: 30, verticalAlign: 'middle' }}>&#xec45;</span>
									<span style={{ verticalAlign: 'middle' }} dangerouslySetInnerHTML={{ __html: cart.giftWarnMsg }}></span>
								</div>
							} */}

							<div ref={c => this.fixedCartWrapper = c}>
								<FixedTop style={{ width: 726 }} innerRef={c => this.fixedCart = c}>
									<SelectLine style={{ paddingTop: 20 }}>
										<div className="x-table __vm x-fw">
											<div className="x-cell">
												<CheckBox className={`${fullSelected ? 'selected' : ''}`} onClick={(evt) => { this.selectAllHandle(!fullSelected) }} style={{ verticalAlign: 'middle' }} />
												<span style={{ marginLeft: 10, verticalAlign: 'middle' }}>{intl.formatMessage({ id: 'select_all' })}</span>
											</div>
											<div className="x-cell __right">
												{cart.messages && cart.messages.shippingMsg && <span><span dangerouslySetInnerHTML={{ __html: cart.messages.shippingMsg }} /> <a style={{color: '#222'}} href={deeplink(cart.messages.shippingMsgLink)}>
													<FormattedMessage id="add" /> {'>'}
												</a></span>}
											</div>
										</div>
									</SelectLine>
									<ItemTableHead />
								</FixedTop>
							</div>

							{
								gifts && gifts.length > 0 && <Items
									disabledFunc={() => { }}
									quantityChange={() => { }}
									itemEdit={item => {
										this.itemEdit({
											...item,
											isGift: true
										})
									}}
									itemDelete={item => { this.giftDelete(item) }}
									items={gifts}
									isGift={true}
								/>
							}


							{
								hasOverseas && formatedData.overseasDelivery && <PromotionGroup style={{ marginTop: 25 }}
									hasHead={hasOverseasHead}
									group={formatedData.overseasDelivery}
									serverTime={cart.serverTime}
									groupClick={this.groupClick.bind(this)}
									itemDelete={this.itemDelete.bind(this)}
									itemSelect={this.itemSelect.bind(this)}
									itemEdit={this.itemEdit.bind(this)}
									setQuantity={(itemId, quantity) => { this.props.EDITITEM(itemId, itemId, quantity) }}
									quantityChange={this.quantityChange.bind(this)} />
							}


							{
								hasLocalItems && formatedData.domesticDeliveryCases.map(domestic => <GroupLocalItems
									style={{ marginTop: 25, borderBottom: '1px dashed #e6e6e6' }}
									key={domestic.countryCode}
									domestic={domestic}
									serverTime={cart.serverTime}
									groupClick={this.groupClick.bind(this)}
									itemDelete={this.itemDelete.bind(this)}
									itemSelect={this.itemSelect.bind(this)}
									overseasHandle={this.overseasHandle.bind(this)}
									itemEdit={this.itemEdit.bind(this)}
									setQuantity={(itemId, quantity) => { this.props.EDITITEM(itemId, itemId, quantity) }}
									quantityChange={this.quantityChange.bind(this)}
								/>)
							}

							{
								invalidItems && invalidItems.length > 0 && <GroupIvalidItems style={{ marginTop: 25, borderBottom: '1px dashed #e6e6e6' }}
									items={invalidItems}
									clearall={this.clearall.bind(this)}
									itemDelete={this.itemDelete.bind(this)}
									serverTime={cart.serverTime} />
							}

						</Box>
					</Boxs>

				</div>
				<div className="__right">
					<div style={{ height: 32 }}></div>
					<div ref={c => this.fixedSummaryWrapper = c}>
						<FixedTop style={{ paddingTop: 20, width: 314 }} id="fixedSummary" innerRef={c => this.fixedSummary = c}>
							<SecondBox>
								<div className="__hd">
									{intl.formatMessage({ id: 'coupon' })}
								</div>
								<div className="__bd">
									<CouponSelect unSelectCoupon={this.unSelectCoupon.bind(this)} selectCoupon={() => { this.props.history.push(`${window.ctx || ''}${__route_root__}/coupons`) }} coupon={cart.coupon} canUseCouponCount={cart.canUseCouponCount} />
									{
										cart.messages && cart.messages.couponMsg && <MessageTip style={{ marginTop: 20 }}>
											<span dangerouslySetInnerHTML={{ __html: cart.messages.couponMsg }} /> {'  '}
											<a style={{color: '#222'}} href={deeplink(cart.messages.couponMsgLink)}>
												<FormattedMessage id="add" /> {'>'}
											</a>
										</MessageTip>
									}

								</div>
							</SecondBox>
							{
								cart.expectedPoints > 0 && <SecondBox style={{ marginTop: 22 }}>
									<div className="__hd">
										{intl.formatMessage({ id: 'credits' })}
									</div>
									<div className="__bd">
										<LabelCheck clickHandle={this.openPoints.bind(this)} selected={cart.openPointUse}>
											<FormattedMessage id="credit_msg" values={{ credits: cart.expectedPoints, discount: <Red><Money money={cart.expectedPointDiscount} /></Red> }} />
										</LabelCheck>
										<span> </span>
										<Ask message={this.state.pointMessage} />
									</div>
								</SecondBox>
							}
							{
								!cancheckout1 && hasLocalItems && !window.__is_login__ && cart.shippingDetail && !window.token && <SecondBox style={{ marginTop: 22 }}>
									<div className="__hd">
										{intl.formatMessage({ id: 'shipping_insurance' })}
									</div>
									<div className="__bd">
										<LabelCheck clickHandle={this.openInsurance.bind(this)} disabled={cart.isShippingInsuranceMust} selected={cart.insurance}>
											<FormattedMessage id="add_shipping_insurance" values={{ price: <Red><Money money={cart.shippingInsurancePrice2} /></Red> }} />
										</LabelCheck>
										<Ask style={{ marginLeft: 5 }} message={cart.shippingInsuranceMsg2} />

									</div>
								</SecondBox>
							}




							<div ref={c => this.fixedSmallWrapper = c}>
								<FixedTop style={{ paddingTop: 40, width: 314 }} innerRef={c => this.fixedSmall = c}>
									<Boxs>
										<Box title={intl.formatMessage({ id: 'order_summary' })}>

											<OrderSummary style={{ marginTop: 20 }} display={cart.orderSummary.display} />
											{
												this.props.payMethod === '22' && <div style={{ marginTop: 5, textAlign: 'right' }}>
													<Red style={{ fontWeight: 'normal', marginLeft: 5, fontSize: 14 }}>(Em até 3x s/ juros)</Red>
												</div>
											}


											<div style={{marginTop: 15, lineHeight: '20px'}}>
												<CheckBox onClick={() => {this.setState({policySelected: !this.state.policySelected})}} className={this.state.policySelected ? 'selected':''}/>
												<span style={{marginLeft:10}}>
													<FormattedMessage id="agree_with_policy" values={{
														term: <a style={{color: '#e5004f'}} href={`${window.ctx||''}/fs/term-of-service-pc`}>Terms of Service</a>,
														refund: <a style={{color: '#e5004f'}} href={`${window.ctx||''}/fs/return-policy-pc`}>Return Policy</a>,
													}}/>
												</span>
											</div>

											{
												cancheckout && cart.canCheckout ? (
													isprogresspage ? <div>
														{
															this.props.payMethod === '1' ? <div id='ip-paypal-pay' style={{ marginTop: 30 }} ref={(c) => this.paypalRender(c, 'normal')} /> : (!this.state.checking ? <BigButton onClick={this.checkout.bind(this)} bgColor="#222" style={{ marginTop: 30, height: 45, lineHeight: '45px', textTransform: 'uppercase', fontSize: 18 }}>
																{intl.formatMessage({ id: 'check_out' })}
															</BigButton> : <BigButton bgColor="#999" style={{ marginTop: 30, height: 45, lineHeight: '45px' }}>
																{intl.formatMessage({ id: 'please_wait' })}...
															</BigButton>)
														}

													</div> : (
														window.token ? <div>
															<BigButton onClick={this.quickPlace.bind(this)} bgColor="#e5004f" style={{ marginTop: 30, height: 45, lineHeight: '45px', textTransform: 'uppercase', fontSize: 18 }}>
																{intl.formatMessage({ id: 'place_order' })}
															</BigButton>
														</div> : <div>




															<BigButton onClick={
																() => {
																	this.props.history.push(`${window.ctx || ''}${__route_root__}/checkout`)
																}
															} bgColor="#222" style={{ marginTop: 30, height: 45, lineHeight: '45px', textTransform: 'uppercase', fontSize: 18 }}>
																{intl.formatMessage({ id: 'proceed_checkout' })}
															</BigButton>

															{
																hasQuickPay && <React.Fragment>

																	<div style={{ color: '#999', textAlign: 'center', height: 30, lineHeight: '30px', textTransform: 'uppercase' }}>
																		{intl.formatMessage({ id: 'or' })}
																	</div>

																	{
																		cart.paypalDiscountMessage && <DISCOUNTTIP style={{ marginBottom: 10, display: 'inline-block' }}>
																			<span dangerouslySetInnerHTML={{ __html: cart.paypalDiscountMessage }} />
																		</DISCOUNTTIP>
																	}

																	<div id='ip-paypal-pay' ref={(c) => this.paypalRender(c, 'quick')} />





																</React.Fragment>

															}


															<klarna-express-button
																ref={c => {
																	window.renderKlarna()
																}}
																data-locale="en-US"
																data-theme="default"
															/>

															{/* <button 
																ref={ c => {
																		window.renderAfterpay()
																	} 
																}
																id="afterpay-express-button"
																data-afterpay-entry-point="cart"
																data-afterpay-checkout-button-label="Checkout using Afterpay Express">
																Checkout using Afterpay Express
															</button> */}

														</div>

													)

												) : (
													<BigButton bgColor="#999" style={{ marginTop: 30, cursor: 'not-allowed', height: 45, lineHeight: '45px', textTransform: 'uppercase', fontSize: 18 }}>
														{intl.formatMessage({ id: 'check_out' })}
													</BigButton>
												)
											}





											{

												couponcountdown > 1000 ? <MessageTip style={{ marginTop: 20 }}>
													<div className="x-table __fixed x-fw __vm">
														<div className="x-cell" style={{ width: 75 }}>
															<CountDownBlock offset={couponcountdown} />
														</div>
														<div className="x-cell">
															<span dangerouslySetInnerHTML={{ __html: cart.sendCouponMessage.message }} />
														</div>
													</div>
												</MessageTip> : (
													cart.messages && cart.messages.orderSummaryMsg && <MessageTip style={{ marginTop: 20 }}>
														<span dangerouslySetInnerHTML={{ __html: cart.messages.orderSummaryMsg }} />
													</MessageTip>

												)
											}


											<div style={{ marginTop: 40 }}>
												<div>
													{intl.formatMessage({ id: 'we_accept' })}
												</div>
												<div style={{ marginTop: 10 }}>
													<img style={{ width: '100%' }} src={((this.state.payImages || []).find(i => i.lang === country) || (this.state.payImages || []).find(i => i.lang === 'other') || {}).imageUrl} />
												</div>
											</div>

										</Box>
									</Boxs>
								</FixedTop>
							</div>

						</FixedTop>

					</div>

				</div>

			</SHOPPINGBODY>

			{
				this.state.editing && <ItemEditor editHandle={this.state.editing.isGift ? this.editGiftHandle.bind(this) : this.editHandle.bind(this)} onClose={this.itemEditClose.bind(this)} {...this.state.editing} />
			}

			{
				this.state.paypaling && <React.Fragment>
					<Mask />
					<div className="paypal-loading-wrap">
						<div className="paypal-back"></div>
						<div className="paypal-loading">
						</div>
					</div>
				</React.Fragment>
			}

			{
				this.state.showLeaveImage && this.state.leaveImage && <Modal onClose={() => { this.setState({ showLeaveImage: false }) }}>
					<img style={{ cursor: 'pointer' }} onClick={() => { this.setState({ showLeaveImage: false }) }} src={this.state.leaveImage} />
				</Modal>
			}


			{
				this.state.successTip && <SUCCESSTIP>
					{this.state.successTip}
				</SUCCESSTIP>
			}

			{
				this.state.showDeleteConfirm && <Modal onClose={() => { this.setState({ showDeleteConfirm: false }) }}>
					<Confirm yes={this.state.itemDelete} no={() => { this.setState({ showDeleteConfirm: false }) }}>
						<span><FormattedMessage id="sure_delete_item" /></span>
					</Confirm>
				</Modal>
			}


		</div>)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ShoppingCart))
