<template>
    <div class="coupons">
        <div class="couponsTitle">{{$t("mycoupons")}}</div>

        <!-- redeemCoupon -->
        <a @click="routTo" class="redeem-coupon-message" v-if="redeemCouponShow">
            <span class="iconfont">&#xe6ca;</span>
            <span class="_font">{{ $t("label.use_points_redeem_coupon") }} ></span>
        </a>

        <!--  -->
        <div class="tabBox">
            <div :class="{'tabItem':true, 'tabItemSelect':showType == 0}" @click="() => showTypeChange(0)">{{$t("unused_coupons")}}</div>
            <div :class="{'tabItem':true, 'tabItemSelect':showType == 1}" @click="() => showTypeChange(1)">{{$t("expired_coupons")}}</div>
        </div>
        <div class="tipBox" v-show="showType == 1">
            {{$t("expired_tip")}}
        </div>
        
        <div class="coupon" v-for="item in listData" :key="item.coupon.id">
            <div class="__vm x-fw __fixed"
                :style="{background: `url(${showType === 0 ? 'https://image.geeko.ltd/chicme/2021-12-17/coupon_available.png' :'https://image.geeko.ltd/chicme/2021-12-17/coupon_disavailable.png'}) no-repeat` ,
                    'background-size': '100% 100%', 'height':'100%'}"
                >
                <div class='couponMainInfo'>
                    <div class="x-cell" style="height: 100%">
                        <div style="display: flex; align-items: center; justify-content: flex-start">
                            <span class="couponAmount" :style="{'color':showType === 0? '#ff782a': '#666'}">{{item.coupon.name}}</span>
                        </div>
                        
                        <div v-if="item.coupon.condition" :style="{ 'margin-top': 6, 'color': showType === 0? '#ff782a': '#666' }">
                            <span class='description'>{{item.coupon.condition}}</span>
                        </div>
                    
                        <div v-if="item.coupon.description" :style="{ 'margin-top': 6, 'color': showType === 0? '#ff782a': '#666' }">
                            <span class='description'>{{item.coupon.description}}</span>
                        </div>

                        <div v-if="item.coupon.infoMsg" :style="{ 'margin-top': 6, 'color': showType === 0? '#ff782a': '#666' }">
                            <span class='description'>{{item.coupon.infoMsg}}</span>
                        </div>
                    </div>
                    <!-- <div class="x-cell">
                    </div> -->
                </div>
                <div class='dateInfo'>
                    <li v-if="expireDate(item.coupon)">
                        <span class='dot'>.</span>
                        <span class="el-coupon-date">{{expireDate(item.coupon)}}</span>
                    </li>
                        
                    <li v-if="item.coupon.usageReminder">
                        <span class='dot'>.</span>
                        <span class="el-coupon-date">{{item.coupon.usageReminder}}</span>
                    </li>
                </div>
            </div>
        </div>

        <div v-show="loading" class="el-list-loading"><i class="iconfont">&#xe69f;</i></div>
        <div class="emptyIcon" v-show="showEmpty">
            <i class="iconfont">&#xe7c6;</i>
            <span class="empty_txt">{{$t("notification.empty_here")}}</span>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    // import * as utils from '../utils/geekoutil';
    import fecha from 'fecha'
    import { getShowRedeemCoupons} from '../api/index.js';

    export default {
        data(){
            return {
                showType: 0, // 0是可用,1是已过期
                redeemCouponShow:false,
                loading: false,
                unUsedFinished: false,
                usedFinished: false,
                usedSkip: 0,
            }
        },
        computed: {
            ...mapGetters([
                'coupons',
                'couponsHistory'
            ]),
            listData(){
                if(this.showType){
                    return this.couponsHistory
                } else {
                    return this.coupons
                }
            },
            showEmpty(){
                return (this.showType == 0 && this.loading == false && (!this.coupons || this.coupons.length == 0)) ||
                       (this.showType == 1 && this.loading == false && (!this.couponsHistory || this.couponsHistory.length == 0))
            }
        },
        created(){
            
        },
        activated(){
            window.addEventListener('scroll', this.scrollHandle)
            this.getUnUsed()
            // console.log(this.coupons)
            getShowRedeemCoupons().then(data =>{
                // console.log(data);
                if(data && !!data.result){
                    this.redeemCouponShow = data.result;
                }
            });
        },
        deactivated(){
            window.removeEventListener('scroll', this.scrollHandle)
        },
        methods:{
            useHandle(id){
                this.$store.dispatch('useCoupon',id).then(() => {
                    window.location.href = '/cart'
                })
            },
            expireDate(item){
                var [beginDate, endDate] = [item.beginDate, item.endDate]


                if (beginDate && endDate) {
                    return fecha.format(beginDate,"DD/MM/YYYY HH:mm") + "~" + fecha.format(endDate,"DD/MM/YYYY HH:mm");
                }

                return ''

            },
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
            },
            showTypeChange(type){
                console.log(type, this.showType, this.loading, this.unUsedFinished, this.usedFinished, this.usedSkip)
                if(type != this.showType){
                    this.showType = type
                    if(type){
                        this.getHistory()
                    } else {
                        this.getUnUsed()
                    }
                }
            },
            getUnUsed(){
                if(!this.loading && !this.unUsedFinished){
                    this.loading = true
                    this.$store.dispatch('getCoupons').then(res => {
                        this.loading = false
                        this.unUsedFinished = true
                    });
                }
            },
            getHistory(){
                if(!this.loading && !this.usedFinished){
                    this.loading = true
                    this.$store.dispatch('getCouponsHistory',this.usedSkip).then(res => {
                        this.loading = false
                        this.usedFinished = res.length < 20
                        this.usedSkip += 20
                    });
                }
            },
            scrollHandle(evt){
                evt.preventDefault()
                let [scrollTop, documentHeight, windowHeight] = [
                    document.documentElement.scrollTop || document.body.scrollTop,
                    document.body.clientHeight,
                    window.screen.height
                ]


                if (scrollTop + windowHeight >= documentHeight - 100) {
                    if (this.showType == 1 && !this.loading && !this.usedFinished) {
                        this.getHistory()
                    }
                }
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

    .couponAmount{
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        margin-right: 10px;
        white-space: nowrap;
        font-family: 'ACUMINPRO-BOLD';
        font-size: 26px;
        line-height: 31px;
        text-transform: uppercase;
    }

    .couponMainInfo{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 120px;
        border-bottom: 1px solid #fff;
        padding: 16px 0px 8px 20px;

        // & > div:last-child{
        //     width: 70px;
        //     text-align: right;
        //     position:relative;
        //     right: 27px;
        // }
    }
    .dateInfo{
        padding: 4px 20px;
        font-family: 'SLATEPRO';
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #999999;

        & > li{
            position: relative;
            top: -2px;
        }
    }

    .description{
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        line-height: 20px;
        font-size: 16px;
    }
    
    .dot{
        vertical-align: super;
        position: relative;
        top: 2px;
    }

    .coupons{
        .coupon{
            width: 435px;
            height: 177px;
            // border: solid 1px #e6e6e6;
            float: left;
            margin-bottom: 20px;
            position: relative;
            .fl-l{
                width: 69%;
                float: left;
                padding-top: 20px;
                padding-left: 20px;
                i{
                    position: absolute;
                    right: 140px;
                    bottom: 0px;
                    font-size: 80px;
                    color: #e6e6e6;
                }
            }
            .fl-r{
                float: right;
                background-color: #f46e6d;
                width: 31%;
                height: 100%;
                background: radial-gradient(transparent 0, transparent 4px, #f46e6d 4px);
                background-size: 15px 14px;
                background-position: 8px 0px;
                padding-left: 5px;
                .bg{
                    width: 100%;
                    height: 100%;
                    padding: 48px 20px;
                    background-color: #f46e6d;
                    .usenow{
                        border: 1px solid #ffffff;
                        border-radius: 20px;
                        color: white;
                        text-align: center;
                        cursor: pointer;
                        line-height: 26px;
                    }
                    .unabled{
                        color: rgba(255,255,255,.5);
                        border: 1px solid rgba(255,255,255,.5);
                        cursor: not-allowed;
                    }
                }
            }
            &:nth-child(n){
                margin-right: 20px;
            }
            .amount{
                color: #E64545;
                font-size: 28px;
                line-height: 30px;
                font-weight: bold;
                span{
                    font-size: 18px;
                    font-weight: normal;
                }
            }
            .name{
                font-size: 16px;
                color: #222;
                margin: 6px 0;
            }
            .time{
                font-size: 14px;
                color: #666;
            }
        }

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

    .tabBox{
        margin-bottom: 12px;
        & > .tabItem{
            font-family: ACUMINPRO-BOLD, Roboto;
            font-weight: bold;
            color: #999999;
            line-height: 19px;
            font-size: 16px;
            display: inline-block;
            margin-right: 56px;
            border-bottom: 2px solid transparent;
            padding: 4px 0;
            cursor: pointer;
        }

        & > .tabItemSelect{
            color: #222;
            border-bottom: 2px solid #222;
        }
    }

    .tipBox{
        font-size: 14px;
        font-family: SlatePro, Roboto;
        font-weight: 400;
        color: #222222;
        line-height: 16px;
        padding: 12px 16px;
        background: #FFF8E1;
        margin-bottom: 20px;
    }

    .emptyIcon{
        width: 100%;
        height: 70vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        flex-direction: column;
        font-size: 18px;
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
        color: #B2B2B2;
        line-height: 21px;

        & >.iconfont{
            font-size: 96px;
            line-height: 96px;
            color: #b2b2b2;
            display: block;
            margin-bottom: 18px;
        }

        .emptyTxt{

        }
    }
</style>