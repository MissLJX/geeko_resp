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
  width: 30px;
  text-align: center;
  margin-left:5px;
  margin-right:5px;
  font-size: 14px;
  font-family: 'SlatePro-Medium';
  position: relative;
  top: 1px;
  &::-webkit-outer-spin-button, &::-webkit-inner-spin-button{                
    -webkit-appearance: none !important;
    -moz-appearance:textfield;
  } 
  -moz-appearance: textfield;

  &.disabled{
	  color: #cacaca;
  }
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
		if(this.props.disabled) return;


		let newQ = Math.floor(this.state.quantity + 1)
		this.setState({
			quantity: newQ
		})
		this.clickHandle(newQ)
	}

	reduceQuantity (evt) {

		if(this.props.disabled) return;


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
			<Icon style={{cursor: 'pointer', fontSize: 12, fontWeight: 'bold', color: (this.state.quantity === 1 || this.props.disabled) ? '#cacaca' : '#222'}} onClick={this.reduceQuantity.bind(this)}>&#xe731;</Icon>
			<QInput className={this.props.disabled ? 'disabled':''} type="number" onChange={this.onChange} value={this.state.quantity}/>
			<Icon style={{cursor: 'pointer', fontSize: 12, fontWeight: 'bold', color: this.props.disabled?'#cacaca' :'#222'}} onClick={this.addQuantity.bind(this)}>&#xe733;</Icon>
		</QWrapper>
	}
}
