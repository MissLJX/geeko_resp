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
    </div>
</template>

<script>
    import {getNoReadNotificationNum} from '../../api/index.js'

    export default {
        name:"IndexServiceContainer",
        data(){
            return{
                noReadNum: 0
            }
        },
        computed:{
            url(){
                return window.location.pathname + "/"
            }
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