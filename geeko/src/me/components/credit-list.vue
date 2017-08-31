<template>
    <div class="el-credits">
        <list :items="credits" @listing="$emit('listing')" :scrollable="true">
            <template slot="li" scope="props">
                <li :key="props.item.id">
                    <credit class="el-credit" :credit="props.item"/>
                </li>
            </template>
        </list>
    </div>
</template>

<style scoped lang="scss">
    .el-credits{
        padding: 0 10px;
        li{
            border-top:1px solid #dcdcdc;
            &:first-child{
                border-top: none;
            }
            .el-credit{
                width: 100%;
            }
            padding: 10px 0;
        }

    }
</style>

<script type="text/ecmascript-6">
    import List from '../../components/list.vue'
    import Credit from '../components/credit.vue'

    export default{
        props:{
            credits:{
                type: Array
            }
        },
        components: {
            'list': List,
            'credit': Credit
        }
    }
</script>