<template>
    <div class="received-used">
        <div class="_hd">
            {{$t("point.how_to_get_points")}}
        </div>

        <div class="_bd">
            <a :href="GLOBAL.getUrl('/i/points-mall')" v-if="showPointsMall">
                <div class="pointsMall" >
                    <div>
                        <span class="iconfont">&#xe703;</span>
                    </div>
                    <div class="_font">
                        <p>{{$t("points_mall.points_mall")}}</p>
                        <p>{{$t("points_mall.points_more")}}</p>
                    </div>
                </div>
            </a>

            <a @click="buyEarnEvent($event)">
                <div class="buy-earn">
                    <div>
                        <span class="iconContainer"></span>
                    </div>
                    <div class="_font">
                        <p>Buy and Earn</p>
                        <p>US$1 = 1 POINTS</p>
                    </div>
                </div>
            </a>

            <a @click="recordEventSkip(false,'/me/m/order/confirmed','Review',$event)">
                <div class="review">
                    <div>
                        <span class="iconContainer"></span>
                    </div>
                    <div class="_font">
                        <p>{{$t("point.review")}}</p>
                        <p>0~2000 points</p>
                    </div>
                </div>
            </a>

            <router-link to="/" @click.native="recordEventSkip(true,'/me/m/makeSug','Suggestion',$event)">
                <div class="suggestion">
                    <div>
                        <span class="iconContainer"></span>
                    </div>
                    <div class="_font">
                        <p>{{$t("point.suggestion")}}</p>
                        <p>0~200 points</p>
                    </div>
                </div>
            </router-link>

            <a @click="recordEventSkip(false,'/share','ReferFriend',$event)">
                <div class="refer">
                    <div>
                        <span class="iconContainer">&#xe6d2;</span>
                    </div>
                    <div class="_font">
                        <p>{{$t("label.refer")}}</p>
                        <p>Up to 500 points</p>
                    </div>
                </div>
            </a>
            
            <router-link to="/" @click.native="recordEventSkip(true,'/me/m/survey','Survey',$event)">
                <div class="survey">
                    <div>
                        <span class="iconContainer"></span>
                    </div>
                    <div class="_font">
                        <p>{{$t("point.survey")}}</p>
                        <p>150 points</p>
                    </div>
                </div>
            </router-link>

            <router-link to="/" @click.native="recordEventSkip(true,'/me/m/point-guide','MoreWays',$event)">
                <div class="more">
                    <div>
                        <span class="iconContainer"></span>
                    </div>
                    <div class="_font">
                        <p>More Ways ></p>
                        <p></p>
                    </div>
                </div>
            </router-link>
            
            
            <!-- <router-link :to="GLOBAL.getUrl('/me/m/point-guide')" :class="{'fd global-overflow':true,'show100':!showPointsMall}">
                <div style="padding:0px;">
                    <div class="_font" style="white-space: normal;line-height: 20px;">
                        {{$t("point.more_ways_to_earn_more_points")}} >
                    </div>
                </div>
                
            </router-link> -->
        </div>

        
    </div>
</template>

