<template>
    <div class="coupon-box">
        <div class="coupon-item" v-if="!isShareCoupon">
            <div class="__vm x-fw __fixed"
                :style="{background: `url(${
                    isExpired ?
                    'https://image.geeko.ltd/chicme/20220801/expired_coupon-3.png': 
                    'https://image.geeko.ltd/chicme/2021-12-17/coupon_available.png'
                }) no-repeat` ,
                    'background-size': '100% 100%', 'height':'100%'}"
                >
                <div class='couponMainInfo'>
                    <div class="x-cell" style="height: 100%">
                        <div style="display: flex; align-items: center; justify-content: flex-start">
                            <span class="couponAmount" :style="{'color': `${isExpired?'#666666':'#ff782a'}`}">{{coupontAmount}}</span>
                        </div>

                        <div v-if="displayCoupon.condition" :style="{ 'margin-top': 6, 'color': `${isExpired?'#666666':'#ff782a'}` }">
                            <span class='description'>{{displayCoupon.condition}}</span>
                        </div>

                        <div v-if="displayCoupon.description" :style="{ 'margin-top': 6, 'color': `${isExpired?'#666666':'#ff782a'}` }">
                            <span class='description'>{{displayCoupon.description}}</span>
                        </div>

                        <div v-if="displayCoupon.infoMsg" :style="{ 'margin-top': 6, 'color': `${isExpired?'#666666':'#ff782a'}` }">
                            <span class='description'>{{displayCoupon.infoMsg}}</span>
                        </div>
                    </div>

                    <div class="x-cell expired-cla" v-if="isExpired">
                        {{ $t("point.expired") }}
                    </div>
                </div>
                <div class='dateInfo'>
                    <li v-if="expireDate">
                        <span class='dot'>.</span>
                        <span class="el-coupon-date">{{expireDate}}</span>
                    </li>

                    <li v-if="displayCoupon.usageReminder">
                        <span class='dot'>.</span>
                        <span class="el-coupon-date">{{displayCoupon.usageReminder}}</span>
                    </li>
                </div>
            </div>
        </div>
        <div v-else class="GiftCardCoupon" :style="styles" @click="toShare">
            <div class="GiftCardBox">
                <div class="GiftBox">
                    <img :src="giftSrc" alt="" />
                </div>
                <div class="GiftCardInfo">
                    <div class='couponMainInfo'>
                        <div class="x-cell" style="height: 100%">
                            <div style="display: flex; align-items: center; justify-content: flex-start">
                                <span class="couponAmount" :style="{'color': `${isExpired?'#666666':'#ff782a'}`}">{{coupontAmount}}</span>
                            </div>

                            <div v-if="displayCoupon.condition" :style="{ 'margin-top': 6, 'color': `${isExpired?'#666666':'#ff782a'}` }">
                                <span class='description'>{{displayCoupon.condition}}</span>
                            </div>

                            <div v-if="displayCoupon.description" :style="{ 'margin-top': 6, 'color': `${isExpired?'#666666':'#ff782a'}` }">
                                <span class='description'>{{displayCoupon.description}}</span>
                            </div>

                            <div v-if="displayCoupon.infoMsg" :style="{ 'margin-top': 6, 'color': `${isExpired?'#666666':'#ff782a'}` }">
                                <span class='description'>{{displayCoupon.infoMsg}}</span>
                            </div>

                            <div class="ShareBtn">
                                {{ $t("share") }}
                            </div>

                            <div v-if="expireDate" class="expireDate">
                                <span class='dot'>.</span>
                                <span class="el-coupon-date">{{expireDate}}</span>
                            </div>

                            <div v-if="displayCoupon.usageReminder" class="useReminder">
                                <span class='dot'>.</span>
                                <span class="el-coupon-date">{{displayCoupon.usageReminder}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import fecha from 'fecha'
    import {couponName} from '../../utils/geekoutil'
    import data from '../../common'

    export default {
        name:"Coupon",
        props:{
            coupon:{
                type:Object,
                required:true
            },
            isExpired:{
                type:Boolean,
                default:false
            },
            styles:{
                type: Object,
                required:false
            }
        },
        mounted(){
        },
        computed:{
            displayCoupon(){
                return this.coupon.coupon || this.coupon
            },
            coupontAmount(){
                return couponName(this.displayCoupon.name)
            },
            expireDate(){
                var [beginDate, endDate] = [this.displayCoupon.beginDate, this.displayCoupon.endDate];

                if (beginDate && endDate) {
                    return fecha.format(beginDate,"DD/MM/YYYY HH:mm") + "~" + fecha.format(endDate,"DD/MM/YYYY HH:mm");
                }

                return ''
            },
            giftSrc(){
                return data.IMAGE_GEEKO_LTD + '/chicme/20230413/gift.png'
            },
            isShareCoupon(){
                return this.displayCoupon?.giftCard
            }
        },
        methods:{
            shareCoupon() {
                // 
                
            },
            toShare(){
                this.$emit("showShareCoupon", {couponMouldId:this.displayCoupon?.couponMouldId, couponId:this.displayCoupon?.id})
            }
        }
    }
</script>

<style scoped lang="scss">
    .coupon-item{
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

    .GiftCardCoupon{
        width: 435px;
        height: 177px;
        // border: solid 1px #e6e6e6;
        float: left;
        margin-right: 20px;
        margin-bottom: 20px;
        position: relative;
        background: #F6B1A5;
        // box-shadow: 0px 2px 10px 0px #FF782A;
        border-radius: 8px;
        padding: 5px;
        cursor: pointer;

        .GiftCardBox{
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-radius: 12px;
            background-color: #FFF6F3;
            position: relative;
            height: 100%;

            &::after{
                content: '';
                display: block;
                position: absolute;
                left: 0;
                top: 0;
                width: 150px;
                background-image: url(https://image.geeko.ltd/chicme/20230413/cou.png);
                background-size: 100% 100%;
                background-repeat: no-repeat;
                // border: 1px solid green;
                height: 100%;
                z-index: 0;
            }

            .GiftCardInfo{
                height: 100%;
                flex:1;
                width: 285px;
            }

            .GiftBox{
                width: 150px;
                height: 100%;
                padding-right: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1;

                img{
                    width: 100px;
                    height: auto;
                }
            }

            .couponMainInfo{
                height: 100%;
                border-bottom: none;
                text-align: center;
                padding: 0;
                justify-content: center;

                & > div:first-child{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
            }

            .ShareBtn{
                min-width: 100px;
                max-width: 200px;
                height: 22px;
                background: #FF8533;
                border-radius: 11px;
                color: #fff;
                text-align: center;
                line-height: 22px;
                font-size: 16px;
                margin: 5px;
            }

            .couponAmount{
                white-space: pre-line;
            }

            .expireDate, .useReminder{
                font-size: 14px;
                color: #999;
                font-family: Roboto-Regular, Roboto;
            }
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
        align-items: flex-start;
        justify-content: space-between;
        height: 120px;
        border-bottom: 1px solid #fff;
        padding: 16px 20px 8px 20px;

        & > div.expired-cla{
            text-align: center;
            position:relative;
            background: #BBBBBB;
            padding: 5px 29px;
            color: #444444;
        }

        & > div.share{
            text-align: center;
            position:relative;
            // padding: 5px 29px;
            min-width: 71px;
            height: 19px;
            background: #FF8533;
            border-radius: 10px;
            color: #fff;
            cursor: pointer;
        }
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
</style>