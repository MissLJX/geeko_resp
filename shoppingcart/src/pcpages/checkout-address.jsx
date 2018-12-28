import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Modal } from '../components/pc/modal.jsx'
import AddressFrom from '../components/pc/address-form.jsx'
import {updateorderaddress} from '../api'
import {updateAddress, fetchCheckout} from '../store/actions.js'
import {injectIntl} from 'react-intl'
import {__route_root__} from '../utils/utils.js'

const ADDRESSBODY = styled.div`
  padding: 56px;
  background-color: #fff;
  width: 696px;
`

const ADDRESSTITLE = styled.div`
  font-family: HelveticaNeue-Medium;
  font-size: 24px;
  color: #222;
`

const mapStateToProps = (state) => {
  return {
    checkout: state.checkout,
    address: state.checkout ? state.checkout.shippingDetail : null,
    addressUpdating: state.addressUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    REFRESHORDER: (orderId) => {
      return dispatch(fetchCheckout(orderId))
    },
    UPDATINGADDRESS: (updating) => {
      dispatch(updateAddress(updating))
    }
  }
}

const Address = class extends React.Component {
  constructor (props) {
    super(props)
    this.close = this.close.bind(this)
    this.editAddress = this.editAddress.bind(this)
  }

  close (evt) {
  	evt.preventDefault()
    this.props.history.goBack()
  }

  editAddress (address) {
    const {checkout} = this.props
    const {transactionId} = checkout

    this.props.UPDATINGADDRESS(true)
    updateorderaddress({...address, id: this.props.address.id, transactionId: transactionId }).then(() => {
      this.props.UPDATINGADDRESS(false)
      this.props.history.goBack()
      this.props.REFRESHORDER(checkout.orderId)
    }).catch(({result}) => {
      alert(result)
      this.props.UPDATINGADDRESS(false)
    })
  }

  render () {
    const { address, intl } = this.props
    const { validate } = this.props.location.state || {}

    const FormBody = styled.div`
    	max-width: 320px;
    	width: 80%;
    	margin-left: auto;
    	margin-right: auto;
      padding-bottom: 50px;

    `

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
