import React from 'react'
import Item from './item.jsx'
import styled from 'styled-components'

const ItemUL = styled.div`
	& > li{
    &:first-child{
      border-top: none;
    }
	}
`

export default class extends React.Component {
	constructor (props) {
		super(props)
	}

	render () {
  	return <ItemUL>
  		{this.props.items && this.props.items.map((item) => (
  			<li key={item.variantId}>
  				<Item serverTime={this.props.serverTime}
			            overseasHandle={this.props.overseasHandle}
						setQuantity={this.props.setQuantity}
			            localitem={this.props.localitem}
			            disabledFunc={this.props.disabledFunc}
			            quantityChange={this.props.quantityChange}
			            itemEdit={this.props.itemEdit}
			            itemDelete={this.props.itemDelete}
			            item={item}
			            invalidItem={this.props.invalidItem}
			            itemSelect={this.props.itemSelect}
						combinatorialPromotionTitle={this.props.combinatorialPromotionTitle}
						isGift={this.props.isGift} />
  			</li>
  			))
  		}
  	</ItemUL>
	}
}
