<template>
    <div class="coupon-item">
            <div class="__vm x-fw __fixed"
                :style="{background: `url(${
                    isExpired ? 
                    'https://image.geeko.ltd/chicme/20220801/expired_coupon.png': 
                    'https://image.geeko.ltd/chicme/2021-12-17/coupon_available.png'
                }) no-repeat` ,
                    'background-size': '100% 100%', 'height':'100%'}"
                >
                <div class='couponMainInfo'>
                    <div class="x-cell" style="height: 100%">
                        <div style="display: flex; align-items: center; justify-content: flex-start">
                            <span class="couponAmount" :style="{'color': `${isExpired?'#666666':'#ff782a'}`}">{{coupon.coupon.name}}</span>
                        </div>
                        
                        <div v-if="coupon.coupon.condition" :style="{ 'margin-top': 6, 'color': `${isExpired?'#666666':'#ff782a'}` }">
                            <span class='description'>{{coupon.coupon.condition}}</span>
                        </div>
                    
                        <div v-if="coupon.coupon.description" :style="{ 'margin-top': 6, 'color': `${isExpired?'#666666':'#ff782a'}` }">
                            <span class='description'>{{coupon.coupon.description}}</span>
                        </div>

                        <div v-if="coupon.coupon.infoMsg" :style="{ 'margin-top': 6, 'color': `${isExpired?'#666666':'#ff782a'}` }">
                            <span class='description'>{{coupon.coupon.infoMsg}}</span>
                        </div>
                    </div>

                    <div class="x-cell expired-cla" v-if="isExpired">
                        {{ $t("point.expired") }}
                    </div>
                </div>
                <div class='dateInfo'>
                    <li v-if="expireDate(coupon.coupon)">
                        <span class='dot'>.</span>
                        <span class="el-coupon-date">{{expireDate(coupon.coupon)}}</span>
                    </li>
                        
                    <li v-if="coupon.coupon.usageReminder">
                        <span class='dot'>.</span>
                        <span class="el-coupon-date">{{coupon.coupon.usageReminder}}</span>
                    </li>
                </div>
            </div>
        </div>
</template>

<script>
    import fecha from 'fecha'

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
            }
        },
        mounted(){
        },
        methods:{
            expireDate(item){
                var [beginDate, endDate] = [item.beginDate, item.endDate]


                if (beginDate && endDate) {
                    return fecha.format(beginDate,"DD/MM/YYYY HH:mm") + "~" + fecha.format(endDate,"DD/MM/YYYY HH:mm");
                }

                return ''

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