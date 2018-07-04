import React from 'react'
import styled from 'styled-components'

const Blocker = styled.span`
	cursor: pointer;
	padding: 5px 10px;
  display: inline-block;
	&.selected{
		border: 1px solid #222;
	}
  &.disabled{
    color: #e5e5e5;
  }
`

export default (props) => <Blocker
  onClick={(evt) => {
    evt.preventDefault()
    if (!props.disabled) {
      props.onClick(props.value)
    }
  }}
  className={`${props.selected ? 'selected' : ''} ${props.disabled ? 'disabled' : ''}`}>
  {props.label}
</Blocker>
