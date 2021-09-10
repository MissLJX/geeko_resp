export const questionList =[
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
        title:'*Which factors are important to you when you make the decision to purchase a product?（You can choose one or more）',
        type: 'checkbox', // checkbox & textarea
        id: 1,
        defaultValue:'',
        inputValue:'',
        answerList:[
            {
                label:'Brand',
                value: "Brand",
            },
            {
                label: 'Price',
                value: 'Price',
            },
            {
                label: 'Quality',
                value: 'Quality',
            },
            {
                label: 'Style',
                value: 'Style',
            },
            {
                label: 'Color choices',
                value: 'Color choices',
            },
            {
                label: 'Return and change',
                value: 'Return and change',
            },
            {
                label: 'Customer services',
                value: 'Customer services',
            },
            {
                label: 'Free shipping',
                value: 'Free shipping',
            },
        ]
    },{
        title:'*How often do you shop for fashion items?',
        type: 'radio', // checkbox & textarea
        id: 2,
        defaultValue:'',
        inputValue:'',
        answerList:[
            {
                label:'Several times a week',
                value: "Several times a week",
            },
            {
                label: 'About once a week',
                value: 'About once a week',
            },
            {
                label: 'Several times a month',
                value: 'Several times a month',
            },
            {
                label: 'About once a month',
                value: 'About once a month',
            },
            {
                label: 'Less than once a month',
                value: 'Less than once a month',
            },
        ]
    },{
        title:'*What promotion would you prefer?',
        type: 'checkbox', // checkbox & textarea
        defaultValue:'',
        inputValue:'',
        id: 3,
        answerList:[
            {
                label:'Discount',
                value: "Discount",
            },
            {
                label: 'Coupon',
                value: 'Coupon',
            },
            {
                label: 'Purchase with gift',
                value: 'Purchase with gift',
            },
            {
                label: 'Bonus point',
                value: 'Bonus point',
            },
            {
                label: 'Exclusive code',
                value: 'Exclusive code',
            },
        ]
    },{
        title:'*Which kind of style would you prefer?',
        type: 'radio', // checkbox & textarea
        defaultValue:'',
        inputValue:'',
        id: 4,
        answerList:[
            {
                label:'Regular fit',
                value: "Regular fit",
            },
            {
                label:'Oversize',
                value: "Oversize",
            },
            {
                label:'Slim',
                value: "Slim",
            },
            {
                label: "I'm willing to try differnet styles",
                value: "I'm willing to try differnet styles",
            },
        ]
    },{
        title:'*How did you know ChicMe?（You can choose one or more）',
        type: 'checkbox', // checkbox & textarea
        defaultValue:'',
        inputValue:'',
        id: 5,
        answerList:[
            {
                label:'Google',
                value: "Google",
            },
            {
                label:'Facebook',
                value: "Facebook",
            },
            {
                label:'Instagram',
                value: "Instagram",
            },
            {
                label:'YouTube',
                value: "YouTube",
            },
            {
                label:'Tik Tok',
                value: "Tik Tok",
            },
            {
                label:'Pinterest',
                value: "Pinterest",
            },
            {
                label:'Recommend by friends',
                value: "Recommend by friends",
            },
            {
                label:'Others',
                value: "Others",
                text: ''
            },
        ]
    },{
        title:'*How familiar are you with ChicMe?',
        type: 'radio', // checkbox & textarea
        defaultValue:'',
        inputValue:'',
        id: 6,
        answerList:[
            {
                label:'Extremely familiar',
                value: "Extremely familiar",
                
            },
            {
                label:'Very familiar',
                value: "Very familiar",
                
            },
            {
                label:'Somewhat familiar',
                value: "Somewhat familiar",
                
            },
            {
                label:'Not so familiar',
                value: "Not so familiar",
                
            },
            {
                label:'Not at all familiar',
                value: "Not at all familiar",
                
            },
        ]
    },{
        title:'*How well does our website & APP meet your needs?',
        type: 'radio', // checkbox & textarea
        defaultValue:'',
        inputValue:'',
        id: 7,
        answerList:[
            {
                label:'Extremely well',
                value: "Extremely well",
                
            },
            {
                label:'Very well',
                value: "Very well",
                
            },
            {
                label:'Somewhat well',
                value: "Somewhat well",
                
            },
            {
                label:'Not so well',
                value: "Not so well",
                
            },
            {
                label:'Not at all well',
                value: "Not at all well",
                
            },
        ]
    },{
        title:'*How easy was it to find what you were looking for on our website & APP？',
        type: 'radio', // checkbox & textarea
        defaultValue:'',
        inputValue:'',
        id: 8,
        answerList:[
            {
                label:'Extremely easy',
                value: "Extremely easy",
                
            },
            {
                label:'Very easy',
                value: "Very easy",
                
            },
            {
                label:'Somewhat easy',
                value: "Somewhat easy",
                
            },
            {
                label:'Not so easy',
                value: "Not so easy",
            },
            {
                label:'Not at all easy',
                value: "Not at all easy",
            },
        ]
    },{
        title:'*Would you recommend ChicMe website and APP to friends or colleagues?',
        type: 'radio', // checkbox & textarea
        defaultValue:'',
        inputValue:'',
        id: 9,
        answerList:[
            {
                label:'Yes',
                value: "Yes",
            },
            {
                label:'No',
                value: "No",
            },
        ]
    },{
        title:'*What are the brands that you typically buy ? Please list three of your favorite.',
        type: 'textarea', // checkbox & textarea
        defaultValue:'',
        inputValue:'',
        id: 10,
        answerList:[]
    },{
        title:'*Do you have any comments about how we can improve our website & APP?',
        type: 'textarea', // checkbox & textarea
        defaultValue:'',
        inputValue:'',
        id: 11,
        answerList:[]
    },
]

