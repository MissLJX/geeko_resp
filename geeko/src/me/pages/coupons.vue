<template>
    <div>
        <page-header>
            <span>Coupons</span>
        </page-header>
        <coupon-list :coupons="coupons"/>
    </div>
</template>

<style scoped lang="scss">

</style>

<script type="text/ecmascript-6">

    import store from '../../store'
    import {mapGetters} from 'vuex'
    import CouponList from '../components/coupon-list.vue'
    import PageHeader from '../components/page-header.vue'

    export default{

        computed: {
            ...mapGetters('me', ['coupons']),
        },
        components: {
            'coupon-list': CouponList,
            'page-header': PageHeader
        },

        methods:{

        },

        beforeRouteEnter(to, from, next){
            store.dispatch('me/getCoupons').then(() => {
                next()
            }).catch((e) => {
                console.error(e)
                next(false)
            })
        }
    }
</script>