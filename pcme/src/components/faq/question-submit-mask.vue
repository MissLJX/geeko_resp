<template>
    <div class="questionSubmitMask">
        <div class="questionSubmitContent">

            <span style="display:block;width:100%;text-align:right;background-color:#fff;" @click="() => clearTicketData()">
                <span class="iconfont clearTicketData">&#xe69a;</span>
            </span>

            <div class="userInputBox">
                <!-- {/* 提示语 */} -->
                <div class="submitTips" id="top">
                    <span>{{ $t("support.s_submit_tips") }}</span>
                </div>

                <!-- {/* 原因选择 */} -->
                <div class="submitSelectReason" id="submitSelect" v-if="questionsReason && questionsReason.length > 0">
                    <!-- {/* 选择标题 */} -->
                    <div class="selectReasonTitle">
                        <span>*</span> {{ $t("support.s_select_reason") }}
                    </div>

                    <!-- {/* 选择下拉框 */} -->
                    <div class="selectReasonBox" id="selectReason">
                        <div class="selectReasonInput"
                            @click="() => changeQuestionObject({ ...questionObject, showSelectItem: !questionObject.showSelectItem})">
                            <span>{{ questionsReason.find(q => q.isSelected == true) ? questionsReason.find(q => q.isSelected
                                == true).label : $t("support.s_select_reason") }}</span>
                            <span
                                :class="{ 'iconfont selectReasonIcon': true, 'selected': questionObject.showSelectItem }">&#xe692;</span>
                        </div>

                        <!-- {/* 选项框 */} -->
                        <div class="selectReasonItemBox" v-if="questionObject.showSelectItem">
                            <!-- {/* 选项 */} -->
                            <div :class="{ 'selectReasonItem': true, 'showTextArea': item.value === questionsReason[questionsReason.length - 1].value && item.isSelected }"
                                :key="index" @click="() => questionTypeChange(item)" v-for="(item, index) in questionsReason">
                                <div>
                                    <div :class="{ 'reasonItemIcon': true, 'reasonItemIconSelect': item.isSelected }">
                                        <span class="reasonItemIconSelected"></span>
                                    </div>
                                    <div :class="{ 'reasonItem': true, 'reasonItemSelect': item.isSelected }">{{ item.label }}
                                    </div>
                                </div>

                                <textarea
                                    v-if="item.value === questionsReason[questionsReason.length - 1].value && item.isSelected"
                                    :class="{ 'reasonTextArea': true }" :id="'reasonInput' + item.label" @change="(e) => {
                                        changeQuestionObject({
                                            ...questionObject,
                                            questionTypeInput: e.target.value
                                        })
                                    }">
                            </textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- {/* 文字描述 */} -->
                <div class="submitDescriptionBox" id="description">
                    <!-- {/* 标题 */} -->
                    <div class="selectReasonTitle">
                        <span v-if="descriptionRequired">*</span> {{ $t("support.s_description") }}
                    </div>

                    <!-- {/* 输入框 */} -->
                    <textarea class="descriptionTextArea" :placeholder="$t('support.s_description_ph')"
                        :value="questionObject.descriptionInput" @input="(e) => descriptionTextAreaChange(e)"></textarea>
                    <div class="textAreaInputLength">
                        {{ (questionObject.descriptionInput ? questionObject.descriptionInput.length : '0') + '/1000' }}
                    </div>
                </div>

                <!-- {/* 图片上传 */} -->
                <div class="submitImageBox" id="imgUpload">
                    <!-- {/* 标题 */} -->
                    <div class="selectReasonTitle">
                        {{ $t("support.s_upload_image") }}
                    </div>

                    <!-- {/* 上传提示 */} -->
                    <div class="uploadTips">{{ $t("support.s_upload_tips") }} </div>

                    <div class="uploadBox">
                        <div class="uploadItem" v-for="(item, index) in questionObject.uploadImgList" :key="index">
                            <span class="deleteImg" @click="() => deleteImg(index)">&times;</span>
                            <img :src="item" alt="" />
                        </div>

                        <div class="uploadItem" v-if="questionObject.uploadImgList.length < 3">
                            <span class="iconfont">&#xe6d3;</span>
                            <!-- <form ref="questionImg"> -->
                            <input style="opacity:0;position:absolute;width:80px;height:80px;" type="file" id="imageFiles"
                                multiple="multiple" @change="(e) => questionImgUpload(e)"
                                accept="image/jpg,image/jpeg,image/png,image/gif" />
                            <!-- </form> -->
                        </div>

                    </div>
                </div>
            </div>

            <div class="questionSubmitBtnBox">
                <div class="questionSubmitBtn" @click="questionSubmit">
                    {{ $t("support.s_sumbit") }}
                </div>
            </div>


        </div>
    </div>
