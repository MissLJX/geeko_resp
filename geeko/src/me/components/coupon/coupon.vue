<template>
    <div class="el-coupon st-table">
        <div class="el-coupon-info st-cell st-v-m">
            <span class="el-coupon-amount">{{coupontAmount}}</span>
            <span class="el-coupon-name" v-if="coupon.coupon.name">{{coupon.coupon.name}}</span>
            <p class="el-coupon-clearance" v-if="coupon.coupon.description">{{coupon.coupon.description}}</p>
            <p class="el-coupon-date">{{expireDate}}</p>
        </div>

        <div class="st-cell st-v-m st-t-r">
            <!-- <i class="iconfont expired-icon" v-if="isExpried">&#xe748;</i> -->
        </div>
    </div>
</template>

<style scoped lang="scss">
    .el-coupon{
        .el-coupon-info{
            .el-coupon-amount{
                font-family: SlatePro-Medium;
                font-size: 22px;
                color: #ecb85e;
                vertical-align: middle;
            }

            .el-coupon-name{
                font-family: SlatePro;
                font-size: 12px;
                color: #ecb85e;
                border: solid 1px #ecb85e;
                padding: 0px 3px;
                margin-left: 5px;
                display: inline-block;
                height: 17px;
                line-height: 17px;
                vertical-align: middle;
                margin-top: 2px;
            }

            .el-coupon-clearance{
                font-family: SlatePro-Medium;
                font-size: 12px;
                color: #222222;
                // line-height: 25px;
                margin-top: 5px;
            }

            .el-coupon-date{
                font-family: SlatePro;
                font-size: 12px;
                color: #999999;
                margin-top: 5px;
            }      
        }

        .el-coupon-use{
            background-color: #faefd2 !important;
        }

        .expired-icon{
            font-size: 50px;
            color: #cacaca;
        }
    }

    .el-coupon-li{
        .el-coupon{
            .el-coupon-info{
                .el-coupon-amount{
                    color: #cacaca;
                }

                .el-coupon-name{
                    color: #cacaca;
                    border: solid 1px #cacaca;
                }

                .el-coupon-clearance{
                    color: #cacaca;
                }

                .el-coupon-date{
                    color: #cacaca;
                }      
            }

            .el-coupon-use{
                background-color: #cacaca !important;
            }
        }
    }
</style>

<script type="text/ecmascript-6">

    import fecha from 'fecha'
    import Btn from '../../../components/btn.vue'

    import * as utils from '../../../utils/geekoutils.js'

    export default{
        props: {
            coupon: {
                type: Object
            },
            isExpried:{
                type:Boolean,
                default:false
            }
        },
        computed: {
            coupontAmount(){
                /*var amount = this.coupon.coupon.amount
                if (amount && amount.indexOf('%') >= 0) {
                    return amount
                } else {
                    return '$' + amount
                }*/
                if(this.coupon && this.coupon.coupon){
                    return this.coupon.coupon.couponName2
                }
            },
            expireDate(){
                var [beginDate, endDate] = [this.coupon.coupon.beginDate, this.coupon.coupon.endDate]


                if (beginDate && endDate) {
                    return utils.dateFormat(beginDate) + "-" + utils.dateFormat(endDate);
                }

                return ''

            }
        },
        methods: {
            useHandle(){
                this.$store.dispatch('useCoupon', this.coupon.coupon.id).then(() => {
                    window.location.href = window.ctx + '/shoppingcart/show'
                })
            }
        },
        components: {
            'btn': Btn
        }
    }
</script>