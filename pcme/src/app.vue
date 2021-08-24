<template>
    <div class="el-body" :style="getContainerBackground">
        <router-view></router-view>

        <loding v-show="paging"></loding>
    </div>
</template>

<style scoped lang="scss">
    .el-body {
        padding-bottom: 50px;
        min-height: 300px;
        h1{
            font-size: 15px;
        }
        font-size: 14px;
    }
</style>

<script type="text/ecmascript-6">
    import loding from "./components/loding.vue"
    import * as utils from "./utils/geekoutil.js"

    export default {
        mounted(){
            // window.closeLoading()
        },
        components:{
            loding
        },
        computed:{
            paging(){
                return this.$store.getters.paging
            },
            getContainerBackground(){
                return this.$route.path === utils.PROJECT + "/me/m" ? {backgroundColor:"#f7f7f7"} : {backgroundColor:"#ffffff"}
            }
        }
    }
</script>
