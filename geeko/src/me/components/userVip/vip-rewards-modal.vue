<template>
    <div class="rewards-modal">
        <p class="close-icon">
            <span class="iconfont" @click="closeModalEvent">&#xe69a;</span>
        </p>

        <p class="title">CHICME VIP REWARDS</p>

        <div 
            class="swiper-container rewards-swiper" 
            v-swiper:mySwiper="swiperOption" 
            @slideChange="onSlideChange"
        >
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <span class="rewards-container">1</span>
                </div>
                <div class="swiper-slide">
                    <span class="rewards-container">2</span>
                </div>
                <div class="swiper-slide">
                    <span class="rewards-container">3</span>
                </div>
                <div class="swiper-slide">
                    <span class="rewards-container">4</span>
                </div>
            </div>
        </div>

        <p class="next-title">{{selectedModalReawrds.title}}</p>

        <div class="content">
            {{selectedModalReawrds.content}}
        </div>

        <div class="rewards-button">
            <button>Download Now</button>
        </div>
    </div>
</template>

<script>
    import { directive } from 'vue-awesome-swiper'

    export default {
        name:"VipRewardsModal",
        data(){
            return {
                swiperOption: {
                    slidesPerView:'auto',
                    slideToClickedSlide: true,
                    centeredSlides: true,
                    spaceBetween : 14,
                    initialSlide: 0,
                },
                currentIndex:0
            }
        },
        methods:{
            onSlideChange(){
                this.currentIndex = this.mySwiper.activeIndex;
            },
            closeModalEvent(){
                this.$emit('update:showModal',false);
            }
        },
        computed:{
            selectedModalReawrds(){
                return this.datas[this.currentIndex];
            }
        },
        directives: {
            swiper: directive
        },
        props:{
            showModal:{
                type:Boolean,
                default:false
            },
            datas:{
                type:Array,
                default:function(){
                    return []
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .rewards-modal{
        position: fixed;
        background-color: #fff;
        z-index: 11;
        left: 0;
        width: 100%;
        bottom: 0;
        padding-bottom: 25px;

        .close-icon{
            text-align: right;
            padding: 10px 10px 0px 0px;

            & > .iconfont{
                font-size: 12px;
                color: #222;
                cursor: pointer;
            }
        }

        .title{
            font-size: 18px;
            color: #222222;
            font-family: 'AcuminPro-Bold';
            text-align: center;        
        }

        .rewards-swiper{
            margin-top: 12px;
            overflow: visible;

            .swiper-slide{
                width: auto;

                .rewards-container{
                    display: inline-block;
                    width: 45px;
                    height: 45px;
                    line-height: 45px;
                    border-radius: 50%;
                    text-align: center;
                    background-image: linear-gradient(137deg, 
                    #444444 0%, 
                    #000000 100%);
                    color: #b8cce4;
                }
            }

            

            & .swiper-slide-active{
                .rewards-container{
                    -webkit-transform: scale(1.2);
                    transform: scale(1.2);
                }
            }
        }

        .next-title{
            margin-top: 12px;
            text-align: center;
            font-size: 16px;
            color: #222222;
            font-family: 'AcuminPro-Bold';
        }

        .content{
            padding: 0 12px;
            font-size: 12px;
            color: #222222;
            margin-top: 12px;
        }

        .rewards-button{
            text-align: center;
            margin-top: 30px;

            & > button{
                height: 40px;
                line-height: 40px;
                background-color: #222222;
                border-radius: 2px;
                box-shadow: none;
                outline: none;
                border: none;
                color: #fff;
                font-size: 16px;
                font-family: 'AcuminPro-Bold';
                text-align: center;
                padding: 0 40px;
            }
        }
    }
</style>