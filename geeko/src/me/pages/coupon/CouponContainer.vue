<template>
    <div class="coupon-container" v-if="coupons && coupons.length > 0">
        <div class="el-coupon-body">
            <coupon-list :coupons="coupons"></coupon-list>
        </div>
    </div>
    <div v-else class="el-list-loading"><i class="iconfont">&#xe69f;</i></div>
</template>

<script>
    import store from '../../../store/index.js'
    import { mapGetters } from 'vuex'

    import CouponList from '../../components/coupon/coupon-list.vue'

    export default {
        name:"CouponContainer",
        data(){
            return {
                isActive:true,
                finished:false
            }
        },
        computed:{
            ...mapGetters('me', ['coupons']),
            // disposeCoupons(){
            //     let coupons = this.coupons.filter(item => {
            //         return this.isActive ? item.isAvailable : !item.isAvailable;
            //     });
            //     return coupons;
            // }
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
        },
        methods:{

        }
    }
</script>

<style lang="scss" scoped>
    .coupon-container{
        background-color: #f6f6f6;

        .el-coupon-header{
            display: flex;
            justify-content: space-between;
            text-align: center;
            padding: 20px 10px 10px 10px;

            & > div{
                width: calc(50% - 15px);
                font-family: SlatePro;
                font-size: 14px;
                color: #222222;


                & > span{
                    padding-bottom: 8px;
                    cursor: pointer;
                }
            }

            & > div.active{
                font-family: SlatePro-Medium;

                & > span{
                    border-bottom: 2px solid #000000;
                }
            }
        }

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

    .el-list-loading {
        text-align: center;
        padding: 10px 0;
        i {
            font-size: 24px;
            display: inline-block;
            animation: list-loading 1.5s infinite linear;
        }
    }

    @keyframes list-loading {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>