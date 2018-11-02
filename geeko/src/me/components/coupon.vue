<template>
    <div class="el-coupon st-table">
        <div class="el-coupon-info st-cell st-v-m">
            <div><span class="el-coupon-amount st-fc-r">{{coupontAmount}}</span><!-- <span
                    class="st-fc-r el-coupon-off">Off</span> <span class="el-coupon-code">{{coupon.coupon.code}}</span>-->
            </div>
            <div class="el-coupon-name">{{coupon.coupon.name}}</div>
            <div class="el-coupon-date">{{expireDate}}</div>
        </div>

        <div class="st-cell st-v-m st-t-r">
            <btn @click.native="useHandle" class="el-coupon-use" v-if="coupon.isAvailable">Use</btn>
            <btn class="el-coupon-use dis" v-else>Use</btn>
        </div>
    </div>
</template>

<style scoped lang="scss">

    .el-coupon {
        .el-coupon-amount {
            font-size: 20px;
        }

        .el-coupon-off {
            font-size: 16px;
            text-transform: uppercase;
        }

        .el-coupon-code {
            font-size: 14px;
            font-weight: bold;
            margin-left: 15px;
        }

        .el-coupon-name {
            font-size: 12px;
        }

        .el-coupon-date {
            font-size: 12px;
            color: #666;
        }

        & > .el-coupon-info > div {
            margin-top: 5px;
        }

        .el-coupon-use {
            width: 60px;
        }
    }


</style>

<script type="text/ecmascript-6">

    import fecha from 'fecha'
    import Btn from '../../components/btn.vue'

    export default{
        props: {
            coupon: {
                type: Object
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
                    return fecha.format(new Date(beginDate), 'mediumDate') + '-' + fecha.format(new Date(endDate), 'mediumDate')
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