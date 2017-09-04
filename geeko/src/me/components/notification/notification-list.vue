<template>
    <div class="el-notifications">
        <list :items="notifications" @listing="$emit('listing')" :scrollable="true">
            <template slot="li" scope="props">
                <li :key="props.item.id">
                    <notification class="el-notification" :notification="props.item"/>
                </li>
            </template>
        </list>
    </div>
</template>

<style scoped lang="scss">
    .el-notifications{
        li{
            &:first-child{
                margin-top: 0;
            }
            .el-notification{
                width: 100%;
            }
            padding: 15px 10px 0 10px;
            background-color: #fff;
            margin-top: 10px;

        }

    }
</style>

<script type="text/ecmascript-6">
    import List from '../../../components/list.vue'
    import Notification from './notification.vue'

    export default{
        props:{
            notifications:{
                type: Array
            }
        },
        components: {
            'list': List,
            'notification': Notification
        }
    }
</script>