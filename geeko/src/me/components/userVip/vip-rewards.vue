<template>
    <div class="vip-reawrds">
        <p class="title">{{ $t('label.vip_rewards',{name:siteName}) }}</p>
        <p class="next-title">{{ $t('label.level_up_unlock') }}…</p>

        <div class="rewards-container" :class="!showFullHeight?'':'full-height'">
            <div v-for="(rewards,index) in currentVipData.rewards" :key="index+rewards.id" @click="() =>selectedReawrdsEvent(index)">
                <span class="bg-icon" :style="`background-image:url(${rewards.icon});`">
                    <span class="reward-lock" v-if="userLevel < rewards.level">
                        <span class="_container" :style="`background-color:${themeColor[rewards.level]};`"><span class="iconfont">&#xe70c;</span> <span class="level">v{{rewards.level}}</span></span>
                    </span>  

                    <span class="reward-lock" v-if="userLevel==rewards.level && currentLevel==rewards.level && upgradeFlag">
                        <span class="_container new-level" :style="`background-color:${themeColor[rewards.level]};`">
                            <span class="level">{{ $t('label.new') }}</span>
                        </span>
                    </span>
                </span>
                <p class="_font">{{rewards.title}}</p>
            </div>
        </div>

        <div class="view-rewards">
            <span @click="showFullHeight=!showFullHeight">
                <span>{{ $t('label.view_rewards') }}</span>
                <span class="iconfont" :class="showFullHeight?'active':''">&#xe779;</span>
            </span>
        </div>

        <bottom-to-top>
            <vip-rewards-modal 
                :show-modal.sync="showModal" 
                :datas="currentVipData.rewards"
                :current-level="currentLevel"
                :modal-index="modalIndex"
                :themeColor="themeColor"
                :user-level="userLevel"
                :upgrade-flag="upgradeFlag"
                v-if="showModal"
            ></vip-rewards-modal>
        </bottom-to-top>
        
        <mask-component v-if="showModal" @click.native="showModal=false"></mask-component>
    </div>
</template>

<script>
    import VipRewardsModal from './vip-rewards-modal.vue'
    import BottomToTop from '../../../components/transition/bottom-to-top.vue'
    import MaskComponent from '../../../components/Mask-component.vue'

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
                showModal:false,
                modalIndex:0
            }
        },
        computed:{
            // upgradeLavel(){
            //     let cosutmerLevel = this.userLevel;
            //     let cacheLevel = window.localStorage.getItem('customer_vip_level');
            //     console.log('cosutmerLevel', cosutmerLevel);
            //     console.log('cacheLevel', cacheLevel);
            //     if(cacheLevel >= 0 && cosutmerLevel){
            //         return cosutmerLevel > cacheLevel;
            //     }
                
            //     return false;
            // }
        },
        watch:{
            'showModal':function(newValue,oldValue){
                this.$emit('update:modalIndex',newValue);
            }
        },
        props:{
            currentLevel:{
                type:Number,
                required:true,
                default:0
            },
            currentVipData:{
                type:Object,
                required:true,
                default:function(){
                    return {}
                }
            },
            themeColor:{
                type:Array,
                default:function(){
                    return []
                }
            },
            userLevel:{
                type:Number,
                default:0
            },
            upgradeFlag:{
                type:Boolean,
                default:false
            }
        },
        mounted:function(){
            if(this.$route.query.reward_index){
                let index = parseInt(this.$route.query.reward_index);
                this.selectedReawrdsEvent(index);
            }
        },
        components:{
            VipRewardsModal,
            BottomToTop,
            MaskComponent
        },
        methods:{
            selectedReawrdsEvent(index){
                this.showModal = true;
                this.modalIndex = index;
            }
        }
    }
</script>

<style scoped lang="scss">
    .vip-reawrds{
        // margin-top: 25px;
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
                    position: relative;
                    background-size: cover;
                    background-repeat: no-repeat;

                    & > .iconfont{
                        color: #fff;
                    }

                    .reward-lock{
                        position: absolute;
                        color: #fff;
                        bottom: -5px;
                        display: inline-block;
                        transform: translateX(-50%);
                        left: 50%;
                        line-height: normal;

                        ._container{
                            display:flex;
                            align-items: center;
                            border-radius: 5px;
                            background-color: aqua;

                            .level{
                                display: inline-block;
                                font-size: 12px;
                                color: #222;
                                transform: scale(0.8);
                                font-family: 'AcuminPro-Bold';
                            }

                            .iconfont{
                                display: inline-block;
                                font-size: 12px;
                                color: #222;
                                transform: scale(0.8);
                            }
                        }

                        .new-level{
                            background-image: linear-gradient(135deg, 
                                #f4a7a7 0%, 
                                #e64545 100%);
                            box-shadow: 0px 0px 1px 0px 
                                #000000;
                            border-radius: 8px;

                            .level{
                                color: #fff;
                                text-transform: uppercase;
                                transform: scale(0.7);
                                font-family: 'SlatePro-Medium';
                            }
                        }
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

            & > span{
                span{
                    vertical-align: middle;
                }

                .iconfont{
                    display: inline-block;
                    transform: rotate(0deg);
                    -webkit-transform: rotate(0deg);
                    transition: -webkit-transform .5s;
                    transition: transform .5s;
                    transition: transform .5s,-webkit-transform .5s;
                    

                    &.active{
                        transform: rotate(180deg);
                        -webkit-transform: rotate(180deg);
                    }
                }
            }
        }
    }
</style>