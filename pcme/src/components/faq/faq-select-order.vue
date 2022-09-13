<template>
    <div class="selectOrder" >
        <div class="s-hd">
            <h3 >{{$t('selectorder')}}</h3>
            <i @click="close" class="iconfont">&#xe7c9;</i>
        </div>
        <div class="s-bd" ref="viewBox">
            <!-- <geeko-select @change="changeHandle" :items="tabList"/> -->
            <div class="selectOrderInfo">
                {{$t("support.s_select_order")}}
            </div>
            <faq-select class="faqSelect" 
                        :selectValue="selectValue" 
                        :selectList="tabList" 
                        :disabled="!isloded" 
                        @selectChange="selectChange($event)"></faq-select>

            <div v-for="(item,index) in orderMethod" :key="index" class="item-order">
                <div class="order-hd">
                    <p><span>{{$t('orderno')}} </span>{{item.id}}</p>
                    <p><span >{{item.fulfillmentStatusView}}</span></p>
                </div>
                <div class="img-con">
                    <input :id="index" type="radio" :value="item.id" v-model="pickedOrder" />
                    <label :for="index"></label>
                    <ul class="img-flex">
                        <li v-for="(img, index) in item.orderItems" :key="index">
                            <img :src="img.productImageUrl"/>
                        </li>
                    </ul>

                </div>
                <div class="order-info">
                    <span>{{item.orderItems.length}} {{$t("support.s_items")}}</span>
                    <span class="i-price">
                        {{$t('total')}} <span >{{unitFormate(item.orderTotal)}}</span>
                    </span>
                </div>
            </div>
            <div v-show="!isloded" class="el-list-loading"><i class="iconfont">&#xe69f;</i></div>
            <div class="el-no-more" v-show="ifDone">{{$t('nomoredata')}}</div>
        </div>
        <div class="s-fd">
            <div class="f-btn" @click="submitTicket">{{$t('submit')}}</div>
        </div>
    </div>
</template>

