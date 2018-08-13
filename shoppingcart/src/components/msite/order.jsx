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

const Order = class extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
  	const {intl, orderVo} = this.props
  	const {order} = orderVo

  	return <ORDER>
  		<ul>
  			{order.orderItems.map(item => (
  				<li key={item.variantId}>
  					<OrderItem item={item}/>
  				</li>
  			))}
  		</ul>
  		<div className="__fd">
  			<span>Total: </span><Red><Money money={order.orderTotal}/> </Red><span>(<Money money={order.shippingPrice}/> shipping cost)</span>
  		</div>
  	</ORDER>
  }
}

export default injectIntl(Order)
