import React from 'react'
import styled from 'styled-components'
import Items from './items.jsx'
import CheckBox from '../checkbox.jsx'
import {Grey, Red} from '../text.jsx'
import Icon from '../icon.jsx'
import {GiftIcon} from '../promotion-icons.jsx'
import { FormattedMessage } from 'react-intl'
import { getLink } from '../../utils/utils.js'

const SelectLine = styled.div`
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 12px;
`

const ADDICON = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px dashed #e64545;
  text-align: center;
  line-height: 18px;
  color: #e64545;
  display: inline-block;
`

const PromotionHead = ({promotion, selected, selectHandle}) => <SelectLine style={{paddingTop: 25, borderTop: '1px dashed #e5e5e5'}}>
  <div className="x-table __hd __vm x-fw">
    <div className="x-cell" style={{width: 30}}>
      <CheckBox onClick={ () => { selectHandle(!selected) } } className={selected ? 'selected' : ''}/>
    </div>
    <div className="x-cell">
      <GiftIcon label={promotion.title}/>
    </div>
    <div className="x-cell __right">
      <a className="__href" href={getLink(promotion.deepLink)} style={{textDecoration: 'none', color: '#222'}}>
        <ADDICON>+</ADDICON>
        <Red style={{marginLeft: 5}}><FormattedMessage id="add"/></Red>
        {/* <Icon style={{fontSize: 16, marginLeft: 5}}>&#xe694;</Icon> */}
      </a>
    </div>
  </div>
</SelectLine>

const Promotion = class extends React.Component {
  constructor (props) {
    super(props)
  }

  groupClick (selected) {
    const {delivery} = this.props

    const items = delivery.shoppingCartProducts || []

    const variantIds = items.map(item => item.variantId)
    this.props.groupClick(variantIds, selected)
  }

  selected () {
    const { delivery } = this.props
    let _selected = true
    let items = delivery.shoppingCartProducts
    for (let j = 0, jen = items.length; j < jen; j++) {
      if (!items[j].selected) {
        _selected = false
        break
      }
    }

    return _selected
  }
  disabledFunc (item) {
    return !item.isAutoInventory && item.inventory < item.quantity
  }

  render () {
    const {delivery} = this.props

    return <div>
      { delivery.combinatorialPromotion && <PromotionHead selectHandle={ this.groupClick.bind(this) } selected={this.selected()} promotion={delivery.combinatorialPromotion}/> }
      <Items serverTime={this.props.serverTime}
        disabledFunc={this.disabledFunc}
        quantityChange={this.props.quantityChange}
        itemEdit={this.props.itemEdit}
        itemDelete={this.props.itemDelete}
        itemSelect={(variantId, selected) => { this.props.itemSelect(variantId, selected) }}
        setQuantity={this.props.setQuantity}
        combinatorialPromotionTitle = {delivery.combinatorialPromotion ? delivery.combinatorialPromotion.title : null}
        items={delivery.shoppingCartProducts}/>
    </div>
  }
}

export default class extends React.Component {
  constructor (props) {
    super(props)
  }

  disabledFunc (item) {
    return !item.isAutoInventory && item.inventory < item.quantity
  }

  groupClick (selected) {
    const variantIds = []
    const { group } = this.props
    const deliveryItems = group.deliveryItems
    deliveryItems.forEach(delivery => {
      let items = delivery.shoppingCartProducts
      if (items && items.length) {
        items.forEach(item => {
          variantIds.push(item.variantId)
        })
      }
    })

    this.props.groupClick(variantIds, selected)
  }

  selected () {
    const { group } = this.props
    const deliveryItems = group.deliveryItems
    let _selected = true

    let items
    outer:
    for (let i = 0, len = deliveryItems.length; i < len; i++) {
      items = deliveryItems[i].shoppingCartProducts
      if (!items) continue outer
      inner:
      for (let j = 0, jen = items.length; j < jen; j++) {
        if (!items[j].selected) {
          _selected = false
          break outer
        }
      }
    }

    return _selected
  }

  render () {
    const {group} = this.props
    const { deliveryItems, shippingPrice } = group

    const groupSelected = this.selected()

  	return <div style={this.props.style}>

      {
        this.props.hasHead && <SelectLine>
          <div className="x-table __vm">
            <div className="x-cell">
              <CheckBox onClick={() => { this.groupClick(!groupSelected) }} style={{verticalAlign: 'middle'}} className={ groupSelected ? 'selected' : ''}/>
              {/* <Icon style={{marginLeft: 10, fontSize: 20, verticalAlign: 'middle'}}>&#xe632;</Icon> */}
              <span style={{marginLeft: 10, verticalAlign: 'middle', fontSize: 16}}>Ships From Overseas Warehouse</span>
            </div>
            <div className="x-cell"></div>
          </div>
        </SelectLine>
      }

      {
        deliveryItems.map((delivery, i) => <div key={i}>
          <Promotion serverTime={this.props.serverTime}
            disabledFunc={this.disabledFunc}
            quantityChange={this.props.quantityChange}
            itemEdit={this.props.itemEdit}
            itemDelete={this.props.itemDelete}
            itemSelect={(variantId, selected) => { this.props.itemSelect(variantId, selected) }}
            setQuantity={this.props.setQuantity}
            groupClick={this.props.groupClick}
            delivery={delivery}/>
        </div>)
      }
    </div>
  }
}
