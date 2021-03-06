import React from 'react'
import styled from 'styled-components'
import Items from './items.jsx'
import CheckBox from '../checkbox.jsx'
import {Grey, Red, Green} from '../text.jsx'
import Money from '../money.jsx'
import {injectIntl} from 'react-intl'

const SelectLine = styled.div`
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 12px;
`

const GropLocalItems = class extends React.Component {
  constructor (props) {
    super(props)
  }

  disabledFunc (item) {
    return !item.isDomesticDeliveryEnabled
  }

  groupClick (selected, items) {
    const variantIds = items.map(item => item.variantId)
    this.props.groupClick(variantIds, selected)
  }

  isOutStock (item) {
    return (item.inventory <= 0 && !item.isDomesticDelivery) && !item.isAutoInventory || item.status !== '1'
  }

  getValidItems (items = []) {
    return items.filter(item => !this.isOutStock(item))
  }

  render () {
  	const { domestic, intl } = this.props
    const { shoppingCartProducts } = domestic

    const items = this.getValidItems(shoppingCartProducts)

    const groupSelected = !items.find(item => !item.selected)
  	return <div style={this.props.style}>
      <SelectLine>
        <div className="x-table __vm x-fw">
          <div className="x-cell">
            <CheckBox onClick={() => { this.groupClick(!groupSelected, items) }} style={{verticalAlign: 'middle'}} className={groupSelected ? 'selected' : ''}/>
            {/* <img style={{verticalAlign: 'middle', height: 40, marginLeft: 10}} src={domestic.icon}/> */}
            <span style={{marginLeft: 10, verticalAlign: 'middle', fontSize: 16}}>{ domestic.title }</span>
          </div>
          <div className="x-cell __right">
          	{
          		domestic.domesticDeliveryShippingPrice && domestic.domesticDeliveryShippingPrice.amount > 0 ? <span>Standard Shipping: <Money money={domestic.domesticDeliveryShippingPrice}/></span> : <Green>{ intl.formatMessage({id: 'free_shipping'}) }</Green>
          	}
          </div>
        </div>
      </SelectLine>

      <Items serverTime={this.props.serverTime}
        disabledFunc={this.disabledFunc}
        quantityChange={this.props.quantityChange}
        itemEdit={this.props.itemEdit}
        itemDelete={this.props.itemDelete}
        itemSelect={(variantId, selected) => { this.props.itemSelect(variantId, selected) }}
        overseasHandle={this.props.overseasHandle}
        setQuantity={this.props.setQuantity}
        items={items}/>
    </div>
  }
}

export default injectIntl(GropLocalItems)
