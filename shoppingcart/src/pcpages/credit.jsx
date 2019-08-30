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

import {fetchAll, getCreditCards, getMercadoCards, setMercadoInstallments, setSecurityCode, setInstallments, setDocument} from '../store/actions.js'

import { BigButton } from '../components/msite/buttons.jsx'

import MercadoBinding from '../components/pc/mercado-binding.jsx'

import { payDLocal, 
	getSafeCharge, 
	creditpay, 
	getApacPay, 
	deletecreditcard, 
	usecreditcard, 
	removeMercadoCard, 
	useMercadocard, 
	mercadopay, 
	bindDLocal,
	placeorder,
	getJwt,
	getLookup,
	oceanpay3d } from '../api'

import {submit} from '../utils/common-pay.js'

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
		INIT: () => {
			return dispatch(fetchAll())
		},
		GETCREDITCARDS: (payMethod, multi) => {
			return dispatch(getCreditCards(payMethod, multi))
		},
		GETMERCADOCARDS: () => {
			return dispatch(getMercadoCards())
		},
		SETMERCADOINTALLMENTS: (installments) => {
			dispatch(setMercadoInstallments(installments))
		},
		SETINSTALLMENTS: (installments) => {
			dispatch(setInstallments(installments))
		},
		SETSECURITYCODE: (securityCode) => {
			dispatch(setSecurityCode(securityCode))
		},
		SETDOCUMENT: (document) => {
			return dispatch(setDocument(document))
		}
	}
}

const MercadoPago = class extends React.Component {
	constructor (props) {
		super(props)
	}

	render () {
		return <div></div>
	}
}

