import React from 'react'
import styled from 'styled-components'
import {producturl, getlowerprice, gethigherprice} from '../../utils/utils.js'
import {Grey, Red, Small} from '../text.jsx'
import Money from '../money.jsx'

const PRODUCT = styled.figure`
	.__image{
		position: relative;
		& > img{
			display: block;
			position: absolute;
			width: 100%;
			left: 0;
			top: 0;
		}
		&::after{
			margin-top: 125%;
			content:'';
			display: block;
		}
		

		overflow:hidden;
		background-color: #e5e5e5;
	}

	figcaption{
		& > .__prices{
			margin-top: 5px;
		}
	}
`

export default ({product, type}) => {
	const lower = getlowerprice(product), higher = gethigherprice(product)
	return <PRODUCT>
  	<a className="amazon-event" EVENT="PRODUCT_LIST_CLICK" relatedId={product.id} type={type} href={producturl(product)} style={{textDecoration: 'none', color: '#222'}}>
	    <div className="__image">
	  		<img src={`https://dgzfssf1la12s.cloudfront.net/medium/${product.pcMainImage}`}/>
	  	</div>
	  	<figcaption>
	  		<div className="__prices">
	        <Red><Money style={{fontWeight: 'bold', fontSize: 16}} money={lower}/></Red>
	        {higher && <del style={{marginLeft: 10}}><Grey><Small ><Money money={higher}/></Small></Grey></del>}
				</div>
			</figcaption>
		</a>
	</PRODUCT>
}
