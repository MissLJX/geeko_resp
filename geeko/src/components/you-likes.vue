<template>
    <div class="el-you-likes">
        <div class="hd">
            {{$t("label.mayLike")}}
        </div>
        <div class="bd">
            <product-list :products="products" :loading="loading" :finished="finished" @listing="listingHandle"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .el-you-likes{
        .hd{
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-weight: bold;
            text-transform: uppercase;
        }
        .bd{
            padding: 0 5px;
        }
    }
</style>

<script type="text/ecmascript-6">
    import ProductList from './product-list.vue'
    import store from '../store'
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
            store.dispatch("me/getYouLikeProducts", {skip: 0}).then(() => {
                store.dispatch("me/getYouLikeSkip")
            })
        }
    }
</script>