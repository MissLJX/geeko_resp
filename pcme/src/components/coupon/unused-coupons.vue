<template>
    <div class="unused-coupons">
        <CouponList 
            :coupons="coupons"
            :loading="loading"
            :finished="finished"
            :scrollable="false"
            :isRedeem="false"
        />
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import CouponList from "./coupon-list.vue";

    export default {
        name:"UnusedCoupons",
        data(){
            return {
                loading:false,
                finished:false
            }
        },
        computed:{
            ...mapGetters([
                'coupons'
            ]),
        },
        components:{
            "CouponList":CouponList,
        },
        activated(){
            this.loading = true;
            this.$store.dispatch('getCoupons').then(data =>{
                this.loading = false;
                this.finished = true;
            }).catch(error=>{
                console.log('error', error)
                this.loading = false;
            })  
        }
    }
</script>

<style>

</style>