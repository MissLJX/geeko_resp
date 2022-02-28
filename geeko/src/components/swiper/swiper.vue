<template>
    <div class="swiper">
        <div class="swiper-container" v-swiper:mySwiper="swiperOption" :class="{'swiper-no-swiping' : notificationData && notificationData.length <= 1}">
            <div class="swiper-wrapper">
                <div class="swiper-slide" :key="id+index" v-for="({id,icon,icon2,message,isClick,clickFunction},index) in notificationData">
                    <div class="notification-container" @click="isClick?disposeNotification(id):clickFunction()">
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
                // notificationData:data
            }
        },
        props:{
            notificationData:{
                type:Array,
                required:true
            },
            email:{
                type:String
            },
            // temporary:{
            //     type:Boolean,
            //     required:true,
            //     default:false
            // }
        },
        computed:{
            ifOwnEmail(){
                if(this.email.endsWith("@chic-fusion.com") || this.email.endsWith("@ivrose.com") || this.email.endsWith("@boutiquefeel.com")){
                    return true
                }else{
                    return false
                }
            },
            isLogin(){
                return this.$store.getters["me/isLogin"];
            }
        },
        created:function(){
            if(this.notificationData && this.notificationData.length <= 1){
                this.swiperOption = {};
            }
            // console.log("this.swiperOption",this.swiperOption)
        },
        mounted() {
            // console.log('Current Swiper instance object', this.mySwiper)
            // this.mySwiper.slideTo(3, 1000, false)
        },
        directives: {
            swiper: directive
        },
        methods:{
            disposeNotification(id){
                if(!this.isLogin){
                    window.location.href = this.GLOBAL.getUrl(`/i/login?redirectUrl=/me/m`);
                    return false;
                }
                
                if(this.ifOwnEmail){
                    this.$router.push({name:"change-email"});
                }else{
                    this.verifyEmail(this.email);
                }
            },
            verifyEmail(email){
                let _this = this;
                this.$store.dispatch("globalLoadingShow",true);
                this.$store.dispatch('me/confirmEmail', email).then((data)=>{
                    this.$store.dispatch("globalLoadingShow",false);
                    _this.modalShow("A verification link has been sent to your email address, please check your mailbox.",true);
                }).catch((e) => {
                    this.$store.dispatch("globalLoadingShow",false);
                    _this.modalShow(e.result,false);
                });
            },
            modalShow(message,flag){
                let _this = this;
                _this.$store.dispatch('confirmShow', {
                    show: true,
                    cfg: {
                        btnFont:{
                            yes:"OK",
                        },
                        message: message,
                        yes: function () {
                            _this.$store.dispatch('closeConfirm');
                            flag && _this.$emit("update:notificationData",[]);
                        },
                        no: function () {
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .notification-container{
        padding: 10px 0;
        background-color: #fff8e1;
        display: flex;
        // margin-bottom: 20px;
        cursor: pointer;

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