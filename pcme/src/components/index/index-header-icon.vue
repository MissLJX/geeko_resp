<template>
    <div class="index-header-icon">
        <div class="m-hd" :style="headBackImg">
            <div class="el-me-headerImage" v-if="!vipShow" :style="{'background-image': 'url('+headerImage+'),url('+baseHeaderUrl+')' }"></div>

            <router-link v-if="vipShow" class="toProfile" :to="getUrl('/me/m/updateProfile')">
                <div class="el-me-headerImage" :style="{'background-image': 'url('+headerImage+'),url('+baseHeaderUrl+')' }"></div>
                <span class="iconfont">&#xe6ce;</span>
            </router-link>

            <div class="el-me-info" :style="meInfoStyle">
                <p class="el-me-fullname" :style="fullnameStyle">
                    {{fullName}}
                    <span v-if="vipShow" style="font-size:20px;" class="iconfont">&#xe783;</span>
                </p>
                <p class="el-me-email" :style="emailStyle" >
                    {{me.email}}
                    <span class="verify" v-if="!me.isConfirmEmail && me.email" :style="verifyStyle" @click="confirmEmail">{{$t('verify')}}</span>
                    <span class="have-verify" v-if="me.isConfirmEmail && !vipShow && me.email"><i class="iconfont">&#xe73d;</i>{{$t('verified')}}</span>
                </p>
            </div>
            <div v-if="me.vipUser && vipShow">
                <router-link class="toVipTag" :to="getUrl('/me/m/vip')">
                    <span class="iconfont">&#xe783;</span>
                    <span>
                        {{vipTag}}
                        <span class="red_point" v-if="showVipNew"></span>
                    </span>
                    <span class="iconfont">&#xe690;</span>
                </router-link>
            </div>
        </div>

        <div class="m-header-icon" :style="headerIconStyle">
            <router-link :to="url+'coupons'">
                <p class="iconfont">
                    <span class="_font" v-if="feed && feed.canUseCouponCount">{{feed && feed.canUseCouponCount}}</span>
                    <span v-else>&#xe6dc;</span>
                </p>
                <p>{{$t("index.coupons")}}</p>
            </router-link>

            <router-link :to="url+'credits'">
                <p class="iconfont" v-if="!isLogin">
                    <span class="_font" v-if="feed && feed.points">{{feed && feed.points}}</span>
                    <span v-else>&#xe6db;</span>
                </p>
                <div style="position:relative;height:24px;" v-if="isLogin">
                    <img class="animation_points_icon" style="width:24px;" src="https://image.geeko.ltd/2021-11-01-lottery/2021-11-01-lottery-points.png" alt="">
                    <span class="animation_points_text _font">{{feed && feed.points}}</span>
                </div>
                <p>{{$t("point.points")}}</p>
            </router-link>
            
            <router-link :to="url+'cards'">
                <p class="iconfont">&#xe6dd;</p>
                <p>{{$t("index.wallet")}}</p>
            </router-link>
            
            <a href="/share" v-if="hasOwnApp && !vipShow">
                <p class="iconfont">&#xe6da;</p>
                <p>{{$t("points_mall.referAFriend")}}</p>
            </a>

            <router-link class="hasNew" :to="url+'vip'" v-if="me.vipUser && vipShow">
                <p style="font-size:24px;" class="iconfont">&#xe783;</p>
                <p style="margin-top: 4px;">VIP</p>
                <span class="newTip" v-if="showVipNew">
                    <span>{{$t("my_vip.new")}}</span>
                </span>
            </router-link>

            <!-- <a v-if="!(me.vipUser && vipShow)" href="javascript:;" style="visibility:hidden;"></a> -->


        </div>
    </div>
</template>

