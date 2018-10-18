<template>
    <div class="detailCon">
        <h2>{{$t('detail')}}</h2>
        <h4>Logistics Information</h4>
        <div class="info" v-if="logistics">
            <p><span>Logistics Company: </span>{{logistics.slug}}</p>
            <p><span>Tracking Number: </span>{{logistics.trackingNumber}}</p>
        </div>
        <div class="logisticsinfo" v-if="logistics">
            <h4>Current Stataus: {{getStatus}}</h4>
            <ul class="logisticslist" v-for="(item,index) in logisticslist">
                <li :class="{'btxt':index === 0}">
                    <span :class="{'activebgball':index===0,'bgball':index!==0}"></span>
                    <span class="time">{{getDate(item.checkpointTime)}}</span>
                    <span v-if="item.location">【{{item.location}}】</span>
                    <span v-if="item.message">{{item.message}}</span>
                </li>
                <li v-if="index !== logisticslist.length - 1">
                    <span class="bgline"></span>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>
    import {mapGetters} from 'vuex';
    import * as utils from '../utils/geekoutil';

    export default {
        data(){
            return {

            }
        },
        computed:{
            ...mapGetters(['logistics']),
            getStatus(){
                if(this.logistics && this.logistics.status){
                    let label = '';
                    switch (this.logistics.status) {
                        case '0':
                            label = 'Not Found'
                            break
                        case '10':
                            label = 'In transit'
                            break
                        case '20':
                            label = 'Transport overtime'
                            break
                        case '30':
                            label = 'Waiting for delivery'
                            break
                        case '35':
                            label = 'Undelivered'
                            break
                        case '39':
                            label = 'Tracking Finished'
                            break
                        case '40':
                            label = 'Delivered'
                            break
                        case '50':
                            label = 'Tracking Exception'
                            break
                        default:
                            label = ''
                            break
                    }
                    return label
                }
            },


            logisticslist(){
                if(this.logistics && this.logistics.originPoints){
                    return this.logistics.originPoints.reverse()
                }
            }
        },
        methods:{
            getDate(paymentTime){
                if(paymentTime == null){
                    return ''
                }
                return utils.enTime(new Date(paymentTime))
            },
        },
        created(){
            this.$store.dispatch('getLogistics',this.$route.query.orderid)
        }
    }
</script>

<style scoped lang="scss">
    .detailCon{
        width: 1150px;
        margin: 0 auto;
        padding-top: 24px;
        h2 {
            margin-top: 63px;
            margin-bottom: 20px;
        }
        h4 {
            margin: 24px 0;
        }
        .info{
            border-bottom: 1px solid #cacaca;
            padding-bottom: 30px;
            p{
                font-size: 14px;
                color: #222;
                line-height: 30px;
                span{
                    color: #666;
                }
            }
        }

        .logisticsinfo{
            padding-top: 50px;
            ul{
                li{
                    line-height: 20px;
                    span{
                        color: #999;
                    }
                    .time{
                        margin-right: 25px;
                    }
                }
                .bgball{
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background-color: #cacaca;
                    margin-right: 10px;
                }
                .activebgball{
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background-color: #57b936;
                    margin-right: 7px;
                    position: relative;
                    left: -2px;
                }
                .bgline{
                    width: 2px;
                    height: 50px;
                    border: 1px dashed #cacaca;
                    margin-left: 3px;
                }
            }
        }
        .btxt{
            span{
                color: #222 !important;
            }
        }
    }

</style>