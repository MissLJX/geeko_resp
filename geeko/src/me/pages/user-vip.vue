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
        

        <div class="content">
            <div class="content-container">
                <!-- 上部分关于卡片的 -->
                <vip-grade :index="1"></vip-grade>

                <!-- 奖励与权益部分 -->
                <vip-rewards></vip-rewards>

                <!-- FAQS -->
                <vip-faq></vip-faq>
            </div>

            <div class="grade-bg"></div>
            <div class="content-bg"></div>
        </div>
    </div>
</template>

<script>
    import PageHeader from '@/me/components/page-header.vue'
    import VipGrade from '../components/userVip/vip-grade.vue'
    import VipRewards from "../components/userVip/vip-rewards.vue"
    import VipFaq from '../components/userVip/vip-faq.vue'

    export default {
        name:"UserVip",
        data(){
            return {
                siteName:window.name
            }
        },
        computed:{
            shoppingCartCount(){
                return this.$store.getters['me/shoppingCartCount'];
            }
        },
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
        background-image: linear-gradient(135deg, 
		#d7d7d7 0%, 
		#707070 100%);
        padding-bottom: 50px;
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
            background-image: url(https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/chicme/2021111101/content_v0_bg.png);
            background-size: cover;
            top: 100px;
            left: -20%;
            width: 137%;
            height: calc(100% - 235px);
            height: 100%;    
        }
    }
</style>