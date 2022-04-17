<template>
    <div class="notification-body">
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
                return this.$store.getters['otherNotifications']
            },
            skip(){
                return this.$store.getters['otherNtSkip']
            },
            loaded(){
                return this.$store.getters['otherNtLoaded']
            },
            empty(){
                return this.loaded && (!this.notifications || !this.notifications.length)
            },
            finished(){
                return this.$store.getters['otherNtFinished']
            }
        },
        methods: {
            listingHandle(){
                this.loading = true
                this.$store.dispatch("getOtherNotifications", {skip: this.skip}).then(() => {
                    this.loading = false
                    this.$store.dispatch("getOtherNtSkip")
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