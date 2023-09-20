<template>
    <div class="orderTicket" v-if="ticket">
        <div class="s-hd">
            <h3>{{$t('ticket')}}</h3>
            <i @click="close" class="iconfont">&#xe7c9;</i>
        </div>
        <div class="s-bd">
            <div class="orderInfo">
                
                <div>
                    <p><span>{{$t('orderno')}} </span>{{ticketid}}</p>
                    <p><span>{{$t('timeofpayment')}} </span>{{getDate(JSON.stringify(ticket)!=='{}'?ticket.orderTime:(ticket_con?ticket_con.openDate:''))}}</p>
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
                            <div :class="{'cet': true, 'grey': item.messageType == 1}" >
                                <div :class="{'sanjiao-right': true, 'grey': item.messageType == 1}"></div>
                                <div v-if="item.messageType == 1">
                                    <div class="returnMessageBox">
                                        <div class="returnMessageTitle">
                                            <div>Return the Order</div>
                                            <div class="returnItemsNum">{{ item.message.items ? item.message.items.length: 0 }}{{ 'Item(s)' }}</div>
                                        </div>
                                        <div class="returnProductList">
                                            <img v-for="(item, index) in item.message.items.slice(0, 4)" :src="item.imageUrl" :key="index"/>
                                            <div v-if="item.message.items.length > 4" class="imgMore">...</div>
                                        </div>
                                        <div class="returnOrderId">
                                            <span>{{ 'Order no.' }}</span>
                                            {{ item.message.orderId }}
                                        </div>
                                        <div class="returnView">
                                            <div class="returnViewBtn" @click="() => returnView()">
                                                {{ $t('view') }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="item.messageType != 1 && !(item.reasonCode && item.reason) && item.message!=='-'" class="txtcontent">{{item.message}}</div>
                                <div v-if="item.messageType != 1 && !(item.reasonCode && item.reason) && item.imageUrls" class="imgarea">
                                    <img v-for="(img, index) in item.imageUrls" :key="index" :src="imgUrl(img)">
                                </div>
                                <div v-if="item.messageType != 1 && item.reasonCode && item.reason">
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
                <div class="buyer" v-if="(addRated && showAddRate) || showAddRate">
                    <div class="el-me-headerImage fl" :style="{'background-image': 'url('+sellerheaderImage+'' }" style="margin-right: 10px"></div>
                    <div class="cet fl">
                        <div class="sanjiao-left"></div>
                        <div class="txtcontent rateInfo">
                            <p style="line-height: 1.25;">{{$t("support.s_rate_info")}}</p>
                            <div class="addRate">
                                <div class="rate-flex">
                                    <div class="box" :class="{'like-active': rateData.rate===5}" @click="starClickHandle(5)"><i class="iconfont">&#xe756;</i>{{$t("support.s_rate_satisfied")}}</div>
                                    <div class="box" :class="{'unlike-active': rateData.rate===1}" @click="starClickHandle(1)"><i class="iconfont">&#xe757;</i>{{$t("support.s_rate_unsatisfied")}}</div>
                                </div>
                                <textarea v-model="initReviewMsg" maxlength="500" placeholder="You can comment customer service here."></textarea>
                                <div class="rate-btn" @click="sendRateData(true)">{{$t("confirm")}}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 展开客服评价 -->
                <div v-if="canBeRated" class="rateTips" @click="addRate">
                    <span class="iconfont " style="font-size: 30px;">&#xe60d;</span>
                    <span style='text-decoration: underline; vertical-align: middle;'>{{$t("support.s_rate_my_service")}}</span> 
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

                <div class="submitSuccessTip" v-if="successShow">
                    {{$t("support.s_submit_success")}}
                </div>

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
        <question-submit-mask
            v-if="questionMaskShow"
            @clearTicketData="clearTicketData"
            :questionObject="questionObject"
            :questionsReason="questionsReason"
            :descriptionRequired="descriptionRequired"
            @changeQuestionObject="obj => changeQuestionObject(obj)"
            @questionTypeChange="data => questionTypeChange(data)"
            @questionImgUpload="e => questionImgUpload(e)"
            @questionSubmit="questionSubmit"
            @descriptionTextAreaChange="e => descriptionTextAreaChange(e)"
            />

        <return-select-mask
            v-if="returnMaskShow"
            :orderdetail="ticket"
            @updateTicket="msg => updateTicket(msg)"
            @returnSelectClose="returnSelectClose"
            @returnView="returnView"
            :productCanSelect="productCanSelect"
            :productCannotSelect="productCannotSelect"
            :productReturned="productReturned"
            />
    </div>
</template>

<script>
    import {mapGetters,mapActions } from 'vuex';
    import * as utils from '../../utils/geekoutil';
    import StarList from '../star-list.vue';
    import faqSelect from'./faq-select.vue';
    import _ from 'lodash'
    import HtmlImageCompress from 'html-image-compress'
    import QuestionSubmitMask from './question-submit-mask.vue';
    import ReturnSelectMask from './return-select-mask.vue';

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
                selected: '',
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
                showAddRate:false,
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
                _orderId: '',
                isLoading: false,

                returnMaskShow: false, // 退货的弹窗是否显示
                productCanSelect: [],
                productCannotSelect: [],
                productReturned: [],
            }
        },
        components: {
            'star-list': StarList,
            'faq-select': faqSelect,
            'question-submit-mask': QuestionSubmitMask,
            'return-select-mask': ReturnSelectMask,
        },
        mounted(){
            this.$store.dispatch("getQuestionType")
            if(localStorage._orderId){
                this._orderId = localStorage._orderId?.replaceAll('"', '')
                setTimeout(()=>{
                    this.selectChange({label:'Return the order',value:'04'})
                }, 200)
                setTimeout(()=>{
                    localStorage.removeItem('_orderId')
                }, 400)
            }
            if(localStorage._code){
                localStorage.removeItem('_code')
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
            },
            selected:function(oldValue,newValue){
                // console.log("selected newValue",newValue,"oldValue",oldValue);
            },
        },
        computed: {
            ...mapGetters(['ticket','ticket_con','ticketid','ticket_sub','questionType', "orderdetail"]),
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
                    // console.log("questionTypeCode: ",this.ticket_con.questionTypeCode)
                    this.selected = this.ticket_con.questionTypeCode
                    if(this.ticket_con.questionTypeCode && (!this.ticket_con.subject || this.ticket_con.subject == 'undefined' || !this.ticket_con.subject.match(/[a-z]/ig))){
                        var fData = new FormData();
                        if(this.ticket_con?.operaId){
                            fData.append("operaId",this.ticket_con.operaId)
                        }else{
                            fData.append("operaId",this._orderId ? this._orderId :this.ticketid)
                        }
                        // console.log(fData.operaId)
                        fData.append("questionType",this.list.find(q => q.value == this.ticket_con.questionTypeCode).label)
                        fData.append("questionTypeCode",this.ticket_con.questionTypeCode)
                        this.$store.dispatch("addTicket",fData).then(res=>{})
                    }
                    if(!this.ticket_con.questionTypeCode && this.ticket_con && this.ticket_con.subject && (this.ticket_con.subject == '7' || this.ticket_con.subject == '000')){
                        let otherSubject = this.list[this.list.length-1].value;
                        // console.log("otherSubject: ",otherSubject)
                        this.ticket_con.questionTypeCode = otherSubject
                        var fData = new FormData();
                        if(this.ticket_con?.operaId){
                            fData.append("operaId",this.ticket_con.operaId)
                        }else{
                            fData.append("operaId",this._orderId ? this._orderId :this.ticketid)
                        }
                        // console.log(fData.operaId)
                        fData.append("questionType",this.question && this.question.length > 0 ?(this.questions.find(q=>q.value == otherSubject) ? (this.questions.find(q=>q.value == otherSubject).label) : '' ) : (list.find(l => l.value == otherSubject) ? list.find(l => l.value == otherSubject).label : ''))
                        fData.append("questionTypeCode",otherSubject)
                        this.$store.dispatch("addTicket",fData).then(res=>{})
                    }
                }
                if(this.ticket_con){
                    this.rateData.rate = this.ticket_con && this.ticket_con.ticketRateService ? this.ticket_con.ticketRateService.rate : 5;
                    this.rateData.message = this.ticket_con && this.ticket_con.ticketRateService ? this.ticket_con.ticketRateService.message : ''
                    this.initReviewMsg = this.ticket_con && this.ticket_con.ticketRateService ? this.ticket_con.ticketRateService.message : ''
                    this.rateData.id = this.ticket_con ? this.ticket_con.id: null
                } else {
                    this.selected = ''
                }
                return this.ticket_con.questionTypeCode && this.ticket_con.questionTypeCode != '666' && this.ticket_con && this.ticket_con.ticketReplies && this.ticket_con.ticketReplies.length > 0
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
                const showReturn = this.ticket?.logistics?.packages?.find(p => p?.status == 3)
                if((this.questionType && this.questionType.length ==0) || !this.questionType){
                    return showReturn? this.list: this.list?.filter(l => l.value != '04')
                } else {
                    return showReturn? this.questionType: this.questionType?.filter(q => q.value != '04')
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
                        if(group.message || group.imageUrls || group.reasonCode || group.reason ){
                            if(group.messageType == 1){
                                if(typeof(group.message) == 'string' && group.message?.startsWith("{")){
                                    group.message = JSON.parse(group.message)
                                }
                            }
                            obj.replies.push(group)
                        }
                    })
                    if(obj.replies.length > 0){
                        output.push(obj)
                    }   
                    obj = ''
                })
                return output
            }
        },
        methods: {
            changeQuestionObject(obj){
                this.questionObject = { ...obj}
            },
            selectChange(e){
                if(this.isLoading){
                    return
                }
                if((!this.ticket_con.operaId && !this.ticketid) && !this._orderId){
                    this.questionMaskShow = false
                    return
                }
                var fData = new FormData();
                if(this.ticket_con?.operaId){
                    fData.append("operaId",this.ticket_con.operaId)
                }else{
                    fData.append("operaId",this._orderId ? this._orderId :this.ticketid)
                }
                // console.log(fData.operaId)
                fData.append("questionType",e.label)
                fData.append("questionTypeCode",e.value)
                this.isLoading = true
                this.$store.dispatch("addTicket",fData).then(res=>{
                    this.isLoading = false
                    this.selected = e.value;
                    this.isRequired = false
                    if(e.value == '04'){
                        // 退货走新逻辑
                        const packageList = this.orderdetail?.logistics?.packages || []
                        const products = packageList?.map(p => p.products)?.flat(Infinity)
                        const all = products?.length > 0 ? products : []
                        this.productCanSelect = all?.filter(p => p?.returnStatus == 1)?.map(p => { return { ...p, selected: false } }) || []
                        this.productCannotSelect = all?.filter(p => p?.returnStatus == 4)?.map(p => { return { ...p, selected: false } }) || []
                        this.productReturned = all?.filter(p => p?.returnStatus == 2) || []
                        if(this.productCanSelect?.length > 0 || this.productCannotSelect?.length > 0 || this.productReturned?.length > 0){
                            this.returnMaskShow = true;
                        }
                    } else {
                        let qTReasonList = this.usedQuestionType.find(q => q.value == e.value).reasons ?
                                    this.usedQuestionType.find(q => q.value == e.value).reasons :
                                    []
                        let showed = this.ticket_con ?
                                    this.ticket_con?.ticketReplies ?
                                    this.ticket_con?.ticketReplies.find(t =>
                                            t.questionTypeCode == e.value && t.reasonCode && t.reason
                                    ) : false : false
                        this.questionsReason.forEach(q=>{
                            q.isSelected=false
                            if(q.value == e.value){
                                q.isSelected = true
                            }
                        })
                        if((qTReasonList.length > 0 || e.value == this.usedQuestionType[this.usedQuestionType.length - 1].value) && !showed){
                            if(e.value == this.usedQuestionType[this.usedQuestionType.length - 1].value){
                                this.descriptionRequired = true
                            } else {
                                this.descriptionRequired = false
                            }
                            this.questionsReason = qTReasonList
                            this.questionMaskShow = true
                        }
                    }
                })
            },
            getDate(paymentTime){
                if(paymentTime == null){
                    return '-'
                }
                return utils.slashTime(new Date(paymentTime))
            },
            imghandle(evt){
                if(this.isLoading){
                    return
                }
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
                    this.isLoading = true
                    this.$store.dispatch('addTicket', formData).then(() => {
                        this.isLoading = false
                        this.$store.dispatch('getTicket',this.ticketid)
                        // this.msg = ''
                    }).catch(e => {
                        this.isLoading = false
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
                if(this.isLoading){
                    return
                }
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
                this.isLoading = true
                this.$store.dispatch('addTicket', formData).then(() => {
                    this.isLoading = false
                    this.$store.dispatch('getTicket',this.ticketid)
                    this.msg = ''
                }).catch(e => {
                    this.isLoading = false
                    alert(e.result)
                })
            },
            imgUrl(url){
                return 'https://image.geeko.ltd/ticket/'+url
            },
            geekoImgUrl(url){
                return 'https://image.geeko.ltd/'+url
            },
            starClickHandle(data){
                this.rateData.rate = data;
                // console.log(this.rateData.rate)
            },
            sendRateData(flag){
                if(this.isLoading){
                    return
                }
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
                this.isLoading = true
                this.$store.dispatch('rate', formData).then(() => {
                    this.isLoading = false
                    this.ticket_con.ticketRateService = this.rateData
                    this.showAddRate = false
                }).catch(err => {
                    this.isLoading = false
                    this.showAddRate = false
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
                    if(img.type.indexOf('gif') != -1){
                        return img
                    } else {
                        return new HtmlImageCompress(img, {quality: 0.7, imageType: img.type})
                    }
                })
                if(!this.checkUploadData(params)) return
                // message 传 description数据

                Promise.all(imgFileList).then(results => {
                    const formData = new FormData()
                    if(this.ticket_con?.operaId){
                        formData.append("operaId",this.ticket_con.operaId)
                    }else{
                        formData.append("operaId",this.ticket.id)
                    }
                    formData.append('questionTypeCode', params.question)
                    formData.append('questionType', this.usedQuestionType.find(q=>q.value == params.question)?.label ? this.usedQuestionType.find(q=>q.value == params.question).label : '')
                    formData.append('reasonCode', params.selectReason ? params.selectReason.value : '100')
                    // 如果原因选择了others 那么reason传others输入的值
                    formData.append('reason', params.selectReason ? params.selectReasonInput ? params.selectReasonInput:params.selectReason.label:'Others')
                    formData.append('message', this.questionObject.descriptionInput)
                    results.forEach(item => {
                        const {file} = item
                        if(file){
                            formData.append('imageFiles', file)
                        } else {
                            formData.append('imageFiles', item)
                        }
                    })
                    // console.log(formData)
                    this.$store.dispatch('addTicket', formData).then(() => {
                        if(JSON.stringify(this.ticket_con) !== '{}'){
                            this.$store.dispatch('getTicketByTicketId',this.ticket_con.id)
                        } else {
                            this.$store.dispatch('getTicket',this.ticket.id)
                        }
                        
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
                        this.questionSubmitLoading = false
                    })
                })     
            },
            questionImgUpload(e){
                if(!e.target.files || e.target.files.length == 0){
                    return
                }
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
            },
            addRate(){
                this.showAddRate = true;
            },
            returnSelectClose(){
                this.returnMaskShow = false
            },
            updateTicket(message){
                var fData = new FormData();
                if(this.ticket_con?.operaId){
                    fData.append("operaId",this.ticket_con.operaId)
                }else{
                    fData.append("operaId",this._orderId ? this._orderId :this.ticket.id)
                }
                console.log(fData.operaId, typeof(fData.operaId))
                fData.append("questionType",this.list.find(q => q.value == '04').label)
                fData.append("questionTypeCode", '04')
                fData.append("message", message)
                fData.append("messageType", 1)
                this.$store.dispatch("addTicket",fData).then(res=>{
                    if (JSON.stringify(this.ticket_con) !== '{}') {
                        this.$store.dispatch('getTicketByTicketId', this.ticket_con.id)
                    } else {
                        this.$store.dispatch('getTicket', this.ticket.id)
                    }
                })
                this.returnMaskShow = false
            },
            returnView(obj){
                if(obj){
                    // 退货流程里点击 view
                    if(obj?.id){
                        if(obj?.to == 'detail'){
                            // 去退货详情
                            // window.location.href = `/me/m/order/return-detail/${obj?.id}`
                            this.$router.push({path: `/me/m/order/return-detail/${obj?.id}`})
                        } else {
                            // 去退货列表
                            // window.location.href = `/me/m/order/`
                            // this.$router.push({path: '/me/m/order', params: {status: 7}})
                            window.location.href = '/me/m/order?type=return'
                        }
                    } else {
                        // 去订单详情
                        if(window.location.href?.indexOf('/me/m/order/detail') != -1){
                            this.close()
                        } else {
                            this.$router.push({path: `/me/m/order/detail/${this.ticket?.id}`})
                        }
                    }
                } else {
                    // ticket 里面点击 view
                    const packageList = this.ticket?.logistics?.packages || []
                    const products = packageList?.map(p => p.products)?.flat(Infinity)
                    const all = products?.length > 0 ? products : []
                    const productReturned = all?.filter(p => p?.returnStatus == 2)
                    const hasReturnOrderIdNums = productReturned?.filter(p => p?.returnOrderId)?.map(p => p?.returnOrderId) || []
                    const numUnique = Array.from(new Set(hasReturnOrderIdNums))
                    if(numUnique?.length == 1){
                        const returnId = numUnique[0]
                        this.$router.push(`/me/m/order/return-detail/${returnId}`)
                    } else if(numUnique?.length > 1){
                        window.location.href = '/me/m/order?type=return'
                        return
                    } else {
                        if(window.location.href?.indexOf('/me/m/order/detail') != -1){
                            this.close()
                        } else {
                            this.$router.push({path: `/me/m/order/detail/${this.ticket?.id}`})
                        }
                    }
                }
            },
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
    .rateTips{
        margin-top: 20px; 
        // text-align: center;
        color: #3aa978;
        text-decoration: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .addRate{
        textarea{
            // width: 100%;
            // height: 120px;
            // border: 1px solid #cacaca;
            // resize: none;
            // margin: 14px 0;
            // padding: 15px;
            width: 100%;
            padding: 5px 10px;
            height: 100px;
            border: solid 1px #e6e6e6;
            outline: none;
            resize: none;
            margin-top: 20px;
            margin-bottom: 16px;

            &::-webkit-input-placeholder{
                font-family: Roboto-Regular;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #bbbbbb;
            }
        }
        .rate-btn{
            width: 84px;
            height: 28px;
            background-color: #222222;	
            border-radius: 2px;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 12px;
            float: right;
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
                    .rateInfo{
                        font-family: Roboto-Regular;
                        font-size: 14px;
                        letter-spacing: 0px;
                        color: #222222;
                    }
                    .imgarea{
                        max-width: 280px;
                        float: right;
                        img{
                            width: 100%;
                        }
                    }

                    .returnMessageBox{
                        width: 230px;
                        background: #E6E6E6;
                        // padding: 12px 10px 10px;

                        .returnMessageTitle{
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            margin-bottom: 10px;
                            font-size: 12px;
                            font-family: Roboto-Bold, Roboto;
                            font-weight: bold;
                            color: #222222;
                            line-height: 14px;

                            .returnItemsNum{
                                font-size: 12px;
                                font-family: Roboto-Regular, Roboto;
                                font-weight: 400;
                                color: #222222;
                                line-height: 12px;
                            }
                        }
                        .returnProductList{
                            display: flex;
                            align-items: center;
                            justify-content: flex-start;
                            position: relative;
                            margin-bottom: 12px;

                            & > img{
                                display: inline-block;
                                width: 40px;
                                height: 50px;
                                margin-right: 10px;
                            }

                            & > img:last-child{
                                margin-right: 0;
                            }

                            .imgMore{
                                position: absolute;
                                top: 0;
                                right: 7px;
                                width: 40px;
                                height: 50px;
                                background-color: rgba(34,34,34,0.5);
                                text-align: center;
                                line-height: 50px;
                                color: #fff;
                                font-size: 12px;
                                letter-spacing: 2px;
                            }
                        }

                        .returnOrderId{
                            font-size: 12px;
                            font-family: Roboto-Regular, Roboto;
                            font-weight: 400;
                            line-height: 14px;
                            color: #666;
                            text-align: left;

                            & > span{
                                color: #222222;
                            }
                        }

                        .returnView{
                            margin-top: 10px;

                            .returnViewBtn{
                                float: right;
                                width: 62px;
                                height: 21px;
                                border-radius: 11px;
                                border: 1px solid #222222;
                                cursor: pointer;
                                text-align: center;
                                line-height: 21px;
                                text-transform: capitalize;
                                overflow: hidden;
                                font-size: 12px;
                                color: #222;
                            }
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
        // border: 1px solid #eee;
        border-radius: 2px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        cursor: pointer;
        color: #999;
        i{
            display: inline-block;
            margin-right: 5px;
        }
    }
    .unlike-active{
        // background-color: #f46e6d;
        color: #f46e6d;
        // border-color: #f46e6d;
    }
    .like-active{
        // background-color: #57b936;
        color: #57b936;
        // border-color: #57b936;
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

.grey{
    background: #e6e6e6 !important;
}

</style>