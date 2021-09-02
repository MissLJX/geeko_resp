<template>
    <div class="el-list-product">
        <input type="checkbox" :id="product.id" class="myCheck" @click="removeWishHandle()"/>
        <label :for="product.id"></label>
        <div class="img">
            <img :src="imageUrl" :class="{'gray':isSoldOut}"/>
        </div>
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
        position: relative;
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
    }
    input{
        display: none;
    }
    .myCheck + label{
        position: absolute;
        right: 2px;
        top: 2px;
        z-index: 300;
        background-color: white;
        border-radius: 50%;
        border:1px solid #d3d3d3;
        width:18px;
        height:18px;
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        line-height: 18px;
    }
    .myCheck:checked + label{
        // background-color: #e5004f;
        border: none;
        // color: white;
    }
    .myCheck:checked + label:after{
        content:'\e65b';
        font-family: 'iconfont';
        color: #222222;
        font-size: 18px;
        position: relative;
        right: -1px;
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
    import {imageutil, unitprice , producturl} from '../utils/geekoutils'
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
            isSoldOut(){
                if(this.product.status == 2){
                    return true
                }else{
                    return false
                }
            },
            liked(){
                var wishlist = this.$store.getters['me/wishlist']
                if (wishlist && wishlist.length && wishlist[0].productIds && wishlist[0].productIds.length) {
                        return _.indexOf(wishlist[0].productIds, this.product.id) >= 0
                }

                return false
            },
            productUrl(){
                return window.ctx + '/' + producturl(this.product)
            }
        },
        methods: {
            removeWishHandle(){
               this.$store.dispatch('unsave',this.product.id)
            }
        }
    }
</script>