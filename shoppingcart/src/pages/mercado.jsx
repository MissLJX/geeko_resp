import React from 'react'
import styled from 'styled-components'
import FullFixed from '../components/msite/full-fixed.jsx'
import MercadoBinding from '../components/mercado-binding.jsx'
import { connect } from 'react-redux'
import {getMercadoCards} from '../store/actions.js'

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GETMERCADOCARDS: () => {
      dispatch(getMercadoCards())
    }
  }
}

const Mercado = class extends React.Component {
  constructor (props) {
  	super(props)
  	this.close = this.close.bind(this)
  }

  close (evt) {
  	evt.stopPropagation()
    this.props.history.goBack()
  }

  addcardback () {
    this.props.GETMERCADOCARDS()
    this.props.history.goBack()
  }

  render () {
    const state = this.props.location.state
    const exsiting = state ? state.exsiting : false

  	return <FullFixed onClose={this.close} title="Credit Card">
  		<MercadoBinding email={this.props.me ? this.props.me.email : ''} addcardback={this.addcardback.bind(this)} exsiting={exsiting}/>
  	</FullFixed>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Mercado)
