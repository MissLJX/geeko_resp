import React from 'react'
import Item, { EditItem } from './item.jsx'
import styled from 'styled-components'

const ItemUL = styled.ul`
	padding: 10px 0;
	& > li{
		padding: 10px 12px;
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
	constructor(props) {
		super(props)
	}

	render() {
		const {selectedItems} = this.props
		const selected = item => (selectedItems || []).some(i => i.variantId ===item.variantId)
		return <ItemUL>
			{this.props.items && this.props.items.map((item) => (
				<li key={item.variantId}>

					{
						this.props.isEditingItem ? <EditItem 
							disabledFunc={this.props.disabledFunc}
							ivalidItem={this.props.ivalidItem}
							itemSelect={this.props.itemSelect}
							item={item}
							selected={selected(item)}
						/> : <Item serverTime={this.props.serverTime}
							overseasHandle={this.props.overseasHandle}
							localitem={this.props.localitem}
							disabledFunc={this.props.disabledFunc}
							quantityChange={this.props.quantityChange}
							itemEdit={this.props.itemEdit}
							itemDelete={this.props.itemDelete}
							itemWish={this.props.itemWish}
							item={item}
							combinatorialPromotionTitle={this.props.combinatorialPromotionTitle}
							ivalidItem={this.props.ivalidItem}
							itemSelect={this.props.itemSelect} />
					}

				</li>
			))
			}
		</ItemUL>
	}
}
