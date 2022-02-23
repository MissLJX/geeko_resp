<template id="coupon-list">
    <div class="coupon-list">
        <list :items="coupons" :loading="loading" :scrollable="scrollable" :finished="finished" @listing="$emit('listing')">
            <template slot="li" slot-scope="props">
                <li :key="props.item.coupon.id">
                    <redeem-coupon :coupon="props.item" :index="props.index" />
                </li>
            </template>
        </list>
    </div>
</template>
<script>
    import List from "../../components/list.vue"
    import RedeemCoupon from "./redeem-coupon.vue"

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
                default:false
            }
        },
        components:{
            "list":List,
            "redeem-coupon":RedeemCoupon
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