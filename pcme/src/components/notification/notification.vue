<template>
    <div class="el-notification" :class="{'read':notification.read}">
        <div class="el-eachmodel" :class="{'no-read':!notification.read }" v-if="notification.type != '9'">
            <model-1 :model="notification.model" v-if="notification.model.type == '1'" :sendtime="sendTime"/>
            <model-2 :model="notification.model" v-if="notification.model.type == '2'" :sendtime="sendTime"/>
            <model-3 :model="notification.model" v-if="notification.model.type == '3'" :sendtime="sendTime"/>
            <model-4 :model="notification.model" v-if="notification.model.type == '4'" :sendtime="sendTime"/>
            <model-5 :model="notification.model" v-if="notification.model.type == '5'" :sendtime="sendTime"/>
            <model-6 :model="notification.model" v-if="notification.model.type == '6'" :sendtime="sendTime"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .el-notification-send-time{
        height: 22px;
        text-align: center;
        margin:15px auto 12px;
        width:130px;
        background-color: rgba(0, 0, 0, 0.1);
        font-size: 12px;
        color: #f5f5f5;
        line-height: 22px;
        border-radius: 4px;
    }

    .el-notification{
        background-color: #f0f0f0;
        .el-eachmodel{
            padding: 0 12px 12px 0;
            background-color: #fff;
            position: relative;

            &.no-read::after{
                content: '';
                display: block;
                position: absolute;
                width: 7px;
                height: 7px;
                border-radius: 50%;
                background-color: #e64545;
                top: 6px;
                right: 12px;
            }
        }
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
    import Model6 from './model6.vue'
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
                return fecha.format(new Date(this.notification.sendTime), 'YYYY-MM-DD hh:mm:ss')
            }
        },
        created(){
            // console.log(this.notification)
        },
        components: {
            'model-1': Model1,
            'model-2': Model2,
            'model-3': Model3,
            'model-4': Model4,
            'model-5': Model5,
            'model-6': Model6
        }
    }
</script>