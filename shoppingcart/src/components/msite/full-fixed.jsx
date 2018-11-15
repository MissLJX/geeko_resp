import React from 'react'
import styled from 'styled-components'
import Icon from '../icon.jsx'

const Fixed = styled.div`
	position: relative;
	
`

const HD = styled.div`
	height: 50px;
	line-height: 50px;
	position: absolute;
	top: 0;
	width: 100%;
	background-color: #fff;
	z-index: 10;
`

const Title = styled.h1`
	font-size: 18px;
	font-weight: 400;
	text-align: center;
`

const Close = styled.span`
	display: inline-block;
	position: absolute;
	right: 10px;
	top: 0;
	cursor: pointer;
`

const BD = styled.div`
	height: 100vh;
	overflow: auto;
	padding-top: 50px;
	-webkit-overflow-scrolling: touch;
`

// export default (props) => <Fixed>
//   <HD>
//     <Title>{props.title}</Title>
//     <Close onClick={props.onClose}><Icon style={{fontSize: 25, cursor: 'pointer'}}>&#xe69a;</Icon></Close>
//   </HD>

//   <BD>
//   	{props.children}
//   </BD>
// </Fixed>

export default class extends React.Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    document.body.style.overflow = 'hidden'
  }
  componentWillUnmount () {
    document.body.style.overflow = 'auto'
  }

  render () {
    const props = this.props
    return <Fixed>
		  <HD>
		    <Title>{props.title}</Title>
		    <Close onClick={props.onClose}><Icon style={{fontSize: 25, cursor: 'pointer'}}>&#xe69a;</Icon></Close>
		  </HD>

		  <BD>
		  	{props.children}
		  </BD>
    </Fixed>
  }
}
