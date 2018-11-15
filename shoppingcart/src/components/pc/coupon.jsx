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
	font-size: 12px;
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
		background: radial-gradient(transparent 0, transparent 5px, #F46E6D 5px);
		background-size: 15px 15px;
		background-position: 7px 3px;
		height: 92px;
		position: relative;

		&::before {
	    content: '';
	    position: absolute;
	    background-color: #F46E6D;
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
		color: #e64545;
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
			background-color: #F46E6D;
		}
	}

	&.__disabled{
		.__background{
			background: radial-gradient(transparent 0, transparent 5px, #cacaca 5px);
			background-size: 15px 15px;
    	background-position: 7px 3px;
			&::before{
				background-color: #cacaca;
			}
		}

		.__title{
			color: #999999;
		}

		.__description{
			color: #999;
		}

		.__usenow{
			cursor: default;
			opacity: .8;
			&:acitve{
				background-color: #cacaca;
			}
		}
	}

	&.__selected{
		border: solid 1px #F46E6D;
		.__background{
			background: radial-gradient(transparent 0, transparent 5px, #F46E6D 5px);
			&::before {
		    background-color: #F46E6D;
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

const _coupon = ({intl, couponVO, couponSelect, selectedCoupon, selectedCoupon2}) => {
  const {coupon, isAvailable} = couponVO
  const selected = (selectedCoupon && coupon.id === selectedCoupon.id) || (selectedCoupon2 && coupon.id === selectedCoupon2.id)

  const selectedText = selected ? intl.formatMessage({id: 'selected'}) : intl.formatMessage({id: 'use_now'})

  return <StyledCoupon className={`x-table __vm __fixed ${!isAvailable ? '__disabled' : ''} ${selected ? '__selected' : ''}`}>
  	<div className="x-cell __content">
  		<div className="__title">
  			{coupon.couponName2}
  		</div>

  		<div className="__description">
  			{coupon.name}
  		</div>

  		<div className="__expire">
  			{coupon.beginDate && coupon.endDate && <TimeRange begin={coupon.beginDate} end={coupon.endDate}/>}
  		</div>

  	</div>
  	<div className={`x-cell __background`}>
  		<UseNow onClick={ () => { isAvailable && couponSelect(coupon.id) } } className="__usenow">{ selectedText }</UseNow>
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
		
	}
`

const _coupons = ({couponVOs, selectedCoupon, couponSelect, selectedCoupon2}) => {
  return <StyledCoupons>
	  {couponVOs && couponVOs.map((vo, index) => <li key={ index }><Coupon selectedCoupon={selectedCoupon} selectedCoupon2={selectedCoupon2} couponSelect={couponSelect} couponVO={vo}/></li>)}
  </StyledCoupons>
}

export default _coupons
