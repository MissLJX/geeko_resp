<template>
    <div class="index-message">
        <div class="_hd">
            <a @click.prevent="specificationLogin('/me/m/notification',1)">
                <span class="iconfont" :class="{'active' : notificationCount > 0}">&#xe60b;</span>
            </a>
            
            <a @click.prevent="specificationLogin('/me/m/settings',1)">
                <span class="iconfont">&#xe6e6;</span>
            </a>
            
            <!-- <a href="/cart">
                <span class="iconfont">&#xe6a4;</span>
                <span 
                    class="_num" 
                    v-if="shoppingCartCount > 0"
                    :class="{'special-count' : shoppingCartCount && shoppingCartCount < 10}"
                >{{shoppingCartCount}}</span>
            </a> -->
        </div>

        <div class="login-message" v-if="!isLogin" @click="specificationLogin()">
            <div class="iconfont">&#xe6ca;</div>
            <div class="_font">{{messageM1518}}</div>
            <div class="iconfont">&#xe694;</div>
        </div>

        <div class="header-icon">
            <div class="st-table">
                <div class="st-cell st-v-m icon-container">
                    <div class="icon" :style="{'background-image': 'url('+getHeaderImage+'),url('+baseHeaderUrl+')' }" @click="specificationLogin('/me/m/edit-message',1)" >
                        <span class="_bg" v-if="isLogin">
                            <span class="iconfont _icon">&#xe6ce;</span>
                        </span>
                    </div>
                </div>
                <div class="st-cell edit st-v-m">
                    <p @click="changeToLogin">{{disposeName}}</p>
                    <div class="bio" @click="toEditUserBio">
                        <span>{{me && me.bio ? me.bio : "Introduce yourself to others…"}}</span>
                        <span class="iconfont">&#xe6ce;</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="discount">
            <a @click.prevent="specificationLogin('/me/m/coupons',1)">
                <p class="iconfont">
                    <span :class="{'_font' : isLogin}">{{getFeedNum(feed && feed.canUseCouponCount,"&#xe6dc;")}}</span>
                </p>
                <p>{{$t("label.coupons")}}</p>
            </a>
            <a @click.prevent="specificationLogin('/me/m/credits',1)">
                <p class="iconfont">
                    <span :class="{'_font' : isLogin}">{{getFeedNum(feed && feed.points,"&#xe6db;")}}</span>
                </p>
                <p>{{$t("index.points")}}</p>
            </a>
            <a @click.prevent="specificationLogin('/me/m/creditcards',1)">
                <p class="iconfont">&#xe6dd;</p>
                <p>{{$t("index.wallet")}}</p>
            </a>
            <a href="/share">
                <p class="iconfont">&#xe6da;</p>
                <p>{{$t("index.get_discount")}}</p>
            </a>
        </div>

        <div class="order">
            <div class="order-container">
                <div class="order-hd st-table">
                    <div class="st-cell my-order">{{$t("index.my_order")}}</div>
                    <div class="st-cell st-t-r view-all" @click="specificationLogin('/me/m/order/all')">{{$t("index.view_all")}} ></div>
                </div>

                <div class="order-bd">
                    <a href="/" @click.prevent="specificationLogin('/me/m/order/unpaid')">
                        <p class="iconfont">
                            <span>&#xe6df;</span>
                            <span 
                                class="_count" 
                                :class="{'special-count' : orderCountUnpaid && orderCountUnpaid < 10}"
                                v-if="getOrderNum(orderCountUnpaid)"
                            >{{getOrderNum(orderCountUnpaid)}}</span>
                        </p>
                        <p>{{$t("index.unpaid")}}</p>
                    </a>
                    <a href="/" @click.prevent="specificationLogin('/me/m/order/processing')">
                        <p class="iconfont">
                            <span>&#xe6e0;</span>
                            <span class="_count"
                                :class="{'special-count' : feed && feed.awaitingDeliveryCount < 10}"
                                v-if="getOrderNum(feed && feed.awaitingDeliveryCount)"
                            >
                                {{getOrderNum(feed && feed.awaitingDeliveryCount)}}
                            </span>
                        </p>
                        <p>{{$t("index.processing")}}</p>
                    </a>
                    <a href="/" @click.prevent="specificationLogin('/me/m/order/shipped')">
                        <p class="iconfont">
                            <span>&#xe6e4;</span>
                            <span 
                                class="_count"
                                :class="{'special-count' : feed && feed.orderShippedCount < 10}"
                                v-if="getOrderNum(feed && feed.orderShippedCount)"
                            >{{getOrderNum(feed && feed.orderShippedCount)}}</span>
                        </p>
                        <p>{{$t("index.shipped")}}</p>
                    </a>
                    <a href="/" @click.prevent="specificationLogin('/me/m/order/confirmed')">
                        <p class="iconfont">
                            <span>&#xe6de;</span>
                            <span 
                                class="_count"
                                :class="{'special-count' : feed && feed.orderAwaitingReviewCount < 10}"
                                v-if="getOrderNum(feed && feed.orderAwaitingReviewCount)"
                            >{{getOrderNum(feed && feed.orderAwaitingReviewCount)}}</span>
                        </p>
                        <p>{{$t("point.review")}}</p>
                    </a>
                    <a href="/" class="not-mar" @click.prevent="specificationLogin('/me/m/order/canceled')">
                        <p class="iconfont">
                            <span>&#xe6e3;</span>
                            <span 
                                class="_count"
                                :class="{'special-count' : feed && feed.orderCancelCount < 10}"
                                v-if="getOrderNum(feed && feed.orderCancelCount)"
                            >{{getOrderNum(feed && feed.orderCancelCount)}}</span>
                        </p>
                        <p>{{$t("index.returns")}}</p>
                    </a>
                </div>
            </div>
        </div>

        <div class="service">
            <div class="service-container">
                <div class="service-hd">
                    {{$t("index.my_services")}}
                </div>

                <div class="service-bd">
                    <a href="/f/mobile/contact_us">
                        <p class="iconfont">&#xe6e1;</p>
                        <p>{{$t("index.suport")}}</p>
                    </a>
                    <a @click.prevent="specificationLogin('/me/m/survey',1)">
                        <p class="iconfont">&#xe6e2;</p>
                        <p>{{$t("point.survey")}}</p>
                    </a>
                    <a @click.prevent="specificationLogin('/me/m/makeSug',1)">
                        <p class="iconfont">&#xe6e5;</p>
                        <p>{{$t("point.suggestion")}}</p>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import store from '../../../store/index.js';
    import * as utils from '../../../utils/geekoutils.js';

    export default {
        name:"IndexMessage",
        computed:{
            ...mapGetters('me', [
                'pointsAllSkip','me', "isLogin", 'feed', 'notificationCount', 'orderCountUnpaid',"shoppingCartCount","messageM1518"
            ]),
            baseHeaderUrl() {
                if (window.name === 'chicme') {
                    return 'https://image.geeko.ltd/chicme/20210813/icon.png';
                } else if (window.name === 'ivrose') {
                    return 'https://image.geeko.ltd/chicme/20210813/iv.png';
                } else {
                    return 'https://image.geeko.ltd/chicme/20210813/bq.png';
                }
            },
            disposeName(){
                if(this.isLogin && this.me && this.me.nickname){
                    return this.me.nickname;
                }else if(this.isLogin && this.me.name && (this.me.name.firstName || this.me.name.lastName)){
                    return this.getName(this.me.name.firstName) + " " + this.getName(this.me.name.lastName);
                }else if(this.isLogin && !(this.me && this.me.nickname && this.me.name && this.me.name.firstName && this.me.name.lastName)){
                    return this.me.email;
                }
                return this.$t("index.login_or_register");
            },
            getHeaderImage(){
                let headerIcon = store.getters["me/headerImage"];
                return headerIcon ? headerIcon : this.baseHeaderUrl;
            }
        },
        methods:{
            getFeedNum(num,icon){
                if(this.isLogin && num >= 0){
                    return num;
                }else if(!this.isLogin && icon){
                    return icon;
                }
                return;
            },
            getOrderNum(num){
                return this.isLogin && num > 0 ? num : "";
            },
            toEditUserBio(){
                if(this.isLogin){
                    this.$router.push({name:"edit-bio"});
                }else{
                    window.location.href = '/i/login?redirectUrl?=/me/m/edit-bio';
                }
            },
            specificationLogin(path,difference){
                if(this.isLogin){
                    if(difference){
                        this.$router.push({path:path});
                    }else{
                        window.location.href = utils.PROJECT + path;
                    }
                }else{
                    window.location.href = `/i/login?redirectUrl=${path}`;
                }
            },
            changeToLogin(){
                if(!this.isLogin){
                    window.location.href = "/i/login?redirectUrl=/me/m";
                }
            },
            getName(value){
                return value ? value : '';
            }
        },
        created:function(){
            store.dispatch('me/countNotifications');

            store.dispatch('me/getOrderCountUnpaid');

            // store.dispatch("me/getShoppingCartNum");

            store.dispatch("me/getIndexLoginMessageCode","M1518");
        }
    }
