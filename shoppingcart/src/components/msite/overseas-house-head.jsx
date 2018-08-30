import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import CheckBox from '../checkbox.jsx'
import {Red} from '../text.jsx'
import Money from '../money.jsx'
import Icon from '../icon.jsx'
import {__route_root__} from '../../utils/utils.js'
import {injectIntl} from 'react-intl'

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
      width: 80px;
    }

    & > div:last-child{
      text-align: right;
    }
  }
`

const OverseasouseHead = ({shippingMethod, selected, groupClick, intl}) => <OverseasHead>
  <div className="x-table __vm __fixed x-fw">
    <div className="x-cell">
      <CheckBox onClick={() => { groupClick(!selected) }} className={selected ? 'selected' : ''}/>
    </div>
    <div className="x-cell">
      {intl.formatMessage({id: 'all'})}
      <Icon style={{fontSize: 18, marginLeft: 5}}>&#xe659;</Icon>
    </div>
    <div className="x-cell">
      <Link style={{color: '#222', textDecoration: 'none'}} to={`${window.ctx || ''}${__route_root__}/shipping-methods`}>

        <span>{shippingMethod.title}: </span>
        <Red>{shippingMethod.price.amount > 0 ? <Money money={shippingMethod.price}/> : `${intl.formatMessage({id: 'free_shipping'})}`}</Red>
        <Icon>&#xe694;</Icon>
      </Link>

    </div>
  </div>
</OverseasHead>

export default injectIntl(OverseasouseHead)
