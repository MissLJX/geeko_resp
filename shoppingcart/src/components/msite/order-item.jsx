import React from 'react'
import styled from 'styled-components'
import LinkImage from '../link-image.jsx'
import Ellipsis from '../ellipsis.jsx'
import {Grey, Red} from '../text.jsx'
import Money from '../money.jsx'
import {injectIntl} from 'react-intl'
import {producturl, strconcat} from '../../utils/utils.js'

const Item = styled.div`
	padding-top: 10px;
	padding-bottom: 10px;

	& > .x-table{
		& > .x-cell{
			&:first-child{
				width: 60px;
			}

			&:nth-child(2){
				padding-left: 10px;
				& > div{
					margin-top: 16px;
					&:first-child{
						margin-top: 0;
					}
				}
			}

			&:last-child{
				width: 40px;
				text-align: right;
			}
		}
	}
`

const OrderItem = class extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
  	const {intl, item} = this.props

  	return <Item>
  		<div className="x-table __fixed __vt x-fw">
  			<div className="x-cell">
  				<LinkImage href={producturl({id: item.productId, name: item.productName})} src={item.productImageUrl}/>
  			</div>
  			<div className="x-cell">
  				<div><Ellipsis>{item.productName}</Ellipsis></div>
  				<div><Red><strong><Money money={item.price}/></strong></Red></div>
  				<div>{strconcat(item.color, item.size)}</div>
  			</div>
  			<div className="x-cell">
  				<Ellipsis>x{item.quantity}</Ellipsis>
  			</div>
  		</div>
  	</Item>
  }
}

export default injectIntl(OrderItem)
