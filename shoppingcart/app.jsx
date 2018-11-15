import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootRducer from './src/store/reducers.js'
import {fetchAll} from './src/store/actions.js'

import { Provider } from 'react-redux'

// import Index from './src/index.jsx'

import Index from './src/pc-index.jsx'
// import Index from './src/pc-order-confirm.jsx'
// import Index from './src/order-confirm.jsx'

import './src/css/reset.css'
import './src/css/style.css'

const store = createStore(rootRducer, applyMiddleware(thunk))

class App extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Provider store={store}>
     	  <BrowserRouter>
     		 <Index/>
     	  </BrowserRouter>
      </Provider>
    )
  }
}

const root = document.createElement('div')
document.body.appendChild(root)

ReactDOM.render(<App/>, root)
