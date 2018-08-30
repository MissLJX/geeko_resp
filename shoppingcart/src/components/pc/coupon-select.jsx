import React from 'react'
import styled from 'styled-components'
import {injectIntl, FormattedMessage} from 'react-intl'
import {Red} from '../text.jsx'
import Icon from '../icon.jsx'

const StyledSelect = styled.div`
	width: 314px;
	&::after{
		content: '';
		clear: both;
		display: block;
	}
	& > .__title{
		width: 240px;
		height: 40px;
		border: solid 1px #cacaca;
		float: left;
		line-height: 40px;
		padding-left: 10px;
		position: relative;
	}

	& > .__select{
		width: 74px;
		height: 40px;
		background-color: #222;
		float: left;
		text-align: center;
		color: #fff;
		line-height: 40px;
		cursor: pointer;
	}
	
`

const getAmount = amount => amount ? (amount.indexOf('%') > 0 ? `${amount} OFF` : `$${amount}`) : ''

const CouponSelect = ({intl, coupon, canUseCouponCount, selectCoupon, unSelectCoupon}) => <StyledSelect>
  <div className="__title">
    { coupon ? <React.Fragment>
    		<span>
    			<Red>{`${getAmount(coupon.amount)}`}</Red> <span>{ coupon.name }</span>
    		</span>
    		<Icon onClick={unSelectCoupon} style={{position: 'absolute', right: 10, cursor: 'pointer'}}>&#xe69a;</Icon>
    	</React.Fragment> : <FormattedMessage id="can_use_coupon" values={{canUseCouponCount}}/>
    }
  </div>
  <div onClick={selectCoupon} className="__select">{intl.formatMessage({id: 'select'})}</div>
</StyledSelect>

export default injectIntl(CouponSelect)
