import React from 'react'
import styled from 'styled-components'

const Message = styled.div`
	position: fixed;
	width: 80%;
	transform: translate(-50%, -50%);
	top: 50%;
	left: 50%;
	background-color: #fff;
	z-index: 10;
`

const BD = styled.div`
	padding: 40px 20px 20px 20px;
	line-height: 25px;
`

const Close = styled.span`
	font-size: 25px !important;
	cursor: pointer;
	position: absolute;
	right: 10px;
	top: 10px;
`

export default (props) => <Message>
  <Close onClick={props.onClose} className="iconfont">&#xe69a;</Close>
  <BD>
  	{props.children}
  </BD>
</Message>
