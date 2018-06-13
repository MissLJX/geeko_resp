import React from 'react'
import {getOrders} from '../api'
import {gloabvars} from '../commons/instance.js'

export default class Orders extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      orders: null,
      skip: 0,
      limit: 20,
      selectedOrderId: gloabvars.selectedOrder ? gloabvars.selectedOrder.id : null
    }
  }

  handleClick (evt, _detail) {
  	gloabvars.selectedOrder = _detail.order
  	this.setState({
  		selectedOrderId: _detail.id,
  		orders: this.state.orders.map(({detail}) => ({
  			selected: _detail.id === detail.id,
  			id: detail.id,
  			detail: detail
  		}))
  	})
  }

  componentWillMount () {
  	getOrders('get-order-list', this.state.skip, this.state.limit).then(({result: orders}) => {
  		this.setState({
  			orders: orders.map(order => ({
  				selected: this.state.selectedOrderId === order.id,
  				id: order.id,
  				detail: order
  			})),
  			skip: this.state.skip + this.state.limit
  		})
  	})
  }

  render () {
    return <div>

    	<ul>
    		{this.state.orders && this.state.orders.map((order) => (
    			<li style={{color: order.selected ? 'red' : '#000'}} onClick={(evt) => { this.handleClick(evt, order.detail) }} key={order.id}>{order.id}</li>

    		))}

    	</ul>
    </div>
  }
}
