<template>
    <div class="index-service-container">
        <div class="_hd">
            {{$t("index.customer_service")}}
        </div>

        <div class="_bd">
            <router-link :to="url+'faq/support-ticket'">
                <p style="font-size:25px;" class="iconfont">&#xe6e8;</p>
                <p>{{$t("ticket")}}</p>
            </router-link>
                
                <!-- to="/me/m/notification" -->
            <router-link :to="url+'notification'" class="notification_icon">
                <!-- <p class="iconfont">&#xe60b;</p> -->
                <p class="iconfont">
                    &#xe70b;
                    <span class="no_read_num" v-if="noReadNum">{{noReadNum}}</span>
                </p>
                <p>{{$t("index.messages")}}</p>
                
            </router-link>
        </div>

        <div class="_bd" v-if="me.vipUser && vipShow">
            <router-link class="hasNew" :to="url+'vip'">
                <p style="font-size:24px;" class="iconfont">&#xe783;</p>
                <p>VIP</p>
                <span class="newTip" v-if="showVipNew">
                    <span>{{$t("my_vip.new")}}</span>
                </span>
            </router-link>
        </div>

    </div>
</template>

<script>
    import {getNoReadNotificationNum} from '../../api/index.js'

    export default {
        name:"IndexServiceContainer",
        props:{
            me:{
                type:Object,
                require: true
            }
        },
        data(){
            return{
                noReadNum: 0
            }
        },
        computed:{
            url(){
                return window.location.pathname + "/"
            },
            vipShow:function(){
                return this.$store.getters.vipShow;
            },
            showVipNew(){
                if(localStorage['customer_vip_level'] && (localStorage['customer_vip_level'] < this.vipLevel)){
                    // localStorage['customer_vip_level'] = this.vipLevel
                    return true
                } else {
                    // localStorage['customer_vip_level'] = this.vipLevel
                    return false
                }
            },
            vipLevel(){
                return this.me.vipUser ? this.me.vipUser.level ? this.me.vipUser.level : 0 : 0
            },
        },
        created(){
            getNoReadNotificationNum().then(res => {
                // console.log(res)
                if(res && res.code == 200 && res.result){
                    this.noReadNum = res.result
                }
            })
        }
    }
</script>

<style scoped lang="scss">
@font-face {
  font-family: 'iconfont';  /* Project id 384296 */
  src: url('//at.alicdn.com/t/font_384296_4k0ybw8fob4.woff2?t=1649817988386') format('woff2'),
       url('//at.alicdn.com/t/font_384296_4k0ybw8fob4.woff?t=1649817988386') format('woff'),
       url('//at.alicdn.com/t/font_384296_4k0ybw8fob4.ttf?t=1649817988386') format('truetype');
}
    .index-service-container{
        ._hd{
            font-family: 'AcuminPro-Bold';
            font-size: 18px;
            color: #000000;
            padding: 0px 18px;
        }

        ._bd{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 25px;

            & > a{
                color: #222222;
                display: inline-block;
                width: 50%;
                text-align: center;
                margin-bottom: 15px;

                & > p{
                    &:first-child{
                        font-size: 23px;
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

            .hasNew{
                position: relative;

                .newTip{
                    position: absolute;
                    top: -3px;
                    right: calc(50% - 26px);
                    display: block;
                    /* width: 20px; */
                    height: 9px;
                    background-color: #e64545;
                    border-radius: 5px;
                    line-height: 9px;
                    color: #fff;
                    text-align: center;
                    font-family: AcuminPro-Bold;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #ffffff;

                    span{
                        font-size: 12px;
                        transform: scale(0.5);
                        text-transform: uppercase;
                        display: block;
                    }
                }
            }

            .notification_icon {
                position: relative;
                // display: inline-block;

                .no_read_num{
                    position: absolute;
                    display: block;
                    min-width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background-color: #e64545;
                    color: #fff;
                    text-align: center;
                    line-height: 18px;
                    position: absolute;
                    top: -10px;
                    left: 57%;
                    color: #fff;
                    font-size: 12px;
                    padding: 0px 4px;
                }
            }
        }
    }
</style>