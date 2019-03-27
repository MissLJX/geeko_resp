import React from 'react'
import styled from 'styled-components'
import Icon from '../icon.jsx'
import Ask from '../ask.jsx'
import {Red, Grey} from '../text.jsx'
import Money from '../money.jsx'
import {BigButton} from './buttons.jsx'

import {Form, Input, Select, Button} from './control.jsx'
import {required, cpf, getDNI, cvv} from '../validator.jsx'
import {StyledControl} from './styled-control.jsx'
import {injectIntl, FormattedMessage} from 'react-intl'

import {unitprice} from '../../utils/utils.js'

import CheckBox from '../checkbox.jsx'

import { getDInstallments } from '../../api'

const HD = styled.div`
	height: 50px; 
	line-height: 50px;
	border-bottom: 1px solid #e5e5e5;
	padding-left: 10px;
	position: relative;
	background-color: #fff;
	h1{
		font-size: 18px;
		font-weight: 400;
	}

	& > span{
		position: absolute;
		right: 10px;
		font-size: 20px;
		top: 0;

	}
`

const BD = styled.div`
	position: relative;
	height: 400px;
`

const CREDITWRAPPER = styled.div`
	background-color: #efefef;
	
	position: fixed;
	z-index: 5;
	bottom: 0;
	width: 100%;
`

const StyledCard = styled.div`
	height: 50px;
	cursor: pointer;
	padding-left:10px;
	padding-right:10px;
	background-color:#fff;
`

const Cards = styled.ul`
	& > li{
		border-top: 1px solid #e5e5e5;
		&:first-child{
			border-top: none;
		}
	}
`

const AddIcon = styled.span`
	width: 22px;
	height: 22px;
	background-color: #999;
	border-radius: 50%;
	font-size: 14px;
	display: inline-block;
	cursor: pointer;
	color: #fff;
	text-align: center;
	line-height: 22px;
`

