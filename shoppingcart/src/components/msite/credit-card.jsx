import React from 'react'
import styled from 'styled-components'
import Icon from '../icon.jsx'
import {Red, Grey} from '../text.jsx'
import Money from '../money.jsx'
import {BigButton} from './buttons.jsx'

import {Form, Input, Select} from './control.jsx'
import {required} from '../validator.jsx'
import {StyledControl} from './styled-control.jsx'

import {unitprice} from '../../utils/utils.js'

const HD = styled.div`
	height: 50px;
	line-height: 50px;
	border-bottom: 1px solid #e5e5e5;
	padding-left: 10px;
	position: relative;
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
	padding-left: 10px;
	padding-right: 10px;
	position: relative;
	height: 300px;
`

const CREDITWRAPPER = styled.div`
	background-color: #fff;
	
	position: fixed;
	z-index: 5;
	bottom: 0;
	width: 100%;
`

const StyledCard = styled.div`
	height: 50px;
	cursor: pointer;
`

const Card = props => <StyledCard>
  <div onClick={() => { props.cardSelect(props.card) }} className="x-table __fixed __vm x-fw x-fh">
    <div className="x-cell"><span>Card No.</span> { props.card.quickpayRecord.cardNumber }</div>
    {
      props.card.isSelected && <div className="x-cell __right">
        <Icon style={{color: '#e5004f'}}>&#xe638;</Icon>
      </div>
    }
  </div>
</StyledCard>

const CurrentCard = props => <StyledCard {...props}>
  <div className="x-table __fixed __vm x-fw x-fh">
    <div className="x-cell"><span>Card No.</span> { props.card.quickpayRecord.cardNumber }</div>
    <div className="x-cell __right">
      <Icon>&#xe694;</Icon>
    </div>
  </div>
</StyledCard>

const MercadoPlugin = class extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return <div>
      <Form id="mercadoform" ref={this.props.mercadoref} onSubmit={this.props.handleMercado}>
        <input type="hidden" value={this.props.card.quickpayRecord.quickpayId} name="cardId" data-checkout="cardId"/>
        <div className="x-table">
          <div className="x-cell">Security Code</div>
          <div className="x-cell" style={{paddingLeft: 10}}>
            <StyledControl>
              <Input style={{width: 120}} name="securityCode"
							 data-checkout="securityCode"
							 value={this.props.securityCode}
							 validations={[required]}
							 placeholder="123"
							 onChange={this.props.handleInputChange}/>
            </StyledControl>
          </div>

        </div>
      </Form>
    </div>
  }
}

const BraizlPlugin = class extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    const {installmentoptions} = this.props

    return <div style={{marginTop: 10}}>
      <Form id="brazilform" ref={this.props.brazilref} onSubmit={this.props.handleBrazil}>
        <div className="x-table x-fw __fixed __vm">
          <div className="x-cell" style={{width: 95}}>CPF</div>
          <div className="x-cell">
            <StyledControl>
              <Input
                style={{width: '100%'}}
                name="cpf"
                data-checkout="cpf"
                value={this.props.cpf}
                validations={[required]}
                placeholder="123"
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
                data-checkout="installments"
                value={this.props.installments}
                onChange={this.props.handleInputChange}>
                <option>1*{unitprice(this.props.orderTotal)}  </option>
                {

                  installmentoptions.map(i => (
                    <option key={i.number} value={i.number}>
                      {i.number}*{unitprice(i.stagePrice)}
                    </option>
                  ))
                }
              </Select>
            </StyledControl>
          </div>
        </div>

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
    default:
      return null
  }
}

const CreditCard = class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    	status: 0
    }
    this.checkout = this.checkout.bind(this)
  }

  checkout (evt, currentCard) {
    const {payMethod} = currentCard
    if (payMethod === '19') {
      this.props.handleMercado(evt)
    } else {
      this.props.handleCredit(evt)
    }
  }

  render () {
  	const {cards, orderTotal} = this.props

  	let currentCard

  	if (cards && cards.length) {
  		currentCard = cards.find(card => card.isSelected) || cards[0]
  	}

  	return <div>

  		{
  			this.state.status === 0 ? (
  				<CREDITWRAPPER>
  					<HD>
  						<h1>Credit Card</h1>
  						<Icon onClick={this.props.creditClose}>&#xe69a;</Icon>
  					</HD>

  					<BD>
  						<div style={{borderBottom: '1px solid #e5e5e5'}}>
  							 <CurrentCard onClick={() => { this.setState({status: 1}) }} card={currentCard}/>
  						</div>

  						<div style={{fontSize: 18, textAlign: 'right', marginTop: 15}}>
  							 <Red><Money money={orderTotal}/></Red>
  						</div>

  						{getPayPlugin(currentCard.quickpayRecord.payMethod, {card: currentCard, ...this.props})}

  						<div style={{position: 'absolute', bottom: 0, left: 0, paddingBottom: 10, paddingLeft: 10, paddingRight: 10}}>
  							<div className="x-table __vm __fixed x-fw">
  								<div className="x-cell" style={{width: 60}}>
  									<img style={{width: 50}} src="https://dgzfssf1la12s.cloudfront.net/site/pc/icon326.png"/>
  								</div>
  								<div className="x-cell">
                    				<Grey style={{fontSize: 12}}>
                    					We will not save your credit information. Trusted by over one million shoppers in 50 countries.
                    				</Grey>
  								</div>
  							</div>
  							<div style={{marginTop: 10}}>
  								<BigButton bgColor="#e5004f" onClick={(evt) => { this.checkout(evt, currentCard) }}>Check Out</BigButton>
  							</div>

  						</div>
  					</BD>
  				</CREDITWRAPPER>
  			) : (
  				<CREDITWRAPPER>
  					<HD>
  						<h1>Credit Card</h1>
  						<Icon onClick={() => { this.setState({status: 0}) }}>&#xe693;</Icon>
  					</HD>

  					<BD>
  						<ul>
  							{
  								cards.map(card => (
  									<li key={card.quickpayRecord.id}>
  										<Card cardSelect={this.props.cardSelect} card={card}/>
  									</li>
  								))
  							}
  						</ul>
  					</BD>
  				</CREDITWRAPPER>
  			)
  		}
  		<HD></HD>

  	</div>
  }
}

export default CreditCard
