<template id="coupon-list">
    <div class="coupon-list">
        <list :items="coupons" :loading="loading" :scrollable="scrollable" :finished="finished" @listing="$emit('listing')">
            <template slot="li" slot-scope="props">
                <li :key="props.item.id || props.item.coupon.id">
                    <coupon v-if="!isRedeem" :coupon="props.item" :isExpired="isExpired" @showShareCoupon="(params) => $emit('showShareCoupon', params)"/>
                    <redeem-coupon v-else :coupon="props.item" :index="props.index" v-on="$listeners" />
                </li>
            </template>
        </list>
    </div>
</template>
<script>
    import List from "../../components/list.vue"
    import RedeemCoupon from "./redeem-coupon.vue"
    import Coupon from "./coupon.vue";

    export default {
        name:"CouponList",
        props:{
            coupons:{
                type: Array,
                default(){
                    return [];
                }
            },
            loading:{
                type:Boolean
            },
            finished:{
                type:Boolean
            },
            scrollable:{
                type:Boolean,
                default:true
            },
            isRedeem:{
                type:Boolean,
                default:false
            },
            isExpired:{
                type:Boolean,
                default:false
            }
        },
        components:{
            "list":List,
            "redeem-coupon":RedeemCoupon,
            "coupon": Coupon
        }
    }
</script>
<style lang="scss" scoped>
    .coupon-list{
        /deep/ ul.st-clear{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            &::after{
                content: none;
            }
        }
    }
</style>