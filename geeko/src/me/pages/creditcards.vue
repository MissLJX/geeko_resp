<template>
    <div class="el-wallet-body">
        <page-header>{{$t('label.creditcard')}}</page-header>
        <card-list :creditcards="getAllCards" @delete="deleteHandle"></card-list>
        <div style="text-align: center;line-height: 50px" v-if="!getAllCards">No Card.</div>
    </div>
</template>

<style scoped lang="scss">
    .el-wallet-body{
        position:fixed;
        width: 100%;
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
                'creditcards','mercadocreditcards'
            ]),
            getAllCards(){
                let cardArr = [];
                if(this.mercadocreditcards){
                    cardArr =  this.creditcards.concat(this.mercadocreditcards);
                }else{
                    cardArr =  this.creditcards;
                }
                return cardArr;
            }
        },
        methods: {
            deleteHandle(cardId,method){
                if(method === '19'){
                    store.dispatch('me/deleteMercadoCard', {cardId}).then(()=>{
                        store.dispatch('me/getCreditCards');
                        store.dispatch('me/getMercadoCreditCards');
                    });
                }else{
                    store.dispatch('me/deleteCreditCard', {cardId}).then(()=>{
                        store.dispatch('me/getCreditCards');
                        store.dispatch('me/getMercadoCreditCards');
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
            store.dispatch('me/getMercadoCreditCards');
        }
    }
</script>