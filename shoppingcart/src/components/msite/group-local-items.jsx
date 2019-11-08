import React from 'react'
import LocalHouseHead from './local-house-head.jsx'
import Items from './items.jsx'

export default class extends React.Component {
	constructor (props) {
		super(props)
		this.groupClick = this.groupClick.bind(this)
	}

	groupClick (selected) {
		const variantIds = this.props.items.map(item => item.variantId)
		this.props.groupClick(variantIds, selected)
	}

	selected () {
		return !this.props.items.find(item => !item.selected)
	}

	disabledFunc (item) {
		return !item.isDomesticDeliveryEnabled
	}

	render () {
		const {icon, title, items, domestic} = this.props

		let count = 0

		items.forEach(i => {
			count += i.quantity
		})

		return <div>
			<LocalHouseHead count={count} shippingPrice={domestic.domesticDeliveryShippingPrice} icon={icon} title={title} groupClick={this.groupClick} selected={this.selected()}/>
			<Items serverTime={this.props.serverTime}
				overseasHandle={this.props.overseasHandle}
				localitem="true"
				disabledFunc={this.disabledFunc}
				quantityChange={this.props.quantityChange}
				itemEdit={this.props.itemEdit}
				itemDelete={this.props.itemDelete}
				itemSelect={(variantId, selected) => { this.props.itemSelect(variantId, selected) }}
				items={items}/>
		</div>
	}
}
