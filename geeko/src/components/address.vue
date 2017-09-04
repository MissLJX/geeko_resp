<template>
    <address class="el-address">
        <div><strong>{{address.name}}</strong><span>({{address.phoneNumber}})</span></div>
        <div>{{streetAddress}}</div>
        <div>{{address.zipCode}}, {{address.city}}, {{stateCountry}}</div>
    </address>
</template>

<style scoped lang="scss">

</style>

<script type="text/ecmascript-6">
    export default{
        props: {
            address: {
                type: Object,
                required: true
            }
        },
        computed: {
            streetAddress(){
                if (this.address.unit)
                    return this.address.streetAddress1 + ' ,' + this.address.unit
                return this.address.streetAddress1
            },
            stateCountry(){
                var stateStr = this.address.state ? (this.address.state.label ? this.address.state.label : this.address.state.value) : '';
                if(stateStr)
                    return stateStr + ', ' + this.address.country.label
                return this.address.country.label
            }
        }
    }
</script>