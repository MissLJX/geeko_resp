<template>
    <div class="el-address-list">
        <list :items="addresses" @listing="listing" :loading="loading" :finished="finished">
            <template slot="li" slot-scope="props">
                <li :key="props.item.id">
                    <shipping-detail 
                        :address="props.item" 
                        @delete="deleteHandle" 
                        @list-address-edit="listEditHandle" 
                        @make-default="makeDefaultHandle"
                        :address-lodding.sync="loading"
                    />
                </li>
            </template>
        </list>
    </div>
</template>

<style scoped lang="scss">
    .el-address-list{
        padding-bottom: 70px;
        li{
            // border-top: 1px solid #d6d6d6;
            padding: 10px 20px;
            &:first-child{
                border-top: none;
            }
        }
    }
</style>

<script type="text/ecmascript-6">

    import Address from './address.vue'
    import List from '../../components/list.vue'


    export default{
        props: {
            loading: {
                type: Boolean,
                default: false
            },
            finished: {
                type: Boolean,
                default: false
            },
            addresses: {
                type: Array,
                required: true
            }
        },
        methods: {
            listing(){
                this.$emit('listing')
            },
            listEditHandle(address){
                this.$emit('list-address-edit', address)
            },
            makeDefaultHandle(addressId){
                this.$emit('make-default', addressId)
            },
            deleteHandle(addressId){
                this.$emit('delete', addressId)
            }
        },
        components: {
            'shipping-detail': Address,
            'list': List
        }
    }
</script>