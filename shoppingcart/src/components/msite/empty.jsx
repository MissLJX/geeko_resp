import React from 'react'
import styled from 'styled-components'

const Empty = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	tranform: translate(-50%, -50%);
`

const EmptyImage = styled.img`
	width: 200px;
	display: block;
`

const EmptyButton = styled.a`
	display: block;
`

export default () => <Empty>
  <EmptyImage src="" alt="EmptyCart"/>
  <EmptyButton href="#"></EmptyButton>
</Empty>
