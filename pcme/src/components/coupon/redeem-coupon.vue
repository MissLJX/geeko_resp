<template>
    <div class="redeem-coupon">
        <div class="_top">
            <div class="_left">
                <p class="name">{{coupon.coupon.name}}</p>
                <p class="description" v-if="coupon.coupon.condition" style="margin-top:5px;">{{coupon.coupon.condition}}</p>
                <p class="description" v-if="coupon.coupon.description">{{coupon.coupon.description}}</p>
                <p class="description" v-if="coupon.coupon.infoMsg">{{coupon.coupon.infoMsg}}</p>
            </div>
            
            <div class="_right">
                xxx {{ $t("point.points") }}
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
                <button>{{ $t("label.redeem") }}</button>
            </div>
        </div>

        <template v-if="index === 0">
            <div class="_redeemed">{{ $t("label.redeemed") }}</div>

            <div class="_redeemed-bg"></div>
        </template>
    </div>
</template>
<script>
    import fecha from 'fecha';

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
            expireDate(){
                var [beginDate, endDate] = [this.coupon.coupon.beginDate, this.coupon.coupon.endDate];

                if (beginDate && endDate) {
                    return fecha.format(beginDate,"DD/MM/YYYY HH:mm") + "~" + fecha.format(endDate,"DD/MM/YYYY HH:mm");
                }

                return ''

            }
        },
        methods:{
            // 确认兑换弹窗
            confirmTheChange(){
                let _this = this;
                this.$store.dispatch('confirmShow', {
                    show: true,
                    cfg: {
                        btnFont:{
                            yes:this.$t("confirm"),
                            no:this.$t("cancel")
                        },
                        message2:this.$t("label.points_check_redeem_text",{point:'200'}),
                        yes: function () {
                            _this.$store.dispatch('closeConfirm').then(() =>{
                            });
                        },
                        no:function(){
                            _this.$store.dispatch('closeConfirm');
                        },
                        style:{
                            box:{
                                padding:"15px 8px 12px",
                                width:"454px"
                            },
                            message2:{
                                color:"#222222",
                                fontSize:"22px",
                                fontFamily: 'SlatePro-Medium',
                            },
                            btnYes:{
                                fontFamily: 'SlatePro-Medium',
                                textTransform: 'uppercase'
                            },
                            btnNo:{
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
                            yes:this.$t("confirm"),
                        },
                        message2:this.$t("label.points_not_enough_text"),
                        yes: function () {
                            _this.$store.dispatch('closeConfirm').then(() =>{
                               
                            });
                        },
                        style:{
                            box:{
                                padding:"15px 8px 12px",
                                width:"454px"
                            },
                            message2:{
                                color:"#222222",
                                fontSize:"22px",
                                fontFamily: 'SlatePro-Medium',
                            },
                            btnYes:{
                                fontFamily: 'SlatePro-Medium',
                                textTransform: 'uppercase',
                                marginTop:"20px"
                            }
                        }
                    }
                })
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
                        message2:`<span class="iconfont" style="color:#ff8031;font-size:90px;">&#xe6b7;</span><br/><br/><p style="font-size:22px;font-family: 'AcuminPro-Bold';">${$t("label.points_redeem_success")}</p>`,
                        htmlMessage2:true,
                        yes: function () {
                            _this.$store.dispatch('closeConfirm').then(() =>{
                               
                            });
                        },
                        style:{
                            box:{
                                padding:"15px 8px 12px",
                                width:"454px"
                            },
                            message2:{
                                color:"#222222",
                                fontSize:"22px",
                                fontFamily: 'SlatePro-Medium',
                            },
                            btnYes:{
                                fontFamily: 'SlatePro-Medium',
                                textTransform: 'uppercase',
                                marginTop:"20px"
                            }
                        }
                    }
                })
            }
        },
        mounted:function(){
            // this.forSuccessEvent();
        }
    }
</script>
<style lang="scss" scoped>
    .redeem-coupon{
        width: 447px;
        margin-bottom: 20px;
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
                    font-size: 26px;
                    color: #ff782a;
                    font-family: 'AcuminPro-Bold';
                }

                .description{
                    font-size: 16px;
                    color: #ff782a;
                }
            }

            ._right{
                font-size: 18px;
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
            min-height: 48px;

            ._left{
                li{
                    font-size: 16px;
                    color: #999999;

                    .dot{
                        position: relative;
                        top: -3px;
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
                    font-size: 16px;
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
            font-family: 'AcuminPro-Bold';
            font-size: 16px;
            color: #ffffff;
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