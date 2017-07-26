<template>
    <div>
        <list :items="items">
            <template slot="li" scope="props">
                <cart-item :key="props.item.productId" :item="props.item" />
            </template>
        </list>
    </div>
</template>

<style type="scss/text" lang="scss">

</style>

<script type="text/ecmascript-6">
    import List from '../../components/list.vue'
    import CartItem from './cart-item.vue'
    export default{
        props: {
            items: {
                type: Array,
                required: true
            }
        },
        components: {
            'list': List,
            'cart-item': CartItem
        }
    }
</script>