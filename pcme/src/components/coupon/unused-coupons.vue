<template>
    <div class="unused-coupons">
        <CouponList 
            :coupons="coupons"
            :loading="loading"
            :finished="finished"
            :scrollable="false"
            :isRedeem="false"
            @showShareCoupon="shareCoupon"
        />

        <iframe class="couponShareIframe" v-if="showShareCoupon" id="couponIframe" scrolling='no' :src="couponIframeSrc" allowTransparency="true"></iframe>
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
                couponIframeSrc: 'http://192.168.2.81/order-confirm-alert',
                showShareCoupon: false
            }
        },
        computed:{
            ...mapGetters([
                'coupons'
            ]),
            // testCoupons(){
            //     let list = this.coupons.map((c, i) => {
            //         if(i == 0){
            //             c.giftCard = true
            //         }
            //         return c
            //     })
            //     return list
            // },
        },
        components:{
            "CouponList":CouponList,
        },
        created(){
            window.closeHandle = () => {
                this.showShareCoupon = false
                this.couponIframeSrc = this.couponIframeSrc.split("?couponMouldId=")?.[0]
            }
        },
        destroyed(){
            window.closeHandle = null
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
            shareCoupon(id){
                console.log("this active", id)
                this.couponIframeSrc += '?showShareCoupon='+id
                this.showShareCoupon = true
            }
        }
    }
</script>

<style>
    .couponShareIframe{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
    }
</style>