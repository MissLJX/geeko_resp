import React from 'react'
import styled from 'styled-components'

const StyledAsk = styled.span`
	width: ${props => props.width || 16}px;
	height: ${props => props.width || 16}px;
	border-radius: 50%;
	border: 1px solid #cacaca;
	cursor: pointer;
	display: inline-block;
	font-size: 12px;
	line-height: ${props => (props.width - 2) || 14}px;
	text-align: center;
	color: #cacaca;

`

export default (props) => <StyledAsk {...props}>?</StyledAsk>
