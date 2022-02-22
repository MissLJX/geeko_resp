<template id="redeem-coupon">
    <div class="redeem-coupon">
        <div class="_top">
            <div class="_left">
                <p class="name">{{coupon.coupon.name}}</p>
                <p class="description" v-if="coupon.coupon.condition" style="margin-top:5px;">{{coupon.coupon.condition}}</p>
                <p class="description" v-if="coupon.coupon.description">{{coupon.coupon.description}}</p>
                <p class="description" v-if="coupon.coupon.infoMsg">{{coupon.coupon.infoMsg}}</p>
            </div>
            
            <div class="_right">
                xxx points
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
                <button>Redeem</button>
            </div>
        </div>
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
        }
    }
</script>
<style lang="scss" scoped>
    .redeem-coupon{
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
            padding: 4px 5px 5px 15px;

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
    }
</style>