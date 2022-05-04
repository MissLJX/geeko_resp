<template>
    <li class="vip-faq-items" v-if="Object.keys(item).length > 0">
        <div class="title" @click="showContent=!showContent">
            <span class="iconfont jt-icon" :class="showContent?'active':''">&#xe71c;</span>
            <span class="_font">{{item.title}}</span>
        </div>
        <div class="content" v-if="showContent">
            <span>{{item.content}}</span>
        </div>
    </li>
</template>

<script>
    export default {
        name:"VipFaqItems",
        data(){
            return {
                showContent:false
            }
        },
        props:{
            item:{
                type:Object,
                default:function(){
                    return {}
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .vip-faq-items{
        margin-top: 12px;

        .title{
            ._font{
                font-size: 12px;
                color: #222222;
            }

            .jt-icon{
                font-size: 12px;
                display: inline-block;
                transition: -webkit-transform .5s;
                transition: transform .5s;
                transition: transform .5s,-webkit-transform .5s;
                -webkit-transform: rotate(-90deg);
                transform: rotate(-90deg);

                &.active{
                   -webkit-transform: rotate(0deg);
                    transform: rotate(0deg); 
                }
            }
        }

        .content{
            padding-left: 20px;
            font-size: 12px;
            color: #444444;
            margin-top: 5px;
        }
    }
</style>