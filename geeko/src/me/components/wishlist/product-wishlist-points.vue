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

                    <span class="view-more" @click.prevent="clickViewMore" v-if="!suspendShow && suspendSumShow">
                        <span>...</span>
                    </span>

                    <div class="suspend-container" v-if="suspendShow && suspendSumShow">
                        <div class="find-similar" @click.prevent="findSimlar(product.id)">
                            Find Similar
                        </div>

                        <div class="delete" @click.prevent="deleteLikeProduct">
                            Delete
                        </div>
                    </div>

                    <span class="new" v-if="product.isNew">NEW</span>
                </div>
            </figure>

            <div class="mask" v-if="suspendShow && suspendSumShow" @click="(e) => e.preventDefault()"></div>
        </a>

        <figcaption>
            <p class="st-ellipsis el-product-name">{{product.name}}</p>
            <div class="st-table st-fullwidth">
                <div class="st-cell st-v-m">
                    <span class="el-product-price" style="color: #e64545;" v-html="price"></span>
                    <del class="el-product-del">{{delPrice}}</del>
                </div>
                <div class="st-cell st-v-m st-t-r">
                    <i @click.prevent="addToCart(product.id)" class="iconfont el-product-like">&#xe6a8;</i>
                </div>
            </div>
        </figcaption>
    </div>
</template>

<script type="text/ecmascript-6">
    import {imageutil, unitprice , producturl , PROJECT, getPointsMoney} from '../../../utils/geekoutils.js'
    import _ from 'lodash'

    export default{
        data(){
            return {
                suspendShow:false,
                suspendSumShow:true
            }
        },
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
            }
        },
        created(){
        },
        activated(){
        },
        deactivated(){
            this.suspendShow = false;
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
            liked(){
                var wishlist = this.$store.getters['me/wishlist']
                if (wishlist && wishlist.length && wishlist[0].productIds && wishlist[0].productIds.length) {
                        return _.indexOf(wishlist[0].productIds, this.product.id) >= 0
                }

                return false
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
            likeHandle(){
                if(!this.isLogin){
                    window.location.href = "/i/login?redirectUrl=/me/m";
                }
                var wishlist = this.$store.getters['me/wishlist']
                var index = _.indexOf(wishlist[0].productIds, this.product.id)
                if (index < 0) {
                    this.$store.dispatch('like', this.product.id)
                } else {
                    this.$store.dispatch('unlike',  this.product.id)
                }
            },
            deleteLikeProduct(){
                let _this = this;
                _this.$store.dispatch('confirmShow', {
                    show: true,
                    cfg: {
                        btnFont:{
                            yes:"Confirm",
                            no:"Cancel"
                        },
                        message: "Are you sure you want to delete the item(s)?",
                        yes: function () {
                            _this.likeHandle();
                            _this.suspendSumShow = false;
                            _this.$store.dispatch('closeConfirm');

                            // 单删确认点击
                            if(window.GeekoSensors){
                                window.GeekoSensors.Track('WishlistButtonClick', {
                                    page_sort:"wish list",
                                    page_type: "收藏夹页",
                                    button_pv:"delete_confirm",
                                    is_success:true
                                })
                            }
                        },
                        no: function () {
                            _this.$store.dispatch('closeConfirm');

                            // 单删取消点击
                            if(window.GeekoSensors){
                                window.GeekoSensors.Track('WishlistButtonClick', {
                                    page_sort:"wish list",
                                    page_type: "收藏夹页",
                                    button_pv:"cancel",
                                    is_success:true
                                })
                            }
                        }
                    }
                })

                // 单删点击
                if(window.GeekoSensors){
                    window.GeekoSensors.Track('WishlistButtonClick', {
                        page_sort:"wish list",
                        page_type: "收藏夹页",
                        button_pv:"delete",
                    })
                }
            },
            addToCart(productId){
                this.$store.dispatch("globalLoadingShow",true);
                this.$store.dispatch("getProductDetailMessage",productId).then((product) => {
                    this.$store.dispatch("setIsPointsProduct",true);
                    this.$store.dispatch("addToCartIsShow",true);
                    this.$store.dispatch("globalLoadingShow",false);
                });
            },
            findSimlar(productId){
                // 相似款点击
                if(window.GeekoSensors){
                    window.GeekoSensors.Track('WishlistButtonClick', {
                        page_sort:"wish list",
                        page_type: "收藏夹页",
                        button_pv:"findsimilar",
                    })
                }
                this.$router.push({name:"relation-products",params:{productId}});
            },
            clickViewMore(){
                this.suspendShow = true;

                // 更多选择点击
                if(window.GeekoSensors){
                    window.GeekoSensors.Track('WishlistButtonClick', {
                        page_sort:"wish list",
                        page_type: "收藏夹页",
                        button_pv:"more_choice",
                    })
                }
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
        position: relative;

        .el-product-name{
            font-size: 12px;
        }

        a{
            text-decoration: none;
            color: #222928;
            display: block;
            position: relative;

            .mask{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.4);
            }
        }
        .img{
            position: relative;
            &::after{
                content: '';
                display: block;
                margin-top: 125%;
            }
            overflow: hidden;

            .view-more{
                position: absolute;
                width: 19px;
                height: 19px;
                line-height: 9px;
                text-align: center;
                display: inline-block;
                top: 6px;
                right: 6px;
                background-color: #f6f6f6;
                border-radius: 50%;
                cursor: pointer;

                span{
                    color: #666666;
                    font-size: 23px;
                    letter-spacing: -1px;

                }
            }

            .suspend-container{
                position: absolute;
                top: 55%;
                left: 50%;
                transform: translateX(-50%);
                z-index: 3;

                .find-similar{
                    background-color: #ffffff;
                    height: 22px;
                    line-height: 22px;
                    text-align: center;
                    // padding: 0px 10px;
                    width: 93px;
                    font-family: 'AcuminPro-Bold';
                    font-size: 14px;
                    color: #222222;
                }

                .delete{
                    color: #ffffff;
                    height: 22px;
                    line-height: 22px;
                    text-align: center;
                    // padding: 0px 10px;
                    width: 93px;
                    font-family: 'AcuminPro-Bold';
                    font-size: 14px;
                    background-color: rgba(0, 0, 0, 0.5);
                    margin-top: 12px;
                }
            }

            .new{
                font-size: 12px;
                display: inline-block;
                left: 0;
                top: 4px;
                position: absolute;
                min-width: 36px;
                padding-left: 4px;
                padding-right: 4px;
                height: 16px;
                color: #fff;
                text-align: center;
                line-height: 16px;
                background-color: #5ad133;
            }
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