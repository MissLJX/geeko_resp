import React from 'react'
import styled from 'styled-components'
import {injectIntl, FormattedMessage} from 'react-intl'
import {__route_root__, storage} from '../utils/utils.js'
import {Route} from 'react-router-dom'
import {submit} from '../utils/common-pay.js'
import { connect } from 'react-redux'
import Loadable from 'react-loadable'
import {Red} from '../components/text.jsx'

import Address from '../components/pc/address.jsx'
import {Boxs, Box} from '../components/pc/layouts.jsx'
import PayMethods from '../components/pc/pay-methods.jsx'

import ItemTableHead from '../components/pc/item-table-head.jsx'
import Item from '../components/pc/simple-item.jsx'

import OrderSummary from '../components/pc/order-summary.jsx'
import { BigButton } from '../components/msite/buttons.jsx'

import Loading from '../components/msite/loading.jsx'
import ShippingMethods from '../components/pc/shipping-methods.jsx'
 
import {
	checkout_updatepaymethod,
	checkout_getparams,
	checkout_pay,
	checkout_paypal,
	checkout_computop
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
	setCashout,
	setDocument
} from '../store/actions.js'


const CheckoutAddress = Loadable({
	loader: () => import(/* webpackChunkName: "component--check-address" */ './checkout-address.jsx'),
	loading: Loading
})


