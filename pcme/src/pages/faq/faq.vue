<template>
    <div class="faqPage">
        <!-- faqzzz -->
        <!--  -->
        <div class="questionInput">
            <div class="howTxt">How Can I Help You? </div>
            <div class="howInput">
                <faq-input
                    :inputValue="searchValue"
                    :searchList="searchList"
                    @inputChange="(e)=>inputChange(e)"
                    @relatedSearch="(e)=>relatedSearch(e)"
                    @inputSearch="inputSearch()"
                    ></faq-input>
            </div>
        </div>

        <div class="questionTypeBox">
            <div :class="{'questionTypeItem':true, 'questionTypeItemSelect':item.content==questionType}" 
                 v-for="(item, index) in buttonList" 
                 :key="index" 
                 @click="changeType(item.content)">
                <span class="iconfont entryIcon" v-html="item.imgUrl"></span>
                <span>{{item.txt}}</span>
            </div>
        </div>

        <div class="questionsOfType">
            <div class="questionsItem" v-for="(item,index) in groupSelectQuestions" :key="index" @click="goToDetail(item)">
                {{item.title}}
                <div class="questionContent" v-if="item.id == questionContent.id" v-html="questionContent.richText"> 

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FaqInput  from '../../components/faq/faq-input.vue'
import {questions, secondaries} from '../../faqData/index'
import * as utils from '../../utils/geekoutil'
import _ from 'lodash'
let buttonList = [
    {
        imgUrl: "&#xe6ee;",
        txt: "Order Processing",
        to: `${(window.ctx || '')}/support/faq`,
        content:"order",
        type:""
    },
    {
        imgUrl: "&#xe6f1;",
        txt: "Logistics Tracking",
        to: `${(window.ctx || '')}/support/faq`,
        content:"delivery",
        type:""
    },
    {
        imgUrl: "&#xe6ed;",
        txt: "Return & Refund",
        to:`${(window.ctx || '')}/support/faq`,
        content:"return",
        type:""
    },
    {
        imgUrl: "&#xe6ec;",
        txt: "Product & Stock",
        to: `${(window.ctx || '')}/support/faq`,
        content:"payment",
        type:""
    },
    {
        imgUrl: "&#xe6ef;",
        txt: "Payment & Promos",
        to: `${(window.ctx || '')}/support/faq`,
        content:"products",
        type:""
    },
    {
        imgUrl: "&#xe6f2;",
        txt: "Account Issues",
        to: `${(window.ctx || '')}/support/faq`,
        content:"account",
        type:""
    },
]
export default {
    data(){
        return{
            count: 0,
            searchValue: '',
            secondaries,
            questions,
            searchList: [],
            groupQuestions: [],
            groupSelectQuestions: [],
            buttonList,
            questionType: 'order',
            questionsOfType:[],
            questionContent: {}
        }
    },
    mounted(){
        // console.log(this.$router.currentRoute.query.type)
        let type = this.$router.currentRoute.query.type ?
                   this.$router.currentRoute.query.type :'order';

        if(this.questions.length > 0){
            let list = [];
            for(let i = 0; i < this.questions.length; i++){
                if(this.questions[i].id!='root-7' && this.questions[i].id != 'root-8'){
                    list = list.concat(this.questions[i]['questions'])
                    this.groupQuestions = this.groupQuestions.concat(this.questions[i])
                }
            }
            this.searchList = list
            // console.log(this.groupQuestions)
            this.changeType(type)
        }
    },
    computed:{
    },
    components:{
        'faq-input': FaqInput
    },
    methods:{
        inputChange(e){
            this.searchValue = e;
        },
        inputSearch(){
            this.$router.push({ path: utils.ROUTER_PATH_ME + '/m/faq/search-result', query: {search: this.searchValue} })
        },
        changeType(e){
            console.log(e)
            this.questionType = e
            this.groupSelectQuestions = this.groupQuestions.find(q => q.title.toLowerCase() == e).questions
        },
        relatedSearch(e){
            console.log("F: ",e)
            this.$router.push({ path: utils.ROUTER_PATH_ME + '/m/faq/search-result-detail', query: {showId: e} })
        },
        goToDetail(item){
            if(item.id !== this.questionContent.id){
                this.questionContent = _.cloneDeep(item);
                this.questionContent.richText = this.removeHeader(item.richText);
                // console.log(this.questionContent.richText)
            }
        },
        removeHeader(text){
            let before = text.split("<header>")[0];
            let after = text.split("</header>")[1];
            let noHeader = before + after;
            // 1. <a href="https://www.chicme.com/... 替换成 <a href="/...或者 <a href="wanna/...
            noHeader = noHeader.replace(/(<a href="https:\/\/www.chicme.com)/g, ()=>{return `<a href="${(window.ctx || '')}`});
            // 2. >https://www.chicme.com/fs/shipping-policy-pc 替换成 shipping-policy
            noHeader = noHeader.replace(/(>https:\/\/www.chicme.com\/fs\/shipping-policy-pc)/g, ()=>{return '>shipping-policy'});
            // 3. >https://www.chicme.com/fs/shipping-policy-pc 替换成 shipping-policy
            noHeader = noHeader.replace(/(>https:\/\/www.chicme.com\/fs\/wholesale-program-pc)/, ()=>{return '>wholesale-program'});
            // 4. chicme、Chicme、chic me、Chic me 替换为 window.floderName
            noHeader = noHeader.replace(/(chicme|Chicme|Chic me|chic me|Chic Me|chic Me|ChicMe|chicMe)/g, ()=>{return window.floderName? window.floderName: 'Chicme'});
            // 5. 图片宽度设为最宽300px
            noHeader = noHeader.replace(/(<img)/g, ()=>{return "<img style='width: 300px;'"})
            // 文字字体设置
            noHeader = noHeader.replace(/(<article)/g, ()=>{return "<article style='font-size:14px;color: #222;line-height:32px;font-family:SlatePro-Regular;'"})
            noHeader = noHeader.replace(/(<header)/g, ()=>{return "<header style='margin-bottom: 21px;'"})
            return noHeader;
        }
    }
}
</script>

<style lang="scss" scoped>
.faqPage{
    max-width: 1200px;
    margin: 0 auto;

    .questionInput{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .howTxt{
            margin: 52px 0 12px;
            font-family: SlatePro-Medium;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #222222;
        }

        .howInput{
            width: 488px;
        }
    }

    .questionTypeBox{
        width: 100%;
        height: 160px;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-top: 32px;

        .questionTypeItem{
            width: 190px;
            height: 150px;
            background-color: #f6f6f6;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            margin-bottom: 16px;
            font-family: Roboto-Regular;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 14px;
            letter-spacing: 0px;
            color: #222222;
            cursor: pointer;
            position: relative;

            .entryIcon{
                color: #000;
                font-size: 35px;
                line-height: 36px;
                margin-bottom: 16px;
            }

             &:hover{
                background-color: #222;
                color: #fff;

                .entryIcon{
                    color: #fff;
                }
            }
        }
        .questionTypeItemSelect{
            background-color: #222;
            color: #fff;

            .entryIcon{
                color: #fff;
            }
            &::after{
                content: ' ';
                display: block;
                width: 14px;
                height: 14px;
                background-color: #222;
                transform: rotate(45deg);
                position: absolute;
                bottom: -7px;
                left: calc(50% - 7px);
            }
        }
    }

    .questionsOfType{
        margin-top: 20px;
        font-family: Roboto-Regular;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #222222;
        line-height: 44px;

        .questionsItem{
            cursor: pointer;

            .questionContent{
                font-family: SlatePro-Regular;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 18px;
                letter-spacing: 0px;
                color: #222222;
                border-top: solid 1px #e6e6e6;
                border-bottom: solid 1px #e6e6e6;
                padding: 21px;
                line-height: 30px;
            }
        }
    }
}
    
</style>