<script>
    import * as utils from '../../utils/geekoutil.js';

    export default {
        name:"IndexHeaderIcon",
        props:{
            me:{
                type:Object,
                default:() => {
                    return {};
                }
            },
            feed:{
                type:Object,
                default:() => {
                    return {}
                }
            }
        },
        computed:{
            // headerImage(){
            //     if(this.me.id){
            //         return utils.imageutil.getHeaderImg(this.me.id)
            //     }
            // },
            vipShow:function(){
                return this.$store.getters.vipShow;
            },
            url(){
                return window.location.pathname + "/"
            },
            isLogin(){
                return window.__is_login__
            },
            headerImage:function(){
                return this.$store.getters.headerImage;
            },
            vipShow:function(){
                return this.$store.getters.vipShow;
            },
            baseHeaderUrl() {
                return 'https://image.geeko.ltd/site/pc/icon35.png';
            },
            fullName() {
                if(this.me && this.me.nickname){
                    return this.me.nickname;
                }else if(this.me.name && (this.me.name.firstName || this.me.name.lastName)){
                    return this.getName(this.me.name.firstName) + " " + this.getName(this.me.name.lastName);
                } else if(this.me.email){
                    return this.me.email
                } else if(this.me.phoneNumber){
                    return this.me.phoneNumber
                }
            },
            hasOwnApp(){
                return window.downloadIcon ? true : false
            },
            vipLevel(){
                let level = this.me.vipUser ? this.me.vipUser.level ? this.me.vipUser.level : 0 : 0;
                // if(!localStorage['customer_vip_level']){
                //     localStorage['customer_vip_level'] = level
                // }
                return level
            },
            vipStyle(){
                return this.vipLevel == 0 ? '#B4CCE7' : this.vipLevel == 1 ? '#F8B0BC' : this.vipLevel == 2 ? '#A9D4C0' : '#DDC35E';
            },
            headBackImg(){
                return this.vipShow && `
                                        align-items:flex-start;
                                        height: 200px;
                                        padding: 30px 22px;
                                        background-color: #dcdcdc;
                                        border-radius: 12px;
                                        background-image: url(https://image.geeko.ltd/chicme/20220615/PCME${this.vipLevel}.png);`
            },
            meInfoStyle(){
                return this.vipShow && 'margin-top:17px;'
            },
            headerIconStyle(){
                return this.vipShow && `margin-top:20px`;
            },
            fullnameStyle(){
                return this.vipShow && `color:#fff;
                                        font-size:22px;
                                        font-family: Roboto-Bold;
                                        font-weight: bold;
                                        line-height: 25px;
                                        `
            },
            emailStyle(){
                return this.vipShow && `color:#fff;`
            },
            verifyStyle(){
                return this.vipShow && `color: #fff;`

            },
            vipTag(){
                return window.name + ' VIP V'+this.vipLevel; 
            },
            showVipNew(){
                if((!localStorage['customer_vip_level'] && this.vipLevel > 0) || (localStorage['customer_vip_level'] && (localStorage['customer_vip_level'] < this.vipLevel))){
                    // localStorage['customer_vip_level'] = this.vipLevel
                    return true
                } else {
                    if(localStorage['customer_vip_level'] && (localStorage['customer_vip_level'] > this.vipLevel)){
                        localStorage['customer_vip_level'] = this.vipLevel;
                    }
                    // localStorage['customer_vip_level'] = this.vipLevel
                    return false
                }
            },
        },
        methods:{
            confirmEmail(){
                this.$emit("update:isloding",true);
                this.$store.dispatch('confirmEmail', this.me.email).then((response) => {
                    // this.$emit("update:isShowConfirm",true);
                    // console.error('response',response)
                    // response.prompt = {
                    //     "bonusPoints": 100,
		            //     "html": "<div style='text-align: center;'><img src='https://image.geeko.ltd/chicme/2021111101/modal_points.png' alt='ModalPoints' style='width:50%;'><p style='font-weight:bold;font-size:24px;margin: 0;'>100 Points</p><p style='margin: 0;font-size: 12px;'><span>100 points = 1 USD.</span><a href='https://www.chicme.com/policy/bonus-point' style='vertical-align: middle;'><img src='https://image.geeko.ltd/chicme/2021111101/question.png' alt='Question' style='width: 14px;height: 14px;'></a></p><p style='margin: 0;font-size: 12px;line-height: 12px;margin-top: 10px;font-family: Roboto-Regular'>Saved Successfully!</p><p style='margin: 0;font-size: 12px;font-family: Roboto-Regular;'>You’ve got <span style='color: #e64545;font-weight: bold;font-family: Roboto-Regular;'>100 points</span> in your account</p></div>"
                    // };
                    if(response.prompt?.html){
                        this.showPointsTip(response.prompt?.html);
                    }else{
                        let str = `<div style="min-height: 80px;padding-top: 40px;font-family: 'AcuminPro-Bold';font-size: 18px;">${this.$t('checkmailbox')}</div>`;
                        this.showPointsTip(str);
                    }
                    this.$emit("update:isloding",false);
                }).catch((data) => {
                    this.$emit("update:isloding",false);
                    alert(data.result)
                })
            },
            showPointsTip(conent){
                this.$store.dispatch("setTipContent", conent);
                this.$store.dispatch("setShowTip", true);
                this.$store.dispatch("setTipType", 'points');
            },
            getName(value){
                return value ? value : '';
            },
            getUrl(suffix){
                return utils.PROJECT + suffix;
            },
        },
        created(){
            // console.log(this.me)
        }
    }
</script>

<style lang="scss" scoped>

@font-face {
  font-family: 'iconfont';  /* Project id 384296 */
  src: url('//at.alicdn.com/t/font_384296_7dp6xnq8izd.woff2?t=1651826405142') format('woff2'),
       url('//at.alicdn.com/t/font_384296_7dp6xnq8izd.woff?t=1651826405142') format('woff'),
       url('//at.alicdn.com/t/font_384296_7dp6xnq8izd.ttf?t=1651826405142') format('truetype');
}

