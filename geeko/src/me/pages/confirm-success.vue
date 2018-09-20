<template>
    <div class="email-body">
        <page-header>
            <span>Login Protection</span>
        </page-header>
        <div class="loginpro">
            <i class="iconfont">&#xe73b;</i>
            <p><strong>Congratulations!</strong></p>
            <p>Your account has been successfully verified</p>
            <p class="greyfont">Your registered email address is:{{me.email}}You have received <span>50 Chicme credits for verfifying for the first time</span></p>
        </div>
        <div class="btnarr">
            <div class="shopnnow" @click="shopnow">Shop Now</div>
            <div class="myaccount" @click="myaccount">My Account</div>
        </div>
    </div>
</template>

<script>
    import store from '../../store';
    import PageHeader from '../components/page-header.vue'
    import {mapGetters, mapActions} from 'vuex';

    export default {
        components: {
            'page-header':PageHeader,
        },
        computed:{
            ...mapGetters('me', [
                'me'
            ]),
        },
        methods:{
            shopnow(){
                window.location.href = '/'
            },
            myaccount(){
                window.location.href = '/me/m'
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
    .iconfont{
        font-family:"iconfont" !important;
        font-size:16px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;}
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
</style>