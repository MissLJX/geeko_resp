<template>
    <div class="el-coupon st-table">
        <div class="x-table __vm x-fw __fixed"
            :style="{background:`url(${isExpired?
                'https://image.geeko.ltd/chicme/20220801/expired_coupon-3.png':
                'https://image.geeko.ltd/chicme/2021-12-17/coupon_available.png'}) no-repeat`,
                'background-size': '100% 100%'}"
            >
            <div class='couponMainInfo'>
                <div class="x-cell" style="height: 100%">
                    <div style="display: flex; align-items: center; justify-content: flex-start">
                        <span class="couponAmount" :style="{'color':`${isExpired?'#666666':'#ff782a'}`}">{{coupontAmount}}</span>
                    </div>
                    
                    <div v-if="coupon.coupon.condition" :style="{ 'margin-top': 4, 'color':`${isExpired?'#666666':'#ff782a'}` }">
                        <span class='description'>{{coupon.coupon.condition}}</span>
                    </div>
                
                    <div v-if="coupon.coupon.description" :style="{ 'margin-top': 4, 'color':`${isExpired?'#666666':'#ff782a'}` }">
                        <span class='description'>{{coupon.coupon.description}}</span>
                    </div>
                    
                    <div v-if="coupon.coupon.infoMsg" :style="{ 'margin-top': 4, 'color':`${isExpired?'#666666':'#ff782a'}` }">
                        <span class='description'>{{coupon.coupon.infoMsg}}</span>
                    </div>
                </div>
                <div class="x-cell expired-cla" v-if="isExpired">
                    {{ $t('point.expired') }}
                </div>
            </div>
            <div class='dateInfo'>
                <li v-if="expireDate">
                    <span class='dot'>.</span>
                    <span class="el-coupon-date">{{expireDate}}</span>
                </li>
                    
                <li v-if="coupon.coupon.usageReminder">
                    <span class='dot'>.</span>
                    <span class="el-coupon-date">{{coupon.coupon.usageReminder}}</span>
                </li>
            </div>

	    </div>
    </div>
</template>

<style scoped lang="scss">
    .el-coupon{

        max-height: 121px;

        .couponAmount{
            margin-right: 10px;
            white-space: nowrap;
            font-family: 'AcuminPro-Bold';
            font-size: 20px;
            line-height: 24px;
            text-transform: uppercase;
        }

        .couponMainInfo{
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            max-height: 93px;
            min-height: 90px;
            border-bottom: 1px solid #fff;
            padding: 13px 15px 5px 15px;

            & > div.expired-cla{
                width: 70px;
                text-align: center;
                position:relative;
                // right: 27px;
                padding: 2px 5px;
                background: #BBBBBB;
            }
        }
        .dateInfo{
            padding: 4px 15px;
            font-size: 12px;
            color: #999999;

            & > li{
                position: relative;
                top: -4px;
            }
        }

        .description{
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
        }
        
        .dot{
            vertical-align: super;
        }
    }
</style>

<script type="text/ecmascript-6">
    import fecha from 'fecha'
    // name，condition，description，infoMsg，日期，usageReminder

    export default{
        props: {
            coupon: {
                type: Object
            },
            isExpired:{
                type:Boolean,
                default:false
            }
        },
        computed: {
            coupontAmount(){
                if(this.coupon && this.coupon.coupon){
                    return this.coupon.coupon.name;
                }
            },
            expireDate(){
                var [beginDate, endDate] = [this.coupon.coupon.beginDate, this.coupon.coupon.endDate];

                if (beginDate && endDate) {
                    return fecha.format(beginDate,"DD/MM/YYYY HH:mm") + "~" + fecha.format(endDate,"DD/MM/YYYY HH:mm");
                }

                return ''

            }
        }
    }
</script>