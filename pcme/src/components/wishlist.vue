<template>

    <div>
        <div class="imghd">
            <p>{{wishListCount}} {{$t("products")}}</p>
            <p class="remove" v-if="wishListFilterResult && wishListFilterResult.length > 0" @click="clearAllHandle()">{{$t("remove_all_invaild")}}</p>
        </div>
        <div class="imgCon">
            <ul>
                <li v-for="item in wishListFilterResult">
                    <div>
                        <a :href="getProUrl(item)">
                            <img :src="imageUrl(item.pcMainImage)"/>
                        </a>
                    </div>
                    <div class="p-info" v-if="item.status !== '2'">
                        <div class="p-info-price">
                            <span :class="{'f-red':true, 'color-red': !!delPrice(item)}">{{lowerPrice(item)}}</span>
                            <del class="f-gray" v-if="delPrice(item)">{{delPrice(item)}}</del>
                        </div>
                        <i class="iconfont" @click="cancelSaveHandle(item.id)">&#xe629;</i>
                    </div>
                    <div class="p-soldout-con" v-if="item.status === '2'">
                        <div class="p-soldout">
                            {{$t('soldout')}}
                        </div>
                        <i class="iconfont" @click="cancelSaveHandle(item.id)">&#xe629;</i>
                    </div>
                </li>
            </ul>
            <div v-show="wishListLoading" class="el-list-loading"><i class="iconfont">&#xe69f;</i></div>
            <div class="el-no-more" v-show="wishListFinished">{{$t('nomoredata')}}</div>
        </div>
        <div class="mask" v-if="isAlert">
            <div class="confirm-con">
                <p class="cancel-btn" @click="removeAll(0)"><i class="iconfont">&#xe69a;</i></p>
                <p>{{$t('removeproducts')}}</p>
                <div class="btn-arr">
                    <div class="n-btn" @click="removeAll(0)">{{$t('no')}}</div>
                    <div class="y-btn" @click="removeAll('1')">{{$t('yes')}}</div>
                </div>
            </div>
        </div>
        <loding v-if="wishListLoading"></loding>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import * as utils from '../utils/geekoutil';
    import loding from './loding.vue';

    export default {
        data(){
            return{
                isAlert:false,
                isloding:false,
                ifloding:false,
                finished: false,
            }
        },
        components: {
            'loding':loding
        },
        computed: {
            ...mapGetters([
                'me',
                'wishProducts',
                'wishskip',
                'wannalistNum',

                'wishListFilterResult',
                'wishListLoading',
                'wishListFinished',
                'wishListCount'
            ]),
        },
        created(){
            this.$store.dispatch('getMe').then(()=>{
                this.$store.dispatch("initWishListProducts", {})
                this.$store.dispatch("getWishListCount")
            })
        },
        mounted(){
            window.addEventListener('scroll',this.scrollHandle)
        },
        destroyed(){
            window.removeEventListener('scroll',this.scrollHandle)
        },
        methods:{
            scrollHandle(evt){
                evt.preventDefault();
                if(document.documentElement.scrollTop + window.innerHeight + 20 >= document.body.offsetHeight) {
                    console.log(this.wishListLoading, this.wishListFinished)
                    if(!this.wishListLoading && !this.wishListFinished){
                        this.$store.dispatch("appendWishListProducts", {})
                    }
                }
            },
            imageUrl(imgurl){
                return utils.imageutil.getMedium(imgurl)
            },
            cancelSaveHandle(productIds){
                if(productIds && !this.wishListLoading){
                    this.$store.dispatch("removeWishListProduct", productIds)
                }
            },
            clearAllHandle(){
                if(this.wishListFilterResult && this.wishListFilterResult.length > 0){
                    this.isAlert = true;
                }
            },
            removeAll(flag){
                this.isAlert = false;
                if(flag === '1' && !this.wishListLoading){
                    this.$store.dispatch("removeExpiredProducts")
                }
            },
            getProUrl(product){
                return window.ctx + '/' + utils.producturl(product)
            },
            lowerPrice(item){
                let price = utils.getLowerPrice(item)
                return utils.unitPrice(price)
            },
            delPrice(item){
                let price = utils.getDelPrice(item)
                return utils.unitPrice(price)
            }
        }
    }
