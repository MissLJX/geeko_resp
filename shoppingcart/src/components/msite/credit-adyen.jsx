import React, {createRef, useEffect, useLayoutEffect, useState} from 'react'
import {
	openAdyenOrder,
	usecreditcard,
	checkout_credit,
	openSafeChargeOrder,
	setSafeCharge,
	alyen_check_out,
	adyen_3d_call_back
} from '../../api'
import {
	getCreditCards
} from '../../store/actions.js'
import styled from 'styled-components'
import TurnTool from './turn-tool.jsx'
import CheckBox from '../checkbox.jsx'
import { connect } from 'react-redux'
import Address from './address.jsx'
import Icon from '../icon.jsx'
import Skeleton from './credit-skeleton.jsx'
import { unitprice, __route_root__, storage } from '../../utils/utils'

import { FormattedMessage } from 'react-intl'
import { withRouter } from 'react-router-dom'
import Loading from './refreshing.jsx'

import AdyenCheckout from '@adyen/adyen-web'
import '@adyen/adyen-web/dist/adyen.css'
import {BigButton} from './buttons'


const INPUTCONTAINER = styled.div`
    display: flex;
    position: relative;
    display: flex;
    height: 40px;

    .icon-container:last-child {
        right: 0;
    }
    .icon-container.payment-method {
        right: 0;
    }

    &.card-number {
    }
    &.expiry-date {
        margin-right: 8px;
    }

    .card-number-frame,
    .expiry-date-frame,
    .cvv-frame {
        flex: 1 1 auto;
        padding-left: 40px;
    }
    
    .icon-container {
        position: absolute;
        top: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        width: 26px;
        margin: 0 7px;
    }
    
    .icon-container.payment-method {
        transform: translateY(-50%) rotateY(90deg);
        transition: opacity 0.15s ease-out;
        opacity: 0;
        top: 50%;
    }
    
    .icon-container.payment-method.show {
        opacity: 1;
        transition: all 0.4s ease-out;
        transform: translateY(-50%) rotateY(0deg);
    }
    
    .icon-container.payment-method img {
        width: 100%;
    }

    [id$="-error"] {
        display: none;
    }

    .frame {
        opacity: 0;
    }

    .frame--activated {
        opacity: 1;
    }
    
    .frame--activated.frame--focus {
      
    }
    
    .frame--activated.frame--invalid {
       
    }

`


const BOX = styled.div`
    background-color: #fff;
    padding-left: 12px;
    padding-right: 12px;
    & > .__hd{
        font-family: AcuminPro-Bold;
	    font-size: 14px;
        padding-top: 16px;
      
    }

    & > .__bd{

    }

    & > .__fd{
        height: 44px;
        border-top: 1px solid #e6e6e6;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

`

const SUMMARY = styled.div`
    .__line{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 22px;
    }
`

const CREDITIMAGE = styled.img`
  height: 30px;
`

const FORMBODY = styled.div`
  background-color: #fff;
  padding-left: 12px;
  padding-right: 12px;
  & > .row{
    border-top: solid 1px #e6e6e6;

    display: flex;

    & > div{
      width: 100%;
    }
    & > .col6{
      width: 50%;
      border-left:  solid 1px #e6e6e6;
      &:first-child{
        border-left: none;
      }
    }
  }

  iframe {
    /* This fixes a mobile Safari bug */
    height: 38px !important;
  }
`

const FIELD = styled.div`
  min-height: 69px;
  padding-top: 12px;
	padding-bottom: 2px;
  label{
    font-size: 12px;
    color: #666;
    display: block;
    text-transform: uppercase;
    position: relative;
    .badage{
      width: 14px;
      height: 14px;
      font-size: 12px;
      text-align: center;
      line-height: 12px;
      cursor: pointer;
      color: #999;
      border: 1px solid #999;
      border-radius: 50%;
      position: absolute;
      right: 0;
      top: 0;
      display: inline-block;
    }
  }

  .underline{
    color: rgba(230, 69, 69, 1);
    font-size: 12px;
  }
`

const BADAGE = styled.span`
		width: 14px;
		height: 14px;
		font-size: 12px;
		text-align: center;
		line-height: 12px;
		cursor: pointer;
		color: #999;
		border: 1px solid #999;
		border-radius: 50%;
		display: inline-block;
`

