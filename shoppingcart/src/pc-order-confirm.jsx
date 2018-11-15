import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {AnimatedRoute} from 'react-router-transition'
import {IntlProvider} from 'react-intl'
import {messages, lang} from './i18n'
import {__route_root__} from './utils/utils.js'
import Loadable from 'react-loadable'
import Loading from './components/msite/refreshing.jsx'
import Loading1 from './components/msite/loading.jsx'
import Header from './components/pc/header.jsx'
import { getCurrencies } from './api'


const OrderConfirm = Loadable({
	loader: () => import(/* webpackChunkName: "page--orderconfirm" */ './pcpages/order-confirm.jsx'),
	loading: Loading
})


export default class extends React.Component{
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
		return <IntlProvider locale={lang} messages={messages}>
		<div>
			<Header currencies={this.state.currencies} currency={this.state.currency} lang={lang}/>
			<div>
				<Route path={`${window.ctx || ''}/order-confirm/:transactionId`} component={OrderConfirm}/>
			</div>
		</div>
	</IntlProvider>
	}
}

