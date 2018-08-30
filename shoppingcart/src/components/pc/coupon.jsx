import React from 'react'
import styled from 'styled-components'
import {injectIntl} from 'react-intl'

const UseNow = styled.div`
	width: 81px;
	height: 26px;
	border-radius: 100px;
	border: solid 1px #ffffff;
	text-align: center;
	line-height: 24px;
	color: #fff;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	cursor: pointer;
`

const StyledCoupon = styled.div`
	width: 330px;
	height: 92px;
	border: solid 1px #e6e6e6;

	.__content{
		width: 226px;
		padding-left: 15px;
	}

	.__background{
		width: 104px;
		background: radial-gradient(transparent 0, transparent 5px, #f04f73 5px);
		background-size: 15px 15px;
		background-position: 9px 3px;
		height: 92px;
		position: relative;

		&::before {
	    content: '';
	    position: absolute;
	    background-color: #f04f73;
	    top: 0;
	    bottom: 0;
	    left: 7px;
    	right: 0px;
		}


		&.__disabled{
			background: radial-gradient(transparent 0, transparent 5px, #cacaca 5px);
			&::before{
				background-color: #cacaca;
			}
		}
	}



	.__title{
		font-size: 20px;
		text-transform: uppercase;
		color: #e7004d;
		font-family: HelveticaNeue-Bold;
	}

	.__description{
		font-size: 14px;
		color: #222;
		margin-top: 2px;
	}

	.__expire{
		font-size: 12px;
		color: #666;
		margin-top: 12px;
	}

	.__usenow{
		&:acitve{
			background-color: #e5004f;
		}
	}

	&.__disabled{
		.__background{
			background: radial-gradient(transparent 0, transparent 5px, #cacaca 5px);
			&::before{
				background-color: #cacaca;
			}
		}

		.__title{
			color: #999999;
		}

		.__usenow{
			cursor: default;
			&:acitve{
				background-color: #cacaca;
			}
		}
	}
`

const getAmount = amount => amount ? (amount.indexOf('%') > 0 ? `${amount} off` : `$${amount}`) : ''

const TimeRange = (props) => {
  const {begin, end} = props
  return <span style={{fontSize: 12}}>
    <time>{new Date(begin).toLocaleDateString()}</time>
    <span> - </span>
    <time>{new Date(end).toLocaleDateString()}</time>
  </span>
}

const _coupon = ({intl, couponVO, couponSelect}) => {
  const {coupon, isAvailable} = couponVO

  return <StyledCoupon className={`x-table __vm __fixed ${!isAvailable ? '__disabled' : ''}`}>
  	<div className="x-cell __content">
  		<div className="__title">
  			{getAmount(coupon.amount)}
  		</div>

  		<div className="__description">
  			{coupon.name}
  		</div>

  		<div className="__expire">
  			{coupon.beginDate && coupon.endDate && <TimeRange begin={coupon.beginDate} end={coupon.endDate}/>}
  		</div>

  	</div>
  	<div className={`x-cell __background`}>
  		<UseNow onClick={ () => { isAvailable && couponSelect(coupon.id) } } className="__usenow">{intl.formatMessage({id: 'use_now'})}</UseNow>
  	</div>
  </StyledCoupon>
}

export const Coupon = injectIntl(_coupon)

const StyledCoupons = styled.ul`
	& > li{
		margin-top: 15px;
		&:first-child{
			margin-top: 0;
		}
		&.selected{
			& > div{
				border: solid 1px #e5004f;
			}
		}
	}
`

const _coupons = ({couponVOs, selectedCoupon, couponSelect}) => <StyledCoupons>
  {couponVOs && couponVOs.map((vo, index) => <li key={ index } className={ selectedCoupon && vo.coupon.id === selectedCoupon.id ? 'selected' : '' }><Coupon couponSelect={couponSelect} couponVO={vo}/></li>)}
</StyledCoupons>

export default _coupons
