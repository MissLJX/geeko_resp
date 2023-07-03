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
                <div class="questionSubmitBtn" @click="questionSubmit()">
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
        searchList:{
            type:Array,
            default:[]
        },
        placeHolder:{
            type:String,
            // default: 'Popular Searches:Refund,Return,Shipping'
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
        inputClear(){
            this.$emit("inputChange", '')
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
</style>