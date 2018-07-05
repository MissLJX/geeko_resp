import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {IntlProvider} from 'react-intl'
import {messages, lang} from './i18n'
import ShoppingCart from './pages/shoppingcart.jsx'
import AddressModal from './pages/address-modal.jsx'
import ShippingMethods from './pages/shipping-methods.jsx'
import Mercado from './pages/mercado.jsx'
import {__route_root__} from './utils/utils.js'

export default () => (

  	<div>
    	<Route path={`${window.ctx || ''}${__route_root__}/`} component={ShoppingCart}/>
    	<Route path={`${window.ctx || ''}${__route_root__}/address`} component={AddressModal}/>
    	<Route path={`${window.ctx || ''}${__route_root__}/shipping-methods`} component={ShippingMethods}/>
    	<Route path={`${window.ctx || ''}${__route_root__}/mercado`} component={Mercado}/>
  	</div>

)
