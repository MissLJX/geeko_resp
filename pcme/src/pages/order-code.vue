<template>
    <div class="datail">
        <div class="detailCon">
            <h2>{{$t('detail')}}</h2>
            <h4>{{$t('shippinginfo')}}</h4>
            <div class="shippinginfo">
                <p>{{shipping.name}}</p>
                <p>{{shipping.streetAddress1}}</p>
                <p>{{shipping.zipCode}},{{shipping.city}},{{shippingstate.label ? shippingstate.label : shippingstate.value}},{{shippingcountry.label}}</p>
            </div>
            <div class="bgline"></div>
            <h4>{{$t('orderinfo')}}</h4>
            <div class="orderinfo">
                <p v-if="orderdetail.id"><strong>{{$t('orderno')}}: {{orderdetail.id}}</strong></p>
                <p v-if="orderdetail.paymentTime"><span>{{$t('paymentTime')}}: </span>{{getDate}}</p>
                <p v-if="orderdetail.payMethodName"><span>{{$t('paymentMethod')}}: </span>{{orderdetail.payMethodName}}</p>
            </div>
            <div class="payNow" v-if="orderdetail.status === 0 && orderoffset >= 0">
                <div class="otherPay">
                    <div class="remain">{{$t("remaining")}}:<count-down :timeStyle="{color:'#fff'}" :timeLeft="orderoffset"></count-down></div>
                    <a class="paybtn" :href="getPayUrl" v-if="getBtnText && getPayUrl && orderdetail.status === 0 && orderoffset >= 0">{{getBtnText}}</a>
                    <a class="paybtn" :href="checkoutUrl(orderdetail.id)" v-if="getBtnText2 && getPayUrl && orderdetail.status === 0 && orderoffset >= 0">{{getBtnText2}}</a>
                    <a class="paybtn" :href="checkoutUrl(orderdetail.id)" v-if="!orderdetail.mercadopagoPayURL && !orderdetail.boletoPayCodeURL && !orderdetail.payCodeUrl && orderdetail.status === 0 && orderoffset >= 0">{{$t("paynow")}}</a>
                </div>
            </div>
            <div class="payTip" v-if="orderdetail.unPayMessage && orderoffset >= 0">
                {{orderdetail.unPayMessage}}
            </div>
            <ul v-if="orderdetail && orderdetail.logistics && orderdetail.logistics.packages && orderdetail.logistics.packages.length > 1" class="packageTab">
                <li class="tab" @click="changeTab(key)" :class="{'active': key===isActive}" v-for="(item,key) in orderdetail.logistics.packages" :key="key">
                    {{item.name}}
                </li>
            </ul>
            <ul v-else style="display: flex;margin-top: 20px;">
                <li><span class="statusColor" :style="{backgroundColor : status_color}"></span>{{orderdetail.statusView}}</li>
                <li v-if="orderpro.trackingId && !orderpro.logisticsSupplierWebsiteURL" style="line-height: 30px;margin-left: 20px;cursor:pointer;" ><a style="text-decoration: underline" @click="checkPackageLogistics(orderpro.status,orderpro.trackingId)">{{$t('track')}} ></a></li>
                <li v-if="orderpro.logisticsSupplierWebsiteURL" style="line-height: 30px;margin-left: 20px;cursor:pointer;" ><a style="text-decoration: underline" :href="orderpro.logisticsSupplierWebsiteURL"></a></li>
            </ul>
            <div v-if="orderdetail && orderdetail.logistics && orderdetail.logistics.packages && orderdetail.logistics.packages.length > 1" class="packageStatus">
                <p><span class="statusColor" :style="{backgroundColor : status_color}"></span>{{orderpro.statusView}}</p>
                <p v-if="orderpro.trackingId && !orderpro.logisticsSupplierWebsiteURL"><a @click="checkPackageLogistics(orderpro.status,orderpro.trackingId)" >{{$t('track')}} ></a></p>
                <p v-if="orderpro.logisticsSupplierWebsiteURL"><a :href="orderpro.logisticsSupplierWebsiteURL" >{{$t('track')}} ></a></p>
            </div>
            <table class="infotabel">
                <tr>
                    <td>{{$t('item')}}</td>
                    <td></td>
                    <td>{{$t('Qty')}}</td>
                    <td>{{$t('price')}}</td>
                </tr>
                <tr v-for="(item,key) in orderpro.products">
                    <td>
                        <link-image :href="getProUrl(item)" :src="item.imageURL" :title="item.name"/>
                    </td>
                    <td class="w-200">
                        <p v-if="item.name">{{item.name}}</p>
                        <p class="grey" v-if="item.sku" style="margin: 10px 0px;">SKU:{{item.sku}}</p>
                        <p class="grey">{{item.color}} {{item.size}} </p>
                    </td>
                    <td>
                        <p><span>X{{item.qty}}</span></p>
                    </td>
                    <td>
                        <p class="price">{{realprice(item.price)}}</p>
                    </td>
                </tr>
            </table>
            <div class="pricecon">
                <div class="pricecon1" v-if="orderdetail">
                    <p class="p-price">ItemTotal:<span class="price">{{paymentItemTotal}}</span></p>
                    <p class="p-price" v-if="orderdetail.shippingPrice && orderdetail.shippingPrice.amount!=='0'">{{$t('shipping')}}:<span class="price">{{shippingprice}}</span></p>
                    <p class="p-price" v-if="orderdetail.shippingInsurancePrice && orderdetail.shippingInsurancePrice.amount!=='0'">Insurance:<span class="price">{{shippingInsurancePrice}}</span></p>
                    <p class="p-price t-p">{{$t('ordertotal')}}:<span class="price r-p">{{total}}</span></p>
                </div>
            </div>
            <div class="actionbtn">
                <div class="r-btn w-btn" v-if="orderdetail.id && (orderdetail.status===2 || orderdetail.status===3) ">
                    <span  @click="checkLogistics(orderdetail.id)">{{$t('track')}}</span>
                </div>
            </div>
        </div>
        <div class="mask" v-if="isAlert">
            <div class="confirm-con cancel-con">
                <p class="cancel-btn" @click="cancelOrder(0)"><i class="iconfont">&#xe69a;</i></p>
                <p>{{$t("sure_to_cancel_order")}}</p>
                <p data-v-f8505664="" style="margin-top: 10px; color: rgb(153, 153, 153);">"{{$t("choose_reason")}}"</p>
                <select v-model="selected" :class="{'redBorder':isRequired}" @change="isRequired=false">
                    <option disabled="disabled" value="0">{{$t("select_reason")}}</option>
                    <option v-if="cancelReasons" v-for="(optionValue,index) in cancelReasons" :value="optionValue.value">
                        {{index+1}}. {{optionValue.label}}
                    </option>
                </select>
                <span style="color: rgb(230, 69, 69); display: inline-block; margin-left: 10px; position: relative; top: -10px;">*</span>
                <div class="btn-arr">
                    <div class="n-btn" @click="cancelOrder(0)">{{$t('no')}}</div>
                    <div class="y-btn" @click="cancelOrder('1')">{{$t('yes')}}</div>
                </div>
            </div>
        </div>
        <div class="mask" v-if="isConfirmAlert">
            <div class="confirm-con">
                <p class="cancel-btn" @click="confirmOrder(0)"><i class="iconfont">&#xe69a;</i></p>
                <p>{{$t("confirm_your_order")}}</p>
                <div class="btn-arr">
                    <div class="n-btn" @click="confirmOrder(0)">{{$t('no')}}</div>
                    <div class="y-btn" @click="confirmOrder('1')">{{$t('yes')}}</div>
                </div>
            </div>
        </div>
        <loding v-if="isloding"></loding>
        <transition name="fade">
            <div v-if="isAddProducts" class="addProductsMask">{{isAddProductstTip}}</div>
        </transition>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import * as utils from '../utils/geekoutil';
    import LinkImage from '../components/link-image.vue';
    import selectOrder from '../components/select-order.vue';
    import orderTicket from '../components/order-ticket.vue';
    import CountDown from '../components/countdow.vue';
    import loding from '../components/loding.vue';

    export default {
        data(){
            return {
                order:'',
                shipping:'',
                shippingstate:'',
                shippingcountry:'',
                orderpro:[],
                isShowSelect: false,
                isShowTicket:false,
                couponshow: true,
                isloding:true,
                isAlert:false,
                isConfirmAlert:false,
                isActive:0,
                isAddProducts:false,
                isAddProductstTip:'',
                selected:0,
                isRequired:false
            }
        },
        components: {
            'link-image': LinkImage,
            'order-ticket':orderTicket,
            'select-order':selectOrder,
            'count-down': CountDown,
            'loding':loding
        },
        computed:{
            ...mapGetters(['orderdetail','shareurl','cancelReasons']),
            getPayUrl(){
                switch(this.orderdetail.payMethod){
                    case '20':
                    case '21':
                        return this.orderdetail.mercadopagoPayURL
                    case '16':
                    case '23':
                    case '25':
                    case '29':
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
                        return this.orderdetail.boletoPayCodeURL
                    case '129':	
                    case '130':
                        return this.orderdetail.payCodeUrl
                    default:
                        return null
                }
            },
            getBtnText(){
                switch(this.orderdetail.payMethod){
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
                        return null
                }
            },
            getBtnText2(){
                switch(this.orderdetail.payMethod){
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
                        return 'Otro método de pago'
                    case '16':
                    case '23':
                    case '25':
                    case '29':
                        return 'Outro método de pagamento'
                    default:
                        return null
                }
            },
            getDate(){
                if(this.orderdetail.paymentTime){
                    return utils.enTime(new Date(this.orderdetail.paymentTime))
                }else{
                    return '-'
                }
            },
            getStatus(){
                return utils.STATUS_LABEL(this.orderdetail.status)
            },
            paymentItemTotal(){
                if(this.order && this.orderdetail.paymentItemTotal){
                    return this.orderdetail.paymentItemTotal.unit+this.orderdetail.paymentItemTotal.amount
                }
            },
            shippingprice(){
                if(this.orderdetail && this.orderdetail.shippingPrice){
                    return this.orderdetail.shippingPrice.unit+this.orderdetail.shippingPrice.amount
                }
            },
            shippingInsurancePrice(){
                if(this.orderdetail && this.orderdetail.shippingInsurancePrice){
                    return this.orderdetail.shippingInsurancePrice.unit+this.orderdetail.shippingInsurancePrice.amount
                }
            },
            total(){
                if(this.orderdetail && this.orderdetail.orderTotal){
                    return this.orderdetail.orderTotal.unit+this.orderdetail.orderTotal.amount
                }
            },
            confirmedOrder(){
                if(this.orderdetail && this.orderdetail.status===5){
                    return true
                }
            },
            shippedOrder(){
                if(this.order && this.orderdetail.status===3){
                    return true
                }
            },
            processingOrder(){
                if(this.order && this.orderdetail.status===2){
                    return true
                }
            },
            orderoffset() {
                if(this.orderdetail && this.orderdetail.expiredPaymentTime){
                    return this.orderdetail.expiredPaymentTime - this.orderdetail.serverTime;
                }
            },
            status_color() {
                if(this.orderdetail && this.orderdetail.logistics && this.orderdetail.logistics.packages && this.orderdetail.logistics.packages.length=== 1){
                    return utils.STATUS_COLOR(this.orderdetail.status)
                }else{
                    return utils.STATUS_COLOR(this.orderpro.status)
                }
            },

        },
        methods:{
            review(id){
                this.$router.push({ path: utils.ROUTER_PATH_ME + '/m/order-review', query: { orderid: this.orderdetail.id,productid: id }})
            },
            closeSelect1(){
                this.isShowTicket = false
            },
            showTicket(id){
                this.$store.dispatch('clearTicket')
                this.$store.dispatch('getTicket',id).then(()=>{
                    this.isShowTicket = true;
                })
            },
            confirmOrder(flag){
                let _this = this
                this.isConfirmAlert = false
                if(flag === '1'){
                    this.isloding = true;
                    this.$store.dispatch('confirmOrder',this.orderdetail.id).then(()=>{
                        this.isloding = false
                        _this.orderdetail.status = 10
                        alert(this.$t("success"))
                    }).catch((e) => {
                        alert(e);
                        this.isloding = false
                    })
                }
            },
            cancelOrder(flag){
                if(flag===0){
                    this.isAlert = false;
                    return ''
                }
                if(flag === '1'){
                    if(this.selected === 0){
                        this.isRequired = true
                        return ''
                    }
                    let _this = this
                    this.isloding = true;
                    this.$store.dispatch('cancelOrder',{id:this.orderdetail.id,reason:this.selected}).then(()=>{
                        this.$store.dispatch('getOrder',this.orderdetail.id).then(()=>{
                            alert(this.$t("success"))
                        });
                        this.isloding = false
                    }).catch((e) => {
                        alert(e);
                        this.isloding = false
                    })
                    this.isAlert = false;
                }
            },
            closeSelect1(){
                this.isShowSelect = false
                this.isShowTicket = false
            },
            showTicket:function(data){
                this.isShowSelect = false
                this.$store.dispatch('clearTicket')
                this.$store.dispatch('getTicket',data).then(()=>{
                    this.isShowTicket = true;
                })
            },
            selectorder:function(){
                this.isShowSelect = true;
                this.isShowTicket = false;
            },
            realprice(item){
                return item.unit+item.amount
            },
            changeTab(index){
                this.isActive = index;
                this.orderpro = _.cloneDeep(this.orderdetail.logistics.packages[index])
            },
            checkPackageLogistics(type,packageId){
                if(packageId){
                    this.$router.push({ path: utils.ROUTER_PATH_ME + '/m/packeage-logistics-detail', query: { type:type , packageid: packageId } })
                }
            },
            checkLogistics(orderid){
                this.$router.push({ path: utils.ROUTER_PATH_ME + '/m/order/logistics-detail', query: { orderid: orderid , method: 'ordercode' } })
            },
            checkoutUrl(id){
                if(id){
                    return window.ctx + '/checkout/' +id
                }
            },
            addProduct(variantId){
                let formData = [];
                if(variantId){
                    formData.push({"variantId":variantId,"quantity":'1'})
                    this.$store.dispatch('addProducts',formData).then(()=>{
                        this.isAddProductstTip = this.$t("add_success")
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
            addProducts(orderItems){
                let formData = [];
                if(orderItems){
                    orderItems.forEach(product => {
                        formData.push({"variantId":product.variantId,"quantity":'1'})
                    })
                    this.$store.dispatch('addProducts',formData).then(()=>{
                        this.isAddProductstTip = this.$t("add_success")
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
            getProUrl(product){
                // return "/product/"+product.name+"/"+product.productId+".html"
                return '/' + utils.productIdUrl(product)
            },
            getReturnLabel(){

                return document.ctx + "/v9/order/report-return-label?orderId="+this.orderdetail.id ;
            }
        },
        created(){
            this.$store.dispatch('getOrderByCode',this.$route.params.code).then(()=>{
                this.order = this.orderdetail
                this.orderpro = _.cloneDeep(this.orderdetail.logistics.packages[0])
                this.shipping = this.orderdetail.shippingDetail
                this.shippingstate = this.orderdetail.shippingDetail.state
                this.shippingcountry =this.orderdetail.shippingDetail.country
                this.isloding = false
            }).catch((e) => {
                console.error(e);
            })
        }
    }
</script>

<style scoped lang="scss">
    @font-face {
        font-family: 'iconfont';  /* project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_m72f720tkb.eot');
        src: url('//at.alicdn.com/t/font_384296_m72f720tkb.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_384296_m72f720tkb.woff') format('woff'),
        url('//at.alicdn.com/t/font_384296_m72f720tkb.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_384296_m72f720tkb.svg#iconfont') format('svg');
    }
    .iconfont{
        font-family:"iconfont" !important;
        font-size:16px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }
    .review-btn{
        width: 140px;
        height: 32px;
        background-color: #222222;
        border-radius: 2px;
        color: #fff;
        text-align: center;
        line-height: 32px;
        cursor: pointer;
    }
    .grey{
        color: #999;
    }
    .black{
        background-color: #222 !important;
        color: #fff;
    }
    .blackbtn{
         background-color: #000;
         color: #fff;
         width: 200px;
         height: 35px;
         line-height: 35px;
         text-align: center;
         margin: 15px auto 0 auto;
         display:block;
         cursor: pointer;
         text-decoration: none;
     }
    .w-200{
        max-width: 250px;
    }
    .infotabel{
        border: 1px solid #e6e6e6;
        width: 100%;
        margin: 20px 0 24px 0;
        td{
            padding: 12px;
            vertical-align: middle;
            font-size: 14px;
            line-height: 20px;
            text-align: center;
            p:last-child{
                i{
                    font-size: 22px;
                    position: relative;
                    top: 3px;
                }
            }
            i{
                font-size: 18px;
                margin-right: 6px;
            }
            a{
                text-decoration: underline;
                cursor: pointer;
                &:hover{
                    color: #666;
                }
            }
        }
        tr:first-child{
            background-color: #f5f5f5;
            border: none;
            td:last-child{
                width: 150px;
                vertical-align: middle;
                padding: 0 10px;
                text-align: center;
            }
        }
        tr{
            border-bottom:1px dashed #e6e6e6;
            td:first-child{
                width: 120px;
            }
            td:nth-child(2){
                text-align: left;
            }
        }
        img{
            width: 90px;
            height: 120px;
        }
    }
    .tbl-cell{
        display: table-cell;
    }
    .datail{
        width: 1140px;
        margin: 0 auto;
        .detailHd{
            font-size: 14px;
            color: #666;
            padding:30px 0 30px 0;
            p{
                a{
                    color:#666;
                }
            }
        }
    }
    .detailCon {
        width: 915px;
        margin: 0 auto;
        padding-top: 24px;
        h2 {
            margin-bottom: 20px;
        }
        h4 {
            font-size: 16px;
            margin: 15px 0;
        }
        .shippinginfo{
            color: #222;
            font-size: 14px;
            line-height: 25px;
        }
        .bgline{
            width: 100%;
            height: 1px;
            background-color: #e6e6e6;
            margin: 20px 0;
        }
        .orderinfo{
            padding-bottom: 20px;
            p{
                line-height: 25px;
                color: #222;
            }
            span{
                font-size: 14px;
                color: #666;
            }
        }

        .proDetail{
        }
    }
    .pricecon{
        width: 100%;
        margin-bottom: 38px;
        .pricecon1{
            width: 320px;
            float: right;
            .p-price{
                line-height: 30px;
                .price{
                    float: right;
                }
                .r-p{
                    color: #E64545;
                }
            }
            .t-p{
                font-size: 18px;
                .price{
                    font-size: 24px;
                }
                .r-p{
                    color: #E64545;
                }
            }
        }
        &:after{
            display: block;
            content: '';
            clear: both;
        }
    }
    .actionbtn{
        .r-btn{
            width: auto;
            padding: 0 60px;
            float: right;
            line-height: 40px;
            margin-bottom: 20px;
            text-align: center;
            background-color: #222;
            color: #fff;
            font-size: 14px;
            cursor: pointer;
            border-radius: 2px;
            border: 1px solid #222;
            margin-left: 20px;
            &:after{
                display: block;
                clear: both;
                content: '';
            }
            a{
                display: inline-block;
                width: 100%;
                color: #fff;
            }
            span{
                display: inline-block;
                width: 100%;
            }
        }
        .w-btn{
            width: auto;
            padding: 0 50px;
            background-color: #fff !important;
            color: #222;
        }
        .b-btn{
            background-color: #222 !important;
        }
        &:after{
            display: block;
            clear: both;
            content: '';
        }
    }
    .mask{
        background: rgba(0,0,0,.4);
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 10;
        position: fixed;
    }
    .coupon-window{
        width: 80%;
        max-width: 400px;
        position:fixed;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
        z-index:9999;

        .white{
            background-color: #fff;
        }

        .top-line{
            padding: 40px 0 0 0;
            text-align: center;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            img{
                width: 80%;
                max-width: 293px;
            }
        }

        .middle-line{
            display: block;
            margin: -2px;
            img{
                display: block;
                width: 100%;
            }
        }

        .bottom-line{
            padding: 5px 20px 40px 20px;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
        }

        .coupon-close{
            position: absolute;
            right: 0;
            text-align:center;
            line-height: 30px;
            font-size: 18px;
            top: -40px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #fff;
            cursor: pointer;
        }
    }
    .mask{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.4);
        text-align: center;
        overflow-y: auto;
        z-index: 999;
        .confirm-con{
            width: 485px;
            height: 175px;
            margin:0 auto;
            position: relative;
            top: calc(50% - 82px);
            background-color: white;
            color: #222;
            font-size: 14px;
            padding: 20px;
            .cancel-btn{
                font-size: 18px;
                color: #666666;
                text-align: right;
                cursor: pointer;
                margin-bottom: 15px;
            }
            .btn-arr{
                padding-top: 25px;
                width: 355px;
                margin: 0 auto;
                .n-btn, .y-btn{
                    width: 170px;
                    line-height: 32px;
                    text-align: center;
                    color: #fff;
                    float: left;
                    cursor: pointer;
                }
                .n-btn{
                    background-color: #222;
                }
                .y-btn{
                    background-color: #cacaca;
                    margin-left: 15px;
                }
                &:after{
                    display: block;
                    content: '';
                    clear: both;
                }
            }
        }

    }
    .packageTab{
        height: 45px;
        line-height: 45px;
        display: flex;
        margin-left: -10px;
        margin-top: 20px;
        border-bottom:1px solid #e6e6e6;
        .tab{
            cursor: pointer;
        }
        li{
            margin: 0 20px;
            color: #666;
        }
        .active{
            border-bottom: 2px solid #222;
            color: #222;
        }
    }
    .statusColor{
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin: 7px 4px 0 0;
    }
    .packageStatus{
        display: flex;
        padding-top: 10px;
        p:nth-of-type(2){
            padding-top: 4px;
            padding-left: 20px;
            text-decoration: underline;
            cursor: pointer;
        }
    }
    .payNow{
        width: 918px;
        height: 48px;
        line-height: 48px;
        background-color: #f46e6d;
        padding: 0 20px;
        color: #fff;
        font-size: 18px;
        .otherPay{
            .remain{
                float: left;
                .countdown{
                    margin-left: 30px;
                    .time{
                        color:#fff !important;
                    }
                }
            }
            .paybtn{
                display: block;
                float: right;
                width: 170px;
                height: 32px;
                background-color: #222222;
                border-radius: 2px;
                text-align: center;
                line-height: 32px;
                margin-top: 8px;
                font-size: 14px;
                color: #fff;
                margin-left:10px;
            }
            &::after{
                display: block;
                content: '';
                clear: both;
            }
        }
    }
    .payTip{
        width: 918px;
        padding:15px;
        line-height: 18px;
        color: #222;
        border:1px solid #f46e6d;
        border-top: none;
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
    .mask .cancel-con{
        width: 642px;
        height: auto;
        select{
            width: 514px;
            height: 40px;
            line-height: 40px;
            border-radius: 2px;
            text-align-last: center;
            border: solid 1px #cacaca;
            padding: 0 10px;
            margin: 20px auto 10px;
        }
    }
    .redBorder{
        border: 1px solid #e64545 !important;
    }
</style>