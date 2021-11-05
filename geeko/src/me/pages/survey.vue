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
            <div class="survey-info">
                <div class="info-title">{{$t("survey.survey_title")}}</div>
                <div class="info-content">{{$t("survey.survey_title_content", {website: GLOBAL.sitename,point:points})}}</div> 
            </div>

            <question-item v-for='(item,index) in questionList' 
                           :noBorder="index == questionList.length-1"
                           :defaultV="item.defaultValue?item.defaultValue:''"
                           :index="index"
                           :key="item.title.split(' ')[-1]" 
                           :title='item.title' 
                           :type='item.type'
                           :answerList='item.answerList'
                           @change="(e)=> questionChange(e)"
                           :hadDoneBefore="hadDoneBefore"
                           @otherChange="(e)=>questionInputChange(e)"
                           :question="item"
                           :ref="'question'+(index+1)"
                           ></question-item>

            <div class="survey-info">
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
                           </question-item>

            <submit-btn @toSubmit="submit()" :title='$t("label.submit")' class="edit-footer" active-fixed="true"></submit-btn>

            
        </div>
        <div v-if="maskShow" class="maskBox">
            <div class="maskInfo">
                <i class="iconfont maskClose" @click="()=>this.maskShow=false">&#xe7c9;</i>
                <!-- https://image.geeko.ltd/chicme/2021-9-7/2021-9-13-home.png -->
                <img src="https://image.geeko.ltd/chicme/2021-9-7/2021-9-7-me-survey-points.png" alt="">
                <div class="maskContent">
                    {{clickSubmit ? $t("survey.survey_thanks_done") : $t("survey.survey_thanks")}}
                    <strong>{{$t("survey.survey_thanks_points", {point: points})}}</strong>
                    {{$t("survey.survey_thanks_more", {website: GLOBAL.sitename})}}
                    <!-- You have already submitted this survey ！You’ve got 200 points in your account, have a look and enjoy shopping at ChicMe! -->
                </div>
                <div class="maskButton">
                    <div class="maskBtn" @click="()=>goShopping()">Go Shopping</div>
                    <div class="maskBtn view" @click="()=>viewPoints()">View Points</div>
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
                questionList:[
                    {
                        title:this.$t('survey.survey_question_1.title'),
                        id: 0,
                        type: 'radio', // checkbox & textarea
                        defaultValue:'',
                        inputValue:'',
                        answerList:[
                            {
                                label:this.$t('survey.survey_question_1.answer1'),
                                value: "Beforehand",
                            },
                            {
                                label: this.$t('survey.survey_question_1.answer2'),
                                value: 'At the time of purchase',
                            }
                        ]
                    },{
                        title:this.$t('survey.survey_question_2.title'),
                        type: 'checkbox', // checkbox & textarea
                        id: 1,
                        defaultValue:'',
                        inputValue:'',
                        answerList:[
                            {
                                label: this.$t('survey.survey_question_2.answer1'),
                                value: "Brand",
                            },
                            {
                                label: this.$t('survey.survey_question_2.answer2'),
                                value: 'Price',
                            },
                            {
                                label: this.$t('survey.survey_question_2.answer3'),
                                value: 'Quality',
                            },
                            {
                                label: this.$t('survey.survey_question_2.answer4'),
                                value: 'Style',
                            },
                            {
                                label: this.$t('survey.survey_question_2.answer5'),
                                value: 'Color choices',
                            },
                            {
                                label: this.$t('survey.survey_question_2.answer6'),
                                value: 'Return and change',
                            },
                            {
                                label: this.$t('survey.survey_question_2.answer7'),
                                value: 'Customer services',
                            },
                            {
                                label: this.$t('survey.survey_question_2.answer8'),
                                value: 'Free shipping',
                            },
                        ]
                    },{
                        title:this.$t('survey.survey_question_3.title'),
                        type: 'radio', // checkbox & textarea
                        id: 2,
                        defaultValue:'',
                        inputValue:'',
                        answerList:[
                            {
                                label: this.$t('survey.survey_question_3.answer1'),
                                value: "Several times a week",
                            },
                            {
                                label: this.$t('survey.survey_question_3.answer2'),
                                value: 'About once a week',
                            },
                            {
                                label: this.$t('survey.survey_question_3.answer3'),
                                value: 'Several times a month',
                            },
                            {
                                label: this.$t('survey.survey_question_3.answer4'),
                                value: 'About once a month',
                            },
                            {
                                label: this.$t('survey.survey_question_3.answer5'),
                                value: 'Less than once a month',
                            },
                        ]
                    },{
                        title:this.$t('survey.survey_question_4.title'),
                        type: 'checkbox', // checkbox & textarea
                        defaultValue:'',
                        inputValue:'',
                        id: 3,
                        answerList:[
                            {
                                label:this.$t('survey.survey_question_4.answer1'),
                                value: "Discount",
                            },
                            {
                                label: this.$t('survey.survey_question_4.answer2'),
                                value: 'Coupon',
                            },
                            {
                                label: this.$t('survey.survey_question_4.answer3'),
                                value: 'Purchase with gift',
                            },
                            {
                                label: this.$t('survey.survey_question_4.answer4'),
                                value: 'Bonus point',
                            },
                            {
                                label: this.$t('survey.survey_question_4.answer5'),
                                value: 'Exclusive code',
                            },
                        ]
                    },{
                        title:this.$t('survey.survey_question_5.title'),
                        type: 'radio', // checkbox & textarea
                        defaultValue:'',
                        inputValue:'',
                        id: 4,
                        answerList:[
                            {
                                label:this.$t('survey.survey_question_5.answer1'),
                                value: "Regular fit",
                            },
                            {
                                label:this.$t('survey.survey_question_5.answer2'),
                                value: "Oversize",
                            },
                            {
                                label:this.$t('survey.survey_question_5.answer3'),
                                value: "Slim",
                            },
                            {
                                label: this.$t('survey.survey_question_5.answer4'),
                                value: "I'm willing to try differnet styles",
                            },
                        ]
                    },{
                        title:this.$t('survey.survey_question_6.title', {website: this.GLOBAL.sitename}),
                        type: 'checkbox', // checkbox & textarea
                        defaultValue:'',
                        inputValue:'',
                        id: 5,
                        answerList:[
                            {
                                label:this.$t('survey.survey_question_6.answer1'),
                                value: "Google",
                            },
                            {
                                label:this.$t('survey.survey_question_6.answer2'),
                                value: "Facebook",
                            },
                            {
                                label:this.$t('survey.survey_question_6.answer3'),
                                value: "Instagram",
                            },
                            {
                                label:this.$t('survey.survey_question_6.answer4'),
                                value: "YouTube",
                            },
                            {
                                label:this.$t('survey.survey_question_6.answer5'),
                                value: "Tik Tok",
                            },
                            {
                                label:this.$t('survey.survey_question_6.answer6'),
                                value: "Pinterest",
                            },
                            {
                                label:this.$t('survey.survey_question_6.answer7'),
                                value: "Recommend by friends",
                            },
                            {
                                label:this.$t('survey.survey_question_6.answer8'),
                                value: "Others",
                            },
                        ]
                    },{
                        title:this.$t('survey.survey_question_7.title', {website: this.GLOBAL.sitename}),
                        type: 'radio', // checkbox & textarea
                        defaultValue:'',
                        inputValue:'',
                        id: 6,
                        answerList:[
                            {
                                label:this.$t('survey.survey_question_7.answer1'),
                                value: "Extremely familiar",                                
                            },
                            {
                                label:this.$t('survey.survey_question_7.answer2'),
                                value: "Very familiar",                                
                            },
                            {
                                label:this.$t('survey.survey_question_7.answer3'),
                                value: "Somewhat familiar",                                
                            },
                            {
                                label:this.$t('survey.survey_question_7.answer4'),
                                value: "Not so familiar",                                
                            },
                            {
                                label:this.$t('survey.survey_question_7.answer5'),
                                value: "Not at all familiar",
                            },
                        ]
                    },{
                        title:this.$t('survey.survey_question_8.title'),
                        type: 'radio', // checkbox & textarea
                        defaultValue:'',
                        inputValue:'',
                        id: 7,
                        answerList:[
                            {
                                label:this.$t('survey.survey_question_8.answer1'),
                                value: "Extremely well",
                            },
                            {
                                label:this.$t('survey.survey_question_8.answer2'),
                                value: "Very well",
                            },
                            {
                                label:this.$t('survey.survey_question_8.answer3'),
                                value: "Somewhat well",
                            },
                            {
                                label:this.$t('survey.survey_question_8.answer4'),
                                value: "Not so well",
                            },
                            {
                                label:this.$t('survey.survey_question_8.answer5'),
                                value: "Not at all well",
                            },
                        ]
                    },{
                        title:this.$t('survey.survey_question_9.title'),
                        type: 'radio', // checkbox & textarea
                        defaultValue:'',
                        inputValue:'',
                        id: 8,
                        answerList:[
                            {
                                label:this.$t('survey.survey_question_9.answer1'),
                                value: "Extremely easy",
                            },
                            {
                                label:this.$t('survey.survey_question_9.answer2'),
                                value: "Very easy",
                            },
                            {
                                label:this.$t('survey.survey_question_9.answer3'),
                                value: "Somewhat easy",
                            },
                            {
                                label:this.$t('survey.survey_question_9.answer4'),
                                value: "Not so easy",
                            },
                            {
                                label:this.$t('survey.survey_question_9.answer5'),
                                value: "Not at all easy",
                            },
                        ]
                    },{
                        title:this.$t('survey.survey_question_10.title', {website: this.GLOBAL.sitename}),
                        type: 'radio', // checkbox & textarea
                        defaultValue:'',
                        inputValue:'',
                        id: 9,
                        answerList:[
                            {
                                label:this.$t('survey.survey_question_10.answer1'),
                                value: "Yes",
                            },
                            {
                                label:this.$t('survey.survey_question_10.answer2'),
                                value: "No",
                            },
                        ]
                    },{
                        title:this.$t('survey.survey_question_11.title'),
                        type: 'textarea', // checkbox & textarea
                        defaultValue:'',
                        inputValue:'',
                        id: 10,
                        answerList:[]
                    },{
                        title:this.$t('survey.survey_question_12.title'),
                        type: 'textarea', // checkbox & textarea
                        defaultValue:'',
                        inputValue:'',
                        id: 11,
                        answerList:[]
                    },
                ],
                questionList1:[
                    {
                        title:this.$t('survey.survey_question_13.title'),
                        type: 'radio', // checkbox & textarea
                        defaultValue:'',
                        inputValue:'',
                        id: 12,
                        answerList:[
                            {
                                label:this.$t('survey.survey_question_13.answer1'),
                                value: "Under 18",
                            },
                            {
                                label:this.$t('survey.survey_question_13.answer2'),
                                value: "18-24",
                            },
                            {
                                label:this.$t('survey.survey_question_13.answer3'),
                                value: "25-34",
                            },
                            {
                                label:this.$t('survey.survey_question_13.answer4'),
                                value: "35-44",
                            },
                            {
                                label:this.$t('survey.survey_question_13.answer5'),
                                value: "45-54",
                            },
                            {
                                label:this.$t('survey.survey_question_13.answer6'),
                                value: "55-64",
                            },
                            {
                                label:this.$t('survey.survey_question_13.answer7'),
                                value: "65 plus",
                            },
                        ]
                    },{
                        title:this.$t('survey.survey_question_14.title'),
                        type: 'radio', // checkbox & textarea
                        defaultValue:'',
                        inputValue:'',
                        id: 13,
                        answerList:[
                            {
                                label:this.$t('survey.survey_question_14.answer1'),
                                value: "Female",
                            },
                            {
                                label:this.$t('survey.survey_question_14.answer2'),
                                value: "Male",
                            },
                            {
                                label:this.$t('survey.survey_question_14.answer3'),
                                value: "Others",
                            },
                        ]
                    },{
                        title:this.$t('survey.survey_question_15.title'),
                        type: 'select', // checkbox & textarea
                        defaultValue:'',
                        inputValue:'',
                        id: 14,
                        answerList:[]
                    },{
                        title:this.$t('survey.survey_question_16.title'),
                        type: 'checkbox', // checkbox & textarea
                        defaultValue:'',
                        inputValue:'',
                        id: 15,
                        answerList:[
                            {
                                label:this.$t('survey.survey_question_16.answer1'),
                                value: "Agriculture, forestry, and fishing",
                            },
                            {
                                label:this.$t('survey.survey_question_16.answer2'),
                                value: "Energy",
                            },
                            {
                                label:this.$t('survey.survey_question_16.answer3'),
                                value: "Information technology/software",
                            },
                            {
                                label:this.$t('survey.survey_question_16.answer4'),
                                value: "Transportation",
                            },
                            {
                                label:this.$t('survey.survey_question_16.answer5'),
                                value: "Entertainment publishing/journalism",
                            },
                            {
                                label:this.$t('survey.survey_question_16.answer6'),
                                value: "Real Estate",
                            },
                            {
                                label:this.$t('survey.survey_question_16.answer7'),
                                value: "Education",
                            },
                            {
                                label:this.$t('survey.survey_question_16.answer8'),
                                value: "Sports",
                            },
                            {
                                label:this.$t('survey.survey_question_16.answer9'),
                                value: "Government",
                                
                            },
                            {
                                label:this.$t('survey.survey_question_16.answer10'),
                                value: "Students",
                                
                            },
                            {
                                label:this.$t('survey.survey_question_16.answer11'),
                                value: "Housewives",
                                
                            },
                            {
                                label:this.$t('survey.survey_question_16.answer12'),
                                value: "Unemployment",
                                
                            },
                            {
                                label:this.$t('survey.survey_question_16.answer13'),
                                value: "Others",
                                text: ''
                            },
                        ]
                    },{
                        title:this.$t('survey.survey_question_17.title'),
                        type: 'radio', // checkbox & textarea
                        defaultValue:'',
                        inputValue:'',
                        id: 16,
                        answerList:[
                            {
                                label:this.$t('survey.survey_question_17.answer1'),
                                value: "Under $30",
                                
                            },
                            {
                                label:this.$t('survey.survey_question_17.answer2'),
                                value: "$30-$50",
                                
                            },
                            {
                                label:this.$t('survey.survey_question_17.answer3'),
                                value: "$50-$100",
                                
                            },
                            {
                                label:this.$t('survey.survey_question_17.answer4'),
                                value: "$100-$200",
                                
                            },
                            {
                                label:this.$t('survey.survey_question_17.answer5'),
                                value: "$300-$500",
                                
                            },
                            {
                                label:this.$t('survey.survey_question_17.answer6'),
                                value: "$500 or more",
                                
                            },
                        ]
                    },
                ],
                questionObject:questionObject,
                maskShow: false,
                result_id: 0,
                hadDoneBefore: false,
                clickSubmit: false,
            }
        },
        components:{
            'nav-bar':NavBar,
            'question-item':Question,
            'submit-btn': SubmitBtn
        },
        computed:{
            ...mapGetters('me', ['message']),
            points(){
                if(this.message.message && this.message.id == 'M1545'){
                    let m = JSON.parse(this.message.message).point;
                    return m
                }
            },
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
            this.$store.dispatch('me/getMessage', 'M1545')
            console.log=()=>{
                
            }
        },
        mounted(){
            this.$nextTick(this.getData())
        },
        beforeDestroy(){
            document.body.style.position = 'static'
        },
        methods:{
            getPoints(){
                store.dispatch("/me/getMessage", 'M1545').then(res => {
                    console.log(res)
                })
            },
            questionChange(data){
                console.log(data)

                const question1Select = this.questionList.find(q => q.id === data.question.id)
                const question2Select = this.questionList1.find(q => q.id === data.question.id)
                const selectedQuestion = question1Select ? question1Select : question2Select
                console.log(selectedQuestion)

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
                const question1Select = this.questionList.find(q => q.id === data.question.id)
                const question2Select = this.questionList1.find(q => q.id === data.question.id)
                const selectedQuestion = question1Select ? question1Select : question2Select
                console.log(selectedQuestion)

                selectedQuestion.inputValue = data.inputValue
            },
            submit(){
                if(this.hadDoneBefore){
                    return;
                }
                console.log('submit')
                for(let i in this.questionObject){
                    let v = ''
                    let inp = ''
                    this.questionList.forEach(q => {
                        console.log(q)
                        console.log(this.questionObject[i])
                        if(q.id == this.questionObject[i].id){
                            v = q.defaultValue
                            inp = q.inputValue
                        }
                    })
                    this.questionList1.forEach(q => {
                        if(q.id == this.questionObject[i].id){
                            v = q.defaultValue
                            inp = q.inputValue
                        }
                    })
                    this.questionObject[i].answer = v
                    if(v.indexOf('Others')!=-1){
                        this.questionObject[i].input = inp
                    }
                }
                // console.log(this.questionObject)
                // return
                let params = {answers: JSON.stringify(this.questionObject)};
                if(this.result_id){
                    params.id = this.result_id
                }
                // console.log(JSON.stringify(this.questionObject))
                // params = {answers: '[{"id":0,"title":"*Regarding shopping fashion items, do you typically make a decision beforehand or at the time of shopping?","answer":"Beforehand","input":""},{"id":1,"title":"*Which factors are important to you when you make the decision to purchase a product?（You can choose one or more）","answer":["Customer services"],"input":""},{"id":2,"title":"*How often do you shop for fashion items?","answer":"Several times a month","input":""},{"id":3,"title":"*What promotion would you prefer?","answer":["Exclusive code"]},{"id":4,"title":"*Which kind of style would you prefer?","answer":"Oversize","input":""},{"id":5,"title":"*How did you know ChicMe?（You can choose one or more）","answer":["Recommend by friends"],"input":""},{"id":6,"title":"*How familiar are you with ChicMe?","answer":"Not at all familiar","input":""},{"id":7,"title":"*How well does our website & APP meet your needs?","answer":"Not at all well","input":""},{"id":8,"title":"*How easy was it to find what you were looking for on our website & APP？","answer":"Not at all easy","input":""},{"id":9,"title":"*Would you recommend ChicMe website and APP to friends or colleagues?","answer":"No","input":""},{"id":10,"title":"*What are the brands that you typically buy ? Please list three of your favorite.","answer":"da","input":""},{"id":11,"title":"*Do you have any comments about how we can improve our website & APP?","answer":"sa","input":""},{"id":12,"title":"*What is your age?","answer":"35-44","input":""},{"id":13,"title":"*What is your gender?","answer":"Others","input":""},{"id":14,"title":"*Which country do you live in?","answer":"FR","input":""},{"id":15,"title":"*What kind of occupation are you in?","answer":["Others"],"input":""},{"id":16,"title":"*On average, how much do you spend on fashion items each month?","answer":"$100-$200","input":""}]'}
                if(this.checkData()){
                    store.dispatch('me/updateSurvey', params).then(res => {
                        if(res.code == 200){
                            this.getData();
                            this.maskShow = true;
                            this.clickSubmit = true;
                            document.body.style.position = 'fixed'
                        }
                    })
                }
            },
            checkData(){
                console.log(this.questionObject)
                for(let i in this.questionObject){
                    if(!this.questionObject[i]['answer'] || 
                       JSON.stringify(this.questionObject[i]['answer'])=="[]" || 
                       JSON.stringify(this.questionObject[i]['answer'])=="{}"){ 
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
                store.dispatch("me/getSurvey",{}).then(data => data.result).then(result => {
                    if(result){
                        const {answers:answersJSON,id} = result
                        let answers;
                        if(answersJSON){
                            console.log(result)
                            answers = JSON.parse(answersJSON)
                            this.questionList.forEach(question => {
                            const selectedQuestion = this.getThatQuestion(question.id, answers)
                                if(selectedQuestion)
                                    question.defaultValue = selectedQuestion.answer
                                    question.inputValue = selectedQuestion.input
                            })
                            this.questionList1.forEach(question1 => {
                                const selectedQuestion = this.getThatQuestion(question1.id, answers)
                                if(selectedQuestion)
                                    question1.defaultValue = selectedQuestion.answer
                                    question1.inputValue = selectedQuestion.input
                            })
                            console.log(this.questionList,this.questionList1)
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