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

const styleLimitedTip = {
  width: 85.5,
  height: 15,
  borderRadius: 1,
  backgroundColor: '#e70646'
}

const ItemWrapper = styled.div`
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

const Item = class extends React.Component {
  constructor (props) {
    super(props)
    this.itemEdit = this.itemEdit.bind(this)
  }

  itemEdit (item) {
    this.props.itemEdit(item)
  }

  render () {
    const props = this.props
    return (
      <ItemWrapper className="x-table __vm __fixed x-fw">
        <div className="x-cell">
          <CheckBox className={props.item.selected ? 'selected' : ''} onClick={(evt) => { props.itemSelect(props.item.variantId, !props.item.selected) }}/>
        </div>
        <div className="x-cell">
          <LinkImage href="#" src={props.item.imageUrl}/>
        </div>
        <div className="x-cell" >

          <div style={{height: '140px'}} className="x-flex __column __between">
            <div style={{height: '50px'}}>
              <Ellipsis>{props.item.productName}</Ellipsis>
              {props.item.endLimitedTimePurchaseTime && props.item.limitedTimePurchasePromotionPrice && <div>
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
                    <del style={{marginLeft: '10px'}}><Grey style={{fontSize: '13px'}}><Money money={props.item.itemPrice} /></Grey></del>
                    <span style={{fontSize: '13px', marginLeft: '10px'}} dangerouslySetInnerHTML={{__html: props.item.discountDescription}} />
                  </span>
                )
              }
            </div>
            <div>

              <Quantity quantity={props.item.quantity} onChange={(quantity) => { props.quantityChange(props.item.variantId, quantity) }}/>

              <div style={{float: 'right'}}>
                <Icon style={{fontSize: 18}} onClick={(evt) => { this.itemEdit(props.item) }}>&#xe62b;</Icon>
                <Icon style={{marginLeft: '15px', fontSize: 18}}>&#xe629;</Icon>
              </div>
            </div>
          </div>

        </div>
      </ItemWrapper>

    )
  }
}

export default Item
