import React from 'react'
import CheckBox from '../checkbox.jsx'
import LinkImage from '../link-image.jsx'
import Ellipsis from '../ellipsis.jsx'
import { Grey, Red } from '../text.jsx'
import { strconcat } from '../../utils/utils.js'
import Money from '../money.jsx'
import Quantity from '../quantity.jsx'
import Icon from '../icon.jsx'
import styled from 'styled-components'
import { CountDown } from './countdowns.jsx'
import { producturl } from '../../utils/utils.js'
import { injectIntl } from 'react-intl'
import ReactTouchEvents from 'react-touch-events'

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

  display: flex;
  align-items: stretch;

	& > div{
		&:first-child{
			width: 30px;
      flex-shrink: 0;
      align-self: center;
		}

		&:nth-child(2){
			width: 96px;
      flex-shrink: 0;
		}

		&:last-child{
			padding-left: 12px;
      flex-grow: 1;
		}
	}

  @media (max-width: 370px) {
    & > div{
      &:nth-child(2){
        width: 65px;
      }
    }
  }
`

const CanShipTip = styled.div`
  color: #e64545;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
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
  background-color: #efefef;
  overflow: hidden;
  &::after{
    content: '';
    display:block;
    margin-top: 125%;
  }
  .__image{
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }
`

const LIMITTIP = styled.span`
  height: 24px;
  line-height: 22px;
  background-color: #fef8f8;
  border: solid 1px #e64545;
  position: relative;
  padding-left: 29px;
  display: inline-block;
  color: #e64545;
  padding-right: 20px;
  margin-bottom: 15px;

  .__label{
    text-transform: uppercase;
    margin-left: 20px;
    vertical-align: middle;
  }

  .__icon{
    margin-left: 20px;
    font-size:14px;
  }

  .__time{
    margin-left: 10px;
    vertical-align: middle;
  }


  &::before{
    content: '\\e6bb';
    width: 29px;
    height: 22px;
    display: inline-block;
    position: absolute;
    left:0;
    top:0;
    background-color: #e5004f;
    font-family: iconfont;
    text-align: center;
    line-height: 22px;
    font-size: 15px;
    color: #fff;
  }
`
const SIZECOLOR = styled.span`
  height: 24px;
  background-color: #f6f6f6;
  border-radius: 12px;
  padding-left: 13px;
  padding-right: 28px;
  display: inline-block;
  line-height: 24px;
  font-size: 14px;
  position: relative;
  cursor: pointer;
  &::after{
    display: inline-block;
    position: absolute;
    right: 10px;
    content: '\\e692';
    font-family: iconfont;
    font-size: 12px;
    margin-top: 1px;
  }
`


const ITEMSWIPER = styled.div`
  overflow: hidden;
  display: flex;
  & > .__bd{
    width: 100%;
    flex-shrink:0;
  }
  & > .__bc{
    width: 65px;
    flex-shrink:0;
    background-color: #e32100;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-left: 10px solid #fff;
  }

  & > div{
    transition: transform 200ms;
  }
  &.opend{
    & > div{
      transform: translatex(-65px);
    }
  }
`


const ItemSwiper = class extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  swipHandle(evt, direction) {
    console.log(evt.changedTouches)
    console.log(direction)
    if (direction === 'left') {
      this.swiper.classList.add('opend')
    } else if (direction === 'right') {
      this.swiper.classList.remove('opend')
    }
  }



  render() {
    const { item, deleteHandle } = this.props
    return <ReactTouchEvents onSwipe={this.swipHandle.bind(this)}>
      <ITEMSWIPER innerRef={c => this.swiper = c}>
        <div className="__bd" >{this.props.children}</div>
        <div className="__bc" onClick={evt => { deleteHandle(item) }}>
          <span style={{ margin: 'auto' }}>Delete</span>
        </div>
      </ITEMSWIPER>

    </ReactTouchEvents>
  }
}

const SizeColor = props => {
  const { size, color } = props
  const sizeColor = [color, size].filter(s => !!s).join(' / ')
  return <SIZECOLOR {...props}>{sizeColor}</SIZECOLOR>
}

const Item = class extends React.Component {
  constructor(props) {
    super(props)
    this.itemEdit = this.itemEdit.bind(this)
  }

  itemEdit(item) {
    this.props.itemEdit(item)
  }

  itemDelete(item) {
    this.props.itemDelete(item)
  }

  render() {
    const props = this.props
    const { intl, serverTime } = props
    return (
      <React.Fragment>

        {
          !props.ivalidItem && props.item.endLimitedTimePurchaseTime && props.item.limitedTimePurchasePromotionPrice && <div style={{ paddingLeft: 30 }}>
            <LIMITTIP>
              <span className="__label">{intl.formatMessage({ id: 'limited_time' })}</span>
              <Icon style={{ fontSize: 14, marginLeft: 20, verticalAlign: 'middle' }}>&#xe655;</Icon>
              <CountDown className="__time" offset={props.item.endLimitedTimePurchaseTime - serverTime} />
            </LIMITTIP>
          </div>
        }

        <ItemSwiper item={props.item} deleteHandle={this.itemDelete.bind(this)}>
          <ItemWrapper className={`${props.disabledFunc(props.item) ? 'disabled' : ''}`}>
            <div>
              {!props.ivalidItem && <CheckBox className={props.item.selected ? 'selected' : ''} onClick={(evt) => { props.itemSelect(props.item.variantId, !props.item.selected) }} />}
            </div>
            <div>
              <ImageContainer>
                <a style={{ display: 'block' }} href={producturl({ id: props.item.productId, name: props.item.productName, parentSku: props.item.parentSku })} >
                  <img className="__image" src={props.item.imageUrl} />
                </a>
              </ImageContainer>

            </div>




            <div className="x-flex __column __between">

              <div>
                <Ellipsis style={{ maxWidth: 198 }}><Grey>{props.item.productName}</Grey></Ellipsis>


                <div style={{ height: '30px', paddingTop: 10 }}>

                  {
                    props.item.itemPrice.amount - props.item.realPrice.amount > 0 ? <Red style={{ fontSize: '18px', fontFamily: 'SlatePro-Medium' }}>
                      <Money money={props.item.realPrice} />
                    </Red> : <span style={{ fontSize: '18px', fontFamily: 'SlatePro-Medium' }}><Money money={props.item.realPrice} /></span>
                  }


                </div>
              </div>


              {!props.item.isDomesticDeliveryEnabled && props.localitem ? <div>
                <CanShipTip onClick={() => { props.overseasHandle(props.item.variantId) }} className="__right">Can ship from overseas?</CanShipTip>
              </div> : <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <SizeColor onClick={(evt) => { this.itemEdit(props.item) }} size={props.item.size} color={props.item.color} />
                  {!props.ivalidItem ? <Quantity quantity={props.item.quantity} onChange={(quantity, isRemove) => { props.quantityChange(props.item.variantId, quantity, isRemove) }} /> : <Grey>{intl.formatMessage({ id: 'out_of_stock' })}</Grey>}
                </div>}


            </div>


          </ItemWrapper>
        </ItemSwiper>






      </React.Fragment>
    )
  }
}

export default injectIntl(Item)
