import React from 'react'
import OverSeasHouseHead from './overseas-house-head.jsx'
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

  render () {
    const {shippingMethod, items, selected, itemSelect} = this.props
    return <div>
		  <OverSeasHouseHead groupClick={this.groupClick} shippingMethod={shippingMethod} selected={this.selected()}/>
		  <Items quantityChange={this.props.quantityChange} itemEdit={this.props.itemEdit} itemSelect={(variantId, selected) => { this.props.itemSelect(variantId, selected) }} items={items}/>
    </div>
  }
}
