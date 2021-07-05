<template>
    <div class="el-wishlist-body">
        <page-header>
            <span>{{$t('label.wishlist')}}</span>
            <span v-if="ifEdit" slot="oplabel" @click="editHandle">{{$t('label.edit')}}</span>
            <span v-if="!ifEdit" slot="oplabel" @click="cancelHandle">{{$t('label.cancel')}}</span>
        </page-header>
        <product-list v-if="ifEdit" :products="products" :loading="loading" :finished="finished" @listing="listingHandle" />
        <product-wishlist v-if="!ifEdit" :products="products" :loading="loading" :finished="finished" @listing="listingHandle" @refresh="refreshHandle"/>
        <loading v-if="ifloding"></loading>
    </div>
</template>

<style scoped lang="scss">
    .el-wishlist-body{
        background-color: #fff;
    }
</style>

<script type="text/ecmascript-6">
    import PageHeader from '../components/page-header.vue'
    import ProductList from '../../components/product-list.vue'
    import ProductWishList from '../../components/product-wishlist.vue'
    import store from '../../store'
    import Loading from "../../components/loading.vue";
    export default{
        data(){
            return{
                loading:false,
                finished: false,
                empty: false,
                ifEdit:true,
                ifloding:false,
            }
        },
        computed: {
            products(){
                return store.getters['me/wishProducts']
            },
            skip(){
                return store.getters['me/wishskip']
            }
        },
        methods: {
            listingHandle(refresh){
                if(refresh){
                    return ''
                }
                this.loading = true
                store.dispatch("me/getWishproducts", {skip: this.skip}).then(({empty, finished}) => {
                    if(finished) this.finished = finished
                    if(empty) this.empty = empty
                    this.loading = false
                    store.dispatch("me/getWishskip")
                })
            },
            refreshHandle({productIds}){
                this.ifloding = true
                if(productIds){
                    store.dispatch('me/removeWishProducts', {productIds}).then(()=>{
                        store.dispatch('clearId').then(()=>{
                            store.dispatch("me/getWishproducts", {skip: this.skip}).then(({empty, finished}) => {
                                this.finished = finished
                                if(empty) this.empty = empty
                                this.ifloding = false
                                store.dispatch("me/getWishskip")
                            })
                        })
                    })
                }else{
                    store.dispatch('me/removeExpiredProducts').then(()=>{
                        store.dispatch('clearId').then(()=>{
                            store.dispatch("me/getWishproducts", {skip: this.skip}).then(({empty, finished}) => {
                                this.finished = finished
                                if(empty) this.empty = empty
                                this.ifloding = false
                                store.dispatch("me/getWishskip")
                            })
                        })
                    })
                }
            },
            editHandle(){
                this.ifEdit = false;
            },
            cancelHandle(){
                this.ifEdit = true;
            }
        },
        components: {
            'loading':Loading,
            'page-header': PageHeader,
            'product-list': ProductList,
            'product-wishlist':ProductWishList
        },
        beforeRouteEnter(to, from, next){
            var wishproducts = store.getters['me/wishProducts']

            if(wishproducts && wishproducts.length){
                next(vm => {
                    vm.finished = true;
                })
                return;
            }
            store.dispatch("me/getWishproducts", {skip: 0} ).then(({finished}) => {
                store.dispatch("me/getWishskip")
                next(vm => {
                    vm.finished = finished;
                })
            })
        },
        mounted(){

        }
    }
</script>