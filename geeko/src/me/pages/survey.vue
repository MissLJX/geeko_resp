<template>
    <div class="survey">
        <nav-bar>
            <i class="iconfont el-back-font" slot="left" @click="$router.go(-1);">&#xe693;</i>
            <span slot="center">Surevy</span>
        </nav-bar>

        <div class="empty-container">
            <div class="_hd">
                <span class="iconfont">&#xe6d4;</span>
            </div>

            <p class="_title">Sorry, it’s empty here now.</p>
        </div>
    </div>
</template>

<script>
    import NavBar from '../components/nav-bar.vue'
    export default {
        name:"Survey",
        data(){
            return {
                emptyShow:false
            }
        },
        components:{
            'nav-bar':NavBar,
        },
        methods:{
            // backToPage:function(){

            // }
        }
    }
</script>

<style lang="scss" scoped>
    .survey{
        .empty-container{
            text-align: center;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 5;

            ._hd{
                & .iconfont{
                    font-size: 50px;
                    color: #999999;
                }
            }

            ._title{
                font-size: 12px;
                color: #999999;
                margin-top: 5px;
            }
        }
    }
</style>