import React from 'react'
import styled from 'styled-components'
import {FormattedMessage} from 'react-intl'
import CheckBox from '../checkbox.jsx'
import Money from '../money.jsx'
import {Grey} from '../text.jsx'

const StyledMethod = styled.li`
	& > div{
		&:nth-child(1){
			width: 200px;
		}

		&:nth-child(2){
			width: 165px;
		}
	}
`

const Method = ({shippingMethod, selected, onSelect, ignoreCheck}) => <StyledMethod className="x-table">
  <div className="x-cell">
  	{!ignoreCheck && <CheckBox onClick={ () => onSelect(shippingMethod.id) } style={{verticalAlign: 'middle', marginRight: 10}} className={selected ? 'selected' : ''}/>}

    <span style={{verticalAlign: 'middle'}}>{ shippingMethod.title }</span>
  </div>

  <div className="x-cell">
    <Money money={ shippingMethod.price }/>
	{
		shippingMethod.originalPrice && <del style={{marginLeft: 10, color: '#999', fontSize: 12}}>
			<Money money={ shippingMethod.originalPrice }/>
		</del>
	}
	
  </div>

  <div className="x-cell">
    <Grey><FormattedMessage id="shipping_time"/>: </Grey>
    <span>{ shippingMethod.shippingTime }</span>
  </div>
</StyledMethod>

const StyledMethods = styled.ul`
	padding: 15px 0;
	& > li{
		margin-top: 15px;
		&:first-child{
			margin-top: 0;
		}
	}
`

export default ({shippingMethodList, selectedShippingMethod, onSelect, ignoreCheck}) => <StyledMethods>
  {
    shippingMethodList && shippingMethodList.map(method => <Method ignoreCheck={ignoreCheck} onSelect={onSelect} key={method.id} shippingMethod={ method } selected={selectedShippingMethod.id === method.id}/>)
  }
</StyledMethods>
