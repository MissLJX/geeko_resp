<template>
    <div class="select-language">
        <nav-bar>
            <i class="iconfont el-back-font" slot="left" @click="$emit('update:selectLanguageShow',false)">&#xe693;</i>
            <span slot="center">{{$t('index.language')}}</span>
        </nav-bar>

        <div class="_bd">
            <div class="__list">
                <ul>
                    <li 
                        class="__item"
                        v-for="(item,index) in language" 
                        :key="item.locale+index"
                        @click="toChangeLanguage(item.locale)"
                    >
                        <span
                            :class="{'active' : languageLocale == item.locale}"
                        >{{item.name}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import NavBar from "../nav-bar.vue"
    import { changeLocalLanguage , getLocalCookie } from "../../../utils/geekoutils.js"

    export default {
        name:"SelectLanguage",
        data(){
            return {
                language:[
                    {
                        name:"English",
                        locale:"en"
                    },
                    {
                        name:"Español",
                        locale:"es"
                    },
                    {
                        name:"Deutsch",
                        locale:"de"
                    },
                    {
                        name:"Français",
                        locale:"fr"
                    },
                    {
                        name:"Português",
                        locale:"pt"
                    },
                    {
                        name:"Svenska",
                        locale:"sv"
                    },
                    {
                        name:"Dansk",
                        locale:"da"
                    },
                    {
                        name:"Norsk",
                        locale:"nb"
                    },
                    {
                        name:"Íslenska",
                        locale:"is"
                    },
                    {
                        name:"Suomalainen",
                        locale:"fi"
                    }
                ],
                languageLocale:""
            }
        },
        components:{
            "nav-bar":NavBar
        },
        created(){
            this.languageLocale = getLocalCookie("lang") ? getLocalCookie("lang") : "en";
        },
        methods:{
            toChangeLanguage(value){
                this.$i18n.locale = value;
                changeLocalLanguage(value);
                this.languageLocale = value;
                this.$emit('update:selectLanguageShow',false)
            }
        }
    }
</script>

<style scoped lang="scss">
    .select-language{
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: #fff;
        top:0;
        left: 0;
        z-index: 2;

        ._bd{
            position: relative;
            .__list{
                padding-left: 10px;
                .__item{
                    height: 44px;
                    line-height: 44px;
                    font-family: SlatePro;
                    font-size: 14px;
                    color: #121314;

                    & > span{
                        display: block;
                        position: relative;
                    }

                    & > .active::after{
                        font-family: iconfont;
                        content: '\E638';
                        font-size: 15px;
                        color: #222222;
                        position: absolute;
                        right: 20px;
                    }
                }
            }
        }
    }
</style>