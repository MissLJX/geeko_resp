<template>
    <div class="el-list-product">
        <a>
            <figure>
                <div class="img">
                    <img :src="imageUrl"/>
                </div>

                <figcaption>
                    <p class="st-ellipsis">{{product.name}}</p>
                    <div class="st-table st-fullwidth">
                        <div class="st-cell st-v-m">
                            <span class="el-product-price">{{price}}</span>
                            <del class="el-product-del">{{delPrice}}</del>
                        </div>
                        <div class="st-cell st-v-m st-t-r">
                            <i @click.prevent="likeHandle" class="iconfont el-product-like" :class="{'red':liked}">&#xe601;</i>
                        </div>
                    </div>
                </figcaption>
            </figure>
        </a>
    </div>
</template>

<style scoped lang="scss">
    .el-list-product {

        .img{
            position: relative;
            &::after{
                content: '';
                display: block;
                margin-top: 133%;
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
                color: #e5004f;
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
</style>

<script type="text/ecmascript-6">
    import {imageutil, unitprice} from '../utils/geekoutils'
    import _ from 'lodash'

    export default{
        props: {
            product: Object,
            required: true
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
            }

        },
        methods: {
            likeHandle(){
                var wishlist = this.$store.getters['me/wishlist']
                var index = _.indexOf(wishlist[0].productIds, this.product.id), _this = this
                if (index < 0) {
                    wishlist[0].productIds.push(this.product.id)
                } else {
                    wishlist[0].productIds.splice(index, 1)
                }
            }
        }
    }
</script>