import React, {Component, Fragment} from 'react'
import styled from 'styled-components'

import CheckBox from '../checkbox.jsx'
import LinkImage from '../link-image.jsx'
import Ellipsis from '../ellipsis.jsx'
import {Grey, Red} from '../text.jsx'
import Money from '../money.jsx'
import Quantity from '../quantity.jsx'
import Icon from '../icon.jsx'
import {producturl, quantityMoney, strconcat} from '../../utils/utils.js'
import {injectIntl, FormattedMessage} from 'react-intl'
import { Btn } from '../msite/buttons.jsx'
import {CountDown} from '../msite/countdowns.jsx'

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
          margin-top: 30px;
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

const Item = class extends Component {
  constructor (props) {
    super(props)
  }

  render () {
  	const {item, intl} = this.props

  	return <ITEMCONTAINER>
      <div style={{position: 'relative'}} >
    		<ITEM className={`x-table __vm __fixed x-fw`}>
          <div className="x-cell">

    			</div>
    			<div className="x-cell">
            <div style={{width: 96}}>
              <LinkImage href={producturl({id: item.productId, name: item.productName, parentSku: item.sku})} src={item.productImageUrl}/>
            </div>
    			</div>
    			<div className="x-cell" style={{verticalAlign: 'top'}}>
    				<div>
    					<Ellipsis>{item.productName}</Ellipsis>
    				</div>
    				<div>
            	<Grey>{strconcat(item.color, item.size)}</Grey>
          	</div>
    			</div>
    			<div className="x-cell __center">
            <Grey>{item.quantity}</Grey>
    			</div>
    			<div className="x-cell __center">
    				<div><Red><Money money={item.price} /></Red></div>
  		          {
  		            item.msrp && item.msrp.amount > 0 && (
                    	<Fragment>
  	                    <div>
  	                      <del><Grey style={{fontSize: '13px'}}><Money money={item.msrp} /> </Grey></del>
  	                    </div>
  		                </Fragment>
  		            )
  		          }
    			</div>
    			<div className="x-cell __center">
    				<Money money={quantityMoney(item.price, item.quantity)}/>
    			</div>
    		</ITEM>
      </div>

  	</ITEMCONTAINER>
  }
}

export default injectIntl(Item)
