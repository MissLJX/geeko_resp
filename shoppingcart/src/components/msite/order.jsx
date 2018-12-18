import React from 'react'
import styled from 'styled-components'
import {injectIntl} from 'react-intl'
import OrderItem from './order-item.jsx'
import {Grey, Red} from '../text.jsx'
import Money from '../money.jsx'

const ORDER = styled.div`
	.__fd{
		height: 45px;
		line-height: 45px;
		border-top: 1px solid #ededed;
		text-align: right;
		padding-left: 10px;
		padding-right: 10px;
	}

	ul{
		padding-left: 10px;
		padding-right: 10px;

		& > li{
			border-top: 1px solid #ededed;
			&:first-child{
				border-top: none;
			}
		}
	}
`

const ORDERHEAD = styled.div`
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ededed;
  padding-left: 10px;
`

const Order = class extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
  	const {intl, transaction} = this.props

  	return <ORDER>
      <ORDERHEAD>
        <span>{intl.formatMessage({id: 'order_no'})}: </span>
        <Grey>{transaction.id}</Grey>
      </ORDERHEAD>
  		<ul>
  			{transaction.orderItems.map(item => (
  				<li key={item.variantId}>
  					<OrderItem item={item}/>
  				</li>
  			))}
  		</ul>
  		<div className="__fd">
  			<span>{intl.formatMessage({id: 'total'})}: </span><Red><Money money={transaction.orderTotal}/> </Red><span>(<Money money={transaction.shippingPrice}/> shipping cost)</span>
  		</div>
  	</ORDER>
  }
}

export default injectIntl(Order)
