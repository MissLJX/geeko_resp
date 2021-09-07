<template>
    <div class="survey">
        <div class="fixed-header">
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

        <div class="survey-container">
            <div class="survey-info">
                <div class="info-title">Dear Customer</div>
                <div class="info-content">To thank you for your support, we will offer you 200 points to your ChicMe account.</div> 
            </div>

            <question-item v-for='(item,index) in questionList' 
                           :noBorder="index == questionList1.length-1"
                           :index="index"
                           :key="item.title.split(' ')[-1]" 
                           :title='item.title' 
                           :type='item.type'
                           :answerList='item.answerList'
                           @change="(e)=>questionChaneg(e)"
                           v-model="questionList"
                           ></question-item>


            <div class="survey-info">
                <div class="info-content">To help us better understand your needs, please kindly provide us some additional information. We guarantee the confidentiality and security in the treatment of your personal data. All your answers are guaranteed to remain anonymous.</div> 
            </div>

            <question-item v-for='(item,index) in questionList1' 
                           :noBorder="index == questionList1.length-1"
                           :index="index"
                           :key="item.title.split(' ')[-1]" 
                           :title='item.title' 
                           :type='item.type'
                           :answerList='item.answerList'
                           @change="(e)=>questionChaneg(e)"
                           v-model="questionList1"
                           ></question-item>

            <submit-btn @toSubmit="submit()" title="submit" class="edit-footer" active-fixed="true"></submit-btn>

            <div class="mask">
                
            </div>
        </div>
    </div>
</template>

