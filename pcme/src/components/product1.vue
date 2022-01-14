<template>
    <div class="product">
        <div class="_image">
            <a :href="getProUrl(product)">
                <img :src="imageUrl(product.pcMainImage)" alt="MainIMage">
            </a>
        </div>
        <div class="product_name">
            {{product.name}}
        </div>
        <div class="p-info-price">
            <span :class="{'f-red':true, 'color_red':delPrice(product)}">{{price(product)}}</span>
            <del class="f-gray">{{delPrice(product)}}</del>
        </div>
    </div>
</template>

<script>
    import * as utils from "../utils/geekoutil.js"

    export default {
        name:"Product",
        props:{
            product:{
                type:Object
            }
        },
        methods:{
            getProUrl(product){
                return window.ctx + '/' + utils.producturl(product)
            },
            imageUrl(imgurl){
                return utils.imageutil.getMedium(imgurl)
            },
            price(product){
                if (product.promotion && product.promotion.enabled) {
                    return utils.unitprice(product.promotion.promotionPrice)
                }
                return utils.unitprice(product.price)
            },
            delPrice(product){
                if (product.msrp && product.msrp.amount > 0)
                    return utils.unitprice(product.msrp)
                if (product.promotion && product.promotion.enabled)
                    return utils.unitprice(product.price)
                return ''
            }
        }
    }
</script>

<style scoped lang="scss">
.color_red{
    color: #e64545 !important;
}
    .product{
        ._image{
            a{
                position: relative;
                overflow: hidden;
                display: block;
                background-color: #f1f1f1;
                img{
                    display: block;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                }

                &::after{
                    content: '';
                    display: block;
                    margin-top: 125%;
                }
            }
        }
        .product_name{
            font-family: 'SLATEPRO';
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #999999;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-top: 10px;
        }

        .p-info-price{
            margin-top: 5px;
            margin-bottom: 30px;
            .f-red{
                font-family: 'SlatePro-Medium';
                font-size: 18px;
                color: #222;
            }

            .f-gray{
                font-size: 14px;
                color: #999999;
            }
        }
    }
</style>