import React from 'react'
import styled from 'styled-components'
import FullFixed from '../components/msite/full-fixed.jsx'
import {updateorderaddress} from '../api'
import {fetchTransaction} from '../store/actions.js'
import {injectIntl} from 'react-intl'
import { connect } from 'react-redux'
import {__route_root__} from '../utils/utils.js'
import {BigButton} from '../components/msite/buttons.jsx'
import {Form, Input, Button} from '../components/msite/control.jsx'
import {FormLayout} from '../components/msite/layout.jsx'
import {required, phone, number} from '../components/validator.jsx'
import {StyledControl} from '../components/msite/styled-control.jsx'

const mapStateToProps = (state) => {
  return {
    transaction: state.transaction,
    address: state.transaction ? state.transaction.orderVos[0].order.shippingDetail : null
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
    const transactionId = this.props.transaction.orderVos[0].order.transactionId
    const {address} = this.props
    this.setState({
      updating: true
    })
    updateorderaddress({
      ...address,
      phoneNumber: this.state.phoneNumber,
      phoneArea: this.state.phoneArea,
      orderNo: transactionId,
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

    return <FullFixed onClose={this.close} title={`Change Phone Number`}>

    	{
    		address && <Form style={{padding: 20}} ref={c => { this.form = c }} onSubmit={this.handleSubmit.bind(this)}>

    			 <FormLayout>
    			 	<StyledControl>

              {
                address.country.value === 'BR' && <div>
                  <span style={{width: 59, display: 'inline-block'}}>BR +55</span>
                  <Input
                    divStyle={{width: 55, marginRight: 10, display: 'inline-block'}}
                    style={{paddingLeft: 0, textAlign: 'center'}}
                    name="phoneArea"
                    placeholder="Código"
                    type="number"
                    maxLength={2}
                    value={this.state.phoneArea}
                    onChange={this.handleInputChange}
                    validations={[number]}/>

                  <Input
                    name='phoneNumber'
                    divStyle={{width: 'calc(100% - 124px)', display: 'inline-block', verticalAlign: 'top'}}
                    value={this.state.phoneNumber}
                    type="number"
                    onChange={this.handleInputChange}
                    validations={[required, phone]}/>
                </div>
              }

              {
                (address.country.value === 'AE' || address.country.value === 'SA') && <div>
                  <span style={{width: 69, display: 'inline-block'}}>
                    {
                      address.country.value === 'AE' ? 'UAE +971' : 'KSA +966'
                    }
                  </span>
                  <Input
                    name='phoneNumber'
                    divStyle={{width: 'calc(100% - 79px)', display: 'inline-block', verticalAlign: 'middle'}}
                    value={this.state.phoneNumber}
                    type="number"
                    onChange={this.handleInputChange}
                    validations={[required, phone]}/>
                </div>
              }

              {
                ['BR', 'AE', 'SA'].indexOf(address.country.value) < 0 && <div>
                  <Input
                    name='phoneNumber'
                    divStyle={{width: '100%', display: 'inline-block', verticalAlign: 'middle'}}
                    value={this.state.phoneNumber}
                    type="number"
                    onChange={this.handleInputChange}
                    validations={[required, phone]}/>
                </div>
              }

	          </StyledControl>

            <Input type="hidden" name="country" value={address.country.value}/>

	          <div style={{marginTop: 20}}>
		          <Button className="__submitbtn" ref={c => this.btn = c} ingoredisable="true" style={{
		            display: 'block',
		            backgroundColor: '#222',
		            color: '#fff',
		            height: 40,
		            lineHeight: '40px',
		            textAlign: 'center',
		            outline: 'none',
		            border: 'none',
		            width: '100%'
		          }}>{intl.formatMessage({id: 'submit'})}</Button>
		        </div>

    			 </FormLayout>

    		</Form>
    	}

    </FullFixed>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Modal))
