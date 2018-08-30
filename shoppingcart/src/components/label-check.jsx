import React from 'react'
import styled from 'styled-components'

import CheckBox from './checkbox.jsx'

const LabelCheck = styled.span`
	& > *{
		vertical-align: middle;
		&:last-child{
			margin-left:5px;
		}
	}
	cursor: pointer;
`

export default ({selected, clickHandle, children, disabled}) => <LabelCheck onClick={!disabled && clickHandle}>
  <CheckBox className={selected ? 'selected' : ''} disabled={disabled}/>
  {
  	children
  }
</LabelCheck>
