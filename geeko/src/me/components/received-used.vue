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
                        <p>us$1 = 1 points</p>
                    </div>
                </div>
            </a>

            <a :href="GLOBAL.getUrl('/me/m/order/confirmed')">
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

            <router-link :to="{name:'make-sug'}">
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

            <a href="/i/download">
                <div class="refer">
                    <div>
                        <span class="iconContainer">&#xe6d2;</span>
                    </div>
                    <div class="_font">
                        <p>Refer a Friend</p>
                        <p>Up to 500 points</p>
                    </div>
                </div>
            </a>
            
            <router-link :to="{name:'survey'}">
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

            <router-link :to="GLOBAL.getUrl('/me/m/point-guide')">
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
        computed:{
            showPointsMall(){
                return window.showPointsMall
            }
        },
        methods:{
            buyEarnEvent:async function(event){
                event.preventDefault();
                console.log("1111")
                let response = await getMessage("M1624");
                console.log("response",response);
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
                                _this.$store.dispatch('closeConfirm');
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
                                }
                            },
                            htmlMessage2:true
                        }
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
                    padding: 20px 12px;
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