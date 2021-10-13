<template>
    <div class="tickets">
        <!-- <p class="t-hd">Any questions or concerns? Chat with us now!</p> -->
        <div class="ticketsHeader">
            <div class="headerText">Tickets</div>
            <div class="statusSelect">
                <div class="statusTxt">status</div>
                <!-- <geeko-select @change="changeHandle" :items="tabList"/> -->
                <faq-select class="faqSelect" :selectValue="selectType" :selectList="tabList" @selectChange="selectChange($event)"></faq-select>
            </div>
        </div>
        <div class="ticket-table">
            <table>
                <tr>
                    <td class="_th">{{$t('ticketid')}}</td>
                    <td class="_th">{{$t('lastmsg')}}</td>
                    <td class="_th">{{$t('created')}}</td>
                    <td class="_th">{{$t('status')}}</td>
                </tr>
            </table>
            <div class="ticket-data">
                <table>
                    <tr v-if="!tickets">{{$t('nomoredata')}}</tr>
                    <template  >
                        <tr v-for="(ticket, index) in tickets" v-if="ticket.type != 3" :key="index">
                            <td @click="showTicket(ticket.operaId)"><span>{{ticket.id}}</span></td>
                            <td>{{getlastmsg(ticket.ticketReplies)}}</td>
                            <td>{{getDate(ticket.openDate)}}</td>
                            <td :class="{'resolved':ticket.state==0,'waiting':ticket.state===1,'replied':ticket.state===2}">{{getStatus(ticket.state)}}</td>
                        </tr>
                    </template>
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
    import * as utils from '../../utils/geekoutil';
    import selectOrder from '../../components/faq/faq-select-order.vue';
    import orderTicket from '../../components/faq/faq-order-ticket.vue';
    import faqSelect from '../../components/faq/faq-select.vue';

    export default {
        data(){
          return{
              isShowSelect: false,
              isShowTicket:false,
              selectedTicket:null,
              showHelp:false,
              tabList: [
                    {
                        label: 'All',
                        value: '-1',
                    },
                    {
                        label: 'Resolved',
                        value: '0',
                    },
                    {
                        label: 'Wating for Replied',
                        value: '1',
                    },
                    {
                        label: 'Replied',
                        value: '2',
                    }
              ],
              selectType: '-1'

          }
        },
        components:{
            'select-order':selectOrder,
            'order-ticket':orderTicket,
            'faq-select': faqSelect
        },
        computed: {
            ...mapGetters(['tickets']),
        },
        methods: {
            selectChange(e){
                // console.log(e)
                let item = this.tabList.find(t => t.value == e.value)
                this.selectType = item.value
            },
            changeHandle(evt) {
                var tab = evt.target.value;
                // this.changeList(tab);
            },
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
                        return 'Wating for Replied'
                    case 2:
                        return 'Replied'
                    case 0:
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
            this.$store.dispatch('getTickets',0)
        }
    }
</script>

<style scoped lang="scss">
    .resolved{
        color: #999 !important;
    }
    .replied{
        color: #57b936 !important;
    }
    .waiting{
        color: #f9a646 !important;
    }
    .tickets{
        width: 1200px;
        margin: 0 auto;
        text-align: center;

        .ticketsHeader{
            width: 100%;
            margin-top: 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 32px;
            margin-bottom: 18px;

            .headerText{
                font-family: SlatePro-Medium;
                font-size: 20px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #222222;
            }

            .statusSelect{
                display: flex;
                align-items: center;
                font-family: Roboto-Regular;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #000000;
                text-transform: capitalize;

                .faqSelect{
                    width: 240px;
                    height: 36px;
                    margin-left: 10px;
                    text-align: center;
                    // border: solid 1px #cacaca;
                }
            }
        }

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
        .v-btn{
            margin: 20px auto 20px auto;
            width: 200px;
            height: 42px;
            background-color: #222222;
            text-align: center;
            line-height: 42px;
            font-family: SlatePro-Medium;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #ffffff;
            cursor: pointer;
        }
    }
</style>