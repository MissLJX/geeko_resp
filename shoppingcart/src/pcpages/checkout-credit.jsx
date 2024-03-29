import React from 'react'
import styled from 'styled-components'
import {injectIntl, FormattedMessage} from 'react-intl'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {__route_root__, storage} from '../utils/utils.js'
import Empty from '../components/pc/empty.jsx'

import OrderSummary from '../components/pc/order-summary.jsx'
import Confirm from '../components/pc/confirm.jsx'

import Loading from '../components/msite/loading.jsx'
import Refreshing from '../components/msite/refreshing.jsx'
import {Boxs, Box} from '../components/pc/layouts.jsx'
import {Modal} from '../components/pc/modal.jsx'

import {OrderAddress} from '../components/pc/address.jsx'
import Icon from '../components/icon.jsx'
import CardList from '../components/pc/card-list.jsx'

import { BigButton } from '../components/msite/buttons.jsx'

import MercadoBinding from '../components/pc/mercado-binding.jsx'
import AdyenBinding from '../components/pc/adyen-binding.jsx'

import {submit} from '../utils/common-pay.js'

import {
	checkout_getparams,
	checkout_pay,
	checkout_credit,
	usecreditcard,
	useMercadocard,
	removeMercadoCard,
	deletecreditcard,
	bindDLocal,
	mercadopay_order,
	getJwt,
	getLookup,
	oceanpay3d,
	openSafeChargeOrder,
	setSafeChargeStatus, adyen_3d_call_back
} from '../api'

import {
	setSecurityCode,
	setInstallments,
	setMercadoInstallments,
	fetchCheckout,
	getCreditCards,
	getMercadoCards,
	fetchMe,
	setDocument
} from '../store/actions.js'

const __Frame__ = {
	'17': {
		url: `${window.ctx || ''}/w-site/anon/oceanpay?payMethod=17`,
		height: 550
	},
	'3': {
		url: `${window.ctx || ''}/w-site/anon/oceanpay?payMethod=3`,
		height: 550
	},
	'24': {
		url: `${window.ctx || ''}/i/dlocal`,
		height: 550
	}

}

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

