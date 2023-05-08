<template>
    <div class="unused-coupons">
        <CouponList 
            :coupons="testCoupons"
            :loading="loading"
            :finished="finished"
            :scrollable="false"
            :isRedeem="false"
        />

        <iframe v-if="showShare" id="couponIframe" scrolling='no' :src="couponIframeSrc" allowTransparency="true"></iframe>
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
                finished:false,
                couponIframeSrc: '',
                showShare: false
            }
        },
        computed:{
            ...mapGetters([
                'coupons'
            ]),
            testCoupons(){
                let list = this.coupons.map((c, i) => {
                    if(i == 0){
                        c.giftCard = true
                    }
                    return c
                })
                return list
            },
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
        },
        methods:{
            shareCoupon(){
                
            }
        }
    }
</script>

<style>

</style>