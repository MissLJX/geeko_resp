<template>
    <div class="message-con">
        <div class="tab-list">
            <p :class="{'active':isActive==='activities'}" @click="changeClass('activities')"><router-link :to="getUrl('/me/m/notification/')">{{$t("notification.activities")}}</router-link></p>
            <p :class="{'active':isActive==='promo'}" @click="changeClass('promo')"><router-link :to="getUrl('/me/m/notification/promo')">{{$t("notification.promo")}}</router-link></p>
            <p :class="{'active':isActive==='others'}" @click="changeClass('others')"><router-link :to="getUrl('/me/m/notification/others')">{{$t("notification.others")}}</router-link></p>
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