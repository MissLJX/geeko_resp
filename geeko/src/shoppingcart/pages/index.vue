<template>
    <div>
        <div v-if="isNotEmpty" class="cart-body">
            <cart-address class="cart-block cart-address" :shippingDetail="shoppingcart.shippingDetail"/>

            <div v-if="shoppingcart.shoppingCartProductsByOverseas && shoppingcart.shoppingCartProductsByOverseas.length > 0">
                <div class="st-table st-fullwidth cart-block">
                    <div class="st-cell st-v-m">
                        <i class="iconfont cart-fly">&#xe659;</i>
                    </div>
                    <div class="st-cell st-v-m">
                        <div>Shipping Method</div>
                        <div>{{shoppingcart.shippingMethod.title}}: {{unitprice(shoppingcart.shippingMethod.price)}}</div>
                    </div>
                </div>
                <div class="cart-block">
                    <cart-items :items="shoppingcart.shoppingCartProductsByOverseas"/>
                </div>
            </div>

        </div>
        <div v-else>
            {{$t('message.loading')}}...
        </div>
    </div>
</template>

<style scoped lang="scss">
    body {
        background-color: #efefef;
    }

    .cart-body {
        font-size: 14px;
    }

    .cart-block{
        background-color: #fff;
        margin-top:10px;
    }

    .cart-fly{
        font-size: 30px;
    }

    .cart-address{

    }

</style>

<script type="text/ecmascript-6">

    import * as geekoutils from '../../utils/geekoutils'
    import {mapGetters, mapActions} from 'vuex'
    import CartAddress from '../components/cart-address.vue'
    import CartItems from '../components/cart-items.vue'

    export default{
        created(){
            this.load()
        },
        methods: {
            ...mapActions({
                load: 'updateShoppingcart'
            }),
            unitprice(money){
                return geekoutils.unitprice(money)
            }
        },
        computed: {
            ...mapGetters([
                'shoppingcart',
                'countries',
                'states'
            ]),
            isNotEmpty(){
                return !!this.shoppingcart
            }
        },
        components: {
            'cart-address': CartAddress,
            'cart-items': CartItems
        },
        watch: {
            '$route': 'load'
        },
    }
</script>