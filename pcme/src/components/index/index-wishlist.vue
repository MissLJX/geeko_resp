<template>
    <div class="index-wishlist">
        <div class="_hd st-table st-fullwidth">
            <div class="st-cell st-v-m">{{$t("mywishlist")}}</div>
            <div class="st-cell st-v-m st-t-r" v-show="disposeWishlistProducts">
                <router-link :to="getUrl('/me/m/wishlist')">
                    {{$t("index.view_all")}} >
                </router-link>
            </div>
        </div>

        <div class="_bd">
            <ul v-if="!isWishListEmptyShow">
                <li v-for="(item,index) in wishProducts.slice(0,8)" :key="index+item.id">
                    <div>
                        <a :href="getProUrl(item)">
                            <div class="image-item">
                                <img :src="imageUrl(item.pcMainImage)"/>
                            </div>
                        </a>
                    </div>
                    <div class="p-info" v-if="item.status !== '2'">
                        <div class="p-info-price">
                            <span class="f-red">{{price(item)}}</span>
                            <del class="f-gray">{{delPrice(item)}}</del>
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

            <div class="no-wishlist" v-else>
                <span class="iconfont">&#xe6e7;</span>
                <p>{{$t("index.wishlist_empty")}}.</p>
            </div>
        </div>

        <div v-show="ifloding" class="el-list-loading"><i class="iconfont">&#xe69f;</i></div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex"
    import { checkArray } from "../../utils/geekoutil.js"
    import * as utils from "../../utils/geekoutil.js"

    export default {
        name:"IndexWishList",
        data(){
            return {
                ifloding:false,
                isWishListEmptyShow:false
            }
        },
        created(){
            if(checkArray(this.wishProducts)){
                return;
            }
            this.ifloding = true;
            this.$store.dispatch("getWishproducts",0).then(({finished}) => {
                this.$store.dispatch("getWishskip",0);
                this.ifloding = false;
                if(finished) this.isWishListEmptyShow = finished;
            });
        },
        computed:{
            ...mapGetters(['wishProducts','wishskip']),
            disposeWishlistProducts(){
                return this.wishProducts && this.wishProducts.length > 0;
            },
        },
        watch:{
            wishProducts(newV, oldV){
                if(newV && newV.length == 0){
                    this.isWishListEmptyShow = true
                }
            }
        },
        methods:{
            getProUrl(product){
                return window.ctx + '/' + utils.producturl(product)
            },
            imageUrl(imgurl){
                return utils.imageutil.getMedium(imgurl)
            },
            cancelSaveHandle(productIds){
                this.$emit("update:isloding",true);
                if(productIds){
                    this.$store.dispatch("removeWishProducts",{productIds}).then(()=>{
                        this.$store.dispatch("getWishproducts", 0).then(({finished})=>{
                            this.$emit("update:isloding",false);
                            if(finished) this.isWishListEmptyShow = finished;
                        })
                    }).catch(e => {
                        this.$emit("update:isloding",false);
                        alert(e.result)
                    })
                }
            },
            price(product){
                if (product.promotion && product.promotion.enabled) {
                    return utils.unitPrice(product.promotion.promotionPrice)
                }
                return utils.unitPrice(product.price)
            },
            delPrice(product){
                if (product.msrp && product.msrp.amount > 0)
                    return utils.unitPrice(product.msrp)
                if (product.promotion && product.promotion.enabled)
                    return utils.unitPrice(product.price)
                return ''
            },
            getUrl(suffix){
                return utils.PROJECT + suffix;
            },
        }
    }
</script>

<style lang="scss" scoped>
    .index-wishlist{
        ._hd{
            & > div{
                &:first-child{
                    font-family: 'AcuminPro-Bold';
                    font-size: 18px;
                    color: #000000;
                }

                &:last-child{
                    font-size: 14px;
                    color: #666666;
                }
            }
        }

        ._bd{
            margin-top: 15px;
            ul{
                display: flex;
                flex-wrap: wrap;
                li{
                    width: 25%;
                    padding-right: 13px;
                    margin-bottom: 20px;

                    .image-item{
                        position: relative;
                        overflow: hidden;
                        background-color: #f1f1f1;
                        img{
                            width: 100%;
                            height: 100%;
                            display: block;
                            position: absolute;
                            top: 0;
                            left: 0;
                        }

                        &::after{
                            content: "";
                            display: block;
                            margin-top: 125%;
                        }
                    }
                    
                    .p-info{
                        padding-top: 7px;
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        i{
                            font-size: 16px;
                            color: #999999;
                            cursor: pointer;
                        }
                        .p-info-price{
                            display: flex;
                            align-items: center;
                            flex-wrap: wrap;
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

                    .f-red{
                        color: #000000;
                        font-size: 16px;
                        font-family: 'SlatePro-Medium';
                        margin-right: 5px;
                    }
                    .f-gray{
                        color: #999999;
                        font-size: 14px;
                    }
                }
            }

            .no-wishlist{
                .iconfont{
                    font-size: 60px;
                    color: #979797;
                }
                text-align: center;
                padding-bottom: 30px;

                p{
                    font-size: 12px;
                    margin-top: 25px;
                    color: #999999;
                }
            }
        }
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
</style>