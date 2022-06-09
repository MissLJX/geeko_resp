<template>
    <div class="el-notification" :class="{'read':notification.read, 'top':notification.type!='9'}">
        <div class="el-notification-send-time" v-if="notification.type!='9'">{{sendTime}}</div>

        <div class="el-eachmodel" :class="{'no-read':!notification.read}" v-if="notification.type!='9'">
            <model-1 :model="notification.model" @record="geekoSensor" v-if="notification.model.type == '1'"/>
            <model-2 :model="notification.model" @record="geekoSensor" v-if="notification.model.type == '2'"/>
            <model-3 :model="notification.model" @record="geekoSensor" v-if="notification.model.type == '3'"/>
            <model-4 :model="notification.model" @record="geekoSensor" v-if="notification.model.type == '4'"/>
            <model-5 :model="notification.model" @record="geekoSensor" v-if="notification.model.type == '5'"/>
            <model-6 :model="notification.model" @record="geekoSensor" v-if="notification.model.type == '6'"/>
        </div>

        <div class="el-eachmodel" v-if="notification.type=='9'" style="margin-bottom: 15px;">
            <model-1-ticket :model="notification.model" 
                            :isRead="notification.read" 
                            :sendTime="sendTime"
                            @record="geekoSensor"
                            v-if="notification.model.type == '3'"/>
        </div>

    </div>
</template>

<style scoped lang="scss">
    .el-notification-send-time{
        height: 22px;
        text-align: center;
        margin:0px auto 12px;
        width:130px;
        background-color: rgba(0, 0, 0, 0.1);
        font-size: 12px;
        color: #f5f5f5;
        line-height: 22px;
        border-radius: 4px;
    }

    .el-notification{
        background-color: #f5f5f5;
        // padding-top: 15px;

        .el-eachmodel{
            padding: 15px 10px;
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
        &.top{
            padding-top: 15px;
        }
    }
</style>

<script type="text/ecmascript-6">

    import Model1 from './model1.vue'
    import Model1Ticket from './model1-ticket.vue'
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
                return fecha.format(new Date(this.notification.sendTime), 'mediumDate')
            }
        },
        components: {
            'model-1': Model1,
            'model-2': Model2,
            'model-3': Model3,
            'model-4': Model4,
            'model-5': Model5,
            'model-6': Model6,
            'model-1-ticket': Model1Ticket
        },
        methods:{
            geekoSensor(utmTerm){
                // alert(JSON.stringify({
                //         type: '消息中心',
                //         action:"click",
                //         message_id:utmTerm
                //     }))
                if(window.GeekoSensors){
                    window.GeekoSensors.Track('StationMsg', {
                        type: '消息中心',
                        action:"click",
                        message_id:utmTerm
                    })
                }
            }
        }
    }
</script>