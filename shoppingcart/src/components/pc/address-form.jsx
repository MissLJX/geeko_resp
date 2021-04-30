import React from 'react'
import styled from 'styled-components'
import {Form, Input, Select, Button} from './control.jsx'
import {required, email, zip, phone, number, cpf} from '../validator.jsx'
import {FormElement, MutiElement, ELEMENTS} from './styled-control.jsx'
import {injectIntl, FormattedMessage} from 'react-intl'
import {getCountries, getStates, getCites, getCityByZip} from '../../api'
import CheckBox from '../checkbox.jsx'
import {BigButton} from '../msite/buttons.jsx'
import { storage } from '../../utils/utils'

const __Cpf_Tip_Message__ = 'CPF (Cadastro de Pessoa Física), utilizado para tributação, é necessário para todos os produtos enviados ao Brasil, independentemente de encomendas expressas ou contêineres logísticos.Quando preenchemos o conhecimento de embarque e fatura, por favor, não esqueça de preencher o número de contribuinte do destinatário.Na maioria dos casos, sua forma é o número digital como abaixo, XXX.XXX.XXX-XX'

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
		top: 40px;
		width: 100%;
		max-height: 300px;
		overflow: auto;
		background-color: #fff;
		z-index: 2;
		
		ul{
			border-left: solid 1px #cacaca;
			border-bottom: solid 1px #cacaca;
			border-right: solid 1px #cacaca;
			& > li{
				line-height: 25px;
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

const SelectInput = class extends React.Component{
	constructor(props){
		super(props)

	}


	render(){
		let { searchValue, listValues, isActive } = this.props
		searchValue = searchValue||''
		let fetchedList = searchValue?(listValues||[]).filter( v => v.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0):listValues
		return <SELECTINPUT>
			<div>
				{this.props.children}
			</div>
			<div className={`__listing ${isActive? 'active': ''}`}>
				{
					fetchedList && fetchedList.length> 0 && <ul>
						{
							
							fetchedList.map( (value, i) => <li key={i} city={value} onClick={ () => this.props.selectHandle(value) }>
								<span dangerouslySetInnerHTML={{__html: value.replace(searchValue, `<b>${searchValue}</b>`)}}/>
							</li>)
						}
					</ul>
				}
				
			</div>
		</SELECTINPUT>
	}
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
			phoneArea: '',
			cpf: '',
			email: '',
			hasValidated: false,
			schecked: true,
			countryStateCities: {},
			cityFocus: false,
			zipFocus: false,
			selectedZips:[]
		}
		this.handleInputChange = this.handleInputChange.bind(this)
		this.autoZip = this.autoZip.bind(this)
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

	handleCityFocus(event){
		const {country, state} = this.state
		

		if(country && state){
			this.setState({
				cityFocus: true
			})
			const key = `${country}#${state}`

			if(this.state.countryStateCities[key])
				return

			getCites(country, state).then(data => data.result).then(cities => {
				const newState = {...this.state.countryStateCities, [key]: cities}
				this.setState({
					countryStateCities: newState
				})
			})
		}

		


	}

	handleCityFocusout(event){
		// this.setState({
		// 	cityFocus: false
		// })

		setTimeout( () => {
			this.setState({
				cityFocus: false
			})
		}, 400)
	}


	handleZipFocus(event){
		const {country, state, city} = this.state
		this.setState({
			selectedZips: []
		})

		if(country && state){
			this.setState({
				zipFocus: true
			})
			const key = `${country}#${state}`
			const cities = this.state.countryStateCities[key]
			const selectedCity = cities.find( c => c.name === city)
			if(selectedCity){
				setTimeout(()=>{
					this.setState({
						selectedZips: selectedCity.zipCodes
					})
				}, 0)
				
			}

		}

		


	}

	autoZip(city){
		if(!this.state.zipCode && this.state.countryStateCities){
			const {country, state} = this.state
			this.setState({
				selectedZips: []
			})

			if(country && state){
				const key = `${country}#${state}`
				const cities = this.state.countryStateCities[key]
				const selectedCity = cities.find( c => c.name === city)
				if(selectedCity && selectedCity.zipCodes && selectedCity.zipCodes.length === 1){
					setTimeout(()=>{
						this.setState({
							zipCode: selectedCity.zipCodes[0]
						})
					}, 0)
				}

			}
		}
	}

	handleZipFocusout(event){
		setTimeout( () => {
			this.setState({
				zipFocus: false
			})


			getCityByZip(this.state.country, this.state.zipCode).then(data => data.result).then((result) => {
				if(result){
					const {country, state, city} = result

					if(country && country.code === this.state.country){
						if(!this.state.state && state && state.code){
							this.setState({
								state: state.code
							})
						}
	
						if(!this.state.city && city && city.name){
							this.setState({
								city: city.name
							})
						}
					}

					

				}
				
			})


		}, 400)
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
				email:(email || '').trim()
			})

			storage.add('shippingDetail', {
				name,
				streetAddress1,
				unit,
				city,
				zipCode,
				state: {value: state},
				country: {value: country},
				phoneNumber,
				defaultAddress,
				phoneArea,
				cpf,
				email
			}, 30*24*60*60)
      
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


		if(!address){
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

	formRef (c, former) {
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

	render () {
		const { intl, isNew, isConfirm } = this.props

		const divStyle = (this.state.country === 'AE' || this.state.country === 'SA') ? {width: 'calc(100% - 79px)', marginLeft: 10, display: 'inline-block', verticalAlign: 'middle'} : {}

		const isEmailRequired = !(window.__is_login__ || window.token)

		const key = `${this.state.country}#${this.state.state}`

		const listValues = this.state.countryStateCities[key] || []
    
		return <div>
			<Form ref={ c => { this.formRef(c) } } style={{display: `${this.state.country !== 'BR' ? 'block' : 'none'}`}} onSubmit={this.handleSubmit.bind(this)}>
				<ELEMENTS>

					

						

						

					{
						isEmailRequired && <div style={{position:'relative'}}>
							<div style={{textAlign: 'right', position: 'absolute', right: 0, top: 0}}>
								<span style={{fontSize:14, color:'#999'}}><FormattedMessage id="already_has_account"/> </span>
								<a style={{color: '#222'}} href={`${window.ctx}/${
									/*global siteType b:true*/
									/*eslint no-undef: "error"*/
									siteType === 'new' ? 'page' : 'i'
								}/login?redirectUrl=${encodeURIComponent(window.location.href)}`}><FormattedMessage id="login"/></a>
							</div>
							<FormElement label={`${intl.formatMessage({id: 'email'})}:`} className="__required">
								<Input
									name='email'
									style= {{width: '100%', height: 40}}
									value={this.state.email}
									onChange={this.handleInputChange}
									validations={[required, email]}/>
							</FormElement>

							<div style={{ marginTop: 5 }}>
								<input style={{verticalAlign:'middle'}} type="checkbox" checked={ this.state.schecked } onChange={ () => { this.setState({ schecked: !this.state.schecked }) } }/>
								<FormattedMessage style={{fontSize:13, color: '#999', verticalAlign:'middle'}} id="sign_me_up_for" values={{siteName: window.siteName}}/>
							</div>

							

						</div>
					}

					<FormElement label={`${intl.formatMessage({id: 'country'})}:`} className="__required">
						<Select
							className="x-select"
							value={this.state.country}
							name='country'
							disabled={this.props.disablecountry}
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
							placeholder={intl.formatMessage({id: 'placeholder_street_address'})}
							validations={[required]}/>
					</FormElement>

					<FormElement label={`${intl.formatMessage({id: 'unit'})}:`}>
						<Input
							name='unit'
							style= {{width: '100%', height: 40}}
							value={this.state.unit}
							placeholder={intl.formatMessage({id: 'placeholder_unit'})}
							onChange={this.handleInputChange}/>
					</FormElement>
					<MutiElement>
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
						<FormElement label={`${intl.formatMessage({id: 'city'})}:`} className="__required">
							<SelectInput selectHandle={ (city) =>  { this.setState({city}); this.autoZip(city)} } isActive={ this.state.cityFocus } searchValue={this.state.city} listValues={ listValues.map(l => l.name ) }>
								
								<Input
									autocomplete="off"
									name='city'
									style= {{width: '100%', height: 40}}
									value={this.state.city}
									onChange={this.handleInputChange}
									onFocus={this.handleCityFocus.bind(this)}
									onBlur={this.handleCityFocusout.bind(this)}
									validations={[required]}/>
							</SelectInput>
							
						</FormElement>

					</MutiElement>

					

					

					<MutiElement>
						<FormElement label={`${intl.formatMessage({id: 'zip_code'})}:`} className="__required">

							<SelectInput selectHandle={ (zipCode) =>  { this.setState({zipCode})} } isActive={ this.state.zipFocus } searchValue={this.state.zipCode} listValues={ this.state.selectedZips }>
								<Input
									name='zipCode'
									style= {{width: '100%', height: 40}}
									value={this.state.zipCode}
									onChange={this.handleInputChange}
									onFocus={this.handleZipFocus.bind(this)}
									onBlur={this.handleZipFocusout.bind(this)}
									validations={[required, zip]}/>
							
							</SelectInput>


							
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


					{
						(this.state.country == 'TW' || this.state.country == 'MO' || this.state.country == 'HK') && <FormElement label={'身份證'} className="__required">
							<Input
								name="cpf"
								value={this.state.cpf}
								onChange={this.handleInputChange}
								style= {{width: '100%', height: 40}}
								validations={[required]}/>
						</FormElement>
					}

					

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

			<Form style={{display: `${this.state.country === 'BR' ? 'block' : 'none'}`}} ref={ c => { this.formRef(c, 'BR') } } onSubmit={this.handleSubmit.bind(this)}>
				<ELEMENTS>

					

						

						

					{
						isEmailRequired && <div style={{position:'relative'}}>
							<div style={{textAlign: 'right', position: 'absolute', right: 0, top: 0}}>
								<span style={{fontSize:14, color:'#999'}}>Already have an account? </span>
								<a style={{color: '#222'}} href={`${window.ctx}/${
									/*global siteType b:true*/
									/*eslint no-undef: "error"*/
									siteType === 'new' ? 'page' : 'i'
								}/login?redirectUrl=${encodeURIComponent(window.location.href)}`}>Login</a>
							</div>
							<FormElement label={`${intl.formatMessage({id: 'email'})}:`} className="__required">
								<Input
									name='email'
									style= {{width: '100%', height: 40}}
									value={this.state.email}
									onChange={this.handleInputChange}
									validations={[required, email]}/>
							</FormElement>

							<div style={{ marginTop: 5 }}>
								<input style={{verticalAlign:'middle'}} type="checkbox" checked={ this.state.schecked } onChange={ () => { this.setState({ schecked: !this.state.schecked }) } }/>
								<FormattedMessage style={{fontSize:13, color: '#999', verticalAlign:'middle'}} id="sign_me_up_for" values={{siteName: window.siteName}}/>
							</div>

							

						</div>
					}

					<FormElement label={`${intl.formatMessage({id: 'country'})}:`} className="__required">
						<Select
							className="x-select"
							value={this.state.country}
							name='country'
							style= {{width: '100%', height: 40}}
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
					</FormElement>

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
							placeholder={intl.formatMessage({id: 'placeholder_street_address'})}
							validations={[required]}/>
					</FormElement>

					<FormElement label={`${intl.formatMessage({id: 'unit'})}:`}>
						<Input
							name='unit'
							style= {{width: '100%', height: 40}}
							value={this.state.unit}
							placeholder={intl.formatMessage({id: 'placeholder_unit'})}
							onChange={this.handleInputChange}/>
					</FormElement>

					<MutiElement>
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

						<FormElement label={`${intl.formatMessage({id: 'city'})}:`} className="__required">
							<Input
								name='city'
								style= {{width: '100%', height: 40}}
								value={this.state.city}
								onChange={this.handleInputChange}
								validations={[required]}/>
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

					<FormElement label={'CPF'} className="__required" tipMessage={__Cpf_Tip_Message__}>
						<Input
							name="cpf"
							value={this.state.cpf}
							onChange={this.handleInputChange}
							style= {{width: '100%', height: 40}}
							validations={[required, cpf]}/>
					</FormElement>

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
