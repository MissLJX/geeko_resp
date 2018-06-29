import React from 'react'
import {Form, Input, Select, Button} from './control.jsx'
import {required, email, zip} from '../validator.jsx'
import {StyledControl} from './styled-control.jsx'
import {FormLayout, MultiControl} from './layout.jsx'
import {getCountries, getStates} from '../../api'

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
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
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

    if (this.state.isEdit) {
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

      if (isStructotState(state)) {
        this.getStates(countryValue)
      }
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
  	return <Form style={this.props.style} ref={c => { this.form = c }} onSubmit={this.handleSubmit.bind(this)}>
      <FormLayout>
    		<StyledControl>
    			<label>
    				Full Name*
          </label>
          <Input
            name='name'
            value={this.state.name}
            onChange={this.handleInputChange}
            validations={[required]}/>
    		</StyledControl>

        <StyledControl>
          <label>
            Street Address*
          </label>
          <Input
            name='streetAddress1'
            value={this.state.streetAddress1}
            onChange={this.handleInputChange}
            validations={[required]}/>
        </StyledControl>

        <StyledControl>
          <label>
            Unit
          </label>
          <Input
            name='unit'
            value={this.state.unit}
            onChange={this.handleInputChange}
            validations={[required]}/>
        </StyledControl>

        <MultiControl>
          <StyledControl>
            <label>
              Country
            </label>
            <Select
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
              State
            </label>

            {
              this.state.states && this.state.states.length ? (
                <Select
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
            City
          </label>
          <Input
            name='city'
            value={this.state.city}
            onChange={this.handleInputChange}
            validations={[required]}/>
        </StyledControl>

        <MultiControl>
          <StyledControl>
            <label>
              Zip Code*
            </label>
            <Input
              name='zipCode'
              value={this.state.zipCode}
              onChange={this.handleInputChange}
              validations={[required, zip]}/>
          </StyledControl>

          <StyledControl>
            <label>
              Phone Number*
            </label>
            <Input
              name='phoneNumber'
              value={this.state.phoneNumber}
              onChange={this.handleInputChange}
              validations={[required]}/>
          </StyledControl>
        </MultiControl>

    		<div>
          <Button>Submit</Button>
        </div>
      </FormLayout>
  	</Form>
  }
}

export default AdressForm