</template>

<script>
export default {
    props:{
        questionsReason:{
            type: Array,
            default: []
        },
        questionObject:{
            type: Object,
            default: {
                questionTypeInput: '',
                showSelectItem: false,
                descriptionInput: '',
                uploadImgList: [],
                uploadImgFileList: []
            }
        },
        descriptionRequired:{
            type: Boolean,
            default: false
        }
    },
    data(){
        return{
            showClear: false,
        }
    },
    created() {
        !this.placeHolder && (this.placeHolder = this.$t("support.popular_search"))
    },
    beforeDestroy(){
    },
    computed:{
    },
    watch:{
    },
    methods: {
        clearTicketData(){
            this.$emit("clearTicketData")
        },
        changeQuestionObject(obj){
            this.$emit("changeQuestionObject", obj)
        },
        questionTypeChange(data){
            this.$emit("questionTypeChange", data)
        },
        questionImgUpload(e){
            this.$emit("questionImgUpload", e)
        },
        questionSubmit(){
            this.$emit("questionSubmit")
        },
        descriptionTextAreaChange(e){
            this.$emit("descriptionTextAreaChange", e)
        },
        regTxt(txt){
            let reg = new RegExp(''+this.inputValue+'', "ig")
            if(this.inputValue){
                txt = txt.replace(reg, (e)=>{return '<strong>'+e+"</strong>"})
                // console.log(txt)
                if(txt.indexOf('<strong>')!=-1){
                    return txt
                }
            } else {
                return txt
            }
        }
    },
}
</script>