const getPayImage = country => {
	switch(country){
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

const FixedTop = styled.div`
	&.__fixed{
		position: fixed;
		top: 0;
		background-color: #fff;
		z-index: 5;
	}
`

const ItemUL = styled.div`
	& > li{
		border-top: 1px dashed #e5e5e5;
		&:first-child{
			border-top: none;
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
	constructor (props) {
		super(props)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.sdkResponseHandler = this.sdkResponseHandler.bind(this)
		this.scrollhandle = this.scrollhandle.bind(this)
		this.state = {
			refreshing: false,
			ticketMethods: [],
			atmMethods: [],
			paypaling: false,
			checking: false
		}
	}

	scrollhandle (evt) {
		if (this.fixedCart && this.fixedCartWrapper) {
			const {clientHeight} = this.fixedCart
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
			const {clientHeight} = this.fixedSummary
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

				if(clientHeight < window.innerHeight - 40){
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

	componentWillUnmount () {
		window.removeEventListener('scroll', this.scrollhandle, false)
		window.removeEventListener('resize', this.scrollhandle, false)
	}

	componentWillMount () {
		const { orderId } = this.props.match.params

		this.props.GETCHECKOUT(orderId).catch((error) => {
			if(error.result){
				alert(error.result)
			}else{
				alert(error)
			}
			
			window.location.href = `${window.ctx || ''}/me/m/order/detail/${orderId}`
		})
		this.props.GETPAYPAL()
		this.props.GETME().then( ({document}) => this.props.SETDOCUMENT(document))

		window.addEventListener('scroll', this.scrollhandle, false)
		window.addEventListener('resize', this.scrollhandle, false)

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

	handleInputChange (event) {
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

	selectPayHandle (paymethod) {
		const { orderId } = this.props.match.params
		checkout_updatepaymethod(orderId, paymethod.id).then(({result}) => {
			this.props.SETCHECKOUT(result)
		}).catch(({result}) => {
			alert(result)
		})
	}

	atmClickHandle (method) {
		this.props.SETATMMETHOD(method.id)
		storage.add('atmMethod', method.id, 365 * 24 * 60 * 60)
	}

	ticketClickHandle (method) {
		this.props.SETTICKETMETHOD(method.id)
		storage.add('ticketMethod', method.id, 365 * 24 * 60 * 60)
	}

	tcClickHandle(method) {
		const { payMethod } = this.props.checkout
		let _c = storage.get('cashoutMethod') || {}
		let cashoutMethod = {..._c, [payMethod]: method}
		this.props.SETCASHOUT(cashoutMethod)
		storage.add('cashoutMethod', cashoutMethod, 365 * 24 * 60 * 60)
	}

	getTcMethod() {
		const { payMethod } = this.props.checkout
		return (this.props.cashoutMethod || {})[payMethod]
	}

	initCashmethod(payMethod, method){
		let _c = storage.get('cashoutMethod') || {}

		if(!_c[payMethod]){
			let cashoutMethod = {..._c, [payMethod]: method.id}
			this.props.SETCASHOUT(cashoutMethod)
			storage.add('cashoutMethod', cashoutMethod, 365 * 24 * 60 * 60)
		}
		
	}

	paypalRender (c, method) {
		const self = this

		const { checkout } = self.props

		let locale = checkout && checkout.locale ? checkout.locale : 'en_US'

		if (c && (!c.children || c.children.length < 1)) {
			/*global paypal b:true*/
			/*eslint no-undef: "error"*/
			paypal.Button.render({
				env: window.paypalEnv,
				commit: window.__is_login__,
				locale: locale,
				payment: function () {
					return checkout_paypal({ orderId: checkout.orderId }).then(data => data.result).then(({TOKEN, success, transactionId, ACK, L_LONGMESSAGE0}) => {
						if (success && transactionId && !TOKEN) {
							window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
							throw new Error('free')
						}
						if (ACK === 'Failure') {
							throw new Error(L_LONGMESSAGE0)
						}
						return TOKEN
					}).catch((err) => {
						if (err.result) {
							throw new Error(err.result)
						} else {
							throw new Error(err)
						}
					})
				},
				onAuthorize: function (data, actions) {
					return actions.redirect()
				},

				onCancel: function (data, actions) {
					return actions.redirect()
				},

				onError: function (err) {
					var msg = err.stack
					if (msg.indexOf('free') >= 0) {
						console.log('free order')
					} else {
						alert(msg.substring(0, msg.indexOf('\n')))
					}
				},
				style: {
					label: window.__is_login__ ? 'pay' : 'checkout',
					shape: 'rect',
					size: 'responsive',
					tagline: false,
					layout: 'vertical' 
				},
				funding: {     
					allowed: [       
						paypal.FUNDING.BANCONTACT,       
						paypal.FUNDING.EPS,       
						paypal.FUNDING.GIROPAY,       
						paypal.FUNDING.IDEAL,       
						paypal.FUNDING.MYBANK,       
						paypal.FUNDING.SOFORT     
					]
				}	 
			}, '#ip-paypal-pay')
		}
	}

	checkparams(params){
		return checkout_getparams(params).then( ({result}) => {
			const {isFree, transactionId} = result
			if (isFree) {
				window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
			} else{
				submit(result)
			}
		} )
	}

	checkcomputop(params){
		return checkout_computop(params).then( ({result}) => {
			const {isFree, transactionId} = result
			if (isFree) {
				window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}`
			} else{

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
		} )
	}

	checkpay (params) {
		return checkout_pay(params).then(({result}) => {
			const {transactionId, success, details} = result
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

	checkout (event) {
		const { checkout, paypal } = this.props

		if (checkout) {
			const payMethod = checkout.payMethods.find(m => m.id === checkout.payMethod) || checkout.payMethods[0]
			const {orderId, shippingDetail} = checkout

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
				switch (payMethod.type) {
				case '1':
					this.setState({
						paypaling: true,
						checking: true
					})
					checkout_paypal({orderId}).then(data => data.result).then(({TOKEN, success, transactionId, ACK, L_LONGMESSAGE0}) => {
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
					}).catch(({result}) => {
						this.setState({
							paypaling: false,
							checking: false
						})
						alert(result)
					})
					break
				case '2':
					this.props.history.push(`${this.props.match.url}/credit`)
					break
				case '3':
					this.setState({
						checking: true
					})
					this.checkcomputop({orderId}).catch((data) => {
						this.setState({
							checking: false
						})
						if(data){
							alert(data.result)
						}
					})
					break
				case '5':
					this.setState({
						checking: true
					})
					this.checkparams({orderId}).catch(() => {
						this.setState({
							checking: false
						})
					})
					break
				case '6':
					break
				case '7':
					this.props.history.push(`${this.props.match.url}/credit`)
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
							this.props.history.push(`${this.props.match.url}/credit`)
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
					this.props.GETDLOCALCARDS(payMethod.id).then( cards => {
						this.props.history.push(`${this.props.match.url}/credit`)
					} )
					break
				case '13':
					this.checkpay({
						orderId,
						payMethod: payMethod.id,
						paymentMethodId: 'BL'
					}).catch(({result}) => {
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
						if(payMethod.type !== '14') {
							this.documentForm.validateAll()
							if(this.documentRef.context && this.documentRef.context._errors && this.documentRef.context._errors.length > 0){
								return
							}
						}
	
						const paymentMethodId = this.getTcMethod()
						const document = this.props.document
	
						if(!paymentMethodId){
							alert('Please select a pay method!')
							this.$paylistdom.scrollIntoView()
							return
						}
	
						if(this.props.document || payMethod.type === '14'){
							this.setState({
								checking: true
							})
							this.checkpay({
								orderId,
								payMethod: payMethod.id,
								paymentMethodId,
								document
							}).catch(({result}) => {
								alert(result)
								this.setState({
									checking: false
								})
							})
						}
					}
					
					break
				}
			}
		}
	}


	sdkResponseHandler (status, response) {
		const {orderId} = this.props.checkout
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
			}).catch(({result}) => {
				alert(result)
				this.setState({
					checking: false
				})
			})
		}
	}

	render () {
		const { checkout,  intl } = this.props




		let totalCount = 0

		let payMethod

		let country

		let tcMethod

		if (checkout) {
			let checkoutItems = checkout.checkoutItems
			payMethod = checkout.payMethods.find(p => p.id === checkout.payMethod) || checkout.payMethods[0]
			tcMethod = this.getTcMethod()
			if (checkoutItems) {
				totalCount = checkoutItems.map(c => c.quantity).reduce((prev, curr) => (prev + curr))
			}

			country = checkout.shippingDetail && checkout.shippingDetail.country ? checkout.shippingDetail.country.value : window.__country
		}

		return <div>
			{this.props.refreshing && <Refreshing/>}
			{
				checkout && <SHOPPINGBODY>
					<div className="__left">
						<Boxs>
							<Box title={intl.formatMessage({id: 'shipping_address'})}>
								<div className="x-table x-fw __fixed __vm" style={{paddingTop: 15}}>
									<div className="x-cell" style={{width: 362}}>
										<Address onEdit={ () => { this.props.history.push(`${this.props.match.url}/address`) } } address={checkout.shippingDetail}/>
									</div>
								</div>
							</Box>
							{
								checkout.shippingMethod && <Box title={intl.formatMessage({id: 'shipping_method'})}>
									<ShippingMethods ignoreCheck={true} shippingMethodList={ [checkout.shippingMethod] } selectedShippingMethod={ checkout.shippingMethod }/>
								</Box>
							}
						

						
							<div ref={ c => this.$paylistdom = c}>
								<Box title={intl.formatMessage({id: 'payment_method'})}>
									<div style={{paddingTop: 20}}>
										<PayMethods
											payMethodList={ checkout.payMethods }
											selectedPayId={ checkout.payMethod }
											selectPayHandle={this.selectPayHandle.bind(this)}
											ticketMethods={this.state.ticketMethods}
											atmClickHandle={this.atmClickHandle.bind(this)}
											ticketClickHandle={this.ticketClickHandle.bind(this)}
											atmMethod={this.props.atmMethod}
											ticketMethod={this.props.ticketMethod}
											atmMethods={this.state.atmMethods}
											handleInputChange={this.handleInputChange}
											installments={this.props.installments}
											orderTotal={checkout.orderTotal}
											paypalDiscountMessage={checkout.paypalDiscountMessage}
											showMercadopagoCouponField={checkout.showMercadopagoCouponField}
											boletoForm={(c) => this.boletoForm = c}
											boleto={(c) => { this.boleto = c }}
											apac={c => this.apac = c}
											apacBB={c => this.apacBB = c}
											brazilOceanForm={ c => this.brazilOceanForm = c }
											brazilOcean={ c => this.brazilOcean = c }

											tcClickHandle={this.tcClickHandle.bind(this)}
											tcMethod={tcMethod}

											documentForm = { c => this.documentForm = c}
											documentRef = { c => this.documentRef = c}
											document = { this.props.document }
											initCashmethod = {this.initCashmethod.bind(this)}
										/>
									</div>
								</Box>
							</div>

							<Box title={`${intl.formatMessage({id: 'shopping_bag'})} (${totalCount})`}>
								<div ref={c => this.fixedCartWrapper = c}>
									<FixedTop style={{width: 726}} innerRef={c => this.fixedCart = c}>
										<ItemTableHead/>
									</FixedTop>
								</div>
								<ItemUL>
									{
										checkout.checkoutItems && checkout.checkoutItems.map((item) => <li key={item.variantId}>
											<Item item={item} />
										</li>)
									}
								</ItemUL>
							</Box>

						</Boxs>
					</div>

					<div className="__right">
						<div ref={ c => this.fixedSummaryWrapper = c}>
							<FixedTop style={{paddingTop: 20, width: 314}} innerRef={c => this.fixedSummary = c}>
								<div ref={ c => this.fixedSmallWrapper = c }>
									<FixedTop style={{paddingTop: 40, width: 314}} innerRef={c => this.fixedSmall = c}>
										<Boxs>
											<Box title={intl.formatMessage({id: 'order_summary'})}>

												<OrderSummary style={{marginTop: 20}} display={checkout.display}/>
												{
													payMethod && payMethod.id === '22' && <div style={{marginTop: 5, textAlign: 'right'}}>
														<Red style={{fontWeight: 'normal', marginLeft: 5, fontSize: 14}}>(Em até 3x s/ juros)</Red>
													</div>
												}

												<div>
													{
														payMethod && payMethod.id === '1' ? <div id='ip-paypal-pay' style={{marginTop: 30}} ref={ (c) => this.paypalRender(c, 'normal') }/> : (!this.state.checking ? <BigButton onClick={this.checkout.bind(this)} bgColor="#222" style={{marginTop: 30, height: 45, lineHeight: '45px', textTransform: 'uppercase', fontSize: 18}}>
															{intl.formatMessage({id: 'check_out'})}
														</BigButton> : <BigButton bgColor="#999" style={{marginTop: 30, height: 45, lineHeight: '45px'}}>
															{intl.formatMessage({id: 'please_wait'})}...
														</BigButton>)
													}

												</div>

												<div style={{marginTop: 40}}>
													<div>
														{intl.formatMessage({id: 'we_accept'})}
													</div>
													<div style={{marginTop: 10}}>
														<img style={{width: '100%'}} src={getPayImage(country)}/>
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
			}
			<Route path={`${this.props.match.path}/address`}  component={CheckoutAddress}/>
		</div>
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Checkout))
