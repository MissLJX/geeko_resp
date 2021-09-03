<template>
    <div class="product-wishlist-list">
        <list :items="products" :loading="loading" :scrollable="scrollable" :finished="finished" class="el-products" @listing="$emit('listing')">
            <template slot="li" slot-scope="props">
                <li :key="props.item.id">
                    <product :product="props.item" :index="props.index" :calssify-name="calssifyName"/>
                </li>
            </template>
        </list>
    </div>
</template>

<script>
    import List from '../../../components/list.vue'
    import Product from './product-wishlist.vue'

    export default {
        name:"ProductWishListList",
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

<style scoped lang="scss">
    .el-products{
        li{
            width: 50%;
            padding: 5px;
            float:left;
        }
    }
</style>