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

        <!-- modals -->
        <transition name="fade-alert">
            <modal-confirm v-if="modalconfirmshow" :cfg="confirmCfg" />
        </transition>

        <div class="mask" v-if="modalconfirmshow"></div>

        <transition name="add-cart">
            <add-to-cart-modal v-if="addToCartModalShow"></add-to-cart-modal>
        </transition>

        <div class="mask" v-if="addToCartModalShow" @click="modalHide"></div>

        <loading v-if="loadingShow"></loading>
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
        z-index: 99;
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

    .add-cart-enter-active, .add-cart-leave-to{
        bottom:0 !important;
    }

    .add-cart-enter-active , .add-cart-leave-active{
        transition: bottom .5s !important;
    }

    .add-cart-leave-active , .add-cart-enter{
        bottom:-100% !important;
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
    import ModalConfirm from "./components/modal-confirm.vue"
    import addToCartModal from "./components/addToCart/AddToCartModal.vue"

    export default{
        computed:{
            paging(){
                return this.$store.getters.paging
            },
            screenLoading(){
                return this.$store.getters.screenLoading
            },
            modalconfirmshow(){
                return this.$store.getters.modalconfirmshow
            },
            confirmCfg(){
                return this.$store.getters.confirmCfg
            },
            addToCartModalShow(){
                return this.$store.getters.addToCartModalShow
            },
            loadingShow(){
                return this.$store.getters.globalLoadingShow;
            }
        },
        components:{
            "modal-confirm":ModalConfirm,
            "add-to-cart-modal":addToCartModal
        },
        methods:{
            modalHide(){
                this.$store.dispatch("addToCartIsShow",false);
                this.$store.dispatch("setIsPointsProduct", false);
            }
        }
    }
</script>