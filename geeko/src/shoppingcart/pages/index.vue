<template>
    <div>
        <div v-if="isNotEmpty" class="cart-body">
            <cart-address :shippingDetail="shoppingcart.shippingDetail"/>
        </div>
        <div v-else>
           loading
        </div>
    </div>
</template>

<style type="scss/text" lang="scss">
    body{
        background-color: #efefef;
    }

    .cart-body{
        font-size: 14px;
    }

</style>

<script type="text/ecmascript-6">

    import {mapGetters, mapActions} from 'vuex'
    import CartAddress from '../components/cart-address.vue'

    export default{
        created(){
            this.load()
        },
        methods:{
            ...mapActions({
                load:'updateShoppingcart'
            })
        },
        computed:{
            ...mapGetters([
                'shoppingcart',
                'countries',
                'states'
            ]),
            isNotEmpty(){
                return !!this.shoppingcart
            }
        },
        components:{
            'cart-address': CartAddress
        },
        watch: {
            '$route': 'load'
        },
    }
</script>