import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { refreshCart, changeLang } from '../store/actions.js'
import FullFixed from '../components/msite/full-fixed.jsx'
import AddressForm from '../components/msite/address-form.jsx'
import { updatebillingaddress } from '../api'
import { injectIntl } from 'react-intl'
import { __route_root__ } from '../utils/utils.js'
import { v4 } from 'uuid'


export const __address_token__ = window.token

const mapStateToProps = (state) => {
	return {
		address: state.address
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		REFRESH: () => {
			dispatch(refreshCart())
		},
		CHANGELANG: (lang) => {
			dispatch(changeLang(lang))
		},
		SETRESPONSE: () => {
			dispatch({
				type: 'SET_ORDER_RESPONSE',
				safechargeresponse: v4()
			})
		}
	}
}

const Modal = class extends React.Component {
	constructor(props) {
		super(props)
		this.close = this.close.bind(this)
		this.editAddress = this.editAddress.bind(this)
	}

	close(evt) {
		evt.preventDefault()
		// this.props.history.goBack()
		const {orderId, payMethod} = this.props.location.state
		this.props.history.replace(`${window.ctx || ''}${__route_root__}/credit/${orderId}?payMethod=${payMethod}`)
	}

	editAddress(address) {
		const { address: billing, orderId, payMethod } = this.props.location.state || {}
        updatebillingaddress({ ...address, transactionId: billing.transactionId }).then(() => {
			this.props.SETRESPONSE()
			this.props.history.replace(`${window.ctx || ''}${__route_root__}/credit/${orderId}?payMethod=${payMethod}`)
            // this.props.history.goBack()
        }).catch(({ result }) => {
            alert(result)
        })
	}

	render() {
		const { intl } = this.props
		const { address } = this.props.location.state || {}
		const FormBody = styled.div`

    	margin-left: auto;
    	margin-right: auto;
		-webkit-overflow-scrolling : touch;
		border-top: 8px solid #f7f7f7;
		padding-bottom: 100px;
    `

		return <FullFixed onClose={this.close} title={ intl.formatMessage({id: 'billing_address'}) }>
			<FormBody style={{backgroundColor: '#f7f7f7'}}>
				<AddressForm ignoreEmail igonreCache editAddress={this.editAddress} address={address} />
			</FormBody>
		</FullFixed>
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Modal))
