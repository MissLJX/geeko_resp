import React from 'react'
import {get} from '../api'

export default (WrappedShoppingCart) => {
  return class extends React.Component {
  	constructor (props) {
      super(props)
      this.state = {
        shoppingcart: null
      }
    }

    componentWillMount () {
    	get().then({result} => {

    	})
    }

    render(){
    	return <WrappedShoppingCart shoppingcart={this.state.shoppingcart} {...this.props}/>
    }
  }
}
