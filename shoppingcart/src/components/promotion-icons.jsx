import React from 'react'
import styled from 'styled-components'

const GIFTICON = styled.span`
	display: inline-block;
	border: 1px solid #e64545;
	.__icon{
		width: 30px;
		height: 24px;
		background-color: #e64545;
		text-align: center;
		line-height: 24px;
		font-family: iconfont;
		color: #fff;
		font-style: normal;
		display: inline-block;
	}

	.__label{
		color: #e64545;
		font-size: 14px;
		height: 24px;
		line-height: 24px;
		padding-left:10px;
		padding-right: 10px;
	}
`

export const GiftIcon = (props) => <GIFTICON {...props}>
  <i className="__icon">
		&#xe747;
  </i>
  <span className="__label">
    {props.label}
  </span>
</GIFTICON>
