import React, {createRef, useEffect, useLayoutEffect, useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Loading from '../components/msite/loading.jsx'
import CheckBox from '../components/checkbox.jsx'
import Empty from '../components/msite/empty.jsx'
import Refreshing from '../components/msite/refreshing.jsx'
import Ask from '../components/ask.jsx'
import Ellipsis from '../components/ellipsis.jsx'
import FixedMessage from '../components/msite/fixed-message.jsx'
import { Boxs, Box, BoxClickHead, BoxBody, LineBox, BoxHead } from '../components/msite/layout.jsx'
import { ConfirmAlter } from '../components/msite/alter.jsx'
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
	setCashout, wishItem, selectAllItems,
	addItem
} from '../store/actions.js'
import Mask from '../components/mask.jsx'
import _ from 'lodash'
import PayMethodList from '../components/msite/paymethod-list.jsx'
import { BigButton } from '../components/msite/buttons.jsx'
import {
	payDLocal, useMercadocard, mercadopay, usePoint, useInsurance, creditpay, normalpaypal, quickpaypal, usecreditcard, movetooverseas, getMessage, getCountryMessage, placepaypal, givingCoupon, atmPay, ticketPay, getSafeCharge, getApacPay, apacPay, useMercadoCoupon, placeorder,
	getJwt,
	getLookup,
	oceanpay3d,
	placeOrderAll,
	openSafeChargeOrder,
	setSafeChargeStatus,
	klarna_get_params,
	klarna_create_session,
	klarna_place_order,
	pay,
	product_get_catch_with,
	get_pay_params,
	selectGift,
	removeGift,
	getRecProducts

} from '../api'
import { __route_root__, storage, producturl, unitprice } from '../utils/utils.js'
import { submit } from '../utils/common-pay.js'
import { CountDownBlock } from '../components/msite/countdowns.jsx'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Confirm } from '../components/msite/modals.jsx'
import Icon from '../components/icon.jsx'
import SUCCESSTIP from '../components/pc/successtip.jsx'

import Loadable from 'react-loadable'

import ShippingMethodHead from '../components/msite/shipping-method-head.jsx'
import { SwiperNormalProducts } from '../components/msite/product-items.jsx'
import SwiperGifts from '../components/msite/gifts.jsx'
import Items from '../components/msite/items.jsx'
import depplink from '../utils/deeplink'
import RECProducts from '../components/msite/rec-products.jsx'
import CouponProgress from '../components/msite/coupon-progress.jsx'
import FilterProducts from '../components/msite/filter-products.jsx'
import {MASK} from '../components/pc/modal'


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

const GUESTCONFIRM = styled.span`
	background-color: #fff;
	position: fixed;
	bottom: -400px;
	left: 0;
	width: 100%;
	z-index: 101;
	padding: 0 10px 20px 10px;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	overflow: hidden;
	transition: 200ms bottom;
	& > .__hd{
		height: 38px;
		line-height: 38px;
		font-size: 16px;
		font-family: AcuminPro-Bold;
		text-align: center;
		border-bottom: 1px solid #dfdfdf;
	}
	
	.__txt{
		font-size: 12px;
		color: #999;
	}
	
	&.anim{
		bottom: 0;
	}
	
	.__close{
		font-family: iconfont;
		cursor: pointer;
		right: 10px;
		top: 0;
		position: absolute;
		color: #999;
	}
`

const GuestConfirm = props => {

	const ref = createRef()

	useEffect(() => {
		if(window.GeekoSensors){
			window.GeekoSensors.Track('PitPositionExposure', {
				resource_type: 'Guest Login'
			})
			window.GeekoSensors.Track('PitPositionExposure', {
				resource_type: 'Guest Checkout'
			})
		}
	}, [])

	useLayoutEffect(() => {
		ref.current.classList.add('anim')
	}, [])

	const handleClose = () => {
		ref.current.classList.remove('anim')
		setTimeout(() => {
			props.onClose()
		} , 200)
	}

	const loginHandle = () => {
		try {
			if(window.GeekoSensors){
				window.GeekoSensors.Track('PitPositionClick', {
					resource_type: 'Guest Login'
				})
			}

		}catch(e){
			console.error(e)
		}

		props.onLogin()

	}

	const continueHandle = () => {
		props.onCheckout()
		try {
			if(window.GeekoSensors){
				window.GeekoSensors.Track('PitPositionClick', {
					resource_type: 'Guest Checkout'
				})
			}
		}catch(e){
			console.error(e)
		}
	}


	return <GUESTCONFIRM innerRef={ref}>
		<div className="__hd">
			<span><FormattedMessage id="secure_checkout"/></span>
			<span onClick={handleClose} className={'__close'}>&#xe6af;</span>
		</div>
		<div style={{marginTop: 10}}>
			<div className="__txt"><FormattedMessage id="get_more_discount"/></div>
			<div style={{marginTop:6}}>
				<BigButton onClick={loginHandle}><FormattedMessage id="register"/>/<FormattedMessage id="sign_in"/></BigButton>
			</div>
			<div style={{marginTop: 14}} className="__txt"><FormattedMessage id="check_as_email"/></div>
			<div style={{marginTop: 6}}>
				<BigButton className="outlined" onClick={continueHandle}><FormattedMessage id="guest_checkout"/></BigButton>
			</div>
		</div>
	</GUESTCONFIRM>
}



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

const Checkout = styled.div`
	&>div{
		&.__total{
			display: flex;
			padding: 0 10px 12px 10px;
			justify-content: space-between;
		}
		&.__btn{
			margin-top: 2px;
		}
	}
	padding: 10px;
	border-top: solid 1px #e6e6e6;
	position: fixed;
	width: 100%;
	bottom: 0;
	left: 0;
	background-color: #fff;
	z-index:5;
	height: 118px;
`

const Tip = styled.div`
	background-color: #fef8f8;
	padding: 10px;
	line-height: 18px;
	font-size: 12px;

	&.__fixed{
		position: fixed;
		width: 100%;
		z-index: 5;
		top: 44px;
		left: 0;
	}
	a{
		text-decoration: underline;
	}
`

const BottomTip = styled.div`
	background-color: #fef8f8;
	padding: 10px;
	line-height: 18px;
	font-size: 12px;
	position: fixed;
	width: 100%;
	z-index: 1;
	bottom: 90px;
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
	top: -25px;
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


const IconMessage = styled.div`
	padding: 13px 12px;
	display: flex;
	width: 100%;
	align-items: center;
	& > div{
		
		&:first-child{
			width: 30px;
		}

		&:nth-child(2){
			flex: 1;
		}

		&:nth-child(3){
			text-align: right;
		}
	}
`



const COUPONALERT = styled.div`
	position: fixed;
	left: 8px;
	bottom: 138px;
	width: 270px;
	height: 42px;
	background-color: rgba(255, 133, 51, 0.96);
	border-radius: 21px;
	padding: 2px;
	transition: all .3s;
	display: flex;
	align-items: center;
	overflow: hidden;
	z-index: 2;
	cursor: pointer;
	& > .__icon{
		width: 38px;
		height: 38px;
		background-color: #fdf3e9;
		border-radius: 50%;
		text-align: center;
		line-height: 38px;
		transition: all .3s;
		flex-shrink: 0;
	}

	& > .__bd{
		overflow: hidden;
		color: #fff;
		padding-left:10px;
		padding-right: 10px;
	}

	&.closed{
		width: 42px;
		& > .__icon{
			transform: rotate(-45deg);
		}
	}
