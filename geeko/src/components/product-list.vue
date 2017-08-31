<template>
    <div>
        <list :items="products" class="el-products">
            <template slot="li" scope="props">
                <li :key="props.item.id">
                    <product :product="props.item"/>
                </li>
            </template>
        </list>
    </div>
</template>

<style scoped lang="scss">
    .el-products{
        li{
            width: 50%;
            padding: 5px;
            float:left;
        }
    }
</style>

<script type="text/ecmascript-6">

    import List from './list.vue'
    import Product from './product.vue'

    export default{
        props: {
            products: {
                type: Array,
                required: true
            }
        },
        components: {
            'list': List,
            'product': Product
        }
    }
</script>