import React from 'react'
import styled from 'styled-components'
import Items from './items.jsx'
import CheckBox from '../checkbox.jsx'
import {Grey} from '../text.jsx'
import Icon from '../icon.jsx'

const SelectLine = styled.div`
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 12px;
`

export default class extends React.Component {
  constructor (props) {
    super(props)
  }

  disabledFunc (item) {
    return !item.isAutoInventory && item.inventory < item.quantity
  }

  groupClick (selected) {
    const variantIds = this.props.items.map(item => item.variantId)
    this.props.groupClick(variantIds, selected)
  }

  render () {
    const groupSelected = !this.props.items.find(item => !item.selected)

  	return <div style={this.props.style}>

      {
        this.props.hasHead && <SelectLine>
          <div className="x-table __vm">
            <div className="x-cell">
              <CheckBox onClick={() => { this.groupClick(!groupSelected) }} style={{verticalAlign: 'middle'}} className={ groupSelected ? 'selected' : ''}/>
              <Icon style={{marginLeft: 10, fontSize: 20, verticalAlign: 'middle'}}>&#xe632;</Icon>
              <Grey style={{marginLeft: 5, verticalAlign: 'middle', fontSize: 16}}>Ships From Overseas Warehouse</Grey>
            </div>
            <div className="x-cell"></div>
          </div>
        </SelectLine>
      }

      <Items serverTime={this.props.serverTime}
        disabledFunc={this.disabledFunc}
        quantityChange={this.props.quantityChange}
        itemEdit={this.props.itemEdit}
        itemDelete={this.props.itemDelete}
        itemSelect={(variantId, selected) => { this.props.itemSelect(variantId, selected) }}
        setQuantity={this.props.setQuantity}
        items={this.props.items}/>
    </div>
  }
}