const NewCardBtn = styled.div`
	width: 240px;
	height: 36px;
	border-radius: 1px;
	border: solid 1px #666666;
	color: #222222;
	font-size: 15px;
	line-height: 34px;
	cursor: pointer;
	&:active{
		border-color: #222;
	}
	text-align: center;
	margin: 16px auto;
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

const Card = props => <StyledCard>
	<div onClick={() => { props.cardSelect(props.card) }} className="x-table __fixed __vm x-fw x-fh">
		<div className="x-cell"><span>Card No.</span> { props.card.quickpayRecord.cardNumber }</div>
		<div className="x-cell __right" style={{width: 30}}>
			<CheckBox className={`${props.card.isSelected ? 'selected' : ''}`}/>
		</div>
	</div>
</StyledCard>

const CurrentCard = props => <StyledCard {...props}>
	<div className="x-table __fixed __vm x-fw x-fh">
		<div className="x-cell"><span>Card No.</span> { props.card.quickpayRecord.cardNumber }</div>
		<div className="x-cell __right" style={{width: 30}}>
			<Icon>&#xe694;</Icon>
		</div>
	</div>
</StyledCard>

const NewCard = props => <StyledCard {...props}>
	<div className="x-table __fixed __vm x-fw x-fh">
		<div className="x-cell">Add a new card</div>
		<div className="x-cell __right" style={{width: 30}}>
			<AddIcon className="iconfont">&#xe733;</AddIcon>
		</div>
	</div>
</StyledCard>

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
		return <div style={{paddingLeft: 10, paddingRight: 10}}>
			<Form id="mercadoform" ref={this.props.mercadoref} onSubmit={this.props.handleMercado}>
				<input type="hidden" value={this.props.card.quickpayRecord.quickpayId} name="cardId" data-checkout="cardId"/>
				<StyledControl style={{marginTop: 10}}>
					<label>Security Code</label>
					<Input name="securityCode"
						data-checkout="securityCode"
						value={this.props.securityCode}
						validations={[required]}
						placeholder="CVC2/CVV2"
						onChange={this.props.handleInputChange}/>
				</StyledControl>

				<StyledControl style={{marginTop: 10}}>
					<label>Installments</label>
					<Select className="x-select" name="mercado-installments"
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
				</StyledControl>

			</Form>
		</div>
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
		const { orderTotal, country, payMethod } = this.props
		getDInstallments({...orderTotal, country: country, payMethod}).then(({result}) => {
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
		const { orderTotal, payMethod, dlocalerror } = this.props

		const _dni = getDNI(payMethod)

		return <Form ref={this.props.dlocalref} style={{marginTop: 10, paddingLeft: 10, paddingRight: 10}}>
			{
				this.state.payer_costs && this.state.payer_costs.length > 0 && <StyledControl>
					<label>Installments</label>
					<Select name="installments" value={this.props.installments}
						onChange={this.props.handleInputChange}>
						{
							this.state.payer_costs.map((plan) => (
								<option key={plan.id} value={plan.installments}>
									{`${plan.installments} of ${orderTotal.currency} ${plan.installment_amount} (Total: ${orderTotal.currency} ${plan.total_amount})`}
								</option>
							))
						}
					</Select>
				</StyledControl>

			}

			

			{
				(payMethod !== '24') && <StyledControl style={{marginTop: 10}}>
					<label>{this.getLabel(payMethod)}</label>
					<Input name="document"
						value={this.props.document}
						validations={[required, _dni]}
						onChange={this.props.handleInputChange}/>

				</StyledControl>
			}

			<StyledControl style={{marginTop: 10}}>
				<label>CVV / CVV2</label>
				<div ref={ this.cvvRef.bind(this) } style={{border:'1px solid #666', paddingLeft: 10}}></div>
				{
					dlocalerror && <div style={{fontSize: 12, marginTop:5}}><Red>{dlocalerror}</Red></div>
				}
			</StyledControl>



			<Button style={{display: 'none'}} ref={this.props.dlocalbtn}></Button>

		</Form>
	}
}

const BraizlPlugin = class extends React.Component {
	constructor (props) {
		super(props)
	}
	render () {
		const {installmentoptions} = this.props

		return <div style={{marginTop: 10, paddingLeft: 10, paddingRight: 10}}>
			<Form id="brazilform" onSubmit={this.props.handleBrazil} ref={this.props.brazilForm}>
				<div className="x-table x-fw __fixed __vm">
					<div className="x-cell" style={{width: 95}}>
						<span>CPF</span>
						<Ask style={{marginLeft: 4}} onClick={this.props.cpfClickHandle.bind(this)}/>
					</div>
					<div className="x-cell">
						<StyledControl>
							<Input
								style={{width: '100%'}}
								name="cpf"
								data-checkout="cpf"
								value={this.props.cpf}
								validations={[required, cpf]}
								placeholder="XXX.XXX.XXX-XX"
								onChange={this.props.handleInputChange}/>
						</StyledControl>
					</div>
				</div>

				<div className="x-table x-fw __fixed __vm" style={{marginTop: 10}}>
					<div className="x-cell" style={{width: 95}}>Installments</div>
					<div className="x-cell">
						<StyledControl>
							<Select
								style={{width: '100%'}}
								name="installments"
								className="x-select"
								data-checkout="installments"
								value={this.props.installments}
								onChange={this.props.handleInputChange}>
								<option value={1}>1*{unitprice(this.props.orderTotal)} ({unitprice(this.props.orderTotal)})  </option>
								{

									installmentoptions.map(i => (
										<option key={i.number} value={i.number}>
											{i.number}*{unitprice(i.stagePrice)} ({i.stagePrice.unit + (i.number * Number(i.stagePrice.amount)).toFixed(2)})
										</option>
									))
								}
							</Select>
						</StyledControl>
					</div>
				</div>
				<Button style={{display: 'none'}} ref={this.props.brazilref}></Button>
			</Form>
		</div>
	}
}

const getPayPlugin = (payMethod, props) => {
	switch (payMethod) {
	case '19':
		return <MercadoPlugin {...props}/>
	case '17':
		return <BraizlPlugin {...props}/>
	case '24':
	case '26':
	case '32':
	case '33':
	case '36':
	case '39':
	case '42':
		return <DLocalPlugin {...props} payMethod={payMethod}/>
	default:
		return null
	}
}

const CreditCard = class extends React.Component {
	constructor (props) {
		super(props)
		this.checkout = this.checkout.bind(this)
	}

	checkout (evt, currentCard) {
		const {payMethod} = currentCard.quickpayRecord
		if (payMethod === '19') {
			this.props.handleMercado(evt)
		} else {
			this.props.handleCredit(evt)
		}
	}

	render () {
		const {cards, orderTotal, payMethod, intl, count} = this.props
		let currentCard

		if (cards && cards.length) {
			currentCard = cards.find(card => card.isSelected) || cards[0]
		}

		const getIcon = () => {
			/*global sitename b:true*/
			/*eslint no-undef: "error"*/
			switch (sitename.toLowerCase()) {
			case 'ivrose':
				return 'https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/site/pc/icon326_iv.png'
			case 'chicme':
				return 'https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/site/pc/icon326.png'
			case 'boutiquefeel':
				return 'https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/site/pc/icon326_bq.png'
			default:
				return window.primeIcon
			}
		}

		const logoIcon = getIcon()

		return <div>

			{
				this.props.status === 0 ? (
					<CREDITWRAPPER>
						<HD>
							<h1>
								{payMethod === '19' ? <span>Tarjeta de crédito o débito</span> : <span>Credit Card</span> }
								{
									payMethod === '17' && <img style={{width: 69, marginLeft: 10}} src="https://dgzfssf1la12s.cloudfront.net/upgrade/20180529/003.png"/>
								}

							</h1>
							<Icon onClick={this.props.creditClose}>&#xe69a;</Icon>
						</HD>

						<BD>
							<div style={{borderBottom: '1px solid #e5e5e5'}}>
								<CurrentCard onClick={this.props.toggleBack} card={currentCard}/>
							</div>

							{getPayPlugin(currentCard.quickpayRecord.payMethod, {card: currentCard, ...this.props})}

							<div style={{textAlign: 'right', marginTop: 10, paddingRight: 12}}>
								<Grey>{count} items</Grey> <span style={{fontSize: 15}}><span>{intl.formatMessage({id: 'total'})}:</span> <Red><Money money={orderTotal}/></Red></span>
							</div>

							<div style={{position: 'absolute', bottom: 0, left: 0, paddingBottom: 10, paddingLeft: 10, paddingRight: 10}}>
								<div className="x-table __vm __fixed x-fw">
									<div className="x-cell" style={{width: 60}}>
										<img style={{width: 50}} src={ logoIcon }/>
									</div>
									<div className="x-cell">
										<Grey style={{fontSize: 12}}>
															We will not save your credit information. Trusted by over one million shoppers in 50 countries.
										</Grey>
									</div>
								</div>
								<div style={{marginTop: 10}}>

									{
										this.props.checking ? <BigButton bgColor="#999">
											{intl.formatMessage({id: 'please_wait'})}...</BigButton> : (
											<BigButton bgColor="#222" onClick={(evt) => { this.checkout(evt, currentCard) }}>
												{intl.formatMessage({id: 'check_out'})} ({count})
											</BigButton>
										)
									}

								</div>

							</div>
						</BD>
					</CREDITWRAPPER>
				) : (
					<CREDITWRAPPER>
						<HD>
							<h1>Credit Card</h1>
							<Icon onClick={this.props.toggleBack}>&#xe693;</Icon>
						</HD>

						<BD>
							<Cards>
								{
									cards.map(card => (
										<li key={card.quickpayRecord.id}>
											<Card cardSelect={this.props.cardSelect} card={card}/>
										</li>
									))
								}

								{/*            <li key="newcard">
									<NewCard payMethod={this.props.payMethod} onClick={this.props.addCard}/>
								</li> */}
							</Cards>
							<NewCardBtn onClick={this.props.addCard}>Pay With New Card</NewCardBtn>
						</BD>

					</CREDITWRAPPER>
				)
			}
			<HD></HD>

		</div>
	}
}

export default injectIntl(CreditCard)
