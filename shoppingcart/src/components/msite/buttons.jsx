import React from 'react'
import styled from 'styled-components'

export const BigButton = styled.div`
	width: 100%;
	height: ${props => props.height || '40'}px;
	border-radius: 2px;
	line-height: ${props => props.height || '40'}px;
	font-size: 18px;
	color: #fff;
	background-color: ${props => props.bgColor || '#000'};
	cursor: pointer;
	text-align: center;
`
