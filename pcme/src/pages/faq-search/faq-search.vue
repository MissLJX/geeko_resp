<template>
    <div class="faqPage">
        <div class="searchHeader">
            <div class="breadCrumb">
                <span @click="back()">{{$t("support.s_faq")}}</span>
                <span>> {{$t("support.s_search_results")}}</span>
            </div>
            <div class="searchInputBox">
                <faq-input
                    :inputValue="searchValue"
                    :searchList="searchList"
                    @inputChange="(e)=>inputChange(e)"
                    @relatedSearch="(e)=>relatedSearch(e)"
                    @inputSearch="inputSearch()"
                    ></faq-input>
            </div>
        </div>

        <div class="searchResultBox">
            <div class="resultTxt">
                <div>{{$t("support.s_search_results")}}</div>
                <div class="result">{{$t("support.s_result",{num: searchAboutList.length})}} "<span>{{searchValueFromUrl}}</span>"</div>
            </div>

            <div class="resultList">
                <div class="resultListItem" v-for="(item,index) in searchAboutList" :key="index" @click="toDetail(item)">
                    <div class="resultItemTitle" v-html="checkHeader(item.title)"></div>
                    <div class="resultItemContent" v-html="removeHeader(item.richText)"></div>
                </div>

                <dir v-if="searchAboutList.length == 0" class="noResultBox">
                    <span class="iconfont">&#xe7c6;</span>
                </dir>

                <div :class="{'noData':true, 'noMarginTop': searchAboutList.length == 0}">
                    <div class="contactUsBox">
                        <span>{{$t("support.s_have_questions")}}</span>
                        <span class="click" @click="toContact()">{{$t("support.s_onlineHelp")}}</span>
                    </div>
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

