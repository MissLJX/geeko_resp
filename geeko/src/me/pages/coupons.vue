<template>
    <div class="el-coupons-body">
        <page-header>
            <span>{{$t('label.coupons')}}</span>
        </page-header>
        <div>
            <coupon-container></coupon-container>
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

    import CouponContainer from './coupon/CouponContainer.vue'

    export default{
        components: {
            'page-header': PageHeader,
            'coupon-container':CouponContainer
        }
    }
</script>