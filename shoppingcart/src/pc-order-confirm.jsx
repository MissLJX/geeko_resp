import React from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import {AnimatedRoute} from 'react-router-transition'
import {IntlProvider} from 'react-intl'
import {messages, lang, getMessages, getLang} from './i18n'
import {__route_root__} from './utils/utils.js'
import Loadable from 'react-loadable'
import Loading from './components/msite/refreshing.jsx'
import Loading1 from './components/msite/loading.jsx'
import Header from './components/pc/header.jsx'
import { getCurrencies } from './api'
import { connect } from 'react-redux'
import { changeLang } from './store/actions.js'


const OrderConfirm = Loadable({
	loader: () => import(/* webpackChunkName: "page--orderconfirm" */ './pcpages/order-confirm.jsx'),
	loading: Loading
})


const mapStateToProps = (state) => {
  return {
    lang: state.lang
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
   	SETLANG: (lang) => {
   		dispatch(changeLang(lang)).then(() => {
   			window.location.reload()
   		})
   	}
  }
}


const Index =  class extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			currency: window.__currency__,
			currencies: []
		}
	}

	componentWillMount(){
		getCurrencies().then(({result}) => {
			this.setState({
				currencies: result
			})
		})
	}

	render(){

		let _lang = getLang(this.props.lang)

		let _messages = getMessages(_lang)

		return <IntlProvider locale={_lang} messages={_messages}>
		<div>
			<Header currencies={this.state.currencies} currency={this.state.currency} lang={_lang} changeLang={ ( lang ) => { this.props.SETLANG(lang) } }/>
			<div>
				<Route path={`${window.ctx || ''}/order-confirm/:transactionId`} component={OrderConfirm}/>
			</div>
		</div>
	</IntlProvider>
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index))