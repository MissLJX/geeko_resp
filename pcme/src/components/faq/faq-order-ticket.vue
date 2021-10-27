<template>
    <div class="orderTicket" v-if="ticket">
        <div class="s-hd">
            <h3>{{$t('ticket')}}</h3>
            <i @click="close" class="iconfont">&#xe7c9;</i>
        </div>
        <div class="s-bd">
            <div class="orderInfo">
                
                <div>
                    <p><span>{{$t('orderno')}} </span>{{ticket.id}}</p>
                    <p><span>{{$t('timeofpayment')}} </span>{{getDate(ticket.orderTime)}}</p>
                </div>
                <i @click="selectorder" class="iconfont">&#xe66b;</i>
            </div>
            <div class="help">
                <!-- {{$t('howcanwehelp')}} -->
                <h3>{{$t("support.s_help_you")}}</h3>
                <faq-select :class="{'faqSelect':true, 'redBorder':isRequired}"
                            :selectValue="selected" 
                            :selectList="usedQuestionType" 
                            :isRadius="true" 
                            @selectChange="selectChange($event)">
                            </faq-select>
            </div>
        </div>
        <div class="s-cd" >
            <div v-if="ticket_con">
                <div v-for="(item1, index1) in groupReplies" :key="index1">
                    <div v-for="(item, index) in item1['replies']" :key="index">
                        <div v-if="index == 0" style="text-align:center;color:#999;font-size:12px;height:20px;line-height:40px;">{{item1['date']}}</div>
                        <div class="buyer" v-if="item.sender === 'seller'">
                            <div class="el-me-headerImage fl" :style="{'background-image': 'url('+sellerheaderImage+')' }" style="margin-right: 10px"></div>
                            <div class="cet fl">
                                <div class="sanjiao-left"></div>
                                <div class="txtcontent">
                                    <p>{{item.message}}</p>
                                    <div class="imgarea" v-if="item.imageUrls">
                                        <img v-for="(img, index) in item.imageUrls" :key="index" :src="imgUrl(img)">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="buyer" v-if="item.sender === 'buyers' && (item.reasonCode || item.message || item.imageUrls)">
                            <div class="el-me-headerImage" :style="{'background-image': 'url('+headerImage+'),url('+baseHeaderUrl+')' }"></div>
                            <div class="cet" >
                                <div class="sanjiao-right"></div>
                                <div v-if="!(item.questionType && item.questionTypeCode) && item.message!=='-'" class="txtcontent">{{item.message}}</div>
                                <div v-if="!(item.questionType && item.questionTypeCode) && item.imageUrls" class="imgarea">
                                    <img v-for="(img, index) in item.imageUrls" :key="index" :src="imgUrl(img)">
                                </div>
                                <div v-if="item.questionType && item.questionTypeCode && (item.reasonCode || item.message)">
                                    <div v-if="item.reason" style="color:#222;font-size: 14px;border-bottom:2px solid #999;padding-bottom:5px;text-align:left;">
                                        {{item.reason}}
                                    </div>
                                    <div v-if="item.message" style="color:#222;font-size: 14px;border-bottom:2px solid #999;padding:5px 0;text-align:left;">
                                        {{item.message}}
                                    </div> 
                                    <div v-if="item.imageUrls" style="display: flex; align-items:center;justify-content:flex-start;">
                                        <template >
                                            <img v-for="(img, index) in item.imageUrls" 
                                                :key="index" 
                                                :src="imgUrl(img)" 
                                                style="width:60px;height: 60px;margin: 7px 12px 0 0;" />
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
                <!-- 预计回复时间 -->
                <div class="responseTime" v-if="ticket_con.ticketReplies && ticket_con.ticketReplies[ticket_con.ticketReplies.length - 1].sender === 'buyers'">
                    {{$t("support.s_response_time")}}
                </div>
                <!--客服评价对话框-->
                <div class="buyer" v-if="addRated && showAddRate && false">
                    <div class="el-me-headerImage fl" :style="{'background-image': 'url('+sellerheaderImage+'' }" style="margin-right: 10px"></div>
                    <div class="cet fl">
                        <div class="sanjiao-left"></div>
                        <div class="txtcontent">
                            <p>{{addRated}}</p>
                            <div class="addRate">
                                <div class="rate-flex">
                                    <div class="box" :class="{'like-active': rateData.rate===5}" @click="starClickHandle(5)"><i class="iconfont">&#xe756;</i>Satisfied</div>
                                    <div class="box" :class="{'unlike-active': rateData.rate===1}" @click="starClickHandle(1)"><i class="iconfont">&#xe757;</i>Unsatisfied</div>
                                </div>
                                <textarea v-model="initReviewMsg" style="resize:none;padding: 10px;height: 84px;" maxlength="500" placeholder="We'd love to hear what you think of our customer service to help us to serve you better."></textarea>
                                <div class="rate-btn" @click="sendRateData(true)">{{$t("confirm")}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="s-sd">
            <div class="chatInputBox">
                <div class="chatInput">
                    <textarea class="textInput" 
                              :placeholder="$t('support.s_textarea_ph')"
                              v-model="msg"
                              >
                    </textarea>
                </div>
                <div class="uploadBtnBox">
                    <label for="imageFiles">
                        <span class="iconfont uploadIcon">&#xe788;</span>
                    </label>
                    <form ref="imageLoader" style="display:none;">
                        <input style="display:none;" id="imageFiles" name="imageFiles"
                            multiple="multiple" type="file"
                            accept="image/jpg,image/jpeg,image/png,image/gif"
                            @change="imghandle" />
                    </form>
                    
                </div>
                <div class="sendBtnBox" @click="sendticket">
                    <span class="iconfont send">&#xe789;</span>
                </div>

                <dir class="submitSuccessTip" v-if="successShow || (canBeRated && true)">
                    {{$t("support.s_submit_success")}}
                </dir>
            </div>
            <!-- <textarea placeholder="Type a message..." v-model="msg"></textarea>
            <div class="upimg">
                <form ref="imageLoader">
                    <input @change="imghandle" name="imageFiles" multiple="" type="file" accept="image/jpg,image/jpeg,image/png,image/gif">
                </form>
            </div>
            <div class="rate-con">
                <div v-if="canBeRated" class="rate-tbl">
                    <i class="iconfont rate-cell">&#xe60d;</i>
                    <span class="rate-cell rate-click" @click="() => {this.showRater = true,this.showAddRate = false}">{{$t("rateMyService")}}</span>
                </div>
                <div class="rate-star" v-if="showRater">
                    <div class="rate-positive" >
                        <div class="rate-tit">{{$t("pleaserateMyService")}}</div>
                        <div class="rate-flex">
                            <div class="box" :class="{'like-active': this.rateData.rate===5}" @click="starClickHandle(5)"><i class="iconfont">&#xe756;</i>Satisfied</div>
                             <div class="box" :class="{'unlike-active': this.rateData.rate===1}" @click="starClickHandle(1)"><i class="iconfont">&#xe757;</i>Unsatisfied</div>
                        </div>
                        <textarea v-model="rateData.message" style="resize:none;padding: 10px;height: 84px;" maxlength="500" :placeholder="$t('ratecontent')"></textarea>
                        <div class="rate-btn" @click="sendRateData(false)">{{$t("confirm")}}</div>
                        <div class="rate-absolute"></div>
                    </div>

                </div>
            </div>
            <div class="sendbtn" @click="sendticket">{{$t('send')}}</div> -->
        </div>

        <div class="questionSubmitMask" v-if="questionMaskShow">
          <div class="questionSubmitContent">

            <span style="display:block;width:100%;text-align:right;background-color:#fff;" @click="()=>clearTicketData()">
              <span class="iconfont clearTicketData">&#xe69a;</span>
            </span>

            <div class="userInputBox">
                <!-- {/* 提示语 */} -->
                <div class="submitTips" id="top">
                  <span>{{$t("support.s_submit_tips")}}</span> 
                </div>

                <!-- {/* 原因选择 */} -->
                <div class="submitSelectReason" id="submitSelect" v-if="questionsReason && questionsReason.length > 0">
                    <!-- {/* 选择标题 */} -->
                    <div class="selectReasonTitle">
                    <span>*</span> {{$t("support.s_select_reason")}}
                    </div>

                    <!-- {/* 选择下拉框 */} -->
                    <div class="selectReasonBox" id="selectReason">
                        <div class="selectReasonInput" @click="()=>questionObject={...questionObject, showSelectItem:!questionObject.showSelectItem}">
                            <span>{{questionsReason.find(q => q.isSelected == true) ? questionsReason.find(q => q.isSelected == true).label : $t("support.s_select_reason")}}</span>
                            <span :class="{'iconfont selectReasonIcon':true, 'selected':questionObject.showSelectItem}">&#xe692;</span>
                        </div>
                        
                        <!-- {/* 选项框 */} -->
                        <div class="selectReasonItemBox" v-if="questionObject.showSelectItem">
                            <!-- {/* 选项 */} -->
                            <div :class="{'selectReasonItem':true,'showTextArea':item.value === questionsReason[questionsReason.length - 1].value && item.isSelected}" 
                                 :key="index" 
                                 @click="()=>questionTypeChange(item)"
                                 v-for="(item,index) in questionsReason"
                                >
                                <div>
                                    <div :class="{'reasonItemIcon': true, 'reasonItemIconSelect': item.isSelected}">
                                        <span class="reasonItemIconSelected"></span>
                                    </div>
                                    <div :class="{'reasonItem':true, 'reasonItemSelect': item.isSelected}">{{item.label}}</div>
                                </div>
                                
                                <textarea 
                                    v-if="item.value === questionsReason[questionsReason.length - 1].value && item.isSelected"
                                    :class="{'reasonTextArea':true}"
                                    :id="'reasonInput'+item.label"
                                    @change="(e)=>{
                                        questionObject={
                                        ...questionObject, 
                                        questionTypeInput: e.target.value
                                        }
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
                      <span v-if="descriptionRequired">*</span> {{$t("support.s_description")}}
                    </div>

                    <!-- {/* 输入框 */} -->
                    <textarea class="descriptionTextArea" 
                        :placeholder="$t('support.s_description_ph')"
                        :value="questionObject.descriptionInput"
                        @input="(e)=>descriptionTextAreaChange(e)"
                        ></textarea>
                    <div class="textAreaInputLength">
                      {{(questionObject.descriptionInput ? questionObject.descriptionInput.length : '0')+'/1000'}}
                    </div>
                </div>

                <!-- {/* 图片上传 */} -->
                <div class="submitImageBox" id="imgUpload">
                  <!-- {/* 标题 */} -->
                  <div class="selectReasonTitle">
                    {{$t("support.s_upload_image")}}
                  </div>

                  <!-- {/* 上传提示 */} -->
                  <div class="uploadTips">{{$t("support.s_upload_tips")}} </div>

                  <div class="uploadBox">
                    <div class="uploadItem" v-for="(item,index) in questionObject.uploadImgList" :key="index">
                        <span class="deleteImg" @click="()=>deleteImg(index)">&times;</span>
                        <img :src="item" alt="" />
                    </div>

                    <div class="uploadItem" v-if="questionObject.uploadImgList.length < 3">
                        <span class="iconfont">&#xe6d3;</span>
                        <!-- <form ref="questionImg"> -->
                        <input style="opacity:0;position:absolute;width:80px;height:80px;" 
                            type="file" 
                            id="imageFiles" 
                            multiple="multiple" 
                            @change="(e)=>questionImgUpload(e)"
                            accept="image/jpg,image/jpeg,image/png,image/gif" />
                        <!-- </form> -->
                    </div>
                                        
                  </div>
                </div>
            </div>

            <div class="questionSubmitBtnBox">
              <div class="questionSubmitBtn" @click="questionSubmit()">
                {{$t("support.s_sumbit")}}
              </div>
            </div>
            
            
          </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters,mapActions } from 'vuex';
    import * as utils from '../../utils/geekoutil';
    import StarList from '../star-list.vue';
    import faqSelect from'./faq-select.vue';
    import _ from 'lodash'
    import HtmlImageCompress from 'html-image-compress'

    let list = [{
        "value":"01",
        "label":"Cancel the order"
    },{
        "value":"02",
        "label":"Modify the order"
    },{
        "value":"03",
        "label":"Shipping status",
        "reasons" : [{
            "value":"01",
          "label":"Can't track my order",
        },{
            "value":"02",
          "label":"Shipping time is too long",
        },{
            "value":"03",
          "label":"Not receive the order",
        },{
            "value":"04",
          "label":"Don't want to pay for customs",
        },{
            "value":"05",
          "label":"Delivery shows returned",
        },{
            "value":"06",
          "label":"Only part of the order received",
        },{
            "value":"09",
          "label":"Others"
        }]
    },{
        "value":"04",
        "label":"Return the order",
        "reasons" : [{
            "value":"01",
          "label":"Size is small",
        },{
            "value":"02",
          "label":"Size is large",
        },{
            "value":"03",
          "label":"Size is not as discribed",
        },{
            "value":"04",
          "label":"Received a wrong item",
        },{
            "value":"05",
          "label":"Received a defected item",
        },{
            "value":"06",
          "label":"Item is not as discribed",
        },{
            "value":"07",
          "label":"Received a stained item",
        },{
            "value":"08",
          "label":"Received different colord",
        },{
            "value":"09",
          "label":"Material is transparent",
        },{
            "value":"10",
          "label":"Others"
        }]
    },{
        "value":"09",
        "label":"Others"
      }]
    export default {
        props:{
            fromOrder:{
                type: Boolean,
                default: false
            }
        },
        data (){
            return{
                selected: '666',
                isRequired:false,
                msg:'',
                addticket:'',
                showRater:false,
                rateData: {
                    rate: 5,
                    message: '',
                    id: '',
                    reviewMsg:[]
                },
                showAddRate:true,
                initReviewMsg:'',
                list,
                questionMaskShow: false,
                questionObject: { // 信息收集弹窗的数据obj
                    questionTypeInput: '',
                    showSelectItem: false,
                    descriptionInput: '',
                    uploadImgList: [],
                    uploadImgFileList: []
                },
                questionTypeList:[], // how can i help you 下面的类型选择
                questions:[], // 上面的内容格式化
                questionsReason:[], // 问题对应原因的列表
                questionSubmitLoading: false, // 正在上传
                successShow: false, // 上传成功提示
                descriptionRequired: false, // description是否必填
            }
        },
        components: {
            'star-list': StarList,
            'faq-select': faqSelect,
        },
        mounted(){
            this.$store.dispatch("getQuestionType")
            if(localStorage._orderId){
                setTimeout(()=>{
                    this.selectChange({value:'04'})
                }, 200)
                localStorage.removeItem('_orderId')
            }
        },
        watch:{
            successShow:function(newV, oldV){
                if(newV){
                    setTimeout(()=>{
                        this.successShow = false
                    }, 2000)
                }
            },
            msg:function(newV, oldV){
                if((this.selected == '666' || !this.selected) && newV){
                    this.msg = ''
                    this.isRequired = true
                    alert(this.$t("support.s_select_ph"))
                }
            }
        },
        computed: {
            ...mapGetters(['ticket','ticket_con','ticketid','ticket_sub','questionType']),
            baseHeaderUrl() {
                return 'https://image.geeko.ltd/site/pc/icon35.png';
            },
            headerImage(){
                if(this.ticket_con.customerId){
                    return this.$store.getters.headerImage;
                }
            },
            sellerheaderImage(){
                return 'https://image.geeko.ltd/icon/support.jpg'
            },
            canBeRated(){
                if(this.ticket_con && this.ticket_con.questionTypeCode){
                    // console.log(this.ticket_con)
                    this.selected = this.ticket_con.questionTypeCode
                } else {
                    this.selected = '666'
                }
                if(this.ticket_con && this.ticket_con.canBeRated){
                    this.rateData.rate = this.ticket_con && this.ticket_con.ticketRateService ? this.ticket_con.ticketRateService.rate : 5;
                    this.rateData.message = this.ticket_con && this.ticket_con.ticketRateService ? this.ticket_con.ticketRateService.message : ''
                    this.rateData.id = this.ticket_con ? this.ticket_con.id: null
                }
                return false
            },
            addRated(){
                if(this.ticket_con && this.ticket_con.reviewFlag === 1){
                    return this.ticket_con.reviewPrompt ? this.ticket_con.reviewPrompt : ''
                }else{
                    return false
                }
            },
            ticketId(){
                if(this.ticket_con && this.ticket_con.id ){
                    return this.ticket_con.id
                }else{
                    return false
                }
            },
            questionTypeSelect(){
                if(this.ticket_con.questionTypeCode){
                    return this.ticket_con.questionTypeCode
                } else {
                    return 0
                }
            },
            usedQuestionType(){
                if((this.questionType && this.questionType.length ==0) || !this.questionType){
                    return this.list
                } else {
                    return this.questionType
                }
            },
            groupReplies(){
                var replies = this.ticket_con.ticketReplies
                var groups = _.groupBy(replies, function (obj) {
                    return new Date(obj.date).toLocaleDateString() + " " + new Date(obj.date).toTimeString().substr(0, 5);
                })
                // console.log(groups)
                let output = []
                Object.keys(groups).forEach(g => {
                    let obj = {
                        date: g,
                        replies: []
                    }
                    groups[g].forEach(group => {
                        if(group.message || group.imageUrls || group.reasonCode || group.reason){
                            obj.replies.push(group)
                        }
                    })
                    if(obj.replies.length > 0){
                        output.push(obj)
                    }   
                    obj = ''
                })
                // console.log(output)
                return output
            }
        },
        methods: {
            selectChange(e){
                if(!this.ticket_con.operaId && !this.ticketid){
                    this.questionMaskShow = false
                    return
                }
                // console.log(e.value)
                // console.log(this.selected)
                if(this.selected == e.value){
                    this.isRequired = false
                    let qTReasonList = this.usedQuestionType.find(q => q.value == e.value).reasons ? 
                                    this.usedQuestionType.find(q => q.value == e.value).reasons :
                                    []
                    let showed = this.ticket_con ? 
                                this.ticket_con?.ticketReplies ? 
                                this.ticket_con?.ticketReplies.find(t => 
                                        t.questionTypeCode == e.value && (t.reasonCode || t.message || t.imageUrls)
                                ) : false : false
                    if((qTReasonList.length > 0 || e.value == this.usedQuestionType[this.usedQuestionType.length - 1].value) && !showed){
                        if(e.value == this.usedQuestionType[this.usedQuestionType.length - 1].value){
                            this.descriptionRequired = true
                        } else {
                            this.descriptionRequired = false
                        }
                        this.questionsReason = qTReasonList
                        this.questionMaskShow = true
                        // console.log(this.questionsReason) 
                    }
                    return
                }
                var fData = new FormData();
                if(this.ticket_con?.operaId){
                    fData.append("operaId",this.ticket_con.operaId)
                }else{
                    fData.append("operaId",this.ticketid)
                }
                // console.log(fData.operaId)
                fData.append("questionType",e.label)
                fData.append("questionTypeCode",e.value)
                this.$store.dispatch("addTicket",fData).then(res=>{
                    this.selected = e.value
                    this.isRequired = false
                    let qTReasonList = this.usedQuestionType.find(q => q.value == e.value).reasons ? 
                                    this.usedQuestionType.find(q => q.value == e.value).reasons :
                                    []
                    let showed = this.ticket_con ? 
                                this.ticket_con?.ticketReplies ? 
                                this.ticket_con?.ticketReplies.find(t => 
                                        t.questionTypeCode == e.value && (t.reasonCode || t.message || t.imageUrls)
                                ) : false : false
                    if((qTReasonList.length > 0 || e.value == this.usedQuestionType[this.usedQuestionType.length - 1].value) && !showed){
                        if(e.value == this.usedQuestionType[this.usedQuestionType.length - 1].value){
                            this.descriptionRequired = true
                        } else {
                            this.descriptionRequired = false
                        }
                        this.questionsReason = qTReasonList
                        this.questionMaskShow = true
                        // console.log(this.questionsReason) 
                    }
                })
                
            },
            getDate(paymentTime){
                // console.log(paymentTime)
                if(paymentTime == null){
                    return '-'
                }
                return utils.slashTime(new Date(paymentTime))
            },
            imghandle(evt){
                evt.preventDefault()
                if(this.selected == '666' || !this.selected){
                    alert(this.$t("support.s_select_ph"))
                    this.isRequired = true
                    return
                }
                var files = this.files;
                var myFiles = evt.target.files;
                // console.log("myFiles",myFiles);
                var maxSize = 10485760;
                if(myFiles[0].size<maxSize){
                    var formData = new FormData(this.$refs.imageLoader);
                    formData.append("message", '-')
                    if(this.ticket_con?.operaId){
                        formData.append("operaId",this.ticket_con.operaId)
                    }else{
                        formData.append("operaId",this.ticketid)
                    }

                    if(this.selected && this.selected !== '666'){
                        // formData.append("questionTypeCode",this.selected)
                    }else{
                        this.isRequired = true
                        return ''
                    }

                    this.$store.dispatch('addTicket', formData).then(() => {
                        this.$store.dispatch('getTicket',this.ticketid)
                        // this.msg = ''
                    }).catch(e => {
                        alert(e.result)
                    })
                }else{
                    alert(this.$t("support.s_img_upload"));
                }
            },
            close(){
                this.$emit('closeSelect');
            },
            selectorder(){
                this.$emit('selectOrder');
            },
            sendticket(){
                let formData = new FormData();
                // console.log(this.msg)
                if(!this.msg) {
                    return ''
                }else{
                    formData.append("message",this.msg)
                }

                if(this.ticket_con && this.ticket_con.operaId){
                    formData.append("operaId",this.ticket_con.operaId)
                }else{
                    formData.append("operaId",this.ticket.id)
                }
                // console.log(this.selected)
                if(this.selected && this.selected !== '666'){
                    // formData.append("questionTypeCode",this.selected)
                }else{
                    this.isRequired = true
                    return ''
                }
                this.$store.dispatch('addTicket', formData).then(() => {
                    this.$store.dispatch('getTicket',this.ticketid)
                    this.msg = ''
                }).catch(e => {
                    alert(e.result)
                })
            },
            imgUrl(url){
                return 'https://image.geeko.ltd/ticket/'+url
            },
            starClickHandle(data){
                this.rateData.rate = data;
                // console.log(this.rateData.rate)
            },
            sendRateData(flag){
                let formData = new FormData();
                this.showAddRate = false;
                this.showRater = false;
                if(flag){
                    this.rateData.message = this.initReviewMsg;
                }
                formData.append("rate", this.rateData.rate)
                formData.append("message",this.rateData.message)
                formData.append("id",this.rateData.id)
                formData.append("reviewMsg",this.rateData.reviewMsg)
                this.$store.dispatch('rate', formData).then(() => {
                    this.ticket_con.ticketRateService = this.rateData
                })
            },
            questionSubmit(){
                if(this.questionSubmitLoading)return
                this.questionSubmitLoading = true
                let params = {}
                // 选了什么问题
                params.question = this.selected;
                // 选择的原因（有的问题没有）
                params.selectReason = this.questionsReason.find(i => i.isSelected == true);
                // 原因描述 仅限Others
                if(params.selectReason && params.selectReason.value == this.questionsReason[this.questionsReason.length - 1].value){
                    params.selectReasonInput = this.questionObject.questionTypeInput
                }
                // 描述
                params.descriptionInput = this.questionObject.descriptionInput

                // if(!checkParams(params)) return
                // 上传的图片
                let imgFileList = this.questionObject.uploadImgFileList.map(img => {
                    return new HtmlImageCompress(img, {quality: 0.7, imageType: img.type})
                })
                if(!this.checkUploadData(params)) return
                // message 传 description数据

                Promise.all(imgFileList).then(results => {
                    const formData = new FormData()
                    if(this.ticket_con?.operaId){
                        formData.append("operaId",this.ticket_con.operaId)
                    }else{
                        formData.append("operaId",this.ticketid)
                    }
                    formData.append('questionTypeCode', params.question)
                    formData.append('questionType', this.usedQuestionType.find(q=>q.value == params.question)?.label ? this.usedQuestionType.find(q=>q.value == params.question).label : '')
                    formData.append('reasonCode', params.selectReason ? params.selectReason.value : '')
                    // 如果原因选择了others 那么reason传others输入的值
                    formData.append('reason', params.selectReason ? params.selectReasonInput ? params.selectReasonInput:params.selectReason.label:'')
                    formData.append('message', this.questionObject.descriptionInput)
                    results.forEach(item => {
                        const {file} = item
                        formData.append('imageFiles', file)
                    })
                    // console.log(formData)
                    this.$store.dispatch('addTicket', formData).then(() => {
                        this.$store.dispatch('getTicket',this.ticketid)
                        this.msg = ''
                        this.questionMaskShow = false;
                        this.questionObject = { // 信息收集弹窗的数据obj
                            ...this.questionObject,
                            questionTypeInput: '',
                            showSelectItem: false,
                            descriptionInput: '',
                            uploadImgList: [],
                            uploadImgFileList: []
                        }
                        this.questionTypeList=[] // how can i help you 下面的类型选择
                        this.questions = [] // 上面的内容格式化
                        this.questionsReason = [] // 问题对应原因的列表
                        this.questionSubmitLoading = false
                        this.successShow = true
                    }).catch(e => {
                        alert(e.result)
                    })
                })     
            },
            questionImgUpload(e){
                let file = [...e.target.files]
                // 判断是否有重复项
                file.forEach((files, index) => {
                    let sameFile = this.questionObject.uploadImgFileList.find(f => f.name === files.name);
                    if(sameFile){
                        file.splice(index, 1)
                    }
                })
                if(file.length == 0){
                    return
                }
                let fileList = [...this.questionObject.uploadImgFileList].concat(file)
                let imgSrcList = [];
                if(fileList.length > 3){
                    fileList = fileList.splice(0,3);
                }
                
                // console.log(fileList)
                fileList.forEach(item => {
                    var src = typeof item == 'string' ?
                            item:
                            window.navigator.userAgent.indexOf("Chrome") >= 1 || 
                            window.navigator.userAgent.indexOf("Safari") >= 1 ? window.webkitURL.createObjectURL(item) : window.URL.createObjectURL(item);
                    imgSrcList.push(src);
                })
                this.questionObject = {
                    ...this.questionObject, 
                    uploadImgFileList:fileList,
                    uploadImgList:imgSrcList
                }
            },
            clearTicketData(){
                this.questionMaskShow = false
                let obj = {
                    // 信息收集弹窗的数据obj
                    questionTypeInput: '',
                    showSelectItem: false,
                    descriptionInput: '',
                    uploadImgList: [],
                    uploadImgFileList: []
                }
                this.questionObject = {...obj}
                this.questionTypeList =[] // how can i help you 下面的类型选择
                this.questions = [] // 上面的内容格式化
                this.questionsReason = [] // 问题对应原因的列表
                this.questionSubmitLoading = false // 正在上传
                this.successShow = false // 上传成功提示
                this.descriptionRequired = false // description是否必填
            },
            questionTypeChange(e){
                let qList = _.cloneDeep(this.questionsReason)
                qList.forEach(q => {
                    q.isSelected = false
                })
                let qr = qList.find(q => q.value == e.value)
                qr.isSelected = true
                // console.log(this.questionsReason[this.questionsReason.length - 1].value)
                if(qr.value == this.questionsReason[this.questionsReason.length - 1].value) {
                    this.descriptionRequired = true
                } else {
                    this.descriptionRequired = false
                    this.questionObject.showSelectItem = false
                }
                this.questionsReason = qList
            },
            descriptionTextAreaChange(e){
                this.questionObject = {
                    ...this.questionObject, 
                    descriptionInput: e.target.value
                }
            },
            deleteImg(index){
                let fileList = this.questionObject.uploadImgFileList.slice(0);
                let imgList = this.questionObject.uploadImgList.slice(0);
                fileList.splice(index,1);
                imgList.splice(index,1);
                this.questionObject = {
                    ...this.questionObject,
                    uploadImgFileList: fileList,
                    uploadImgList: imgList
                } 
            },
            checkUploadData(params){
                if(this.questionsReason.length > 0 && !params.selectReason){
                    // console.log('ss')
                    var subS = document.getElementById("submitSelect")
                    subS.style.border = '1px solid red'
                    subS.scrollIntoView()
                    subS = null
                    this.questionSubmitLoading = false
                    return false
                } else {
                    this.clearRedLines()
                }
                if(params.selectReason && params.selectReason.value == this.questionsReason[this.questionsReason.length - 1].value && !params.selectReasonInput){
                    // console.log('ri')
                    var reaI = document.getElementById("reasonInputOthers")
                    reaI.style.border = '1px solid red'
                    reaI.scrollIntoView()
                    reaI = null
                    this.questionSubmitLoading = false
                    return false
                } else {
                    this.clearRedLines()
                }
                if(!params.descriptionInput && this.descriptionRequired){
                    var des = document.getElementById("description")
                    des.style.border = '1px solid red'
                    des.scrollIntoView()
                    des = null
                    this.questionSubmitLoading = false
                    return false
                } else {
                    this.clearRedLines()
                }
                return true
            },
            clearRedLines(){
                var subS = document.getElementById("submitSelect") ? document.getElementById("submitSelect") : ''
                subS && (subS.style.border = 'none')
                subS = null
                
                var reaI = document.getElementById("reasonInputOthers") ? document.getElementById("reasonInputOthers") : ''
                reaI && (reaI.style.border = 'none')
                reaI = null
                
                if(this.descriptionRequired){
                    var des = document.getElementById("description") ? document.getElementById("description") : ''
                    des && (des.style.border = 'none')
                    des = null
                }
            }
        },
    };
