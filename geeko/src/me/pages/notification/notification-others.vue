<template>
    <div class="notification-body">
        <!-- <notification-list @listing="listingHandle" :loading="loading" :finished="finished"
                           :notifications="notifications"/>
        <notification-empty v-if="empty"></notification-empty> -->
        <div class="notification_type_list">
            <router-link class="notification_type_item" to="/me/m/notification-ticket">
                <div style="display: flex;align-items: center;">
                    <span class="iconfont">&#xe6e8;</span>
                    <span class="notification_type_item_txt">{{$t("notification.ticket")}}</span>
                    <span class="has_no_read" v-if="ticketNoRead > 0"></span>
                </div>
            </router-link>
            
            <router-link class="notification_type_item" to="/me/m/notification-order">
                <div style="display: flex;align-items: center;">
                    <span class="iconfont">&#xe6ee;</span>
                    <span class="notification_type_item_txt">{{$t("notification.orders")}}</span>
                    <span class="has_no_read" v-if="orderNoRead > 0"></span>
                </div>
            </router-link>

            <router-link class="notification_type_item" to="/me/m/notification-news">
                <div style="display: flex;align-items: center;">
                    <span class="iconfont">&#xe774;</span>
                    <span class="notification_type_item_txt">{{$t("notification.news")}}</span>
                    <span class="has_no_read" v-if="newsNoRead > 0"></span>
                </div>
            </router-link>
        </div>


    </div>
</template>

<style scoped>
    .notification-body {
        background-color: #f5f5f5;
    }
    .notification_type_list{
        padding: 10px 12px;
    }
    .notification_type_item{
        width: 100%;
        /* border: 1px solid; */
        padding: 19px 12px;
        margin-bottom: 10px;
        background-color: #ffffff;
        box-shadow: 0px 0px 20px 5px rgb(0 0 0 / 5%);
        border-radius: 4px;
        display: flex;
        align-items: center;
    }
    .iconfont{
        display: inline-block;
        width: 29px;
        height: 29px;
        background: #222;
        color: #fff;
        border-radius: 50%;
        text-align: center;
        line-height: 29px;
        margin-right: 12px;
    }
    .notification_type_item_txt{
        font-family: 'ACUMINPRO-BOLD';
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #222222;
        text-transform: capitalize;
        cursor: pointer;
    }
    .has_no_read{
        display: inline-block;
        width: 7px;
        height: 7px;
        background-color: #e64545;
        border-radius: 50%;
        margin-left: 6px;
    }
</style>

<script type="text/ecmascript-6">

    import NotificationList from '../../components/notification/notification-list.vue'
    import NotificationEmpty from '../../components/notification/notification-empty.vue'
    import store from '../../../store'

    export default{
        data(){
            return {
                loading: false,
            }
        },
        computed: {
            // notifications(){
            //     return store.getters['me/otherNotifications']
            // },
            // skip(){
            //     return store.getters['me/otherNtSkip']
            // },
            // loaded(){
            //     return store.getters['me/otherNtLoaded']
            // },
            // empty(){
            //     return this.loaded && (!this.notifications || !this.notifications.length)
            // },
            // finished(){
            //     return store.getters['me/otherNtFinished']
            // },

            ticketNoRead(){
                let num = store.getters["me/ticketNotificationnoRead"]
                return num
            },
            orderNoRead(){
                let num = store.getters["me/orderNotificationnoRead"]
                return num
            },
            newsNoRead(){
                let num = store.getters["me/newsNotificationnoRead"]
                return num
            },
        },
        methods: {
            listingHandle(){
                // this.loading = true
                // store.dispatch("me/getOtherNotifications", {skip: this.skip}).then(() => {
                //     this.loading = false
                //     store.dispatch("me/getOtherNtSkip")
                // })
            },
            goPage(){

            }
        },
        components: {
            'notification-list': NotificationList,
            'notification-empty':NotificationEmpty

        },
        created(){
            store.dispatch("me/getTicketNotificationsNoRead")
            store.dispatch("me/getOrderNotificationsNoRead")
            store.dispatch("me/getNewsNotificationsNoRead")
            if ((!this.notifications || !this.notifications.length) && !this.finished)
                this.listingHandle()
        }
    }
</script>