import React from 'react'
import styled from 'styled-components'
import {Grey} from '../text.jsx'

const Empty = styled.div`
	text-align: center;
	padding-left: 12px;
	padding-right: 12px;
	background-color: #fff;
	padding-bottom: 40px;
`



const EmptyButton = styled.a`
	display: block;
	text-align: center;
	line-height: 40px;
	height: 40px;
	width: 100%;
	color: #fff;
	text-transform: uppercase;
	font-size: 16px;
	text-decoration: none;
	background-color: #222;
	margin:auto;
	margin-top: 45px;
	&.outlined{
		border: 1px solid #222;
		background-color: transparent;
		color: #222;
	}
`

export default () => <Empty>
  <div style={{paddingTop: 51}}>
	<span className="iconfont" style={{fontSize:140}}>
		&#xe6c0;
	</span>
  </div>
  <span style={{
	  fontSize: 16,
	  color: '#000',
	  marginTop: 17,
	  display: 'inline-block'
  }}>Your shopping bag is empty!</span>

  {
	  window.__is_login__ ? <div>
			<EmptyButton href={`${window.ctx}/`}>Shop Now</EmptyButton>
	  </div>: <div>
	  		<EmptyButton href={`${window.ctx}/${
									/*global siteType b:true*/
									/*eslint no-undef: "error"*/
									siteType === 'new' ? 'page' : 'i'
								}/login?redirectUrl=${encodeURIComponent(window.location.href)}&loginPage=1`}>Sign in / Register</EmptyButton>
			<EmptyButton style={{marginTop: 12}} className="outlined" href={`${window.ctx}/`}>Shop Now</EmptyButton>
	  </div>
  }

{/* i/login?redirectUrl=${encodeURIComponent(window.location.href)}&loginPage=1 */}
</Empty>
