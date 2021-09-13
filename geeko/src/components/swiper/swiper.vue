<template>
    <div class="swiper">
        <div v-swiper:mySwiper="swiperOption">
            <div class="swiper-wrapper">
                <div class="swiper-slide" :key="id+index" v-for="({id,icon,icon2,message},index) in notificationData">
                    <div class="notification-container">
                        <div class="iconfont" v-html="icon"></div>
                        <div class="_font">{{message}}</div>
                        <div class="iconfont" v-html="icon2"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import style (<= Swiper 5.x)
    import 'swiper/css/swiper.css'
    import { directive } from 'vue-awesome-swiper'

    export default {
        name:"Swiper",
        data () {
            const data = [
                {
                    id:1,
                    icon:"&#xe6ca;",
                    icon2:"&#xe694;",
                    message:"register to get more coupons",
                },
                {
                    id:2,
                    icon:"&#xe6ca;",
                    icon2:"&#xe694;",
                    message:"Verify the email you can get 100 points!"
                }
            ];

            return {
                swiperOption: {
                    loop:true,
                    autoplay: {
                        delay: 5000,
                        stopOnLastSlide: false,
                        disableOnInteraction: false,
                    },
                },
                notificationData:data
            }
        },
        mounted() {
            console.log('Current Swiper instance object', this.mySwiper)
            // this.mySwiper.slideTo(3, 1000, false)
        },
        directives: {
            swiper: directive
        }
    }
</script>

<style scoped lang="scss">
    .notification-container{
        padding: 10px 0;
        background-color: #fff8e1;
        display: flex;
        margin-bottom: 20px;

        .iconfont{
            font-size: 12px;
            text-align: center;
            width: 30px;
        }

        ._font{
            font-size: 12px;
            color: #222;
            flex: 1;
        }
    }
</style>