import React from 'react'
import styled from 'styled-components'

const Turn = styled.span`
	width: 40px;
	height: 20px;
	border-radius: 20px;
	background-color: #999;
	display: inline-block;
	position: relative;
	cursor: pointer;
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
		cursor: pointer;
	}

	&.active{
		background-color: #222;
	}

	&.disabled{
		background-color: #cacaca;
	}

	&.active > span{
		left: 21px;
	}
`

export default (props) => <Turn {...props} className={`${props.turnAcitve ? 'active' : ''} ${props.disabled ? 'disabled' : ''}`}>
  <span></span>
</Turn>
