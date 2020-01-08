import React from 'react'
import styled from 'styled-components'
import Blocker from './size-color-blocker.jsx'

const Blockers = styled.ol`
	& > li{
		margin-right: 10px;
		margin-bottom: 10px;
		display: inline-block;
	}
`

const SizeColorBlockers = class extends React.Component {
	constructor (props) {
		super(props)
	}

	isDisabled (item) {
		return this.props.isDisabled(item)
	}

	render () {
		const {items, onClick, selectedItem} = this.props

		return <Blockers>
			{
				items && items.map(item => (
					<li key={item}>
						 <Blocker disabled={this.isDisabled(item)} selected={item === selectedItem} onClick={onClick} value={item} label={item}/>
					</li>
				))
			}
		</Blockers>
	}
}

export default SizeColorBlockers
