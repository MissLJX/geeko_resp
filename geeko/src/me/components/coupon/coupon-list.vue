<template>
    <div class="el-coupons">
        <list :items="coupons" :loading="loading" :finished="finished" @listing="$emit('listing')">
            <template slot="li" slot-scope="props">
                <li :key="props.item.coupon.id">
                    <coupon :coupon="props.item" v-if="!isRedeem" :isExpired="isExpired" />
                    <!-- @changeCoupons="(id) =>$emit('changeCoupons',id)" -->
                    <redeem-coupon :coupon="props.item" v-else :index="props.index" v-on="$listeners" />
                </li>
            </template>
        </list>
    </div>
</template>

<script type="text/ecmascript-6">
    import List from '../../../components/list.vue'
    import Coupon from './coupon.vue'
    import RedeemCoupon from "./redeem-coupon.vue"

    export default{
        props:{
            coupons:{
                type: Array
            },
            loading:{
                type:Boolean
            },
            finished:{
                type:Boolean
            },
            scrollable:{
                type:Boolean
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
        components: {
            'list': List,
            'coupon': Coupon,
            "redeem-coupon":RedeemCoupon
        }
    }
</script>

<style scoped lang="scss">
    .el-coupons  li{
        .__container{
            position: relative;
        }

        &:first-child{
            border-top: none;
        }
        .el-coupon{
            width: 100%;
        }
        padding: 10px;
    }
</style>