import React from 'react'
import ReactDOM from 'react-dom'
import {Switch, Route} from 'react-router-dom'
import Support from './support.jsx'
import Question from './question.jsx'
import SearchResult from './search-result.jsx'
import Tickets from './tickets.jsx'
import Ticket from './ticket.jsx'
import Orders from './orders.jsx'
import OnlineHelp from './onlinehelpframe.jsx'
import Rate from './rate.jsx'

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

const lang = (window.lang || 'en').substring(0, 2)

messages['en'] = en_L
messages['zh'] = zh_L

messages['de'] = de_L
messages['fr'] = fr_L

messages['es'] = es_L
messages['pt'] = pt_L

export default () => (

  <IntlProvider locale={lang} messages={messages[lang]}>
    <div>
      <Switch>
        <Route path={`${window.ctx || ''}/support`} exact component={Support}/>
        <Route path={`${window.ctx || ''}/support/online-help`} exact component={OnlineHelp}/>
        <Route path={`${window.ctx || ''}/support/search`} component={SearchResult}/>
        <Route path={`${window.ctx || ''}/support/question/:id`} component={Question}/>
        <Route path={`${window.ctx || ''}/support/ticket/add`} component={Ticket}/>
        <Route path={`${window.ctx || ''}/support/ticket/:id`} component={Ticket}/>
        <Route path={`${window.ctx || ''}/support/ticket`} component={Tickets}/>
        <Route path={`${window.ctx || ''}/support/orders`} component={Orders}/>
        <Route path={`${window.ctx || ''}/support/rate/:id`} component={Rate}/>
      </Switch>
    </div>
  </IntlProvider>
)