const Credit = class extends React.Component {
	constructor (props) {
		super(props)

		let _frame = this.getFrame()

		this.state = {
			showFrame: false,
			frameUrl: _frame ? _frame.url : '#',
			frameLoading: true,
			showMercado: false,
			noCard: false,
			checking: false,
			refreshing: false,
			showDeleteConfirm: false,
			cardDelete: null,
			dlocalerror: null,
			frameSuffix: new Date().getTime()
		}

		this.handleInputChange = this.handleInputChange.bind(this)
		this.sdkResponseHandler = this.sdkResponseHandler.bind(this)
		this.processCallBack = this.processCallBack.bind(this)
		this.processErrorBack = this.processErrorBack.bind(this)
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

	cvvRef(c) {
		this.cvvField = c
	}

	checkmercado (event) {
		event.preventDefault()
		this.setState({
			checking: true
		})
		/*global Mercadopago b:true*/
		/*eslint no-undef: "error"*/
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
		if (status != 200 && status != 201) {
			alert('verify filled data')
		} else {
			this.setState({
				token: response.id
			})

			mercadopay({
				token: response.id,
				installments: this.props.mercadoinstallments
			}).then(data => data.result).then(({success, transactionId, details, solutions, orderId}) => {
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
			const {isFree, transactionId, orderId} = result
			if (isFree) {
				window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
			} else {
				storage.add('temp-order', orderId, 1 * 60 * 60)
				submit(result)
			}
		}).catch(({result}) => {
			fail(result)
		})
	}

	showFrameHandle () {
		if (this.props.payMethod === '18') {
			this.setState({
				checking: true
			})
			getSafeCharge().then(({result}) => {
				const {isFree, transactionId, orderId} = result
				if (isFree) {
					window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
				} else {
					storage.add('temp-order', orderId, 1 * 60 * 60)
					submit(result)

					// window.location.href = `${payURL}?${qs.stringify(params, true)}`
				}
			}).catch(({result}) => {
				this.setState({
					checking: false
				})
				alert(result)
			})
		} else if (this.props.payMethod === '22') {
			this.setState({
				checking: true
			})
			this.getApacPay(this.props.payMethod, this.props.cpf, (result) => {
				alert(result)
				this.setState({
					checking: false
				})
			})
		} else {
			let _frame = this.getFrame()
			this.setState({
				frameLoading: !this.state.showFrame,
				showFrame: !this.state.showFrame,
				frameUrl: _frame ? _frame.url : '#'
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

	checkout (evt) {
		const {cpf, installments, cart, document} = this.props

		const { payMethod } = cart

		if (payMethod === '19') {
			this.checkmercado(evt)
		} else if (payMethod === '24' || payMethod === '26' || payMethod === '32' || payMethod === '33' || payMethod === '36' || payMethod === '39' || payMethod === '42') {

			if(payMethod !== '24'){
				this.documentRef.validateAll()
				if (this.documentBtn.context && this.documentBtn.context._errors && this.documentBtn.context._errors.length > 0) {
					return
				}

				if (!document) return
			}

			if(window.__dlocal){
				window.__dlocal.createToken(this.cvvField).then(result => {
					this.payCredit({installments, payMethod, document, token: result.token})
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


			
		} else {
			this.payCredit({payCpf: cpf, payInstallments: installments})
		}
	}

	triggerOcean(){
		placeorder().then(({result: payment}) => {
			if(payment){
				const {orderId} = payment
				getJwt(orderId).then(({result}) => {
					const {jwt, bin} = result
					this.listenOcean3D(orderId, jwt, bin)
				}).catch(({result}) => {
					alert(result)
					this.setState({
						checking: false
					})
				})
			}
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

	payDLocal (params) {
		this.setState({
			checking: true
		})
		payDLocal(params).then(data => data.result).then(this.processCallBack).catch(this.processErrorBack)
	}

	payCredit (params) {
		this.setState({
			checking: true
		})
		const { isTriggle } = params
		const {cart, creditcards} = this.props

		let card
		if(creditcards && creditcards.length > 0){
			card = creditcards.find( c => c.quickpayRecord.isSelected )
		}

		
		if((isTriggle && cart.payMethod === '3') || (card && card.quickpayRecord.payMethod === '3')){
			this.triggerOcean()
		}else{
			creditpay(params).then(data => data.result).then(this.processCallBack).catch(this.processErrorBack)
		}

		
	}

	processCallBack({success, transactionId, details, solutions = '', orderId}){
		if (success) {
			window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
		} else {
			alert(details + '\n' + solutions)
			this.refreshFrame()
			if (orderId) {
				this.props.history.push(`${window.ctx || ''}/checkout/${orderId}`)
			}
		}
		this.setState({
			checking: false
		})
	}

	processErrorBack({result}){
		alert(result)
		this.setState({
			checking: false
		})
		this.refreshFrame()
	}

	addcardback () {}

	refreshFrame(){
		this.setState({
			frameSuffix: new Date().getTime(),
			checking: false
		})
	}

	componentWillMount () {
		const { cart, INIT, payType, payMethod, GETCREDITCARDS, GETMERCADOCARDS, cpf, installments } = this.props
		if (!cart) {
			INIT().then((values) => {
				window.dLocalPay = (result, errBack) => {
					const _cart = values[0]
					this.payDLocal({...result, payMethod: _cart.payMethod}).catch(({result}) => errBack(result))
				}


				window.bindDLocal = (result, callBack , errBack) => {
					const _cart = values[0]
					this.bindDLocal({...result, payMethod: _cart.payMethod}).then(callBack).catch(({ result }) => errBack(result))
				}

				this.handleCreditCards()
			})
		} else {
			window.dLocalPay = (result, errBack) => {
				this.payDLocal({...result, payMethod: cart.payMethod}).catch(({result}) => errBack(result))
			}

			window.bindDLocal = (result, callBack , errBack) => {
				this.bindDLocal({...result, payMethod: cart.payMethod}).then(callBack).catch(({ result }) => errBack(result))
			}

			this.handleCreditCards()
		}

		window.triggerPlace = () => {
			this.payCredit({payCpf: cpf, payInstallments: installments, isTriggle: true})
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

	bindDLocal(result){
		return bindDLocal(result)
	}

	handleCreditCards () {
		const { payType, cart, GETCREDITCARDS, GETMERCADOCARDS } = this.props
		const { payMethod } = cart
		if (payMethod === '3' || payMethod === '18') {
			let payMethods = ['3', '18']
			return GETCREDITCARDS(payMethods, true).then(cards => {
				if (!cards || !cards.length) {
					if (payMethod === '18') {
						this.props.history.replace(`${window.ctx || ''}${__route_root__}/`)
					} else {
						this.setState({
							noCard: true
						})
					}
				}
				return cards
			})
		} else if (payMethod === '22') {
			let payMethods = ['17', '22']
			return GETCREDITCARDS(payMethods, true).then(cards => {
				if (!cards || !cards.length) {
					this.props.history.replace(`${window.ctx || ''}${__route_root__}/`)
				}
				return cards
			})
		} else if (payMethod === '19') {
			return GETMERCADOCARDS().then(cards => {
				if (!cards || !cards.length) {
					this.setState({
						noCard: true
					})
				}
				return cards
			})
		} else {
			return GETCREDITCARDS(payMethod).then(cards => {
				if (!cards || !cards.length) {
					this.setState({
						noCard: true
					})
				}
				return cards
			})
		}
	}

	deleteCardHandle (evt, card) {
		evt.preventDefault()
		evt.nativeEvent.stopImmediatePropagation()
		const deletor = card.quickpayRecord.payMethod === '19' ? removeMercadoCard : deletecreditcard
		const cardId = card.quickpayRecord.payMethod === '19' ? card.quickpayRecord.quickpayId : card.quickpayRecord.id
		const { cart } = this.props
		const { payMethod } = cart
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

	payMercado (params) {
		return mercadopay(params).then(data => data.result).then(({success, transactionId, orderId, details, solutions}) => {
			if (success) {
				window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
			} else {
				alert(details)
				if (orderId) {
					this.props.history.push(`${window.ctx || ''}/checkout/${orderId}`)
				}
			}
			return transactionId
		})
	}

	getFrame () {
		const { cart, document } = this.props

		if (cart) {
			const { payMethod, payMethodList } = cart
			const payMethodInfo = payMethodList.find(p => p.id === payMethod)

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
			let { orderSummary } = cart

			let currency = cart.orderSummary.orderTotal.currency
			let amount = cart.orderSummary.orderTotal.amount
			let country = cart.shippingDetail.country ? cart.shippingDetail.country.value : window.__country

			if (_paymethod === '24') {
				return {...__frame, url: `${__frame.url}?currency=${currency}&country=${country}&amount=${amount}&document=${document || ''}`}
			} else {
				return __frame
			}
		}
	}

	render () {
		const {cart, loading, empty, intl, payType, creditcards, mercadocards} = this.props

		const cards = payType === '7' ? mercadocards : creditcards

		const __Frame = this.getFrame()
		let country
		if (cart) {
			country = cart.shippingDetail && cart.shippingDetail.country ? cart.shippingDetail.country.value : window.__country
		}

		return loading ? <Loading/> : (empty ? <Empty/> : cart && <div>
			{(this.props.refreshing || this.state.refreshing) && <Refreshing/>}
			<SHOPPINGBODY>
				<div className="__left">
					<div>
						<Link to={`${window.ctx || ''}${__route_root__}/`} style={{textDecoration: 'none', color: '#222'}}>
							◀ {intl.formatMessage({id: 'back_to_cart'})}
						</Link>
						<div style={{marginTop: 10}}>
							<OrderAddress address={cart.shippingDetail}/>
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
										payType === '7' ? <div style={{width: 500, paddingTop: 10}}>
											<img style={{display: 'block', marginBottom: 10}} src="https://dgzfssf1la12s.cloudfront.net/shoppingcart/maxicocard.png"/>
											<MercadoBinding orderTotal={cart.orderSummary.orderTotal} pay={this.payMercado.bind(this)} email={this.props.me ? this.props.me.email : ''}/>
										</div> : <div style={{position: 'relative'}}>
											{
												this.state.frameLoading && <div style={{textAlign: 'center', paddingTop: 40}} className="__loading">
													<img alt="loading" src="https://dgzfssf1la12s.cloudfront.net/site/upgrade/20180316/loading.gif"/>
												</div>
											}
											<iframe onLoad={ this.frameLoadHandle.bind(this) } style={{height: __Frame.height, width: '100%'}} src={`${__Frame.url}&_=${this.state.frameSuffix}`}/>
										</div>

									}

								</div> : <div>
									<CardList cards={ cards }
										orderTotal={cart.orderSummary.orderTotal}
										installments={this.props.mercadoinstallments}
										securityCode = {this.props.securityCode}
										mercadoref = {this.mercadoref.bind(this)}
										handleInputChange = { this.handleInputChange }
										deleteCardHandle = { this.deleteCardHandle.bind(this) }
										selectCardHandle = { this.selectCardHandle.bind(this) }
										country={country}
										document={this.props.document}
										documentRef={c => this.documentRef = c}
										documentBtn={c => this.documentBtn = c}
										cvvRef = { this.cvvRef.bind(this) }
										dlocalerror = {this.state.dlocalerror}
									/>

									{ this.state.checking ? <CREDITBTN style={{marginTop: 15}}>{intl.formatMessage({id: 'please_wait'})}...</CREDITBTN> : <CREDITBTN style={{marginTop: 15}} onClick={ payType === '7' ? this.showMercadoHandle.bind(this) : this.showFrameHandle.bind(this) }>+ <FormattedMessage id="use_new_card" /></CREDITBTN>}

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
							<OrderSummary style={{marginTop: 20}} display={cart.orderSummary.display}/>

							<div style={{borderTop: 'solid 1px #e6e6e6', marginTop: 25, paddingTop: 25}}>
								<div>{intl.formatMessage({id: 'additional_payment'})}</div>
								<div style={{textAlign: 'center', padding: '15px 0', marginTop: 10}}>
									<img src="https://dgzfssf1la12s.cloudfront.net/upgrade/20180831/payment.jpg"/>
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
						<iframe onLoad={ this.frameLoadHandle.bind(this) } style={{height: __Frame.height}} className="__frame" src={`${__Frame.url}&_=${this.state.frameSuffix}`}/>

						{
							this.state.frameLoading && <div className="__loading">
								<img alt="loading" src="https://dgzfssf1la12s.cloudfront.net/site/upgrade/20180316/loading.gif"/>
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
							<img src="https://dgzfssf1la12s.cloudfront.net/shoppingcart/maxicocard.png"/>
						</div>
						<div>
							<MercadoBinding orderTotal={cart.orderSummary.orderTotal} pay={this.payMercado.bind(this)} email={this.props.me ? this.props.me.email : ''}/>
						</div>
					</MERCADOMODAL>
				</Modal>
			}

			{
				this.state.showDeleteConfirm && <Modal onClose={ () => { this.setState({showDeleteConfirm: false}) } }>
					<Confirm yes={ this.state.cardDelete } no={ () => { this.setState({showDeleteConfirm: false}) } }>
						<span>Are you sure to delete this card?</span>
					</Confirm>
				</Modal>
			}

		</div>)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Credit))
