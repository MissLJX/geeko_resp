<template>
    <div class="wallet-history-container">
        <div class="wallet-history-hd">{{ $t("label.wallet_history") }}</div>

        <div class="wallet-history-tab">

            <span 
                class="wallet-history-tab-item" 
                @click="componentName=nav.name"
                v-for="(nav, index) in navs"
                :key="nav.id+index"
                :style="{...nav.style}"
            >
                <span :class="{'active':componentName==nav.name}">{{ nav.label }}</span>
            </span>
        </div>
        
        <!-- <div class="wallet-history-bd"> -->
        <!-- <transition :name="transitionName"> -->
        <keep-alive>
            <component :is="componentName" class="child-view"></component>
        </keep-alive>
        <!-- </transition> -->
        <!-- </div> -->
    </div>
</template>

<script>
    import WalletAll from "./wallet-all.vue";
    import WalletEarned from "./wallet-earned.vue";
    import WalletUsed from "./wallet-used.vue";
    import WalletExpired from "./wallet-expired.vue";

    export default {
        name:"WalletHistory",
        data(){
            return {
                navs: [
                    {id: 1, label: this.$t("point.all"), level:1, name: 'WalletAll', style:{}},
                    {id: 2, label: this.$t("label.earned"), level:2, name: 'WalletEarned', style:{textAlign:"left"}},
                    {id: 3, label: this.$t("point.used"), level:3, name: 'WalletUsed', style:{textAlign:"center"}},
                    {id: 4, label: this.$t("point.expired"), level:4, name: 'WalletExpired', style:{textAlign:"right"}}
                ],
                componentName:"WalletAll",
                transitionName: 'slide-left'
            }
        },
        components:{
            "WalletAll": WalletAll,
            "WalletEarned": WalletEarned,
            "WalletUsed": WalletUsed,
            "WalletExpired": WalletExpired
        },
        watch:{
            componentName:function (newValue,oldValue){
                const toDepth = this.navs.find(item=>item.name==newValue).level;
                const fromDepth = this.navs.find(item=>item.name==oldValue).level;
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            }
        }
    }
</script>

<style scoped lang="scss">
    .wallet-history-container{
        background-color: #fff;
        box-shadow: 0px 3px 20px 5px rgba(34, 34, 34, 0.1);
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        padding-top: 12px;
        display: flex;
        flex-direction: column;
        position: fixed;
        width: 93%;
        top: 230px;
        bottom: 51px;
        left: 50%;
        transform: translateX(-50%);

        .wallet-history-hd{
            font-size: 14px;
            font-family: 'SlatePro-Medium';
            padding-left: 12px;
        }

        .wallet-history-tab{
            padding: 0 15px;
            display: flex;
            padding-bottom: 10px;

            .wallet-history-tab-item{
                display: inline-block;
                flex: 1;
                padding-top: 15px;
                cursor: pointer;

                & > *{
                    font-size: 14px;
                    color: #222;

                    &.active{
                        font-family: 'AcuminPro-Bold';
                        border-bottom: 2px solid #222;
                    }
                }
            }
        }
    }

    .child-view {
        //position: absolute;
        transition: all .5s cubic-bezier(.4, 0, .1, 1);
        width: 100%;
    }

    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(30px, 0);
        transform: translate(30px, 0);
    }

    .slide-left-leave-active, .slide-right-enter {
        position: absolute;
        opacity: 0;
        -webkit-transform: translate(-30px, 0);
        transform: translate(-30px, 0);
    }
</style>