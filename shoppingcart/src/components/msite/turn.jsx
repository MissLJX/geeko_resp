import React from 'react'
import styled from 'styled-components'

const Turn = styled.span`
	width: 40px;
	height: 20px;
	border-radius: 20px;
	background-color: #cacaca;
	display: inline-block;
	position: relative;
	& > span{
		width: 18px;
		height: 18px;
		display: inline-block;
		position: absolute;
		left: 1px;
		top: 1px;
		background-color: #fff;
		border-radius: 50%;
		transition: left .2s;
	}

	&.active{
		background-color: #e5004f;
	}

	&.active > span{
		left: 21px;
	}
`

export default (props) => <Turn className={props.turnAcitve ? 'active' : ''}>
  <span></span>
</Turn>
