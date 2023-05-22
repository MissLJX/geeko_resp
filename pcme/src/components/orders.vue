<template>
    <div>
        <div class="toHistoryOrderList" v-if="!showHistory">
            <a @click="showHistoryMethod()">{{$t("click_to_check_history")}} ></a> 
        </div>
        <div class="backToOrder" v-if="showHistory">
            <span class="backIcon" @click="hideHistoryMethod()">{{'< '+$t("back")}}</span>
            <span>{{$t("history_orders")}}</span>
        </div>
        <!-- {{orderStatus}} -->
        <div class="hd" v-if="!showHistory">
            <div class="el-tbl">
                <div class="el-tbl-cell" @click="clearSkip(0,'all','click', 0)" :class="{active:0===orderStatus}">
                    {{$t('all')}}<span>{{orderCountAll}}</span>
                </div>
                <div class="el-tbl-cell" @click="clearSkip(1,'Unpaid','click', 0)" :class="{active:1===orderStatus}">
                    {{$t('unpaid')}}<span>{{orderCountUnpaid}}</span>
                </div>
                <!-- <div class="el-tbl-cell" @click="clearSkip(getData(2,'Paid','click'))" :class="{active:2===orderStatus}">
                    {{$t('paid')}}<span>{{orderCountPaid}}</span>
                </div> -->
                <div class="el-tbl-cell" @click="clearSkip(3,'Processing','click', 0)" :class="{active:3===orderStatus}">
                    {{$t('processing')}}<span>{{orderCountProcessing}}</span>
                </div>
                <div class="el-tbl-cell" @click="clearSkip(4,'Shipped','click', 0)" :class="{active:4===orderStatus}">
                    {{$t('ordershipped')}}<span>{{orderCountShipped}}</span>
                </div>
                <div class="el-tbl-cell" @click="clearSkip(5,'Comfirmed','click', 0)" :class="{active:5===orderStatus}">
                    {{$t('orderconfirm')}}<span>{{orderCountReceipt}}</span>
                </div>
                <div class="el-tbl-cell" @click="clearSkip(6,'Canceled','click', 0)" :class="{active:6===orderStatus}">
                    {{$t('cancelorder1')}}<span>{{orderCountCanceled}}</span>
                </div>
                <div class="el-tbl-cell" @click="clearSkip(7,'Returns','click', 0)" :class="{active:7===orderStatus}">
                    {{$t('index.returns')}}<span>{{orderCountReturns}}</span>
                    <!-- orderCountReturns -->
                </div>
            </div>
        </div>
        <div class="bd">
            <div :class="{'item-order orders-hd':true,'noMarginTop':showHistory}">
                <div class="i-bd">
                    <div class="tbl">
                        <div class="tbl-cell" style="width:523px">{{$t('item')}}(s)</div>
                        <div class="tbl-cell v-m w-180 tx-c">{{$t('orderstatus')}}</div>
                        <div class="tbl-cell v-m w-190 tx-c">{{$t('action')}}</div>
                    </div>
                </div>
            </div>
            <div v-for="item in orderMethod" class="item-order">
                <div class="i-hd">
                    <div class="tbl">
                        <div class="tbl-cell tx-c">{{getDate(item.paymentTime || item.createDate)}}</div>
                        <div class="tbl-cell tx-c" v-if="!item.returnOrderItems"><span>{{$t('orderno')}}:</span>{{item.id}}</div>
                        <div class="tbl-cell tx-c"><span>{{$t('shippingfrom')}}:</span>{{$t('overseas')}}</div>
                        <div class="tbl-cell tx-c"><i class="iconfont contactseller" >&#xe716;</i><a class="cur-p" @click="showTicket(item.orderId ? item.orderId : item.id ? item.id:'')">{{$t('contactseller')}}</a></div>
                    </div>
                </div>
                <div class="i-bd">
                    <div class="tbl">
                        <div class="tbl-cell w-523">
                            <div class="proimg" v-if="(item.orderItems || item.returnOrderItems) && index < 4" v-for="(img,index) in (item.orderItems || item.returnOrderItems)">
                                <link-image :href="productUrl(img)" :src="img.productImageUrl" :title="img.productName"/>
                            </div>
                            <div v-if="(item.orderItems && item.orderItems.length > 4) || (item.returnOrderItems && item.returnOrderItems.length > 4)" class="viewmore" @click="toDetail(item, item.returnOrderItems)">
                                <div class="bg"></div>
                                <p>{{$t("view_detail")}}</p>
                            </div>
                        </div>
                        <div class="tbl-cell v-m w-180 tx-c">
                            <p>{{item.fulfillmentStatusView || status(item)}}</p>
                            <p class="detail cur-p" @click="toDetail(item, item.returnOrderItems)">{{$t('detail')}}</p>
                            <p class="detail cur-p" v-if="item.fulfillmentStatus !== constant.TOTAL_STATUS_UNPAID && !item.returnOrderItems"  @click="checkLogistics(item.id)">{{$t('track')}}</p>
                        </div>
                        <div class="tbl-cell v-m w-190 tx-c">
                            <div class="pos-rel">
                                <a class="r-btn" :href="getPayUrl(item)" target="_blank" v-if="getPayUrl(item) && item.fulfillmentStatus === constant.TOTAL_STATUS_UNPAID">{{getBtnText(item)}}</a>
                                <!-- <div class="offTip" v-if="orderoffset(item) >= 0 && getBtnText(item)==='Imprimir boleto' && item.fulfillmentStatus === constant.TOTAL_STATUS_UNPAID && getPayUrl(item)">
                                    <div class="triangle"></div>
                                    <span class="label">Presente de cupão expirs</span>
                                    <count-down :timeStyle="{color:'#fff'}" :timeLeft="orderoffset(item)"></count-down>
                                </div>
                                <div class="offTip" v-if="orderoffset(item) >= 0 && (getBtnText(item)==='Generar Ticket' || getBtnText(item)==='Gerar Ticket') && item.fulfillmentStatus === constant.TOTAL_STATUS_UNPAID && getPayUrl(item)">
                                    <div class="triangle"></div>
                                    <span class="label" >Tiempo restante para realizar el pago</span>
                                    <count-down :timeStyle="{color:'#fff'}" :timeLeft="orderoffset(item)"></count-down>
                                </div> -->
                                <div class="offTip" v-if="getPayUrl(item) && orderoffset(item) >= 0 && item.fulfillmentStatus === constant.TOTAL_STATUS_UNPAID">
                                    <div class="triangle"></div>
                                    <span class="label">{{$t("remaining")}}:</span>
                                    <count-down :timeStyle="{color:'#fff'}" :timeLeft="orderoffset(item)"></count-down>
                                </div>
                            </div>
                            <!--线上其他支付按钮+倒计时-->
                            <div class="pos-rel">
                                <a class="b-btn" @click="()=>checkDetail(item)"  v-if="item.id && item.fulfillmentStatus===constant.TOTAL_STATUS_UNPAID && !item.mercadopagoPayURL && !item.boletoPayCodeURL && !item.payCodeUrl && orderoffset(item) >= 0">{{$t("paynow")}}</a>
                                <div class="offTip" v-if="item.id && item.fulfillmentStatus===constant.TOTAL_STATUS_UNPAID && !item.mercadopagoPayURL && !item.boletoPayCodeURL && !item.payCodeUrl && orderoffset(item) >= 0">
                                    <div class="triangle"></div>
                                    <span class="label">{{$t("remaining")}}:</span>
                                    <count-down :timeStyle="{color:'#fff'}" :timeLeft="orderoffset(item)"></count-down>
                                </div>
                            </div>
                            <!-- 重新加入购物车  -->
                            <div class="b-btn" @click="addProducts(item.orderItems)" v-if="item.id && item.fulfillmentStatus===constant.TOTAL_STATUS_CANCELED">{{$t("repurchase")}}</div>
                            <!-- 退货按钮 -->
                            <div class="b-btn" 
                                 @click="cancelReturnProducts(item)" 
                                 v-if="item.id && item.returnOrderItems && item.status===constant.ORDER_RETURN_REQUESTED">
                                 {{$t("cancel_return")}}
                            </div>
                            <div class="b-btn" 
                                 style="margin-top:10px;"
                                 @click="returnProducts(item)" 
                                 v-if="item.id && item.returnOrderItems && item.status===constant.ORDER_RETURN_REQUESTED">
                                 {{returnReceiptFont(item)}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="!isloded" class="el-list-loading"><i class="iconfont">&#xe69f;</i></div>
            <div class="el-no-more" v-show="ifDone">{{$t('nomoredata')}}</div>
        </div>

        <!-- <select-order v-if="isShowSelect" v-on:closeSelect="closeSelect1" v-on:showTicket="showTicket"></select-order>
        <order-ticket  v-if="isShowTicket" v-on:closeSelect="closeSelect1" v-on:selectOrder="selectorder"></order-ticket> -->

        <faq-select-order v-if="isShowSelect" v-on:closeSelect="closeSelect1" v-on:showTicket="showTicket"></faq-select-order>
        <faq-order-ticket  v-if="isShowTicket" v-on:closeSelect="closeSelect1" v-on:selectOrder="selectorder"></faq-order-ticket>
        <return-logistics 
            v-if="isShowReturn" 
            :orderId="showReturnOrderId" 
            @logisticsShow="logisticsShow" 
            :loddingShow.sync="isReturnLoading"
        >
        </return-logistics>

        <transition name="fade">
            <div v-if="isAddProducts" class="addProductsMask">{{isAddProductstTip}}</div>
        </transition>

        <!--  -->
        <div class="confirm-mask" v-if="modalconfirmshow">
            <modal-confirm :cfg="confirmCfg" />
        </div>
        

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import * as utils from '../utils/geekoutil';
    import * as constant from "../utils/constant.js"
    import LinkImage from './link-image.vue';
    import orderTicket from './order-ticket.vue';
    import selectOrder from './select-order.vue';
    import CountDown from './countdow.vue';
    import FaqSelectOrder from './faq/faq-select-order.vue';
    import FaqOrderTicket from './faq/faq-order-ticket.vue';
    import ReturnLogistics from './return-logistics.vue';
    import {cancelReturnOrder} from '../api/index';
    import ModalConfirm from './modal-confirm.vue';
    
    export default {
        data (){
            return{
                index:0,
                orderMethod:null,
                isShowTicket:false,
                isShowSelect:false,
                isShowReturn: false,
                method:'all',
                isloded:false,
                finished:false,
                isAddProducts:false,
                isAddProductstTip:'',
                constant:constant,
                showHistory:false,
                showReturnOrder: null,
                showReturnOrderId: '',
                isReturnLoading: false,
                modalconfirmshow: false,
            }
        },
        components: {
            'link-image': LinkImage,
            'order-ticket':orderTicket,
            'select-order':selectOrder,
            'count-down': CountDown,
            'faq-select-order':FaqSelectOrder,
            'faq-order-ticket':FaqOrderTicket,
            'return-logistics':ReturnLogistics,
            'modal-confirm':ModalConfirm
        },
        computed: {
            ...mapGetters([
                'orderCountUnpaid',
                // 'orderCountPaid',
                'orderCountProcessing',
                'orderCountShipped',
                'orderCountReceipt',
                'orderCountCanceled',
                'orderCountAll',
                'orderCountReturns',
                'all',
                'unpaid',
                'paid',
                'processing',
                'shipped',
                'confirmed',
                'canceled',
                'history',
                'returns',
                'allLoading',
                'processingLoading',
                'confirmedLoading',
                'canceledLoading',
                'shippedLoading',
                'unpaidLoading',
                'paidLoading',
                'historyLoding',
                'returnsLoading',
                'allDone',
                'unpaidDone',
                'paidDone',
                'processingDone',
                'confirmedDone',
                'canceledDone',
                'shippedDone',
                'historyDone',
                'returnsDone',
                "orderStatus",
                'showTip',
                'tipContent',
                'tipType',
            ]),
            ifDone(){
                if(this.method==='all'){
                    return this.allDone
                }
                if(this.method==='Unpaid'){
                    return this.unpaidDone
                }
                if(this.method==='Paid'){
                    return this.paidDone
                }
                if(this.method==='Processing'){
                    return this.processingDone
                }
                if(this.method==='Comfirmed'){
                    return this.confirmedDone
                }
                if(this.method==='Canceled'){
                    return this.canceledDone
                }
                if(this.method==='Shipped'){
                    return this.shippedDone
                }
                if(this.method==='History'){
                    return this.historyDone
                }
                if(this.method==='Returns'){
                    return this.returnsDone
                }
            },
            
        },
        watch:{
            orderStatus(newStatus){
                if(newStatus !== 0){
                    this.showHistory = false
                }
                let orderName =  this.getOrderStatusName(this.orderStatus);
                this.clearSkip(
                    newStatus,orderName,"click",0
                )
            },
        },
        created(){
            this.$store.dispatch('getOrderCountAll');
            this.$store.dispatch('getOrderCountProcessing');
            this.$store.dispatch('getOrderCountShipped');
            this.$store.dispatch('getOrderCountReceipt');
            this.$store.dispatch('getOrderCountCanceled');
            this.$store.dispatch('getOrderCountUnpaid');
            this.$store.dispatch('getOrderCountReturn');
            // this.$store.dispatch('getOrderCountPaid');

            let orderName =  this.getOrderStatusName(this.orderStatus);
            // this.loadAll(20).then(()=> {
            //     this.orderMethod = this.all
            //     this.isloded = true
            // })
            this.isloded = true
            if(this.$route.query && this.$route.query.type && this.$route.query.type == 'review'){
                this.clearSkip(
                    5,'Comfirmed','click',0
                )
            } else {
                this.clearSkip(
                    this.orderStatus,orderName,"click",0
                )
            }
        },
        mounted(){
            window.addEventListener('scroll',this.scrollHandle)
        },
        destroyed(){
            window.removeEventListener('scroll',this.scrollHandle)
        },
        methods:{
            ...mapActions([
                "changeOrderStatus"
            ]),
            returnReceiptFont(order){
                if(order.status === constant.ORDER_RETURN_REQUESTED && order.logistics){
                    // this.$t('edit_return_receipt')
                   return  this.$t('edit_return_receipt');
               }else{
                //    this.$t('return.return_receipt')
                   return  this.$t('return_receipt');
               }
            },
            status(order){
                // 0：return requested，1：refund requested，2：Return canceled，3：refunded
                if(order.status === constant.ORDER_RETURN_REQUESTED){
                    return "Return Requested";
                }else if(order.status === constant.ORDER_RETURN_REFUND_REQUESTED){
                    return "Refund Requested";
                }else if(order.status === constant.ORDER_RETURN_CANCELED){
                    return "Return Canceled";
                }else{
                    return "Refunded";
                }
            },
            returnProducts(item){
                // console.log(item)
                this.showReturnOrder = item;
                this.isShowReturn = true;
                this.showReturnOrderId = item.id;
                this.isReturnLoading = true;
            },
            cancelReturnProducts(item){
                let _this = this;
                this.modalconfirmshow = true;

                this.confirmCfg =  {
                    btnFont:[
                        {
                            type: 'no',
                            text: this.$t("cancel"),
                            fuc: function () {
                                _this.modalconfirmshow = false;
                                _this.$store.dispatch('closeConfirm').then(()=>{

                                });
                            },
                            style:{}
                        },
                        {
                            type: 'yes',
                            text: this.$t("confirm"),
                            fuc: function () {
                                _this.modalconfirmshow = false;
                                _this.$store.dispatch('closeConfirm').then(() => {
                                    cancelReturnOrder(item.id).then(res => {
                                        if(res.code == 200){
                                            _this.isloded = true
                                            _this.clearSkip('7','Returns',"click",0)
                                        }
                                    }).catch(err => {
                                        alert(err.result)
                                    })
                                });
                            },
                            style:{}
                        },
                        
                    ],
                    btnClose: true,
                    showSuccessIcon: false,
                    message: this.$t("sure_to_cancel_return")+"?",
                    message2:"",
                    close: function () {
                        _this.modalconfirmshow = false;
                        _this.$store.dispatch('closeConfirm').then(()=>{});
                    },
                    style:{
                        box:{
                            width: '600px',
                            height: '195px',
                            borderRadius: '2px',
                            padding: '40px'
                        },
                        message:{
                            fontFamily: 'AcuminPro-Bold',
                            fontSize: '16px',
                            color: '#222222',
                            margin: '20px 0 30px'
                        },
                        message2:{},
                        icon:{},
                        btnClose:{
                            fontSize: '18px !important',
                            color: '#222',
                        },
                    }
                }
                
            },
            logisticsShow(isSuccess){
                let _this = this;

                this.isShowReturn = false;
                this.isReturnLoading = false;
                if(isSuccess){
                    this.modalconfirmshow = true;

                    this.confirmCfg =  {
                        btnFont:[
                            {
                                type: 'yes',
                                text: this.$t("edit_return_receipt"),
                                fuc: function () {
                                    _this.modalconfirmshow = false;
                                    _this.$store.dispatch('closeConfirm').then(() => {
                                        _this.returnProducts(_this.showReturnOrder);
                                    });
                                },
                                style:{
                                }
                            },
                            {
                                type: 'no',
                                text: this.$t("points_mall.viewOrder"),
                                fuc: function () {
                                    _this.modalconfirmshow = false;
                                    _this.$store.dispatch('closeConfirm').then(()=>{
                                        _this.$router.push({ path: utils.ROUTER_PATH_ME + '/m/order/return-detail/'+_this.showReturnOrder.id})
                                    });
                                },
                                style:{
                                    background:'#222222',
                                    backgroundColor: '#222222',
                                    lineHeight: '36px',
                                    color: '#ffffff'
                                }
                            },
                        ],
                        btnClose: true,
                        showSuccessIcon: true,
                        message: this.$t("support.s_submit_success"),
                        message2:this.$t("check_return_detail"),
                        close: function () {
                            _this.modalconfirmshow = false;
                            _this.$store.dispatch('closeConfirm').then(()=>{

                            });
                        },
                        style:{
                            box:{
                                width: '600px',
                                height: '272px',
                                borderRadius: '2px',
                                padding: '40px'
                            },
                            message:{
                                fontSize: '16px',
                                marginBottom: '10px'
                            },
                            message2:{
                                fontSize: '14px',
                                marginBottom: '30px'
                            },
                            icon:{
                                marginTop: '20px',
                            },
                            btnClose:{
                                fontSize: '18px !important',
                                color: '#222',
                            },
                        }
                    }
                }
            },
            clearSkip(index, method, flag, skip, notGetData){
                // console.log('sss')
                // 切换类型时清空skip值
                this.$store.dispatch('skipClear').then((res) => {
                    if(res == 'success' && !notGetData){
                        this.getData(index, method, flag, skip)
                    }
                })
            },
            getData(index, method, flag, skip){
                // console.log(index, method, flag, )
                // this.index = index
                if(this.isloded){
                    this.changeOrderStatus(index);
                    this.method = method
                    if(flag ==='click'){
                        this.orderMethod = ''
                    }
                    this.isloded = false
                    if(method==='all'){
                        this.$store.dispatch('loadAll',{limit:20, skip:skip}).then(()=> {
                            this.orderMethod = this.all
                            this.isloded = true
                        })
                    }
                    if(method==='Unpaid'){
                        this.$store.dispatch('loadUnpaid',{limit:20, skip:skip}).then(()=> {
                            this.orderMethod = this.unpaid
                            this.isloded = true
                        })
                    }
                    if(method==='Paid'){
                        this.$store.dispatch('loadPaid',{limit:20, skip:skip}).then(()=> {
                            this.orderMethod = this.paid
                            this.isloded = true
                        })
                    }
                    if(method==='Processing'){
                        this.$store.dispatch('loadProcessing',{limit:20, skip:skip}).then(()=> {
                            this.orderMethod = this.processing
                            this.isloded = true
                        })
                    }
                    if(method==='Shipped'){
                        this.$store.dispatch('loadShipped',{limit:20, skip:skip}).then(()=> {
                            this.orderMethod = this.shipped
                            this.isloded = true
                        })
                    }
                    if(method==='Comfirmed'){
                        this.$store.dispatch('loadConfirmed',{limit:20, skip:skip}).then(()=> {
                            this.orderMethod = this.confirmed
                            this.isloded = true
                        })
                    }
                    if(method==='Canceled'){
                        this.$store.dispatch('loadCanceled',{limit:20, skip:skip}).then(()=> {
                            this.orderMethod = this.canceled
                            this.isloded = true
                        })
                    }
                    if(method==='History'){
                        this.$store.dispatch('loadHistory',{limit:20, skip:skip}).then(()=>{
                            this.orderMethod = this.history
                            this.isloded = true
                        })
                    }
                    if(method==='Returns'){
                        this.$store.dispatch('loadReturns',{limit:20, skip:skip}).then(()=>{
                            this.orderMethod = this.returns
                            this.isloded = true
                        })
                    }
                    
                    
                }
            },
            getDate(paymentTime){
                if(paymentTime == null){
                    return ''
                }
                return utils.enTime(new Date(paymentTime))
            },
            checkDetail(item){
                if(!this.getPayUrl(item)){
                    window.location.href = `${utils.PROJECT}/checkout/${item.id}`;
                }else{
                    window.location.href = this.getPayUrl(item);
                }
            },
            toDetail(item, isReturn){
                this.clearSkip('','','','',true);
                if(isReturn){
                    this.$router.push({ path: utils.ROUTER_PATH_ME + '/m/order/return-detail/'+item.id})
                }else{
                    this.$router.push({ path: utils.ROUTER_PATH_ME + '/m/order/detail/'+item.id})
                }
            },
            closeSelect1(){
                this.isShowTicket = false
                this.isShowSelect = false
            },
            showTicket:function(data){
                this.$store.dispatch('clearTicket')
                this.$store.dispatch('getTicket',data).then(()=>{
                    this.isShowTicket = true;
                })
            },
            selectorder:function(){
                this.isShowSelect = true;
                this.isShowTicket = false;
            },
            checkLogistics(orderid){
                this.clearSkip('','','','',true);
                this.$router.push({ path: utils.ROUTER_PATH_ME + '/m/order/logistics-detail', query: { orderid: orderid , method: 'orderlist' } })
            },
            orderoffset(order){
                console.log(order,  order.expiredPaymentTime - order.serverTime)
                if(order && order.expiredPaymentTime){
                    return  order.expiredPaymentTime - order.serverTime;
                }
            },
            scrollHandle(evt){
                evt.preventDefault();
                if(document.documentElement.scrollTop + window.innerHeight >= document.body.offsetHeight-300) {
                    this.getData(this.orderStatus,this.method,'scroll')
                }
            },
            productUrl(product){
                // return window.ctx + "/product/"+(name || '-')+"/"+(id || '-')+".html"
                return '/' + utils.productIdUrl(product)
            },
            checkoutUrl(id){
                if(id){
                    return `${utils.PROJECT}/checkout/${id}`;
                }
            },
            addProducts(orderItems){
                let formData = [];
                if(orderItems){
                    orderItems.forEach(product => {
                        formData.push({"variantId":product.variantId,"quantity":'1'})
                    })
                    this.$store.dispatch('addProducts',formData).then(()=>{
                        this.isAddProductstTip = this.$t("label.add_success");
                        this.isAddProducts = true;
                        setTimeout(() => {
                            this.isAddProducts = false;
                        }, 2000);

                        if(window.name === 'chicme' || window.name === 'boutiquefeel' || window.name === 'ivrose'){
                            window.notifyMinicart();
                        }else{
                            window.ninimour.shoppingcartutil.notify(true);
                        }
                    })
                }
            },
            getPayUrl(item){
                return item.mercadopagoPayURL || item.boletoPayCodeURL || item.payCodeUrl;
            },
            getBtnText(item){
                switch(item.payMethod){
                    case '20':
                    case '21':
                    case '27':
                    case '28':
                    case '30':
                    case '31':
                    case '34':
                    case '35':
                    case '37':
                    case '38':
                    case '40':
                    case '41':
                    case '43':
                    case '44':
                    case '129':
                    case '130':
                        return 'Generar Ticket'
                    case '29':
                        return 'Gerar Ticket'
                    case '16':
                    case '23':
                    case '25':
                        return 'Imprimir boleto'
                    default:
                        return this.$t("paynow")
                }
            },
            getOrderStatusName(status){
                if(status === 0){
                    return "all";
                }else if(status == 1){
                    return "Unpaid";
                }else if(status === 2){
                    return "Paid";
                }else if(status === 3){
                    return "Processing";
                }else if(status === 4){
                    return "Shipped";
                }else if(status === 5){
                    return "Comfirmed";
                }else if(status === 7){
                    return "Returns";
                }else{
                    return "Canceled";
                }
            },
            showHistoryMethod(){
                this.showHistory = true;
                this.clearSkip(
                    0,'History','click',0
                )
            },
            hideHistoryMethod(){
                this.showHistory = false;
                this.clearSkip(
                    0,'all','click',0
                )
            }
        },
    }
</script>

<style scoped lang="scss">
    @font-face {
        font-family: 'iconfont';  /* project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_v59e4fdvogk.eot');
        src: url('//at.alicdn.com/t/font_384296_v59e4fdvogk.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_384296_v59e4fdvogk.woff') format('woff'),
        url('//at.alicdn.com/t/font_384296_v59e4fdvogk.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_384296_v59e4fdvogk.svg#iconfont') format('svg');
    }
    .iconfont{
        font-family:"iconfont" !important;
        font-size:16px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }
    .toHistoryOrderList{
        width: 100%;
        height: 30px;
        line-height: 30px;
        background: #f6f6f6;
        font-family: 'SLATEPRO-MEDIUM';
        text-decoration: underline;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #222222;

        & > a{
            cursor: pointer;
        }
    }
    .backToOrder{
        height: 44px;
        line-height: 44px;
        border-bottom: 1px solid #f6f6f6;
        font-family: 'ACUMINPRO-BOLD';
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #222222;
        display: flex;
        align-items: center;
        justify-content: space-between;
        // margin-top: 500px;

        & > .backIcon{
            cursor:pointer;
        }

        &::after{
            content:'< Back';
            color:transparent;
        }
    }
    .addProductsMask{
        position: fixed;
        top: calc(50% - 20px);
        background-color: rgba(0,0,0,.4);
        text-align: center;
        overflow-y: auto;
        z-index: 999;
        color:#fff;
        width: 210px;
        height: 40px;
        line-height: 40px;
        left: calc(50% - 110px);
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
    .contactseller{
        font-size: 20px;
        position: relative;
        top: 3px;
    }
    .el-no-more{
        text-align: center;
    }
    .w-523{
        width: 523px;
    }
    .w-250{
        width: 250px;
    }
    .w-180{
        width: 180px;
    }
    .w-190{
        width: 210px;
    }
    .tx-l{
        text-align: left;
    }
    .tx-c{
        text-align: center;
    }
    .cur-p{
        cursor: pointer;
        &:hover{
            color: #999;
        }
    }
    .ml-20{
        margin-left: 20px;
    }
    .hd{
        border-bottom: 1px solid #e6e6e6;
        .el-tbl{
            display: table;
            width: 100%;
            .el-tbl-cell {
                display: table-cell;
                padding: 10px 10px 10px 25px;
                text-transform:uppercase;
                font-family: HelveticaNeue;
                cursor: pointer;
                font-weight: normal;
                span{
                    color: #E64545;
                    padding-left: 3px;
                }
                a{
                    color: #222;
                    text-decoration: none;
                }
            }
            .active{
                border-bottom: 2px solid #000;
            }
        }
    }
    .bd{
        .item-order{
            border: 1px solid #e6e6e6;
            margin-bottom: 16px;
            &:first-child{
                .i-bd{
                    .tbl-cell{
                        &:nth-child(2){
                            border: none !important;
                        }
                    }
                }
            }
            .i-hd{
                background-color: #f7f7f7;
                font-size: 14px;
                .tbl{
                    display: table;
                    width: 100%;
                }
                .tbl-cell{
                    display: table-cell;
                    color: #000;
                    padding: 10px 0;
                    vertical-align: middle;
                    span{
                        color: #666;
                    }
                    a{
                        text-decoration: underline;
                    }
                }
            }
            .i-bd{
                .tbl{
                    display: table;
                    width: 100%;
                    .tbl-cell{
                        display: table-cell;
                        padding:15px 12px;
                        color: #222;
                        .detail{
                            text-decoration: underline;
                            margin-top: 8px;

                        }
                        .price{
                            font-size: 16px;
                            font-family: HelveticaNeue-Medium;
                        }
                        p{
                            font-size: 14px;
                        }
                        .r-btn, .b-btn{
                            display: block;
                            width: 120px;
                            line-height: 26px;
                            text-align: center;
                            border-radius: 2px;
                            color: #fff;
                            font-size: 14px;
                            margin: 0 auto;
                            text-decoration: none;
                            cursor: pointer;
                        }
                        .r-btn{
                            background-color: #222;
                        }
                        .b-btn{
                            background-color: #222222;
                        }
                        .proimg{
                            width: 81px;
                            height: 108px;
                            margin-right: 16px;
                            float: left;
                        }
                        .viewmore{
                            width: 81px;
                            text-align: center;
                            float: left;
                            cursor: pointer;
                            .bg{
                                width: 23px;
                                height: 5px;
                                margin-top: 48px;
                                background-image: url("https://image.geeko.ltd/site/ivrose/icon48.png");
                                display: inline-block;
                                position: relative;
                            }
                            p{
                                opacity: 0;
                                position: relative;
                                line-height: 20px;
                            }
                            &:hover{
                                opacity: .8;
                                p{
                                    opacity: 1;
                                }
                            }
                        }
                        &:after{
                            float: left;
                        }
                        &:nth-child(2){
                            border-right: 1px solid #eee;
                            border-left: 1px solid #eee;
                        }
                    }

                    .p-info{
                        font-size: 14px;
                        p{
                            width: 226px;
                            letter-spacing: 0;
                            color: #222;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            padding: 10px 0;
                            margin-top: -20px;
                            white-space:nowrap;
                        }
                        span{
                            color:#999;
                        }
                    }
                    .v-t{
                        vertical-align: top;
                    }
                    .v-m{
                        vertical-align: middle;
                    }
                }
            }

        }
        .orders-hd{
            color: #222;
            border: none;
            font-weight: bold;
            margin-bottom: 0;
            margin-top: 20px;
        }
    }
    .el-list-loading {
        text-align: center;
        padding: 10px 0;
        i {
            font-size: 24px;
            display: inline-block;
            animation: list-loading 1.5s infinite linear;
        }
    }
    @keyframes list-loading {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .pos-rel{
        position: relative;
        .offTip{
            width: 100%;
            padding: 6px;
            background-color: #f46e6d;
            text-align: center;
            position: absolute;
            top:34px;
            .label{
                color: #fff;
                line-height: 18px;
            }
            .triangle{
                position: absolute;
                right: 50%;
                top: -11px;
                width: 0;
                height: 0;
                border: 6px solid;
                border-color: transparent transparent  #f46e6d transparent ;
            }
        }
    }
    .noMarginTop{
        margin-top: 0 !important;
    }
    .confirm-mask{
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.6);
    }

</style>