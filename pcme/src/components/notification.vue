<template>
    <div class="message-con">
        <div class="tab-list">
            <router-link :to="getUrl('/me/m/notification/')">
                <p :class="{'active':isActive==='activities', 'no-read':activityNoRead>0}" @click="changeClass('activities')">
                    {{$t("notification.activities")}}
                </p>
            </router-link>
            <router-link :to="getUrl('/me/m/notification/promo')">
                <p :class="{'active':isActive==='promo', 'no-read':promoNoRead>0}" @click="changeClass('promo')">
                    {{$t("notification.promo")}}
                </p>
            </router-link>
            <router-link :to="getUrl('/me/m/notification/others')">
                <p :class="{'active':isActive==='others', 'no-read':otherNoRead>0}" @click="changeClass('others')">
                    {{$t("notification.others")}}
                </p>
            </router-link>
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
    import store from '../store'
    export default {
        data(){
            return{
                isActive:this.$route.name
            }
        },
        computed:{
            activityNoRead(){
                let num = store.getters["activityNotificationnoRead"]
                return num
            },
            promoNoRead(){
                let num = store.getters["promoNotificationnoRead"]
                return num
            },
            otherNoRead(){
                let num = store.getters["otherNotificationnoRead"]
                return num
            },
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
            store.dispatch("me/getActivityNotificationsNoRead")
            store.dispatch("me/getPromoNotificationsNoRead")
            store.dispatch("me/getOtherNotificationsNoRead")
            // console.log(this.$route.name)
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
    // color: rgba(229, 0, 79, 0.9);
}
</style>