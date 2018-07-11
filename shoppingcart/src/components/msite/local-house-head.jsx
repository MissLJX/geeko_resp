import React from 'react'
import styled from 'styled-components'
import CheckBox from '../checkbox.jsx'
import Ellipsis from '../ellipsis.jsx'

const StyledHead = styled.div`
	height: 50px;
	padding: 0 10px;
	img,span{
		vertical-align: middle;
	}
	img{
		margin-right: 10px;
		height: 25px;
	}

	& > div{
		height: 100%;
	    border-bottom: 1px solid #e5e5e5;

	    & > div:first-child{
	      width: 30px;
	    }

	    & > div:nth-child(2){
	      width: 40px;
	    }

	    & > div:last-child{
	      text-align: right;
	    }
	}
`

const LocalHouseHead = ({icon, title, selected, groupClick}) => <StyledHead >
  <div className="x-table __vm x-fw x-fh __fixed">
  	<div className="x-cell">
      <CheckBox onClick={() => { groupClick(!selected) }} className={selected ? 'selected' : ''}/>
    </div>
    <div className="x-cell">
		All
    </div>
  	<div className="x-cell __right">
  		<Ellipsis>
  			<img src={icon}/>
        	<span>{title}</span>
  		</Ellipsis>
    </div>
  </div>
</StyledHead>

export default LocalHouseHead
