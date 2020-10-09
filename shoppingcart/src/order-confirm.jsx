import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {IntlProvider} from 'react-intl'
import {messages, lang} from './i18n'
// import ShoppingCart from './pages/shoppingcart.jsx'
import {__route_root__} from './utils/utils.js'
import {AnimatedRoute} from 'react-router-transition'
import Loadable from 'react-loadable'
import Loading from './components/msite/refreshing.jsx'
import Loading1 from './components/msite/loading.jsx'
import TermsConditions from './pages/terms-condition.jsx'


const OrderConfirm = Loadable({
	loader: () => import(/* webpackChunkName: "page--orderconfirm" */ './pages/orderconfirm.jsx'),
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

export default () => (
  <IntlProvider locale={lang} messages={messages}>
  	<div>
			<Route path={`${window.ctx || ''}/order-confirm/:transactionId`} component={OrderConfirm}/>
  	</div>
  </IntlProvider>

)
