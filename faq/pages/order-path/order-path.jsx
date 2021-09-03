import React from 'react'
import {getOrders} from '../../api'
import {withScroll} from '../../HoCs/list.jsx'
import {gloabvars} from '../../commons/instance.js'
import styled from 'styled-components'
import {NewOrderList} from '../../components/newComponents/new-components'

export default class Orders extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      orders: null,
      skip: 0,
      limit: 20,
      loading: false,
      finished: false,
      selectedOrderId: gloabvars.selectedOrder ? gloabvars.selectedOrder.id : null,
      page: this.props.match.params.page
    }
    this.scrollHandler = this.scrollHandler.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillReceiveProps (newProps) {
    if (this.props.match.params.page != newProps.match.params.page) {
      this.setState({
        loading: false,
        finished: false,
        orders: null,
        skip: 0,
        page: newProps.match.params.page
      })

      setTimeout(() => {
        this.getData(newProps.match.params.page)
      }, 0)
    }
  }

  handleClick (evt, _detail) {
    gloabvars.selectedOrder = this.state.selectedOrderId === _detail.id ? null : _detail
    // console.log(gloabvars)
    localStorage.__order=this.state.selectedOrderId === _detail.id ? null : JSON.stringify(_detail)
    this.setState({
      selectedOrderId: this.state.selectedOrderId === _detail.id ? null : _detail.id,
      orders: this.state.orders.map(({detail, selected}) => ({
        selected: _detail.id === detail.id && !selected,
        id: detail.id,
        detail: detail
      }))
    })
  }

  scrollHandler (evt) {
    this.getData(this.state.page)
  }

  getData (page) {
    const getsuffix = () => {
      let suffix = 'get-orders2'
      switch (page) {
        case 'processing':
          suffix = 'get-unpaid-orders2'
          break
        case 'unpaid':
          suffix = 'get-unpaid-orders2'
          break
        case 'confirmed':
          suffix = 'get-receipt-orders'
          break
        case 'shipped':
          suffix = 'get-shipped-orders'
          break
        case 'canceled':
          suffix = 'get-canceled-orders'
          break
        default:
          suffix = 'get-orders2'
      }
      return suffix
    }
    if (!this.state.loading && !this.state.finished) {
      this.setState({loading: true})
      getOrders(getsuffix(page), this.state.skip, this.state.limit).then(({result: orders}) => {
        const _orders = orders ? orders.map(order => ({
          selected: this.state.selectedOrderId === order.id,
          id: order.id,
          detail: order
        })) : []

        this.setState({
          orders: (this.state.orders || []).concat(_orders),
          skip: this.state.skip + this.state.limit,
          loading: false,
          finished: !orders || !orders.length
        })
      }).catch(err => {
        // console.log(err)
        this.setState({
          loading: false
        })
        if(err.code == 300){
          // window.location.href = "/i/login"
        }
      })
    }
  }

  componentWillMount () {
    this.getData(this.state.page)
  }

  render () {
    // const ScrollOrders = withScroll(OrderList)
    const ScrollOrders = withScroll(NewOrderList)

    const Loading = styled.div`
			height: 50px;
			line-height: 50px;
			color: '#666';
			text-align: center;
			font-size: 12px;
		`

    const loading = this.state.finished ? <Loading>No more.</Loading> : (this.state.loading && <Loading>Loading...</Loading>)

    return <div>
      <ScrollOrders scrollHandler={this.scrollHandler} clickHandler={this.handleClick} orders={this.state.orders} />

      {loading}
    </div>
  }
}
