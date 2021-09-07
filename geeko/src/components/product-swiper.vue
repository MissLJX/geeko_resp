<template>
    <div class="product-swiper">
        <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide v-for="(item,index) in images" :key="index+item">
                <div class="__item">
                    <img :src="item.imageURL" :alt="item.name">
                </div>
            </swiper-slide>
        </swiper>
        <ul>
            <li></li>
        </ul>
    </div>
</template>

<script>
    import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
    // import style (<= Swiper 5.x)
    import 'swiper/css/swiper.css'

    export default {
        name:"ProductSwiper",
        props:{
            images:{
                type:Array,
                default:[]
            }
        },
        data(){
            return {
                swiperOptions: {
                    slidesPerView: 5.3,
                    spaceBetween: 8,
                    preloadImages:false,
                    lazy: {
                        loadPrevNext: true,
                    }
                }
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.$swiper
            }
        },
        components: {
            Swiper,
            SwiperSlide
        },
        directives: {
            swiper: directive
        },
        mounted() {
            // console.log('Current Swiper instance object', this.swiper)
            // this.swiper.slideTo(3, 1000, false)
        }
    }
</script>

<style lang="scss" scoped>
    .product-swiper{
        .swiper-container{
            .swiper-slide{
                .__item{
                    height: 75px;
                    & > img{
                        width: 100%;
                        height: 100%;;
                    }
                }
            }
        }
    }
</style>