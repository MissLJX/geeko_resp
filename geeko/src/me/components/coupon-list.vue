<template>
    <div class="el-coupons">
        <list :items="coupons" :scrollable="false">
            <template slot="li" scope="props">
                <li :key="props.item.coupon.id">
                    <coupon class="el-coupon" :coupon="props.item"/>
                </li>
            </template>
        </list>
    </div>
</template>

<style scoped lang="scss">
    .el-coupons  li{
        border-top:1px solid #dcdcdc;
        &:first-child{
            border-top: none;
        }
        .el-coupon{
            width: 100%;
        }
        padding: 10px;
    }
</style>

<script type="text/ecmascript-6">
    import List from '../../components/list.vue'
    import Coupon from '../components/coupon.vue'

    export default{
        props:{
            coupons:{
                type: Array
            }
        },
        components: {
            'list': List,
            'coupon': Coupon
        }
    }
</script>