import React from 'react'
import styled from 'styled-components'
import Icon from '../icon.jsx'

import {FormattedMessage} from 'react-intl'

import LinkImage from '../link-image.jsx'

import Cookie from 'js-cookie'
import {updateCurrency} from '../../api'

const __Language_Map__ = {
	'en': 'English',
	'es': 'Español',
	'de': 'Deutsch',
	'fr': 'Français',
	'pt': 'Português',
	'sv': 'Svenska',
	'da': 'Dansk',
	'nb': 'Norsk',
	'is': 'Íslenska',
	'fi': 'Suomalainen'
}

const __Support_Languages__ = [
	'en',
	'es',
	'de',
	'fr',
	'pt',
	'sv',
	'da',
	'nb',
	'is',
	'fi'
]

const getLangLabel = lang => __Language_Map__[lang.substring(0, 2)]

const HEADER = styled.div`
	
	border-bottom: 1px solid #e5e5e5;

	.__secure{
		color: #57b936;
		& > span{
			vertical-align: middle;
		}
	}

	.__logo{
		img{
			height: 30px;
			width: auto;
		}
	}

	.__hr{
		margin-left: 10px;
    	margin-right: 10px;
    	font-size: 24px;
    	vertical-align: middle;
    	color: #e5e5e5;
	}

	& > div{
		width: 1150px;
		margin: auto;
		height: 50px;

	}
`

const SELECT = styled.div`
	display:inline-block;
	vertical-align: middle;
	position: relative;
	cursor: pointer;
	&::after{
		content:'▼';
		display: inline-block;
		vertical-align: middle;
		font-size: 12px;
		margin-left: 8px;
	}

	.__title{

	}

	.__displayer{
		display: none;
		position: absolute;
		padding-top: 20px;
		top: -1;
		left: 0;
		transform: translateX(-50%);
		z-index: 2;
	}

	&:hover{
		.__displayer{
			display: block;
		}
	}
`

const CURRENCY = styled.div`
	
	text-align: left;
	.__icon{
		display: inline-block;
		width: 30px;
	  height: 16px;
	  background: center/100% no-repeat;
	  vertical-align: middle;
	  margin-right:4px;
	  border: 1px solid #e6e6e6;
	}

	.__label{
		font-size: 12px;
		vertical-align: middle;
	}

	cursor: pointer;


	
`

const CURRENCIES = styled.ul`
	&::after{
		content:'';
		display:block;
		clear:both;
	}
	& > li{
		float: left;
		width: 65px;
		margin-left: 15px;
		margin-top: 10px;
	}

	background-color: #fff;
  width: 420px;
  border: 1px solid #e6e6e6;
  padding-bottom: 10px;
`

const LANGS = styled.ul`
  background-color: #fff;
  border: 1px solid #e6e6e6;
  padding: 0 10px;
	& > li{
		height: 30px;
		text-align: left;
		line-height: 30px;
	}
`

const getLogo = () => {
	return window.logoIcon
}

const getIconPosition = (index) => {
	return { x: (index % 4) * 30, y: Math.floor(index / 4) * 20 }
}

// const Currency = ({currency, index}) => {
//   const position = getIconPosition(index)
//   return <CURRENCY onClick={ () => { Cookie.set('currency', currency.value, {expires: 365}); window.location.href = `${window.ctx || ''}/cart` }}>
//     <span className="__icon" style={{backgroundPosition: `${-position.x}px ${-position.y}px`}}></span>
//     <span className="__label">{currency.value}</span>
//   </CURRENCY>
// }

const Currency = class extends React.Component {
	constructor (props) {
		super(props)
	}

	changeCurrency (currency) {
  	Cookie.set('currency', currency, {expires: 365})
  	updateCurrency(currency).then(() => {
  		window.location.reload()
  	})
	}

	render () {
  	const {currency, index} = this.props
  	const position = getIconPosition(index)
	  return <CURRENCY onClick={ () => { this.changeCurrency(currency.value) }}>
	    <span className="__icon" style={{backgroundImage: `url(https://dgzfssf1la12s.cloudfront.net/site/ninimour/flags/flag-${currency.value}.png)`}}></span>
	    <span className="__label">{currency.value}</span>
	  </CURRENCY>
	}
}

const Header = ({intl, lang, currency, currencies, changeLang, hideTools}) => (
	<HEADER>
  	<div>
	  	<div className="x-table __vm x-fh x-fw">
	  		<div className="x-cell" style={{width: 110}}>
	  			<span className="__logo">
	  				<LinkImage title="home" src={getLogo()} href={`${window.ctx}/`}/>
	  			</span>
	  		</div>
	  		<div className="x-cell">
	  			<span className="__hr">|</span>
		        <span className="x-uppercase __secure">
		  	  		<Icon style={{fontSize: 26, marginRight: 5}}>&#xe745;</Icon>
		          	<FormattedMessage
				    id='secure_check_out'
				    defaultMessage='secure checkout'/>
		        </span>
	  		</div>

	  		{
	  			!hideTools && <div className="x-cell">
	  			<SELECT>
	  				<span className="__title">{ currency }</span>
	  				<div className="__displayer">
	  					<CURRENCIES>
	  					{
	  						currencies && currencies.map((c, index) => <li key={index}>
	  							<Currency currency={c} index={index}/>
	  						</li>)
	  					}
	  					</CURRENCIES>
	  				</div>
	  			</SELECT>

	  			<span style={{marginLeft: 15, marginRight: 15, verticalAlign: 'middle'}}>|</span>

	  			<SELECT>
	  				<span className="__title">{ __Language_Map__[lang] }</span>
	  				<div className="__displayer">
	  					<LANGS>
	  						{
	  							__Support_Languages__.map(language => <li key={language} onClick={ () => { changeLang(language) }}>
	  								{getLangLabel(language)}
	  							</li>)
	  						}
	  					</LANGS>
	  				</div>
	  			</SELECT>
	  		</div>
	  		}

	  		<div className="x-cell __right">
		        <a style={{textDecoration: 'underline', color: '#222', textTransform: 'uppercase'}} href={ siteType === 'new' ? `${window.ctx || ''}/page/trending-now` : `${window.ctx || ''}/i/trending-now` }><FormattedMessage id="continue_shopping"/></a>
		        <span style={{marginLeft: 5}}>▶</span>
	  		</div>

	  	</div>
  	</div>
	</HEADER>

)

export default Header
