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
            price(){
                if (this.variantProduct && this.variantProduct.promotionPrice && this.variantProduct.promotionPrice.amount > 0) {
                    return unitprice(this.variantProduct.promotionPrice)
                }

                if (this.variantProduct && this.variantProduct.price && this.variantProduct.price.amount > 0) {
                    return unitprice(this.variantProduct.price)
                }
                return "";
            },
            delPrice(){
                if(!this.variantProduct){
                    return;
                }

                if(this.variantProduct && this.variantProduct.msrp && this.variantProduct.msrp.amount > 0){
                    return unitprice(this.variantProduct.msrp)
                }else{
                    return unitprice(this.variantProduct.price)
                }
            },
            discountPrecent(){
                if(!this.variantProduct){
                    return;
                }
                if(this.variantProduct && this.variantProduct.promotionPrice && this.variantProduct.msrp && this.variantProduct.msrp.amount > 0){
                    return "-" + Math.round((this.variantProduct.msrp.amount - this.variantProduct.promotionPrice.amount)*100/this.variantProduct.msrp.amount) + "%";
				}
                if(this.variantProduct && this.variantProduct.promotionPrice){
					return "-" + Math.round((this.variantProduct.price.amount - this.variantProduct.promotionPrice.amount)*100/this.variantProduct.price.amount) + "%";
                }
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