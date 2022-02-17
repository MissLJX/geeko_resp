<template>
    <div class="el-coupons-body">
        <div class="fixed-header">
            <page-header>
                <span>{{$t('label.coupons')}}</span>
            </page-header>
        </div>
        
        <div style="padding-top:50px;">
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