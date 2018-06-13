import React from 'react'
import styled from 'styled-components'

const SupportIcon = styled.i`
	border-radius: 50%;
	border:none;
	display:inline-block;
	width: ${props => props.width || '65px'};
	height: ${props => props.width || '65px'};
	background-color: ${props => props.color};
	text-align: center;
	line-height: ${props => props.width || '65px'};
	color: #fff;
	font-size: ${props => props.iconsize || '25px'};
`

const SupportLabel = styled.span`
	display: block;
	text-align: center;
`

const SupportButtonContainer = styled.a`
	display: inline-block;
	text-align: center;
	text-decoration:none;
`

export const SupportButton = (props) => (
  <SupportButtonContainer href={props.href}>
  	<SupportIcon className="iconfont" {...props}>{props.children}</SupportIcon>
  	<SupportLabel style={{marginTop: '10px'}}>{props.label}</SupportLabel>
  </SupportButtonContainer>
)

export const ColoredButton = styled.button`
	background-color: ${props => props.btnColor || '#e5004f'};
	border: none;
	outline: none;
	&: active{
		opacity: .9;
	}
	width: ${props => props.width};
	height: ${props => props.height};
	line-height: ${props => props.height};
	text-align: center;
	color: #fff;
	font-size: 16px;
	font-weight: 600;
	text-transform: uppercase;
`

export const GeekoSelect = styled.select`
	background: url("https://dgzfssf1la12s.cloudfront.net/site/pc/icon137.png") no-repeat scroll calc(100% - 10px) center transparent;
	position: relative;
	-webkit-appearance: none; /*for chrome*/
	border: 1px solid #999;
	padding-left: 10px;
`
