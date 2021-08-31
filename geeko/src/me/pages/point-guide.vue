<template>
    <div class="point-policy">
        <nav-bar>
            <i class="iconfont el-back-font" slot="left" @click="$router.go(-1)">&#xe693;</i>
            <span slot="center">{{$t("point.my_points")}}</span>
            <a :href="GLOBAL.getUrl('/fs/points-policy')" slot="right">
                <span class="iconfont" style="font-size:20px;color:#222222;">&#xe73f;</span>
            </a>
        </nav-bar>

        <router-link :to="{name:item.name}" class="item" v-for="(item,index) in list" :key="index+item">
            <p class="hd">
                {{item.title}}
            </p>

            <div class="bd">
                <p class="font" v-for="(item2,index2) in item.content" :key="index2+item2">{{item2}}</p>
            </div>
        </router-link>
    </div>
</template>

<script>
    import NavBar from '../components/nav-bar.vue'
    export default {
        name:"PointGuide",
        data(){
            let list = [
                {
                    title:"Improve your size information  >",
                    content:[
                                "Complete your personal size information and you",
                                "will earn 100 points.",
                                "We will keep the information you fill in strictly",
                                "confidential."
                            ],
                    name:"my-preference"
                },
                {
                    title:"Improve your preference  >",
                    content:[
                                "Complete your personal preference and you will",
                                "earn 100 points.",
                                "We will keep the information you fill in strictly",
                                "confidential."
                            ],
                    name:"my-measurements"
                }
            ];

            return {
                list:list
            }
        },
        components:{
            'nav-bar':NavBar,
        }
    }
</script>

<style scoped lang="scss">
    .point-policy{
        .item{
            border-top: 1px solid #eeeeee;
            padding: 0px 12px 10px 12px;
            display: inline-block;
            width: 100%;
            .hd{
                margin-top: 10px;
                font-size: 14px;
                color: #222222;
                font-family: 'AcuminPro-Bold';
            }

            .bd{
                margin-top: 10px;

                .font{
                    font-size: 12px;
                    color: #999999;
                }
            }
        }
    }
</style>