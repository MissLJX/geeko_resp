<template>
    <div class="message-con">
        <div class="tab-list">
            <p :class="{'active':isActive==='promotion'}" @click="changeClass('promotion')"><router-link :to="getUrl('/me/m/notification/')">{{$t('prmotion')}}</router-link></p>
            <p :class="{'active':isActive==='order'}" @click="changeClass('order')"><router-link :to="getUrl('/me/m/notification/order')">{{$t('orders')}}</router-link></p>
            <p :class="{'active':isActive==='other'}" @click="changeClass('other')"><router-link :to="getUrl('/me/m/notification/other')">{{$t('notiothers')}}</router-link></p>
        </div>
        <div class="noti-con">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import {PROJECT} from '../utils/geekoutil'
    export default {
        data(){
            return{
                isActive:this.$route.name
            }
        },
        methods:{
            changeClass(currIndex){
                this.isActive = currIndex
            },
            getUrl(suffix){
                return PROJECT + suffix;
            }
        },
        created() {
            console.log(this.$route.name)
        }
    }
</script>

<style scoped lang="scss">
.tab-list{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid #e6e6e6;
}
.tab-list p{
    padding: 13px 24px;
    text-transform: uppercase;
}
.tab-list p.active{
    border-bottom: 1px solid #222;
    color: rgba(229, 0, 79, 0.9);
}
</style>