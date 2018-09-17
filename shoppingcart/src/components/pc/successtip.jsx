import React from 'react'
import styled, {keyframes} from 'styled-components'

const showing = keyframes`
  0% {
    opacity: .2;
  }

  40% {
    opacity: 1;
  }

  80% {
  	opacity: 1;
  }

  100%{
  	opacity: 0;
  }
`

const SUCCESSTIP = styled.div`
	position: fixed;
	background-color: rgba(0,0,0,.6);
	color: #fff;
	width: 240px;
	height: 32px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
  text-align: center;
  line-height: 32px;
	animation: ${showing} 2s linear;
`

export default SUCCESSTIP
