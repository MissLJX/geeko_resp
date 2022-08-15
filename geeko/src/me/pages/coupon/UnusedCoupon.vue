<template>
    <div class="unused-coupon">
        <coupon-list :coupons="coupons" :scrollable="false" :loading="loading"></coupon-list>
    </div>
</template>

<script>
    import store from '../../../store/index.js'
    import { mapGetters } from 'vuex'

    import CouponList from '../../components/coupon/coupon-list.vue'

    export default {
        name:"UnusedCoupon",
        data(){
            return {
                loading:false
            }
        },
        computed: {
            ...mapGetters('me', ['coupons']),
        },
        activated(){
            this.loading = true;
            store.dispatch('me/getCoupons').then((data) => {
                this.loading = false;

                if(data && data.length <=0){
                    this.finished = true;
                }
            })
        },
        components:{
            "coupon-list":CouponList
        }
    }
</script>

<style lang="scss" scoped>
    .unused-coupon{
        padding: 0px 10px;
    }
</style>