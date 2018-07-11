import React from 'react'
import Item from './item.jsx'
import styled from 'styled-components'

const ItemUL = styled.div`
	& > li{
		border-top: 1px solid #e5e5e5;
		padding: 15px 10px;
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
            localitem={this.props.localitem}
            disabledFunc={this.props.disabledFunc}
            quantityChange={this.props.quantityChange}
            itemEdit={this.props.itemEdit}
            itemDelete={this.props.itemDelete}
            item={item}
            ivalidItem={this.props.ivalidItem}
            itemSelect={this.props.itemSelect} />
  			</li>
  			))
  		}
  	</ItemUL>
  }
}
