import React from 'react'
import styled from 'styled-components'
import {Grey} from '../text.jsx'

import {FormattedMessage} from 'react-intl'

const Empty = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
`

const EmptyImage = styled.img`
	width: 100px;
	margin-bottom: 20px;
	display: block;
	margin: auto;
`

const EmptyButton = styled.a`
	  width: 330px;
    height: 45px;
    text-align: center;
    line-height: 43px;
    font-size: 18px;
    font-family: corbel, "Helvetica Neue", Helvetica, Arial, sans-serif;
    border: 1px solid #212830;
    color: #212830;
    display: block;
    text-decoration: none;
    text-transform: uppercase;
`

export default () => <Empty>
  <EmptyImage src="https://dgzfssf1la12s.cloudfront.net/site/pc/e18.png" alt="EmptyCart"/>
  <Grey style={{marginBottom: 20, marginTop: 10, display: 'inline-block', color: '#999', fontSize: 16}}>
    <FormattedMessage id="empty_cart_description"/>
  </Grey>
  	<EmptyButton href={`${window.ctx}/`}><FormattedMessage id="go_shopping"/></EmptyButton>
</Empty>
