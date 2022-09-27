<template>
    <div class="select-currency">
        <nav-bar>
            <i class="iconfont el-back-font" slot="left" @click="$emit('update:selectCurrencyShow',false)">&#xe693;</i>
            <span slot="center">{{$t('index.currency')}}</span>
        </nav-bar>

        <div class="_bd">
            <div class="__list">
                <ul>
                    <li 
                        class="__item"
                        v-for="(item,index) in currencyList" 
                        :key="item.value+index"
                        @click="toChangeCurrency(item.value)"
                        :class="{'active' : currencyLocale == item.value}"
                    >
                        <span 
                            class="Image" 
                            :style="`background-image: url(https://image.geeko.ltd/site/ninimour/flags/flag-${item.value}.png)`" 
                            :alt="item.label"
                        />
                        <span>{{item.label}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <loading v-if="isLoadingShow"></loading>
    </div>
</template>

<script>
    import store from "../../../store/index.js"
    import NavBar from "../nav-bar.vue"
    import { changeLocalCurrency } from "../../../utils/geekoutils.js"

    export default {
        name:"SelectCurrency",
        data(){
            return {
                isLoadingShow:false,
                currencyLocale:this.currency
            }
        },
        props:["currency"],
        components:{
            "nav-bar":NavBar
        },
        computed:{
            currencyList:function(){
                return store.getters["currencies"];
            }
        },
        methods:{
            toChangeCurrency(value){
                this.isLoadingShow = true;
                store.dispatch("me/changeCurrency",{value}).then(() => {
                    this.isLoadingShow = false;
                    this.$emit('update:selectCurrencyShow',false);
                    changeLocalCurrency(value);
                }).then(() =>{
                    window.location.reload();
                });
            }
        },
        created:function(){
            if(this.currencyList && this.currencyList.length > 0){
                return;
            }
            this.isLoadingShow = true;
            store.dispatch("getCurrencies").then(() => {
                this.isLoadingShow = false;
            });
        }
    }
</script>

<style scoped lang="scss">
    .select-currency{
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: #fff;
        top:0;
        left: 0;
        z-index: 2;
        padding-bottom: 51px;

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

                    .Image{
                        width: 30px;
                        height: 16px;
                        display: inline-block;
                        vertical-align: middle;
                        background-size: 100% auto;
                        border: 1px solid #e6e6e6;
                        background-position: center;
                        background-repeat: no-repeat;
                        margin-right: 5px;
                    }

                    & > span{
                        display: inline-block;
                        position: relative;
                        vertical-align: middle;
                    }

                    &.active::after{
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