import React, { Component } from 'react'
import { Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import './reset.css'
import './App.css'


import Header from './components/header.jsx'
import Footer from './components/footer.jsx'

import routes from './routes'






class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <div style={{minHeight: '100vh'}}>
          <Switch>
            {renderRoutes(routes)}
          </Switch>
        </div>
        <Footer/>
    </div>
    );
  }
}

export default App
