import React from 'react'
import styled from 'styled-components'
import {mercadopay, addMercadoCard} from '../../api'

import {Form, Input, Select, Button} from './control.jsx'
import {required, email, zip, phone} from '../validator.jsx'
import {FormElement, MutiElement, ELEMENTS} from './styled-control.jsx'

import {BigButton} from '../msite/buttons.jsx'
import _ from 'lodash'
import {injectIntl} from 'react-intl'

const StyleButton = {
  display: 'block',
  outline: 'none',
  boxShadow: 'none',
  backgroundColor: '#e5004f',
  borderRadius: 2,
  border: 'none',
  width: '100%',
  height: '40px',
  color: '#fff',
  fontSize: '18px',
  marginTop: '20px',
  textTransform: 'uppercase'
}

const getBin = card => card.replace(/[ .-]/g, '').slice(0, 6)

const monthes = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12'
]

const year = new Date().getFullYear()

const years = []

{
  for (let i = 0; i < 22; i++) {
    years.push(year + i)
  }
}

const MercadoBinding = class extends React.Component {
  constructor (props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.state = {
    	email: this.props.email,
    	paymentMethod: null,
    	token: null,
    	paymentMethodIcon: null,
      installments: 1,
      payer_costs: [],
      paying: false
    }
    this.guessingPaymentMethod = this.guessingPaymentMethod.bind(this)
    this.setPaymentMethodInfo = this.setPaymentMethodInfo.bind(this)
    this.sdkResponseHandler = this.sdkResponseHandler.bind(this)
    this.setMercadoInstallments = _.debounce(this.setMercadoInstallments).bind(this)
  }

  componentDidMount () {
  }

  componentWillReceiveProps (newProps) {
    this.setState({email: newProps.email})
  }

  setMercadoInstallments (evt) {
    const {cart} = this.props
    const {orderTotal} = cart.orderSummary
    const bin = getBin(evt.target.value)
    if (bin.length >= 6) {
      Mercadopago.getInstallments({bin, amount: orderTotal.amount}, (status, response) => {
        if (status != 200 && status != 201) {
          return
        }
        this.setState({
          payer_costs: response[0].payer_costs
        })
      })
    }
  }

  guessingPaymentMethod (event) {
  	const card = event.target.value

  	const bin = getBin(card)

    if (event.type == 'keyup') {
      if (bin.length >= 6) {
        Mercadopago.getPaymentMethod({
          'bin': bin
        }, this.setPaymentMethodInfo)
      }
    } else {
      setTimeout(function () {
        if (bin.length >= 6) {
          Mercadopago.getPaymentMethod({
            'bin': bin
          }, this.setPaymentMethodInfo)
        }
      }, 100)
    }
  }

  setPaymentMethodInfo (status, response) {
	    if (status == 200) {
	        this.setState({
	        	paymentMethod: response[0].id,
	        	paymentMethodIcon: response[0].secure_thumbnail
	        })
	    }
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  handleSubmit (evt) {
  	evt.preventDefault()
    this.form.validateAll()
    this.setState({
      paying: true
    })
  	const $form = document.getElementById('mercadoform')
    Mercadopago.clearSession()
  	Mercadopago.createToken($form, this.sdkResponseHandler)
  }

  sdkResponseHandler (status, response) {
    if (status != 200 && status != 201) {
      alert('verify filled data')
      this.setState({
        paying: false
      })
    } else {
      this.setState({
      	token: response.id
      })

      const params = {
        email: this.state.email,
        paymentMethodId: this.state.paymentMethod,
        token: response.id,
        installments: this.state.installments
      }

      this.pay(params)
    }
  }

  pay (params) {
    mercadopay(params).then(data => data.result).then(({success, transactionId, details, solutions}) => {
      if (success) {
        if (siteType === 'new') {
          window.location.href = `${window.ctx || ''}/shoppingcart/order-confirm/credit-card?order_number=${transactionId}`
        } else {
          window.location.href = `${window.ctx || ''}/v7/order/confirm/web/ocean?transactionId=${transactionId}`
        }
      } else {
        alert(details)
      }
      this.setState({
        paying: false
      })
    }).catch(({result}) => {
      alert(result)
    })
  }

  render () {
  	const CardStyle = {
  		backgroundImage: `url(${this.state.paymentMethodIcon})`,
  		backgroundPosition: `calc(100% - 10px) center`,
  		backgroundRepeat: 'no-repeat',
  		backgroundSize: '35px'
  	}
  	const {intl} = this.props

  	return <div>
  		<Form id="mercadoform" ref={c => { this.form = c }} onSubmit={this.handleSubmit.bind(this)}>
        <Input name='email'
          value={this.state.email}
          type="hidden"
          onChange={this.handleInputChange}/>
        <ELEMENTS>
          <FormElement label={`${intl.formatMessage({id: 'credit_card_number'})}:`} className="__required">
            <Input
              style= {{width: '100%', height: 40}}
              onChange={
                (evt) => {
                  this.guessingPaymentMethod(evt)
                  this.setMercadoInstallments(evt)
                }
              }
              onKeyUp={this.guessingPaymentMethod}
              validations={[required]}
              data-checkout="cardNumber"/>
          </FormElement>

          <FormElement label={`${intl.formatMessage({id: 'securit_code'})}:`} className="__required">
            <Input
              style= {{width: '100%', height: 40}}
              validations={[required]}
              data-checkout="securityCode"
              placeholder="CVC2/CVV2"/>
          </FormElement>

          <MutiElement>
            <FormElement label={`${intl.formatMessage({id: 'expiration_month'})}:`} className="__required">
              <Select
                style= {{width: '100%', height: 40}}
                className="x-select"
                validations={[required]}
                data-checkout="cardExpirationMonth">
                <option value=''>Month</option>
                {monthes.map(month => <option key={month} value={month}>{month}</option>)}
              </Select>
            </FormElement>

            <FormElement label={`${intl.formatMessage({id: 'expiration_year'})}:`} className="__required">
              <Select
                style= {{width: '100%', height: 40}}
                className="x-select"
                validations={[required]}
                data-checkout="cardExpirationYear">
                <option value=''>Year</option>
                {years.map(year => <option key={year} value={year}>{year}</option>)}
              </Select>
            </FormElement>
          </MutiElement>

          <FormElement label={`${intl.formatMessage({id: 'ard_holder_name'})}:`} className="__required">
            <Input
              style= {{width: '100%', height: 40}}
              validations={[required]}
              data-checkout="cardholderName"/>
          </FormElement>

          <FormElement label={`${intl.formatMessage({id: 'installments'})}:`} className="__required">
            <Select style= {{width: '100%', height: 40}}
              className="x-select"
              name="installments"
              onChange={this.handleInputChange}
              value={this.state.installments}>
              {
                this.state.payer_costs && this.state.payer_costs.length > 0 && this.state.payer_costs.map(({installments, recommended_message}) => (
                  <option key={installments} value={installments}>
                    {recommended_message}
                  </option>
                ))
              }

            </Select>
          </FormElement>

        </ELEMENTS>

  			<div>
          {this.state.paying ? (
            <BigButton style={{marginTop: 20}} className="__btn" height={40} bgColor="#999">{intl.formatMessage({id: 'please_wait'})}...</BigButton>
          ) : (
            <Button className="__submitbtn" style={StyleButton}>{intl.formatMessage({id: 'pay_now'})}</Button>
          )}
	       </div>
  		</Form>
  	</div>
  }
}

export default injectIntl(MercadoBinding)
