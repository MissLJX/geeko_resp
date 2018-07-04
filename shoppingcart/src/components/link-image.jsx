import React from 'react'
import styled from 'styled-components'

const LinkImage = styled.a`
	display: inline-block;
	img{
		width: 100%;
	}
`

export default (props) => (
  <LinkImage style={props.style} href={props.href} title={props.title}>
    <img src={props.src} alt={props.alt}/>
  </LinkImage>
)
