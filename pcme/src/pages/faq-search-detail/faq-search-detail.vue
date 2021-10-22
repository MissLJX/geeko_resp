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

        <div class="questionInfoBox">
            <div class="questionContentBox">
                <div class="questionContent" v-html="removeHeader(content)"></div>
                <div class="contactUsBox" id="pc_support_question_detail_contact_us">
                    <span>{{$t("support.s_have_questions")}}</span>
                    <span class="click">{{$t("support.s_contact_us")}}</span>
                </div>
            </div>
            <div class="questionRelatedBox">
                <div class="relatedTitle">{{$t("support.s_related")}}</div>
                <div class="relatedListBox">
                    <div class="relatedItem" v-for="(item, index) in relatedList" :key="index" @click="relatArticleSearch(item)">
                        {{checkHeader(item.title)}}
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
            showId: '',
            searchValue: '',
            searchValueFromUrl: '',
            secondaries,
            questions,
            searchList: [],
            content: '',
            // relatedList: [],
        }
    },
    created(){
    },
    mounted(){
        if(JSON.stringify(this.$router.currentRoute.query) != '{}' && this.$router.currentRoute.query){
            this.searchValue = this.$router.currentRoute.query.search
            this.searchValueFromUrl = this.$router.currentRoute.query.search
            let id = this.$router.currentRoute.query.showId
            this.showId = id
            let question = this.secondaries.find((q) => q.id == id)
            this.content = question.richText
            // console.log(question)
            // this.relatedList = this.questions.find(q => q.id == question.parentId).questions
        }
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
        relatedList(){
            let question = this.secondaries.find((q) => q.id == this.showId)
            if(question){
                let list = this.questions.find(q => q.id == question.parentId).questions
                let showList = []
                list.forEach((l,index) => {
                    if(index < 4 && l.id != this.showId){
                        showList.push(l)
                    }
                })
                return showList
            } else {
                return []
            }
            
        }
    },
    components:{
        'faq-input': FaqInput
    },
    methods:{
        inputChange(e){
            this.searchValue = e;
        },
        relatedSearch(e){
            // console.log("F: ",e)
            if(this.showId != e){
                this.$router.push({ path: utils.ROUTER_PATH_ME + '/m/faq/search-result-detail', query: {showId: e} })
            }
        },
        inputSearch(){
            var pageSearch = window.location.href.split("=")[1];
            if(pageSearch != this.searchValue){
                 this.$router.push({ path: utils.ROUTER_PATH_ME + '/m/faq/search-result', query: {search: this.searchValue}})
            }
        },
        back(){
            // window.history.back()
            this.$router.push({ path: utils.ROUTER_PATH_ME + '/m/faq/faq'})
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
            let noHeader = text;
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
        },
        relatArticleSearch(item){
            if(this.showId != item.id){
                this.$router.push({ path: utils.ROUTER_PATH_ME + '/m/faq/search-result-detail', query: {showId: item.id}})
            }   
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

            span{
                cursor: pointer;
            }
        }

        .searchInputBox{
            width: 230px;
        }
    }

    .questionInfoBox{
        display: flex;
        justify-content: space-between;
        margin-top: 35px;

        .questionContentBox{

            .questionContent{
                padding-bottom: 28px;
                margin-right: 42px;
                border-bottom: 1px solid #e6e6e6;
                
                article{
                    width: 300px !important;
                }
            }

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
        
    }
    .questionRelatedBox{
        display: inline-block;
        width: 230px;

        .relatedTitle{
            font-family: AcuminPro-Bold;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #222222;
        }

        .relatedListBox{
            width: 230px;
            // height: 170px;
            background-color: #f6f6f6;

            .relatedItem{
                font-family: SlatePro-Regular;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 20px;
                letter-spacing: 0px;
                color: #222222;
                padding: 12px 16px;
                margin-top: 14px;
                cursor: pointer;
            }
        }
    }
    
}
    
</style>