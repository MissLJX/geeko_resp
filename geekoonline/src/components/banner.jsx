import React from 'react'
import Styled from 'styled-components'

export const BANNER = Styled.div`
  background: url(${props => props.src}) center 89px/auto 100% fixed no-repeat;
  height: 857px;
  @media (max-width: 1200px) {
    background: url(${props => props.src1}) center 60px/auto 100% fixed no-repeat;
  }
`