<template>
    <div class="el-address-list-element">
        <common-address :address="address"/>
        <div>
            <btn class="fill">Edit</btn>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .el-address-list-element{
        padding: 10px;
    }
</style>
<script type="text/ecmascript-6">

    import CommonAddress from '../../components/address.vue'
    import Btn from '../../components/btn.vue'

    export default{
        props: {
            address: {
                type: Object,
                required: true
            }
        },
        components: {
            'common-address': CommonAddress,
            'btn': Btn
        }

    }
</script>