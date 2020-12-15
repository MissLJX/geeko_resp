import React from 'react'
import styled from 'styled-components'
import Product from './product.jsx'

const PRODUCTS = styled.ul`
	padding: 5px;
	& > li{
		float: left;
		width: 50%;
		padding: 5px;
	}
	&::after{
		display: block;
		content: '';
		clear: both;
	}
`

export default ({products, type}) => {
  return <PRODUCTS>{
    products.map(product => (
      <li key={product.id}>
      	<Product product={product} type={type}/>
      </li>
    ))
  }</PRODUCTS>
}
