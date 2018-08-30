import React from 'react'
import styled from 'styled-components'

export default styled.span`
	display: inline-block;
	&::after{
		content: '\\e65a';
		display: inline-block;
		cursor: pointer;
		font-size: ${props => props.fontSize || '20px'} ;
		font-family: iconfont;
	}

	&.selected{
		&::after{
			content: '\\e658';
			color: ${props => props.disabled ? '#999' : '#e5004f'};
		}
	}
`
