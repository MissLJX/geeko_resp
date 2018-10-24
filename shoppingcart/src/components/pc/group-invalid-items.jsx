import React from 'react'
import styled from 'styled-components'
import Items from './items.jsx'
import CheckBox from '../checkbox.jsx'
import {Grey} from '../text.jsx'
import Icon from '../icon.jsx'
import {injectIntl} from 'react-intl'

const SelectLine = styled.div`
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 12px;

  .__clearAll{
    &:hover{
      color: #cacaca;
    }
  }
`

const GroupInvalidItems = class extends React.Component {
  constructor (props) {
    super(props)
  }

  disabledFunc (item) {
    return true
  }

  render () {
    const { intl } = this.props

  	return <div style={this.props.style}>
      <SelectLine>
        <div className="x-table __vm x-fw">
          <div className="x-cell">
            <span style={{marginLeft: 5, verticalAlign: 'middle', fontSize: 16}}>{intl.formatMessage({id: 'ivalid_tems'})}</span>
          </div>
          <div className="x-cell __right">
            <span className="__clearAll" style={{cursor: 'pointer'}} onClick={this.props.clearall}>{intl.formatMessage({id: 'clear_all'})}</span>
          </div>
        </div>
      </SelectLine>

      <Items serverTime={this.props.serverTime}
        disabledFunc={this.disabledFunc}
        quantityChange={ () => false }
        itemEdit={ () => false}
        itemDelete={this.props.itemDelete}
        invalidItem = {true}
        items={this.props.items}/>
    </div>
  }
}

export default injectIntl(GroupInvalidItems)
