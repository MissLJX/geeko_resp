import React from 'react'
import styled from 'styled-components'
import {Grey, Red, Green} from '../text.jsx'
import {injectIntl, FormattedMessage} from 'react-intl'
import Icon from '../icon.jsx'

const concatstr = (...strs) => {
  let filted = strs.filter(s => !!s)
  return filted.join(', ')
}

const getLabel = ({value, label}) => {
  return label || (value || '')
}

const Address = styled.address`
	width: 330px;
  height: 168px;
  position: relative;
  border: solid 1px #e6e6e6;
  padding: 15px;
  overflow:hidden;
  font-style: normal;
`

const DashedLine = styled.div`
    background: linear-gradient(to right, #dd747d 35%,transparent 25%,transparent 50%,#626e94 50%,#626e94 85%,transparent 75%);
    background-size: 56px 1px;
    height: 4px;  
    transform:skew(20deg,0);
    position: absolute;
    width: 100%;
    bottom:0;
    left:0;
`

const EditBottom = styled.div`
  position: absolute;
  bottom: 0;
  left:0;
  width: 100%;
  padding: 15px;

`

const LABELICON = styled.span`
  color: #666;
  cursor: pointer;
  &:hover{
    color: #cacaca;
  }
  & > span{
    vertical-align: middle;
    margin-left: 4px;
    &:first-child{
      margin-left: 0;
    }
  }
`

const _address = ({address, intl, onEdit}) => <Address>
  <div style={{maxHeight: 115, overflow: 'hidden'}}>
    <div>
      <strong>{address.name}</strong>
      <Grey>({address.phoneNumber})</Grey>
    </div>
    <div style={{marginTop: 15, lineHeight: '20px'}}>
      <Grey>{concatstr(address.streetAddress1, address.unit)}</Grey>
    </div>
    <div style={{marginTop: 6, lineHeight: '20px'}}>
      <Grey>{concatstr(address.zipCode, address.city, getLabel(address.state), getLabel(address.country))}</Grey>
    </div>
  </div>
  <EditBottom>
    {
      address.isDefaultAddress && <Green>{intl.formatMessage({id: 'default_address'})}</Green>
    }

    <LABELICON style={{float: 'right'}} onClick={ (e) => { e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); onEdit(address) }}>
      <Icon>&#xe62b;</Icon>
      <span><FormattedMessage id="edit"/></span>
    </LABELICON>
  </EditBottom>

  {
    address.isDefaultAddress && <DashedLine/>
  }

</Address>

const ORDERADDRESS = styled.div`
  position: relative;
  border: solid 1px #e6e6e6;
  & > .__bd{
    padding: 15px;
  }
`

const _order_address = ({address, intl, onEdit}) => <ORDERADDRESS>
  <div className="__bd">
    <div className="x-table __vt">
      <div className="x-cell">
        <span style={{fontSize: 16}}>{intl.formatMessage({id: 'shipping_address'})}</span>
      </div>
      <div className="x-cell" style={{paddingLeft: 25}}>
        <div>
          <strong style={{fontFamily: 'HelveticaNeue-Medium'}}>{address.name}</strong>
          <Grey>({address.phoneNumber})</Grey>
        </div>
        <div style={{lineHeight: '20px', marginTop: 4}}>
          <Grey>{concatstr(address.streetAddress1, address.unit)}</Grey> <Grey>{concatstr(address.zipCode, address.city, getLabel(address.state), getLabel(address.country))}</Grey>
        </div>
      </div>
    </div>

    {
      onEdit && <LABELICON onClick={ (e) => { e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); onEdit(address) }} style={{position: 'absolute', top: 15, right: 15}}>
        <Icon>&#xe62b;</Icon>
        <span><FormattedMessage id="edit"/></span>
      </LABELICON>
    }
  </div>
  <DashedLine/>
</ORDERADDRESS>

export const OrderAddress = injectIntl(_order_address)

export default injectIntl(_address)
