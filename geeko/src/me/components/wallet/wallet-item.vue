<template>
    <div class="wallet-item">
        <div class="st-table el-credit">
            <div class="st-cell st-v-m el-credit-left">
                <p>{{createTime}}</p>
            </div>
            <div class="st-cell st-v-m el-credit-center">
                <p>{{credit.name}}</p>

                <p>{{ walletType }}</p>
            </div>
            <div class="st-cell st-v-m el-credit-right">
                <span :class="['el-point', !credit.positive ? 'el-point-plus':'']">{{ walletPrice }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .wallet-item{
        padding: 12px 12px;
        border-top: 1px solid #f2f2f2;
    }

    .el-credit {
        font-size: 12px;
        color: #666;
        width: 100%;

        .el-point {
            font-size: 12px;
            color: #198055;
            font-family: 'AcuminPro-Bold';
        }
        .el-point-plus {
            color: #222222;
        }

        .el-credit-left{
            font-size: 12px;
            color: #999999;
            width: 70px;
            text-align: left;
        }

        .el-credit-center{
            font-size: 12px;
            text-align: center;

            & > p:first-child{
                color: #222222;
                font-size: 14px;
            }

            & > p:last-child{
                color: #999999;
            }
        }

        .el-credit-right{
            text-align: right;
        }
    }

</style>

<script type="text/ecmascript-6">
    import fecha from 'fecha'
    import { unitprice } from "../../../utils/geekoutils"

    export default{
        props: {
            credit: {
                type: Object,
                required: true
            }
        },
        computed: {
            createTime(){
                return fecha.format(new Date(this.credit.createTime), 'MMM.DD.YYYY HH:mm:ss')
            },
            walletPrice(){
                return `${this.credit.positive?"+":"-"}${unitprice(this.credit?.amount)}`;
            },
            walletType(){
                let wallet = this.credit;
                if(wallet.targetId){
                    return `Order # ${wallet.targetId}`
                }
                if(wallet.expired){
                    return "Expired"
                }else{
                    if(wallet.expiredDate){
                        return `Expired on:${this.getExpiredDate(wallet.expiredDate)}`;
                    }else{
                        return "Earned"
                    }
                }
            }
        },
        methods:{
            getExpiredDate(time){
                if(time == null){
                    return ''
                }
                return fecha.format(new Date(parseInt(time)), 'MM/DD/YYYY HH:mm:ss')
            }
        }
    }
</script>