<script>
    import GeekoSelect from '../geeko-select';
    import {mapGetters,mapActions } from 'vuex';
    import * as utils from '../../utils/geekoutil';
    import faqSelect from './faq-select.vue';

    let a = 1;

    export default {
        data() {
            var tab = this.$route.name;
            return {
                orderMethod:null,
                ifloding:true,
                finished:false,
                isloded:false,
                selectValue:'home-all',
                tabList: [
                    {
                        label: this.$t("support.s_all"),
                        value: 'home-all',
                        selected: 'home-all' === tab
                    },
                    {
                        label: this.$t("support.s_unpaid"),
                        value: 'home-unpaid',
                        selected: 'home-unpaid' === tab
                    },
                    // {
                    //     label: this.$t("support.s_paid"),
                    //     value: 'home-paid',
                    //     selected: 'home-paid' === tab
                    // },
                    {
                        label: this.$t("support.s_processing"),
                        value: 'home-processing',
                        selected: 'home-processing' === tab
                    },
                    {
                        label: this.$t("support.s_shipped"),
                        value: 'home-shipped',
                        selected: 'home-shipped' === tab
                    },
                    {
                        label: this.$t("support.s_confirmed"),
                        value: 'home-confirmed',
                        selected: 'home-confirmed' === tab
                    },
                    {
                        label: this.$t("support.s_canceled"),
                        value: 'home-canceled',
                        selected: 'home-canceled' === tab
                    }
                ],
                isSelectOrder:'',
                pickedOrder:'',
                method:'home-all',
            };
        },

        computed: {
            ...mapGetters([
                'tab',
                'bbmessage',
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
                if(this.method==='home-all'){
                    return this.allDone
                }
                if(this.method==='home-unpaid'){
                    return this.unpaidDone
                }
                if(this.method==='home-processing'){
                    return this.processingDone
                }
                if(this.method==='home-confirmed'){
                    return this.confirmedDone
                }
                if(this.method==='home-canceled'){
                    return this.canceledDone
                }
                if(this.method==='home-shipped'){
                    return this.shippedDone
                }
            },

        },
        created() {
            this.loadAll(20).then(()=> {
                this.orderMethod = this.all
                this.isloded = true
            })
        },
        mounted(){
            // console.log(a)
            this.$refs.viewBox.addEventListener('scroll',this.scrollHandle)
        },
        methods: {
            ...mapActions([
                'changeTab','getM1135','loadAll'
            ]),
            unitFormate(price){
                return utils.unitprice(price)
            },
            status_color(status) {
                return utils.STATUS_COLOR(status)
            },
            changeHandle(evt) {
                var tab = evt.target.value;
                this.changeList(tab);
            },
            selectChange(e){
                if(this.isloded){
                    // console.log(e)
                    this.selectValue = e.value;
                    this.changeList(e.value);
                    
                }
            },

            changeList(tab) {
                this.method = tab
                if(this.isloded) {
                    this.isloded = false
                    if (tab === 'home-all') {
                        this.$store.dispatch('loadAll', {limit:20, skip:undefined}).then(() => {
                            this.orderMethod = this.all
                            this.isloded = true
                        })
                    }
                    if (tab === 'home-unpaid') {
                        this.$store.dispatch('loadUnpaid', {limit:20, skip:undefined}).then(() => {
                            this.orderMethod = this.unpaid
                            this.isloded = true
                        })
                    }
                    if (tab === 'home-processing') {
                        this.$store.dispatch('loadProcessing', {limit:20, skip:undefined}).then(() => {
                            this.orderMethod = this.processing
                            this.isloded = true
                        })
                    }
                    if (tab === 'home-shipped') {
                        this.$store.dispatch('loadShipped', {limit:20, skip:undefined}).then(() => {
                            this.orderMethod = this.shipped
                            this.isloded = true
                        })
                    }
                    if (tab === 'home-confirmed') {
                        this.$store.dispatch('loadConfirmed', {limit:20, skip:undefined}).then(() => {
                            this.orderMethod = this.confirmed
                            this.isloded = true
                        })
                    }
                    if (tab === 'home-canceled') {
                        this.$store.dispatch('loadCanceled', {limit:20, skip:undefined}).then(() => {
                            this.orderMethod = this.canceled
                            this.isloded = true
                        })
                    }
                }

            },
            getStatus(orderstatus){
                this.ifloding = false
                return utils.STATUS_LABEL(orderstatus)
            },
            selectOrder(orderid){
                this.isSelectOrder = orderid
            },
            close(){
                this.$emit('closeSelect');
            },
            submitTicket(){
                console.log(this.pickedOrder)
                if(this.pickedOrder){
                    a+=1;
                    this.$emit('showTicket',this.pickedOrder)
                }else{
                    alert("please choose an order");
                }
            },
            scrollHandle(evt){
                evt.preventDefault();
                if(this.$refs.viewBox.scrollTop + this.$refs.viewBox.offsetHeight >= this.$refs.viewBox.scrollHeight - 200) {
                    this.changeList(this.method)
                }
            },
        },
        components: {
            'geeko-select': GeekoSelect,
            'faq-select': faqSelect
        }
    };
</script>

<style  lang="scss" scoped>
    .selectOrder{
        width: 500px;
        border: 1px solid #cacaca;
        border-right: none;
        position: fixed;
        right: 0;
        top: 0;
        padding-top: 50px;
        padding-bottom: 73px;
        z-index: 30000000;
        .s-hd{
            width: 100%;
            height: 50px;
            line-height: 50px;
            background-color: #f6f6f6;
            text-align: left;
            padding-left: 25px;
            position: absolute;
            top: 0;
            right: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;

            i{
                margin-right: 20px;
                cursor: pointer;
                font-size: 14px;
                line-height: 14px;
                color: #999;
            }

            h3{
                line-height: 50px;
                font-size: 18px;
            }
        }
        .s-bd{
            background-color: #f6f6f6;
            height:calc(100vh - 125px);
            overflow-y: auto;

            &::-webkit-scrollbar{
                display: none;
            }
            // &::-webkit-scrollbar{
            //     width: 6px;
            //     border-radius: 2px;
            // }
            // &::-webkit-scrollbar-thumb{
            //     background-color: #e6e6e6;
            //     border-radius: 2px;
            // }

            .selectOrderInfo{
                font-family: Roboto-Regular;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #666666;
                text-align: center;
                padding-top: 24px;
                background: #fff;
                padding-bottom: 12px;
            }

            .faqSelect{
                width: 100%;
                text-align: left;
                padding: 0 36px 10px;
                background: #fff;
            }

            .st-select{
                width: 452px;
                height: 40px;
                margin: 25px 14px;
                padding-left: 10px;
                background-color: #fff;
            }

            .item-order{
                overflow-x: auto;
                overflow-y: hidden;
                padding: 20px 24px 0;
                background: #fff;
                margin-bottom: 6px;

                .order-hd{
                    text-align: left;
                    // padding: 0 24px;
                    line-height: 16px;
                    font-family: Roboto-Regular;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #222222;
                    p{
                        line-height: 16px;
                    }
                    p:first-child{
                        float: left;
                    }
                    p:nth-child(2){
                        float: right;
                    }
                    &:after{
                        display: block;
                        content: '';
                        clear: both;
                    }
                    span{
                        color: #999;
                    }
                }
            }

            .img-con{
                // padding-left: 22px;
                padding-top: 14px;
                text-align: left;
                border-bottom: 1px solid #e6e6e6;
                padding-bottom: 20px;
                position: relative;
                line-height: 30px;

                .img-flex{
                    display: flex;
                    overflow-y: hidden;
                    overflow-x: scroll;
                    margin-left: 26px;
                    padding-bottom: 8px;

                    li{
                        height: 100px;
                    }

                    img{
                        width: 80px;
                        height: 100px;
                        margin-right: 12px;
                    }

                    // &::-webkit-scrollbar{
                    //     display: none;
                    // }
                    &::-webkit-scrollbar{
                        height: 6px;
                        border-radius: 2px;
                        margin-top: 1px;
                    }
                    &::-webkit-scrollbar-thumb{
                        background-color: #e6e6e6;
                        border-radius: 2px;
                    }
                }
                
                input[type="radio"] {
                    width: 20px;
                    height: 20px;
                    opacity: 0;
                    display: none;
                }

                label {
                    position: absolute;
                    // left: 20px;
                    top: 50px;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: 1px solid #999;
                    cursor: pointer;
                    &:hover{
                        opacity: .8;
                    }
                }
                input:checked+label {
                    background-color: #222;
                    border: 1px solid #222;
                }

                input:checked+label::after {
                    position: absolute;
                    content: "";
                    width: 5px;
                    height: 10px;
                    top: 3px;
                    left: 6px;
                    border: 2px solid #fff;
                    border-top: none;
                    border-left: none;
                    transform: rotate(45deg)
                }
            }
            .order-info{
                // padding: 25px;
                // border-bottom: 6px solid #eeeeee;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-family: Roboto-Regular;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #999999;
                line-height: 48px;

                span{
                    color: #666;
                }
                .i-price{
                    font-family: AcuminPro-Bold;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #222222;

                    span{
                        color: #222;
                    }
                }
            }
        }
        .s-fd{
            width: 100%;
            height: 73px;
            background-color: #fff;
            border-top: 1px solid #eee;
            position: absolute;
            bottom: 0;
            .f-btn{
                width: 200px;
                height: 40px;
                background-color: #222;
                border-radius: 2px;
                color: #fff;
                text-align: center;
                float: right;
                margin-right: 25px;
                margin-top: 15px;
                line-height: 40px;
                cursor: pointer;
                font-family: SlatePro-Medium;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #ffffff;
                &:hover{
                    opacity: .8;
                }
            }
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
    .statusColor{
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin: 7px 4px 0 0;
    }
</style>