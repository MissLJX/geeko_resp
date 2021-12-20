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
                        :key="item+index"
                        @click="toChangeCurrency(item)"
                    >
                        <span :class="{'active' : currencyLocale == item}">{{item}}</span>
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
                return store.getters["me/currencyList"];
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
            store.dispatch("me/getCurrencyList").then(() => {
                this.isLoadingShow = false;
            });;
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