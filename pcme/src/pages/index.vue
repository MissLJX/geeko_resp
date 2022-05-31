<template>
    <div class="el-me-body">
        <div class="el-me-hd">
            <p style="text-transform:capitalize"><span @click="window.location.href = '/'">{{$t('home')}}</span><router-link :to="getUrl('/me/m')"> > {{$t('me')}}</router-link><span v-if="isActive != $t('me')"> > {{isActive}}</span></p>
        </div>
        <div class="el-me-bd">
            <div class="el-me-nav">
                <div class="el-me-left-container">
                    <p class="h-title">
                        <router-link :to="getUrl('/me/m')">{{$t("point.personal_center")}}</router-link>
                    </p>
                    <!-- 导航中的路由 -->
                    <index-nav-container :isActive="isActive" @changeRouter="changeClass" :vipShow="vipShow"></index-nav-container>

                </div>
            </div>
            <div class="el-me-con">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
        <success-tip v-if="showTip" :content="tipContent" :type="tipType"></success-tip>
        <!-- <button @click="setShowTip">showTip</button>
        <button @click="setTipContent">changeTip</button> -->
    </div>
</template>
<script>
    import {PROJECT} from '../utils/geekoutil'
    import IndexNavContainer from "../components/index/index-nav-container.vue"
    import SuccessTip from '../components/success-tip.vue'
    import {mapGetters} from 'vuex';

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
                // console.log(currIndex)
                this.isActive = currIndex
            },
            getUrl(suffix){
                return PROJECT + suffix;
            },
            setShowTip(){
                this.$store.dispatch("setShowTip", true);
            },
            setTipContent(){
                this.$store.dispatch("setTipContent", this.$t("success"));
            },
            setTipType(){
                this.$store.dispatch("setTipType", "points");
            },
            
            
        },
        computed:{
            ...mapGetters(['showTip','tipContent','tipType']),
            vipShow:function(){
                return this.$store.getters.vipShow;
            },
        },
        mounted(){
            this.$store.dispatch("getIsShowVipConfig");
        },
        components:{
            "index-nav-container":IndexNavContainer,
            "success-tip":SuccessTip,
        },
        beforeRouteEnter(to,from,next){
            if(to.path && !!to.path && to.path.includes("notification")){
                next(vm => {
                    vm.isActive = vm.$t("mymessages");
                });
            }else if(to.path && !!to.path && to.path.includes("credits")){
                next(vm => {
                    vm.isActive = vm.$t("credits");
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
                if(!to.name && to.path == "/me/m"){
                    this.isActive = "Me";
                }else if(to.path && !!to.path && to.path.includes("notification")){
                    this.isActive = this.$t("mymessages");
                }else if(to.path && !!to.path && to.path.includes("credits")){
                    this.isActive = "credits";
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