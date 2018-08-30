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

  &::-webkit-outer-spin-button, &::-webkit-inner-spin-button{                
    -webkit-appearance: none !important;
    -moz-appearance:textfield;
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
    let newQ = this.state.quantity + 1
    this.setState({
      quantity: this.state.quantity + 1
    })
    this.clickHandle(newQ)
  }

  reduceQuantity (evt) {
    let newQ = this.state.quantity > 1 ? this.state.quantity - 1 : 1
    this.setState({
      quantity: newQ
    })
    this.clickHandle(newQ)
  }

  onChange (evt) {
    this.setState({
      quantity: evt.target.value
    })
    this.props.onChange(evt.target.value)
  }

  render () {
    return <QWrapper>
      <Icon onClick={this.reduceQuantity.bind(this)}>&#xe6ba;</Icon>
      <QInput type="number" onChange={this.onChange} value={this.state.quantity}/>
      <Icon onClick={this.addQuantity.bind(this)}>&#xe6b9;</Icon>
    </QWrapper>
  }
}