<script>
    import NavBar from '../components/nav-bar.vue'
    import Question from '../components/question/question.vue'
    import SubmitBtn from "../../components/submit-btn.vue"
    import store from "../../store/index";
    import {mapGetters, mapActions} from 'vuex';

    let questionObject = {
        'question1':{
            title:'*Regarding shopping fashion items, do you typically make a decision beforehand or at the time of shopping?',
            answer:''
        },
        'question2':{
            title:'*Which factors are important to you when you make the decision to purchase a product?（You can choose one or more）',
            answer:''
        },
        'question3':{
            title:'*How often do you shop for fashion items?',
            answer:''
        },
        'question4':{
            title:'*Which factors are important to you when you make the decision to purchase a product?（You can choose one or more）',
            answer:''
        },
        'question5':{
            title:'*Which kind of style would you prefer?',
            answer:''
        },
        'question6':{
            title:'*How did you know ChicMe?（You can choose one or more）',
            answer:''
        },
        'question7':{
            title:'*How familiar are you with ChicMe?',
            answer:''
        },
        'question8':{
            title:'*How well does our website & APP meet your needs?',
            answer:''
        },
        'question9':{
            title:'*How easy was it to find what you were looking for on our website & APP？',
            answer:''
        },
        'question10':{
            title:'*Would you recommend ChicMe website and APP to friends or colleagues?',
            answer:''
        },
        'question11':{
            title:'*What are the brands that you typically buy ? Please list three of your favorite.',
            answer:''
        },
        'question12':{
             title:'*Do you have any comments about how we can improve our website & APP?',
            answer:''
        },
        'question13':{
            title:'*What is your age?',
            answer:''
        },
        'question14':{
            title:'*What is your gender?',
            answer:''
        },
        'question15':{
            title:'*Which country do you live in?',
            answer:''
        },
        'question16':{
            title:'*What kind of occupation are you in?',
            answer:''
        },
        'question17':{
            title:'*On average, how much do you spend on fashion items each month?',
            answer:''
        },
        
    }

    export default {
        name:"Survey",
        data(){
            return {
                emptyShow:false,
                inputSelect:'title1',
                questionList:[{
                    title:'*Regarding shopping fashion items, do you typically make a decision beforehand or at the time of shopping?',
                    type: 'radio', // checkbox & textarea
                    answerList:[
                        {
                            label:'Beforehand',
                            value: "Beforehand",
                            select: true,
                        },
                        {
                            label: 'At the time of purchase',
                            value: 'At the time of purchase',
                            select: false
                        }
                    ]
                },{
                    title:'*Which factors are important to you when you make the decision to purchase a product?（You can choose one or more）',
                    type: 'checkbox', // checkbox & textarea
                    answerList:[
                        {
                            label:'Brand',
                            value: "Brand",
                            select: true,
                        },
                        {
                            label: 'Price',
                            value: 'Price',
                            select: false
                        },
                        {
                            label: 'Quality',
                            value: 'Quality',
                            select: false
                        },
                        {
                            label: 'Style',
                            value: 'Style',
                            select: false
                        },
                        {
                            label: 'Color choices',
                            value: 'Color choices',
                            select: false
                        },
                        {
                            label: 'Return and change',
                            value: 'Return and change',
                            select: false
                        },
                        {
                            label: 'Customer services',
                            value: 'Customer services',
                            select: false
                        },
                        {
                            label: 'Free shipping',
                            value: 'Free shipping',
                            select: false
                        },
                    ]
                },{
                    title:'*How often do you shop for fashion items?',
                    type: 'radio', // checkbox & textarea
                    answerList:[
                        {
                            label:'Several times a week',
                            value: "Several times a week",
                            select: true,
                        },
                        {
                            label: 'About once a week',
                            value: 'About once a week',
                            select: false
                        },
                        {
                            label: 'Several times a month',
                            value: 'Several times a month',
                            select: false
                        },
                        {
                            label: 'About once a month',
                            value: 'About once a month',
                            select: false
                        },
                        {
                            label: 'Less than once a month',
                            value: 'Less than once a month',
                            select: false
                        },
                    ]
                },{
                    title:'*Which factors are important to you when you make the decision to purchase a product?（You can choose one or more）',
                    type: 'checkbox', // checkbox & textarea
                    answerList:[
                        {
                            label:'Discount',
                            value: "Discount",
                            select: true,
                        },
                        {
                            label: 'Coupon',
                            value: 'Coupon',
                            select: false
                        },
                        {
                            label: 'Purchase with gift',
                            value: 'Purchase with gift',
                            select: false
                        },
                        {
                            label: 'Bonus point',
                            value: 'Bonus point',
                            select: false
                        },
                        {
                            label: 'Exclusive code',
                            value: 'Exclusive code',
                            select: false
                        },
                    ]
                },{
                    title:'*Which kind of style would you prefer?',
                    type: 'radio', // checkbox & textarea
                    answerList:[
                        {
                            label:'Regular fit',
                            value: "Regular fit",
                            select: true,
                        },
                        {
                            label:'Oversize',
                            value: "Oversize",
                            select: true,
                        },
                        {
                            label:'Slim',
                            value: "Slim",
                            select: true,
                        },
                        {
                            label: "I'm willing to try differnet styles",
                            value: "I'm willing to try differnet styles",
                            select: true,
                        },
                    ]
                },{
                    title:'*How did you know ChicMe?（You can choose one or more）',
                    type: 'checkbox', // checkbox & textarea
                    answerList:[
                        {
                            label:'Google',
                            value: "Google",
                            select: true,
                        },
                        {
                            label:'Facebook',
                            value: "Facebook",
                            select: true,
                        },
                        {
                            label:'Instagram',
                            value: "Instagram",
                            select: true,
                        },
                        {
                            label:'YouTube',
                            value: "YouTube",
                            select: true,
                        },
                        {
                            label:'Tik Tok',
                            value: "Tik Tok",
                            select: true,
                        },
                        {
                            label:'Pinterest',
                            value: "Pinterest",
                            select: true,
                        },
                        {
                            label:'Recommend by friends',
                            value: "Recommend by friends",
                            select: true,
                        },
                        {
                            label:'Others',
                            value: "Others",
                            select: true,
                        },
                    ]
                },{
                    title:'*How familiar are you with ChicMe?',
                    type: 'radio', // checkbox & textarea
                    answerList:[
                        {
                            label:'Extremely familiar',
                            value: "Extremely familiar",
                            select: true,
                        },
                        {
                            label:'Very familiar',
                            value: "Very familiar",
                            select: true,
                        },
                        {
                            label:'Somewhat familiar',
                            value: "Somewhat familiar",
                            select: true,
                        },
                        {
                            label:'Not so familiar',
                            value: "Not so familiar",
                            select: true,
                        },
                        {
                            label:'Not at all familiar',
                            value: "Not at all familiar",
                            select: true,
                        },
                    ]
                },{
                    title:'*How well does our website & APP meet your needs?',
                    type: 'radio', // checkbox & textarea
                    answerList:[
                        {
                            label:'Extremely well',
                            value: "Extremely well",
                            select: true,
                        },
                        {
                            label:'Very well',
                            value: "Very well",
                            select: true,
                        },
                        {
                            label:'Somewhat well',
                            value: "Somewhat well",
                            select: true,
                        },
                        {
                            label:'Not so well',
                            value: "Not so well",
                            select: true,
                        },
                        {
                            label:'Not at all well',
                            value: "Not at all well",
                            select: true,
                        },
                    ]
                },{
                    title:'*How easy was it to find what you were looking for on our website & APP？',
                    type: 'radio', // checkbox & textarea
                    answerList:[
                        {
                            label:'Extremely easy',
                            value: "Extremely easy",
                            select: true,
                        },
                        {
                            label:'Very easy',
                            value: "Very easy",
                            select: true,
                        },
                        {
                            label:'Somewhat easy',
                            value: "Somewhat easy",
                            select: true,
                        },
                        {
                            label:'Not so easy',
                            value: "Not so easy",
                            select: true,
                        },
                        {
                            label:'Not at all easy',
                            value: "Not at all easy",
                            select: true,
                        },
                    ]
                },{
                    title:'*Would you recommend ChicMe website and APP to friends or colleagues?',
                    type: 'radio', // checkbox & textarea
                    answerList:[
                        {
                            label:'Yes',
                            value: "Yes",
                            select: true,
                        },
                        {
                            label:'No',
                            value: "No",
                            select: true,
                        },
                    ]
                },{
                    title:'*What are the brands that you typically buy ? Please list three of your favorite.',
                    type: 'textarea', // checkbox & textarea
                    answerList:[]
                },{
                    title:'*Do you have any comments about how we can improve our website & APP?',
                    type: 'textarea', // checkbox & textarea
                    answerList:[]
                },],
                questionList1:[{
                    title:'*What is your age?',
                    type: 'radio', // checkbox & textarea
                    answerList:[
                        {
                            label:'Under 18',
                            value: "Under 18",
                            select: true,
                        },
                        {
                            label:'18-24',
                            value: "18-24",
                            select: true,
                        },
                        {
                            label:'25-34',
                            value: "25-34",
                            select: true,
                        },
                        {
                            label:'35-44',
                            value: "35-44",
                            select: true,
                        },
                        {
                            label:'45-54',
                            value: "45-54",
                            select: true,
                        },
                        {
                            label:'55-64',
                            value: "55-64",
                            select: true,
                        },
                        {
                            label:'65 plus',
                            value: "65 plus",
                            select: true,
                        },
                    ]
                },{
                    title:'*What is your gender?',
                    type: 'radio', // checkbox & textarea
                    answerList:[
                        {
                            label:'Female',
                            value: "Female",
                            select: true,
                        },
                        {
                            label:'Male',
                            value: "Male",
                            select: true,
                        },
                        {
                            label:'Others',
                            value: "Others",
                            select: true,
                        },
                    ]
                },{
                    title:'*Which country do you live in?',
                    type: 'select', // checkbox & textarea
                    answerList:[]
                },{
                    title:'*What kind of occupation are you in?',
                    type: 'checkbox', // checkbox & textarea
                    answerList:[
                        {
                            label:'Agriculture, forestry, and fishing',
                            value: "Agriculture, forestry, and fishing",
                            select: true,
                        },
                        {
                            label:'Energy',
                            value: "Energy",
                            select: true,
                        },
                        {
                            label:'Information technology/software',
                            value: "Information technology/software",
                            select: true,
                        },
                        {
                            label:'Transportation',
                            value: "Transportation",
                            select: true,
                        },
                        {
                            label:'Entertainment publishing/journalism',
                            value: "Entertainment publishing/journalism",
                            select: true,
                        },
                        {
                            label:'Real Estate',
                            value: "Real Estate",
                            select: true,
                        },
                        {
                            label:'Education',
                            value: "Education",
                            select: true,
                        },
                        {
                            label:'Sports',
                            value: "Sports",
                            select: true,
                        },
                        {
                            label:'Government',
                            value: "Government",
                            select: true,
                        },
                        {
                            label:'Students',
                            value: "Students",
                            select: true,
                        },
                        {
                            label:'Housewives',
                            value: "Housewives",
                            select: true,
                        },
                        {
                            label:'Unemployment',
                            value: "Unemployment",
                            select: true,
                        },
                        {
                            label:'Others',
                            value: "Others",
                            select: true,
                        },
                    ]
                },{
                    title:'*On average, how much do you spend on fashion items each month?',
                    type: 'radio', // checkbox & textarea
                    answerList:[
                        {
                            label:'Under $30',
                            value: "Under $30",
                            select: true,
                        },
                        {
                            label:'$30-$50',
                            value: "$30-$50",
                            select: true,
                        },
                        {
                            label:'$50-$100',
                            value: "$50-$100",
                            select: true,
                        },
                        {
                            label:'$100-$200',
                            value: "$100-$200",
                            select: true,
                        },
                        {
                            label:'$300-$500',
                            value: "$300-$500",
                            select: true,
                        },
                        {
                            label:'$500 or more',
                            value: "$500 or more",
                            select: true,
                        },
                    ]
                },],
                questionObject:questionObject
            }
        },
        components:{
            'nav-bar':NavBar,
            'question-item':Question,
            'submit-btn': SubmitBtn
        },
        computed:{
        },
        created(){
            store.dispatch("me/getSurvey",{}).then(res=>{
                console.log(res)
            })
        },
        methods:{
            // /questionnaire-answer/anon/get'
            /**
             * Handler.ajaxLoaddingHandler(ctx + '/questionnaire-answer/anon/save', 'POST' ,params, function(data) {
    	    			if(data.code == 200){
    	    				if(window.isLoged == "false"){
    	    					window.location.href = ctx + "/i/login?source=survey"
    	    				} else {
    	    					window.location.href = ctx + "/i/trending-now"
    	    				}
    	    			}
    	    		}, null, function(data){
    	    			
    	    		}); 
             */
            // backToPage:function(){

            // }
            questionChaneg(e){
                console.log(e)
                for(let i in this.questionObject){
                    if(this.questionObject[i]['title'] == e.title){
                        this.questionObject[i]['answer'] = e.value
                    }
                }
                console.log(this.questionObject)
            },
            submit(){
                console.log('submit')
                if(this.checkData()){
                    // store.dispatch('me/updateSurvey', questionObject).then(res => {
                    //     console.log(res)
                    // })
                }
            },
            checkData(){
                for(let i in this.questionObject){
                    if(!this.questionObject[i]['answer'] || 
                       this.questionObject[i]['answer'].toString()=="[]" || 
                       this.questionObject[i]['answer'].toString()=="{}"){ 
                           console.log(i)
                           window.location.hash = ""
                           window.location.hash = "#"+i
                           return false
                    }
                }
                return true
            }
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

        question-item:last-child{
            border-bottom: none;
        }

    }
</style>