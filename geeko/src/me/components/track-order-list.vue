<template>
    <div>
        <list :items="products" :loading="loading" :finished="finished" class="el-products" @listing="$emit('listing')">
            <template slot="li" slot-scope="props">
                <li :key="props.item.trackingId">
                    <track-order-detail :track="props.item" :class="{'b-right' : includeBorder && props.index != products.length - 1}"/>
                </li>
            </template>
        </list>
    </div>
</template>

<script>
    import TrackOrderDetail from '../components/track-order-detail.vue'
    import List from '../../components/list.vue'

    export default {
        name:"TrackOrderList",
        props:{
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
            }
        },
        components:{
            TrackOrderDetail,
            List
        },
        computed:{
            includeBorder(){
                return !!this.products && this.products.length > 1
            }
        }
    }
</script>

<style lang="scss" scoped>
    .b-right{
        border-bottom: 8px solid #f7f7f7;
    }
</style>