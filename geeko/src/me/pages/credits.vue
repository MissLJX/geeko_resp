<template>
    <div>
        <page-header>Credits</page-header>

        <div>
            <div class="el-credits-total"><strong>Total: </strong>{{feed.points}}</div>
            <credit-list :credits="credits" @listing="listingHandle" :loading="loading" :finished="finished"/>
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
        data(){
            return {
                loading: false,
                finished: false,
                empty: false
            }
        },
        computed: {
            ...mapGetters('me', ['feed', 'credits','creditskip'])
        },
        components: {
            'credit-list': CreditList,
            'page-header': PageHeader
        },
        methods: {
            listingHandle(){
                this.loading = true
                store.dispatch('me/getCreditskip')
                store.dispatch('me/getCredits',{skip: this.creditskip}).then(({empty, finished}) => {
                    this.loading = false
                    if(empty) this.empty = empty
                    if(finished) this.finished = finished
                })
            }
        },
        beforeRouteEnter(to, from, next){
            store.dispatch('me/getCredits', {skip: 0}).then(({empty, finished}) => {
                next(vm => {
                    if(empty) vm.empty = empty
                    if(finished) vm.finished = finished
                })
            }).catch((e) => {
                console.log(e)
                next(false)
            })
        }
    }
</script>