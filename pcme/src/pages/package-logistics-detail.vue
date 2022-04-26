<template>
    <div class="detailCon">
        <h2>Details</h2>
        <div>
            <h4>{{$t("logisticsInfo")}}</h4>
            <div class="info" >
                <p v-if="packagelogistics.slug"><span>{{$t("logisticsCompany")}}: </span>{{packagelogistics.slug}}</p>
                <p v-if="packagelogistics.trackingNumber">
                    <span>{{$t("tracknum")}}: </span>
                    <span>{{packagelogistics.trackingNumber}}</span>
                    <span 
                        class="iconfont tag-read"
                        style="cursor: pointer;"
                        :data-clipboard-text="packagelogistics.trackingNumber" 
                        @click="onCopy"
                    >&#xe776;</span>
                </p>
            </div>
        </div>
        <div class="logisticsinfo">
            <h4 v-if="packagelogistics.statusView">{{$t("currentStataus")}}: {{packagelogistics.statusView}}</h4>
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
    import Clipboard from 'clipboard';

    export default {
        data(){
            return {
                isActive:0,
                changePackage:[],
                isloding:true,
                showMessage:false
            }
        },
        components: {
            'loding':loding
        },
        computed:{
            ...mapGetters(['packagelogistics']),
            logisticslist(){
                let logList = [];
                if(this.packagelogistics && this.packagelogistics.destinPoints){
                    logList =_.cloneDeep(this.packagelogistics.destinPoints)
                }
                if(this.packagelogistics && this.packagelogistics.originPoints){
                    logList = logList.concat(this.packagelogistics.originPoints)
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
            onCopy(){
                let clipboard = new Clipboard('.tag-read');
                clipboard.on('success', e => {
                    console.log('e', e)
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
            this.$store.dispatch('getPackageLogistics',{type:this.$route.query.type,packageId:this.$route.query.packageid}).then(()=>{
                this.isloding = false
            }).catch((result) => {
                console.log(result);
                this.isloding = false;
            })
        }
    }
</script>

<style scoped lang="scss">
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
        width: 1150px;
        margin: 0 auto;
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