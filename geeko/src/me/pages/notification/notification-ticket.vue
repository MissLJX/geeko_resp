<template>
    <div class="notification-body">
       
        <page-header>{{$t("notification.ticket")}}</page-header>

        <div class="line"></div>

         <notification-list @listing="listingHandle" :loading="loading" :finished="finished"
                           :notifications="notifications"/>

        <notification-empty v-if="empty"></notification-empty>
    </div>
</template>

<style scoped>
    .notification-body {
        background-color: #f5f5f5;
    }
    .line{
        width: 100%;
        height: 1px;
        background-color: #efefef;
    }
    
</style>

<script type="text/ecmascript-6">

    import NotificationList from '../../components/notification/notification-list.vue'
    import NotificationEmpty from '../../components/notification/notification-empty.vue'
    import store from '../../../store'
    import PageHeader from '../../components/page-header.vue'


    export default{
        data(){
            return {
                loading: false,
            }
        },
        computed: {
            notifications(){
                return store.getters['me/ticketNotifications']
            },
            skip(){
                return store.getters['me/ticketNtSkip']
            },
            loaded(){
                return store.getters['me/ticketNtLoaded']
            },
            empty(){
                return this.loaded && (!this.notifications || !this.notifications.length)
            },
            finished(){
                return store.getters['me/ticketNtFinished']
            },
        },
        methods: {
            listingHandle(){
                this.loading = true
                store.dispatch("me/getTicketNotifications", {skip: this.skip}).then(() => {
                    this.loading = false
                    store.dispatch("me/getTicketNtSkip")
                })
            },
            goPage(){
                
            }
        },
        components: {
            'notification-list': NotificationList,
            'notification-empty':NotificationEmpty,
            'page-header':PageHeader
        },
        created(){
            if ((!this.notifications || !this.notifications.length) && !this.finished)
                this.listingHandle()
        }
    }
</script>