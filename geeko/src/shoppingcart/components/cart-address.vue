<template id="address-area">
    <div class="cart-address">
        <div class="hd st-table">
            <div class="st-cell st-v-m">
                <strong>{{$t('label.address')}}</strong>
            </div>
            <div class="st-cell">

            </div>
        </div>
        <div class="bd">
            <address>
                <div><span>{{shippingDetail.name}}</span><span>({{shippingDetail.phoneNumber}})</span></div>
                <div>{{streetAddress}}</div>
                <div>{{shippingDetail.zipCode}}, {{shippingDetail.city}}, {{stateCountry}}</div>
            </address>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .cart-address {
        & > .hd {
            height: 40px;
            h3 {
                font-size: 14px;
                font-weight: 600;
            }
            padding: 0 10px;
        }

        & > .bd {
            padding: 0 10px 10px;
        }

        address {

        }
    }
</style>

<script type="text/ecmascript-6">
    export default{
        props: ['shippingDetail'],
        computed: {
            streetAddress(){
                if (this.shippingDetail.unit)
                    return this.shippingDetail.streetAddress1 + ' ,' + this.shippingDetail.unit
                return this.shippingDetail.streetAddress1
            },
            stateCountry(){
                if (this.shippingDetail.state)
                    return this.shippingDetail.state.label + ', ' + this.shippingDetail.country.label
                return this.shippingDetail.country.label
            }
        }
    }
</script>