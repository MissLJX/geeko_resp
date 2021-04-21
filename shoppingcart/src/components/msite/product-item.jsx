import React from 'react'
import styled from 'styled-components'
import { IMAGE_PREFIX } from '../../utils/constants'
import { getlowerprice, producturl } from '../../utils/utils'
import Money from '../money.jsx'

const PRODUCT = styled.div`
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
        const lower = getlowerprice(product)
        return <PRODUCT>
            <a ref={this.productRef.bind(this)} href={producturl(product)} className="__image product-click" product-id={product.id} type="shopping_cart_match_with" data-column="shopping_cart_match_with" data-product-list-source data-title="shoppingcart" data-type="shopping_cart_match_with" data-content="You Might Like to Fill it With" data-product-position={position}>
                <img src={`${IMAGE_PREFIX}/medium/${product.pcMainImage}`} />
            </a>
            <div className="__price">
                <PRICE>
                    <Money money={lower} />
                </PRICE>
                <ICON onClick={evt => { onSelect(product.variants[0], product) }}>&#xe6a8;</ICON>

            </div>
        </PRODUCT>
    }
}


