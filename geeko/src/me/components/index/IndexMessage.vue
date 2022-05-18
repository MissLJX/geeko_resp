<template>
    <div class="index-message">
        <div class="_hd">
            <a @click.prevent="specificationLogin('/me/m/wishlist',1)">
                <span class="iconfont">&#xe6a2;</span>
            </a>
            
            <a @click.prevent="specificationLogin('/me/m/notification',1)" class="notification_icon">
                <!-- <span class="iconfont" :class="{'active' : notificationCount > 0}">&#xe60b;</span> -->
                <span class="iconfont" style="display: inline-block;transform: scale(1.3);" :class="{'active' : notificationCount > 0}">&#xe70b;</span>
                <span class="no_read_num" v-if="notificationCount > 0" >
                    {{notificationCount}}
                </span>
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

        <!-- <div class="login-message" v-if="!isLogin" @click="specificationLogin('/me/m')">
            <div class="iconfont">&#xe6ca;</div>
            <div class="_font">{{messageM1518}}</div>
            <div class="iconfont">&#xe694;</div>
        </div> -->
        
        <swiper v-if="swiperData && swiperData.length > 0" :notification-data.sync="swiperData" :email="email"></swiper>

        <div class="guest-user" v-if="me && me.temporary">
            <span>{{$t("label.guest_user")}}</span>
            <span class="iconfont" @click="gustUserModalEvent()">&#xe718;</span>
        </div>

        <div class="header-icon">
            <div class="st-table">
                <div class="st-cell st-v-m icon-container">
                    <div class="icon" 
                        :style="{'background-image': 'url('+getHeaderImage+'),url('+baseHeaderUrl+')' }" 
                        @click="specificationLogin('/me/m/edit-message',1)"
                    >
                        <span class="_bg" v-if="isLogin">
                            <span class="iconfont _icon">&#xe6ce;</span>
                        </span>
                    </div>
                </div>
                <div class="st-cell edit st-v-m">
                    <p>
                        <span class="user-name" @click="changeToLogin">{{disposeName}}</span>
                        <span class="vip-level" @click="toVipPageEvent" v-if="me && me.vipUser">
                            <span class="iconfont" :style="`color:${levelColor};`">&#xe783;</span>
                            <span class="level" :style="`color:${levelColor};`">V{{me.vipUser.level}}></span>
                        </span>
                    </p>
                    <div class="bio" @click="toEditUserBio">
                        <span>{{me && me.bio ? me.bio : `${$t('label.introduce_to_others')}…`}}</span>
                        <span class="iconfont">&#xe6ce;</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="discount">
            <!-- click-name  记录事件全局捕获了此事件  命名都不重复即可 -->
            <a @click.prevent="specificationLogin('/me/m/coupons',1)" click-name="Coupons">
                <p class="iconfont">
                    <span :class="{'_font' : isLogin}">{{getFeedNum(feed && feed.canUseCouponCount,"&#xe6dc;")}}</span>
                </p>
                <p>{{$t("label.coupons")}}</p>
            </a>
            <a @click.prevent="specificationLogin('/me/m/credits',1)" click-name="Points">
                <p class="iconfont" v-if="!isLogin">
                    <span :class="{'_font' : isLogin}">{{getFeedNum(feed && feed.points,"&#xe6db;")}}</span>
                </p>
                <div style="position:relative;height:23px;" v-if="isLogin">
                    <img class="animation_points_icon" style="width:23px;" src="https://image.geeko.ltd/2021-11-01-lottery/2021-11-01-lottery-points.png" alt="">
                    <span class="animation_points_text _font">{{getFeedNum(feed && feed.points,"&#xe6db;")}}</span>
                </div>
                <p>{{$t("index.points")}}</p>
            </a>
            <a @click.prevent="specificationLogin('/me/m/creditcards',1)" click-name="Wallet">
                <p class="iconfont">&#xe6dd;</p>
                <p>{{$t("index.wallet")}}</p>
            </a>

            <template v-if="getDownLoadImage">
                <a href="/share" click-name="Get$10">
                    <p class="iconfont">&#xe6da;</p>
                    <p>{{$t("label.refer")}}</p>
                </a>
            </template>

            <!-- 积分膨胀提示组件 -->
            <index-points-modal :index-message="dobulePoints.me.message" v-if="dobulePoints && dobulePoints.me"></index-points-modal>
        </div>

        <div class="order">
            <div class="order-container">
                <div class="order-hd st-table">
                    <div class="st-cell my-order">{{$t("index.my_order")}}</div>
                    <div 
                        class="st-cell st-t-r view-all" 
                        @click="specificationLogin('/me/m/order/all')"
                    >{{$t("index.view_all")}} ></div>
                </div>

                <div class="order-bd">
                    <a href="/" @click.prevent="specificationLogin('/me/m/order/unpaid')" click-name="Unpaid">
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
                    <a href="/" @click.prevent="specificationLogin('/me/m/order/processing')" click-name="Processing">
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
                    <a href="/" @click.prevent="specificationLogin('/me/m/order/shipped')" click-name="Shipped">
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
                    <a href="/" @click.prevent="specificationLogin('/me/m/order/confirmed')" click-name="Review">
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
                    <!-- <a href="/" class="not-mar" @click.prevent="specificationLogin('/me/m/order/canceled')" click-name="Returns">
                        <p class="iconfont">
                            <span>&#xe6e3;</span>
                            <span 
                                class="_count"
                                :class="{'special-count' : feed && feed.orderCancelCount < 10}"
                                v-if="getOrderNum(feed && feed.orderCancelCount)"
                            >{{getOrderNum(feed && feed.orderCancelCount)}}</span>
                        </p>
                        <p>{{$t("label.canceled")}}</p>
                    </a> -->
                </div>
            </div>
        </div>

        <div class="service">
            <div class="service-container">
                <div class="service-hd">
                    {{$t("index.my_services")}}
                </div>

                <div class="service-bd">
                    <a @click.prevent="specificationLogin('/support')" click-name="Support">
                        <p class="iconfont">&#xe6e1;</p>
                        <p>{{$t("index.suport")}}</p>
                    </a>
                    <a @click.prevent="specificationLogin('/me/m/survey',1)" click-name="Survey">
                        <p class="iconfont">&#xe6e2;</p>
                        <p>{{$t("point.survey")}}</p>
                    </a>
                    <a @click.prevent="specificationLogin('/me/m/makeSug',1)" click-name="Suggestion">
                        <p class="iconfont" style="font-size:18px;">&#xe6e5;</p>
                        <p>{{$t("point.suggestion")}}</p>
                    </a>
                    <a class="vip-container" @click.prevent="specificationLogin('/me/m/vip',1)" click-name="Vip" v-if="me && me.vipUser">
                        <p class="iconfont">&#xe783;</p>
                        <p>VIP</p>

                        <span class="vip-new" v-if="showNewVip">
                            <span>{{ $t('label.new') }}</span>
                        </span>
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

    import IndexPointsModal from "./IndexPointsModal.vue"

    import Swiper from "../../../components/swiper/swiper.vue"
    import _ from "lodash"

    export default {
        name:"IndexMessage",
        data(){
            return {
                swiperData:[],
                noCommentedMaskShow: false,
                showNewVip:false
            }
        },
        components:{
            "swiper":Swiper,
            "index-points-modal":IndexPointsModal
        },
        computed:{
            ...mapGetters('me', [
                'pointsAllSkip','me', "isLogin", 'feed', 'notificationCount', 'orderCountUnpaid',"shoppingCartCount","messageM1518","hasNoCommentOrder","dobulePoints"
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
            },
            email(){
                if(this.isLogin){
                    return this.me.email;
                }else{
                    return "";
                }
            },
            getDownLoadImage(){
                return !!window.downloadIcon;
            },
            levelColor:function(){
                if(this.me && this.me.vipUser){
                    let customerLevel = this.me.vipUser.level;
                    let color = "";
                    switch(customerLevel){
                        case 0:
                            color = "#B4CCE7";
                            break;
                        case 1:
                            color = "#F8B0BC";
                            break;
                        case 2:
                            color = "#A9D4C0";
                            break;
                        case 3:
                            color = "#DDC35E";
                            break;
                        default:
                            color = "#DDC35E";
                            break;
                    }

                    return color;
                }
            }
        },
        watch:{
            hasNoCommentOrder(newV, oldV){
                let cookie = utils.getLocalCookie('_has_no_comment_order')
                if(!cookie && this.isLogin){
                    if(newV){
                        this.showMask()
                    }
                }
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
                        this.$router.push({path:utils.PROJECT + path});
                    }else{
                        window.location.href = utils.PROJECT + path;
                    }
                }else{
                    window.location.href = utils.PROJECT + `/i/login?redirectUrl=${path}`;
                }
            },
            changeToLogin(){
                if(!this.isLogin){
                    window.location.href = "/i/login?redirectUrl=/me/m";
                }
            },
            toVipPageEvent(){
                this.$router.push({name:'user-vip'});
            },
            getName(value){
                return value ? value : '';
            },
            showMask(){
                // this.noCommentedMaskShow = true
                // this.fixedBody('hidden')
                let that = this
                this.modalShow(this.$t("index.no_comment_order"),'',()=>{
                    that.specificationLogin('/me/m/order/confirmed')
                })
            },
            
            modalShow(message,message2,callback){
                let _this = this;
                _this.$store.dispatch('confirmShow', {
                    show: true,
                    cfg: {
                        btnFont:{
                            yes:"OK",
                        },
                        btnClose: true,
                        message: message,
                        message2:message2,
                        yes: function () {
                            _this.$store.dispatch('closeConfirm').then(() => {
                                utils.saveUserHasNoCommentOrderState(false)
                                if(callback) callback();
                            });
                        },
                        no: function () {
                            _this.$store.dispatch('closeConfirm').then(()=>{
                                utils.saveUserHasNoCommentOrderState(false)
                            });
                        },
                        style:{
                            box:{
                                width: '250px',
                                borderRadius: '2px',
                                padding: '26px 25px',
                                boxShadow: 'none'
                            },
                        }
                    }
                })
            },
            gustUserModalEvent(){
                let _this = this;
                this.$store.dispatch('confirmShow', {
                    show: true,
                    cfg: {
                        btnFont:{
                            yes:this.$t("label.set_password"),
                            no:this.$t("label.cancel")
                        },
                        message: this.$t("label.guest_user"),
                        message2:this.$t("label.temporay_account_set_password"),
                        yes: function () {
                            _this.$store.dispatch('closeConfirm').then(() =>{
                                _this.$router.push({name:"set-password"});
                            });
                        },
                        no:function(){
                            _this.$store.dispatch('closeConfirm');
                        },
                        style:{
                            box:{
                                padding:"15px 12px",
                                width:"70%"
                            },
                            message:{
                                fontSize:"14px",
                            },
                            message2:{
                                color:"#222222",
                                fontSize:"12px"
                            },
                            btnYes:{
                                fontSize:"14px",
                                fontFamily: 'SlatePro-Medium',
                                textTransform: 'uppercase'
                            },
                            btnNo:{
                                fontSize:"14px",
                                fontFamily: 'SlatePro-Medium',
                                textTransform: 'uppercase'
                            }
                        }
                    }
                })
            }
        },
        created:async function(){
            // store.dispatch("me/getShoppingCartNum");
            if(this.isLogin){
                store.dispatch('me/countNotifications');

                store.dispatch('me/getOrderCountUnpaid');

                store.dispatch('me/getHasNoCommentOrder')
            }

            if(!this.isLogin){
                // 未登录 清除这个cookie
                utils.removeLocalCookie('_has_no_comment_order')

                let message1518 = await store.dispatch("me/getIndexLoginMessageCode","M1518");
                let obj1 = {
                    id:'message1518',
                    icon:"&#xe6ca;",
                    icon2:"&#xe694;",
                    message:message1518,
                    isClick:true
                };
                message1518 && this.swiperData.push(obj1);
            }else if(this.isLogin && this.me.temporary){
                let obj2 = {
                    id:'100',
                    icon:"&#xe6ca;",
                    icon2:"&#xe694;",
                    message:this.$t("label.set_password_more_discount"),
                    isClick:false,
                    clickFunction:() =>{
                    }
                };
                this.swiperData.push(obj2);
            }else if(this.isLogin && !this.me.isConfirmEmail){
                let message1543 = await store.dispatch("me/getIndexLoginMessageCode","M1543");
                let obj2 = {
                    id:'message1519',
                    icon:"&#xe6ca;",
                    icon2:"&#xe694;",
                    message:message1543,
                    isClick:true
                };
                this.swiperData.push(obj2);
            }

            !(this.dobulePoints && this.dobulePoints.me) && store.dispatch("me/getDobulePointsData","M1578");


            if(this.me && this.me.vipUser){
                let cacheLevel = window.localStorage.getItem('customer_vip_level');
                let customerLevel = this.me.vipUser.level;

                if(customerLevel > cacheLevel || (cacheLevel == null && customerLevel > 0)){
                    this.showNewVip = true;
                }
            }
        },
        mounted(){
            // let cookie = utils.getLocalCookie('_has_no_comment_order')
            // console.log(this.hasNoCommentOrder)
            // if(!cookie && this.isLogin){
            //     if(!this.hasNoCommentOrder){
            //         this.showMask()
            //     }
            // }
        },
    }