<style scoped lang="scss">
.questionSubmitMask{
    position: absolute;
    top: 0;
    z-index: 11;
    height: 100vh;
    width: 100%;
    background: rgba(0,0,0,0.6);
    text-align: left;

    .questionSubmitContent{
        width: 100%;
        height: 70%;
        position: absolute;
        bottom: 0;
        background: #fff;

        .clearTicketData{
            color:#666;
            line-height: 12px;
            font-size: 12px;
            display: inline-block;
            position: absolute;
            right: 8px;
            top: 6px;
            cursor: pointer;
        }

        .userInputBox{
            height: 100%;
            overflow:auto;
            margin-top:20px;
            padding-bottom:102px;

            &::-webkit-scrollbar{
                display: none;
            }
        }

        .submitTips{
            background-color: #e6e6e6;
            font-family: SlatePro-Regular;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #666666;
            padding: 10px 24px;
            text-align: left;
        }

        .selectReasonTitle{
            font-family: SlatePro-Medium;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color:#222;
            & > span{
                color: #e64545;
            }
        }

        .submitSelectReason{
            width: 100%;
            min-height: 78px;
            padding: 10px 24px;
            border-bottom: 10px solid #f6f6f6;
            font-family: SlatePro-Medium;

            .selectReasonInput{
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 10px;
                cursor: pointer;

                & > span:first-child{
                    font-family: Roboto-Regular;
                    font-size: 12px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #666666;
                    margin-left: 10px;
                }

                & > .selectReasonIcon{
                    color: #222222;
                    font-weight: 600;
                    transform: rotate(0deg);
                    transition: transform 0.3s;
                }

                & > .selected{
                    transform: rotate(180deg);
                    transition: transform 0.3s;
                }
            }

            .selectReasonItemBox{
                margin: 12px 0 16px;

                .selectReasonItem{
                    padding-left: 10px;
                    // padding-bottom: ${props => props.showTextArea ? '17px':'0'};
                    margin-left: 10px;
                    margin-bottom: 2px;
                    width: 427px;
                    min-height: 46px;
                    background-color: #f5f5f5;
                    border-radius: 2px;
                    cursor: pointer;

                    & > div{
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                    }
                }

                .showTextArea{
                    padding-bottom: 17px;
                }

                .reasonItemIcon{
                    display: inline-block;
                    border: 1px solid #999;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;

                    & > span{
                        width: 6px;
                        height: 6px;
                        display: none;
                        border: 1px solid #222;
                        background: #222;
                        border-radius: 50%;
                        margin: 2px;
                    }
                }
                .reasonItemIconSelect{
                    border: 1px solid #222;

                    & > span{
                        display: block;
                    }
                }

                .reasonItem{
                    margin-left: 10px;
                    color: #666;
                    line-height: 46px;
                }
                .reasonItemSelect{
                    color: #222;
                }

                .reasonTextArea{
                    width: 332px;
                        height: 36px;
                        background-color: #ffffff;
                        border-radius: 2px;
                        border: solid 1px #e6e6e6;
                    width: 97%;
                    resize: none;
                    padding: 5px;
                }
            }
        }

        .submitDescriptionBox{
            width: 100%;
            min-height: 235px;
            padding: 23px 24px;
            border-bottom: 10px solid #f6f6f6;

            .descriptionTextArea{
                width: 100%;
                height: 127px;
                background-color: #f5f5f5;
                border-radius: 2px;
                border: solid 1px #eeeeee;
                outline: none;
                resize: none;
                padding: 12px 10px;
                margin-top:12px;

                &::-webkit-input-placeholder{
                    font-family: SlatePro-Regular;
                    font-size: 12px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #bbbbbb;
                }
            }

            .textAreaInputLength{
                width: 100%;
                text-align: right;
                font-family: SlatePro-Regular;
                font-size: 12px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #999999;
                margin-top: 10px;
                // margin-bottom: 16px;
            }
        }
        
        .submitImageBox{
            width: 100%;
            min-height: 72px;
            padding: 23px 24px;
            
            .uploadTips{
                font-family: Roboto-Regular;
                font-size: 12px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #999999;
                margin-top: 8px;
            }

            .uploadBox{
                height: 80px;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                margin-top: 12px;

                .uploadItem{
                    width: 80px;
                    height: 80px;
                    background-color: #f5f5f5;
                    border: solid 1px #eeeeee;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 5px;
                    position:relative;
                    cursor: pointer;

                    & > span{
                        color: #bbb;
                        font-size: 32px;
                        line-height: 32px;
                    }

                    & > .deleteImg{
                        position: absolute;
                        right: 0;
                        top: 0;
                        font-size: 18px;
                        line-height: 16px;
                        color: #fff;
                        background: #222;
                        display: block;
                        width: 18px;
                        height: 18px;
                        border-radius: 50%;
                        text-align: center;
                        cursor: pointer;
                    }

                    & > img {
                        width: 80px;
                        height: 80px;
                        display: inline-block;
                    }
                }
            }
        }

        .questionSubmitBtnBox{
            width: 100%;
            height: 81px;
            background: #fff;
            // box-shadow:
            position: absolute;
            bottom: 0;
            z-index: 1;
            padding: 12px 0;
            box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.5);

            .questionSubmitBtn{
                width: 472px;
                height: 49px;
                background-color: #222222;
                border-radius: 2px;
                text-transform: uppercase;
                font-family: AcuminPro-Bold;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #ffffff;
                text-align: center;
                line-height: 49px;
                margin: 0 auto;
                cursor: pointer;
            }
        }
    }
}
</style>