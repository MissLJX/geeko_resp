<template>
    <div class="datail">
        <div class="detailHd">
            <p style="text-transform:capitalize"><span @click="window.location.href = '/'">{{$t('home')}}</span><router-link :to="getUrl('/me/m')"> > {{$t('me')}}</router-link><router-link :to="getUrl('/me/m/order')"> > {{$t('myorders')}}</router-link> > {{$t('detail')}}</p>
        </div>
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
            <div class="payNow" v-if="orderdetail.fulfillmentStatus === constant.TOTAL_STATUS_UNPAID && orderoffset >= 0">
                <div class="otherPay">
                    <div class="remain">{{$t("remaining")}}:<count-down :timeStyle="{color:'#fff'}" :timeLeft="orderoffset"></count-down></div>
                    <a class="paybtn" :href="getPayUrl" v-if="getBtnText && getPayUrl && orderdetail.fulfillmentStatus === constant.TOTAL_STATUS_UNPAID && orderoffset >= 0">{{getBtnText}}</a>
                    <a class="paybtn" :href="checkoutUrl(orderdetail.id)" v-if="getBtnText2 && getPayUrl && orderdetail.fulfillmentStatus === constant.TOTAL_STATUS_UNPAID && orderoffset >= 0">{{getBtnText2}}</a>
                    <a class="paybtn" :href="checkoutUrl(orderdetail.id)" v-if="!orderdetail.mercadopagoPayURL && !orderdetail.boletoPayCodeURL && orderdetail.fulfillmentStatus === constant.TOTAL_STATUS_UNPAID && orderoffset >= 0">{{$t("paynow")}}</a>
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
                    <td><p @click="showTicket(orderdetail.id)"><i class="iconfont">&#xe716;</i><a>{{$t('contactseller')}}</a></p></td>
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
                    <td>
                        <div v-if="confirmedOrder" class="review-btn" :class="{'b-btn':confirmedOrder,'black':shippedOrder || processingOrder}">
                            <span  @click="review(item.productId,item.variantId)">{{$t('review')}}</span>
                        </div>
                        <div @click="addProduct(item.variantId)" v-if="item.variantId && orderdetail.fulfillmentStatus===constant.TOTAL_STATUS_CANCELED" class="review-btn">
                            <span>{{$t("repurchase")}}</span>
                        </div>

                        <!-- <div v-if="confirmedOrder" class="returns-btn" @click="showTicket(orderdetail.id)">Return</div> -->
                        <div v-if="orderpro.status === constant.PACKAGE_STATUS_DELIVERED && isNormalOrder" class="returns-btn" @click="showTicketReturn(orderdetail.id)">Return</div>
                    </td>
                </tr>
            </table>
            <div class="pricecon" v-if="isNormalOrder">
                <div class="pricecon1" v-if="orderdetail">
                    <p class="p-price">ItemTotal:<span class="price">{{paymentItemTotal}}</span></p>
                    <p class="p-price" v-if="orderdetail.shippingPrice && orderdetail.shippingPrice.amount!=='0'">{{$t('shipping')}}:<span class="price">{{shippingprice}}</span></p>
                    <p class="p-price" v-if="orderdetail.shippingInsurancePrice && orderdetail.shippingInsurancePrice.amount!=='0'">Insurance:<span class="price">{{shippingInsurancePrice}}</span></p>
                    <p class="p-price t-p">{{$t('ordertotal')}}:<span class="price r-p">{{total}}</span></p>
                </div>
            </div>
            <div class="actionbtn">
                <div class="r-btn" :class="{'b-btn':confirmedOrder,'black':shippedOrder || processingOrder}" v-if="shippedOrder || orderdetail.isCanCanceled || (orderdetail.id && orderdetail.fulfillmentStatus===constant.TOTAL_STATUS_CANCELED)">
                    <span v-if="shippedOrder" @click="() => {this.isConfirmAlert = true}">{{$t('confirmorder')}}</span>
                    <span v-if="orderdetail.isCanCanceled" @click="() => {this.isAlert = true}">{{$t('cancelorder2')}}</span>
                    <span @click="addProducts(orderdetail.orderItems)" v-if="orderdetail.id && orderdetail.fulfillmentStatus===constant.TOTAL_STATUS_CANCELED">{{$t("repurchase")}}</span>
                </div>
                <div class="r-btn black" v-if="orderdetail.hasReturnLabel">
                    <a :href="getReturnLabel()">{{$t('returnlabel')}}</a>
                </div>
                <div class="r-btn w-btn" v-if="orderdetail.fulfillmentStatus !== constant.TOTAL_STATUS_UNPAID">
                    <span  @click="checkLogistics(orderdetail.id)">{{$t('track')}}</span>
                </div>

                <!-- return-logistics -->
                <!-- <div 
                    class="r-btn black" 
                    v-if="this.order && this.order.logistics && this.order.logistics.packages && this.order.logistics.packages.length > 1 && order.status === 3"
                    @click="isReturnLogistics = true"
                >
                    <span>Return Logistics</span>
                </div> -->
            </div>

            <!-- <return-logistics 
                v-if="isReturnLogistics" 
                :orderId="orderdetail.id" 
                @logisticsShow="logisticsShow" 
                :loddingShow.sync="isloding"
            >
            </return-logistics> -->

            <!-- <select-order v-if="isShowSelect" v-on:closeSelect="closeSelect1" v-on:showTicket="showTicket"></select-order>
            <order-ticket  v-if="isShowTicket" v-on:closeSelect="closeSelect1" v-on:selectOrder="selectorder"></order-ticket> -->
            <faq-select-order v-if="isShowSelect" v-on:closeSelect="closeSelect1" v-on:showTicket="showTicket"></faq-select-order>
            <faq-order-ticket  v-if="isShowTicket" v-on:closeSelect="closeSelect1" v-on:selectOrder="selectorder"></faq-order-ticket>

            <div v-if="getBtnText==='Imprimir boleto' && orderdetail.fulfillmentStatus == constant.TOTAL_STATUS_UNPAID && orderoffset >= 0 && couponshow && getPayUrl">
                <div class="mask"></div>
                <div class="coupon-window">
                    <span class="coupon-close" @click="() => {this.couponshow = false}"><i class="iconfont">&#xe69a;</i></span>
                    <div>
                        <div class="white top-line">
                            <h2>Atenção</h2>
                            <img src="https://image.geeko.ltd/upgrade/20180529/001.png">
                        </div>
                        <div class="middle-line">
                            <img src="https://image.geeko.ltd/upgrade/20180529/002.png">
                        </div>
                        <div class="white bottom-line">
                            <p>O cupom de <span class="fc-r">15%</span> de desconto será enviado para sua conta após o pagamento. Não perca</p>
                            <a  class="blackbtn" :href="getPayUrl">Pague agora</a>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="(getBtnText==='Generar Ticket' || getBtnText==='Gerar Ticket') && orderdetail.fulfillmentStatus === constant.TOTAL_STATUS_UNPAID && orderoffset >= 0 && couponshow && getPayUrl">
                <div class="mask"></div>
                <div class="coupon-window">
                    <span class="coupon-close" @click="() => {this.couponshow = false}"><i class="iconfont">&#xe69a;</i></span>
                    <div>
                        <div class="white top-line">
                            <h2>Atención</h2>
                            <img src="https://image.geeko.ltd/upgrade/20180529/001.png">
                        </div>
                        <div class="middle-line">
                            <img src="https://image.geeko.ltd/upgrade/20180529/002.png">
                        </div>
                        <div class="white bottom-line">
                            <p>Después de realizar el pago, recibirás un cupón de regalo con un <span class="fc-r">15%</span> de descuento para tu siguiente compra.</p>
                            <a  class="blackbtn" :href="getPayUrl">Pague ahora</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mask" v-if="isAlert">
            <div class="confirm-con cancel-con">
                <p class="cancel-btn" @click="cancelOrder(0)"><i class="iconfont">&#xe69a;</i></p>
                <p>Are you sure to cancel this order? After cancelling, it can not be recovered.</p>
                <p data-v-f8505664="" style="margin-top: 10px; color: rgb(153, 153, 153);">"Please choose the reason for cancelling the order"</p>
                <select v-model="selected" :class="{'redBorder':isRequired}" @change="isRequired=false">
                    <option disabled="disabled" value="0">Please select a reason</option>
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
                <p>Are you sure want to confirm your order?</p>
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
    import * as constant from "../utils/constant.js"
    import LinkImage from '../components/link-image.vue';
    import selectOrder from '../components/select-order.vue';
    import orderTicket from '../components/order-ticket.vue';
    import faqSelectOrder from '../components/faq/faq-select-order.vue';
    import faqOrderTicket from '../components/faq/faq-order-ticket.vue';
    import CountDown from '../components/countdow.vue';
    import loding from '../components/loding.vue';
    // import ReturnLogistics from '../components/return-logistics.vue'

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
                isRequired:false,
                isReturnLogistics:false,
                constant:constant,
                isNormalOrder: true,
            }
        },
        components: {
            'link-image': LinkImage,
            'order-ticket':orderTicket,
            'select-order':selectOrder,
            'count-down': CountDown,
            'faq-select-order': faqSelectOrder,
            'faq-order-ticket': faqOrderTicket,
            'loding':loding,
            // 'return-logistics':ReturnLogistics
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
            // getStatus(){
            //     return utils.STATUS_LABEL(this.orderdetail.fulfillmentStatus)
            // },
            paymentItemTotal(){
                if(this.order && this.orderdetail.paymentItemTotal){
                    return utils.unitprice(this.orderdetail.paymentItemTotal);
                }
            },
            shippingprice(){
                if(this.orderdetail && this.orderdetail.shippingPrice){
                    return utils.unitprice(this.orderdetail.shippingPrice);
                }
            },
            shippingInsurancePrice(){
                if(this.orderdetail && this.orderdetail.shippingInsurancePrice){
                    return utils.unitprice(this.orderdetail.shippingInsurancePrice);
                }
            },
            total(){
                if(this.orderdetail && this.orderdetail.orderTotal){
                    return utils.unitprice(this.orderdetail.orderTotal);
                }
            },
            confirmedOrder(){
                if(this.orderdetail && this.orderdetail.fulfillmentStatus===constant.TOTAL_STATUS_REVIEW){
                    return true
                }
            },
            shippedOrder(){
                if(this.order && this.orderdetail.isConfirmBtnShow && this.orderdetail.fulfillmentStatus === constant.TOTAL_STATUS_SHIPPED){
                    return true
                }
            },
            processingOrder(){
                if(this.order && this.orderdetail.fulfillmentStatus===constant.TOTAL_STATUS_PROCCESSING){
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
            review(id,variantId){
                this.$router.push({ path: utils.ROUTER_PATH_ME + '/m/order-review', query: { orderid: this.orderdetail.id , productid: id , variantId:variantId }})
            },
            closeSelect1(){
                this.isShowTicket = false
            },
            showTicket(id){
                this.$store.dispatch('getTicket',id).then(()=>{
                    this.isShowTicket = true;
                })
            },
            confirmOrder(flag){
                let _this = this
                this.isConfirmAlert = false
                if(flag === '1'){
                    this.isloding = true;
                    this.$store.dispatch('confirmOrder',this.orderdetail.id).then((res)=>{
                        let tipContent = ''
                        if(res.prompt && res.prompt.html){
                            tipContent = res.prompt.html
                        }
                        this.isloding = false
                        _this.orderdetail.fulfillmentStatus = constant.TOTAL_STATUS_REVIEW;
                        // alert("success")
                        this.$router.push({path:"me/m/orderConfirm", params:{tipContent: tipContent}});
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
                            alert("success")
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
            showTicketReturn(data){
                this.isShowSelect = false
                localStorage._orderId = JSON.stringify(data);
                this.$store.dispatch('getTicket',data).then(()=>{
                    this.isShowTicket = true;
                })
            },
            selectorder(){
                this.isShowSelect = true;
                this.isShowTicket = false;
            },
            realprice(item){
                return utils.unitprice(item);
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
                this.$router.push({ path: utils.ROUTER_PATH_ME + '/m/order/logistics-detail', query: { orderid: orderid , method: 'orderlist' } })
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
                        this.isAddProductstTip = 'Add Success'
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
                        this.isAddProductstTip = 'Add Success'
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
                return "/product/"+product.name+"/"+product.sku+"/"+product.productId+".html"
            },
            getReturnLabel(){
                window.recordReturnLabel ? window.recordReturnLabel(this.orderdetail.id) : "";
                return document.ctx + "/v9/order/report-return-label?orderId="+this.orderdetail.id ;
            },
            getUrl(suffix){
                return utils.PROJECT + suffix;
            },
            // return-logistics
            // logisticsShow(){
            //     this.isReturnLogistics = false;
            //     this.isloding = false;
            // }
        },
        created(){
            this.$store.dispatch('getOrder',this.$route.params.orderId).then((order)=>{
                if(!order){
                    window.location.href='/me/m/order';
                }
                this.order = this.orderdetail
                this.orderpro = _.cloneDeep(this.orderdetail.logistics.packages[0])
                this.shipping = this.orderdetail.shippingDetail
                this.shippingstate = this.orderdetail.shippingDetail.state
                this.shippingcountry =this.orderdetail.shippingDetail.country
                this.isNormalOrder = this.orderdetail.type !== 1
                this.isloding = false
            }).catch((e) => {
                console.error(e);
               /* window.location.href='/me/m/order'*/
            })
            this.$store.dispatch('getCancelOrderReason')

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
    .returns-btn{
        width: 140px;
        height: 32px;
        background-color: #ffffff;
        border-radius: 2px;
	    border: solid 1px #cacaca;
        text-align: center;
        line-height: 32px;
        cursor: pointer;
        font-size: 14px;
        color: #222222;
        margin-top: 10px;
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