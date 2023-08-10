<template>
    <div class="my-measurements-page">
        <div class="_hd">
            {{$t("index.my_measurements")}}
        </div>

        <!-- 页面介绍 -->
        <div class="pageInfo">
            <p>{{$t("measurements.mea_info4")}}</p>
            <p>{{$t("measurements.mea_info5")}}</p>
        </div>

        <div class="contentBox">
            <div class="content_left">
                <div class="line">
                    <!-- 输入框 -->
                    <mea-select
                        v-for="(item, index) in slotList"
                        :key="index"
                        :unitList="item.unitList || []"
                        :unit="item.unit"
                        :slotTitle="item.slotTitle"
                        :slotDefaultV="item.slotDefaultV"
                        :selectList="item.selectList"
                        :unitLabel="item.unitLabel"
                        :valueLabel="item.valueLabel"
                        @selectChange="(label, data) => selectChange(label, data)"
                        :isEditing="isEditing"
                        />
                </div>
            </div>

            <!-- 说明文字 -->
            <div class="m-m-page-info" v-show="isEditing">
                <div class="m-m-info-content-box">
                    <div class="m-m-page-info-img">
                        <img :src="infoPart.imageUrl" alt="">
                    </div>
                    <div class="m-m-page-info-text-box">
                        <div class="m-m-info-title">{{infoPart.title}}</div>
                        <div v-for="(item, index) in infoPart.infoList" :key="index" class="m-m-info-content">
                            <div class="m-m-info-content-title">{{item.infoTitle}}</div>
                            <div class="m-m-info-content-txt">{{item.infoContent}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- save按钮 -->
        <div class="footer-btn">
            <div v-show="!isEditing" class="saveBtn" @click="() => startEdit()">
                {{ $t("edit") }}
            </div>
            <div v-show="isEditing" class="saveBtn" @click="() => saveData()">
                {{ $t("save") }}
            </div>
            <div v-show="isEditing" class="saveBtn cancelBtn" @click="() => cancelFunc()">
                {{ $t("cancel") }}
            </div>
        </div>

        <loading v-if="isLoadingShow"></loading>
    </div>
</template>

<style scoped lang="scss">
    .my-measurements-page{
        padding-bottom: 90px;
        .contentBox{
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            min-height: 400px;
        }
    }
    ._hd{
        font-size: 24px;
        color: #222222;
        font-family: 'AcuminPro-Bold';
        text-align: center;
        margin-bottom: 42px;
    }
    .pageInfo{
        width: 888px;
        height: 72px;
        font-family: Roboto-Regular;
        font-size: 14px;
        /* font-weight: bold; */
        font-stretch: normal;
        line-height: 24px;
        letter-spacing: 0px;
        color: #000000;
        margin-bottom: 24px;
    }
    @font-face {
        font-family: 'iconfont';  /* Project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_hyeeafv2ple.woff2?t=1627626329519') format('woff2'),
            url('//at.alicdn.com/t/font_384296_hyeeafv2ple.woff?t=1627626329519') format('woff'),
            url('//at.alicdn.com/t/font_384296_hyeeafv2ple.ttf?t=1627626329519') format('truetype');
    }
    .line{
        width: 95%;
        // margin-right: 95px;
    }
    .m-m-page-info{
        height: 230px;
        width: 92%;
        margin: 0 auto;
        margin-top: 22px;
        
         .m-m-info-title{
            font-family: AcuminPro-Bold;
            font-size: 16px;
            font-weight: 600;
            font-stretch: normal;
            line-height: 15px;
            letter-spacing: 0px;
            color: #222222;
            margin-bottom: 15px;
        }

        & > .m-m-info-content-box{
            display: flex;
            justify-content: space-between;
            align-items: center;

            & > .m-m-page-info-text-box{
                width: 60%;
                font-family: Roboto-Regular;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #222222;
                padding-right: 20px;
                // margin-bottom: 23px;

                & > .m-m-info-content{
                    margin-bottom: 24px;
                    .m-m-info-content-title{
                        font-weight: bold;
                    }

                    & > .m-m-info-content-txt{
                        font-family: Roboto-Regular;
                        font-size: 14px;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 18px;
                        letter-spacing: 0px;
                        color: #222222;
                        margin-top: 3px;
                    }
                }
            }

            & > .m-m-page-info-img{
                width: 40%;
                // height: 211px;
                display: flex;
                align-items: flex-start;
                justify-content: center;

                & > img {
                    width: 60%;
                    object-fit: contain;
                    max-height: 400px;
                }
            }
        }
    }

    .footer-btn{
        display: flex;
        padding-left: 130px;
        margin-top:  100px;

        .saveBtn{
            width: 300px;
            text-transform: uppercase;
            height: 42px;
            font-family: AcuminPro-Bold;
            font-size: 14px;
            font-weight: 600;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #ffffff;
            background-color: #222;
            text-align: center;
            line-height: 42px;
            /* margin: 0 auto; */
            // margin-top: 100px;
            transition: all 0.1s;
            padding-bottom: 20px;
            cursor: pointer;
        }
        .saveBtn:active{
            background-color: rgba(35,35,35,0.6);
        }

        .cancelBtn{
            margin-left: 20px;
            background: #fff;
            color: #222;
            border: 1px solid #222;
        }
    }
