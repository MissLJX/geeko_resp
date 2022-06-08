import React from 'react'
import Styled from 'styled-components'

const ICON = Styled.div`
  .__icon{
    font-family: iconfont;
    font-size: 120px;
  }

  ._content{
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

  ._m-top{
    margin-top:10px;
  }

  @media (max-width: 1200px) {
    .__icon{
      font-size:64px;
    }

    ._content{
      margin-left:18px;
      text-align:left;
      margin-top:0px;

      .__title{
        font-size:16px;
      }
    }

    ._m-top{
      margin-top:5px;
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
    padding:0px 20px;

    & > *{
      width: 100%;
      margin-top: 30px;
      display:flex;
      align-items: center;
    }
  }
`

export const Icon = ( props ) => <ICON {...props}>
  <div><span className="__icon">{props.children}</span></div>
  <div className='_content'>
    <div><span className="__title">{props.title}</span></div>
    <div className='_m-top'><span className="__dsc">{props.description}</span></div>
  </div>
</ICON>


