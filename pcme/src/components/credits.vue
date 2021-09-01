<template>
    <div class="credits-points">
        <div class="_header">
            <p>{{$t("point.my_points")}}</p>
            <a href="/fs/points-policy-pc">
                {{$t("point.learn_about_points")}} {{this.GLOBAL.sitename}} {{$t("point.points")}}
                <span class="iconfont">&#xe73f;</span>
            </a>
        </div>

        <div class="points">
            <div class="tot-credits fl-l">
                <p><span class="p-red">{{pointsCustomer.points}}</span></p>
                <p style="font-size: 12px;color: #222222;"><span>= {{pointsCustomer.exchangeAmount}}</span></p>
            </div>
            <div class="line fl-l"></div>
            <div class="overdue-credits fl-l">
                <p class="p-red">{{pointsCustomer.overduePoints}}</p>
                <div class="p-rla">
                    <span>{{$t('point.points_expired_soon')}}<i class="iconfont"  @click="isShow()">&#xe73f;</i></span>
                    <div class="tips" v-if="seen">{{message.message}}.</div>
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
                <a href="/me/m/order">
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
                
                <a :href="makeSuggestionUrl">
                    <div class="suggestion">
                        <div>
                            <span class="iconfont">&#xe6d0;</span>
                        </div>
                        <div class="_font">
                            <p>{{$t("point.suggestion")}}</p>
                            <p>0~200 points</p>
                        </div>
                    </div>
                </a>
                
                <a href="/i/download" v-if="getDownLoadImage">
                    <div class="download">
                        <div class="_image">
                            <img :src="getDownLoadImage" alt="code">
                        </div>
                        <div class="_font">
                            <p>{{$t("point.download_app")}}</p>
                            <p>{{$t("point.get_more_points")}}</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <loding v-if="isLoadingShow"></loding>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import * as utils from '../utils/geekoutil';
    import _ from 'lodash'
    import PointsContainer from './point/PointsContainer.vue'
    import loding from './loding.vue'

    export default {
        computed: {
            ...mapGetters(['credits','message','me']),
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
                return window.downloadIcon ? downloadIcon : "";
            }
        },
        data(){
            return{
                seen:false,
                isActive:true,
                isHaveRec:false,
                isHaveUse:false,
                isReceived:'0',
                isLoadingShow:false
            }
        },
        methods: {
            isShow: function(){
                this.seen = !this.seen;

            },
            // getDate(time){
            //     if(time == null){
            //         return ''
            //     }
            //     return utils.enTime(new Date(time))
            // },
            // getYear(time){
            //     if(time == null){
            //         return ''
            //     }
            //     return utils.enYear(new Date(time))
            // },
            // getMonth(time){
            //     if(time == null){
            //         return ''
            //     }
            //     return utils.enMonth(new Date(time))
            // },
            // changeMethod:function(){
            //     this.isActive = !this.isActive
            // },
        },
        components:{
            "points-container":PointsContainer,
            "loding":loding
        },
        created(){
            this.$store.dispatch('getMessage', 'M1138');
            // this.$store.dispatch('getCredits',{skip:0});
            this.$store.dispatch('getMe');
            this.isLoadingShow = true;
            let _this = this;
            this.$store.dispatch("point/getCustomerPointsNum").then(() => {
                _this.isLoadingShow = false;
            });
        }
    }
</script>

<style scoped lang="scss">

    @font-face {
        font-family: 'iconfont';  /* project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_m72f720tkb.eot');
        src: url('//at.alicdn.com/t/font_384296_m72f720tkb.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_384296_m72f720tkb.woff') format('woff'),
        url('//at.alicdn.com/t/font_384296_m72f720tkb.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_384296_m72f720tkb.svg#iconfont') format('svg');
    }
    .iconfont{
        font-family:"iconfont" !important;
        font-size:16px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;}
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
                width: 210px;
                height: 100px;
                margin-bottom: 10px;
                display: inline-block;
                cursor: pointer;
                border-radius: 4px;
                margin-right: 10px;

                & > div{
                    height: 100%;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                & .iconfont{
                    font-size: 42px;
                    color: #ffffff;
                    margin-right: 10px;
                }

                & ._font{
                    & > p:first-child{
                        font-size: 14px;
                        color: #ffffff;
                        font-family: 'AcuminPro-Bold';
                    }

                    & > p:last-child{
                        font-size: 12px;
	                    color: #ffffff;
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
                    margin-right: 10px;

                    & > img{
                        width: 100%;
                        display: block;
                    }
                }
            }
        }
    }

</style>