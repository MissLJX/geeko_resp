import React from 'react'
import styled from 'styled-components'

const StyledAsk = styled.div`
	width: 16px;
	height: 16px;
	border: solid 1px #999;
	opacity: 0.99;
	cursor: pointer;
	text-align: center;
	line-height: 16px;
	color: #999;
	border-radius: 50%;
  display: inline-block;
  font-size: 12px;
  position: relative;
  z-index: 1;

  .__answer{
  	position: absolute;
  	top: 20px;
  	left: -200px;
  	border-radius: 4px;
		border: solid 1px #e6e6e6;
		padding: 15px;
		line-height: 20px;
		width: 420px;
    background-color: #fff;
    display: none;
    color: #222;
    font-size: 14px;
    text-align: left;
    z-index: 100;
  }


  &:hover{
  	.__answer{
  		display: block;
  	}
    border-color: #cacaca;
  }
`

export default (props) => <StyledAsk {...props}>
  <span>?</span>

  {
  	props.message && <div className="__answer">
	  	<div dangerouslySetInnerHTML={{__html: props.message}} />
	  </div>
  }

</StyledAsk>
