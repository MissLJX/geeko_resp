<template>
    <div class="my-measurements-page">
        <!-- 标题 -->
        <!-- <nav-bar>
            <i class="iconfont el-back-font" slot="left" @click="$router.go(-1)">&#xe693;</i>
            <span slot="center">My Measurements</span>
        </nav-bar> -->
        <div class="_hd">
            {{$t("index.my_measurements")}}
        </div>

        <!-- 页面介绍 -->
        <div class="pageInfo">
            <p>{{$t("measurements.mea_info1")}}</p> 
            <p>{{$t("measurements.mea_info2")}}</p> 
            <p>{{$t("measurements.mea_info3")}}</p> 
        </div>

        <div class="contentBox">
            <div class="content_left">
                <div class="line">
                    <!-- 输入框 -->    
                    <m-input title="Height" :slotList="slotList" :inputData="inputData" @onchange="inputChange"></m-input>
                </div>
                <!-- save按钮 -->
                <div class="footer-btn">
                    <div class="saveBtn" @click="saveData">
                        {{$t("label.save")}}
                    </div>
                </div>
            </div>
            
            <!-- 说明文字 -->
            <div class="m-m-page-info">
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

        <loading v-if="isLoadingShow"></loading>
    </div>
</template>

<style scoped lang="scss">
    .my-measurements-page{
        padding-bottom: 90px;
        .contentBox{
            display: flex;
            align-items: flex-start;
            justify-content: center;
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
            font-family: Roboto-Bold;
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
            align-items: flex-start;

            & > .m-m-page-info-text-box{
                width: 70%;
                font-family: Roboto-Regular;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #222222;
                padding-right: 20px;
                margin-bottom: 23px;

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
                width: 30%;
                height: 211px;
                display: flex;
                align-items: flex-start;
                justify-content: center;

                & > img {
                    width: 60%;
                    object-fit: contain;
                    max-height: 305px;
                }
            }
        }
    }

    .saveBtn{
        width: 300px;
        text-transform: uppercase;
        height: 42px;
        font-family: Roboto-Bold;
        font-size: 14px;
        font-weight: 600;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        background-color: #222;
        text-align: center;
        line-height: 42px;
        /* margin: 0 auto; */
        margin-top: 100px;
        transition: all 0.1s;
        padding-bottom: 20px;
    }
    .saveBtn:active{
        background-color: rgba(35,35,35,0.6);
    }
    
    .footer-btn{
        // width: 100%;
        // position: fixed;
        // bottom: 51px;
        // left: 0px;
        // right: 0px;
        // text-align: center;
        // padding: 0px 13px 20px 13px;
        // background-color: #ffffff;
    }
    
</style>

