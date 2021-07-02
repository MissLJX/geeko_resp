import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

import CheckBox from '../checkbox.jsx'
import LinkImage from '../link-image.jsx'
import Ellipsis from '../ellipsis.jsx'
import { Grey, Red } from '../text.jsx'
import Money from '../money.jsx'
import Quantity from '../quantity.jsx'
import Icon from '../icon.jsx'
import { producturl, quantityMoney, strconcat } from '../../utils/utils.js'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Btn } from '../msite/buttons.jsx'
import { CountDown } from '../msite/countdowns.jsx'

const ITEMCONTAINER = styled.div`
  padding: 25px 0 15px 0;
  position: relative;
`

const LIMITTIP = styled.span`
  height: 24px;
  line-height: 22px;
  background-color: #fff9fc;
  border: solid 1px #f4a6c0;
  position: relative;
  padding-left: 29px;
  display: inline-block;
  color: #e5004f;
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

const ITEM = styled.div`
  &.disabled{
    background-color: #eee;
    padding: 24px 0;
  }

  &.invalid{
    filter: grayscale(100%);
    filter: gray;
  }


	& > div{
		&:nth-child(1){
			width: 28px;
		}
		&:nth-child(2){
			width: 106px;
		}
		&:nth-child(3){
			width: 220px;
      & > div{
       
        &:first-child{
          margin-top: 10px;
        }

        &:nth-child(2){
          margin-top: 5px;
        }

        &:last-child{
          margin-top:63px;
        }
      }
		}
		&:nth-child(4){
			width: 120px;
		}
		&:nth-child(5){
			width: 150px;
      & > div{
        margin-top: 10px;
        &:first-child{
          margin-top: 0;
        }
      }
		}
		&:nth-child(6){
			
		}
	}
`

const LABELICON = styled.span`
  color: #999;
  cursor: pointer;
  & > span{
    vertical-align: middle;
    margin-left: 4px;
    &:first-child{
      margin-left: 0;
    }
  }

  &.disabled{
    cursor: not-allowed;
  }

  &:active{
    color: #666;
  }
  &:hover{
    color: #666;
  }
`

const GIFT = styled.span`
    background-color: #fff0f0;
    border: solid 1px #e64545;
    display: inline-block;
    text-align: center;
    padding: 0 2px;
    font-size: 12px;
    color: #e64545;
    text-transform: uppercase;
    margin-right: 2px;
`

const Item = class extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { item, intl, serverTime, invalidItem, isGift } = this.props

		const isEabled = !this.props.disabledFunc(item)
		const isOverseas = !item.isDomesticDelivery

		const showLeftBtn = !isEabled && !isOverseas && !item.isDomesticDeliveryEnabled && item.inventory > 0
		const showShipFromBtn = !isEabled && !isOverseas && !item.isDomesticDeliveryEnabled && item.inventory < 1

		return <ITEMCONTAINER>
			<div style={{ paddingLeft: 28 }}>
				{
					isEabled && item.endLimitedTimePurchaseTime && item.limitedTimePurchasePromotionPrice && <LIMITTIP>
						<span className="__label">{intl.formatMessage({ id: 'limited_time' })}</span>
						<Icon style={{ fontSize: 14, marginLeft: 20, verticalAlign: 'middle' }}>&#xe655;</Icon>
						<CountDown className="__time" offset={item.endLimitedTimePurchaseTime - serverTime} />
					</LIMITTIP>
				}
			</div>
			<div style={{ position: 'relative' }} >
				{
					item.isUsedCombinatorialPromotion && this.props.combinatorialPromotionTitle && <div style={{
						position: 'absolute',
						top: 7,
						left: 357,
						fontSize: 12,
						textTransform: 'uppercase',
						border: '1px solid #e64545',
						height: 24,
						paddingLeft: 10,
						paddingRight: 10,
						lineHeight: '22px'
					}}>
						<Red>{this.props.combinatorialPromotionTitle}</Red>
					</div>
				}

				<ITEM className={`x-table __vm __fixed x-fw ${!isEabled && !invalidItem ? 'disabled' : ''} ${invalidItem ? 'invalid' : ''}`}>

					<div className="x-cell">
						{(isEabled && !isGift) && <CheckBox onClick={(evt) => { this.props.itemSelect(item.variantId, !item.selected) }} className={item.selected ? 'selected' : ''} />}
					</div>
					<div className="x-cell">
						<div style={{ width: 96 }}>
							<LinkImage href={producturl({ id: item.productId, name: item.productName, parentSku: item.parentSku })} src={item.imageUrl} />
						</div>
					</div>
					<div className="x-cell">
						<div>

							<Ellipsis>
								{
								isGift && <GIFT>Gift</GIFT>
								}
								{item.productName}</Ellipsis>
						</div>
						<div>
							<Grey>{strconcat(item.color, item.size)}</Grey>
						</div>

						<div>

							{
								isEabled && !invalidItem && <LABELICON style={{ marginRight: 20 }} onClick={(evt) => { this.props.itemEdit(item) }} className={`${invalidItem ? 'disabled' : ''}`}>
									<Icon>&#xe61f;</Icon>
									<span><FormattedMessage id="edit" /></span>
								</LABELICON>
							}

							<LABELICON onClick={(evt) => { this.props.itemDelete(item) }}>
								<Icon>&#xe629;</Icon>
								<span><FormattedMessage id="delete" /></span>
							</LABELICON>
						</div>
					</div>
					<div className="x-cell __center">

						{
							!isEabled || isGift ? <Grey>{item.quantity}</Grey> : <Quantity quantity={item.quantity} onChange={(quantity, isRemove) => { this.props.quantityChange(item.variantId, quantity, isRemove) }} />
						}
					</div>
					<div className="x-cell __center">

						{
							item.itemPrice.amount - item.realPrice.amount > 0 && (
								<Fragment>
									<div>
										<del><Grey style={{ fontSize: '13px' }}><Money money={item.itemPrice} /> </Grey></del>
									</div>

								</Fragment>
							)
						}
						<div><Red><Money money={item.realPrice} /></Red></div>

						{
							item.itemPrice.amount - item.realPrice.amount > 0 && <div>
								<span dangerouslySetInnerHTML={{ __html: item.discountDescription }} />
							</div>
						}

					</div>
					<div className="x-cell __center">
						<Money money={quantityMoney(item.realPrice, item.quantity)} />
					</div>
				</ITEM>
			</div>
			<div style={{ marginTop: 10, textAlign: 'right' }}>
				{
					showShipFromBtn && !invalidItem && <Btn style={{ padding: '8px 18px' }} onClick={() => { this.props.overseasHandle(this.props.item.variantId) }}> Ships From Overseas WareHouse</Btn>
				}

				{
					showLeftBtn && !invalidItem && <Btn style={{ padding: '8px 18px' }} onClick={() => { this.props.setQuantity(item.variantId, item.inventory) }}>
						<FormattedMessage
							id="only_left"
							values={{
								left: item.inventory
							}}
						/>
					</Btn>
				}

			</div>
		</ITEMCONTAINER>
	}
}

export default injectIntl(Item)
