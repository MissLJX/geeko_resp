<template>
    <div class="datail">
        <div class="detailHd" v-if="method==='orderlist'">
            <p style="text-transform:capitalize"><span @click="window.location.href = '/'">{{$t('home')}}</span><router-link to="/me/m"> > {{$t('me')}}</router-link><router-link to="/me/m/order"> > {{$t('myorders')}}</router-link> > {{$t('trackinfo')}}</p>
        </div>
        <div class="detailHd" v-if="method==='ordertracking'">
            <p style="text-transform:capitalize"><span @click="window.location.href = '/'">{{$t('home')}}</span><a href = "/fs/shipping-guid">> Order Tracking</a> > {{$t('trackinfo')}}</p>
        </div>
        <div class="detailHd" v-if="method==='ordercode'">
            <p style="text-transform:capitalize"><span @click="window.location.href = '/'">{{$t('home')}}</span><span  @click="$router.back(-1)">> Order Detail</span> > {{$t('trackinfo')}}</p>
        </div>
        <div class="detailCon">
            <h2>{{$t('trackinfo')}}</h2>
            <ul v-if="logistics && logistics.packages" class="packageTab">
                <li class="tab" @click="changeTab(key)" :class="{'active': key===isActive}" v-for="(item,key) in logistics.packages" :key="key">
                    {{item.name}}{{trackName}}
                </li>
            </ul>
            <ul class="package-imgs" v-if="changePackage && changePackage.products">
                <li v-for="product in changePackage.products">
                    <img :src="product.imageURL">
                </li>
            </ul>
            <div v-if="changePackage.trackingId">
                <h4>{{$t('logisticsInfo')}}</h4>
                <div class="info" >
                    <p v-if="changePackage.slug"><span>{{$t('logisticsCompany')}}: </span>{{changePackage.slug}}</p>
                    <p v-if="changePackage.trackingNumber"><span>{{$t('tracknum')}}: </span>{{changePackage.trackingNumber}}</p>
                    <P v-if="changePackage.logisticsSupplierWebsiteURL"><span>{{$t('trackingDetailInfo')}}: </span><a style="text-decoration: underline" :href="changePackage.logisticsSupplierWebsiteURL">{{changePackage.logisticsSupplierWebsiteURL}}</a></P>
                </div>
            </div>
            <div class="logisticsinfo" v-if="changePackage.trackingId">
                <h4 v-if="changePackage.trackingStatusView">{{$t('currentStatus')}}: {{changePackage.trackingStatusView}}</h4>
                <ul class="logisticslist" v-for="(item,key) in logisticslist">
                    <li :class="{'btxt':key === 0}">
                        <span :class="{'activebgball':key===0,'bgball':key!==0}"></span>
                        <span class="time">{{getDate(item.checkpointTime)}}</span>
                        <span v-if="item.location">【{{item.location}}】</span>
                        <span v-if="item.message">{{item.message}}</span>
                    </li>
                    <li v-if="key !== logisticslist.length - 1">
                        <span class="bgline"></span>
                    </li>
                </ul>
            </div>
        </div>
        <loding v-if="isloding"></loding>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import * as utils from '../utils/geekoutil';
    import _ from 'lodash';
    import loding from '../components/loding.vue';

    export default {
        data(){
            return {
                isActive:0,
                changePackage:[],
                isloding:true,
                method:''
            }
        },
        components: {
            'loding':loding
        },
        computed:{
            ...mapGetters(['logistics']),
            trackName(){
                this.isActive = 0;
                this.changePackage=_.cloneDeep(this.logistics.packages[0])
            },
            logisticslist(){
                let logList = [];

                if(this.changePackage && this.changePackage.destinPoints){
                    logList =_.cloneDeep(this.changePackage.destinPoints)
                }
                if(this.changePackage && this.changePackage.originPoints){
                    logList = logList.concat(this.changePackage.originPoints)
                }
                return logList.reverse()
            }
        },
        methods:{
            getDate(paymentTime){
                if(paymentTime == null){
                    return ''
                }
                return utils.enTime(new Date(paymentTime))
            },
            changeTab(index){
                this.isActive = index;
                this.changePackage = _.cloneDeep(this.logistics.packages[index])
            }
        },
        created(){
            this.$store.dispatch('getLogistics',this.$route.query.orderid).then(()=>{
                this.method = this.$route.query.method
                this.isloding = false
            }).catch((result) => {
                console.log(result);
                this.isloding = false;
            })
        }
    }
</script>

<style scoped lang="scss">
    .datail{
        width: 1140px;
        margin: 0 auto;
        .detailHd{
            font-size: 14px;
            color: #666;
            padding:30px 0 0 0;
            p{
                span{
                    cursor: pointer;
                }
                a{
                    color:#666;
                }
            }
        }
    }
    .package-imgs{
        display: flex;
        padding-top: 28px;
        img{
            display: inline-block;
            width:81px;
            height: 108px;
            margin-right: 11px;
        }
    }
    .packageTab{
        height: 45px;
        line-height: 45px;
        display: flex;
        margin-left: -10px;
        border-bottom: 1px solid #f5f5f5;
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
    .detailCon{
        width: 1000px;
        margin: 0 auto;
        h2 {
            margin-top: 63px;
            margin-bottom: 20px;
        }
        h4 {
            margin: 15px 0;
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
            padding-top: 18px;
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