export const questionList1 = [
    {
        title:'*What is your age?',
        type: 'radio', // checkbox & textarea
        defaultValue:'',
        inputValue:'',
        id: 12,
        answerList:[
            {
                label:'Under 18',
                value: "Under 18",
            },
            {
                label:'18-24',
                value: "18-24",
            },
            {
                label:'25-34',
                value: "25-34",
            },
            {
                label:'35-44',
                value: "35-44",
            },
            {
                label:'45-54',
                value: "45-54",
            },
            {
                label:'55-64',
                value: "55-64",
                 
            },
            {
                label:'65 plus',
                value: "65 plus",
                 
            },
        ]
    },{
        title:'*What is your gender?',
        type: 'radio', // checkbox & textarea
        defaultValue:'',
        inputValue:'',
        id: 13,
        answerList:[
            {
                label:'Female',
                value: "Female",
                 
            },
            {
                label:'Male',
                value: "Male",
                 
            },
            {
                label:'Others',
                value: "Others",
                 text: ''
            },
        ]
    },{
        title:'*Which country do you live in?',
        type: 'select', // checkbox & textarea
        defaultValue:'',
        inputValue:'',
        id: 14,
        answerList:[]
    },{
        title:'*What kind of occupation are you in?',
        type: 'checkbox', // checkbox & textarea
        defaultValue:'',
        inputValue:'',
        id: 15,
        answerList:[
            {
                label:'Agriculture, forestry, and fishing',
                value: "Agriculture, forestry, and fishing",
            },
            {
                label:'Energy',
                value: "Energy",
            },
            {
                label:'Information technology/software',
                value: "Information technology/software",
            },
            {
                label:'Transportation',
                value: "Transportation",
            },
            {
                label:'Entertainment publishing/journalism',
                value: "Entertainment publishing/journalism",
            },
            {
                label:'Real Estate',
                value: "Real Estate",
            },
            {
                label:'Education',
                value: "Education",
            },
            {
                label:'Sports',
                value: "Sports",
            },
            {
                label:'Government',
                value: "Government",
                 
            },
            {
                label:'Students',
                value: "Students",
                 
            },
            {
                label:'Housewives',
                value: "Housewives",
                 
            },
            {
                label:'Unemployment',
                value: "Unemployment",
                 
            },
            {
                label:'Others',
                value: "Others",
                 text: ''
            },
        ]
    },{
        title:'*On average, how much do you spend on fashion items each month?',
        type: 'radio', // checkbox & textarea
        defaultValue:'',
        inputValue:'',
        id: 16,
        answerList:[
            {
                label:'Under $30',
                value: "Under $30",
                 
            },
            {
                label:'$30-$50',
                value: "$30-$50",
                 
            },
            {
                label:'$50-$100',
                value: "$50-$100",
                 
            },
            {
                label:'$100-$200',
                value: "$100-$200",
                 
            },
            {
                label:'$300-$500',
                value: "$300-$500",
                 
            },
            {
                label:'$500 or more',
                value: "$500 or more",
                 
            },
        ]
    },
]


export const questionObject = [
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