import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { fetchCheckout } from '../store/actions.js'
import FullFixed from '../components/msite/full-fixed.jsx'
import AddressForm from '../components/msite/address-form.jsx'
import { updateorderaddress } from '../api'
import { injectIntl } from 'react-intl'

const mapStateToProps = (state) => {
	return {
		checkout: state.checkout,
		address: state.checkout ? state.checkout.shippingDetail : null
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		REFRESHORDER: (orderId) => {
			dispatch(fetchCheckout(orderId))
		}
	}
}

const Modal = class extends React.Component {
	constructor(props) {
		super(props)
		this.close = this.close.bind(this)
		this.editAddress = this.editAddress.bind(this)
	}

	close() {
		this.props.history.replace(`${window.ctx || ''}/checkout/${this.props.checkout.orderId}`)
	}

	editAddress(address) {
		const transactionId = this.props.checkout.transactionId
		updateorderaddress({ ...address, id: this.props.address.id, transactionId: transactionId }).then(() => {
			this.close()
			this.props.REFRESHORDER(this.props.checkout.orderId)
		}).catch(({ result }) => {
			alert(result)
		})
	}

	render() {
		const { address, intl } = this.props
		const { validate } = this.props.location.state || {}

		const FormBody = styled.div`
    	max-width: 320px;
    	width: 80%;
    	margin-left: auto;
    	margin-right: auto;
      padding-bottom: 50px;

    `

		return <FullFixed onClose={this.close} title={intl.formatMessage({ id: 'address' })}>

			<FormBody >
				<p>* {intl.formatMessage({ id: 'required_tips' })}</p>
				<AddressForm needInitValidate={validate} editAddress={this.editAddress} style={{ marginTop: 15 }} address={address} disablecountry={true} />
			</FormBody>

		</FullFixed>
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Modal))
