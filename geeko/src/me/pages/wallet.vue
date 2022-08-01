<template id="wallet">
    <div class="wallet">
        <div class="fixed-container">
            <nav-bar style="background-color:transparent;">
                <i class="iconfont" slot="left" @click="$router.go(-1)" style="color:#fff;">&#xe693;</i>
                <span slot="center" style="color:#fff;">My Wallet</span>
                <a href="/fs/wallet-policy" slot="right">
                    <span class="iconfont" style="font-size:20px;color:#fff;">&#xe73f;</span>
                </a>
            </nav-bar>

            <div class="wallet-position">
                <div class="wallet-credit">
                    <p class="wallet-font1">Wallet Credit</p>
                    <p class="wallet-price">$0.00</p>
                    <p class="wallet-message">Only Applicable for ChicMe Purchases</p>
                </div>
            </div>
        </div>

        <div class="wallet-bg"></div>

        <WalletHistory />
    </div>
</template>

<script>
    import NavBar from "../components/nav-bar.vue";
    import WalletHistory from "../components/wallet/wallet-history.vue";

    export default {
        name:"Wallet",
        components:{
            "nav-bar":NavBar,
            "WalletHistory": WalletHistory
        }
    }
</script>

<style scoped lang="scss">
    .wallet{
        position: relative;
        background-color: #f5f5f5;
        height: calc(100vh - 51px);
        overflow: hidden;

        .fixed-container{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            background-color: transparent;
            z-index: 2;

            .wallet-position{
                margin-top: 20px;
                padding: 0 12px;

                .wallet-credit{
                    box-shadow: 0px 3px 20px 5px rgba(34,34,34,0.1000);
                    border-radius: 10px;
                    padding: 22px 20px;
                    background-color: #fff;
                    text-align: center;

                    .wallet-font1{
                        font-size: 14px;
                    }

                    .wallet-price{
                        font-size: 30px;
                        margin-top: 16px;
                        font-family: 'AcuminPro-Bold';
                    }

                    .wallet-message{
                        margin-top: 16px;
                        color: #BBBBBB;
                        font-size: 12px;
                    }
                }
            }
        }

        .wallet-bg{
            height: 150px;
            background-color: #222;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;
            z-index: 1;
        }
    }
</style>