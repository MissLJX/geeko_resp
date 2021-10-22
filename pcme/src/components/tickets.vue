<template>
    <div class="tickets">
        <p class="t-hd">Any questions or concerns? Chat with us now!</p>
        <div class="ticket-table">
            <table>
                <tr>
                    <td>{{$t('ticketid')}}</td>
                    <td>{{$t('lastmsg')}}</td>
                    <td>{{$t('created')}}</td>
                    <td>{{$t('status')}}</td>
                </tr>
            </table>
            <div class="ticket-data">
                <table>
                    <tr v-if="!tickets">{{$t('nomoredata')}}</tr>
                    <tr v-for="ticket in tickets" v-if="ticket.type != 3">
                        <td @click="showTicket(ticket.operaId)"><a>{{ticket.id}}</a></td>
                        <td>{{getlastmsg(ticket.ticketReplies)}}</td>
                        <td>{{getDate(ticket.openDate)}}</td>
                        <td :class="{'noreply':ticket.state===1,'reply':ticket.state===2}">{{getStatus(ticket.state)}}</td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="v-btn" @click="subTicket">{{$t('submitticket')}}</div>

        <select-order v-if="isShowSelect" v-on:closeSelect="closeSelect1" v-on:showTicket="showTicket"></select-order>
        <order-ticket  v-if="isShowTicket" v-on:closeSelect="closeSelect1" v-on:selectOrder="selectorder" :ticket="selectedTicket"></order-ticket>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import * as utils from '../utils/geekoutil';
    import selectOrder from './select-order.vue';
    import orderTicket from './order-ticket.vue'

    export default {
        data(){
          return{
              isShowSelect: false,
              isShowTicket:false,
              selectedTicket:null,
              showHelp:false
          }
        },
        components:{
            'select-order':selectOrder,
            'order-ticket':orderTicket
        },
        computed: {
            ...mapGetters(['tickets']),
        },
        methods: {
            getDate(time){
                if(time == null){
                    return ''
                }
                return utils.enTime(new Date(time))
            },
            subTicket(){
                this.isShowSelect = true
            },
            closeSelect1(){
                this.isShowSelect = false
                this.isShowTicket = false
            },
            showTicket:function(data){
                this.isShowSelect = false
                this.$store.dispatch('getTicket',data).then(()=>{
                    this.isShowTicket = true;
                })
            },
            getStatus(ticketstatus){
                switch (ticketstatus) {
                    case 1:
                        return 'No reply'
                    case 2:
                        return 'Replied'
                    case 3:
                        return 'Resolved'
                }
            },
            getlastmsg(replies){
                if(replies){
                    if(replies[replies.length-1].message === '-'){
                        return '[image]'
                    }else{
                        return replies[replies.length-1].message
                    }
                }
            },
            selectorder:function(){
                this.isShowSelect = true;
                this.isShowTicket = false;
            }
        },
        created(){
            this.$store.dispatch('getTickets',0,0)
        }
    }
</script>

<style scoped lang="scss">
    .noreply{
        color: #ff7700 !important;
    }
    .reply{
        color: #208d00 !important;
    }
    .tickets{
        width: 100%;
        text-align: center;
        .t-hd{
            font-size: 16px;
            color: #222;
            font-weight: bold;
            margin-bottom: 40px;
        }
        .online-help{
            width: 240px;
            height: 40px;
            background-color: #2c2c2c;
            border-radius: 2px;
            text-align: center;
            line-height: 40px;
            margin: 26px auto 38px auto;
            color: #fff;
            cursor: pointer;
        }
        .ticket-table{
            width: 100%;
            border: 1px solid #e6e6e6;
            margin-bottom: 30px;
            .ticket-data{
                max-height: 390px;
                overflow-y: auto;
                table{
                    tr{
                        border-bottom: none;
                    }
                }
            }
            table{
                tr{
                    border-bottom: 1px solid #e6e6e6;
                    line-height: 40px !important;
                    td{
                        color: #999;
                    }
                }
                tr{
                    line-height: 30px;
                    text-align: left;
                    td{
                        text-overflow:ellipsis;
                        overflow:hidden;
                        white-space: nowrap;
                        max-width: 300px;
                        padding-right: 49px;
                    }
                    td:first-child{
                        padding-left: 37px;
                        width: 320px;
                    }
                    td:nth-of-type(2){
                        width: 300px;
                    }
                    td:nth-of-type(3){
                        width: 155px;
                    }
                    td:last-child{
                        text-align: center;
                    }
                }
                td{
                    a{
                        text-decoration: underline;
                        cursor: pointer;
                    }
                }
                width: 100%;
            }
        }
        .v-btn{
            margin: 0 auto 20px auto;
            width: 180px;
            height: 34px;
            background-color: #2c2c2c;
            border-radius: 2px;
            text-align: center;
            line-height: 34px;
            color: white;
            cursor: pointer;
            font-weight: normal;
        }
    }
</style>