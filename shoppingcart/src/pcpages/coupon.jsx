import React from 'react'
import styled from 'styled-components'
import {FormattedMessage, injectIntl} from 'react-intl'
import { connect } from 'react-redux'

import {refreshCart} from '../store/actions.js'
import {getcoupons, usecoupon, unusecoupon, usecouponcode} from '../api'
import {__route_root__} from '../utils/utils.js'

import Coupons from '../components/pc/coupon.jsx'
import Icon from '../components/icon.jsx'
import TypeMessage from '../components/type-message.jsx'

const COUPONWINDOW = styled.div`
	position: fixed;
	top: 50px;
	right: 0;
	width: 380px;
	z-index: 100;
	box-shadow: -1px 0px 4px 0px rgba(0, 0, 0, 0.18);
	height: calc(100% - 50px);
	& > .__hd{
		height: 50px;
		background-color: #efefef;
		position: relative;
		line-height: 50px;
		padding-left: 15px;
		
		.__title{
			font-size: 18px;
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
		height: calc(100% - 50px);
		overflow: auto;
		background-color: #fff;
		padding-left: 15px;
		padding-top: 15px;
	}

`

const CouponCode = styled.div`
  width: 332px;
  &::after{
    content: '';
    clear: both;
    display: block;
  }
  & > .__input{
    width: 227px;
    height: 40px;
    border: solid 1px #cacaca;
    float: left;
    input{
      height: 100%;
      width: 100%;
      border: none;
      box-shadow: none;
      outline: none;
      -webkit-appearance: none;
      padding-left: 10px;
    }
  }

  & > .__use{
    width: 105px;
    height: 40px;
    background-color: #222;
    float: left;
    text-align: center;
    color: #fff;
    line-height: 40px;
    cursor: pointer;
    &:active{
      opacity: .6;
      line-height: 42px;
    }
  }
`

const MESSAGE = styled.div`
  width: 332px;
	background-color: rgb(255, 249, 232);
	border: 1px solid rgb(245, 235, 206);
	padding: 8px 10px;
	line-height: 18px;
	color: #666;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	a{
		color: #666;
		text-decoration: underline;
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
		this.state = {
			code: '',
			using: false,
			errorMsg: ''
		}
	}

	close (evt) {
  	evt.preventDefault()
		this.props.history.replace(`${window.ctx || ''}${__route_root__}/`)
	}

	codeUse () {
		if (!this.state.code) return
		this.setState({
			using: true
		})
		usecouponcode(this.state.code).then(() => {
			this.props.REFRESHCART()
			this.setState({
				using: false
			})
			this.props.history.replace(`${window.ctx || ''}${__route_root__}/`)
		}).catch(({result}) => {
			this.setState({
				using: false,
				errorMsg: result
			})
		})
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

				<CouponCode>
					<div className="__input">
						<input placeholder={intl.formatMessage({id: 'coupon_code'})} value={this.state.code} onChange={ (evt) => { this.setState({code: evt.target.value }) }}/>
					</div>

					{
						this.state.using ? <div className="__use" style={{backgroundColor: '#cacaca', cursor: 'default'}}>
            			<FormattedMessage id="use"/>
						</div> : <div className="__use" onClick={ this.codeUse.bind(this) }>
						<FormattedMessage id="use"/>
						</div>
					}

				</CouponCode>


				{
					this.state.errorMsg && <MESSAGE style={{marginTop: 10}}>
						<div style={{paddingRight: 10}}>
							<span className="iconfont" style={{color: '#ce9a16', fontSize: 24}}>&#xe764;</span>
						</div>
						<div>
							<TypeMessage messageHtml={this.state.errorMsg}/>
						</div>
					
					</MESSAGE>
				}

				<div style={{marginTop: 20}}>
					{coupons && cart && <Coupons couponSelect={this.couponSelect.bind(this)} couponVOs={coupons} selectedCoupon={cart.coupon} selectedCoupon2={cart.coupon2} />}
				</div>

			</div>

		</COUPONWINDOW>
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(CouponWindow))
