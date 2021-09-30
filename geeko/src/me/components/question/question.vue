<template>
    <div :class="!noBorder?'question':'question lastChild'" :id="'question'+(index+1)">
        <div class="question-title">{{title}}</div>
        <div v-if="type == 'radio'" class="question-answer-list">
            <div v-for="(item, index) in answerList" 
                 :key="index"
                 :class="{'answer': true, 'answer-selected': defaultV==item.value}"
                 >
                <label :for="title+item.value" >
                    <div class="answer-content">{{index + 1}}. {{item.label}}</div>
                    <div class="answer-select">
                        <i class="iconfont">&#xe638;</i>
                    </div>
                </label>
                <input :disabled="hadDoneBefore" type="radio" :name="title" :value='item.value' :id='title+item.value' @change="changeHandle($event, 'input')"/>
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
                    <div class="answer-content">{{index + 1}}. {{item.label}}</div>
                    <div class="answer-select">
                        <i class="iconfont">&#xe638;</i>
                    </div>
                </label>
                <input :disabled="hadDoneBefore" type="checkbox" :name="title" :value='item.value' :id='title+item.value' @change="changeHandle($event, 'input')"/>
                <div class="checkboxTextArea" v-if="item.value=='Others'&&defaultV.indexOf(item.value) != -1 ">
                    <textarea :disabled="hadDoneBefore" :value='inputValue' @change="othersChange($event)"></textarea>
                </div>
            </div>
        </div>

        <div v-if="type == 'textarea'" class="question-answer-list">
            <textarea :disabled="hadDoneBefore" cols="30" rows="10" :value='defaultV' @change="changeHandle($event,'textarea')"></textarea>
        </div>

        <div v-if="type == 'select'" class="question-answer-list">
            <!-- <div class="selectBox">
                <div class="selectInputBox" @click="openSelect()">
                    <span>{{selectedValue}}</span>
                    <div v-if="selectOpen == true" class="selectOptionBox">
                        <div class='selectOption gray'>Country</div>
                        <div :class="{'selectOption':true, 'selectOption-select': defaultV == item.value}"
                            v-for="(item, index) in countries" 
                            :key="index"  
                            :value="item.value"
                            @click="optionClick(item)"
                            >
                            {{item.label}}
                        </div>
                    </div>
                </div>
                
                <span :class="{'iconfont selectIcon': true, 'option-open': selectOpen}">&#xe692;</span>
            </div> -->
            <m-select :defaultV="selectItem" 
                      :countries="countries"
                      @optionClick="optionClick"
                    ></m-select>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import _ from 'lodash';
    import Select from '../countrySelect/select.vue'

    export default{
        data(){
            return {
                selectOpen: false,
                selectItem: 'Country',
                othersInput: ''
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
                required: true,
            },
            inputValue: {
                default: ''
            },
            hadDoneBefore: {
                type: Boolean,
                required: true,
                default:false,
            }
        },
        computed:{
            countries(){
                return this.$store.getters.countries
            },
            selectedValue:function(){
                return this.defaultV ? this.countries.length>0 ? this.countries.find(cty => cty.value == this.defaultV).label : 'Country' : 'Country'
            }
        },
        watch:{
            hadDoneBefore:function(newV,oldV){
                console.log(newV, oldV)
            }
        },
        created(){
            if(this.type == 'select'){
                
                // this.$store.dispatch('getCountries');
            } else if(this.type == 'radio' || this.type == 'textarea'){
            } else if(this.type == 'checkbox'){
            }
        },
        activated(){
        },
        deactivated(){
            // this.suspendShow = false;
        },
        
        watch:{
        },
        methods: {
            openSelect(){
                // console.log('sss')
                if(!this.hadDoneBefore){
                    this.selectOpen = !this.selectOpen
                }
            },
            optionClick(item){
                console.log(item)
                if(!this.hadDoneBefore){
                    this.selectItem = item.label;
                    this.selectOpen = !this.selectOpen;
                    this.$emit("change", {question: this.question, selectedValue: item.value})
                }
            },
            
            changeHandle(e, type){
                console.log(e)
                if(!this.hadDoneBefore){
                    if(type=='textarea'){
                        this.$emit("otherChange",{
                            question: this.question,
                            inputValue: e.target.value
                        })
                    }
                    this.$emit("change", {
                        question: this.question,
                        selectedValue: e.target.value
                    })
                }
            },
            othersChange(e){
                console.log(e.target.value)
                console.log(this.question)
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
        -moz-osx-font-smoothing: grayscale;}
    .question{
        width: 94%;
        padding: 18px 0;
        margin: 0 auto;
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

                input{
                    display: none;
                }

                label{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
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

                    & > i {
                        font-size: 12px;
                        margin-top: 1px;
                    }
                }

                
            }
            .answer-selected {
                .answer-content{
                    // font-family: Roboto-Medium;
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
</style>