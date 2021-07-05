<template>
    <div class="track-detail">
        <div class="track-container">
            <a :href="getUrl">
                <div class="st-table track-header">
                    <div class="st-cell st-v-m">
                        <div class="__status st-v-m"></div>
                        <span class="__name st-v-m">{{track.statusView}}</span>
                    </div>
                    <div class="st-cell st-v-m st-t-r">
                        <span class="__name st-v-m">Track</span>
                        <span class="iconfont __icon st-v-m">&#xe694;</span>
                    </div>
                </div>
            </a>
            <!-- <router-link :to="{ path:'http://localhost:3001/me/m/order/packageTracking' , query: { type: track.status, packageid: track.trackingId } }">
                
            </router-link> -->

            <div class="track-status">
                <div class="st-table ">
                    <div class="st-cell st-v-m __lefticon">
                        <span class="iconfont __icon" v-if="track.status === 1">&#xe6a9;</span>
                        <span class="iconfont __icon" v-else-if="track.status === 6">&#xe6a7;</span>
                        <span class="iconfont __icon" v-else>&#xe6a5;</span>
                    </div>
                    <div class="st-cell st-v-m __message">
                        <p>{{getTimes}}</p>
                        <p>{{getMessage}}</p>
                    </div>
                </div>
            </div>

            <div class="track-image">
                <product-swiper :images="track.products"></product-swiper>
            </div>
        </div>
    </div>
</template>

<script>
    import ProductSwiper from '../../components/product-swiper.vue'
    import fecha from 'fecha'

    import * as utils from '../../utils/geekoutils.js'

    export default {
        name:"TrackOrderDetail",
        props:['track'],
        components:{
            ProductSwiper
        },
        computed:{
            getTimes(){
                return this.track && this.track.originPoints[0] ? fecha.format(this.track.originPoints[0].checkpointTime,'DD/MM/YYYY hh:mm:ss') : "";
            },
            getMessage(){
                return this.track && this.track.originPoints[0] ? this.track.originPoints[0].message : "";
            },
            getUrl(){
                return utils.ROUTER_PATH_ME + 
                    "/order/packageTracking?type=" + this.track.status + 
                        "&packageid=" + this.track.trackingId + "&shipmsg=" + this.track.shipFromMsg;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .track-detail{
        .track-container{
            padding: 0px 10px;
            .track-header{
                width: 100%;
                line-height: 40px;
                .__status{
                    width: 6px;
                    height: 6px;
                    background-color: #50bf20;
                    border-radius: 50%;
                    display: inline-block;
                }

                // .__processing_status{
                //     background-color: #d088e1;
                // }

                // .cacel_status{
                //    background-color:  #e64545;
                // }

                .__name{
                    font-family: SlatePro-Medium;
                    font-size: 14px;
                    color: #222222;
                }

                .__icon{
                    color: #222222;
                    font-size: 16px;
                }
            }

            .track-status{
                background-color: #f7f7f7;
                padding: 10px 0px;
                // margin-top: 15px;

                .__lefticon{
                    width: 40px;
                    padding-left: 8px;

                    & > span.iconfont{
                        font-size: 17px;
                        color:#000000;
                    }
                }
                .__message{
                    & > p:first-child{
                        font-family: SlatePro;
                        font-size: 12px;
                        color: #999999;
                        line-height: 20px;
                    }

                    & > p:last-child{
                        font-family: SlatePro;
                        font-size: 14px;
                        color: #222222;
                    }
                }
            }

            .track-image{
                padding-top: 10px;
                padding-bottom: 20px;
            }
        }
    }
</style>
