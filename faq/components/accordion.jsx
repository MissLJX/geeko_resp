import React from 'react'
import styled from 'styled-components'

export default class Accordion extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      active: false
    }
    this.clickHandle = this.clickHandle.bind(this)
  }

  clickHandle (evt) {
    evt.preventDefault()
    this.setState({
      active: !this.state.active
    })
  }

  render () {
    const AccDiv = styled.div`
      & > .__hd{
        cursor: pointer;
        height: 50px;
        line-height: 50px;
        &::after{
          content:'';
          display: block;
          clear: both;
        }
        & > .__icon{
          float: right;
          position: relative;
          &::after{
            content: '\\e6b9';
            font-family: 'iconfont';
            font-style: normal;
            font-size: 16px;
            font-weight: bold;
            position: absolute;
            left:-16px;
            top:0;
          }
        }
      };

      &.active > .__hd{
        & > .__icon{
          &::after{
            content: '\\e6ba';
          }
        }
      }

      & > .__bd{
        display: none;

      };

      &.active > .__bd{
        display: block;
      };
    `

    return (
      <AccDiv className={this.state.active ? 'active' : ''}>
        <div className="__hd" onClick={this.clickHandle}>
          <span className="__title">{this.props.title}</span>
          <i className=" __icon"></i>
        </div>
        <div className="__bd">
          {this.props.children}
        </div>
      </AccDiv>
    )
  }
}
