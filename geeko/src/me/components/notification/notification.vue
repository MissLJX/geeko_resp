<template>
    <div class="el-notification" :class="{'read':notification.read}">
        <model-1 :model="notification.model" v-if="notification.model.type == '1'"/>
        <model-2 :model="notification.model" v-if="notification.model.type == '2'"/>
        <model-3 :model="notification.model" v-if="notification.model.type == '3'"/>
        <model-4 :model="notification.model" v-if="notification.model.type == '4'"/>
        <model-5 :model="notification.model" v-if="notification.model.type == '5'"/>
        <div class="el-notification-send-time">{{sendTime}}</div>
    </div>
</template>

<style scoped lang="scss">
    .el-notification-send-time{
        height: 25px;
        text-align: right;
        font-size: 12px;
        color: #666;
        line-height: 25px;
    }

    .el-notification{
        background-color: #fff;
        &.read{

        }
    }
</style>

<script type="text/ecmascript-6">

    import Model1 from './model1.vue'
    import Model2 from './model2.vue'
    import Model3 from './model3.vue'
    import Model4 from './model4.vue'
    import Model5 from './model5.vue'
    import fecha from 'fecha'

    export default{
        props: {
            notification: {
                type: Object,
                required: true
            }
        },
        computed:{
            sendTime(){
                return fecha.format(new Date(this.notification.sendTime), 'mediumDate')
            }
        },
        components: {
            'model-1': Model1,
            'model-2': Model2,
            'model-3': Model3,
            'model-4': Model4,
            'model-5': Model5
        }
    }
</script>