<template>
    <div class="notification-body">
        <notification-list v-if="!empty" :notifications="notifications" @listing="listingHandle" :loading="loading"
                           :finished="finished"/>
         <notification-empty v-if="empty"></notification-empty>
        <!-- <div v-if="empty" class="el-notification-empty">
            <img src="https://image.geeko.ltd/me/msite/empty-notification-dark-1.png">
            <p>You have no notification</p>
        </div> -->
    </div>
</template>

<style scoped lang="scss">
    .notification-body {
        padding-top: 12px;
    }

    .el-notification-empty{
        img{
            display: block;
            width: 150px;
            margin: 100px auto 0 auto;
        }

        p{
            color: #999;
            font-size: 18px;
            text-align: center;
            margin-top: 15px;
        }

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
                return this.$store.getters['orderNotifications']
            },
            skip(){
                return this.$store.getters['orderNtSkip']
            },
            loaded(){
                return this.$store.getters['orderNtLoaded']
            },
            empty(){
                return this.loaded && (!this.notifications || !this.notifications.length)
            },
            finished(){
                return this.$store.getters['orderNtFinished']
            }
        },
        components: {
            'notification-list': NotificationList,
            'notification-empty': NotificationEmpty,
        },
        methods: {
            listingHandle(){
                this.loading = true;
                this.$store.dispatch("getOrderNotifications", {skip: this.skip}).then(() => {
                    this.loading = false
                    this.$store.dispatch("getOrderNtSkip")
                })
            }
        },
        created(){
            if ((!this.notifications || !this.notifications.length) && !this.finished)
                this.listingHandle()
        }
    }
</script>