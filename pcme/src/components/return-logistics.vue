<template>
    <div class="return-logistics">
        <div class="return-logistics-container">
            <span class="return-close" @click="closeMask"><span class="iconfont">&#xe69a;</span></span>
            <div class="__title">{{$t("return_logistics")}}</div>

            <div class="return-notshow" v-if="returnLogisticsShow">
                <div class="logistics-company">
                    <p><span style="color:red;">*</span>{{$t('courier_company')}}：</p>
                    <!-- <select v-model="logisticsSelect">
                        <option value="default" disabled>{{$t("please_select_logistics")}}</option>
                        <optgroup label="Commonly Used">
                            <template v-if="logisticsCompanies != null && logisticsCompanies.commonlyUsed.length > 0">
                                <option :value="commonly.name" v-for="(commonly,index) in logisticsCompanies.commonlyUsed" :key="commonly.name+index">
                                    {{commonly.name}}
                                </option>
                            </template>
                        </optgroup>
                        <optgroup label="#">
                            <template v-if="logisticsCompanies != null && logisticsCompanies.logisticsCompanies.length > 0">
                                <option :value="logistics.name" v-for="(logistics,index) in logisticsCompanies.logisticsCompanies" :key="logistics.name+index">
                                    {{logistics.name}}
                                </option>
                            </template>
                        </optgroup>
                    </select> -->
                    <div class="logistic_company_select">
                        <div class="logistic_company_select_value" @click="()=> showCompanySelect = true">
                            <!-- {{logisticsSelect}} -->
                            <input type="text" :value="logisticsSelect" readonly>
                        </div>
                        <div class="logistic_company_select_options" v-if="showCompanySelect">
                            <div class="courier-company-message">
                                <span>{{$t("select_courier_company")}}</span>
                            </div>
                            <ul>
                                <template v-if="logisticsCompanies != null && logisticsCompanies.commonlyUsed.length > 0">
                                    <li 
                                        class="__item" 
                                        v-for="(commonly,index) in logisticsCompanies.commonlyUsed" 
                                        @click="getLogisticsValue(commonly.name)" 
                                        :key="commonly.name+index"
                                        :class="{'active' : commonly.name === itemName}"
                                    >
                                        <img class="__image" :src="commonly.iconURL" :alt="commonly.name">
                                        <span class="__font">{{commonly.name}}</span>
                                    </li>
                                </template>

                                <template v-if="logisticsCompanies != null && logisticsCompanies.logisticsCompanies.length > 0">
                                    <li 
                                        class="__item" 
                                        v-for="(logistics,index) in logisticsCompanies.logisticsCompanies"  
                                        @click="getLogisticsValue(logistics.name,'1')"
                                        :key="logistics.name+index"
                                        :class="{'active' : logistics.name === itemName}"
                                    >
                                        <span class="__font">{{logistics.name}}</span>
                                    </li>

                                    <li class="other-item" v-if="otherInputShow">
                                        <input type="text" :placeholder="fill_courier_company" v-model="otherInputValue">
                                    </li>
                                    
                                </template>

                                <template v-else>
                                    <div class="__lodding">
                                        {{$t("loading")}}...
                                    </div>
                                </template>
                            </ul>

                            <div class="footer-btn">
                                <div class="confirm" @click="confirmLogistics">
                                    {{$t("confirm")}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- <div class="tracking-number" v-show="logisticsSelect === 'Other'">
                    <p><span style="color:red;">*</span>{{$t("logistics_company_name")}}</p>
                    <input type="text" v-model="logisticsName">
                </div> -->

                <div class="tracking-number">
                    <p><span style="color:red;">*</span>{{$t("tracknum")}}：</p>
                    <input type="text" v-model="logisticsNumber">
                </div>

                <!-- <div class="body-or">
                    <span>
                        <span>{{$t("logistics_or")}}</span>
                    </span>
                </div> -->
                
                <div class="upload-image">
                    <div class="__title">
                        <span><span style="color:red;">*</span>{{$t("upload_receipt")}}</span>
                        <div class="upload-tip">{{$t("return_upload_tip")}}.</div>
                    </div>

                    <div class="upload-container" id="imgboxid">
                        <ul v-if="uploadedImages && uploadedImages.length">
                            <li v-for="(item,index) in uploadedImages" class="uploadImage" :key="item+index">
                                <img :src="getDifferenceImage(item)"/>
                                <span class="removeImg" @click="removeImg(index)">&times;</span>
                                <span class="pdf-name"  v-if="item && item.type ==='pdf'">{{item.originalFilename}}</span>
                            </li>
                        </ul>
                        <div class="upload-img" id="uploadimg" v-show="uploadedImages.length<3">
                            <form ref="imageLoader">
                                <input 
                                    type="file" 
                                    name="files" 
                                    multiple="multiple" 
                                    @change="loadImg" 
                                    accept="image/jpg,image/jpeg,image/png,image/gif,.pdf"
                                />
                            </form>
                            <div class="addbtn iconfont">&#xe644;</div>
                            <div class="addnum">{{addnum}} / 3</div>
                        </div>
                    </div>

                    <div class="upload-submit" @click="sendUploadFiles">
                        {{$t("submit")}}
                    </div>
                </div>
            </div>

            <div class="return-show" v-if="!returnLogisticsShow">
                <div class="__hd st-table">
                    <div class="st-row" v-if="returnLogisticsValue.logisticsCompany">
                        <div class="st-cell">{{$t("logisticsCompany")}}</div>
                        <div class="st-cell">{{returnLogisticsValue.logisticsCompany}}</div>
                    </div>
                    <div class="st-row" v-if="returnLogisticsValue.trackingNumber">
                        <div class="st-cell">{{$t("tracknum")}}</div>
                        <div class="st-cell">{{returnLogisticsValue.trackingNumber}}</div>
                    </div>
                </div>

                <div class="receipt" v-if="returnLogisticsValue.receiptFiles && returnLogisticsValue.receiptFiles.length > 0">
                    <p>{{$t("receipt")}}</p>
                    <ul>
                        <li v-for="(item,index) in returnLogisticsValue.receiptFiles" :key="item+index">
                            <div @click="magnifyImage($event)">
                                <img :src="getDifferenceImage(item)" alt="Image"/>
                            </div>
                            <a
                                class="pdf-click"
                                :href="'https://image.geeko.ltd'+item.url"
                                target="_blank"
                                v-if="item && item.type ==='pdf'"
                            >
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="footer">
                    <span>{{$t("information_wrong")}}? </span><a @click="returnLogisticsShowActive = true;">{{$t("fill_in_again")}}</a>
                </div>
            </div>
        </div>
        
        <!-- 退货物流凭证图片放大 -->
        <div class="image-magnification" v-if="imageMagnificationShow" @click="imageMagnificationShow = false;">
            <div>
                <img :src="imageMagnificationSrc" alt="Image">
            </div>
        </div>

        
    </div>
</template>

<script>
    import HtmlImageCompress from 'html-image-compress';
    

    import { mapGetters } from 'vuex';

    export default {
        name:"return-logistics",
        data(){
            return {
                uploadedImages: [],
                files:[],
                addnum:0,
                newfiles:[],
                logisticsSelect:'',
                logisticsName:'',
                logisticsNumber:'',
                returnLogisticsShowActive:false,
                imageMagnificationShow:false,
                imageMagnificationSrc:'',
                itemName: '',
                otherInputShow: false,
                otherInputValue: '',
                showCompanySelect: false,
                modalconfirmshow: false,
                confirmCfg: ''
            }
        },
        props:{
            orderId:{
                type:String,
                default:'',
                required:true
            }
        },
        created(){
            let _this = this;
            _this.$emit("update:loddingShow",true);
            this.$store.dispatch('getLogisticsCompanies');
        },
        mounted(){
            this.$store.dispatch('getReturnLogistics',this.orderId).then((result) => {
                // console.log("result",result);
                if(result){
                    var item = result.logistics;
                    this.logisticsSelect = item.logisticsCompany ? item.logisticsCompany : "";
                    this.logisticsNumber = item.trackingNumber ? item.trackingNumber : "";
                    this.uploadedImages = item.receiptFiles && item.receiptFiles.length > 0 ? item.receiptFiles : [];
                    this.addnum = item.receiptFiles && item.receiptFiles.length > 0 ? item.receiptFiles.length : 0;
                }
                this.$emit("update:loddingShow",false);
            });
        },
        components:{
            HtmlImageCompress,
        },
        computed:{
            ...mapGetters(['logisticsCompanies','returnLogistics']),
            returnLogisticsShow(){
                return !!this.returnLogistics && this.returnLogistics.length < 0 || this.returnLogisticsShowActive;
            },
            returnLogisticsValue(){
                // console.log(this.returnLogistics)
                return !!this.returnLogistics && this.returnLogistics.length > 0 ? this.returnLogistics[0] : {};
            },
            fill_courier_company(){
                return this.$t("fill_courier_company")
            }
            
        },
        methods:{
            getLogisticsValue(name,type){
                this.itemName = name;
                if(type){
                    this.otherInputShow = true;
                }else{
                    this.otherInputShow = false;
                }
            },
            confirmLogistics(){
                // 当未选中other且选中其他内容时
                if(!this.otherInputShow && this.itemName){
                    // this.$emit('getSelectValue',this.itemName);
                    // this.$emit('update:close',false);
                    this.logisticsSelect = this.itemName;
                    this.showCompanySelect = false;
                }

                // 选中other且输入框内容不为空时
                if(this.otherInputShow && this.otherInputValue){
                    // this.$emit('getSelectValue',this.otherInputValue);
                    // this.$emit('update:close',false);
                    this.logisticsSelect = this.otherInputValue;
                    this.showCompanySelect = false;
                }

                
            },
            loadImg(event) {
                let _this = this;
                this.newfiles = [...event.target.files];
                this.files = this.files.concat(this.newfiles);
                let files = this.files;
                _this.$emit("update:loddingShow",true);

                if(this.files.length > 3){
                    // console.log('...')
                    this.files.splice(3, this.files.length - 3)
                }

                let promises = this.files.filter((item) => {
                    return !!!(item.type.indexOf("pdf") >= 0);
                }).map(file => {
                    return new HtmlImageCompress(file , {quality:.7, imageType:file.type});
                });

                Promise.all(promises).then(result => {
                    var formData = new FormData();
                    formData.append("type","returnLogistics");
                    let _files = result.map(result => result.file);

                    // Image
                    _files.forEach((file,index) => {
                        formData.append("files",new File([file],files[index].name));
                    });

                    // Pdf
                    _this.files.filter((item) => {
                        return !!!(item.type.indexOf("pdf") < 0)
                    }).forEach((file,index) => {
                        formData.append("files",file);
                    });

                    // for (var [a, b] of formData.entries()) {
                    //     console.log("formData",a, b);
                    // }

                     _this.$store.dispatch('generalUploadImage',{formData}).then((result) => {
                        if(!!result && result.length > 0){
                            _this.uploadedImages = []
                            result.forEach((item) => {
                                _this.addNum += 1;
                                _this.uploadedImages.push(item);
                            });
                        }
                        _this.$emit("update:loddingShow",false);
                    });
                });

                if (this.uploadedImages.length > 3) {
                    this.uploadedImages.splice(3, this.uploadedImages.length - 3);
                    this.files.splice(3, this.files.length - 3)
                }
            },
            removeImg(index) {
                this.uploadedImages.splice(index, 1);
                this.files.splice(index, 1);
                this.addnum = this.addnum - 1;
            },
            sendUploadFiles(){
                let apiName = "addReturnLogistics";
                let _this = this;
                var uploadFiles = new Object();

                // 物流信息ID
                if(this.returnLogistics && this.returnLogistics.logistics && this.returnLogistics.logistics.id){
                    uploadFiles['id'] = this.returnLogistics.logistics.id;
                    apiName = "editReturnLogistics";
                }
                
                if(!this.logisticsSelect && this.uploadedImages.length <= 0){
                    alert(this.$t("logistics_info_not_empty")+"!");
                    return;
                }
                _this.$emit("update:loddingShow",true);
                 

                 if(this.orderId && this.orderId != null){
                    // formData.append('orderId',this.orderId);
                    uploadFiles['returnOrderId'] = this.orderId;
                }

                if(this.logisticsSelect && this.logisticsSelect !== null && this.logisticsSelect !== "Other"){
                    // 物流选择后的值   物流名
                    uploadFiles['logisticsCompany'] = this.logisticsSelect;
                }
                // else if(this.logisticsSelect === "Other" && !!!this.logisticsName && this.logisticsName === ""){
                //     alert(this.$t("logistics_name_not_empty"));
                //     _this.$emit("update:loddingShow",false);
                //     return;
                // }else{
                //     uploadFiles['logisticsCompany'] = this.logisticsName;
                // }

                if(this.logisticsSelect){
                    if(!!!this.logisticsNumber && this.logisticsNumber === ""){
                        alert(this.$t("track_number_not_empty"));
                        _this.$emit("update:loddingShow",false);
                        return;
                    }else{
                        uploadFiles['trackingNumber'] = this.logisticsNumber;
                    }
                }

                if(this.uploadedImages.length > 0){
                    uploadFiles['receiptFiles'] = this.uploadedImages;
                }

                _this.$store.dispatch(apiName,uploadFiles).then(result => {
                    // alert(this.$t("success")+'!');
                    this.$emit('logisticsShow', true);
                });
                    
            },
            closeMask(){
                this.$emit('logisticsShow', false);
            },
            magnifyImage(event){
                this.imageMagnificationSrc = event.target.src;
                this.imageMagnificationShow = true;
            },
            getDifferenceImage(item){
                if(item && !!item && item != null){
                    return item.type === "pdf" ? "https://image.geeko.ltd/chicme/20210518/pdf.png" : "https://image.geeko.ltd"+item.url;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @font-face {
        font-family: 'SlatePro';
        src: url('https://d2py3dbi6pvb43.cloudfront.net/fonts/SlatePro.ttf');
    }

    @font-face {
        font-family: 'SlatePro-Medium';
        src: url('https://d2py3dbi6pvb43.cloudfront.net/fonts/SlatePro-Medium.ttf');
    }

    @font-face {
    font-family: 'iconfont';  /* Project id 384296 */
    src: url('//at.alicdn.com/t/font_384296_e2daa86kqnt.woff2?t=1622113709113') format('woff2'),
        url('//at.alicdn.com/t/font_384296_e2daa86kqnt.woff?t=1622113709113') format('woff'),
        url('//at.alicdn.com/t/font_384296_e2daa86kqnt.ttf?t=1622113709113') format('truetype');
    }

    .iconfont{
        font-family:"iconfont" !important;
        font-size:16px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
	}
    
    .return-logistics{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        overflow-y: auto;
        z-index: 999;

        .return-logistics-container{
            width: 520px;
            height: auto;
            margin: 0 auto;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            background-color: white;
            color: #222;
            font-size: 14px;
            padding: 40px;

            .return-close{
                position: absolute;
                top: 20px;
                right: 24px;
                color: #666666;
                span{
                    font-size: 24px;
                    cursor: pointer;
                }
            }

            & > .__title{
                font-family: SlatePro-Medium;
                font-size: 24px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #222222;
                margin-bottom: 25px;
            }

            .return-notshow{
                .logistics-company{
                    & > p{
                        font-family: AcuminPro-Bold;
                        font-size: 16px;
                        color: #222;
                        line-height: 25px;
                        margin-bottom: 10px;
                    }

                    & > select{
                        height: 40px;
                        line-height: 40px;
                        width: 100%;
                        border-radius: 2px;
                        padding-left: 10px;
                        border: solid 1px #cacaca;
                    }
                }

                .tracking-number{
                    margin-top: 15px;
                    & > p{
                        font-family: AcuminPro-Bold;
                        font-size: 16px;
                        color: #222;
                        line-height: 25px;
                        margin-bottom: 10px;
                    }

                    & > input{
                        height: 40px;
                        line-height: 40px;
                        width: 100%;
                        border-radius: 2px;
                        border: solid 1px #cacaca;
                        padding-left: 10px;
                    }
                }

                .body-or{
                    text-align: center;
                    height: 60px;
                    line-height: 60px;
                    & > span{
                        height: 1px;
                        width: 114px;
                        display: inline-block;
                        position: relative;
                        border-top: 1px solid #e6e6e6;

                        & > span{
                            font-family: SlatePro;
                            font-size: 16px;
                            color: #666666;
                            position: absolute;
                            left: 50%;
                            transform: translateX(-50%);
                            top: -11px;
                            background-color: #ffffff;
                            line-height: 18px;
                        }
                    }
                }


                .upload-image{
                    .__title{
                        margin-top: 20px;

                        & > span:first-child{
                            font-family:  AcuminPro-Bold;
                            font-size: 16px;
                            color: #222222;
                        }

                        & > span:last-child{
                            font-size: 12px;
                            font-family: SlatePro;
                            color: #666666;
                            margin-left: 5px;
                        }

                        .upload-tip{
                            background-color: #f6f6f6;
	                        border-radius: 2px;
                            padding: 10px;
                            font-family: SlatePro-Regular;
                            font-size: 14px;
                            font-weight: normal;
                            font-stretch: normal;
                            letter-spacing: 0px;
                            color: #222222;
                            margin-top: 10px;
                        }
                    }

                    .upload-container{
                        overflow:hidden;
                        padding-top: 20px;
                        .upload-img{
                            float:left;
                            width: fit-content;
                            /*background-image: url("https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/promotion/1129/chicme-23.png");*/
                            background-size:100%;
                            position: relative;
                            border: 1px dashed #999;
                            input{
                                display:inline-block;
                                height:80px;
                                width:80px;
                                opacity: 0;
                                margin:5px;
                                position: relative;
                                z-index: 99;
                                cursor: pointer;
                            }
                            .addbtn{
                                position: absolute;
                                // top: calc(50% - 25px);
                                // left: calc(50% - 8px);
                                top:50%;
                                left: 50%;
                                transform: translate(-50%,-50%);
                                font-size: 32px;
                                z-index: 0;
                                color: #bbbbbb;
                            }
                            .addnum{
                                position: absolute;
                                top: 70%;
                                left: 50%;
                                transform: translateX(-50%);
                                font-size: 12px;
                                z-index: 0;
                                color: #999;
                            }
                        }
                        .uploadImage{
                            position:relative;
                            height:80px;
                            width:80px;
                            float:left;
                            margin:5px;
                            overflow: hidden;
                            background-color: #fafafa;
                            img{
                                width:100%;
                            }
                            .removeImg{
                                width:20px;
                                line-height:20px;
                                font-size: 21px;
                                text-align: center;
                                display: block;
                                border-radius: 50%;
                                background-color: #222222;
                                color:#ffffff;
                                position:absolute;
                                top:0px;
                                right:0px;
                                cursor: pointer;
                                z-index: 2;
                            }

                            .pdf-name{
                                position: absolute;
                                bottom: 0;
                                left: 0;
                                color: yellow;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                                font-size: 12px;
                            }
                        }
                    }

                    .upload-submit{
                        height: 40px;
                        line-height: 40px;
                        width: 100%;
                        background-color: #222222;
                        border-radius: 2px;
                        font-family: SlatePro-Medium;
                        font-size: 16px;
                        color: #ffffff;
                        text-transform: uppercase;
                        text-align: center;
                        margin-top: 80px;
                        cursor: pointer;
                    }
                }
            }

            .return-show{
                width: 100%;
                .__hd{
                    padding: 0px 0px 10px 0px;
                    .st-row{
                        height: 30px;
                        line-height: 30px;

                        & > div:first-child{
                            font-family: SlatePro;
                            font-size: 14px;
                            color: #666666;
                        }

                        & > div:last-child{
                            font-family: SlatePro;
                            font-size: 16px;
                            color: #222222;
                            padding-left: 15px;
                        }
                    }
                }

                .receipt{
                    padding: 0px 0px 0px 0px;
                    & > p{
                        font-family: SlatePro-Medium;
                        font-size: 16px;
                        color: #222222;
                        line-height: 40px;
                    }

                    & > ul{
                        & > li{
                            width: 70px;
                            height: 70px;
                            position: relative;
                            float: left;
                            margin: 5px;
                            overflow: hidden;
                            background-color: #fafafa;
                            cursor: pointer;

                            & > div > img{
                                width: 100%;
                            }

                            & .pdf-click{
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                z-index: 1;
                            }
                        }

                        &:after{
                            display: block;
                            content: '';
                            clear: both;
                        }
                    }
                }

                .footer{
                    font-family: SlatePro;
                    font-size: 14px;
                    color: #666666;
                    border-top: 1px solid #eeeeee;
                    padding: 10px 0px 0px 0px;
                    margin-top: 20px;
                    & a{
                        text-decoration: underline;
                        cursor: pointer;
                        display: inline;
                    }
                }
            }
        }

        .image-magnification{
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,.6);
            position: fixed;
            left: 0;
            top: 0;
            cursor: pointer;
            z-index: 10;

            & > div{
                max-height: 100%;
                display: block;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                -webkit-transform: translate(-50%, -50%);

                & img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    .logistic_company_select{
        position: relative;
        background: #fff;
        width: 100%;

        .logistic_company_select_value{
            width: 100%;
            height: 40px;
            border-radius: 2px;
            border: solid 1px #cacaca;
            position: relative;
            cursor: pointer;
            

            input{
                border: none;
                outline: none;
                padding: 0 10px;
                line-height: 38px;
                width: 410px;
                cursor: pointer;
            }

            &::after{
                content: '\e7a9';
                font-family: iconfont;
                font-size: 12px;
                color: #222222;
                position: absolute;
                top: 50%;
                transform: translateY(-50%) rotate(90deg);
                right: 10px;
            }
        }

        .logistic_company_select_options{
            z-index: 4;
            position: absolute;
            top: 0;
            width: 440px;
            background: #fff;
            box-shadow: 3px 3px 8px 0px rgba(0,0,0,0.2);
            border-radius: 2px;

            .courier-company-message{
                padding: 10px 0px 10px 12px;
                background-color: #f6f6f6;
                font-size: 16px;
                color: #222222;
                font-family: 'SlatePro-Medium';
            }

            .__title{
                height: 22px;
                line-height: 22px;
                font-family: SlatePro-Medium;
                font-size: 16px;
                color: #121314;
                background-color: #f7f7f7;
                padding-left: 10px;
            }

            .commonly-used{
                height: 36px;
                line-height: 36px;
                font-family: SlatePro-Medium;
                font-size: 16px;
                color: #121314;
            }

            .__item{
                height: 44px;
                line-height: 44px;
                font-family: SlatePro;
                font-size: 14px;
                color: #121314;
                padding-left: 12px;
                position: relative;
                cursor: pointer;

                .__font{
                    // display: block;
                    position: relative;
                    font-family: SlatePro;
                    font-size: 14px;
                    color: #121314;
                    vertical-align: middle;
                }

                .__image{
                    width: 42px;
                    height: 21px;
                    background-color: #eeeeee;
                    vertical-align: middle;
                    margin-right: 10px;
                }

                &.active::after{
                    font-family: iconfont;
                    content: '\E638';
                    font-size: 15px;
                    color: #222222;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 12px;
                }
            }

            .other-item{
                padding:0px 12px;

                input{
                    border: 1px solid #999999;
                    height: 34px;
                    padding-left: 10px;
                    width: 100%;
                }
            }

            .__lodding{
                height: 45px;
                line-height: 45px;
                text-align: center;
                font-size: 16px;
            }

            .footer-btn{
                width: 100%;
                // position: fixed;
                // bottom: 51px;
                // left: 0px;
                // right: 0px;
                text-align: center;
                padding: 0px 13px 20px 13px;
                background-color: #fff;
                margin-top: 80px;

                .confirm{
                    height: 42px;
                    line-height: 42px;
                    background-color: #222222;
                    font-family: SlatePro-Medium;
                    font-size: 17px;
                    color: #ffffff;
                    cursor: pointer;
                }
            }
        
        }
    }
    
</style>