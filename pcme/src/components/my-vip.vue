<template>
    <div >
        <div class="vipHeader">
            {{headerName}}
        </div>

        <div class="vipCardBox">
            <div class="vipCard" :style="vipCardImg">
                <div class="topLine">
                    <div class="cardNumber">
                        <span>{{me.email}}</span>  
                        <span class="iconfont">&#xe70e;</span>  
                    </div>
                    <div class="expiredTime" v-if="vipExpiredDate">
                        <span>{{$t("my_vip.expired_in")}} {{vipExpiredDate}}</span>  
                        <span class="iconfont"
                              v-show="vipConfig.expiredDescription"
                              @mouseenter="()=>showExpiredTimeDescription=true"
                              @mouseleave="()=>showExpiredTimeDescription=false"
                            >
                            &#xe73f;
                        </span>  
                        <div class="expiredTimeDescription" v-show="showExpiredTimeDescription && vipConfig.expiredDescription">
                            {{vipConfig.expiredDescription}}
                        </div>
                    </div>
                </div>
                <div class="vipMission" v-if="vipProgress">
                    <div class="toNextLevel">
                        <span>({{vipProgress.title}})</span>
                        <span class="iconfont" 
                              @mouseenter="()=>showVipProgressDescription=true"
                              @mouseleave="()=>showVipProgressDescription=false"
                              >&#xe73f;</span>
                        <div class="toNextLevelDescription" v-show="showVipProgressDescription">
                            {{vipProgress.description}}
                        </div>
                    </div>
                    <div class="toNextLevelProcess">
                        <span class="processLine"></span>
                        <span class="processDone" :style="processWidth"></span>
                    </div>
                    <div class="toNextLevelLabel">
                        <span>v{{vipLevel}}</span>
                        <span>v{{vipLevel+1}}</span>
                    </div>
                </div>
                
            </div>
            <div class="rulesBox">
                <div class="rulesTitle">{{$t('my_vip.level_requirement')}}</div>
                <div v-html="vipConfig.levelRequirement"></div>
                <div><a href="/policy/vip-policy">{{$t('my_vip.view_rules')}} {{'>'}}</a> </div>

            </div>
        </div>

        <div class="vipRewards" >
            <div class="vipRewardsTitle">{{$t('my_vip.vip_rewards', {website: websiteName})}}</div>
            <div class="rewardItemBox" ref='main'>
                <div class="rewardItem" 
                     v-for="(item) in rewards" 
                     :key="item.title" 
                     @click="()=>rewardRuleShow(item.id, item.refId)"
                     >
                     <!-- @mouseleave="()=>rewardRuleHide(item)" -->
                    <!-- <span class="iconfont">&#xe70e;</span> -->
                    <img :src="item.icon">
                    <span v-if="(vipLevel >= item.level && item.id != 9) || (item.id == 9 && vipLevel == 3)" :style="'color:'+item.theme.highlight+';'">{{item.title}}</span>
                    <span v-if="vipLevel < item.level || (item.level == 0 && item.id == 9 && vipLevel != 3)" >{{item.title}}</span>
                    <span class="levelLock" 
                          v-if="vipLevel == item.level && levelUpNow" 
                          style="color:#fff;text-transform:uppercase;"
                          >
                        <span>{{$t("my_vip.new")}}</span>
                        <div class="triangle" style="border-right-color:#e64545;"></div>
                    </span>
                    <span class="levelLock" 
                          v-if="vipLevel < item.level" 
                          >
                          <!-- :style="'background:'+highLightList[item.level]+';'" -->
                        <span class="iconfont">&#xe70c;</span>
                        <span>V{{item.level}}</span>
                        <div class="triangle" :style="'border-right-color:'+highLightList[item.level]+';'"></div>
                    </span>
                    <div class="rewardRules" v-if="(item.showRules && item.description) || item.refId == showTagId" >
                        <div class="rewardRulesTitle">{{item.title}}</div>
                        <div class="rewardRulesClose iconfont" @click.stop="()=>rewardRuleHide(item.id, item.refId)">&#xe7c9;</div>
                        <div class="rewardRulesContent">{{item.description}}</div>

                        <div v-if="item.buttonText && item.buttonDisabled" class="rewardRulesBtn" style="background:#999;">
                            {{item.buttonText}}
                        </div>

                        <!-- 兑换优惠券 -->
                        <div @click="() => goLink('redeem-coupon',item.refId)" :class="{'rewardRulesBtn':true}" v-if="item.id == 1 && !item.buttonDisabled && item.buttonText" >
                            <!-- {{$t('my_vip.redeem_now')}} -->
                            {{item.buttonText}}
                        </div>

                        <!-- 下载app -->
                        <div class="rewardRulesBtn" v-if="item.id == 2 && !item.buttonDisabled && item.buttonText">
                            <!-- {{$t('my_vip.download_now')}} -->
                            {{item.buttonText}}
                        </div>

                        <!-- 检测我的优惠券 -->
                        <div class="rewardRulesBtn" @click="() => goLink('coupons',item.refId)" v-if="item.id == 4 && vipLevel >= 1 && !item.buttonDisabled && item.buttonText">
                            <!-- {{$t('my_vip.check_coupons')}} -->
                            {{item.buttonText}}
                        </div>

                        <!-- freeshipping -->
                        <div :class="{'rewardRulesBtn':true, 'redeemed': couponRedeemed}" v-if="item.id == 5 && vipLevel >= 2 && !item.buttonDisabled && item.buttonText" @click="()=>getReward(item.deepLink.params[0],item.refId)">                        
                            <!-- {{$t('my_vip.get_reward')}} -->
                            {{item.buttonText}}
                        </div>

                        <!-- 联系专属客服 -->
                        <div class="rewardRulesBtn" v-if="item.id == 7 && vipLevel >= 3 && !item.buttonDisabled && item.buttonText" @click="()=>linkTo('/support/', item.refId)">
                            <!-- {{$t("support.s_contact_us")}} -->
                            {{item.buttonText}}
                        </div>
                    </div>
                </div>
                
            </div>
            
        </div>
        <div class="vipFaqs">
            <div class="vipFaqsTitle">
                <span class="line1"></span>
                <span>{{$t('my_vip.vip_faqs')}}</span>
                <span class="line2"></span>
            </div>
            <div class="vipFaqsContent">
                <div class="vipFaqItem" v-for="(item) in faqlists" :key="item.question">
                    <span @click="faqItemClick(item.question)" style="cursor:pointer;"><span class="iconfont" :class="{'faqShow':item.open}">&#xe70d;</span>{{item.question}}</span>
                    <div v-if="item.open" class="vipFaqAnswer">{{item.answer}}</div>
                </div>
            </div>
        </div>
        
        <!-- 升级提示弹窗 -->
        <div class="levelUpMask" v-if="showLevelUp" @click="()=>{showLevelUp = false}">
            <div class="levelUpMaskContent">
                <div class="levelUpTitle">{{$t('my_vip.vip_congratulations')}}!</div>
                <div class="levelUpImg">
                    <img :src="vipLevelUpImg" alt="">
                </div>
                <div class="levelUpContent" v-html="$t('my_vip.vip_level_up',{level:vipLevel})">
                    <!-- Your VIP level has been level-up to <span class="level">V{{vipLevel}}</span>, go check out your new rewards! -->
                    <!-- {{$t("my_vip.vip_level_up",{level:vipLevel})}} -->
                </div>
                <div class="levelUpBtn" @click="()=>{showLevelUp = false}">
                    {{$t("confirm")}}
                </div>
            </div>
        </div>

        <!-- 兑换提示弹窗 -->
        <div class="levelUpMask" v-if="showRedemption" @click="()=>{showRedemption = false}">
            <div class="redemptionMaskContent">
                <span class="iconfont maskClose" @click="()=>{showRedemption = false}">&#xe7c9;</span>
                <span class="iconfont successIcon">&#xe6f0;</span>
                <div class="redemptionContent">{{$t("my_vip.redeem_success")}}!</div>
                <div class="redemptionBtn" 
                    @click="()=>{redeemClick()}">
                    {{$t("survey.survey_go_shopping")}}
                </div>
            </div>
        </div>
        <!-- <button @click="()=>goLink()">link</button> -->
    </div>
