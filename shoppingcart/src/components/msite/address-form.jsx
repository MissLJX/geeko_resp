import React from 'react'
import { Form, Input, Select, Button } from './control.jsx'
import { required, email, zip, phone, number, cpf } from '../validator.jsx'
import { StyledControl } from './styled-control.jsx'
import styled from 'styled-components'
import { FormLayout, MultiControl } from './layout.jsx'
import { getCountries, getStates, getCites, getCityByZip } from '../../api'
import { injectIntl, FormattedMessage } from 'react-intl'
import Ask from '../ask.jsx'

import FixedMessage from './fixed-message.jsx'
import Mask from '../mask.jsx'

import { storage } from '../../utils/utils'
import { MutiElement } from '../pc/styled-control.jsx'

import { Input as GInput, Select as GSelect, GountrySelect, StreetInput } from './geeko-inputs.jsx'

const getCountryCode = () => {
	return window.__country || 'US'
}

const SELECTINPUT = styled.div`
	position: relative;

	.__selectIcon {
		font-family: 'iconfont';
		position: absolute;
		right: 10px;
		top: 12px;
		cursor: pointer;
		pointer-events: none;
	}

	.__select{
		position: absolute;
		width: 60px;
		height: 46px;
		top: 0;
		right: 0;
		cursor: pointer;
		background: none;
        box-sizing: content-box;
		border: none;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        box-shadow: none;
        cursor: pointer;
		opacity: 0;
	}

	.__listing{
		display: none;
		border-top: none;
		&.active{
			display: block;
			
			
		}
		position: absolute;
		top: 45px;
		width: 100%;
	
		
		background-color: #fff;
		z-index: 2;
		
		ul{
			max-height: 150px;
			overflow: auto;
			& > li{
				line-height: 30px;
				font-size: 12px;
				padding-left:10px;
				cursor: pointer;
				&:hover{
					background-color: #efefef;
				}
			}
		}
	}
`

const SelectInput = class extends React.Component {
	constructor(props) {
		super(props)
	}


	render() {
		let { searchValue, listValues, isActive, ignoreSearchValue } = this.props
		searchValue = ignoreSearchValue ? '' : (searchValue || '')
		let fetchedList = searchValue ? (listValues || []).filter(v => v.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0) : listValues
		return <SELECTINPUT className="select">
			<div>
				{this.props.children}
			</div>

			<div className={`__listing ${isActive ? 'active' : ''}`}>
				{
					fetchedList && fetchedList.length > 0 && <ul>
						{

							fetchedList.map((value, i) => <li key={i} city={value} onClick={() => this.props.selectHandle(value)}>
								<span dangerouslySetInnerHTML={{ __html: value.replace(searchValue, `<b>${searchValue}</b>`) }} />
							</li>)
						}
					</ul>
				}
			</div>

			{/* {
				listValues && listValues.length > 1 && <React.Fragment>
					<span className="__selectIcon" onClick={() => { this.select.click() }}>&#xe690;</span>

					<select className="__select" onChange={e => this.props.selectHandle(e.target.value)} ref={c => this.select = c}>
						{
							(listValues || []).map(v => <option key={v} value={v}>{v}</option>)
						}
					</select>
				</React.Fragment>
			} */}



		</SELECTINPUT>
	}
}