const ADDICON = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 18px;
  font-family: iconfont;
  color: #cacaca;
  border: 1px solid #cacaca;
  border-radius: 50%;
  font-weight: bold;
`



const SUBMITBTN = styled.button`
  height: 42px;
  background-color: #222222;
  border-radius: 2px;
  color: #fff;
  width: 100%;
  border: none;
  outline: none;
  font-family: AcuminPro-Bold;
  font-size: 16px;
  text-transform: uppercase;
`

const CARDTYPE = styled.div`
  width: 60px;
  height: 30px;
  background: no-repeat left center/49px;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  top: -2px;
`

const CVVCONFIRM = styled.span`
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

const CVVINPUT = styled.div`
	input{
		border: 1px solid #eee;
		height: 40px;
		width: 100%;
		outline: none;
		box-shadow: none;
		padding-left: 12px;
		-webkit-appearance: none;
		appearance: none;
		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			-webkit-appearance: none !important;
			margin: 0;
		}
	}
`

const CVVConfirm = props => {

	const { onConfirm, onClose, checkout } = props

	const [cvv, setCvv] = useState(undefined)
	const [error, setError] = useState(undefined)
	const [cvvComponent, setCvvComponent] = useState(undefined)
	const [cvvState, setCvvState] = useState(undefined)

	const ref = createRef()

	useLayoutEffect(() => {
		ref.current.classList.add('anim')
	}, [])

	const handleClose = () => {
		ref.current.classList.remove('anim')
		setTimeout(() => {
			props.onClose()
		} , 200)
	}

	const confirmHandle = () => {
		if(cvvState && cvvState.isValid && cvvState.data && cvvState.data.paymentMethod){
			onConfirm(cvvState.data.paymentMethod.encryptedSecurityCode)
		}
	}


	const handleOnChange = () => {}

	const cvvRef = c => {
		if(checkout){
			if(!cvvComponent){
				setCvvComponent(checkout.create('securedfields', {
					// Optional configuration
					type: 'card',
					brands: ['mc', 'visa', 'amex', 'bcmc', 'maestro'],
					styles: {
						error: {
							color: 'red'
						},
						validated: {
							color: 'green'
						},
						placeholder: {
							color: '#d8d8d8'
						}
					},
					onChange: function(state) {
						setCvvState(state)
					},
					onValid : function(state) {
					},
					onLoad: function() {},
					onConfigSuccess: function() {},
					onFieldValid : function() {},
					onBrand: function(state) {
					},
					onError: function(data) {
						setError(data.errorI18n)
					},
					onFocus: function() {},
					onBinValue: function(state) {

					}
				}).mount('#cvv-container'))
			}

		}


	}



	return <CVVCONFIRM innerRef={ref}>
		<div className="__hd">
			<span>CVC</span>
			<span onClick={handleClose} className={'__close'}>&#xe6af;</span>
		</div>
		<div style={{marginTop: 8}}>
			<div style={{display:'flex', alignItems: 'center'}}>
				<CVVINPUT style={{flex:1}}>
					<div style={{height: 35, border:'1px solid #eee', paddingLeft: 12}} id="cvv-container">
						<span ref={cvvRef} data-cse="encryptedSecurityCode"></span>
					</div>

					{
						error && <div style={{fontSize: 12, color:'rgba(230,69,69,1)', marginTop: 4}}>{error}</div>
					}

				</CVVINPUT>
				<BADAGE style={{marginLeft: 12}} className="badage" onClick={props.onAsk}>?</BADAGE>
			</div>
			<div style={{marginTop: 20}}>
				<BigButton onClick={confirmHandle}><FormattedMessage id="confirm"/></BigButton>
			</div>
		</div>
	</CVVCONFIRM>
}

