import React from 'react'
import IvalidItemsHead from './ivalid-items-head.jsx'
import Items from './items.jsx'

const InvalidItems = class extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {icon, title, items, isEditingItem} = this.props
    return <div>
		  <IvalidItemsHead isEditingItem={isEditingItem} clearall={this.props.clearall}/>
		  <Items
        disabledFunc={() => true}
        itemDelete={this.props.itemDelete}
        itemSelect={(item, selected) => { this.props.itemSelect(item, selected) }}
        ivalidItem={true}
        isEditingItem={isEditingItem}
        selectedItems={this.props.selectedItems}
        items={items}/>
    </div>
  }
}

export default InvalidItems
