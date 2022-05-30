<template>
    <div :class="!noBorder?'question':'question lastChild'" :id="'question'+(index+1)">
        <div class="question-title" v-if="title && type !== 'title'">{{replacedSiteName(title)}}</div>
        <div v-if="type == 'radio'" class="question-answer-list">
            <div v-for="(item, index) in answerList" 
                 :key="index"
                 :class="{'answer': true, 'answer-selected': defaultV==item.value}"
                 >
                <label :for="item.value">
                    <div class="answer-select">
                        <i class="iconfont">&#xe638;</i>
                    </div>
                    <div class="answer-content">{{index + 1}}. {{item.label}}</div>
                </label>
                <input :disabled="hadDoneBefore" type="radio" :name="title" :value='item.value' :id='item.value' @change="changeHandle($event)"/>
                <div class="checkboxTextArea" v-if="item.value=='Others'&&defaultV.indexOf(item.value) != -1 ">
                    <textarea :disabled="hadDoneBefore" :value='inputValue' @change="othersChange($event)"></textarea>
                </div>
            </div>
        </div>

        <div v-if="type == 'checkbox'" class="question-answer-list">
            <div v-for="(item, index) in answerList" 
                 :key="index"
                 :class="{'answer': true, 'answer-checkbox':true, 'answer-selected': defaultV.indexOf(item.value) != -1}"
                 >
                <label :for="title+item.value">
                    <div class="answer-select">
                        <i class="iconfont">&#xe638;</i>
                    </div>
                    <div class="answer-content">{{index + 1}}. {{item.label}}</div>
                </label>
                <input :disabled="hadDoneBefore" type="checkbox" :name="title" :value='item.value' :id='title+item.value' @change="changeHandle($event)"/>
                <div class="checkboxTextArea" v-if="item.value=='Others'&&defaultV.indexOf(item.value) != -1 ">
                    <textarea :disabled="hadDoneBefore" :value='inputValue' @change="othersChange($event)"></textarea>
                </div>
                
            </div>
        </div>

        <div v-if="type == 'textarea'" class="question-answer-list">
            <textarea :disabled="hadDoneBefore" cols="30" rows="10" :value='defaultV' @change="changeHandle($event)"></textarea>
        </div>

        <div v-if="type == 'select'" class="question-answer-list">
            <m-select :defaultV="selectItem" 
                      :countries="countries"
                      @optionClick="optionClick"
                    ></m-select>
        </div>

        <div v-if="type=='content'">
            <div class="survey-info">
                <div class="info-box">
                    <div class="info-content">{{replacedSiteName(content)}}</div> 
                </div>
            </div>
        </div>

        <div v-if="type=='title'">
            <div class="survey-info">
                <div class="info-box">
                    <div class="info-title">{{replacedSiteName(title)}}</div>
                    <!-- 加 points参数： -->
                    <div class="info-content">{{replacedSiteName(content)}}</div> 
                </div>
            </div>
        </div>  
    </div>
</template>