`

const ALSOLIKES = styled.div`
	& > .__hd{
		height: 42px;
		line-height: 42px;
		font-family: AcuminPro-Bold;
		font-size: 14px;
		color: #121314;
	}

	& > .__bd{
		padding-bottom: 12px;
	}
	padding-left: 12px;
`


const CouponAlert = props => {
	return <COUPONALERT {...props}>
		<div className="__icon">
			<span className="iconfont" style={{ color: '#ff822f' }}>&#xe7b4;</span>
		</div>
		<div className="__bd">
			<div style={{ whiteSpace: 'nowrap', fontSize: 16 }}><FormattedMessage id="coupon_alert" /></div>
			<div style={{ whiteSpace: 'nowrap', fontSize: 12 }}>
				<span dangerouslySetInnerHTML={{ __html: props.couponMsg }} />
			</div>
		</div>
	</COUPONALERT>
}


const ShoppingBody = styled.div`
	& > .__hd{
		height: 44px;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: #fff;
		z-index: 5;
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
		font-family: AcuminPro-Bold;
		font-size: 16px;
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

const EditingHead = styled.div`
	position: relative;
	text-align: center;
	line-height: 44px;
	height: 44px;
	.__title{
		font-family: SlatePro-Medium;
		font-size: 17px;
		color: #222;
	}

	.__done{
		cursor: pointer;
		font-size: 14px;
		color: #666;
		position: absolute;
		right: 12px;
	}
`

const EditButton = styled.div`
	display: inline-block;
	border-radius: 14px;
	height: 28px;
	border: solid 1px #cacaca;
	padding-left: 15px;
	padding-right: 15px;
	line-height: 26px;
	font-size: 14px;
	color: #222;
	cursor: pointer;
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
			dispatch(refreshCart(cart))
		},
		SELECT: (params) => {
			dispatch(selectItem(params))
		},
		SELECTALL: (selected) => {
			dispatch(selectAllItems(selected))
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
		ADDITEM: (params) => {
			return dispatch(addItem(params))
		},
		WISHITEM: (productIds, variantIds) => {
			dispatch(wishItem(productIds, variantIds))
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
		SETCASHOUT: (method) => {
			return dispatch(setCashout(method))
		}
	}
}

const ShoppingCart = class extends React.Component {
	constructor(props) {
		super(props)
		this.itemSelect = this.itemSelect.bind(this)
		this.itemEditSelect = this.itemEditSelect.bind(this)
		this.groupClick = this.groupClick.bind(this)
		this.itemEdit = this.itemEdit.bind(this)
		this.itemConfirmHandle = this.itemConfirmHandle.bind(this)
		this.viewConfirm = this.viewConfirm.bind(this)
		this.giftConfirm = this.giftConfirm.bind(this)
		this.giftRemove = this.giftRemove.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.sdkResponseHandler = this.sdkResponseHandler.bind(this)
		this.scrollhandle = this.scrollhandle.bind(this)
		this.itemDelete = this.itemDelete.bind(this)
		this.itemWish = this.itemWish.bind(this)
		this.clearall = this.clearall.bind(this)
		this.state = {
			creditstatus: 0,
			tipFixed: false,
			showAsk: false,
			askMessage: '',
			askTitle: '',
			paypaling: false,
			checking: false,
			refreshing: false,
			showPayMsgOcean: false,
			ticketMethods: [],
			atmMethods: [],
			successTip: null,
			dlocalerror: null,
			confirm: {
				open: false,
				content: '',
			},
			managing: false,
			selectedItems: [],
			editSelectAll: false,
			klarnaSession: null,
			klarnaParams: {},
			alsolikes: null,
			viewing: false,
			viewingItem: null,
			couponBanner: null,
			cartBanner: null,
			recs: [],
			showFilterProducts: false,
			showGuest: false
		}
		this.processCallBack = this.processCallBack.bind(this)
		this.processErrorBack = this.processErrorBack.bind(this)
		this.scrollTop = 0


		const orderId = storage.get('temp-order')

		storage.remvoe('temp-order')

		if (orderId) {
			props.history.push(`${window.ctx || ''}/checkout/${orderId}`)
		}

	}


	allEditHandle(selected) {
		const { cart } = this.props
		const allItems = selected ? this.getAllItems(cart) : []
		this.setState({
			selectedItems: allItems,
			editSelectAll: selected
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

	cvvRef(c) {
		this.cvvField = c
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





		this.props.INIT().then(() => {
			var { cart } = this.props
			if (cart) {
				if (window.enterCart) {
					window.enterCart(cart)
				}
			}
		})
		this.props.FETCHCOUPONS()
		window.addEventListener('scroll', this.scrollhandle, false)

		// product_get_catch_with({}).then(data => {
		// 	this.setState({
		// 		alsolikes: (data.result || []).map(p => ({ ...p, geekoRequsestId: data.geekoRequsestId }))
		// 	})
		// })


		getRecProducts().then(data => {
			const result = data.result
			this.setState({
				recs: (result || []).map(r => ({ ...r, requestId: data.requestId }))
			})
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

		getMessage('M1390').then(({ result }) => {
			this.setState({
				couponBanner: result
			})
		})

		getCountryMessage('M1392').then(({ result }) => {
			this.setState({
				cartBanner: result
			})
		})

	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.scrollhandle, false)
	}

	scrollhandle(evt) {

		let [scrollTop, documentHeight, windowHeight] = [
			document.documentElement.scrollTop || document.body.scrollTop,
			document.body.clientHeight,
			window.screen.height
		]

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

		if (scrollTop > this.scrollTop) {
			if (this.couponAlert) {
				this.couponAlert.classList.add('closed')
			}
		} else {
			if (this.couponAlert && documentHeight - scrollTop > windowHeight) {
				this.couponAlert.classList.remove('closed')
			}
		}


		this.scrollTop = scrollTop







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
		const isRequireEmail = !window.__is_login__ && !window.token && this.props.location.pathname && this.props.location.pathname.indexOf('/cart/checkout') >= 0
		const { selectedPayMethod } = cart

		if (!cart.shippingDetail) {
			this.props.history.push(`${window.ctx || ''}${__route_root__}/address`)
			return
		}

		if (!payType) {
			alert('Please select a pay method!')
			this.$paylistdom.scrollIntoView()
			return
		}

		if (shippingDetail.country && shippingDetail.country.value === 'BR' && !shippingDetail.cpf || (isRequireEmail && !shippingDetail.email) || !shippingDetail.phoneNumber) {
			const path = {
				pathname: `${window.ctx || ''}${__route_root__}/address`,
				state: {
					validate: true
				}
			}
			this.props.history.push(path)
			return
		}

		if (payType === '30' || payMethod === '18') {

			this.setState({
				checking: true
			})

			placeOrderAll(payMethod).then(data => data.result).then(result => {
				const { orderId } = result
				this.props.history.push(`${window.ctx || ''}${__route_root__}/credit/${orderId}?payMethod=${payMethod}`)
				this.setState({
					checking: false
				})
			}).catch(data => {
				alert(data.result)
				this.setState({
					checking: false
				})
			})
		
		}else if (payType === '2' || payMethod === '17' || payType === '8') {
			this.props.TOGGLECREDIT(true)
			this.setState({
				checking: true
			})

			const multi = this.props.payMethod === '18' || this.props.payMethod === '3'

			this.props.GETCREDITCARDS(multi ? ['18', '3'] : payMethod, multi).then((cards) => {
				if (!cards || cards.length < 1) {
					if (payType === '8') {
						getSafeCharge(payMethod).then(({ result }) => {
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
		} else if (payType === '26') {
			this.setState({
				checking: true
			})

			getSafeCharge(payMethod).then(({ result }) => {
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
			normalpaypal().then(data => data.result).then(({ TOKEN, success, tokenSuccess, transactionId, orderId, ACK, L_LONGMESSAGE0, method }) => {
				if (success && transactionId && !TOKEN || method === 'DoReferenceTransaction' && tokenSuccess) {
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
			ticketPay('oxxo').then(data => data.result).then(this.processCallBack).catch(this.processErrorBack)
		} else if (payType === '11') {
			this.setState({
				checking: true
			})

			if (payMethod === '23') {
				const { cpf } = this.props
				this.apacPay(payMethod, cpf)


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
			payDLocal({ payMethod, paymentMethodId: 'BL' }).then(data => data.result).then(this.processCallBack).catch(this.processErrorBack)

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




			this.setState({
				checking: true
			})

			payDLocal({ payMethod, paymentMethodId, document: this.props.document }).then(data => data.result).then(this.processCallBack).catch(this.processErrorBack)
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
							error_messages,
							orderId
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

	getApacPay(payMethod, cpf, fail) {
		getApacPay({ payMethod, cpfNumber: cpf }).then(({ result }) => {
			const { isFree, transactionId, orderId } = result
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

	apacPay(payMethod, cpf) {
		apacPay({ payMethod, cpfNumber: cpf }).then(data => data.result).then(this.processCallBack).catch(this.processErrorBack)
	}

	quickPaypal(evt) {
		evt.preventDefault()
		const { cart, paypal, payMethod } = this.props
		this.setState({
			paypaling: true
		})

		quickpaypal().then(data => data.result).then(({ TOKEN, ACK, L_LONGMESSAGE0 }) => {
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
		const { cart } = this.props



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
					if (orderId && window.__is_login__) {
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

	viewConfirm(oldId, newId, quantity, productId) {

		try {
			if (window.GeekoSensors) {
				window.GeekoSensors.Track('AddToCartDetail', {
					product_id: productId,
					variant_id: newId,
					product_qty: quantity,
					page_type: this.state.viewingItem.type,
					is_success: true
				})
			}

		} catch (e) { }


		return this.props.ADDITEM({ variantId: newId, quantity }).then(() => {
			this.setState({
				viewing: false,
				viewingItem: null
			})
		}).catch(data => {
			alert(data.result || data)
		})

	}

	giftConfirm(oldId, newId, quantity) {
		this.setState({
			loading: true
		})
		selectGift(newId).then(data => data.result).then(cart => {
			this.setState({
				viewing: false,
				viewingItem: null
			})
			this.props.REFRESHCART(cart).then(cart => {
				this.setState({
					loading: false
				})
			}).catch(() => {
				this.setState({
					loading: false
				})

			})
		}).catch(() => {
			this.setState({
				loading: false
			})

		})
	}

	giftRemove(variantId) {
		this.setState({
			loading: true
		})
		removeGift(variantId).then(data => data.result).then(cart => {
			this.props.REFRESHCART(cart).then(cart => {
				this.setState({
					loading: false
				})
			}).catch(() => {
				this.setState({
					loading: false
				})

			})
		}).catch(() => {
			this.setState({
				loading: false
			})

		})
	}

	itemEdit(item) {
		this.props.EDITING(item)
	}

	deleteAllItems(evt) {
		const selectedItems = this.state.selectedItems

		if (selectedItems && selectedItems.length > 0) {
			const variantIds = selectedItems.map(item => item.variantId).join(',')

			this.setState({
				confirm: {
					open: true,
					content: 'Are you sure delete these items?',
					yesBack: () => {

						this.props.DELETEITEMS(variantIds)
						this.setState({
							confirm: {
								open: false,
								content: '',
								yesBack: null,
								noBack: null
							},
							managing: false
						})



					},
					noBack: () => {
						this.setState({
							confirm: {
								open: false,
								content: '',
								yesBack: null,
								noBack: null
							}
						})
					}
				}
			})
		}
	}

	addAllToWish(evt) {
		const selectedItems = this.state.selectedItems

		if (selectedItems && selectedItems.length > 0) {
			const [productIds, variantIds] = [
				selectedItems.map(item => item.productId).join(','),
				selectedItems.map(item => item.variantId).join(',')
			]

			this.setState({
				confirm: {
					open: true,
					content: 'Are you sure moving these products to wishlist from shopping bag?',
					yesBack: () => {

						if (!window.__is_login__) {
							window.location.href = `${window.ctx}/${
								/*global siteType b:true*/
								/*eslint no-undef: "error"*/
								siteType === 'new' ? 'page' : 'i'
							}/login?redirectUrl=${encodeURIComponent(window.location.href)}&loginPage=1`
						} else {
							this.props.WISHITEM(productIds, variantIds)
							this.setState({
								confirm: {
									open: false,
									content: '',
									yesBack: null,
									noBack: null
								},
								managing: false
							})
						}



					},
					noBack: () => {
						this.setState({
							confirm: {
								open: false,
								content: '',
								yesBack: null,
								noBack: null
							}
						})
					}
				}
			})
		}


	}

	itemWish(item) {
		this.setState({
			confirm: {
				open: true,
				content: 'Are you sure moving the product to wishlist from shopping bag?',
				yesBack: () => {
					if (!window.__is_login__) {
						window.location.href = `${window.ctx}/${
							/*global siteType b:true*/
							/*eslint no-undef: "error"*/
							siteType === 'new' ? 'page' : 'i'
						}/login?redirectUrl=${encodeURIComponent(window.location.href)}&loginPage=1`
					} else {
						this.props.WISHITEM(item.productId, item.variantId)
						this.setState({
							confirm: {
								open: false,
								content: '',
								yesBack: null,
								noBack: null
							}
						})
					}

				},
				noBack: () => {
					this.setState({
						confirm: {
							open: false,
							content: '',
							yesBack: null,
							noBack: null
						}
					})
				}
			}
		})
	}

	itemDelete(item) {

		this.setState({
			confirm: {
				open: true,
				content: 'Are you sure delete this item?',
				yesBack: () => {
					this.props.DELETEITEM(item.variantId)
					this.setState({
						confirm: {
							open: false,
							content: '',
							yesBack: null,
							noBack: null
						}
					})
				},
				noBack: () => {
					this.setState({
						confirm: {
							open: false,
							content: '',
							yesBack: null,
							noBack: null
						}
					})
				}
			}
		})
	}

	itemIdDelete(itemId) {
		this.setState({
			confirm: {
				open: true,
				content: 'Are you sure delete this item?',
				yesBack: () => {
					this.props.DELETEITEM(itemId)
					this.setState({
						confirm: {
							open: false,
							content: '',
							yesBack: null,
							noBack: null
						}
					})
				},
				noBack: () => {
					this.setState({
						confirm: {
							open: false,
							content: '',
							yesBack: null,
							noBack: null
						}
					})
				}
			}
		})
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

	itemAllSelect(selected) {
		this.props.SELECTALL(selected)
	}

	itemEditSelect(item, selected) {
		const { cart } = this.props


		if (selected) {
			const selectedItems = [item, ...this.state.selectedItems]
			const allSelected = this.countSCart(cart.overseasDelivery, cart.domesticDeliveryCases) === selectedItems.length
			this.setState({
				selectedItems: selectedItems,
				editSelectAll: allSelected
			})
		} else {
			this.setState({
				selectedItems: (this.state.selectedItems.filter(i => i.variantId != item.variantId) || []),
				editSelectAll: false
			})
		}





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
			askMessage: shippingInsuranceMsg2,
			askTitle: <FormattedMessage id={'shipping_insurance'}/>
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

			const { document, payMethod } = this.props


			this.setState({
				dlocalerror: null
			})

			if (payMethod !== '24') {
				this.dlocalref.validateAll()
				if (this.dlocalbtn && this.dlocalbtn.context && this.dlocalbtn.context._errors.length > 0) {
					this.setState({
						checking: false
					})
					return
				}
			}

			if (window.__dlocal) {
				window.__dlocal.createToken(this.cvvField, {}).then(result => {
					this.payCredit({ installments, document, token: result.token })
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



		} else if (this.props.payMethod === '18') {
			placeOrderAll(this.props.payMethod).then(data => data.result).then(result => {
				const { orderId } = result

				openSafeChargeOrder(orderId).then(data => data.result).then(result => {
					this.authenticate3d(result, orderId)
				}).catch(data => {
					alert(data.result)
					this.setState({
						checking: false
					})
					this.props.history.push(`${window.ctx || ''}/checkout/${orderId}`)
				})

			}).catch(data => {
				alert(data.result)
				this.setState({
					checking: false
				})
			})

		} else {
			this.payCredit({ payCpf: cpf, payInstallments: installments })
		}
	}


	authenticate3d(result, orderId) {
		const response = result.openOrderResponse
		const self = this

		// Instantiate Safecharge API
		const sfc = SafeCharge({
			env: window.safechargeEnv || 'prod', // the environment you’re running on, prod for production
			merchantId: response.merchantId, //as asigned by SafeCharge
			merchantSiteId: response.merchantSiteId // your merchantsite id provided by Safecharge
		})


		sfc.createPayment({
			'sessionToken': response.sessionToken, //recieved form opeOrder API
			'merchantId': response.merchantId, //as asigned by SafeCharge
			'merchantSiteId': response.merchantSiteId, //as asigned by SafeCharge
			'userTokenId': response.userTokenId,
			'clientUniqueId': response.clientUniqueId, // optional
			'paymentOption': {
				'userPaymentOptionId': result.userPaymentOptionId,
			},
			'billingAddress': {
				'country': result.country,
				'email': result.email
			},
			'deviceDetails': {
				'ipAddress': result.ip
			}
		}, function (res) {
			setSafeChargeStatus(response.sessionToken).then(data => data.result).then(result => {
				if (res.result === 'APPROVED') {
					window.location.href = `${window.ctx || ''}/order-confirm/${response.clientUniqueId}`
				} else {
					alert(res.errorDescription || res.reason || 'Error')
					self.setState({
						checking: false
					})

					if (orderId && window.__is_login__) {
						self.props.history.push(`${window.ctx || ''}/checkout/${orderId}`)
					}
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
		placeorder().then(({ result: payment }) => {
			if (payment) {
				const { orderId } = payment
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

	payDLocal(params) {
		this.setState({
			checking: true
		})
		payDLocal(params).then(data => data.result).then(this.processCallBack).catch(this.processErrorBack)
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

	payCredit(params) {
		// const {creditcards} = this.props

		// let card
		// if(creditcards && creditcards.length > 0){
		// 	card = creditcards.find( c => c.quickpayRecord.isSelected )
		// }

		// if(card && card.quickpayRecord.payMethod === '3'){
		// 	this.triggerOcean()
		// }else{
		creditpay(params).then(data => data.result).then(this.processCallBack).catch(this.processErrorBack)
		// }

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
				const { isFree, transactionId, orderId } = result
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

	formatOverseasDelivery(o) {

		const overseasDelivery = _.cloneDeep(o)


		const deliveryItems = overseasDelivery ? overseasDelivery.deliveryItems : null
		let hasSelectedItem = false
		let allSelected = true

		if (deliveryItems && deliveryItems.length) {
			deliveryItems.forEach(deliveryItem => {
				let items = this.getValidItems(deliveryItem.shoppingCartProducts)
				deliveryItem.shoppingCartProducts = items || []

				if (!hasSelectedItem) hasSelectedItem = this.hasSelectedItem(items)

				if (allSelected) {
					allSelected = !(items || []).some(item => !item.selected)
				}
			})
		}

		return {
			overseasDelivery,
			hasSelectedItem,
			allSelected
		}
	}

	formatDomesticDeliveryCases(d) {
		const domesticDeliveryCases = _.cloneDeep(d)
		let hasSelectedItem = false
		let allSelected = true
		if (domesticDeliveryCases && domesticDeliveryCases.length) {
			domesticDeliveryCases.forEach(domestic => {
				let items = this.getValidItems(domestic.shoppingCartProducts)
				domestic.shoppingCartProducts = items || []
				if (!hasSelectedItem) hasSelectedItem = this.hasSelectedItem(items)

				if (allSelected) {
					allSelected = !(items || []).some(item => !item.selected)
				}


			})
		}
		return {
			domesticDeliveryCases,
			hasSelectedItem,
			allSelected
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
			allSelected: data1.allSelected && data2.allSelected && (data1.hasSelectedItem || data2.hasSelectedItem)
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

	countSCart(overseasDelivery, domesticDeliveryCases) {
		let count = 0

		const deliveryItems = overseasDelivery ? overseasDelivery.deliveryItems : null

		if (deliveryItems && deliveryItems.length) {
			deliveryItems.forEach(deliveryItem => {
				let items = deliveryItem.shoppingCartProducts
				if (items && items.length) {
					items.forEach(item => {
						count += 1
					})
				}
			})
		}


		if (domesticDeliveryCases && domesticDeliveryCases.length) {
			domesticDeliveryCases.forEach(domestic => {
				let items = domestic.shoppingCartProducts
				if (items && items.length) {
					items.forEach(item => {
						count += 1
					})
				}
			})
		}

		return count

	}

	getAllItems(cart) {
		let allItems = []
		const { overseasDelivery, domesticDeliveryCases } = cart

		const deliveryItems = overseasDelivery ? overseasDelivery.deliveryItems : null

		if (deliveryItems && deliveryItems.length) {
			deliveryItems.forEach(deliveryItem => {
				let items = deliveryItem.shoppingCartProducts
				if (items && items.length) {
					allItems = [...items, ...allItems]
				}
			})
		}


		if (domesticDeliveryCases && domesticDeliveryCases.length) {
			domesticDeliveryCases.forEach(domestic => {
				let items = domestic.shoppingCartProducts
				if (items && items.length) {
					allItems = [...items, ...allItems]
				}
			})
		}

		return allItems
	}

	alsoRef(c) {
		if (window.sourceObserver && c && !this.alsolink) {
			window.sourceObserver.observe(c)
			this.alsolink = c
		}
	}

	couponClick(){
		if (window.GeekoSensors) {
			window.GeekoSensors.Track('CouponButtonClick', {
			})
		}
	}


	render() {
		const { cart, loading, empty, editing, isCreditShow, mercadocards, creditcards, intl } = this.props
		const { managing } = this.state
		let tcMethod


		let isprogresspage, country, formatedData, invalidItems, cancheckout, hasLocalItems, sendCouponMessage, couponcountdown, totalCount = 0, hasOverseas, hasQuickPay
		let gifts
		let allSelected
		let giftList

		if (cart) {

			isprogresspage = !window.token && (window.__is_login__ || (cart && cart.shippingDetail) || (this.props.location.pathname && this.props.location.pathname.indexOf('/cart/checkout') >= 0))

			formatedData = this.formatData(cart)
			invalidItems = formatedData.invalidItems
			allSelected = formatedData.allSelected
			sendCouponMessage = cart.sendCouponMessage
			couponcountdown = this.getCountdown(cart)
			cancheckout = formatedData.hasSelectedItem
			hasLocalItems = formatedData.domesticDeliveryCases && !!formatedData.domesticDeliveryCases.find(domestic => domestic.shoppingCartProducts && domestic.shoppingCartProducts.length)
			totalCount = this.countCart(formatedData.overseasDelivery, formatedData.domesticDeliveryCases)

			let validateOverseasItems = this.getValidItems(cart.shoppingCartProductsByOverseas)
			hasOverseas = validateOverseasItems && validateOverseasItems.length > 0
			// hasQuickPay = cart.isSupportPaypal
			hasQuickPay=false

			country = this.props.cart.shippingDetail && this.props.cart.shippingDetail.country ? this.props.cart.shippingDetail.country.value : window.__country
			tcMethod = this.getTcMethod()
			gifts = cart.gifts
			giftList = cart.giftList
			// giftList = [
			// 	{id: '51b9af3e-e588-454e-bafc-9b2b4a331e6b',pcMainImage: '1l6T0V2D5e7j5X645e9s4O336m-14921', name: 'Give me a reason to prove me wrong', price: {amount: '0', unit: '$'}, msrp: {amount: '10', unit: '$'}},
			// 	{id: '5fd3c997-4d17-43d5-bf2e-0f26fabff1db',pcMainImage: '5fd3c997-4d17-43d5-bf2e-0f26fabff1db-54534-pc-sec', name: 'Give me a reason to prove me wrong', price: {amount: '0', unit: '$'}, msrp: {amount: '20', unit: '$'}},
			// 	{id: '191f7188-5578-4427-a700-326ddbc3f08f',pcMainImage: '191f7188-5578-4427-a700-326ddbc3f08f-53915-pc', name: 'Give me a reason to prove me wrong', price: {amount: '0', unit: '$'}, msrp: {amount: '30', unit: '$'}}
			// ]

			// cart.expectedPointDiscount = null
			// cart.expectedPoints = 0
		}

		const TipModal = Tip


		return <React.Fragment>
			{
				!managing ? <ShoppingBody>
					<div className="__hd">
						<ShoppingHead>
							<span className="__title"><FormattedMessage id="shopping_bag" /></span>
							<span onClick={evt => {
								const referrer = document.referrer || ''
								if (referrer.indexOf('/product_detail') > 0 || referrer.indexOf('/product') > 0 || referrer.indexOf('/collection') > 0 || referrer.indexOf('/category') > 0) {
									window.history.back()
								} else {
									window.location.href = '/'
								}
							}} className="__back">&#xe690;</span>
							<span className="__tools">
								<span onClick={evt => { this.setState({ managing: true }) }} className="__edit">&#xe7b6;</span>
								<span onClick={evt => { window.location.href = `${window.ctx || ''}/me/m/wishlist` }} className="__wish">&#xe6a2;</span>
							</span>
						</ShoppingHead>
					</div>
					<div className="__bd">
						{
							loading ? <Loading /> : (empty ? <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
								<Empty />

								{
									this.state.cartBanner && <div style={{ borderTop: '8px solid #f7f7f7' }}>
										<a href={this.state.cartBanner.href} className="" data-source data-source-click data-title="shoppingcart" data-type={'Shopping Cart Banner'} data-content={this.state.cartBanner.refId} data-position={1}>
											<img style={{ display: 'block', width: '100%' }} src={this.state.cartBanner.src} />
										</a>
									</div>
								}


								{/* {
									this.state.alsolikes && this.state.alsolikes.length > 0 && <Box style={{ borderTop: '8px solid #f7f7f7' }}>
										<ALSOLIKES innerRef={this.alsoRef.bind(this)} data-source type="shopping_cart_match_with" data-column="shopping_cart_match_with" data-title="shoppingcart" data-type="shopping_cart_match_with" data-content="You Might Like to Fill it With" data-position="2">
											<div className="__hd">
												<FormattedMessage id="you_can_match_width" />
											</div>
											<div className="__bd">
												<SwiperNormalProducts onSelect={(vairant, product) => {
													this.setState({
														viewingItem: {
															productId: product.id,
															variantId: vairant.id,
															quantity: 1
														},
														viewing: true
													})
												}} products={this.state.alsolikes} />
											</div>
										</ALSOLIKES>

									</Box>
								} */}


								{
									this.state.recs && this.state.recs.length > 0 && <Box style={{ borderTop: '8px solid #f7f7f7' }}>
										<RECProducts recs={this.state.recs} onSelect={(vairant, product) => {
											this.setState({
												viewingItem: {
													productId: product.id,
													variantId: vairant.id,
													quantity: 1
												},
												viewing: true
											})
										}} />
									</Box>
								}



							</div> : (
								cart && (
									<div style={{ opacity: this.props.refreshing ? 0.9 : 1, padding: 8 }}>
										{(this.props.refreshing || this.state.refreshing) && <Refreshing />}

										{
											(couponcountdown > 1000 || cart.messages && cart.messages.orderSummaryMsg) && (
												<div ref={wrapper => { this.fixedTipWrapper = wrapper }}>
													{
														couponcountdown > 1000 ? (
															<TipModal innerRef={tip => { this.fixedTip = tip }}>
																<div className="x-table __fixed x-fw __vm">
																	<div className="x-cell" style={{ width: 75 }}>
																		<CountDownBlock offset={couponcountdown} />
																	</div>
																	<div className="x-cell">
																		<span dangerouslySetInnerHTML={{ __html: sendCouponMessage.message }} />
																	</div>
																</div>
															</TipModal>
														) : (
															<React.Fragment>
																{cart.messages && cart.messages.orderSummaryMsg && <TipModal className={this.state.tipFixed ? '__fixed' : ''} innerRef={tip => { this.fixedTip = tip }}>
																	<span dangerouslySetInnerHTML={{ __html: cart.messages.orderSummaryMsg }} />
																</TipModal>}
															</React.Fragment>
														)
													}
												</div>
											)
										}

										<Boxs>
											{
												cart.shippingDetail ? (
													(isprogresspage || window.token) && <Box style={{ position: 'relative' }}>
														<BoxBody>
															<div className="x-fw x-table __vm">
																<div className="x-cell">
																	<Address address={cart.shippingDetail} />
																</div>
																<div className="x-cell __right" style={{ width: 30 }}>
																	<Grey>
																		<Link style={{ color: '#222', textDecoration: 'none' }} to={`${window.ctx || ''}${__route_root__}/${(window.token || !window.__is_login__) ? 'address' : 'address-book'}`}>
																			<Icon style={{ fontSize: 16 }}>&#xe690;</Icon>
																		</Link>
																	</Grey>
																</div>
															</div>
														</BoxBody>
														<DashedLine />
													</Box>
												) : (
													isprogresspage && <Box style={{ position: 'relative' }}>
														<BoxClickHead title={intl.formatMessage({ id: 'address' })} single={true}>
															<Grey>
																<Link style={{ color: '#222', textDecoration: 'none' }} to={`${window.ctx || ''}${__route_root__}/address`}>
																	<FormattedMessage id="add" />
																</Link>
															</Grey>
														</BoxClickHead>
														<DashedLine />
													</Box>
												)
											}


											{
												cart.route !== 'B' && <React.Fragment>
													{
														cart.messages && cart.messages.shippingMsg && <Box>
															<IconMessage>
																<div>
																	<span className="iconfont">&#xe765;</span>
																</div>
																<div>
																	<span dangerouslySetInnerHTML={{ __html: cart.messages.shippingMsg }} />
																</div>
																<div>
																	<a href={depplink(cart.messages.shippingMsgLink)} style={{ fontFamily: 'SlatePro-Medium', fontSize: 13, textDecoration: 'none', color: '#222' }}><FormattedMessage id="add" /> {'>'}</a>
																</div>
															</IconMessage>
														</Box>
													}

													{
														cart.messages && cart.messages.couponMsg && !cart.couponProgress && <Box>
															<IconMessage>
																<div>
																	<span style={{ position: 'relative', top: 2 }} className="iconfont">&#xe6c2;</span>
																</div>
																<div>
																	<span dangerouslySetInnerHTML={{ __html: cart.messages.couponMsg }} />
																</div>
																<div>
																	<a onClick={() => {
																		this.setState({
																			showFilterProducts: true
																		})


																		try {
																			if (window.GeekoSensors) {
																				window.GeekoSensors.Track('ELClick', {
																					clicks: '凑单旧'
																				})
																			}

																		} catch (e) { }


																	}} style={{ fontFamily: 'SlatePro-Medium', fontSize: 13, textDecoration: 'none', color: '#222' }}><FormattedMessage id="add" /> {'>'}</a>
																</div>
															</IconMessage>
														</Box>
													}




													{
														cart.couponProgress && <Box>
															<CouponProgress onBuy={
																() => {
																	this.setState({
																		showFilterProducts: true
																	})

																	try {
																		if (window.GeekoSensors) {
																			window.GeekoSensors.Track('ELClick', {
																				clicks: '凑单'
																			})
																		}

																	} catch (e) { }
																}
															} couponMsg={cart.messages.couponMsg} couponLink={cart.messages.couponMsgLink} couponProgress={cart.couponProgress} />
														</Box>
													}
												</React.Fragment>
											}






											{/* {
												cart.messages && cart.messages.couponMsg && <Box>
													<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 12px' }}>
														<div>
															<div style={{ fontFamily: 'SlatePro-Medium', fontSize: 16 }}><FormattedMessage id="addonitems" /></div>
															<div style={{ marginTop: 4 }} dangerouslySetInnerHTML={{ __html: cart.messages.couponMsg }} />
														</div>
														<div>
															<a href={'#'} style={{ textDecoration: 'none', color: '#222', fontFamily: 'SlatePro-Medium', fontSize: 13 }}><FormattedMessage id="add" /> &gt;</a>
														</div>
													</div>
												</Box>
											} */}


											{
												giftList && giftList.length > 0 && <Box>
													<SwiperGifts onSelect={(vairant, product) => {

														this.setState({
															viewingItem: {
																productId: product.id,
																variantId: vairant.id,
																quantity: 1,
																isGift: true
															},
															viewing: true
														})
													}} products={giftList} giftWarnMsg={cart.giftWarnMsg} canBuyGift={cart.canBuyGift} />
												</Box>
											}

											{
												gifts && gifts.length > 0 && <Box>
													<Items serverTime={this.props.serverTime}
														disabledFunc={() => { }}
														quantityChange={() => { }}
														itemEdit={item => {
															this.setState({
																viewingItem: {
																	productId: item.productId,
																	variantId: item.variantId,
																	quantity: 1,
																	isGift: true
																},
																viewing: true
															})
														}}
														itemDelete={(item) => {
															this.giftRemove(item.variantId)
														}}
														itemSelect={(variantId, selected) => { }}
														items={gifts}
														isGift={true}
													/>
												</Box>
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
														isShippingHead={!!cart.shippingDetail && (isprogresspage || window.token)}
														group={formatedData.overseasDelivery}
														quantityChange={this.quantityChange.bind(this)}
														itemEdit={this.itemEdit}
														itemDelete={this.itemDelete}
														itemWish={this.itemWish}
														groupClick={this.groupClick}
														itemSelect={this.itemSelect}
														shippingMethod={cart.shippingMethod}
														serverTime={cart.serverTime}
													/>
												</Box>
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
															itemWish={this.itemWish}
															groupClick={this.groupClick}
															itemSelect={this.itemSelect}
															overseasHandle={this.overseasHandle.bind(this)}
															serverTime={cart.serverTime}
															domestic={domestic}
															items={domestic.shoppingCartProducts} />
													</Box>
												))
											}







											{
												cart.giftWarnMsg && <Box>
													<div style={{ padding: 10 }}>
														<span className="iconfont" style={{ color: '#ff8454', fontSize: 30, verticalAlign: 'middle' }}>&#xec45;</span>
														<span style={{ verticalAlign: 'middle' }} dangerouslySetInnerHTML={{ __html: cart.giftWarnMsg }}></span>
													</div>
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
												<LineBox style={{ paddingLeft: 10, paddingRight: 10 }}>




													{
														cart.shippingMethod && !!cart.shippingDetail && (isprogresspage || window.token) && <ShippingMethodHead onClick={evt => { this.props.history.push(`${window.ctx || ''}${__route_root__}/shipping-methods`) }} shippingMethod={cart.shippingMethod} />
													}

													{
														cart.shippingInsurancePrice2 && cart.shippingDetail && (isprogresspage || window.token) && (
															<TurnTool ignoreButton={cart.isShippingInsuranceMust} open={this.openInsurance.bind(this)} turnAcitve={cart.insurance}>
																<span style={{ fontSize: 14, fontFamily: 'SlatePro-Medium' }}>
																	<FormattedMessage id="add_shipping_insurance" values={{ price: <Red><Money money={cart.shippingInsurancePrice2} /></Red> }} />
																</span>
																<Ask style={{ marginLeft: 4 }} onClick={this.insuranceClickHandle.bind(this)} />
															</TurnTool>
														)
													}


												</LineBox>
											</Box>




											{
												cart.route === 'B' && <React.Fragment>
													{
														cart.messages && cart.messages.shippingMsg && <Box>
															<IconMessage>
																<div>
																	<span className="iconfont">&#xe765;</span>
																</div>
																<div>
																	<span dangerouslySetInnerHTML={{ __html: cart.messages.shippingMsg }} />
																</div>
																<div>
																	<a href={depplink(cart.messages.shippingMsgLink)} style={{ fontFamily: 'SlatePro-Medium', fontSize: 13, textDecoration: 'none', color: '#222' }}><FormattedMessage id="add" /> {'>'}</a>
																</div>
															</IconMessage>
														</Box>
													}

													{
														cart.messages && cart.messages.couponMsg && !cart.couponProgress && <Box>
															<IconMessage>
																<div>
																	<span style={{ position: 'relative', top: 2 }} className="iconfont">&#xe6c2;</span>
																</div>
																<div>
																	<span dangerouslySetInnerHTML={{ __html: cart.messages.couponMsg }} />
																</div>
																<div>
																	<a onClick={() => {
																		this.setState({
																			showFilterProducts: true
																		})


																		try {
																			if (window.GeekoSensors) {
																				window.GeekoSensors.Track('ELClick', {
																					clicks: '凑单旧'
																				})
																			}

																		} catch (e) { }


																	}} style={{ fontFamily: 'SlatePro-Medium', fontSize: 13, textDecoration: 'none', color: '#222' }}><FormattedMessage id="add" /> {'>'}</a>
																</div>
															</IconMessage>
														</Box>
													}




													{
														cart.couponProgress && <Box>
															<CouponProgress onBuy={
																() => {
																	this.setState({
																		showFilterProducts: true
																	})

																	try {
																		if (window.GeekoSensors) {
																			window.GeekoSensors.Track('ELClick', {
																				clicks: '凑单'
																			})
																		}

																	} catch (e) { }
																}
															} couponMsg={cart.messages.couponMsg} couponLink={cart.messages.couponMsgLink} couponProgress={cart.couponProgress} />
														</Box>
													}
												</React.Fragment>
											}



											<Box>
												<BoxClickHead single={cart.expectedPoints <= 0} className="x-small" title={intl.formatMessage({ id: 'coupon' })}>
													<Link style={{ textDecoration: 'none', color: '#222' }} to={`${window.ctx || ''}${__route_root__}/coupons`}>

														{cart.coupon ? (
															<span><strong>{cart.coupon.couponName}</strong> {cart.coupon.name}</span>
														) : (
															<span>
																<FormattedMessage id="can_use_coupon" values={{
																	canUseCouponCount: <Red>{cart.canUseCouponCount}</Red>
																}} />
															</span>
														)}
													</Link>
												</BoxClickHead>

												{/* {
										cart.messages && cart.messages.couponMsg && <Tip>
											<span dangerouslySetInnerHTML={{ __html: cart.messages.couponMsg }} />
										</Tip>
									} */}






												<LineBox style={{ paddingLeft: 10, paddingRight: 10 }}>
													{
														<TurnTool ignoreButton={cart.expectedPoints <= 0} open={this.openPoints.bind(this)} turnAcitve={cart.openPointUse}>
															<span style={{ fontSize: 14, fontFamily:'SlatePro-Medium' }}>
																<FormattedMessage  id="credit_msg" values={{ credits: cart.expectedPoints, discount: <Red><Money money={cart.expectedPointDiscount || {amount:'0', unit: ''}} /></Red> }} />
															</span>
															<Ask style={{ marginLeft: 4 }} onClick={this.creditClickHandle.bind(this)} />
														</TurnTool>
													}
												</LineBox>
											</Box>


											{
												isprogresspage && (
													<Box innerRef={c => { this.$paylistdom = c }}>
														<BoxHead single title={intl.formatMessage({ id: 'payment_method' })} />
														<div style={{ paddingLeft: 10, paddingRight: 10, marginTop: -10 }}>
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
																initCashmethod={this.initCashmethod.bind(this)}
															/>
														</div>
													</Box>
												)
											}



											<Box>
												<BoxHead single title={intl.formatMessage({ id: 'order_summary' })} />
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

											{/* {
												this.state.alsolikes && this.state.alsolikes.length > 0 && <Box>
													<ALSOLIKES innerRef={this.alsoRef.bind(this)} data-source type="shopping_cart_match_with" data-column="shopping_cart_match_with" data-title="shoppingcart" data-type="shopping_cart_match_with" data-content="You Might Like to Fill it With" data-position="2">
														<div className="__hd">
															<FormattedMessage id="you_can_match_width" />
														</div>
														<div className="__bd">
															<SwiperNormalProducts onSelect={(vairant, product) => {
																this.setState({
																	viewingItem: {
																		productId: product.id,
																		variantId: vairant.id,
																		quantity: 1
																	},
																	viewing: true
																})
															}} products={this.state.alsolikes} />
														</div>
													</ALSOLIKES>

												</Box>
											} */}

											{
												this.state.recs && this.state.recs.length > 0 && <Box>
													<RECProducts recs={this.state.recs} onSelect={(vairant, product) => {
														this.setState({
															viewingItem: {
																productId: product.id,
																variantId: vairant.id,
																quantity: 1,
																type: 'shopping_cart_match_with'
															},
															viewing: true
														})
													}} />
												</Box>
											}


											<Box style={{ backgroundColor: '#f6f6f6', paddingTop: 15, paddingBottom: 15 }}>
												<div style={{ color: '#999', fontSize: 12 }}><FormattedMessage id="secure_payment" /></div>
												<img style={{ width: 140, marginTop: 10 }} src="https://image.geeko.ltd/upgrade/20210225/sp.png" />
											</Box>

											{
												isprogresspage ? (
													<Box>
														<div style={{ height: cart.messages && cart.messages.couponMsg ? 138 : 100, backgroundColor: '#f6f6f6' }}>

															{
																cart.canCheckout ? <Checkout>
																	<div className="__total">
																		<div>
																			<CheckBox style={{ verticalAlign: 'middle' }} onClick={(evt) => { this.itemAllSelect(!allSelected) }} className={allSelected ? 'selected' : ''} />
																			<span style={{ verticalAlign: 'middle', marginLeft: 7 }}><FormattedMessage id="all" /></span>
																		</div>
																		<div>
																			<span>{intl.formatMessage({ id: 'total' })}: </span>
																			<span style={{ fontSize: 18, fontFamily: 'AcuminPro-Bold' }}><Money money={cart.orderSummary.orderTotal} /></span>
																			{
																				this.props.payMethod === '22' && <Red style={{ fontWeight: 'normal', marginLeft: 5, fontSize: 14 }}>(Em até 3x s/ juros)</Red>
																			}
																		</div>

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
																		<div></div>
																		<div>
																			<span>{intl.formatMessage({ id: 'total' })}: </span>
																			<span style={{ fontSize: 18, fontFamily: 'AcuminPro-Bold' }}><Money money={cart.orderSummary.orderTotal} /></span>
																		</div>
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
															<div style={{ height: 138, backgroundColor: '#f6f6f6' }}>
																<Checkout>
																	<div className="__total">
																		<div></div>
																		<div>
																			<span>{intl.formatMessage({ id: 'total' })}: </span>
																			<span style={{ fontSize: 24, fontFamily: 'SlatePro-Medium' }}><Money money={cart.orderSummary.orderTotal} /></span>
																		</div>
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
															<div style={{ height: 138, backgroundColor: '#f6f6f6' }}>
															</div>


															{
																cart.canCheckout ? <Checkout>
																	<div className="__total">
																		<div></div>
																		<div>
																			<span>{intl.formatMessage({ id: 'total' })}: </span>
																			<span style={{ fontSize: 24, fontFamily: 'SlatePro-Medium' }}><Money money={cart.orderSummary.orderTotal} /></span>
																		</div>
																		{cart.paypalDiscountMessage && <DISCOUNTTIP dangerouslySetInnerHTML={{ __html: cart.paypalDiscountMessage }} />}

																	</div>



																	{
																		hasQuickPay ? <DoubleBtn className="x-flex __between">
																			<div>
																				<BigButton onClick={() => {
																					this.props.history.push(`${window.ctx || ''}${__route_root__}/address`)
																				}} className="__btn" height={47} bgColor="#222">
																					{intl.formatMessage({ id: 'check_out' })} ({totalCount})
																				</BigButton>
																			</div>
																			<div>
																				<PaypalBtn onClick={this.quickPaypal.bind(this)}><img src={cart.paypalButtonImage} /></PaypalBtn>
																			</div>
																		</DoubleBtn> : <div>
																			<BigButton onClick={() => {
																				this.setState({showGuest: true})
																			}} className="__btn" height={47} bgColor="#222">
																				{intl.formatMessage({ id: 'check_out' })} ({totalCount})
																			</BigButton>
																		</div>
																	}




																</Checkout> : <Checkout>
																	<div className="__total">
																		<div></div>
																		<div>
																			<span>{intl.formatMessage({ id: 'total' })}: </span>
																			<span style={{ fontSize: 24, fontFamily: 'SlatePro-Medium' }}><Money money={cart.orderSummary.orderTotal} /></span>
																		</div>
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
													<Mask onClick={() => { this.props.EDITED() }} />
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
														cvvRef={this.cvvRef.bind(this)}
														dlocalerror={this.state.dlocalerror}
													/>
												</React.Fragment>
											)
										}

										{
											this.state.showAsk && this.state.askMessage && (
												<React.Fragment>
													<Mask />
													<FixedMessage title={this.state.askTitle} onClose={() => { this.setState({ showAsk: false, askMessage: null, askTitle: '' }) }}>
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
												window.siteName
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

										{
											// (!this.state.couponBanner || !this.state.couponBanner.enable) &&
											cart.messages && cart.messages.couponMsg && <CouponAlert onClick={() => {
												this.props.history.push(`${window.ctx || ''}${__route_root__}/coupons`)
												this.couponClick()
											}} innerRef={c => this.couponAlert = c} coupon={cart.coupon} couponMsg={cart.messages ? cart.messages.couponMsg : null} />
										}


										{
											this.state.showFilterProducts && <FilterProducts couponProgress={cart.couponProgress} viewConfirm={this.viewConfirm.bind(this)} summary={cart.orderSummary} onClose={
												() => {
													this.setState({
														showFilterProducts: false
													})
												}
											} />
										}

										{
											this.state.showGuest && <React.Fragment>
												<MASK/>
												<GuestConfirm onCheckout={() => {
													this.setState({showGuest: false})
													this.props.history.push(`${window.ctx || ''}${__route_root__}/address`)
												}}  onLogin={()=>{
													window.location.href = `${window.ctx}/${
														/*global siteType b:true*/
														/*eslint no-undef: "error"*/
														siteType === 'new' ? 'page' : 'i'
													}/login?redirectUrl=${encodeURIComponent(window.location.href)}`
												}} onClose={() => {this.setState({showGuest:false})}}/>
											</React.Fragment>
										}




									</div>)
							))
						}
					</div>




				</ShoppingBody> : <ShoppingBody>
					<div className="__hd">
						<EditingHead>
							<span className="__title"><FormattedMessage id="shopping_bag" /></span>
							<span className="__done" onClick={evt => { this.setState({ managing: false }) }}>Done</span>
						</EditingHead>
					</div>
					<div className="__bd" style={{ paddingBottom: 60 }}>

						<Boxs style={{ backgroundColor: '#f6f6f6', padding: 8 }}>
							{
								hasOverseas && formatedData.overseasDelivery && <Box>
									<PromotionGroup
										group={formatedData.overseasDelivery}
										itemSelect={this.itemEditSelect}
										shippingMethod={cart.shippingMethod}
										serverTime={cart.serverTime}
										selectedItems={this.state.selectedItems}
										ignoreItemSelected
										isEditingItem
									/>
								</Box>
							}


							{
								hasLocalItems && formatedData.domesticDeliveryCases.map(domestic => (
									<Box key={domestic.countryCode}>
										<GroupLocalItems
											icon={domestic.icon}
											title={domestic.title}
											itemSelect={this.itemEditSelect}
											serverTime={cart.serverTime}
											domestic={domestic}
											items={domestic.shoppingCartProducts}
											selectedItems={this.state.selectedItems}
											isEditingItem
											ignoreItemSelected />
									</Box>
								))
							}

							{
								invalidItems && invalidItems.length > 0 && <Box>
									<GroupInvalidItems serverTime={cart.serverTime}
										items={this.getInvalidItems(cart)}
										itemSelect={this.itemEditSelect}
										selectedItems={this.state.selectedItems}
										ignoreItemSelected
										isEditingItem
									/>
								</Box>
							}
						</Boxs>


					</div>

					<div className="__fd">
						<div>
							<span style={{ display: 'inline-block' }}>
								<CheckBox style={{ verticalAlign: 'middle' }} onClick={(evt) => { this.allEditHandle(!this.state.editSelectAll) }} className={this.state.editSelectAll ? 'selected' : ''} />
								<span style={{ verticalAlign: 'middle', marginLeft: 7 }}><FormattedMessage id="all" /></span>
							</span>

						</div>
						<div>
							<EditButton onClick={this.addAllToWish.bind(this)}><FormattedMessage id="move_to_wish_list" /></EditButton>
							<EditButton onClick={this.deleteAllItems.bind(this)} style={{ marginLeft: 10 }}><FormattedMessage id="delete" /></EditButton>
						</div>
					</div>
				</ShoppingBody>
			}



			{
				this.state.confirm.open && <ConfirmAlter content={this.state.confirm.content} yesBack={this.state.confirm.yesBack} noBack={this.state.confirm.noBack} />
			}

			{
				this.state.viewing && (
					<React.Fragment>
						<Mask onClick={() => { this.setState({ viewing: false }) }} />
						<ProductEditor onClose={() => { this.setState({ viewing: false }) }}
							itemConfirmHandle={!!this.state.viewingItem && !!this.state.viewingItem.isGift ? this.giftConfirm : this.viewConfirm}
							btnMessage={<FormattedMessage id="addtocart" />}
							item={this.state.viewingItem} />
					</React.Fragment>
				)
			}

		</React.Fragment>
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ShoppingCart))
