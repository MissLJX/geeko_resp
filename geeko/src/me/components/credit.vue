<template>
    <div class="st-table el-credit">
        <div class="st-cell st-v-m">
            <p>{{credit.eventName}}</p>
            <p>{{createTime}}</p>
        </div>
        <div class="st-cell st-v-m st-t-r">
            <span :class="{'el-point':true, 'st-fc-r':true, 'el-point-plus':credit.points < 0}">{{points}}</span>
        </div>
    </div>
</template>

<style scoped lang="scss">

    .el-credit {
        font-size: 12px;
        color: #666;
        .el-point {
            font-size: 14px;
        }
        .el-point-plus {
            color: #009E96;
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
            }
        }
    }
</script>