<template>
    <div class="notification-body">
        <!-- <notification-list @listing="listingHandle" :loading="loading" :finished="finished"
                           :notifications="notifications"/>
         <notification-empty v-if="empty"></notification-empty> -->

        <div class="notification_header">{{$t("notification.ticket")}}</div> 
        <div class="ticket-table">
            <table>
                <tr>
                    <td class="_th">{{$t('ticketid')}}</td>
                    <td class="_th">{{$t('lastmsg')}}</td>
                    <td class="_th">{{$t('created')}}</td>
                </tr>
            </table>
            <div class="ticket-data" ref="scrollBox">
                <table>
                    <tr v-if="!notifications">{{$t('nomoredata')}}</tr>
                    <template  >
                        <tr v-for="(ticket, index) in notifications" :key="index">
                            <td @click="showTicket(ticket.model.targetId)"><span>{{ticket.model.targetId}}</span></td>
                            <td>{{ticket.model.content}}</td>
                            <td>{{getDate(ticket.sendTime)}}</td>
                        </tr>
                    </template>
                </table>
            </div>
        </div>

        <transition name="orderTicket">
            <order-ticket v-if="isShowTicket"
                          v-on:closeSelect="closeSelect1" 
                          v-on:selectOrder="selectorder" 
                          :ticket="selectedTicket"
                          :fromOrder="fromOrder"
                          ></order-ticket>
        </transition>
    </div>
</template>

<style scoped lang="scss">
    .notification-body {
        background-color: #fff;
        padding-top: 12px;
    }

    .notification_header{
        width: 100%;
        text-align: center;
        font-family: Roboto-Medium;
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #222222;
        text-transform: capitalize;
        margin: 20px 0;
    }
    
    .ticket-table{
        width: 100%;
        border: 1px solid #e6e6e6;
        margin-bottom: 30px;
        // background-color: #fff;
        .ticket-data{
            max-height: 560px;
            overflow-y: auto;
            font-family: SlatePro-Regular;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #222222;
            position: relative;

            td{
                padding: 0 5px;
            } 

            &::-webkit-scrollbar{
                // display: none;
                position: absolute;
                right: 0;
                top: 0;
                width: 4px;
            }
            &::-webkit-scrollbar-thumb{
                width: 4px;
                background-color: #e6e6e6; 
            }

        }
        table{
            tr{
                border-bottom: 1px solid #e6e6e6;
                line-height: 56px !important;
                

                ._th{
                    background-color: #f6f6f6;
                    border: solid 1px #e6e6e6;
                    font-family: SlatePro-Medium;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #000000;
                    padding: 0 5px;
                }
                ._th:not(:first-child){
                    border-left: none;
                }
                ._th:not(:last-child){
                    border-right: none;
                }
            }
            tr{
                line-height: 30px;
                text-align: center;
                td{
                    text-overflow:ellipsis;
                    overflow:hidden;
                    white-space: nowrap;
                    max-width: 300px;
                    // padding-right: 49px;
                }
                td:first-child{
                    // padding-left: 37px;
                    width: 20%;
                }
                td:nth-of-type(2){
                    width: 40%;
                }
                td:nth-of-type(3){
                    width: 15%;
                }
                td:last-child{
                    width: 25%;
                }
            }
            td{
                span:hover{
                    text-decoration: underline;
                    color: #666;
                    cursor: pointer;
                }
            }
            width: 100%;
        }
    }
</style>

<script type="text/ecmascript-6">
    import NotificationList from './notification-list.vue'
    import NotificationEmpty from './motification-empty.vue'
    import orderTicket from '../../components/faq/faq-order-ticket.vue';
    import * as utils from '../../utils/geekoutil';
    export default{
        data(){
            return {
                loading: false,
                isShowSelect: false,
                isShowTicket: false,
                selectedTicket: null,
                fromOrder: false, // 从order跳转过来
            }
        },
        computed: {
            notifications(){
                return this.$store.getters['ticketNotifications']
            },
            skip(){
                return this.$store.getters['ticketNtSkip']
            },
            loaded(){
                return this.$store.getters['ticketNtLoaded']
            },
            empty(){
                return this.loaded && (!this.notifications || !this.notifications.length)
            },
            finished(){
                return this.$store.getters['ticketNtFinished']
            },
        },
        methods: {
            listingHandle(){
                this.loading = true
                this.$store.dispatch("getTicketNotifications", {skip: this.skip}).then(() => {
                    this.loading = false
                    this.$store.dispatch("getTicketNtSkip")
                })
            },
            showTicket(data){
                this.isShowSelect = false
                this.$store.dispatch('clearTicket')
                if(this.testString(data)){
                    this.$store.dispatch('getTicket',data).then(()=>{
                        this.isShowTicket = true;
                    })
                } else {
                    this.$store.dispatch('getTicketByTicketId',data).then(()=>{
                        this.isShowTicket = true;
                    })
                }
            },
            testString(str){
                let arr = str.split("")
                if(arr.length < 26){
                    return true
                } else {
                    return false
                }
            },
            getDate(time){
                if(time == null){
                    return ''
                }
                return utils.enTime(new Date(time))
            },
            closeSelect1(){
                this.isShowSelect = false
                this.isShowTicket = false
            },
            selectorder(){
                this.isShowSelect = true;
                this.isShowTicket = false;
            },
        },
        components: {
            'notification-list': NotificationList,
            'notification-empty': NotificationEmpty,
            'order-ticket':orderTicket
        },
        created(){
            if ((!this.notifications || !this.notifications.length) && !this.finished)
                this.listingHandle()
        }
    }
</script>