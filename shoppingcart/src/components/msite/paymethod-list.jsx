import React from 'react'
import styled from 'styled-components'
import CheckBox from '../checkbox.jsx'
import {Grey} from '../text.jsx'
import Ask from '../ask.jsx'

import {Form, Input, Button} from './control.jsx'
import {required, email, cpf} from '../validator.jsx'
import {StyledControl} from './styled-control.jsx'

const __qoute_reg__ = /\([^\}]+\)/

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

const CashMethods = styled.ul`
  padding: 10px 0 0 10px;
  background-color: #e5e5e5;
  position: relative;
  &::after{
    content: '';
    clear: both;
    display: block;
  }
  & > li{
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
    const {atmMethods} = this.props
    return <CashMethods>
      {
        atmMethods && atmMethods.map(method => <li key={method.id}>
          <CashMethod className={this.props.atmMethod === method.id ? 'selected' : ''} onClick={(evt) => { this.props.atmClickHandle(method) }}>
            <img src={method.secure_thumbnail}/>
          </CashMethod>
        </li>)
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
      {
        ticketMethods && ticketMethods.map(method => <li key={method.id}>
          <CashMethod className={this.props.ticketMethod === method.id ? 'selected' : ''} onClick={(evt) => { this.props.ticketClickHandle(method) }}>
            <img src={method.secure_thumbnail}/>
          </CashMethod>
        </li>)
      }
    </CashMethods>
  }
}

const StyledMethod = styled.div`
	
`
const BD = styled.div`
`

const HD = styled.div`
	height: 50px;

	img{
		height: 22px;
		display: inline-block;
		margin-right: 10px;
	}
`

const Method = class extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {payMethod, children, selectPayHandle, selected} = this.props

    const matched = payMethod.name.match(__qoute_reg__)
    let name
    if (matched && matched.length) {
      name = payMethod.name.replace(matched[0], `<span class="x-red">${matched[0]}</span>`)
    } else {
      name = payMethod.name
    }

    return <StyledMethod onClick={() => { selectPayHandle(payMethod) }}>
      <HD>
        <div className="x-table x-fw x-fh __fixed __vm">
          <div className="x-cell">
            <img style={{verticalAlign: 'middle'}} src={payMethod.icon}/>
            <Grey className="x-small" style={{verticalAlign: 'middle'}}><span dangerouslySetInnerHTML={{__html: name}}/></Grey>
          </div>
          <div className="x-cell __right" style={{width: 50}}>
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

const getMethodBody = (id, {cpf, email, handleInputChange, boleto, cpfClickHandle, boletoForm, atmClickHandle, atmMethods, atmMethod, ticketClickHandle, ticketMethods, ticketMethod}) => {
  switch (id) {
    case '16':
      return <Boleto boleto={boleto} boletoForm={boletoForm} cpf={cpf} email={email} cpfClickHandle={cpfClickHandle} handleInputChange={handleInputChange}/>
    case '20':
      return <MoneyTransform atmMethod={atmMethod} atmMethods={atmMethods} atmClickHandle={atmClickHandle}/>
    // case '21':
    //   return <Cash ticketMethod={ticketMethod} ticketMethods={ticketMethods} ticketClickHandle={ticketClickHandle}/>
    default:
      return null
  }
}

const PayMethodList = class extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    const {methods, selectPayHandle, selectedPayId} = this.props
    return <MethodUL>
      {
        methods && methods.map(payMethod => (
          <li key={payMethod.id}>
            <Method selected={payMethod.id === selectedPayId} selectPayHandle={selectPayHandle} payMethod={payMethod}>
              {getMethodBody(payMethod.id, this.props)}
            </Method>
          </li>
        ))
      }
    </MethodUL>
  }
}

export default PayMethodList
