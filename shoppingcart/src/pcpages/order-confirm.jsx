import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {injectIntl, FormattedMessage} from 'react-intl'
import Icon from '../components/icon.jsx'

const mapStateToProps = (state) => {
  return {
    transaction: state.transaction,
    me: state.me,
    m1132: state.m1132,
    m1133: state.m1133,
    m1147: state.m1147,
    m1073: state.m1073
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GETTRANSACTIONPAGE: (transactionId) => {
      dispatch(fetchTransactionPage(transactionId))
    }
  }
}

const OrderConfirm = class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      products: []
    }
  }

  componentWillMount () {
    const {transactionId} = this.props.match.params
  	this.props.GETTRANSACTIONPAGE(transactionId)
    gettransactionrelatedproducts(transactionId, 0, 20).then(({result}) => {
      this.setState({
        products: [...this.state.products, ...result]
      })
    })
  }

  handleViewOrder (){
    if(!window.__is_login__ && this.props.transaction.orderVos[0].order.payMethod === '1'){
      this.props.history.push(`${this.props.match.url}/set-password`)
    }else{
      window.location.href = `${window.ctx || ''}/me/m/order`
    }
    
  }

const OrderConfirm = class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      products: []
    }
  }

  componentWillMount () {
    const {transactionId} = this.props.match.params
  	this.props.GETTRANSACTIONPAGE(transactionId)
    gettransactionrelatedproducts(transactionId, 0, 20).then(({result}) => {
      this.setState({
        products: [...this.state.products, ...result]
      })
    })
  }

  handleViewOrder () {
    if (!window.__is_login__ && this.props.transaction.orderVos[0].order.payMethod === '1') {
      this.props.history.push(`${this.props.match.url}/set-password`)
    } else {
      window.location.href = `${window.ctx || ''}/me/m/order`
    }
  }

  render () {
  	const {transaction, me, m1132, m1133, m1147, m1073} = this.props
  	const {message, orderVos} = transaction || {}
  	const orderVo = orderVos ? orderVos[0] : null

    const getTitle = () => {
      if (orderVo.order.payBarCode) { return <div>Seu pedido de compra foi realizado! Pague agora seu Boleto Bancário paraagilizar a confirmação do seu pedido.</div> }
      if (orderVo.order.mercadopagoPayURL) { return <div dangerouslySetInnerHTML={{__html: m1147.message}}/> }
      return <div>{message} <a style={{color: 'skyblue'}} href="#">{me.communicationEmail}</a><Icon style={{marginLeft: 10, color: 'skyblue', cursor: 'pointer'}}>&#xe61f;</Icon></div>
    }

    return <div>
    	{
    		transaction && <div>
    			<div className="x-table">
    				<div className="x-cell">
    					<Icon style={{color: '#57b936', fontSize: 32}}>&#xe73c;</Icon>
    				</div>
    				<div className="x-cell">
    					<div style={{fontFamily: 'HelveticaNeue-Medium', fontSize: 16}}>
    						<FormattedMessage id="thanks_for_shopping"/>!
    					</div>

    				</div>
    			</div>
    		</div>
    	}
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(OrderConfirm))

