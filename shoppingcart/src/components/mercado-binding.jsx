import React from 'react'
import styled from 'styled-components'
import {mercadopay, addMercadoCard} from '../api'
import {Form, Input, Button, Select} from './msite/control.jsx'
import {required, email} from './validator.jsx'
import {StyledControl} from './msite/styled-control.jsx'
import {FormLayout, MultiControl} from './msite/layout.jsx'

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
  marginTop: '20px'
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
    	paymentMethodIcon: null
    }
    this.guessingPaymentMethod = this.guessingPaymentMethod.bind(this)
    this.setPaymentMethodInfo = this.setPaymentMethodInfo.bind(this)
    this.sdkResponseHandler = this.sdkResponseHandler.bind(this)
  }

  componentDidMount () {
  	Mercadopago.setPublishableKey('TEST-aa971175-51cd-4be7-8ae4-f12006ac536d')
  }

  componentWillReceiveProps (newProps) {
    this.setState({email: newProps.email})
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
  	const $form = document.getElementById('mercadoform')
    Mercadopago.clearSession()
  	Mercadopago.createToken($form, this.sdkResponseHandler)
  }

  sdkResponseHandler (status, response) {
    if (status != 200 && status != 201) {
      alert('verify filled data')
    } else {
      this.setState({
      	token: response.id
      })

      if (this.props.exsiting) {
        addMercadoCard(response.id).then(() => {
          this.props.addcardback()
        })
      } else {
        mercadopay({
          email: this.state.email,
          paymentMethodId: this.state.paymentMethod,
          token: response.id
        }).then(data => data.result).then(({success, transactionId, details, solutions}) => {
          if (success) {
            window.location.href = `${window.ctx || ''}/v7/order/confirm/web/ocean?transactionId=${transactionId}`
          } else {
            alert(details + '\n' + solutions)
          }
        })
      }
    }
  }

  render () {
  	const CardStyle = {
  		backgroundImage: `url(${this.state.paymentMethodIcon})`,
  		backgroundPosition: `calc(100% - 10px) center`,
  		backgroundRepeat: 'no-repeat',
  		backgroundSize: '35px'
  	}

  	return <div style={{margin: 'auto', width: '80%', maxWidth: 300}}>
  		<Form id="mercadoform" ref={c => { this.form = c }} onSubmit={this.handleSubmit.bind(this)}>
  			<FormLayout>

          {
            !this.props.exsiting && <StyledControl style={{display: 'none'}}>
              <label>
              Email*
              </label>
              <Input

                name='email'
                value={this.state.email}
                onChange={this.handleInputChange}
                validations={[required, email]}/>
            </StyledControl>
          }

  				<StyledControl>
  					<label>Credit card number*</label>
  					<Input
  						style={CardStyle}
  						onChange={this.guessingPaymentMethod}
  						onKeyUp={this.guessingPaymentMethod}
  						validations={[required]}
  						data-checkout="cardNumber"/>
  				</StyledControl>

  				<StyledControl>
  					<label>Security code*</label>
  					<Input
  						validations={[required]}
  						data-checkout="securityCode"
  						placeholder="CVC2/CVV2"/>
  				</StyledControl>

  				<MultiControl>
	  				<StyledControl>
	  					<label>Expiration month*</label>
	  					<Select
                className="x-select"
	  						validations={[required]}
	  						data-checkout="cardExpirationMonth">
                <option value=''>Month</option>
                {monthes.map(month => <option value={month}>{month}</option>)}

              </Select>
	  				</StyledControl>

	  				<StyledControl>
	  					<label>Expiration year*</label>
	  					<Select
                className="x-select"
	  						validations={[required]}
	  						data-checkout="cardExpirationYear">
                <option value=''>Year</option>
                {years.map(year => <option value={year}>{year}</option>)}
              </Select>
	  				</StyledControl>
  				</MultiControl>

  				<StyledControl>
  					<label>Card holder name*</label>
  					<Input
  						validations={[required]}
  						data-checkout="cardholderName"/>
  				</StyledControl>
  			</FormLayout>

  			<div>
	          <Button className="__submitbtn" style={StyleButton}>Pay Now</Button>
	        </div>
  		</Form>
  	</div>
  }
}

export default MercadoBinding