const StyledCard = styled.div`
  height: 42px;
  cursor: pointer;
  padding-left:10px;
  padding-right:10px;
  background-color:#fff;
`
const Card = props => <StyledCard>
	<div onClick={() => { props.cardSelect(props.card) }} className="x-table __fixed __vm x-fw x-fh">
		<div className="x-cell">
			{props.card.style && props.card.style.imageURL && <CARDTYPE style={{ backgroundImage: `url(${props.card.style.imageURL})` }} />}
			<span>{props.card.quickpayRecord.cardNumber}</span>
		</div>
		<div className="x-cell __right" style={{ width: 30 }}>
			<CheckBox className={`${props.card.isSelected && !props.showNew ? 'selected' : ''}`} />
		</div>
	</div>
</StyledCard>

const MASK = styled.div`
  display: block;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, .4);
`

const ASKC = styled.div`
    position: fixed;
    width: 280px;
    border-radius: 12px;
    background-color: #fff;
    padding: 20px;
    z-index: 11;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .__image{
        width: 118px;
 
    }
    
    .__info{
        display: flex;
        align-items: center;
        margin-top: 12px;
    }


`



const FRAME = styled.div`
	background-color: #fff;
	position: fixed;
	left: 0;
	bottom: -2000px;
	transition: bottom 400ms;
	width: 100%;
	height: 100%;
	z-index: 10;
	& > .__hd{
		height: 40px;
	}
	
	& > .__bd{
		height: calc(100% - 40px);
		overflow: auto;
		-webkit-overflow-scrolling: touch;
		padding: 0 12px 50px 12px;
	}
	
	&.active{
		bottom: 0;
	}
	
`


const AskC = props => {
	return <ASKC>
		<Icon onClick={props.onClose} style={{ width: 30, height: 30, lineHeight: '30px', position: 'absolute', right: 0, top: 10, fontSize: 14, color: '#999' }}>&#xe6af;</Icon>
		<div style={{ textAlign: 'center', fontSize: 16, fontFamily: 'AcuminPro-Bold' }}>
			<FormattedMessage id="what_is_cvv" />?
		</div>
		<div>
			<div style={{ color: 'rgba(102, 102, 102, 1)', marginTop: 16 }}><FormattedMessage id="card_info_1" /></div>
			<div className="__info">
				<img className="__image" src="https://image.geeko.ltd/upgrade/20210715/JCB.png" />
				<div style={{ paddingLeft: 15, color: 'rgba(34, 34, 34, 1)' }}>
					<FormattedMessage id="card_info_2" />
				</div>
			</div>
			<div style={{ color: 'rgba(102, 102, 102, 1)', marginTop: 20 }}>For AMEXS only</div>
			<div className="__info">
				<img className="__image" src="https://image.geeko.ltd/upgrade/20210715/AMEXS.png" />
				<div style={{ paddingLeft: 15, color: 'rgba(34, 34, 34, 1)' }}>
					<FormattedMessage id="card_info_3" />
				</div>
			</div>
		</div>
	</ASKC>
}


