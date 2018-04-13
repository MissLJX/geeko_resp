<template>
    <div class="wrapper">
        <div class="theme-wrapper">
            <div class="theme-header">
                <span class="themetit">PARTY QUEEN</span>
                <span class="themecon">—— Be the queen shine the party.</span>
            </div>
            <product-row  v-for="productVO in products" :productVO="productVO" :key="productVO.product.id" @edit="editHandle" :isEditing="editingId === productVO.product.id ||editingId === productVO.products[0].id ||editingId === productVO.products[1].id "/>
        </div>
        <div class="theme-wrapper">
            <div class="theme-header">
                <span class="themetit">PARTY QUEEN</span>
                <span class="themecon">—— Be the queen shine the party.</span>
            </div>
            <product-row  v-for="productVO in products" :productVO="productVO" :key="productVO.product.id" @edit="editHandle" :isEditing="editingId === productVO.product.id ||editingId === productVO.products[0].id ||editingId === productVO.products[1].id "/>
        </div>
    </div>
</template>
<script>
    import * as api from '../api/shoppable'
    import ProductRow from '../components/theme-product-row.vue'

    export default {
        name:'list-product',
        components:{
            ProductRow
        },
        created(){
            api.getproducts(0 , 2).then((result) => {
                this.products =result;
            })
        },
        data(){
            return{
                products: [],
                editingId: null
            }
        },
        computed: {

        },
        methods:{
            editHandle(relatedId){
                this.editingId = relatedId;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .wrapper{
        width: 100%;
        height: 100%;
        background-image: url("https://s3-us-west-2.amazonaws.com/static.geeko.online/image/joy/p/bg-outfits-pc.jpg");
        margin: 0 auto;
        padding-top: 1px;
        padding-bottom: 80px;
        .theme-wrapper{
            width: 1200px;
            margin: 0 auto;
            margin-top: 80px;
            background-color: white;
            padding-left: 100px;
            border: 1px solid white;
            border-radius: 8px;
            box-shadow: 0px 2px 17px rgba(0,0,0,45);
            .theme-header{
                width: 100%;
                height: 170px;
                line-height: 190px;
                .themetit{
                    margin-right: 56px;
                    color: #000;
                    font-size: 40px;
                }
                .themecon{
                    color: #666666;
                    font-size: 16px;
                }
            }
        }
    }
</style>
