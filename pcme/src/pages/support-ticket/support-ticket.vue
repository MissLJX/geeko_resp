<template>
    <div class="tickets">
        <!-- <p class="t-hd">Any questions or concerns? Chat with us now!</p> -->
        <div class="ticketsHeader">
            <div class="headerText">{{$t("support.s_tickets")}}</div>
            <div class="statusSelect">
                <div class="statusTxt">{{$t("status")}}</div>
                <!-- <geeko-select @change="changeHandle" :items="tabList"/> -->
                <faq-select class="faqSelect" 
                            :selectValue="selectType" 
                            :selectList="tabList" 
                            @selectChange="selectChange($event)"
                            :placeholder="tabList[0]['label']"
                            ></faq-select>
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
            <div class="ticket-data" ref="scrollBox">
                <table>
                    <tr v-if="!tickets">{{$t('nomoredata')}}</tr>
                    <template  >
                        <tr v-for="(ticket, index) in ticketList" :key="index">
                            <td @click="showTicket(ticket.id)"><span>{{ticket.id}}</span></td>
                            <td>{{getlastmsg(ticket.ticketReplies)}}</td>
                            <td>{{getDate(ticket.openDate)}}</td>
                            <td :class="{
                                'statusTr':true,
                                'resolved':ticket.state==3,
                                'waiting':ticket.state===1,
                                'replied':ticket.state===2,
                                'apply':ticket.state===0
                                }">
                                <span :class="{
                                    'statusCircle': true, 
                                    'resolvedC':ticket.state==3,
                                    'waitingC':ticket.state===1,
                                    'repliedC':ticket.state===2,
                                    'applyC':ticket.state===0,
                                    }"></span>
                                {{getStatus(ticket.state)}}
                            </td>
                        </tr>
                    </template>
                </table>
            </div>
        </div>

        <div class="v-btn" @click="subTicket">{{$t('submitticket')}}</div>

        <transition name="selectOrder">
            <select-order v-if="isShowSelect" 
                      v-on:closeSelect="closeSelect1" 
                      v-on:showTicket="showTicket"></select-order>
        </transition>

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

