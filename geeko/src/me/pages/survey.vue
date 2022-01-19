<template>
    <div class="survey" id="surveyBody">
        <div v-if="!isApp" class="fixed-header" >
            <nav-bar>
                <i class="iconfont el-back-font" slot="left" @click="$router.go(-1);">&#xe693;</i>
                <span slot="center">{{$t("point.survey")}}</span>
            </nav-bar>
        </div>

        <div v-if="false" class="empty-container">
            <div class="_hd">
                <span class="iconfont">&#xe6d8;</span>
            </div>

            <p class="_title">{{$t("point.sorry_empty_here_not")}}</p>
        </div>

        <div :class="{'survey-container':true, 'noHeader':isApp}" v-if="!maskShow">
            <!-- <div class="survey-info">
                <div class="info-title">{{$t("survey.survey_title")}}</div>
                <div class="info-content">{{$t("survey.survey_title_content", {website: GLOBAL.sitename,point:points})}}</div> 
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
                <div class="info-content">{{$t("survey.survey_to_help_us")}}</div> 
            </div>

            <question-item v-for='(item,index) in questionList1' 
                           :noBorder="index == questionList1.length-1"
                           :defaultV="item.defaultValue?item.defaultValue:''"
                           :inputValue="item.inputValue?item.inputValue:''"
                           :hadDoneBefore="hadDoneBefore"
                           :index="index"
                           :key="item.title.split(' ')[-1]" 
                           :title='item.title' 
                           :type='item.type'
                           :answerList='item.answerList'
                           @change="(e)=> questionChange(e)"
                           @otherChange="(e)=>questionInputChange(e)"
                           :question="item"
                            :ref="'question'+(index+questionList.length+1)"
                           >
                           </question-item> -->

            <submit-btn @toSubmit="submit()" :title='$t("label.submit")' class="edit-footer" active-fixed="true"></submit-btn>

            
        </div>
        <div v-if="maskShow" class="maskBox">
            <div class="maskInfo">
                <div v-html="reminderMessage" style="padding:0 45px;" v-if="!!reminderMessage"></div>

                <div class="maskButton">
                    <div class="maskBtn" @click="()=>goShopping()">{{$t("label.shop_now")}}</div>
                    <div class="maskBtn view" @click="()=>viewPoints()">{{$t("point.get_more_points")}}</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import NavBar from '../components/nav-bar.vue'
    import Question from '../components/question/question.vue'
    import SubmitBtn from "../../components/submit-btn.vue"
    import store from "../../store/index";
    import {mapGetters} from 'vuex'
    import {getSurveyQuestions} from '../api/index';

    let questionObject = [
        {
            id:0,
            title:'*Regarding shopping fashion items, do you typically make a decision beforehand or at the time of shopping?',
            answer:'',
            input: ''
        },{
            id:1,
            title:'*Which factors are important to you when you make the decision to purchase a product?（You can choose one or more）',
            answer:'',
            input: ''
        },{
            id:2,
            title:'*How often do you shop for fashion items?',
            answer:'',
            input: ''
        },{
            id:3,
            title:'*What promotion would you prefer?',
            answer:''
        },{
            id:4,
            title:'*Which kind of style would you prefer?',
            answer:'',
            input: ''                  
        },{
            id:5,
            title:'*How did you know ChicMe?（You can choose one or more）',
            answer:'',
            input: ''
        },{
            id:6,
            title:'*How familiar are you with ChicMe?',
            answer:'',
            input: ''
        },{
            id:7,
            title:'*How well does our website & APP meet your needs?',
            answer:'',
            input: ''
        },{
            id:8,
            title:'*How easy was it to find what you were looking for on our website & APP？',
            answer:'',
            input: ''
        },{
            id:9,
            title:'*Would you recommend ChicMe website and APP to friends or colleagues?',
            answer:'',
            input: ''
        },{
            id:10,
            title:'*What are the brands that you typically buy ? Please list three of your favorite.',
            answer:'',
            input: ''
        },{
            id:11,
            title:'*Do you have any comments about how we can improve our website & APP?',
            answer:'',
            input: ''
        },{
            id:12,
            title:'*What is your age?',
            answer:'',
            input: ''
        },{
            id:13,
            title:'*What is your gender?',
            answer:'',
            input: ''
        },{
            id:14,
            title:'*Which country do you live in?',
            answer:'',
            input: ''
        },{
            id:15,
            title:'*What kind of occupation are you in?',
            answer:'',
            input: ''
        },{
            id:16,
            title:'*On average, how much do you spend on fashion items each month?',
            answer:'',
            input: ''
        },
    ]

    export default {
        name:"Survey",
        data(){
            return {
                emptyShow:false,
                inputSelect:'title1',
                questionListAll:[],
                maskShow: false,
                result_id: 0,
                hadDoneBefore: false,
                clickSubmit: false,
                points: 0,
                maskContent:{
                    content:'',
                    contentDone:''
                },
                reminderMessage:null,
                submitFlag:true
            }
        },
        components:{
            'nav-bar':NavBar,
            'question-item':Question,
            'submit-btn': SubmitBtn
        },
        computed:{
            ...mapGetters('me', ['message']),
            isApp(){
                if(window.isApp !== 'true'){
                    return false;
                } else {
                    return true;
                }
            }
        },
        created(){
            // this.getPoints()
            this.$store.dispatch('me/getMessage', 'M1545').then((res=>{
                // console.log(res)
                if(res.message && res.id == 'M1545'){
                    let m = JSON.parse(res.message).point;
                    this.points = m;
                }
            }))

            // console.log=()=>{
                
            // }
        },
        mounted(){
            this.$nextTick(()=>this.getQuestionList())
            console.log('submit111111');
        },
        beforeDestroy(){
            document.body.style.position = 'static'
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
                    console.log(err)
                    this.getData()
                })
            },
            questionChange(data){
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
                const selectedQuestion = this.questionListAll.find(q => q.id === data.question.id)
                selectedQuestion.inputValue = data.inputValue
            },
            submit(){
                if(this.hadDoneBefore){
                    return;
                }
                // console.log('submit')
                let list = []
                let params = {}
                let _this = this;
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
                if(this.result_id){
                    params.id = this.result_id
                }
                // console.log(JSON.stringify(list))
                // params = {answers: '[{"id":0,"title":"*Regarding shopping fashion items, do you typically make a decision beforehand or at the time of shopping?","answer":"Beforehand","input":""},{"id":1,"title":"*Which factors are important to you when you make the decision to purchase a product?（You can choose one or more）","answer":["Customer services"],"input":""},{"id":2,"title":"*How often do you shop for fashion items?","answer":"Several times a month","input":""},{"id":3,"title":"*What promotion would you prefer?","answer":["Exclusive code"]},{"id":4,"title":"*Which kind of style would you prefer?","answer":"Oversize","input":""},{"id":5,"title":"*How did you know ChicMe?（You can choose one or more）","answer":["Recommend by friends"],"input":""},{"id":6,"title":"*How familiar are you with ChicMe?","answer":"Not at all familiar","input":""},{"id":7,"title":"*How well does our website & APP meet your needs?","answer":"Not at all well","input":""},{"id":8,"title":"*How easy was it to find what you were looking for on our website & APP？","answer":"Not at all easy","input":""},{"id":9,"title":"*Would you recommend ChicMe website and APP to friends or colleagues?","answer":"No","input":""},{"id":10,"title":"*What are the brands that you typically buy ? Please list three of your favorite.","answer":"da","input":""},{"id":11,"title":"*Do you have any comments about how we can improve our website & APP?","answer":"sa","input":""},{"id":12,"title":"*What is your age?","answer":"35-44","input":""},{"id":13,"title":"*What is your gender?","answer":"Others","input":""},{"id":14,"title":"*Which country do you live in?","answer":"FR","input":""},{"id":15,"title":"*What kind of occupation are you in?","answer":["Others"],"input":""},{"id":16,"title":"*On average, how much do you spend on fashion items each month?","answer":"$100-$200","input":""}]'}
                
                if(this.checkData(list) && this.submitFlag){
                    this.submitFlag = false;
                    store.dispatch('me/updateSurvey', params).then(res => {
                        this.submitFlag = true;
                        const {prompt} = res;
                        if(res.code == 200){
                            // this.getData();
                            this.maskShow = true;
                            this.clickSubmit = true;
                            document.body.style.position = 'fixed'

                            if(prompt?.html){
                                _this.reminderMessage = prompt.html;
                            }else{
                                _this.$store.dispatch('me/getMessage', 'M1628').then((res=>{
                                    // console.log(res)
                                    if(res?.message){
                                        _this.reminderMessage = res.message;
                                    }
                                }))
                            }
                        }
                    })
                }
            },
            checkData(list){
                for(let i in list){
                    if(!list[i]['answer'] || 
                       JSON.stringify(list[i]['answer'])=="[]" || 
                       JSON.stringify(list[i]['answer'])=="{}"){ 
                           this.$refs['question'+(Number(i)+1)][0].$el.scrollIntoView(true)
                           return false
                    }
                }
                return true
            },
            goShopping(){
                if(window.isApp == "true"){
                    window.location.href = 'chic-me://chic.me/home';
                } else {
                    window.location.href = `${window.ctx || ''}/index`;
                }
            },
            viewPoints(){
                if(window.isApp == "true"){
                    window.location.href = 'chic-me://chic.me/credits';
                } else {
                    window.location.href = `${window.ctx || ''}/me/m/credits`
                }
            },
            getThatQuestion(id, answers){
                // console.log(answers)
                let q;
                answers.forEach(an => {
                    if(an.id == id){
                        q = an
                    }
                })
                return q
            },
            getData(){
                let _this = this;
                store.dispatch("me/getSurvey",{}).then(data => data.result).then(result => {
                    if(result){
                        const {answers:answersJSON,id} = result
                        let answers;
                        if(answersJSON){
                            // console.log(result)
                            answers = JSON.parse(answersJSON)
                            this.questionListAll.forEach(question1 => {
                                if(question1.id){
                                    const selectedQuestion = this.getThatQuestion(question1.id, answers)
                                    // console.log(selectedQuestion)
                                    if(selectedQuestion)
                                        question1.defaultValue = selectedQuestion.answer
                                        question1.inputValue = selectedQuestion.input
                                }
                                
                            })
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
                            document.body.style.position = 'fixed';

                            _this.$store.dispatch('me/getMessage', 'M1628').then((res=>{
                                // console.log(res)
                                if(res?.message){
                                    _this.reminderMessage = res.message;
                                }
                            }))
                        }
                        if(id){
                            this.result_id = id;
                        }
                    }
                })
            },
            
        }
    }
