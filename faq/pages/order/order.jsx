import React from 'react'
import {Switch, Route} from 'react-router-dom'
import OrdersPath from '../order-path/order-path.jsx'
import {injectIntl} from 'react-intl'
import style from './order.module.css'
import {SelectType} from '../../components/newComponents/new-components'
import { Page } from '../../components/page/page'

const Order = class extends React.Component {
  constructor (props) {
    super(props)
    console.log(props)
    this.state = {
      currentPage: this.getPath(this.props.location.pathname),
      selected: true,
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

    const selectChange = (e) => {
        console.log(e)
        this.props.history.replace(`/supportnew/order/${e}`)
    }

    const linkTo = () => {
      // window.location.href = "/supportnew/ticketadd"
      this.props.history.push({pathname: "/supportnew/ticketadd"})

    }

    return <div style={{overflow:'hidden'}}>
      <Page label={intl.formatMessage({id: 'Ticket'})}>
        <div className={style.header}>{intl.formatMessage({id: 'selectorder'})}</div>
          <SelectType itemList={this.paths} selectChange={(e)=>selectChange(e)}/>

            <div className={style.orderList}>
                <Switch>
                    <Route path={`${window.ctx||''}/supportnew/order/:page`} component={OrdersPath}/>
                    <Route path={`${window.ctx||''}/supportnew/order`} component={OrdersPath}/>
                </Switch>
            </div> 

          {/* 提交按钮 */}
          <div className={style.submitBtn} >
              <span onClick={()=>linkTo()}>
                {intl.formatMessage({id: 'submit'})}
              </span>    
          </div>
      </Page>
    </div>
  }
}

export default injectIntl(Order)
