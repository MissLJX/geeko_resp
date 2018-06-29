import React from 'react'
import styled from 'styled-components'
import Icon from '../icon.jsx'

const Fixed = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #fff;
	overflow:auto;
	
`

const HD = styled.div`
	height: 50px;
	line-height: 50px;
	position: relative;
`

const Title = styled.h1`
	font-size: 18px;
	font-weight: 400;
	text-align: center;
`

const Close = styled.span`
	display: inline-block;
	position: absolute;
	right: 10px;
	top: 0;
	cursor: pointer;
`

export default (props) => <Fixed>
  <HD>
    <Title>{props.title}</Title>
    <Close onClick={props.onClose}><Icon style={{fontSize: 25}}>&#xe69a;</Icon></Close>
  </HD>

  <div>
  	{props.children}
  </div>
</Fixed>
