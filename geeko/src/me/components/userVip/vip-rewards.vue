<template>
    <div class="vip-reawrds">
        <p class="title">{{siteName}} VIP REWARDS</p>
        <p class="next-title">LEVEL UP TO UNLOCK…</p>

        <div class="rewards-container" :class="!showFullHeight?'':'full-height'">
            <div>
                <span class="bg-icon">
                    <span class="iconfont">&#xe771;</span>
                </span>
                <p class="_font">Points Redemption</p>
            </div>

            <div>
                <span class="bg-icon">
                    <span class="iconfont">&#xe771;</span>
                </span>
                <p class="_font">APP Exclusive XX% OFF</p>
            </div>

            <div>
                <span class="bg-icon">
                    <span class="iconfont">&#xe771;</span>
                </span>
                <p class="_font">Points Redemption</p>
            </div>

            <div>
                <span class="bg-icon">
                    <span class="iconfont">&#xe771;</span>
                </span>
                <p class="_font">APP Exclusive XX% OFF</p>
            </div>

            <div>
                <span class="bg-icon">
                    <span class="iconfont">&#xe771;</span>
                </span>
                <p class="_font">Points Redemption</p>
            </div>

            <div>
                <span class="bg-icon">
                    <span class="iconfont">&#xe771;</span>
                </span>
                <p class="_font">APP Exclusive XX% OFF</p>
            </div>

            <div>
                <span class="bg-icon">
                    <span class="iconfont">&#xe771;</span>
                </span>
                <p class="_font">APP Exclusive XX% OFF</p>
            </div>

            <div>
                <span class="bg-icon">
                    <span class="iconfont">&#xe771;</span>
                </span>
                <p class="_font">APP Exclusive XX% OFF</p>
            </div>

            <div>
                <span class="bg-icon">
                    <span class="iconfont">&#xe771;</span>
                </span>
                <p class="_font">APP Exclusive XX% OFF</p>
            </div>
        </div>

        <div class="view-rewards">
            <span @click="showFullHeight=!showFullHeight">
                <span>View Reawrds</span>
                <span></span>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name:"VipReawrds",
        data(){
            return {
                siteName:window.name,
                showFullHeight:false
            }
        }
    }
</script>

<style scoped lang="scss">
    .vip-reawrds{
        margin-top: 25px;
        padding: 0 30px;

        .title{
            font-size: 16px;
            color: #222222;
            font-family: 'AcuminPro-Bold';
            text-transform: uppercase;
        }

        .next-title{
            font-size: 12px;
            color: #222222;
            text-transform: uppercase;
        }

        .rewards-container{
            display: flex;
            flex-wrap: wrap;
            margin-top: 30px;
            max-height: 108px;
            overflow: hidden;
            transition: max-height .3s;

            & > div{
                color: #222222;
                display: inline-block;
                width: calc(25% - 10px);
                text-align: center;
                margin-right: 10px;
                margin-bottom: 30px;
                max-width: 25%;

                .bg-icon{
                    width: 45px;
                    height: 45px;
                    line-height: 45px;
                    background-image: linear-gradient(137deg, 
                        #444444 0%, 
                        #000000 100%);
                    text-align: center;
                    display: inline-block;
                    border-radius: 50%;

                    & > .iconfont{
                        color: #fff;
                    }
                }

                ._font{
                    font-family: 'SlatePro-Medium';
                    font-size: 12px;
                    color: #222222;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    margin-top: 5px;
                }
            }
        }

        .full-height{
            max-height: 324px;
        }

        .view-rewards{
            text-align: center;
        }
    }
</style>