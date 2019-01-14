import React from 'react'
import styled from 'styled-components'
import FullFixed from '../components/msite/full-fixed.jsx'
import { connect } from 'react-redux'
import {__route_root__} from '../utils/utils.js'
import { Redirect } from 'react-router-dom'
import { checkout_pay } from '../api'
import {goOrder} from '../utils/common-pay.js'

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

const IFrame = styled.iframe`
	-webkit-overflow-scrolling: touch;
	height:100%;
	width:100%;
  padding-left:20px;
  padding-right:20px;
`

const DLocal = class extends React.Component {
  constructor (props) {
    super(props)
    this.close = this.close.bind(this)
  }

  componentWillMount () {
  	window.dLocalPay = (result, errBack) => {
      const { checkout } = this.props
      this.payDLocal({...result, orderId: checkout.orderId, payMethod: checkout.payMethod}).catch(({result}) => errBack(result))
    }
  }

  payDLocal (result) {
    return checkout_pay(result).then(goOrder)
  }

  close (evt) {
  	evt.preventDefault()
    this.props.history.replace(`${window.ctx || ''}/checkout/${this.props.checkout.orderId}`)
  }

  render () {
    const { checkout } = this.props

    let currency, country, amount
    if (checkout) {
      currency = checkout.orderTotal.currency
      amount = checkout.orderTotal.amount
      country = checkout.shippingDetail.country ? checkout.shippingDetail.country.value : window.__country
    }

  	return <FullFixed onClose={this.close} title="DLocal">
    		<IFrame src={`${window.ctx || ''}/i/dlocal?currency=${currency}&country=${country}&amount=${amount}`} frameBorder="0" scrolling="auto" seamless/>
    </FullFixed>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DLocal)
