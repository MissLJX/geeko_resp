<template>
    <div>
        <!-- <page-header>{{$t('label.notification')}}</page-header> -->
        <page-header>{{$t("notification.message")}}</page-header>
        <div>
            <slide-nav :navs="navs" @navchange="navchange"/>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>

<script type="text/ecmascript-6">

    import PageHeader from '../components/page-header.vue'
    import SlideNav from '../../components/slide-nav.vue'
    import { mapGetters } from 'vuex'
    import store from '../../store'

    export default{
        data(){
            return {
                navs: [
                    // {id: '1', name: 'Activities', path: 'notification-promotion', active: 'notification-promotion' == this.$route.name || 'notification' == this.$route.path},
                    // {id: '2', name: 'Promo', path: 'notification-me', active: 'notification-me' == this.$route.name},
                    // {id: '3', name: 'Others', path: 'notification-other', active: 'notification-other' == this.$route.name}
                    {id: '1', name: this.$t("notification.activities"), path: 'notification-activities', active: 'notification-activities' == this.$route.name || 'notification' == this.$route.path, noRead: 0},
                    {id: '2', name: this.$t("notification.promo"), path: 'notification-promo', active: 'notification-promo' == this.$route.name,noRead: 0},
                    {id: '3', name: this.$t("notification.others"), path: 'notification-others', active: 'notification-others' == this.$route.name,noRead: 0}
                ]
            }
        },
        computed:{
            activityNoRead(){
                let nav = this.navs.find(n => n.id == '1')
                let num = store.getters["me/activityNotificationnoRead"]
                if(nav.noRead != num){
                    nav.noRead = num
                }
                return num
            },
            promoNoRead(){
                let nav = this.navs.find(n => n.id == '2')
                let num = store.getters["me/promoNotificationnoRead"]
                if(nav.noRead != num){
                    nav.noRead = num
                }
                return num
            },
            otherNoRead(){
                let nav = this.navs.find(n => n.id == '3')
                let num = store.getters["me/otherNotificationnoRead"]
                if(nav.noRead != num){
                    nav.noRead = num
                }
                return num
            },

        },
        created(){
            store.dispatch("me/getActivityNotificationsNoRead")
            store.dispatch("me/getPromoNotificationsNoRead")
            store.dispatch("me/getOtherNotificationsNoRead")
            // console.log(this.activityNoRead, 
            //             this.promoNoRead, 
            //             this.otherNoRead,
            //             )

        },
        methods: {
            navchange(id){
                _.each(this.navs, (n) => {
                    n.active = false
                })


                var nav = _.find(this.navs, n => n.id === id)

                nav.active = true

            }
        },
        components: {
            'page-header': PageHeader,
            'slide-nav': SlideNav
        }
    }
</script>
