import React from 'react'
import styled from 'styled-components'
import CheckBox from '../checkbox.jsx'

import {Form, Input, Button, Select} from './control.jsx'
import {required, email, cpf} from '../validator.jsx'
import {MutiElement, FormElement} from './styled-control.jsx'
import Ask from './ask.jsx'
import {unitprice} from '../../utils/utils.js'
import InputBtn from './input-btn.jsx'
import { getDPaymethods } from '../../api'

const __qoute_reg__ = /\([^\}]+\)/

const __Cpf_Tip_Message__ = 'CPF (Cadastro de Pessoa Física), utilizado para tributação, é necessário para todos os produtos enviados ao Brasil, independentemente de encomendas expressas ou contêineres logísticos.Quando preenchemos o conhecimento de embarque e fatura, por favor, não esqueça de preencher o número de contribuinte do destinatário.Na maioria dos casos, sua forma é o número digital como abaixo, XXX.XXX.XXX-XX'
const __Coupon_Code_Tip_Message__ = 'Utiliza el código MERCADOPAGO para obtener un 10% de descuento adicional.'

const METHOD = styled.div`
	cursor: pointer;
	& > div{
		&:nth-child(1){
			width: 28px;
		}
		&:nth-child(2){
			width: 70px;
			img{
				width: 60px;
			}
		}
	}
`

const METHODS = styled.ul`
	& > li{
		margin-top: 20px;
		&:first-child{
			margin-top: 0;
		}
	}
`

const METHODPLUGIN = styled.div`
	background-color: #eee;
	padding: 15px 28px;
	margin-top: 10px;
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

const METHODCONTAINER = styled.div`
	
`

const Boleto = (props) => <Form ref={props.boletoForm}>
  <MutiElement>
    <FormElement label={`EMAIL:`} className="__required">
      <Input
        name='email'
        value={props.email}
        style={{width: '100%', height: 35}}
        onChange={props.handleInputChange}
        validations={[required, email]}/>
    </FormElement>
    <FormElement/>
  </MutiElement>

  <Button style={{display: 'none'}} ref={props.boleto}></Button>
</Form>

const Apac = (props) => <Form ref={props.apac}>

  <MutiElement>
    <FormElement label={`CPF:`} tipMessage={__Cpf_Tip_Message__} className="__required">
      <Input
        name='cpf'
        value={props.cpf}
        style={{width: '100%', height: 35}}
        onChange={props.handleInputChange}
        validations={[required, cpf]}/>
    </FormElement>
    <FormElement></FormElement>
  </MutiElement>
  <Button style={{display: 'none'}} ref={props.apacBB}></Button>
</Form>

const CashMethods = styled.ul`
  &::after{
    content: '';
    clear: both;
    display: block;
  }
  & > li{
    float: left;
    margin-right: 10px;
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

const TicketCashMethod = styled.span`
  display: inline-block;
  cursor: pointer;
  position: relative;
  border: 1px solid #e5e5e5;
  padding: 4px;
  height: 100px;
  width: 100px;
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
    width: 100%;
  }
`

const MoneyTransform = (props) => {
  const {atmMethods, atmMethod, setCouponHandle, couponCode, showMercadopagoCouponField} = props
  return <div>
    <CashMethods>
      {
        atmMethods && atmMethods.map(method => <li key={method.id}>
          <CashMethod className={atmMethod === method.id ? 'selected' : ''} onClick={(evt) => { props.atmClickHandle(method) }}>
            <img src={method.secure_thumbnail}/>
          </CashMethod>
        </li>)
      }
    </CashMethods>

    {
      showMercadopagoCouponField && <div style={{width: 320, marginTop: 10}}>
        <div>MercadoPago Cupón  <Ask style={{marginLeft: 5}} message={__Coupon_Code_Tip_Message__}/></div>
        <div style={{marginTop: 5}}>
          <InputBtn initValue={couponCode} buttonText={'Utilizar Ahora'} buttonHandle={ setCouponHandle }/>
        </div>

      </div>
    }

  </div>
}

const TicketCash = class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tcMethods: []
    }
  }

  componentWillMount () {
    const { method } = this.props
    if (method) {
      getDPaymethods(method.id).then(({result}) => {
        this.setState({
          tcMethods: result
        })
      })
    }
  }

  render () {
    const { tcMethods } = this.state
    const { tcMethod, tcClickHandle, document, handleInputChange, documentForm, documentRef } = this.props
    return <div>
      <Form ref={documentForm}>
        <MutiElement>
          <FormElement label={`DNI:`} className="__required">
            <Input
              name='document'
              value={document}
              style={{width: '100%', height: 35}}
              onChange={handleInputChange}
              validations={[required]}/>
          </FormElement>
          <FormElement/>
        </MutiElement>
        <Button style={{display: 'none'}} ref={documentRef}></Button>
      </Form>
      <CashMethods style={{marginTop: 15}}>
        {
          tcMethods && tcMethods.map(method => <li key={method.id}>
            <TicketCashMethod className={tcMethod === method.id ? 'selected' : ''} onClick={(evt) => { tcClickHandle(method.id) }}>
              <img src={method.logo}/>
            </TicketCashMethod>
          </li>)
        }
      </CashMethods>
    </div>
  }
}

