<template>
    <div class="add-to-cart-modal">
        <div class="_bd">
            <product-swiper :images="productImages"></product-swiper>

            <product-price :product="product" :variant-product="variantProduct"></product-price>

            <product-color
                :variant-product="variantProduct"
                :images="changeProductImage"
                @changeProduct="changeProduct"
                :product-id="productId"
            ></product-color>
            
            <product-size 
                :product="product" 
                :variant-id.sync="variantId" 
                :variant-product="variantProduct"
            ></product-size>
        </div>
        <div class="_fd" @click="addToCart">
            <div>Add to Cart</div>
        </div>
    </div>
</template>

<script>
    import _ from "lodash"

    import ProductSwiper from "./product-swiper.vue"
    import ProductPrice from "./product-price.vue"
    import ProductColor from "./product-color.vue"
    import ProductSize from "./product-size.vue"

    export default {
        name:"AddToCartModal",
        data(){
            return {
                products:null,
                productId:"0db00778-bf12-4d05-ad59-0cbccf655d46",
                variantId:"1k6N2S7c7S24174y6m4b49740I"
            }
        },
        computed:{
            product(){
                return this.products.find(item => item.id === this.productId);
            },
            productImages(){
                let arr = _.concat(this.product.pcMainImage,this.product.pcExtraImageUrls);
                return arr;
            },
            variantProduct(){
                return this.product.variants.find(item => item.id === this.variantId);
            },
            changeProductImage(){
                return this.products.map(item => {
                    return {"productId":item.id,"imageUrl":item.pcMainImage}
                });
            }
        },
        created(){
            this.products = this.$store.getters.productDetail;
            this.productId = this.$store.getters.productId;
            this.variantId = this.product.variants[0].id;
        },
        components:{
            "product-swiper":ProductSwiper,
            "product-price":ProductPrice,
            "product-color":ProductColor,
            "product-size":ProductSize
        },
        methods:{
            changeProduct(productId){
                this.productId = productId;
                this.variantId = this.product.variants[0].id;
            },
            addToCart(){
                this.$store.dispatch("addToCart",{"variantId":this.variantId,"quantity":'1'});
            }
        }
    }
</script>

<style scoped lang="scss">
    .add-to-cart-modal{
        position: fixed;
        background-color: #fff;
        z-index: 201;
        bottom: 0;
        left: 0;
        width: 100%;
        transition: bottom .4s ease;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;

        ._bd{
            padding-left: 20px;
            padding-right: 20px;
            padding-top: 15px;
        }

        ._fd{
            padding: 12px 20px;
            box-shadow: 0px 2px 20px 0px rgba(153,153,153,.5);
            margin-top: 30px;

            & > div{
                color: #fff;
                font-family: SlatePro-Medium;
                font-size: 18px;
                text-align: center;
                height: 42px;
                line-height: 42px;
                background-color: #121314;
                border-radius: 2px;
                cursor: pointer;
                display: inline-block;
                width: 100%;
                text-transform: uppercase;
            }
        }
    }
</style>