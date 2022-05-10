<template>
    <div class="rewards-modal">
        <p class="close-icon">
            <span class="iconfont" @click="closeModalEvent">&#xe69a;</span>
        </p>

        <p class="title">{{ $t('label.vip_rewards',{name:siteName}) }}</p>

        <div 
            class="swiper-container rewards-swiper" 
            v-swiper:mySwiper="swiperOption" 
            @slideChange="onSlideChange"
        >
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(reward,index) in datas" :key="index">
                    <span class="rewards-container" :style="`background-image:url(${reward.icon});`">
                        <span class="reward-lock" v-if="userLevel < reward.level">
                            <span class="_container" :style="`background-color:${themeColor[reward.level]};`"><span class="iconfont">&#xe70c;</span> <span class="level">v{{reward.level}}</span></span>
                        </span> 

                        <span class="reward-lock" v-if="userLevel==reward.level && upgradeFlag">
                            <span class="_container new-level" :style="`background-color:${themeColor[reward.level]};`">
                                <span class="level">{{ $t('label.new') }}</span>
                            </span>
                        </span>
                    </span>
                </div>
            </div>
        </div>

        <p class="next-title">{{selectedModalReawrds.title}}</p>

        <div class="content">
            {{selectedModalReawrds.description}}
        </div>

        <div class="rewards-button">
            <template v-if="userLevel >= selectedModalReawrds.level">
                <!-- id为1 积分兑换优惠券 -->
                <router-link class="l-button" :to="{name:'redeem-coupon'}" v-if="selectedModalReawrds.id == 1">{{ $t('label.redeem_now') }}</router-link>

                <!-- id 为2 App专属价格 -->
                <button v-if="selectedModalReawrds.id == 2" @click="toAppEvent">{{ $t('label.download_now') }}</button>

                 <!-- id为4 查看升级优惠券 -->
                <router-link class="l-button" :to="{name:'coupons'}" v-if="selectedModalReawrds.id == 4">{{ $t('label.check_my_coupons') }}</router-link>

                <!-- id为7 constant us -->
                <a class="l-button" :href="GLOBAL.getUrl(`/support`)" v-if="selectedModalReawrds.id == 7">{{ $t('index.contact_us') }}</a>
            </template>

            <!-- id 为 5 free shipping -->
            <!--  -->
            <button 
                v-if="selectedModalReawrds.id == 5" 
                :disabled="!(userLevel > selectedModalReawrds.level)"
                @click="getRewardEvent"
            >{{ $t('label.get_reward') }}</button>
        </div>
    </div>
</template>

