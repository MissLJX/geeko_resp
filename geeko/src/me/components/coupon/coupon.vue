<template>
    <div>
        <div class="el-coupon">
            <div class="el-coupon-info">
                <span class="el-coupon-amount">{{coupontAmount}}</span>
                <p class="el-coupon-name" v-if="coupon.coupon.name">{{coupon.coupon.name}}</p>
                <p class="el-coupon-clearance" v-if="coupon.coupon.description">{{coupon.coupon.description}}</p>
            </div>
        </div>
        
        <ul class="el-coupon el-coupon-ul">
            <li class="el-coupon-date">{{expireDate}}</li>
            <li class="el-coupon-date">Not vaild on clearance sale</li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
    .el-coupon{
        position: relative;
        background-color: #ffeadb;
        padding: 10px 5px;

        &::after{
            content: '';
            position: absolute;
            width: 10px;
            height: 100%;
            top: 0;
            bottom: 0;
            right: -10px;
            background: radial-gradient(10px 9px ellipse at right, transparent 5px, #ffeadb 0px);
            background-size: 10px 16px
            
        }

        &::before{
            content: '';
            position: absolute;
            width: 10px;
            height: 100%;
            top: 0;
            bottom: 0;
            left: -10px;
            background: radial-gradient(10px 9px ellipse at left, transparent 5px, #ffeadb 0px);
            background-size: 10px 16px;
            
        }

        .el-coupon-amount{
            font-family: 'AcuminPro-Bold';
            font-size: 20px;
            color: #ff782a;
            text-transform: uppercase;
        }

        .el-coupon-name{
            font-size: 12px;
            margin-top: 5px;
            color: #ff782a;
        }

        .el-coupon-clearance{
            font-size: 12px;
            color: #222222;
            margin-top: 5px;
            color: #ff782a;
        }

        .el-coupon-date{
            font-family: SlatePro;
            font-size: 12px;
            color: #999999;
            margin-top: 5px;
        }     

        .el-coupon-use{
            background-color: #faefd2 !important;
        }

        .expired-icon{
            font-size: 50px;
            color: #cacaca;
        }
    }

    .el-coupon-ul{
        margin-top: 2px;
        padding: 7px 5px;

        & > li{
            position: relative;
            padding-left: 5px;

            &::before{
                content: "";
                position: absolute;
                left: 0px;
                top: 50%;
                -webkit-transform: translateY(-50%);
                    -ms-transform: translateY(-50%);
                        transform: translateY(-50%);
                width: 2px;
                height: 2px;
                background-color: #999999;
                border-radius: 50%;
            }
        }
    }

    // .el-coupon-li{
    //     .el-coupon{
    //         .el-coupon-info{
    //             .el-coupon-amount{
    //                 color: #cacaca;
    //             }
    //             .el-coupon-clearance{
    //                 color: #cacaca;
    //             }

    //             .el-coupon-date{
    //                 color: #cacaca;
    //             }      
    //         }

    //         .el-coupon-use{
    //             background-color: #cacaca !important;
    //         }
    //     }
    // }
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
                    return fecha.format(beginDate,"DD/MM/YYYY HH:mm") + "~" + fecha.format(endDate,"DD/MM/YYYY HH:mm");
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