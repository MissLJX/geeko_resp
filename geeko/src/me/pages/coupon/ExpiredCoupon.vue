<template>
    <div class="expired-coupon">
        <coupon-list 
            :coupons="expiredCoupons" 
            :finished="finished" 
            :scrollable="true" 
            :loading="loading"
            @listing="listingHandle"
            :isExpried="true"
        ></coupon-list>
    </div>
</template>

<script>
    import store from '../../../store/index.js'
    import {mapGetters} from 'vuex'

    import CouponList from '../../components/coupon/coupon-list.vue'

    export default {
        name:"ExpiredCoupon",
        data(){
            return {
                finished:false,
                loading:false
            }
        },
        computed: {
            ...mapGetters('me', ['expiredCoupons','expiredCouponsSkip']),
        },
        created(){
            if(!(this.expiredCoupons && this.expiredCoupons.length > 0)){
                this.listingHandle();
            }
        },
        methods:{
            listingHandle:function(){
                this.loading = true;
                store.dispatch('me/getExpiredCoupons',{skip:this.expiredCouponsSkip}).then(({finished,empty}) => {
                    if(finished) this.finished = finished;
                    this.loading = false;

                    if(!!empty){
                        store.dispatch('me/getExpiredCouponsSkip');
                    }
                }).catch((e) => {
                    console.error(e)
                })
            }
        },
        components:{
            "coupon-list":CouponList
        }
    }
</script>

<style lang="scss" scoped>
    .expired-coupon{
        padding: 0px 10px;
    }
</style>