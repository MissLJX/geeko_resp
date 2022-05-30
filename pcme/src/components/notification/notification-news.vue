<template>
    <div class="notification-body">
        <div class="notification_header">{{$t("notification.news")}}</div>
        <notification-list @listing="listingHandle" :loading="loading" :finished="finished"
                           :notifications="notifications"/>
         <notification-empty v-if="empty"></notification-empty>
    </div>
</template>

<style scoped lang="scss">
    .notification-body {
        background-color: #fff;
        padding-top: 12px;
    }

    .notification_header{
        width: 100%;
        text-align: center;
        font-family: SlatePro-Medium;
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #222222;
        text-transform: capitalize;
        margin: 20px 0;
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
            notifications(){
                return this.$store.getters['newsNotifications']
            },
            skip(){
                return this.$store.getters['newsNtSkip']
            },
            loaded(){
                return this.$store.getters['newsNtLoaded']
            },
            empty(){
                return this.loaded && (!this.notifications || !this.notifications.length)
            },
            finished(){
                return this.$store.getters['newsNtFinished']
            },
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
                this.loading = true
                this.$store.dispatch("getNewsNotifications", {skip: this.skip}).then(() => {
                    this.loading = false
                    this.$store.dispatch("getNewsNtSkip")
                })
            }
        },
        components: {
            'notification-list': NotificationList,
            'notification-empty': NotificationEmpty,
        },
        created(){
            if ((!this.notifications || !this.notifications.length) && !this.finished)
                this.listingHandle()
        }
    }
</script>