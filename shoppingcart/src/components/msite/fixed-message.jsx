import React from 'react'
import styled from 'styled-components'
import {BigButton} from './buttons'
import { FormattedMessage } from 'react-intl'

const Message = styled.div`
	position: fixed;
	width: 80%;
	transform: translate(-50%, -50%);
	top: 50%;
	left: 50%;
	background-color: #fff;
	z-index: 10;
    font-size: 14px;
    font-family: SlatePro-Medium;
    text-align: center;
`

const HD = styled.div`
  text-align: center;
  font-size: 14px;
  font-family: 'AcuminPro-Bold';
  padding: 8px 8px 4px 8px;
`

const BD = styled.div`
	padding: 8px;
	line-height: 25px;
`

const FD = styled.div`
  padding: 0 8px 8px;
`

const Close = styled.span`
	font-size: 25px !important;
	cursor: pointer;
	position: absolute;
	right: 10px;
	top: 10px;
`

export default (props) => <Message>
	{
		props.title && <HD>
			{props.title}
		</HD>
	}

	<BD>
  	{props.children}
	</BD>
	<FD>
		<BigButton  onClick={props.onClose}>
			<FormattedMessage id="confirm"/>
		</BigButton>
	</FD>
</Message>
