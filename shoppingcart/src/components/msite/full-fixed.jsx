import React from 'react'
import styled from 'styled-components'
import Icon from '../icon.jsx'

const Fixed = styled.div`
	position: relative;
	
`

const HD = styled.div`
	height: 50px;
	line-height: 50px;
	width: 100%;
	background-color: #fff;
`

const Title = styled.div`
	font-size: 16px;
	font-family: AcuminPro-Bold;
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
	height: calc(100vh - 50px);
	overflow: auto;
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
		    <Close onClick={props.onClose}><Icon style={{fontSize: 14, cursor: 'pointer', color: '#999', display: 'inline-block', width: 25}}>&#xe6af;</Icon></Close>
		  </HD>

		  <BD>
		  	{props.children}
		  </BD>
    </Fixed>
  }
}