<script type="text/ecmascript-6">
    import _ from 'lodash'
    import {createLogger, mapGetters} from 'vuex'
    import Select from '../countrySelect/select.vue'

    export default{
        data(){
            return {
                selectOpen: false,
                selectItem: 'Country'
            }
        },
        props: {
            answerList: {
                type: Array,
                required: true,
            },
            title:{
                type:String,
                required: true,
            },
            type:{
                type: String,
                default: 'radio',
            },
            noBorder: {
                type: Boolean,
                default: false
            },
            index:{
                type: Number,
                default: 0
            },
            defaultV:{
                default:''
            },
            question: {
                type: Object,
            },
            inputValue: {
                default: ''
            },
            hadDoneBefore: {
                type: Boolean,
                required: true,
                default:false,
            },
            content:{
                type: String,
            }
        },
        created(){
            if(this.type == 'select'){
               // 点击其他区域关闭弹窗
                this.$store.dispatch('getCountries');
            } else if(this.type == 'radio' || this.type == 'textarea'){
            } else if(this.type == 'checkbox'){
            }
        },
        mounted(){
        },
        activated(){
        },
        deactivated(){
        },
        
        computed: {
            ...mapGetters(['countries']),
            selectedValue:function(){
                return this.defaultV ? this.countries.find(cty => cty.value == this.defaultV).label : 'Country'

            },
            
        },
        watch:{
        },
        methods: {
            replacedSiteName(content){
                if(content){
                    let text = content.replace(/(chicme|Chicme|Chic me|chic me|Chic Me|chic Me|ChicMe|chicMe)/g, ()=>{return window.name || 'ChicMe'});
                    return text
                }
                return ''
            },
            openSelect(){
                if(!this.hadDoneBefore){
                    this.selectOpen = !this.selectOpen
                }
            },
            optionClick(item){
                if(!this.hadDoneBefore){
                    this.selectItem = item.label;
                    this.selectOpen = !this.selectOpen;
                    this.$emit("change", {question: this.question, selectedValue: item.value})
                }
            },
            closeItem(e){
                if(!this.$el.contains(e.target)){
                    this.selectOpen = false;
                }
            },
            changeHandle(e){
                if(!this.hadDoneBefore){
                    this.$emit("change", {
                        question: this.question,
                        selectedValue: e.target.value
                    })
                }
            },
            othersChange(e){
                if(!this.hadDoneBefore){
                    this.$emit("otherChange",{
                        question: this.question,
                        inputValue: e.target.value
                    })
                }
            }
        },
        components:{
            "m-select": Select
        }
    }
</script>

<style scoped lang="scss">
    @font-face {
        font-family: 'iconfont';  /* project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_g8zwuseogk7.eot');
        src: url('//at.alicdn.com/t/font_384296_g8zwuseogk7.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_384296_g8zwuseogk7.woff') format('woff'),
        url('//at.alicdn.com/t/font_384296_g8zwuseogk7.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_384296_g8zwuseogk7.svg#iconfont') format('svg');
    }
    .iconfont{
        font-family:"iconfont" !important;
        font-size:16px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }
    .question{
        width: 65%;
        min-width: 800px;
        max-width: 1200px;
        margin: 0 auto;
        padding: 18px 0;
        // margin: 0 auto;
        border-bottom: 1px solid #e6e6e6;

        .question-title{
            font-family: Roboto-Regular;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 20px;
            letter-spacing: 0px;
            color: #222222;
        }

        .question-answer-list{
            margin-top: 9px;
            position: relative;

            .answer{
                line-height: 30px;
                color: #666;
                min-width: 100px;
                // border: 1px solid;
                max-width: 500px;
                
                input{
                    display: none;
                }

                label{
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    cursor: pointer;
                }
            
                .answer-select{
                    border: 1px solid #cacaca;
                    background-color: #fff;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: Roboto-Regular;
                    margin-right: 13px;

                    & > i {
                        font-size: 12px;
                        margin-top: 1px;
                    }
                }

                
            }
            .answer-selected {
                .answer-content{
                    // font-family: SlatePro-Medium;
                    color: #222;
                    // text-shadow: 0 0 #222;
                    font-weight: bold;
                }

                .answer-select {
                    background-color: #000;
                    border: 1px solid #000;
                }
            }

            .answer-checkbox{
                .answer-select{
                    border-radius: 2px;

                    & > i {
                        font-size: 12px;
                        margin-top: 1px;
                    }
                }
            }
            textarea{
                width: 100%;
                height: 100px;
                background-color: #f6f6f6;
                /* width: 100%; */
                border: none;
                resize: none;
                /* border-radius: 2px; */
                margin-top: 9px;
                padding: 10px;
                line-height: 1.5;
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
        }

    }
    .lastChild{
        border-bottom: none;
    }
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
            white-space: break-spaces;


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
</style>