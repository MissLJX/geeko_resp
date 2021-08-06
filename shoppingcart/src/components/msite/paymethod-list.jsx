import React from 'react'
import styled from 'styled-components'
import CheckBox from '../checkbox.jsx'
import Ask from '../ask.jsx'

import {Form, Input, Button} from './control.jsx'
import {required, email, cpf, getDNI} from '../validator.jsx'
import {StyledControl} from './styled-control.jsx'
import InputBtn from './input-btn.jsx'

import {getDPaymethods} from '../../api'

const __qoute_reg__ = /\([^\}]+\)/

const METHODBD = styled.div`
  background-color: #e5e5e5;
  position: relative;
  padding: 20px 10px;

  &::before {
    content: '';
    display: inline-block;
    width: 15px;
    height: 15px;
    transform: rotate(-45deg);
    background-color: #e5e5e5;
    top: -7px;
    left: 12px;
    position: absolute;
  }
`

const MethodInputLine = styled.div`
  & > div {
    &:first-child {
      width: 70px;
    }
  }
`

const Boleto = class extends React.Component {
	constructor(props) {
		super(props)
	}

	handleSubmit() {

	}

	render() {
		return <METHODBD>
			<Form ref={this.props.boletoForm} onSubmit={this.handleSubmit.bind(this)}>
				{/* <MethodInputLine className="x-table x-fw __vm __fixed">
					<div className="x-cell">
						<label>CPF<Ask style={{marginLeft: 4}} onClick={this.props.cpfClickHandle.bind(this)}/></label>
					</div>
					<div className="x-cell">
						<StyledControl inputColor="#fff">
							<Input
								name='cpf'
								value={this.props.cpf}
								onChange={this.props.handleInputChange}
								validations={[required, cpf]}/>
						</StyledControl>
					</div>
				</MethodInputLine> */}

				<MethodInputLine style={{marginTop: 10}} className="x-table x-fw __vm __fixed">
					<div className="x-cell">
						<label>EMAIL*</label>
					</div>

					<div className="x-cell">
						<StyledControl inputColor="#fff">
							<Input
								name='email'
								value={this.props.email}
								onChange={this.props.handleInputChange}
								validations={[required, email]}/>
						</StyledControl>
					</div>
				</MethodInputLine>
				<Button style={{display: 'none'}} ref={this.props.boleto}></Button>
			</Form>
		</METHODBD>
	}
}

const Apac = class extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return <METHODBD>
			<Form ref={this.props.apac}>
				<MethodInputLine className="x-table x-fw __vm __fixed">
					<div className="x-cell">
						<label>CPF<Ask style={{marginLeft: 4}} onClick={this.props.cpfClickHandle.bind(this)}/></label>
					</div>
					<div className="x-cell">
						<StyledControl inputColor="#fff">
							<Input
								name='cpf'
								value={this.props.cpf}
								onChange={this.props.handleInputChange}
								validations={[required, cpf]}/>
						</StyledControl>
					</div>
				</MethodInputLine>
				<Button style={{display: 'none'}} ref={this.props.apacBB}></Button>
			</Form>
		</METHODBD>
	}
}

const CashMethods = styled.div`
  padding: 10px 10px 0 10px;
  background-color: #e5e5e5;
  position: relative;

  ul::after {
    content: '';
    clear: both;
    display: block;
  }

  ul > li {
    float: left;
    margin-bottom: 10px;
    margin-right: 10px;
  }

  &::before {
    content: '';
    display: inline-block;
    width: 15px;
    height: 15px;
    transform: rotate(-45deg);
    background-color: #e5e5e5;
    top: -7px;
    left: 12px;
    position: absolute;
  }

`

const Plugin = styled.div`
  padding: 10px;
  background-color: #e5e5e5;
  position: relative;

  &::before {
    content: '';
    display: inline-block;
    width: 15px;
    height: 15px;
    transform: rotate(-45deg);
    background-color: #e5e5e5;
    top: -7px;
    left: 12px;
    position: absolute;
  }
`

const CashMethod = styled.span`
  display: inline-block;
  cursor: pointer;
  position: relative;
  border: 1px solid #e5e5e5;
  padding: 4px;
  height: 31px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 0px 4px rgba(136, 136, 136, .2);
  border-radius: 2px;

  &.selected {
    border: 1px solid #e5004f;

    &::after {
      content: '\\e742';
      right: -2px;
      bottom: -2px;
      position: absolute;
      color: #e5004f;
      font-family: iconfont;
      font-style: normal;
    }
  }

  img {
    display: block;
  }
`

