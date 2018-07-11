import React from 'react'
import styled, {keyframes} from 'styled-components'

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Refreshing = styled.span`
	display: inline-block;
	width: 20px;
	height: 20px;
	position: fixed;
	z-index: 50;
	&::after{
		content: '\\e62d';
		position: absolute;
		left: 0;
		top: 0;
		font-size: 20px;
		font-family: iconfont;
	}
	animation: ${rotate360} 1.2s linear infinite;
	position: fixed;
	top: calc(50% - 15px);
	left: calc(50% - 15px);
	border-radius: 50%;
`

export default () => <Refreshing/>
