<template>
    <div class="st-table">
<!--        <div class="st-cell st-v-m el-touch-icon">
            <slot class="icon" name="icon"></slot>
        </div>-->
        <div class="st-cell st-v-m el-touch-go-label1">
            <slot name="icon"></slot>
            <span class="_font">{{label1}}</span>
        </div>
        <div class="st-cell st-v-m st-t-r">
            <span v-if="label2" :style="label2Style" class="el-touch-go-label2">{{label2}}</span>
            <i class="iconfont el-go">&#xe694;</i>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .st-table{
        width: 100%;
        height: 50px;
    }
    .el-go{
        font-size: 17px;
        color: #999999;
        vertical-align: middle;
    }

    .el-touch-go-label1{    
        ._font{
            font-size: 14px;
            color: #222222;
            margin-left: 3px;
            text-transform: capitalize;
        }

        _icon{
            font-size: 17px;
            color: #121314;
        }
    }

    .el-touch-go-label2{
        font-size: 12px;
    }

    .el-touch-icon{
        width: 35px;
        i{
            font-size: 14px;

        }
    }
</style>

<script type="text/ecmascript-6">
    export default{
        props:[
            'label1',
            'label2',
            'label2Style'
        ]
    }
</script>
