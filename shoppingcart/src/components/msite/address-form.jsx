import React from 'react'
import {Form, Input, Select, Button} from './control.jsx'
import {required, email, zip, phone, number} from '../validator.jsx'
import {StyledControl} from './styled-control.jsx'
import {FormLayout, MultiControl} from './layout.jsx'
import {getCountries, getStates} from '../../api'
import {injectIntl} from 'react-intl'

const getCountryCode = () => {
  let strs = window.lang ? window.lang.split('_') : []
  return strs[1] || 'US'
}

const AdressForm = class extends React.Component {
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
      phoneArea: '',
      hasValidated: false
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
    this.initAddress(address)
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
      this.setState({
        country: getCountryCode()
      })
      this.getStates(getCountryCode())
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

  formRef (c) {
    this.form = c
    if (this.props.needInitValidate && !this.state.hasValidated) {
      this.form.validateAll()
      this.setState({
        hasValidated: true
      })
    }
  }

  render () {
    const {intl} = this.props
    return <div>
      <Form style={{...this.props.style, display: `${this.state.country !== 'BR' ? 'block' : 'none'}`}} ref={this.formRef.bind(this)} onSubmit={this.handleSubmit.bind(this)}>
        <FormLayout>
          <StyledControl>
            <label>
              {intl.formatMessage({id: 'full_name'})}*
            </label>
            <Input
              name='name'
              value={this.state.name}
              onChange={this.handleInputChange}
              validations={[required]}/>
          </StyledControl>

          <StyledControl>
            <label>
              {intl.formatMessage({id: 'street_address'})}*
            </label>
            <Input
              name='streetAddress1'
              value={this.state.streetAddress1}
              onChange={this.handleInputChange}
              validations={[required]}/>
          </StyledControl>

          <StyledControl>
            <label>
              {intl.formatMessage({id: 'unit'})}
            </label>
            <Input
              name='unit'
              value={this.state.unit}
              onChange={this.handleInputChange}/>
          </StyledControl>

          <MultiControl>
            <StyledControl>
              <label>
                {intl.formatMessage({id: 'country'})}*
              </label>
              <Select
                className="x-select"
                value={this.state.country}
                name='country'
                onChange={(evt) => { this.handleInputChange(evt); this.changeCountry(evt) }}
                validations={[required]}>
                <option value=''>Country</option>
                {
                  this.state.countries && this.state.countries.map(country => (
                    <option key={country.value} value={country.value} >{country.label}</option>
                  ))
                }

              </Select>
            </StyledControl>

            <StyledControl>
              <label>
                {intl.formatMessage({id: 'state'})}
              </label>

              {
                this.state.states && this.state.states.length ? (
                  <Select
                    className="x-select"
                    name='state'
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
                    value={this.state.state}
                    onChange={this.handleInputChange}/>
                )
              }

            </StyledControl>
          </MultiControl>

          <StyledControl>
            <label>
              {intl.formatMessage({id: 'city'})}
            </label>
            <Input
              name='city'
              value={this.state.city}
              onChange={this.handleInputChange}/>
          </StyledControl>

          <MultiControl>
            <StyledControl>
              <label>
                {intl.formatMessage({id: 'zip_code'})}*
              </label>
              <Input
                name='zipCode'
                value={this.state.zipCode}
                onChange={this.handleInputChange}
                validations={[required, zip]}/>
            </StyledControl>

            <StyledControl>
              <label>
                {intl.formatMessage({id: 'phone_number'})}*
              </label>
              <Input
                name='phoneNumber'
                value={this.state.phoneNumber}
                onChange={this.handleInputChange}
                validations={[required, phone]}/>
            </StyledControl>
          </MultiControl>

          <div>
            <Button className="__submitbtn" ref={c => this.addressButtn = c} ingoredisable="true" style={{
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

      <Form style={{...this.props.style, display: `${this.state.country === 'BR' ? 'block' : 'none'}`}} ref={c => { this.brForm = c }} onSubmit={this.handleSubmit.bind(this)}>
        <FormLayout>
          <StyledControl>
            <label>
              {intl.formatMessage({id: 'full_name'})}*
            </label>
            <Input
              name='name'
              value={this.state.name}
              onChange={this.handleInputChange}
              validations={[required]}/>
          </StyledControl>

          <StyledControl>
            <label>
              {intl.formatMessage({id: 'street_address'})}*
            </label>
            <Input
              name='streetAddress1'
              value={this.state.streetAddress1}
              onChange={this.handleInputChange}
              validations={[required]}/>
          </StyledControl>

          <StyledControl>
            <label>
              {intl.formatMessage({id: 'unit'})}
            </label>
            <Input
              name='unit'
              value={this.state.unit}
              onChange={this.handleInputChange}/>
          </StyledControl>

          <MultiControl>
            <StyledControl>
              <label>
                {intl.formatMessage({id: 'country'})}*
              </label>
              <Select
                className="x-select"
                value={this.state.country}
                name='country'
                onChange={(evt) => { this.handleInputChange(evt); this.changeCountry(evt) }}
                validations={[required]}>
                <option value=''>Country</option>
                {
                  this.state.countries && this.state.countries.map(country => (
                    <option key={country.value} value={country.value} >{country.label}</option>
                  ))
                }

              </Select>
            </StyledControl>

            <StyledControl>
              <label>
                {intl.formatMessage({id: 'state'})}
              </label>

              {
                this.state.states && this.state.states.length ? (
                  <Select
                    className="x-select"
                    name='state'
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
                    value={this.state.state}
                    onChange={this.handleInputChange}/>
                )
              }

            </StyledControl>
          </MultiControl>

          <StyledControl>
            <label>
              {intl.formatMessage({id: 'city'})}
            </label>
            <Input
              name='city'
              value={this.state.city}
              onChange={this.handleInputChange}/>
          </StyledControl>

          <StyledControl>
            <label>
              {intl.formatMessage({id: 'zip_code'})}*
            </label>
            <Input
              name='zipCode'
              value={this.state.zipCode}
              onChange={this.handleInputChange}
              validations={[required, zip]}/>
          </StyledControl>

          <StyledControl>
            <label>
              {intl.formatMessage({id: 'phone_number'})}*
            </label>

            <div>
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

          </StyledControl>

          <div>
            <Button className="__submitbtn" ref={c => this.brAddressButtn = c} ingoredisable="true" style={{
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

    </div>
  }
}

export default injectIntl(AdressForm)