<script>
    import {getMessage} from "../api/index"

    export default {
        data(){
            return{
                selectValue:0
            }
        },
        mounted:function(){
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
            }
        },
        computed:{
            showPointsMall(){
                return window.showPointsMall
            }
        },
        methods:{
            buyEarnEvent:async function(event){
                event.preventDefault();
                let response = await getMessage("M1624");
                if(!!response?.message){
                    let _this = this;
                    this.$store.dispatch('confirmShow', {
                        show: true,
                        cfg: {
                            btnFont:{
                                yes:"SHOP NOW",
                            },
                            btnClose: true,
                            message: "Buy and Earn",
                            message2:response?.message,
                            yes: function () {
                                _this.$store.dispatch('closeConfirm').then(() =>{
                                    window.location.href = _this.GLOBAL.getUrl("/");
                                });
                            },
                            no:function(){
                                _this.$store.dispatch('closeConfirm');
                            },
                            style:{
                                box:{
                                    padding:"15px 12px"
                                },
                                btnClose:{
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    top:"5px",
                                    right:"4px"
                                },
                                message:{
                                    fontSize:"16px",
                                    fontFamily: 'AcuminPro-Bold'
                                },
                                message2:{
                                    color:"#222222"
                                },
                                btnYes:{
                                    fontSize:"14px",
                                    fontFamily: 'AcuminPro-Bold'
                                }
                            },
                            htmlMessage2:true
                        }
                    })
                }

                if(window.GeekoSensors){
                    window.GeekoSensors.Track('PitPositionClick', {
                        page_sort:"Me",
                        page_content: "Points",
                        resourcepage_title:"Points_BuyEarn",
                        resource_content:"BuyEarn"
                    })
                }
            },
            recordEventSkip(type,path,eventName,event){
                // type true表示路由跳转  false表示window.location跳转
                // path 路径或者跳转的名字
                // eventName  事件的名字
                event.preventDefault();
                if(!!type){
                    this.$router.push(this.GLOBAL.getUrl(path));
                }else{
                    window.location.href = this.GLOBAL.getUrl(path);
                }

                if(window.GeekoSensors){
                    window.GeekoSensors.Track('PitPositionClick', {
                        page_sort:"Me",
                        page_content: "Points",
                        resourcepage_title:`Points_${eventName}`,
                        resource_content:eventName
                    })
                }
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
    .received-used{
        margin-bottom: 15px;
        ._hd{
            font-size: 14px;
            color: #222222;
            font-family: 'AcuminPro-Bold';
            padding: 25px 0px 10px 0px;
        }

        ._bd{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            & > a{
                width: calc(33.33333% - 10px);
                margin-bottom: 10px;
                display: inline-block;
                cursor: pointer;
                box-shadow: 1px 2px 4px 0px 
                    rgba(0, 0, 0, 0.08);
                border-radius: 16px;
                border: solid 1px #e6e6e6;

                & > div{
                    height: 100%;
                    width: 100%;
                    padding: 12px 12px;
                    text-align: center;
                }

                & ._font{
                    overflow: hidden;
                    margin-top: 10px;

                    & > p:first-child{
                        font-size: 12px;
                        color: #222222;
                        font-family: 'AcuminPro-Bold';
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        width: 100%;
                    }

                    & > p:last-child{
                        font-size: 12px;
	                    color: #222222;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        width: 100%;
                    }
                }

                & .iconContainer{
                    width: 28px;
                    height: 28px;
                    display: inline-block;
                    background-size: cover;
                    background-repeat: no-repeat;
                }
            }

            .buy-earn{
                & .iconContainer{
                    background-image: url("https://image.geeko.ltd/20220113/My-Points-Buy-Earn.png");
                }
            }

            .review{
                & .iconContainer{
                    background-image: url("https://image.geeko.ltd/20220113/My-Points-review.png");
                    width: 37px;
                    height: 30px;
                }
            }

            .survey{
                & .iconContainer{
                    background-image: url("https://image.geeko.ltd/20220113/My-Points-survey.png");
                }
            }

            .suggestion{
                & .iconContainer{
                    background-image: url("https://image.geeko.ltd/20220113/My-Points-suggestion.png");
                }
            }

            .pointsMall{
                background-image: linear-gradient(124deg, #73a9f9 0%, #b2dbf9 100%);
                border-radius: 4px;
            }

            .refer{
                & .iconContainer{
                    background-image: url("https://image.geeko.ltd/20220113/My-Points-refer.png");
                }
            }

            .more{
                & .iconContainer{
                    background-image: url("https://image.geeko.ltd/20220113/My-Points-moreways.png");
                }
            }
        }

        .fd{
            background-image: linear-gradient(131deg, #ffb448 0%, #f5ef4c 100%);
            border-radius: 4px;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            color: #f6f6f6;
            font-family: 'AcuminPro-Bold';
            text-align: center;
            padding: 0px 20px;
            cursor: pointer;
            display: inline-block;
        }

        .show100{
            width: 100% !important;
            height: 30px !important;
        }
    }

</style>