import React from 'react'
import {getOrders} from '../../api'
import {gloabvars} from '../../commons/instance.js'
import {Switch, Route} from 'react-router-dom'
import OrdersPath from '../order-path/order-path.jsx'
import PageContanier1 from '../../components/page-contanier/page-contanier';
import {injectIntl} from 'react-intl'
import PageHeader1 from '../../components/page-header/page-header';
import style from './order.module.css'
import SelectType from '../../components/select-type/select-type'

const Order = class extends React.Component {
  constructor (props) {
    super(props)
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
      // if (this.props.to) {
      //   this.props.history.replace(this.props.to)
      // } else if (this.props.href) {
      //   window.location.href = this.props.href
      // } else {
      //   this.props.history.goBack()
      // }
      window.location.href = "/supportnew/ticketadd"
    }

    return <div style={{overflow:'hidden'}}>
      <PageHeader1 label={intl.formatMessage({id: 'Ticket'})}/>
      <PageContanier1>
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
      </PageContanier1>
    </div>
  }
}

export default injectIntl(Order)
