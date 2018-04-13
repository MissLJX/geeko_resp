<template>
    <div class="wrapper">
        <product-row  v-for="productVO in products" :productVO="productVO" :key="productVO.product.id" @edit="editHandle" :isEditing="editingId === productVO.product.id ||editingId === productVO.products[0].id ||editingId === productVO.products[1].id "/>
        <div v-show="loading"></div>
    </div>
</template>
<script>
    import * as api from '../api/shoppable'
    import ProductRow from '../components-msite/product-row.vue'

    export default {
        name:'list-product',
        components:{
            ProductRow
        },
        created(){
            this.getproducts();
        },
        data(){
            return{
                products: [],
                editingId: null,
                loading: false,
                finished: false,
                skip: 0,
                limit: 20
            }
        },
        computed: {

        },
        methods:{
            getproducts(){
                if(!this.finished){
                    if(!this.loading){
                        this.loading = true;
                        api.getproducts(this.skip , this.limit).then((result) => {
                            if(result.length < 1){
                                this.finished = true;
                            }
                            this.products.push(...result);
                            this.skip += this.limit;
                            this.loading = false;
                        })
                    }
                }
            },

            editHandle(relatedId){
                this.editingId = relatedId;
            },
            scrollHandle(evt){
                evt.preventDefault()
                let [scrollTop, documentHeight, windowHeight] = [
                    document.documentElement.scrollTop || document.body.scrollTop,
                    document.body.clientHeight,
                    window.screen.height
                ]


                if (scrollTop + windowHeight >= documentHeight - 100) {
                    this.getproducts()
                }
            }
        },
        mounted(){
            window.addEventListener('scroll', this.scrollHandle)
        },
        destroyed(){
            window.removeEventListener('scroll', this.scrollHandle)
        },
        activated(){
            window.addEventListener('scroll', this.scrollHandle)
        },
        deactivated(){
            window.removeEventListener('scroll', this.scrollHandle)
        }
    }
</script>
<style lang="scss" scoped>
    .wrapper{
        width: 700px;
        background-color: white;
        margin: 0 auto;
    }
</style>
