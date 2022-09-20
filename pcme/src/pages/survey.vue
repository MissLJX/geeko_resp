<template>
    <div class="survey" id="surveyBody">    
        <div v-if="false" class="empty-container">
            <div class="_hd">
                <span class="iconfont">&#xe6d8;</span>
            </div>

            <p class="_title">{{$t("point.sorry_empty_here_not")}}</p>
        </div>

        <div class="survey-container" v-if="!maskShow">
            <!-- <div class="survey-info">
                <div class="info-box">
                    <div class="info-title">{{$t("survey.survey_title")}}</div>
                    <div class="info-content">{{$t("survey.survey_title_content", {website: GLOBAL.sitename, point: points})}}</div> 
                </div>
            </div> -->

            <question-item v-for='(item,index) in questionListAll' 
                           :noBorder="index == questionListAll.length-1 || item.noBorder"
                           :defaultV="item.defaultValue?item.defaultValue:''"
                           :index="index"
                           :key="item.title.split(' ')[-1]" 
                           :title='item.title' 
                           :type='item.type'
                           :answerList='item.answerList'
                           :hadDoneBefore="hadDoneBefore"
                           @otherChange="(e)=>questionInputChange(e)"
                           @change="(e)=> questionChange(e)"
                           :question="item"
                           :ref="'question'+(index+1)"
                           :content="item.content"
                           ></question-item>

            <!-- <div class="survey-info">
                <div class="info-box">
                    <div class="info-content">{{$t("survey.survey_to_help_us")}}</div> 
                </div>
            </div>

            <question-item v-for='(item,index) in questionList1' 
                            :index='index+questionList.length'
                            :key="item.title.split(' ')[-1]"
                            :noBorder="index == questionList1.length-1"
                            :defaultV="item.defaultValue?item.defaultValue:''"
                            :title='item.title' 
                            :type='item.type'
                            :answerList='item.answerList'
                            :hadDoneBefore="hadDoneBefore"
                            @otherChange="(e)=>questionInputChange(e)"
                            @change="(e)=> questionChange(e)"
                            :question="item"
                            :ref="'question'+(index+questionList.length+1)"
                            ></question-item> -->
        
            <div class="btnBox">
                <div class="submitBtn" @click="()=>submit()">
                    {{$t("submit")}}
                </div>
            </div>

        </div>
        <div v-if="maskShow" class="maskBox" id="maskBody">
            <div class="maskInfo">
                <!-- <img src="https://image.geeko.ltd/chicme/2021-9-7/2021-9-7-me-survey-points.png" alt="">
                <div class="points_num">100 points</div>
                <div class="points_policy">
                    100points = 1$
                    <span class="iconfont points_icon" @click="toPointsPolicy">&#xe73f;</span>
                </div> -->
                <div class="points_content" v-html="tipContent">
                    
                </div>
                <div class="points_btn_box">
                    <div class="maskBtn" @click="()=>goShopping()">{{$t("points_mall.shop_now")}}</div>
                    <div class="maskBtn view" @click="()=>viewPoints()">{{$t("points_mall.get_more_points")}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Question from '../components/question/question.vue'
    import {mapGetters, mapActions} from 'vuex';
    import {getSurveyQuestions} from '../api/index';

    let questionAll = [
        {
            "title": "Dear Customer",
            "content": "At Bellewholesale , we are always looking to bring more good products and services for you.So that we can better understand your demand and preferences, we kindly invite you to take part in this short survey.To thank you for your support, we will offer you 200 points to your account.",
            "type": "title",
            "defaultValue": "",
            "noBorder": true,
            "inputValue": "",
            "answerList": []
        },
        {
            "title": "*What kind of your clothing boutique?",
            "id": 0,
            "type": "radio",
            "defaultValue": "",
            "inputValue": "",
            "answerList": [{
                    "label": "Physical Store",
                    "value": "Physical Store"
                },
                {
                    "label": "Online Shop",
                    "value": "Online Shop"
                }
            ]
        },
        {
            "title": "*What is your boutique website ?",
            "type": "textarea",
            "defaultValue": "",
            "inputValue": "",
            "id": 1,
            "answerList": [

            ]
        },
        {
            "title": "*What are the top three best-selling product types in your clothing boutique?",
            "type": "textarea",
            "defaultValue": "",
            "inputValue": "",
            "id": 2,
            "answerList": [

            ]
        },
        {
            "title": "*Which factors are important to you when you make the decision to buying in bulk?",
            "type": "checkbox",
            "id": 3,
            "defaultValue": "",
            "inputValue": "",
            "answerList": [{
                "label": "Shipping Speed",
                "value": "Shipping Speed"
            }, {
                "label": "Product Price",
                "value": "Product Price"
            }, {
                "label": "Product Quality",
                "value": "Product Quality"
            }, {
                "label": "Return and Exchange",
                "value": "Return and Exchange"
            }, {
                "label": "Customer services",
                "value": "Customer services"
            }, {
                "label": "Promotions",
                "value": "Promotions"
            }]
        },
        {
            "title": "*How often do you shop for fashion items?",
            "id": 4,
            "type": "radio",
            "defaultValue": "",
            "inputValue": "",
            "answerList": [{
                    "label": "Several times a week",
                    "value": "Several times a week"
                },
                {
                    "label": "About once a week",
                    "value": "About once a week"
                },
                {
                    "label": "Several times a month",
                    "value": "Several times a month"
                },
                {
                    "label": "About once a month",
                    "value": "About once a month"
                },
                {
                    "label": "Less than once a month",
                    "value": "Less than once a month"
                },
            ]
        },
        {
            "title": "*What communication platform would you prefer with the customer service?",
            "type": "checkbox",
            "id": 5,
            "defaultValue": "",
            "inputValue": "",
            "answerList": [{
                "label": "WhatsApp",
                "value": "WhatsApp"
            }, {
                "label": "Email",
                "value": "Email"
            }, {
                "label": "Chat",
                "value": "Chat"
            }, {
                "label": "Facebook",
                "value": "Facebook"
            }, {
                "label": "Ins",
                "value": "Ins"
            }]
        },
        {
            "title": "*Which discount method do you prefer ?",
            "type": "checkbox",
            "id": 6,
            "defaultValue": "",
            "inputValue": "",
            "answerList": [{
                "label": "Discount coupon",
                "value": "Discount coupon"
            }, {
                "label": "Bonus point",
                "value": "Bonus point"
            }, {
                "label": "Purchase with free gift",
                "value": "Purchase with free gift"
            }, {
                "label": "Exclusive code",
                "value": "Exclusive code"
            }, {
                "label": "Cash coupon",
                "value": "Cash coupon"
            }]
        },
        {
            "title": "*Which kind of product style you prefer for your clothing boutique?",
            "type": "checkbox",
            "id": 7,
            "defaultValue": "",
            "inputValue": "",
            "answerList": [{
                "label": "OL style",
                "value": "OL style"
            }, {
                "label": "Street style",
                "value": "Street style"
            }, {
                "label": "Retro style",
                "value": "Retro style"
            }, {
                "label": "Sporty style",
                "value": "Sporty style"
            }, {
                "label": "Casual style",
                "value": "Casual style"
            }, {
                "label": "Baroque style",
                "value": "Baroque style"
            }]
        },
        {
            "title": "*How familiar are you with wholesale policy of the site Bellewholesale ?",
            "id": 8,
            "type": "radio",
            "defaultValue": "",
            "inputValue": "",
            "answerList": [{
                    "label": "Extremely familiar",
                    "value": "Extremely familiar"
                },
                {
                    "label": "Very familiar",
                    "value": "Very familiar"
                },
                {
                    "label": "Somewhat familiar",
                    "value": "Somewhat familiar"
                },
                {
                    "label": "Not so familiar",
                    "value": "Not so familiar"
                },
                {
                    "label": "Not at all familiar",
                    "value": "Not at all familiar"
                },
            ]
        },
        {
            "title": "*Would you recommend Bellewholesale website and APP to friends or colleagues?",
            "id": 9,
            "type": "radio",
            "defaultValue": "",
            "inputValue": "",
            "answerList": [{
                    "label": "Yes",
                    "value": "Yes"
                },
                {
                    "label": "No",
                    "value": "No"
                }
            ]
        },
        {
            "title": "*What are the brands that you typically buy ? Please list three of your favorite.",
            "type": "textarea",
            "defaultValue": "",
            "inputValue": "",
            "id": 10,
            "answerList": [

            ]
        },
        {
            "title": "*Do you have any comments about how we can improve our website & APP?",
            "type": "textarea",
            "defaultValue": "",
            "inputValue": "",
            "noBorder":true,
            "id": 11,
            "answerList": [

            ]
        },
        {
            "title": "",
            "content": "Thank you very much for your participation! Your thoughts are very important to us. 200 points will be sent to your  account once you complete the survey and submit. We guarantee the confidentiality and security in the treatment of your personal data. All your answers are guaranteed to remain anonymous.With our warm regards and thanks.Bellewholesale ",
            "type": "content",
            "defaultValue": "",
            "inputValue": "",
            "noBorder":true,
            "answerList": [

            ]
        },
        {
            "content": "Thank you very much for your participation! Your thoughts are very important to us. 200 points will be sent to your account once you complete the survey and submit. ",
            "contentDone": "Thank you very much for your participation! Your thoughts are very important to us. 200 points will be sent to your account once you complete the survey and submit. ",
            "type": "mask",
            "import": "200 points",
            "title": "",
            "answerList":[]
        }
    ]

    export default {
        data(){
            return {
                emptyShow:false,
                inputSelect:'title1',
                questionListAll:[],
                // questionObject: questionObject,
                maskShow: false,
                result_id: 0,
                isUpdate:false,
                hadDoneBefore: false,
                clickSubmit: false,
                selectOpen: false,
                selectItem: {label:'Country',value: ''},
                maskContent:{
                    content:'',
                    contentDone:''
                },
                tipContent: ''
            }
        },
        computed:{
            ...mapGetters(['message']),
            // tipContent(){
            //     if(this.message){
            //         console.log(this.message)
            //         return this.message.message
            //     } else {
            //         return ''
            //     }
            // }
            // points(){
                // if(this.message.message){
                //     let m = JSON.parse(this.message.message).point;
                //     return m
                // }
            // }
        },
        created(){
            this.$store.dispatch('getMessage', 'M1627')
            // 点击其他区域关闭弹窗
            document.addEventListener("click",this.closeItem,false) 
        },
        mounted(){
            this.$nextTick(() => {
                this.getQuestionList()
            })            
        },
        watch:{
        },
        methods:{
            getQuestionList(){
                let config = (window.name||'chicme').toLocaleLowerCase == 'bellewholesell'?'M1576':'M1575'
                getSurveyQuestions(config).then((data)=>{
                    // console.log(data)
                    if(data && data.result && data.result.length > 0){
                        let questionAll = data.result
                        this.questionListAll = questionAll;
                        let maskContent = questionAll.find(q => q.type == 'mask');
                        if(maskContent && maskContent.import){
                            if(maskContent.content){
                                maskContent.content = maskContent.content.replace(maskContent.import,'<strong>'+maskContent.import+'</strong>')
                            }
                            if(maskContent.contentDone){
                                maskContent.contentDone = maskContent.contentDone.replace(maskContent.import,'<strong>'+maskContent.import+'</strong>')
                            }
                            // console.log(maskContent.content)
                            this.maskContent = {
                                content:maskContent.content,
                                contentDone:maskContent.contentDone
                            }
                        }
                    }
                    this.getData()
                },(err)=>{
                    console.log('获取问卷内容报错: ',err)
                    this.getData()
                })
                
                
            },
            questionChange(data){
                // console.log(data)
                // const question1Select = this.questionList.find(q => q.id === data.question.id)
                // const question2Select = this.questionList1.find(q => q.id === data.question.id)
                // const selectedQuestion = question1Select ? question1Select : question2Select
                const selectedQuestion = this.questionListAll.find(q => q.id === data.question.id)

                if(selectedQuestion.type == 'radio' || selectedQuestion.type == 'textarea' || selectedQuestion.type == 'select'){
                    selectedQuestion.defaultValue = data.selectedValue
                } else if(selectedQuestion.type == 'checkbox'){
                    if(Object.prototype.toString.call(selectedQuestion.defaultValue) == '[object Array]'){
                        let index = selectedQuestion.defaultValue.indexOf(data.selectedValue)
                        if(index!=-1){
                            selectedQuestion.defaultValue.splice(index,1)
                        } else {
                            selectedQuestion.defaultValue.push(data.selectedValue)
                        }
                    } else {
                        selectedQuestion.defaultValue = [data.selectedValue]
                    }
                }
            },
            questionInputChange(data){
                // const question1Select = this.questionList.find(q => q.id === data.question.id)
                // const question2Select = this.questionList1.find(q => q.id === data.question.id)
                // const selectedQuestion = question1Select ? question1Select : question2Select
                const selectedQuestion = this.questionListAll.find(q => q.id === data.question.id)
                // console.log(selectedQuestion)

                selectedQuestion.inputValue = data.inputValue
            },
            submit(){
                // console.log('submit')

                let params = {};
                if(this.result_id){
                    params.id = this.result_id
                }
                let list = []
                for(let i in this.questionListAll){
                    // console.log(i)
                    let obj = {id:'',title:'',answer:'',input:''}
                    if(this.questionListAll[i].id || this.questionListAll[i].id == 0){
                        obj.id = this.questionListAll[i].id;
                        this.questionListAll[i].title && (obj.title = this.questionListAll[i].title)
                        this.questionListAll[i].defaultValue && (obj.answer = this.questionListAll[i].defaultValue)
                        this.questionListAll[i].inputValue && (obj.input = this.questionListAll[i].inputValue)
                        list.push(obj)
                    }
                }
                params.answers = JSON.stringify(list)
                // console.log(list);
                // return
                if(this.checkData(list)){
                    this.$store.dispatch('updateSurvey', params).then(res => {
                        // console.log(res)
                        if(res.code == 200){
                            this.maskShow = true;
                            this.clickSubmit = true;
                            // this.getData()
                            if(res.prompt && res.prompt.html){
                                let policyUrl = /(\/fs\/points-policy)/
                                let text = res.prompt.html.indexOf('/fs/points-policy') != -1 ? res.prompt.html.replace(policyUrl, '/fs/points-policy-pc'): res.prompt.html
                                this.tipContent = text;
                            }
                        }
                    })
                }
            },
            checkData(list){
                // console.log(list)
                for(let i in list){
                    if(!list[i]['answer'] || 
                       JSON.stringify(list[i]['answer'])=="[]" || 
                       JSON.stringify(list[i]['answer'])=="{}"){ 
                        //    console.log(i)
                        //    window.location.hash = ""
                        //    window.location.hash = "#question"+(Number(i)+1)
                        //    document.getElementById('question'+(Number(i)+1)).scrollIntoView(true)
                           this.$refs['question'+(Number(i)+1)][0].$el.scrollIntoView(true)
                           return false
                    }
                }
                return true
            },
            goShopping(){
                window.location.href = `${window.ctx || ''}/`
            },
            viewPoints(){
                window.location.href = `${window.ctx || ''}/me/m/credits`
            },
            getThatQuestion(id, answers){
                let q;
                answers.forEach(an => {
                    if(an.id == id){
                        q = an
                    }
                })
                return q
            },
            getData(){
                this.$store.dispatch("getSurvey",{}).then(data => data.result).then(result => {
                    if(result){
                        const {answers:answersJSON,id} = result
                        let policyUrl = /(\/fs\/points-policy)/
                        let text = this.message.message.indexOf('/fs/points-policy') != -1 ? this.message.message.replace(policyUrl, '/fs/points-policy-pc'): this.message.message
                        this.tipContent = text;
                        let answers;
                        if(answersJSON){
                            answers = JSON.parse(answersJSON)
                            // this.questionList.forEach(question => {
                            //     const selectedQuestion = this.getThatQuestion(question.id, answers)
                            //     if(selectedQuestion)
                            //         question.defaultValue = selectedQuestion.answer
                            //         question.inputValue = selectedQuestion.input
                            // })
                            // this.questionList1.forEach(question1 => {
                            //     const selectedQuestion = this.getThatQuestion(question1.id, answers)
                            //     if(selectedQuestion)
                            //         question1.defaultValue = selectedQuestion.answer
                            //         question1.inputValue = selectedQuestion.input
                            // })
                            this.questionListAll.forEach(question1 => {
                                if(question1.id){
                                    const selectedQuestion = this.getThatQuestion(question1.id, answers)
                                    // console.log(selectedQuestion)
                                    if(selectedQuestion)
                                        question1.defaultValue = selectedQuestion.answer
                                        question1.inputValue = selectedQuestion.input
                                }
                                
                            })
                            // console.log(this.questionList,this.questionList1)
                        } else {
                            console.error(new Date()+"  问卷信息丢失 cid："+ result.customerId+" id："+result.id+"")
                            let errorlog = {
                                time: new Date(),
                                msg: '问卷信息丢失',
                                cid: result.customerId,
                                id: result.id
                            }
                            let log;
                            if(localStorage.errorlogs){
                                log = JSON.parse(localStorage.errorlogs)
                                log.push(errorlog)
                            } else {
                                log  = [errorlog]
                            }
                            localStorage.errorlogs = JSON.stringify(log)
                        }

                        if(answers){
                            this.hadDoneBefore = true;
                            this.maskShow = true;
                        }

                        if(id){
                            this.result_id = id;
                        }

                       
                    }
                })
            },
        },
        components:{
            'question-item':Question,
        },
    }
</script>

<style lang="scss" scoped>
    @font-face {
    font-family: 'iconfont';  /* Project id 384296 */
    src: url('//at.alicdn.com/t/font_384296_i4gbs9w8xo.woff2?t=1630652306181') format('woff2'),
        url('//at.alicdn.com/t/font_384296_i4gbs9w8xo.woff?t=1630652306181') format('woff'),
        url('//at.alicdn.com/t/font_384296_i4gbs9w8xo.ttf?t=1630652306181') format('truetype');
    }
    .iconfont{
    font-family:"iconfont" !important;
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    }
    .edit-footer{
        position: fixed;
        bottom: 0;
        background-color: #fff !important;
    }
    .survey{
        // height: 600px;
        // overflow: hidden;
        // border: 1px solid;
        .fixed-header{
            position: fixed;
            width: 100%;
            top: 0;
            left: 0;
            right: 0;
            z-index: 5;
            background-color: #ffffff;
        }

        .empty-container{
            text-align: center;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 5;

            ._hd{
                & .iconfont{
                    font-size: 50px;
                    color: #999999;
                }
            }

            ._title{
                font-size: 12px;
                color: #999999;
                margin-top: 5px;
            }
        }

        .survey-container{
            width: 100%;
            background-color: #fff;
            margin-top: 44px;
            
            .survey-info{
                width: 100%;
                min-height: 79px;
	            background-color: #fff4d9;
                padding: 16px 12px 13px;
                color: #222;
                font-size: 13px;

                .info-box{
                    width: 65%;
                    min-width: 800px;
                    max-width: 1200px;
                    margin: 0 auto;

                    .info-title{
                        font-size: 16px;
                        // text-shadow: 0 0 #222;
                        font-weight: bold;
                        line-height: 16px;
                        width: 100%;
                        margin-bottom: 13px;
                    }

                    .info-content{
                        font-family: Roboto-Regular;
                        line-height: 22px;
                        width: 100%;
                    }
                }
            }
        }
        .btnBox{
            width: 65%;
            min-width: 800px;
            max-width: 1200px;
            margin: 0 auto;

             .submitBtn{
                width: 240px;
                height: 42px;
                background-color: #000;
                color: #fff;
                border-radius: 2px;
                // margin-top: 26px;
                text-transform: uppercase;
                text-align: center;
                line-height: 42px;
                font-family: AcuminPro-Bold;
                font-size: 14px;
                font-weight: bold;
                font-stretch: normal;   
                letter-spacing: 0px;
                cursor: pointer;
            }
        }
       

        .maskBox{
            width: 100vw;
            height: 600px;
            // background-color: rgba(0,0,0,0.5);
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            // position: fixed;
            top: 0;
            z-index: 10;
            // border: 1px solid;

            .maskInfo{
                width: 400px;
                min-height: 330px;
                background-color: #fff;
                border-radius: 4px;
                position: relative;
                text-align: center;

                .maskClose{
                    position: absolute;
                    right: 15px;
                    font-size: 15px;
                    top: 15px;
                    color: #999;
                    cursor: pointer;
                    display: none;
                }

                img{
                    display: block;
                    width: 125px;
                    height: 80px;
                    margin: 28px auto 15px;
                }

                .maskContent{
                    width: 568px;
                    min-height: 63px;
                    font-family: Roboto-Regular;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 20px;
                    letter-spacing: 0px;
                    color: #222222;
                    margin: 0 auto;
                    text-align: center;
                }

                .maskButton{
                    margin-top: 45px;

                    .maskBtn{
                        width: 360px;
                        height: 42px;
                        background-color: #000000;
                        border-radius: 2px;
                        color: #fff;
                        margin: 0 auto;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-family: 'ACUMINPRO-BOLD';
                        font-size: 16px;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 19px;
                        letter-spacing: 0px;
                        color: #ffffff;
                        cursor: pointer;
                        text-transform: uppercase;
                    }
                    .view{
                        // background-color: #fff;
                        // color: #222;
                        // border: solid 1px #cacaca;
                        margin-top: 12px;
                        margin-bottom: 24px;
                    }
                }
            }
        }

    }
    .selectBox{
                min-width: 351px;
                max-width: 500px;
                position: relative;
                .selectInputBox {
                    width: 100%;
                    height: 32px;
                    background-color: #f6f6f6;
                    border: none;
                    outline: none;
                    line-height: 32px;
                    // padding: 0 10px;
                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    cursor: pointer;

                    span{
                        padding: 15px;
                    }

                    .selectOptionBox{
                        position: absolute;
                        top: 32px;
                        left: 0px;
                        background: #efefef;
                        width: 100%;
                        /* border: 1px solid; */
                        height: 200px;
                        overflow: hidden;
                        overflow-y: scroll;
                        z-index: 1;
                        
                        .selectOption{
                            padding: 0 15px;
                            cursor: pointer;
                        }

                        .selectOption-select{
                            background: #fff;
                        }

                        .gray{
                            color: #aaa;
                        }
                    }
                    /*滚动条样式*/
                    .selectOptionBox::-webkit-scrollbar {
                        width: 4px;    
                        /*height: 4px;*/
                    }
                    .selectOptionBox::-webkit-scrollbar-thumb {
                        border-radius: 10px;
                        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                        background: rgba(0,0,0,0.2);
                    }
                    .selectOptionBox::-webkit-scrollbar-track {
                        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                        border-radius: 0;
                        background: rgba(0,0,0,0.1);

                    }
                }
                .selectIcon{
                    position: absolute;
                    right: 10px;
                    top: calc(50% - 9px);
                    transition: all 0.3s linear;
                    color: #cacaca;
                }
                .option-open{
                    transform: rotate(180deg);
                    transition: all 0.3s linear;
                }
            }
    // .tip_content{
    //     width: 471px;
    //     min-height: 200px;
    //     background-color: #ffffff;
    //     padding: 18px 36px 30px;
    //     text-align: center;
    // }
    .points_num{
        font-family: 'ACUMINPRO-BOLD';
        font-size: 24px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #222222;
    }
    .points_policy{
        font-family: 'SLATEPRO';
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 16px;
        letter-spacing: 0px;
        color: #222222;
        margin-bottom: 28px;
    }
    .points_icon{
        font-size: 14px !important;
        cursor: pointer;    
    }
    .points_content{
        font-family: 'SLATEPRO';
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #222222;
        margin-bottom: 20px;
    }
    .color_red{
        color:#e64545;
        font-family: 'ACUMINPRO-BOLD';
    }
    .points_btn_box{
        margin-top: 45px;

        .maskBtn{
            width: 360px;
            height: 42px;
            background-color: #000000;
            border-radius: 2px;
            color: #fff;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'ACUMINPRO-BOLD';
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 19px;
            letter-spacing: 0px;
            color: #ffffff;
            cursor: pointer;
            text-transform: uppercase;
        }
        .view{
            // background-color: #fff;
            // color: #222;
            // border: solid 1px #cacaca;
            margin-top: 12px;
            margin-bottom: 24px;
        }
    }
</style>