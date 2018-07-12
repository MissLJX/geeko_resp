import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {refreshCart} from '../store/actions.js'
import FullFixed from '../components/msite/full-fixed.jsx'
import AddressForm from '../components/msite/address-form.jsx'
import {addAddress, editAddress, paypalAddress} from '../api'
import {injectIntl} from 'react-intl'
import {__route_root__} from '../utils/utils.js'

export const __address_token__ = window.token

const mapStateToProps = (state) => {
  return {
    address: state.cart ? state.cart.shippingDetail : null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    REFRESH: () => {
      dispatch(refreshCart())
    }
  }
}

const Modal = class extends React.Component {
  constructor (props) {
    super(props)
    this.close = this.close.bind(this)
    this.editAddress = this.editAddress.bind(this)
  }

  close (evt) {
  	evt.preventDefault()
    this.props.history.replace(`${window.ctx || ''}${__route_root__}/`)
  }

  editAddress (address) {
  	if (__address_token__) {
  		paypalAddress({...address, id: this.props.address.id, token: __address_token__}).then(() => {
  			this.props.REFRESH()
  			this.props.history.replace(`${window.ctx || ''}${__route_root__}/`)
  		}).catch(({result}) => {
  			alert(result)
  		})
  	} else {
      const addressOpreator = this.props.address ? editAddress : addAddress

  		addressOpreator({...address, id: this.props.address ? this.props.address.id : null}).then(() => {
  			this.props.REFRESH()
  			this.props.history.replace(`${window.ctx || ''}${__route_root__}/`)
  		}).catch(({result}) => {
  			alert(result)
  		})
  	}
  }

  render () {
    const { address, intl } = this.props

    const FormBody = styled.div`
    	max-width: 320px;
    	width: 80%;
    	margin-left: auto;
    	margin-right: auto;
      padding-bottom: 50px;

    `

    return <FullFixed onClose={this.close} title={intl.formatMessage({id: 'address'})}>

    	<FormBody >
	    	<p>* {intl.formatMessage({id: 'required_tips'})}</p>
	    	<AddressForm editAddress={this.editAddress} style={{marginTop: 15}} address={address}/>
    	</FormBody>

    </FullFixed>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Modal))