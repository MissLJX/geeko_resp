import React from 'react'
import styled from 'styled-components'
import {Form, Input, Select, Button} from './control.jsx'
import {required, email, zip, phone, number} from '../validator.jsx'
import {FormElement, MutiElement, ELEMENTS} from './styled-control.jsx'
import {injectIntl} from 'react-intl'
import {getCountries, getStates} from '../../api'
import CheckBox from '../checkbox.jsx'
import {BigButton} from '../msite/buttons.jsx'

const getCountryCode = () => {
  let strs = window.lang ? window.lang.split('_') : []
  return strs[1] || 'US'
}

const AddressFrom = class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isEdit: false,
      name: '',
      streetAddress1: '',
      unit: '',
      city: '',
      zipCode: '',
      state: '',
      country: '',
      phoneNumber: '',
      defaultAddress: false,
      countries: null,
      states: null,
      phoneArea: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange (event) {
    const target = event.target
    let value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    if (name === 'zipCode' && this.state.country === 'BR') {
      if (value && value.length > 5) {
        var strs = value.replace(/-/ig, '').split('')
        strs.splice(5, 0, '-')
        value = strs.join('')
      }
    }

    if (name === 'phoneArea') {
      if (value && value.length > 2) {
        value = value.slice(0, 2)
      }
    }

    this.setState({
      [name]: value
    })
  }

  changeCountry (event) {
    const {value} = event.target
    this.getStates(value)
    this.setState({state: ''})
  }

  handleSubmit (event) {
    event.preventDefault()

    const form = this.state.country === 'BR' ? this.brForm : this.form
    const addressButtn = this.state.country === 'BR' ? this.brAddressButtn : this.addressButtn

    form.validateAll()

    if (!addressButtn.context._errors || addressButtn.context._errors.length < 1) {
      const {
        name,
        streetAddress1,
        unit,
        city,
        zipCode,
        state,
        country,
        phoneNumber,
        defaultAddress,
        phoneArea
      } = this.state

      this.props.editAddress({
        name,
        streetAddress1,
        unit,
        city,
        zipCode,
        state,
        country,
        phoneNumber,
        defaultAddress,
        phoneArea
      })
    }
  }

  componentWillReceiveProps (newProps) {
    const {address} = newProps
    const oldAddress = this.props.address
    if (oldAddress == null || address.id != oldAddress.id) {
      this.initAddress(address)
    }
  }

  componentWillMount () {
    const {address} = this.props
    this.initAddress(address)
  }

  initAddress (address) {
    if (address) {
      const {
        name,
        streetAddress1,
        unit,
        city,
        zipCode,
        phoneNumber,
        isDefaultAddress,
        country,
        state,
        phoneArea
      } = address

      const isStructotState = s => s && s.value && s.label
      const countryValue = country ? country.value : ''

      this.setState({
        isEdit: true,
        name,
        streetAddress1,
        unit,
        city,
        zipCode,
        phoneNumber,
        country: countryValue,
        state: state ? state.value : '',
        defaultAddress: isDefaultAddress,
        phoneArea: phoneArea || ''
      })

      // if (isStructotState(state)) {
      this.getStates(countryValue)
      // }
    } else {
      let country = this.state.country || getCountryCode()
      this.setState({
        country: country,
        defaultAddress: true
      })
      this.getStates(country)
    }

    getCountries().then(({result}) => {
      this.setState({
        countries: result
      })
    })
  }

  getStates (country) {
    getStates(country).then(({result}) => {
      this.setState({
        states: result
      })
    })
  }

  render () {
    const { intl, isNew, isConfirm } = this.props

    const divStyle = (this.state.country === 'AE' || this.state.country === 'SA') ? {width: 'calc(100% - 79px)', marginLeft: 10, display: 'inline-block', verticalAlign: 'middle'} : {}

    return <div>
      <Form ref={ c => this.form = c } style={{display: `${this.state.country !== 'BR' ? 'block' : 'none'}`}} onSubmit={this.handleSubmit.bind(this)}>
        <ELEMENTS>
          <FormElement label={`${intl.formatMessage({id: 'full_name'})}:`} className="__required">
            <Input
              name='name'
              style= {{width: '100%', height: 40}}
              value={this.state.name}
              onChange={this.handleInputChange}
              validations={[required]}/>
          </FormElement>

          <FormElement label={`${intl.formatMessage({id: 'street_address'})}:`} className="__required">
            <Input
              name='streetAddress1'
              style= {{width: '100%', height: 40}}
              value={this.state.streetAddress1}
              onChange={this.handleInputChange}
              validations={[required]}/>
          </FormElement>

          <FormElement label={`${intl.formatMessage({id: 'unit'})}:`}>
            <Input
              name='unit'
              style= {{width: '100%', height: 40}}
              value={this.state.unit}
              onChange={this.handleInputChange}/>
          </FormElement>

          <FormElement label={`${intl.formatMessage({id: 'city'})}:`} className="__required">
            <Input
              name='city'
              style= {{width: '100%', height: 40}}
              value={this.state.city}
              onChange={this.handleInputChange}
              validations={[required]}/>
          </FormElement>

          <MutiElement>
            <FormElement label={`${intl.formatMessage({id: 'country'})}:`} className="__required">
              <Select
                className="x-select"
                value={this.state.country}
                name='country'
                style= {{width: '100%', height: 40}}
                onChange={(evt) => { this.handleInputChange(evt); this.changeCountry(evt) }}
                validations={[required]}>
                <option value=''>Country</option>
                {
                  this.state.countries && this.state.countries.map(country => (
                    <option key={country.value} value={country.value} >{country.label}</option>
                  ))
                }

              </Select>
            </FormElement>

            <FormElement label={`${intl.formatMessage({id: 'state'})}:`} className={this.state.states && this.state.states.length ? '__required' : ''}>
              {
                this.state.states && this.state.states.length ? (
                  <Select
                    className="x-select"
                    name='state'
                    style= {{width: '100%', height: 40}}
                    value={this.state.state}
                    onChange={this.handleInputChange}
                    validations={[required]}>
                    <option value=''>State</option>
                    {
                      this.state.states && this.state.states.map(state => (
                        <option key={state.value} value={state.value} >{state.label}</option>
                      ))
                    }

                  </Select>

                ) : (
                  <Input
                    name='state'
                    style= {{width: '100%', height: 40}}
                    value={this.state.state}
                    onChange={this.handleInputChange}/>
                )
              }
            </FormElement>
          </MutiElement>

          <MutiElement>
            <FormElement label={`${intl.formatMessage({id: 'zip_code'})}:`} className="__required">
              <Input
                name='zipCode'
                style= {{width: '100%', height: 40}}
                value={this.state.zipCode}
                onChange={this.handleInputChange}
                validations={[required, zip]}/>
            </FormElement>

            <FormElement label={`${intl.formatMessage({id: 'phone_number'})}:`} className="__required">

              {
                this.state.country === 'AE' && <span style={{width: 69, display: 'inline-block'}}>UAE +971</span>
              }

              {
                this.state.country === 'SA' && <span style={{width: 69, display: 'inline-block'}}>KSA +966</span>
              }

              <Input
                name='phoneNumber'
                style= {{width: '100%', height: 40}}
                divStyle={divStyle}
                value={this.state.phoneNumber}
                onChange={this.handleInputChange}
                validations={[required, phone]}/>
            </FormElement>

          </MutiElement>

          <MutiElement style={{marginTop: 24}}>
            <div>

              {
                this.props.updating ? <BigButton className="__btn" height={40} bgColor="#999">
                  {intl.formatMessage({id: 'please_wait'})}...
                </BigButton> : <Button className="__submitbtn" ref={c => this.addressButtn = c} ingoredisable="true" style={{
                  display: 'block',
                  backgroundColor: '#222',
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
                }}>{ isConfirm ? intl.formatMessage({id: 'confirm'}) : intl.formatMessage({id: 'save'})}</Button>

              }

            </div>

            <div>
              {
                this.props.showCancel && <div className="__submitbtn" style={{
                  display: 'block',
                  backgroundColor: '#cacaca',
                  borderRadius: 2,
                  color: '#fff',
                  height: 40,
                  lineHeight: '40px',
                  textAlign: 'center',
                  outline: 'none',
                  border: 'none',
                  width: '100%',
                  textTransform: 'uppercase',
                  fontSize: 16,
                  cursor: 'pointer'
                }} onClick={ this.props.onCancel }>{intl.formatMessage({id: 'cancel'})}</div>
              }

            </div>
          </MutiElement>

        </ELEMENTS>
      </Form>

      <Form style={{display: `${this.state.country === 'BR' ? 'block' : 'none'}`}} ref={ c => this.brForm = c } onSubmit={this.handleSubmit.bind(this)}>
        <ELEMENTS>
          <FormElement label={`${intl.formatMessage({id: 'full_name'})}:`} className="__required">
            <Input
              name='name'
              style= {{width: '100%', height: 40}}
              value={this.state.name}
              onChange={this.handleInputChange}
              validations={[required]}/>
          </FormElement>

          <FormElement label={`${intl.formatMessage({id: 'street_address'})}:`} className="__required">
            <Input
              name='streetAddress1'
              style= {{width: '100%', height: 40}}
              value={this.state.streetAddress1}
              onChange={this.handleInputChange}
              validations={[required]}/>
          </FormElement>

          <FormElement label={`${intl.formatMessage({id: 'unit'})}:`}>
            <Input
              name='unit'
              style= {{width: '100%', height: 40}}
              value={this.state.unit}
              onChange={this.handleInputChange}/>
          </FormElement>

          <FormElement label={`${intl.formatMessage({id: 'city'})}:`} className="__required">
            <Input
              name='city'
              style= {{width: '100%', height: 40}}
              value={this.state.city}
              onChange={this.handleInputChange}
              validations={[required]}/>
          </FormElement>

          <MutiElement>
            <FormElement label={`${intl.formatMessage({id: 'country'})}:`} className="__required">
              <Select
                className="x-select"
                value={this.state.country}
                name='country'
                style= {{width: '100%', height: 40}}
                onChange={(evt) => { this.handleInputChange(evt); this.changeCountry(evt) }}
                validations={[required]}>
                <option value=''>Country</option>
                {
                  this.state.countries && this.state.countries.map(country => (
                    <option key={country.value} value={country.value} >{country.label}</option>
                  ))
                }

              </Select>
            </FormElement>

            <FormElement label={`${intl.formatMessage({id: 'state'})}:`} className={this.state.states && this.state.states.length ? '__required' : ''}>
              {
                this.state.states && this.state.states.length ? (
                  <Select
                    className="x-select"
                    name='state'
                    style= {{width: '100%', height: 40}}
                    value={this.state.state}
                    onChange={this.handleInputChange}
                    validations={[required]}>
                    <option value=''>State</option>
                    {
                      this.state.states && this.state.states.map(state => (
                        <option key={state.value} value={state.value} >{state.label}</option>
                      ))
                    }

                  </Select>

                ) : (
                  <Input
                    name='state'
                    style= {{width: '100%', height: 40}}
                    value={this.state.state}
                    onChange={this.handleInputChange}/>
                )
              }
            </FormElement>
          </MutiElement>

          <MutiElement>
            <FormElement label={`${intl.formatMessage({id: 'zip_code'})}:`} className="__required">
              <Input
                name='zipCode'
                style= {{width: '100%', height: 40}}
                value={this.state.zipCode}
                onChange={this.handleInputChange}
                validations={[required, zip]}/>
            </FormElement>

            <FormElement label={`${intl.formatMessage({id: 'phone_number'})}:`} className="__required">
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
                divStyle={{width: 'calc(100% - 124px)', display: 'inline-block', verticalAlign: 'middle'}}
                style= {{width: '100%', height: 40}}
                value={this.state.phoneNumber}
                onChange={this.handleInputChange}
                validations={[required, phone]}/>
            </FormElement>

          </MutiElement>

          <MutiElement style={{marginTop: 24}}>
            <div>

              {
                this.props.updating ? <BigButton className="__btn" height={40} bgColor="#999">
                  {intl.formatMessage({id: 'please_wait'})}...
                </BigButton> : <Button className="__submitbtn" ref={c => this.brAddressButtn = c} ingoredisable="true" style={{
                  display: 'block',
                  backgroundColor: '#222',
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
                }}>{ isConfirm ? intl.formatMessage({id: 'confirm'}) : intl.formatMessage({id: 'save'})}</Button>

              }

            </div>

            <div>
              {
                this.props.showCancel && <div className="__submitbtn" style={{
                  display: 'block',
                  backgroundColor: '#cacaca',
                  borderRadius: 2,
                  color: '#fff',
                  height: 40,
                  lineHeight: '40px',
                  textAlign: 'center',
                  outline: 'none',
                  border: 'none',
                  width: '100%',
                  textTransform: 'uppercase',
                  fontSize: 16,
                  cursor: 'pointer'
                }} onClick={ this.props.onCancel }>{intl.formatMessage({id: 'cancel'})}</div>
              }

            </div>
          </MutiElement>

        </ELEMENTS>
      </Form>
    </div>
  }
}

export default injectIntl(AddressFrom)
