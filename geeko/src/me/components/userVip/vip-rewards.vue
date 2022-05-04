<template>
    <div class="vip-reawrds">
        <p class="title">{{siteName}} VIP REWARDS</p>
        <p class="next-title">LEVEL UP TO UNLOCK…</p>

        <div class="rewards-container" :class="!showFullHeight?'':'full-height'">
            <div v-for="(rewards,index) in dataArr" :key="index+rewards.title" @click="showModal=true">
                <span class="bg-icon">
                    <span class="iconfont" v-html="rewards.icon"></span>
                </span>
                <p class="_font">{{rewards.title}}</p>
            </div>
        </div>

        <div class="view-rewards">
            <span @click="showFullHeight=!showFullHeight">
                <span>View Reawrds</span>
                <span></span>
            </span>
        </div>

        <vip-rewards-modal 
            :show-modal.sync="showModal" 
            :datas="dataArr"

        ></vip-rewards-modal>
    </div>
</template>

<script>
    import VipRewardsModal from './vip-rewards-modal.vue'

    export default {
        name:"VipReawrds",
        data(){
            return {
                siteName:window.name,
                showFullHeight:false,
                dataArr:[
                    {
                        icon:"&#xe771;",
                        title:"Points Redemption",
                        content:"xxxxxxxxxxxxxx Points Redemption"
                    },
                    {
                        icon:"&#xe771;",
                        title:"APP Exclusive XX% OFF",
                        content:"xxxxxxxxxxxxxx APP Exclusive XX% OFF"
                    },
                    {
                        icon:"&#xe771;",
                        title:"Exclusive Icon",
                        content:"xxxxxxxxxxxxxx Exclusive Icon"
                    },
                    {
                        icon:"&#xe771;",
                        title:"Level-up Coupon",
                        content:"xxxxxxxxxxxxxx Level-up Coupon"
                    },
                    {
                        icon:"&#xe771;",
                        title:"Free Shipping",
                        content:"xxxxxxxxxxxxxx Free Shipping"
                    },
                    {
                        icon:"&#xe771;",
                        title:"Double Points",
                        content:"xxxxxxxxxxxxxx Double Points"
                    },
                    {
                        icon:"&#xe771;",
                        title:"VIP Service",
                        content:"xxxxxxxxxxxxxx VIP Service"
                    },
                    {
                        icon:"&#xe771;",
                        title:"Speedy Return",
                        content:"xxxxxxxxxxxxxx Speedy Return"
                    },
                    {
                        icon:"&#xe771;",
                        title:"Coming Soon",
                        content:"xxxxxxxxxxxxxx Coming Soon"
                    }
                ],
                showModal:false
            }
        },
        components:{
            VipRewardsModal,
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