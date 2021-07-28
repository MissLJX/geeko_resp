<template>
    <div class="st-table el-credit">
        <div class="st-cell st-v-m el-credit-left">
            <p>{{createTime}}</p>
        </div>
        <div class="st-cell st-v-m el-credit-center">
            <p>{{credit.eventName}}</p>
            <p>Expiration：10/13/2021 18:24:20</p>
        </div>
        <div class="st-cell st-v-m el-credit-right">
            <span :class="{'el-point':true, 'el-point-plus':credit.points < 0}">{{points}}</span>
        </div>
    </div>
</template>

<style scoped lang="scss">

    .el-credit {
        font-size: 12px;
        color: #666;
        .el-point {
            font-size: 14px;
            color: #e64545;
        }
        .el-point-plus {
            color: #999999;
        }

        .el-credit-left{
            font-size: 12px;
            color: #666666;
            width: 80px;
        }

        .el-credit-center{
            font-size: 12px;
            & > p:first-child{
                color: #222222;
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

    export default{
        props: {
            credit: {
                type: Object,
                required: true
            }
        },
        computed: {
            createTime(){
                return fecha.format(new Date(this.credit.createTime), 'MMM.DD.YYYY HH:mm:dss')
            },
            points(){
                return this.credit.points > 0 ? '+' + this.credit.points : this.credit.points
            },
        }
    }
</script>