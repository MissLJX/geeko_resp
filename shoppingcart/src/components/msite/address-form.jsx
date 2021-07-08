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

import { Input as GInput, Select as GSelect, GountrySelect } from './geeko-inputs.jsx'

const getCountryCode = () => {
	return window.__country || 'US'
}

const SELECTINPUT = styled.div`
	position: relative;

	.__listing{
		display: none;
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
		let { searchValue, listValues, isActive } = this.props
		searchValue = searchValue || ''
		let fetchedList = searchValue ? (listValues || []).filter(v => v.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0) : listValues
		return <SELECTINPUT>
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
			country: c,
			state: s,
			city: v,
			selectedZips: zs,
			zipCode: zs && zs.length > 0 ? zs[0] : ''
		})
	}

	changeCountry(value) {
		this.getStates(value)
	}


	handleSubmit(event) {
		event.preventDefault()

		let form, addressButtn

		switch (this.state.country) {
			case 'BR':
				form = this.brForm
				addressButtn = this.brAddressButtn
				break
			case 'AE':
			case 'SA':
				form = this.alForm
				addressButtn = this.alAddressButtn
				break
			default:
				form = this.form
				addressButtn = this.addressButtn
				break
		}

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

		if (!address) {
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
			// }
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
			this.setState({
				states: result
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
			const key = `${country}#${state}`

			if (this.state.countryStateCities[key])
				return

			getCites(country, state).then(data => data.result).then(cities => {
				const newState = { ...this.state.countryStateCities, [key]: cities }
				this.setState({
					countryStateCities: newState
				})
			})
		}
	}

	handleCityFocusout(event) {
		// this.setState({
		// 	cityFocus: false
		// })

		setTimeout(() => {
			this.setState({
				cityFocus: false
			})
		}, 200)
	}


	handleZipFocus(event) {
		// const { country, state, city } = this.state
		// this.setState({
		// 	selectedZips: []
		// })

		// if (country && state) {
		// 	this.setState({
		// 		zipFocus: true
		// 	})
		// 	const key = `${country}#${state}`
		// 	const cities = this.state.countryStateCities[key]
		// 	const selectedCity = cities.find(c => c.name === city)
		// 	if (selectedCity) {
		// 		setTimeout(() => {
		// 			this.setState({
		// 				selectedZips: selectedCity.zipCodes
		// 			})
		// 		}, 0)

		// 	}

		// }




	}

	autoZip(city) {
		// if (!this.state.zipCode && this.state.countryStateCities) {
		// 	const { country, state } = this.state
		// 	if (country && state) {
		// 		const key = `${country}#${state}`
		// 		const cities = this.state.countryStateCities[key]
		// 		const selectedCity = cities.find(c => c.name === city)
		// 		if (selectedCity && selectedCity.zipCodes && selectedCity.zipCodes.length === 1) {
		// 			this.setState({
		// 				zipCode: selectedCity.zipCodes[0],
		// 				selectedZips: selectedCity.zipCodes
		// 			})
		// 		}

		// 	}
		// }
	}

	handleZipFocusout(event) {
		setTimeout(() => {
			this.setState({
				zipFocus: false
			})


			getCityByZip(this.state.country, this.state.zipCode).then(data => data.result).then((result) => {
				if (result) {
					const { country, state, city } = result

					if (country && country.code === this.state.country) {
						if (!this.state.state && state && state.code) {
							this.setState({
								state: state.code
							})
						}

						if (!this.state.city && city && city.name) {
							this.setState({
								city: city.name
							})
						}
					}



				}

			})


		}, 200)
	}

	render() {
		const { intl } = this.props

		const isNormalAddress = ['BR', 'AE', 'SA'].indexOf(this.state.country) < 0

		const isEmailRequired = !(window.__is_login__ || window.token)

		const key = `${this.state.country}#${this.state.state}`
		const listValues = this.state.countryStateCities[key] || []

		return <div>
			<Form style={{ ...this.props.style, display: `${isNormalAddress ? 'block' : 'none'}` }} ref={c => { this.formRef(c) }} onSubmit={this.handleSubmit.bind(this)}>



				<FormLayout >


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
						validations={[required]} />


					<GInput label={`*${intl.formatMessage({ id: 'street_address' })}`}
						name='streetAddress1'
						value={this.state.streetAddress1}
						onChange={this.handleInputChange}
						placeholder={intl.formatMessage({ id: 'placeholder_street_address' })}
						validations={[required]} />

					<GInput label={`${intl.formatMessage({ id: 'unit' })}`}
						name='unit'
						value={this.state.unit}
						placeholder={intl.formatMessage({ id: 'placeholder_unit' })}
						onChange={this.handleInputChange} />




					<GountrySelect label={`*${intl.formatMessage({ id: 'country' })}`}
						value={this.state.country}
						name='country'
						disabled={this.props.disablecountry}
						placeholder="Country"
						onSelect={(c, s, v, zs) => { this.changeInfo(c, s, v, zs); this.changeCountry(c); }}
						country={this.state.country}
						state={this.state.state}
						city={this.state.city}
						validations={[required]}>
						<option value=''>Country</option>
						{
							this.state.countries && this.state.countries.map(country => (
								<option key={country.value} value={country.value} >{country.label}</option>
							))
						}
					</GountrySelect>

					{
						this.state.states && this.state.states.length ? (

							<GountrySelect label={`*${intl.formatMessage({ id: 'state' })}`}
								name='state'
								value={this.state.state}
								onChange={this.handleInputChange}
								placeholder="State"
								onSelect={(c, s, v, zs) => { this.changeInfo(c, s, v, zs); this.changeCountry(c); }}
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

							<GInput label={`*${intl.formatMessage({ id: 'state' })}`}
								name='state'
								value={this.state.state}
								onChange={this.handleInputChange} />
						)
					}



					<SelectInput selectHandle={(city) => { this.setState({ city }); this.autoZip(city) }} isActive={this.state.cityFocus} searchValue={this.state.city} listValues={listValues.map(l => l.name)}>
						<GInput label={`*${intl.formatMessage({ id: 'city' })}`}
							name='city'
							value={this.state.city}
							onFocus={this.handleCityFocus.bind(this)}
							onBlur={this.handleCityFocusout.bind(this)}
							validations={[required]}
							onChange={this.handleInputChange} />
					</SelectInput>



					{
						this.state.selectedZips && this.state.selectedZips.length > 1 ? <GSelect
							label={`*${intl.formatMessage({ id: 'zip_code' })}`}
							name='zipCode'
							value={this.state.zipCode}
							onChange={this.handleInputChange}
							validations={[required, zip]}
						>
							{
								this.state.selectedZips && this.state.selectedZips.map(zc => (
									<option key={zc} value={zc} >{zc}</option>
								))
							}
						</GSelect> : <GInput label={`*${intl.formatMessage({ id: 'zip_code' })}`}
							name='zipCode'
							value={this.state.zipCode}
							onChange={this.handleInputChange}
							validations={[required, zip]} />
					}


					<GInput label={`*${intl.formatMessage({ id: 'phone_number' })}`}
						name='phoneNumber'
						value={this.state.phoneNumber}
						onChange={this.handleInputChange}
						validations={[required, phone]} />

					{
						(this.state.country == 'TW' || this.state.country == 'MO' || this.state.country == 'HK') && <GInput label={`*身份證`}
							name='cpf'
							value={this.state.cpf}
							onChange={this.handleInputChange}
							validations={[required]} />
					}


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
						}}>{intl.formatMessage({ id: 'submit' })}</Button>
					</div>
				</FormLayout>
			</Form>

			<Form style={{ ...this.props.style, display: `${this.state.country === 'BR' ? 'block' : 'none'}` }} ref={c => { this.formRef(c, 'BR') }} onSubmit={this.handleSubmit.bind(this)}>
				<FormLayout>







					{
						isEmailRequired && <div style={{ position: 'relative' }}>
							<StyledControl>
								<label>
									{intl.formatMessage({ id: 'email' })}*
								</label>
								<Input
									name='email'
									value={this.state.email}
									onChange={this.handleInputChange}
									validations={[required, email]} />
							</StyledControl>
							<div style={{ marginTop: 5 }}>
								<input style={{ verticalAlign: 'middle', WebkitAppearance: 'checkbox' }} type="checkbox" checked={this.state.schecked} onChange={() => { this.setState({ schecked: !this.state.schecked }) }} />
								<span style={{ fontSize: 13, color: '#999', verticalAlign: 'middle' }}><FormattedMessage id="sign_me_up_for" values={{ siteName: window.siteName }} /></span>
							</div>
							<div style={{ position: 'absolute', top: 0, right: 0, fontSize: 12 }}>
								<span style={{ fontSize: 12, color: '#999' }}>Already have an account? </span>
								<a style={{ color: '#222' }} href={`${window.ctx}/${
									/*global siteType b:true*/
									/*eslint no-undef: "error"*/
									siteType === 'new' ? 'page' : 'i'
									}/login?redirectUrl=${encodeURIComponent(window.location.href)}&loginPage=1`}>Login</a>
							</div>
						</div>

					}

					<StyledControl>
						<label>
							{intl.formatMessage({ id: 'country' })}*
						</label>
						<Select
							className="x-select"
							value={this.state.country}
							name='country'
							disabled={this.props.disablecountry}
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
							{intl.formatMessage({ id: 'full_name' })}*
						</label>
						<Input
							name='name'
							value={this.state.name}
							onChange={this.handleInputChange}
							validations={[required]} />
					</StyledControl>

					<StyledControl>
						<label>
							{intl.formatMessage({ id: 'street_address' })}*
						</label>
						<Input
							name='streetAddress1'
							value={this.state.streetAddress1}
							onChange={this.handleInputChange}
							placeholder={intl.formatMessage({ id: 'placeholder_street_address' })}
							validations={[required]} />
					</StyledControl>

					<StyledControl>
						<label>
							{intl.formatMessage({ id: 'unit' })}
						</label>
						<Input
							name='unit'
							value={this.state.unit}
							placeholder={intl.formatMessage({ id: 'placeholder_unit' })}
							onChange={this.handleInputChange} />
					</StyledControl>

					<MultiControl>
						<StyledControl>
							<label>
								{intl.formatMessage({ id: 'state' })}
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
										onChange={this.handleInputChange} />
								)
							}

						</StyledControl>

						<StyledControl>
							<label>
								{intl.formatMessage({ id: 'city' })}*
							</label>
							<Input
								name='city'
								value={this.state.city}
								validations={[required]}
								onChange={this.handleInputChange} />
						</StyledControl>


					</MultiControl>





					<StyledControl>
						<label>
							{intl.formatMessage({ id: 'zip_code' })}*
						</label>
						<Input
							name='zipCode'
							value={this.state.zipCode}
							onChange={this.handleInputChange}
							validations={[required, zip]} />
					</StyledControl>

					<StyledControl>
						<label>
							{intl.formatMessage({ id: 'phone_number' })}*
						</label>

						<div>
							<span style={{ width: 59, display: 'inline-block' }}>BR +55</span>
							<Input
								divStyle={{ width: 55, marginRight: 10, display: 'inline-block' }}
								style={{ paddingLeft: 0, textAlign: 'center' }}
								name="phoneArea"
								placeholder="Código"
								type="number"
								maxLength={2}
								value={this.state.phoneArea}
								onChange={this.handleInputChange}
								validations={[number]} />

							<Input
								name='phoneNumber'
								divStyle={{ width: 'calc(100% - 124px)', display: 'inline-block', verticalAlign: 'top' }}
								value={this.state.phoneNumber}
								type="number"
								onChange={this.handleInputChange}
								validations={[required, phone]} />
						</div>

					</StyledControl>

					<StyledControl>
						<label>
							CPF* <Ask style={{ marginLeft: 4 }} onClick={this.cpfClickHandle.bind(this)} />
						</label>
						<Input
							name='cpf'
							value={this.state.cpf}
							onChange={this.handleInputChange}
							validations={[required, cpf]} />
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
						}}>{intl.formatMessage({ id: 'submit' })}</Button>
					</div>
				</FormLayout>
			</Form>

			<Form style={{ ...this.props.style, display: `${this.state.country === 'AE' || this.state.country === 'SA' ? 'block' : 'none'}` }} ref={c => { this.alForm = c }} onSubmit={this.handleSubmit.bind(this)}>
				<FormLayout>







					{
						isEmailRequired && <div style={{ position: 'relative' }}>
							<StyledControl>
								<label>
									{intl.formatMessage({ id: 'email' })}*
								</label>
								<Input
									name='email'
									value={this.state.email}
									onChange={this.handleInputChange}
									validations={[required, email]} />
							</StyledControl>
							<div style={{ marginTop: 5 }}>
								<input style={{ verticalAlign: 'middle', WebkitAppearance: 'checkbox' }} type="checkbox" checked={this.state.schecked} onChange={() => { this.setState({ schecked: !this.state.schecked }) }} />
								<span style={{ fontSize: 13, color: '#999', verticalAlign: 'middle' }}><FormattedMessage id="sign_me_up_for" values={{ siteName: window.siteName }} /></span>
							</div>
							<div style={{ position: 'absolute', top: 0, right: 0, fontSize: 12 }}>
								<span style={{ fontSize: 12, color: '#999' }}>Already have an account? </span>
								<a style={{ color: '#222' }} href={`${window.ctx}/${
									/*global siteType b:true*/
									/*eslint no-undef: "error"*/
									siteType === 'new' ? 'page' : 'i'
									}/login?redirectUrl=${encodeURIComponent(window.location.href)}&loginPage=1`}>Login</a>
							</div>
						</div>

					}

					<StyledControl>
						<label>
							{intl.formatMessage({ id: 'country' })}*
						</label>
						<Select
							className="x-select"
							value={this.state.country}
							disabled={this.props.disablecountry}
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
							{intl.formatMessage({ id: 'full_name' })}*
						</label>
						<Input
							name='name'
							value={this.state.name}
							onChange={this.handleInputChange}
							validations={[required]} />
					</StyledControl>

					<StyledControl>
						<label>
							{intl.formatMessage({ id: 'street_address' })}*
						</label>
						<Input
							name='streetAddress1'
							value={this.state.streetAddress1}
							onChange={this.handleInputChange}
							placeholder={intl.formatMessage({ id: 'placeholder_street_address' })}
							validations={[required]} />
					</StyledControl>

					<StyledControl>
						<label>
							{intl.formatMessage({ id: 'unit' })}
						</label>
						<Input
							name='unit'
							value={this.state.unit}
							placeholder={intl.formatMessage({ id: 'placeholder_unit' })}
							onChange={this.handleInputChange} />
					</StyledControl>

					<MultiControl>
						<StyledControl>
							<label>
								{intl.formatMessage({ id: 'state' })}
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
										onChange={this.handleInputChange} />
								)
							}

						</StyledControl>

						<StyledControl>
							<label>
								{intl.formatMessage({ id: 'city' })}*
							</label>
							<Input
								name='city'
								value={this.state.city}
								validations={[required]}
								onChange={this.handleInputChange} />
						</StyledControl>


					</MultiControl>




					<StyledControl>
						<label>
							{intl.formatMessage({ id: 'zip_code' })}*
						</label>
						<Input
							name='zipCode'
							value={this.state.zipCode}
							onChange={this.handleInputChange}
							validations={[required, zip]} />
					</StyledControl>

					<StyledControl>
						<label>
							{intl.formatMessage({ id: 'phone_number' })}*
						</label>

						<div>
							{
								this.state.country === 'AE' && <span style={{ width: 69, display: 'inline-block', paddingTop: 10 }}>UAE +971</span>
							}

							{
								this.state.country === 'SA' && <span style={{ width: 69, display: 'inline-block', paddingTop: 10 }}>KSA +966</span>
							}

							<Input
								name='phoneNumber'
								divStyle={{ width: 'calc(100% - 79px)', display: 'inline-block', verticalAlign: 'top' }}
								value={this.state.phoneNumber}
								type="number"
								onChange={this.handleInputChange}
								validations={[required, phone]} />
						</div>

					</StyledControl>

					<div>
						<Button className="__submitbtn" ref={c => this.alAddressButtn = c} ingoredisable="true" style={{
							display: 'block',
							backgroundColor: '#222',
							color: '#fff',
							height: 40,
							lineHeight: '40px',
							textAlign: 'center',
							outline: 'none',
							border: 'none',
							width: '100%'
						}}>{intl.formatMessage({ id: 'submit' })}</Button>
					</div>
				</FormLayout>
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
