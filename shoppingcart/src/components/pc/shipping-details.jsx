import React from 'react'
import styled from 'styled-components'
import Address from './address.jsx'

const SHIPPINGS = styled.ul`
	&::after{
		content: '';
		display: block;
		clear: both;
	}

	max-height: 300px;
  overflow: auto;

	& > li{
		float: left;
		&:nth-child(2n){
			margin-left: 20px;
		}

		cursor: pointer;

		margin-top: 20px;

		&:hover{
			box-shadow: 0px 0px 8px rgba(0,0,0,.1);
		}
	}
`

export default ({shippings, onEdit, onSelect}) => <SHIPPINGS>
  {
    shippings && shippings.length > 0 && shippings.map(shipping => <li onClick={ () => onSelect(shipping) } key={ shipping.id }><Address onEdit={ onEdit } address={shipping}/></li>)
  }
</SHIPPINGS>
