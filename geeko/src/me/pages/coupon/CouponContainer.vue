<template>
    <div class="coupon-container">
        <div class="el-coupon-body">
            <coupon-list :coupons="coupons"></coupon-list>
        </div>
    </div>
</template>

<script>
    import store from '../../../store/index.js'
    import { mapGetters } from 'vuex'

    import CouponList from '../../components/coupon/coupon-list.vue'

    export default {
        name:"CouponContainer",
        data(){
            return {
                finished:false
            }
        },
        props:{
            coupons:{
                type:Array,
                required:true,
                default:[]
            }
        },
        computed:{
            ...mapGetters('me', ['coupons']),
        },
        created(){
            if(!(this.coupons && this.coupons.length > 0)){
                this.loading = true;
                store.dispatch('me/getCoupons').then((data) => {
                    this.loading = false;

                    if(data && data.length){
                        this.finished = true;
                    }
                })
            }
        },
        components:{
            "coupon-list":CouponList
        }
    }
</script>

<style lang="scss" scoped>
    .coupon-container{
        background-color: #f6f6f6;

        .el-coupon-body{
            padding: 0px 10px;
        }

        .no-more{
            font-family: FuturaBT-Book;
            font-size: 14px;
            color: #999999;
            padding-top: 30px;
            text-align: center;
        }
    }
</style>