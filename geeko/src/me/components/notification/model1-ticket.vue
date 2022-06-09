<template>
    <!-- <a :href="url">
        <div class="st-table">
            <div class="st-cell el-model-1-image st-v-t" :class="{'deep1': isSqure}">
                <img :src="imageUrl">
            </div>
            <div class="st-cell el-model-1-content st-v-t" v-html="model.content"></div>
        </div>
    </a> -->
    <a :href="url" @click="(e) => geekoSensor(e)">
        <div class="ticket_notification_item">
            <div class="ticket_notification_item_header">
                <div class="ticket_notification_item_id">
                    <span style="margn-right: 10px;">{{$t("notification.ticketid")}}</span>    
                    <span>{{model.targetId}}</span>
                </div>
                <div class="ticket_notification_item_time" >
                    <span class="no-read" v-if="!isRead"></span>
                    <span class="send-time">{{sendTime}}</span>
                </div>
            </div>
            <div class="ticket_notification_item_content" v-html="model.content">

            </div>
        </div>
    </a>
</template>

<style scoped lang="scss">
    .el-model-1-image {
        width: 60px;
        img {
            display: block;
            width: 100%;
        }

        &.deep1 {
            width: 40px;
        }
    }

    .el-model-1-content {
        padding-left: 10px;
        font-size: 13px;
        line-height: 18px;
    }
    .no-read{
        display: block;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: #e64545;
    }
    .ticket_notification_item{
        width: 100%;
        /* min-height: 107px; */
        background-color: #ffffff;
        margin-bottom: 10px;
        // padding: 17px;
        padding: 2px 7px;
    }
    .ticket_notification_item_header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 14px;
        
    }
    .ticket_notification_item_id{
        font-family: Roboto-Regular;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #222222;
        line-height: 14px;
    }
    .ticket_notification_item_time{
        font-family: Roboto-Regular;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #999999;
        line-height: 14px;
        display: flex;
        align-items: center;
    }
    .send-time{
        margin-left: 5px;
    }
    .ticket_notification_item_content{
        font-family: Roboto-Regular;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 18px;
        letter-spacing: 0px;
        color: #999999;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
        overflow: hidden;
    }

</style>

<script type="text/ecmascript-6">
    import _ from 'lodash'
    import deeplinkmixin from '../../mixins/deeplink'
    import imageUrlmixin from '../../mixins/imageUrl'

    export default{
        props: {
            model: {
                type: Object,
                required: true
            },
            isRead: {
                type: Boolean,
                default: false
            },
            sendTime: {
                type: String,
                default: true
            }
        },
        mixins: [deeplinkmixin, imageUrlmixin],
        computed: {
            isSqure(){
                return false
            },
            utmTerm(){
                if(this.model.deepLink && this.model.deepLink.utmTerm){
                    return this.model.deepLink.utmTerm
                }
                return 'utmTerm 未返回'
            },
        },
        methods:{
            geekoSensor(e){
                // e.preventDefault()
                this.$emit("record", this.utmTerm)
            }
        }
    }
</script>