const BrazilOcean = (props) => <Form ref={props.brazilOceanForm}>

  <MutiElement>

    <FormElement label={`Installments:`} className="__required">
      <Select
        style={{width: '100%', height: 35, backgroundColor: '#fff'}}
        name="installments"
        className="x-select"
        value={props.installments}
        onChange={props.handleInputChange}>
        <option value={1}>1*{unitprice(props.orderTotal)} ({unitprice(props.orderTotal)})  </option>
        {

          props.installmentoptions.map(i => (
            <option key={i.number} value={i.number}>
              {i.number}*{unitprice(i.stagePrice)} ({i.stagePrice.unit + (i.number * Number(i.stagePrice.amount)).toFixed(2)})
            </option>
          ))
        }
      </Select>
    </FormElement>
    <FormElement/>
  </MutiElement>
  <Button style={{display: 'none'}} ref={props.brazilOcean}></Button>
</Form>

const Mercado = (props) => {
  const { setCouponHandle, couponCode } = props
  return <div style={{width: 320}}>
    <div>MercadoPago Cupón  <Ask style={{marginLeft: 5}} message={__Coupon_Code_Tip_Message__}/></div>
    <div style={{marginTop: 5}}>
      <InputBtn initValue={couponCode} buttonText={'Utilizar Ahora'} buttonHandle={ setCouponHandle }/>
    </div>

  </div>
}

const getPlugin = (props) => {
  const { method, showMercadopagoCouponField } = props
  switch (method.id) {
    case '16':
      return <Boleto {...props}/>
    // case '23':
    //   return <Apac {...props}/>
    case '20':
      return <MoneyTransform {...props}/>
    case '17':
      return <BrazilOcean {...props}/>
    case '19':
    case '21':
      return showMercadopagoCouponField && <Mercado {...props}/>
    case '25':
    case '29':
    case '27':
    case '28':
    case '30':
    case '31':
      return <TicketCash {...props}/>
    default:
		  return null
  }
}

const DISCOUNTTIP = styled.span`
  background-color:#fff9fc;
  border: 1px solid #f3a6c0;
  padding: 4px;
  font-size: 12px;
  position: relative;
  margin-left: 12px;
  &::before{
    content:'';
    border-left: 1px solid #f3a6c0;
    border-top: 1px solid #f3a6c0;
    background-color:#fff9fc;
    transform: rotate(-45deg);
    position:absolute;
    left: -5px;
    top: 6px;
    width: 8px;
    height: 8px;
  }
`

const PayMethod = (props) => {
  const {method, selectedPayId, paypalDiscountMessage, children} = props

  const selected = method.id === selectedPayId

  const matched = method.name.match(__qoute_reg__)
  let name
  if (matched && matched.length) {
	  name = method.name.replace(matched[0], `<span class="x-red">${matched[0]}</span>`)
  } else {
	  name = method.name
  }

  return <METHODCONTAINER>
    		<METHOD onClick={() => { props.selectPayHandle(method) }} className="x-table x-fw __vm">
		      <div className="x-cell">
        <CheckBox className={ selected ? 'selected' : ''}/>
		      </div>
		      <div className="x-cell">
		        <img src={ method.icon }/>
		      </div>
		      <div className="x-cell">
		        <span dangerouslySetInnerHTML={{__html: name}}/>

        {
          method.id === '1' && paypalDiscountMessage && <DISCOUNTTIP><span dangerouslySetInnerHTML={{__html: paypalDiscountMessage}}/></DISCOUNTTIP>
        }
		      </div>

		    </METHOD>

		    {
		    	selected && children && <METHODPLUGIN>
		    		{children}
		    	</METHODPLUGIN>
		    }
  	</METHODCONTAINER>
}

const PayMethods = class extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
  	const { payMethodList } = this.props
  	return <METHODS>
  		{
  			payMethodList && payMethodList.length > 0 && payMethodList.map(method => <li key={method.id}>
  				<PayMethod method={method} {...this.props}>
  					{getPlugin({method, ...this.props})}
  				</PayMethod>
  			</li>)
  		}
  	</METHODS>
  }
}

export default PayMethods
