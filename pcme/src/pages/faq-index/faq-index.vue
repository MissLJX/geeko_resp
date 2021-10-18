<template>
    <div>
        <!-- faq-index -->
        <div class="faqHeader">
            <div class="headerContent">
                <div class="headerLogo">
                    <div class="logo" @click="backHome()">
                        <img src="https://dgzfssf1la12s.cloudfront.net/site/pc/logo03_.png" alt="Chic Me">
                    </div>
                    <div class="support" @click="backSupport()">support</div>
                </div>

                <div class="tabControl">
                    <div :class="{'tabItem':true, 'tabItemSelect':item.url == tabChoose}" 
                         v-for="(item, index) in tabList" 
                         :key="index"
                         >
                         <router-link :to="getUrl(`/me/m/faq/${item.url}/`)">{{item.txt}}</router-link>
                        
                    </div>
                </div> 
            </div>
            
            
        </div>
        <!-- <keep-alive> -->
            <router-view :key="$route.fullPath"></router-view>
        <!-- </keep-alive> -->
        
    </div>
</template>

<script>
import * as utils from '../../utils/geekoutil'
let tabList = [
    {
        id: 0,
        txt: 'OnlineHelp',
        url:'online-help',
    },
    {
        id: 1,
        txt: 'Tickets',
        url: 'support-ticket',
    },
    {
        id: 2,
        txt: 'FAQ',
        url: 'faq',
    },
]
export default {
    data(){
        return{
            tabList,
            tabChoose:'faq',
        }
    },
    mounted(){
        console.log(window.location.href.split('faq/')[1].split('/')[0])
        let routeNow = window.location.href.split('faq/')[1].split('/')[0]
        if(routeNow != 'online-help' && routeNow != 'support-ticket'){
            this.tabChoose = 'faq'
        } else {
            this.tabChoose = routeNow
        }
    },
    watch:{
        '$route': 'tabChange'
    },
    computed:{
    },
    methods:{
        tabChange(item){
            console.log(item.path.split('faq/')[1].split('/')[0])
            if(item.path.split('faq/')[1].split('/')[0] != 'online-help' && item.path.split('faq/')[1].split('/')[0] != 'support-ticket'){
                this.tabChoose = 'faq'
            } else {
                this.tabChoose = item.path.split('faq/')[1].split('/')[0]
            }
            // if(this.tabChoose != item.path.split('faq/')[1].split('/')[0]){
            //     this.tabChoose = item.path.split('faq/')[1].split('/')[0] ? item.path.split('faq/')[1].split('/')[0] : 'faq';
            // }
        },
        getUrl(suffix){
            // console.log(PROJECT + suffix)
            return utils.PROJECT + suffix;
        },
        backHome(){
            this.$router.push({ path: '/'})
        },
        backSupport(){
            this.$router.push({ path: utils.ROUTER_PATH_ME + '/m/support'})
        }
    }
}
</script>

<style lang="scss" scoped>
    .faqHeader{
        width: 100%;
        border-bottom: solid 1px #cacaca;

        .headerContent{
            max-width: 1201px;
            height: 82px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .headerLogo{
                display: flex;
                align-items: flex-end;
                justify-content: flex-start;
                
                .logo{
                    margin-right: 19px;
                    cursor: pointer;

                    img{
                        width: 131px;
	                    height: 38px;
                    }
                }
                
                .support{
                    font-family: SlatePro-Medium;
                    font-size: 20px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #222222;
                    text-transform: uppercase;
                    cursor: pointer;
                }
            }

            .tabControl{
                display: flex;
                align-items: center;
                justify-content: centers;

                .tabItem:not(:last-child){
                    margin-right: 58px;
                }
                .tabItem{
                    font-family: SlatePro-Medium;
                    font-size: 20px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #666;
                    line-height: 80px;
                    cursor: pointer;

                    a{
                        color: #666;
                    }
                }
                .tabItemSelect{
                    a{
                        color: #222;
                    }
                    
                    border-bottom: 2px solid #0c2220;
                }
            }
        }
    }
</style>