<template>
    <div class="notification-body">
        <notification-list @listing="listingHandle" :loading="loading" :finished="finished"
                           :notifications="notifications"/>
        <notification-empty v-if="empty"></notification-empty>
    </div>
</template>

<style scoped lang="scss">
    .waterfall{
        column-count: 3;
        column-gap: 0;
    }
    .item{
        box-sizing: border-box;
        break-inside: avoid;
        padding: 10px;
    }
    .item-content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 10px;
        height: auto;
        font-size: 20px;
        color: #686868;
        box-sizing: border-box;
        border: 1px solid #ccc;
    }
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
                return this.$store.getters['promotionNotifications']
            },
            skip(){
                return this.$store.getters['promotionNtSkip']
            },
            loaded(){
                return this.$store.getters['promotionNtLoaded']
            },
            empty(){
                return this.loaded && (!this.notifications || !this.notifications.length)
            },
            finished(){
                return this.$store.getters['promotionNtFinished']
            }
        },
        methods: {
            listingHandle(){
                this.loading = true;
                if(!this.finished){
                    this.$store.dispatch("getPromotionNotifications", {skip: this.skip}).then(() => {
                        this.loading = false;
                        this.$store.dispatch("getPromotionNtSkip");
                    })
                }
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