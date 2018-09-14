import React from 'react'
import styled from 'styled-components'
import CheckBox from '../checkbox.jsx'
import Ellipsis from '../ellipsis.jsx'
import {Small, Red} from '../text.jsx'
import Money from '../money.jsx'

const StyledHead = styled.div`
	height: 50px;
	padding: 0 10px;
	img,span{
		vertical-align: middle;
	}
	img{
		margin-left: 5px;
		height: 25px;
	}

	& > div{
		height: 100%;
	    border-bottom: 1px solid #e5e5e5;

	    & > div:first-child{
	      width: 30px;
	    }

	    & > div:nth-child(2){
	      width: 80px;
	    }

	    & > div:last-child{
	      text-align: right;
	    }
	}
`

const LocalHouseHead = ({icon, title, selected, groupClick, shippingPrice, count}) => <StyledHead >
  <div className="x-table __vm x-fw x-fh __fixed">
  	<div className="x-cell">
      <CheckBox onClick={() => { groupClick(!selected) }} className={selected ? 'selected' : ''}/>
    </div>
    <div className="x-cell">
      <span>All</span> <span>({count})</span>
    </div>
  	<div className="x-cell __right">
  		<Ellipsis>
        	<span>{title}</span>
  		</Ellipsis>
  		{shippingPrice && shippingPrice.amount > 0 ? <span>Shipping Price:<Money money={shippingPrice}/></span> : <Small><Red>FREE SHIPPING</Red></Small>}
    </div>
  </div>
</StyledHead>

export default LocalHouseHead
