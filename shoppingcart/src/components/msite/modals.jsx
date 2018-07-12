import React from 'react'
import styled from 'styled-components'
import Mask from '../mask.jsx'
import { FixedCenter } from './layout.jsx'
import Icon from '../icon.jsx'

const CONTAINER = styled.div`
	background-color: #fff;
	box-shadow: 0 0 4.5px rgba(136, 136, 136, 0.5);
	padding-left: 10px;
	padding-right: 10px;
	& > .__hd{
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid #e5e5e5;
		position: relative;
	}

	& > .__bd{
		padding: 20px 10px 10px 10px;
		font-size: 15px;
	}

	& > .__fd{
		height: 50px;
		text-align: right;
		padding-top: 12px;
	}

	.__title{
		font-weight: bold;
		font-size: 16px;
	}

	.__close{
		position: absolute;
		right: 0;
		cursor: pointer;
	}

	.__yes{
		display: inline-block;
		padding: 8px 10px;
		background-color: #e5004f;
		box-shadow: 0 0 2px rgba(136, 136, 136, 0.5);
		text-transform: uppercase;
		font-size: 12px;
		font-weight: bold;
		cursor: pointer;
		color: #fff;
		border-radius: 2px;
	}

	.__no{
		text-transform: uppercase;
		font-size: 12px;
		font-weight: bold;
		color: #e5004f;
		cursor: pointer;
	}
`

const Message = styled.div`
	line-height: 22px;
`

export const Confirm = class extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return	<React.Fragment>
      <Mask/>
      <FixedCenter style={{width: '80%', maxWidth: 320}}>
	      <CONTAINER>
	        <div className="__hd">
	          <span className="__title">{this.props.title}</span>
	          <span className="__close"><Icon style={{fontSize: 25}} onClick={this.props.close}>&#xe69a;</Icon></span>
	        </div>
	        <div className="__bd">
	          <Message>{this.props.children}</Message>
	        </div>

	        <div className="__fd">
	          <span className="__no" onClick={this.props.no}>{this.props.noLabel || 'Cancel'}</span>
	          <span style={{marginLeft: 15}} className="__yes" onClick={this.props.yes}>{this.props.yesLabel || 'Confirm'}</span>
	        </div>
	      </CONTAINER>
      </FixedCenter>
    </React.Fragment>
  }
}
