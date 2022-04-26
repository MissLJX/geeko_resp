<template>
    <div class="my-measurements-page">
        <!-- 标题 -->
        <nav-bar>
            <i class="iconfont el-back-font" slot="left" @click="$router.go(-1)">&#xe693;</i>
            <span slot="center">My Measurements</span>
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
        <div class="saveBtn" @click="saveData">
            save
        </div>
    </div>
</template>

<style scoped lang="scss">
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
    }
    .saveBtn:active{
        background-color: rgba(35,35,35,0.6);
    }
    
    
</style>

<script>
import NavBar from '../../components/nav-bar.vue';
import MMSelect from '../../components/m-m-select.vue';
import MMInput from "../../components/m-m-input.vue";

let list = [
    {
        slotTitle: "Height", // 标题
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
                slotCheckList: ["cm","inch"], // 如果type是checkbox需要这个不为空
                slotInputType: "", // 控制input框的输入类型
                slotSize: "primary", // primary为固定54px宽，large为父容器宽度
            }
        ]
    },
    {
        slotTitle: "Weight", // 标题
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
                slotCheckList: ["kg","lbs"], // 如果type是checkbox需要这个不为空
                slotInputType: "", // 控制input框的输入类型
                slotSize: "primary", // primary为固定54px宽，large为父容器宽度
            }
        ]
    },
    {
        slotTitle: "Bust Size", // 标题
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
                slotCheckList: ["cm","inch"], // 如果type是checkbox需要这个不为空
                slotInputType: "", // 控制input框的输入类型
                slotSize: "primary", // primary为固定54px宽，large为父容器宽度
            }
        ]
    },
    {
        slotTitle: "Bra Size", // 标题
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
        slotTitle: "Waist", // 标题
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
                slotCheckList: ["cm","inch"], // 如果type是checkbox需要这个不为空
                slotInputType: "", // 控制input框的输入类型
                slotSize: "primary", // primary为固定54px宽，large为父容器宽度
            }
        ]
    },
    {
        slotTitle: "Hips", // 标题
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
                slotCheckList: ["cm","inch"], // 如果type是checkbox需要这个不为空
                slotInputType: "", // 控制input框的输入类型
                slotSize: "primary", // primary为固定54px宽，large为父容器宽度
            }
        ]
    },
    {
        slotTitle: "What is your preference?", // 标题
        slotList:[
            {
                slotType: "checkbox", // input & checkbox
                slotDefaultV: "", // 默认值
                slotCheckList: ["True to size","Large", "small"], // 如果type是checkbox需要这个不为空
                slotInputType: "", // 控制input框的输入类型
                slotSize: "large", // primary为固定54px宽，large为父容器宽度
            }
        ]
    },

]

let infoPart = {
    title: "How to measure your body?",
    imageUrl: "https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/chicme/2021-08-11/2021-08-11-select-body.png",
    infoList: [
        {
            infoTitle:"1.Your bust",
            infoContent:"Measure the circumference over the fullest part of your breast."
        },
        {
            infoTitle:"2.Your waist",
            infoContent:"Measure your waist at the thinnest place."
        },
        {
            infoTitle:"3.Your hips",
            infoContent:"Measure the fullest part of your hips."
        }
    ]
}
export default {
    data(){
        return{
            size: "cm",
            checkList: ["cm","inch"],
            dataList:[1,2,3,4],
            isSelecting: false,
            slotList: list,
            submitData: {},
            infoPart,
            testShow: true,
        }
  },
    computed:{
        defaultV:function(){
            return this.checkList.length > 0 ? this.checkList[0] : " "
        },
        inputData:function(){
            let data = {};
            for(let i = 0; i < this.slotList.length; i++){
                let title = this.slotList[i]['slotTitle'];
                data[title] = {}
                for(let j = 0; j < this.slotList[i]['slotList'].length; j ++){
                    let type = this.slotList[i]['slotList'][j]['slotType'];
                    // console.log(title,type)
                    if(type === "input"){
                        let inputType = this.slotList[i]['slotList'][j]['slotInputType'] ? this.slotList[i]['slotList'][j]['slotInputType'] : "text";
                        data[title][inputType] = ""
                    } else if(type === "checkbox"){
                        let selectFirstChild = this.slotList[i]['slotList'][j]['slotCheckList'].length > 0 ? this.slotList[i]['slotList'][j]['slotCheckList'][0] : ""
                        data[title]["select"] = selectFirstChild
                    }
                }
            }
            this.submitData = data;
            return data;
        }
    },
    watch:{

    },
    created:function(){
        
    },
    mounted(){
    },
    methods:{
        inputChange(value){
            this.submitData = value;
        },
        saveData(){
            let final = {};
            for(let item in this.submitData){
                // final[item] = this.submitData.
                final[item] = "";
                for(let kidItem in this.submitData[item]){
                    final[item] += this.submitData[item][kidItem] + " "
                }
                final[item] = final[item].trim();
            }
            // console.log(final)
        }
    },
    components:{
        "nav-bar": NavBar,
        "m-select": MMSelect,
        "m-input": MMInput,
    }
}
</script>