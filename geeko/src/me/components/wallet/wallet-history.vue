<template>
    <div class="wallet-history-container">
        <div class="wallet-history-hd">Wallet History</div>

        <div class="wallet-history-tab">
            <span class="wallet-history-tab-item">
                <span class="active">ALL</span>
            </span>

            <span class="wallet-history-tab-item" style="text-align:left;">
                <span>Earned</span>
            </span>

            <span class="wallet-history-tab-item" style="text-align:center;">
                <span>Used</span>
            </span>

            <span class="wallet-history-tab-item" style="text-align:right;">
                <span>Expired</span>
            </span>
        </div>

        <keep-alive>
            <component :is="componentName"></component>
        </keep-alive>
    </div>
</template>

<script>
    import WalletAll from "./wallet-all.vue";

    export default {
        name:"WalletHistory",
        data(){
            return {
                componentName:"WalletAll"
            }
        },
        components:{
            "WalletAll":WalletAll
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
</style>