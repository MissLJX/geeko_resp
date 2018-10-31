<template>
    <div>
        <div class="hd">
            <div class="el-tbl">
                <div class="el-tbl-cell" @click="getData(0,'all','click')" :class="{active:0===index}">
                    {{$t('all')}}<span>{{orderCountAll}}</span>
                </div>
                <div class="el-tbl-cell" @click="getData(1,'Unpaid','click')" :class="{active:1===index}">
                    {{$t('unpaid')}}<span>{{orderCountUnpaid}}</span>
                </div>
                <div class="el-tbl-cell" @click="getData(2,'Processing','click')" :class="{active:2===index}">
                    {{$t('processing')}}<span>{{orderCountProcessing}}</span>
                </div>
                <div class="el-tbl-cell" @click="getData(3,'Shipped','click')" :class="{active:3===index}">
                    {{$t('ordershipped')}}<span>{{orderCountShipped}}</span>
                </div>
                <div class="el-tbl-cell" @click="getData(4,'Comfirmed','click')" :class="{active:4===index}">
                    {{$t('orderconfirm')}}<span>{{orderCountReceipt}}</span>
                </div>
                <div class="el-tbl-cell" @click="getData(5,'Canceled','click')" :class="{active:5===index}">
                    {{$t('cancelorder1')}}<span>{{orderCountCanceled}}</span>
                </div>
            </div>
        </div>
        <div class="bd">
            <div class="item-order orders-hd">
                <div class="i-bd">
                    <div class="tbl">
                        <div class="tbl-cell" style="width:523px">{{$t('item')}}</div>
                        <div class="tbl-cell v-m w-180 tx-c">{{$t('orderstatus')}}</div>
                        <div class="tbl-cell v-m w-190 tx-c">{{$t('action')}}</div>
                    </div>
                </div>
            </div>
            <div v-for="item in orderMethod" class="item-order">
                <div class="i-hd">
                    <div class="tbl">
                        <div class="tbl-cell tx-c">{{getDate(item.order.paymentTime)}}</div>
                        <div class="tbl-cell tx-c"><span>{{$t('orderno')}}:</span>{{item.order.id}}</div>
                        <div class="tbl-cell tx-c"><span>{{$t('shippingfrom')}}:</span>{{$t('overseas')}}</div>
                        <div class="tbl-cell tx-c"><i class="iconfont contactseller" >&#xe716;</i><a class="cur-p" @click="showTicket(item.order.id)">{{$t('contactseller')}}</a></div>
                    </div>
                </div>
                <div class="i-bd">
                    <div class="tbl">
                        <div class="tbl-cell w-523">
                            <div class="proimg" v-if="item.order && item.order.orderItems && index < 4" v-for="(img,index) in item.order.orderItems">
                                <link-image   href="#" :src="img.productImageUrl" :title="img.productName"/>
                            </div>
                            <div v-if="item.order && item.order.orderItems && item.order.orderItems.length > 4" class="viewmore" @click="checkDetail(item.order.id)">
                                <div class="bg"></div>
                                <p>View Detail</p>
                            </div>
                        </div>
                        <div class="tbl-cell v-m w-180 tx-c">
                            <p>{{getStatus(item.order.status)}}</p>
                            <p class="detail cur-p" @click="checkDetail(item.order.id)">{{$t('detail')}}</p>
                            <p class="detail cur-p" v-if="item.order.id && item.order.status === 4 && item.tracking"  @click="checkLogistics(item.order.id)">{{$t('logistics')}}</p>
                        </div>
                        <div class="tbl-cell v-m w-190 tx-c">
                            <p style="margin-bottom: 10px" v-if="orderoffset(item) >= 1000 && item.boletoPayCodeURL && item.order.status === 1">
                                <span class="label" style="color: #E64545">Presente de cupão expirs</span>
                                <count-down :timeStyle="{color:'#E64545'}" :timeLeft="orderoffset(item)"></count-down>
                            </p>
                            <a class="r-btn" :href="item.boletoPayCodeURL" target="_blank" v-if="item.boletoPayCodeURL && item.order.status === 1">Imprimir Boleto</a>

                            <p style="margin-bottom: 10px" v-if="orderoffset(item) >= 1000 && item.order.mercadopagoPayURL && item.order.status === 1">
                                <span class="label" style="color: #E64545">Tiempo restante para realizar el pago</span>
                                <count-down :timeStyle="{color:'#E64545'}" :timeLeft="orderoffset(item)"></count-down>
                            </p>
                            <a class="r-btn" :href="item.order.mercadopagoPayURL" target="_blank" v-if="item.order.mercadopagoPayURL && item.order.status === 1">Generar Ticket</a>

                            <a class="b-btn" @click="checkDetail(item.order.id)" v-if="item.order.id && item.order.status === 10">{{$t('view')}}</a>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="!isloded" class="el-list-loading"><i class="iconfont">&#xe69f;</i></div>
            <div class="el-no-more" v-show="ifDone">{{$t('nomoredata')}}</div>
        </div>

        <select-order v-if="isShowSelect" v-on:closeSelect="closeSelect1" v-on:showTicket="showTicket"></select-order>
        <order-ticket  v-if="isShowTicket" v-on:closeSelect="closeSelect1" v-on:selectOrder="selectorder"></order-ticket>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import * as utils from '../utils/geekoutil';
    import LinkImage from './link-image.vue';
    import orderTicket from './order-ticket.vue';
    import selectOrder from './select-order.vue';
    import CountDown from './countdow.vue';
    export default {
        data (){
            return{
                index:0,
                orderMethod:null,
                isShowTicket:false,
                isShowSelect:false,
                method:'all',
                isloded:false,
                finished:false
            }
        },
        components: {
            'link-image': LinkImage,
            'order-ticket':orderTicket,
            'select-order':selectOrder,
            'count-down': CountDown
        },
        computed: {
            ...mapGetters([
                'orderCountUnpaid',
                'orderCountProcessing',
                'orderCountShipped',
                'orderCountReceipt',
                'orderCountCanceled',
                'orderCountAll',
                'all',
                'unpaid',
                'processing',
                'shipped',
                'confirmed',
                'canceled',
                'allLoading',
                'processingLoading',
                'confirmedLoading',
                'canceledLoading',
                'shippedLoading',
                'unpaidLoading',
                'allDone',
                'unpaidDone',
                'processingDone',
                'confirmedDone',
                'canceledDone',
                'shippedDone'
            ]),
            ifDone(){
                if(this.method==='all'){
                    return this.allDone
                }
                if(this.method==='Unpaid'){
                    return this.unpaidDone
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
            }
        },
        created(){
            this.$store.dispatch('getOrderCountAll');
            this.$store.dispatch('getOrderCountProcessing');
            this.$store.dispatch('getOrderCountShipped');
            this.$store.dispatch('getOrderCountReceipt');
            this.$store.dispatch('getOrderCountCanceled');
            this.$store.dispatch('getOrderCountUnpaid');
            this.loadAll(20).then(()=> {
                this.orderMethod = this.all
                this.isloded = true
            })
        },
        mounted(){
            window.addEventListener('scroll',this.scrollHandle)
        },
        destroyed(){
            window.removeEventListener('scroll',this.scrollHandle)
        },
        methods:{
            ...mapActions([
                'loadAll'
            ]),
            getData(index,method,flag){
                this.index = index
                this.method = method
                if(flag ==='click'){
                    this.orderMethod = ''
                }

                if(this.isloded){
                    this.isloded = false
                    if(method==='all'){
                        this.$store.dispatch('loadAll',20).then(()=> {
                            this.orderMethod = this.all
                            this.isloded = true
                        })
                    }
                    if(method==='Unpaid'){
                        this.$store.dispatch('loadUnpaid',20).then(()=> {
                            this.orderMethod = this.unpaid
                            this.isloded = true
                        })
                    }
                    if(method==='Processing'){
                        this.$store.dispatch('loadProcessing',20).then(()=> {
                            this.orderMethod = this.processing
                            this.isloded = true
                        })
                    }
                    if(method==='Shipped'){
                        this.$store.dispatch('loadShipped',20).then(()=> {
                            this.orderMethod = this.shipped
                            this.isloded = true
                        })
                    }
                    if(method==='Comfirmed'){
                        this.$store.dispatch('loadConfirmed',20).then(()=> {
                            this.orderMethod = this.confirmed
                            this.isloded = true
                        })
                    }
                    if(method==='Canceled'){
                        this.$store.dispatch('loadCanceled',20).then(()=> {
                            this.orderMethod = this.canceled
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
            getStatus(orderstatus){
                return utils.STATUS_LABEL(orderstatus)
            },
            checkDetail(orderid){
                this.$router.push({ path: utils.ROUTER_PATH_ME + '/m/order-detail', query: { orderid: orderid } })
            },
            closeSelect1(){
                this.isShowTicket = false
                this.isShowSelect = false
            },
            showTicket:function(data){
                this.$store.dispatch('getTicket',data).then(()=>{
                    this.isShowTicket = true;
                })
            },
            selectorder:function(){
                this.isShowSelect = true;
                this.isShowTicket = false;
            },
            checkLogistics(orderid){
                this.$router.push({ path: utils.ROUTER_PATH_ME + '/m/logistics-detail', query: { orderid: orderid } })
            },
            orderoffset(order){
                return  order.order.orderTime + 5*24*60*60*1000 - order.serverTime;
            },
            scrollHandle(evt){
                evt.preventDefault();
                if(document.documentElement.scrollTop + window.innerHeight >= document.body.offsetHeight-300) {
                    this.getData(this.index,this.method,'scroll')
                }
            },
        }
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
        width: 190px;
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
                                background-image: url("https://dgzfssf1la12s.cloudfront.net/site/ivrose/icon48.png");
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
                    &:first-child{
                        .tbl-cell{
                            &:nth-child(2){
                                border: none;
                            }
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
</style>