</style>

<script>
    // import NavBar from '../../components/nav-bar.vue';
    import MMSelect from '../../components/editmessage/m-m-select.vue';
    import MMInput from "../../components/editmessage/m-m-input.vue";
    import store from "../../store/index.js"
    import {mapGetters, mapActions} from 'vuex';
    import loding from "../../components/loding.vue"
    import { getMessage } from '../../api';
    import { formateMeaData } from '../../utils/geekoutil';
    import MeaSelect from '../../components/editmessage/mea_select.vue';
    import data from '../../common'

    export default {
        name:"MyMeasurements",
        data(){
            return{
                infoPart:{
                    title: this.$t("measurements.mea_how"),
                    imageUrl: data.IMAGE_GEEKO_LTD + "/chicme/2021-08-11/2021-08-11-select-body.png",
                    infoList: [
                        {
                            infoTitle:this.$t("measurements.mea_bust"),
                            infoContent:this.$t("measurements.mea_bust_txt")
                        },
                        {
                            infoTitle:this.$t("measurements.mea_waist"),
                            infoContent:this.$t("measurements.mea_waist_txt")
                        },
                        {
                            infoTitle:this.$t("measurements.mea_your_hips"),
                            infoContent:this.$t("measurements.mea_hips_txt")
                        }
                    ]
                },
                isLoadingShow:false,
                haveDoneBefore: false,
                tipContent:'',
                tipPoints:'',

                isEditing: false, // 是否正在编辑
                meaData: '', // 配置项
                slotList: [],
                unitSelect: 'cm', // 选中的单位
                dataChange: false, // 数据是否被操作

            }
        },
        computed:{
            ...mapGetters(['me']),
        },
        created(){
           this.tipContent = "<div style='text-align: center;'><img src='https://image.geeko.ltd/chicme/2021111101/modal_points.png' alt='ModalPoints' style='width:50%;'><p style='font-weight:bold;font-size:24px;margin: 0;'>100 Points</p><p style='margin: 0;font-size: 12px;'><span>100 points = $1 USD.</span><a href='/policy/bonus-point' style='vertical-align: middle;'><img src='https://image.geeko.ltd/chicme/2021111101/question.png' alt='Question' style='width: 14px;height: 14px;'></a></p><p style='margin: 0;font-size: 12px;line-height: 12px;margin-top: 10px;font-family: Roboto-Regular'>Saved Successfully!</p><p style='margin: 0;font-size: 12px;font-family: Roboto-Regular;'>You’ve got <span style='color: #e64545;font-weight: bold;font-family: Roboto-Regular;'>100 points</span> in your account</p></div>"
           getMessage("M1813").then(res => {
            // console.log(res)
            if(res?.message){
                this.meaData = JSON.parse(res?.message)
                this.initSlotList()
            }
           })
        },
        mounted(){
        },
        methods:{
            initSlotList(){
                const initList = [
                    {...formateMeaData(this.meaData, 'height', this.$t)},
                    {...formateMeaData(this.meaData, 'weight', this.$t)},
                    {...formateMeaData(this.meaData, 'bust', this.$t)},
                    {...formateMeaData(this.meaData, 'bra', this.$t), type: 'normal',},
                    {...formateMeaData(this.meaData, 'waist', this.$t)},
                    {...formateMeaData(this.meaData, 'hips', this.$t)},
                    {
                        slotTitle: this.$t("measurements.mea_perf"), // 标题
                        selectList:[
                            this.$t("measurements.mea_true_to_size"),
                            this.$t("measurements.mea_large"),
                            this.$t("measurements.mea_small")
                        ],
                        valueLabel: 'sizingRecommendation',
                        type: 'normal',
                        slotDefaultV: '',
                        unit: '',
                    },
                ]
                this.slotList = initList
                // console.log('initSlotList: ', this.slotList)
                this.getData()
            },
            getData(){
                let result = this.me.mySizeInformation;
                console.log(result)
                if(result){
                    this.haveDoneBefore = true;
                } else {
                    this.haveDoneBefore = false;
                }
                for(let i = 0; i < this.slotList.length; i++){
                    for(let item in result){
                        if(item == this.slotList[i]?.['valueLabel']){
                            if(item === 'sizingRecommendation'){
                                this.slotList[i].slotDefaultV = this.slotList[i].selectList[result[item]]
                            } else {
                                this.slotList[i].slotDefaultV = result[item]
                            }
                        } else if (item == this.slotList[i]?.['unitLabel']){
                            this.slotList[i].unit = result[item]
                        }
                    }
                }
                console.log('slotList',this.slotList)
            },
            selectChange(label, data){
                this.dataChange = true
                let midList = this.slotList.slice(0)
                midList?.forEach((s) => {
                    if(s?.valueLabel == label){
                        if(label == 'bra'){
                            let strReg = /[A-Za-z]/g //判断数据是否存在字母
                            let numReg = /[0-9]/g
                            s.slotDefaultV = data?.match(numReg)?.join('')
                            s.unit = data?.match(strReg)?.join('')
                        } else {
                            s.slotDefaultV = data
                        }
                    } else if(s?.unitLabel == label){
                        s.unit = data
                        s.slotDefaultV = ''
                    }
                })
                // console.log(label, data, midList)
                this.slotList = midList
            },
            saveData(){
                if(!this.dataChange){
                    this.isEditing = false
                    return
                }
                let obj = {}
                let strReg = /[A-Za-z]/g //判断数据是否存在字母
                let numReg = /[0-9]/g
                this.slotList?.forEach(item => {
                    if(item?.['unit']){
                        obj[item?.unitLabel] = item.unit
                    }
                    if(item?.slotDefaultV || item?.slotDefaultV == 0){
                        if(item?.valueLabel == 'sizingRecommendation'){
                            obj[item?.valueLabel] = item.selectList.findIndex(s => s == item?.slotDefaultV)
                        } else if(strReg.test(item?.slotDefaultV)){
                            obj[item?.valueLabel] = item.slotDefaultV?.match(numReg)?.join('')
                            obj[item?.unitLabel] = item.slotDefaultV?.match(strReg)?.join('')
                        } else {
                            obj[item?.valueLabel] = item.slotDefaultV.toString()
                        }
                    }
                });
                let params = {
                    "customer":{"mySizeInformation": obj},
                    "name":"mySizeInformation"
                }
                store.dispatch("updateCustomerSave", params).then(res => {
                    this.isLoadingShow = false;
                    this.isEditing = false
                    if(this.haveDoneBefore){
                        this.showNormalTip()
                    } else {
                        if(res.prompt && res.prompt.html){
                            // let policyUrl = /(\/fs\/points-policy)/
                            // let text = res.prompt.html.indexOf('/policy/bonus-point') != -1 ? res.prompt.html.replace(policyUrl, '/policy/bonus-point-pc'): res.prompt.html
                            this.tipContent = res.prompt.html;
                        }
                        this.showPointsTip()
                        this.haveDoneBefore = true
                    }
                }).catch(err => {
                    alert(err?.result || err)
                    this.isLoadingShow = false;
                })
            },
            showNormalTip(){
                this.$store.dispatch("setTipContent", this.$t("update_success"));
                this.$store.dispatch("setShowTip", true);
                this.$store.dispatch("setTipType", '');
            },
            showPointsTip(){
                this.$store.dispatch("setTipContent", this.tipContent);
                this.$store.dispatch("setShowTip", true);
                this.$store.dispatch("setTipType", 'points');
            },
            cancelFunc(){
                this.getData()
                this.isEditing = false
            },
            startEdit(){
                this.isEditing = true
            }
        },
        components:{
            "m-select": MMSelect,
            "m-input": MMInput,
            "loading":loding,
            "mea-select": MeaSelect,
        }
    }
</script>