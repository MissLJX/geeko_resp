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


const ShoppingCart = Loadable({
    loader: () => import(/* webpackChunkName: "page--pc-shoppingcart" */ './pcpages/shoppingcart.jsx'),
    loading: Loading1
})

const AddressModal = Loadable({
	loader: () => import(/* webpackChunkName: "page--address-modal" */ './pcpages/address.jsx'),
    loading: Loading
})

const Coupon = Loadable({
	loader: () => import(/* webpackChunkName: "page--coupon-modal" */ './pcpages/coupon.jsx'),
    loading: Loading
})

const Credit = Loadable({
	loader: () => import(/* webpackChunkName: "page--credit-card" */ './pcpages/credit.jsx'),
    loading: Loading
})

// const OrderConfirm = Loadable({
// 	loader: () => import( webpackChunkName: "page--orderconfirm"  './pcpages/order-confirm.jsx'),
// 	loading: Loading
// })


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
				<Switch>
					<Route path={`${window.ctx || ''}${__route_root__}/credit-card`} component={Credit}/>
					<Route path={`${window.ctx || ''}${__route_root__}/`}  component={ShoppingCart}/>
					{/*<Route path={`${window.ctx || ''}/order-confirm/:transactionId`} component={OrderConfirm}/>*/}
				</Switch>
				<Route path={`${window.ctx || ''}${__route_root__}/coupons`}  component={Coupon}/>
				<Route path={`${window.ctx || ''}${__route_root__}/address`} exact component={AddressModal}/>
				<Route path={`${window.ctx || ''}${__route_root__}/address/:id`} component={AddressModal}/>
				

				{/*<AnimatedRoute
			      path={`${window.ctx || ''}${__route_root__}/coupons`}
			      component={Coupon}
			      atEnter={{ offset: 0}}
			      atLeave={{ offset: 0}}
			      atActive={{ offset: -100}}
			      wrapperComponent={false}
			      mapStyles={(styles) => ({
				        transform: `translateX(${styles.offset}%)`
				    })}
			    />*/}
			</div>
		</div>
	</IntlProvider>
	}
}

