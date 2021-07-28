<template>
    <div class="points-list">
        <div class="hd">
            Apply points towards purchase
        </div>
        <div class="bd">
            <product-list :products="products" :loading="loading" :finished="finished" @listing="listingHandle"/>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import ProductList from '../../components/product-list.vue'
    import store from '../../store/index.js'
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
                return store.getters['me/youlikeProducts']
            },
            skip(){
                return store.getters['me/youlikeskip']
            }
        },
        methods: {
            listingHandle(){
                this.loading = true
                store.dispatch("me/getYouLikeProducts", {skip: this.skip}).then(({empty, finished}) => {
                    if(finished) this.finished = finished
                    if(empty) this.empty = empty
                    this.loading = false
                    store.dispatch("me/getYouLikeSkip")
                })
            }
        },
        components: {
            'product-list': ProductList
        },
        created(){
            this.loading = true;
            store.dispatch("me/getYouLikeProducts", {skip: 0}).then(() => {
                this.loading = false
                store.dispatch("me/getYouLikeSkip")
            })
        }
    }
</script>

<style scoped lang="scss">
    .points-list{
        .hd{
            font-size: 14px;
            color: #222222;
            font-family: 'AcuminPro-Bold';
        }
        .bd{
            padding: 0 5px;
            margin-top: 10px;
        }
    }
</style>