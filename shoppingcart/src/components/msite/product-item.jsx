import React from 'react'
import styled from 'styled-components'
import { IMAGE_PREFIX } from '../../utils/constants'
import { getlowerprice, producturl, gethigherprice } from '../../utils/utils'
import Money from '../money.jsx'

const PRODUCT = styled.div`
    position: relative;
    cursor: pointer;
    & > .__price{
        display: flex;
        margin-top: 8px;
        justify-content: space-between;
    }
    & > .__image{
        position: relative;
        overflow: hidden;
        display: block;
        &::after{
            display: block;
            margin-top: 125%;
            content: '';
        }
        & > img{
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
        }
    }
`

const PRICE = styled.span`
    font-family: SlatePro-Medium;
    font-size: 14px;
`

const ICON = styled.span`
    cursor: pointer;
    font-family: iconfont;
    color: #222;
`

const OFF = styled.span`
    position: absolute;
    left: 0;
    top: 4px;
    background-color: #222;
    color: #fff;
    padding: 1px 2px;
    font-size: 12px;
    display: inline-block;
`


export const NormalProduct = class extends React.Component {
    constructor(props) {
        super(props)
    }

    productRef(c){
        if(c && window.productListObserver && !this.productrf){
            window.productListObserver.observe(c)
            this.productrf = c
        }
    }

    render() {
        const { product, position, onSelect } = this.props
        // product.promotion = {
        //     enabled: true,
        //     promotionPrice:{unit:'$', amount: '5'},
        // }
        const lower = getlowerprice(product)
        const higher = gethigherprice(product)
        const isPromotion = product.promotion && product.promotion.enabled && product.promotion.promotionPrice

        let off
        if(lower && higher && Number(higher.amount) > Number(lower.amount) && isPromotion){
            off = Math.round((Number(higher.amount) - Number(lower.amount))*100 / Number(higher.amount))
        }


        return <PRODUCT onClick={evt => { onSelect(product.variants[0], product) }}>
            <a ref={this.productRef.bind(this)} href="javacript:void(0)"  className="__image product-click" product-id={product.id} data-product-source={product.dataSource} data-geeko-id={product.geekoRequsestId} data-request-id={product.aliRequestId} data-experiment-id={product.aliExperimentId} type="shopping_cart_match_with" data-column="shopping_cart_match_with" data-product-list-source data-title="shoppingcart" data-type="shopping_cart_match_with" data-content="You Might Like to Fill it With" data-product-position={position}>
                <img src={`${IMAGE_PREFIX}/medium/${product.pcMainImage}`} />
            </a>

            { off>0 && <OFF>-{off}%</OFF>}
            
            <div className="__price">
               
                
                <PRICE>
                    {
                        isPromotion &&<ICON style={{color:'#e64545', fontSize: 12, marginRight: 4}}>&#xe6be;</ICON>
                    }
                    <Money style={{color: isPromotion?'#e64545':'#222', fontFamily: 'AcuminPro-Bold'}} money={lower} />
                </PRICE>
                <ICON style={{fontSize: 14, fontWeight: 'bold'}}>&#xe6a8;</ICON>

            </div>
        </PRODUCT>
    }
}


