<template>
    <div class="el-list-product">
        <a 
            :href="productUrl" 
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
            :data-title="sensors.resourcepage_title || eventTitle" 
            :data-position="sensors.resource_position || index+1"
			:data-type="sensors.resource_type || eventTitle"
            :data-content="sensors.resource_content || eventTitle"
            ref="oftenProduct"
        >
            <figure>
                <div class="img">
                    <img :src="imageUrl" :class="{'gray':isSoldOutProduct}"/>
                </div>
            </figure>
        </a>

        <figcaption>
            <p class="st-ellipsis el-product-name">{{product.name}}</p>
            <div class="st-table st-fullwidth">
                <div class="st-cell st-v-m">
                    <span class="el-product-price">{{price}}</span>
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
            background-color: #efefef;
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
            font-size: 16px;
            font-weight: bold;
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
            height: 50px;
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
    import {imageutil, unitprice , producturl , PROJECT} from '../utils/geekoutils'
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
            sensors:{
                type:Object,
                default:() =>{
                    return {}
                }
            }
        },
        computed: {
            imageUrl(){
                return imageutil.getMedium(this.product.pcMainImage)
            },
            price(){
                if (this.product.promotion && this.product.promotion.enabled) {
                    return unitprice(this.product.promotion.promotionPrice)
                }
                return unitprice(this.product.price)
            },
            delPrice(){
                if (this.product.msrp && this.product.msrp.amount > 0)
                    return unitprice(this.product.msrp)
                if (this.product.promotion && this.product.promotion.enabled)
                    return unitprice(this.product.price)
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
                    this.$store.dispatch("addToCartIsShow",true);
                    this.$store.dispatch("globalLoadingShow",false);
                    this.$store.dispatch("setAddToCartSensors", {
                        position:this.index+1,
                        ali_request_id: this.product.aliRequestId,
                        geeko_request_id: this.geekoId,
                        geeko_experiment_id: this.experimentId,
                        ali_experiment_id: this.product.aliExperimentId,
                        data_source: this.product.dataSource,
                        ...this.sensors
                    });
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