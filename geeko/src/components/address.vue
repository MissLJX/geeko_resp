<template>
    <div class="el-address">
        <div class="__name">
            <span>{{address.name}}</span>
            <span>({{address.phoneNumber}})</span>
        </div>
        <div class="__street">{{streetAddress}}</div>
        <div class="__address">{{address.zipCode}}, {{address.city}}, {{stateCountry}}</div>
    </div>
</template>

<style scoped lang="scss">
    .el-address{
        .__name{
            font-family: SlatePro-Medium;
            font-size: 16px;
            color: #222222;
        }
        .__street{
            font-family: SlatePro;
            font-size: 14px;
            color: #666666;
            padding-top: 10px;
        }   

        .__address{
            font-family: SlatePro;
            font-size: 14px;
            color: #666666;
            padding-bottom: 10px;
        }
    }
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
                    return this.address.streetAddress1 + ', ' + this.address.unit
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