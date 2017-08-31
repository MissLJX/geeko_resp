<template>
    <div class="st-table">
        <div class="st-cell st-v-m el-touch-go-label1">{{label1}}</div>
        <div class="st-cell st-v-m st-t-r">
            <span v-if="label2" class="el-touch-go-label2">{{label2}}</span>
            <i class="iconfont el-go">&#xe694;</i>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .el-go{
        font-size: 20px;
    }

    .el-touch-go-label1{
        font-size: 14px;
    }

    .el-touch-go-label2{
        font-size: 12px;
    }
</style>

<script type="text/ecmascript-6">
    export default{
        props:[
            'label1',
            'label2'
        ]
    }
</script>