const TicketCashMethod = styled.span`
  display: inline-block;
  cursor: pointer;
  position: relative;
  border: 1px solid #e5e5e5;
  padding: 4px;
  height: 50px;
  width: 50px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 0px 4px rgba(136, 136, 136, .2);
  border-radius: 2px;

  &.selected {
    border: 1px solid #e5004f;

    &::after {
      content: '\\e742';
      right: -2px;
      bottom: -2px;
      position: absolute;
      color: #e5004f;
      font-family: iconfont;
      font-style: normal;
    }
  }

  img {
    display: block;
    width: 100%;
  }
`

const MoneyTransform = class extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const {atmMethods, showMercadopagoCouponField, couponCode, setCouponHandle} = this.props
		return <CashMethods>
			<ul>
				{
					atmMethods && atmMethods.map(method => <li key={method.id}>
						<CashMethod className={this.props.atmMethod === method.id ? 'selected' : ''} onClick={(evt) => {
							this.props.atmClickHandle(method)
						}}>
							<img src={method.secure_thumbnail}/>
						</CashMethod>
					</li>)
				}
			</ul>

			{
				showMercadopagoCouponField && <div style={{paddingBottom: 10}}>
					<div>MercadoPago Cupón <Ask onClick={this.props.mercadoCouponClickHandle.bind(this)}/></div>
					<div style={{marginTop: 5}}>
						<InputBtn initValue={couponCode} buttonText={'Utilizar Ahora'} buttonHandle={setCouponHandle}/>
					</div>

				</div>
			}

		</CashMethods>
	}
}

const TicketCash = class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tcMethods: []
		}
	}

	componentWillMount() {
		const {method, initCashmethod} = this.props
		if (method) {
			getDPaymethods(method.id).then(({result}) => {
				this.setState({
					tcMethods: result
				})

				if (result && result.length > 0) {
					initCashmethod(method.id, result[0])
				}

			})
		}
	}

	getLabel(payMethod) {
		switch (payMethod) {
		case '27':
		case '28':
			return 'DNI / CUIT'
		case '30':
		case '31':
			return 'Cédula de ciudadanía'
		case '34':
		case '35':
			return 'CI/RUT'
		case '37':
			return 'Cédula de identidad'
		case '40':
		case '41':
			return 'CURP'
		case '43':
		case '44':
			return 'DNI'
		default:
			return 'Document'
		}
	}

	render() {
		const {tcMethods} = this.state
		const {method, tcMethod, tcClickHandle, document, handleInputChange, documentForm, documentRef} = this.props
		const _dni = getDNI(method.id)
		return <div>

			<CashMethods style={{marginTop: 15}}>
				{
					method.id !== '29' && <Form ref={documentForm} style={{marginBottom: 10}}>
						<MethodInputLine>
							<label style={{
								marginBottom: 4,
								fontSize: 12,
								color: '#999',
								display: 'inline-block'
							}}>{this.getLabel(method.id)}</label>
							<StyledControl inputColor="#fff">
								<Input
									name='document'
									value={document}
									onChange={handleInputChange}
									validations={[required, _dni]}/>
							</StyledControl>
						</MethodInputLine>
						<Button style={{display: 'none'}} ref={documentRef}></Button>
					</Form>
				}

				<ul style={{paddingBottom: 5}}>
					{
						tcMethods && tcMethods.map(method => <li key={method.id}>
							<TicketCashMethod className={tcMethod === method.id ? 'selected' : ''} onClick={(evt) => {
								tcClickHandle(method.id)
							}}>
								<img src={method.logo}/>
							</TicketCashMethod>
						</li>)
					}
				</ul>
			</CashMethods>
		</div>
	}
}

const Cash = class extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const {ticketMethods} = this.props
		return <CashMethods>
			<ul>
				{
					ticketMethods && ticketMethods.map(method => <li key={method.id}>
						<CashMethod className={this.props.ticketMethod === method.id ? 'selected' : ''}
							onClick={(evt) => {
								this.props.ticketClickHandle(method)
							}}>
							<img src={method.secure_thumbnail}/>
						</CashMethod>
					</li>)
				}
			</ul>
		</CashMethods>
	}
}

const StyledMethod = styled.div`

`
const BD = styled.div`
`

const HD = styled.div`
  min-height: 44px;
  cursor: pointer;

  img {
    height: 22px;
    display: inline-block;
    margin-right: 10px;
  }

  padding-top: 6px;
  padding-bottom: 6px;
`

