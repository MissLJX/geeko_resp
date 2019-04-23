import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Loadable from 'react-loadable'

import Loading from './components/loading.jsx'

import './reset.css'
import './App.css'


import Header from './components/header.jsx'
import Footer from './components/footer.jsx'


const Home = Loadable({
	loader: () => import(/* webpackChunkName: "page--home" */ './pages/home.jsx'),
	loading: Loading
})

const Error404 = Loadable({
  loader: () => import(/* webpackChunkName: "page--404" */ './pages/404.jsx'),
	loading: Loading
})

// const About = Loadable({
//   loader: () => import(/* webpackChunkName: "page--about" */ './pages/about.jsx'),
// 	loading: Loading
// })

const Join = Loadable({
  loader: () => import(/* webpackChunkName: "page--join" */ './pages/join.jsx'),
	loading: Loading
})

const Contact = Loadable({
  loader: () => import(/* webpackChunkName: "page--contact" */ './pages/contact.jsx'),
	loading: Loading
})

const Service = Loadable({
  loader: () => import(/* webpackChunkName: "page--service" */ './pages/service.jsx'),
	loading: Loading
})

const Supplier = Loadable({
  loader: () => import(/* webpackChunkName: "page--supplier" */ './pages/supplier.jsx'),
	loading: Loading
})

const JoinDetail = Loadable({
  loader: () => import(/* webpackChunkName: "page--joindetail" */ './pages/join-detail.jsx'),
	loading: Loading
})



class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <div style={{minHeight: '100vh'}}>
          <Switch>
            <Route exact path="/" component={Home} />
            {/* <Route path="/about" component={About} /> */}
            <Route path="/join/:detail" component={JoinDetail}/>
            <Route path="/join" component={Join} />
            <Route path="/service" component={Service} />
            <Route path="/supplier" component={Supplier} />
            <Route path="/contact" component={Contact} />
            
            <Route component={Error404} />
          </Switch>
        </div>
        <Footer/>
    </div>
    );
  }
}

export default App
