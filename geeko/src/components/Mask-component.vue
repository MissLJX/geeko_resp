<template>
    <div class="mask"></div>
</template>

<script>
    export default {
        name:"MaskComponent"
    }
</script>

<style lang="scss" scoped>
    .mask{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top:0;
        background-color: rgba(0,0,0,0.4);
        z-index: 10;
    }
</style>