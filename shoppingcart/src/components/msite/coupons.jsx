import React from 'react'
import styled from 'styled-components'
import {Red, Grey} from '../text.jsx'
import {FormattedMessage} from 'react-intl'

const StyledCoupon = styled.div`
	height: 90px;
  & > div{
    &:last-child{
      width: 100px;
      text-align: right;
    }
  }
`

const StyledAmount = styled.span`
	font-size: 18px;
`

const TimeRange = (props) => {
	const {begin, end} = props
	return <span style={{fontSize: 12}}>
		<time>{new Date(begin).toLocaleDateString()}</time>
		<span> - </span>
		<time>{new Date(end).toLocaleDateString()}</time>
	</span>
}

const StyleSelect = styled.span`
  display: inline-block;
  width: 80px;
  height: 30px;
  line-height: 28px;
  text-align: center;
  border: 1px solid #222;
  color: #222;
  cursor: pointer;

  &.disabled{
    border: 1px solid #ddd;
    color: #ddd;
    cursor: default;
  }

  &.selected{
    border: 1px solid #e64545;
    color: #e64545;
  }
`

const SelectButton = (props) => {
	const {selected, enabled} = props
	return <React.Fragment>{
		selected ? <StyleSelect {...props} className="selected"><FormattedMessage id='selected' /></StyleSelect> : (
			!enabled ? <StyleSelect className="disabled"><FormattedMessage id='select' /></StyleSelect> : <StyleSelect {...props}><FormattedMessage id='select' /></StyleSelect>
		)}
	</React.Fragment>
}

export const Coupon = (props) => {
	const {coupon, selected, enabled, couponSelect} = props

	return <StyledCoupon className="x-table __vm x-fw __fixed">
		<div className="x-cell">
    	<div>
    		<Red>
    			<StyledAmount>{coupon.couponName2}</StyledAmount>
    		</Red>
    	</div>

    	<div style={{marginTop: 4}}>
    		<span>{coupon.name}</span>
    	</div>

    	{
    		coupon.beginDate && coupon.endDate && <div style={{marginTop: 4}}><Grey><TimeRange begin={coupon.beginDate} end={coupon.endDate}/></Grey></div>
    	}

    	<div>

    	</div>
		</div>
		<div className="x-cell">
			<SelectButton onClick={(evt) => { couponSelect(!selected ? coupon.id : null) }} selected={selected} enabled={enabled} coupon={coupon}/>
		</div>
	</StyledCoupon>
}

const CouponUL = styled.ul`
  padding-left: 10px;
  padding-right: 10px;
  & > li{
    border-top: 1px solid #e5e5e5;
    &:first-child{
      border-top: none;
    }
  }

  
`

export default (props) => <CouponUL>
	{
		props.coupons.map(({coupon, isAvailable}) => <li key={coupon.id}>
			<Coupon couponSelect={props.couponSelect} coupon={coupon} selected={props.selectedId === coupon.id || props.selectedId2 === coupon.id} enabled={isAvailable}/>
		</li>)
	}
</CouponUL>
