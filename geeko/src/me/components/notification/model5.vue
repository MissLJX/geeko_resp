<template>
    <div>
        <div class="st-table st-fullwidth">
            <div class="st-cell st-v-t">
                <p>{{model.description}}</p>
                <div class="el-expire-date">
                    {{expireDate}}
                </div>
            </div>

            <div class="st-cell st-t-r st-v-t">
                <div class="el-coupon-off">
                    <span class="coupon-name">{{model.name}}</span>
                    <span class="coupon-off">off</span>
                </div>
                <span class="el-coupon-code">
                    {{model.code}}
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .el-coupon-off{
        color: #e5004f;
        font-weight: bold;
        .coupon-name{
            font-size: 14px;
        }

        .coupon-off{
            font-size: 12px;
            text-transform: uppercase;
        }
    }

    .el-coupon-code{
        display: block;
        font-size: 12px;
        font-weight: bold;
        margin-top: 5px;
    }

    .el-expire-date{
        font-size: 12px;
        color: #666;
        margin-top: 5px;
    }
</style>

<script type="text/ecmascript-6">
    import fecha from 'fecha'

    export default{
        props: {
            model: {
                type: Object,
                required: true
            }
        },
        computed:{
            expireDate(){
                var [beginDate, endDate] = [this.model.startDate, this.model.endDate]

                if(beginDate && endDate){
                    return fecha.format(new Date(beginDate), 'mediumDate') + ' - ' + fecha.format(new Date(endDate), 'mediumDate')
                }

                return ''

            }
        }
    }
</script>