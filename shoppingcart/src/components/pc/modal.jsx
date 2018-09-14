import React, {Fragment} from 'react'
import styled from 'styled-components'

export const MASK = styled.div`
	width: 100%;
	height: 100%;
	position: fixed;
	top:0;
	left:0;
	background-color:rgba(0,0,0,.6);
	z-index:100;
	overflow: auto;
`

export const MODAL = styled.div`
	transform:translate(-50%,0);
	left:50%;
	top:60px;
	position: absolute;
	margin-bottom: 20px;
`

const CLOSE = styled.span`
	font-family: iconfont;
	cursor: pointer;
	top: 15px;
	right: 15px;
	font-size: 30px;
	position: absolute;
	z-index:2;
	color: #666;
`

export const Modal = (props) => <Fragment>
  <MASK>
	  <MODAL>
	    <CLOSE onClick={props.onClose}>&#xe69a;</CLOSE>
	    {
	      props.children
	    }
	  </MODAL>
  </MASK>
</Fragment>
