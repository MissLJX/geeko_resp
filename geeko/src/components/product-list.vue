<template>
    <div>
        <list :items="products" :loading="loading" :scrollable="scrollable" :finished="finished" class="el-products" @listing="$emit('listing')">
            <template slot="li" slot-scope="props">
                <li :key="props.item.id">
                    <product :product="props.item" :index="props.index" v-bind="$attrs"/>
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
            },
            loading: {
                type: Boolean,
                default: false
            },
            finished:{
                type: Boolean,
                default: false
            },
            scrollable:{
                type:Boolean,
                default:true
            },
            calssifyName:{
                type:String
            }
        },
        components: {
            'list': List,
            'product': Product
        }
    }
</script>