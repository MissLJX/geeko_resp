<template>
    <div class="selectOrder" >
        <div class="s-hd">
            <h3 @click="close"><i class="iconfont">&#xe693;</i>{{$t('selectorder')}}</h3>
        </div>
        <div class="s-bd" ref="viewBox">
            <geeko-select @change="changeHandle" :items="tabList"/>
            <div v-for="(item,index) in orderMethod" class="item-order">
                <div class="order-hd">
                    <p><span>{{$t('orderno')}} </span>{{item.id}}</p>
                    <p><span class="statusColor" :style="{backgroundColor : status_color(item.status)}"></span><span>{{item.statusView}}</span></p>
                </div>
                <div class="img-con">
                    <input :id="index" type="radio" :value="item.id" v-model="pickedOrder" />
                    <label :for="index"></label>
                    <ul class="img-flex">
                        <li v-for="img in item.orderItems">
                            <img :src="img.productImageUrl"/>
                        </li>
                    </ul>

                </div>
                <div class="order-info">
                    <span>{{item.orderItems.length}} items</span>
                    <span>
                        {{$t('total')}} <span class="i-price">{{item.orderItems[0].price.unit}}{{item.orderItems[0].price.amount}}</span>
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
    import GeekoSelect from './geeko-select';
    import {mapGetters,mapActions } from 'vuex';
    import * as utils from '../utils/geekoutil';

    export default {
        data() {
            var tab = this.$route.name;
            return {
                orderMethod:null,
                ifloding:true,
                finished:false,
                isloded:false,
                tabList: [
                    {
                        label: 'All',
                        value: 'home-all',
                        selected: 'home-all' === tab
                    },
                    {
                        label: 'UNPAID',
                        value: 'home-unpaid',
                        selected: 'home-unpaid' === tab
                    },
                    {
                        label: 'PAID',
                        value: 'home-paid',
                        selected: 'home-paid' === tab
                    },
                    {
                        label: 'PROCESSING',
                        value: 'home-processing',
                        selected: 'home-processing' === tab
                    },
                    {
                        label: 'SHIPPED',
                        value: 'home-shipped',
                        selected: 'home-shipped' === tab
                    },
                    {
                        label: 'CONFIRMED',
                        value: 'home-confirmed',
                        selected: 'home-confirmed' === tab
                    },
                    {
                        label: 'CANCELED',
                        value: 'home-canceled',
                        selected: 'home-canceled' === tab
                    }
                ],
                isSelectOrder:'',
                pickedOrder:'',
                method:'home-all'
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
            this.$refs.viewBox.addEventListener('scroll',this.scrollHandle)
        },
        methods: {
            ...mapActions([
                'changeTab','getM1135','loadAll'
            ]),
            status_color(status) {
                return utils.STATUS_COLOR(status)
            },
            changeHandle(evt) {
                var tab = evt.target.value;
                this.changeList(tab);
            },

            changeList(tab) {
                this.method = tab
                if(this.isloded) {
                    this.isloded = false
                    if (tab === 'home-all') {
                        this.$store.dispatch('loadAll', 20).then(() => {
                            this.orderMethod = this.all
                            this.isloded = true
                        })
                    }
                    if (tab === 'home-unpaid') {
                        this.$store.dispatch('loadUnpaid', 20).then(() => {
                            this.orderMethod = this.unpaid
                            this.isloded = true
                        })
                    }
                    if (tab === 'home-processing') {
                        this.$store.dispatch('loadProcessing', 20).then(() => {
                            this.orderMethod = this.processing
                            this.isloded = true
                        })
                    }
                    if (tab === 'home-shipped') {
                        this.$store.dispatch('loadShipped', 20).then(() => {
                            this.orderMethod = this.shipped
                            this.isloded = true
                        })
                    }
                    if (tab === 'home-confirmed') {
                        this.$store.dispatch('loadConfirmed', 20).then(() => {
                            this.orderMethod = this.confirmed
                            this.isloded = true
                        })
                    }
                    if (tab === 'home-canceled') {
                        this.$store.dispatch('loadCanceled', 20).then(() => {
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
                if(this.pickedOrder){
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
            'geeko-select': GeekoSelect
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
            background-color: #efefef;
            text-align: left;
            padding-left: 25px;
            position: absolute;
            top: 0;
            right: 0;
            i{
                margin-right: 20px;
                cursor: pointer;
            }
            h3{
                line-height: 50px;
                font-size: 18px;
            }
        }
        .s-bd{
            background-color: #fff;
            max-height:calc(100vh - 125px);
            overflow-y: auto;
            .st-select{
                width: 452px;
                height: 40px;
                margin: 25px 14px;
                padding-left: 10px;
                background-color: #fff;
            }
            .order-hd{
                border-bottom: 1px solid #eee;
                text-align: left;
                padding: 0 24px;
                line-height: 50px;
                p{
                    line-height: 50px;
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

            .img-con{
                padding-left: 26px;
                padding-top: 16px;
                text-align: left;
                border-bottom: 1px solid #e6e6e6;
                padding-bottom: 17px;
                position: relative;
                line-height: 30px;
                .img-flex{
                    display: flex;
                    overflow-x: auto;
                    margin-left: 10px;
                    img{
                        width: 120px;
                        height: 160px;
                        margin-left: 10px;
                    }
                }
                input[type="radio"] {
                    width: 20px;
                    height: 20px;
                    opacity: 0;
                }

                label {
                    position: absolute;
                    left: 20px;
                    top: 60px;
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
                text-align: right;
                font-size: 16px;
                padding: 25px;
                border-bottom: 6px solid #eeeeee;
                span{
                    color: #666;
                }
                .i-price{
                    color: #222;
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
                background-color: #e7004d;
                border-radius: 2px;
                color: #fff;
                text-align: center;
                font-size: 16px;
                float: right;
                margin-right: 25px;
                margin-top: 15px;
                line-height: 40px;
                cursor: pointer;
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