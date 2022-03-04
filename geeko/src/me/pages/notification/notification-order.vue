<template>
    <div class="notification-body">
        <notification-list v-if="!empty" :notifications="notifications" @listing="listingHandle" :loading="loading"
                           :finished="finished"/>
        <div v-if="empty" class="el-notification-empty">
            <img src="https://image.geeko.ltd/me/msite/empty-notification-dark-1.png">
            <p>{{$t('label.no_notification')}}</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .notification-body {
    }

    .el-notification-empty{
        img{
            display: block;
            width: 150px;
            margin: 100px auto 0 auto;
            display: block;
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

    import NotificationList from '../../components/notification/notification-list.vue'
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
        components: {
            'notification-list': NotificationList
        },
        methods: {
            listingHandle(){
                this.loading = true
                store.dispatch("me/getOrderNotifications", {skip: this.skip}).then(() => {
                    this.loading = false
                    store.dispatch("me/getOrderNtSkip")
                })
            }
        },
        created(){
            if (!this.loaded)
                this.listingHandle()
        }
    }
</script>