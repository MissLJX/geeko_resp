<template>
    <div class="index-order-container">
        <div class="_hd st-table st-fullwidth">
            <div class="st-cell st-v-m">{{$t("myorders")}}</div>
            <div class="st-cell st-v-m st-t-r" @click="changeOrdStatus('0')">
                {{$t("index.view_all")}} >
            </div>
        </div>

        <div class="_bd">
            <a href="/" @click.prevent="changeOrdStatus('1')">
                <p class="iconfont">
                    <span>&#xe6df;</span>
                    <span 
                        class="_count" 
                        :class="{'special-count' : orderCountUnpaid && orderCountUnpaid < 10}"
                        v-if="getOrderNum(orderCountUnpaid)"
                    >{{getOrderNum(orderCountUnpaid)}}</span>
                </p>
                <p>{{$t("unpaid")}}</p>
            </a>
            <a href="/" @click.prevent="changeOrdStatus('3')">
                <p class="iconfont">
                    <span>&#xe6e0;</span>
                    <span class="_count"
                        :class="{'special-count' : feed && feed.awaitingDeliveryCount < 10}"
                        v-if="getOrderNum(feed && feed.awaitingDeliveryCount)"
                    >
                        {{getOrderNum(feed && feed.awaitingDeliveryCount)}}
                    </span>
                </p>
                <p>{{$t("processing")}}</p>
            </a>
            <a href="/" @click.prevent="changeOrdStatus('4')">
                <p class="iconfont">
                    <span>&#xe6e4;</span>
                    <span 
                        class="_count"
                        :class="{'special-count' : feed && feed.orderShippedCount < 10}"
                        v-if="getOrderNum(feed && feed.orderShippedCount)"
                    >{{getOrderNum(feed && feed.orderShippedCount)}}</span>
                </p>
                <p>{{$t("ordershipped")}}</p>
            </a>
            <a href="/" @click.prevent="changeOrdStatus('5')">
                <p class="iconfont">
                    <span>&#xe6de;</span>
                    <span 
                        class="_count"
                        :class="{'special-count' : feed && feed.orderAwaitingReviewCount < 10}"
                        v-if="getOrderNum(feed && feed.orderAwaitingReviewCount)"
                    >{{getOrderNum(feed && feed.orderAwaitingReviewCount)}}</span>
                </p>
                <p>{{$t("review")}}</p>
            </a>
            <!-- <a href="/" class="not-mar" @click.prevent="changeOrdStatus('6')">
                <p class="iconfont">
                    <span>&#xe6e3;</span>
                    <span 
                        class="_count"
                        :class="{'special-count' : feed && feed.orderCancelCount < 10}"
                        v-if="getOrderNum(feed && feed.orderCancelCount)"
                    >{{getOrderNum(feed && feed.orderCancelCount)}}</span>
                </p>
                <p>{{$t("index.returns")}}</p>
            </a> -->
        </div>
    </div>
</template>

<script>
    import { mapGetters,mapActions } from "vuex"
    import _ from "lodash"
    import * as utils from "../../utils/geekoutil.js"

    export default {
        name:"IndexOrderContainer",
        props:{
            feed:{
                type:Object,
                default:() => {
                    return {}
                }
            }
        },
        computed:{
            ...mapGetters(["orderStatus"]),
            orderCountUnpaid(){
                return this.$store.getters.orderCountUnpaid;
            }
        },
        methods:{
            ...mapActions(["changeOrderStatus"]),
            getOrderNum(num){
                return num > 0 ? num : "";
            },
            changeOrdStatus(status){
                this.changeOrderStatus(_.toNumber(status));
                this.$router.push(utils.PROJECT + "/me/m/order");
            }
        },
        created:function(){
            this.$store.dispatch('getOrderCountUnpaid');
        }
    }
</script>

<style scoped lang="scss">
    .index-order-container{
        ._hd{
            padding: 0px 20px;
            & > div{
                &:first-child{
                    font-family: 'AcuminPro-Bold';
                    font-size: 18px;
                    color: #000000;
                }

                &:last-child{
                    font-size: 14px;
                    color: #666666;
                    cursor: pointer;
                }
            }
        }

        ._bd{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 25px;
            
            & > a{
                color: #222222;
                display: inline-block;
                width: calc(25% - 10px);
                text-align: center;

                & > p{
                    &:first-child{
                        font-size: 20px;
                        position: relative;
                    }

                    &:last-child{
                        font-size: 12px;
                        color: #000000;
                        margin-top: 4px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
            .not-mar{
                margin-bottom: 0px;
            }

            ._count{
                position: absolute;
                background-color: #e64545;
                top: -10px;
                left: 57%;
                color: #fff;
                padding: 2px 4px;
                border-radius: 50%;
                text-align: center;
                font-size: 12px;
            }

            .special-count{
                padding: 1px 7px;
            }
        }
    }
</style>