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
                <div class="themetit">{{collproduct.collection.name}}<p>—— {{collproduct.collection.description}}</p></div>
                <div class="viewmore" ><a :href="collectionurl(collproduct.collection)">VIEW MORE</a></div>
            </div>
            <product-row  v-for="productVO in collproduct.products" :productVO="productVO" :key="productVO.product.id" @edit="editHandle" :isEditing="editingId === productVO.product.id ||editingId === productVO.products[0].id ||editingId === productVO.products[1].id "/>
        </div>
    </div>
</template>
<script>
    import * as api from '../api/shoppable'
    import ProductRow from '../components-msite/theme-product-row.vue'

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
                editingId: null
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
        background-image: url("https://s3-us-west-2.amazonaws.com/static.geeko.online/image/joy/p/bg-outfits-msite.jpg");
        margin: 0 auto;
        padding-top: 1px;
        padding-bottom: 80px;
        .theme-wrapper{
            margin: 16px;
            margin-bottom: 40px;
            background-color: white;
            padding-left: 12px;
            border: 1px solid white;
            .theme-header{
                width: 100%;
                line-height: 16px;
                margin-top: 20px;
                .themetit{
                    float: left;
                    font-weight: bold;
                    font-size: 16px;
                    p{
                        font-weight: normal;
                        font-size: 11px;
                        color: #666;
                    }
                }
                .viewmore{
                    float: right;
                    width: 110px;
                    height: 20px;
                    margin-top: 20px;
                    margin-right: 15px;
                    line-height: 20px;
                    font-size: 12px;
                    color: white;
                    cursor: pointer;
                    text-align: center;
                    background-color: #f5b2a2;
                    a{
                        text-decoration: none;
                        color: white;
                    }
                }
            }
            .theme-header::after{
                content: '';
                display: block;
                clear: both;
            }
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
