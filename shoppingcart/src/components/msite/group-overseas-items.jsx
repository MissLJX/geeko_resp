import React from 'react'
import OverSeasHouseHead from './overseas-house-head.jsx'
import Items from './items.jsx'
import styled from 'styled-components'

const Tip = styled.div`
  background-color: #fdeff5;
  padding: 10px;
  line-height: 18px;
  font-size: 12px;
`
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
    return false
  }

  render () {
    const {shippingMethod, items, selected, itemSelect, shippingMsg} = this.props

    let count = 0

    items.forEach(i => {
      count += i.quantity
    })

    return <div>
		  <OverSeasHouseHead count={count} groupClick={this.groupClick} shippingMethod={shippingMethod} selected={this.selected()}/>
		  {
        shippingMsg && <Tip>
          <span dangerouslySetInnerHTML={{__html: shippingMsg}}/>

        </Tip>
      }
      <Items serverTime={this.props.serverTime}
        disabledFunc={this.disabledFunc}
        quantityChange={this.props.quantityChange}
        itemEdit={this.props.itemEdit}
        itemDelete={this.props.itemDelete}
        itemSelect={(variantId, selected) => { this.props.itemSelect(variantId, selected) }}
        items={items}/>
    </div>
  }
}