.animation_points_icon{
    animation: icon_exchange 5s linear infinite;
    position: absolute;
    left: calc(50% - 12px);
}
.animation_points_text{
    display: block;
    position: absolute;
    width: 100%;
    line-height: 23px;
    opacity: 0;
    animation: icon_exchange 5s linear 2.5s infinite;
}
@keyframes icon_exchange{
    0%{
        opacity: 0;
        transform: rotateY(180deg);
    }
    2%{
        opacity: 0.6;
        transform: rotateY(180deg);
    }
    10%{
        opacity: 1;
        transform: rotateY(0deg);
    }
    42%{
        opacity: 1;
        // transform: rotateY(0deg);
        // transform: rotateY(90deg);
    }
    50%{
        opacity: 0;
        // transform: rotateY(180deg);
        // display: none;
    }
    100%{
        opacity: 0;
        // display: none;
        // transform: rotateY(0);
    }
}
    .index-header-icon{
        background: #f7f7f7;

        .m-hd{
            display: flex;
            align-items: center;
            width: 100%;
            
            background-size: 100% 100%;
            background-repeat: no-repeat;
            padding: 24px 20px 0;
            position: relative;
            background-color: #fff;
            

            .toProfile{
                position: relative;

                .iconfont{
                    display: block;
                    width: 22px;
                    height: 22px;
                    background: #000;
                    color: #fff;
                    text-align: center;
                    line-height: 22px;
                    border-radius: 50%;
                    font-size: 12px;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                }
            }
            .el-me-headerImage {
                width: 96px;
                height: 96px;
                background: no-repeat center/cover;
                border-radius: 50%;
            }
            .el-me-info{
                // margin-top: 17px;
                margin-left: 20px;
                flex: 1;
                .el-me-fullname{
                    font-size: 16px;
                    color: #222;

                    .vipLevel{
                        // width: 55px;
                        // height: 21px;
                        background-color: #222222;
                        border-radius: 10px;
                        color: #fff;
                        padding: 1px 5px;
                        margin-left: 13px;

                        span{
                            font-family: AcuminPro-Bold;
                            font-size: 14px;
                            font-weight: normal;
                            font-stretch: normal;
                            letter-spacing: 0px;
                        }

                        .iconfont{
                            color:#fff;
                            font-size: 12px;
                        }
                    }
                }
                .el-me-email{
                    font-size: 14px;
                    color: #666;
                    // color: #fff;
                    margin-top: 12px;
                    span{
                        margin-left: 10px;
                    }
                    .verify{
                        color: #E64545;
                        // color: #fff;
                        text-decoration: underline;
                        cursor: pointer;
                    }
                    .have-verify{
                        color: #57b936;
                        // color: #fff;
                        font-size: 14px;
                    }
                }
            }
            &:after{
                display: block;
                clear: both;
                content: '';
            }
            .toVipTag{
                position: absolute;
                right: 12px;
                bottom: 18px;
                font-size: 14px;
                font-family: Roboto-Bold, Roboto;
                font-weight: bold;
                color: #FFFFFF;
                line-height: 17px;
                text-transform: uppercase;
                cursor: pointer;

                .iconfont{
                    font-size: 12px;
                }

                .red_point{
                    display: inline-block;
                    width: 5px;
                    height: 5px;
                    background: #E64545;
                    margin-bottom: 3px;
                    border-radius: 50%;
                }
            }
        }

        .m-header-icon{
            display: flex;
            justify-content: space-between;
            background-color: #ffffff;
            // margin: 0px -20px;
            height: 95px;
            // margin-top: 20px;
            align-items: center;

            & > a{
                width: calc(25% - 20px);
                display: inline-block;
                text-align: center;
                text-decoration: none;
                cursor: pointer;

                & > p{
                    &:first-child{
                        font-size: 22px;
                        color: #000000;
                    }

                    &:last-child{
                        font-size: 14px;
                        color: #000000;
                        margin-top: 4px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }

            ._font{
                font-family: 'AcuminPro-Bold';
                font-size: 18px;
                color: #000000;
            }
        }
    }

    .hasNew{
        position: relative;
        p {
            color:#DDC35E !important;
        }
        
        .iconfont{
            color:#DDC35E !important;
        }

        .newTip{
            position: absolute;
            top: -3px;
            // right: calc(50% - 26px);
            left: 50%;
            display: block;
            /* width: 20px; */
            height: 16px;
            background-color: #e64545;
            border-radius: 8px;
            line-height: 16px;
            color: #fff;
            text-align: center;
            font-family: AcuminPro-Bold;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #ffffff;

            span{
                font-size: 18px;
                transform: scale(0.5);
                text-transform: uppercase;
                display: block;
            }
        }
    }
</style>