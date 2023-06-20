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
                couponIframeSrc: '/order-confirm-alert',
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
        mounted(){
            let _this = this
            window.closeHandle = () => {
                _this.showShareCoupon = false
                _this.couponIframeSrc = _this.couponIframeSrc.split("?showShareCoupon=")?.[0]
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
            shareCoupon(params){
                if(window.GeekoSensors){
                    window.GeekoSensors.Track("GiftCardShare",{
                        button: `clickshare`,
                    })
                }
                this.couponIframeSrc += '?showShareCoupon='+params?.couponMouldId+'&showShareCouponId='+params?.couponId
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