const CREDITBTN = styled.div`
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

const CREDITMODAL = styled.div`
		width: 860px;
		background-color: #fff;
		padding: 40px 20px;

		.__title{
			font-family: HelveticaNeue-Medium;
			font-size: 24px;
			color: #222;
		}

		.__frame{
			width: 100%;
			margin-top: 15px;
		}
		position: relative;
		.__loading{
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
`

const MERCADOMODAL = styled.div`
	width: 640px;
	background-color: #fff;
	padding: 60px 80px 60px 80px;

	.__title{
		font-family: HelveticaNeue-Medium;
		font-size: 24px;
		color: #222;
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
		GETCREDITCARDS: (payMethod, multi) => {
			return dispatch(getCreditCards(payMethod, multi))
		},
		GETMERCADOCARDS: () => {
			return dispatch(getMercadoCards())
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
		SETDOCUMENT: (document) => {
			return dispatch(setDocument(document))
		}
	}
}

const Credit = class extends React.Component {
	constructor (props) {
		super(props)

		const {checkout} = props

		let frameUrl = null, _frame = this.getFrame()
		if (checkout && checkout.payMethod && _frame) {
			frameUrl = _frame.url
		}

		this.state = {
			showFrame: false,
			frameUrl: frameUrl,
			frameLoading: true,
			showMercado: false,
			noCard: false,
			checking: false,
			refreshing: false,
			showDeleteConfirm: false,
			cardDelete: null,
			dlocalerror: null,
			frameSuffix: new Date().getTime(),
			cvvState: {},
			show3DFrame: false,
			adyenCheckout: null
		}

		this.handleInputChange = this.handleInputChange.bind(this)
		this.sdkResponseHandler = this.sdkResponseHandler.bind(this)

		this.processCallBack = this.processCallBack.bind(this)
		this.processErrorBack = this.processErrorBack.bind(this)
	}

	cvvRef(c) {
		this.cvvField = c
	}

	adyenCvvHandle(cvvState, adyenCheckout){
		this.setState({
			cvvState,
			adyenCheckout
		})
	}

	handleOnAdditionalDetails(state){
		const {checkout} = this.props
		this.setState({
			checking: true,
			show3DFrame:false
		})
		adyen_3d_call_back({transactionId: checkout.transactionId, details: state.data.details}).then(data => {
			const { result } = data
			const {transactionId, orderId, success, warnMsg, response} = result
			if(success){
				window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}?transactionId=${transactionId}`
			}else{
				alert(warnMsg || 'Error')
			}

			this.setState({
				checking: false
			})
		}).catch(data => {
			alert(data.result || data)
			this.setState({
				checking: false
			})
		})
	}

	componentWillMount () {
		const { checkout, GETCREDITCARDS, GETMERCADOCARDS, cpf, installments } = this.props
		const { orderId } = this.props.match.params
		if (!checkout) {
			this.props.GETME().then(({document}) => this.props.SETDOCUMENT(document))
			this.props.GETCHECKOUT(orderId).then(() => {
				this.handleCreditCards()
			})
		} else {
			this.handleCreditCards()
		}

		window.dLocalPay = (result, errBack) => {
			this.payNewCard({...result, payMethod: this.props.checkout.payMethod, orderId: this.props.checkout.orderId}).catch(({result}) => errBack(result))
		}

		window.bindDLocal = (result, callBack , errBack) => {
			this.bindDLocal(result).then(callBack).catch(({ result }) => errBack(result))
		}

		window.triggerPlace = () => {
			this.payCredit({payCpf: cpf, payInstallments: installments, orderId: this.props.checkout.orderId})
		}

		window.triggerFalse = (errcode) => {
			this.refreshFrame()
		}

		setTimeout(() => {
			this.setState({
				frameLoading: false
			})
		}, 5000)
	}

	refreshFrame(){
		this.setState({
			frameSuffix: new Date().getTime(),
			checking: false
		})
	}

	bindDLocal(result){
		return bindDLocal({ ...result, payMethod: this.props.checkout.payMethod })
	}

	handleInputChange (event) {
		const target = event.target
		const value = target.type === 'checkbox' ? target.checked : target.value
		const name = target.name
		switch (name) {
		case 'securityCode':
			this.props.SETSECURITYCODE(value)
			break
		case 'mercado-installments':
			this.props.SETMERCADOINTALLMENTS(value)
			break
		case 'installments':
			this.props.SETINSTALLMENTS(value)
			break
		case 'document':
			this.props.SETDOCUMENT(value)
			break
		default:
			break
		}
	}

	mercadoref (c) {
		this.mercadoform = c
	}

	checkmercado (event) {
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

	sdkResponseHandler (status, response) {
		const { checkout } = this.props
		if (status != 200 && status != 201) {
			alert('verify filled data')
		} else {
			this.setState({
				token: response.id
			})

			this.payMercado({
				orderId: checkout.orderId,
				token: response.id,
				installments: this.props.mercadoinstallments
			}).then(() => {
				this.setState({
					checking: false
				})
			}).catch(({result}) => {
				alert(result)
				this.setState({
					checking: false
				})
			})
		}
	}

	getApacPay (payMethod, cpf, fail) {
		getApacPay({payMethod, cpfNumber: cpf}).then(({result}) => {
			const {isFree, transactionId} = result
			if (isFree) {
				window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
			} else {
				submit(result)
			}
		}).catch(({result}) => {
			fail(result)
		})
	}

	showFrameHandle () {
		const { checkout } = this.props
		const { payMethod, orderId } = checkout
		let _frame = this.getFrame()
		if (payMethod === '18' || payMethod === '22') {
			this.setState({
				checking: true
			})

			this.checkparams({
				orderId
			}).catch(({result}) => {
				this.setState({
					checking: false
				})
				alert(result)
			})
		} else {
			this.setState({
				frameLoading: !this.state.showFrame,
				showFrame: !this.state.showFrame,
				frameUrl: _frame.url
			})

			setTimeout(() => {
				this.setState({
					frameLoading: false
				})
			}, 5000)
		}
	}

	frameLoadHandle () {
		this.setState({
			frameLoading: false
		})
	}

	showMercadoHandle () {
		this.setState({
			showMercado: !this.state.showMercado
		})
	}

	showAdyenHandle(){
		this.setState({
			showAdyen: !this.state.showAdyen
		})
	}

	checkout (evt) {
		const {checkout, installments, document} = this.props
		if (checkout.payMethod === '19') {
			this.checkmercado(evt)
		}  else if (checkout.payMethod === '24' || checkout.payMethod === '26' || checkout.payMethod === '32' || checkout.payMethod === '33' || checkout.payMethod === '36' || checkout.payMethod === '39' || checkout.payMethod === '42') {
		
			if(checkout.payMethod !== '24'){
				this.documentRef.validateAll()
				if (this.documentBtn.context && this.documentBtn.context._errors && this.documentBtn.context._errors.length > 0) {
					return
				}
				if (!document) return
			}
			

			if(window.__dlocal){
				window.__dlocal.createToken(this.cvvField, {}).then(result => {
					this.payCredit({orderId: checkout.orderId, installments, document, token: result.token})
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

			
		}else if(checkout.payMethod === '18'){
			this.setState({
				checking: true
			})
			openSafeChargeOrder(checkout.orderId).then(data => data.result).then(result => {
				this.authenticate3d(result)
			}).catch(data => {
				alert(data.result)
				this.setState({
					checking: false
				})
			})
		} else if(checkout.payMethod === '89'){
			if(this.state.cvvState && this.state.cvvState.isValid){
				this.setState({
					checking: true
				})
				checkout_credit({orderId: checkout.orderId, cvv: this.state.cvvState.data.paymentMethod.encryptedSecurityCode}).then(data => {
					const result = data.result
					const {orderId} = checkout.orderId
					const {response, details} = result
					if(result.success){
						window.location.href = `${window.ctx || ''}/order-confirm/${result.transactionId}?transactionId=${result.transactionId}`
					}else if(response){
						if(response.action){
							const { action } = response
							const threeDSConfiguration = {
								challengeWindowSize: '05'
							}

							try {
								this.state.adyenCheckout.createFromAction(action,threeDSConfiguration).mount('#frame-container')
							}catch (e){
								console.error(e)
							}

							if(action.type !== 'redirect'){
								this.setState({
									show3DFrame: true
								})
							}


						}else{
							alert(details || 'Error')
							this.setState({
								checking: false,
							})
						}
					}else{
						alert(result.details || 'Error')
						this.setState({
							checking: false,
						})
					}
				}).catch(this.processErrorBack)
			}
		}else {
			this.payCredit({orderId: checkout.orderId, payInstallments: installments})
		}
	}

	authenticate3d(result){
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
				if(res.result === 'APPROVED'){
					window.location.href = `${window.ctx || ''}/order-confirm/${response.clientUniqueId}`
				}else{
					alert(res.errorDescription || res.reason || 'Error')
				}
				self.setState({
					checking: false
				})
			}).catch(data => {
				alert(data.result)
				self.setState({
					checking: false
				})
			})
		})
	}

	triggerOcean(){
		const { checkout } = this.props
		getJwt(checkout.orderId).then(({result}) => {
			const {jwt, bin} = result
			this.listenOcean3D(checkout.orderId, jwt, bin)
		}).catch(({result}) => {
			alert(result)
			this.setState({
				checking: false
			})
		})
	}

	listenOcean3D(orderId, jwt, bin){

		var self = this

		

		/*global Cardinal b:true*/
		/*eslint no-undef: "error"*/
		Cardinal.setup('init', {
			jwt: jwt
		})

		Cardinal.trigger('bin.process', bin)

		Cardinal.off('payments.setupComplete')
		Cardinal.off('payments.validated')

		Cardinal.on('payments.setupComplete', function(setupCompleteData) {
			const referenceId = setupCompleteData.sessionId
			getLookup(referenceId, orderId).then(({result: lookup}) => {
				if(lookup && lookup.lookupUrl){
					Cardinal.continue('cca', {
						'AcsUrl': lookup.lookupUrl,
						'Payload': lookup.lookupLoad
					},{
						'OrderDetails': {
							'TransactionId': lookup.transactionId
						}
					},
					jwt
					)
				}else{
					self.payOcean3D(orderId)
				}
			}).catch(({result}) => {
				alert(result)
				this.setState({
					checking: false
				})
			})


		})
		
		Cardinal.on('payments.validated', function(data, jwt) {
			var cavv = data.Payment.ExtendedData.CAVV
			var eci = data.Payment.ExtendedData.ECIFlag
			var xid = data.Payment.ProcessorTransactionId
			// var status = data.Payment.ExtendedData.PAResStatus
			// var transactionId = data.Payment.ProcessorTransactionId
			
			//请求支付
			self.payOcean3D(orderId, eci, cavv, xid)

		})
	}

	payOcean3D(orderId, eci, cavv, xid){
		oceanpay3d({orderId, cardEci: eci, cardCavv: cavv, cardXid:xid}).then(data => data.result).then(this.processCallBack).catch(this.processErrorBack)
	}

	payCredit (params) {
		this.setState({
			checking: true
		})

		// const { isTriggle } = params
		// const {checkout, creditcards} = this.props

		// let card
		// if(creditcards && creditcards.length > 0){
		// 	card = creditcards.find( c => c.quickpayRecord.isSelected )
		// }

		// if((isTriggle && checkout.payMethod === '3') || (card && card.quickpayRecord.payMethod === '3')){
		// 	this.triggerOcean()
		// }else{
		checkout_credit(params).then(data => data.result).then(this.processCallBack).catch(this.processErrorBack)
		// }

		
	}

	payNewCard (params) {
		this.setState({
			checking: true
		})
		checkout_pay(params).then(data => data.result).then(this.processCallBack).catch(this.processErrorBack)
	}

	processCallBack({success, transactionId, details, solutions = ''}){
		if (success) {
			window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
		} else {
			alert(details + '\n' + solutions)
			this.refreshFrame()
		}
	}

	processErrorBack({result}){
		alert(result)
		this.refreshFrame()
	}

	addcardback () {}

	handleCreditCards () {
		const { checkout, GETCREDITCARDS, GETMERCADOCARDS } = this.props
		const { payMethod } = checkout

		const getCards = payMethod === '19' ? GETMERCADOCARDS : GETCREDITCARDS

		return getCards(payMethod).then(cards => {
			switch (payMethod) {
			case '18':
			case '22':
				if (!cards || !cards.length) {
					this.props.history.replace(`${window.ctx || ''}/checkout/${this.props.checkout.orderId}`)
				}
				return cards
			default:
				if (!cards || !cards.length) {
					this.setState({
						noCard: true
					})
				}
				return cards
			}
		})
	}

	deleteCardHandle (evt, card) {
		evt.preventDefault()
		evt.nativeEvent.stopImmediatePropagation()
		const deletor = card.quickpayRecord.payMethod === '19' ? removeMercadoCard : deletecreditcard
		const cardId = card.quickpayRecord.payMethod === '19' ? card.quickpayRecord.quickpayId : card.quickpayRecord.id
		this.setState({
			showDeleteConfirm: true,
			cardDelete: () => {
				this.setState({
					showDeleteConfirm: false,
					refreshing: true
				})

				deletor(cardId).then(() => {
					this.handleCreditCards().then((cards) => {
						this.setState({
							refreshing: false
						})
					})
				})
			}
		})
	}

	selectCardHandle (evt, card) {
		this.setState({
			refreshing: true
		})
		const useor = card.quickpayRecord.payMethod === '19' ? useMercadocard : usecreditcard
		const cardId = card.quickpayRecord.payMethod === '19' ? card.quickpayRecord.quickpayId : card.quickpayRecord.id

		useor(cardId).then(() => {
			this.handleCreditCards().then(() => {
				this.setState({
					refreshing: false
				})
			})
		})
	}

	checkpay (params) {
		return checkout_pay(params).then(({result}) => {
			const {transactionId, success, details} = result
			if (success) {
				window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
			} else {
				alert(details)
			}
			return result
		})
	}

	checkparams (params) {
		return checkout_getparams(params).then(({result}) => {
			const {isFree, transactionId} = result
			if (isFree) {
				window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
			} else {
				submit(result)
			}
		})
	}

	payMercado (params) {

		const { orderId } = this.props.checkout
		return mercadopay_order({
			orderId,
			...params
		}).then(({result}) => {
			const {transactionId, success, details} = result
			if (success) {
				window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
			} else {
				alert(details)
			}
			return result
		})
	}

	payAdyen(params){
		console.log(params)
	}

	getFrame () {
		const { checkout, document } = this.props

		if (checkout) {
			const { payMethod, orderTotal, shippingDetail, payMethods } = checkout

			const payMethodInfo = payMethods.find(p => p.id === payMethod)

			let _paymethod
			if (payMethodInfo) {
				if (payMethodInfo.type === '12') {
					_paymethod = '24'
				} else {
					_paymethod = payMethodInfo.id
				}
			} else {
				_paymethod = payMethod
			}

			let __frame = __Frame__[_paymethod]

			let currency = orderTotal.currency
			let amount = orderTotal.amount
			let country = shippingDetail.country ? shippingDetail.country.value : window.__country

			if (_paymethod === '24') {
				return {...__frame, url: `${__frame.url}?currency=${currency}&country=${country}&amount=${amount}&document=${document || ''}`}
			} else {
				return __frame
			}
		}
	}

	addNewCard(){
		const { checkout } = this.props
		const { payMethod } = checkout

		if(payMethod === '89'){
			this.showAdyenHandle()
		}else if(payMethod === '19'){
			this.showMercadoHandle()
		} else{
			this.showFrameHandle()
		}
	}

	render () {
		// alert('fuck')
		const { intl, checkout, creditcards, mercadocards} = this.props
		var _frame = this.getFrame() || {}

		let cards, payMethod, country
		if (checkout) {
			payMethod = checkout.payMethod
			cards = payMethod === '19' ? mercadocards : creditcards
			country = checkout.shippingDetail && checkout.shippingDetail.country ? checkout.shippingDetail.country.value : window.__country
		}

		return <div>
			{
				checkout && <div>
					{(this.props.refreshing || this.state.refreshing) && <Refreshing/>}
					<SHOPPINGBODY>
						<div className="__left">
							<div>
								<Link to={`${window.ctx || ''}/checkout/${checkout.orderId}`} style={{textDecoration: 'none', color: '#222'}}>
									◀ {intl.formatMessage({id: 'back_to_cart'})}
								</Link>
								<div style={{marginTop: 10}}>
									<OrderAddress address={checkout.shippingDetail}/>
								</div>
								<div style={{marginTop: 50}}>
									<div style={{borderBottom: 'solid 1px #e6e6e6', paddingBottom: 10}}>
										<div style={{fontFamily: 'HelveticaNeue-Medium', fontSize: 18}}>
											{intl.formatMessage({id: 'card_information'})}
										</div>
										<div style={{marginTop: 5}}>
											<Icon style={{fontSize: 20, marginRight: 5, verticalAlign: 'middle', color: '#57b936'}}>&#xe745;</Icon>
											<span style={{verticalAlign: 'middle'}}>{intl.formatMessage({id: 'guarantee'})}</span>
										</div>
									</div>
									{
										this.state.noCard ? <div>


											{
												payMethod === '89' && <div style={{width: 500, paddingTop: 10}}>
													<AdyenBinding orderTotal={checkout.orderTotal} checkout={checkout} pay={this.payAdyen.bind(this)} email={this.props.me ? this.props.me.email : ''}/>
												</div>
											}

											{
												payMethod === '19' && <div style={{width: 500, paddingTop: 10}}>
													<img style={{display: 'block', marginBottom: 10}} src="https://image.geeko.ltd/shoppingcart/maxicocard.png"/>
													<MercadoBinding orderId={checkout.orderId} orderTotal={checkout.orderTotal} pay={this.payMercado.bind(this)} email={this.props.me ? this.props.me.email : ''}/>
												</div>
											}

											{
												payMethod !== '89' && payMethod !== '19' && <div style={{position: 'relative'}}>
													{
														this.state.frameLoading && <div style={{textAlign: 'center', paddingTop: 40}} className="__loading">
															<img alt="loading" src="https://image.geeko.ltd/site/upgrade/20180316/loading.gif"/>
														</div>
													}
													<iframe onLoad={ this.frameLoadHandle.bind(this) } style={{height: _frame.height, width: '100%'}} src={`${_frame.url}&_=${this.state.frameSuffix}`}/>
												</div>
											}

										</div> : <div>
											<CardList cards={ cards }
												orderTotal={checkout.orderTotal}
												installments={this.props.mercadoinstallments}
												securityCode = {this.props.securityCode}
												mercadoref = {this.mercadoref.bind(this)}
												handleInputChange = { this.handleInputChange }
												deleteCardHandle = { this.deleteCardHandle.bind(this) }
												selectCardHandle = { this.selectCardHandle.bind(this) }
												country = {country}
												document={this.props.document}
												documentRef={c => this.documentRef = c}
												documentBtn={c => this.documentBtn = c}
												cvvRef = { this.cvvRef.bind(this) }
												dlocalerror = {this.state.dlocalerror}
												adyenCvvHandle={ this.adyenCvvHandle.bind(this) }
												handleOnAdditionalDetails = {this.handleOnAdditionalDetails.bind(this)}
											/>

											{ this.state.checking ? <CREDITBTN style={{marginTop: 15}}>{intl.formatMessage({id: 'please_wait'})}...</CREDITBTN> : <CREDITBTN style={{marginTop: 15}} onClick={ this.addNewCard.bind(this) }>+ <FormattedMessage id="use_new_card" /></CREDITBTN>}

											<div style={{borderTop: 'solid 1px #e6e6e6', marginTop: 20, paddingTop: 40}}>

												{
													this.state.checking ? <BigButton bgColor="#999" style={{width: 314, height: 45, lineHeight: '45px'}}>
														{intl.formatMessage({id: 'please_wait'})}...
													</BigButton> : <BigButton onClick={this.checkout.bind(this)} bgColor="#222" style={{width: 314, height: 45, lineHeight: '45px', textTransform: 'uppercase', fontSize: 18}}>
														{intl.formatMessage({id: 'pay_now'})}
													</BigButton>
												}

											</div>
										</div>
									}

								</div>
							</div>
						</div>
						<div className="__right">

							<Boxs>
								<Box title={intl.formatMessage({id: 'order_summary'})} style={{paddingTop: 40}}>
									<OrderSummary style={{marginTop: 20}} display={checkout.display}/>

									<div style={{borderTop: 'solid 1px #e6e6e6', marginTop: 25, paddingTop: 25}}>
										<div>{intl.formatMessage({id: 'additional_payment'})}</div>
										<div style={{textAlign: 'center', padding: '15px 0', marginTop: 10}}>
											<img src="https://image.geeko.ltd/upgrade/20180831/payment.jpg"/>
										</div>
									</div>
								</Box>
							</Boxs>

						</div>
					</SHOPPINGBODY>

					{
						this.state.showFrame && <Modal onClose={ this.showFrameHandle.bind(this) }>
							<CREDITMODAL>
								<div className="__title">{intl.formatMessage({id: 'use_new_card'})}</div>
								<iframe onLoad={ this.frameLoadHandle.bind(this) } style={{height: _frame.height}} className="__frame" src={`${_frame.url}&_=${this.state.frameSuffix}`}/>

								{
									this.state.frameLoading && <div className="__loading">
										<img alt="loading" src="https://image.geeko.ltd/site/upgrade/20180316/loading.gif"/>
									</div>
								}
							</CREDITMODAL>
						</Modal>
					}

					{
						this.state.showMercado && <Modal onClose={ this.showMercadoHandle.bind(this) }>
							<MERCADOMODAL>
								<div className="__title">Tarjeta de crédito o débito</div>
								<div style={{marginTop: 20, marginBottom: 15}}>
									<img src="https://image.geeko.ltd/shoppingcart/maxicocard.png"/>
								</div>
								<div>
									<MercadoBinding orderTotal={checkout.orderTotal} pay={this.payMercado.bind(this)} email={this.props.me ? this.props.me.email : ''}/>
								</div>
							</MERCADOMODAL>
						</Modal>
					}

					{
						this.state.showAdyen && <Modal onClose={ this.showAdyenHandle.bind(this) }>
							<MERCADOMODAL>
								<div className="__title"><FormattedMessage id="credit_card"/></div>

								<div style={{marginTop: 20, minHeight: 200}}>
									<AdyenBinding orderTotal={checkout.orderTotal} checkout={checkout} pay={this.payAdyen.bind(this)} email={this.props.me ? this.props.me.email : ''}/>
								</div>
							</MERCADOMODAL>
						</Modal>
					}

					{
						<div style={{display:`${this.state.show3DFrame?'block':'none' }`}}>
							<Modal onClose={ this.showAdyenHandle.bind(this) }>
								<MERCADOMODAL>
									<div className="__title"><FormattedMessage id="credit_card"/></div>
									<div style={{marginTop: 20, minHeight: 200}} id="frame-container">
									</div>
								</MERCADOMODAL>
							</Modal>
						</div>

					}

					{
						this.state.showDeleteConfirm && <Modal onClose={ () => { this.setState({showDeleteConfirm: false}) } }>
							<Confirm yes={ this.state.cardDelete } no={ () => { this.setState({showDeleteConfirm: false}) } }>
								<span>Are you sure to delete this card?</span>
							</Confirm>
						</Modal>
					}

				</div>

			}

		</div>
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Credit))
