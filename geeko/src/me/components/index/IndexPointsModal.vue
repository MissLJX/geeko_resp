<template>
    <div class="index-points-modal">
        <transition name="fade">
            <div class="points_message" v-if="isShowMessage">
                <!-- Vue-i18n  组件插值语法 -->
                <!-- <i18n path="index.the_countdown_begins" tag="span" for="index.the_countdown_begins_discount">
                    <span class="_font">{{ $t('index.the_countdown_begins_discount') }}</span>
                </i18n> -->
                <!-- <span>The countdown begins. <span class="_font">100 points = US$2.</span> Grab it or regret it! </span> -->
                <span v-html="this.indexMessage"></span>
            </div>
        </transition>
    </div>
</template>

<script>
    import Cache from "../../../utils/cache.js"
    export default {
        name:"IndexPointsModal",
        data(){
            return {
                isShowMessage:false
            }
        },
        props:{
            indexMessage:{
                type:String,
                default:""
            }
        },
        mounted:function(){
            let cacheName = "index_points_message";
            let index_point = Cache.get(cacheName);
            
            if(!index_point && this.indexMessage){
                this.isShowMessage = true;
                Cache.set(cacheName,true);
                setTimeout(() => {
                    this.isShowMessage = false;
                },3000);
            }
        }
    }
</script>

<style scoped lang="scss">
    .points_message{
        background-color: #ffffff;
        width:60%;
        padding: 15px 10px;
        position: relative;
        -os-box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.3);
        -ms-box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.3);
        box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.3);
        position: absolute;
        left: 12px;
        top: 50px;
        z-index: 3;
        color: #222222;
        font-size: 12px;
        font-family: 'AcuminPro-Bold';
        text-align: center;
        color: #222222;
        border-radius: 2px;

        &::after{
            content: ' ';
            position: absolute;
            width: 10px;
            height: 10px;
            left:55%;
            top: -5px;
            background-color: #ffffff;
            transform:rotate(315deg);
            -moz-transform:rotate(315deg); 	/* Firefox */
            -webkit-transform:rotate(315deg); /* Safari 和 Chrome */
            box-shadow: 0px 0px 0px 0 transparent, 0 0px 0px 0px transparent, 0 0 0 0 transparent, 1px -1px 2px -1px rgba(0,0,0,0.25);
        }

        ._font{
            color: #e64545;
            font-size: 12px;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>