import React from 'react'
import {getOrders} from '../api'
import {gloabvars} from '../commons/instance.js'
import {Switch, Route} from 'react-router-dom'
import OrdersPath from './orders-path.jsx'
import {GeekoSelect, PageHeader, PageContanier} from '../components/buttons.jsx'
import {injectIntl} from 'react-intl'

const Orders = class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPage: this.getPath(this.props.location.pathname)
    }

    const {intl} = props

    //   order_status_all: 'All',
    // order_status_unpaid: 'Unpaid',
    // order_status_processing: 'Processing',
    // order_status_shipped: 'Shipped',
    // order_status_confirmed: 'Confirmed',
    // order_status_canceled: 'Canceled'

    this.paths = [
      {label: intl.formatMessage({id: 'order_status_all'}), value: 'all'},
      {label: intl.formatMessage({id: 'order_status_unpaid'}), value: 'unpaid'},
      {label: intl.formatMessage({id: 'order_status_processing'}), value: 'processing'},
      {label: intl.formatMessage({id: 'order_status_shipped'}), value: 'shipped'},
      {label: intl.formatMessage({id: 'order_status_confirmed'}), value: 'confirmed'},
      {label: intl.formatMessage({id: 'order_status_canceled'}), value: 'canceled'}

    ]
  }

  getPath (str) {
    const lastindex = str.lastIndexOf('/')
    return str.substring(lastindex + 1, str.length)
  }

  render () {
    const {intl} = this.props

    return <div>
      <PageHeader label={intl.formatMessage({id: 'orders'})} tool={intl.formatMessage({id: 'submit'})}/>
      <PageContanier>
      	<div style={{backgroundColor: '#fff', boxShadow: '0 0 5px rgba(0, 0, 0, .1)', padding: '10px', position: 'fixed', zIndex: 10, top: '50px', width: '100%'}}>
          <GeekoSelect value={this.state.currentPage} onChange={(evt) => { this.setState({currentPage: evt.currentTarget.value}); this.props.history.replace(`/support/orders/${evt.currentTarget.value}`) }} style={{width: '100%', height: '40px', marginTop: '10px'}}>
            {this.paths.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </GeekoSelect>
        </div>

      	<div style={{marginTop: '120px'}}>
      		<Switch>

            <Route path="/support/orders/:page" component={OrdersPath}/>
            <Route path="/support/orders" component={OrdersPath}/>
      		</Switch>
      	</div>
      </PageContanier>
    </div>
  }
}

export default injectIntl(Orders)
