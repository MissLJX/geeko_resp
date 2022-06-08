import React from 'react'
import Styled from 'styled-components'

export const BANNER = Styled.div`
  background: url(${props => props.src}) center 89px/auto 650px fixed no-repeat;
  height: 650px;
  margin-top: 89px;
  @media (max-width: 1200px) {
    background: url(${props => props.src1}) center/auto 650px no-repeat;
    margin-top: 60px;
  }
`

export const SMALLBANNER = Styled.div`
  background: url(${props => props.src}) center center/auto 650px no-repeat;
  height: 650px;
  margin-top: 89px;
  @media (max-width: 1200px) {
    background: url(${props => props.src1}) center/auto 285px no-repeat;
    margin-top: 60px;
    height:285px;
  }
`