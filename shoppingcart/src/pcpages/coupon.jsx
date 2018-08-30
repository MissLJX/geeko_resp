import React from 'react'
import styled from 'styled-components'
import {injectIntl} from 'react-intl'
import { connect } from 'react-redux'

import {refreshCart} from '../store/actions.js'
import {getcoupons, usecoupon, unusecoupon, usecouponcode} from '../api'
import {__route_root__} from '../utils/utils.js'

import Coupons from '../components/pc/coupon.jsx'
import Icon from '../components/icon.jsx'

const COUPONWINDOW = styled.div`
	position: fixed;
	top: 50px;
	right: 0;
	width: 380px;
	z-index: 20;
	box-shadow: -1px 0px 4px 0px rgba(0, 0, 0, 0.18);
	height: calc(100% - 50px);
	& > .__hd{
		height: 90px;
		background-color: #efefef;
		position: relative;
		line-height: 90px;
		padding-left: 15px;
		
		.__title{
			font-size: 24px;
			color: #222;
		}
		.__close{
			font-size: 30px;
			position: absolute;
			right: 20px;
			top: 0;
      cursor: pointer;
		}

	}

	& > .__bd{
		height: calc(100% - 90px);
		overflow: auto;
		background-color: #fff;
		padding-left: 15px;
		padding-top: 15px;
	}

`

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

const CouponWindow = class extends React.Component {
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
    const {coupons, cart, intl, history} = this.props
    return <COUPONWINDOW>
      <div className="__hd">
        <div className="__title">{intl.formatMessage({id: 'select_coupon'})}</div>
        <span className="__close" onClick={ this.close }><Icon style={{fontSize: 28}}>&#xe69a;</Icon></span>
      </div>
      <div className="__bd">
      	{coupons && cart && <Coupons couponSelect={this.couponSelect.bind(this)} couponVOs={coupons} selectedCoupon={cart.coupon}/>}

      </div>

    </COUPONWINDOW>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(CouponWindow))
