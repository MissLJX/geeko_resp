import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

export default class QuestionSelector extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    	active: false
    }
  }

  render () {
    const QuestionSelectorWrapper = styled.div`
    	position: relative;
    	background-color: #fff;

    	&.active > div > i{
  			&::before{
  				content: '\\e695';
  			}
  		}

  		&.active > ul{
  			display: block;
    		max-height: 300px;
    		overflow: auto;
  		}
	`

    const QuestionSelectorLabel = styled.div`
    	border: 1px solid #cacaca;
  		height: 42px;
  		padding-left: 10px;
  		padding-right: 10px;
  		line-height: 42px;
  		cursor: pointer;
  		& > span{
  			font-weight: bold;
  		}

  		& > i{
  			&::before{
  				font-size: 16px;
  				font-family: iconfont;
  				content: '\\e692';
  				font-style: normal;
  				font-weight: bold;
  			}
  			float: right;
  		}

  		
	`

    const QuestionLi = styled.li`
		height: 40px;
  		line-height: 40px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        & > a{
        	color: #666;
        	text-decoration: none;
        }
	`

    const QuestionUL = styled.ul`
  		padding-left: 10px;
  		padding-right: 10px;
  		position: absolute;
  		background-color: #fff;
  		left: 0;
  		width: 100%;
  		border-left: 1px solid #cacaca;
  		border-right: 1px solid #cacaca;
  		border-bottom: 1px solid #cacaca;
  		display: none;
	`

    return (
      <QuestionSelectorWrapper style={this.props.style} className={this.state.active ? 'active' : ''}>
        <QuestionSelectorLabel onClick={() => { this.setState({active: !this.state.active}) }}>
          <span>{this.props.label}</span>
          <i></i>
        </QuestionSelectorLabel>
        <QuestionUL>
      	{this.props.items.map(item => (
      		<QuestionLi>
      			<Link replace onClick={() => { this.setState({active: !this.state.active}) }} to={`${window.ctx||''}/support/question/${item.id}`}>{item.title}</Link>
      		</QuestionLi>
      	))}
        </QuestionUL>
      </QuestionSelectorWrapper>

    )
  }
}
