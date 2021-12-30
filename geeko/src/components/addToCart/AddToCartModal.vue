<template>
    <div class="add-to-cart-modal">
        <div class="_bd">
            <product-swiper :images="productImages"></product-swiper>

            <product-price :product="product" :variant-product="variantProduct"></product-price>
            <!-- <product-price-points v-if="isPointsProduct" :product="product" :variant-product="variantProduct"></product-price-points> -->

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
        <div class="_fd" @click="addToCart(false)" v-if="!isPointsProduct">
            <div>Add to Cart</div>
        </div>

        <div class="_fd pointsBtnBox" v-if="isPointsProduct">
            <span :class="saveProduct" :product-id="productId"><i class="iconfont" style="font-size: 22px;">&#xe631;</i></span>
            <div class="pointsBtn" >
                <div v-if="unitedPrice" @click="addToCartOrigin">
                    {{unitedPrice}}
                    <span class="iconfont">&#xe6a8;</span>
                </div>
                <div v-if="pointsPrice" v-html="pointsPrice" @click="addToCartPoints"></div>
            </div>
        </div>

        
    </div>
</template>

<script>
    import _ from "lodash"

    import ProductSwiper from "./product-swiper.vue"
    import ProductPrice from "./product-price.vue"
    import ProductColor from "./product-color.vue"
    import ProductSize from "./product-size.vue"
    import ProductPricePoints from './product-price-points.vue'
    import {getPointsMoney,unitprice} from '../../utils/geekoutils.js'

    export default {
        name:"AddToCartModal",
        data(){
            return {
                products:null,
                productId:"0db00778-bf12-4d05-ad59-0cbccf655d46",
                variantId:"1k6N2S7c7S24174y6m4b49740I",
                isPointsProduct: false,
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
            },
            saveProduct(){
                if(window.WannaList){
                    let isActive = window.WannaList.exists(this.product.id) ? 'active':''
                    return 'mp-l-save alike __like ' + isActive
                } else {
                    return 'mp-l-save alike __like'
                }
            },
            unitedPrice(){
                return unitprice(this.variantProduct.price)
            },
            pointsPrice(){
                if(getPointsMoney(this.variantProduct.pointsMallVariantSales)){
                    return getPointsMoney(this.variantProduct.pointsMallVariantSales) + '<span class="iconfont">&#xe6a8;</span>'
                } else {
                    return ''
                }
            }
        },
        created(){
            this.products = this.$store.getters.productDetail;
            this.productId = this.$store.getters.productId;
            this.variantId = this.product.variants[0].id;
            this.isPointsProduct = this.$store.getters.isPointsProduct;
            console.log(this.isPointsProduct, this.product, this.variantProduct)
        },
        components:{
            "product-swiper":ProductSwiper,
            "product-price":ProductPrice,
            "product-color":ProductColor,
            "product-size":ProductSize,
            "product-price-points":ProductPricePoints
        },
        methods:{
            changeProduct(productId){
                this.productId = productId;
                this.variantId = this.product.variants[0].id;
            },
            addToCart(pointsSale){
                let params = {
                    "variantId":this.variantId,
                    "quantity":'1'
                }
                if(pointsSale){
                    params.pointsMallSales = true
                }
                this.$store.dispatch("addToCart",params).then(() => {
                    console.log("success");
                    this.$store.dispatch("addToCartIsShow",false);
                    this.$store.dispatch("setIsPointsProduct", false);
                    window.countShoppingCart ? window.countShoppingCart() : "";
                }).catch((e) => {
                    console.log("e",e);
                    this.$store.dispatch("addToCartIsShow",false);
                    this.$store.dispatch("setIsPointsProduct", false);
                });
            },
            addToCartOrigin(){
                if(window.isLoged == 'true'){
                    if(window.GeekoSensors){
                        window.GeekoSensors.Track('AddToCartButtonClick', {
                            referrer: document.referrer,
                            addtocart_type: "正常加购",
                        })
                    }
                    this.addToCart(false)
                } else {

                }
            },
            addToCartPoints(){
                if(window.isLoged == 'true'){
                    if(this.variantProduct.pointsMallVariantSales.price){
                        if(window.GeekoSensors){
                            window.GeekoSensors.Track('AddToCartButtonClick', {
                                referrer: document.referrer,
                                addtocart_type: "混合加购",
                            })
                        }
                    } else {
                        if(window.GeekoSensors){
                            window.GeekoSensors.Track('AddToCartButtonClick', {
                                referrer: document.referrer,
                                addtocart_type: "积分加购",
                            })
                        }
                    }
                    this.addToCart(true)
                } else {

                }
                
            }
        }
    }
</script>

<style scoped lang="scss">
    .active{
        color: #e64545;
    }    
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
        .pointsBtnBox{
            display: flex;
            align-items: center;
            justify-content: space-between;

            .pointsBtn{
                background: transparent;
                margin-left: 10px;
                display: flex;
                justify-content: space-between;

                &>div{
                    flex: 1;
                    margin-right: 18px;
                    background: #222;
                }

                &>div:last-child{
                    margin-right: 0;
                }
            }
        }
    }
</style>