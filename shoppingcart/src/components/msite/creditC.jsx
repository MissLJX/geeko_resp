import React, { useEffect } from 'react'
import { openCheckOutOrder, usecreditcard, payForCheckout, checkout_credit } from '../../api'
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


const logos = {
	'card-number': {
		src: 'card',
		alt: 'card number logo',
	},
	'expiry-date': {
		src: 'exp-date',
		alt: 'expiry date logo',
	},
	'cvv': {
		src: 'cvv',
		alt: 'cvv logo',
	}
}

const errors = {
	'card-number': 'Please enter a valid card number',
	'expiry-date': 'Please enter a valid expiry date',
	'cvv': 'Please enter a valid cvv code'
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
			valid: false
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
			this.initPage()
		}
	}

	componentDidMount() {
		this.initPage()
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

		openCheckOutOrder(orderId).then(data => data.result).then(result => {

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

	initCreditForm() {
		Frames.init(window.__checkout_pk__)
		Frames.addEventHandler(
			Frames.Events.FRAME_VALIDATION_CHANGED,
			this.onValidationChanged.bind(this)
		)

		Frames.addEventHandler(
			Frames.Events.PAYMENT_METHOD_CHANGED,
			this.paymentMethodChanged.bind(this)
		)

		Frames.addEventHandler(
			Frames.Events.CARD_VALIDATION_CHANGED,
			this.cardValidationChanged.bind(this)
		)

		Frames.addEventHandler(Frames.Events.CARD_TOKENIZED, this.onCardTokenized.bind(this))
	}

	cardValidationChanged() {
		this.setState({
			valid: Frames.isCardValid()
		})
	}

	onCardTokenized(event) {
		payForCheckout({orderId: this.state.order.id, token: event.token}).then(data => {
			console.log(data)
		}).catch(data => {
			console.log(data)
		})
	}


	paymentMethodChanged(event) {
		var pm = event.paymentMethod
		let container = document.querySelector('.icon-container.payment-method')
		if (!pm) {
			this.clearPaymentMethodIcon(container)
		} else {
			this.clearErrorIcon('card-number')
			this.showPaymentMethodIcon(container, pm)
		}
	}

	onValidationChanged(event) {
		const e = event.element
		if (event.isValid || event.isEmpty) {
			if (e === 'card-number' && !event.isEmpty) {
				this.showPaymentMethodIcon()
			}
			this.setDefaultIcon(e)
			this.clearErrorIcon(e)
			this.clearErrorMessage(e)

		} else {
			if (e === 'card-number') {
				this.clearPaymentMethodIcon()
			}
			this.setDefaultErrorIcon(e)
			this.setErrorIcon(e)
			this.setErrorMessage(e)
		}
	}

	setErrorMessage(el) {
		const msg = errors[el]
		switch (el) {
		case 'card-number':
			this.setState({
				cardError: {
					...this.state.cardError,
					card: msg
				}
			})
			break
		case 'expiry-date':
			this.setState({
				cardError: {
					...this.state.cardError,
					date: msg
				}
			})
			break
		case 'cvv':
			this.setState({
				cardError: {
					...this.state.cardError,
					cvv: msg
				}
			})
			break
		default:
			break
		}
	}

	clearErrorMessage(el) {
		switch (el) {
		case 'card-number':
			this.setState({
				cardError: {
					...this.state.cardError,
					card: ''
				}
			})
			break
		case 'expiry-date':
			this.setState({
				cardError: {
					...this.state.cardError,
					date: ''
				}
			})
			break
		case 'cvv':
			this.setState({
				cardError: {
					...this.state.cardError,
					cvv: ''
				}
			})
			break
		default:
			break
		}
	}

	showPaymentMethodIcon(parent, pm) {
		if (parent) parent.classList.add('show')
		const logo = document.getElementById('logo-payment-method')
		if (pm) {
			const name = pm.toLowerCase()
			logo.setAttribute('src', 'https://image.geeko.ltd/card-icons/' + name + '.svg')
			logo.setAttribute('alt', pm || 'payment method')
		}
		logo.style.removeProperty('display')
	}

	setDefaultIcon(el) {
		const selector = 'icon-' + el
		const logo = document.getElementById(selector)
		logo.setAttribute('src', 'https://image.geeko.ltd/card-icons/' + logos[el].src + '.svg')
		logo.setAttribute('alt', logos[el].alt)
	}

	setErrorIcon(el) {
		const logo = document.getElementById('icon-' + el + '-error')
		logo.style.setProperty('display', 'block')
	}

	setDefaultErrorIcon(el) {
		const selector = 'icon-' + el
		const logo = document.getElementById(selector)
		logo.setAttribute('src', 'https://image.geeko.ltd/card-icons/' + logos[el].src + '-error.svg')
		logo.setAttribute('alt', logos[el].alt)
	}

	clearErrorIcon(el) {
		const logo = document.getElementById('icon-' + el + '-error')
		logo.style.removeProperty('display')
	}


	clearPaymentMethodIcon(parent) {
		if (parent) parent.classList.remove('show')
		const logo = document.getElementById('logo-payment-method')
		logo.style.setProperty('display', 'none')
	}


	submitHandle(e) {
		e.preventDefault()
		const self = this
		const { orderId, onPurchase } = this.props

		if (self.state.showNew) {
			if(this.state.valid){
				Frames.submitCard()
				self.setState({
					checking: true,
				})
				onPurchase()
			}
		}else{
			checkout_credit({orderId}).then(data => {
				console.log(data)
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

	formRef(c, type) {
		switch (type) {
		case 'card':
			this.cardRef = c
			break
		case 'date':
			this.dateRef = c
			break
		case 'cvv':
			this.cvvRef = c
			break
		default:
			break
		}

		if (this.cardRef && this.dateRef && this.cvvRef && !this.formLoaded) {
			this.formLoaded = true
			this.initCreditForm()
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
										<INPUTCONTAINER className="card-number">
											<div className="icon-container">
												<img
													id="icon-card-number"
													src="https://image.geeko.ltd/card-icons/card.svg"
													alt="PAN"
												/>
											</div>
											<div className="card-number-frame" ref={c => this.formRef(c, 'card')}></div>
											<div className="icon-container payment-method">
												<img id="logo-payment-method" />
											</div>
											<div className="icon-container" style={{ width: 16 }}>
												<img id="icon-card-number-error" src="https://image.geeko.ltd/card-icons/error.svg" />
											</div>
										</INPUTCONTAINER>
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
									<INPUTCONTAINER className="input-container expiry-date">
										<div className="icon-container" style={{ display: 'none' }}>
											<img
												id="icon-expiry-date"
												src="https://image.geeko.ltd/card-icons/exp-date.svg"
												alt="Expiry date"
											/>
										</div>
										<div className="expiry-date-frame" style={{ paddingLeft: 0 }} ref={c => this.formRef(c, 'date')}></div>
										<div className="icon-container" style={{ width: 16, background: '#fff' }}>
											<img
												id="icon-expiry-date-error"
												src="https://image.geeko.ltd/card-icons/error.svg"
											/>
										</div>
									</INPUTCONTAINER>
									<div className="underline">
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
									<INPUTCONTAINER className="input-container cvv">
										<div className="icon-container" style={{ display: 'none' }}>
											<img id="icon-cvv" src="https://image.geeko.ltd/card-icons/cvv.svg" alt="CVV" />
										</div>
										<div className="cvv-frame" style={{ paddingLeft: 0 }} ref={c => this.formRef(c, 'cvv')}></div>
										<div className="icon-container" style={{ width: 16, background: '#fff' }}>
											<img id="icon-cvv-error" src="https://image.geeko.ltd/card-icons/error.svg" />
										</div>
									</INPUTCONTAINER>
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
										this.props.history.push(`${this.props.match.url}/billing-address`, { address: billingAddress })
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


export default connect(state => {
	return {
		...state
	}
}, dispatch => {
	return {
		GETCREDITCARDS: () => {
			return dispatch(getCreditCards(['18', '87'], true))
		}
	}
})(withRouter(Credit))