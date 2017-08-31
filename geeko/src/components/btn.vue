<template>
    <button class="el-btn">
        <slot></slot>
    </button>
</template>

<style scoped lang="scss">
    .el-btn{
        border:1px solid #000;
        display: inline-block;
        padding: 4px 5px;
        outline: none;
        box-shadow: none;
        background-color: transparent;
        cursor: pointer;

        &.fill{
            background-color: #000;
            color: #fff;
        }

        &.dis{
            background-color: #dcdcdc;
            color: #666;
            cursor: default;
            border-color: #dcdcdc;
        }

    }
</style>

<script type="text/ecmascript-6">
    export default{}
</script>