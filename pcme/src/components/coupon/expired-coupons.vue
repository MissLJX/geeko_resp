<template>
    <div class="unused-coupons">
        <CouponList 
            :coupons="coupons"
            :loading="loading"
            :finished="finished"
            @listing="listHandle"
            :isRedeem="false"
            :isExpired="true"
        />
    </div>
</template>

<script>
    import CouponList from "./coupon-list.vue";
    import { getExpiredCoupons } from "../../api/index";

    export default {
        name:"ExpiredCoupons",
        data(){
            return {
                coupons:[],
                skip:0,
                loading:false,
                finished:false
            }
        },
        components:{
            "CouponList":CouponList
        },
        activated(){
            // console.log('Expired出发规则activated')
        },
        created(){
            this.listHandle();
        },
        methods:{
            listHandle(){
                this.loading = true;
                getExpiredCoupons(this.skip, "2").then(response =>{
                    // console.log('response', response)
                    if(response.result && response.result.length > 0){
                        this.coupons.push(...response.result);
                        this.skip += 20;
                    }else{
                        this.finished = true;
                    }

                    this.loading = false;
                }).catch(error =>{
                    console.log('error', error);
                    this.loading = false;
                });
            }
        },
    }
</script>

<style>

</style>