import React from 'react'
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'

const SupportIcon = styled.i`
	border-radius: 50%;
	border:none;
	display:inline-block;
	width: ${props => props.width || '65px'};
	height: ${props => props.width || '65px'};
	background-color: ${props => props.color};
	text-align: center;
	line-height: ${props => props.width || '65px'};
	color: #fff;
	font-size: ${props => props.iconsize || '25px'};
`

const SupportLabel = styled.span`
	display: block;
	text-align: center;
`

const SupportButtonContainer = styled.a`
	display: inline-block;
	text-align: center;
	text-decoration:none;
	color: #222;
`

export const SupportButton = (props) => (
  <SupportButtonContainer href={props.href}>
  	<SupportIcon className="iconfont" {...props}>{props.children}</SupportIcon>
  	<SupportLabel style={{marginTop: '10px'}}>{props.label}</SupportLabel>
  </SupportButtonContainer>
)

export const ColoredButton = styled.button`
	background-color: ${props => props.btnColor || '#e5004f'};
	border: none;
	outline: none;
	&: active{
		opacity: .9;
	}
	width: ${props => props.width};
	height: ${props => props.height};
	line-height: ${props => props.height};
	text-align: center;
	color: #fff;
	font-size: 16px;
	font-weight: 600;
	text-transform: uppercase;
`

export const GeekoSelect = styled.select`
	background: url("https://image.geeko.ltd/site/pc/icon137.png") no-repeat scroll calc(100% - 10px) center transparent;
	position: relative;
	-webkit-appearance: none; /*for chrome*/
	border: 1px solid #999;
	padding-left: 10px;
`

export const PageHead = styled.div`
	background-color: #000;
	color: #fff;
	position: fixed;
	width: 100%;
	height: 50px;
	top: 0;
	text-align: center;
	line-height: 50px;
	z-index: 20;
	span{
		font-size: 18px;
	}
	i{
		position: absolute;
		left: 10px;
		font-size: 20px;
		top: 0;
		cursor: pointer;
	}
	strong{
		font-size: 14px;
		font-weight: normal;
		position: absolute;
		right: 10px;
		top: 0;
		cursor: pointer;
	}
`

// export const PageHeader = () => (
//   <PageHead>

//   </PageHead>
// )

const PageHeaderC = class extends React.Component {
  constructor (props) {
    super(props)
	console.log(props)
  }
  render () {
  	return <PageHead>
  		<span>{this.props.label}</span>
  		 <i className="iconfont" onClick={() => {
  		 	if (this.props.to) {
  		 		this.props.history.replace(this.props.to)
  		 	} else if (this.props.href) {
  		 		window.location.href = this.props.href
  		 	} else {
  		 		this.props.history.goBack()
  		 	}
  		 }}>&#xe693;</i>
  		 <strong onClick={() => {
  		 	if (this.props.to) {
  		 		this.props.history.replace(this.props.to)
  		 	} else if (this.props.href) {
  		 		window.location.href = this.props.href
  		 	} else {
  		 		this.props.history.goBack()
  		 	}
  		 }}>{this.props.tool}</strong>
  	</PageHead>
  }
}

export const PageHeader = withRouter(PageHeaderC)

export const PageContanier = styled.div`
	margin-top: 50px;
`
