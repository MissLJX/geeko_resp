<template>
    <div class="vip-grade">
        <div class="vip-name">
            <span class="_name">{{disposeName}}</span>
        </div>

        <div class="grade-process">
            <div class="direct-line">
                <div></div>
            </div>

            <div class="num-grade" :style="`transform:translate(-${tranFormNum}px,-50%);`">
                <div class="_container">
                    <div class="main" :class="index===0?'active':''">
                        <div class="next">V0</div>
                    </div>

                    <div class="main" :class="index===1?'active':''">
                        <div class="next">V1</div>
                    </div>

                    <div class="main" :class="index===2?'active':''">
                        <div class="next">V2</div>
                    </div>
                    
                    <div class="main" :class="index===3?'active':''">
                        <div class="next">V3</div>
                    </div>
                </div>
            </div>
            
        </div>

        <div 
            class="swiper-container card-grade" 
            v-swiper:mySwiper="swiperOption" 
            @slideChange="onSlideChange"
        >
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="notification-container"></div>
                </div>
                <div class="swiper-slide">
                    <div class="notification-container"></div>
                </div>
                <div class="swiper-slide">
                    <div class="notification-container"></div>
                </div>
                 <div class="swiper-slide">
                    <div class="notification-container"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { directive } from 'vue-awesome-swiper'

    export default {
        name:"VipGrade",
        data(){
            return {
                swiperOption: {
                    slidesPerView:'auto',
                    centeredSlides: true,
                    spaceBetween : 20,
                    // initialSlide: 0,
                },
                index:0
            }
        },
        computed:{
            tranFormNum(){
                return this.index * 50;
            },
            disposeName(){
                let me = this.$store.getters['me/me'];
                // if(me && me.nickname){
                //     return me.nickname;
                // }else if(me && me.name && (me.name.firstName || me.name.lastName)){
                //     return this.getName(me.name.firstName) + " " + this.getName(me.name.lastName);
                // }else if(!(me && me.nickname && me.name && me.name.firstName && me.name.lastName)){
                //     return me.email;
                // }
                return 'XXXXXXXXXXX';
            },
        },
        directives: {
            swiper: directive
        },
        // props:{
        //     index:{
        //         type:Number,
        //         default:0
        //     }
        // },
        mounted() {
            console.log('Current Swiper instance object', this.mySwiper)
            // this.mySwiper.slideTo(3, 1000, false)
        },
        methods:{
            onSlideChange(swiper){
                this.index = this.mySwiper.activeIndex;
            },
            getName(value){
                return value ? value : '';
            },
        }
    }
</script>

<style scoped lang="scss">
    .card-grade .swiper-slide{
        width: 80%;
        height: 187px;
        border-radius: 5px;
        background-color: aqua;
    }

    .card-grade{
        margin-top: 20px;
    }

    .vip-grade{
        padding-top: 40px;
    }

    .grade-process{
        position: relative;
        width: 100%;
        height: 30px;
        margin-top: 20px;
        overflow: hidden;

        .direct-line{
            height: 11px;
            line-height: 11px;
            background-color: rgba(255,255,255,0.35);
            // background-color: red;
            width: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            & > div{
                height: 5px;
	            background-color: #ffffff;
                // background-color: yellow;
                position: absolute;
                top: 50%;
                left: 50%;
                width: 100%;
                transform: translate(-50%, -50%);
            }
        }
    }

    .num-grade{
        position: absolute;
        top: 50%;
        left: 47%;
        transform: translateY(-50%);
        transition: transform 1s;

        ._container{
            display: flex;
            align-items: center;

            .main{
                width: 30px;
                height: 30px;
                line-height: 30px;
                margin-right: 20px;
                
                border-radius: 50%;
                text-align: center;

                .next{
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    background-color: #222222;
                    color: #ffffff;
                    border-radius: 50%;
                    text-align: center;
                    font-size: 12px;
                    font-family: 'AcuminPro-Bold';
                    display: inline-block;
                }

                &.active{
                    background-color: rgba(0,0,0,0.5);
                }
            }
        }
    }

    .vip-name{
        padding:0px 30px;

        ._name{
            font-size: 16px;
            color: #ffffff;
            font-family: 'AcuminPro-Bold';
        }
    }  
</style>