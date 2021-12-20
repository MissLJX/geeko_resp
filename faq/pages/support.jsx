import React from 'react'
import {SupportButton, PageHeader, PageContanier} from '../components/buttons.jsx'
import styled from 'styled-components'
import Search from '../components/search.jsx'
import Accordion from '../components/accordion.jsx'
import {questions} from '../data'
import {Link} from 'react-router-dom'
import {FormattedMessage, injectIntl} from 'react-intl'
// import '../css/style.css'

const Support = class extends React.Component {
	constructor (props) {
		super(props)
	}

  comsponentWillMount () {
    if (window.zE) {
      zE('webWidget:on', 'open', function () {
        zE('webWidget', 'show')
      })

      zE('webWidget:on', 'close', function () {
        zE('webWidget', 'hide')
      })

      zE('webWidget', 'helpCenter:setSuggestions', { search: 'FAQ' })
    }
  }

  onlineClickHandle () {
    if (window.zE) {
      zE('webWidget', 'show')
      zE('webWidget', 'open')
    }
  }

  render () {
    const {intl} = this.props


  	const supportbuttons = <ul className='x-flex __around'>
  		<li>
        <SupportButton onClick={this.onlineClickHandle.bind(this)} href="#" color="#599386" label={intl.formatMessage({id: 'onlinehelp'})}>&#xe665;</SupportButton>
      </li>
  		<li><SupportButton href={`https://m.me/${window.messageId}?isouter=1`} color="#4797b3" label={intl.formatMessage({id: 'messageus'})}>&#xe664;</SupportButton></li>
  		<li><SupportButton href={`${window.ctx||''}/support/ticket`} color="#cc5139" label={intl.formatMessage({id: 'tickets'})}>&#xe666;</SupportButton></li>
  	</ul>

  	const styleSupportbuttons = {
  		padding: '20px 0',
  		backgroundColor: '#fff'
  	}

  	const SearchArea = styled.div`
  		height:150px;
  		padding-top: 40px;
  		position: relative;
  		&::before{
  			content:'';
  			position: absolute;
  			top:0;
  			left:0;
  			width:100%;
  			height:100%;
  			background-color: rgba(0,0,0,.16);
  			z-index:0;
  		}

  		&::after{
			content: "";
			display: block;
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
			background: url(https://image.geeko.ltd/faq/faqback.jpg) no-repeat;
			background-size: 100%;
  		}

  		& > *{
  			z-index:1;
  			position: relative;
  		}
  	`

  	const styleSearchTitle = {
  		color: '#fff',
  		fontWeight: '400',
  		fontSize: '16px',
  		textAlign: 'center'
  	}

  	const styleFAQTitle = {
  		fontWeight: '600',
  		fontSize: '16px',
  		height: '50px',
  		paddingLeft: '10px',
  		textTransform: 'uppercase',
  		lineHeight: '50px',
  		backgroundColor: '#fff'
  	}

  	const Accordions = styled.ul`
  		background-color: #fff;
  		margin-top:10px;
  		padding-left: 10px;
  		padding-right: 10px;
  		& > li{
  			border-top: 1px solid #efefef;
        
  			&:first-child{
  				border-top: none;
  			}
  		}
  	`

  	const SecondaryUL = styled.ul`
  		padding-bottom: 10px;
  		& > li{
  			height: 40px;
  			line-height: 40px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
  		}
  	`

    return (

    	<div>
        <PageHeader label={intl.formatMessage({id: 'support'})} href="/index"/>
        <PageContanier>

  	        <div style={styleSupportbuttons}>
  	      		{supportbuttons}
  	        </div>

  	        <SearchArea>
  	        	<h1 style={styleSearchTitle}>
              <FormattedMessage
                id='helpyou'
                defaultMessage='How Can I Help You?'
              />

            </h1>
  	        	<Search style={{width: '90%', margin: '15px auto auto auto'}}/>
  	        </SearchArea>

  	        <div style={{backgroundColor: '#efefef'}}>
  		        <h2 style={styleFAQTitle}>
  		        	faq
  		        </h2>
  		        <Accordions>

  		        	{
  		        		questions.map(
  		        			(question) => (
  			        			<li key={question.id}>
  			        				<Accordion title={question.title}>
  			        					<SecondaryUL>
  			        					{
  			        						(question.questions || []).map((q) => (
  			        							<li key={q.id}>
  			        								<Link style={{color: '#666'}} activeStyle={{color: '#e5004f'}} to={`${window.ctx || ''}/support/question/${q.id}`}>{q.title}</Link>
  			        							</li>
  			        						))
  			        					}
  			        					</SecondaryUL>
  			        				</Accordion>
  			        			</li>
  		        			)
  		        		)
  		        	}

  		        </Accordions>
  	        </div>
        </PageContanier>

    	</div>
    )
  }
}

export default injectIntl(Support)
