import React from 'react'
import styled from 'styled-components'
import {producturl, getlowerprice, gethigherprice} from '../../utils/utils.js'
import Ellipsis from '../ellipsis.jsx'
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
		& > .__name{
			margin-top: 10px;
		}

		& > .__prices{
			margin-top: 5px;
		}
	}
`

const Product = ({product, type}) => {
	const lower = getlowerprice(product), higher = gethigherprice(product)
	return <div>
  	<a className="amazon-event" EVENT="PRODUCT_LIST_CLICK" relatedId={product.id} type={type} href={producturl(product)} style={{textDecoration: 'none', color: '#222'}}>
  	  <PRODUCT>
  	  	<div className="__image">
  	  		<img src={`https://image.geeko.ltd/medium/${product.pcMainImage}`}/>
  	  	</div>
  	  	<figcaption>
  			<Ellipsis className="__name">{product.name}</Ellipsis>
  			<div className="__prices">
  				<Money style={{fontWeight: 'bold'}} money={lower}/>
  				{higher && <del style={{marginLeft: 10}}><Grey><Small ><Money money={higher}/></Small></Grey></del>}
  			</div>
  	  	</figcaption>
			</PRODUCT>
  	</a>
	</div>
}

export default Product
