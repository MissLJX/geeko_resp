import React from 'react'
import ProductImage from '../base/product-image.jsx'
import {BLOCKIMAGE} from '../base/images.jsx'


import {productImageUrl} from '../../commons/utils'

const Product = class extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		const { product } = this.props
		return <figure>
			<ProductImage>
				<BLOCKIMAGE src={productImageUrl('medium', product.pcMainImage)}/>
			</ProductImage>
			<figcaption>
        
			</figcaption>
		</figure>
	}
}

export default Product