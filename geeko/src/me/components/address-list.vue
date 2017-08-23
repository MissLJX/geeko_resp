<template>
    <div class="el-address-list">
        <list :items="addresses" @listing="listing" :loading="loading">
            <template slot="li" scope="props">
                <li :key="props.item.id">
                    <shipping-detail :address="props.item"/>
                </li>
            </template>
        </list>
    </div>
</template>

<style scoped lang="scss">
    .el-address-list{
        li{
            border-top: 1px solid #d6d6d6;
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
            addresses: {
                type: Array,
                required: true
            }
        },
        methods: {
            listing(){
                this.$emit('listing')
            }
        },
        components: {
            'shipping-detail': Address,
            'list': List
        }
    }
</script>