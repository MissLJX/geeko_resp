import React from 'react'
import styled from 'styled-components'
import {secondaries} from '../data'
import {SearchInput, SearchButton, SearchInputContainer, Wrapper} from './styled-search.jsx'
import {Link, withRouter} from 'react-router-dom'

import {injectIntl} from 'react-intl'

class Search extends React.Component {
  constructor (props) {
  	super(props)
    this.state = {
      searchResult: [],
      key: props.searchKey || '',
      showResult: true
    }
    this.search = this.search.bind(this)
    this.focusLeave = this.focusLeave.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  search (evt) {
    let value = evt.currentTarget.value
    let reg = new RegExp(value, 'ig')

    let newQuestions = value ? secondaries.filter(q => reg.test(q.title)) : []

    this.setState({
      key: value,
      showResult: true,
      searchResult: newQuestions
    })
  }

  focusLeave (evt) {
    this.setState({
      showResult: false
    })
  }

  stopBubble (e) {
    e.nativeEvent.stopImmediatePropagation()
  }

  handleSubmit (evt) {
    evt.preventDefault()
    this.setState({showResult: false})
    const history = this.props.history

    const key = this.state.key

    if (key) {
      history.push(`/support/search?key=${this.state.key}`)
    }
  }

  componentDidMount () {
    document.addEventListener('click', this.focusLeave, false)
  }

  render () {
    const SearchResultWrapper = styled.ul`
      background-color: #fff;
      padding: 10px;
      max-height: 300px;
      overflow: auto;
      margin-top: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,.1);
      position: absolute;
      width: 100%;
      z-index:2;
      & > li{
        height: 40px;
        line-height: 40px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        & > a{
          text-decoration: none;
          color: #666;
          display: block;
        }
      }

    `

    const {intl} = this.props

  	return (
  		<Wrapper style={this.props.style} >

	  		<SearchInputContainer style={this.props.inputStyle} onClick={(e) => { this.stopBubble(e) }}>
	  			<SearchButton onClick={this.handleSubmit} style={{float: 'right'}}>&#xe61e;</SearchButton>
	  			<div style={{overFlow: 'hidden'}}>
            <form onSubmit={this.handleSubmit}>
	  				 <SearchInput type="text" value={this.state.key} onFocus={(e) => { this.setState({showResult: true}) }} onChange={this.search} placeholder={intl.formatMessage({id: 'searchholder'})}/>
	  			  </form>
          </div>
	  		</SearchInputContainer>

	  		{
          this.state.showResult && this.state.searchResult && this.state.searchResult.length > 0 &&

          <SearchResultWrapper>
            {this.state.searchResult.map((q) => (
              <li key={q.id}>
                <Link to={`${window.ctx||''}/support/question/${q.id}`}>{q.title}</Link>
              </li>
            ))}
          </SearchResultWrapper>

        }
  		</Wrapper>
  		)
  }
}

export default withRouter(injectIntl(Search))
