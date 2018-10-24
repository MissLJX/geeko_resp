import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {fetchTransaction} from '../store/actions.js'
import { Modal } from '../components/pc/modal.jsx'
import {updateorderaddress} from '../api'
import {updateAddress} from '../store/actions.js'
import {injectIntl} from 'react-intl'
import {__route_root__} from '../utils/utils.js'

import {Form, Input, Button} from '../components/pc/control.jsx'
import {required, phone} from '../components/validator.jsx'
import {FormElement, ELEMENTS} from '../components/pc/styled-control.jsx'

const PHONEBODY = styled.div`
  padding: 40px;
  background-color: #fff;
  width: 400px;

  .__title{
    font-family: HelveticaNeue-Medium;
    font-size: 24px;
    color: #222;
  }
`

const mapStateToProps = (state) => {
  return {
    transaction: state.transaction,
    address: state.transaction ? state.transaction.orderVos[0].order.shippingDetail : null,
    addressUpdating: state.addressUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    REFRESHORDERCONFIRM: (transactionId) => {
      dispatch(fetchTransaction(transactionId))
    },
    UPDATINGADDRESS: (updating) => {
      dispatch(updateAddress(updating))
    }
  }
}

const ChagePhone = class extends React.Component {
  constructor (props) {
    super(props)
    this.close = this.close.bind(this)
    this.editAddress = this.editAddress.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.state = {
      phoneNumber: '',
      phoneArea: ''
    }
  }

  componentWillMount () {
    const {address} = this.props
    if (address) {
      this.setState({
        phoneNumber: address.phoneNumber,
        phoneArea: address.phoneArea
      })
    }
  }

  close (evt) {
  	evt.preventDefault()
    this.props.history.goBack()
  }

  editAddress (address) {
    const transactionId = this.props.transaction.orderVos[0].order.transactionId
    this.props.UPDATINGADDRESS(true)
  		updateorderaddress({...address, id: this.props.address.id, orderNo: transactionId }).then(() => {
      this.props.UPDATINGADDRESS(false)
  			this.props.history.goBack()
      this.props.REFRESHORDERCONFIRM(transactionId)
  		}).catch(({result}) => {
  			alert(result)
      this.props.UPDATINGADDRESS(false)
  		})
  }

  handleInputChange (event) {
    const target = event.target
    let value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    if (name === 'phoneArea') {
      if (value && value.length > 2) {
        value = value.slice(0, 2)
      }
    }

    this.setState({
      [name]: value
    })
  }

  render () {
    const { address, intl } = this.props

    return <Modal onClose={this.close.bind(this)}>
      {
        address && <PHONEBODY>
          <div className="__title">Change Phone Number</div>
          <Form>
            <ELEMENTS>
              <FormElement>
                <Input name="country" type="hidden" value={address.country.value}/>
                <Input
                  name='phoneNumber'
                  type="phoneNumber"
                  style= {{width: '100%', height: 40}}
                  value={this.state.phoneNumber}
                  onChange={this.handleInputChange}
                  validations={[required, phone]}/>
              </FormElement>
            </ELEMENTS>
          </Form>
        </PHONEBODY>
      }

    </Modal>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ChagePhone))
