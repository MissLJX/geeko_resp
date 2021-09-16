<template>
    <div class="survey">    
        <div v-if="false" class="empty-container">
            <div class="_hd">
                <span class="iconfont">&#xe6d8;</span>
            </div>

            <p class="_title">{{$t("point.sorry_empty_here_not")}}</p>
        </div>

        <div class="survey-container">
            <div class="survey-info">
                <div class="info-box">
                    <div class="info-title">Dear Customer</div>
                    <div class="info-content">To thank you for your support, we will offer you 200 points to your ChicMe account.</div> 
                </div>
            </div>

            <question-item v-for='(item,index) in questionList' 
                           :noBorder="index == questionList.length-1"
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
                           ></question-item>

            <div class="survey-info">
                <div class="info-box">
                    <div class="info-content">To help us better understand your needs, please kindly provide us some additional information. We guarantee the confidentiality and security in the treatment of your personal data. All your answers are guaranteed to remain anonymous.</div> 
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
                            ></question-item>
            

            <!-- <button @click="()=>q1.reverse().reverse()">getData</button> -->
            <div class="btnBox">
                <div class="submitBtn" @click="()=>submit()">
                    submit
                </div>
            </div>

            <div v-if="maskShow" class="maskBox">
                <div class="maskInfo">
                    <i class="iconfont maskClose" @click="()=>this.maskShow=false">&#xe7c9;</i>
                    <img src="https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/chicme/2021-9-7/2021-9-7-me-survey-points.png" alt="">
                    <div class="maskContent">
                        Thank you for your time! You've got <strong>200 points</strong> in your account, have a look and enjoy shopping at ChicMe!
                    </div>
                    <div class="maskButton">
                        <div class="maskBtn" @click="()=>goShopping()">Go Shopping</div>
                        <div class="maskBtn view" @click="()=>viewPoints()">View Points</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Question from '../components/question/question.vue'
    import {mapGetters, mapActions} from 'vuex';

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
                        title:this.$t('survey.survey_question_6.title'),
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
                        title:this.$t('survey.survey_question_7.title'),
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
                        title:this.$t('survey.survey_question_10.title'),
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
                isUpdate:false,
                hadDoneBefore: false,
            }
        },
        computed:{
        },
        created(){
            // console.log=()=>{
                
            // }
        },
        mounted(){
            // console.log()
            this.$nextTick(() => {
                this.getData()
            })
        },
        watch:{
        },
        methods:{
            questionChange(data){
                const question1Select = this.questionList.find(q => q.id === data.question.id)
                const question2Select = this.questionList1.find(q => q.id === data.question.id)
                const selectedQuestion = question1Select ? question1Select : question2Select

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
                console.log('submit')

                // this.maskShow = true
                let params = {};
                if(this.result_id){
                    params.id = this.result_id
                }

                for(let i in this.questionObject){
                    let v = ''
                    let inp;
                    this.questionList.forEach(q => {
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
                    if(inp){
                        this.questionObject[i].input = inp
                    }
                }
                params.answers = JSON.stringify(this.questionObject)
                console.log(params);
                if(this.checkData()){
                    this.$store.dispatch('updateSurvey', params).then(res => {
                        console.log(res)
                        if(res.code == 200){
                            this.maskShow = true;
                            this.getData()
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
                           console.log(i)
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
                        let answers = JSON.parse(answersJSON)
                        if(answersJSON){
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
                        }

                        if(answers){
                            this.hadDoneBefore = true;
                        }

                        if(id){
                            this.result_id = id;
                        }

                       
                    }
                })
            }
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
                margin-top: 26px;
                text-transform: uppercase;
                text-align: center;
                line-height: 42px;
                font-family: Roboto-Bold;
                font-size: 14px;
                font-weight: bold;
                font-stretch: normal;   
                letter-spacing: 0px;
                cursor: pointer;
            }
        }
       

        .maskBox{
            width: 100%;
            height: 100vh;
            background-color: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            top: 0;
            z-index: 10;

            .maskInfo{
                width: 424px;
                min-height: 330px;
                background-color: #fff;
                border-radius: 4px;
                position: relative;

                .maskClose{
                    position: absolute;
                    right: 15px;
                    font-size: 15px;
                    top: 15px;
                    color: #999;
                    cursor: pointer;
                }

                img{
                    display: block;
                    width: 125px;
                    height: 80px;
                    margin: 28px auto 18px;
                }

                .maskContent{
                    width: 368px;
                    min-height: 63px;
                    font-family: Roboto-Regular;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 20px;
                    letter-spacing: 0px;
                    color: #222222;
                    margin: 0 auto;
                    text-align: center;
                }

                .maskButton{
                    margin-top: 26px;

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
                        font-family: Roboto-Bold;
                        font-size: 16px;
                        font-weight: normal;
                        font-stretch: normal;
                        line-height: 19px;
                        letter-spacing: 0px;
                        color: #ffffff;
                        cursor: pointer;
                    }
                    .view{
                        background-color: #fff;
                        color: #222;
                        border: solid 1px #cacaca;
                        margin-top: 12px;
                        margin-bottom: 24px;
                    }
                }
            }
        }

    }
</style>