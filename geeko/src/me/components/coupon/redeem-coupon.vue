<template id="redeem-coupon">
    <div class="redeem-coupon">
        <div class="_top">
            <div class="_left">
                <p class="name">{{coupontAmount}}</p>
                <p class="description" v-if="coupon.coupon.condition" style="margin-top:5px;">{{coupon.coupon.condition}}</p>
                <p class="description" v-if="coupon.coupon.description">{{coupon.coupon.description}}</p>
                <p class="description" v-if="coupon.coupon.infoMsg">{{coupon.coupon.infoMsg}}</p>
            </div>
            
            <div class="_right">
                {{coupon.points}} {{$t("index.points")}}
            </div>
        </div>

        <div class="_bottom">
            <ul class="_left">
                <li v-if="expireDate">
                    <span class="dot">.</span>
                    <span class="el-coupon-date">{{expireDate}}</span>
                </li>
                <li v-if="coupon.coupon.usageReminder">
                    <span class='dot'>.</span>
                    <span class="el-coupon-date">{{coupon.coupon.usageReminder}}</span>
                </li>
            </ul>

            <div class="_right">
                <button @click="() =>redeemCouponEvent()">{{$t("points_mall.points_redeem")}}</button>
            </div>
        </div>

        <template v-if="coupon.status === 1">
            <div class="_redeemed">{{$t("label.redeemed")}}</div>

            <div class="_redeemed-bg"></div>
        </template>
    </div>
</template>
<script>
    import fecha from 'fecha';
    import { mapGetters } from "vuex"
    import { pointsCouponExchange } from "@/me/api/index.js"
    import store from '@/me/store/index'
    import { couponName } from '../../../utils/geekoutils'

    export default {
        name:"RedeemCoupon",
        props: {
            coupon: {
                type: Object,
                required:true
            },
            index:{
                type:Number
            }
        },
        computed:{
            ...mapGetters("me",["me","feed"]),
            coupontAmount(){
                if(this.coupon && this.coupon.coupon){
                    return couponName(this.coupon.coupon.name);
                }
            },
            expireDate(){
                var [beginDate, endDate] = [this.coupon.coupon.beginDate, this.coupon.coupon.endDate];

                if (beginDate && endDate) {
                    return fecha.format(beginDate,"DD/MM/YYYY HH:mm") + "~" + fecha.format(endDate,"DD/MM/YYYY HH:mm");
                }

                return ''

            }
        },
        methods:{
            redeemCouponEvent(){
                let _this = this;
                if(this.coupon.points > this.feed.points){
                    this.lackOfIntegral();
                }else{
                    this.confirmTheChange(this.coupon.points,() =>{
                        _this.$store.dispatch("globalLoadingShow",true);
                        pointsCouponExchange(_this.coupon.id).then((data) =>{
                            if(data && data.code === 200){
                                _this.forSuccessEvent();
                                _this.$store.dispatch("me/changeMeFeedPoints",_this.coupon.points);
                                _this.$emit("changeCoupons",_this.coupon.id);

                                _this.$store.dispatch('me/getCoupons');
                            }
                            _this.$store.dispatch("globalLoadingShow",false);
                        });
                    });
                }
            },
            // 确认兑换弹窗
            confirmTheChange(points,callback){
                let _this = this;
                this.$store.dispatch('confirmShow', {
                    show: true,
                    cfg: {
                        btnFont:{
                            yes:this.$t("points_mall.points_confirm"),
                            no:this.$t("label.cancel")
                        },
                        message2:this.$t("points_mall.points_check_redeem_text",{points}),
                        yes: function () {
                            _this.$store.dispatch('closeConfirm').then(() =>{
                                if(callback) callback();
                            });
                        },
                        no:function(){
                            _this.$store.dispatch('closeConfirm');
                        },
                        style:{
                            box:{
                                padding:"15px 8px 12px",
                                width:"80%"
                            },
                            message:{
                                fontSize:"14px",
                            },
                            message2:{
                                color:"#222222",
                                fontSize:"14px",
                                fontFamily: 'SlatePro-Medium',
                            },
                            btnYes:{
                                fontSize:"14px",
                                fontFamily: 'SlatePro-Medium',
                                textTransform: 'uppercase'
                            },
                            btnNo:{
                                fontSize:"14px",
                                fontFamily: 'SlatePro-Medium',
                                textTransform: 'uppercase'
                            }
                        }
                    }
                })
            },
            // 积分不足提示
            lackOfIntegral(){
                let _this = this;
                this.$store.dispatch('confirmShow', {
                    show: true,
                    cfg: {
                        btnFont:{
                            yes:this.$t("points_mall.points_confirm"),
                        },
                        message2:this.$t("points_mall.points_not_enough_text"),
                        yes: function () {
                            _this.$store.dispatch('closeConfirm').then(() =>{
                               
                            });
                        },
                        style:{
                            box:{
                                padding:"15px 8px 12px",
                                width:"80%"
                            },
                            message2:{
                                color:"#222222",
                                fontSize:"14px",
                                fontFamily: 'SlatePro-Medium',
                            },
                            btnYes:{
                                fontSize:"14px",
                                fontFamily: 'SlatePro-Medium',
                                textTransform: 'uppercase',
                                height: "42px",
                                lineHeight: "42px"
                            }
                        }
                    }
                })

                if(window.GeekoSensors){
                    window.GeekoSensors.Track('ELClick', {
                        is_redeem:"点击Redeem按钮触发",
                        page_sort:"Me",
                        page_content:"Coupons",
                        fail_reason:this.$t("points_mall.points_not_enough_text"),
                        coupon_type:this.coupon.coupon.name
                    })
                }
            },
            // 兑换成功提示
            forSuccessEvent(){
                let _this = this;
                this.$store.dispatch('confirmShow', {
                    show: true,
                    cfg: {
                        btnFont:{
                            yes:this.$t("survey.survey_go_shopping"),
                        },
                        message2:`<span class="iconfont" style="color:#ff8031;font-size:60px;">&#xe6b7;</span><br/><br/><p style="font-size:16px;font-family: 'AcuminPro-Bold';">${this.$t("points_mall.points_redeem_success")}</p><br/>`,
                        htmlMessage2:true,
                        yes: function () {
                            _this.$store.dispatch('closeConfirm').then(() =>{
                               window.location.href = _this.GLOBAL.getUrl(`/`);
                            });
                        },
                        style:{
                            box:{
                                padding:"15px 8px 12px",
                                width:"80%"
                            },
                            message2:{
                                color:"#222222",
                                fontSize:"14px",
                                fontFamily: 'SlatePro-Medium',
                            },
                            btnYes:{
                                fontSize:"14px",
                                fontFamily: 'SlatePro-Medium',
                                textTransform: 'uppercase',
                                height: "42px",
                                lineHeight: "42px"
                            }
                        }
                    }
                })

                if(window.GeekoSensors){
                    window.GeekoSensors.Track('ELClick', {
                        is_redeem:"点击Redeem按钮触发",
                        page_sort:"Me",
                        page_content:"Coupons",
                        is_success:true,
                        coupon_type:this.coupon.coupon.name
                    })
                }
            }
        },
        created(){
            if(!this.feed && this.me.id){
                store.dispatch('me/getFeed', this.me.id);
            }
        },
        mounted:function(){
            // this.forSuccessEvent();
        }
    }
