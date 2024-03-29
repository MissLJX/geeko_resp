import React from 'react'
import styled, {keyframes} from 'styled-components'

export const BigButton = styled.div`
	width: 100%;
	height: ${props => props.height || '40'}px;
	border-radius: 2px;
	line-height: ${props => props.height || '40'}px;
	font-size: 16px;
	color: #fff;
	background-color: ${props => props.bgColor || '#000'};
	cursor: pointer;
	text-align: center;
	font-family: AcuminPro-Bold;
    text-transform: uppercase;
	&:active{
		opacity: .8;
	}
    &.outlined{
      border: 1px solid #222;
      background-color: transparent;
      color: #222;
      line-height: 38px;
    }
`

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
	width: 16px;
	height: 16px;
	position: fixed;
	&::after{
		content: '\\e62d';
		position: absolute;
		left: 0;
		top: 0;
		font-size: 16px;
		font-family: iconfont;
	}
	animation: ${rotate360} 1s linear infinite;
	border-radius: 50%;
`

export const StyledWaitingButton = styled.div`
	width: 100%;
	height: ${props => props.height || '40'}px;
	border-radius: 2px;
	line-height: ${props => props.height || '40'}px;
	font-size: 18px;
	color: #999;
	background-color: ${props => props.bgColor || '#000'};
	text-align: center;
`

export const WaitingButton = (props) => <StyledWaitingButton><Refreshing/><span style={{marginLeft: 4}}>{props.children}</span></StyledWaitingButton>

export const Btn = styled.span`
	padding: 4px 8px;
	background-color: #343138;
	border-radius: 2px;
	color: #fff;
	cursor: pointer;
	display: inline-block;
	&:active{
		opacity: .8;
	}
`