<script>
    import { directive } from 'vue-awesome-swiper'
    import { isIOS,isAndroid } from '../../../utils/geekoutils'
    import { redeemFreeShipping } from '../../api/index'

    export default {
        name:"VipRewardsModal",
        data(){
            return {
                swiperOption: {
                    slidesPerView:'auto',
                    slideToClickedSlide: true,
                    centeredSlides: true,
                    spaceBetween : 14,
                    initialSlide: this.modalIndex,
                },
                currentIndex:this.modalIndex,
                siteName:window.name,
            }
        },
        methods:{
            onSlideChange(){
                this.currentIndex = this.mySwiper.activeIndex;
            },
            closeModalEvent(){
                this.$emit('update:showModal',false);
            },
            toAppEvent(){
                if (isAndroid()) {
                    setTimeout(function(){
                        window.location.href = `https://play.google.com/store/apps/details?id=${window.iosAppStoreId}`;
                    },200);
                    window.location.href = "chic-me://chic.me/";
                    return;
                }
                if (isIOS()) {
                    setTimeout(function(){
                        window.location.href = `https://itunes.apple.com/us/app/chic-me-shopping-sharing-saving/id${window.isAndroidAppStoreId}?l=zh&ls=1&mt=8'`;
                    },200);
                    window.location.href = "chic-me://chic.me";
                    return;
                }
            },
            getRewardEvent(){
                let path = this.selectedModalReawrds?.deepLink?.params?.[0];
                if(path){
                    redeemFreeShipping(path).then(response =>{
                        if(response.code === 200){
                            this.modalShow();
                        }else{
                            alert(response?.result);
                        }
                    });
                }
            },
            modalShow(){
                let _this = this;
                this.$store.dispatch('confirmShow', {
                    show: true,
                    cfg: {
                        btnFont:{
                            yes:this.$t("survey.survey_go_shopping"),
                        },
                        message2:`<span class="iconfont" style="color:#ff8031;font-size:60px;">&#xe6b7;</span><br/><br/><p style="font-size:16px;font-family: 'AcuminPro-Bold';">${this.$t("points_mall.points_redeem_success")}</p><br/>`,
                        htmlMessage2:true,
                        yes: function () {
                            _this.$store.dispatch('closeConfirm').then(() =>{
                               window.location.href = _this.GLOBAL.getUrl(`/`);
                            });
                        },
                        style:{
                            box:{
                                padding:"15px 8px 12px",
                                width:"80%"
                            },
                            message2:{
                                color:"#222222",
                                fontSize:"14px",
                                fontFamily: 'SlatePro-Medium',
                            },
                            btnYes:{
                                fontSize:"14px",
                                fontFamily: 'SlatePro-Medium',
                                textTransform: 'uppercase',
                                height: "42px",
                                lineHeight: "42px"
                            }
                        }
                    }
                })
            }
        },
        computed:{
            selectedModalReawrds(){
                return this.datas[this.currentIndex];
            }
        },
        directives: {
            swiper: directive
        },
        props:{
            showModal:{
                type:Boolean,
                default:false
            },
            datas:{
                type:Array,
                default:function(){
                    return []
                }
            },
            currentLevel:{
                type:Number,
                default:0
            },
            modalIndex:{
                type:Number,
                default:0
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
        }
    }
</script>

<style scoped lang="scss">
    .rewards-modal{
        position: fixed;
        background-color: #fff;
        z-index: 11;
        left: 0;
        width: 100%;
        bottom: 0;
        padding-bottom: 95px;
        min-height: 350px;

        .close-icon{
            text-align: right;
            padding: 10px 10px 0px 0px;

            & > .iconfont{
                font-size: 12px;
                color: #222;
                cursor: pointer;
            }
        }

        .title{
            font-size: 18px;
            color: #222222;
            font-family: 'AcuminPro-Bold';
            text-align: center;        
        }

        .rewards-swiper{
            margin-top: 12px;
            overflow: visible;

            .swiper-slide{
                width: auto;

                .rewards-container{
                    display: inline-block;
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    background-image: linear-gradient(137deg, 
                    #444444 0%, 
                    #000000 100%);
                    position: relative;
                    background-size: cover;
                    background-repeat: no-repeat;

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
            }

            

            & .swiper-slide-active{
                .rewards-container{
                    -webkit-transform: scale(1.2);
                    transform: scale(1.2);
                }
            }
        }

        .next-title{
            margin-top: 20px;
            text-align: center;
            font-size: 16px;
            color: #222222;
            font-family: 'AcuminPro-Bold';
        }

        .content{
            padding: 0 12px;
            font-size: 12px;
            color: #222222;
            margin-top: 12px;
        }

        .rewards-button{
            text-align: center;
            position: absolute;
            bottom: 25px;
            width: 100%;

            & > button{
                height: 40px;
                line-height: 40px;
                background-color: #222222;
                border-radius: 2px;
                box-shadow: none;
                outline: none;
                border: none;
                color: #fff;
                font-size: 16px;
                font-family: 'AcuminPro-Bold';
                text-align: center;
                width: 80%;
                display: inline-block;

                &:disabled{
                    background-color: #ccc;
                    color: #fff;
                }
            }

            .l-button{
                height: 40px;
                line-height: 40px;
                background-color: #222222;
                border-radius: 2px;
                color: #fff;
                font-size: 16px;
                font-family: 'AcuminPro-Bold';
                text-align: center;
                // padding: 0 40px;
                width: 80%;
                display: inline-block;
            }
        }
    }
</style>