import React from 'react'
import styled from 'styled-components'
import { Grey, Red, Blue } from '../text.jsx'
import {Link} from 'react-router-dom'
import Icon from '../icon.jsx'

const LI = styled.li`
  &::before{
    display: inline-block;
    content: attr(data-index);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #e64545;
    color: #fff;
    line-height: 16px;
    text-align: center;
    font-size: 12px;
    vartical-align: middle;
    margin-right: 5px;
  }

  line-height: 20px;
`

const OL = styled.ol`
	& > li{
		margin-top: 10px;
		&:first-child{
			margin-top:0;
		}
	}
	padding: 10px;
`

export const Tips = ({tips, style}) => <OL style={style}>
  {
    tips && tips.map((tip, index) => <LI key={index} data-index={index + 1} dangerouslySetInnerHTML={{__html: tip.message}}/>)
  }
</OL>

export const PhoneLink = ({phoneNumber, link}) => <Link to={link}>
  <Blue style={{cursor: 'pointer'}}>
    <span>{phoneNumber}</span>
    <Icon style={{marginLeft: 5}}>&#xe62b;</Icon>
  </Blue>
</Link>
