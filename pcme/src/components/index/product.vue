<template>
    <div class="product">
        <div class="_image">
            <a :href="getProUrl(product)">
                <img :src="imageUrl(product.pcMainImage)" alt="MainIMage">
            </a>
        </div>
        <div class="p-info-price">
            <span class="f-red">{{price(product)}}</span>
            <del class="f-gray">{{delPrice(product)}}</del>
        </div>
    </div>
</template>

<script>
    import * as utils from "../../utils/geekoutil.js"

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
                    return utils.unitPrice(product.promotion.promotionPrice)
                }
                return utils.unitPrice(product.price)
            },
            delPrice(product){
                if (product.msrp && product.msrp.amount > 0)
                    return utils.unitPrice(product.msrp)
                if (product.promotion && product.promotion.enabled)
                    return utils.unitPrice(product.price)
                return ''
            }
        }
    }
</script>

<style scoped lang="scss">
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

        .p-info-price{
            margin-top: 5px;
            .f-red{
                font-family: 'SlatePro-Medium';
                font-size: 14px;
                color: #000000;
            }

            .f-gray{
                font-size: 12px;
                color: #999999;
            }
        }
    }
</style>