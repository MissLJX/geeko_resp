import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {IntlProvider} from 'react-intl'
import {messages, lang} from './i18n'
import ShoppingCart from './pages/shoppingcart.jsx'
import AddressModal from './pages/address-modal.jsx'
import ShippingMethods from './pages/shipping-methods.jsx'
import Mercado from './pages/mercado.jsx'

export default () => (

  	<div>
    	<Route path={`${window.ctx || ''}/`} component={ShoppingCart}/>
    	<Route path={`${window.ctx || ''}/address`} component={AddressModal}/>
    	<Route path={`${window.ctx || ''}/shipping-methods`} component={ShippingMethods}/>
    	<Route path={`${window.ctx || ''}/mercado`} component={Mercado}/>
  	</div>

)
