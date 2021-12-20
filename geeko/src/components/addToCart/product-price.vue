<template>
    <div class="product-price">
        <div class="_title">
            {{product.name}}
        </div>

        <div class="_prices">
            <span class="x-product-price">{{price}}</span>
            <del class="x-product-del-price" v-if="delPrice">{{delPrice}}</del>
            <span class="x-product-off" v-if="discountPrecent">{{discountPrecent}}</span>
        </div>
    </div>
</template>

<script>
    import {unitprice} from "../../utils/geekoutils.js"

    export default {
        name:"ProductPrice",
        props:{
            product:{
                type:Object,
                required:true
            },
            variantProduct:{
                type:Object,
                required:true
            }
        },
        computed:{
            // promotionPrice   促销价格
            // msrp  市场价
            // price   正常售价   一定会有一个售价
            price(){
                // 当有促销价格并且大于0的时候  售价显示促销价格
                if (this.variantProduct && this.variantProduct.promotionPrice && this.variantProduct.promotionPrice.amount > 0) {
                    return unitprice(this.variantProduct.promotionPrice)
                }

                // 当有价格并且大于0的时候  售价显示价格
                if (this.variantProduct && this.variantProduct.price && this.variantProduct.price.amount > 0) {
                    return unitprice(this.variantProduct.price)
                }
                return "";
            },
            delPrice(){
                if(this.variantProduct && this.variantProduct.promotionPrice){
                    if(this.variantProduct.msrp && this.variantProduct.msrp.amount > 0){
                        return unitprice(this.variantProduct.msrp);
                    }else{
                        return unitprice(this.variantProduct.price);
                    }
                }else{
                    if(this.variantProduct.msrp && this.variantProduct.msrp.amount > 0){
                        return unitprice(this.variantProduct.msrp);
                    }
                }
                return "";
            },
            discountPrecent(){
                if(this.variantProduct && this.variantProduct.promotionPrice){
                    if(this.variantProduct.msrp && this.variantProduct.msrp.amount > 0){
                        return "-" + Math.round((this.variantProduct.msrp.amount - this.variantProduct.promotionPrice.amount)*100/this.variantProduct.msrp.amount) + "%";
                    }else{
                        return "-" + Math.round((this.variantProduct.price.amount - this.variantProduct.promotionPrice.amount)*100/this.variantProduct.price.amount) + "%";
                    }
                }else{
                    if(this.variantProduct.msrp && this.variantProduct.msrp.amount > 0){
                        return "-" + Math.round((this.variantProduct.msrp.amount - this.variantProduct.price.amount)*100/this.variantProduct.msrp.amount) + "%";
                    }
                }

                return "";
            },
        }
    }
</script>

<style scoped lang="scss">
    .product-price{
        ._title{
            font-size: 12px;
            color: #999;
            line-height: 20px;
            margin-top: 5px;
            visibility: visible;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            -webkit-line-clamp: 2;
        }

        ._prices{
            margin-top: 5px;
            margin-bottom: 20px;

            .x-product-price{
                font-family: AcuminPro-Bold;
                font-size: 20px;
            }

            .x-product-del-price{
                font-size: 12px;
                margin-left: 10px;
            }

            .x-product-off{
                background-color: #222;
                color: #fff;
                padding: 2px 4px;
                font-size: 12px;
                margin-left: 10px;
            }
        }
    }
</style>