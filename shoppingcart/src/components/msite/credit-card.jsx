import React from 'react'
import styled from 'styled-components'
import Icon from '../icon.jsx'
import {Red, Grey} from '../text.jsx'
import Money from '../money.jsx'
import {BigButton} from './buttons.jsx'

import {Form, Input} from './control.jsx'
import {required} from '../validator.jsx'
import {StyledControl} from './styled-control.jsx'

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
  <div className="x-table __fixed __vm x-fw x-fh">
    <div className="x-cell"><span>Card No.</span> { props.card.quickpayRecord.cardNumber }</div>
    {
      props.card.isSelected && <div className="x-cell __right">
        <Icon>&#xe638;</Icon>
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
      <Form id="mercadoform">
        <input type="hidden" name="cardId" data-checkout="cardId"/>
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

const getPayPlugin = (payMethod, props) => {
  console.log(payMethod)
  switch (payMethod) {
    case '19':
      return <MercadoPlugin {...props}/>
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
  						<Icon>&#xe69a;</Icon>
  					</HD>

  					<BD>
  						<div style={{borderBottom: '1px solid #e5e5e5'}}>
  							 <CurrentCard onClick={() => { this.setState({status: 1}) }} card={currentCard}/>
  						</div>

  						<div style={{fontSize: 18, textAlign: 'right', marginTop: 15}}>
  							 <Red><Money money={orderTotal}/></Red>
  						</div>

  						{getPayPlugin(currentCard.quickpayRecord.payMethod, {card: currentCard})}

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
  								<BigButton bgColor="#e5004f">Check Out</BigButton>
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
  									<li key={card.id}>
  										<Card card={card}/>
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
