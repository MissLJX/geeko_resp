import React from 'react'
import styled from 'styled-components'
import {Grey} from '../text.jsx'

const Empty = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
`

const EmptyImage = styled.img`
	width: 200px;
	display: block;
`

const EmptyButton = styled.a`
	display: block;
	text-align: center;
	line-height: 40px;
	height: 40px;
	width: 120px;
	color: #fff;
	text-transform: uppercase;
	font-size: 16px;
	text-decoration: none;
	background-color: #222;
	margin:auto;
`

export default () => <Empty>
  <EmptyImage src="https://dgzfssf1la12s.cloudfront.net/site/icon/back-05.png" alt="EmptyCart"/>
  <Grey style={{marginBottom: 5, display: 'inline-block'}}>No More Data</Grey>
  	<EmptyButton href={siteurl}>Shop Now</EmptyButton>
</Empty>