</script>
<style lang="scss" scoped>
    .redeem-coupon{
        position: relative;

        ._top{
            background-image: url(https://image.geeko.ltd/chicme/2022022201/conversion_coupon_top.png);
            background-size: 100% 100%;
            background-repeat: no-repeat;
            height: 100%;
            padding: 13px 5px 5px 15px;

            ._left{
                text-transform: capitalize;
                .name{
                    font-size: 20px;
                    color: #ff782a;
                    font-family: 'AcuminPro-Bold';
                }

                .description{
                    font-size: 12px;
                    color: #ff782a;
                }
            }

            ._right{
                font-size: 14px;
                color: #ffffff;
                font-family: 'AcuminPro-Bold';
            }
        }

        ._bottom{
            background-image: url(https://image.geeko.ltd/chicme/2022022201/conversion_coupon_bottom.png);
            background-size: 100% 100%;
            background-repeat: no-repeat;
            height: 100%;
            border-top: 1px solid #ffffff;
            padding: 5px 5px 5px 15px;

            ._left{
                li{
                    font-size: 12px;
                    color: #999999;

                    .dot{
                        vertical-align: super;
                    }
                }
            }

            ._right{
                button{
                    outline: none;
                    background-image: linear-gradient(180deg, 
                        #fff6ef 0%, 
                        #ffeadb 100%);
                    box-shadow: 0px 2px 13px 0px 
                        rgba(0, 0, 0, 0.12);
                    border-radius: 10px;
                    cursor: pointer;
                    border: none;
                    background-color: transparent;
                    font-size: 12px;
                    color: #ff7d2e;
                    display: inline-block;
                    font-family: 'AcuminPro-Bold';
                    height: 20px;
                    padding: 0px 5px;
                }
            }
        }

        & > div{
            display: flex;
            justify-content: space-between;
            align-items: center;

            ._left{
                width: 71%;
            }

            ._right{
                flex: 1;
                text-align: center;
            } 
        }

        ._redeemed{
            position: absolute;
            top: 0;
            right: 0;
            width: 29%;
            height: 100%;
            background: url(https://image.geeko.ltd/chicme/2022022201/redeemed_coupon_bg.png) 0% 0% / 100% 100% no-repeat;
            justify-content: center;
            z-index: 1;
            color: #ffffff;
            font-size: 12px;
            font-family: 'AcuminPro-Bold';
        }

        ._redeemed-bg{
            position: absolute;
            top: 0;
            right: 0;
            background-color: #ffffff;
            height: 100%;
            width: 20px;
        }
    }
</style>