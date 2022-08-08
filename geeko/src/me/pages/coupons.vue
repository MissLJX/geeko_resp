<template>
    <div class="el-coupons-body">
        <div class="fixed-header">
            <page-header>
                <span>{{$t('label.coupons')}}</span>
            </page-header>

            <div class="coupons-tab">
                <a @click="componentName='UnusedCoupon'">
                    <span :class="componentName=='UnusedCoupon'?'Active':''">{{ $t("label.unused_coupons") }}</span>
                </a>
                <a @click="componentName='ExpiredCoupon'">
                    <span :class="componentName!='UnusedCoupon'?'Active':''">{{ $t("label.expired_coupons") }}</span>
                </a>
            </div>

            <!-- redeemCoupon -->
            <template v-if="componentName=='UnusedCoupon' && redeemCouponShow">
                <swiper :notificationData="swiperData"></swiper>
            </template>

            <div class="expired-message" v-if="componentName=='ExpiredCoupon'">
                <span>
                    {{ $t("label.expired_coupoons_message") }}
                </span>
            </div>
        </div>

        <!-- redeemCoupon 84  正常 50-->
        <div style="background-color: #f6f6f6;" :style="`padding-top:${`${distanceFromTop}px`}`">
            <!-- <coupon-list :loading="loading" :finished="finished" :coupons="coupons" :isRedeem="false" :scrollable="false"></coupon-list> -->
            
            <keep-alive include="ExpiredCoupon">
                <component :is="componentName"></component>
            </keep-alive>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .el-coupons-body {
        background-color: #fff;
    }
</style>

<script type="text/ecmascript-6">
    import PageHeader from '../components/page-header.vue'
    import CouponList from "../components/coupon/coupon-list.vue"
    import { mapGetters } from "vuex";
    import store from "../../store/index.js";
    import Swiper from "../../components/swiper/swiper.vue"
    import { getShowRedeemCoupons } from "../api/index"
    import ExpiredCoupon from "./coupon/ExpiredCoupon.vue";
    import UnusedCoupon from "./coupon/UnusedCoupon.vue";


    export default{
        name:"Coupons",
        data(){
            return {
                loading:false,
                finished:false,
                swiperData:[],
                redeemCouponShow:false,
                componentName:"UnusedCoupon"
            }
        },
        components: {
            'page-header': PageHeader,
            "coupon-list":CouponList,
            "swiper":Swiper,
            "ExpiredCoupon":ExpiredCoupon,
            "UnusedCoupon": UnusedCoupon
        },
        computed:{
            ...mapGetters('me', ['coupons']),
            distanceFromTop(){
                if(this.componentName == 'UnusedCoupon'){
                    if(!!this.redeemCouponShow){
                        return 124;
                    }else{
                        return 90;
                    }
                }else{
                    return 130;
                }
            }
        },
        created(){
            getShowRedeemCoupons().then(data =>{
                data.result = true;
                if(data && !!data.result){
                    this.redeemCouponShow = data.result;

                    // <!-- redeemCoupon -->
                    let obj = {
                        id:'100',
                        icon:"&#xe6ca;",
                        icon2:"&#xe694;",
                        message:this.$t("label.use_points_redeem_coupon"),
                        isClick:false,
                        clickFunction:() =>{
                            if(window.GeekoSensors){
                                window.GeekoSensors.Track('ELClick', {
                                    clicks: 'redemption',
                                    page_sort:"Me",
                                    page_content:"Coupons"
                                })
                            }
                            this.$router.push(this.GLOBAL.getUrl("/me/m/redeem-coupon"));
                        }
                    };
                    this.swiperData.push(obj);
                }
            });
        },
    }
</script>

<style lang="scss" scoped>
    .fixed-header{
        height: auto;
        width: 100%;
        position: fixed;
        top: 0px;
        left: 0px;
        background-color: rgb(255, 255, 255);
        z-index: 5;
    }

    .expired-message{
        background-color: #fff8e1;
        padding: 6px 15px;
        max-height: 40px;
        font-size: 13px;

        & > span{
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
    }

    .coupons-tab{
        display: flex;
        max-height: 40px;
        align-items: center;

        & > a{
            width: 50%;
            text-align: center;
            cursor: pointer;
            display: block;
            height: 40px;
            line-height: 40px;

            & > *{
                font-size: 14px;
                color: #999999;
                font-family: 'AcuminPro-Bold';

                &.Active{
                    color: #222222;
                    border-bottom: 2px solid #222222;
                    padding-bottom: 2px;
                }
            }
        }
    }
</style>