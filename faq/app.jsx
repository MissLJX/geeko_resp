import './css/base.css'
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import Index from './pages/index.jsx'

class App extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
		 	<BrowserRouter>
		 		<Index/>
         <div className="x-fw" style={{display:'none'}}></div>
		 	</BrowserRouter>
    )
  }
}

window.accessToken = '7ae739c7-572b-4d62-9f09-b8329954222a'

let root = document.getElementById('root')

if(!root){
  root = document.createElement('div')
  document.body.appendChild(root)
}

ReactDOM.render(<App/>, root)
