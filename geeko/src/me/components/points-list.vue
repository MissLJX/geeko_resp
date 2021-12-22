<template>
    <div class="points-list">
        <div class="hd">
            {{$t("point.apply_points")}}
        </div>
        <div class="bd">
            <product-list 
                :products="products" 
                :loading="loading" 
                :finished="finished" 
                @listing="listingHandle"
                calssify-name="points"
                event-title="me_points"
                :requestId="requestId"
                :experimentId="experimentId"
            />
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
                empty: false,
                requestId:"",
                experimentId:""
            }
        },
        computed: {
            products(){
                return store.getters['me/pointsProducts']
            },
            skip(){
                return store.getters['me/pointsProductsSkip']
            }
        },
        methods: {
            listingHandle(){
                this.loading = true
                store.dispatch("me/getPointsProducts", {skip: this.skip}).then(({empty, finished,requestId,experimentId}) => {
                    if(finished) this.finished = finished
                    if(empty) this.empty = empty
                    this.loading = false
                    store.dispatch("me/getPointsSkip");

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

            if(this.products && this.products.length > 0){
                return;
            }
            

            store.dispatch("me/getPointsProducts", {skip: 0}).then(({requestId,experimentId}) => {
                this.loading = false
                store.dispatch("me/getPointsSkip");

                if(requestId) this.requestId = requestId;
                if(experimentId) this.experimentId = experimentId;
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
            margin-top: 10px;
            margin-left: -5px;
            margin-right: -5px;
        }
    }
</style>