</script>
<style scoped lang="scss">
    @font-face {
        font-family: 'iconfont';  /* project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_utjiw4kvxj7.eot');
        src: url('//at.alicdn.com/t/font_384296_utjiw4kvxj7.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_384296_utjiw4kvxj7.woff2') format('woff2'),
        url('//at.alicdn.com/t/font_384296_utjiw4kvxj7.woff') format('woff'),
        url('//at.alicdn.com/t/font_384296_utjiw4kvxj7.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_384296_utjiw4kvxj7.svg#iconfont') format('svg');
    }
    .addRate{
        textarea{
            width: 100%;
            height: 120px;
            border: 1px solid #cacaca;
            resize: none;
            margin: 14px 0;
            padding: 15px;
        }
        .rate-btn{
            height: 26px;
            line-height: 26px;
            background-color: #222222;
            border-radius: 2px;
            text-align: center;
            color: #fff;
            float: right;
            padding: 0 25px;
            cursor: pointer;
        }
    }
    .orderTicket{
        width: 500px;
        height: 100vh;
        background: #fff;
        position: fixed;
        right: 0;
        top: 0;
        border: 1px solid #cacaca;
        border-right: none;
        padding-top: 50px;
        z-index: 30000000;
        // padding: 10px 24px;

        .s-hd{
            width: 100%;
            height: 50px;
            line-height: 50px;
            background-color: #efefef;
            text-align: left;
            padding-left: 25px;
            position: absolute;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;

            h3{
                line-height: 50px;
                font-size: 18px;
            }

            i{
                margin-right: 20px;
                cursor: pointer;
                font-size: 14px;
                line-height: 14px;
                color: #999;
            }
        }

        .s-bd{
            background-color: #fff;
            text-align: left;
            color: #222;
            // padding:24px 24px;
            position: relative;
            padding: 10px 24px;

            .orderInfo{
                height: 80px;
                // border-bottom: 1px solid #e6e6e6;
                cursor: pointer;
                font-family: SlatePro-Regular;
                padding: 16px 17px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                i{
                    font-size: 14px;
                }

                p{
                    line-height: 30px;
                    span{
                        color: #999;
                        margin-right: 10px;
                    }
                }
            }

            .help{
                width: 100%;
                padding-top: 27px;
                text-align: center;

                h3{
                    text-align: center;
                    text-transform: capitalize;
                    margin-bottom: 11px;
                }

                .faqSelect{
                    width: 351px;
                    margin: 0 auto;
                    text-align: left;
                }

                select{
                    width: 452px;
                    margin: 24px auto 9px auto;
                    height: 40px;
                    background-color: #ffffff;
                    border-radius: 2px;
                    border: solid 1px #cacaca;
                    padding-left: 10px;
                }
                span{
                    font-size: 14px;
                    color: #999;
                }
            }
        }

        .s-cd{
            width: 100%;
            height:  calc(100vh - 320px);
            overflow-y: auto;
            background-color: white;
            text-align: right;
            padding: 0 25px;
            .buyer{
                margin: 20px 0;
                .cet{
                    float: right;
                    position: relative;
                    padding: 15px 10px;
                    background-color: #549ad5;
	                border-radius: 4px;
                    border-radius: 4px;
                    color: #fff;
                    margin-right: 15px;
                    max-width: 300px;
                    font-family: SlatePro-Regular;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 14px;
                    letter-spacing: 0px;
                    color: #ffffff;

                    .sanjiao-right {
                        position: absolute;
                        top: 18px;
                        transform: rotate(-45deg);
                        right: -4px;
                        width: 8px;
                        height: 8px;
                        background-color: #549ad5;
                    }
                    .sanjiao-left {
                        position: absolute;
                        top: 18px;
                        transform: rotate(-45deg);
                        left: -4px;
                        width: 8px;
                        height: 8px;
                        background-color: #fff;
                        border-top: 1px solid #cacaca;
                        border-left: 1px solid #cacaca;
                    }
                    .txtcontent{
                        text-align: left;
                        white-space: pre-line;
                        word-break: break-all;
                        word-wrap: break-word;
                    }
                    .imgarea{
                        max-width: 280px;
                        float: right;
                        img{
                            width: 100%;
                        }
                    }
                }
                .el-me-headerImage {
                    float: right;
                    width: 48px;
                    height: 48px;
                    background: no-repeat center/cover;
                    border-radius: 50%;
                }
                .fl{
                    float: left !important;
                    background-color: #fff;
                    color: #222;
                    border: 1px solid #cacaca;
                    font-family: SlatePro-Regular;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #222222;
                }

                &:after{
                    display: block;
                    clear: both;
                    content: '';
                }
            }

            &::-webkit-scrollbar{
                width: 4px;
                border-radius: 2px;
                background-color: #efefef;
            }
            &::-webkit-scrollbar-thumb{
                background-color: #888;
                border-radius: 2px;
            }
        }
        
        .s-sd{
            width: 100%;
            padding: 0 25px;
            background-color: #fff;

            .chatInputBox{
                width: 100%;
                height: 64px;
                display: flex;
                align-items: center;
                background: #fff;
                position: absolute;
                bottom: 0;
                left: 0;
                box-shadow: 0px 2px 20px 0px 
                rgba(204, 204, 204, 0.5);
                padding-left: 4%;

                .chatInput {
                    background: #fff;
                    flex: 1;

                    textarea{
                        width: 100%;
                        height: 40px;
                        line-height: 20px;
                        overflow-y: visible;
                        padding-top: 10px;
                        border: none;
                        resize: none;
                        &::-webkit-scrollbar{
                            display: none;
                        }
                    }
                }
                    

                .uploadBtnBox{
                    font-size: 22px;
                    color: #999;
                    margin-right: 30px;
                    margin-left: 15px;

                    .uploadIcon{
                        font-size: 18px;
                        cursor: pointer;
                    }
                }

                .sendBtnBox{
                    color: #999;
                    margin-right: 20px;

                    .send{
                        font-size: 18px;
                        cursor: pointer;
                    }
                }
            }
            // textarea{
            //     width: 100%;
            //     height: 120px;
            //     border: 1px solid #cacaca;
            //     resize: none;
            //     margin: 14px 0;
            //     padding: 15px;
            // }
            .upimg{
                width: 50px;
                height: 40px;
                border-radius: 3px;
                border-width: 1px;
                border-style: solid;
                border-color: rgb(214, 214, 214);
                border-image: initial;
                background: url(https://image.geeko.ltd/site/pc/icon61.png) center center / 60% no-repeat;
                float: left;
                input{
                    width: 40px;
                    height: 30px;
                    opacity: 0;
                    -webkit-appearance: none;
                    box-shadow: none;
                    outline: none;
                }
            }
            .rate-con{
                position: relative;
                .rate-tbl{
                    float: left;
                    line-height: 40px;
                    margin-left: 14px;
                    display: table;
                    color: #22aeec;
                    .rate-cell{
                        display: table-cell;
                    }
                    i{
                        font-size: 32px;
                    }
                    .rate-click{
                        position: relative;
                        top: -5px;
                        left: 5px;
                        cursor: pointer;
                        text-decoration: underline;
                    }
                }
                .rate-star{
                    position: absolute;
                    width: 304px;
                    height: 225px;
                    border: 1px solid #999;
                    bottom: 10px;
                    background-color: #fff;
                    z-index: 999;
                    padding: 10px 15px;
                    text-align: left;
                    .rate-tit{
                        font-size: 14px;
                        color: #222;
                    }
                    .rate-positive{
                        position: relative;
                    }
                    .rate-positive:after{
                        display: block;
                        clear: both;
                        content: '';
                    }
                    .rate-absolute{
                        width: 10px;
                        height: 10px;
                        position: absolute;
                        content: '';
                        border-right: 0;
                        border-top: 0;
                        border-bottom: 1px solid #999;
                        border-left: 1px solid #999;
                        transform:rotate(-45deg);
                        top: 209px;
                        left: 58px;
                        background-color: #fff;
                    }
                }
                .star-list{
                    margin-top: 5px;
                }
                .rate-btn{
                    height: 26px;
                    line-height: 26px;
                    background-color: #222222;
                    border-radius: 2px;
                    text-align: center;
                    color: #fff;
                    float: right;
                    padding: 0 25px;
                    cursor: pointer;
                }
/*                &:after{
                    display: block;
                    content: '';
                    clear: both;
                }*/
            }

            .sendbtn{
                float: right;
                width: 120px;
                line-height: 40px;
                background-color: #222222;
                border-radius: 2px;
                text-align: center;
                color: #fff;
                margin-bottom: 10px;
                cursor: pointer;
            }
            &:after{
                display: block;
                clear: both;
                content: '';
            }
        }

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
                        font-family: Roboto-Bold;
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

        .submitSuccessTip{
            position: absolute;
            left: calc(50% - 100px);
            bottom: 116px;
            width: 200px;
            height: 32px;
            background-color: rgba(34, 34, 34, 0.6);
            border-radius: 2px;
            text-align: center;
            line-height: 32px;
            color: #fff;
            padding: 0;
        }
    }
.rate-flex{
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    min-width: 280px;
    .box{
        width: 48%;
        text-align: center;
        height: 33px;
        line-height: 33px;
        border: 1px solid #eee;
        border-radius: 2px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        cursor: pointer;
        i{
            display: inline-block;
            margin-right: 5px;
        }
    }
    .unlike-active{
        background-color: #f46e6d;
        color: #fff;
        border-color: #f46e6d;
    }
    .like-active{
        background-color: #57b936;
        color: #fff;
        border-color: #57b936;
    }
}
.redBorder{
    border:1px solid #e5004f !important;
}

.responseTime{
    font-family: SlatePro-Regular;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #999999;
    text-align: center;
    margin-top: 7px;
}


</style>