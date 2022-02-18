<template id="set-password">
    <div class="set-password">
        <nav-bar>
            <i class="iconfont el-back-font" slot="left" @click="$router.go(-1)">&#xe693;</i>
            <span slot="center">{{$t("label.set_password")}}</span>
        </nav-bar>

        <div class="_content">
            <input type="text" :value="me.email" readonly>
            <div class="_password">
                <input :type="!passwordShow?'password':'text'" placeholder="PASSWORD" v-model="password" @focus="ruleShow=true">

                <div class="registry-showin" :class="{'active':passwordShow}" @click="passwordShow = !passwordShow"></div>
            </div>

            <div class="_rule" v-if="ruleShow">
                <p :class="rulePass.minLength?'pass':'nopass'">{{$t("label.mininum_length_six")}}</p>
                <p :class="rulePass.maxLength?'pass':'nopass'">{{$t("label.maximun_length_twenty")}}</p>
                <p :class="rulePass.noEmojis?'pass':'nopass'">{{$t("label.no_emojis")}}</p>
            </div>
            
            <div class="agreement-vue">
                <div class="item1">
                    <span class="iconfont" :class="{'_selected':policyActive.first}" @click="policyActive.first=!policyActive.first">&#xe65a;</span>
                    <span :class="{'active-animation':fontActive}">
                        <i18n path="label.agree_to_policy" tag="span" for="label.terms_of_services">
                            <a :href="GLOBAL.getUrl('/fs/terms-conditions-notice')">{{$t("label.terms_of_services")}}</a>
                        </i18n>
                        <a :href="GLOBAL.getUrl('/fs/privacy-security-policy')">{{$t("index.privacy_policy")}}  </a>
                    </span>
                </div>

                <div class="item1">
                    <span class="iconfont" :class="{'_selected':policyActive.second}" @click="policyActive.second=!policyActive.second">&#xe65a;</span>
                    <span>
                        {{$t("label.exclusive_new_email")}}
                    </span>
                </div>
            </div>

            <btn class="fill btn normal" style="font-family: 'AcuminPro-Bold';width:100%;padding:16px 5px;margin-top:30px;" @click.native="confimedEvent()">{{$t("points_mall.points_confirm")}}</btn>
        </div>

        <div class="success-modal" v-if="modalShow">
            <div class="modal-content">
                <img src="https://image.geeko.ltd/chicme/2021111101/right_icon.png" alt="right">
                <p class="font1">{{$t("label.welcome_to")}} {{name}}</p>
                <p class="font2">{{$t("label.set_successful")}}</p>
                <btn class="fill btn normal" style="font-family: 'AcuminPro-Bold';width:100%;padding:10px 5px;margin-top:10px;" @click.native="modalSuccessEvent()">{{$t("survey.survey_go_shopping")}}</btn>
            </div>
            <div class="mask"></div>
        </div>
    </div>
</template>

<script>
    import NavBar from '../components/nav-bar.vue'
    import {mapGetters} from "vuex"
    import { isEmojiCharacter } from "../../utils/geekoutils"
    import Btn from "../../components/btn.vue"

    export default {
        name:"SetPassword",
        data(){
            return {
                password:"",
                ruleShow:false,
                rulePass:{
                    minLength:false,
                    maxLength:false,
                    noEmojis:false
                },
                passwordShow:false,
                policyActive:{
                    first:false,
                    second:false
                },
                fontActive:false,
                modalShow:false
            }
        },
        components:{
           "nav-bar":NavBar,
           "btn":Btn
        },
        computed:{
            ...mapGetters("me",['me']),
            name(){
                return window.name;
            }
        },
        watch:{
            password:function(newValue,oldValue){
                if(newValue && newValue.length >= 6){
                    this.rulePass.minLength = true;
                }else{
                    this.rulePass.minLength = false;
                }

                if(newValue && newValue.length <= 20){
                    this.rulePass.maxLength = true;
                }else{
                    this.rulePass.maxLength = false;
                }

                if(!isEmojiCharacter(newValue)){
                    this.rulePass.noEmojis = true;
                }else{
                    this.rulePass.noEmojis = false;
                }
            }
        },
        methods:{
            confimedEvent:function(){
                let _this = this;
                if(this.password.length <=0){
                    alert("The password cannot be empty!");
                    return;
                }

                if(!(this.rulePass.minLength && this.rulePass.maxLength && this.rulePass.noEmojis)){
                    return;
                }

                if(!this.policyActive.first){
                    this.fontActive = true;
                    setTimeout(() =>{
                        this.fontActive = false;
                    },500);
                    return;
                }

                 this.$store.dispatch('me/changePassword', {newPassword:this.password}).then(() => {
                    _this.modalShow = true;
                }).catch(e => {
                    alert(e.result);
                    _this.password = "";
                    _this.policyActive.first = false;
                })

            },
            modalSuccessEvent(){
                window.location.href = this.GLOBAL.getUrl("/");
            }
        }
    }
