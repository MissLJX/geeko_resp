<template>
    <div class="el-list-product">
        <a 
            :href="productUrl"
            data-title="me" 
            :data-column="calssifyName" 
            :data-product-position="index+1"
            data-source 
            data-source-click 
            :product-id="product.id"
        >
            <figure>
                <div class="img">
                    <img :src="imageUrl" :class="{'gray':isSoldOutProduct}"/>
                </div>

                <figcaption>
                    <!-- <p class="st-ellipsis el-product-name">{{product.name}}</p> -->
                    <div class="st-table st-fullwidth">
                        <div class="st-cell st-v-m">
                            <span class="el-product-price">{{price}}</span>
                            <del class="el-product-del">{{delPrice}}</del>
                        </div>
                        <div class="st-cell st-v-m st-t-r">
                            <i @click.prevent="likeHandle" class="iconfont el-product-like" :class="{red:liked}">{{liked ? '&#xe677;' : '&#xe631;'}}</i>
                        </div>
                    </div>
                </figcaption>
            </figure>
        </a>
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
            font-size: 16px;
            font-weight: bold;
        }

        .el-product-del {
            color: #666;
            font-size: 12px;
            margin-left: 4px;
        }

        .el-product-like {
            font-size: 20px;
            &.red {
                color: #f00;
            }
            cursor: pointer;
        }

        figcaption {
            & > * {
                margin-top: 5px;
            }
            height: 25px;
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
    import {imageutil, unitprice , producturl , PROJECT} from '../../../utils/geekoutils'
    import _ from 'lodash'

    export default{
        props: {
            product: Object,
            required: true,
            isSoldOut:true,
            index:Number,
            calssifyName:String
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
            }
        },
        methods: {
            likeHandle(){
                var wishlist = this.$store.getters['me/wishlist']
                var index = _.indexOf(wishlist[0].productIds, this.product.id)
                if (index < 0) {
                    this.$store.dispatch('like', this.product.id)
                } else {
                    this.$store.dispatch('unlike',  this.product.id)
                }
            }
        }
    }
</script>