<template>
    <div>
        {{me.email}}
        <ul>
            <li>
                <router-link to="/me/address-book">Address Book</router-link>
            </li>

            <li>
                <router-link to="/me/change-currency">Change Currency</router-link>
            </li>

            <li>
                <router-link to="/me/change-email">Change Email</router-link>
            </li>

            <li>
                <router-link to="/me/change-password">Change Password</router-link>
            </li>

            <li>
                <router-link to="/me/coupons">Coupons</router-link>
            </li>

            <li>
                <router-link to="/me/credits">Credits</router-link>
            </li>

            <li>
                <router-link to="/me/settings">Settings</router-link>
            </li>
        </ul>

    </div>
</template>

<style scoped lang="scss">

</style>

<script type="text/ecmascript-6">

    import {mapGetters, mapActions} from 'vuex'
    import store from '../../store'

    export default{
        computed: {
            ...mapGetters('me', [
                'me'
            ])
        },
        methods: {},
        beforeRouteEnter(to, from, next){
            store.dispatch('me/getMe').then(() => {
                next()
            }).catch((e) => {
                console.error(e)
                next(false)
            })
        },
        watch: {
            $route () {
                store.dispatch('me/getMe')
            }
        }
    }
</script>