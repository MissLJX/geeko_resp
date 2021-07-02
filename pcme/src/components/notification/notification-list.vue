<template>
    <div>
        <div class="el-notifications">
            <list :items="notifications" @listing="$emit('listing')" :loading="loading" :finished="finished">
                <template slot="li" slot-scope="props">
                    <li :key="props.item.id">
                        <notification class="el-notification" :notification="props.item"/>
                    </li>
                </template>
            </list>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .el-notifications {
        li {
            break-inside: avoid;
            .el-notification {
                width: 100%;
            }
            background-color: #fff;
        }
    }
</style>

<script type="text/ecmascript-6">
    import List from './notification-list-modal.vue'
    import Notification from './notification.vue'

    export default{
        props: {
            notifications: {
                type: Array
            },
            loading: {
                type: Boolean,
                default: false
            },
            finished: {
                type: Boolean,
                default: false
            }
        },
        components: {
            'list': List,
            'notification': Notification
        }
    }
</script>