<template>
    <div class="wrapper">
        <product-row  v-for="productVO in products" :productVO="productVO" :key="productVO.product.id" @edit="editHandle" :isEditing="isEditing"/>
        <div v-show="loading" class="c-loading">
            <span class="x-loading">
              <span></span>
              <span></span>
              <span></span>
            </span>
        </div>
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
                            if(result.length<1 || result.length<this.limit){
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
            isEditing(){
                if(productVO.product.id && productVO.products[0].id && productVO.products[1].id){
                    if(this.editingId === productVO.product.id ||this.editingId === productVO.products[0].id ||this.editingId === productVO.products[1].id){
                        return true
                    }
                }else if(productVO.product.id && productVO.products[0].id ){
                    if(this.editingId === productVO.product.id ||this.editingId === productVO.products[0].id ||this.editingId === productVO.products[1].id){
                        return true
                    }
                }else{
                    return false
                }

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
        width: 100%;
        height: 100%;
        margin: 0 auto;
        padding: 1px 0 80px 10px;
    }
    .c-loading{
        height: 700px;
        line-height: 700px;
        text-align: center;
        .x-loading {
            display: inline-block;
            & > span {
                display: inline-block;
                background-color: #909393;
                width: 5px;
                margin-left: 2px;
                &:nth-child(1) {
                    height: 12px;
                    margin-left: 0;
                    animation-delay: 0s;
                }
                &:nth-child(2) {
                    height: 14px;
                    animation-delay: 0.25s;
                }
                &:nth-child(3) {
                    height: 16px;
                    animation-delay: 0.5s;
                }

                animation-name: x-loading-move;
                animation-duration: 0.5s;
                animation-iteration-count: infinite;
            }
        }
    }

    @keyframes x-loading-move {
        0% {
            background-color: #909393;
        }
        50% {
            background-color: #000;
        }
        100% {
            background-color: #909393;
        }
    }
</style>
