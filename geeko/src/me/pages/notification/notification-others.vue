<template>
    <div class="notification-body">
        <notification-list @listing="listingHandle" :loading="loading" :finished="finished"
                           :notifications="notifications"/>
        <notification-empty v-if="finished && notifications.length == 0"></notification-empty>

    </div>
</template>

<style scoped lang="scss">
    .notification-body {
        background-color: #efefef;
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
                return store.getters['me/otherNotifications']
            },
            skip(){
                return store.getters['me/otherNtSkip']
            },
            loaded(){
                return store.getters['me/otherNtLoaded']
            },
            empty(){
                return this.loaded && (!this.notifications || !this.notifications.length)
            },
            finished(){
                return store.getters['me/otherNtFinished']
            }
        },
        methods: {
            listingHandle(){
                this.loading = true
                store.dispatch("me/getOtherNotifications", {skip: this.skip}).then(() => {
                    this.loading = false
                    store.dispatch("me/getOtherNtSkip")
                })
            }
        },
        components: {
            'notification-list': NotificationList,
            'notification-empty':NotificationEmpty

        },
        created(){
            if (!this.notifications || !this.notifications.length)
                this.listingHandle()
        }
    }
</script>