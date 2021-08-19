<template>
    <div class="el-setting-body">
        <nav-bar>
            <i class="iconfont el-back-font" slot="left" @click="$router.go(-1)">&#xe693;</i>
            <span slot="center">{{$t('label.settings')}}</span>
        </nav-bar>

        <div class="setting-container">
            <ul class="el-me-tool-list">
                <li>
                    <router-link class="el-me-tool-list-item" :to="{name: 'address-book'}">
                        <touch-go class="el-me-tool-list-touch" :label1="$t('label.addressBook')">
                        </touch-go>
                    </router-link>
                </li>

                <li>
                    <router-link class="el-me-tool-list-item" :to="{name: 'change-password'}">
                        <touch-go class="el-me-tool-list-touch" :label1="$t('label.changePassword')">
                        </touch-go>
                    </router-link>
                </li>

                <li>
                    <router-link class="el-me-tool-list-item" :to="{name: 'change-email'}">
                        <touch-go class="el-me-tool-list-touch" :label1="$t('label.changeEmail')">
                        </touch-go>
                    </router-link>
                </li>
            </ul>

            <ul class="el-me-tool-list _b-top">
                <!-- <li>
                    <router-link class="el-me-tool-list-item" :to="{name: 'creditcards'}">
                        <touch-go class="el-me-tool-list-touch" :label1="'Country/Region'">
                        </touch-go>
                    </router-link>
                </li> -->


                <li>
                    <a @click.prevent="selectLanguageShow = true;">
                        <touch-go 
                            class="el-me-tool-list-touch" 
                            :label1="$t('index.language')" 
                            :label2="getInitLanguage()"
                            :label2Style="{fontSize:'14px',color:'#999999'}"
                        >
                        </touch-go>
                    </a>
                </li>

                <li>
                    <a @click.prevent="selectCurrencyShow = true;" class="el-me-tool-list-item">
                        <touch-go 
                            class="el-me-tool-list-touch" 
                            :label1="$t('index.currency')"
                            :label2="getInitCurrency()"
                            :label2Style="{fontSize:'14px',color:'#999999'}"
                        >
                        </touch-go>
                    </a>
                </li>

                <!-- <li>
                    <router-link class="el-me-tool-list-item" :to="{name: 'creditcards'}">
                        <touch-go class="el-me-tool-list-touch" :label1="'Notification Setting'">
                        </touch-go>
                    </router-link>
                </li> -->
            </ul>

            <ul class="el-me-tool-list _b-top">
                <li>
                    <a href="/f/mobile/contact_us" class="el-me-tool-list-item">
                        <touch-go class="el-me-tool-list-touch" :label1="$t('index.contact_us')">
                        </touch-go>
                    </a>
                </li>

                <li>
                    <router-link class="el-me-tool-list-item" :to="{name: 'about-policy'}">
                        <touch-go class="el-me-tool-list-touch" :label1="$t('index.about') + ' ' +  GLOBAL.sitename">
                        </touch-go>
                    </router-link>
                </li>
            </ul>
        </div>

        <transition name="uper">
            <select-language 
                v-if="selectLanguageShow"
                :selectLanguageShow.sync="selectLanguageShow"
            >
            </select-language>
        </transition>

        <transition name="uper">
            <select-currency
                v-if="selectCurrencyShow"
                :selectCurrencyShow.sync="selectCurrencyShow"
                :currency="getInitCurrency()"
            ></select-currency>
        </transition>

        <div class="sett-address-footer">
            <div class="add-address"  @click="logoutHandle">{{$t("index.sing_out")}}</div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import NavBar from '../components/nav-bar.vue'
    import TouchGo from '../../components/touch-go.vue'

    import SelectLanguage from "../components/settings/select-language.vue"
    import SelectCurrency from "../components/settings/select-currency.vue"

    import { getLocalCookie } from "../../utils/geekoutils.js"
    import {mapGetters} from "vuex"

    export default {
        name:"Settings",
        components: {
            'nav-bar': NavBar,
            'touch-go':TouchGo,
            "select-language":SelectLanguage,
            "select-currency":SelectCurrency
        },
        computed:{
            ...mapGetters("me",["me"])
        },
        data(){
            return {
                selectLanguageShow:false,
                selectCurrencyShow:false
            }
        },
        methods:{
            getInitLanguage(){
                let language = getLocalCookie("lang");
                if(language == "es"){
                    return "Español";
                }else if(language == "de"){
                    return "Deutsch";
                }else if(language == "fr"){
                    return "Français";
                }else if(language == "pt"){
                    return "Português";
                }else if(language == "da"){
                    return "Dansk";
                }else if(language == "is"){
                    return "Íslenska";
                }else if(language == "nb"){
                    return "Norsk";
                }else if(language == "sv"){
                    return "Svenska";
                }else if(language == "fi"){
                    return "Suomalainen";
                }else{
                    return "English";
                }
            },
            getInitCurrency(){
                let currency = getLocalCookie("currency");
                if(currency){
                    return currency;
                }else if(this.me.currency.value){
                    return this.me.currency.value;
                }else{
                    return "";
                }
            },
            logoutHandle:function(){
                this.$store.dispatch('logout').then(() => {
                    window.location.href = "/";
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    body{
        background-color: #ffffff;
    }

    .el-setting-body{
        background: #ffffff;
        .setting-container{
            .el-me-tool-list{
                // padding-left: 10px;

                &._b-top{
                    border-top: 10px solid #f6f6f6;
                }

                & > li{
                    border-top: 1px solid #eeeeee;

                    & > a{
                        display: block;
                    }
                }

                & > li:first-child{
                    border-top: none;
                }

                .el-me-tool-list-touch{
                    height: 50px;
                    width: 100%;
                    padding: 0px 10px;
                }
            }
        }
    }

    .uper-enter-active, .uper-leave-to{
        // top:0 !important;
        left: 0 !important;
    }

    .uper-enter-active , .uper-leave-active{
        transition: all .3s;
    }

    .uper-leave-active , .uper-enter{
        // top: 100% !important;
        left: 100% !important;
    }

    .sett-address-footer{
        width: 100%;
        position: fixed;
        bottom: 51px;
        left: 0px;
        right: 0px;
        text-align: center;
        padding: 0px 13px 20px 13px;

        .add-address{
            height: 42px;
            line-height: 42px;
            background-color: #222222;
            font-family: SlatePro-Medium;
            font-size: 17px;
            color: #ffffff;
            text-transform: uppercase;
        }
    }
</style>