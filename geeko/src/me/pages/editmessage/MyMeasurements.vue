<template>
    <div class="my-measurements-page">
        <!-- 标题 -->
        <nav-bar>
            <i class="iconfont el-back-font" slot="left" @click="$router.go(-1)">&#xe693;</i>
            <span slot="center">{{$t("measurements.mea_title")}}</span>
        </nav-bar>

        <div class="line">
            <!-- 输入框 -->    
            <m-input title="Height" :slotList="slotList" :inputData="inputData" @onchange="inputChange"></m-input>
        </div>

        <!-- 说明文字 -->
        <div class="m-m-page-info">
            <div class="m-m-info-title">{{infoPart.title}}</div>
            <div class="m-m-info-content-box">
                <div class="m-m-page-info-text-box">
                
                    <div v-for="(item, index) in infoPart.infoList" :key="index" class="m-m-info-content">
                        <div class="m-m-info-content-title">{{item.infoTitle}}</div>
                        <div class="m-m-info-content-txt">{{item.infoContent}}</div>
                    </div>
                </div>
                <div class="m-m-page-info-img">
                    <img :src="infoPart.imageUrl" alt="">
                </div>
            </div>
            
        </div>

        <!-- save按钮 -->
        <div class="footer-btn">
            <div class="saveBtn" @click="saveData">
                {{$t("label.save")}}
            </div>
        </div>

        <points-reminder-modal :reminderMessage="reminderMessage" @onClose="() =>this.reminderMessage=null" v-if="!!reminderMessage" />

        <loading v-if="isLoadingShow"></loading>
    </div>
</template>

<style scoped lang="scss">
    .my-measurements-page{
        padding-bottom: 35%;
    }

    @font-face {
        font-family: 'iconfont';  /* Project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_hyeeafv2ple.woff2?t=1627626329519') format('woff2'),
            url('//at.alicdn.com/t/font_384296_hyeeafv2ple.woff?t=1627626329519') format('woff'),
            url('//at.alicdn.com/t/font_384296_hyeeafv2ple.ttf?t=1627626329519') format('truetype');
    }
    .line{
        width: 100%;
        border-top: 1px solid #f5f5f5;
        border-bottom: 10px solid #f5f5f5;
    }
    .m-m-page-info{
        height: 230px;
        width: 92%;
        margin: 0 auto;
        margin-top: 22px;
        
        & > .m-m-info-title{
            font-family: Roboto-Bold;
            font-size: 14px;
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
                font-size: 12px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #222222;
                padding-right: 20px;
                margin-bottom: 23px;

                & > .m-m-info-content{
                    margin-bottom: 24px;

                    & > .m-m-info-content-txt{
                        font-family: Roboto-Regular;
                        font-size: 12px;
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
                align-items: center;
                justify-content: center;

                & > img {
                    width: 60%;
                    object-fit: contain;
                    max-height: 200px;
                }
            }
        }
    }

    .saveBtn{
        width: 92%;
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
        margin: 0 auto;
        margin-top: 40px;
        transition: all 0.1s;
        padding-bottom: 20px;
    }
    .saveBtn:active{
        background-color: rgba(35,35,35,0.6);
    }
    
    .footer-btn{
        width: 100%;
        position: fixed;
        bottom: 51px;
        left: 0px;
        right: 0px;
        text-align: center;
        padding: 0px 13px 20px 13px;
        background-color: #ffffff;
    }
    
</style>

<script>
    import NavBar from '../../components/nav-bar.vue';
    import MMSelect from '../../components/editmessage/m-m-select.vue';
    import MMInput from "../../components/editmessage/m-m-input.vue";
    import store from "../../../store/index";
    import {mapGetters, mapActions} from 'vuex';
    import PointsReminderModal from "../../../components/modal/points-reminder-modal.vue"

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
                                slotType: "input", // input & checkbox
                                slotDefaultV: "", // 默认值
                                slotCheckList: [], // 如果type是checkbox需要这个不为空
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
                                slotType: "checkbox", // input & checkbox
                                slotDefaultV: "", // 默认值
                                slotCheckList: [this.$t("measurements.mea_true_to_size"),this.$t("measurements.mea_large"),this.$t("measurements.mea_small")], // 如果type是checkbox需要这个不为空
                                slotInputType: "", // 控制input框的输入类型
                                slotSize: "large", // primary为固定54px宽，large为父容器宽度
                            }
                        ]
                    },

                ],
                submitData: {},
                infoPart: {
                    title: this.$t("measurements.mea_mea_how"),
                    imageUrl: "https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/chicme/2021-08-11/2021-08-11-select-body.png",
                    infoList: [
                        {
                            infoTitle: this.$t("measurements.mea_bust"),
                            infoContent: this.$t("measurements.mea_bust_txt")
                        },
                        {
                            infoTitle: this.$t("measurements.mea_waist"),
                            infoContent: this.$t("measurements.mea_waist_txt")
                        },
                        {
                            infoTitle: this.$t("measurements.mea_your_hips"),
                            infoContent: this.$t("measurements.mea_hips_txt")
                        }
                    ]
                },
                testShow: true,
                isLoadingShow:false,
                inputData:{},
                sizingList: ["True to size","Large","Small"],
                reminderMessage:null
            }
        },
        computed:{
            ...mapGetters('me', [
                'me'
            ]),
            defaultV:function(){
                return this.checkList.length > 0 ? this.checkList[0] : " "
            },
        },
        watch:{

        },
        created:function(){
           this.getData()
        },
        mounted(){
             
        },
        methods:{
            inputChange(value){
                // console.log(this.inputData)
                // console.log(value)
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
                        } else if((item == "sizingRecommendation") && this.slotList[i].slotTitle == this.$t("measurements.mea_perference") ){
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
                    if(item == this.$t("measurements.mea_perference")){
                        /**
                         * this.submitData['What is your preference?']['select'] == "True to size" ? 0 :
                                                        this.submitData['What is your preference?']['select'] == "Large" ? 1 : 2;
                         */
                        final['sizingRecommendation'] = this.sizingList.indexOf(this.submitData[this.$t("measurements.mea_perference")]["select"]);
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

                store.dispatch("me/updateCustomerSave", obj).then(prompt => {
                    // this.$router.go(-1);
                    this.isLoadingShow = false;
                    if(prompt?.html){
                        this.reminderMessage =prompt.html;
                    }else{
                        this.$toast({
                            content:"Update success!",
                            type:"success",
                            timer:2000,
                            style1:{
                                backgroundColor:"#ffffff",
                                color:"#222222",
                                padding:"15px 10px",
                                borderRadius:"5px",
                                boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.2)",
                                bottom:"300px"
                            }
                        }).show();
                    }
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
                        } else if(type === "checkbox"){
                            let selectChild = this.slotList[i]['slotList'][j]['slotDefaultV'] ?
                                            this.slotList[i]['slotList'][j]['slotDefaultV'] :
                                            this.slotList[i]['slotList'][j]['slotCheckList'].length > 0 ? 
                                            this.slotList[i]['slotList'][j]['slotCheckList'][0] : ""
                            data[title]["select"] = selectChild;
                        }
                    }
                }
                // console.log(data)
                this.inputData = data;
            }
        },
        components:{
            "nav-bar": NavBar,
            "m-select": MMSelect,
            "m-input": MMInput,
            "points-reminder-modal":PointsReminderModal
        }
    }
</script>