<script>
    import {mapGetters, mapActions} from 'vuex';
    import * as utils from '../../utils/geekoutil';
    import selectOrder from '../../components/faq/faq-select-order.vue';
    import orderTicket from '../../components/faq/faq-order-ticket.vue';
    import faqSelect from '../../components/faq/faq-select.vue';

    let urlIdShowed = false;
    export default {
        data(){
          return{
              isShowSelect: false,
              isShowTicket:false,
              selectedTicket:null,
              showHelp:false,
              tabList: [
                    {
                        label: this.$t("support.s_all_c"),
                        value: '9',
                    },
                    {
                        label: this.$t("support.s_wating_for_apply"),
                        value: '0',
                    },
                    {
                        label: this.$t("support.s_wating_for_replied"),
                        value: '1',
                    },
                    {
                        label: this.$t("support.s_replied"),
                        value: '2',
                    },
                    {
                        label: this.$t("support.s_resolved"),
                        value: '3',
                    },
              ],
              selectType: '9',
              page: 1,
              listDefault: [],
              fromOrder: false, // 从order跳转过来
          }
        },
        components:{
            'select-order': selectOrder,
            'order-ticket': orderTicket,
            'faq-select': faqSelect
        },
        computed: {
            ...mapGetters(['tickets']),
            ticketList(){
                if(this.tickets.length > 0){
                    // console.log(this.tickets,this.listDefault)
                    this.listDefault = this.listDefault.concat(this.tickets)
                    this.listDefault = this.listDefault.map(l => {
                        if(l.type != 3){
                            return l
                        }
                    })
                    return this.listDefault
                }
                return this.listDefault
            }
        },

        watch:{
            // tickets:function(newV, oldV){
            //     if(newV.length > 0){
            //         console.log(newV,this.listDefault)
            //         this.listDefault = this.listDefault.concat(newV)
            //         // return this.listDefault.concat(newV)
            //     }
            //     // return this.listDefault
            // }
        },
        methods: {
            selectChange(e){
                let item = this.tabList.find(t => t.value == e.value)
                this.selectType = item?.value || '0'
                this.listDefault = []
                this.$store.dispatch('clearTickets', 0)
                this.page = 1
                this.$store.dispatch('getTickets', {skip:0, state: this.selectType})
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
            showTicketByCode(code){
                this.isShowSelect = false
                this.$store.dispatch('clearTicket')
                this.$store.dispatch('getTicketByCode',code).then(()=>{
                    this.isShowTicket = true;
                })
            },
            getStatus(ticketstatus){
                switch (ticketstatus) {
                    case 1:
                        return this.$t("support.s_wating_for_replied")
                    case 2:
                        return this.$t("support.s_replied")
                    case 3:
                        return this.$t("support.s_resolved")
                    default:
                        return this.$t("support.s_wating_for_apply")
                }
            },
            getlastmsg(replies){
                if(replies){
                    // console.log(replies[replies.length-1])
                    if(replies?.[replies?.length-1]?.message === '-'){
                        return '[image]'
                    }else{
                        return replies?.[replies?.length-1]?.message || '-'
                    }
                } else {
                    return '-'
                }
            },
            selectorder:function(){
                this.isShowSelect = true;
                this.isShowTicket = false;
            },
            boxScroll(e){
                let scrollWay = this.$refs.scrollBox.scrollTop;
                // console.log(e.target.offsetTop + this.$refs.scrollBox.scrollTop)
                if((scrollWay + 100) > ( 580 * 2 * this.page - 580)){
                    this.$store.dispatch('getTickets',  {skip:(this.page)*20,state:this.selectType})
                    this.page += 1
                }
            }
        },
        created(){
            this.$store.dispatch('getTickets', {skip:0,state:9})
        },
        mounted(){
            // console.log(this.$route)
            // console.log(this.$router.currentRoute.query?.id && !urlIdShowed)
            if(this.$route.params?.id && !urlIdShowed){
                localStorage.removeItem("_code")
                localStorage._orderId = this.$route.params?.id
                this.showTicket(localStorage._orderId)
            }
            if((this.$router.currentRoute.query?.id) && !urlIdShowed){
                localStorage.removeItem("_code")
                localStorage._orderId = this.$router.currentRoute.query?.id
                this.showTicket(localStorage._orderId)
            }
            if(this.$router.currentRoute.query?.code && !urlIdShowed){
                localStorage.removeItem("_orderId")
                localStorage._code = this.$router.currentRoute.query?.code
                this.showTicketByCode(localStorage._code)
            }
            // console.log(this.$refs.scrollBox)
            let scrollBox = this.$refs.scrollBox;
            scrollBox.addEventListener("scroll", (e)=>this.boxScroll(e), true)
        },
        beforeDestroy(){
            let scrollBox = this.$refs.scrollBox;
            scrollBox.removeEventListener("scroll", (e)=>this.boxScroll(e), true)
        }
    }
</script>

<style scoped lang="scss">
    .statusCircle{
        display: inline-block;
        width: 8px;
        height: 8px;
        margin-right: 8px;
        border-radius: 50%;
    }
    .resolvedC{
        background-color: #999 !important;
    }
    .repliedC{
        background-color: #57b936 !important;
    }
    .applyC{
        background-color: #E64646 !important;
    }
    .waitingC{
        background-color: #f9a646 !important;
    }
    .resolved{
        color: #999 !important;
    }
    .replied{
        color: #57b936 !important;
    }
    .waiting{
        color: #f9a646 !important;
    }
    .apply{
        color: #E64646 !important;
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
                text-transform: capitalize;
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

        .selectOrder-enter-active, 
        .selectOrder-leave-active,
        .orderTicket-enter-active, 
        .orderTicket-leave-active{
            transition: all 0.5s ease;
        }
        .selectOrder-enter, 
        .selectOrder-leave-to,
        .orderTicket-enter, 
        .orderTicket-leave-to{
            opacity: 0;
            right: -500px;
        }

    }
</style>