const DISCOUNTTIP = styled.span`
  background-color: #fff9fc;
  border: 1px solid #f3a6c0;
  padding: 4px;
  font-size: 12px;
  position: relative;
  margin-left: 12px;
  vertical-align: middle;
  display: inline-block;
  max-width: 170px;

  &::before {
    content: '';
    border-left: 1px solid #f3a6c0;
    border-top: 1px solid #f3a6c0;
    background-color: #fff9fc;
    transform: rotate(-45deg);
    position: absolute;
    left: -6px;
    top: calc(50% - 5px);
    width: 8px;
    height: 8px;
    max-width: 200px;
    display: block;
  }
`

const SHIPPING_MSG = styled.span`
  color: #e2ae2f;
  font-size: 12px;
`

const MethodMsg = props => {
	return <SHIPPING_MSG dangerouslySetInnerHTML={{__html: props.msg}}/>
}

const Method = class extends React.PureComponent {
	constructor(props) {
		super(props)
	}

	render() {
		const {payMethod, children, selectPayHandle, selected, paypalDiscountMessage} = this.props

		const matched = payMethod.name.match(__qoute_reg__)
		let name
		if (matched && matched.length) {
			name = payMethod.name.replace(matched[0], `<span class="x-red">${matched[0]}</span>`)
		} else {
			name = payMethod.name
		}

		return <StyledMethod>
			<HD onClick={() => {
				selectPayHandle(payMethod)
			}}>
				<div className="x-table x-fw x-fh __fixed __vm">
					<div className="x-cell">
						<img style={{verticalAlign: 'middle'}} src={payMethod.icon}/>
						<span className="x-small" style={{verticalAlign: 'middle'}}><span
							dangerouslySetInnerHTML={{__html: name}}/></span>

						{/*{paypalDiscountMessage && payMethod.id === '1' && <DISCOUNTTIP dangerouslySetInnerHTML={{__html: paypalDiscountMessage}}/>}*/}
						{payMethod.promotionMsg && <div style={{marginLeft: 46, marginTop: 4}}>
							<MethodMsg msg={payMethod.promotionMsg}/>
						</div>}

					</div>
					<div className="x-cell __right" style={{width: 20}}>
						<CheckBox className={selected ? 'selected' : ''}/>
					</div>
				</div>

			</HD>

			{children && selected && <BD>
				{children}
			</BD>}
			{payMethod.type === '27' &&
            <div id={`klarna-payments-container-${payMethod.id}`} style={{display: `${selected ? 'block' : 'none'}`}}/>}
		</StyledMethod>
	}
}

const MethodUL = styled.ul`
  & > li {
    &:first-child {
      border-top: none;
    }

    &:last-child {
      & > div:last-child {
        padding-bottom: 5px;
      }
    }
  }
`

const Mercado = (props) => {
	const {setCouponHandle, couponCode} = props
	return <Plugin>
		<div>MercadoPago Cupón <Ask onClick={props.mercadoCouponClickHandle.bind(this)}/></div>
		<div style={{marginTop: 5}}>
			<InputBtn initValue={couponCode} buttonText={'Utilizar Ahora'} buttonHandle={setCouponHandle}/>
		</div>

	</Plugin>
}

const getMethodBody = (props) => {
	const {method, showMercadopagoCouponField} = props
	switch (method.id) {
	case '16':
		return <Boleto {...props}/>
	case '20':
		return <MoneyTransform {...props}/>
		// case '21':
		//   return <Cash ticketMethod={ticketMethod} ticketMethods={ticketMethods} ticketClickHandle={ticketClickHandle}/>
		// case '23':
		//   return <Apac {...props}/>
	case '19':
	case '21':
		return showMercadopagoCouponField && <Mercado {...props}/>
	case '29':
	case '27':
	case '28':
	case '30':
	case '31':
	case '34':
	case '35':
	case '37':
	case '40':
	case '41':
	case '43':
	case '44':
		return <TicketCash {...props}/>
	default:
		return null
	}
}

const PayMethodList = class extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const {methods, selectPayHandle, selectedPayId, paypalDiscountMessage} = this.props

		return <MethodUL>
			{
				methods && methods.map(payMethod => (
					<li key={payMethod.id}>
						<Method paypalDiscountMessage={paypalDiscountMessage} selected={payMethod.id === selectedPayId}
							selectPayHandle={selectPayHandle} payMethod={payMethod}>
							{getMethodBody({method: payMethod, ...this.props})}
						</Method>
					</li>
				))
			}
		</MethodUL>
	}
}

export default PayMethodList

// 去除  showMercadopagoCouponField  paypalDiscountMessage
