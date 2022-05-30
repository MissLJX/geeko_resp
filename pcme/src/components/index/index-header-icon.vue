<template>
    <div class="index-header-icon">
        <div class="m-hd">
            <div class="el-me-headerImage" :style="{'background-image': 'url('+headerImage+'),url('+baseHeaderUrl+')' }"></div>
            <div class="el-me-info">
                <p class="el-me-fullname">
                    {{fullName}}
                    <router-link class="vipLevel" :to="url+'vip'" :style="{'color':vipStyle}" v-if="me.vipUser && vipShow">
                        <span class="iconfont" :style="{'color':vipStyle}">&#xe783;</span>
                        <span>V{{vipLevel}} {{'>'}}</span>
                    </router-link>
                </p>
                <p class="el-me-email">
                    {{me.email}}
                    <span class="verify" v-if="!me.isConfirmEmail" @click="confirmEmail">{{$t('verify')}}</span>
                    <span class="have-verify" v-if="me.isConfirmEmail"><i class="iconfont">&#xe73d;</i>{{$t('verified')}}</span>
                </p>
            </div>
        </div>

        <div class="m-header-icon">
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
            
            <a href="/share" v-if="hasOwnApp">
                <p class="iconfont">&#xe6da;</p>
                <p>{{$t("points_mall.referAFriend")}}</p>
            </a>
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
                }else{
                    return this.me.email;
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
            }
        },
        methods:{
            confirmEmail(){
                this.$emit("update:isloding",true);
                this.$store.dispatch('confirmEmail', this.me.email).then(() => {
                    this.$emit("update:isloding",false);
                    this.$emit("update:isShowConfirm",true);
                }).catch((data) => {
                    this.$emit("update:isloding",false);
                    alert(data.result)
                })
            },
            getName(value){
                return value ? value : '';
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
        .m-hd{
            display: flex;
            align-items: center;
            .el-me-headerImage {
                width: 96px;
                height: 96px;
                background: no-repeat center/cover;
                border-radius: 50%;
            }
            .el-me-info{
                margin-left: 20px;
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
                    margin-top: 12px;
                    span{
                        margin-left: 10px;
                    }
                    .verify{
                        color: #E64545;
                        text-decoration: underline;
                        cursor: pointer;
                    }
                    .have-verify{
                        color: #57b936;
                        font-size: 14px;
                    }
                }
            }
            &:after{
                display: block;
                clear: both;
                content: '';
            }
        }

        .m-header-icon{
            display: flex;
            justify-content: space-between;
            background-color: #ffffff;
            margin: 0px -20px;
            margin-top: 20px;
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
</style>