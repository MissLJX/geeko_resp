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
                    <a :href="GLOBAL.getUrl('/support')" class="el-me-tool-list-item">
                        <touch-go class="el-me-tool-list-touch" :label1="$t('index.contact_us')">
                        </touch-go>
                    </a>
                </li>

                <!-- <li>
                    <a class="el-me-tool-list-item" @click.prevent="isShow = true;">
                        <touch-go class="el-me-tool-list-touch" label1="Delete Account">
                        </touch-go>
                    </a>
                </li> -->

                <li>
                    <router-link class="el-me-tool-list-item" :to="{name: 'about-policy'}">
                        <touch-go class="el-me-tool-list-touch" :label1="$t('index.about') + ' ' +  GLOBAL.sitename">
                        </touch-go>
                    </router-link>
                </li>
            </ul>
        </div>

        <div v-show="isShow" class="del-reason">
            <ul class="reason-select">
                <li>
                    <input type="radio" id="one" value="Too many marketing mails" v-model="pickedReason">
                    <label for="one">Too many marketing mails</label>
                </li>
                <li>
                    <input type="radio" id="two" value="For privacy reason" v-model="pickedReason">
                    <label for="two">For privacy reason</label>
                </li>
                <li>
                    <input type="radio" id="three" value="No products favord on the website" v-model="pickedReason">
                    <label for="three">No products favord on the website</label>
                </li>
                <li>
                    <input type="radio" id="four" value="Dissatisfied with the product" v-model="pickedReason">
                    <label for="four">Dissatisfied with the product</label>
                </li>
                <li>
                    <input type="radio" id="five" value="Dissatisfied with the shipping " v-model="pickedReason">
                    <label for="five">Dissatisfied with the shipping</label>
                </li>
                <li>
                    <input type="radio" id="six" value="Others" v-model="pickedReason">
                    <label for="six">Others</label>
                </li>
                <textarea v-if="(this.pickedReason=='Others')" v-model="inputReason" class="inputReason" placeholder="Would you please tell us why?" required></textarea>
                <button class="cancel-btn" @click="isShow = false">Cancel</button>
                <button class="del-btn" @click="delAccount">Delete</button>
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
                selectCurrencyShow:false,
                isShow:false,
                pickedReason: 'Too many marketing mails',
                inputReason:""
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
            },
            delAccount:function(){
                if(this.pickedReason === 'Others'){
                    this.pickedReason = this.inputReason
                }
                this.$store.dispatch('logoff',this.pickedReason).then(() => {
                    window.location.href = '/'
                })
            },
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

    .del-reason{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        padding: 20px 0;
        background-color: rgba(0,0,0,0.3);
    }
    .del-reason ul li input{
        -webkit-appearance:radio;
        -moz-appearance:radio;
    }
    .reason-select{
        width: 85%;
        padding: 10px;
        background-color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .reason-select li{
        width: 100%;
        font-size: 14px;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #eeeeee;
    }
    li:nth-child(6){
        border-bottom: none;
    }
    .cancel-btn,.del-btn{
        width: 49%;
        height: 30px;
        line-height: 30px;
        margin-top: 20px;
    }
    .inputReason{
        width: 100%;
        height: 50px;
    }
</style>