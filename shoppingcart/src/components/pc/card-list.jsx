import React from 'react'
import styled from 'styled-components'
import {FormattedMessage, injectIntl} from 'react-intl'
import CheckBox from '../checkbox.jsx'
import Icon from '../icon.jsx'

import {Form, Input, Select, Button} from './control.jsx'
import {required, email, zip, phone, getDNI} from '../validator.jsx'

import {MutiElement, FormElement} from './styled-control.jsx'
import {Red} from '../text.jsx'
import {unitprice} from '../../utils/utils.js'
import { getDInstallments } from '../../api'

const LABELICON = styled.span`
	color: #666;
	cursor: pointer;
	& > span{
		vertical-align: middle;
		margin-left: 4px;
		&:first-child{
			margin-left: 0;
		}
	}

	&.disabled{
		cursor: not-allowed;
	}
`

const CARDPLUGIN = styled.div`
	background-color: #eee;
	padding: 15px 28px;
	position: relative;
	&::before{
			content: '';
			display: inline-block;
			width: 10px;
			height: 10px;
			transform: rotate(-45deg);
			background-color: #eee;
			top: -5px;
			left: 50px;
			position: absolute;
	}
`

const CARD = styled.div`
	
	.__title{
		color:#222;
	}

	.__deleteicon{
		display: none;
	}

	& > .__card{
		height: 60px;
		& > div:nth-child(1){
			width: 28px;
		}

		& > div:nth-child(3){
			text-align: right;
			width: 200px;
		}


	}

	&:hover{
		.__deleteicon{
			display: inline-block;
		}

		.__title{
			color:#666;
		}
	}
`

const CARDS = styled.ul`

`

const __CVVCSS__ =  {
	base: {
		fontSize: '15px',
		fontFamily: '"Open Sans", sans-serif',
		lineHeight: '35px',
		fontSmoothing: 'antialiased',
		fontWeight: '500',
		'::placeholder': {
			color: '#B8BBC0'
		}
	},
	focus: {
		'::placeholder': {
			color: '#666'
		}
	}
}

const getBin = (cardNumber) => cardNumber.replace(/[ .-]/g, '').slice(0, 6)

const MercadoPlugin = class extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			payer_costs: [

			]
		}
	}

	componentDidMount () {
		this.setMercadoInstallments(this.props.card.quickpayRecord.cardNumber)
	}

	componentWillReceiveProps (newProps) {
		// if (newProps.card.quickpayRecord.quickpayId !== this.props.card.quickpayRecord.quickpayId) {
		//   this.setMercadoInstallments(newProps.card.quickpayRecord.cardNumber)
		// }
	}

	setMercadoInstallments (cardNumber) {
		const {orderTotal} = this.props
		const bin = getBin(cardNumber)
		/*global Mercadopago b:true*/
		/*eslint no-undef: "error"*/
		Mercadopago.getInstallments({bin, amount: orderTotal.amount}, (status, response) => {
			if (status != 200 && status != 201) {
				alert('Get installments failed!')
				return
			}
			this.setState({
				payer_costs: response[0].payer_costs
			})
		})
	}

	render () {
		return <CARDPLUGIN>
			<Form id="mercadoform" ref={this.props.mercadoref} onSubmit={this.props.handleMercado}>
				<input type="hidden" value={this.props.card.quickpayRecord.quickpayId} name="cardId" data-checkout="cardId"/>

				<MutiElement>
					<FormElement label="Security Code" className="__required">
						<Input style={{width: '100%', height: 35}} name="securityCode"
							data-checkout="securityCode"
							value={this.props.securityCode}
							validations={[required]}
							placeholder="CVC2/CVV2"
							onChange={this.props.handleInputChange}/>
					</FormElement>

					<FormElement label="Installments" className="__required">
						<Select className="x-select" style={{width: '100%', height: 35, backgroundColor: '#fff'}} name="mercado-installments"
							value={this.props.installments}
							validations={[required]}
							onChange={this.props.handleInputChange}>
							{

								this.state.payer_costs && this.state.payer_costs.length > 0 ? (
									this.state.payer_costs.map(({installments, recommended_message}) => (
										<option key={installments} value={installments}>
											{recommended_message}
										</option>
									))

								) : (

									<option key={1} value={1}>{`1 mensualidad de ${unitprice(this.props.orderTotal)} (${unitprice(this.props.orderTotal)})`}</option>
								)

							}
						</Select>
					</FormElement>
				</MutiElement>
			</Form>
		</CARDPLUGIN>
	}
}

