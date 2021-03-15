import React from 'react'
import styled from 'styled-components'
import CheckBox from '../checkbox.jsx'
import Ellipsis from '../ellipsis.jsx'
import {injectIntl} from 'react-intl'

const StyledHead = styled.div`
	padding: 12px 10px 0 10px;
	.__title{
		font-size: 16px;
	}

	.__del{
		text-decoration: underline;
		font-size: 12px;
		color: #666;
	}

	& > div{
	    & > div:last-child{
	      text-align: right;
	    }
	}
`
const IvalidItemsHead = ({clearall, intl, isEditingItem}) => <StyledHead >
  <div className="x-table __vm x-fw x-fh __fixed">
    <div className="x-cell">
      <span className="__title">{intl.formatMessage({id: 'ivalid_tems'})}</span>
    </div>
  	<div className="x-cell __right">
		  {!isEditingItem && <span className="__del" onClick={clearall}>{intl.formatMessage({id: 'clear_all'})}</span>}
  		
    </div>
  </div>
</StyledHead>

export default injectIntl(IvalidItemsHead)
