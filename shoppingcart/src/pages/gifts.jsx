import React from 'react'

import FullFixed from '../components/msite/full-fixed.jsx'
import { refreshCart } from '../store/actions.js'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { __route_root__ } from '../utils/utils.js'
import styled from 'styled-components'

import { getGifts, getGiftId, selectGift } from '../api'
import LinkImage from '../components/link-image'
import { producturl, gethigherprice, unitprice } from '../utils/utils'
import Loading from '../components/msite/refreshing.jsx'



const GIFTUL = styled.ul`
  padding: 10px;
  & > li{
    margin-top: 25px;
    &:first-child{
      margin-top: 0;
    }
  }
`

const ITEM = styled.div`
  display: table;
  table-layout: fixed;
  & > div{
    display: table-cell;
    vertical-align: middle;
    &:first-child{
      width: 100px;
      height: 125px;
      background-color: #efefef;
      overflow: hidden;
    }

    &:last-child{
      padding-left: 14px;
    }
  }

  .__gift{
    background-color: #fff0f0;
    border: solid 1px #e64545;
    height: 14px;
    line-height: 12px;
    font-size: 12px;
    color: #e64545;
    padding-left: 4px;
    padding-right: 4px;
    display: inline-block;
  }

  .__name{
    max-height: 28px;
    line-height: 14px;
    overflow: hidden;
    font-size: 12px;
  }

  .__price{
    color: #e64545;
    font-size: 18px;
  }

  .__del{
    font-size: 16px;
    color: #999;
  }

  .__select{
    width: 80px;
    height: 24px;
    border-radius: 2px;
    border: solid 1px #111111;
    text-align: center;
    line-height: 22px;
    cursor: pointer;
    display: inline-block;
    &.active{
      border-color: #e64545;
      background-color: #e64545;
      color: #fff;
    }
  }
`


const GifItem = ({ item, selectedId, itemSelect }) => {

  let price = gethigherprice(item)

  const isSelected = item.variants[0].id === selectedId



  if (!price)
    price = item.price

  return <ITEM>
    <div>

      <LinkImage href={producturl(item)} src={`https://image.geeko.ltd/medium/${item.pcMainImage}`} />
    </div>
    <div>
      <div>
        <div>
          <span className="__gift">
            GIFT
        </span>
        </div>
        <div className="__name" style={{marginTop: 4}}>
          {item.name}
        </div>

        <div style={{marginTop: 10, marginBottom: 16}}>
          <span className="__price">{item.price.unit}0</span>
          <del className="__del" style={{marginLeft:8}}>{unitprice(price)}</del>
        </div>

        <div>

          {
            isSelected ? <span className="__select active">Selected</span>: <span onClick={() => {itemSelect(item)}} className="__select">Select</span>
          }
          
        </div>

      </div>
    </div>
  </ITEM>
}


const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    REFRESHCART: (cart) => {
      return dispatch(refreshCart(cart))
    }
  }
}

const Gifts = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gifts: [],
      empty: false,
      loading: false
    }
  }

  componentDidMount() {
    this.setState({
      loading: true
    })
    getGiftId().then(data => data.result).then(collectionId => {
      getGifts(collectionId).then(data => data.result).then(gifts => {
        if (gifts && gifts.length > 0) {
          this.setState({
            gifts,
            empty: false,
            loading: false
          })
        } else {
          this.setState({
            empty: true,
            loading: false
          })
        }
      })
    })
  }

  close() {
    this.props.history.replace(`${window.ctx || ''}${__route_root__}/`)
  }

  itemSelect(item){
    this.setState({
      loading: true
    })
    selectGift(item.variants[0].id).then(data => data.result).then(cart => {
      this.close()
      this.props.REFRESHCART(cart).then(cart => {
        this.setState({
          loading: false
        })
      })
    })
  }

  render() {
    const { intl, cart } = this.props
    const { gifts, empty } = this.state
    return <FullFixed onClose={this.close.bind(this)} title="Gifts">

      {
        this.state.loading && <Loading />
      }

      {
        cart && gifts && gifts.length > 0 && <GIFTUL>
          {
            gifts.map(gift => <li key={gift.id}>
              <GifItem itemSelect={ this.itemSelect.bind(this) } item={gift} selectedId={cart.gifts && cart.gifts.length > 0 ? cart.gifts[0].variantId: null}/>
            </li>)
          }
        </GIFTUL>
      }

    </FullFixed>
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Gifts))