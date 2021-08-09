import React, { useEffect } from 'react'
import { openStripeOrder, usecreditcard, stripePay, stripeCallBack, checkout_credit } from '../../api'
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


import { loadStripe } from '@stripe/stripe-js'
import {
	CardNumberElement,
	CardCvcElement,
	CardExpiryElement,
	Elements,
	ElementsConsumer,
} from '@stripe/react-stripe-js'


const ELEMENT_OPTIONS = {
	style: {
		base: {
			fontSize: '12px',
			color: '#424770',
			'::placeholder': {
				color: '#aab7c4',
			},
		},
		invalid: {
			color: '#9e2146',
		},
	},
}


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
`

const FIELD = styled.div`
    min-height: 69px;
    padding-top: 12px;
    label{
        font-size: 12px;
        color: #666;
        margin-bottom: 11px;
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
			saveForNext: true,
			showNew: false,
			selectedCardId: null,
			openResult: null,
			checking: false,
			loading: false,
			billingAddress: null,
			cardError: {},
			showAsk: false,
			safechargeresponse: 1
		}
	}

	static getDerivedStateFromProps(props, state) {
		if (props.safechargeresponse != state.safechargeresponse) {
			return { ...state, safechargeresponse: props.safechargeresponse }
		}
		return null
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.safechargeresponse != this.state.safechargeresponse) {
			console.log(this.state.safechargeresponse)
			this.initPage()
		}
	}

	componentDidMount() {
		this.initPage()
	}


	initPage() {
		const { orderId } = this.props
		this.props.GETCREDITCARDS('18').then(cards => {
			if (!cards || cards.length < 1) {
				this.setState({
					showNew: true
				})
			}
		})
		openStripeOrder(orderId).then(data => data.result).then(result => {

			const order = result.order
			let billingAddress

			if (order) {
				billingAddress = { ...(order.billingAddress || order.shippingDetail), transactionId: order.transactionId }
			}

			this.setState({
				order: order,
				billingAddress: billingAddress,
				openResult: result
			})
		})

	}

	submitHandle(e) {
		e.preventDefault()
		const self = this
		const { orderId, onPurchase } = this.props

		if (!this.state.openResult) {
			return
		}

		if(!window.__is_login__){
			if(!this.state.openResult.openOrderResponse || !this.state.openResult.openOrderResponse.clientSecret)
				return
			this.confirmPayment()
		}else{
			this.createPaymentMethod()
		}
		onPurchase()
	}


	createPaymentMethod(){
		const { stripe, elements } = this.props
		if (!stripe || !elements) {
			// Stripe.js has not loaded yet. Make sure to disable
			// form submission until Stripe.js has loaded.
			return
		}

		const card = elements.getElement(CardNumberElement)

		if (card == null) {
			return
		}

		this.setState({
			checking: true,
		})

		stripe.createPaymentMethod({
			type: 'card',
			card,
			billing_details: {
				name: this.state.billingAddress.name,
				email: this.state.openResult.email,
				phone: this.state.billingAddress.phoneNumber,
				address: {
					city: this.state.billingAddress.city,
					country: this.state.billingAddress.country ? this.state.billingAddress.country.value : null,
					line1: this.state.billingAddress.streetAddress1,
					line2: this.state.billingAddress.unit,
					postal_code: this.state.billingAddress.zipCode,
					state: this.state.billingAddress.state ? this.state.billingAddress.state.value : null
				},
			},
		}).then(payload => {
			if (payload.error) {
				console.log('[error]', payload.error)
				alert(payload.error.message)
			} else {
				console.log('[PaymentMethod]', payload.paymentMethod)

				stripePay({
					orderId: this.state.order.id,
					transactionId: this.state.order.transactionId,
					paymentMethod: payload.paymentMethod
				}).then(data => {
					self.setState({
						checking: false,
					})

					const {transactionId, orderId, success, warnMsg} = data.result

					if(success){
						window.location.href = `${window.ctx || ''}/order-confirm/${transactionId}?transactionId=${transactionId}`
					}else{
						if (window.isApp) {
							window.location.href = `${window.ctx || ''}/geekopay/app-fail?errMsg=${warnMsg}`
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
			}
		})
	}


	confirmPayment() {
		const { stripe, elements } = this.props
		this.setState({
			checking: true,
		})
		stripe.confirmCardPayment(this.state.openResult.openOrderResponse.clientSecret, {
			payment_method: {
				type: 'card',
				card: elements.getElement(CardNumberElement),
				billing_details: {
					name: this.state.billingAddress.name,
					email: this.state.openResult.email,
					phone: this.state.billingAddress.phoneNumber,
					address: {
						city: this.state.billingAddress.city,
						country: this.state.billingAddress.country ? this.state.billingAddress.country.value : null,
						line1: this.state.billingAddress.streetAddress1,
						line2: this.state.billingAddress.unit,
						postal_code: this.state.billingAddress.zipCode,
						state: this.state.billingAddress.state ? this.state.billingAddress.state.value : null
					},
				},
			}
		}).then(payload => {
			if (payload.error) {
				console.log(payload)
			} else {
				console.log(payload)
			}
		})
	}




	addHandler() {
		this.setState({
			showNew: true,
		})
	}

	cardSelect(card) {
		this.setState({ loading: true })
		usecreditcard(card.quickpayRecord.id).then(() => {
			this.props.GETCREDITCARDS('18').then(() => {
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


					<form action="/charge" method="post" id="payment-form">


						{
							cards && cards.length > 0 && <div style={{ backgroundColor: '#fff', paddingTop: 16, borderTop: 'solid 1px #e6e6e6' }}>
								<div style={{ paddingLeft: 12 }}>
									<span style={{ fontFamily: 'AcuminPro-Bold' }}>Select a Card</span>
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


						<FORMBODY style={{ display: this.state.showNew ? 'block' : 'none' }}>

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
										<CardNumberElement
											id="cardNumber"
											options={ELEMENT_OPTIONS}
										/>

										<div className="underline">
											{
												this.state.cardError.card
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
									<CardExpiryElement
										id="expiry"
										options={ELEMENT_OPTIONS}
									/>
									<div className="underline ">
										{
											this.state.cardError.date
										}
									</div>
								</FIELD>
								<FIELD className="field col6" style={{ paddingLeft: 12 }}>
									<label htmlFor="card-cvc" data-tid="scwsdk.form.card_cvc_label">
                                        *CVV
										<span className="badage" onClick={() => { this.setState({ showAsk: true }) }}>?</span>
									</label>
									<CardCvcElement
										id="cvc"
										options={ELEMENT_OPTIONS}
									/>
									<div className="underline">
										{
											this.state.cardError.cvv
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



// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const promise = loadStripe('pk_test_51JI2NUEf4gK6pnckAuiiFk2whunhssbSU7PbQ7vRergnUh1pMlbjjg0JM4W55Bacj5wZbutwQKiTXfNwzNTXbMNv00NVqfh1TZ')


const InjectedCheckoutForm = props => (
	<ElementsConsumer>
		{({ stripe, elements }) => (
			<Credit stripe={stripe} elements={elements} {...props} />
		)}
	</ElementsConsumer>
)


const InjectCredit = props => {
	return (
		<Elements stripe={promise}>
			<InjectedCheckoutForm {...props} />
		</Elements>
	)
}


export default connect(state => {
	return {
		...state
	}
}, dispatch => {
	return {
		GETCREDITCARDS: payMethod => {
			return dispatch(getCreditCards(payMethod))
		}
	}
})(withRouter(InjectCredit))