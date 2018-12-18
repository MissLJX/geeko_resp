import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {fetchTransaction} from '../store/actions.js'
import FullFixed from '../components/msite/full-fixed.jsx'
import AddressForm from '../components/msite/address-form.jsx'
import {updateorderaddress} from '../api'
import {injectIntl} from 'react-intl'
import {__route_root__} from '../utils/utils.js'

const mapStateToProps = (state) => {
  return {
    transaction: state.transaction,
    address: state.transaction ? state.transaction.shippingDetail : null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    REFRESHORDERCONFIRM: (transactionId) => {
      dispatch(fetchTransaction(transactionId))
    }
  }
}

const Modal = class extends React.Component {
  constructor (props) {
    super(props)
    this.close = this.close.bind(this)
    this.editAddress = this.editAddress.bind(this)
  }

  close () {
    this.props.history.replace(`${window.ctx || ''}/order-confirm/${this.props.transaction.transactionId}`)
  }

  editAddress (address) {
    const transactionId = this.props.transaction.transactionId
  		updateorderaddress({...address, id: this.props.address.id, transactionId: transactionId }).then(() => {
  			this.close()
      this.props.REFRESHORDERCONFIRM(transactionId)
  		}).catch(({result}) => {
  			alert(result)
  		})
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
