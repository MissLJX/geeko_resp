<template>
    <div>
        <page-header>Notification</page-header>
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

    export default{
        data(){
            return {
                navs: [
                    {id: '1', name: 'Promotion', path: 'notification-promotion', active: 'notification-promotion' == this.$route.name || 'notification' == this.$route.path},
                    {id: '2', name: 'Orders', path: 'notification-me', active: 'notification-me' == this.$route.name},
                    {id: '3', name: 'Others', path: 'notification-other', active: 'notification-other' == this.$route.name}
                ]
            }
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
