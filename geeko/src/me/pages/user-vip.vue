<template>
    <div class="user-vip">
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

        <div class="content">
            <!-- 上部分关于卡片的 -->
            <vip-grade :index="1"></vip-grade>

            <!-- 奖励与权益部分 -->
            <vip-rewards></vip-rewards>
        </div>
    </div>
</template>

<script>
    import PageHeader from '@/me/components/page-header.vue'
    import VipGrade from '../components/userVip/vip-grade.vue'
    import VipRewards from "../components/userVip/vip-rewards.vue"

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
            VipRewards
        },
    }
</script>

<style scoped lang="scss">
    .user-vip{
        background-image: linear-gradient(135deg, 
		#d7d7d7 0%, 
		#707070 100%);

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
</style>