</template>

<style scoped lang="scss">
    @font-face {
        font-family: 'iconfont';  /* Project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_7dp6xnq8izd.woff2?t=1651826405142') format('woff2'),
            url('//at.alicdn.com/t/font_384296_7dp6xnq8izd.woff?t=1651826405142') format('woff'),
            url('//at.alicdn.com/t/font_384296_7dp6xnq8izd.ttf?t=1651826405142') format('truetype');
        }
    .vipHeader{
        width: 100%;
        height: 52px;
        background-color: #222222;
        margin-bottom: 20px;
        color: #fff;
        width: 100%;
        height: 52px;
        background-color: #222222;
        margin-bottom: 20px;
        color: #fff;
        font-family: 'AcuminPro-Bold';
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        line-height: 52px;
        padding-left: 15px;
        text-transform: uppercase;
    }
    .vipCardBox{
        display: flex;
        align-items: flex-end;

        div{
            display: inline-block;
        }

        .vipCard{
            width: 446px;
            height: 224px;
            background-image: linear-gradient(135deg, 
                #d7d7d7 0%, 
                #707070 100%);
            border-radius: 2px;
            padding: 18px;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: space-between;
        }

        .topLine{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .cardNumber{
                font-family: AcuminPro-Bold;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #ffffff;
                display: flex;
                align-items: center;

                span:nth-child(1){
                    width: 183px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
            .cardNumber .iconfont{
                font-size: 20px;
                color: #fff;
                margin-left: 5px;
            }
            .expiredTime{
                margin-right: 10px;
                display: flex;
                align-items: center;
                font-family: SlatePro;
                font-size: 12px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #ffffff;
                z-index: 1;
                position: relative;

                span{
                    margin-right: 5px;
                }

                .iconfont{
                    cursor: pointer;
                }

                .expiredTimeDescription{
                    position: absolute;
                    min-height: 31px;
                    width: 236px;
                    padding: 8px;
                    background-color: #ffffff;
                    border-radius: 2px;
                    font-family: Roboto-Regular;
                    font-size: 12px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #222222;
                    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.5);
                    left: -100px;
                    top: 22px;
                    z-index: 1;

                    &::after{
                        content: '';
                        display: block;
                        width: 10px;
                        height: 10px;
                        background: #fff;
                        position: absolute;
                        top: -4px;
                        right: 9%;
                        transform: rotate(45deg);
                    }
                }
            }
            
        }

        .vipMission{
            display: flex;
            flex-direction: column;

            .toNextLevel{
                font-family: SlatePro;
                font-size: 12px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #ffffff;
                text-align: center;
                position: relative;

                .iconfont{
                    cursor: pointer;
                    font-size: 12px;
                }

                .toNextLevelDescription{
                    position: absolute;
                    width: 243px;
                    min-height: 31px;
                    padding: 8px;
                    background-color: #ffffff;
                    border-radius: 2px;
                    // line-height: 31px;
                    font-family: Roboto-Regular;
                    font-size: 12px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #222222;
                    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.5);
                    left: 15px;
                    top: 18px;
                    z-index: 1;

                    &::after{
                        content: '';
                        display: block;
                        width: 10px;
                        height: 10px;
                        background: #fff;
                        position: absolute;
                        top: -4px;
                        left: 56%;
                        transform: rotate(45deg);
                    }
                }
            }

            .toNextLevelProcess{
                position: relative;
                width: 177px;
                margin: 2px 0;

                .processLine{
                    width: 177px;
                    height: 6px;
                    background-color: transparent;
                    border: 1px solid #fff;
                    border-radius: 6px;
                    display: block;
                }

                .processDone{
                    position: absolute;
                    top: 0;
                    width: 0px;
                    height: 6px;
                    background-color: #fff;
                    border-radius: 6px;
                    display: block;
                }
            }

            .toNextLevelLabel{
                display: flex;
                align-items: center;
                justify-content: space-between;
                text-transform: uppercase;
                font-family: SlatePro;
                font-size: 12px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #ffffff;
            }
        }        

        .rulesBox{
            color: #fff;
            width: 554px;
            height: 242px;
            background-color: #222222;
            position: relative;
            border-radius: 0;
            display: flex;
            /* align-items: center; */
            justify-content: center;
            flex-direction: column;

            &::after{
                content: '';
                position: absolute;
                left: -115px;
                top: 0;
                display: block;
                /* border: 95px solid red; */
                border-top: 242px solid transparent;
                border-right: 115px solid #222;
                border-bottom: 0;
                border-left: 0px solid transparent;
            }
            &::before{
                content: '';
                position: absolute;
                top: 0;
                left: -30px;
                display: block;
                /* border: 95px solid red; */
                border-top: 18px solid transparent;
                border-right: 30px solid #222;
                border-bottom: 0;
                border-left: 0px solid transparent;
            }
            div{
                display: block;
                line-height: 18px;
                margin-bottom: 8px;
            }
            .rulesTitle{
                font-family: SlatePro-Medium;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #ffffff;
                // margin-top: 45px;
                margin-bottom: 20px;
            }

            a{
                font-family: SlatePro;
                text-decoration: underline;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #bababa;
                text-transform: capitalize;
            }
        }
    }

    .vipRewards{
        width: 100%;
        // height: 357px;
        background-color: #ffffff;
        margin-top: 20px;
        padding: 29px 16px;

        .vipRewardsTitle{
            font-family: AcuminPro-Bold;
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #222222;
            text-transform: uppercase;
        }

        .rewardItemBox{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: space-between;

            .rewardItem{
                width: 186px;
                height: 72px;
                background-color: #222222;
                border-radius: 2px;
                color: #fff;
                position: relative;
                display: flex;
                padding: 0 32px 0 16px;
                align-items: center;
                margin-top: 20px;
                cursor: pointer;

                .iconfont{
                    font-size: 50px;
                    margin-right: 17px;
                }

                img{
                    width: 50px;
                    margin-right: 10px;
                }

                .levelLock{
                    position: absolute;
                    bottom: 0px;
                    right: 0;
                    transform-style: preserve-3d;
                    color: #222;

                    .iconfont{
                        margin: 0;
                        font-size: 8px;
                    }

                    .triangle{
                        position: absolute;
                        display: block;
                        border-right: 54px solid #ddc35e;
                        border-top: 35px solid transparent;
                        bottom: 0;
                        right: 0;
                        transform: translateZ(-1px);
                    }
                }

                &:nth-child(4n+4){
                    .rewardRules{
                        left: -50px;
                        &::after{
                            left: 65px;
                        }
                    }
                }

                .rewardRules{
                    position: absolute;
                    top: 80px;
                    left: 0;
                    width: 236px;
                    max-height: 213px;
                    background-color: #ffffff;
                    border-radius: 2px;
                    box-shadow: 0px 0px 10px 0px rgba(34,34,34,0.3);
                    z-index: 1;
                    padding: 10px;
                    display: flex;
                    align-items: flex-start;
                    flex-direction: column;

                    &::after{
                        content: '';
                        display: block;
                        position: absolute;
                        top: -5px;
                        left: 20px;
                        width: 10px;
                        height: 10px;
                        background: #fff;
                        transform: rotate(45deg);
                    }

                    .rewardRulesTitle{
                        font-family: AcuminPro-Bold;
                        font-size: 14px;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 16px;
                        letter-spacing: 0px;
                        color: #222222;
                        margin-bottom: 4px;
                    }

                    .rewardRulesClose{
                        color: #222222;
                        font-size: 8px;
                        position: absolute;
                        right: 6px;
                        top: 4px;
                        transform: scale(0.8);
                        margin: 0;
                    }

                    .rewardRulesContent{
                        font-family: SlatePro;
                        font-size: 14px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #222222;
                        overflow: auto;
                        margin-bottom: 4px;
                        flex: 1;
                        line-height: 16px;

                        /*定义整体的宽度*/
                        &::-webkit-scrollbar {
                            width: 6px;
                        }
                        /*定义滚动条轨道*/
                        &::-webkit-scrollbar-track {
                            border-radius: 5px;
                        }
                        /*定义滑块*/
                        &::-webkit-scrollbar-thumb {
                            width: 6px;
                            border-radius: 3px;
                            background-color: #cccccc;
                        }
                        &::-webkit-scrollbar-thumb:hover{
                            background-color: #999; 
                        }
                    }

                    .rewardRulesBtn{
                        width: 100%;
                        height: 30px;
                        background-color: #222222;
                        border-radius: 2px;
                        line-height: 30px;
                        text-align: center;
                        font-family: AcuminPro-Bold;
                        font-size: 14px;
                        font-weight: normal;
                        font-stretch: normal;
                        /* line-height: 16px; */
                        letter-spacing: 0px;
                        color: #ffffff;
                    }

                    .redeemed{
                        background-color: #999;
                    }
                }
            }

        }
    }

    .vipFaqs{
        width: 100%;
        // height: 302px;
        background-color: #ffffff;
        padding: 28px 12px;
        margin-top: 20px;

        .vipFaqsTitle{
            font-family: AcuminPro-Bold;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #222222;
            text-transform: uppercase;
            position: relative;
            text-align: center;
            margin-bottom: 22px;
            display: flex;
            align-items: center;
            justify-content: center;

            .line1{
                display: block;
                width: 200px;
                height: 1px;
                background: #222;
                margin-right: 20px;
                // position: absolute;
                // top: 50%;
                // left: calc(50% - 250px);
            }
            .line2{
                display: block;
                width: 200px;
                height: 1px;
                background: #222;
                margin-left: 20px;
                // position: absolute;
                // top: 50%;
                // right: calc(50% - 250px);
            }
        }

        .vipFaqsContent{
            .vipFaqItem{
                font-family: SlatePro;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #222222;
                margin-bottom: 20px;

                span{
                    line-height: 12px;
                }
                .iconfont{
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    font-size: 12px;
                    transform: scale(0.4) rotate(-90deg);
                    margin-right: 8px;
                    cursor: pointer;
                }
                .faqShow{
                    transform: scale(0.4) rotate(0deg);
                }
                .vipFaqAnswer{
                    font-family: SlatePro;
                    font-size: 12px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #444444;
                    padding: 0 20px;
                    margin-top: 10px;
                }
            }
        }
    }

    .levelUpMask{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(34,34,34,0.3);
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;

        .levelUpMaskContent{
            width: 471px;
            height: auto;
            background-color: #ffffff;
            padding: 29px 18px 26px;

            .levelUpTitle{
                font-family: AcuminPro-Bold;
                font-size: 22px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #222222;
                text-align: center;
                margin-bottom: 20px;
            }

            .levelUpImg{
                width: 255px;
                height: 149px;
                background-image: linear-gradient(135deg, 
                    #000000 0%, 
                    #222222 100%);
                box-shadow: 0px 0px 6px 0px 
                    rgba(0, 0, 0, 0.5);
                border-radius: 4px;
                margin: 0 auto;
                margin-bottom: 30px;

                img{
                    width: 100%;
                    height: 100%;
                }
            }

            .levelUpContent{
                font-family: SlatePro;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #999999;
                text-align: center;
                margin-bottom: 25px;

                .level{
                    color: #e64545;
                }
            }

            .levelUpBtn{
                height: 50px;
                line-height: 50px;
                background-color: #222222;
                border-radius: 3px;
                font-family: AcuminPro-Bold;
                font-size: 20px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #ffffff;
                text-transform: uppercase;
                text-align: center;
                cursor: pointer;
            }
        }

        .redemptionMaskContent{
            width: 471px;
            height: auto;
            background-color: #ffffff;
            border-radius: 3px;
            padding: 32px 13px 20px;
            position: relative;

            .maskClose{
                position: absolute;
                right: 10px;
                top: 10px;
                color: #222;
                cursor: pointer;
            }

            .successIcon{
                width: 84px;
                height: 85px;
                background-color: #ff8031;
                border-radius: 50%;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto;
                font-size: 45px;
                color: #fff;
            }

            .redemptionContent{
                font-family: AcuminPro-Bold;
                font-size: 25px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #222222;
                text-align: center;
                margin: 30px 0 90px;
            }
            .redemptionBtn{
                height: 50px;
                line-height: 50px;
                background-color: #222222;
                border-radius: 3px;
                font-family: AcuminPro-Bold;
                font-size: 20px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #ffffff;
                text-transform: uppercase;
                text-align: center;
                cursor: pointer;
            }
        }
    }
    
    
</style>

<script>
import { mapGetters } from 'vuex';
import {getApi} from '../api/index';
import * as utils from '../utils/geekoutil';
export default {
    data(){
        return{
            faqlists: [],
            levelUpNow: false,
            showLevelUp: false,
            showRedemption: false,
            showVipProgressDescription: false,
            showExpiredTimeDescription: false,
            highLightList: [],
            rewards: [],
            hasMaskShow: false,
            couponRedeemed: false,
            showTagId: -999,
        }
    },
    computed:{
        ...mapGetters(['me']),
        url(){
                return utils.ROUTER_PATH_ME_M + "/"
        },
        headerName(){
            return  this.$t("my_vip.vip_title",{website:this.GLOBAL.sitename||'ChicMe'})
        },
        websiteName(){
            return this.GLOBAL.sitename || 'ChicMe';
        },
        vipConfig(){
            return this.$store.getters['vipConfig']
        },
        vipLevel(){
            if(this.vipConfig.level){
                if((localStorage['customer_vip_level'] && (localStorage['customer_vip_level'] < this.vipConfig.level)) || (!localStorage['customer_vip_level']&&this.vipConfig.level>0)){
                    this.showLevelUp = true;
                    this.levelUpNow = true;
                    localStorage['customer_vip_level'] = this.vipConfig.level
                } else {
                    localStorage['customer_vip_level'] = this.vipConfig.level
                }
            }
            return this.vipConfig.level
        }, 
        vipShowLevelConfig(){
            let config = (this.vipConfig.vipStyles && this.vipConfig.vipStyles.length > 0 && this.vipConfig.level) ? 
                          this.vipConfig.vipStyles.find(v => v.level == this.vipConfig.level) : '';
            return config
        },
        vipCardImg(){
            return 'background-image:url(https://image.geeko.ltd/chicme/20220412/5-16-icon-update/vipcard-v'+this.vipLevel+'.png)';
        },
        vipExpiredDate(){
            let timestamp4 = new Date(this.vipConfig.expiredDate);
            if(this.vipLevel > 0){
                return timestamp4.toLocaleDateString().replace(/\//g, "-")
            } else {
                return ''
            }
        },
        vipProgress(){
            // return {title: 'test title', description: '11111', speed: 0.5}
            return this.vipConfig.progress
        },
        processWidth(){
            return 'width: '+this.vipProgress.speed * 100 +'%;'
        },
        levelTheme(level){
            return 'background:'
        },
        vipLevelUpImg(){
            return this.vipConfig.vipStyles.find(v => v.level == this.vipLevel).cardImageURL
        }
    },
    watch:{
        vipConfig(newV,oldV){
            if(newV){
                let list = (newV.faqs && newV.faqs.length > 0) ? newV.faqs : []
                list.forEach(question => {
                    question['open'] = false
                });
                this.faqlists = list

                newV.vipStyles.forEach((s) => {
                    this.highLightList.push(
                        s.theme.highlight
                    )
                })
                // console.log('???')
                this.rewards = newV.vipStyles[this.vipLevel].rewards.map(r => { 
                    r.showRules = false
                    return r
                })  
            }
        },
        rewards(newV, oldV){
            // console.log(newV[0]['showRules'])
        }
    },
    created(){
        this.$store.dispatch("getVipConfigs").then((res) => {})
        document.addEventListener("click",this.maskClose,false)
    },
    mounted(){
        if(this.$route.query && this.$route.query.reward_id){
            this.showTagId = this.$route.query.reward_id
            this.hasMaskShow = true;
            // console.log(this.showTagId)
        }
    },
    beforeDestroy(){
        document.removeEventListener("click",this.maskClose,false)
    },
    methods:{
        faqItemClick(question){
            this.faqlists = this.faqlists.map(f => {
                if(f.question == question){
                    f.open = !f.open
                }
                return f
            })
        },
        rewardRuleShow(e, id){
            // console.log('...')
            if(window.GeekoSensors){
                window.GeekoSensors.Track('ELClick', {
                    clicks: id,
                    page_sort:"VIP",
                    page_content:"Rewards",
                    platform_type:'PC'
                })
            }
            this.rewards = this.rewards.map(v => {
                if(v.id == e){
                    v.showRules = true
                    this.hasMaskShow = true
                } else {
                    v.showRules = false
                }
                return v
            })
        },
        rewardRuleHide(e,id){
            // console.log('rewardRuleHide',this.showTagId)
            this.showTagId = '';
            if(window.GeekoSensors){
                window.GeekoSensors.Track('ELClick', {
                    clicks: id,
                    get_rewards: false,
                    page_sort:"VIP",
                    page_content:"Rewards",
                    platform_type:'PC'
                })
            }
            this.rewards = this.rewards.map(v => {
                if(v.id == e){
                    v.showRules = false
                }
                return v
            })
        },
        maskClose(e){
            // console.log('maskClose',this.showTagId)
            this.showTagId = ''
            // console.log('sss', this.$refs.main, e.target, this.$refs.main.contains(e.target))
            if (this.$refs.main && !this.$refs.main.contains(e.target)) {
                if(this.hasMaskShow){
                    this.rewards = this.rewards.map(v => {
                        v.showRules = false
                        return v
                    })
                }
            }
            
        },
        linkTo(url,id){
            if(window.GeekoSensors){
                window.GeekoSensors.Track('ELClick', {
                    clicks: id,
                    get_rewards: true,
                    page_sort:"VIP",
                    page_content:"Rewards",
                    platform_type:'PC'
                })
            }
            window.location.href = url;
        },
        getReward(url, id){
            if(this.couponRedeemed){
                return
            }
            if(window.GeekoSensors){
                window.GeekoSensors.Track('ELClick', {
                    clicks: id,
                    get_rewards: true,
                    page_sort:"VIP",
                    page_content:"Rewards",
                    platform_type:'PC'
                })
            }
            // 获取免邮优惠券
            getApi(url).then(res => {
                if(res && res.code == 200){
                    this.showRedemption = true
                    this.couponRedeemed = true
                }
            }).catch(err => {
                console.error('获取免邮优惠券报错:',err)
                alert(err.result)
            })
        },
        redeemClick(){
            this.showRedemption = false;
            window.location.href = '/'
        },
        goLink(url,id){
            if(window.GeekoSensors){
                window.GeekoSensors.Track('ELClick', {
                    clicks: id,
                    get_rewards: true,
                    page_sort:"VIP",
                    page_content:"Rewards",
                    platform_type:'PC'
                })
            }
            this.$router.push({ path: utils.ROUTER_PATH_ME + '/m/' + url})
        }
    }

}
</script>
