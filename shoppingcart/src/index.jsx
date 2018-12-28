import React from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import {IntlProvider} from 'react-intl'
import {getMessages, getLang} from './i18n'
// import ShoppingCart from './pages/shoppingcart.jsx'
import {__route_root__} from './utils/utils.js'
import {AnimatedRoute} from 'react-router-transition'
import Loadable from 'react-loadable'
import Loading from './components/msite/refreshing.jsx'
import Loading1 from './components/msite/loading.jsx'

import { connect } from 'react-redux'

const AddressModal = Loadable({
	loader: () => import(/* webpackChunkName: "page--address-modal" */ './pages/address-modal.jsx'),
    loading: Loading
})

const ShippingMethods = Loadable({
	loader: () => import(/* webpackChunkName: "page--shipping-methods" */ './pages/shipping-methods.jsx'),
    loading: Loading
})

const Mercado = Loadable({
	loader: () => import(/* webpackChunkName: "page--mercado" */ './pages/mercado.jsx'),
    loading: Loading
})

const CardBinding = Loadable({
	loader: () => import(/* webpackChunkName: "page--cardbinding" */ './pages/cardbinding.jsx'),
    loading: Loading
})

const Coupons = Loadable({
    loader: () => import(/* webpackChunkName: "page--coupons" */ './pages/coupons.jsx'),
    loading: Loading
})

const ShoppingCart = Loadable({
    loader: () => import(/* webpackChunkName: "page--shoppingcart" */ './pages/shoppingcart.jsx'),
    loading: Loading1
})

const OrderConfirm = Loadable({
	loader: () => import(/* webpackChunkName: "page--orderconfirm" */ './pages/orderconfirm.jsx'),
	loading: Loading
})

const DLocal = Loadable({
  loader: () => import(/* webpackChunkName: "component--dlocal"  */ './pages/dlocal.jsx'),
  loading: Loading
})

const Checkout = Loadable({
  loader: () => import(/* webpackChunkName: "component--checkout"  */ './pages/checkout.jsx'),
  loading: Loading
})

const defaultStyles = {
  position: 'fixed',
  top: 0,
  backgroundColor: '#fff',
  width: '100%',
  zIndex: 20,
  overflow: 'auto'

}

const defaultAnimations = {
  atEnter: { offset: 100, height: 0},
  atLeave: { offset: 100, height: 0},
  atActive: { offset: 0, height: 100}
}

const mapStateToProps = (state) => {
  return {
    lang: state.lang
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
   	SETLANG: (lang) => {
   		dispatch(changeLang(lang))
   	}
  }
}

const Index = (props) => {

	let _lang = getLang(props.lang)

	let _messages = getMessages(_lang)


  return <IntlProvider locale={_lang} messages={_messages}>
  	<div>

  		<Switch>
       <Route path={`${window.ctx || ''}/checkout/:orderId`}  component={Checkout}/>
			 <Route path={`${window.ctx || ''}/order-confirm/:transactionId`} component={OrderConfirm}/>
			 <Route path={`${window.ctx || ''}${__route_root__}/`}  component={ShoppingCart}/>
		  </Switch>

  		
  		{/*<Route path={`${window.ctx || ''}${__route_root__}/`}  component={ShoppingCart}/>*/}
    	

    	<AnimatedRoute	{...defaultAnimations}
					    mapStyles={(styles) => ({
					        transform: `translateY(${styles.offset}%)`,
					        ...defaultStyles
					    })}
				      path={`${window.ctx || ''}${__route_root__}/address`} component={AddressModal}/>
    	<AnimatedRoute	{...defaultAnimations}
					    mapStyles={(styles) => ({
					        transform: `translateY(${styles.offset}%)`,
					        ...defaultStyles
					    })}
				      path={`${window.ctx || ''}${__route_root__}/shipping-methods`} component={ShippingMethods}/>
    	<AnimatedRoute	{...defaultAnimations}
					    mapStyles={(styles) => ({
					        transform: `translateY(${styles.offset}%)`,
					        ...defaultStyles
					    })}
				      path={`${window.ctx || ''}${__route_root__}/mercado`} component={Mercado}/>
    	<AnimatedRoute	{...defaultAnimations}
					    mapStyles={(styles) => ({
					        transform: `translateY(${styles.offset}%)`,
					        ...defaultStyles
					    })}
				      path={`${window.ctx || ''}${__route_root__}/credit-card`} component={CardBinding}/>
    	<AnimatedRoute	{...defaultAnimations}
					    mapStyles={(styles) => ({
					        transform: `translateY(${styles.offset}%)`,
					        ...defaultStyles
					    })}
				      path={`${window.ctx || ''}${__route_root__}/coupons`}
				      component={Coupons}/>

      <AnimatedRoute  {...defaultAnimations}
              mapStyles={(styles) => ({
                  transform: `translateY(${styles.offset}%)`,
                  ...defaultStyles
              })}
              path={`${window.ctx || ''}${__route_root__}/dlocal`}
              component={DLocal}/>


  	</div>
  	</IntlProvider>

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index))

