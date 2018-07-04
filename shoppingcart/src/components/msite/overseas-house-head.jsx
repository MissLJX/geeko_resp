import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import CheckBox from '../checkbox.jsx'
import {Red} from '../text.jsx'
import Money from '../money.jsx'
import Icon from '../icon.jsx'

const OverseasHead = styled.div`
  height: 50px;
  padding: 0 10px;
  font-size: 15px;
  & > div{
    height: 100%;
    border-bottom: 1px solid #e5e5e5;

    & > div:first-child{
      width: 30px;
    }

    & > div:nth-child(2){
      width: 40px;
    }

    & > div:last-child{
      text-align: right;
    }
  }
`

export default ({shippingMethod, selected, groupClick}) => <OverseasHead>
  <div className="x-table __vm __fixed x-fw">
    <div className="x-cell">
      <CheckBox onClick={() => { groupClick(!selected) }} className={selected ? 'selected' : ''}/>
    </div>
    <div className="x-cell">
			All
    </div>
    <div className="x-cell">
      <Link style={{color: '#222', textDecoration: 'none'}} to={`${window.ctx || ''}/shipping-methods`}>
        <Icon style={{fontSize: 18, marginRight: 10}}>&#xe659;</Icon>
        <span>{shippingMethod.title}: </span>
        <Red>{shippingMethod.price.amount > 0 ? <Money money={shippingMethod.price}/> : 'Free Shipping'}</Red>
        <Icon>&#xe694;</Icon>
      </Link>

    </div>
  </div>
</OverseasHead>
