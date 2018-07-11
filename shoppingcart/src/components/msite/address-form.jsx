import React from 'react'
import {Form, Input, Select, Button} from './control.jsx'
import {required, email, zip, phone} from '../validator.jsx'
import {StyledControl} from './styled-control.jsx'
import {FormLayout, MultiControl} from './layout.jsx'
import {getCountries, getStates} from '../../api'
import {injectIntl} from 'react-intl'

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
      isDefaultAddress: false,
      countries: null,
      states: null
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

    this.setState({
      [name]: value
    })
  }

  changeCountry (event) {
    const {value} = event.target
    this.getStates(value)
  }

  handleSubmit (event) {
    event.preventDefault()
    const {
      name,
      streetAddress1,
      unit,
      city,
      zipCode,
      state,
      country,
      phoneNumber,
      isDefaultAddress
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
      isDefaultAddress
    })
  }

  componentWillMount () {
  	const {address} = this.props

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
        state
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
        isDefaultAddress
      })

      // if (isStructotState(state)) {
      this.getStates(countryValue)
      // }
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
    const {intl} = this.props
  	return <Form style={this.props.style} ref={c => { this.form = c }} onSubmit={this.handleSubmit.bind(this)}>
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
                  <option value={country.value} >{country.label}</option>
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
                      <option value={state.value} >{state.label}</option>
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
          <Button className="__submitbtn" style={{
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
}

export default injectIntl(AdressForm)
