<template>
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
            <p v-if="orderdetail.boletoPayCodeURL && order.status == 1 && orderoffset >= 1000 && couponshow">
                <span class="label" style="color: #e5004f">Presente de cupão expirs</span>
                <count-down :timeStyle="{color:'#e5004f'}" :timeLeft="orderoffset"></count-down>
            </p>
            <p><span>{{$t('timeofpayment')}}: </span>{{getDate}}</p>
            <p><span>{{$t('orderno')}}: </span>{{order.id}}</p>
            <p><span>{{$t('shippingfrom')}}: </span>Overseas Warehouse</p>
            <p><span>{{$t('orderstatus')}}: </span>{{getStatus}}</p>
        </div>

        <table class="infotabel">
            <tr>
                <td>{{$t('item')}}</td>
                <td></td>
                <td>{{$t('Qty')}}</td>
                <td>{{$t('price')}}</td>
                <td></td>
                <td><p @click="showTicket(order.id)"><i class="iconfont">&#xe670;</i><a>{{$t('contactseller')}}</a></p></td>
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

        <div class="r-btn" :class="{'b-btn':confirmedOrder,'black':shippedOrder || processingOrder}">
            <p v-if="confirmedOrder" @click="review">Review</p>
            <p v-if="orderdetail.boletoPayCodeURL && order.status === 1">Imprimir Boleto</p>
            <p v-if="shippedOrder" @click="confirmOrder">{{$t('confirmorder')}}</p>
            <p v-if="processingOrder" @click="cancelOrder">{{$t('cancelorder2')}}</p>
        </div>

        <select-order v-if="isShowSelect" v-on:closeSelect="closeSelect1" v-on:showTicket="showTicket"></select-order>
        <order-ticket  v-if="isShowTicket" v-on:closeSelect="closeSelect1" v-on:selectOrder="selectorder"></order-ticket>

        <div v-if="orderdetail.boletoPayCodeURL && order.status == 1 && orderoffset >= 1000 && couponshow">
            <div class="mask"></div>
            <div class="coupon-window">
                <span class="coupon-close" @click="() => {this.couponshow = false}">X</span>
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

        <div v-if="order.mercadopagoPayURL && order.status == 1 && orderoffset >= 1000 && couponshow">
            <div class="mask"></div>
            <div class="coupon-window">
                <span class="coupon-close" @click="() => {this.couponshow = false}">X</span>
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
                        <a  class="blackbtn" :href="order.order.mercadopagoPayURL">Pague ahora</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {mapGetters} from 'vuex';
    import * as utils from '../utils/geekoutil';
    import LinkImage from '../components/link-image.vue';
    import selectOrder from '../components/select-order.vue';
    import orderTicket from '../components/order-ticket.vue';
    import CountDown from '../components/countdow.vue';

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
            }
        },
        components: {
            'link-image': LinkImage,
            'order-ticket':orderTicket,
            'select-order':selectOrder,
            'count-down': CountDown
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
            review(){
                this.$router.push({ path: utils.ROUTER_PATH_ME + '/m/order-review', query: { orderid: this.order.id } })
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
                this.$store.dispatch('confirmOrder',this.order.id).then(()=>{
                    alert("success")
                })
            },
            cancelOrder(){
                this.$store.dispatch('cancelOrder',this.order.id).then(()=>{
                    alert("success")
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
            this.$store.dispatch('getOrder',this.$route.query.orderid).then(()=>{
                this.order = this.orderdetail.order
                this.orderpro = _.cloneDeep(this.orderdetail.order.orderItems)
                this.shipping = this.orderdetail.order.shippingDetail
                this.shippingstate = this.orderdetail.order.shippingDetail.state
                this.shippingcountry =this.orderdetail.order.shippingDetail.country
            })
        }
    }
</script>

<style scoped lang="scss">
    .grey{
        color: #999;
    }
    .black{
        background-color: #222 !important;
        color: #fff;
    }
    .w-300{
        max-width: 300px;
    }
    .infotabel{
        border: 1px solid #cacaca;
        width: 100%;
        margin: 20px 0 30px 0;
        td{
            padding: 14px;
            vertical-align: middle;
            font-size: 14px;
            line-height: 25px;
            text-align: center;
            i{
                font-size: 18px;
                margin-right: 6px;
            }
            a{
                text-decoration: underline;
                cursor: pointer;
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
    .detailCon {
        width: 915px;
        margin: 0 auto;
        padding-top: 24px;
        h2 {
            margin-top: 63px;
            margin-bottom: 20px;
        }
        h4 {
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
            background-color: #cacaca;
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
                line-height: 24px;
                .price{
                    float: right;
                }
                .r-p{
                    color: #e5004f;
                }
            }
            .t-p{
                font-size: 18px;
                .price{
                    font-size: 24px;
                }
                .r-p{
                    color: #e5004f;
                }
            }
        }
        &:after{
            display: block;
            content: '';
            clear: both;
        }
    }
    .r-btn{
        width: 160px;
        float: right;
        line-height: 32px;
        margin-bottom: 20px;
        text-align: center;
        background-color: #e5004f;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
    }
    .b-btn{
        background-color: #222 !important;
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