<template>
    <div class="vip-grade">
        <div class="vip-name">
            <span class="_name">{{disposeName}}</span>
            <span class="iconfont">&#xe70e;</span>
        </div>

        <div class="grade-process">
            <div class="direct-line">
                <div></div>
            </div>

            <div class="num-grade" :style="`transform:translate(-${tranFormNum}px,-50%);`">
                <div class="_container">
                    <div 
                        class="main" 
                        :class="currentIndex===index?'active':''" 
                        v-for="(levelItem,index) in vipData"
                        :key="levelItem.level+index"
                    >
                        <div class="next" :style="`color:${levelItem.theme.highlight}`">V{{levelItem.level}}</div>
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
                <div class="swiper-slide" 
                    v-for="(levelItem,index) in vipData"
                    :key="levelItem.level+index"
                >
                    <div class="vip-container" :style="`background-image:url(${levelItem.cardImageURL});`"></div>
                </div>
                <!-- <div class="swiper-slide">
                    <div class="notification-container"></div>
                </div>
                <div class="swiper-slide">
                    <div class="notification-container"></div>
                </div>
                 <div class="swiper-slide">
                    <div class="notification-container"></div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
    import { directive } from 'vue-awesome-swiper'

    export default {
        name:"VipGrade",
        data(){
            console.log('this.currentIndex', this.currentIndex)
            console.log('this.mySwiper', this.mySwiper)
            return {
                swiperOption: {
                    slidesPerView:'auto',
                    centeredSlides: true,
                    spaceBetween : 20,
                    initialSlide: this.currentIndex,
                }
            }
        },
        computed:{
            tranFormNum(){
                console.log('tranFormNumthis.index', this.currentIndex)
                return this.currentIndex * 50;
            },
            disposeName(){
                let me = this.$store.getters['me/me'];
                if(me && me.nickname){
                    return me.nickname;
                }else if(me && me.name && (me.name.firstName || me.name.lastName)){
                    return this.getName(me.name.firstName) + " " + this.getName(me.name.lastName);
                }else if(!(me && me.nickname && me.name && me.name.firstName && me.name.lastName)){
                    return me.email;
                }
                return 'XXXXXXXXXXX';
            },
        },
        watch:{
            'currentIndex':function(newValue,oldValue){
                this.mySwiper.slideTo(newValue)
            }
        },
        directives: {
            swiper: directive
        },
        props:{
            currentIndex:{
                type:Number,
                default:0
            },
            vipData:{
                type:Array,
                default:function(){
                    return []
                }
            },
            currentVipData:{
                type:Object,
                default:function(){
                    return {}
                }
            }
        },
        mounted() {
            
            // this.mySwiper.slideTo(3, 1000, false)
        },
        methods:{
            onSlideChange(swiper){
                // this.index = this.mySwiper.activeIndex;
                this.$emit('update:currentIndex',this.mySwiper.activeIndex);
            },
            getName(value){
                return value ? value : '';
            },
        }
    }
</script>

<style scoped lang="scss">
    .card-grade .swiper-slide{
        width: 85%;
        height: 187px;
    }

    .card-grade{
        margin-top: 20px;

        .vip-container{
            background-repeat: no-repeat;
            background-size: cover;
            background-image: url(https://image.geeko.ltd/chicme/2022050503/V0-card.png);
            width: 100%;
            height: 100%;
            border-radius: 5px;
        }
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

        .iconfont{
            color: #fff;
        }

        & > span{
            vertical-align: middle;
        }
    }  
</style>