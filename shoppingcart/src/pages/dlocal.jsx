import React from 'react'
import styled from 'styled-components'
import FullFixed from '../components/msite/full-fixed.jsx'
import { connect } from 'react-redux'
import { __route_root__ } from '../utils/utils.js'
import { payDLocal, bindDLocal } from '../api'
import { goOrder } from '../utils/common-pay.js'
import { injectIntl } from 'react-intl'

const mapStateToProps = (state) => {
	return {
		...state
	}
}

const mapDispatchToProps = (dispatch) => {
	return {

	}
}



const IFrame = styled.iframe`
	-webkit-overflow-scrolling: touch;
	height:100%;
	width:100%;
  padding-left:20px;
  padding-right:20px;
`
 
const DLocal = class extends React.Component {
	constructor(props) {
		super(props)
		this.close = this.close.bind(this)
	}

	componentWillMount() {
		window.dLocalPay = (result, errBack) => {
			this.payDLocal(result).catch(({ result }) => errBack(result))
		}
		window.bindDLocal = (result, callBack , errBack) => {
			this.bindDLocal(result).then(callBack).catch(({ result }) => errBack(result))
		}
	}

	payDLocal(result) {
		return payDLocal({ ...result, payMethod: this.props.payMethod }).then(goOrder)
	}

	bindDLocal(result){
		return bindDLocal({ ...result, payMethod: this.props.payMethod })
	}

	close(evt) {
		evt.preventDefault()
		this.props.history.replace(`${window.ctx || ''}${__route_root__}/`)
	}

	render() {
		const { cart, document, intl } = this.props

		let currency, country, amount
		if (cart) {
			currency = cart.orderSummary.orderTotal.currency
			amount = cart.orderSummary.orderTotal.amount
			country = cart.shippingDetail.country ? cart.shippingDetail.country.value : window.__country

		}

		return <FullFixed onClose={this.close} title={intl.formatMessage({ id: 'credit_card' })}>
			{cart && <IFrame src={`${window.ctx || ''}/i/dlocal?currency=${currency}&country=${country}&amount=${amount}&document=${document || ''}`} frameBorder="0" scrolling="auto" seamless />}

		</FullFixed>
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(DLocal))
