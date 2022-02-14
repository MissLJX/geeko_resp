<template>
    <div class="el-coupons">
        <list :items="coupons" :scrollable="scrollable" :loading="loading" :finished="finished" @listing="$emit('listing')">
            <template slot="li" slot-scope="props">
                <li :key="props.item.coupon.id" :class="{'el-coupon-li' : !props.item.isAvailable}">
                    <coupon :coupon="props.item"/>
                </li>
            </template>
        </list>
    </div>
</template>

<script type="text/ecmascript-6">
    import List from '../../../components/list.vue'
    import Coupon from './coupon.vue'

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
                type:Boolean,
                default:false
            },
            isExpried:{
                type:Boolean,
                default:false
            }
        },
        components: {
            'list': List,
            'coupon': Coupon
        }
    }
</script>

<style scoped lang="scss">
    .el-coupons  li{
        padding: 10px 10px 0px 10px;
        border-bottom: 2px solid #ff782a;

        &:first-child{
            border-top: none;
        }
    }

</style>