import React, { useEffect } from 'react'
import { openSafeChargeOrder, usecreditcard, setSafeCharge } from '../../api'
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
`

const ScFieldStyles = {
    base: {
        color: '#32325D',
        fontWeight: 500,
        fontFamily: 'Roboto, Consolas, Menlo, monospace',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        '::placeholder': {
            color: '#CFD7DF',
        },
        ':-webkit-autofill': {
            color: '#e39f48',
        },
    },
    invalid: {
        color: '#E25950',
        '::placeholder': {
            color: '#FFCCA5',
        },
    },
}


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


const ScFieldClasses = {
    focus: 'focused',
    empty: 'empty',
    invalid: 'invalid',
    complete: 'complete',
}


const StyledCard = styled.div`
	height: 50px;
	cursor: pointer;
	padding-left:10px;
	padding-right:10px;
	background-color:#fff;
`

const Card = props => <StyledCard>
    <div onClick={() => { props.cardSelect(props.card) }} className="x-table __fixed __vm x-fw x-fh">
        <div className="x-cell">
            {props.card.style && props.card.style.imageURL && <img style={{ width: 40, verticalAlign: 'middle', position: 'relative', top: -2 }} src={props.card.style.imageURL} />}
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
    border-radius: 6px;
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
        <Icon onClick={props.onClose} style={{width: 30, height: 30, lineHeight: '30px', position: 'absolute', right: 0, top: 10, fontSize: 12, color: '#999'}}>&#xe6af;</Icon>
        <div style={{textAlign: 'center', fontSize: 16, fontFamily: 'AcuminPro-Bold'}}>
            What is CVV?
        </div>
        <div>
            <div style={{color:'rgba(102, 102, 102, 1)', marginTop:16}}>For Visa/Mastercard/JCB etcs</div>
            <div className="__info">
                <img className="__image" src="https://image.geeko.ltd/upgrade/20210715/JCB.png" />
                <div style={{paddingLeft: 15, color: 'rgba(34, 34, 34, 1)'}}>
                    Last 3 digits on back of card
                </div>
            </div>
            <div style={{color:'rgba(102, 102, 102, 1)', marginTop: 20}}>For AMEXS only</div>
            <div className="__info">
                <img className="__image" src="https://image.geeko.ltd/upgrade/20210715/AMEXS.png" />
                <div style={{paddingLeft: 15, color: 'rgba(34, 34, 34, 1)'}}>
                    4 digits on front of card
                </div>
            </div>
        </div>
    </ASKC>
}

const Credit = class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            merchantId: null,
            merchantSiteId: null,
            sessionToken: null,
            clientUniqueId: null,
            userTokenId: null,
            saveForNext: true,
            showNew: false,
            selectedCardId: null,
            openResult: null,
            checking: false,
            loading: false,
            billingAddress: null,
            cardError: {},
            showAsk: false
        }
    }



    componentDidMount() {

        const { orderId } = this.props

        this.props.GETCREDITCARDS('18').then(cards => {
            if (!cards || cards.length < 1) {
                this.setState({
                    showNew: true
                })
            }
        })


        openSafeChargeOrder(orderId).then(data => data.result).then(result => {
            const response = result.openOrderResponse

            const order = result.order
            let billingAddress

            if (order) {
                billingAddress = { ...(order.billingAddress || order.shippingDetail), transactionId: order.transactionId }
            }

            this.setState({
                merchantId: response.merchantId,
                merchantSiteId: response.merchantSiteId,
                sessionToken: response.sessionToken,
                clientUniqueId: response.clientUniqueId,
                userTokenId: response.userTokenId,
                openResult: result,
                billingAddress
            })

            this.sfc = SafeCharge({
                env: window.safechargeEnv || 'prod',
                merchantId: response.merchantId,
                merchantSiteId: response.merchantSiteId
            })

            this.ScFields = this.sfc.fields({
                fonts: [
                    { cssUrl: 'https://fonts.googleapis.com/css?family=Roboto' },
                ]
            })


            this.scard = this.ScFields.create('ccNumber', {
                // style: ScFieldStyles,
                // classes: ScFieldClasses,
            })

            this.scard.attach('#card-number')

            this.cardExpiry = this.ScFields.create('ccExpiration', {
                // style: ScFieldStyles,
                // classes: ScFieldClasses,
            })

            this.cardExpiry.attach('#card-expiry')

            this.cardCvc = this.ScFields.create('ccCvc', {
                // style: ScFieldStyles,
                // classes: ScFieldClasses,
            })

            this.cardCvc.attach('#card-cvc')


            // this.scard.on('change', function (evt) {
            //     console.log(evt);
            // })


            // this.cardExpiry.on('change', function (evt) {
            //     console.log(evt);
            // })

        })

    }

    submitHandle(e) {
        e.preventDefault()
        const self = this
        const { orderId } = this.props
        self.setState({
            checking: true
        })
        const { openResult } = this.state
        if (self.state.showNew) {
            self.sfc.createPayment({
                "sessionToken": self.state.sessionToken,
                "merchantId": self.state.merchantId,
                "merchantSiteId": self.state.merchantSiteId,
                "clientUniqueId": self.state.clientUniqueId, // optional
                "paymentOption": self.scard,
                "cardHolderName": this.state.billingAddress.name,
                "billingAddress": {
                    "email": openResult.email,
                    "country": openResult.country
                },
                "deviceDetails": {
                    "ipAddress": openResult.ip
                }
            }, function (res) {
                self.callBackSafeCharge({ ...res, sessionToken: self.state.sessionToken, saveForNext: self.state.saveForNext })
            })
        } else {
            const selectedCard = self.props.creditcards.find(card => card.isSelected)
            self.sfc.createPayment({
                "sessionToken": self.state.sessionToken,
                "merchantId": self.state.merchantId,
                "merchantSiteId": self.state.merchantSiteId,
                "clientUniqueId": self.state.clientUniqueId, // optional
                "userTokenId": self.state.userTokenId,
                "paymentOption": {
                    "userPaymentOptionId": selectedCard.quickpayRecord.quickpayId,
                },
                "billingAddress": {
                    "email": openResult.email,
                    "country": openResult.country
                },
                "deviceDetails": {
                    "ipAddress": openResult.ip
                }
            }, function (res) {
                self.callBackSafeCharge({ ...res, sessionToken: self.state.sessionToken })
            })
        }
    }


    callBackSafeCharge(res) {
        const self = this
        const { orderId } = this.props

        if (res.result === 'APPROVED') {
            setSafeCharge({ ...res, sessionToken: self.state.sessionToken }).then(data => data.result).then(result => {
                window.location.href = `${window.ctx || ''}/order-confirm/${self.state.clientUniqueId}?transactionId=${self.state.clientUniqueId}`
            }).catch(data => {
                alert(data.result || data)
                self.setState({
                    checking: false
                })
            })
        } else {
            const hasCardError = this.setErrorStatus(res)
            if (!hasCardError) {
                if (window.isApp) {
                    window.location.href = `${window.ctx || ''}/geekopay/app-fail?errMsg=${res.errorDescription || res.reason || 'Error'}`
                } else {
                    alert(res.errorDescription || res.reason || 'Error')
                    if (orderId && window.__is_login__) {
                        this.props.onGo(`${window.ctx || ''}/checkout/${orderId}`)
                        storage.add('temp-order', orderId, 1 * 60 * 60)
                    }
                }
            }
            self.setState({
                checking: false
            })
        }

    }

    setErrorStatus(res) {
        let hasCardError = false
        switch (res.errorDescription) {
            case 'incomplete_cvc':
                this.setState({
                    cardError: {
                        cvv: 'missing or incomplete CVV/CVC'
                    }
                })
                hasCardError = true
                break
            case 'incomplete_date':
                this.setState({
                    cardError: {
                        date: 'missing or incomplete date'
                    }
                })
                hasCardError = true
                break
            case 'date_in_past':
                this.setState({
                    cardError: {
                        date: 'date is in the past'
                    }
                })
                hasCardError = true
                break
            case 'invalid_expiration_year':
                this.setState({
                    cardError: {
                        date: 'invalid year value'
                    }
                })
                hasCardError = true
                break
            case 'incomplete_card_number':
                this.setState({
                    cardError: {
                        card: 'incomplete or missing card number'
                    }
                })
                hasCardError = true
                break
            case 'incorrect_card_number':
                this.setState({
                    cardError: {
                        card: 'incorrect card number'
                    }
                })
                hasCardError = true
                break
            default:
                break
        }
        return hasCardError
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
        const { billingAddress } = this.state

        let order
        if (this.state.openResult) {
            order = this.state.openResult.order
        }

        return <div>
            {this.state.loading && <Loading />}
            {
                order ? <React.Fragment>
                    <div style={{ height: 66, display: 'flex', alignItems: 'center', backgroundColor: '#fff', paddingLeft: 12, marginTop: 8 }}>
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
                                            *Card number
                                        </label>
                                        <div id="card-number" className="input"></div>

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
                                        *Expiration Date
                                    </label>
                                    <div id="card-expiry" className="input empty"></div>
                                    <div className="underline ">
                                        {
                                            this.state.cardError.date
                                        }
                                    </div>
                                </FIELD>
                                <FIELD className="field col6" style={{ paddingLeft: 12 }}>
                                    <label htmlFor="card-cvc" data-tid="scwsdk.form.card_cvc_label">
                                        *CVV
                                        <span className="badage" onClick={() => {this.setState({showAsk: true})}}>?</span>
                                    </label>
                                    <div id="card-cvc" className="input empty"></div>
                                    <div className="underline">
                                        {
                                            this.state.cardError.cvv
                                        }
                                    </div>
                                </FIELD>
                            </div>
                            <div className="row">
                                <TurnTool open={() => { this.setState({ saveForNext: !this.state.saveForNext }) }} turnAcitve={this.state.saveForNext}>
                                    <span style={{ fontSize: 14, color: '#666' }}>
                                        Remember this  card for future use
                                    </span>
                                </TurnTool>
                            </div>
                        </FORMBODY>

                        {billingAddress && <BOX style={{ marginTop: 8 }}>
                            <div className="__hd">
                                Billing Address
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
                    <div style={{ height: 66, display: 'flex', alignItems: 'center', backgroundColor: '#fff', paddingLeft: 12, marginTop: 8 }}>
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
        GETCREDITCARDS: payMethod => {
            return dispatch(getCreditCards(payMethod))
        }
    }
})(withRouter(Credit))