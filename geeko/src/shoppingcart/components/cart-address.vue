<template id="address-area">
    <div>
        <div class="hd">
            <h3>Shipping Address</h3>
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

<style type="scss/text" lang="scss">

</style>

<script type="text/ecmascript-6">
    export default{
        props:['shippingDetail'],
        computed:{
            streetAddress(){
                if(this.shippingDetail.unit)
                    return this.shippingDetail.streetAddress1 + ' ,' +this.shippingDetail.unit
                return this.shippingDetail.streetAddress1
            },
            stateCountry(){
                if(this.shippingDetail.state)
                    return this.shippingDetail.state.label +', '+ this.shippingDetail.country.label
                return this.shippingDetail.country.label
            }
        }
    }
</script>