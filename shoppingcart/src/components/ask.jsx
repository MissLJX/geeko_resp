import React from 'react'
import styled from 'styled-components'

const StyledAsk = styled.span`
	width: ${props => props.width || 16}px;
	height: ${props => props.width || 16}px;
	border-radius: 50%;
	background-color: #999;
	cursor: pointer;
	display: inline-block;
	font-size: 12px;
	line-height: ${props => props.width || 16}px;
	text-align: center;
	color: #fff;

`

export default (props) => <StyledAsk {...props}>?</StyledAsk>
