import React from 'react'
import {SupportButton} from '../components/buttons.jsx'
import styled from 'styled-components'
import Search from '../components/search.jsx'
import Accordion from '../components/accordion.jsx'
import {questions} from '../data'
import {Link} from 'react-router-dom'

export default class Support extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
  	const supportbuttons = <ul className='x-flex __around'>
  		<li><SupportButton color="#599386" label="Online Help">&#xe665;</SupportButton></li>
  		<li><SupportButton color="#4797b3" label="Message Us">&#xe664;</SupportButton></li>
  		<li><SupportButton href="/tickets" color="#cc5139" label="Tickets">&#xe666;</SupportButton></li>
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
			background: url(https://img.ltwebstatic.com/images2_pi/2018/04/18/15240464072605457524_thumbnail_600x.jpg) no-repeat;
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
	        <div style={styleSupportbuttons}>
	      		{supportbuttons}
	        </div>

	        <SearchArea>
	        	<h1 style={styleSearchTitle}>How Can I Help You?</h1>
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
			        								<Link style={{color: '#666'}} activeStyle={{color: '#e5004f'}} to={`/question/${q.id}`}>{q.title}</Link>
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

    	</div>
    )
  }
}
