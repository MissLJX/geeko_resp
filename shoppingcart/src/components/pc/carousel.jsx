import React from 'react'
import styled from 'styled-components'

const ITEMS = styled.div`
	&::after{
		content:'';
		clear: both;
		display:block;
	}


  position: relative;
  transition: .6s left ease;

	& > *{
		float: left;
    width: ${props => props.itemWidth}px;
    padding-left: ${props => props.margin / 2}px;
    padding-right: ${props => props.margin / 2}px;
	}
`

const CAROUSEL = styled.div`
  position: relative;
  .__prev, .__next{
    background-color: rgba(0, 0, 0, .7);
    width:50px;
    height: 50px;
    cursor: pointer;
    font-family: iconfont;
    font-style: normal;
    font-size: 25px;
    color: #fff;
    text-align:center;
    line-height: 50px;
    position: absolute;
    top: calc(50% - 25px);
    display: none;
    z-index: 5;
  }

  .__prev{
    left:0;
  }
  .__next{
    right:0;
  }

  &:hover{
    .__prev, .__next{
      display: block;
    }
  }
`

export default class Carousel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      index: 0
    }
  }

  prev () {
    const { displays, count} = this.props.options
    if (this.state.index <= displays) {
      this.go(0)
    } else {
      this.go(this.state.index - displays)
    }
  }

  next () {
    const { displays, count} = this.props.options
    if (this.state.index + 2 * displays >= count) {
      this.go(count - displays)
    } else {
      this.go(this.state.index + displays)
    }
  }

  go (offset) {
    this.setState({
      index: offset
    })
  }

  render () {
    const { children, options } = this.props
    const { margin, displays, parentWidth, count } = options

    const itemWidth = parentWidth / displays
    const totalWidth = parentWidth * count / displays

    return <CAROUSEL>
      <div style={{overflow: 'hidden'}}>
        <ITEMS itemWidth={itemWidth} margin={margin} style={{width: totalWidth, left: -itemWidth * this.state.index }}>
          {children}
        </ITEMS>
      </div>

      <div className="__prev" onClick={ this.prev.bind(this) }>&#xe693;</div>
      <div className="__next" onClick={ this.next.bind(this) }>&#xe694;</div>
    </CAROUSEL>
  }
}
