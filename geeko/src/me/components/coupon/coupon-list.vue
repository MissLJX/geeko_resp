<template>
    <div class="el-coupons">
        <list :items="coupons" :scrollable="scrollable" :loading="loading" :finished="finished" @listing="$emit('listing')">
            <template slot="li" slot-scope="props">
                <li :key="props.item.coupon.id">
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