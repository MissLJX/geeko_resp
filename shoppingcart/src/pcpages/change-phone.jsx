import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {fetchTransaction} from '../store/actions.js'
import { Modal } from '../components/pc/modal.jsx'
import {updateorderaddress} from '../api'
import {updateAddress} from '../store/actions.js'
import {injectIntl} from 'react-intl'
import {__route_root__} from '../utils/utils.js'
import {BigButton} from '../components/msite/buttons.jsx'

import {Form, Input, Button} from '../components/pc/control.jsx'
import {required, phone, number} from '../components/validator.jsx'
import {FormElement, ELEMENTS} from '../components/pc/styled-control.jsx'

const PHONEBODY = styled.div`
  padding: 40px;
  background-color: #fff;
  width: 400px;

  .__title{
    font-family: HelveticaNeue-Medium;
    font-size: 20px;
    color: #222;
  }
`

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

const ChagePhone = class extends React.Component {
  constructor (props) {
    super(props)
    this.close = this.close.bind(this)
    this.editAddress = this.editAddress.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.state = {
      phoneNumber: '',
      phoneArea: '',
      updating: false
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

  editAddress () {
    const transactionId = this.props.transaction.transactionId
    const {address} = this.props
    this.setState({
      updating: true
    })
    updateorderaddress({
      ...address,
      phoneNumber: this.state.phoneNumber,
      phoneArea: this.state.phoneArea,
      transactionId: transactionId,
      country: address.country.value,
      state: address.state ? address.state.value : ''
    }).then(() => {
      this.setState({
        updating: false
      })
      this.props.history.goBack()
      this.props.REFRESHORDERCONFIRM(transactionId)
    }).catch(({result}) => {
      alert(result)
      this.setState({
        updating: false
      })
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

  handleSubmit (evt) {
    evt.preventDefault()
    this.form.validateAll()
    if (!this.btn.context._errors || !this.btn.context._errors.length) {
      this.editAddress()
    }
  }

  render () {
    const { address, intl } = this.props

    return <Modal onClose={this.close.bind(this)}>
      {
        address && <PHONEBODY>
          <div className="__title">Change Phone Number</div>
          <Form style={{marginTop: 15}} ref={ c => this.form = c } onSubmit={ this.handleSubmit.bind(this) }>

            <ELEMENTS>
              <FormElement className="__required">
                {
                  address.country.value === 'BR' && <React.Fragment>
                    <span style={{width: 59, display: 'inline-block'}}>BR +55</span>
                    <Input
                      name="phoneArea"
                      type="number"
                      placeholder="Código"
                      value={this.state.phoneArea}
                      onChange={this.handleInputChange}
                      validations={[number]}
                      style= {{width: '100%', height: 40, paddingLeft: 0, textAlign: 'center'}}
                      divStyle={{width: 55, marginRight: 10, display: 'inline-block'}}/>
                    <Input
                      name='phoneNumber'
                      divStyle={{width: 'calc(100% - 124px)', display: 'inline-block', verticalAlign: 'top'}}
                      style= {{width: '100%', height: 40}}
                      value={this.state.phoneNumber}
                      onChange={this.handleInputChange}
                      validations={[required, phone]}/>
                  </React.Fragment>
                }

                {
                  (address.country.value === 'AE' || address.country.value === 'SA') && <React.Fragment>
                    <span style={{width: 69, display: 'inline-block'}}>{
                      address.country.value === 'AE' ? 'UAE +971' : 'KSA +966'
                    }</span>
                    <Input
                      name='phoneNumber'
                      divStyle={{width: 'calc(100% - 79px)', display: 'inline-block', verticalAlign: 'middle'}}
                      style= {{width: '100%', height: 40}}
                      value={this.state.phoneNumber}
                      onChange={this.handleInputChange}
                      validations={[required, phone]}/>
                  </React.Fragment>
                }

                {
                  ['BR', 'AE', 'SA'].indexOf(address.country.value) < 0 && <React.Fragment>
                    <Input
                      name='phoneNumber'
                      divStyle={{width: '100%', display: 'inline-block', verticalAlign: 'middle'}}
                      style= {{width: '100%', height: 40}}
                      value={this.state.phoneNumber}
                      onChange={this.handleInputChange}
                      validations={[required, phone]}/>
                  </React.Fragment>
                }

              </FormElement>

              <Input type="hidden" name="country" value={address.country.value}/>

              <FormElement>
                {
                  this.state.updating ? <BigButton className="__btn" height={40} bgColor="#999">
                    {intl.formatMessage({id: 'please_wait'})}...
                  </BigButton> : <Button className="__submitbtn" ref={c => this.btn = c} ingoredisable="true" style={{
                    display: 'block',
                    backgroundColor: '#e64545',
                    borderRadius: 2,
                    color: '#fff',
                    height: 40,
                    lineHeight: '40px',
                    textAlign: 'center',
                    outline: 'none',
                    border: 'none',
                    width: '100%',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    fontSize: 16
                  }}>{intl.formatMessage({id: 'confirm'})}</Button>

                }
              </FormElement>
            </ELEMENTS>
          </Form>
        </PHONEBODY>
      }

    </Modal>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ChagePhone))
