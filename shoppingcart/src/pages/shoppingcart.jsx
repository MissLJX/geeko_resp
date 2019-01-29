import React from 'react'
import styled from 'styled-components'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import Loading from '../components/msite/loading.jsx'
import Empty from '../components/msite/empty.jsx'
import Refreshing from '../components/msite/refreshing.jsx'
import Ask from '../components/ask.jsx'
import FixedMessage from '../components/msite/fixed-message.jsx'
import { Boxs, Box, BoxClickHead, BoxBody, LineBox, BoxHead } from '../components/msite/layout.jsx'
// import GroupOverseasItems from '../components/msite/group-overseas-items.jsx'

import PromotionGroup from '../components/msite/promotion-group.jsx'

import GroupLocalItems from '../components/msite/group-local-items.jsx'
import GroupInvalidItems from '../components/msite/group-ivalid-items.jsx'
import Address from '../components/msite/address.jsx'
import { Grey, Red } from '../components/text.jsx'
import TurnTool from '../components/msite/turn-tool.jsx'
import Money from '../components/money.jsx'
import { connect } from 'react-redux'
import {
	fetchAll, refreshCart, selectItem, editing,
	edited, editItem, selectPay, CPF, EMAIL, getCreditCards,
	getMercadoCards, toggleCredit, setSecurityCode, setInstallments, fetchCoupons, deleteItem, deleteItems,
	setMercadoInstallments, toggleCreditStatus, setAtmMethod, setTicketMethod, getDLocalCards, setDocument,
	setCashMethodBR,
	setMoneyTransBR,
	setCashMethodAR,
	setMoneyTransAR,
	setCashMethodCL,
	setMoneyTransCL,
	setCashMethodChile,
	setMoneyTransChile,
	setCashMethodUY
} from '../store/actions.js'
import Mask from '../components/mask.jsx'
import _ from 'lodash'
import PayMethodList from '../components/msite/paymethod-list.jsx'
import { BigButton } from '../components/msite/buttons.jsx'
import { payDLocal, useMercadocard, mercadopay, usePoint, useInsurance, creditpay, paypalpay, usecreditcard, movetooverseas, getMessage, placepaypal, givingCoupon, atmPay, ticketPay, getSafeCharge, getApacPay, apacPay, useMercadoCoupon, getDLocalPayLink, payCredit } from '../api'
import { __route_root__, storage } from '../utils/utils.js'
import { submit } from '../utils/common-pay.js'
import { CountDownBlock } from '../components/msite/countdowns.jsx'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Confirm } from '../components/msite/modals.jsx'
import Icon from '../components/icon.jsx'
import SUCCESSTIP from '../components/pc/successtip.jsx'

import Loadable from 'react-loadable'


const CreditCard = Loadable({
	loader: () => import(
		/* webpackChunkName: "component--credit-card" */
		'../components/msite/credit-card.jsx'
	),
	loading: Refreshing
})

const ProductEditor = Loadable({
	loader: () => import(
		/* webpackChunkName: "component--product-editor" */
		'../components/msite/item-editor.jsx'
	),
	loading: Refreshing
})


const OrderSummary = styled.div`
	padding: 5px 10px;
	& > div.__summary{
		padding-top: 5px;
		padding-bottom: 5px;
		font{
			font-size: 16px !important;
		} 
	}
`

const Checkout = styled.div`
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
	background-color: #fff;
	z-index:5;
`

const Tip = styled.div`
	background-color: #fef8f8;
	padding: 10px;
	line-height: 18px;
	font-size: 12px;
	&.__fixed{
		position: fixed;
		width: 100%;
		z-index: 1;
		top: ${window.headerHeight || 0}px;
	}
	a{
		text-decoration: underline;
	}
`

const DoubleBtn = styled.div`
	& > div{
		width: calc(50% - 5px);
	}
`

const PaypalBtn = styled.div`
	cursor: pointer;
	border-radius: 2px;
	height: 47px;
	background-color: rgb(252, 208, 0);
	text-align: center;
	img{
		height: 42px;
		margin-top: 2px;
	}
`

const DISCOUNTTIP = styled.span`
	background-color:#fef8f8;
	border: 1px solid #fd8585;
	padding: 4px;
	font-size: 12px;
	position: absolute;
	right: 10px;
	top: 8px;
	&::before{
		content:'';
		border-left: 1px solid #fd8585;
		border-top: 1px solid #fd8585;
		background-color:#fef8f8;
		transform: rotate(-135deg);
		position: absolute;
		right: 20px;
		bottom: -5px;
		width: 8px;
		height: 8px;
	}
`

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

