<template>
    <div class="relation-products">
        <nav-bar>
            <i class="iconfont el-back-font" slot="left" @click="$router.go(-1)">&#xe693;</i>
            <span slot="center">{{ $t("label.Relation Products") }}</span>
        </nav-bar>

        <product-list
            :loading="loading"
            :products="relationProducts" 
            :finished="finished" 
            @listing="listingHandle"
            calssify-name="relation products"
        >
        </product-list>
    </div>
</template>

<script>
    import NavBar from "../components/nav-bar.vue"
    import store from "../../store/index.js"
    import {mapGetters} from "vuex"
    import ProductList from "../../components/product-list.vue"

    export default {
        name:"RelationProducts",
        data(){
            return {
                loading:false,
                finished: false,
                empty: false
            }
        },
        components:{
            "nav-bar":NavBar,
            "product-list":ProductList
        },
        computed:{
            ...mapGetters("me",["relationProducts","relationProductsSkip"])
        },
        methods:{
            listingHandle(){
                this.loading = true;
                let productId = this.$route.params.productId;
                store.dispatch("me/getRelationProducts", {skip: this.relationProductsSkip,productId} ).then(({finished}) => {
                    if(finished)this.finished = finished;
                    this.loading = false;
                    store.dispatch("me/getRelationProductsSkip");
                })
            }
        },
        beforeRouteEnter(to, from, next){
            let productId = to.params.productId;
            store.dispatch("me/getRelationProducts", {skip: 0,productId} ).then(({finished}) => {
                next(vm => {
                    if(finished){
                        vm.finished = finished;
                    };
                    store.dispatch("me/getRelationProductsSkip");
                })
            })
        },
        watch:{
            "$route":function(to, from){
                console.log(to.params.productId);
            }
        }
    }
</script>

<style scoped lang="scss">

</style>