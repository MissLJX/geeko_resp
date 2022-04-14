<template>
    <div class="notification-body">
        <notification-list @listing="listingHandle" :loading="loading" :finished="finished"
                           :notifications="notifications"/>
        <notification-empty v-if="empty"></notification-empty>
    </div>
</template>

<style scoped lang="scss">
    .notification-body {
        background-color: #f5f5f5;
    }
</style>

<script type="text/ecmascript-6">

    import NotificationList from '../../components/notification/notification-list.vue'
    import NotificationEmpty from '../../components/notification/notification-empty.vue'
    import store from '../../../store'

    export default{
        data(){
            return {
                loading: false
            }
        },
        computed: {
            notifications(){
                return store.getters['me/orderNotifications']
            },
            skip(){
                return store.getters['me/orderNtSkip']
            },
            loaded(){
                return store.getters['me/orderNtLoaded']
            },
            empty(){
                return this.loaded && (!this.notifications || !this.notifications.length)
            },
            finished(){
                return store.getters['me/orderNtFinished']
            }
        },
        methods: {
            listingHandle(){
                this.loading = true
                if(!this.finished){
                    store.dispatch("me/getOrderNotifications", {skip: this.skip}).then(() => {
                        this.loading = false
                        store.dispatch("me/getOrderNtSkip")
                    })
                }
            }
        },
        components: {
            'notification-list': NotificationList,
            'notification-empty':NotificationEmpty
        },
        created(){
            if ((!this.notifications || !this.notifications.length) && !this.finished)
                this.listingHandle()
        }
    }
</script>