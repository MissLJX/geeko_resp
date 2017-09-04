<template>
    <div class="notification-body">
        <notification-list :notifications="notifications"/>
    </div>
</template>

<style scoped lang="scss">
    .notification-body{
        background-color: #efefef;
    }
</style>

<script type="text/ecmascript-6">

    import NotificationList from '../../components/notification/notification-list.vue'
    import store from '../../../store'

    export default{
        computed:{
            notifications(){
                return store.getters['me/promotionNotifications']
            }
        },
        components: {
            'notification-list': NotificationList
        },
        beforeRouteEnter(to, from, next){
            var notifications = store.getters['me/promotionNotifications']
            if(notifications && notifications.length){
                next()
            }else{
                store.dispatch('me/getPromotionNotifications', {skip:0}).then(() => {
                    next()
                })
            }
        }
    }
</script>