export default {
    data(){
        return{
            searchValue: '',
            searchValueFromUrl: '',
            secondaries,
            questions,
            searchList: [],
            groupQuestions: [],
            groupSelectQuestions: [],
            questionType: 'root-2',
            questionsOfType:[],
        }
    },
    created(){
        
        
    },
    mounted(){
        // console.log(this.questions)
        if(JSON.stringify(this.$router.currentRoute.query) != '{}' && this.$router.currentRoute.query){
            this.searchValue = this.$router.currentRoute.query.search
            this.searchValueFromUrl = this.$router.currentRoute.query.search
        }
        let reg = new RegExp(''+this.searchValueFromUrl+'', "ig")
        if(this.questions.length > 0){
            let list = [];
            for(let i = 0; i < this.questions.length; i++){
                if(this.questions[i].id!='root-7' && this.questions[i].id != 'root-8'){
                    list = list.concat(this.questions[i]['questions'])
                }
            }
            this.searchList = list
        }
    },
    computed:{
        searchAboutList(){
            let reg = new RegExp(''+this.searchValueFromUrl+'', "ig")
            let list = _.cloneDeep(this.searchList)
            let searchAbout = list.map(s => {
                s.title = s.title.replace(reg, (e)=>{return '<strong style="color:#3483f4;">'+e+'</strong>'})
                return s
            })
            let searchAboutList = []
            searchAbout.forEach(s => {
                if(s.title.indexOf("<strong")!=-1){
                    searchAboutList.push(s)
                }
            })
            return searchAboutList
        }
    },
    components:{
        'faq-input': FaqInput
    },
    methods:{
        inputChange(e){
            this.searchValue = e;
        },
        changeType(e){
            // console.log(e)
            this.questionType = e
            this.groupSelectQuestions = this.groupQuestions.find(q => q.title.toLowerCase() == e).questions
        },
        relatedSearch(item){
            // console.log("F: ",item)
            this.$router.push({ path: utils.ROUTER_PATH_ME + '/m/faq/search-result-detail', query: {showId: item}})
        },
        inputSearch(){
            var pageSearch = window.location.href.split("=")[1];
            if(pageSearch != this.searchValue){
                this.$router.push({ 
                    path: utils.ROUTER_PATH_ME + '/m/faq/search-result', 
                    query: {
                        search: this.searchValue
                    }
                })
            }
        },
        back(){
            window.history.back()
        },
        checkHeader(text){
            text = text.replace(/(chicme|Chicme|Chic me|chic me|Chic Me|chic Me|ChicMe|chicMe)/g, ()=>{return window?.floderName || 'Chicme'});
            return text
        },
        // 去掉头部 将链接改成相对链接
        removeHeader(text) {
            if(!text){
                return
            }
            let before = text.split("<header>")[0];
            let after = text.split("</header>")[1];
            let noHeader = before + after;
            if(window.isShowApp == "true"){
                // 1. <a href="https://www.chicme.com/... 替换成 <a href="/...或者 <a href="wanna/...
                noHeader = noHeader.replace(/(<a href="https:\/\/www.chicme.com)/g, ()=>{return `<a href="chic-me://chic.me/web?href=https://${window.location.host? window.location.host: 'www.chicme.com'}`});
            } else {
                // 1. <a href="https://www.chicme.com/... 替换成 <a href="/...或者 <a href="wanna/...
                noHeader = noHeader.replace(/(<a href="https:\/\/www.chicme.com)/g, ()=>{return `<a href="${(window.ctx || '')}`});
            }
            // 2. >https://www.chicme.com/fs/shipping-policy-pc 替换成 shipping-policy
            noHeader = noHeader.replace(/(>https:\/\/www.chicme.com\/fs\/shipping-policy-pc)/g, ()=>{return '>shipping-policy'});
            // 3. >https://www.chicme.com/fs/shipping-policy-pc 替换成 shipping-policy
            noHeader = noHeader.replace(/(>https:\/\/www.chicme.com\/fs\/wholesale-program-pc)/, ()=>{return '>wholesale-program'});
            // 4. chicme、Chicme、chic me、Chic me 替换为 window.floderName
            noHeader = noHeader.replace(/(chicme|Chicme|Chic me|chic me|Chic Me|chic Me|ChicMe|chicMe)/g, ()=>{return window.floderName? window.floderName: 'Chicme'})
            
            return noHeader;
        },
        toDetail(item){
            // console.log(item)
            this.$router.push({ 
                path: utils.ROUTER_PATH_ME + '/m/faq/search-result-detail', 
                query: {
                    search: this.searchValue, 
                    showId: item.id
                }
            })
        },
        toContact(){

        }
    }
}
</script>

<style lang="scss" scoped>
.faqPage{
    max-width: 1200px;
    margin: 0 auto;

    .searchHeader{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 22px;

        .breadCrumb{
            font-family: SlatePro-Regular;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #666666;
            text-transform:capitalize;
            
            span:first-child{
                text-transform: uppercase;
            }
            span{
                cursor: pointer;
            }
        }

        .searchInputBox{
            width: 230px;
        }
    }

    .searchResultBox{
        width: 100%;
        margin-top: 35px;

        .resultTxt{
            font-family: SlatePro-Bold;
            font-size: 24px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #222222;
            text-align: center;

            .result{
                font-family: SlatePro-Regular;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #666666;
                text-align: center;
                margin-top: 8px;

                span{
                    color: #222;
                }
            }
        }

        .resultList{
            margin-top: 23px;

            .resultListItem{
                border-top: solid 1px #e6e6e6;
                height: 123px;
                overflow: hidden;
                cursor: pointer;

                .resultItemTitle{
                    font-family: SlatePro-Medium;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #222222;
                    margin-top: 21px;
                }
                
                .resultItemContent{
                    font-family: SlatePro-Regular;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 18px;
                    letter-spacing: 0px;
                    color: #222222;
                    line-height: 35px;
                }
            }

            .noResultBox{
                text-align: center;
                padding-left: 0;
                margin-top: 121px;
                margin-bottom: 24px;

                & > span{
                    font-size: 80px !important;
                    line-height: 80px;
                    color: #b2b2b2;
                }
            }

            .noData{

                .contactUsBox{
                    font-family: SlatePro-Regular;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #999999;
                    margin-top: 65px;
                    text-align: center;

                    .click{
                        font-family: SlatePro-Regular;
                        text-decoration: underline;
                        font-size: 14px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #222222;
                        margin-left: 10px;
                        cursor: pointer;
                    }
                }
            }
            .noMarginTop{
                .contactUsBox{
                    margin-top: 0;
                }
            }
        }
    }
}
    
</style>