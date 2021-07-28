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
  font-style: normal;
  padding-bottom: 5px;
  padding-top: 7px;
`

const Name = styled.div`
  font-family: SlatePro-Medium;
  line-height: 16px;
`

export default ({address}) => <Address>
  <Name>
    <span>{address.name}</span>
    <span style={{fontFamily:'SlatePro', fontSize: 12}}>{'  '}({address.phoneNumber})</span>
  </Name>
  <div style={{marginTop:10, color: '#666', fontSize:13}}>
    <div>
      <span>{concatstr(address.streetAddress1, address.unit)}</span>
    </div>
    <div style={{marginTop:6}}>
      <span>{concatstr(address.zipCode, address.city, getLabel(address.state), getLabel(address.country))}</span>
    </div>
  </div>
  
</Address>
