<template>
    <div class="el-you-likes">
        <!-- <div class="hd">
            {{$t("label.mayLike")}}
        </div> -->
        <div class="bd">
            <product-list 
                :products="products" 
                :loading="loading" 
                :finished="finished" 
                @listing="listingHandle"
                calssify-name="you may also like"
                event-title="me"
                :requestId="requestId"
                :experimentId="experimentId"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .el-you-likes{
        // .hd{
        //     height: 50px;
        //     line-height: 50px;
        //     text-align: center;
        //     font-weight: bold;
        //     text-transform: uppercase;
        // }
        .bd{
            padding: 0 5px;
        }
    }
</style>

<script type="text/ecmascript-6">
    import ProductList from './product-list.vue'
    import store from '../store'
    import { mapGetters } from "vuex"

    export default{
        data(){
            return{
                loading:false,
                finished: false,
                empty: false,
                requestId:"",
                experimentId:""
            }
        },
        computed: {
            ...mapGetters('me',["isLogin"]),
            products(){
                let products = store.getters['me/youlikeProducts']
                return products.length > 0 ? products.filter(item =>!item.isSmartCard && !item.isCollection) : [];
            },
            skip(){
                return store.getters['me/youlikeskip']
            }
        },
        methods: {
            listingHandle(){
                this.loading = true
                store.dispatch("me/getYouLikeProducts", {skip: this.skip}).then(({empty, finished,requestId,experimentId}) => {
                    if(finished) this.finished = finished
                    if(empty) this.empty = empty
                    this.loading = false
                    store.dispatch("me/getYouLikeSkip");
                    if(requestId) this.requestId = requestId;
                    if(experimentId) this.experimentId = experimentId;
                })
            }
        },
        components: {
            'product-list': ProductList
        },
        created(){
            this.loading = true;
            store.dispatch("me/getYouLikeProducts", {skip: 0}).then(({requestId,experimentId}) => {
                this.loading = false
                store.dispatch("me/getYouLikeSkip")

                if(requestId) this.requestId = requestId;
                if(experimentId) this.experimentId = experimentId;
            })
        }
    }
</script>