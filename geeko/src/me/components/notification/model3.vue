<template>
    <div class="el-model-3-content" v-html="model.content"></div>
</template>

<style scoped lang="scss">
    .el-model-3-content{
        line-height: 20px;
        font-size: 12px;
    }
</style>

<script type="text/ecmascript-6">
    export default{
        props: {
            model: {
                type: Object,
                required: true
            }
        }
    }
</script>