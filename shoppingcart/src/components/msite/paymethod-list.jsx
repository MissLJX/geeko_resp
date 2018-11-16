import React from 'react'
import styled from 'styled-components'
import CheckBox from '../checkbox.jsx'
import {Grey} from '../text.jsx'
import Ask from '../ask.jsx'

import {Form, Input, Button} from './control.jsx'
import {required, email, cpf} from '../validator.jsx'
import {StyledControl} from './styled-control.jsx'
import InputBtn from './input-btn.jsx'

const __qoute_reg__ = /\([^\}]+\)/

const __Coupon_Code_Tip_Message__ = '就不告诉你，就不告诉你，就不告诉你~~~~~~~~~~~~~~~~~~~~~~~~'

const METHODBD = styled.div`
  background-color: #e5e5e5;
  position: relative;
  padding: 20px 10px;
  &::before{
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
  & > div{
    &:first-child{
      width: 70px;
    }
  }
`

const Boleto = class extends React.Component {
  constructor (props) {
    super(props)
  }

  handleSubmit () {

  }

  render () {
    return <METHODBD>
      <Form ref={this.props.boletoForm} onSubmit={this.handleSubmit.bind(this)}>
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
  constructor (props) {
    super(props)
  }

  render () {
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
  & > ul::after{
    content: '';
    clear: both;
    display: block;
  }
  & > ul > li{
    float: left;
    margin-bottom: 10px;
    margin-right: 10px;
  }

  &::before{
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
  &::before{
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
  box-shadow: 0 0px 4px rgba(136,136,136,.2);
  border-radius: 2px;
  &.selected{
    border: 1px solid #e5004f;
    &::after{
      content: '\\e742';
      right: -2px;
      bottom: -2px;
      position: absolute;
      color: #e5004f;
      font-family: iconfont;
      font-style: normal;
    }
  }

  img{
    display: block;
  }
`

const MoneyTransform = class extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    const {atmMethods, cart, couponCode, setCouponHandle} = this.props
    return <CashMethods>
      <ul>
        {
          atmMethods && atmMethods.map(method => <li key={method.id}>
            <CashMethod className={this.props.atmMethod === method.id ? 'selected' : ''} onClick={(evt) => { this.props.atmClickHandle(method) }}>
              <img src={method.secure_thumbnail}/>
            </CashMethod>
          </li>)
        }
      </ul>

      {
        cart.showMercadopagoCouponField && <div style={{paddingBottom: 10}}>
          <div>MercadoPago Cupón <Ask onClick={this.props.mercadoCouponClickHandle.bind(this)}/></div>
          <div style={{marginTop: 5}}>
            <InputBtn initValue={couponCode} buttonText={'Utilizar Ahora'} buttonHandle={ setCouponHandle }/>
          </div>

        </div>
      }

    </CashMethods>
  }
}

const Cash = class extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    const {ticketMethods} = this.props
    return <CashMethods>
      <ul>
        {
          ticketMethods && ticketMethods.map(method => <li key={method.id}>
            <CashMethod className={this.props.ticketMethod === method.id ? 'selected' : ''} onClick={(evt) => { this.props.ticketClickHandle(method) }}>
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
	height: 50px;
  cursor: pointer;
	img{
		height: 22px;
		display: inline-block;
		margin-right: 10px;
	}
`

const DISCOUNTTIP = styled.span`
  background-color:#fff9fc;
  border: 1px solid #f3a6c0;
  padding: 4px;
  font-size: 12px;
  position: relative;
  margin-left: 12px;
  vertical-align: middle;
  display: inline-block;
  max-width: 170px;
  &::before{
    content:'';
    border-left: 1px solid #f3a6c0;
    border-top: 1px solid #f3a6c0;
    background-color:#fff9fc;
    transform: rotate(-45deg);
    position:absolute;
    left: -6px;
    top:  calc(50% - 5px);
    width: 8px;
    height: 8px;
    max-width:200px;
    display: block;
  }
`

const Method = class extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {payMethod, children, selectPayHandle, selected, cart} = this.props

    const matched = payMethod.name.match(__qoute_reg__)
    let name
    if (matched && matched.length) {
      name = payMethod.name.replace(matched[0], `<span class="x-red">${matched[0]}</span>`)
    } else {
      name = payMethod.name
    }

    const {paypalDiscountMessage} = cart
    return <StyledMethod >
      <HD onClick={() => { selectPayHandle(payMethod) }}>
        <div className="x-table x-fw x-fh __fixed __vm">
          <div className="x-cell">
            <img style={{verticalAlign: 'middle'}} src={payMethod.icon}/>
            <span className="x-small" style={{verticalAlign: 'middle'}}><span dangerouslySetInnerHTML={{__html: name}}/></span>

            {paypalDiscountMessage && payMethod.id === '1' && <DISCOUNTTIP dangerouslySetInnerHTML={{__html: paypalDiscountMessage}}/>}
          </div>
          <div className="x-cell __right" style={{width: 20}}>
            <CheckBox className={selected ? 'selected' : ''}/>
          </div>
        </div>
      </HD>

      {children && selected && <BD>
        {children}
      </BD>}
    </StyledMethod>
  }
}

const MethodUL = styled.ul`
  & > li{
    border-top: 1px solid #e5e5e5;
    &:first-child{
      border-top: none;
    }
    &:last-child{
      & > div:last-child{
        padding-bottom: 10px;
      }
    }
  }
`

const Mercado = (props) => {
  const { cart, setCouponHandle, couponCode } = props
  return <Plugin>
    <div>MercadoPago Cupón  <Ask onClick={props.mercadoCouponClickHandle.bind(this)}/></div>
    <div style={{marginTop: 5}}>
      <InputBtn initValue={couponCode} buttonText={'Utilizar Ahora'} buttonHandle={ setCouponHandle }/>
    </div>

  </Plugin>
}

const getMethodBody = (props) => {
  const { method, cart } = props
  switch (method.id) {
    case '16':
      return <Boleto {...props}/>
    case '20':
      return <MoneyTransform {...props}/>
    // case '21':
    //   return <Cash ticketMethod={ticketMethod} ticketMethods={ticketMethods} ticketClickHandle={ticketClickHandle}/>
    case '23':
      return <Apac {...props}/>
    case '19':
    case '21':
      return cart.showMercadopagoCouponField && <Mercado {...props}/>
    default:
      return null
  }
}

const PayMethodList = class extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    const {methods, selectPayHandle, selectedPayId, cart} = this.props
    return <MethodUL>
      {
        methods && methods.map(payMethod => (
          <li key={payMethod.id}>
            <Method cart={cart} selected={payMethod.id === selectedPayId} selectPayHandle={selectPayHandle} payMethod={payMethod}>
              {getMethodBody({method: payMethod, ...this.props})}
            </Method>
          </li>
        ))
      }
    </MethodUL>
  }
}

export default PayMethodList
