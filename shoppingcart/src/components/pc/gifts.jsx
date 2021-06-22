import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import styled from 'styled-components'
import { IMAGE_PREFIX } from '../../utils/constants'
import Money from '../money.jsx'
import SwiperCore, {
    Navigation
} from 'swiper/core'

import "swiper/components/navigation/navigation.min.css"

SwiperCore.use([Navigation])

const GIFTPRODUCT = styled.div`
    width: 160px;
    height: 60px;
    border-radius: 2px;
	border: solid 1px #e6e6e6;
    background-color: #fff;
    padding: 4px;
    display: flex;
    align-items: center;
    & > .__image{
        width: 40px;
        height: 50px;
        flex-shrink: 0;
        img{
            display: block;
            width: 100%;
        }
    }
    & > .__info{
        width: 112px;
        padding-left: 4px;

        .__price{
            display: flex;
            justify-content: space-between;
            margin-top: 8px;
            align-items: center;
        }
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

const NAME = styled.div`
    font-size: 12px;
    color: #222;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    
`


const GIFTCONTAINER = styled.div`
    padding: 12px 0;
    background-color: #fafafa;
    & > .__hd{
        padding-left: 7px;
        padding-right: 7px;
    }
    & > .__bd{
        margin-top: 9px;
    }

    --swiper-navigation-size: 14px;
    --swiper-navigation-color: #000;
`

const PRICE = styled.span`
    font-size: 14px;
`

const ICON = styled.span`
    cursor: pointer;
    font-family: iconfont;
    color: #222;
`

const GiftProduct = class extends React.Component {
    constructor(props) {
        super(props)
    }

    productRef(c) {
        if (c && window.productListObserver && !this.productrf) {
            window.productListObserver.observe(c)
            this.productrf = c
        }
    }

    render() {

        const { product, position, onSelect, canBuyGift } = this.props

        const lower = product.giftPrice || {}
        const higher = product.msrp ? product.msrp : product.price
        const isPromotion = product.promotion && product.promotion.enabled && product.promotion.promotionPrice

        let off
        if (lower && higher && Number(higher.amount) > Number(lower.amount) && isPromotion) {
            off = Math.round((Number(higher.amount) - Number(lower.amount)) * 100 / Number(higher.amount))
        }

        return <GIFTPRODUCT innerRef={this.productRef.bind(this)} data-column="gifts" data-product-list-source data-title="shoppingcart" data-type="gifts" data-content="Gifts" data-product-position={position}>
            <div className="__image">
                <img src={`${IMAGE_PREFIX}/medium/${product.pcMainImage}`} />
            </div>
            <div className="__info">
                <NAME>
                    <GIFT>Gift</GIFT>
                    <span>{product.name}</span>
                </NAME>
                <div className="__price">
                    <span>
                        <PRICE>
                            <Money style={{ color: '#e64545' }} money={lower} />
                        </PRICE>
                        {
                            higher && <del style={{ fontSize: 12, marginLeft: 5 }}><Money money={higher} /></del>
                        }
                    </span>
                    <ICON style={{ color: canBuyGift ? '#222' : '#999' }} onClick={evt => { canBuyGift && onSelect(product.variants[0], product) }}>&#xe6a8;</ICON>
                </div>
            </div>
        </GIFTPRODUCT>
    }
}

export default props => {
    const { products, options } = props
    const initialOpts = {
        slidesPerView: 'auto',
        spaceBetween: 10,
        navigation: true
    }

    return <GIFTCONTAINER>

        <div className="__hd">
            <span className="iconfont" style={{ color: '#ff8454', fontSize: 20, verticalAlign: 'middle' }}>&#xec45;</span>

            {
                props.giftWarnMsg ? <span style={{ fontFamily: 'SlatePro', verticalAlign: 'middle', fontSize: 14, marginLeft: 2 }} dangerouslySetInnerHTML={{ __html: props.giftWarnMsg }} /> : <span style={{ fontFamily: 'SlatePro-Medium', verticalAlign: 'middle', fontSize: 14, marginLeft: 2 }}>Gift</span>
            }

        </div>
        <div className="__bd">
            <Swiper {...initialOpts} {...(options || {})} style={{paddingLeft: 25, paddingRight: 25}}>
                {
                    products && products.map((product, index) => <SwiperSlide style={{ width: 'auto' }} key={product.id}>
                        <GiftProduct {...props} product={product} position={index + 1} />
                    </SwiperSlide>)
                }
            </Swiper>
        </div>

    </GIFTCONTAINER>
}