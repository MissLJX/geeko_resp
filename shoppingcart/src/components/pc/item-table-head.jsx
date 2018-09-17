import React from 'react'
import styled from 'styled-components'

import {injectIntl} from 'react-intl'
import {Grey} from '../text.jsx'

const StyledHead = styled.div`
	height: 50px;
	border-bottom: 1px dashed #e5e5e5;
	& > div{
		&:nth-child(1){
			width: 28px;
		}
		&:nth-child(2){
			width: 106px;
		}
		&:nth-child(3){
			width: 220px;
		}
		&:nth-child(4){
			width: 120px;
		}
		&:nth-child(5){
			width: 150px;
		}
		&:nth-child(6){
			
		}
	}
`

const Head = ({intl}) => <StyledHead className="x-table __fixed __vm x-fw x-fh">
  <div className="x-cell __center"></div>
  <div className="x-cell __center"></div>
  <div className="x-cell __center">
    <Grey>{intl.formatMessage({id: 'item'})}</Grey>
  </div>
  <div className="x-cell __center">
    <Grey>{intl.formatMessage({id: 'qty'})}</Grey>
  </div>
  <div className="x-cell __center">
    <Grey>{intl.formatMessage({id: 'unit_price'})}</Grey>
  </div>
  <div className="x-cell __center">
    <Grey>{intl.formatMessage({id: 'sum'})}</Grey>
  </div>
</StyledHead>

export default injectIntl(Head)
