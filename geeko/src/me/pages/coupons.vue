<template>
    <div class="el-coupons-body">
        <div class="fixed-header">
            <page-header>
                <span>{{$t('label.coupons')}}</span>
            </page-header>

            <!-- redeemCoupon -->
            <swiper :notificationData="swiperData"></swiper>
        </div>

        <!-- redeemCoupon 84  正常 50-->
        <div style="background-color: #f6f6f6;" :style="`padding-top:${redeemCouponShow?'84px':'50px'}`">
            <coupon-list :loading="loading" :finished="finished" :coupons="coupons" :isRedeem="false"></coupon-list>
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


    export default{
        name:"Coupons",
        data(){
            return {
                loading:false,
                finished:false,
                swiperData:[],
                redeemCouponShow:false
            }
        },
        components: {
            'page-header': PageHeader,
            "coupon-list":CouponList,
            "swiper":Swiper
        },
        computed:{
            ...mapGetters('me', ['coupons']),
        },
        created(){
            if(!(this.coupons && this.coupons.length > 0)){
                this.loading = true;
                store.dispatch('me/getCoupons').then((data) => {
                    this.loading = false;

                    if(data && data.length <=0){
                        this.finished = true;
                    }
                })
            }

            getShowRedeemCoupons().then(data =>{
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
        height: 50px;
        width: 100%;
        position: fixed;
        top: 0px;
        left: 0px;
        background-color: rgb(255, 255, 255);
        z-index: 5;
    }
</style>