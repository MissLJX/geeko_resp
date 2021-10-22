import React from 'react'
import {Switch, Route} from 'react-router-dom'
import OrdersPath from '../order-path/order-path.jsx'
import {injectIntl} from 'react-intl'
// import style from './order.module.css'
import {SelectType} from '../../components/newComponents/new-components'
import { Page } from '../../components/page/page'
import styled from 'styled-components';



const Header = styled.div`
  font-family: Roboto-Regular;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #666666;
  text-align: center;
  margin: 0px 0 6px;
  padding-top: 12px;
`

const OrderList = styled.div`
  margin-top: 16px;
  overflow: hidden;
  overflow-y: scroll;
  height: calc(100% - 161px);
  background: #f6f6f6;
  padding-bottom: 32px;
`

const SubmitBtn = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 61px;
  border-top: 1px solid #e6e6e6;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  font-family: Roboto-Bold;
  span{
    width: 92%;
    height: 38px;
    line-height: 38px;
    background-color: #000;
    color: #fff;
    text-transform: uppercase;
    text-align: center;
  }
`

const Order = class extends React.Component {
  constructor (props) {
    super(props)
    // console.log(props)
    this.state = {
      currentPage: this.getPath(this.props.location.pathname),
      selected: true,
      from: 'ticket'
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
      // {label: intl.formatMessage({id: 'order_status_paid'}), value: 'paid'},
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

  componentWillMount(){
    // console.log('order from:',this.props.history.location.state)
    this.setState({
      from: this.props.history.location.state ? this.props.history.location.state.from : 'ticket'
    })
  }

  render () {
    const {intl} = this.props

    const selectChange = (e) => {
        // console.log(e)
        this.props.history.replace(`${(window.ctx || '')}/support/order/${e}`)
    }

    const linkTo = () => {
      if(!localStorage.__order || localStorage.__order=='null' || localStorage.__order=='{}'){
        // this.props.history.push({pathname: `${(window.ctx || '')}/support/ticket`})
      } else {
        this.props.history.push({pathname: `${(window.ctx || '')}/support/ticketadd`})
      }
    }

    return <div style={{overflow:'hidden'}}>
      <Page label={intl.formatMessage({id: 'Ticket'})}>
        <Header>{intl.formatMessage({id: 'selectorder'})}</Header>
          <SelectType itemList={this.paths} selectChange={(e)=>selectChange(e)}/>

            <OrderList id="orderScroll">
                <Switch>
                    <Route path={`${window.ctx||''}/support/order/:page`} component={OrdersPath}/>
                    <Route path={`${window.ctx||''}/support/order`} component={OrdersPath}/>
                </Switch>
            </OrderList> 

          {/* 提交按钮 */}
          <SubmitBtn>
              <span onClick={()=>linkTo()}>
                {intl.formatMessage({id: 'submit'})}
              </span>    
          </SubmitBtn>
      </Page>
    </div>
  }
}

export default injectIntl(Order)
