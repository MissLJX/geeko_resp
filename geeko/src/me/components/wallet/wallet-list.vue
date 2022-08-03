<template>
    <RefScrollList class="el-credits" :items="wallets" :loading="loading" :finished="finished" @listing="$emit('listing')">
        <template slot="li" slot-scope="props">
            <li :key="props.item.id">
                <WalletItem :credit="props.item" :isExpired="isExpired" />
            </li>
        </template>
    </RefScrollList>
</template>

<style scoped lang="scss">
    .el-credits {
        overflow-y: auto;
        flex: 1;
        position: relative;
    }
</style>

<script type="text/ecmascript-6">
    import RefScrollList from "../../../components/ref-scroll-list.vue";
    import WalletItem from "./wallet-item.vue";

    export default{
        name:"WalletList",
        props: {
            wallets: {
                type: Array
            },
            loading: {
                type: Boolean,
                default: false
            },
            finished: {
                type: Boolean,
                default: false
            },
            isReceived:{
                type: String,
            },
            isExpired:{
                type:Boolean
            }
        },
        components: {
            'RefScrollList': RefScrollList,
            'WalletItem': WalletItem
        }
    }
</script>