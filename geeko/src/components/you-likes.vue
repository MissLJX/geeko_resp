<template>
    <div class="el-you-likes">
        <div class="hd">
            You May Also Like
        </div>
        <div class="bd">
            <product-list v-if="products" :products="products"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .el-you-likes{
        .hd{
            height: 50px;
            line-height: 50px;
            text-align: center;
            border-bottom: 1px solid #dcdcdc;
            font-weight: bold;
            text-transform: uppercase;
        }
        .bd{
            padding: 5px;
        }
    }
</style>

<script type="text/ecmascript-6">
    import ProductList from './product-list.vue'
    export default{
        props: {
            products: Array
        },
        components: {
            'product-list': ProductList
        }
    }
</script>