const Credit = class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			order: null,
			saveForNext: true,
			showNew: false,
			selectedCardId: null,
			openResult: null,
			checking: false,
			loading: false,
			billingAddress: null,
			cardError: {},
			showAsk: false,
			safechargeresponse: 1,
			valid: false,
			formState: null,
			showCvv: false,
			showFrame: false
		}

		this.checkout = new AdyenCheckout({
			locale: window.locale,
			environment: window.adyenEnv,
			clientKey: window.__adyen_pk__,
			onChange: this.handleOnChange,
			onAdditionalDetails: this.handleOnAdditionalDetails.bind(this)
		})
	}

	componentDidMount() {
		this.initPage()
	}

	handleOnAdditionalDetails(state){
		const {order} = this.state

		this.setState({showFrame: false, checking: true})

		adyen_3d_call_back({transactionId: order.transactionId, details: state.data.details}).then(data => {
			const { result } = data
			const {transactionId, orderId, success, warnMsg, response} = result

			if(success){
				window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}?transactionId=${transactionId}`
			}else{
				if (window.isApp) {
					window.location.href = `${window.ctx || ''}/geekopay/app-fail?errMsg=${warnMsg}`
				}else{
					alert(warnMsg || 'Error')
				}
			}

			this.setState({checking: false})
		}).catch(data => {
			this.setState({checking: false})
			alert(data.result || data || 'Error')
		})
	}


	handleOnChange(state, component){
		// state.isValid // True or false. Specifies if all the information that the shopper provided is valid.
		// state.data // Provides the data that you need to pass in the `/payments` call.
		// component // Provides the active component instance that called this event.

		console.log(state)
	}



	initPage() {
		const { orderId } = this.props
		this.props.GETCREDITCARDS().then(cards => {
			if (!cards || cards.length < 1) {
				this.setState({
					showNew: true
				})
			}
		})

		openAdyenOrder(orderId).then(data => data.result).then(result => {

			const order = result.order
			let billingAddress

			if (order) {
				billingAddress = { ...(order.billingAddress || order.shippingDetail), transactionId: order.transactionId }
			}

			this.setState({
				order: order,
				billingAddress: billingAddress
			})
		})
	}



	submitHandle(e) {
		e.preventDefault()
		const self = this
		const { orderId, onPurchase } = this.props

		if (self.state.showNew) {
			if(this.state.formState && this.state.formState.isValid){
				self.setState({
					checking: true,
				})
				alyen_check_out({
					...this.state.formState.data,
					orderId
				}).then(data => {
					const result = data.result
					if(result){
						const {transactionId, orderId, success, warnMsg, response} = result
						if(success){
							window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}?transactionId=${transactionId}`
							self.setState({
								checking: false,
							})
						}else if(response){
							if(response.action){
								const { action } = response

								const threeDSConfiguration = {
									challengeWindowSize: '05'
								}

								this.checkout.createFromAction(action,threeDSConfiguration).mount('#frame-container')

								this.setState({
									showFrame: true
								})
							}else{
								if (window.isApp) {
									window.location.href = `${window.ctx || ''}/geekopay/app-fail?errMsg=${warnMsg}`
								}else{
									alert(warnMsg || 'Error')
								}
								self.setState({
									checking: false,
								})
							}
						}else{
							if (window.isApp) {
								window.location.href = `${window.ctx || ''}/geekopay/app-fail?errMsg=${warnMsg}`
							}else{
								alert(warnMsg || 'Error')
							}
							self.setState({
								checking: false,
							})
						}
					}


				}).catch(data => {
					self.setState({
						checking: false,
					})
					if(window.isApp){
						window.location.href = `${window.ctx || ''}/geekopay/app-fail?errMsg=${data.result || data}`
					}else{
						alert(data.result || data)
					}
				})

				onPurchase()
			}
		}else{
			const selectedCard = self.props.creditcards.find(card => card.isSelected)

			if(selectedCard && selectedCard.quickpayRecord.payMethod === '18'){
				this.paySafeCharge(selectedCard)
			}else{
				this.setState({showCvv: true})
			}

		}
	}



	paySafeCharge(selectedCard){
		const { orderId } = this.props
		const { billingAddress } = this.state
		const self = this
		self.setState({
			checking: true
		})
		openSafeChargeOrder(orderId).then(data => data.result).then(result => {
			const response = result.openOrderResponse

			self.sfc = SafeCharge({
				env: window.safechargeEnv || 'prod',
				merchantId: response.merchantId,
				merchantSiteId: response.merchantSiteId
			})

			self.sfc.createPayment({
				'sessionToken': response.sessionToken,
				'merchantId': response.merchantId,
				'merchantSiteId': response.merchantSiteId,
				'clientUniqueId': response.clientUniqueId, // optional
				'userTokenId': response.userTokenId,
				'paymentOption': {
					'userPaymentOptionId': selectedCard.quickpayRecord.quickpayId,
				},
				'billingAddress': {
					'email': result.email,
					'country': result.country
				},
				'deviceDetails': {
					'ipAddress': result.ip
				}
			}, function (res) {
				self.callBackSafeCharge({ ...res, sessionToken: response.sessionToken })
			})
		})
	}


	callBackSafeCharge(res) {
		const self = this
		const { orderId } = this.props

		if (res.result === 'APPROVED') {
			setSafeCharge({ ...res }).then(data => data.result).then(result => {
				window.location.href = `${window.ctx || ''}/order-confirm/${result.clientUniqueId}?transactionId=${result.clientUniqueId}`
			}).catch(data => {
				alert(data.result || data)
				self.setState({
					checking: false
				})
			})
		} else {
			if (window.isApp) {
				window.location.href = `${window.ctx || ''}/geekopay/app-fail?errMsg=${res.errorDescription || res.reason || 'Error'}`
			} else {
				alert(res.errorDescription || res.reason || 'Error')
				if (orderId && window.__is_login__) {
					this.props.onGo(`${window.ctx || ''}/checkout/${orderId}`)
					storage.add('temp-order', orderId, 1 * 60 * 60)
				}
			}
			self.setState({
				checking: false
			})
		}
	}


	addHandler() {
		this.setState({
			showNew: true,
		})
	}

	cardSelect(card) {
		this.setState({ loading: true })
		usecreditcard(card.quickpayRecord.id).then(() => {
			this.props.GETCREDITCARDS().then(() => {
				this.setState({
					showNew: false,
					loading: false
				})
			}).catch(() => {
				this.setState({ loading: false })
			})
		}).catch(() => {
			this.setState({ loading: false })
		})
	}

	formRef(c){
		var self = this

		if(!this.customCard){
			this.customCard = this.checkout.create('securedfields', {
				// Optional configuration
				type: 'card',
				brands: ['mc', 'visa', 'amex', 'bcmc', 'maestro'],
				styles: {
					error: {
						color: 'red'
					},
					validated: {
						color: 'green'
					},
					placeholder: {
						color: '#d8d8d8'
					}
				},
				onChange: function(state) {
					self.setState({
						formState: state
					})

				},
				onValid : function(state) {
					self.setState({
						cardError: {
						}
					})
				},
				onLoad: function() {},
				onConfigSuccess: function() {},
				onFieldValid : function() {},
				onBrand: function(state) {
				},
				onError: function(data) {
					self.setState({
						cardError: {
							...self.state.cardError,
							[data.fieldType]: data.errorI18n
						}
					})
				},
				onFocus: function() {},
				onBinValue: function(state) {

				}
			}).mount('#customCard-container')
		}



	}

	cvvRef(){

	}

	onCvvHandle(cvv){
		this.cvvQuickPay(cvv)
	}

	cvvQuickPay(cvv){
		const { orderId } = this.props
		const self = this
		self.setState({
			checking: true
		})
		checkout_credit({orderId, cvv}).then(data => {
			this.successHandle(data)
			self.setState({
				checking: false
			})
		}).catch(data => {
			this.errorHandle(data)
			self.setState({
				checking: false
			})
		})
	}


	errorHandle(data){
		const {orderId} = this.props
		if (window.isApp) {
			window.location.href = `${window.ctx || ''}/geekopay/app-fail?errMsg=${data.result || data || 'Error'}`
		} else {
			alert(data.result || data)
			if (orderId && window.__is_login__) {
				this.props.onGo(`${window.ctx || ''}/checkout/${orderId}`)
				storage.add('temp-order', orderId, 1 * 60 * 60)
			}
		}
	}


	successHandle(data){
		const result = data.result
		const {orderId} = this.props
		const {response, details} = result

		if(result.success){
			window.location.href = `${window.ctx || ''}/order-confirm/${result.transactionId}?transactionId=${result.transactionId}`
		}else if(response){
			if(response.action){
				const { action } = response

				const threeDSConfiguration = {
					challengeWindowSize: '05'
				}

				this.checkout.createFromAction(action,threeDSConfiguration).mount('#frame-container')

				this.setState({
					showFrame: true
				})
			}else{
				if (window.isApp) {
					window.location.href = `${window.ctx || ''}/geekopay/app-fail?errMsg=${details}`
				}else{
					alert(details || 'Error')
				}
				self.setState({
					checking: false,
				})
			}
		}else{
			if (window.isApp) {
				window.location.href = `${window.ctx || ''}/geekopay/app-fail?errMsg=${result.details || 'Error'}`
			} else {
				alert(result.details || 'Error')
				if (orderId && window.__is_login__) {
					this.props.onGo(`${window.ctx || ''}/checkout/${orderId}`)
					storage.add('temp-order', orderId, 1 * 60 * 60)
				}
			}
		}
	}

	render() {
		const { creditcards: cards } = this.props
		const { billingAddress, order } = this.state

		return <div>
			{this.state.loading && <Loading />}
			{
				order ? <React.Fragment>
					<div style={{ height: 58, display: 'flex', alignItems: 'center', backgroundColor: '#fff', paddingLeft: 12, marginTop: 8 }}>
						<CREDITIMAGE src="https://image.geeko.ltd/upgrade/20210713/credit.jpg" />
					</div>

					<form id="payment-form" method="POST" action="/charge-card">

						{
							cards && cards.length > 0 && <div style={{ backgroundColor: '#fff', paddingTop: 16, borderTop: 'solid 1px #e6e6e6' }}>
								<div style={{ paddingLeft: 12 }}>
									<span style={{ fontFamily: 'AcuminPro-Bold' }}><FormattedMessage id="select_a_card"/></span>
								</div>
								<div>
									{
										cards.map(card => <Card showNew={this.state.showNew} key={card.quickpayRecord.id} cardSelect={this.cardSelect.bind(this)} card={card} />)
									}
								</div>
								{
									!this.state.showNew && <div style={{ paddingLeft: 12, paddingRight: 12 }}>
										<div onClick={this.addHandler.bind(this)} style={{ cursor: 'pointer', height: 47, lineHeight: '47px', borderTop: '1px solid #e6e6e6' }}>
											<ADDICON>&#xe72f;</ADDICON>{'  '}<span><FormattedMessage id="use_new_card" /></span>
										</div>
									</div>
								}

							</div>
						}


						<FORMBODY style={{ display: this.state.showNew ? 'block' : 'none' }} id="customCard-container" innerRef={this.formRef.bind(this)}>
							<div className="row">
								<div>
									{
										cards && cards.length > 0 && <div style={{ paddingTop: 16 }}>
											<FormattedMessage id="use_new_card" />
										</div>
									}
									<FIELD className="field">
										<label htmlFor="card-number" data-tid="scwsdk.form.card_number_label">
                                            *<FormattedMessage id="card_number" />
										</label>
										<INPUTCONTAINER className="card-number">
											<span data-cse="encryptedCardNumber"></span>
										</INPUTCONTAINER>
										<div className="underline">
											{
												this.state.cardError.encryptedCardNumber
											}
										</div>
									</FIELD>
								</div>
							</div>

							<div className="row">
								<FIELD className="field col6">
									<label htmlFor="card-expiry" data-tid="scwsdk.form.card_expiry_label">
                                        *<FormattedMessage id="expiration_date" />
									</label>
									<INPUTCONTAINER className="input-container expiry-date">
										<span data-cse="encryptedExpiryDate"></span>
									</INPUTCONTAINER>
									<div className="underline">
										{
											this.state.cardError.encryptedExpiryDate
										}
									</div>

								</FIELD>
								<FIELD className="field col6" style={{ paddingLeft: 12 }}>
									<label htmlFor="card-cvc" data-tid="scwsdk.form.card_cvc_label">
                                        *CVV
										<span className="badage" onClick={() => { this.setState({ showAsk: true }) }}>?</span>
									</label>
									<INPUTCONTAINER className="input-container cvv">
										<span data-cse="encryptedSecurityCode"></span>
									</INPUTCONTAINER>
									<div className="underline">
										{
											this.state.cardError.encryptedSecurityCode
										}
									</div>
								</FIELD>
							</div>

							{/* <div className="row">
                                <TurnTool open={() => { this.setState({ saveForNext: !this.state.saveForNext }) }} turnAcitve={this.state.saveForNext}>
                                    <span style={{ fontSize: 14, color: '#666' }}>
                                        <FormattedMessage id="remember_this_card_for_future_use" />
                                    </span>
                                </TurnTool>
                            </div> */}
						</FORMBODY>

						<FRAME className={this.state.showFrame ? 'active': ''} >
							<div className="__hd">
								<Icon onClick={() => {this.setState({showFrame: false})}} style={{fontSize: 20, cursor: 'pointer', color: '#999', display: 'inline-block', width: 25, position: 'absolute', right: 12, top: 12}}>&#xe6af;</Icon>
							</div>
							<div className="__bd">
								<div id="frame-container"></div>
							</div>
						</FRAME>

						{billingAddress && <BOX style={{ marginTop: 8 }}>
							<div className="__hd">
								<FormattedMessage id="billing_address" />
							</div>
							<div className="__bd" style={{ marginTop: 3, paddingBottom: 5 }}>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
									<Address address={billingAddress} />
									<Icon onClick={() => {
										this.props.history.push(`${this.props.match.url}/billing-address`, { address: billingAddress, orderId: order.id, payMethod: order.payMethod })
									}} style={{ fontSize: 16, color: '#666' }}>&#xe690;</Icon>
								</div>
							</div>
						</BOX>}

						<BOX style={{ marginTop: 8 }}>
							<div className="__hd">
								<FormattedMessage id="order_summary" />
							</div>
							<SUMMARY className="__bd" style={{ marginTop: 8, paddingBottom: 12 }}>
								<div className="__line">
									<span><FormattedMessage id="order_no" /></span>
									<span>{order.id}</span>
								</div>
								<div className="__line">
									<span><FormattedMessage id="item_total" /></span>
									<span>{unitprice(order.paymentItemTotal)}</span>
								</div>

								<div className="__line">
									<span><FormattedMessage id="shipping_price" /></span>
									<span>{unitprice(order.shippingPrice)}</span>
								</div>

								{
									order.shippingInsurancePrice && order.shippingInsurancePrice.amount > 0 && <div className="__line">
										<span><FormattedMessage id="shipping_insurance" /></span>
										<span>{unitprice(order.shippingInsurancePrice)}</span>
									</div>
								}



							</SUMMARY>

							<div className="__fd">
								<span style={{ fontFamily: 'AcuminPro-Bold' }}><FormattedMessage id="order_total" /></span>
								<span style={{ fontFamily: 'AcuminPro-Bold', fontSize: 18 }}>{unitprice(order.orderTotal)}</span>
							</div>
						</BOX>

					</form>
					<div style={{ paddingLeft: 12, paddingRight: 12, marginTop: 26 }}>

						{
							this.state.checking ? <SUBMITBTN style={{ backgroundColor: '#999' }}>
								<FormattedMessage id="please_wait" />...
							</SUBMITBTN> : <SUBMITBTN onClick={this.submitHandle.bind(this)}><FormattedMessage id="pay_now" /></SUBMITBTN>
						}



					</div>

					<div style={{ textAlign: 'center', marginTop: 22 }}>
						<img style={{ width: 140 }} src="https://image.geeko.ltd/upgrade/20210225/sp.png" />
					</div>

					<div style={{ marginTop: 16, color: '#999', fontSize: 12, paddingLeft: 36, paddingRight: 36, paddingBottom: 50, lineHeight: '16px', textAlign: 'center' }}>
                        Your account details are fully protected and will not be revealed to any third party for any reasons.
					</div>




					{
						this.state.showAsk && <React.Fragment>
							<MASK onClick={() => { this.setState({ showAsk: false }) }} />
							<AskC onClose={() => { this.setState({ showAsk: false }) }} />
						</React.Fragment>
					}

					{
						this.state.showCvv && <React.Fragment>
							<MASK/>
							<CVVConfirm onConfirm={cvv => {
								this.setState({showCvv: false})
								this.onCvvHandle(cvv)
							}} checkout={this.checkout}  onClose={() => {this.setState({showCvv:false})}} onAsk={() => {this.setState({showAsk: true})}}/>
						</React.Fragment>
					}





				</React.Fragment> : <div>
					<div style={{ height: 58, display: 'flex', alignItems: 'center', backgroundColor: '#fff', paddingLeft: 12, marginTop: 8 }}>
						<CREDITIMAGE src="https://image.geeko.ltd/upgrade/20210713/credit.jpg" />
					</div>
					<BOX style={{ marginTop: 8 }}>
						<Skeleton />
					</BOX>
					<BOX style={{ marginTop: 8 }}>
						<Skeleton />
					</BOX>
					<BOX style={{ marginTop: 8 }}>
						<Skeleton />
					</BOX>
				</div>
			}





		</div>
	}
}


export default connect(state => {
	return {
		...state
	}
}, dispatch => {
	return {
		GETCREDITCARDS: () => {
			return dispatch(getCreditCards(['18', '89'], true))
		}
	}
})(withRouter(Credit))