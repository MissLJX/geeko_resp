<template>
    <div class="el-body">
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<style scoped>
    .el-body{
        font-size: 14px;
    }
</style>

<script type="text/ecmascript-6">
    export default{}
</script>