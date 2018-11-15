import React from 'react'
import styled from 'styled-components'

const CONTAINER = styled.div`
	border: solid 1px #cacaca;
	background-color: #fff;
	.__button{
		float: right;
		background-color: #222;
		color: #fff;
		width: 100px;
		height: 35px;
		outline:none;
		box-shadow: none;
		cursor: pointer;
		border: none;
	}

	.__input{
		height: 35px;
		max-width: 175px;
		input{
			border: none;
			box-shadow: none;
			outline: none;
			height: 100%;
			padding-left: 10px;
		}
	}
`

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      couponCode: props.initValue
    }
  }

  render () {
  	const { buttonText, buttonHandle } = this.props
    return <CONTAINER>
      <button className="__button" onClick={ () => { buttonHandle(this.state.couponCode) } }>
        {buttonText}
      </button>
      <div className="__input">
        <input type="text" onChange={ evt => this.setState({couponCode: evt.target.value}) } value={this.state.couponCode}/>
      </div>
    </CONTAINER>
  }
}