</script>

<style scoped lang="scss">

    @font-face {
        font-family: 'iconfont';  /* project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_m72f720tkb.eot');
        src: url('//at.alicdn.com/t/font_384296_m72f720tkb.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_384296_m72f720tkb.woff') format('woff'),
        url('//at.alicdn.com/t/font_384296_m72f720tkb.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_384296_m72f720tkb.svg#iconfont') format('svg');
    }
    .iconfont{
        font-family:"iconfont" !important;
        font-size:16px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }
    .el-no-more {
        padding: 10px 0;
        text-align: center;
        color: #666;
    }

    .el-list-loading {
        text-align: center;
        padding: 10px 0;
        i {
            font-size: 24px;
            display: inline-block;
            animation: list-loading 1.5s infinite linear;
        }
    }

    @keyframes list-loading {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    .loading{
        display: inline-block;
        width: 30px;
        height: 30px;
        position: fixed;
        top: calc(50% - 15px);
        left: calc(50% - 15px);
        border-top: 3px solid rgb(34, 34, 34);
        border-left: 3px solid rgb(34, 34, 34);
        animation: iVXCSc 1.2s linear 0s infinite normal none running;
        border-radius: 50%;
    }
    .imghd{
        text-align: center;
        margin: 20px 0;
        font-size: 14px;
        color: #999;
        .remove{
            float: right;
            position: relative;
            top: -10px;
            right: 15px;
            color: #222;
            text-decoration: underline;
            cursor: pointer;
            &:hover{
                color: #999;
            }
        }
    }
    .f-red{
        color: #222;
        font-size: 16px;
        font-weight: bold;
    }

    .color-red{
        color: #E64545;
    }
    .f-gray{
        color: #666;
        font-size: 14px;
        margin-left: 15px;
    }
    .imgCon{
        width: 916px;
        ul{
            display: inline-block;
            width: 100%;
            li{
                width: 25%;
                float: left;
                padding-right: 13px;
                margin-bottom: 38px;
                img{
                    width: 216px;
                    height: 270px;
                    position: relative;
                    display: block;
                }
                .p-info{
                    padding-top: 7px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    i{
                        font-size: 18px;
                        color: #666;
                        cursor: pointer;
                    }
                    .p-info-price{
                        display: flex;
                        align-items: center;
                    }
                }
                .p-soldout-con{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 7px;
                    i{
                        font-size: 18px;
                        cursor: pointer;
                    }
                    .p-soldout{
                        width: 98px;
                        background-color: #cacaca;
                        border-radius: 100px;
                        text-align: center;
                        color: #fff;
                    }
                }
            }
        }
    }
    .mask{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.4);
        text-align: center;
        z-index: 999;
        .confirm-con{
            width: 485px;
            height: 175px;
            margin:0 auto;
            position: relative;
            top: calc(50% - 82px);
            background-color: white;
            color: #222;
            font-size: 14px;
            padding: 20px;
            .cancel-btn{
                font-size: 18px;
                color: #666666;
                text-align: right;
                cursor: pointer;
                margin-bottom: 15px;
            }
            .btn-arr{
                padding-top: 25px;
                width: 355px;
                margin: 0 auto;
                .n-btn, .y-btn{
                    width: 170px;
                    line-height: 32px;
                    text-align: center;
                    color: #fff;
                    float: left;
                    cursor: pointer;
                }
                .n-btn{
                    background-color: #222;
                }
                .y-btn{
                    background-color: #cacaca;
                    margin-left: 15px;
                }
                &:after{
                    display: block;
                    content: '';
                    clear: both;
                }
            }
        }
    }
</style>