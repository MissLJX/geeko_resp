import React from 'react'
import styled from 'styled-components'
import FullFixed from '../components/msite/full-fixed.jsx'
import { connect } from 'react-redux'
import {__route_root__} from '../utils/utils.js'
import { Redirect } from 'react-router-dom'
import { payDLocal } from '../api'
import {goOrder} from '../utils/common-pay.js'

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

const IFrame = styled.iframe`
	-webkit-overflow-scrolling: touch;
	height:100%;
	width:100%;
  padding-left:20px;
  padding-right:20px;
`

const DLocal = class extends React.Component {
  constructor (props) {
    super(props)
    this.close = this.close.bind(this)
  }

  componentWillMount () {
  	window.dLocalPay = (token, errBack) => {
      this.payDLocal(token).catch(({result}) => errBack(result))
    }
  }

  payDLocal (token) {
    return payDLocal({payMethod: this.props.payMethod, token}).then(goOrder)
  }

  close (evt) {
  	evt.preventDefault()
    this.props.history.replace(`${window.ctx || ''}${__route_root__}/`)
  }

  render () {
  	return <FullFixed onClose={this.close} title="DLocal">
    		<IFrame src={`${window.ctx || 'http://localhost:8080/boutiquefeel'}/i/dlocal`} frameBorder="0" scrolling="auto" seamless/>
    </FullFixed>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DLocal)
