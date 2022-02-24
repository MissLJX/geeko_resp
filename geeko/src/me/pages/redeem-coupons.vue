<template id="redeem-coupon">
    <div class="redeem-coupon">
        <div class="li-fixed-header">
            <page-header>
                <span>{{$t("label.redeem_coupon")}}</span>
            </page-header>
        </div>

        <div class="redeem-coupon-container">
            <div class="redeem-coupon-bg">
                <span>{{$t("point.My points")}}: {{feed.points}}</span>
                <span class="__icon"></span>
            </div>
        </div>

        <div class="li-fixed-body redeem-coupon-list" style="padding-top:90px;">
            <coupon-list :loading="loading" :finished="finished" :coupons="coupons" :is-redeem="true"></coupon-list>
        </div>
    </div>
</template>
<script>
    import PageHeader from "../components/page-header.vue"
    import { mapGetters } from 'vuex'
    import store from '../../store/index'
    import CouponList from "../components/coupon/coupon-list.vue"
    import { getPointsCouponList } from "../api/index.js"

    export default {
        name:"RedeemCoupon",
        data(){
            return {
                loading:false,
                finished:false,
                coupons:[]
            }
        },
        computed:{
            ...mapGetters("me",["feed"])
        },
        components:{
            "page-header":PageHeader,
            "coupon-list":CouponList
        },
        created(){
            this.loading = true;
            getPointsCouponList().then(data =>{
                if(data.result && data.result.length > 0){
                    this.coupons.push(...data.result);
                }else{
                    this.finished = true;
                }

                this.loading = false;
            });
        }
    }
</script>
<style lang="scss" scoped>
    .redeem-coupon{
        .redeem-coupon-container{
            position: fixed;
            top: 50px;
            left: 0;
            width: 100%;
            z-index: 2;

            .redeem-coupon-bg{
                background-image: url("https://image.geeko.ltd/chicme/2022022201/redeem_coupon_bg.png");
                background-size: cover;
                background-repeat: no-repeat;
                height: 40px;
                line-height: 40px;
                text-align: center;

                .__icon{
                    width: 12px;
                    height: 12px;
                    display: inline-block;
                    background-image: url(https://image.geeko.ltd/chicme/2021111101/point_mall.svg);
                    background-size: cover;
                    background-repeat: no-repeat;
                    position: relative;
                    top: 1px;
                }

                & span{
                    font-size: 14px;
                    color: #fcc202;
                    font-family: 'SlatePro-Medium';
                }
            }
        }

        .redeem-coupon-list{
            padding: 90px 10px 0px;
        }
    }
</style>