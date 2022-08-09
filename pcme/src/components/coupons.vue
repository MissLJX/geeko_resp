<template>
    <div class="coupons">
        <div class="couponsTitle">{{$t("mycoupons")}}</div>

        <div class="coupons-tab">
            <a @click="componentName='UnusedCoupons'">
                <span :class="componentName=='UnusedCoupons'?'Active':''">{{ $t("unused_coupons") }}</span>
            </a>
            <a @click="componentName='ExpiredCoupons'">
                <span :class="componentName!='UnusedCoupons'?'Active':''">{{ $t("expired_coupons") }}</span>
            </a>
        </div>

        <!-- redeemCoupon -->
        <a @click="routTo" class="redeem-coupon-message" v-show="redeemCouponShow && componentName=='UnusedCoupons'">
            <span class="iconfont">&#xe6ca;</span>
            <span class="_font">{{ $t("label.use_points_redeem_coupon") }} ></span>
        </a>

        <div class="expired-message" v-if="componentName=='ExpiredCoupons'">
            <span>
                {{ $t("expired_coupoons_message") }}
            </span>
        </div>

        <div class="coupons-bd">
            <keep-alive>
                <component :is="componentName"></component>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    // import * as utils from '../utils/geekoutil';
    import { getShowRedeemCoupons} from '../api/index.js';
    import UnusedCoupons from "../components/coupon/unused-coupons.vue";
    import ExpiredCoupons from "../components/coupon/expired-coupons.vue";

    export default {
        data(){
            return {
                redeemCouponShow:false,
                componentName:"UnusedCoupons"
            }
        },
        computed: {
            
        },
        components:{
            "UnusedCoupons":UnusedCoupons,
            "ExpiredCoupons":ExpiredCoupons
        },
        created(){
            
        },
        activated(){
            // console.log(this.coupons)
            getShowRedeemCoupons().then(data =>{
                // data.result = true;
                // console.log(data);
                if(data && !!data.result){
                    this.redeemCouponShow = data.result;
                }
            });
        },
        methods:{
            // useHandle(id){
            //     this.$store.dispatch('useCoupon',id).then(() => {
            //         window.location.href = '/cart'
            //     })
            // },
            routTo(e){
                e.preventDefault();
                if(window.GeekoSensors){
                    window.GeekoSensors.Track('ELClick', {
                        clicks: 'redemption',
                        page_sort:"Me",
                        page_content:"Coupons"
                    })
                }

                this.$router.push({name:'redeem-coupon'})
            }
        }
    }
</script>

<style scoped lang="scss">
    @font-face {
        font-family: 'iconfont';  /* project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_m72f720tkb.eot');
        src: url('//at.alicdn.com/t/font_384296_m72f720tkb.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_384296_m72f720tkb.woff') format('woff'),
        url('//at.alicdn.com/t/font_384296_m72f720tkb.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_384296_m72f720tkb.svg#iconfont') format('svg');
    }
    .iconfont{
        font-family:"iconfont" !important;
        font-size:16px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;}
    .unabled{
        p{
            color: #999 !important;
        }
        .bg{
            background-color: #e6e6e6 !important;
        }
    }
    .r-unabled{
        background: radial-gradient(transparent 0, transparent 4px, #e6e6e6 4px) !important;
        background-size:15px 14px !important;
        background-position:8px 0px !important;
        .bg{
            background-color: #e6e6e6 !important;
        }
    }
    li{
        list-style-type: none;
    }
    .couponsTitle{
        text-align: center;
        font-family: 'ACUMINPRO-BOLD';
        font-size: 24px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #222222;
        margin-bottom: 20px;
    }

    .redeem-coupon-message{
        height: 50px;
        line-height: 50px;
        background-color: #fff8e1;
        width: calc(100% - 25px);
        padding-left: 10px;
        margin-bottom: 25px;
        display: inline-block;
        cursor: pointer;

        ._font{
            font-size: 14px;
            color: #222222;
            font-family: 'SlatePro-Medium';
            margin-left: 5px;
        }
    }

    .expired-message{
        background-color: #fff8e1;
        width: calc(100% - 25px);
        font-size: 14px;
        color: #222222;
        padding: 12px 0px 12px 16px;
        margin-bottom: 25px;
    }

    .coupons{
        &:after{
            display: block;
            clear: both;
            content: '';
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

    .coupons-tab{
        display: flex;
        max-height: 40px;
        align-items: center;
        margin-bottom: 10px;

        & > a{
            text-align: center;
            cursor: pointer;
            display: block;
            height: 40px;
            line-height: 40px;
            margin-right: 40px;

            & > *{
                font-size: 16px;
                color: #999999;
                font-family: 'AcuminPro-Bold';

                &.Active{
                    color: #222222;
                    border-bottom: 2px solid #222222;
                    padding-bottom: 5px;
                }
            }
        }
    }
</style>