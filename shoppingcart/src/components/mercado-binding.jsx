import React from 'react'
import styled from 'styled-components'
import {mercadopay} from '../api'
import {Form, Input, Button} from './msite/control.jsx'
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

const MercadoBinding = class extends React.Component {
  constructor (props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.state = {
    	email: null,
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
	        console.log(response)
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
  	const $form = document.getElementById('mercadoform')
  	Mercadopago.createToken($form, this.sdkResponseHandler)
  }

  sdkResponseHandler (status, response) {
    if (status != 200 && status != 201) {
      alert('verify filled data')
    } else {
      this.setState({
      	token: response.id
      })

      mercadopay({
      	email: this.state.email,
      	paymentMethodId: this.state.paymentMethod,
      	token: response.id
      })
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
  		<Form id="mercadoform" onSubmit={this.handleSubmit.bind(this)}>
  			<FormLayout>
  				<StyledControl>
	    			<label>
	    				Email*
		            </label>
		            <Input
		              name='email'
		              value={this.state.email}
		              onChange={this.handleInputChange}
		              validations={[required, email]}/>
	    		</StyledControl>

  				<StyledControl>
  					<label>Credit card number*</label>
  					<Input
  						style={CardStyle}
  						onChange={this.guessingPaymentMethod}
  						onKeyUp={this.guessingPaymentMethod}
  						validations={[required]}
  						data-checkout="cardNumber"
  						placeholder="4075 5957 1648 3764"

  						autoComplete="off" />
  				</StyledControl>

  				<StyledControl>
  					<label>Security code*</label>
  					<Input
  						validations={[required]}
  						data-checkout="securityCode"
  						placeholder="123"
  						autoComplete="off" />
  				</StyledControl>

  				<MultiControl>
	  				<StyledControl>
	  					<label>Expiration month*</label>
	  					<Input
	  						validations={[required]}
	  						data-checkout="cardExpirationMonth"
	  						placeholder="06"
	  						autoComplete="off" />
	  				</StyledControl>

	  				<StyledControl>
	  					<label>Expiration year*</label>
	  					<Input
	  						validations={[required]}
	  						data-checkout="cardExpirationYear"
	  						placeholder="2020"
	  						autoComplete="off" />
	  				</StyledControl>
  				</MultiControl>

  				<StyledControl>
  					<label>Card holder name*</label>
  					<Input
  						validations={[required]}
  						data-checkout="cardholderName"
  						placeholder="APRO"
  						autoComplete="off" />
  				</StyledControl>
  			</FormLayout>

  			<div>
	          <Button style={StyleButton}>Pay Now</Button>
	        </div>
  		</Form>
  	</div>
  }
}

export default MercadoBinding