</script>

<style scoped lang="scss">
    .set-password{
        height: 100vh;

        ._content{
            padding: 0px 20px;
            input{
                border: none;
                border-bottom: 1px solid #e6e6e6;
                outline: none;
                width: 100%;
                height: 30px;
                box-shadow: none;
                display: block;
                font-family: SlatePro;
                color: #222222;
                font-size: 14px;
                padding-left: 0px;
                margin-top: 15px;
            }

            ._password{
                position: relative;

                input{
                    position: relative;
                }

                .registry-showin{
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    cursor: pointer;
                    padding:8px 9px 1px;
                    z-index:1;

                    &::after{
                        content:" ";
                        width: 20px;
                        height: 14px;
                        background: url(https://image.geeko.ltd/chicme/20210707/hide.png) no-repeat center;
                        background-size: 100%;
                        cursor: pointer;
                        display:inline-block;
                    }

                    &.active{
                        &::after{
                            background: url(https://image.geeko.ltd/chicme/20210707/show.png) no-repeat center;
                            background-size: 100%;
                        }
                    }
                }
            }

            ._rule{
                margin-top: 10px;

                p{
                    font-size: 12px;
                    color: #999999;

                    &.pass{
                        color: #20b759;
                    }

                    &.nopass{
                        color: #f4546d;
                    }
                }
            }

            .agreement-vue{
                a{
                    text-decoration: underline;
                }

                .item1{
                    margin-top: 10px;
                    span{
                        font-size: 12px;
                        color: #666666;
                        margin-left: 5px;
                        vertical-align: middle;
                        display: inline-block;
                    }

                    a{
                        color: #222222;
                        font-size: 12px;
                    }

                    .iconfont{
                        position: relative;
                        vertical-align: middle;
                        z-index: 2;
                        font-size: 16px;
                        margin-left: 0px;
                        cursor: pointer;

                        &._selected{
                            &::after{
                                content: '\e65b';
                                position: absolute;
                                top: 0;
                                left: 0;
                                display: inline-block;
                                color: #222222;
                            }
                        }
                    }

                    span.active-animation{
                        animation: finger infinite 0.5s;
	                    -webkit-animation: finger infinite 0.5s;
                    }
                }
            }
        }
    }

    @keyframes finger {
        0% {
            transform: translate(-5px)
        }

        25% {
            transform: translate(5px)
        }
        
        50% {
            transform: translate(-5px)
        }

        75% {
            transform: translate(5px)
        }

        100% {
            transform: translate(-5px)
        }

    }

    .success-modal{
        .mask{
            width: 100%;
            height: 100%;
            position: fixed;
            left: 0;
            top:0;
            background-color: rgba(0,0,0,0.4);
            z-index: 5;
        }

        .modal-content{
            width: 70%;
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            z-index: 6;
            background-color: #ffffff;
            text-align: center;
            padding: 20px;

            img{
                width: 54px;
                margin-top: 10px;
            }

            .font1{
                font-family: 'SlatePro-Medium';
                font-size: 12px;
                color: #999999;
            }

            .font2{
                font-family: 'SlatePro-Medium';
                font-size: 16px;
                color: #222222;
                margin-top: 5px;
            }
        }
    }
</style>