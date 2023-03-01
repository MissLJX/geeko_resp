<template>
    <div class="you-likes-list">
        <list
            :items="products"
            class="el-product"
            @listing="$emit('listing')"
            :loading="loading"
            :finished="finished"
            :type="type"
            >
            <template slot="li" slot-scope="props">
                <li :key="props.item.id">
                    <product class="el-notification" :product="props.item" :index="props.itemIndex"/>
                </li>
            </template>
        </list>
    </div>
</template>

<script>
    import List from "../point/list.vue"
    import Product from "./product.vue"

    export default {
        name:"YouLikesList",
        components:{
            "list":List,
            "product":Product
        },
        props: {
            products: {
                type: Array
            },
            loading: {
                type: Boolean,
                default: false
            },
            finished: {
                type: Boolean,
                default: false
            },
            sensors:{
                type: Object,
                default: {}
            }
        },
    }
</script>

<style scoped lang="scss">
    .el-product{
        /deep/ ul{
            display: flex;
            width: 100%;
            flex-wrap: wrap;
            padding: 0px 10px;

            & li{
                width: calc(50% - 10px);
                display: inline-block;
                margin: 5px 5px;
            }
        }

        /*定义整体的宽度*/
        &::-webkit-scrollbar {
            width: 6px;
        }
        /*定义滚动条轨道*/
        &::-webkit-scrollbar-track {
            border-radius: 5px;
        }
        /*定义滑块*/
        &::-webkit-scrollbar-thumb {
            width: 6px;
            border-radius: 3px;
            background-color: #cccccc;
        }
        &::-webkit-scrollbar-thumb:hover{
            background-color: #999; 
        }
    }
</style>