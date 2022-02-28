<template>
    <div class="el-body" :style="getContainerBackground">
        <router-view></router-view>

        <loding v-show="paging"></loding>

        <!-- modals -->
        <transition name="fade-alert">
            <modal-confirm v-if="modalconfirmshow" :cfg="confirmCfg" />
        </transition>

        <div class="mask" v-if="modalconfirmshow"></div>
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

    .fade-alert-enter{
        width: calc(80% - 20px);
        opacity: 0;
        top: calc(50% + 20px);
    }

    .fade-alert-enter-active{
        transition: all .1s linear;
    }

    .fade-alert-leave-active{
        opacity: 0;
        width: calc(80% - 20px);
        top: calc(50% + 20px);
        transition: all .1s linear;
    }

    .mask{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top:0;
        background-color: rgba(0,0,0,0.4);
        z-index: 200;
        display: block;
    }
</style>

<script type="text/ecmascript-6">
    import loding from "./components/loding.vue"
    import * as utils from "./utils/geekoutil.js"
    import ModalConfirm from "./components/modal-confirm.vue"

    export default {
        mounted(){
            // window.closeLoading()
        },
        components:{
            loding,
            "modal-confirm":ModalConfirm,
        },
        computed:{
            paging(){
                return this.$store.getters.paging
            },
            getContainerBackground(){
                return this.$route.path === utils.PROJECT + "/me/m" || this.$route.path === utils.PROJECT + "/me/m/" ? {backgroundColor:"#f7f7f7"} : {backgroundColor:"#ffffff"}
            },
            modalconfirmshow(){
                return this.$store.getters.modalconfirmshow;
            },
            confirmCfg(){
                return this.$store.getters.confirmCfg;
            },
        }
    }
</script>
