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


let root = document.getElementById('root')

if(!root){
  root = document.createElement('div')
  document.body.appendChild(root)
}

ReactDOM.render(<App/>, root)
