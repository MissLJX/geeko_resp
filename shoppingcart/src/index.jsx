import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {IntlProvider} from 'react-intl'
import {messages, lang} from './i18n'
import ShoppingCart from './pages/shoppingcart.jsx'
import AddressModal from './pages/address-modal.jsx'
import ShippingMethods from './pages/shipping-methods.jsx'
import Mercado from './pages/mercado.jsx'
import CardBinding from './pages/cardbinding.jsx'
import Coupons from './pages/coupons.jsx'
import {__route_root__} from './utils/utils.js'
import {AnimatedRoute} from 'react-router-transition'

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

export default () => (
  <IntlProvider locale={lang} messages={messages}>
  	<div>
    	<Route path={`${window.ctx || ''}${__route_root__}/`} component={ShoppingCart}/>

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

  	</div>
  	</IntlProvider>

)
