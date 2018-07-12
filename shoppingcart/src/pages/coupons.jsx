import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import FullFixed from '../components/msite/full-fixed.jsx'
import {refreshCart} from '../store/actions.js'
import Coupons from '../components/msite/coupons.jsx'
import {getcoupons, usecoupon, unusecoupon, usecouponcode} from '../api'
import {injectIntl} from 'react-intl'
import {__route_root__} from '../utils/utils.js'

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    REFRESHCART: (cart) => {
      dispatch(refreshCart(cart))
    }
  }
}

const Coupon = class extends React.Component {
  constructor (props) {
    super(props)
    this.close = this.close.bind(this)
  }

  close (evt) {
  	evt.preventDefault()
    this.props.history.replace(`${window.ctx || ''}${__route_root__}/`)
  }

  couponSelect (id) {
    if (id) {
      usecoupon(id).then(() => {
        this.props.REFRESHCART()
        this.props.history.replace(`${window.ctx || ''}${__route_root__}/`)
      })
    } else {
      unusecoupon().then(() => {
        this.props.REFRESHCART()
        this.props.history.replace(`${window.ctx || ''}${__route_root__}/`)
      })
    }
  }

  render () {
    const {coupons, cart, intl} = this.props
    return <FullFixed onClose={this.close} title={intl.formatMessage({id: 'coupon'})}>
      {coupons && cart && <Coupons couponSelect={this.couponSelect.bind(this)} selectedId={cart.coupon ? cart.coupon.id : null} coupons={this.props.coupons}/>}
    </FullFixed>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Coupon))
