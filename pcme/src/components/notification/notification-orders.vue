<template>
    <div class="notification-body">
        <div class="notification_header">{{$t("notification.orders")}}</div>
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
                return this.$store.getters['orderNewNotifications']
            },
            skip(){
                return this.$store.getters['orderNewNtSkip']
            },
            loaded(){
                return this.$store.getters['orderNewNtLoaded']
            },
            empty(){
                return this.loaded && (!this.notifications || !this.notifications.length)
            },
            finished(){
                return this.$store.getters['orderNewNtFinished']
            },
        },
        methods: {
            listingHandle(){
                this.loading = true
                this.$store.dispatch("getOrderNewNotifications", {skip: this.skip}).then(() => {
                    this.loading = false
                    this.$store.dispatch("getOrderNewNtSkip")
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