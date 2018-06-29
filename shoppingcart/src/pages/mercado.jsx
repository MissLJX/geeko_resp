import React from 'react'
import styled from 'styled-components'
import FullFixed from '../components/msite/full-fixed.jsx'
import MercadoBinding from '../components/mercado-binding.jsx'

const Mercado = class extends React.Component {
  constructor (props) {
  	super(props)
  	this.close = this.close.bind(this)
  }

  close (evt) {
  	evt.stopPropagation()
    this.props.history.goBack()
  }

  render () {
  	return <FullFixed onClose={this.close} title="Credit Card">
  		<MercadoBinding/>
  	</FullFixed>
  }
}

export default Mercado
