import React from 'react'

export default class AddressEditor extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
  	const { location } = this.props

  	console.log(location.state)

  	return <div>Address</div>
  }
}
