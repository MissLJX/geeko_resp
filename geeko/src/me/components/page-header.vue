<template>
    <div class="el-page-header">
        <i class="iconfont el-back-font" @click="$router.go(-1)">&#xe693;</i>
        <div class="el-header-title"><slot></slot></div>
        <div class="el-header-oplabel"><slot name="oplabel"></slot></div>
    </div>
</template>

<style scoped lang="scss">
    .el-page-header{
        background-color: #fff;
        position: relative;
        .el-header-title{
            font-size: 16px;
            text-align: center;
            height: 50px;
            line-height: 50px;
            font-weight: bold;
            text-transform: capitalize;
        }

        .el-back-font{
            cursor: pointer;
            position: absolute;
            left: 10px;
            font-size: 20px;
            top: 14px;
        }

        .el-header-oplabel{
            position: absolute;
            right: 10px;
            top: 16px;
            font-size: 14px;
        }

        height: 50px;
        border-bottom: 1px solid #dcdcdc;
    }
</style>

<script type="text/ecmascript-6">
    export default{
        methods:{

        }
    }
</script>