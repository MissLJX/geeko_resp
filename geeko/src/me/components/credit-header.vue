<template>
    <div class="credits-header">
        <div class="credits-header-container">
            <!-- <div class="item1">
                <span>{{me.points}}</span>
                <p>
                    <span>={{me.exchangeAmount}}</span>
                    <span class="dobule-icon" v-if="dobulePoints && dobulePoints.points"></span>
                </p>

                <div class="points-message-modal" v-if="dobulePoints && dobulePoints.points">
                    <p class="_hd">{{dobulePoints.points.discount}}</p>
                    <div class="_bd">
                        <span class="_font">{{dobulePoints.points.message}}</span>
                        <count-down 
                            :timeLeft="getTimeLeft" 
                            v-if="getTimeLeft >= 1000" 
                            :timeStyle="{width:'16px',height:'16px',backgroundColor:'#222222',color:'#ffffff',padding:'2px',borderRadius:'2px',fontSize:'12px'}"
                            :show-hour="true"
                            :show-day="true"
                            class="countdown"
                        />
                    </div>
                </div>
            </div> -->

            <p class="points-history">
                <router-link :to="{name:'points-all'}">
                    {{$t("point.points_history")}} >
                </router-link>
            </p>

            <div class="points-num">
                <span class="_num">{{me.points}}</span>
                <p><span>={{me.exchangeAmount}}</span></p>
            </div>

            <div class="expiring-points">
                <span class="_font">{{me.overduePoints}} POINTS</span>
                <span>Expriring Soon</span>
                <span class="__question" @click="seen = !seen;">
                    <span>?</span>
                </span>

                <div class="msg-tips" v-if="seen">{{message}}.</div>
            </div>
        </div>
    </div>
</template>



<script type="text/ecmascript-6">
    import CountDown from "../../components/countdow.vue"
    import {mapGetters} from "vuex"

    export default {
        props: {
            me: {
                type: Object,
                required: true
            }
        },
        data(){
            return{
                seen:false,
                message: ''
            }
        },
        computed:{
            // ...mapGetters("me",["dobulePoints"]),
            // getTimeLeft(){
            //     if(this.dobulePoints && this.dobulePoints.points){
            //         let nowTimeStrap = new Date().getTime();
            //         return this.dobulePoints.points.endTime - nowTimeStrap;
            //     }
            //     return 0;
            // }
        },
        created(){
            this.$store.dispatch('me/getMessage', 'M1138').then((res)=>{
                // console.log(res)
                if(res && res.message){
                    this.message = res.message;
                }
            });

            // !(this.dobulePoints && this.dobulePoints.points) && this.$store.dispatch("me/getDobulePointsData","M1578");
        },
        components:{
            "count-down":CountDown
        }
    }
</script>

<style scoped lang="scss">
    @font-face {
        font-family: 'iconfont';  /* project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_oqd9vvi72n.eot');
        src: url('//at.alicdn.com/t/font_384296_oqd9vvi72n.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_384296_oqd9vvi72n.woff') format('woff'),
        url('//at.alicdn.com/t/font_384296_oqd9vvi72n.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_384296_oqd9vvi72n.svg#iconfont') format('svg');
    }
    .iconfont{
        font-family:"iconfont" !important;
        font-size:14px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }

    .credits-header{
        border-radius: 4px;
        background: url("https://image.geeko.ltd/20220113/points_bg.png") no-repeat;
        background-position: center;
        background-size:cover;
        padding: 10px 20px;
        height: 100%;

        .credits-header-container{
            .points-history{
                text-align: right;
                font-size: 12px;
                color: #222222;
            }

            .points-num{
                text-align: center;
                ._num{
                    font-size: 48px;
                    color: #222222;
                    font-family: 'AcuminPro-Bold';
                }

                p{
                    font-family: 'SlatePro-Medium';
                    font-size: 14px;
                }
            }

            .expiring-points{
                position: relative;
                background-color: #1a1a1a;
                border-radius: 11px;
                width: fit-content;
                align-items: center;
                margin: 0 auto;
                text-align: center;
                color: #ffffff;
                padding: 3px 20px;
                margin-top: 20px;
                font-size: 12px;

                & > span{
                    text-transform: uppercase;
                }

                ._font{
                    font-family: 'SlatePro-Medium';
                }

                .exping-soon{
                    font-size: 16px;
                    color: #222222;
                    vertical-align: middle;
                }

                .__question{
                    display: inline-block;
                    width: 13px;
                    height: 13px;
                    line-height: 13px;
                    text-align: center;
                    color: #ffffff;
                    border-radius: 50%;
                    border: 1px solid #ffffff;
                    vertical-align: middle;
                    cursor: pointer;
                    margin-left: 3px;

                    & > span{
                        font-size: 12px;
                    }
                }

                .msg-tips{
                    width: 200px;
                    height: 60px;
                    padding: 10px;
                    position: absolute;
                    background-color: white;
                    color: #666;
                    border: 1px solid #efefef;
                    font-size: 12px;
                    right: 0px;
                    top: 25px;
                    text-align: left;
                }
            }
        }





        .credits-hd{
            .circle{
                display: inline-block;
                height: 41px;
                width: 41px;
                line-height: 43px;
                background-color: #ffcb53;
                text-align: center;
                border-radius: 50%;
                border: none;
                .__icon{
                    color: #de801d;
                    font-size: 33px;
                }
            }

            .el-credits-discount{
                padding-left: 4px;
                & > span{
                    font-family: SlatePro-Medium;
                    font-size: 24px;
                    color: #222222;
                }
            }

            .el-credits-right{
                & > span{
                    font-family: SlatePro-Medium;
                    font-size: 16px;
                    color: #222222;
                }
            }
        }
    }
</style>