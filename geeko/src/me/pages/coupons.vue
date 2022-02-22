<template>
    <div class="el-coupons-body">
        <div class="fixed-header">
            <page-header>
                <span>{{$t('label.coupons')}}</span>
            </page-header>
        </div>

        <div style="padding-top:50px;background-color: #f6f6f6;">
            <coupon-list :loading="loading" :finished="finished" :coupons="coupons" :isRedeem="false"></coupon-list>
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
    // import CouponContainer from './coupon/CouponContainer.vue'
    import CouponList from "../components/coupon/coupon-list.vue"
    import { mapGetters } from "vuex";
    import store from "../../store/index.js"


    export default{
        name:"Coupons",
        data(){
            return {
                loading:false,
                finished:false
            }
        },
        components: {
            'page-header': PageHeader,
            "coupon-list":CouponList
        },
        computed:{
            ...mapGetters('me', ['coupons']),
        },
        created(){
            if(!(this.coupons && this.coupons.length > 0)){
                this.loading = true;
                store.dispatch('me/getCoupons').then((data) => {
                    this.loading = false;

                    if(data && data.length <=0){
                        this.finished = true;
                    }
                })
            }
        },
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