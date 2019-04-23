import React from 'react'
import Styled from 'styled-components'

const ICON = Styled.div`
  .__icon{
    font-family: iconfont;
    font-size: 120px;
  }
  .__title{
    font-size: 1.8rem;
    line-height: 2rem;
    color: #222;
    font-weight: bold;
  }
  .__dsc{
    font-size: 14px;
    line-height: 1.8rem;
    color: #666666;
    white-space: pre-line;
  }
  & > div{
    margin-top: 20px;
    &:first-child{
      margin-top: 0;
    }
  }

  &.black{
    .__icon{
      color: #fff;
      background-color: #000;
      border-radius: 50%;
    }
    
  }
`


export const ICONS = Styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  & > *{
    width: ${props => props.iconwidth || 340}px;
    text-align: center;
    margin-top: 130px;
  }
  @media (max-width: 1200px) {
    width: 100%;
    & > *{
      width: 283px;
      text-align: center;
      margin-top: 30px;
    }
  }
`

export const Icon = ( props ) => <ICON {...props}>
  <div><span className="__icon">{props.children}</span></div>
  <div><span className="__title">{props.title}</span></div>
  <div><span className="__dsc">{props.description}</span></div>
</ICON>


