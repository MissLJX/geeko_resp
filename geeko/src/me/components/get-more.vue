<template>
    <div>
        <div class="w-mask" v-if="seen"></div>
        <div class="get-more-con">
            <div class="get-btn" v-if="show" @click="ifShow">Get More Credits</div>
            <div class="get-methods" v-if="seen">
                <div class="thd">
                    <span class="tl">Get More Credits</span>
                    <span class="tr" @click="ifShow">Close</span>
                </div>
                <div class="tbl pd0">
                    <!--<div class="tbc"><i class="iconfont">&#xe737;</i><p>Post style</p><span>+2000</span></div>-->
                    <div class="tbc"><a :href="shoppingCartUrl"><i class="iconfont">&#xe739;</i><p>Share item</p><span>+30</span></a></div>
                    <!--<div class="tbc"><i class="iconfont">&#xe738;</i><p>Invite friends</p><span>+200</span></div>-->
                    <div class="tbc"><a :href="indexUrl"><i class="iconfont">&#xe735;</i><p>Make purchase</p><span>$100=+100</span></a></div>
                    <!--<div class="tbc"><a :href="orderHref"><i class="iconfont">&#xe734;</i><p>Leave a review</p><span>+100</span></a></div>-->
                    <!--<div class="tbc"><i class="iconfont">&#xe736;</i><p>Make suggestion</p><span>+200</span></div>-->
                </div>
    <!--            <div class="tbl pd0">

                </div>-->
            </div>
        </div>
    </div>
</template>

<script>
    import * as utils from '../../utils/geekoutils';

    export default {
        name: "get-more",
        data(){
            return {
                show:true,
                seen:false
            }
        },
        methods:{
            ifShow: function(){
                this.show = !this.show
                this.seen = !this.seen
            }
        },
        computed:{
            orderHref() {
                let path = '';
                if (this.orderCountUnpaid > 0)
                    path = 'unpaid'
                return utils.PROJECT + '/me/m/order/' + path;
            },
            indexUrl(){
                return utils.PROJECT + '/w-shopping-cart/anon/show'
                /*return utils.PROJECT + '/shoppingcart/authc'*/
            },
            shoppingCartUrl(){
                return utils.PROJECT + '/w-site/anon/index'
                /*return utils.PROJECT + '/index'*/
            }
        }

    }
</script>

<style scoped type="scss">
    @font-face {
        font-family: 'iconfont';  /* project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_oqd9vvi72n.eot');
        src: url('//at.alicdn.com/t/font_384296_oqd9vvi72n.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_384296_oqd9vvi72n.woff') format('woff'),
        url('//at.alicdn.com/t/font_384296_oqd9vvi72n.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_384296_oqd9vvi72n.svg#iconfont') format('svg');
    }
    .iconfont{
        font-family:"iconfont" !important;
        font-size:24px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;}
    .tbl{
        width: 100%;
        display: table;
        padding: 25px 20px;
    }
    .pd0{
        padding-bottom: 0;
    }
    .tbc{
        width: 33.33%;
        text-align: center;
        display: table-cell;
        cursor: pointer;
        p{
            font-size: 13px;
        }
        span{
            color: #e5004f;
            position: relative;
            top: -56px;
            left: 35px;
        }
    }
    .thd{
        width: 100%;
        height: 45px;
        line-height: 45px;
        color: #222;
        padding: 0 10px;
        border-bottom: 1px solid #e3e3e3;
    }
    .tl{
        float: left;
        font-size: 15px;
    }
    .tr{
        float: right;
        width: 50px;
        text-align: center;
        font-size: 13px;
        color: #666;
        cursor: pointer;
    }
    .get-more-con{
        width: 100%;
        position: fixed;
        z-index: 100;
        bottom: 0;
        border-top: 1px solid #e3e3e3;
        background-color: #fff;
    }
    .get-btn{
        margin: 10px;
        text-align: center;
        background-color: #222;
        color: #fff;
        font-weight: bold;
        height: 50px;
        line-height: 50px;
        cursor: pointer;
    }
    .w-mask{
        width: 100%;
        height: 100%;
        position: fixed;
        background-color: rgba(0,0,0,0.6);
        z-index: 10;
        top: 0;
    }
</style>