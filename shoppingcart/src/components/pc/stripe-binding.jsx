import React from 'react'
import {loadStripe} from '@stripe/stripe-js'
import {
	Elements,
	ElementsConsumer,
	CardNumberElement,
	CardCvcElement,
	CardExpiryElement,
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


const StripeBinding = class extends React.Component{
	constructor(props) {
		super(props)
	}

	render() {
		return <div>
			<CardNumberElement
				id="cardNumber"
				options={ELEMENT_OPTIONS}
			/>
			<CardExpiryElement
				id="expiry"
				options={ELEMENT_OPTIONS}
			/>
			<CardCvcElement
				id="cvc"
				options={ELEMENT_OPTIONS}
			/>
		</div>
	}
}

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const promise = loadStripe(window.__stripe_pk_)


const InjectedCheckoutForm = props => (
	<ElementsConsumer>
		{({ stripe, elements }) => (
			<StripeBinding stripe={stripe} elements={elements} {...props} />
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

export default InjectCredit