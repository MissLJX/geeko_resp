<template>
    <div class="detailCon">
        <h2>Details</h2>
        <div>
            <h4>{{$t("logisticsInfo")}}</h4>
            <div class="info" >
                <p v-if="packagelogistics.slug"><span>{{$t("logisticsCompany")}}: </span>{{packagelogistics.slug}}</p>
                <p v-if="packagelogistics.trackingNumber"><span>{{$t("tracknum")}}: </span>{{packagelogistics.trackingNumber}}</p>
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
                isloding:true
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
            }
        },
        created(){
            this.$store.dispatch('getPackageLogistics',{type:this.$route.query.type,packageId:this.$route.query.packageid}).then(()=>{
                this.isloding = false
            }).catch((result) => {
                console.log('getPackageLogistics报错: ', result);
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

</style>