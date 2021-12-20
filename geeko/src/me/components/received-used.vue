<template>
    <div class="received-used">
        <div class="_hd">
            {{$t("point.how_to_get_points")}}
        </div>

        <div class="_bd">
            <a :href="GLOBAL.getUrl('/i/points-mall')">
                <div class="review">
                    <div>
                        <span class="iconfont">&#xe6d1;</span>
                    </div>
                    <div class="_font">
                        <p>Points Mall</p>
                        <p>More points</p>
                    </div>
                </div>
            </a>
            <a :href="GLOBAL.getUrl('/me/m/order/confirmed')">
                <div class="review">
                    <div>
                        <span class="iconfont">&#xe6d1;</span>
                    </div>
                    <div class="_font">
                        <p>{{$t("point.review")}}</p>
                        <p>0~2000 points</p>
                    </div>
                </div>
            </a>
            
            <router-link :to="{name:'survey'}">
                <div class="survey">
                    <div>
                        <span class="iconfont">&#xe6cf;</span>
                    </div>
                    <div class="_font">
                        <p>{{$t("point.survey")}}</p>
                        <p>0~300 points</p>
                    </div>
                </div>
            </router-link>
            
            <router-link :to="{name:'make-sug'}">
                <div class="suggestion">
                    <div>
                        <span class="iconfont">&#xe6d0;</span>
                    </div>
                    <div class="_font">
                        <p>{{$t("point.suggestion")}}</p>
                        <p>0~200 points</p>
                    </div>
                </div>
            </router-link>
            
            <a href="/i/download">
                <div class="download">
                    <div>
                        <span class="iconfont">&#xe6d2;</span>
                    </div>
                    <div class="_font">
                        <p>{{$t("point.download_app")}}</p>
                        <p>{{$t("point.get_more_points")}}</p>
                    </div>
                </div>
            </a>
            <router-link :to="GLOBAL.getUrl('/me/m/point-guide')" class="fd global-overflow">
                <div style="padding:0px;">
                    <div class="_font" style="white-space: normal;line-height: 20px;">
                        {{$t("point.more_ways_to_earn_more_points")}} >
                    </div>
                </div>
                
            </router-link>
        </div>

        
    </div>
</template>

<script>
    export default {
        data(){
            return{
                selectValue:0
            }
        }
    }
</script>

<style scoped lang="scss">
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
                width: calc(50% - 5px);
                height: 72px;
                margin-bottom: 10px;
                display: inline-block;
                cursor: pointer;

                & > div{
                    height: 100%;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0px 20px;
                }

                & .iconfont{
                    font-size: 30px;
                    color: #ffffff;
                    margin-right: 10px;
                }

                & ._font{
                    overflow: hidden;
                    & > p:first-child{
                        font-size: 14px;
                        color: #ffffff;
                        font-family: 'AcuminPro-Bold';
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        width: 100%;
                    }

                    & > p:last-child{
                        font-size: 12px;
	                    color: #ffffff;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        width: 100%;
                    }
                }
            }

            .review{
                background-image: linear-gradient(124deg, 
                    #ff8976 0%, 
                    #ffcca8 100%);
                border-radius: 4px;
            }

            .survey{
                background-image: linear-gradient(124deg, 
                    #b886b4 0%, 
                    #dab1db 100%);
                border-radius: 4px;
            }

            .suggestion{
                background-image: linear-gradient(124deg, 
                #77efbf 0%, 
                #7dede2 100%);
                border-radius: 4px;
            }

            .download{
                background-image: linear-gradient(124deg, 
                #73a9f9 0%, 
                #b2dbf9 100%);
                border-radius: 4px;

                & .iconfont{
                    font-size: 27px;
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
    }

</style>