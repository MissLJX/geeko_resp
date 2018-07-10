import React from 'react'
import IvalidItemsHead from './ivalid-items-head.jsx'
import Items from './items.jsx'

const InvalidItems = class extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {icon, title, items} = this.props
    return <div>
		  <IvalidItemsHead clearall={this.props.clearall}/>
		  <Items
        disabledFunc={() => true}
        itemDelete={this.props.itemDelete}
        ivalidItem={true}
        items={items}/>
    </div>
  }
}

export default InvalidItems
