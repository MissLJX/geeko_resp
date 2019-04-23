import React from 'react'
import Styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const HEADER = Styled.header`
  height: 89px;
  background-color: #020202;
  width: 100%;
  top:0;
  left:0;
  position: fixed;
  z-index: 2;
  & > *{
    display: inline-block;
  }
  text-align: center;
  line-height: 77px;
  
  .__menu{
    display: none;
    position: absolute;
    right: 10px;
    font-size: 16px;
    font-family: iconfont;
    cursor: pointer;
    color: #fff;
    top: 0;
    line-height: 60px;
  }


  @media (max-width: 1200px) {
    height: 60px;
    line-height: 55px;
    text-align: left;
    padding: 0 20px;
    .__menu{
      display: block;
      
    }
  }

`
const NAV = Styled.nav`
  margin-left: 160px;
  & > ul > li{
    display: inline-block;
    margin-left: 55px;
    &:first-child{
      margin-left:0;
    }
    a{
      color: #fff;
      text-decoration: none;
      font-size: 16px;
      &:hover{
        opacity: .8;
      }
    }
  }

  

  @media (max-width: 1200px) {
    display: none;
    background-color: #fff;
    position: fixed;
    top: 60px;
    width: 100%;
    z-index: 2;
    left: 0;
    margin-left:0;
    & > ul{
      
    }
    & > ul > li{
      display: block;
      margin-left: 10px;
      &:first-child{
        margin-left:10px;
      }
      a{
        color: #000;
      }
    }
    &.__show{
      display: block;
    }
  }
`

const H1 = Styled.h1`
  font-weight: 400;
  .__icon{
    color:#fff;
    font-family: iconfont;
    vertical-align: middle;
    display: inline-block;
    font-size: 36px;
  }
  .__title{
    font-size: 20px;
    color: #fff;
    vertical-align: middle;
    display: inline-block;
    margin-left: 32px;
  }

  @media (max-width: 1200px) {
    .__icon{
      font-size: 20px;
    }
    .__title{
      display: none;
    }
  }
`

export default class extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      showmenu: false
    }
  }

  menuHandler(){
    this.setState({
      showmenu: !this.state.showmenu
    })
  }

  render(){
    return <HEADER>
    <H1>
      <span className="__icon">&#xe67f;</span>
      <span className="__title">上海极高信息技术有限公司</span>
    </H1>
    <NAV className={this.state.showmenu ? '__show': ''}>
      <ul>
        <li onClick={this.menuHandler.bind(this)}>
          <NavLink to="/">关于我们</NavLink>
        </li>
        <li onClick={this.menuHandler.bind(this)}>
          <NavLink to="/join">加入我们</NavLink>
        </li>
        <li onClick={this.menuHandler.bind(this)}>
          <NavLink to="/service">极高业务</NavLink>
        </li>
        <li onClick={this.menuHandler.bind(this)}>
          <NavLink to="/supplier">供应商</NavLink>
        </li>
        <li onClick={this.menuHandler.bind(this)}> 
          <NavLink to="/contact">联系我们</NavLink>
        </li>
      </ul>
    </NAV>
    <span className="__menu" onClick={this.menuHandler.bind(this)}>&#xe75a;</span>
  </HEADER>
  }
}
