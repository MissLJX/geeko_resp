<template>
    <div class="el-body">
        <!-- 路由切换进度条 -->
        <div class="st-header" id="vue-header">
            <div id="progress" >
                <span :class="{processing: paging}"></span>
            </div>
        </div>
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <div class="el-index-container">
            <div class="el-index-bg">
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive"></router-view>
                <i v-if="screenLoading" class="iconfont st-screen-loading">
                    &#xe62d;
                </i>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .el-body {
        font-size: 14px;
    }

    #vue-header{
        width: 100%;
        left: 0;
        position: relative;
    }

    #progress {
        height: 1px;
        width: 100%;
        position: fixed;
        left: 0px;
        top: 0px;
        span {
            width: 0;
            display: block;
            background-color: blue;
            box-shadow: blue 1px 0 2px 1px;
            opacity: 0;

            &.processing {
                animation: processing 1s forwards;
            }
        }
    }

    .el-index-container{
        padding-bottom: 51px;
    }

    .el-index-bg{
        background-color: #ffffff;
    }

    @keyframes processing {
        0% {
            opacity: 1;
            width: 0;
        }

        100% {
            width: 90%;
            opacity: 1;
        }
    }
</style>

<script type="text/ecmascript-6">


    export default{
        computed:{
            paging(){
                return this.$store.getters.paging
            },
            screenLoading(){
                return this.$store.getters.screenLoading
            }
        }
    }
</script>