</script>

<style scoped lang="scss">
    .index-message{
        // padding-top: 20px;
        ._hd{
            padding: 10px 0px;
            padding-right: 20px;
            text-align: right;
            & .iconfont{
                font-size:18px;
                color:#222222;
                margin-left: 5px;
                position: relative;

                &.active{
                    &::after{
                        content: '';
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        background-color: #e64545;
                        position: absolute;
                        top: -2px;
                        right: 0px;
                        border-radius: 50%;
                    }
                }
            }

            & > a{
                position: relative;
            }

            ._num{
                position: absolute;
                background-color: #e64545;
                top: -10px;
                right: -10px;
                color: #fff;
                padding: 2px 2px;
                border-radius: 50%;
                text-align: center;
                font-size: 12px;
            }

            .special-count{
                padding: 1.5px 5px;
            }
        }

        .login-message{
            padding: 10px 0px;
            background-color: #fff8e1;
            display: flex;
            margin-bottom: 20px;

            ._font{
                font-size: 12px;
                color: #222222;
                flex: 1;
            }

            .iconfont{
                font-size: 12px;
                text-align: center;
                width: 30px;
            }
        }

        .header-icon{
            padding: 0px 14px;
            .icon{
                width: 78px;
                height: 78px;
                background: no-repeat 50%/cover;
                border-radius: 50%;
                position: relative;

                ._bg{
                    width: 22px;
                    height: 22px;
                    line-height: 25px;
                    background-color: #222222;
                    border-radius: 50%;
                    display: inline-block;
                    position: absolute;
                    right: 0px;
                    bottom: 0px;
                    text-align: center;
                    cursor: pointer;

                    ._icon{
                        color: #ffffff;
                        font-size: 13px;
                    }
                }
            }

            .icon-container{
                width: 100px;
            }

            .edit{
                & > p{
                    font-family: 'SlatePro-Medium';
                    font-size: 20px;
                    color: #000000;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    width: 180px;
                }

                & .bio{
                    height: 28px;
	                background-color: #f5f5f5;
	                border-radius: 14px;
                    line-height: 28px;
                    text-align: center;
                    padding: 0px 15px;
                    margin-top: 7px;
                    width: 150px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    position: relative;
                    color: #999999;

                    & span{
                        font-size: 12px;
                        color: #999999;
                    }

                    & .iconfont{
                        color: #bbbbbb;
                        position: absolute;
                        right: 5px;
                        z-index: 2;
                    }
                }
            }
        }

        .discount{
            display: flex;
            margin-top: 20px;
            padding: 0px 5px;

            & > a{
                flex: 1;
                display: inline-block;
                text-align: center;

                & > p{
                    &:first-child{
                        font-size: 20px;
                    }

                    &:last-child{
                        font-size: 12px;
                        color: #000000;
                        margin-top: 4px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }

            ._font{
                font-family: 'SlatePro-Medium';
                font-size: 16px;
                color: #000000;
            }
        }

        .order{
            padding: 0px 12px;
            margin-top: 20px;
    
            .order-container{
                background-color: #ffffff;
                border-radius: 10px;
                padding: 15px 0px;

                .order-hd{
                    width: 100%;
                    padding: 0px 15px;

                    .my-order{
                        font-size: 14px;
                        color: #000000;
                        font-family: 'SlatePro-Medium';
                    }

                    .view-all{
                        font-size: 12px;
                        color: #999999;
                    }
                }

                .order-bd{
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    margin-top: 15px;
                    
                    & > a{
                        color: #222222;
                        display: inline-block;
                        width: calc(25% - 10px);
                        margin-bottom: 24px;
                        text-align: center;

                        & > p{
                            &:first-child{
                                font-size: 20px;
                                position: relative;
                            }

                            &:last-child{
                                font-size: 12px;
                                color: #000000;
                                margin-top: 4px;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                        }
                    }
                    .not-mar{
                        margin-bottom: 0px;
                    }

                    ._count{
                        position: absolute;
                        background-color: #e64545;
                        top: -10px;
                        left: 57%;
                        color: #fff;
                        padding: 2px 4px;
                        border-radius: 50%;
                        text-align: center;
                        font-size: 12px;
                    }

                    .special-count{
                        padding: 1px 7px;
                    }
                }
            }
        }

        .service{
            padding: 0px 12px;
            margin-top: 15px;
            .service-container{
                background-color: #ffffff;
                border-radius: 10px;
                padding: 15px 0px;

                .service-hd{
                    font-size: 14px;
                    color: #000000;
                    font-family: 'SlatePro-Medium';
                    padding: 0px 15px;
                }

                .service-bd{
                    margin-top: 15px;
                    & > a{
                        color: #222222;
                        display: inline-block;
                        width: calc(25% - 10px);
                        text-align: center;

                        & > p{
                            &:first-child{
                                font-size: 20px;
                            }

                            &:last-child{
                                font-size: 12px;
                                color: #000000;
                                margin-top: 4px;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                        }
                    }
                }
            }
            
        }
    }
</style>