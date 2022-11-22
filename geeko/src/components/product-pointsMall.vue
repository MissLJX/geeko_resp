<template>
    <div class="el-list-product">
        <a 
            :href="productUrl" 
            :data-title="eventTitle" 
            :data-column="calssifyName" 
            :data-product-position="index+1"
            data-product-list-source 
            :product-id="product.id"
			:data-product-source="product.dataSource" 
            :data-geeko-id="geekoId"
            :data-geeko-experiment="experimentId"
			:data-request-id="product.aliRequestId"
            :data-experiment-id="product.aliExperimentId"
			:type="eventTitle"
			:data-type="eventTitle"
            :data-content="eventTitle"
            ref="oftenProduct"
        >
            <figure>
                <div class="img">
                    <img :src="imageUrl" :class="{'gray':isSoldOutProduct}"/>
                </div>
            </figure>
        </a>

        <figcaption>
            <p class="st-ellipsis el-product-name" >
                <!-- {{product.name}} -->
            </p>
            <div class="st-table st-fullwidth">
                <div class="st-cell st-v-m">
                    <span class="el-product-price" v-html="price">
                    </span>
                    <del class="el-product-del">{{delPrice}}</del>
                </div>
                <div class="st-cell st-v-m st-t-r" :data-productId="product.id">
                    <i @click.prevent="addToCart(product.id)" class="iconfont el-product-like">&#xe6a8;</i>
                </div>
            </div>
        </figcaption>
    </div>
</template>

<style scoped lang="scss">
    @font-face {
        font-family: 'iconfont';  /* project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_g8zwuseogk7.eot');
        src: url('//at.alicdn.com/t/font_384296_g8zwuseogk7.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_384296_g8zwuseogk7.woff') format('woff'),
        url('//at.alicdn.com/t/font_384296_g8zwuseogk7.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_384296_g8zwuseogk7.svg#iconfont') format('svg');
    }
    .iconfont{
        font-family:"iconfont" !important;
        font-size:16px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;}
    .el-list-product {

        .el-product-name{
            font-size: 12px;
        }

        a{
            text-decoration: none;
            color: #222928;
        }
        .img{
            position: relative;
            &::after{
                content: '';
                display: block;
                margin-top: 125%;
            }
            overflow: hidden;
        }

        img {
            display: block;
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;
        }

        .el-product-price {
            font-size: 14px;
            font-weight: bold;
            color: #e64545;

            div{
                display: inline-block;
                font-size: 12px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #e96060;

                .pointsIcon{
                    width:10px;
                    margin-left: 2px;
                    position: relative;
                    display: inline-block;
                }
            }

        }

        .el-product-del {
            color: #666;
            font-size: 12px;
            margin-left: 4px;
        }

        .el-product-like {
            font-size: 18px;
            &.red {
                color: #f00;
            }
            cursor: pointer;
        }

        figcaption {
            & > * {
                margin-top: 5px;
            }
            // height: 50px;
            height: 30px;
        }
    }
    .gray{
        -webkit-filter: grayscale(100%);
        -moz-filter: grayscale(100%);
        -ms-filter: grayscale(100%);
        -o-filter: grayscale(100%);
        filter: grayscale(100%);
        filter: gray;
    }
</style>

<script type="text/ecmascript-6">
    import {imageutil, unitPrice , producturl , PROJECT, getPointsMoney} from '../utils/geekoutils'
    import _ from 'lodash'

    export default{
        props: {
            product: Object,
            required: true,
            isSoldOut:true,
            index:Number,
            calssifyName:String,
            requestId:{
                type:String,
                default:""
            },
            experimentId:{
                type:String,
                default:""
            },
            eventTitle:{
                type:String,
                default:""
            },
            productType:{
                type: Number,
                default: 1
            }
        },
        computed: {
            imageUrl(){
                return imageutil.getMedium(this.product.pcMainImage)
            },
            price(){
                // 当有积分价格，且显示积分时
                if(this.product.pointsMallSales && JSON.stringify(this.product.pointsMallSales) != '{}'){
                    return getPointsMoney(this.product.pointsMallSales)
                }
                // if(this.product)
                if (this.product.promotion && this.product.promotion.enabled) {
                    return unitPrice(this.product.promotion.promotionPrice)
                }
                return unitPrice(this.product.price)
            },
            delPrice(){
                // if (this.product.pointsMallSales && ((this.product.promotion && this.product.promotion.enabled) || this.product.price)){
                //     if (this.product.promotion && this.product.promotion.enabled) {
                //         return unitPrice(this.product.promotion.promotionPrice)
                //     }
                //     return unitPrice(this.product.price)
                // }
                if (this.product.msrp && this.product.msrp.amount > 0)
                    return unitPrice(this.product.msrp)
                if (this.product.promotion && this.product.promotion.enabled)
                    return unitPrice(this.product.price)
                return ''
            },
            productUrl(){
                return PROJECT + '/' + producturl(this.product)
            },
            isSoldOutProduct(){
                if(this.product.status == 2){
                    return true
                }else{
                    return false
                }
            },
            isLogin(){
                return this.$store.getters["me/isLogin"];
            },
            geekoId(){
                if(this.product && this.product.geekoRequsestId){
                    return this.product.geekoRequsestId;
                }else{
                    return this.requestId;
                }
            }
        },
        methods: {
            addToCart(productId){
                this.$store.dispatch("globalLoadingShow",true);
                this.$store.dispatch("getProductDetailMessage",productId).then((product) => {
                    this.$store.dispatch("setIsPointsProduct",true);
                    this.$store.dispatch("addToCartIsShow",true);
                    this.$store.dispatch("globalLoadingShow",false);
                });
            }
        },
        mounted(){
            let value = this.$refs.oftenProduct;
            if (window.productListObserver) {
                window.productListObserver.observe(value)
            }
        }
    }
</script>