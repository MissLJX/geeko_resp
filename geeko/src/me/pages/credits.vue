<template>
    <div>
        <page-header>Credits</page-header>

        <div>
            <div class="el-credits-total"><strong>Total: </strong>{{feed.points}}</div>
            <credit-list :credits="credits" @listing="listingHandle"/>
        </div>


    </div>
</template>

<style scoped lang="scss">
    .el-credits-total {
        text-align: center;
        margin-top: 10px;
    }
</style>

<script type="text/ecmascript-6">

    import {mapGetters} from 'vuex'
    import store from '../../store'
    import CreditList from '../components/credit-list.vue'
    import PageHeader from '../components/page-header.vue'

    export default{
        computed: {
            ...mapGetters('me', ['feed', 'credits'])
        },
        components: {
            'credit-list': CreditList,
            'page-header': PageHeader
        },
        methods: {
            listingHandle(){
            }
        },
        beforeRouteEnter(to, from, next){
            store.dispatch('me/getCredits').then(() => {
                next()
            }).catch((e) => {
                console.error(e)
                next(false)
            })
        }
    }
</script>