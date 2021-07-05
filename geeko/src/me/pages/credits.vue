<template>
    <div class="el-credit-body">

        <page-header>My Points</page-header>

        <div>
            <credit-header :me="me"></credit-header>
            <received-used @showUsed="changeMethod"></received-used>
            <credit-list  :isReceived="isReceived" :credits="credits" @listing="listingHandle" :loading="loading" :finished="finished"/>
        </div>

        <!-- <get-more></get-more> -->
    </div>
</template>

<style scoped lang="scss">
    .el-credits-total {
        text-align: center;
        margin-top: 10px;
    }
    .el-credit-body{
        background-color: #fff;
    }

</style>

<script type="text/ecmascript-6">

    import {mapGetters} from 'vuex'
    import store from '../../store'
    import CreditList from '../components/credit-list.vue'
    import PageHeader from '../components/page-header.vue'
    import CreditHeader from '../components/credit-header.vue'
    import ReceivedUsed from '../components/received-used.vue'
    import GetMore from '../components/get-more.vue'

    export default{
        data(){
            return {
                loading: false,
                finished: false,
                empty: false,
                received: 0,
                used: 0,
                isReceived:"0"
            }
        },
        computed: {
            ...mapGetters('me', ['feed', 'credits','creditskip','me']),
/*
            receivedPoints(){
                this.allPoints.forEach(points=>{
                    points.points>0 ? this.received += points.points : this.used += points.points
                })
            },*/
        },
        components: {
            'credit-list': CreditList,
            'page-header': PageHeader,
            'credit-header': CreditHeader,
            'received-used': ReceivedUsed,
            'get-more': GetMore,
        },
        methods: {
            listingHandle(){
                this.loading = true;
                store.dispatch('me/getCredits',{skip: this.creditskip}).then(({empty, finished}) => {
                    if(empty) this.empty = empty;
                    if(finished) this.finished = finished;
                    this.loading = false;
                    store.dispatch('me/getCreditskip');
                })
            },
            changeMethod(msg){
                this.isReceived = msg;
            }

        },
        beforeRouteEnter(to, from, next){
            let credits = store.getters['me/credits'];

            if(credits && credits.length){
                next();
                return;
            }

            store.dispatch('me/getCredits', {skip: 0}).then(({empty, finished}) => {
                next(vm => {
                    if(empty) vm.empty = empty
                    if(finished) vm.finished = finished
                })
                next()
            }).catch((e) => {
                console.log(e)
                next(false)
            })
        },
    }
</script>