import React from 'react'
import styled from 'styled-components'
import Ask from './ask.jsx'

const Control = styled.div`
	position: relative;
`

const FORMELEMENT = styled.div`
	label{
		display: block;
		color: #666;
		margin-bottom: 4px;
	}
	&.__required > .__control{
		&::after{
			content: '*';
	    color: #E64545;
	    position: absolute;
	    right: -15px;
	    top: 0;
	    font-size: 20px;
		}
	}

	& .error{
		.__errortext{
			font-size: 12px;
			margin-top: 5px;
			color: #e5004f;
		}
		input, select{
			border: solid 1px #eb5788;
		}
	}

	input, select{
		padding-left: 15px;
		border: solid 1px #cacaca;
	}


`

export const FormElement = (props) => {
  return <FORMELEMENT {...props}>
    <label>{props.label} { props.tipMessage && <Ask style={{marginLeft: 2}} message={props.tipMessage}/> }</label>
    <Control className="__control">
      { props.children}
    </Control>
  </FORMELEMENT>
}

export const MutiElement = styled.div`
	&::after{
		content: '';
		display: block;
		clear: both;
	}
	& > div{
		width: calc( 50% - ${props => (props.gap || 40) / 2}px );
		&:first-child{
			float: left;
		}
		&:last-child{
			float: right;
		}
		
	}
`

export const ELEMENTS = styled.div`
	& > div{
		margin-top: 15px;
		&:first-child{
			margin-top: 0;
		}
	}
`
