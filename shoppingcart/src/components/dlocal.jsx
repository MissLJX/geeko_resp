import React from 'react'
import styled from 'styled-components'

const DLocal = class extends React.Component {
  constructor (props) {
  	super(props)
  }

  componentWillMount () {}

  formRef (c) {
  	this.form = c
  	console.log(this.panHolder)
  }

  render () {
  	return <div>
  		<form ref={this.formRef.bind(this)}>
  			<div ref={ c => this.panHolder = c}>

  			</div>
  			<div ref={ c => this.expiratioHolder = c}></div>
  			<div ref={ c => this.cvvHolder = c}></div>
  		</form>
  	</div>
  }
}
