<template>
    <div class="redeem-coupon">
        <div class="redeem-coupon-container">
            <div class="redeem-coupon-bg">
                <p>Redeem Coupon</p>
                <p>
                    <span>My points: 164321</span>
                    <span class="__icon"></span>
                </p>
            </div>
        </div>

        <div class="redeem-coupon-list">
            <coupon-list :loading="loading" :finished="finished" :coupons="coupons"></coupon-list>
        </div>
    </div>
</template>
<script>
    import CouponList from "../components/coupon/coupon-list.vue"
    import { getPointsCouponList } from "../api/index.js"

    export default {
        name:"RedeemCoupons",
        data(){
            return {
                loading:false,
                finished:false,
                coupons:[]
            }
        },
        created(){
            this.loading = true;
            getPointsCouponList().then((data) =>{
                if(data.result && data.result.length > 0){
                    this.coupons.push(...data.result);
                }else{
                    this.finished = true;
                }

                this.loading = false;
            });
        },
        components:{
            "coupon-list":CouponList
        }
    }
</script>
<style lang="scss" scoped>
    .redeem-coupon{
        .redeem-coupon-container{
            margin-bottom: 12px;
            
            .redeem-coupon-bg{
                background-image: url("https://image.geeko.ltd/chicme/2022022201/redeem_coupon_bg.png");
                background-size: cover;
                background-repeat: no-repeat;
                height: 102px;
                text-align: center;

                & > p{
                    text-align: center;

                    &:first-child{
                        font-size: 24px;
                        color: #ffffff;
                        font-family: 'AcuminPro-Bold';
                        line-height: 50px;
                    }

                    &:last-child{
                        line-height: 30px;
                        .__icon{
                            width: 18px;
                            height: 18px;
                            display: inline-block;
                            background-image: url(https://image.geeko.ltd/chicme/2021111101/point_mall.svg);
                            background-size: cover;
                            background-repeat: no-repeat;
                            position: relative;
                            top: 1px;
                        }

                        & span{
                            font-size: 28px;
                            color: #fcc202;
                            font-family: 'SlatePro-Medium';
                        }
                    }
                }
            }
        }
    }
</style>