const AdressForm = class extends React.Component {
	constructor(props) {
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
			cpf: '',
			email: '',
			hasValidated: false,
			askMessage: '',
			showAsk: false,
			schecked: true,
			countryStateCities: {},
			cityFocus: false,
			zipFocus: false,
			selectedZips: []
		}
		this.handleInputChange = this.handleInputChange.bind(this)
		this.autoZip = this.autoZip.bind(this)
	}

	handleInputChange(event) {
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

	changeInfo(c, s, v, zs) {
		this.setState({
			country: c || this.state.country,
			state: s || this.state.state,
			city: v ||  this.state.city,
			selectedZips: zs,
			zipCode: zs && zs.length > 0 ? zs[0] : ''
		})

		// if(c !== this.state.country){
		// 	this.getStates(c)
		// }


		if (c && s) {
			const key = `${c}#${s}`
			if (this.state.countryStateCities[key])
				return
			getCites(c, s).then(data => data.result).then(cities => {
				const newState = { ...this.state.countryStateCities, [key]: cities }
				this.setState({
					countryStateCities: newState
				})
			})
		}

	}

	changeCountry(value) {
		this.getStates(value)
	}


	handleSubmit(event) {
		event.preventDefault()

		let form, addressButtn


		// const validateFields = [
		// 	'name',
		// 	'streetAddress1',
		// 	'unit',
		// 	'country',
		// 	'state',
		// 	'city',
		// 	'zipCode',
		// 	'phoneNumber'
		// ]



		// switch (this.state.country) {
		// 	case 'BR':
		// 		form = this.brForm
		// 		addressButtn = this.brAddressButtn
		// 		break
		// 	case 'AE':
		// 	case 'SA':
		// 		form = this.alForm
		// 		addressButtn = this.alAddressButtn
		// 		break
		// 	default:
		// 		form = this.form
		// 		addressButtn = this.addressButtn
		// 		break
		// }




		form = this.form
		addressButtn = this.addressButtn

		form.validateAll()


		// if (this.state.country === 'BR') {
		// 	validateFields.push('cpf')
		// }

		// validateFields.forEach(s => {
		// 	form.validate(s)
		// })


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
				phoneArea,
				cpf,
				email
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
				phoneArea,
				cpf,
				email: (email || '').trim()
			})

			storage.add('shippingDetail', {
				name,
				streetAddress1,
				unit,
				city,
				zipCode,
				state: { value: state },
				country: { value: country },
				phoneNumber,
				defaultAddress,
				phoneArea,
				cpf,
				email
			}, 30 * 24 * 60 * 60)


		}
	}

	// componentWillReceiveProps(newProps) {
	// 	const { address } = newProps
	// 	this.initAddress(address)
	// }

	// getDerivedStateFromProps(props, state){

	// }

	componentDidMount() {
		const { address } = this.props
		this.initAddress(address)
	}

	initAddress(address) {

		if (!address && !!!this.props.igonreCache) {
			address = storage.get('shippingDetail')
		}

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
				phoneArea,
				cpf,
				email
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
				phoneArea: phoneArea || '',
				cpf: cpf || '',
				email
			})

			// if (isStructotState(state)) {
			this.getStates(countryValue)
			// }xx

			const [c, s] = [countryValue, state ? state.value : '']

			if (c && s) {
				const key = `${c}#${s}`
				if (this.state.countryStateCities[key])
					return
				getCites(c, s).then(data => data.result).then(cities => {
					const newState = { ...this.state.countryStateCities, [key]: cities }
					const selectedCity = (cities || []).find(c => c.name === city)
					this.setState({
						countryStateCities: newState,
						selectedZips: selectedCity ? (selectedCity.zipCodes || []) : []
					})
				})
			}

		} else {
			this.setState({
				country: getCountryCode()
			})
			this.getStates(getCountryCode())
		}

		getCountries().then(({ result }) => {
			this.setState({
				countries: result
			})
		})



	}

	getStates(country) {
		getStates(country).then(({ result }) => {
			const sts = result || []
			if (!(result || []).some(c => c.value === this.state.state)) {
				sts.push({ label: this.state.state, value: this.state.state })
			}

			this.setState({
				states: sts
			})
		})
	}

	formRef(c, former) {
		if (former === 'BR') {
			this.brForm = c
		} else {
			this.form = c
		}

		if (this.props.needInitValidate && !this.state.hasValidated) {
			c.validateAll()
			this.setState({
				hasValidated: true
			})
		}
	}

	cpfClickHandle() {
		this.setState({
			showAsk: true,
			askMessage: 'CPF (Cadastro de Pessoa Física), utilizado para tributação, é necessário para todos os produtos enviados ao Brasil, independentemente de encomendas expressas ou contêineres logísticos.Quando preenchemos o conhecimento de embarque e fatura, por favor, não esqueça de preencher o número de contribuinte do destinatário.Na maioria dos casos, sua forma é o número digital como abaixo, XXX.XXX.XXX-XX'
		})
	}


	handleCityFocus(event) {
		const { country, state } = this.state
		if (country && state) {
			this.setState({
				cityFocus: true
			})
			// const key = `${country}#${state}`

			// if (this.state.countryStateCities[key])
			// 	return

			// getCites(country, state).then(data => data.result).then(cities => {
			// 	const newState = { ...this.state.countryStateCities, [key]: cities }
			// 	this.setState({
			// 		countryStateCities: newState
			// 	})
			// })
		}
	}

	handleCityFocusout(event) {
		setTimeout(() => {
			this.setState({
				cityFocus: false
			})
		}, 200)
	}


	handleZipFocus(event) {
		this.setState({
			zipFocus: true
		})
	}

	autoZip(city) {
		const { country, state } = this.state
		if (country && state) {
			const key = `${country}#${state}`
			const cities = this.state.countryStateCities[key]
			const selectedCity = cities.find(c => c.name === city)
			if (selectedCity && selectedCity.zipCodes) {
				this.setState({
					zipCode: selectedCity.zipCodes[0],
					selectedZips: selectedCity.zipCodes
				})
			}
		}
	}

	handleZipFocusout(event) {
		setTimeout(() => {
			this.setState({
				zipFocus: false
			})
		}, 200)
	}

	// bindGoogleAuto(c){
	// 	window.autocomplete = new google.maps.places.Autocomplete(c, {
	// 		componentRestrictions: { country: ["US", "CA"] },
	// 		fields: ["address_components", "geometry"],
	// 		types: ["address"],
	// 	});
	// 	window.autocomplete.addListener("place_changed", function(){
	// 		const place = window.autocomplete.getPlace();
	// 		console.log(place)
	// 	});
	// }

	render() {
		const { intl } = this.props

		const isNormalAddress = ['BR', 'AE', 'SA'].indexOf(this.state.country) < 0

		const isEmailRequired = !(window.__is_login__ || window.token || this.props.ignoreEmail)

		const key = `${this.state.country}#${this.state.state}`
		const listValues = this.state.countryStateCities[key] || []

		return <div>
			<Form style={{ ...this.props.style }} ref={c => { this.formRef(c) }} onSubmit={this.handleSubmit.bind(this)}>
				<FormLayout style={{
					paddingLeft: 12,
					paddingRight: 12,
					backgroundColor: '#fff',
					paddingTop: 15
				}}>
					{
						isEmailRequired && <div style={{ position: 'relative' }}>

							<GInput label="*Email"
								name='email'
								value={this.state.email}
								onChange={this.handleInputChange}
								validations={[required, email]} />

							<div style={{ marginTop: 5 }}>
								<input style={{ verticalAlign: 'middle', WebkitAppearance: 'checkbox' }} type="checkbox" checked={this.state.schecked} onChange={() => { this.setState({ schecked: !this.state.schecked }) }} />
								<span style={{ fontSize: 13, color: '#999', verticalAlign: 'middle' }}><FormattedMessage id="sign_me_up_for" values={{ siteName: window.siteName }} /></span>
							</div>
							<div style={{ position: 'absolute', top: 0, right: 0, fontSize: 12 }}>
								<span style={{ fontSize: 12, color: '#999' }}><FormattedMessage id="already_has_account" /> </span>
								<a style={{ color: '#222' }} href={`${window.ctx}/${
									/*global siteType b:true*/
									/*eslint no-undef: "error"*/
									siteType === 'new' ? 'page' : 'i'
									}/login?redirectUrl=${encodeURIComponent(window.location.href)}&loginPage=1`}><FormattedMessage id="login" /></a>
							</div>
						</div>

					}

					<GInput label={`*${intl.formatMessage({ id: 'full_name' })}`}
						name='name'
						value={this.state.name}
						onChange={this.handleInputChange}
						onFocus={() => { }}
						onBlur={() => { }}
						validations={[required]} />





					<StreetInput label={`*${intl.formatMessage({ id: 'street_address' })}`}
						name='streetAddress1'
						value={this.state.streetAddress1}
						onChange={this.handleInputChange}
						placeholder={intl.formatMessage({ id: 'placeholder_street_address' })}
						country={this.state.country}
						onAuto={
							address => {
								this.setState({
									...address
								})
								if (address.country, address.state) {
									const key = `${address.country}#${address.state}`
									getCites(address.country, address.state).then(data => data.result).then(cities => {
										const newState = { ...this.state.countryStateCities, [key]: cities }
										this.setState({
											countryStateCities: newState
										})
									})
								}

							}
						}
						validations={[required]} />


					{/* <GInput label={`*${intl.formatMessage({ id: 'street_address' })}`}
						name='streetAddress1'
						value={this.state.streetAddress1}
						onChange={this.handleInputChange}
						placeholder={intl.formatMessage({ id: 'placeholder_street_address' })}
						
						validations={[required]} /> */}



					<GInput label={`${intl.formatMessage({ id: 'unit' })}`}
						name='unit'
						value={this.state.unit}
						onFocus={() => { }}
						onBlur={() => { }}
						onChange={this.handleInputChange} />




					<GountrySelect label={`*${intl.formatMessage({ id: 'country' })}`}
						value={this.state.country}
						name='country'
						disabled={this.props.disablecountry}
						placeholder="Country"
						onSelect={(c, s, v, zs) => { this.changeInfo(c, s, v, zs);this.changeCountry(c); }}
						country={this.state.country}
						state={this.state.state}
						city={this.state.city}
						onFocus={() => { }}
						onBlur={() => { }}
						validations={[required]}>
						<option value=''>Country</option>
						{
							this.state.countries && this.state.countries.map(country => (
								<option key={country.value} value={country.value} >{country.label}</option>
							))
						}
					</GountrySelect>


					{
						this.state.states && this.state.states.length > 1 ? (

							<GountrySelect label={`*${intl.formatMessage({ id: 'state' })}`}
								name='state'
								value={this.state.state}
								onChange={this.handleInputChange}
								placeholder="State"
								onSelect={(c, s, v, zs) => { this.changeInfo(c, s, v, zs);this.changeCountry(c); }}
								onFocus={() => { }}
								onBlur={() => { }}
								country={this.state.country}
								state={this.state.state}
								city={this.state.city}
								step={1}
								validations={[required]}>
								<option value=''>State</option>
								{
									this.state.states && this.state.states.map(state => (
										<option key={state.value} value={state.value} >{state.label}</option>
									))
								}
							</GountrySelect>

						) : (
							<GInput label={`${intl.formatMessage({ id: 'state' })}`}
								name='state'
								value={this.state.state}
								onFocus={() => { }}
								onBlur={() => { }}
								onChange={this.handleInputChange} />
						)
					}


					<SelectInput selectHandle={(city) => { this.setState({ city }); this.autoZip(city) }} isActive={this.state.cityFocus} searchValue={this.state.city} listValues={listValues.map(c => c.name)}>
						<GInput label={`*${intl.formatMessage({ id: 'city' })}`}
							name='city'
							value={this.state.city}
							onFocus={this.handleCityFocus.bind(this)}
							onBlur={this.handleCityFocusout.bind(this)}
							onChange={this.handleInputChange}
							validations={[required]} />
					</SelectInput>

					{/* {
						listValues && listValues.length > 0 ? <GountrySelect label={`${intl.formatMessage({ id: 'city' })}`}
							name='city'
							value={this.state.city}
							onChange={this.handleInputChange}
							placeholder="City"
							onSelect={(c, s, v, zs) => { this.changeInfo(c, s, v, zs); }}
							country={this.state.country}
							state={this.state.state}
							city={this.state.city}
							step={2}
							validations={[required]}>
							<option value=''>City</option>
							{
								listValues && listValues.map(c => (
									<option key={c.name} value={c.name} >{c.name}</option>
								))
							}
						</GountrySelect> : <GInput label={`${intl.formatMessage({ id: 'city' })}`}
							name='city'
							value={this.state.city}
							onFocus={() => { }}
							onBlur={() => { }}
							onChange={this.handleInputChange} />
					} */}






					<SelectInput selectHandle={(zipCode) => { this.setState({ zipCode }) }} isActive={this.state.zipFocus} searchValue={this.state.zipCode} listValues={this.state.selectedZips}>
						<GInput label={`*${intl.formatMessage({ id: 'zip_code' })}`}
							name='zipCode'
							value={this.state.zipCode}
							onFocus={this.handleZipFocus.bind(this)}
							onBlur={this.handleZipFocusout.bind(this)}
							onChange={this.handleInputChange}
							validations={[required, zip]} />
					</SelectInput>


					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

						{
							this.state.country === 'AE' && <span style={{ width: 69,flexShrink: 0, display: 'inline-block', paddingTop: 10 }}>UAE +971</span>
						}

						{
							this.state.country === 'SA' && <span style={{ width: 69,flexShrink: 0, display: 'inline-block', paddingTop: 10 }}>KSA +966</span>
						}

						{
							this.state.country === 'BR' && <React.Fragment>
								<span style={{ width: 69, display: 'inline-block',flexShrink: 0, paddingTop: 10 }}>BR +55</span>
								<div style={{ width: 55, display: 'inline-block', flexShrink: 0, paddingRight: 10 }}>
									<GInput
										label="Código"
										name="phoneArea"
										type="number"
										maxLength={2}
										value={this.state.phoneArea}
										onFocus={() => { }}
										onBlur={() => { }}
										onChange={this.handleInputChange}
										validations={[number]} />
								</div>
							</React.Fragment>
						}

						<div style={{ width: `100%` }}>
							<GInput
								label={`*${intl.formatMessage({ id: 'phone_number' })}`}
								name='phoneNumber'
								value={this.state.phoneNumber}
								type="number"
								onFocus={() => { }}
								onBlur={() => { }}
								onChange={this.handleInputChange}
								validations={[required, phone]} />
						</div>
					</div>


					{
						(this.state.country === 'BR' || this.state.country == 'TW' || this.state.country == 'MO' || this.state.country == 'HK') && <GInput
							label={this.state.country === 'BR' ? 'CPF' : `*身份證`}
							name='cpf'
							value={this.state.cpf}
							onFocus={() => { }}
							onBlur={() => { }}
							onChange={this.handleInputChange}
							validations={[required]} />
					}


				</FormLayout>

				<div style={{ marginTop: 60, paddingBottom: 60, paddingLeft: 12, paddingRight: 12 }}>
					<Button className="__submitbtn" ref={c => this.addressButtn = c} ingoredisable="true" style={{
						display: 'block',
						backgroundColor: '#222',
						color: '#fff',
						height: 40,
						lineHeight: '40px',
						textAlign: 'center',
						outline: 'none',
						border: 'none',
						width: '100%',
						fontSize: 16,
						fontFamily: 'AcuminPro-Bold'
					}}>{intl.formatMessage({ id: 'save' })}</Button>
				</div>
			</Form>


			{
				this.state.showAsk && this.state.askMessage && (
					<React.Fragment>
						<Mask />
						<FixedMessage onClose={() => { this.setState({ showAsk: false, askMessage: null }) }}>
							<p dangerouslySetInnerHTML={{ __html: this.state.askMessage }} />
						</FixedMessage>
					</React.Fragment>
				)
			}

		</div>
	}
}

export default injectIntl(AdressForm)