const DLocalPlugin = class extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			payer_costs: [

			]
		}
	}
	
	cvvRef(c) {
		this.cvvHolder = c
		if(this.cvvHolder && !this.cvvField){
			this.cvvField = this.fields.create('cvv-only', {
				style: __CVVCSS__
			})
			this.cvvField.mount(this.cvvHolder)
			this.props.cvvRef(this.cvvField)
		}
	}

	componentWillMount () {
		const { country } = this.props
		/*global dlocal b:true*/
		/*eslint no-undef: "error"*/
		this.fields = window.__dlocal.fields({
			locale: window.lang,
			country: country
		})
	}

	componentDidMount () {
		const { orderTotal, country } = this.props
		getDInstallments({...orderTotal, country: country, payMethod: '24'}).then(({result}) => {
			if (result) {
				const { installments } = result
				if (installments) {
					this.setState({
						payer_costs: installments
					})
				}
			}
		})
	}

	getLabel (payMethod) {
		switch (payMethod) {
		case '26':
			return 'DNI / CUIT'
		case '32':
			return 'Cédula de ciudadanía'
		case '33':
			return 'CI/RUT'
		case '36':
			return 'Cédula de identidad'
		case '39':
			return 'CURP'
		case '42':
			return 'DNI'
		default:
			return 'Document'
		}
	}

	render () {
		const { card, orderTotal, dlocalerror, document, intl, documentRef, documentBtn } = this.props

		const _dni = getDNI(card.quickpayRecord.payMethod)

		return <CARDPLUGIN>

			{
				this.state.payer_costs && this.state.payer_costs.length > 0 && <Form id="dlocalform" ref={documentRef}>
					<MutiElement>
						<FormElement label={intl.formatMessage({id: 'installments'})} className="__required">
							<Select className="x-select" style={{width: '100%', height: 35, backgroundColor: '#fff'}} name="installments"
								value={this.props.installments}
								validations={[required]}
								onChange={this.props.handleInputChange}>
								{
									this.state.payer_costs.map((plan) => (
										<option key={plan.id} value={plan.installments}>
											{`${plan.installments} of ${orderTotal.currency} ${plan.installment_amount} (Total: ${orderTotal.currency} ${plan.total_amount})`}
										</option>
									))
								}
							</Select>
						</FormElement>

						{
							card.quickpayRecord.payMethod === '24' ? <FormElement/> : <FormElement label={this.getLabel(card.quickpayRecord.payMethod)} className="__required">
								<Input style={{width: '100%', height: 35}} name="document"
									value={document}
									validations={[required, _dni]}
									onChange={this.props.handleInputChange}/>
							</FormElement>
						}
						
						

					</MutiElement>

					<MutiElement style={{marginTop: 15}}>
						<FormElement label="CVV / CVV2" className="__required">
							<div ref={ this.cvvRef.bind(this) } style={{border:'1px solid #cacaca', paddingLeft: 10, backgroundColor: '#fff'}}></div>
							{
								dlocalerror && <div style={{fontSize: 12, marginTop:5}}><Red>{dlocalerror}</Red></div>
							}
						</FormElement>
						<FormElement/>
					</MutiElement>
					<Button style={{display: 'none'}} ref={documentBtn}></Button>
				</Form>
			}

		</CARDPLUGIN>
	}
}

const I18DLocalPlugin = injectIntl(DLocalPlugin)

const getPlugin = props => {
	switch (props.card.quickpayRecord.payMethod) {
	case '19':
		return <MercadoPlugin { ...props }/>
	case '24':
	case '26':
	case '32':
	case '33':
	case '36':
	case '39':
	case '42':
		return <I18DLocalPlugin {...props}/>
	default:
		return null
	}
}

const Card = (props) => <CARD>
	<div className="__card x-table __vm x-fw __fixed" >
		<div className="x-cell">
			<CheckBox onClick={ (evt) => { props.selectCardHandle(evt, props.card) } } className={`${props.card.isSelected ? 'selected' : ''}`}/>
		</div>
		<div className="x-cell">
			<span className="__title">
				<FormattedMessage id="card_no"/>
				<span>{ props.card.quickpayRecord.cardNumber }</span>
			</span>
		</div>
		<div className="x-cell __right">
			<LABELICON className="__deleteicon" onClick={ (evt) => { props.deleteCardHandle(evt, props.card) }}>
				<Icon>&#xe629;</Icon>
				<span>Delete</span>
			</LABELICON>
		</div>
	</div>
	{
		props.card.isSelected && getPlugin(props)
	}

</CARD>

export default (props) => {
	const {cards, selectHandle} = props
	return <CARDS>
		{ cards && cards.length > 0 && cards.map(card => (
			<li key={card.quickpayRecord.id}>
				<Card card={card} {...props}/>
			</li>
		))}
	</CARDS>
}
