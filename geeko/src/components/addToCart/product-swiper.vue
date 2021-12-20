<template>
    <div class="product-swiper">
        <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide 
                v-for="(item,index) in images" 
                :key="index+item" 
                class="item"
                :class="{
                    'image-item':type === 1 ,
                    'image-item2':type === 2,
                    'active':type === 2 && item && item.productId === productId
                }"
                :data-pproduct="productId"
                :data-pproduct2="item.productId"
                @click.native="changeProduct(item)"
            >
                    <img :src="'https://image.geeko.ltd/medium/'+getDifferenceImage(item)" :alt="getDifferenceImage(item)">
            </swiper-slide>
        </swiper>
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
            },
            type:{
                type:Number,
                default:1
            },
            productId:{
                type:String
            }
        },
        data(){
            return {
                swiperOptions: {
                    slidesPerView: 'auto',
                    spaceBetween: 10,
                    // Disable preloading of all images
                    preloadImages: false,
                    // Enable lazy loading
                    lazy: {
                        loadPrevNext: true,
                    },
                    watchSlidesVisibility: true,
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
        methods:{
            getDifferenceImage(item){
                if(item && item.imageUrl){
                    return item.imageUrl;
                }else{
                    return item;
                }
            },
            changeProduct(item){
                // console.log(item)
                if(item && item.productId){
                    this.$emit("changeProduct",item.productId);
                }
            }
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
            overflow: initial;
            .swiper-slide{
                &.item{
                    background-color: #efebef;
                    overflow: hidden;
                    & > img{
                        width: 100%;
                        position: absolute;
                        left: 0;
                        top: 0;
                    }

                    &::after{
                        display: block;
                        margin-top: 125%;
                        content: '';
                    }

                    &.active{
                        border: solid 1px #222;
                    }
                }

                &.image-item{
                    width: 44%;
                    
                }

                &.image-item2{
                    width: 36px;
                    height: 44px;
                    cursor: pointer;
                    overflow: hidden;
                    position: relative;
                    border-radius: 2px;
                    padding: 1px;
                    border: solid 1px #ccc;

                    & > img{
                        width: 100%;
                        position: relative;
                    }
                }
            }
        }
    }
</style>