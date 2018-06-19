import React from 'react'
import styled from 'styled-components'
import {PageHeader, PageContanier} from '../components/buttons.jsx'
import Search from '../components/search.jsx'
import qs from 'query-string'
import {secondaries, questions} from '../data'

import {FormattedMessage} from 'react-intl'

export default class SearchResult extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    	list: null,
    	key: '',
    	size: 0
    }
  }

  initialState (key) {
  	let reg = new RegExp(key, 'ig')
  	const filteredQuestions = secondaries.filter(q => reg.test(q.title)) || []
  	const size = filteredQuestions.length
  	this.setState({
  		key: key,
  		size,
  		list: filteredQuestions
  	})
  }

  componentWillMount () {
  	let {key} = qs.parse(this.props.location.search)
    this.initialState(key)
  }

  componentWillReceiveProps (newProps) {
  	if (this.props.location.search != newProps.location.search) {
  		let {key} = qs.parse(newProps.location.search)
  		this.initialState(key)
  	}
  }

  render () {
  	const ListWrapper = styled.ul`
  		padding: 20px 10px;
  		& > li{
  			border-top: 1px solid #cacaca;
  			padding: 10px 0;
  			cursor: pointer;
  			position: relative;
  			&::after{
  				content:'';
  				display:block;
  				height: 50px;
  				width: 100%;
  				position: absolute;
  				bottom: 0;
  				
  			}

  			& > div{
  				max-height: 187px;
  				overflow: hidden;
  			}
  		}

  	`

    // background: -webkit-linear-gradient(transparent, #fff); /* Safari 5.1 - 6.0 */
    // background: -o-linear-gradient(transparent, #fff); /* Opera 11.1 - 12.0 */
    // background: -moz-linear-gradient(transparent, #fff); /* Firefox 3.6 - 15 */
    // background: linear-gradient(transparent, #fff); /* 标准的语法 */

  	return (
	  	<div style={{backgroundColor: '#fff'}}>

        <PageHeader label="FAQ"/>
        <PageContanier>
  	  		<div style={{padding: '20px 10px 0 10px'}}>
  	  			<Search inputStyle={{border: '1px solid #cacaca'}} searchKey={this.state.key}/>
  	  			<div>
  		  			<h1 style={{fontSize: '24px', fontWeight: '400', marginTop: '20px'}}>
                <FormattedMessage id='searchresults'/>
              </h1>
  		  			<p style={{marginTop: '5px'}}>
                <FormattedMessage tagName="i" id="searchcount" values={{count: this.state.size, key: this.state.key}}/>
              </p>
  	  			</div>
  	  		</div>

  	  		<ListWrapper className="x-rich __list">

  	  			{this.state.list.map(item => (
  	  				<li key={item.id} onClick={() => { this.props.history.push(`/support/question/${item.id}`) }}>
  	  					<div dangerouslySetInnerHTML={{__html: item.richText}}/>
  	  				</li>

  	  			))}
  	  		</ListWrapper>
        </PageContanier>
	  	</div>
  	)
  }
}
