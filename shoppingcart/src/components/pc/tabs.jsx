import React from 'react'
import styled from 'styled-components'

const TABS = styled.div`
	border-bottom: solid 1px #e6e6e6;
	ol{
		text-align:center;
	}
	ol > li{
		display:inline-block;
		cursor: pointer;
		color: #666666;
		font-size: 18px;
		text-transform:uppercase;
		border-bottom: 2px solid transparent;
		padding-left:10px;
		padding-right:10px;
		padding-bottom: 10px;
		margin-left: 15px;
		&:first-child{
			margin-left:0;
		}
		&.active{
			color: #222;
			border-bottom: 2px solid #222222;
		}
	}
`

export default class Tabs extends React.Component {
  constructor (props) {
  	super(props)
  }

  clickHandle (evt, index) {
  	evt.preventDefault()
  	this.props.tabClick(index)
  }

  render () {
  	const { tabs, tabIndex } = this.props
  	return <TABS>
      <ol>
        {
          tabs && tabs.length > 0 && tabs.map((tab, index) => <li className={`${tabIndex === index ? 'active' : ''}`} key={index} onClick={ (evt) => { this.clickHandle(evt, index) }}>
            <span>{tab.title}</span>
          </li>)
        }
      </ol>
  	</TABS>
  }
}
