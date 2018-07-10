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

const Loading = styled.span`
	display: inline-block;
	width: 30px;
	height: 30px;
	border-top: 3px solid #222;
	border-left: 3px solid #222;
	animation: ${rotate360} 1.2s linear infinite;
	position: fixed;
	top: calc(50% - 15px);
	left: calc(50% - 15px);
	border-radius: 50%;
`

export default () => <Loading/>
