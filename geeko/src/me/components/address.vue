<template>
    <div class="el-address-list-element">
        <common-address :address="address"/>
        <div class="st-flex el-address-btns">
            <div>
                <btn v-if="address.isDefaultAddress" class="el-address-default fill">Default Address</btn>
                <btn class="el-address-default" @click.native.prevent="makeDefaultHandle" v-else>Make Default</btn>
            </div>
            <div>
                <btn class="el-address-op">Delete</btn>
                <btn class="el-address-op el-address-edit" @click.native.prevent="editHandle">Edit</btn>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .el-address-list-element{
        padding: 10px;
    }

    .el-address-btns{
        margin-top: 10px;
        & > div:first-child{
            width: 40%;
        }

        & > div:last-child{
            width: 60%;
            text-align: right;
        }

        .el-address-default{
            width: 160px;
            height: 30px;
            line-height: 30px;
            padding: 0;
        }

        .el-address-op{
            width: 60px;
            height: 30px;
            line-height: 30px;
            padding: 0;
        }

        .el-address-edit{
            margin-left: 6px;
        }


    }
</style>
<script type="text/ecmascript-6">

    import CommonAddress from '../../components/address.vue'
    import Btn from '../../components/btn.vue'
    import _ from 'lodash'

    export default{
        props: {
            address: {
                type: Object,
                required: true
            }
        },
        methods:{
            editHandle(){
                var _address = _.cloneDeep(this.address)
                this.$emit('list-address-edit', _address)
            },
            makeDefaultHandle(){
                this.$emit('make-default', this.address.id)
            }
        },
        components: {
            'common-address': CommonAddress,
            'btn': Btn
        }

    }
</script>