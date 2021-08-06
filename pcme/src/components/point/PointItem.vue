<template>
    <div class="point">
        <div class="tbl">
            <div class="tbl-cell createTime">{{getDate(points.createTime)}}</div>
            <div class="tbl-cell c-name">{{points.name}}</div>
            <div class="tbl-cell c-points" :class="{'el-point-plus':points.points < 0 || isExpired}">{{getPoints(points.points)}}</div>
            <div class="tbl-cell c-expired">
                <span v-if="points.expiredDate">{{getExpiredDate(points.expiredDate)}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import fecha from 'fecha'

    export default {
        name:"PointItem",
        props:{
            points:{
                type:Object
            },
            isExpired:false
        },
        methods:{
            getDate(time){
                if(time == null){
                    return ''
                }
                return fecha.format(new Date(parseInt(time)), 'MMM.DD.YYYY HH:mm:ss')
            },
            getExpiredDate(time){
                if(time == null){
                    return ''
                }
                return fecha.format(new Date(parseInt(time)), 'MM/DD/YYYY HH:mm:ss')
            },
            getPoints(points){
                return points > 0 ? '+' + points : points;
            }
        }
    }
</script>

<style scoped lang="scss">
    .createTime{
        padding: 5px 0 5px 0px;
        font-size: 14px;
        color: #222222;
        text-align: left;
    }

    .c-name{
        text-align: left;
    }
    .c-points{
        width: 180px;
        color: #E64545;
    }

    .c-expired{
        font-size: 14px;
        color: #222222;
    }

    .tbl{
        width: 100%;
        display: table;
    }
    .tbl-cell{
        display: table-cell;
        text-align: center;
        width: 25%;
    }

    .el-point-plus{
        color: #999;;
    }
</style>