</script>

<style lang="scss" scoped>
    body{
        overflow: hidden;
    }
    .edit-footer{
        position: fixed;
        bottom: 0;
        background-color: #fff !important;
    }
    .survey{
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
                min-height: 106px;
	            background-color: #fff4d9;
                padding: 16px 12px 13px;
                color: #222;
                font-size: 13px;

                .info-title{
                    font-size: 14px;
                    // text-shadow: 0 0 #222;
                    font-weight: bold;
                    line-height: 16px;
                    margin-bottom: 11px;
                }

                .info-content{
                    font-family: Roboto-Regular;
                    line-height: 22px;
                }
            }
        }
        .noHeader{
            margin-top: 0;
        }

        .maskBox{
            width: 100vw;
            height: 100vh;
            background-color: #fff;
            top: 0;
            padding-top: 80px;

            .maskInfo{
                width: 100%;
                min-height: 273px;
                background-color: #fff;
                border-radius: 4px;
                position: relative;
                // margin-top: 80px;

                .maskClose{
                    position: absolute;
                    right: 12px;
                    font-size: 10px;
                    top: 12px;
                    color: #999;
                    display: none;
                }

                img{
                    display: block;
                    width: 88px;
                    height: 56px;
                    margin: 18px auto 26px;
                }

                .maskContent{
                    width: 300px;
                    min-height: 56px;
                    // font-family: Roboto-Regular;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 20px;
                    letter-spacing: 0px;
                    color: #222222;
                    margin: 0 auto;
                    text-align: center;

                    strong{
                        font-family: AcuminPro-Bold;
                    }
                }

                .maskButton{
                    margin-top: 34px;
                    font-family: AcuminPro-Bold;

                    .maskBtn{
                        width: 240px;
                        height: 32px;
                        background-color: #000000;
                        border-radius: 2px;
                        color: #fff;
                        margin: 0 auto;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 16px;
                        text-transform: uppercase;
                    }
                    .view{
                        background-color: #fff;
                        color: #222;
                        border: solid 1px #cacaca;
                        margin-top: 14px;
                        margin-bottom: 24px;
                    }
                }
            }
        }

    }
</style>