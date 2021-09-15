import React from 'react'
// import ReactDOM from 'react-dom'
import {Switch, Route, BrowserRouter} from 'react-router-dom'
// import Support from './support.jsx'
// import Question from './question.jsx'
// import SearchResult from './search-result.jsx'
// import Tickets from './tickets.jsx'
// import Ticket from './ticket.jsx'
// import Orders from './orders.jsx'
// import OnlineHelp from './onlinehelpframe.jsx'
import Rate from './rate.jsx'

import SupportNew from './support/support.jsx';
import FAQ from './FAQ/FAQ.jsx'
import ContactUs from './contact-us/contact-us.jsx'
import Ticket1 from './ticket/ticket.jsx'
import Order from './order/order.jsx'
import TicketAdd from './ticket-add/ticket-add.jsx'
import Question1 from './question/question.jsx'


import {addLocaleData, IntlProvider} from 'react-intl'
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'
import de from 'react-intl/locale-data/de'
import fr from 'react-intl/locale-data/fr'
import es from 'react-intl/locale-data/es'
import pt from 'react-intl/locale-data/pt'

import zh_L from '../i18n/zh'
import de_L from '../i18n/de'
import fr_L from '../i18n/fr'
import es_L from '../i18n/es'
import pt_L from '../i18n/pt'
import en_L from '../i18n/en'




addLocaleData([...en, ...zh, ...fr, ...de, ...pt, ...es])

const messages = {}
// window.lang = 'en'
const lang = (window.lang || 'en').substring(0, 2)

messages['en'] = en_L
messages['zh'] = zh_L

messages['de'] = de_L
messages['fr'] = fr_L

messages['es'] = es_L
messages['pt'] = pt_L
// 清空打印
console.log = () =>{

}
// window.isApp = 'true'
if(window.isApp == 'true'){
  window.isShowApp = 'true'
} else {
  window.isShowApp = 'false'
}

export default () => (

  <IntlProvider locale={lang} messages={messages[lang]}>
    <div>
      <BrowserRouter>
      <Switch>
        {/* <Route path={`${window.ctx || ''}/support`} exact component={Support}/>
        <Route path={`${window.ctx || ''}/support/online-help`} exact component={OnlineHelp}/>
        <Route path={`${window.ctx || ''}/support/search`} component={SearchResult}/>
        <Route path={`${window.ctx || ''}/support/question/:id`} component={Question}/>
        <Route path={`${window.ctx || ''}/support/ticket/add`} component={Ticket}/>
        <Route path={`${window.ctx || ''}/support/ticket/:id`} component={Ticket}/>
        <Route path={`${window.ctx || ''}/support/ticket`} component={Tickets}/>
        <Route path={`${window.ctx || ''}/support/orders`} component={Orders}/> */}
        <Route path={`${window.ctx || ''}/support/rate/:id`} component={Rate}/>

        
        <Route path={`${window.ctx || ''}/support/faq`} component={FAQ}/>
        <Route path={`${window.ctx || ''}/support/question/:id`} component={Question1}/>
        <Route path={`${window.ctx || ''}/support/question`} component={Question1}/>
        <Route path={`${window.ctx || ''}/support/contact-us`} component={ContactUs}/>
        <Route path={`${window.ctx || ''}/support/ticket`} component={Ticket1}/>
        <Route path={`${window.ctx || ''}/support/order`} component={Order}/>
        <Route path={`${window.ctx || ''}/support/ticketadd`} component={TicketAdd}/>
        <Route path={`${window.ctx || ''}/support`} component={SupportNew}/>
      </Switch>
      </BrowserRouter>
    </div>
  </IntlProvider>
)
