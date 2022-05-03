<template>
    <div class="datail">
        <div class="detailHd" v-if="method==='orderlist'">
            <p style="text-transform:capitalize"><span @click="window.location.href = '/'">{{$t('home')}}</span><router-link :to="getUrl('/me/m')"> > {{$t('me')}}</router-link><router-link :to="getUrl('/me/m/order')"> > {{$t('myorders')}}</router-link> > {{$t('trackinfo')}}</p>
        </div>
        <div class="detailHd" v-if="method==='ordertracking'">
            <p style="text-transform:capitalize"><span @click="window.location.href = '/'">{{$t('home')}}</span><a href = "/fs/shipping-guid">> Order Tracking</a> > {{$t('trackinfo')}}</p>
        </div>
        <div class="detailHd" v-if="method==='ordercode'">
            <p style="text-transform:capitalize"><span @click="window.location.href = '/'">{{$t('home')}}</span><span  @click="$router.back(-1)">> Order Detail</span> > {{$t('trackinfo')}}</p>
        </div>
        <div class="detailCon">
            <h2>{{$t('trackinfo')}}</h2>
            <div class="delivery-tip" v-if="deliveryTip">
                {{deliveryTip}}
            </div>
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
                    <p v-if="changePackage.trackingNumber">
                        <span>{{$t('tracknum')}}: </span>
                        <span>{{changePackage.trackingNumber}}</span>
                        <span 
                            class="iconfont tag-read"
                            style="cursor: pointer;"
                            :data-clipboard-text="changePackage.trackingNumber" 
                            @click="onCopy"
                        >&#xe776;</span>
                    </p>
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

        <div class="success_box" v-if="showMessage">  
            <div class="iconfont _icon">&#xe6b7;</div>
            <div class="_font">{{$t('label.copy_complate')}}</div>
        </div>

        <loding v-if="isloding"></loding>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import * as utils from '../utils/geekoutil';
    import _ from 'lodash';
    import loding from '../components/loding.vue';
    import {getMessage} from '../api/index';
    import Clipboard from 'clipboard';

    export default {
        data(){
            return {
                isActive:0,
                changePackage:[],
                isloding:true,
                method:'',
                deliveryTip: '',
                showMessage:false
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
            },
            getUrl(suffix){
                return utils.PROJECT + suffix;
            },
            onCopy(){
                let clipboard = new Clipboard('.tag-read');
                clipboard.on('success', e => {
                    // console.log('e', e)
                    // alert('Content copied!')
                    this.showMessage = true;

                    setTimeout(() =>{
                        this.showMessage = false;
                    },2000);
                    clipboard.destroy()
                })

                clipboard.on('error', e => {
                    alert('Failed to copy texts')
                    clipboard.destroy()
                })
            }
        },
        created(){
            this.$store.dispatch('getLogistics',this.$route.query.orderid).then(()=>{
                this.method = this.$route.query.method
                this.isloding = false
            }).catch((result) => {
                console.log('getLogistics报错: ',result);
                this.isloding = false;
            })
            getMessage("M1645").then(res=>{
                // console.log(res)
                if(res && res.message){
                    this.deliveryTip = res.message
                }
            })
        }
    }
</script>

<style scoped lang="scss">
    .delivery-tip{
        display: block;
        font-size: 12px;
        color: rgb(230,69,69);
        margin: 0px auto;
        text-align: left;
        background-color: #f6f6f6;
        padding: 12px;
        font-family: Roboto-Regular;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #e96060;
    }
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

    .success_box{
        width: 210px;
        height: 62px;
        background-color: #ffffff;
        box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        border-radius: 5px;
        position: fixed;
        top: calc(50% - 31px);
        left: calc(50% - 105px);
        font-family: 'SLATEPRO';
        font-size: 16px;
        color: #222222;
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;

        ._icon{
            font-size: 22px;
            color: #20b759;
            margin-right: 7px;
        }

        ._font{
            font-size: 14px;
            color: #222222;
            font-family: 'SlatePro-Medium';
            text-transform: capitalize;
        }
    }
    
</style>