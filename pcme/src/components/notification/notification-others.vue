<template>
    <div class="notification-body">
        <!-- <notification-list @listing="listingHandle" :loading="loading" :finished="finished"
                           :notifications="notifications"/>
         <notification-empty v-if="empty"></notification-empty> -->
         <div class="notification_type_list">
            <router-link class="notification_type_item" to="/me/m/notification/ticket" @click="()=>linkTo('/me/m/notification/ticket')">
                <div>
                    <span class="iconfont">&#xe6e8;</span>
                    <span class="notification_type_item_txt">{{$t("notification.ticket")}}</span>
                    <span class="has_no_read" v-if="ticketNoRead > 0"></span>
                </div>
            </router-link>
            
            <router-link class="notification_type_item" to="/me/m/notification/order">
                <div>
                    <span class="iconfont">&#xe6ee;</span>
                    <span class="notification_type_item_txt">{{$t("notification.orders")}}</span>
                    <span class="has_no_read" v-if="orderNoRead > 0"></span>
                </div>
            </router-link>

            <router-link class="notification_type_item" to="/me/m/notification/news">
                <div>
                    <span class="iconfont">&#xe774;</span>
                <span class="notification_type_item_txt">{{$t("notification.news")}}</span>
                <span class="has_no_read" v-if="newsNoRead > 0"></span>
                </div>
            </router-link>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .notification-body {
        background-color: #fff;
        padding-top: 12px;
    }

    .notification_type_list{
        padding: 10px 12px;
        display: flex;
    }
    .notification_type_item{
        width: 320px;
        height: 176px;
        background-color: #ffffff;
        box-shadow: 0px 0px 20px 5px rgba(0,0,0,0.05);
        /* border: 1px solid; */
        padding: 19px 12px;
        margin-bottom: 10px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        // flex-direction: column;
        margin: 5px;
    }
    .notification_type_item > div{
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        position: relative;
    }
    .iconfont{
        display: inline-block;
        width: 70px;
        height: 70px;
        background: #222;
        color: #fff;
        border-radius: 50%;
        text-align: center;
        line-height: 70px;
        // margin-right: 12px;
        margin-bottom: 8px;
        font-size: 35px;
    }
    .notification_type_item_txt{
        font-family: 'ACUMINPRO-BOLD';
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #222222;
        text-transform: capitalize;
        cursor: pointer;
        
    }
    .has_no_read{
        position: absolute;
        top: 4px;
        left: 57%;
        display: inline-block;
        width: 7px;
        height: 7px;
        background-color: #e64545;
        border-radius: 50%;
    }
</style>

<script type="text/ecmascript-6">
    import NotificationList from './notification-list.vue'
    import NotificationEmpty from './motification-empty.vue'
    export default{
        data(){
            return {
                loading: false
            }
        },
        computed: {
            // notifications(){
            //     return this.$store.getters['otherNotifications']
            // },
            // skip(){
            //     return this.$store.getters['otherNtSkip']
            // },
            // loaded(){
            //     return this.$store.getters['otherNtLoaded']
            // },
            // empty(){
            //     return this.loaded && (!this.notifications || !this.notifications.length)
            // },
            // finished(){
            //     return this.$store.getters['otherNtFinished']
            // },
            ticketNoRead(){
                let num = this.$store.getters["ticketNotificationnoRead"]
                return num
            },
            orderNoRead(){
                let num = this.$store.getters["orderNotificationnoRead"]
                return num
            },
            newsNoRead(){
                let num = this.$store.getters["newsNotificationnoRead"]
                return num
            },
        },
        methods: {
            listingHandle(){
                // this.loading = true
                // this.$store.dispatch("getOtherNotifications", {skip: this.skip}).then(() => {
                //     this.loading = false
                //     this.$store.dispatch("getOtherNtSkip")
                // })
            },
            linkTo(url){
                e.preventDefault();
                this.$route.push({pathname:url});
            }
        },
        components: {
            'notification-list': NotificationList,
            'notification-empty': NotificationEmpty,
        },
        created(){
            this.$store.dispatch("getTicketNotificationsNoRead")
            this.$store.dispatch("getOrderNotificationsNoRead")
            this.$store.dispatch("getNewsNotificationsNoRead")
            if ((!this.notifications || !this.notifications.length) && !this.finished)
                this.listingHandle()
        }
    }
</script>