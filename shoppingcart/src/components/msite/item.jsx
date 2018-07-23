import React from 'react'
import CheckBox from '../checkbox.jsx'
import LinkImage from '../link-image.jsx'
import Ellipsis from '../ellipsis.jsx'
import {Grey, Red} from '../text.jsx'
import {strconcat} from '../../utils/utils.js'
import Money from '../money.jsx'
import Quantity from '../quantity.jsx'
import Icon from '../icon.jsx'
import styled from 'styled-components'
import {CountDown} from './countdowns.jsx'
import {producturl} from '../../utils/utils.js'
import {injectIntl} from 'react-intl'

const styleLimitedTip = {
  width: 90,
  height: 20,
  borderRadius: 1,
  fontSize: 12,
  backgroundColor: '#e70646',
  display: 'inline-block',
  color: '#fff',
  textAlign: 'center',
  lineHeight: '20px',
  marginTop: '5px'
}

const ItemWrapper = styled.div`

  &.disabled{
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
    filter: gray;
  }
	& > div{
		&:first-child{
			width: 30px;
		}

		&:nth-child(2){
			width: 105px;
		}

		&:last-child{
			padding-left: 12px;
		}
	}
`

const CanShipTip = styled.div`
  background-color: #ededed;
  color: #666;
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
  text-align: center;
  display: inline-block;
`

const Clear = styled.div`
  &::after{
    content: '';
    display: block;
    clear: both;
  }

  & .__right{
    float: right;
  }

  & .__left{
    float: left;
  }
`

const ImageContainer = styled.div`
  position: relative;
  & > .countdown{
    position:absolute;
    bottom: 0;
    width: 100%;
    display: inline-block;
    padding: 2px 0;
    text-align: center;
    background-color: rgba(229,0,79,.8);
    color: #fff;
    left: 0;

    & > i{
      font-size: 14px;
      color: #fff;
      margin-right: 5px;
    }
  }
`

const Item = class extends React.Component {
  constructor (props) {
    super(props)
    this.itemEdit = this.itemEdit.bind(this)
  }

  itemEdit (item) {
    this.props.itemEdit(item)
  }

  itemDelete (item) {
    this.props.itemDelete(item)
  }

  render () {
    const props = this.props
    const {intl} = props
    return (
      <React.Fragment>
        <ItemWrapper className={`x-table __vm __fixed x-fw ${props.disabledFunc(props.item) ? 'disabled' : ''}`}>
          <div className="x-cell">
            {!props.ivalidItem && <CheckBox className={props.item.selected ? 'selected' : ''} onClick={(evt) => { props.itemSelect(props.item.variantId, !props.item.selected) }}/>}
          </div>
          <div className="x-cell">
            <ImageContainer>
              <LinkImage href={producturl({id: props.item.productId, name: props.item.productName})} src={props.item.imageUrl}/>

              {
                !props.ivalidItem && props.item.endLimitedTimePurchaseTime && props.item.limitedTimePurchasePromotionPrice && <span className="countdown">
                  <i className="iconfont">&#xe655;</i><CountDown offset={props.item.endLimitedTimePurchaseTime - props.serverTime}/>
                </span>
              }

            </ImageContainer>

          </div>
          <div className="x-cell" >

            <div style={{height: '140px'}} className="x-flex __column __between">
              <div style={{height: '50px'}}>
                <Ellipsis>{props.item.productName}</Ellipsis>
                {
                  !props.ivalidItem && props.item.endLimitedTimePurchaseTime && props.item.limitedTimePurchasePromotionPrice && <div>
                    <span style={styleLimitedTip}>Limited time</span>
                  </div>
                }
              </div>
              <div>
                <Grey>{strconcat(props.item.color, props.item.size)}</Grey>
              </div>
              <div>
                <Red style={{fontSize: '17px'}}><Money money={props.item.realPrice} /></Red>
                {
                  props.item.itemPrice.amount - props.item.realPrice.amount > 0 && (
                    <span>
                      <del style={{marginLeft: '10px'}}><Grey style={{fontSize: '13px'}}><Money money={props.item.itemPrice} /> </Grey></del>
                      <span>{' '}</span>
                      <span style={{fontSize: '13px', marginLeft: '10px'}} dangerouslySetInnerHTML={{__html: props.item.discountDescription}} />
                    </span>
                  )
                }
              </div>
              <div>

                {!props.ivalidItem ? <Quantity quantity={props.item.quantity} onChange={(quantity) => { props.quantityChange(props.item.variantId, quantity) }}/> : <Grey>{intl.formatMessage({id: 'out_of_stock'})}</Grey>}

                <div style={{float: 'right'}}>
                  {!props.ivalidItem && <Icon style={{fontSize: 18, cursor: 'pointer'}} onClick={(evt) => { this.itemEdit(props.item) }}>&#xe62b;</Icon>}
                  <Icon style={{marginLeft: '15px', fontSize: 18, cursor: 'pointer'}} onClick={(evt) => { this.itemDelete(props.item) }}>&#xe629;</Icon>
                </div>
              </div>
            </div>

          </div>
        </ItemWrapper>
        {!props.item.isDomesticDeliveryEnabled && props.localitem && <Clear style={{marginTop: 10}}>
          <CanShipTip onClick={() => { props.overseasHandle(props.item.variantId) }} className="__right">Can Ships From Overseas Warehouse</CanShipTip>
        </Clear>}

      </React.Fragment>
    )
  }
}

export default injectIntl(Item)