</script>

<style scoped lang="scss">
@font-face {
  font-family: 'iconfont';  /* Project id 384296 */
  src: url('//at.alicdn.com/t/font_384296_4k0ybw8fob4.woff2?t=1649817988386') format('woff2'),
       url('//at.alicdn.com/t/font_384296_4k0ybw8fob4.woff?t=1649817988386') format('woff'),
       url('//at.alicdn.com/t/font_384296_4k0ybw8fob4.ttf?t=1649817988386') format('truetype');
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
    .index-message{
        // padding-top: 20px;
        ._hd{
            padding: 10px 0px;
            padding-right: 20px;
            text-align: right;
            & .iconfont{
                font-size:18px;
                color:#222222;
                margin-left: 15px;
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

            .notification_icon {
                position: relative;
                // display: inline-block;

                .no_read_num{
                    position: absolute;
                    display: block;
                    min-width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background-color: #e64545;
                    color: #fff;
                    text-align: center;
                    line-height: 16px;
                    font-size: 12px;
                    padding: 0px 4px;
                    top: -10px;
                    left: 70%;
                    color: #fff;
                    z-index: 1;
                }
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

        .guest-user{
            margin-top: 15px;
            padding-left: 14px;

            & > span{
                &:first-child{
                    font-family: 'SlatePro-Medium';
                    font-size: 20px;
                    color: #000000;
                }

                &:last-child{
                    font-size: 12px;
                    cursor: pointer;
                    color: #000000;
                }
            }
        }

        .header-icon{
            padding: 0px 14px;
            margin-top: 20px;
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
                    display: flex;
                    align-items: center;
                    

                    .user-name{
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        max-width: 150px;
                        display: inline-block;
                        margin-right: 5px;
                    }

                    .vip-level{
                        padding: 1px 10px;
                        background-color: #222222;
                        border-radius: 13px;
                        display: inline-block;

                        .level{
                            font-size: 14px;
                            color: #ddc35e;
                            font-family: 'AcuminPro-Bold';
                            vertical-align: middle;
                        }

                        .iconfont{
                            color: #ddc35e;
                            font-size: 14px;
                            vertical-align: middle;
                        }
                    }
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
            position: relative;

            & > a{
                flex: 1;
                display: inline-block;
                text-align: center;
                max-width: 25%;

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
                        // margin-bottom: 24px;
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
                    display: flex;
                    flex-wrap: wrap;
                    // justify-content: space-between;

                    & > a{
                        color: #222222;
                        display: inline-block;
                        width: 25%;
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

                    .vip-container{
                        position: relative;

                        .vip-new{
                            display: inline-block;
                            position: absolute;
                            background-color: #e64545;
                            padding: 0 2px;
                            border-radius: 8px;
                            top: -11px;
                            right: 13%;

                            & > span{
                                font-family: 'AcuminPro-Bold';
                                font-size: 12px;
                                color: #ffffff;
                                display: inline-block;
                                transform: scale(0.7);
                                text-transform: uppercase;
                            }
                        }
                    }
                }
            }
            
        }
    }
</style>