<template>
    <div class="step3Box">
        <div class="submitDescriptionBox" id="description">
            <div class="selectReasonTitle">
                {{ $t("support.s_description") }}
            </div>

            <textarea
                class="descriptionTextArea"
                :placeholder="$t('support.s_description_ph')"
                :value="questionObject.descriptionInput"
                @input="(e) => descriptionTextAreaChange(e)"></textarea>

            <div class="textAreaInputLength">
                {{ (questionObject.descriptionInput ? questionObject.descriptionInput.length : '0') + '/1000' }}
            </div>
        </div>

        <!-- {/* 图片上传 */} -->
        <div class="submitImageBox" id="imgUpload">
            <div class="selectReasonTitle">
                {{ $t("support.s_upload_image") }}
            </div>

            <div class="uploadTips">{{ $t("support.s_upload_tips") }} </div>

            <div class="uploadBox">
                <div class="uploadItem" v-for="(item, index) in questionObject.uploadImgList" :key="index">
                    <span class="deleteImg" @click="() => deleteImg(index)">&times;</span>
                    <img :src="formateImgUrl(item)" alt="" />
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
</template>

<script>
import data from '../../common'
export default {
    props:{
        questionObject:{
            type: Object,
            default:{
                descriptionInput: '',
                uploadImgList: [],
                uploadImgFileList: []
            }
        }
    },
    data(){
        return {
        }
    },
    created(){
    },
    methods:{
        descriptionTextAreaChange(e){
            this.$emit("descriptionTextAreaChange", e)
        },
        questionImgUpload(e){
            this.$emit("questionImgUpload", e)
        },
        deleteImg(index){
            this.$emit("questionImgUpload", index)
        },
        formateImgUrl(url){
            return data.IMAGE_GEEKO_LTD + url
        }
    }
}
</script>

<style lang="scss" scoped>
.step3Box{
    height: calc(100% - 121px);
    overflow: auto;
    width: 100%;
    padding-bottom: 90px;

    .selectReasonTitle, .uploadTips{
        text-align: left;
    }
    
    .selectReasonTitle{
        font-family: Roboto-Bold, Roboto;
        font-weight: bold;
    }
}
.submitDescriptionBox{
    width: 100%;
    min-height: 185px;
    padding: 0px 24px;
    // border-bottom: 10px solid #f6f6f6;
    position: relative;

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
            color: #666;
        }
    }

    .textAreaInputLength{
        position: absolute;
        right: 35px;
        bottom: 35px;
        width: 70px;
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
    padding: 0px 24px;

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
</style>