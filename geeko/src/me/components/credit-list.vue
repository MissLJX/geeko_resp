<template>
    <div class="el-credits">
        <list :items="credits" :loading="loading" :finished="finished" @listing="$emit('listing')">
            <template slot="li" slot-scope="props">
                <li :key="props.item.id">
                    <credit class="el-credit" :credit="props.item"/>
                </li>
            </template>
        </list>
    </div>
</template>

<style scoped lang="scss">
    .el-credits {
        // padding-top: 20px;
        border-top: 10px solid #f6f6f6;
        li {
            padding: 15px 13px;
            border-bottom: 1px solid #f6f6f6;
            &:first-child {
                border-top: none;
            }
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
    import List from '../../components/list.vue'
    import Credit from '../components/credit.vue'
    import _ from 'lodash'
    import fecha from 'fecha'

    export default{
        props: {
            credits: {
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
            }
        },
        components: {
            'list': List,
            'credit': Credit
        }
    }
</script>