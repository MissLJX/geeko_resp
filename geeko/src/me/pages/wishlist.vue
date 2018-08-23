<template>
    <div class="el-wishlist-body">
        <page-header>Wish list</page-header>
        <div>
            <product-list :products="products" :loading="loading" :finished="finished" @listing="listingHandle"/>
        </div>
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
    import store from '../../store'
    export default{
        data(){
            return{
                loading:false,
                finished: false,
                empty: false
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
            listingHandle(){
                this.loading = true
                store.dispatch("me/getWishproducts", {skip: this.skip}).then(({empty, finished}) => {
                    if(finished) this.finished = finished
                    if(empty) this.empty = empty
                    this.loading = false
                    store.dispatch("me/getWishskip")
                })
            }
        },
        components: {
            'page-header': PageHeader,
            'product-list': ProductList
        },
        beforeRouteEnter(to, from, next){
            var wishproducts = store.getters['me/wishProducts']

            if(wishproducts && wishproducts.length){
                next()
                return
            }

            store.dispatch("me/getWishproducts", {skip: 0}).then(() => {
                store.dispatch("me/getWishskip")
                next()
            })
        }
    }
</script>