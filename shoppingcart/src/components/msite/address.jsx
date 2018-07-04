import React from 'react'
import styled from 'styled-components'

const concatstr = (...strs) => {
  let filted = strs.filter(s => !!s)
  return filted.join(', ')
}

const getLabel = ({value, label}) => {
  return label || (value || '')
}

const Address = styled.address`
	line-height: 22px;
`

export default ({address}) => <Address>
  <div>
    <strong>{address.name}</strong>
    <span>({address.phoneNumber})</span>
  </div>
  <div>
    <span>{concatstr(address.streetAddress1, address.unit)}</span>
  </div>
  <div>
    <span>{concatstr(address.zipCode, address.city, getLabel(address.state), getLabel(address.country))}</span>
  </div>
</Address>
