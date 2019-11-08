import React from 'react'
import Item from './item.jsx'
import styled from 'styled-components'

const ItemUL = styled.div`
	& > li{
		padding: 15px 10px;
    position: relative;
    &::before{
      position: absolute;
      height: 1px;
      width: 40px;
      background-color: #fff;
      left:0;
      top:-1px;
      content: '';
    }
		&:first-child{
			border-top: none;
      &::before{
        background-color: transparent;
      }
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
						localitem={this.props.localitem}
						disabledFunc={this.props.disabledFunc}
						quantityChange={this.props.quantityChange}
						itemEdit={this.props.itemEdit}
						itemDelete={this.props.itemDelete}
						item={item}
						combinatorialPromotionTitle={this.props.combinatorialPromotionTitle}
						ivalidItem={this.props.ivalidItem}
						itemSelect={this.props.itemSelect} />
  			</li>
  			))
  		}
  	</ItemUL>
	}
}