<script>
    // import NavBar from '../../components/nav-bar.vue';
    import MMSelect from '../../components/editmessage/m-m-select.vue';
    import MMInput from "../../components/editmessage/m-m-input.vue";
    import store from "../../store/index.js"
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name:"MyMeasurements",
        data(){
            return{
                size: "cm",
                checkList: ["cm","inch"],
                dataList:[1,2,3,4],
                isSelecting: false,
                slotList: [
                            {
                                slotTitle: this.$t("measurements.mea_height"), // 标题
                                slotList:[
                                    {
                                        slotType: "input", // input & checkbox
                                        slotDefaultV: "", // 默认值
                                        slotInputType: "number", // 控制input框的输入类型
                                        slotCheckList: [], // 如果type是checkbox需要这个不为空
                                        slotSize: "primary", // primary为固定54px宽，large为父容器宽度
                                    },
                                    {
                                        slotType: "checkbox", // input & checkbox
                                        slotDefaultV: "", // 默认值
                                        slotCheckList: [this.$t("measurements.mea_cm"),this.$t("measurements.mea_inch")], // 如果type是checkbox需要这个不为空
                                        slotInputType: "", // 控制input框的输入类型
                                        slotSize: "primary", // primary为固定54px宽，large为父容器宽度
                                    }
                                ]
                            },
                            {
                                slotTitle: this.$t("measurements.mea_weight"), // 标题
                                slotList:[
                                    {
                                        slotType: "input", // input & checkbox
                                        slotDefaultV: "", // 默认值
                                        slotInputType: "number", // 控制input框的输入类型
                                        slotCheckList: [], // 如果type是checkbox需要这个不为空
                                        slotSize: "primary", // primary为固定54px宽，large为父容器宽度
                                    },
                                    {
                                        slotType: "checkbox", // input & checkbox
                                        slotDefaultV: "", // 默认值
                                        slotCheckList: [this.$t("measurements.mea_kg"),this.$t("measurements.mea_lbs")], // 如果type是checkbox需要这个不为空
                                        slotInputType: "", // 控制input框的输入类型
                                        slotSize: "primary", // primary为固定54px宽，large为父容器宽度
                                    }
                                ]
                            },
                            {
                                slotTitle: this.$t("measurements.mea_bust_size"), // 标题
                                slotList:[
                                    {
                                        slotType: "input", // input & checkbox
                                        slotDefaultV: "", // 默认值
                                        slotInputType: "number", // 控制input框的输入类型
                                        slotCheckList: [], // 如果type是checkbox需要这个不为空
                                        slotSize: "primary", // primary为固定54px宽，large为父容器宽度
                                    },
                                    {
                                        slotType: "checkbox", // input & checkbox
                                        slotDefaultV: "", // 默认值
                                        slotCheckList: [this.$t("measurements.mea_cm"),this.$t("measurements.mea_inch")], // 如果type是checkbox需要这个不为空
                                        slotInputType: "", // 控制input框的输入类型
                                        slotSize: "primary", // primary为固定54px宽，large为父容器宽度
                                    }
                                ]
                            },
                            {
                                slotTitle: this.$t("measurements.mea_bra_size"), // 标题
                                slotList:[
                                    {
                                        slotType: "input", // input & checkbox
                                        slotDefaultV: "", // 默认值
                                        slotInputType: "number", // 控制input框的输入类型
                                        slotCheckList: [], // 如果type是checkbox需要这个不为空
                                        slotSize: "primary", // primary为固定54px宽，large为父容器宽度
                                    },
                                    {
                                        slotType: "checkbox", // input & checkbox
                                        slotDefaultV: "", // 默认值
                                        slotCheckList: ["A","AA","B","C","D","E","F"], // 如果type是checkbox需要这个不为空
                                        slotInputType: "text", // 控制input框的输入类型
                                        slotSize: "primary", // primary为固定54px宽，large为父容器宽度
                                    }
                                ]
                            },
                            {
                                slotTitle: this.$t("measurements.mea_waist"), // 标题
                                slotList:[
                                    {
                                        slotType: "input", // input & checkbox
                                        slotDefaultV: "", // 默认值
                                        slotInputType: "number", // 控制input框的输入类型
                                        slotCheckList: [], // 如果type是checkbox需要这个不为空
                                        slotSize: "primary", // primary为固定54px宽，large为父容器宽度
                                    },
                                    {
                                        slotType: "checkbox", // input & checkbox
                                        slotDefaultV: "", // 默认值
                                        slotCheckList: [this.$t("measurements.mea_cm"),this.$t("measurements.mea_inch")], // 如果type是checkbox需要这个不为空
                                        slotInputType: "", // 控制input框的输入类型
                                        slotSize: "primary", // primary为固定54px宽，large为父容器宽度
                                    }
                                ]
                            },
                            {
                                slotTitle: this.$t("measurements.mea_hips"), // 标题
                                slotList:[
                                    {
                                        slotType: "input", // input & checkbox
                                        slotDefaultV: "", // 默认值
                                        slotInputType: "number", // 控制input框的输入类型
                                        slotCheckList: [], // 如果type是checkbox需要这个不为空
                                        slotSize: "primary", // primary为固定54px宽，large为父容器宽度
                                    },
                                    {
                                        slotType: "checkbox", // input & checkbox
                                        slotDefaultV: "", // 默认值
                                        slotCheckList: [this.$t("measurements.mea_cm"),this.$t("measurements.mea_inch")], // 如果type是checkbox需要这个不为空
                                        slotInputType: "", // 控制input框的输入类型
                                        slotSize: "primary", // primary为固定54px宽，large为父容器宽度
                                    }
                                ]
                            },
                            {
                                slotTitle: this.$t("measurements.mea_perference"), // 标题
                                slotList:[
                                    {
                                        slotType: "radio", // input & checkbox & radio
                                        slotDefaultV: "", // 默认值
                                        slotCheckList: [this.$t("measurements.mea_true_to_size"),this.$t("measurements.mea_large"), this.$t("measurements.mea_small")], // 如果type是checkbox需要这个不为空
                                        slotInputType: "", // 控制input框的输入类型
                                        slotSize: "large", // primary为固定54px宽，large为父容器宽度
                                    }
                                ]
                            },

                        ],
                submitData: {},
                infoPart:{
                    title: this.$t("measurements.mea_how"),
                    imageUrl: "https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/chicme/2021-08-11/2021-08-11-select-body.png",
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
                testShow: true,
                isLoadingShow:false,
                inputData:{},
                sizingList: ["True to size","Large","Small"]
            }
        },
        computed:{
            ...mapGetters(['me']),
            defaultV:function(){
                return this.checkList.length > 0 ? this.checkList[0] : " "
            },
        },
        watch:{

        },
        created:function(){
           this.getData()
           console.log(this.$t("measurements.mea_height"))
        },
        mounted(){
             
        },
        methods:{
            inputChange(value){
                // console.log(this.inputData)
                console.log(value)
                // console.log(this.slotList);
                this.inputData = value;
                this.submitData = value;

                for(let i in this.slotList){
                    // console.log(this.slotList[i])
                    for(let item in value){
                        // console.log(item)
                        if(this.slotList[i].slotTitle === item){
                            // console.log(this.slotList[i])
                            for(let j = 0; j < this.slotList[i]['slotList'].length; j++){
                                if(this.slotList[i]['slotList'][j]['slotType'] == "checkbox"){
                                    this.slotList[i]['slotList'][j]['slotDefaultV'] = value[item]['select'];
                                } else if(this.slotList[i]['slotList'][j]['slotType'] == "input" && this.slotList[i]['slotList'][j]['slotInputType'] == "number"){
                                    this.slotList[i]['slotList'][j]['slotDefaultV'] = value[item]['number'];
                                } else {
                                    this.slotList[i]['slotList'][j]['slotDefaultV'] = value[item]['text'];
                                }
                            }
                        }
                    }
                }
                // console.log(this.slotList)
            },
            getData(){
                let result = this.me.mySizeInformation;
                for(let i = 0; i < this.slotList.length; i++){
                    for(let item in result){
                        if(item == this.slotList[i].slotTitle.split(" ")[0].toLocaleLowerCase()){
                            this.slotList[i].slotList[0].slotDefaultV = result[item]
                        } else if(item == this.slotList[i].slotTitle.split(" ")[0].toLocaleLowerCase()+"Unit"){
                            this.slotList[i].slotList[1].slotDefaultV = result[item]
                        } else if((item == "sizingRecommendation") && this.slotList[i].slotTitle == "What is your preference?" ){
                            this.slotList[i].slotList[0].slotDefaultV = this.sizingList[result[item]];
                        }
                    }
                }
                this.initInputData();
            },
            saveData(){
                // console.log(this.submitData)
                this.isLoadingShow = true;
                let final = {};
                for(let item in this.submitData){
                    // console.log(item)
                    if(item == "What is your preference?"){
                        /**
                         * this.submitData['What is your preference?']['select'] == "True to size" ? 0 :
                                                        this.submitData['What is your preference?']['select'] == "Large" ? 1 : 2;
                         */
                        final['sizingRecommendation'] = this.sizingList.indexOf(this.submitData["What is your preference?"]["select"]);
                    } else {
                        let key = item.split(" ")[0].toLocaleLowerCase();
                        final[key] = "";
                        final[key + "Unit"] = "";
                        for(let item1 in this.submitData[item]){
                            if(item1 == "number"){
                                final[key] = this.submitData[item][item1];
                            } else {
                                final[key + "Unit"] = this.submitData[item][item1];
                            }
                        }
                    }
                }
                // console.log(final)
                // return;
                let obj = {
                            "customer":{"mySizeInformation": final},
                            "name":"mySizeInformation"
                            }

                store.dispatch("updateCustomerSave", obj).then(res => {
                    this.isLoadingShow = false;
                })
            },
            initInputData(){
                // console.log("触发");
                let data = {};
                for(let i = 0; i < this.slotList.length; i++){
                    let title = this.slotList[i]['slotTitle'];
                    data[title] = {}
                    for(let j = 0; j < this.slotList[i]['slotList'].length; j ++){
                        let type = this.slotList[i]['slotList'][j]['slotType'];
                        // console.log(title,type)
                        if(type === "input"){
                            let inputType = this.slotList[i]['slotList'][j]['slotInputType'] ? 
                                            this.slotList[i]['slotList'][j]['slotInputType'] : "text";
                            let inputValue = this.slotList[i]['slotList'][j]['slotDefaultV'] ?
                                            this.slotList[i]['slotList'][j]['slotDefaultV'] : ""
                            data[title][inputType] = inputValue;
                        } else if(type === "checkbox" || type === "radio"){
                            let selectChild = this.slotList[i]['slotList'][j]['slotDefaultV'] ?
                                            this.slotList[i]['slotList'][j]['slotDefaultV'] :
                                            this.slotList[i]['slotList'][j]['slotCheckList'].length > 0 ? 
                                            this.slotList[i]['slotList'][j]['slotCheckList'][0] : ""
                            data[title]["select"] = selectChild;
                        }
                    }
                }
                console.log(data)
                this.inputData = data;
            }
        },
        components:{
            // "nav-bar": NavBar,
            "m-select": MMSelect,
            "m-input": MMInput,
        }
    }
</script>