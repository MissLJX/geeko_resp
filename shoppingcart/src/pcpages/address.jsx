import React from 'react'
import styled from 'styled-components'
import {refreshCart, fetchAddresses, updateAddress, changeLang} from '../store/actions.js'
import { connect } from 'react-redux'
import {addAddress, editAddress, paypalAddress, saveTempAddress} from '../api'
import { FormElement, MutiElement} from '../components/pc/styled-control.jsx'
import { Modal } from '../components/pc/modal.jsx'
import {injectIntl} from 'react-intl'
import AddressFrom from '../components/pc/address-form.jsx'
import {__route_root__} from '../utils/utils.js'
import Cookie from 'js-cookie'

export const __address_token__ = window.token

const ADDRESSBODY = styled.div`
	padding: 56px;
  background-color: #fff;
  width: 696px;
`

const ADDRESSTITLE = styled.div`
  font-family: HelveticaNeue-Medium;
  font-size: 24px;
	color: #222;
	text-align: center;
`

const mapStateToProps = (state) => {
	return {
		cart: state.cart,
		addresses: state.addresses,
		addressUpdating: state.addressUpdating
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		REFRESH: () => {
			dispatch(refreshCart())
		},
		GETADDRESSES: () => {
			return dispatch(fetchAddresses())
		},
		UPDATINGADDRESS: (updating) => {
			dispatch(updateAddress(updating))
		},
		CHANGELANG: (lang) => {
			dispatch(changeLang(lang))
		}
	}
}

const Address = class extends React.Component {
	constructor (props) {
		super(props)
		this.editAddress = this.editAddress.bind(this)
	}

	close () {
		let ischeckoutaddress = this.props.location.pathname && this.props.location.pathname.indexOf('/checkout/address') >= 0
    
		if(ischeckoutaddress){
			this.props.history.replace(`${window.ctx || ''}${__route_root__}/checkout`)
		}else{
			this.props.history.replace(`${window.ctx || ''}${__route_root__}/`)
		}

	
	}

	editAddress (address) {
		this.props.UPDATINGADDRESS(true)
		if (__address_token__) {
			paypalAddress({...address, defaultAddress: true, id: this.props.cart.shippingDetail.id, token: __address_token__}).then(() => {
				this.props.history.replace(`${window.ctx || ''}${__route_root__}/`)
				this.props.UPDATINGADDRESS(false)
				this.props.REFRESH()
			}).catch(({result}) => {
				alert(result)
				this.props.UPDATINGADDRESS(false)
			})
		} else {
			const sAddress = this.getAddress()
			let addressOpreator = sAddress && this.props.match.params.id !== 'add' ? editAddress : addAddress
      
			if(!window.__is_login__){
				addressOpreator = saveTempAddress
			}

			addressOpreator({...address, defaultAddress: true, id: sAddress ? sAddress.id : null}).then(() => {
				this.close()
				if (address.country === 'BR') {
					Cookie.set('currency', 'BRL', {expires: 365})
					this.props.CHANGELANG('pt_BR')
				} else if (address.country === 'MX') {
					Cookie.set('currency', 'MXN', {expires: 365})
					this.props.CHANGELANG('es_MX')
				} else {
					this.props.REFRESH()
				}

				this.props.UPDATINGADDRESS(false)

				this.props.GETADDRESSES()
			}).catch(({result}) => {
				this.props.UPDATINGADDRESS(false)
				alert(result)
			})
		}
	}

	getAddress () {
		const { match, cart, addresses } = this.props
		if (match.params.id === 'add') {
			return null
		} else if (match.params.id && addresses) {
			return addresses.find(a => a.id === match.params.id)
		}

		return cart ? cart.shippingDetail : null
	}

	render () {
		const { intl, cart } = this.props
		const { validate } = this.props.location.state || {}

		const address = this.getAddress()

		return <Modal onClose={this.close.bind(this)}>
			<ADDRESSBODY>
				<ADDRESSTITLE>
					{ intl.formatMessage({id: 'shipping_address'}) }
				</ADDRESSTITLE>
				<div style={{marginTop: 25}}>
					<AddressFrom needInitValidate={validate} updating={this.props.addressUpdating} address={address} editAddress={this.editAddress} showCancel={true} onCancel={this.close.bind(this)}/>
				</div>

			</ADDRESSBODY>
		</Modal>
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Address))
