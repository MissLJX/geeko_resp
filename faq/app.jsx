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

// window.accessToken = 'f4e768ec-b61b-4afe-ba4e-8fb87d52a040'

let root = document.getElementById('root')

if(!root){
  root = document.createElement('div')
  document.body.appendChild(root)
}

ReactDOM.render(<App/>, root)
