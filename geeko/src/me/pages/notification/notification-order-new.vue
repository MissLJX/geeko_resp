<template>
    <div>
        <page-header>{{$t("notification.orders")}}</page-header>
        <div class="notification-body">
            
            <notification-list @listing="listingHandle" :loading="loading" :finished="finished"
                            :notifications="notifications"/>
            <notification-empty v-if="empty"></notification-empty>
        </div>
    </div>
    
</template>

<style scoped>
    .notification-body {
        background-color: #f5f5f5;
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
                return store.getters['me/orderNewNotifications']
            },
            skip(){
                return store.getters['me/orderNewNtSkip']
            },
            loaded(){
                return store.getters['me/orderNewNtLoaded']
            },
            empty(){
                return this.loaded && (!this.notifications || !this.notifications.length)
            },
            finished(){
                return store.getters['me/orderNewNtFinished']
            },
        },
        methods: {
            listingHandle(){
                this.loading = true
                store.dispatch("me/getOrderNewNotifications", {skip: this.skip}).then(() => {
                    this.loading = false
                    store.dispatch("me/getOrderNewNtSkip")
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