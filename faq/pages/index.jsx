import React from 'react'
import ReactDOM from 'react-dom'
import {Switch, Route} from 'react-router-dom'
import Support from './support.jsx'
import Question from './question.jsx'
import SearchResult from './search-result.jsx'
import Tickets from './tickets.jsx'
import Ticket from './ticket.jsx'
import Orders from './orders.jsx'

export default () => (
  <div>
    <Switch>
      <Route path="/" exact component={Support}/>
      <Route path="/search" component={SearchResult}/>
      <Route path="/question/:id" component={Question}/>
      <Route path="/tickets" component={Tickets}/>
      <Route path="/ticket/add" component={Ticket}/>
      <Route path="/ticket/:id" component={Ticket}/>
      <Route path="/orders" component={Orders}/>
    </Switch>
  </div>
)
