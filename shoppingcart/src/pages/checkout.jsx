import React from 'react'
import styled from 'styled-components'
import { injectIntl, FormattedMessage } from 'react-intl'
import PayMethodList from '../components/msite/paymethod-list.jsx'
import Refreshing from '../components/msite/refreshing.jsx'
import Ask from '../components/ask.jsx'
import FixedMessage from '../components/msite/fixed-message.jsx'
import _ from 'lodash'
import {
	paypalpay,
	checkout_updatepaymethod,
	useMercadoCoupon,
	checkout_getparams,
	checkout_pay,
	checkout_credit,
	checkout_paypal,
	useMercadocard,
	usecreditcard,
	checkout_computop,
	getJwt,
	getLookup,
	oceanpay3d,
	openSafeChargeOrder,
	setSafeChargeStatus,
	klarna_order_create_session,
	klarna_order_get_params,
	klarna_order_place_order,
	placeOrderAll
} from '../api'


import {
	setSecurityCode,
	setInstallments,
	setMercadoInstallments,
	setAtmMethod,
	setTicketMethod,
	fetchCheckout,
	getCreditCards,
	getMercadoCards,
	toggleCredit,
	toggleCreditStatus,
	fetchPaypalUrl,
	fetchMe,
	getDLocalCards,
	setDocument,
	setCashout
} from '../store/actions.js'

import { submit } from '../utils/common-pay.js'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { __route_root__, storage } from '../utils/utils.js'
import Address from '../components/msite/address.jsx'
import Icon from '../components/icon.jsx'

import { Boxs, Box, BoxBody, BoxHead } from '../components/msite/layout.jsx'
import { Grey, Red } from '../components/text.jsx'

import { BigButton } from '../components/msite/buttons.jsx'
import Money from '../components/money.jsx'
import { AnimatedRoute } from 'react-router-transition'
import Loading from '../components/msite/loading.jsx'
import Loadable from 'react-loadable'

import Mask from '../components/mask.jsx'
import cardbinding from './cardbinding.jsx'


const CreditCard = Loadable({
	loader: () => import(/* webpackChunkName: "component--credit-card" */ '../components/msite/credit-card.jsx'),
	loading: Loading
})

const CheckoutAddress = Loadable({
	loader: () => import(/* webpackChunkName: "component--check-address" */ './checkout-address.jsx'),
	loading: Loading
})

const CheckoutMercado = Loadable({
	loader: () => import(/* webpackChunkName: "component--check-mercado" */ './checkout-mercado.jsx'),
	loading: Loading
})


const CheckoutDLocal = Loadable({
	loader: () => import(/* webpackChunkName: "component--check-dlocal" */ './checkout-dlocal.jsx'),
	loading: Loading
})

const CheckoutOcean = Loadable({
	loader: () => import(/* webpackChunkName: "component--check-binding" */ './checkout-binding.jsx'),
	loading: Loading
})


const defaultStyles = {
	position: 'fixed',
	top: 0,
	backgroundColor: '#fff',
	width: '100%',
	zIndex: 20,
	overflow: 'auto'

}

const defaultAnimations = {
	atEnter: { offset: 100, height: 0 },
	atLeave: { offset: 100, height: 0 },
	atActive: { offset: 0, height: 100 }
}

const DashedLine = styled.div`
		background: linear-gradient(to right, #dd747d 35%,transparent 25%,transparent 50%,#626e94 50%,#626e94 85%,transparent 75%);
		background-size: 35px 1px;
		height: 1.8px;  
		transform:skew(20deg,0);
		position: absolute;
		width: 100%;
		bottom:0;
		left:0;
`

const OrderSummary = styled.div`
	padding: 0 10px 10px 10px;
	margin-top: -8px;
	& > div.__summary{
		padding-top: 5px;
		padding-bottom: 5px;
		font-size: 14px;
		font{
			font-size: 14px !important;
		} 
	}
`

const FixedCheck = styled.div`
	&>div{
		&.__total{
			font-size: 18px;
			height: 25px;
		}
		&.__btn{
			margin-top: 2px;
		}
	}
	padding: 10px;
	box-shadow: 0 -1px 4.5px rgba(136, 136, 136, 0.5);
	position: fixed;
	width: 100%;
	bottom: 0;
	left: 0;
	background-color: #fff;
	z-index:5;
`

const ShoppingBody = styled.div`
	& > .__hd{
		height: 44px;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: #fff;
		z-index: 1;
	}
	& > .__bd{
		padding-top: 44px;
	}

	& > .__fd{
		height: 60px;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding-left: 20px;
		padding-right: 20px;
		align-items: center;
		border-top: solid 1px #e6e6e6;
	}
`

