<template>
    <div class="wrapper">
        <div v-show="loading" class="c-loading">
            <span class="x-loading">
              <span></span>
              <span></span>
              <span></span>
            </span>
        </div>
        <div class="theme-wrapper" v-show="isgetproducts" v-for="collproduct in collproducts">
            <div class="theme-header">
                <span class="themetit">{{collproduct.collection.name}}</span>
                <span class="themecon">—— {{collproduct.collection.description}}</span>
            </div>
            <product-row  v-for="productVO in collproduct.products" :productVO="productVO" :key="productVO.product.id" @edit="editHandle" :isEditing="editingId === productVO.product.id ||editingId === productVO.products[0].id ||editingId === productVO.products[1].id "/>
            <div class="view-more"><a :href="collectionurl(collproduct.collection)">VIEW MORE</a></div>
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
            if(!this.loading){
                this.loading = true
                api.getthemeproducts(0,10).then((result) => {
                    this.collproducts =result;
                    this.loading = false;
                    this.isgetproducts = true;
                })
            }
        },
        data(){
            return{
                collproducts:[],
                editingId: null,
                isgetproducts:false,
                loading:false
            }
        },
        computed: {

        },
        methods:{
            editHandle(relatedId){
                this.editingId = relatedId;
            },
            collectionurl: function(collection){
                return `${(window.ctx || '')}/page/out-fits?collectionId=${collection.id}`
            }
        }
    }
</script>
<style lang="scss" scoped>
    .wrapper{
        width: 100%;
        height: 100%;
        background-image: url("https://s3-us-west-2.amazonaws.com/static.geeko.online/image/joy/p/bg-outfits-pc.jpg");
        background-size: cover;
        background-repeat: no-repeat;
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
                    font-size: 22px;
                }
            }
            .view-more{
                width: 100%;
                height: 32px;
                line-height: 32px;
                text-align: center;
                font-size: 22px;
                margin-bottom: 50px;
                a{
                    color: #000;
                }
            }
        }
        .c-loading{
            height: 900px;
            line-height: 900px;
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
