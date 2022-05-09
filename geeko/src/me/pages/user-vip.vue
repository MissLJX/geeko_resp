<template>
    <div class="user-vip">
        <div class="fixed-header">
            <page-header>
                <span>{{siteName}} VIP</span>

                <span slot="oplabel" class="cart-icon">
                    <a href="/cart">
                        <span class="iconfont">&#xe6a4;</span>
                        <span 
                            class="_num" 
                            v-if="shoppingCartCount > 0"
                            :class="{'special-count' : shoppingCartCount && shoppingCartCount < 10}"
                        >{{shoppingCartCount}}</span>
                    </a>
                </span>
            </page-header>
        </div>
        

        <div class="content" v-if="vipData && vipData.length > 0">
            <div class="content-container">
                <!-- 上部分关于卡片的 -->
                <vip-grade 
                    :vip-data="vipData" 
                    :current-index.sync="currentLevel"
                    :current-vip-data="currentVipData"
                    :theme-color="themeColor"
                    :expired-time="expiredTime"
                    :user-level="userLevel"
                    :progress="progress"
                ></vip-grade>

                <!-- 奖励与权益部分 -->
                <vip-rewards
                    :current-level="currentLevel"
                    :current-vip-data="currentVipData"
                    :theme-color="themeColor"
                    :user-level="userLevel"
                ></vip-rewards>

                <!-- FAQS -->
                <vip-faq
                    :faqs="faqs"
                ></vip-faq>
            </div>

            <template v-if="currentVipData">
                <div class="grade-bg" :style="`background-image:url(${currentVipData.cardBackground})`"></div>
                <div class="content-bg" :style="`background-image:url(${currentVipData.background})`"></div>
            </template>
        </div>

        <div v-else class="el-list-loading"><i class="iconfont">&#xe69f;</i></div>
    </div>
</template>

<script>
    import PageHeader from '@/me/components/page-header.vue'
    import VipGrade from '../components/userVip/vip-grade.vue'
    import VipRewards from "../components/userVip/vip-rewards.vue"
    import VipFaq from '../components/userVip/vip-faq.vue'
    import { getUserVipData } from '../api/index'

    export default {
        name:"UserVip",
        data(){
            return {
                siteName:window.name,
                currentLevel:0,
                faqs:null,
                vipData:[],
                expiredTime:null,
                userLevel:0,
                progress:null
            }
        },
        computed:{
            shoppingCartCount(){
                return this.$store.getters['me/shoppingCartCount'];
            },
            currentVipData(){
                console.log('this.vipData[this.currentLevel]', this.vipData[this.currentLevel])
                return this.vipData[this.currentLevel]
            },
            themeColor(){
                console.log('this.vipData', this.vipData);
                let dataArr = this.vipData.map(item =>{
                    return item.theme.highlight;
                });
                return dataArr
            }
        },
        created:function(){
            // 请求所有的数据
            // 获取到当前用户的VIP等级与缓存中的等级对比是否需要弹出升级弹窗
            getUserVipData().then(response =>{
                if(response.code === 200 && response.result){
                    console.log('response', response)
                    const {result} = response;
                    this.currentLevel = result.level;
                    this.userLevel = result.level;
                    this.faqs = result.faqs;
                    this.vipData = result.vipStyles;
                    this.expiredTime = result.expiredDate;
                    this.progress = result.progress;

                    let cacheLevel = window.localStorage.getItem('customer_vip_level');
                    if(!cacheLevel){
                        window.localStorage.setItem('customer_vip_level',this.userLevel);
                    }else{
                        if(cacheLevel > this.userLevel){
                            console.log('To upgrade the pop-up');
                        }else{
                            console.log('No To upgrade the pop-up')
                            this.modalShow();
                        }
                    }
                }else{
                    alert('Vip Data is Null!');
                }
            });
        },
        methods:{
            modalShow(){
                let _this = this;
                this.$store.dispatch('confirmShow', {
                    show: true,
                    cfg: {
                        btnFont:{
                            yes:"CONFIRM",
                        },
                        message: "Congratulations!",
                        message2:`<img src="https://image.geeko.ltd/chicme/2022050503/V3card.png" style="width:70%;"/><br/><br/><p style="font-size: 12px;color: #999999;">Your VIP level has been level-up to <span style="color: #e64545;">V3</span>, go check out your new rewards!</p>`,
                        htmlMessage2:true,
                        yes: function () {
                            _this.$store.dispatch('closeConfirm').then(() =>{
                               
                            });
                        },
                        style:{
                            box:{
                                padding:"15px 8px 12px",
                                width:"80%"
                            },
                            message:{
                                fontSize:"14px",
                                fontFamily: 'AcuminPro-Bold'
                            },
                            message2:{
                                color:"#222222",
                                fontSize:"14px",
                                marginTop:'14px'
                            },
                            btnYes:{
                                fontSize:"14px",
                                fontFamily: 'SlatePro-Medium',
                                textTransform: 'uppercase',
                                height: "42px",
                                lineHeight: "42px"
                            }
                        }
                    }
                })
            }
        },
        // beforeRouteEnter(to, from, next){
            // getUserVipData().then(response =>{
            //     if(response.code === 200 && response.result){
            //         next(vm =>{
            //             const {result} = response;
            //             vm.currentLevel = result.level;
            //             vm.userLevel = result.level;
            //             vm.faqs = result.faqs;
            //             vm.vipData = result.vipStyles;
            //             vm.expiredTime = result.expiredDate;
            //             vm.progress = result.progress;
            //         });
            //     }else{
            //         alert('Vip Data is Null!');
            //         next();
            //     }
            // });
        // },
        components:{
            PageHeader,
            VipGrade,
            VipRewards,
            VipFaq
        },
    }
</script>

<style scoped lang="scss">
    .user-vip{
        // background-image: linear-gradient(135deg, 
		// #d7d7d7 0%, 
		// #707070 100%);
        padding-top: 50px;

        .cart-icon{
            position: relative;

            ._num{
                position: absolute;
                background-color: #e64545;
                top: -10px;
                right: -10px;
                color: #fff;
                padding: 2px 2px;
                border-radius: 50%;
                text-align: center;
                font-size: 12px;
            }
        }
    }

    .special-count{
        padding: 1.5px 5px;
    }

    .fixed-header{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 5;
    }

    .content{
        position: relative;
        height: 100%;
        padding-bottom: 50px;

        .content-container{
            position: relative;
            z-index: 2;
        }

        .grade-bg{
            position: absolute;
            z-index: 1;
            display: block;
            width: 100%;
            top: 0px;
            left: 0;
            background-image: url(https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/chicme/2021111101/top_v0_bg.png);
            background-size: cover;
            height: auto;
            min-height: 235px;
            max-height: 35%;
        }

        .content-bg{
            position: absolute;
            z-index: 1;
            background-image: url(https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/chicme/2021111101/content_v0_bg2.png);
            background-size: cover;
            top: 130px;
            left: 0;
            width: 100%;
            height: calc(100% - 130px);
        }
    }

    .el-list-loading {
        text-align: center;
        padding: 10px 0;
        i {
            font-size: 24px;
            display: inline-block;
            animation: list-loading 1.5s infinite linear;
        }
    }

    @keyframes list-loading {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>