<template>
    <RefScrollList class="el-credits" :items="wallets" :loading="loading" :finished="finished" @listing="$emit('listing')">
        <template slot="li" slot-scope="props">
            <li :key="props.item.id">
                <WalletItem class="el-credit" :credit="props.item" :isExpired="isExpired" />
            </li>
        </template>
    </RefScrollList>
</template>

<style scoped lang="scss">
    .el-credits {
        // padding-top: 20px;
        // border-top: 10px solid #f6f6f6;
        overflow-y: auto;
        flex: 1;

        li {
            padding: 15px 12px;
            border-top: 1px solid red;
            // &:first-child {
            //     border-top: none;
            // }
            .el-credit {
                width: 100%;
            }
        }
        .li-tit{
            padding-left: 10px;
            height: 40px;
            line-height: 40px;
            background-color: #f5f5f5;
            color: #222;
        }
    }
</style>

<script type="text/ecmascript-6">
    import RefScrollList from "../../../components/ref-scroll-list.vue";
    import WalletItem from "./wallet-item.vue";
    import _ from 'lodash'

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