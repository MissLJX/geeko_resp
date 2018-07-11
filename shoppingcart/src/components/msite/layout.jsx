import React from 'react'
import styled from 'styled-components'
import Icon from '../icon.jsx'

export const Boxs = styled.div`
	& > div{
		margin-top: 10px;
		&:first-child{
			margin-top: 0;
		}
	}
`

export const Box = styled.div`
	background-color: #fff;
`

const StyledBoxHead = styled.div`
	padding: 0 10px;
	height: 50px;
	& > div{
		width: 100%;
		height: 100%;
		${props => (!props.single ? 'border-bottom: 1px solid #e5e5e5;' : '')}
	}

	& .__title{
		font-size: 15px;
		color: #222;
	}
`

export const BoxClickHead = (props) => (
  <StyledBoxHead {...props}>
    <div className="x-table __vm">
      <div className="x-cell">
        <span className="__title">{props.title}</span>
      </div>
      <div className="x-cell __right">
        <span style={{verticalAlign: 'middle'}}>{props.children}</span>
        <Icon style={{verticalAlign: 'middle'}}>&#xe694;</Icon>
      </div>
    </div>
  </StyledBoxHead>
)

export const BoxHead = (props) => (
  <StyledBoxHead>
    <div className="x-table __vm">
      <div className="x-cell">
        <span className="__title">{props.title}</span>
      </div>
      {props.children && (
      	<div className="x-cell __right">
        	<span style={{verticalAlign: 'middle'}}>{props.children}</span>
      	</div>
      )}

    </div>
  </StyledBoxHead>
)

export const BoxBody = styled.div`
	padding: 10px;
`

export const LineBox = styled.div`
	& > div{
		border-top: 1px solid #e5e5e5;
		&:first-child{
			border-top: none;
		}
	}
`

export const FormLayout = styled.div`
	& > div{
		margin-top: 15px;
		&:first-child{
			margin-top: 0;
		}
	}
`

export const MultiControl = styled.div`
	&::after{
		content: '';
		display: block;
		clear: both;
	}

	& > div{
		width: 50%;
		float: left;

		&:first-child{
			padding-right: 7px;
		}
		&:last-child{
			padding-left: 7px;
		}
	}


`
