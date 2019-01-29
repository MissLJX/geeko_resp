import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import FullFixed from '../components/msite/full-fixed.jsx'
import { refreshCart } from '../store/actions.js'
import Coupons from '../components/msite/coupons.jsx'
import { getcoupons, usecoupon, unusecoupon, usecouponcode } from '../api'
import { injectIntl } from 'react-intl'
import { __route_root__ } from '../utils/utils.js'

const CouponCode = styled.div`
  &::after{
    content: '';
    clear: both;
    display: block;
  }
  & > .__input{
    width: calc(100% - 74px);
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
    width: 74px;
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
	constructor(props) {
		super(props)
		this.close = this.close.bind(this)
		this.state = {
			code: '',
			using: false
		}
	}

	close(evt) {
		evt.preventDefault()
		this.props.history.replace(`${window.ctx || ''}${__route_root__}/`)
	}

	codeUse() {
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
		}).catch(({ result }) => {
			alert(result)
			this.setState({
				using: false
			})
		})
	}

	couponSelect(id) {
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

	render() {
		const { coupons, cart, intl } = this.props
		return <FullFixed onClose={this.close} title={intl.formatMessage({ id: 'coupon' })}>
			<div style={{ paddingLeft: 10, paddingRight: 10 }}>
				<CouponCode>
					<div className="__input">
						<input placeholder="Coupon code" value={this.state.code} onChange={(evt) => { this.setState({ code: evt.target.value }) }} />
					</div>

					{
						this.state.using ? <div className="__use" style={{ backgroundColor: '#cacaca', cursor: 'default' }}>
							USE
						</div> : <div className="__use" onClick={this.codeUse.bind(this)}>
								USE
						</div>
					}

				</CouponCode>
			</div>

			{coupons && cart && <Coupons couponSelect={this.couponSelect.bind(this)} selectedId2={cart.coupon2 ? cart.coupon2.id : null} selectedId={cart.coupon ? cart.coupon.id : null} coupons={this.props.coupons} />}
		</FullFixed>
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Coupon))
