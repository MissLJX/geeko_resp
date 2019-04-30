import React from 'react'
import Styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const FOOTER = Styled.footer`
  height: 260px;
  background-color: #020202;
  padding-top: 54px;
`

const UL = Styled.ul`
  text-align: center;
  
  & > li{
    display: inline-block;
    font-size: 16px;
    line-height: 16px;
    border-left: 1px solid #fff;
    padding-left: 10px;
    padding-right: 10px;
    &:first-child{
      border-left: none;
    }
    a{
      color: #fff;
      text-decoration: none;
    }
  }
`

export default () => <FOOTER>
  <UL>
    <li>
        <NavLink to="/">关于我们</NavLink>
    </li> 
    <li>
        <NavLink to="/contact">联系我们</NavLink>
    </li> 
    <li>
        <NavLink to="/join">加入我们</NavLink>
    </li> 
  </UL>
  <div style={{textAlign:'center',marginTop: 20, lineHeight:'20px', color: '#fff'}}>
    上海极高信息技术有限公司
  </div>
  <div style={{textAlign:'center',marginTop: 20, lineHeight:'20px', color: '#fff'}}>
    © 2015-2019 geekoonline.com All rights reserved.
  </div>
  <div style={{textAlign:'center',marginTop: 20, lineHeight:'20px', color: '#fff'}}>
    沪ICP备19013724号-1
  </div>
</FOOTER>