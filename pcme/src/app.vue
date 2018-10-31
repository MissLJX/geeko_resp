<template>
    <div class="el-body">
        <router-view></router-view>
    </div>
</template>

<style scoped lang="scss">
    .el-body {
        margin-bottom: 50px;
        min-height: 300px;
        h1{
            font-size: 15px;
        }
        font-size: 14px;
    }
</style>

<script type="text/ecmascript-6">
    export default {
        mounted(){
            window.closeLoading()
        }
    }
</script>
