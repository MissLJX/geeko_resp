<template>
    <div class="email-body" :class="newPageShow && 'global-margin'">
        <template v-if="!(newPageShow)">
            <page-header>
                <span>Login Protection</span>
            </page-header>
            <div class="loginpro">
                <i class="iconfont">&#xe73b;</i>
                <p><strong>Congratulations!</strong></p>
                <p>Your account has been successfully verified</p>
                <p class="greyfont">Your registered email address is:{{me.email}}You have received <span>100 {{sitename}} credits for verfifying for the first time</span></p>
            </div>
            <div class="btnarr">
                <div class="shopnnow" @click="shopnow">{{$t("label.shop_now")}}</div>
                <div class="myaccount" @click="myaccount">My Account</div>
            </div>
        </template>

        <template v-else>
            <template v-if="!!reminderMessage">
                <div v-html="reminderMessage" class="email-container"></div>
            </template>

            <div class="btn-container">
                <btn 
                    class="fill normal" 
                    :style="{fontSize:16,fontFamily:'AcuminPro-Bold',color:'#ffffff',textTransform: 'uppercase',marginTop:'20px'}"
                    @click.native="toHref(GLOBAL.getUrl('/'))"
                >{{$t("shopnow")}}</btn>
                <btn 
                    class="fill normal" 
                    :style="{fontSize:'16px',fontFamily:'AcuminPro-Bold',color:'#ffffff',textTransform: 'uppercase',marginTop:'10px'}"
                    @click.native="toHref(GLOBAL.getUrl('/fs/points-policy'))"
                >{{$t("point.get_more_points")}}</btn>
            </div>
        </template>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import {getMessage} from "../api/index"
    import PageHeader from '../components/page-header.vue'
    import Btn from "../../components/btn.vue"

    export default {
        data(){
            return {
                reminderMessage:null
            }
        },
        components: {
            "btn":Btn,
            'page-header':PageHeader,
        },
        created: async function (){
            if(this.newPageShow){
                let response =  await getMessage("M1618");
                let {query} = this.$route;
                if(response && response.message){
                    let str = response.message;
                    let reg = /<span\s*id='email'>[\s\S]*<\/span>/g;
                    let reg2 = /#email#/;
                    if(query && query.pointsForCash){
                        str = str.replace(reg,`<span id='email'>100 points = $${query.pointsForCash} USD.</span>`)
                    }
                    
                    if(query && query.email){
                        str = str.replace(reg2,query.email)
                    }
                    this.reminderMessage = str;
                }
            }
        },
        computed:{
            ...mapGetters('me', [
                'me'
            ]),
            sitename(){
                return window.name
            },
            newPageShow(){
                return this.$route?.query?.pointsForCash;
            }
        },
        methods:{
            shopnow(){
                window.location.href = '/'
            },
            myaccount(){
                window.location.href = '/me/m'
            },
            toHref(href){
                window.location.href = href;
            }
        }
    }
</script>

<style scoped type="text/css" lang="scss">
    @font-face {
        font-family: 'iconfont';  /* project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_xwn5fr95mdh.eot');
        src: url('//at.alicdn.com/t/font_384296_xwn5fr95mdh.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_384296_xwn5fr95mdh.woff') format('woff'),
        url('//at.alicdn.com/t/font_384296_xwn5fr95mdh.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_384296_xwn5fr95mdh.svg#iconfont') format('svg');
    }
    
    .email-body{
        height: 100vh;
        background-color: #fff;
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;

        .email-container{
            padding-top: 94px;
        }
    }

    html{
        height: 100%;
    }
    body{
        height: 100%;
        margin: 0;
    }
    .email-body{
        height: 100%;
        background-color: #fff;
    }
    .senEmailBtn{
        width: 85%;
        margin: 0 auto;
        background-color: #E5004F;
        height: 50px;
        line-height: 50px;
        color: white;
        text-align: center;
        font-size: 18px;
        cursor: pointer;
    }
    .emailAddress{
        width: 85%;
        margin: 10px auto;
        padding-bottom: 30px;
        p{
            font-size: 18px;
            color: #222;
            margin-bottom: 10px;
        }
        input{
            width: 100%;
            height:40px ;
        }
    }
    .loginpro{
        width: 85%;
        margin: 0 auto;
        text-align: center;
        font-size: 16px;
        padding-top: 50px;
        i{
            font-size: 40px;
            color: #e5004f;
        }
        p{
            line-height: 18px;
            margin-bottom: 10px;
            margin-top: 10px;
        }
        .greyfont{
            color: #999;
            margin-top: 22px;
        }
    }
    .btnarr{
        margin-bottom: 20px;
        .shopnnow{
            float: left;
            width: 50%;
            text-align: center;
            height: 40px;
            line-height: 40px;
            background-color: #e5004f;
            color: white;
            font-size: 16px;
            margin: 0 10px;
        }
        .myaccount{
            float: left;
            width: 40%;
            text-align: center;
            height: 40px;
            line-height: 40px;
            background-color: #000;
            color: white;
            font-size: 16px;
        }
        &:after{
            display: block;
            content: '';
            clear: both;
        }
    }

    .global-margin{
        padding: 0px 45px;
    }
</style>