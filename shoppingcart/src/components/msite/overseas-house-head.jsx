import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import CheckBox from '../checkbox.jsx'
import {Red, Green} from '../text.jsx'
import Money from '../money.jsx'
import Icon from '../icon.jsx'
import {__route_root__} from '../../utils/utils.js'
import {injectIntl} from 'react-intl'

const OverseasHead = styled.div`
  height: 60px;
  padding: 0 10px;
  & > div{
    height: 100%;
    border-bottom: 1px solid #e5e5e5;
    & > div:first-child, & > div:last-child{
      width: 30px;
    }

  }
`

const OverseasouseHead = ({shippingMethod, selected, groupClick, intl, count}) => <OverseasHead>
  <div className="x-table __vm __fixed x-fw">
    <div className="x-cell">
      <CheckBox onClick={() => { groupClick(!selected) }} className={selected ? 'selected' : ''}/>
    </div>
    <div className="x-cell">
      <div>
        <span>{shippingMethod.title}:{
          shippingMethod.price.amount > 0 ? <Red>
            <Money money={shippingMethod.price}/>
          </Red> : <Green>{intl.formatMessage({id: 'free_shipping'})}</Green>
        }</span>
      </div>
      <div style={{fontSize: 12, marginTop: 4}}>
        <span>{shippingMethod.shippingTime}</span>
      </div>
    </div>
    <div className="x-cell __right">
      <Link style={{color: '#222', textDecoration: 'none'}} to={`${window.ctx || ''}${__route_root__}/shipping-methods`}>
        <Icon>&#xe694;</Icon>
      </Link>
    </div>
  </div>
</OverseasHead>

export default injectIntl(OverseasouseHead)
