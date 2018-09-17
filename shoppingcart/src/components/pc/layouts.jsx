import React from 'react'
import styled from 'styled-components'

const StyledBoxHead = styled.div`
	${props => !props.ignoreLine && 'border-bottom: 1px solid #e6e6e6;'}
	font-size: 18px;
	line-height: 22px;
	color: #222;
	padding-bottom: 12px;
	font-family: HelveticaNeue-Medium;
`

export const Box = ({title, children, ignoreLine, style}) => <div>
  <StyledBoxHead style={style} ignoreLine={ignoreLine}>
    {title}
  </StyledBoxHead>
  <div>
    {children}
  </div>
</div>

export const Boxs = styled.div`
	& > div{
		margin-top: 48px;
		&:first-child{
			margin-top: 0;
		}
	}
`

export const SecondBox = styled.div`
	& > .__hd{
		color: #222;
		font-family: HelveticaNeue-Medium;
	}
	& > .__bd{
		margin-top: 12px;
	}

`
