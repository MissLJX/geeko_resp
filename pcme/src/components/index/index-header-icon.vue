<template>
    <div class="index-header-icon">
        <div class="m-hd">
            <div class="el-me-headerImage" :style="{'background-image': 'url('+headerImage+'),url('+baseHeaderUrl+')' }"></div>
            <div class="el-me-info">
                <p class="el-me-fullname">{{fullName}}</p>
                <p class="el-me-email">
                    {{me.email}}
                    <span class="verify" v-if="!me.isConfirmEmail" @click="confirmEmail">{{$t('verify')}}</span>
                    <span class="have-verify" v-if="me.isConfirmEmail"><i class="iconfont">&#xe73d;</i>{{$t('verified')}}</span>
                </p>
            </div>
        </div>

        <div class="m-header-icon">
            <router-link to="/me/m/coupons">
                <p class="iconfont">
                    <span class="_font" v-if="feed && feed.canUseCouponCount">{{feed && feed.canUseCouponCount}}</span>
                    <span v-else>&#xe6dc;</span>
                </p>
                <p>{{$t("index.coupons")}}</p>
            </router-link>

            <router-link to="/me/m/credits">
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
            
            <router-link to="/me/m/cards">
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
            isLogin(){
                return window.__is_login__
            },
            headerImage:function(){
                return this.$store.getters.headerImage;
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
            }
        }
    }
</script>

<style lang="scss" scoped>

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