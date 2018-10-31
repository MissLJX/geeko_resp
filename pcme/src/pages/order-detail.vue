<template>
    <div class="datail">
        <div class="detailHd">
            <p style="text-transform:capitalize"><span @click="window.location.href = '/'">{{$t('home')}}</span><router-link to="/me/m"> > {{$t('me')}}</router-link><router-link to="/me/m/orders"> > Orders</router-link> > Detail</p>
        </div>
        <div class="detailCon">
            <h2>{{$t('orderdetail')}}</h2>
            <h4>{{$t('shippinginfo')}}</h4>
            <div class="shippinginfo">
                <p>{{shipping.name}}</p>
                <p>{{shipping.streetAddress1}}</p>
                <p>{{shipping.zipCode}},{{shipping.city}},{{shippingstate.label ? shippingstate.label : shippingstate.value}},{{shippingcountry.label}}</p>
            </div>
            <div class="bgline"></div>
            <h4>{{$t('orderinfo')}}</h4>
            <div class="orderinfo">
                <p v-if="orderdetail.boletoPayCodeURL && order.status == 1 && orderoffset >= 1000 && couponshow">
                    <span class="label" style="color: #E64545">Presente de cupão expirs</span>
                    <count-down :timeStyle="{color:'#E64545'}" :timeLeft="orderoffset"></count-down>
                </p>
                <p><span>{{$t('timeofpayment')}}: </span>{{getDate}}</p>
                <p><span>{{$t('orderno')}}: </span>{{order.id}}</p>
                <p><span>Transaction No: </span>{{order.transactionId}}</p>
                <p><span>{{$t('orderstatus')}}: </span>{{getStatus}}</p>
            </div>

            <table class="infotabel">
                <tr>
                    <td>{{$t('item')}}</td>
                    <td></td>
                    <td>{{$t('Qty')}}</td>
                    <td>{{$t('price')}}</td>
                    <td></td>
                    <td><p @click="showTicket(order.id)"><i class="iconfont">&#xe716;</i><a>{{$t('contactseller')}}</a></p></td>
                </tr>
                <tr v-for=" item in orderpro">
                    <td>
                        <link-image href="#" :src="item.productImageUrl" :title="item.productName"/>
                    </td>
                    <td class="w-300">
                        <p>{{item.productName}}</p>
                        <p class="grey">{{item.color}} {{item.size}} </p>
                    </td>
                    <td>
                        <p><span>X{{item.quantity}}</span></p>
                    </td>
                    <td>
                        <p class="price">{{realprice(item)}}</p>
                    </td>
                    <td>

                    </td>
                    <td>
                        <div v-if="confirmedOrder" class="review-btn" :class="{'b-btn':confirmedOrder,'black':shippedOrder || processingOrder}">
                            <span p  @click="review(item.productId)">Review</span>
                        </div>
                    </td>
                </tr>
            </table>

            <div class="pricecon">
                <div class="pricecon1">
                    <p class="p-price">{{$t('subtotal')}}:<span class="price">{{subtotal}}</span></p>
                    <p class="p-price">{{$t('coupon')}}:<span class="price r-p">-{{coupon}}</span></p>
                    <p class="p-price">{{$t('credits')}}:<span class="price r-p">-{{pointDiscount}}</span></p>
                    <p class="p-price">{{$t('shipping')}}:<span class="price">{{shippingprice}}</span></p>
                    <p class="p-price t-p">{{$t('ordertotal')}}:<span class="price r-p">{{total}}</span></p>
                </div>
            </div>
            <div class="actionbtn">
                <div class="r-btn" :class="{'b-btn':confirmedOrder,'black':shippedOrder || processingOrder}">
                    <span v-if="orderdetail.boletoPayCodeURL && order.status === 1">Imprimir Boleto</span>
                    <a style="color: #fff;"  :href="orderdetail.boletoPayCodeURL" target="_blank" v-if="orderdetail.boletoPayCodeURL && orderdetail.order.status === 1">Imprimir Boleto</a>
                    <a style="color: #fff;" :href="orderdetail.order.mercadopagoPayURL" target="_blank" v-if="orderdetail.order.mercadopagoPayURL && orderdetail.order.status === 1">Generar Ticket</a>
                    <span v-if="shippedOrder" @click="confirmOrder">{{$t('confirmorder')}}</span>
                    <span v-if="processingOrder" @click="cancelOrder">{{$t('cancelorder2')}}</span>
                </div>
            </div>


            <select-order v-if="isShowSelect" v-on:closeSelect="closeSelect1" v-on:showTicket="showTicket"></select-order>
            <order-ticket  v-if="isShowTicket" v-on:closeSelect="closeSelect1" v-on:selectOrder="selectorder"></order-ticket>

            <div v-if="orderdetail.boletoPayCodeURL && order.status == 1 && orderoffset >= 1000 && couponshow">
                <div class="mask"></div>
                <div class="coupon-window">
                    <span class="coupon-close" @click="() => {this.couponshow = false}"><i class="iconfont">&#xe69a;</i></span>
                    <div>
                        <div class="white top-line">
                            <h2>Atenção</h2>
                            <img src="https://dgzfssf1la12s.cloudfront.net/upgrade/20180529/001.png">
                        </div>
                        <div class="middle-line">
                            <img src="https://dgzfssf1la12s.cloudfront.net/upgrade/20180529/002.png">
                        </div>
                        <div class="white bottom-line">
                            <p>O cupom de <span class="fc-r">15%</span> de desconto será enviado para sua conta após o pagamento. Não perca</p>
                            <a  class="blackbtn" :href="order.boletoPayCodeURL">Pague agora</a>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="orderdetail.order.mercadopagoPayURL && order.status == 1 && orderoffset >= 1000 && couponshow">
                <div class="mask"></div>
                <div class="coupon-window">
                    <span class="coupon-close" @click="() => {this.couponshow = false}"><i class="iconfont">&#xe69a;</i></span>
                    <div>
                        <div class="white top-line">
                            <h2>Atención</h2>
                            <img src="https://dgzfssf1la12s.cloudfront.net/upgrade/20180529/001.png">
                        </div>
                        <div class="middle-line">
                            <img src="https://dgzfssf1la12s.cloudfront.net/upgrade/20180529/002.png">
                        </div>
                        <div class="white bottom-line">
                            <p>Después de realizar el pago, recibirás un cupón de regalo con un <span class="fc-r">15%</span> de descuento para tu siguiente compra.</p>
                            <a  class="blackbtn" :href="orderdetail.order.mercadopagoPayURL">Pague ahora</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <loding v-if="isloding"></loding>
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
                isloding:false,
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
            ...mapGetters(['orderdetail','shareurl']),
            getDate(){
                if(this.order.paymentTime){
                    return utils.enTime(new Date(this.order.paymentTime))
                }else{
                    return '-'
                }
            },
            getStatus(){
                return utils.STATUS_LABEL(this.order.status)
            },
            subtotal(){
                if(this.order && this.order.subTotal){
                    return this.order.subTotal.unit+this.order.subTotal.amount
                }
            },
            coupon(){
                if(this.order && this.order.couponDiscount){
                    return this.order.couponDiscount.unit+this.order.couponDiscount.amount
                }
            },
            pointDiscount(){
                if(this.order && this.order.pointDiscount){
                    return this.order.pointDiscount.unit+this.order.pointDiscount.amount
                }
            },
            shippingprice(){
                if(this.order && this.order.shippingPrice){
                    return this.order.shippingPrice.unit+this.order.shippingPrice.amount
                }
            },
            total(){
                if(this.order && this.order.orderTotal){
                    return this.order.orderTotal.unit+this.order.orderTotal.amount
                }
            },
            confirmedOrder(){
                if(this.order && this.order.status===10){
                    return true
                }
            },
            shippedOrder(){
                if(this.order && this.order.status===4){
                    return true
                }
            },
            processingOrder(){
                if(this.order && this.order.status===3){
                    return true
                }
            },
            orderoffset() {
                return this.order.orderTime + 5*24*60*60*1000 - this.orderdetail.serverTime;
            }
        },
        methods:{
            sharePro(){
                this.$store.dispatch('shareProduct',this.orderpro.productId).then(()=>{
                    window.open(this.shareurl.shareUrl,"_blank")
                })
            },
            review(id){
                this.$router.push({ path: utils.ROUTER_PATH_ME + '/m/order-review', query: { orderid: this.order.id,productid: id }})
            },
            closeSelect1(){
                this.isShowTicket = false
            },
            showTicket(id){
                this.$store.dispatch('getTicket',id).then(()=>{
                    this.isShowTicket = true;
                })
            },
            confirmOrder(){
                let _this = this
                this.isloding = true;
                this.$store.dispatch('confirmOrder',this.order.id).then(()=>{
                    _this.order.status = 10
                    alert("success")
                }).catch((e) => {
                    alert(e);
                    this.isloding = false
                })
            },
            cancelOrder(){
                let _this = this
                this.isloding = true;
                this.$store.dispatch('cancelOrder',this.order.id).then(()=>{
                    _this.order.status = 7
                    alert("success")
                    this.isloding = false
                }).catch((e) => {
                    alert(e);
                    this.isloding = false
                })
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
            selectorder:function(){
                this.isShowSelect = true;
                this.isShowTicket = false;
            },
            realprice(item){
                return item.realPrice.unit+item.realPrice.amount
            },
        },
        created(){
            this.isloding=true
            this.$store.dispatch('getOrder',this.$route.query.orderid).then(()=>{
                this.order = this.orderdetail.order
                this.orderpro = _.cloneDeep(this.orderdetail.order.orderItems)
                this.shipping = this.orderdetail.order.shippingDetail
                this.shippingstate = this.orderdetail.order.shippingDetail.state
                this.shippingcountry =this.orderdetail.order.shippingDetail.country
                this.isloding = false
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
        position: relative;
        left: 40px;
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
    .w-300{
        max-width: 300px;
    }
    .infotabel{
        border: 1px solid #cacaca;
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
                    font-size: 20px;
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
            td{
                font-weight: bold;
            }
            td:last-child{
                font-weight: normal !important;
                padding-right: 20px;
                text-align: right;
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
            td:last-child{
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
            margin: 24px 0;
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
            width: 240px;
            float: right;
            line-height: 40px;
            margin-bottom: 20px;
            text-align: center;
            background-color: #222;
            color: #fff;
            font-size: 14px;
            cursor: pointer;
            border-radius: 2px;
            &:after{
                display: block;
                clear: both;
                content: '';
            }
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
        z-index:11;

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
</style>