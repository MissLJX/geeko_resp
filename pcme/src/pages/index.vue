<template>
    <div class="el-me-body">
        <div class="el-me-hd">
            <p style="text-transform:capitalize"><span @click="window.location.href = '/'">{{$t('home')}}</span><router-link :to="getUrl('/me/m')"> > {{$t('me')}}</router-link><span v-if="isActive !== 'Me'"> > {{isActive}}</span></p>
        </div>
        <div class="el-me-bd">
            <div class="el-me-nav">
                <div class="el-me-left-container">
                    <p class="h-title">
                        <router-link :to="getUrl('/me/m')">Personal Center</router-link>
                    </p>

                    <!-- 导航中的路由 -->
                    <index-nav-container :isActive="isActive" @changeRouter="changeClass"></index-nav-container>

                </div>
            </div>
            <div class="el-me-con">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<script>
    import {PROJECT} from '../utils/geekoutil'
    import IndexNavContainer from "../components/index/index-nav-container.vue"

    export default {
        data(){
          return{
              isActive:'Me',
          }
        },
        methods:{
            logoutHandle(){
                this.$store.dispatch('logout').then(() => {
                    window.location.href = '/'
                })
            },
            changeClass(currIndex){
                this.isActive = currIndex
            },
            getUrl(suffix){
                return PROJECT + suffix;
            }
        },
        components:{
            "index-nav-container":IndexNavContainer
        },
        beforeRouteEnter(to,from,next){
            if(to.path && !!to.path && to.path.includes("notification")){
                next(vm => {
                    vm.isActive = "notification";
                });
            }else if(to.name && !!to.name){
                next(vm => {
                    vm.isActive = to.name;
                });
            }else{
                next();
            }
        },
        watch:{
            '$route':function(to,form){
                console.log("to.name",to.name)
                if(!to.name && to.path == "/me/m"){
                    this.isActive = "Me";
                }else if(to.path && !!to.path && to.path.includes("notification")){
                    this.isActive = "notification";
                }else{
                    this.isActive = to.name;
                }
            }
        }
    }
</script>
<style scoped lang="scss">
    .el-me-body{
        width: 1230px;
        margin: 0 auto;
        .el-me-hd{
            font-size: 14px;
            color: #666;
            padding:30px 0 30px 0;
            p{
                a{
                    color:#666;
                }
            }
        }
        .el-me-bd{
            .el-me-nav{
                width: 280px;
                float: left;
                margin-right: 31px;
                background-color: #ffffff;
                padding: 25px 20px 40px 20px;

                .el-me-left-container{
                    .h-title{
                        font-family: 'SlatePro-Medium';
                        font-size: 20px;
                        color: #222222;
                    }
                }

                h3{
                    padding-bottom: 30px;
                    font-size: 18px;
                    a{
                        text-decoration: none;
                        color: #000000;
                    }
                }
            }
            .el-me-con{
                width: 916px;
                float: left;
            }
            &:after{
                display: block;
                content: '';
                clear: both;
            }
        }
    }
</style>