const ShoppingHead = styled.div`
	position: relative;
	text-align: center;
	line-height: 44px;
	height: 44px;
	.__title{
		font-family: SlatePro-Medium;
		font-size: 17px;
		color: #222;
	}

	.__back, .__tools{
		position: absolute;
		top: 0;
	}

	.__back{
		left: 12px;
		font-family: iconfont;
		cursor: pointer;
		font-size: 18px;
		transform: rotate(180deg);
	}

	.__tools{
		right: 12px;
		display: inline-block;

		.__edit, .__wish{
			font-family: iconfont;
			cursor: pointer;
			font-size: 18px;
			cursor: pointer;
		}

		.__wish{
			margin-left: 12px;
		}
	}

`

const mapStateToProps = (state) => {
	return {
		...state
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		GETME: () => {
			return dispatch(fetchMe())
		},
		GETCHECKOUT: (orderId) => {

			return dispatch(fetchCheckout(orderId))
		},
		GETPAYPAL: () => {
			return dispatch(fetchPaypalUrl())
		},
		SETCHECKOUT: (checkout) => {
			dispatch({
				type: 'SET_CHECKOUT',
				checkout
			})
		},
		SETSECURITYCODE: (securityCode) => {
			dispatch(setSecurityCode(securityCode))
		},
		SETINSTALLMENTS: (installments) => {
			dispatch(setInstallments(installments))
		},
		SETMERCADOINTALLMENTS: (installments) => {
			dispatch(setMercadoInstallments(installments))
		},
		SETATMMETHOD: (method) => {
			dispatch(setAtmMethod(method))
		},
		SETTICKETMETHOD: (method) => {
			dispatch(setTicketMethod(method))
		},
		GETMERCADOCARDS: () => {
			return dispatch(getMercadoCards())
		},
		GETCREDITCARDS: (payMethod, multi) => {
			return dispatch(getCreditCards(payMethod, multi))
		},
		TOGGLECREDIT: (isShow) => {
			dispatch(toggleCredit(isShow))
		},
		TOGGLECREDITSTATUS: (status) => {
			dispatch(toggleCreditStatus(status))
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

const Checkout = class extends React.Component {
	constructor(props) {
		super(props)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.sdkResponseHandler = this.sdkResponseHandler.bind(this)
		this.state = {
			checkout: null,
			refreshing: false,
			showAsk: false,
			askMessage: null,
			ticketMethods: [],
			atmMethods: [],
			paypaling: false,
			checking: false,
			dlocalerror: null,
			klarnaParams: {}
		}
		this.processCallBack = this.processCallBack.bind(this)
		this.processErrorBack = this.processErrorBack.bind(this)
	}


	refreshCheckout(orderId) {
		this.setState({
			refreshing: true
		})
		this.props.GETCHECKOUT(orderId).catch(({ result }) => {
			alert(result)
			window.location.href = `${window.ctx || ''}/me/m/order/detail/${orderId}`
		}).then(() => {
			this.setState({
				refreshing: false
			})
		})
	}

	cvvRef(c) {
		this.cvvField = c
	}

	componentDidUpdate(prevProps) {
		const { checkout: oldCheckout } = prevProps
		const { checkout } = this.props
		if (!_.isEqual(checkout, oldCheckout) && checkout) {
			const { payMethod, payMethods } = checkout
			const selectedPayMethod = payMethods.find(p => p.id === payMethod)
			if (selectedPayMethod && selectedPayMethod.type === '27') {
				this.loadKlarna(selectedPayMethod)
			}
		}
	}

	componentDidMount() {
		const { orderId } = this.props.match.params
		this.refreshCheckout(orderId)
		this.props.GETPAYPAL()
		this.props.GETME().then(({ document }) => this.props.SETDOCUMENT(document))

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
	}

	handleInputChange(event) {
		const target = event.target
		const value = target.type === 'checkbox' ? target.checked : target.value
		const name = target.name
		switch (name) {
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

	createKlarnaSession(orderId, payMethod) {
		return klarna_order_create_session({ orderId, payMethod }).then(data => data.result)
	}

	initKlarna(orderId, payMethod) {
		return this.createKlarnaSession(orderId, payMethod).then(res => {
			const { client_token } = res
			Klarna.Payments.init({
				client_token
			})
			return client_token
		})
	}

	loadKlarna(paymethod) {
		const { checkout } = this.props
		const { orderId } = checkout
		this.initKlarna(orderId, paymethod.id).then(() => {
			klarna_order_get_params({ orderId, payMethod: paymethod.id }).then(data => data.result).then(params => {

				this.setState({
					klarnaParams: params
				})

				Klarna.Payments.load({
					container: `#klarna-payments-container-${paymethod.id}`,
					payment_method_category: paymethod.description
				}, {
					"locale": params.locale,
					"purchase_country": params.purchase_country,
					"purchase_currency": params.purchase_currency,
					"order_amount": params.order_amount,
					"order_lines": params.order_lines
				}, function (res) {
					console.debug(res)
				})
			})
		})
	}

	selectPayHandle(paymethod) {
		const { orderId } = this.props.match.params
		this.setState({
			refreshing: true
		})
		checkout_updatepaymethod(orderId, paymethod.id).then(({ result }) => {
			this.props.SETCHECKOUT(result)
			this.setState({
				refreshing: false
			})
		}).catch(({ result }) => {
			alert(result)
			this.setState({
				refreshing: false
			})
		})
	}

	tcClickHandle(method) {
		const { payMethod } = this.props.checkout
		let _c = storage.get('cashoutMethod') || {}
		let cashoutMethod = { ..._c, [payMethod]: method }
		this.props.SETCASHOUT(cashoutMethod)
		storage.add('cashoutMethod', cashoutMethod, 365 * 24 * 60 * 60)
	}

	getTcMethod() {
		const { payMethod } = this.props.checkout
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

	atmClickHandle(method) {
		this.props.SETATMMETHOD(method.id)
		storage.add('atmMethod', method.id, 365 * 24 * 60 * 60)
	}

	ticketClickHandle(method) {
		this.props.SETTICKETMETHOD(method.id)
		storage.add('ticketMethod', method.id, 365 * 24 * 60 * 60)
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
			// TODO refresh order
		}).catch(({ result }) => {
			this.setState({
				refreshing: false
			})
			alert(result)
		})
	}

	mercadoCouponClickHandle() {
		this.setState({
			showAsk: true,
			askMessage: 'Utiliza el código MERCADOPAGO para obtener un 10% de descuento adicional.'
		})
	}

	displayAskClickHandle(evt, { type, target }) {
		this.setState({
			showAsk: true,
			askMessage: target
		})
	}

	checkparams(params) {
		return checkout_getparams(params).then(({ result }) => {
			const { isFree, transactionId } = result
			if (isFree) {
				window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
			} else {
				submit(result)
			}
		})
	}

	checkcomputop(params) {
		return checkout_computop(params).then(({ result }) => {
			const { isFree, transactionId } = result
			if (isFree) {
				window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
			} else {

				result = {
					payURL: result.URL,
					params: {
						Data: result.Data,
						Len: result.Len,
						MerchantID: result.MerchantID
					}
				}

				submit(result)
			}
		})
	}

	checkpay(params) {
		return checkout_pay(params).then(({ result }) => {
			const { transactionId, success, details } = result
			if (success) {
				window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
			} else {
				alert(details)
				this.setState({
					checking: false
				})
			}
		})
	}

	checkoutpaypal() {
		const { paypal } = this.props
		this.setState({
			paypaling: true
		})
		paypalpay('normal').then(data => data.result).then(({ TOKEN, success, transactionId, ACK, L_LONGMESSAGE0 }) => {
			if (success && transactionId && !TOKEN) {
				window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
				return
			}
			if (ACK === 'Failure') {
				alert(L_LONGMESSAGE0)
				this.setState({
					paypaling: false
				})
				return
			}

			if (TOKEN && paypal) {
				window.location.href = paypal + TOKEN
			}
		}).catch(({ result }) => {
			this.setState({
				paypaling: false
			})
			alert(result)
		})
	}


	checkout(event) {
		const { checkout, paypal } = this.props

		if (checkout) {
			const payMethod = checkout.payMethods.find(m => m.id === checkout.payMethod) || checkout.payMethods[0]
			const { orderId, shippingDetail } = checkout

			if (shippingDetail.country && shippingDetail.country.value === 'BR' && !shippingDetail.cpf) {
				const path = {
					pathname: `${this.props.match.url}/address`,
					state: {
						validate: true
					}
				}
				this.props.history.push(path)
				return
			}

			if (payMethod) {

				if (payMethod.id === '18') {
					this.props.history.push(`${window.ctx || ''}${__route_root__}/credit/${orderId}`)
					return
				}



				switch (payMethod.type) {
					case '1':
						this.setState({
							paypaling: true,
							checking: true
						})
						checkout_paypal({ orderId }).then(data => data.result).then(({ TOKEN, success, transactionId, ACK, L_LONGMESSAGE0 }) => {
							if (success && transactionId && !TOKEN) {
								window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
								return
							}
							if (ACK === 'Failure') {
								alert(L_LONGMESSAGE0)
								this.setState({
									paypaling: false,
									checking: false
								})
								return
							}

							if (TOKEN && paypal) {
								window.location.href = paypal + TOKEN
							}
						}).catch(({ result }) => {
							this.setState({
								paypaling: false,
								checking: false
							})
							alert(result)
						})
						break
					case '2':
						this.setState({
							checking: true
						})
						this.props.GETCREDITCARDS(payMethod.id).then(cards => {
							if (!cards || cards.length < 1) {
								this.props.history.push(`${this.props.match.url}/ocean/credit`)
								this.setState({
									checking: false
								})
							} else {
								this.setState({
									checking: false
								})
								this.props.TOGGLECREDIT(true)
							}
						})
						break

					case '3':
						this.setState({
							checking: true
						})
						this.checkcomputop({ orderId }).catch((data) => {
							this.setState({
								checking: false
							})
							if (data) {
								alert(data.result)
							}
						})
						break
					case '5':
					case '26':
						this.setState({
							checking: true
						})
						this.checkparams({ orderId }).catch(() => {
							this.setState({
								checking: false
							})
						})
						break
					case '6':
						break
					case '7':
						this.setState({
							checking: true
						})
						this.props.GETMERCADOCARDS().then((cards) => {
							if (!cards || cards.length < 1) {
								this.props.history.push(`${this.props.match.url}/mercado/credit`)
							} else {
								this.props.TOGGLECREDIT(true)
							}
							this.setState({
								checking: false
							})
						}).catch(() => {
							this.setState({
								checking: false
							})
						})
						break
					case '8':
						this.setState({
							checking: true
						})
						this.props.GETCREDITCARDS(payMethod.id).then(cards => {
							if (!cards || cards.length < 1) {
								this.checkparams({
									orderId
								}).catch(() => {
									this.setState({
										checking: false
									})
								})
							} else {
								this.setState({
									checking: false
								})
								this.props.TOGGLECREDIT(true)
							}
						})
						break
					case '9':
						if (!this.props.atmMethod) {
							alert('Please select a pay method!')
							this.$paylistdom.scrollIntoView()
							return
						}
						this.setState({
							checking: true
						})
						this.checkpay({
							orderId,
							paymentMethodId: this.props.atmMethod
						}).catch(() => {
							this.setState({
								checking: true
							})
						})
						break
					case '10':
						this.setState({
							checking: true
						})
						this.checkpay({
							orderId,
							paymentMethodId: 'oxxo'
						}).catch(() => {
							this.setState({
								checking: true
							})
						})
						break
					case '11':
						this.setState({
							checking: true
						})
						if (payMethod.id === '23') {
							this.checkpay({
								orderId
							}).catch(() => {
								this.setState({
									checking: true
								})
							})
						} else if (payMethod.id === '22') {
							this.checkparams({
								orderId
							}).catch(() => {
								this.setState({
									checking: true
								})
							})
						}
						break

					case '12':
						this.setState({
							checking: true
						})

						this.props.TOGGLECREDIT(true)
						this.props.GETDLOCALCARDS(payMethod.id).then(cards => {
							if (!cards || cards.length < 1) {
								this.props.history.push(`${this.props.match.url}/dlocal/credit`)
							}
							this.setState({
								checking: false
							})
						}).catch(({ result }) => {
							alert(result)
							this.setState({
								checking: false
							})
						})

						break

					case '13':
						this.checkpay({
							orderId,
							payMethod: payMethod.id,
							paymentMethodId: 'BL'
						}).catch(({ result }) => {
							alert(result)
							this.setState({
								checking: false
							})
						})
						break
					case '14':
					case '15':
					case '16':
					case '17':
					case '18':
					case '19':
					case '20':
					case '21':
					case '22':
					case '23':
					case '24':
					case '25':
						{
							if (payMethod.type !== '14') {
								this.documentForm.validateAll()
							}


							const paymentMethodId = this.getTcMethod()
							let document = this.props.document

							if (!paymentMethodId) {
								alert('Please select a pay method!')
								this.$paylistdom.scrollIntoView()
								return
							}

							if (this.props.document || payMethod.type === '14') {
								this.setState({
									checking: true
								})
								this.checkpay({
									orderId,
									payMethod: payMethod.id,
									paymentMethodId,
									document
								}).catch(({ result }) => {
									alert(result)
									this.setState({
										checking: false
									})
								})
							}
						}
						break
					case '27':
						const self = this
						this.setState({
							checking: true
						})

						Klarna.Payments.authorize({
							payment_method_category: payMethod.description
						}, {
							"shipping_address": this.state.klarnaParams.shipping_address,
							"billing_address": this.state.klarnaParams.shipping_address
						}, function (res) {

							const {
								authorization_token,
								approved,
								show_form
							} = res

							if (approved && authorization_token) {
								klarna_order_place_order({ authorizationToken: authorization_token, payMethod: payMethod.id, orderId }).then(data => data.result).then(response => {

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
									} else if (fraud_status === "ACCEPTED") {
										window.location.href = redirect_url
									}

									self.setState({ checking: false })
								}).catch(data => {
									alert(data.result)
									self.setState({ checking: false })
								})
							} else {
								self.setState({ checking: false })
							}



						})
						break
					case '28':
						this.setState({
							checking: true
						})
						checkout_pay({ payMethod: payMethod.id, orderId }).then(data => {
							const payResult = data.result
							if (payResult.success) {
								if (payResult.isFree) {
									window.location.href = ctx + '/order-confirm/' + result.transactionId
								} else {
									window.location.href = payResult.redirectCheckoutUrl
								}
							} else {
								alert(payResult.details)
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
						break
					case '29':
						this.setState({
							checking: true
						})
						checkout_getparams({ payMethod: payMethod.id, orderId }).then(({ result }) => {
							const { isFree, payURL, params, transactionId, orderId } = result
							if (isFree) {
								window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
							} else {
								submit(result)
							}
						}).catch(({ result }) => {
							alert(result)
							this.setState({
								checking: false
							})
						})
						break
				}

			}


		}


	}


	handleCredit(evt) {
		evt.preventDefault()
		this.setState({
			checking: true
		})
		const { installments, checkout, document } = this.props

		const payMethodInfo = checkout.payMethods.find(p => p.id === checkout.payMethod)

		const params = payMethodInfo.type === '12' ? { orderId: checkout.orderId, installments, document, payMethod: checkout.payMethod } : { orderId: checkout.orderId, payInstallments: installments }

		if (payMethodInfo.type === '12') {
			this.dlocalref.validateAll()
			if (this.dlocalbtn && this.dlocalbtn.context && this.dlocalbtn.context._errors.length > 0) {
				this.setState({
					checking: false
				})
				return
			}



			if (window.__dlocal) {
				window.__dlocal.createToken(this.cvvField, {}).then(result => {
					this.payCredit({ ...params, token: result.token })
				}).catch(result => {
					if (result.error) {
						// Inform the customer that there was an error.
						this.setState({
							checking: false,
							dlocalerror: result.error.message
						})
					}
				})
			}


		} else if (checkout.payMethod === '18') {

			openSafeChargeOrder(checkout.orderId).then(data => data.result).then(result => {
				this.authenticate3d(result)
			}).catch(data => {
				alert(data.result)
				this.setState({
					checking: false
				})
			})

		} else {
			this.payCredit(params)
		}


	}

	authenticate3d(result) {
		const response = result.openOrderResponse
		const self = this

		// Instantiate Safecharge API
		const sfc = SafeCharge({
			env: window.safechargeEnv || 'prod', // the environment you’re running on, prod for production
			merchantId: response.merchantId, //as asigned by SafeCharge
			merchantSiteId: response.merchantSiteId // your merchantsite id provided by Safecharge
		})


		sfc.createPayment({
			"sessionToken": response.sessionToken, //recieved form opeOrder API
			"merchantId": response.merchantId, //as asigned by SafeCharge
			"merchantSiteId": response.merchantSiteId, //as asigned by SafeCharge
			"userTokenId": response.userTokenId,
			"clientUniqueId": response.clientUniqueId, // optional
			"paymentOption": {
				"userPaymentOptionId": result.userPaymentOptionId,
			},
			"billingAddress": {
				"country": result.country,
				"email": result.email
			},
			"deviceDetails": {
				"ipAddress": result.ip
			}
		}, function (res) {
			setSafeChargeStatus(response.sessionToken).then(data => data.result).then(result => {
				if (res.result === "APPROVED") {
					window.location.href = `${window.ctx || ''}/order-confirm/${response.clientUniqueId}`
				} else {
					alert(res.errorDescription || res.reason || 'Error')
					self.setState({
						checking: false
					})
				}
			}).catch(data => {
				alert(data.result)
				self.setState({
					checking: false
				})
			})
		})
	}

	triggerOcean() {
		const { orderId } = this.props.checkout
		getJwt(orderId).then(({ result }) => {
			const { jwt, bin } = result
			this.listenOcean3D(orderId, jwt, bin)
		}).catch(({ result }) => {
			alert(result)
			this.setState({
				checking: false
			})
		})
	}

	listenOcean3D(orderId, jwt, bin) {

		var self = this

		/*global Cardinal b:true*/
		/*eslint no-undef: "error"*/
		Cardinal.setup('init', {
			jwt: jwt
		})


		Cardinal.trigger('bin.process', bin)

		Cardinal.off('payments.setupComplete')
		Cardinal.off('payments.validated')

		Cardinal.on('payments.setupComplete', function (setupCompleteData) {
			const referenceId = setupCompleteData.sessionId
			getLookup(referenceId, orderId).then(({ result: lookup }) => {
				if (lookup && lookup.lookupUrl) {
					Cardinal.continue('cca', {
						'AcsUrl': lookup.lookupUrl,
						'Payload': lookup.lookupLoad
					}, {
						'OrderDetails': {
							'TransactionId': lookup.transactionId
						}
					},
						jwt
					)
				} else {
					self.payOcean3D(orderId)
				}
			}).catch(({ result }) => {
				alert(result)
				this.setState({
					checking: false
				})
			})


		})

		Cardinal.on('payments.validated', function (data, jwt) {
			var cavv = data.Payment.ExtendedData.CAVV
			var eci = data.Payment.ExtendedData.ECIFlag
			var xid = data.Payment.ProcessorTransactionId
			// var status = data.Payment.ExtendedData.PAResStatus
			// var transactionId = data.Payment.ProcessorTransactionId

			//请求支付
			self.payOcean3D(orderId, eci, cavv, xid)

		})
	}

	payOcean3D(orderId, eci, cavv, xid) {
		oceanpay3d({ orderId, cardEci: eci, cardCavv: cavv, cardXid: xid }).then(data => data.result).then(this.processCallBack).catch(this.processErrorBack)
	}


	processCallBack({ success, transactionId, details, orderId, solutions = '' }) {
		if (success) {
			window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
		} else {
			alert(details + '\n' + solutions)
			this.setState({
				checking: false
			})
		}
	}

	processErrorBack({ result }) {
		alert(result)
		this.setState({
			checking: false
		})
	}

	payCredit(params) {
		// const { creditcards } = this.props
		// let card
		// if(creditcards && creditcards.length > 0){
		// 	card = creditcards.find( c => c.quickpayRecord.isSelected )
		// }
		// if(card && card.quickpayRecord.payMethod === '3'){
		// 	this.triggerOcean()
		// }else{
		checkout_credit(params).then(data => data.result).then(this.processCallBack).catch(this.processErrorBack)
		// }
	}

	creditClose() {
		this.props.TOGGLECREDIT(false)
	}

	addCreditCard(evt) {
		evt.preventDefault()
		const { checkout } = this.props
		const { payMethod, orderId } = checkout

		const payMethodInfo = checkout.payMethods.find(p => p.id === payMethod)

		if (payMethod === '18' || payMethod === '22') {
			this.checkparams({ orderId }).catch(({ result }) => {
				alert(result)
				this.setState({
					refreshing: false
				})
			})
		} else if (payMethodInfo.type === '12') {

			this.props.history.push(`${this.props.match.url}/dlocal/credit`)

		} else {
			const path = {
				pathname: `${this.props.match.url}/ocean/credit`,
				state: {
					exsiting: true
				}
			}
			this.props.history.push(path)
		}
	}

	cardSelect(card) {
		if (card.quickpayRecord.payMethod == '19') {
			useMercadocard(card.quickpayRecord.quickpayId).then(() => {
				this.props.GETMERCADOCARDS()
				this.props.TOGGLECREDITSTATUS(0)
			})
		} else {
			usecreditcard(card.quickpayRecord.id).then(() => {
				this.props.GETCREDITCARDS(card.quickpayRecord.payMethod)
				this.props.TOGGLECREDITSTATUS(0)
			})
		}
	}


	checkmercado(event) {
		event.preventDefault()
		this.setState({
			checking: true
		})
		Mercadopago.clearSession()
		this.mercadoform.validateAll()

		if (!this.props.securityCode) {
			this.setState({
				checking: false
			})
			return
		}

		const $dommercado = document.getElementById('mercadoform')
		Mercadopago.createToken($dommercado, this.sdkResponseHandler)
	}

	sdkResponseHandler(status, response) {
		const { orderId } = this.props.checkout
		if (status != 200 && status != 201) {
			alert('verify filled data')
		} else {
			this.setState({
				token: response.id
			})

			this.checkpay({
				orderId,
				token: response.id,
				installments: this.props.mercadoinstallments
			}).catch(({ result }) => {
				alert(result)
				this.setState({
					checking: false
				})
			})
		}
	}

	mercadoref(c) {
		this.mercadoform = c
	}

	addMercadoCard(evt) {
		evt.preventDefault()
		const path = {
			pathname: `${this.props.match.url}/mercado/credit`,
			state: {
				exsiting: true
			}
		}
		this.props.history.push(path)
	}

	render() {
		const { checkout, isCreditShow, creditcards, mercadocards, intl } = this.props

		let totalCount = 0

		let payMethod, country, tcMethod

		if (checkout) {
			let checkoutItems = checkout.checkoutItems
			payMethod = checkout.payMethods.find(p => p.id === checkout.payMethod) || checkout.payMethods[0]

			if (checkoutItems) {
				totalCount = checkoutItems.map(c => c.quantity).reduce((prev, curr) => (prev + curr))
			}

			country = checkout.shippingDetail && checkout.shippingDetail.country ? checkout.shippingDetail.country.value : window.__country
			tcMethod = this.getTcMethod()
		}


		return <ShoppingBody>
			<div className="__hd">
				<ShoppingHead>
					<span className="__title"><FormattedMessage id="check_out" /></span>
					<span onClick={evt => {
						const referrer = document.referrer || ''
						if (referrer.indexOf('/order') > 0) {
							window.history.back()
						} else {
							window.location.href = '/'
						}
					}} className="__back">&#xe690;</span>

				</ShoppingHead>
			</div>
			{
				checkout && <div className="__bd" style={{ paddingLeft: 8, paddingRight: 8, paddingTop: 52 }}>
					{this.state.refreshing && <Refreshing />}
					<Boxs>
						<Box style={{ position: 'relative' }}>
							<BoxBody>
								<div className="x-fw x-table __vm">
									<div className="x-cell">
										<Address address={checkout.shippingDetail} />
									</div>
									<div className="x-cell __right" style={{ width: 30 }}>
										<Grey>
											<Link style={{ color: '#222', textDecoration: 'none' }} to={`${this.props.match.url}/address`}>
												<Icon>&#xe694;</Icon>
											</Link>
										</Grey>
									</div>
								</div>
							</BoxBody>
							<DashedLine />
						</Box>

						{
							checkout.shippingMethod && <Box>
								<BoxHead title={intl.formatMessage({ id: 'shipping_method' })} />
								<div className="x-table" style={{ paddingLeft: 10, paddingRight: 10, marginTop: 10 }}>
									<div className="x-cell">
										<span style={{ verticalAlign: 'middle' }}>{checkout.shippingMethod.title}</span>
									</div>

									<div className="x-cell" style={{ paddingLeft: 10 }}>
										<Money money={checkout.shippingMethod.price} />
									</div>


								</div>
								<div style={{ paddingLeft: 10, lineHeight: '18px', paddingBottom: 8 }}>
									<span>{checkout.shippingMethod.shippingTime}</span>
								</div>
							</Box>
						}


						<Box innerRef={c => { this.$paylistdom = c }}>
							<BoxHead single title={intl.formatMessage({ id: 'payment_method' })} />
							<div style={{ paddingLeft: 10, paddingRight: 10 }}>
								<PayMethodList

									boletoForm={(c) => this.boletoForm = c}
									boleto={(c) => { this.boleto = c }}
									handleInputChange={this.handleInputChange}
									selectedPayId={payMethod.id}
									selectPayHandle={this.selectPayHandle.bind(this)}
									methods={checkout.payMethods}
									ticketMethods={this.state.ticketMethods}
									atmClickHandle={this.atmClickHandle.bind(this)}
									ticketClickHandle={this.ticketClickHandle.bind(this)}
									atmMethod={this.props.atmMethod}
									ticketMethod={this.props.ticketMethod}
									atmMethods={this.state.atmMethods}
									apac={c => this.apac = c}
									apacBB={c => this.apacBB = c}
									paypalDiscountMessage={checkout.paypalDiscountMessage}
									showMercadopagoCouponField={checkout.showMercadopagoCouponField}
									setCouponHandle={this.useMercadoCoupon.bind(this)}
									couponCode={this.props.couponCode}
									mercadoCouponClickHandle={this.mercadoCouponClickHandle.bind(this)}
									tcClickHandle={this.tcClickHandle.bind(this)}
									tcMethod={tcMethod}

									documentForm={c => this.documentForm = c}
									documentRef={c => this.documentRef = c}
									document={this.props.document}
									initCashmethod={this.initCashmethod.bind(this)}
								/>
							</div>
						</Box>

						<Box>
							<BoxHead single title={intl.formatMessage({ id: 'order_summary' })} />
							<OrderSummary>

								{
									checkout.display.map(display => (
										<div key={display.label} className="x-flex __between __summary">
											<span>
												<span dangerouslySetInnerHTML={{ __html: display.label }} />
												{
													display.asker && <Ask style={{ marginLeft: 4 }} onClick={(evt) => { this.displayAskClickHandle(evt, display.asker) }} />
												}
											</span>

											<span dangerouslySetInnerHTML={{ __html: display.value }} />
										</div>
									))
								}

							</OrderSummary>
						</Box>

						<Box style={{ backgroundColor: 'transparent' }}>
							<div style={{ height: 90 }}>
								<FixedCheck>
									<div className="__total">
										<span>{intl.formatMessage({ id: 'total' })}: </span>
										<Red><Money money={checkout.orderTotal} /></Red>
										{
											this.props.payMethod === '22' && <Red style={{ fontWeight: 'normal', marginLeft: 5, fontSize: 14 }}>(Em até 3x s/ juros)</Red>
										}
									</div>
									{

										!this.state.checking ? <BigButton onClick={this.checkout.bind(this)} className="__btn" height={47} bgColor="#222">
											{intl.formatMessage({ id: 'check_out' })} ({totalCount})
										</BigButton> : <BigButton className="__btn" height={47} bgColor="#999">
											{intl.formatMessage({ id: 'please_wait' })}...
										</BigButton>

									}
								</FixedCheck>
							</div>
						</Box>

					</Boxs>


					{
						isCreditShow && (payMethod.type === '2' || payMethod.type === '11' || payMethod.type === '8' || payMethod.type === '12') && creditcards && creditcards.length && (
							<React.Fragment>
								<Mask />
								<CreditCard
									count={totalCount}
									cards={creditcards}
									payMethod={payMethod.id}
									orderTotal={checkout.orderTotal}
									handleCredit={this.handleCredit.bind(this)}
									handleInputChange={this.handleInputChange}
									creditClose={this.creditClose.bind(this)}
									installments={this.props.installments}
									addCard={this.addCreditCard.bind(this)}
									cardSelect={this.cardSelect.bind(this)}
									status={this.props.creditstatus}
									checking={this.state.checking}
									country={country}
									toggleBack={() => {
										this.props.TOGGLECREDITSTATUS(this.props.creditstatus === 0 ? 1 : 0)
									}}
									document={this.props.document}
									dlocalref={c => this.dlocalref = c}
									dlocalbtn={c => this.dlocalbtn = c}
									cvvRef={this.cvvRef.bind(this)}
									dlocalerror={this.state.dlocalerror}
								/>
							</React.Fragment>
						)
					}

					{
						isCreditShow && payMethod.type === '7' && mercadocards && mercadocards.length && (
							<React.Fragment>
								<Mask />
								<CreditCard
									count={totalCount}
									payMethod={payMethod.id}
									securityCode={this.props.securityCode}
									handleMercado={this.checkmercado.bind(this)}
									mercadoref={this.mercadoref.bind(this)}
									handleInputChange={this.handleInputChange}
									creditClose={this.creditClose.bind(this)}
									cardSelect={this.cardSelect.bind(this)}
									cards={mercadocards}
									addCard={this.addMercadoCard.bind(this)}
									status={this.props.creditstatus}
									orderTotal={checkout.orderTotal}
									installments={this.props.mercadoinstallments}
									checking={this.state.checking}
									toggleBack={() => {
										this.props.TOGGLECREDITSTATUS(this.props.creditstatus === 0 ? 1 : 0)
									}}
								/>
							</React.Fragment>
						)
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
						this.state.showAsk && this.state.askMessage && (
							<React.Fragment>
								<Mask />
								<FixedMessage onClose={() => { this.setState({ showAsk: false, askMessage: null }) }}>
									<p dangerouslySetInnerHTML={{ __html: this.state.askMessage }} />
								</FixedMessage>
							</React.Fragment>
						)
					}



					<AnimatedRoute {...defaultAnimations}
						mapStyles={(styles) => ({
							transform: `translateY(${styles.offset}%)`,
							...defaultStyles
						})}
						path={`${this.props.match.path}/address`} component={CheckoutAddress} />

					<AnimatedRoute {...defaultAnimations}
						mapStyles={(styles) => ({
							transform: `translateY(${styles.offset}%)`,
							...defaultStyles
						})}
						path={`${this.props.match.path}/mercado/credit`} component={CheckoutMercado} />

					<AnimatedRoute {...defaultAnimations}
						mapStyles={(styles) => ({
							transform: `translateY(${styles.offset}%)`,
							...defaultStyles
						})}
						path={`${this.props.match.path}/dlocal/credit`} component={CheckoutDLocal} />


					<AnimatedRoute {...defaultAnimations}
						mapStyles={(styles) => ({
							transform: `translateY(${styles.offset}%)`,
							...defaultStyles
						})}
						path={`${this.props.match.path}/ocean/credit`} component={CheckoutOcean} />



				</div>
			}
		</ShoppingBody>
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Checkout))
