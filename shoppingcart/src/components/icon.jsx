import React from 'react'
import styled from 'styled-components'

const Icon = styled.span`
	cursor: pointer;
`

export default (props) => <span {...props} className="iconfont">{props.children}</span>
