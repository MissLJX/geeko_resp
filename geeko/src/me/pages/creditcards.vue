<template>
    <div class="el-wallet-body">
        <page-header>{{$t('label.creditcard')}}</page-header>
        <card-list :creditcards="creditcards" @delete="deleteHandle"></card-list>
    </div>
</template>

<style scoped lang="scss">
    .el-wallet-body{
        position:fixed;
        width: 100%;
        height: 100%;
        top: 0;
        right:0;
        background: #fff;
    }
</style>

<script type="text/ecmascript-6">
    import store from '../../store'
    import {mapGetters} from 'vuex'
    import PageHeader from '../components/page-header.vue'
    import CardList from "../components/card-list.vue";

    export default{
        computed: {
            ...mapGetters('me', [
                'creditcards'
            ])
        },
        methods: {
            deleteHandle(cardId,method){
                if(method === '19'){
                    store.dispatch('me/deleteMercadoCard', {cardId}).then(()=>{
                        store.dispatch('me/getCreditCards');
                    });
                }else{
                    store.dispatch('me/deleteCreditCard', {cardId}).then(()=>{
                        store.dispatch('me/getCreditCards');
                    });
                }
            },
        },
        components: {
            CardList,
            'page-header': PageHeader
        },
        created() {
            store.dispatch('me/getCreditCards');
        }
    }
</script>