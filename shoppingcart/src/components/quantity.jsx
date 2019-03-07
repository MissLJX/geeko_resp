import React from 'react'
import styled from 'styled-components'
import Icon from './icon.jsx'
import _ from 'lodash'

const QWrapper = styled.div`
  display: inline-block;
  & > *{
    vertical-align: middle;
  }
`

const QInput = styled.input`
  border: none;
  box-shadow: none;
  outline: none;
  -webkit-appearance: none;
  width: 40px;
  text-align: center;
  margin-left:10px;
  margin-right:10px;
  &::-webkit-outer-spin-button, &::-webkit-inner-spin-button{                
    -webkit-appearance: none !important;
    -moz-appearance:textfield;
  } 
  -moz-appearance: textfield;
`

export default class extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			quantity: 1
		}
		this.changeHandle = this.changeHandle.bind(this)
		this.onChange = this.onChange.bind(this)
		this.clickHandle = _.debounce(this.props.onChange, 200)
	}

	componentWillMount () {
		this.setState({
			quantity: this.props.quantity || 1
		})
	}

	componentWillReceiveProps (newProps) {
		if (newProps.quantity != this.props.quantity) {
			this.setState({
				quantity: newProps.quantity
			})
		}
	}

	changeHandle (evt) {
		this.setState({
			quantity: evt.target.value
		})
	}

	addQuantity (evt) {
		let newQ = Math.floor(this.state.quantity + 1)
		this.setState({
			quantity: newQ
		})
		this.clickHandle(newQ)
	}

	reduceQuantity (evt) {
		if (this.state.quantity > 1) {
			let newQ = Math.floor(this.state.quantity - 1) > 1 ? Math.floor(this.state.quantity - 1) : 1
			this.setState({
				quantity: newQ
			})
			this.clickHandle(newQ)
		} else {
			this.clickHandle(0, true)
		}
	}

	onChange (evt) {
		const v = evt.target.value > 1 ? Math.floor(evt.target.value) : 1
		this.setState({
			quantity: v
		})
		this.props.onChange(v)
	}

	render () {
		return <QWrapper>
			<Icon style={{cursor: 'pointer', fontSize: 14, fontWeight: 'bold', color: this.state.quantity === 1 ? '#cacaca' : '#222'}} onClick={this.reduceQuantity.bind(this)}>&#xe6ba;</Icon>
			<QInput type="number" onChange={this.onChange} value={this.state.quantity}/>
			<Icon style={{cursor: 'pointer', fontSize: 14, fontWeight: 'bold', color: '#222'}} onClick={this.addQuantity.bind(this)}>&#xe6b9;</Icon>
		</QWrapper>
	}
}
