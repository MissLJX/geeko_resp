<template>
    <div class="st-table el-credit" >
        <div class="st-cell st-v-m el-credit-right">
            <p>{{credit.eventName}}</p>
            <p>{{createTime}}</p>
        </div>
        <div class="st-cell st-v-m st-t-r">
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
            color: #220000;
        }
        .el-point-plus {
            color: #999999;
        }

        .el-credit-right{
            & > p:first-child{
                // font-family: 'SlatePro-Medium';
                font-size: 16px;
                color: #222222;
            }

            & > p:last-child{
                font-size: 12px;
                color: #999999;
                line-height: 20px;
            }
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
                return fecha.format(new Date(this.credit.createTime), 'mediumDate')
            },
            points(){
                return this.credit.points > 0 ? '+' + this.credit.points : this.credit.points
            },
        }
    }
</script>