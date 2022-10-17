<template>
    <div class="credits-points">
        <div class="_header">
            <p>{{$t("point.my_points")}}</p>
            <a href="/policy/bonus-point-pc">
                {{$t("point.learn_about_points")}} {{this.GLOBAL.sitename}} {{$t("point.points")}}
                <span class="iconfont">&#xe73f;</span>
            </a>
        </div>

        <div class="points">
            <div class="tot-credits fl-l">
                <p><span class="p-red">{{pointsCustomer.points}}</span></p>
                <p style="font-size: 12px;color: #222222;">
                    <span>= {{pointsCustomer.exchangeAmount}}</span>
                    <span class="dobule-icon" v-if="dobulePoints && dobulePoints.points"></span>
                </p>
            </div>
            <div class="line fl-l"></div>
            <div class="overdue-credits fl-l">
                <p class="p-red">{{pointsCustomer.overduePoints}}</p>
                <div class="p-rla">
                    <span>{{$t('point.points_expired_soon')}}<i class="iconfont"  @click="isShow()">&#xe73f;</i></span>
                    <div class="tips" v-if="seen">{{message.message}}.</div>
                </div>
            </div>


            <div class="points-message-modal" v-if="dobulePoints && dobulePoints.points">
                <p class="_hd">{{dobulePoints.points.discount}}</p>
                <div class="_bd">
                    <span class="_font">{{dobulePoints.points.message}}</span>
                    <count-down 
                        :timeLeft="getTimeLeft" 
                        v-if="getTimeLeft >= 1000" 
                        :timeStyle="{width:'16px',height:'16px',backgroundColor:'#ffffff',color:'#222222',padding:'2px',borderRadius:'2px',fontSize:'16px',fontFamily: 'AcuminPro-Bold'}"
                        :show-hour="true"
                        :show-day="false"
                        :show-second="true"
                        class="countdown"
                    />
                </div>
            </div>

        </div>

        <!-- <div class="r-u">
            <div class="rec fl-l" @click="changeMethod()" :class="{ active: isActive }">{{$t('received')}}</div>
            <div class="use fl-l" @click="changeMethod()" :class="{ active: !isActive }">{{$t('used')}}</div>
        </div> -->

        <points-container></points-container>

        <div class="get-method">
            <div class="c-hd">{{$t("point.how_to_get_points")}}</div>
            <div class="_bd">
                <a @click="()=>openEarnMask()">
                    <div class="methodBox">
                        <div>
                            <img src="https://image.geeko.ltd/20220113/My-Points-Buy-Earn.png" alt="">
                        </div>
                        <div class="_font">
                            <p>{{$t("points_mall.buyAndEarn")}}</p>
                            <p>{{pointsExchange}}</p>
                        </div>
                    </div>
                </a>
                <a @click="()=>routTo({path:'/me/m/order?type=review',type:'Review'})" >
                    <div class="review">
                        <div>
                            <img src="https://image.geeko.ltd/20220113/My-Points-review.png" alt="">
                        </div>
                        <div class="_font">
                            <p>{{$t("point.review")}}</p>
                            <p>0~2000 {{$t("point.points")}}</p>
                        </div>
                    </div>
                </a>
                
                
                <!-- <router-link :to="{name:'survey'}">
                    <div class="survey">
                        <div>
                            <span class="iconfont">&#xe6cf;</span>
                        </div>
                        <div class="_font">
                            <p>Survey</p>
                            <p>0~300 points</p>
                        </div>
                    </div>
                </router-link> -->
                
                <a @click="()=>routTo({path:makeSuggestionUrl, type:'Suggestion'})">
                    <div class="suggestion">
                        <div>
                            <img src="https://image.geeko.ltd/20220113/My-Points-suggestion.png" alt="">
                        </div>
                        <div class="_font">
                            <p>{{$t("point.suggestion")}}</p>
                            <p>200 {{$t("point.points")}}</p>
                        </div>
                    </div>
                </a>

                <a @click="()=>toShare()" v-if="getDownLoadImage">
                    <div class="review">
                        <div>
                            <img src="https://image.geeko.ltd/20220113/My-Points-refer.png" alt="">
                        </div>
                        <div class="_font">
                            <p>{{$t("points_mall.referAFriend")}}</p>
                            <p>{{$t("points_mall.upToXPoints", {x:500})}}</p>
                        </div>
                    </div>
                </a>
                
                <a @click="()=>routTo({path:'/me/m/survey',type:'Survey'})">
                    <div class="review">
                        <div>
                            <img src="https://image.geeko.ltd/20220113/My-Points-survey.png" alt="">
                        </div>
                        <div class="_font">
                            <p>{{$t("points_mall.survey")}}</p>
                            <p>150 {{$t("point.points")}}</p>
                        </div>
                    </div>
                </a>
                <a @click="()=>openMoreMask()">
                    <div class="review">
                        <div>
                            <img src="https://image.geeko.ltd/20220113/My-Points-moreways.png" alt="">
                        </div>
                        <div class="_font">
                            <p>{{$t("points_mall.moreWays")}} ></p>
                        </div>
                    </div>
                </a>
                
                <!-- <a href="/i/download" v-if="getDownLoadImage">
                    <div class="download">
                        <div class="_image">
                            <img :src="getDownLoadImage" alt="code">
                        </div>
                        <div class="_font">
                            <p>{{$t("point.download_app")}}</p>
                            <p>{{$t("point.get_more_points")}}</p>
                        </div>
                    </div>
                </a> -->

                <!-- <a :href="pointsMallUrl" v-if="showPointsMall">
                    <div class="pointsMall">
                        <div>
                            <span class="iconfont">&#xe703;</span>
                        </div>
                        <div class="_font">
                            <p>{{$t("points_mall.points_mall")}}</p>
                            <p>{{$t("points_mall.points_more")}}</p>
                        </div>
                    </div>
                </a> -->
            </div>
        </div>

        <!-- redeemCoupon -->
        <div class="get-method" v-if="redeemCouponShow">
            <div class="c-hd">{{ $t("label.hot_use_points") }}</div>
            <div class="_bd">
                <a @click="()=>routTo({path:`${GLOBAL.getUrl('/me/m/redeem-coupon')}`, type:'Redeem'})">
                    <div class="methodBox">
                        <div>
                            <img src="https://image.geeko.ltd/chicme/2022022201/My-Points-Redeem-Coupon.png" alt="My-Points-Redeem-Coupon">
                        </div>
                        <div class="_font">
                            <p>{{ $t("label.redeem_coupon") }}</p>
                            <p></p>
                        </div>
                    </div>
                </a>
            </div>
        </div>


        <loding v-if="isLoadingShow"></loding>

        <div v-if="showEarnMask || (showMoreMask && moreWayList.length > 0)" class="maskBox" @click.self="closeMask()">
            <div class="earnBox" v-if="showEarnMask">
                <span class="iconfont closeImg" @click.self="closeMask()">&#xe7c9;</span>
                <div class="maskTitle">{{$t("points_mall.buyAndEarn")}}</div>
                <div class="maskContent" v-html="earnMaskContent">
                    <!-- <div>1. You’ll earn 1 point for every dollar spent on your purchase.</div>

                    <div>2. Points will be credited to your account once you Confirm delivery of your order.<br>
                    ↓↓<br>
                    Log into your ChicMe account<br>
                    ↓↓<br>
                    Click on "My Orders"<br>
                    ↓↓<br>
                    Select orders you have received and click on "Confirm order "</div> -->
                </div>
                <div class="maskBtn" @click="goShopping">{{$t("points_mall.shop_now")}}</div>
            </div>

            <div class="moreBox" v-if="showMoreMask">
                <span class="iconfont closeImg" @click.self="closeMask()">&#xe7c9;</span>
                <div class="maskTitle">{{$t("points_mall.moreWays")}}</div>
                <div class="maskContent">
                    <div class="moreItem" v-for="item in moreWayList" @click="()=>linkTo(item.type)">
                        <div class="moreItemTitle">{{item.title}}</div>
                        <div class="moreItemDescription">
                            {{item.content}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import * as utils from '../utils/geekoutil';
    import _ from 'lodash'
    import PointsContainer from './point/PointsContainer.vue'
    import loding from './loding.vue'

    import CountDowns from "./countdowns.vue"
    import {getMessage, getSurveyQuestions , getShowRedeemCoupons} from '../api/index.js';

    export default {
        computed: {
            ...mapGetters(['credits','message','me',"dobulePoints"]),
            indexUrl(){
                return utils.PROJECT + '/'
            },
            shoppingcartUrl(){
                return utils.PROJECT + '/cart'
            },
            confirmEmailUrl(){
                return utils.ROUTER_PATH_ME + '/m/change-email'
            },
            makeSuggestionUrl(){
                return utils.ROUTER_PATH_ME + '/m/makeSug'
            },
            pointsCustomer(){
                return this.$store.getters["point/pointsCustomerNum"];
            },
            getDownLoadImage(){
                return window.downloadIcon ? window.downloadIcon : "";
            },
            getTimeLeft(){
                if(this.dobulePoints && this.dobulePoints.points){
                    let nowTimeStrap = new Date().getTime();
                    return this.dobulePoints.points.endTime - nowTimeStrap;
                }
                return 0;
            },
            pointsMallUrl(){
                return (window.ctx||'')+'/i/points-mall';
            },
            showPointsMall(){
                return window.showPointsMall;
            },
        },
        data(){
            return{
                seen:false,
                isActive:true,
                isHaveRec:false,
                isHaveUse:false,
                isReceived:'0',
                isLoadingShow:false,
                showMoreMask: false,
                showEarnMask: false,
                moreWayList: [],
                earnMaskContent:'',
                pointsExchange: '',
                redeemCouponShow:false
            }
        },
        methods: {
            isShow: function(){
                this.seen = !this.seen;
            },
            routTo({path,type}){
                // console.log(path,type)
                if(window.GeekoSensors && type){
                    window.GeekoSensors.Track('PitPositionClick', {
                        page_sort:"Me",
                        page_content: "Points",
                        resourcepage_title:"Points_"+type,
                        resource_content:type
                    })
                }
                this.$router.push(path)
            },
            openEarnMask(){
                if(window.GeekoSensors){
                    window.GeekoSensors.Track('PitPositionClick', {
                        page_sort:"Me",
                        page_content: "Points",
                        resourcepage_title:"Points_BuyEarn",
                        resource_content:"BuyEarn"
                    })
                }
                this.showEarnMask = true;
            },
            openMoreMask(){
                if(window.GeekoSensors){
                    window.GeekoSensors.Track('PitPositionClick', {
                        page_sort:"Me",
                        page_content: "Points",
                        resourcepage_title:"Points_MoreWays",
                        resource_content:"MoreWays"
                    })
                }
                this.showMoreMask = true;
            },
            closeMask(){
                this.showMoreMask = false;
                this.showEarnMask = false;
            },
            goShopping(){
                window.location.href = '/';
            },
            createMoreWays(){
                getSurveyQuestions('M1538').then((res)=> {
                    if(res && res.code == 200){
                        let list = []
                        for(let i in res.result){
                            !res.result[i]['isApp'] && list.push(res.result[i])
                        }
                        this.moreWayList = list
                    }
                })
            },
            createBuyAndEarn(){
                getMessage('M1624').then(res => {
                    if(res && res.message){
                        this.earnMaskContent = res.message
                    }
                })
            },
            getPointsExchange(){
                getMessage("M1630").then(res => {
                    if(res && res.message){
                        this.pointsExchange = res.message
                    }
                })
            },
            linkTo(type){
                switch(type){
                    case 1:
                        this.routTo({path:"/me/m/my-measurements",type:''});
                        return;
                    case 2:
                        this.routTo({path:"/me/m/my-preference",type:''});
                        return;
                    case 3:
                        this.routTo({path:"/me/m/change-email",type:''});
                        return;
                    default:
                        return;
                }
            },
            toShare(){
                window.location.href = "/share";
            }
        },
        components:{
            "points-container":PointsContainer,
            "loding":loding,
            "count-down":CountDowns
        },
        created(){
            // console.log(this.$route)
            this.$store.dispatch('getMessage', 'M1138');
            this.createMoreWays()
            this.createBuyAndEarn()
            this.getPointsExchange()
            // this.$store.dispatch('getCredits',{skip:0});
            this.$store.dispatch('getMe');
            this.isLoadingShow = true;
            let _this = this;
            this.$store.dispatch("point/getCustomerPointsNum").then(() => {
                _this.isLoadingShow = false;
            });

            !(this.dobulePoints && this.dobulePoints.points) && this.$store.dispatch("getDobulePointsData","M1578");

            getShowRedeemCoupons().then(data =>{
                // console.log(data);
                if(data && !!data.result){
                    this.redeemCouponShow = data.result;
                }
            });
        },
        mounted(){
            if(window.GeekoSensors){
                window.GeekoSensors.Track('PitPositionExposure', {
                    page_sort:"Me",
                    page_content: "Points",
                    resourcepage_title:"Points_BuyEarn",
                    resource_content:"BuyEarn"
                })

                window.GeekoSensors.Track('PitPositionExposure', {
                    page_sort:"Me",
                    page_content: "Points",
                    resourcepage_title:"Points_Review",
                    resource_content:"Review"
                })

                window.GeekoSensors.Track('PitPositionExposure', {
                    page_sort:"Me",
                    page_content: "Points",
                    resourcepage_title:"Points_Suggestion",
                    resource_content:"Suggestion"
                })

                window.GeekoSensors.Track('PitPositionExposure', {
                    page_sort:"Me",
                    page_content: "Points",
                    resourcepage_title:"Points_ReferFriend",
                    resource_content:"ReferFriend"
                })

                window.GeekoSensors.Track('PitPositionExposure', {
                    page_sort:"Me",
                    page_content: "Points",
                    resourcepage_title:"Points_Survey",
                    resource_content:"Survey"
                })

                window.GeekoSensors.Track('PitPositionExposure', {
                    page_sort:"Me",
                    page_content: "Points",
                    resourcepage_title:"Points_MoreWays",
                    resource_content:"MoreWays"
                })

                window.GeekoSensors.Track('PitPositionExposure', {
                    page_sort:"Me",
                    page_content: "Points",
                    resourcepage_title:"Point_Redeem",
                    resource_content:"Redeem"
                })
            }
        }
    }
</script>

<style scoped lang="scss">

    @font-face {
        font-family: 'iconfont';  /* Project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_wjqn1ci550k.woff2?t=1640236331770') format('woff2'),
            url('//at.alicdn.com/t/font_384296_wjqn1ci550k.woff?t=1640236331770') format('woff'),
            url('//at.alicdn.com/t/font_384296_wjqn1ci550k.ttf?t=1640236331770') format('truetype');
    }
    .iconfont{
        font-family:"iconfont" !important;
        font-size:16px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }
    .credits-points{
        margin-top: -50px;

        ._header{
            text-align: center;

            & p{
                font-family: 'SlatePro-Medium';
                font-size: 30px;
                color: #000000;
                text-transform: uppercase;
            }

            & a{
                font-size: 16px;
                color: #666666;
                margin:13px 0px 36px;
                display: inline-block;

                & .iconfont{
                    color: #cccccc;
                }

                &:hover{
                    text-decoration: underline;
                    color: #222;
                }
            }
        }
    }
    
    .points{
        width: 915px;
        height: 145px;
        background-color: #f9f9f9;
        position: relative;
        .fl-l{
            float: left;
        }
        .line{
            width: 1px;
            height: 115px;
            margin: 15px 0;
            background-color: #e6e6e6;
        }
        .tot-credits, .overdue-credits{
            width: 457px;
            text-align: center;
            padding-top: 35px;
        }
        .p-red{
            color: #E64545;
            font-family: 'SlatePro-Medium';
            font-size: 40px;
        }
        .tot-credits{
            font-size: 20px;
            color: #222;
            p{
                margin-bottom: 5px;
                line-height: normal;

                & span{
                    vertical-align: middle;
                }

                .dobule-icon{
                    width: 16px;
                    height: 16px;
                    display: inline-block;
                    background-image: url(https://image.geeko.ltd/chicme/2021111101/pengzhang.svg);
                    background-size: cover;
                    line-height: 20px;
                }
            }
        }
        .overdue-credits{
            p{
                margin-bottom: 5px;
            }
            i{
                margin-left: 10px;
                cursor: pointer;
            }
            .p-rla{
                span{
                    font-size: 12px;
                    color: #222222;
                }
                i{
                    color: #999;
                    &:hover{
                        opacity: .8;
                    }
                }
                position: relative;
                .tips{
                    position: absolute;
                    top: 30px;
                    right: 0;
                    width: 420px;
                    height: 113px;
                    background-color: #ffffff;
                    border-radius: 4px;
                    border: solid 1px #e6e6e6;
                    text-align: left;
                    padding: 20px 0 0 20px;
                    color: #666;
                }
            }
        }

        .points-message-modal{
            background-color: #222222;
            padding: 8px 10px;
            position: absolute;
            width: 190px;
            left:103px;
            top: 112px;
            -os-box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.3);
            -ms-box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.3);
            box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.3);
            color: #ffffff;
            text-align: center;

            ._hd{
                color: #ffffff;
                font-size: 14px;
                font-family: 'AcuminPro-Bold';
            }

            ._bd{
                // display: flex;
                ._font{
                    color: #ffffff;
                    font-size: 12px;
                    font-family: 'AcuminPro-Bold';
                }

                .countdown{
                    margin-top: 5px;
                }
            }

            &::after{
                content: ' ';
                position: absolute;
                width: 10px;
                height: 10px;
                right:30px;
                top: -4px;
                background-color: #222222;
                transform:rotate(315deg);
                -moz-transform:rotate(315deg); 	/* Firefox */
                -webkit-transform:rotate(315deg); /* Safari 和 Chrome */
                box-shadow: 0px 0px 0px 0 transparent, 0 0px 0px 0px transparent, 0 0 0 0 transparent, 1px -1px 2px -1px rgba(0,0,0,0.25);
            }
        }
    }
    .special{
        i{
            font-size: 30px !important;
            display: inline-block;
            margin-bottom: 6px;
            top: 3px;
        }
    }
    .get-method{
        padding-top: 40px;
        .c-hd{
            width: 100%;
            line-height: 48px;
            font-size: 24px;
            color: #000000;
            font-family: 'SlatePro-Medium';
            text-transform: uppercase;
        }

        ._bd{
            display: flex;

            & > a{
                margin-bottom: 10px;
                display: inline-block;
                cursor: pointer;
                margin-right: 14px;
                width: 145px;
                height: 161px;
                background-color: #ffffff;
                box-shadow: 1px 2px 4px 0px 
                    rgba(0, 0, 0, 0.08);
                border-radius: 16px;
                border: solid 1px #e6e6e6;

                & > div{
                    height: 100%;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    text-align: center;

                    & > div{
                        height: 30%;

                        img{
                            height: 100%;
                        }
                    }

                }

                & .iconfont{
                    font-size: 42px;
                    // color: #ffffff;
                    // margin-right: 10px;
                }

                & ._font{
                    height: 30%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    
                    & > p:first-child{
                        font-size: 14px;
                        color: #222;
                        font-family: 'AcuminPro-Bold';
                        margin: 20px 0 3px;
                    }

                    & > p:last-child{
                        font-size: 12px;
	                    color: #222;
                    }
                }
            }
            
            // .review{
            //     background-image: linear-gradient(124deg, 
            //         #ff8976 0%, 
            //         #ffcca8 100%);
            //     // border-radius: 4px;
            // }

            // .survey{
            //     background-image: linear-gradient(124deg, 
            //         #b886b4 0%, 
            //         #dab1db 100%);
            //     // border-radius: 4px;
            // }

            // .suggestion{
            //     background-image: linear-gradient(124deg, 
            //     #77efbf 0%, 
            //     #7dede2 100%);
            //     // border-radius: 4px;
            // }
            // .pointsMall{
            //     background-image: linear-gradient(124deg, #73a9f9 0%, #b2dbf9 100%);
            //     // border-radius: 4px;
            // }

            .download{
                padding: 0px 10px;
                background-image: linear-gradient(124deg, 
                    #a7a7a7 0%, 
                    #d9d9d9 100%);
                border-radius: 4px;

                & .iconfont{
                    font-size: 27px;
                }

                ._image{
                    width: 42px;
                    height: 42px;
                    // margin-right: 10px;

                    & > img{
                        width: 100%;
                        display: block;
                    }
                }
            }
        }
    }
    .maskBox{
        position: fixed;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.6);
        display: flex;
        align-items: center;
        justify-content: center;

        .earnBox,.moreBox{
            width: 420px;
            min-height: 200px;
            background: #FFF;
            position: relative;
            padding: 18px 20px 20px;

            .maskContent{
                font-family: 'SLATEPRO';
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 18px;
                letter-spacing: 0px;
                color: #222222;
                text-align: center;
            }
            .maskBtn{
                height: 37px;
                background-color: #222222;
                border-radius: 2px;
                font-family: 'ACUMINPRO-BOLD';
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #fff;
                text-align: center;
                line-height: 37px;
                text-transform: uppercase;
                margin-top: 28px;
                cursor: pointer;
            }
            .moreItem{
                border-bottom: 1px solid #f2f2f2;
                padding-bottom: 10px;
                margin-bottom: 10px;
                text-align: left;
                cursor: pointer;

                .moreItemTitle{
                    font-family: 'ACUMINPRO-BOLD';
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 18px;
                    letter-spacing: 0px;
                    color: #222222;
                }

                .moreItemDescription{
                    font-family: 'SLATEPRO';
                    font-size: 12px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 18px;
                    letter-spacing: 0px;
                    color: #999999;
                    margin-top: 8px;
                }
            }
        }
        // .moreBox{
        //     width: 420px;
        //     min-height: 200px;
        //     background: #FFF;
        //     position: relative;
        //     padding: 18px 20px 20px;
        // }

        .closeImg{
            font-size: 12px;
            position: absolute;
            right: 8px;
            top: 8px;
            color: #999;
            cursor: pointer;
        }
        .maskTitle{
            font-family: 'ACUMINPRO-BOLD';
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 20px;
            letter-spacing: 0px;
            color: #222222;
            text-align: center;
            margin-bottom: 8px;
        }
    }
    

</style>