const mapStateToProps = (state) => {
	return {
		...state
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		INIT: () => {
			dispatch(fetchAll())
		},
		REFRESHCART: (cart) => {
			dispatch(refreshCart(cart))
		},
		SELECT: (params) => {
			dispatch(selectItem(params))
		},
		EDITING: (item) => {
			dispatch(editing(item))
		},
		EDITED: () => {
			dispatch(edited())
		},
		EDITITEM: (oldId, newId, quantity) => {
			dispatch(editItem(oldId, newId, quantity))
		},
		SELECTPAY: (paymethod) => {
			return dispatch(selectPay(paymethod))
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
		GETMERCADOCARDS: () => {
			return dispatch(getMercadoCards())
		},
		GETCREDITCARDS: (payMethod, multi) => {
			return dispatch(getCreditCards(payMethod, multi))
		},
		TOGGLECREDIT: (isShow) => {
			if (!isShow) {
				// if(confirm())
			}

			dispatch(toggleCredit(isShow))
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
		FETCHCOUPONS: () => {
			dispatch(fetchCoupons())
		},
		DELETEITEM: (itemId) => {
			dispatch(deleteItem(itemId))
		},
		DELETEITEMS: (itemIds) => {
			dispatch(deleteItems(itemIds))
		},
		TOGGLECREDITSTATUS: (status) => {
			dispatch(toggleCreditStatus(status))
		},
		SETATMMETHOD: (method) => {
			dispatch(setAtmMethod(method))
		},
		SETTICKETMETHOD: (method) => {
			dispatch(setTicketMethod(method))
		},
		SETDLINK: (dlocal) => {
			dispatch({
				type: 'DLOCAL',
				dlocal
			})
		},
		GETDLOCALCARDS: (payMethod) => {
			return dispatch(getDLocalCards(payMethod))
		},
		SETDOCUMENT: (document) => {
			return dispatch(setDocument(document))
		},
		SETCSBR: (method) => {
			return dispatch(setCashMethodBR(method))
		},
		SETMTBR: (method) => {
			return dispatch(setMoneyTransBR(method))
		},
		SETCSAR: (method) => {
			return dispatch(setCashMethodAR(method))
		},
		SETMTAR: (method) => {
			return dispatch(setMoneyTransAR(method))
		},
		SETCSCL: (method) => {
			return dispatch(setCashMethodCL(method))
		},
		SETMTCL: (method) => {
			return dispatch(setMoneyTransCL(method))
		},
		SETCSCHILE: (method) => {
			return dispatch(setCashMethodChile(method))
		},
		SETMTCHILE: (method) => {
			return dispatch(setMoneyTransChile(method))
		},
		SETCSUY: (method) => {
			return dispatch(setCashMethodUY(method))
		}
	}
}

const SendCouponTip = styled.div`
	width: 100%;
	& > div{
		&:first-child{
		}
		&:last-child{
		}
	}
`

const ShoppingCart = class extends React.Component {
	constructor(props) {
		super(props)
		this.itemSelect = this.itemSelect.bind(this)
		this.groupClick = this.groupClick.bind(this)
		this.itemEdit = this.itemEdit.bind(this)
		this.itemConfirmHandle = this.itemConfirmHandle.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.sdkResponseHandler = this.sdkResponseHandler.bind(this)
		this.scrollhandle = this.scrollhandle.bind(this)
		this.itemDelete = this.itemDelete.bind(this)
		this.clearall = this.clearall.bind(this)
		this.state = {
			creditstatus: 0,
			tipFixed: false,
			showAsk: false,
			askMessage: '',
			paypaling: false,
			checking: false,
			refreshing: false,
			showPayMsgOcean: false,
			ticketMethods: [],
			atmMethods: [],
			successTip: null
		}
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

	componentDidMount() {
		this.props.INIT()
		this.props.FETCHCOUPONS()
		window.addEventListener('scroll', this.scrollhandle, false)


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

	componentWillUnmount() {
		window.removeEventListener('scroll', this.scrollhandle, false)
	}

	scrollhandle(evt) {
		// let [scrollTop, documentHeight, windowHeight] = [
		//   document.documentElement.scrollTop || document.body.scrollTop,
		//   document.body.clientHeight,
		//   window.screen.height
		// ]

		const headerHeight = window.headerHeight || 0

		if (this.fixedTip && this.fixedTipWrapper) {
			const { clientHeight } = this.fixedTip
			this.fixedTipWrapper.style.height = clientHeight + 'px'
			const rect = this.fixedTipWrapper.getBoundingClientRect()
			if (rect.top < headerHeight) {
				this.fixedTip.classList.add('__fixed')
			} else {
				this.fixedTip.classList.remove('__fixed')
			}
		}
	}

	mercadoref(c) {
		this.mercadoform = c
	}

	handleMercado(event) {

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

	checkout(event) {
		event.preventDefault()
		const { payMethod, cart, paypal, payType } = this.props
		const { shippingDetail } = cart

		if (!payType) {
			alert('Please select a pay method!')
			this.$paylistdom.scrollIntoView()
			return
		}

		if (!cart.shippingDetail) {
			this.props.history.push(`${window.ctx || ''}${__route_root__}/address`)
			return
		}

		if (shippingDetail.country && shippingDetail.country.value === 'BR' && !shippingDetail.cpf) {
			const path = {
				pathname: `${window.ctx || ''}${__route_root__}/address`,
				state: {
					validate: true
				}
			}
			this.props.history.push(path)
			return
		}

		if (payType === '2' || payMethod === '17' || payType === '8') {
			this.props.TOGGLECREDIT(true)
			this.setState({
				checking: true
			})

			const multi = this.props.payMethod === '18' || this.props.payMethod === '3'

			this.props.GETCREDITCARDS(multi ? ['18', '3'] : payMethod, multi).then((cards) => {
				if (!cards || cards.length < 1) {
					if (payType === '8') {
						getSafeCharge().then(({ result }) => {
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
						this.props.history.push(`${window.ctx || ''}${__route_root__}/credit-card`)
						this.setState({
							checking: false
						})
					}
				} else {
					this.setState({
						checking: false
					})
				}
			}).catch(() => {
				this.setState({
					checking: false
				})
			})
		} else if (payType === '7') {
			this.props.TOGGLECREDIT(true)
			this.setState({
				checking: true
			})
			this.props.GETMERCADOCARDS().then((cards) => {
				if (!cards || cards.length < 1) {
					this.props.history.push(`${window.ctx || ''}${__route_root__}/mercado`)
				}
				this.setState({
					checking: false
				})
			}).catch(() => {
				this.setState({
					checking: false
				})
			})
		} else if (payType === '1') {
			this.setState({
				paypaling: true
			})
			paypalpay('normal').then(data => data.result).then(({ TOKEN, success, transactionId, orderId, ACK, L_LONGMESSAGE0 }) => {
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
					storage.add('temp-order', orderId, 1 * 60 * 60)
					window.location.href = paypal + TOKEN
				}
			}).catch(({ result }) => {
				this.setState({
					paypaling: false
				})
				alert(result)
			})
		} else if (payType === '5') {
			const { cpf, email } = this.props
			this.boletoForm.validateAll()
			if (!this.boleto.context._errors || !this.boleto.context._errors.length) {
				window.location.href = `${window.ctx || ''}/geekopay/pay?cpf=${cpf}&email=${email}&payMethod=${payMethod}`
			}
		} else if (payType === '3') {
			window.location.href = `${window.ctx || ''}/computoppay/pay?payMethod=${payMethod}`
		} else if (payType === '9') {
			if (!this.props.atmMethod) {
				alert('Please select a pay method!')
				this.$paylistdom.scrollIntoView()
				return
			}

			this.setState({
				checking: true
			})

			atmPay(this.props.atmMethod).then(({ result }) => {
				const { transactionId, success, details } = result

				if (success) {
					window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
				} else {
					alert(details)
				}

				this.setState({
					checking: false
				})
			}).catch(data => {
				alert(data.result)
				this.setState({
					checking: false
				})
			})
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
			ticketPay('oxxo').then(({ result }) => {
				const { transactionId, success, details, orderId } = result

				if (success) {
					window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
				} else {
					alert(details)
					if (orderId) {
						this.props.history.push(`${window.ctx || ''}/checkout/${orderId}`)
					}
				}

				this.setState({
					checking: false
				})
			}).catch(data => {
				alert(data.result)
				this.setState({
					checking: false
				})
			})
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

				this.apacPay(payMethod, this.props.cpf, (result) => {
					this.setState({
						checking: false
					})
					alert(result)
				})


			} else {
				this.props.TOGGLECREDIT(true)
				this.setState({
					checking: true
				})

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
					}
				}).catch(() => {
					this.setState({
						checking: false
					})
				})
			}


		} else if (payType === '12') {
			this.setState({
				checking: true
			})


			this.props.TOGGLECREDIT(true)
			this.props.GETDLOCALCARDS(payMethod).then(cards => {
				if (!cards || cards.length < 1) {
					this.props.history.push(`${window.ctx || ''}${__route_root__}/dlocal`)
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



		} else if (payType === '13') {
			this.setState({
				checking: true
			})
			payDLocal({ payMethod, paymentMethodId: 'BL' }).then(data => data.result).then(({ transactionId, success, details, orderId }) => {
				if (success) {

					window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`

				} else {
					alert(details)
					if (orderId) {
						this.props.history.push(`${window.ctx || ''}/checkout/${orderId}`)
					}
				}

				this.setState({
					checking: false
				})
			}).catch(data => {
				alert(data.result)
				this.setState({
					checking: false
				})
			})
		} else if (payType === '14') {
			this.setState({
				checking: true
			})
			const paymentMethodId = this.getTcMethod()
			payDLocal({ payMethod, paymentMethodId }).then(data => data.result).then(({ transactionId, success, details, orderId }) => {
				if (success) {

					window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`

				} else {
					alert(details)
					if (orderId) {
						this.props.history.push(`${window.ctx || ''}/checkout/${orderId}`)
					}
				}

				this.setState({
					checking: false
				})
			}).catch(data => {
				alert(data.result)
				this.setState({
					checking: false
				})
			})
		} else if (payType === '15' || payType === '16' || payType === '17' || payType === '18' || payType === '21') {

			const paymentMethodId = this.getTcMethod()

			if (!paymentMethodId) {

				alert('Please select a pay method!')
				this.$paylistdom.scrollIntoView()

				return
			}

			this.documentForm.validateAll()

			if (this.documentRef.context && this.documentRef.context._errors && this.documentRef.context._errors.length > 0) {
				return
			}

			if (!paymentMethodId || !this.props.document) {
				return
			}

			this.setState({
				checking: true
			})

			payDLocal({ payMethod, paymentMethodId, document: this.props.document }).then(data => data.result).then(({ transactionId, success, details, orderId }) => {
				if (success) {

					window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`

				} else {
					alert(details)
					if (orderId) {
						this.props.history.push(`${window.ctx || ''}/checkout/${orderId}`)
					}
				}

				this.setState({
					checking: false
				})
			}).catch(data => {
				alert(data.result)
				this.setState({
					checking: false
				})
			})
		} else if (payType === '19') {
			this.setState({
				checking: true
			})


			payDLocal({ payMethod, paymentMethodId: 'SP', document: this.props.document }).then(data => data.result).then(({ transactionId, success, details, orderId }) => {
				if (success) {

					window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`

				} else {
					alert(details)
					if (orderId) {
						this.props.history.push(`${window.ctx || ''}/checkout/${orderId}`)
					}
				}

				this.setState({
					checking: false
				})
			}).catch(data => {
				alert(data.result)
				this.setState({
					checking: false
				})
			})
		} else if (payType === '20') {
			this.setState({
				checking: true
			})


			payDLocal({ payMethod, paymentMethodId: 'WP', document: this.props.document }).then(data => data.result).then(({ transactionId, success, details, orderId }) => {
				if (success) {

					window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`

				} else {
					alert(details)
					if (orderId) {
						this.props.history.push(`${window.ctx || ''}/checkout/${orderId}`)
					}
				}

				this.setState({
					checking: false
				})
			}).catch(data => {
				alert(data.result)
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

	tcClickHandle(method) {
		const { payMethod } = this.props.cart
		switch (payMethod) {
		case '25':
			this.props.SETCSBR(method)
			storage.add('brCS', method, 365 * 24 * 60 * 60)
			break
		case '29':
			this.props.SETMTBR(method)
			storage.add('brMT', method, 365 * 24 * 60 * 60)
			break
		case '27':
			this.props.SETCSAR(method)
			storage.add('arCS', method, 365 * 24 * 60 * 60)
			break
		case '28':
			this.props.SETMTAR(method)
			storage.add('arMT', method, 365 * 24 * 60 * 60)
			break
		case '30':
			this.props.SETCSCL(method)
			storage.add('clCS', method, 365 * 24 * 60 * 60)
			break
		case '31':
			this.props.SETMTCL(method)
			storage.add('clMT', method, 365 * 24 * 60 * 60)
			break
		case '34':
			this.props.SETCSCHILE(method)
			storage.add('chlieCS', method, 365 * 24 * 60 * 60)
			break
		case '35':
			this.props.SETMTCHILE(method)
			storage.add('chlieMT', method, 365 * 24 * 60 * 60)
			break
		case '37':
			this.props.SETCSUY(method)
			storage.add('uyCS', method, 365 * 24 * 60 * 60)

		}
	}

	getTcMethod() {
		const { payMethod } = this.props.cart
		switch (payMethod) {
		case '25':
			return this.props.brCS
		case '29':
			return this.props.brMT
		case '27':
			return this.props.arCS
		case '28':
			return this.props.arMT
		case '30':
			return this.props.clCS
		case '31':
			return this.props.clMT
		case '34':
			return this.props.chlieCS
		case '35':
			return this.props.chlieMT
		case '37':
			return this.props.uyCS
		default:
			break

		}
	}

	getApacPay(payMethod, cpf, fail) {
		getApacPay({ payMethod, cpfNumber: cpf }).then(({ result }) => {
			const { isFree, transactionId, success, details, solutions, orderId } = result
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
		apacPay({ payMethod, cpfNumber: cpf }).then(({ result }) => {
			const { isFree, orderId, transactionId, success, details, solutions } = result
			if (isFree) {
				window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
			} else {
				if (success) {

					window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`

				} else {
					if (orderId) {
						this.props.history.push(`${window.ctx || ''}/checkout/${orderId}`)
					}
					fail(details)
				}
			}
		}).catch(({ result }) => {
			fail(result)
		})
	}

	quickPaypal(evt) {
		evt.preventDefault()
		const { cart, paypal, payMethod } = this.props
		this.setState({
			paypaling: true
		})

		paypalpay('quick').then(data => data.result).then(({ TOKEN, ACK, L_LONGMESSAGE0 }) => {
			if (ACK === 'Failure') {
				alert(L_LONGMESSAGE0)
				this.setState({
					paypaling: false
				})
				return
			}

			if (TOKEN && paypal) {
				window.location.href = paypal.replace('&useraction=commit', '') + TOKEN
			}
		}).catch(({ result }) => {
			this.setState({
				paypaling: false
			})
			alert(result)
		})

		if (this.getCountdown(this.props.cart) > 0) {
			givingCoupon()
		}

		window.eventcheck(cart, payMethod)
	}

	quickPlace(evt) {
		const { cart, paypal } = this.props



		if (!cart.shippingDetail || !cart.shippingDetail.phoneNumber) {
			this.props.history.push(`${window.ctx || ''}${__route_root__}/address?check=1`)
			return
		}

		this.setState({
			paypaling: true
		})

		placepaypal().then(({ result }) => {
			window.location.href = `${window.ctx || ''}/order-confirm/${result}`
		}).catch(({ result }) => {
			this.setState({
				paypaling: false
			})
			alert(result)
			window.location.href = `${window.ctx || ''}${__route_root__}/`
		})

		// self.webpaypay(function(){
		//       window.location.href = ctx + "/v7/orderConfirm/anon/order-confirm";
		//     });
	}

	sdkResponseHandler(status, response) {
		if (status != 200 && status != 201) {
			alert('verify filled data')
		} else {
			this.setState({
				token: response.id
			})

			mercadopay({
				token: response.id,
				installments: this.props.mercadoinstallments
			}).then(data => data.result).then(({ success, transactionId, orderId, details, solutions }) => {
				if (success) {

					window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`

				} else {
					alert(details)
					if (orderId) {
						this.props.history.push(`${window.ctx || ''}/checkout/${orderId}`)
					}
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
		}
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

	overseasHandle(variantId) {
		movetooverseas({ variantId }).then(({ result }) => {
			this.props.REFRESHCART(result)
		})
	}

	cardSelect(card) {
		if (card.quickpayRecord.payMethod == '19') {
			useMercadocard(card.quickpayRecord.quickpayId).then(() => {
				this.props.GETMERCADOCARDS()
				this.props.TOGGLECREDITSTATUS(0)
			})
		} else {
			usecreditcard(card.quickpayRecord.id).then(() => {
				const multi = this.props.payMethod === '18' || this.props.payMethod === '3'

				this.props.GETCREDITCARDS(multi ? ['18', '3'] : card.quickpayRecord.payMethod, multi)
				this.props.TOGGLECREDITSTATUS(0)
			})
		}
	}

	selectPayHandle(paymethod) {
		this.props.SELECTPAY(paymethod).then((cart) => {
			if (cart && cart.changeCurrencyMsg) {
				alert(cart.changeCurrencyMsg)
			}
		})
		// storage.add('payMethod', paymethod.id, 365 * 24 * 60 * 60)
		// storage.add('payType', paymethod.type, 365 * 24 * 60 * 60)
	}

	atmClickHandle(method) {
		this.props.SETATMMETHOD(method.id)
		storage.add('atmMethod', method.id, 365 * 24 * 60 * 60)
	}

	ticketClickHandle(method) {
		this.props.SETTICKETMETHOD(method.id)
		storage.add('ticketMethod', method.id, 365 * 24 * 60 * 60)
	}

	itemConfirmHandle(oldId, newId, quantity) {
		this.props.EDITITEM(oldId, newId, quantity)
	}

	itemEdit(item) {
		this.props.EDITING(item)
	}

	itemDelete(item) {
		if (window.confirm('Are you sure delete this item?')) {
			this.props.DELETEITEM(item.variantId)
		}
	}

	itemIdDelete(itemId) {
		if (window.confirm('Are you sure delete this item?')) {
			this.props.DELETEITEM(itemId)
		}
	}

	clearall() {
		const { cart } = this.props
		const ivalidItems = this.getInvalidItems(cart)
		const itemIds = (ivalidItems || []).map(item => item.variantId)

		this.props.DELETEITEMS(itemIds.join(','))
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

	openPoints() {
		usePoint(!this.props.cart.openPointUse).then(data => data.result).then((cart) => {
			this.props.REFRESHCART(cart)
		})
	}

	openInsurance() {
		useInsurance(!this.props.cart.insurance).then(data => data.result).then(cart => {
			this.props.REFRESHCART(cart)
		})
	}

	insuranceClickHandle() {
		const { shippingInsuranceMsg2 } = this.props.cart
		this.setState({
			showAsk: true,
			askMessage: shippingInsuranceMsg2
		})
	}

	creditClickHandle() {
		getMessage('M1136').then(({ result }) => {
			this.setState({
				showAsk: true,
				askMessage: result.message
			})
		})
	}

	displayAskClickHandle(evt, { type, target }) {
		this.setState({
			showAsk: true,
			askMessage: target
		})
	}

	cpfClickHandle() {
		this.setState({
			showAsk: true,
			askMessage: 'CPF (Cadastro de Pessoa Física), utilizado para tributação, é necessário para todos os produtos enviados ao Brasil, independentemente de encomendas expressas ou contêineres logísticos.Quando preenchemos o conhecimento de embarque e fatura, por favor, não esqueça de preencher o número de contribuinte do destinatário.Na maioria dos casos, sua forma é o número digital como abaixo, XXX.XXX.XXX-XX'
		})
	}

	mercadoCouponClickHandle() {
		this.setState({
			showAsk: true,
			askMessage: 'Utiliza el código MERCADOPAGO para obtener un 10% de descuento adicional.'
		})
	}

	handleCredit(evt) {
		evt.preventDefault()
		this.setState({
			checking: true
		})
		const { cpf, installments } = this.props
		if (this.props.payMethod === '17') {

			this.brazilForm.validateAll()

			if (!this.props.cpf) {
				this.setState({
					checking: false
				})
				return
			}
			if (!this.brazilref.context._errors || !this.brazilref.context._errors.length) {
				this.payCredit({ payCpf: cpf, payInstallments: installments })
			} else {
				this.setState({
					checking: false
				})
			}
		} else if (this.props.payType === '12') {

			const { document, payType, payMethod } = this.props

			if (payMethod !== '24') {
				this.dlocalref.validateAll()


				if (this.dlocalbtn && this.dlocalbtn.context && this.dlocalbtn.context._errors.length > 0) {
					this.setState({
						checking: false
					})
					return
				}

				if (document) {
					this.payCredit({ installments, document })
				} else {
					this.setState({
						checking: false
					})
				}
			} else {
				this.payCredit({ installments })
			}


		} else {
			this.payCredit({ payCpf: cpf, payInstallments: installments })
		}
	}

	payCredit(params) {
		creditpay(params).then(data => data.result).then(({ success, transactionId, details, orderId, solutions = '' }) => {
			if (success) {

				window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`

			} else {
				alert(details + '\n' + solutions)
				if (orderId) {
					this.props.history.push(`${window.ctx || ''}/checkout/${orderId}`)
				}
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
	}

	addMercadoCard(evt) {
		evt.preventDefault()
		const path = {
			pathname: `${window.ctx || ''}${__route_root__}/mercado`,
			state: {
				exsiting: true
			}
		}
		this.props.history.push(path)
	}

	addCreditCard(evt) {
		evt.preventDefault()

		if (this.props.payMethod === '18') {
			this.setState({
				refreshing: true
			})
			getSafeCharge().then(({ result }) => {
				const { isFree, payURL, params, transactionId, orderId } = result
				if (isFree) {
					window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
				} else {
					// window.location.href = `${payURL}?${qs.stringify(params, true)}`
					storage.add('temp-order', orderId, 1 * 60 * 60)
					submit(result)
				}
			}).catch((data) => {
				if (data.result) {
					alert(data.result)
				} else {
					alert(data)
				}
				this.setState({
					refreshing: false
				})
			})
		} else if (this.props.payMethod === '22') {
			this.setState({
				checking: true
			})
			getApacPay({ payMethod: this.props.payMethod, cpfNumber: this.props.cpf }).then(({ result }) => {
				const { isFree, transactionId, orderId } = result
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
		} else if (this.props.payType === '12') {

			this.props.history.push(`${window.ctx || ''}${__route_root__}/dlocal`)

		} else {
			const path = {
				pathname: `${window.ctx || ''}${__route_root__}/credit-card`,
				state: {
					exsiting: true
				}
			}
			this.props.history.push(path)
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

	creditClose() {
		if (this.props.cart.cancelOceanpaymentPayMsg) {
			this.setState({
				showPayMsgOcean: true
			})
		} else {
			this.props.TOGGLECREDIT(false)
		}
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
		const deliveryItems = overseasDelivery.deliveryItems
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
			hasSelectedItem: data1.hasSelectedItem || data2.hasSelectedItem
		}
	}

	countCart(overseasDelivery, domesticDeliveryCases) {
		let count = 0

		const deliveryItems = overseasDelivery.deliveryItems

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
		const { cart, loading, empty, editing, isCreditShow, mercadocards, creditcards, noCard, intl, noCreditCard } = this.props
		let tcMethod


		let country, formatedData, invalidItems, cancheckout, hasLocalItems, sendCouponMessage, couponcountdown, totalCount = 0, hasOverseas, hasQuickPay

		if (cart) {
			formatedData = this.formatData(cart)
			invalidItems = formatedData.invalidItems
			sendCouponMessage = cart.sendCouponMessage
			couponcountdown = this.getCountdown(cart)
			cancheckout = formatedData.hasSelectedItem
			hasLocalItems = formatedData.domesticDeliveryCases && !!formatedData.domesticDeliveryCases.find(domestic => domestic.shoppingCartProducts && domestic.shoppingCartProducts.length)
			totalCount = this.countCart(formatedData.overseasDelivery, formatedData.domesticDeliveryCases)

			let validateOverseasItems = this.getValidItems(cart.shoppingCartProductsByOverseas)
			hasOverseas = validateOverseasItems && validateOverseasItems.length > 0
			hasQuickPay = cart.payMethodList && cart.payMethodList.length && cart.payMethodList.find(m => m.id === '1')

			country = this.props.cart.shippingDetail && this.props.cart.shippingDetail.country ? this.props.cart.shippingDetail.country.value : window.__country
			tcMethod = this.getTcMethod()
		}


		// const formatedData = cart ? this.formatData(cart) : null

		// const invalidItems = formatedData.invalidItems

		// const {sendCouponMessage} = cart || {sendCouponMessage: null}
		// let couponcountdown = this.getCountdown(cart)

		// let cancheckout = formatedData.hasSelectedItem
		// let hasLocalItems = false
		// let totalCount = 0
		// if (cart) {
		//   let cancheckout1 = cart.shoppingCartProductsByOverseas && cart.shoppingCartProductsByOverseas.find(item => item.selected)
		//   let cancheckout2 = false
		//   if (cart.domesticDeliveryCases) {
		//     _.each(cart.domesticDeliveryCases, demestic => {
		//       _.each(demestic.shoppingCartProducts, item => {
		//         if (item.selected) {
		//           cancheckout2 = true
		//           totalCount+=item.quantity
		//         }
		//         if (!this.isOutStock(item)) {
		//           hasLocalItems = true
		//         }
		//       })
		//     })
		//   }

		//   cancheckout = cancheckout1 || cancheckout2
		// }

		// const shoppingCartProductsByOverseas = cart ? this.getValidItems(cart.shoppingCartProductsByOverseas) : []

		// if(shoppingCartProductsByOverseas && shoppingCartProductsByOverseas.length){
		//   _.each(shoppingCartProductsByOverseas, item => {
		//     if (item.selected){
		//       totalCount+=item.quantity
		//     }
		//   })
		// }


		return loading ? <Loading /> : (empty ? <Empty /> : (
			cart && (
				<div style={{ opacity: this.props.refreshing ? 0.9 : 1 }}>
					{(this.props.refreshing || this.state.refreshing) && <Refreshing />}

					{
						(couponcountdown > 1000 || cart.messages && cart.messages.orderSummaryMsg) && (
							<div ref={wrapper => { this.fixedTipWrapper = wrapper }}>
								{
									couponcountdown > 1000 ? (
										<Tip innerRef={tip => { this.fixedTip = tip }}>
											<div className="x-table __fixed x-fw __vm">
												<div className="x-cell" style={{ width: 75 }}>
													<CountDownBlock offset={couponcountdown} />
												</div>
												<div className="x-cell">
													<span dangerouslySetInnerHTML={{ __html: sendCouponMessage.message }} />
												</div>
											</div>
										</Tip>
									) : (
										<React.Fragment>
											{cart.messages && cart.messages.orderSummaryMsg && <Tip className={this.state.tipFixed ? '__fixed' : ''} innerRef={tip => { this.fixedTip = tip }}>
												<span dangerouslySetInnerHTML={{ __html: cart.messages.orderSummaryMsg }} />
											</Tip>}
										</React.Fragment>
									)
								}
							</div>
						)
					}

					<Boxs>
						{
							cart.shippingDetail ? (
								(window.__is_login__ || window.token) && <Box style={{ position: 'relative' }}>
									<BoxBody>
										<div className="x-fw x-table __vm">
											<div className="x-cell">
												<Address address={cart.shippingDetail} />
											</div>
											<div className="x-cell __right" style={{ width: 30 }}>
												<Grey>
													<Link style={{ color: '#222', textDecoration: 'none' }} to={`${window.ctx || ''}${__route_root__}/address`}>
														<Icon>&#xe694;</Icon>
													</Link>
												</Grey>
											</div>
										</div>
									</BoxBody>
									<DashedLine />
								</Box>
							) : (
								window.__is_login__ && <Box style={{ position: 'relative' }}>
									<BoxClickHead title={intl.formatMessage({ id: 'address' })} single={true}>
										<Grey>
											<Link style={{ color: '#222', textDecoration: 'none' }} to={`${window.ctx || ''}${__route_root__}/address`}>
													Add
											</Link>
										</Grey>
									</BoxClickHead>
									<DashedLine />
								</Box>
							)
						}

						{
							hasLocalItems && formatedData.domesticDeliveryCases.map(domestic => (
								<Box key={domestic.countryCode}>
									<GroupLocalItems
										icon={domestic.icon}
										title={domestic.title}
										quantityChange={this.quantityChange.bind(this)}
										itemEdit={this.itemEdit}
										itemDelete={this.itemDelete}
										groupClick={this.groupClick}
										itemSelect={this.itemSelect}
										overseasHandle={this.overseasHandle.bind(this)}
										serverTime={cart.serverTime}
										domestic={domestic}
										items={domestic.shoppingCartProducts} />
								</Box>
							))
						}
						{/*{
							shoppingCartProductsByOverseas && shoppingCartProductsByOverseas.length > 0 && (
								<Box>
									<GroupOverseasItems
										group= {cart.}
										quantityChange={ this.quantityChange.bind(this)}
										itemEdit={this.itemEdit}
										itemDelete={this.itemDelete}
										groupClick={this.groupClick}
										itemSelect={this.itemSelect}
										items={shoppingCartProductsByOverseas}
										shippingMethod={cart.shippingMethod}
										serverTime={cart.serverTime}
										shippingMsg={cart.messages ? cart.messages.shippingMsg : null}/>
								</Box>
							)
						}*/}

						{
							hasOverseas && formatedData.overseasDelivery && <Box>
								<PromotionGroup
									group={formatedData.overseasDelivery}
									quantityChange={this.quantityChange.bind(this)}
									itemEdit={this.itemEdit}
									itemDelete={this.itemDelete}
									groupClick={this.groupClick}
									itemSelect={this.itemSelect}
									shippingMethod={cart.shippingMethod}
									serverTime={cart.serverTime}
									shippingMsg={cart.messages ? cart.messages.shippingMsg : null} />
							</Box>
						}

						{
							invalidItems && invalidItems.length > 0 && <Box>
								<GroupInvalidItems serverTime={cart.serverTime}
									items={this.getInvalidItems(cart)}
									clearall={this.clearall}
									itemDelete={this.itemDelete} />
							</Box>
						}

						<Box>
							<BoxClickHead className="x-small" title={intl.formatMessage({ id: 'coupon' })}>
								<Link style={{ textDecoration: 'none', color: '#222' }} to={`${window.ctx || ''}${__route_root__}/coupons`}>

									{cart.coupon ? (
										<span><strong>{cart.coupon.couponName}</strong> {cart.coupon.name}</span>
									) : (
										<span>Available <Red>{cart.canUseCouponCount}</Red></span>
									)}
								</Link>
							</BoxClickHead>

							{
								cart.messages && cart.messages.couponMsg && <Tip>
									<span dangerouslySetInnerHTML={{ __html: cart.messages.couponMsg }} />
								</Tip>
							}

							<LineBox style={{ paddingLeft: 10, paddingRight: 10 }}>
								{
									cart.shippingInsurancePrice2 && (
										<TurnTool ignoreButton={cart.isShippingInsuranceMust} open={this.openInsurance.bind(this)} turnAcitve={cart.insurance}>
											<span style={{ fontSize: 15 }}>
												<FormattedMessage id="add_shipping_insurance" values={{ price: <Red><Money money={cart.shippingInsurancePrice2} /></Red> }} />
											</span>
											<Ask style={{ marginLeft: 4 }} onClick={this.insuranceClickHandle.bind(this)} />
										</TurnTool>
									)
								}

								{
									cart.expectedPoints > 0 && (
										<TurnTool open={this.openPoints.bind(this)} turnAcitve={cart.openPointUse}>

											<FormattedMessage style={{ fontSize: 15 }} id="credit_msg" values={{ credits: cart.expectedPoints, discount: <Red><Money money={cart.expectedPointDiscount} /></Red> }} />
											<Ask style={{ marginLeft: 4 }} onClick={this.creditClickHandle.bind(this)} />
										</TurnTool>
									)
								}
							</LineBox>
						</Box>

						{
							window.__is_login__ && (
								<Box innerRef={c => { this.$paylistdom = c }}>
									<BoxHead title={intl.formatMessage({ id: 'payment_method' })} />
									<div style={{ paddingLeft: 10, paddingRight: 10 }}>
										<PayMethodList
											cpfClickHandle={this.cpfClickHandle.bind(this)}
											boletoForm={(c) => this.boletoForm = c}
											boleto={(c) => { this.boleto = c }}
											cpf={this.props.cpf}
											email={this.props.email}
											handleInputChange={this.handleInputChange}
											selectedPayId={this.props.payMethod}
											selectPayHandle={this.selectPayHandle.bind(this)}
											methods={this.props.cart.payMethodList}
											ticketMethods={this.state.ticketMethods}
											atmClickHandle={this.atmClickHandle.bind(this)}
											ticketClickHandle={this.ticketClickHandle.bind(this)}
											atmMethod={this.props.atmMethod}
											ticketMethod={this.props.ticketMethod}
											atmMethods={this.state.atmMethods}
											apac={c => this.apac = c}
											apacBB={c => this.apacBB = c}
											paypalDiscountMessage={cart.paypalDiscountMessage}
											showMercadopagoCouponField={cart.showMercadopagoCouponField}
											setCouponHandle={this.useMercadoCoupon.bind(this)}
											couponCode={this.props.couponCode}
											mercadoCouponClickHandle={this.mercadoCouponClickHandle.bind(this)}
											tcClickHandle={this.tcClickHandle.bind(this)}
											tcMethod={tcMethod}

											documentForm={c => this.documentForm = c}
											documentRef={c => this.documentRef = c}
											document={this.props.document}
										/>
									</div>
								</Box>
							)
						}

						<Box>
							<BoxHead title={intl.formatMessage({ id: 'order_summary' })} />
							<OrderSummary>

								{
									cart.orderSummary.display.map(display => (
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

						{
							window.__is_login__ ? (
								<Box>
									<div style={{ height: 90 }}>

										{
											cart.canCheckout ? <Checkout>
												<div className="__total">
													<span>{intl.formatMessage({ id: 'total' })}: </span>
													<Red><Money money={cart.orderSummary.orderTotal} /></Red>
													{
														this.props.payMethod === '22' && <Red style={{ fontWeight: 'normal', marginLeft: 5, fontSize: 14 }}>(Em até 3x s/ juros)</Red>
													}
												</div>
												{
													cancheckout ? (
														!this.state.checking ? <BigButton onClick={this.checkout.bind(this)} className="__btn" height={47} bgColor="#222">
															{intl.formatMessage({ id: 'check_out' })} ({totalCount})
														</BigButton> : <BigButton className="__btn" height={47} bgColor="#999">
															{intl.formatMessage({ id: 'please_wait' })}...
														</BigButton>
													) : (
														<BigButton className="__btn" height={47} bgColor="#999">
															{intl.formatMessage({ id: 'check_out' })} ({totalCount})
														</BigButton>
													)
												}
											</Checkout> : <Checkout>
												<div className="__total">
													<span>{intl.formatMessage({ id: 'total' })}: </span>
													<Red><Money money={cart.orderSummary.orderTotal} /></Red>
												</div>
												<div>
													<BigButton className="__btn" height={47} bgColor="#999">
														{intl.formatMessage({ id: 'check_out' })} ({totalCount})
													</BigButton>
												</div>
											</Checkout>
										}

									</div>
								</Box>
							) : (
								window.token ? (
									<Box>
										<div style={{ height: 90 }}>
											<Checkout>
												<div className="__total">
													<span>{intl.formatMessage({ id: 'total' })}: </span>
													<Red><Money money={cart.orderSummary.orderTotal} /></Red>
												</div>
												{
													cancheckout ? (
														<BigButton onClick={this.quickPlace.bind(this)} className="__btn" height={47} bgColor="#222">
																Place Order
														</BigButton>
													) : (
														<BigButton className="__btn" height={47} bgColor="#ddd">
															{intl.formatMessage({ id: 'check_out' })}
														</BigButton>
													)
												}
											</Checkout>
										</div>
									</Box>
								) : (
									<Box>
										<div style={{ height: 90 }}>

										</div>


										{
											cart.canCheckout ? <Checkout>
												<div className="__total">
													<span>{intl.formatMessage({ id: 'total' })}: </span>
													<Red><Money money={cart.orderSummary.orderTotal} /></Red>


													{cart.paypalDiscountMessage && <DISCOUNTTIP dangerouslySetInnerHTML={{ __html: cart.paypalDiscountMessage }} />}

												</div>



												{
													hasQuickPay ? <DoubleBtn className="x-flex __between">
														<div>
															<BigButton onClick={() => {
																window.location.href = `${window.ctx}/${
																	/*global siteType b:true */
																	/*eslint no-undef: "error"*/
																	siteType === 'new' ? 'page' : 'i'
																}/login?redirectUrl=${encodeURIComponent(window.location.href)}`
															}} className="__btn" height={47} bgColor="#222">
																{intl.formatMessage({ id: 'check_out' })} ({totalCount})
															</BigButton>
														</div>
														<div>
															<PaypalBtn onClick={this.quickPaypal.bind(this)}><img src={cart.paypalButtonImage} /></PaypalBtn>
														</div>
													</DoubleBtn> : <div>
														<BigButton onClick={() => { window.location.href = `${window.ctx}/${siteType === 'new' ? 'page' : 'i'}/login?redirectUrl=${encodeURIComponent(window.location.href)}` }} className="__btn" height={47} bgColor="#222">
															{intl.formatMessage({ id: 'check_out' })} ({totalCount})
														</BigButton>
													</div>
												}




											</Checkout> : <Checkout>
												<div className="__total">
													<span>{intl.formatMessage({ id: 'total' })}: </span>
													<Red><Money money={cart.orderSummary.orderTotal} /></Red>
												</div>
												<div>
													<BigButton className="__btn" height={47} bgColor="#999">
														{intl.formatMessage({ id: 'check_out' })} ({totalCount})
													</BigButton>
												</div>
											</Checkout>
										}


									</Box>
								)
							)
						}

					</Boxs>

					{
						editing.isEditing && (
							<React.Fragment>
								<Mask />
								<ProductEditor onClose={() => { this.props.EDITED() }}
									itemConfirmHandle={this.itemConfirmHandle}
									item={editing.item} />
							</React.Fragment>
						)
					}

					{
						isCreditShow && this.props.payMethod === '19' && mercadocards && mercadocards.length && (
							<React.Fragment>
								<Mask />
								<CreditCard
									count={totalCount}
									payMethod={this.props.payMethod}
									securityCode={this.props.securityCode}
									handleMercado={this.checkmercado.bind(this)}
									mercadoref={this.mercadoref.bind(this)}
									handleInputChange={this.handleInputChange}
									creditClose={this.creditClose.bind(this)}
									cardSelect={this.cardSelect.bind(this)}
									cards={mercadocards}
									addCard={this.addMercadoCard.bind(this)}
									status={this.props.creditstatus}
									orderTotal={cart.orderSummary.orderTotal}
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
						isCreditShow && (this.props.payMethod === '3' || this.props.payMethod === '17' || this.props.payMethod === '18' || this.props.payMethod === '22' || this.props.payType === '12') && creditcards && creditcards.length && (
							<React.Fragment>
								<Mask />
								<CreditCard
									count={totalCount}
									cards={creditcards}
									payMethod={this.props.payMethod}
									orderTotal={cart.orderSummary.orderTotal}
									cpf={this.props.cpf}
									cpfClickHandle={this.cpfClickHandle.bind(this)}
									handleCredit={this.handleCredit.bind(this)}
									brazilref={(c) => { this.brazilref = c }}
									brazilForm={c => this.brazilForm = c}
									handleInputChange={this.handleInputChange}
									creditClose={this.creditClose.bind(this)}
									installmentoptions={this.props.cart.payInstalmentsByOceanpaymentBRACreditCard || []}
									installments={this.props.installments}
									addCard={this.addCreditCard.bind(this)}
									cardSelect={this.cardSelect.bind(this)}
									status={this.props.creditstatus}
									checking={this.state.checking}
									toggleBack={() => {
										this.props.TOGGLECREDITSTATUS(this.props.creditstatus === 0 ? 1 : 0)
									}}
									country={country}
									document={this.props.document}
									dlocalref={c => this.dlocalref = c}
									dlocalbtn={c => this.dlocalbtn = c}
								/>
							</React.Fragment>
						)
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
						this.state.showPayMsgOcean && cart.cancelOceanpaymentPayMsg && <Confirm title={
							/*global sitename b:true */
							/*eslint no-undef: "error"*/
							sitename
						}
						no={() => {
							this.setState({ showPayMsgOcean: false })
							this.props.TOGGLECREDIT(false)
						}}
						close={() => { this.setState({ showPayMsgOcean: false }) }}
						yes={() => { this.setState({ showPayMsgOcean: false }) }}
						yesLabel="Continue" noLabel="No, Thanks">
							<span dangerouslySetInnerHTML={{ __html: cart.cancelOceanpaymentPayMsg }} />
						</Confirm>
					}

					{
						this.state.successTip && <SUCCESSTIP>
							{this.state.successTip}
						</SUCCESSTIP>
					}

				</div>)
		))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ShoppingCart))
