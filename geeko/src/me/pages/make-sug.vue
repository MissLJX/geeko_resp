<template>
    <div class="make-sug">
        <div class="fixed-header">
           <nav-bar>
                <i class="iconfont el-back-font" slot="left" @click="backToPage">&#xe693;</i>
                <span slot="center">{{$t("point.suggestion")}}</span>
            </nav-bar> 
        </div>
        

        <div class="make-sug-container">
            <div class="question-type">
                <div class="_hd">
                    <span class="color-1">*</span><span>{{$t("point.question_type")}}</span>
                </div>

                <div class="_bd" :class="{'border-red-1' : questionClassify.questionTypeBorderShow}">
                    <div class="st-table st-fullwidth _container" @click="questionShow = !questionShow">
                        <div class="st-cell _title">{{question}}</div>
                        <div class="st-cell st-t-r _icon">
                            <span class="iconfont" :class="{'active':questionShow}">&#xe695;</span>
                        </div>
                    </div>

                    <transition name="fade">
                        <ul class="_screen-list" v-if="questionShow">
                            <li :class="{'active' : question == 'Screen Freeze'}">
                                <input type="radio" id="question1" name="screenFreeze" value="Screen Freeze" v-model="question">
                                <label for="question1"></label>
                                <span>{{$t("point.screen_freeze")}}</span>
                            </li>
                            <li :class="{'active' : question == 'App crush'}">
                                <input type="radio" id="question2" name="screenFreeze" value="App crush" v-model="question">
                                <label for="question2"></label>
                                <span>{{$t("point.app_crush")}}</span>
                            </li>
                            <li :class="{'active' : question == 'Balck screen'}">
                                <input type="radio" id="question3" name="screenFreeze" value="Balck screen" v-model="question">
                                <label for="question3"></label>
                                <span>{{$t("point.black_screen")}}</span>
                            </li>
                            <li :class="{'active' : question == 'Device reboot'}">
                                <input type="radio" id="question4" name="screenFreeze" value="Device reboot" v-model="question">
                                <label for="question4"></label>
                                <span>{{$t("point.device_rebot")}}</span>
                            </li>
                            <li :class="{'active' : question == 'Running slowly'}">
                                <input type="radio" id="question5" name="screenFreeze" value="Running slowly" v-model="question">
                                <label for="question5"></label>
                                <span>{{$t("point.running_slowly")}}</span>
                            </li>
                            <li :class="{'active' : question == 'Other error'}">
                                <input type="radio" id="question6" name="screenFreeze" value="Other error" v-model="question">
                                <label for="question6"></label>
                                <span>{{$t("point.other_error")}}</span>
                            </li>
                        </ul>
                    </transition>

                    <div class="question-error" v-if="questionShow && question == 'Other error'">
                        <textarea maxlength="150" v-validate="'required'" name="otherError" :class="{'st-input-danger':errors.has('otherError')}" v-model="errorInput"></textarea>
                        <span v-show="errors.has('otherError')" class="st-is-danger">{{errors.first('otherError')}}</span>
                    </div>
                </div>
            </div>

            <div class="time">
                <div class="reg-birthday">
                    <div class="_item">
                        <div>
                            <span class="color-1">*</span><span>{{$t("point.time")}}</span>
                        </div>
                    </div>
                    <div style="position: relative;" :class="{'border-red-1':questionClassify.timeBorderShow}">
                        <div class="reg-birthday-flex">
                            <div class="_saveValue">
                                {{birth}}
                            </div>
                            
                            <div>
                                <div class="iconfont birth">&#xe694;</div>
                            </div>
                        </div>
                        <input type="date" id="reg-birthday-input" v-model="datatime" name="time">
                    </div>
                </div>
            </div>

            <div class="description">
                <div class="_hd">
                    <span class="color-1">*</span><span>{{$t("point.description")}}</span>
                </div>

                <div class="_bd">
                    <textarea maxlength="1000" v-validate="'required'" name="description" :class="{'st-input-danger':errors.has('description')}" :placeholder="$t('point.sorry_inconvenience')" v-model="descriptionAnswer"></textarea>
                    <span v-show="errors.has('description')" class="st-is-danger">{{errors.first('description')}}</span>
                </div>

                <p class="_num">{{descriptionNum}}/1000</p>
            </div>

            <div class="upload-image">
                <div class="_hd">
                    <span>{{$t("point.upload_image")}}</span>
                    <p>{{$t("point.maxinum_three_photos")}}</p>
                </div>

                <div class="_bd">
                    <div class="upload-container imgboxid">
                        <ul v-if="uploadedImages && uploadedImages.length">
                            <li v-for="(image,index) in uploadedImages" class="uploadImage" :key="index+image">
                                <img :src="image"/>
                                <span class="removeImg" @click="removeImg(index)">&times;</span>
                            </li>
                        </ul>
                        <div class="upload-img uploadimg" v-show="uploadedImages && uploadedImages.length < 3">
                            <form ref="imageLoader">
                                <input type="file" name="imageFiles" multiple="multiple" @change="loadImg" accept="image/jpg,image/jpeg,image/png,image/gif">
                            </form>
                            <div class="addbtn iconfont">&#xe6d3;</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="sett-address-footer">
            <!-- <div class="add-address" @click="confirmSuggestion">submit</div> -->
            <div class="add-address" @click="confirmSuggestion">{{$t("point.submit")}}</div>
        </div>

        <Loading v-if="uploadImageLoadingShow || confirmLoadingShow"></Loading>

        <transition name="uper">
            <div class="success-container" v-if="!!reminderMessage">
                <!-- <div class="_hd">
                    <span class="iconfont">&#xe6b7;</span>
                </div>
                <p class="_title1">{{$t("point.submit_success")}}</p>
                <p class="_title2">{{$t("point.wu_have_success")}}</p> -->
                <div style="padding:0px 45px;">
                    <div v-html="reminderMessage"></div>

                    <btn 
                        class="fill normal" 
                        :style="{fontSize:'16px',fontFamily:'AcuminPro-Bold',color:'#ffffff',textTransform: 'uppercase',marginTop:'20px'}"
                        @click.native="toHref(GLOBAL.getUrl('/'))"
                    >{{$t("label.shop_now")}}</btn>
                    <btn 
                        class="fill normal" 
                        :style="{fontSize:'16px',fontFamily:'AcuminPro-Bold',color:'#ffffff',textTransform: 'uppercase',marginTop:'10px'}"
                        @click.native="toHref(GLOBAL.getUrl('/fs/points-policy'))"
                    >{{$t("point.get_more_points")}}</btn>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import NavBar from '../components/nav-bar.vue'
    import fecha from 'fecha'
    import Loading from '../../components/loading.vue'
    import HtmlImageCompress from 'html-image-compress'
    import Btn from "../../components/btn.vue"

    export default {
        name:"MakeSug",
        components:{
            'nav-bar':NavBar,
            "Loading":Loading,
            "btn":Btn
        },
        data(){
            return {
                question:"",
                datatime:"",
                descriptionAnswer:"",
                // images:["https://dgzfssf1la12s.cloudfront.net/medium/1c5o8V8y2f9086427H414j481Y-79912",
                //     "https://dgzfssf1la12s.cloudfront.net/medium/1c6e0c403y0L0z7x1f4P4D9g96-32414",
                //     "https://dgzfssf1la12s.cloudfront.net/medium/1u6g1v5Z9c4c9O8a7l5u8o2b8x-40973"
                //     ],
                uploadedImages:[],
                files:[],
                newfiles:[],
                questionShow:false,
                errorInput:"",
                uploadImageLoadingShow:false,
                confirmLoadingShow:false,
                questionClassify:{
                    questionTypeBorderShow:false,
                    timeBorderShow:false
                },
                reminderMessage:null
            }
        },
        computed:{
            birth(){
                if(this.datatime && this.datatime.length > 0){
                    var d = new Date(Date.parse(this.datatime.replace(/-/g,"/")));
                    var curDate = new Date();
                    if(d >=curDate){
                        alert("Date of birth must be less than the current time！");
                        return fecha.format(new Date(), 'YYYY/MM/DD')
                    }else{
                        return fecha.format(new Date(this.datatime), 'YYYY/MM/DD')
                    }
                }else{
                   return; 
                }
                
            },
            descriptionNum(){
                return this.descriptionAnswer ? 1000 - this.descriptionAnswer.length : 0;
            }
        },
        methods:{
            loadImg(event) {
                this.newfiles = [...event.target.files];
                this.files = this.files.concat(this.newfiles);
                var files = this.newfiles;
                _.each(files, (file) => {
                    this.addnum = this.addnum + 1;
                    var src = window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1 ? window.webkitURL.createObjectURL(file) : window.URL.createObjectURL(file);
                    this.uploadedImages.push(src)
                })
                if (this.uploadedImages.length > 3) {
                    this.uploadedImages.splice(3, this.uploadedImages.length - 3);
                    this.files.splice(3, this.files.length - 3)
                }
            },
            removeImg(index) {
                this.uploadedImages.splice(index, 1)
                this.files.splice(index, 1);
            },
            confirmSuggestion(){
                let _this = this;
                let files = this.files;
                let promises = this.files.map(file => new HtmlImageCompress(file,{quality:.7, imageType:file.type}));

                Promise.all(promises).then(results => {
                    let _files = results.map(result => result.file);
                    let formData = new FormData();

                    _files.forEach((file,index) => {
                        formData.append("imageFiles",  new File([file], files[index].name));
                    });

                    if(!_this.question){
                        _this.questionClassify.questionTypeBorderShow = true;
                        return;
                    }else if(_this.question == 'Other error'){
                        _this.$validator.validate('otherError',_this.errorInput).then(result => {
                            if(!result){
                                return;
                            }else{
                                formData.append("label",_this.errorInput);
                            }
                        });
                    }else{
                        // 拿值
                        _this.questionClassify.questionTypeBorderShow = false;
                        formData.append("label",_this.question);
                    }

                    if(_this.datatime){
                        // 拿值
                        formData.append("time",_this.datatime);
                        _this.questionClassify.timeBorderShow = false;
                    }else{
                        _this.questionClassify.timeBorderShow = true;
                        return;
                    }

                    _this.$validator.validate('description',_this.descriptionAnswer).then(result => {
                        if(!result){
                            return;
                        }else{
                            // 拿值
                            formData.append("message",_this.descriptionAnswer);
                        }
                    });

                    _this.$validator.validateAll().then(result => {
                        console.log("result",result);
                        if(result && _this.datatime){
                            console.log("全部满足");
                            // for (var [a, b] of formData.entries()) {
                            //     console.log("formData",a, b);
                            // }
                            _this.confirmLoadingShow = true;
                            _this.$store.dispatch("me/makeSuggestion",formData).then(({prompt}) => {
                                // console.log("prompt",prompt);
                                if(prompt?.html){
                                    this.reminderMessage = prompt.html;
                                }else{
                                    this.$toast({
                                        content:"Update success!",
                                        type:"success",
                                        timer:2000,
                                        style1:{
                                            backgroundColor:"#ffffff",
                                            color:"#222222",
                                            padding:"15px 10px",
                                            borderRadius:"5px",
                                            boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.2)",
                                            bottom:"300px"
                                        }
                                    }).show();
                                }

                                _this.confirmLoadingShow = false;
                            });
                        }
                    });
                });
            },
            backToPage(){
                // if(this.successShow){
                //     this.successShow = false;
                // }else{
                //     this.$router.go(-1)
                // }
                this.$router.go(-1);
            },
            toHref(href){
                window.location.href = href;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .make-sug{
        padding-bottom: 40px;

        .fixed-header{
            position: fixed;
            width: 100%;
            top: 0;
            left: 0;
            right: 0;
            z-index: 5;
            background-color: #ffffff;
        }

       .make-sug-container{
           padding-top: 44px;
           padding-bottom: 70px;
           .question-type{
                padding: 0px 12px;
               ._hd{
                   font-family: 'SlatePro-Medium';
                   font-size: 14px;
                    color: #222222;
               }

               ._bd{
                   ._title{
                        font-size: 12px;
                        color: #666666;
                   }

                   ._icon{
                       .iconfont{
                            color: #222222;
                            transform: rotate(180deg);
                            display: inline-block;
                            cursor: pointer;
                            transition: transform .2s;

                            &.active{
                                transform: rotate(0deg);
                            }
                       }
                   }

                   ._container{
                        height: 30px;
                        line-height: 30px;
                        padding-left: 10px;
                    }

                   ._screen-list{
                       & li{
                            padding: 10px 0px;
                            background-color: #f5f5f5;
                            border-radius: 2px;
                            margin-bottom: 3px;
                            font-size: 12px;
                            color: #666666;
                            position: relative;
                            padding-left: 25px;

                            & > input[type="radio"]{
                                display: none;
                            }

                            & > label{
                                position: absolute;
                                top: 50%;
                                left: 5px;
                                width: 14px;
                                height: 14px;
                                border-radius: 50%;
                                border: 1px solid #999999;
                                transform: translateY(-50%);
                            }

                            // & > span{
                                
                            // }

                            &.active{
                                & > label{
                                    border: 1px solid #222222;
                                    &::after{
                                        position: absolute;
                                        content: "";
                                        width: 8px;
                                        height: 8px;
                                        background-color: #222222;
                                        border-radius: 50%;
                                        left: 50%;
                                        top: 50%;
                                        transform: translate(-50%,-50%);
                                    }
                                }
                            }

                            &:last-child{
                                margin-bottom: 0px;
                            }
                       }
                   }

                   .question-error{
                        padding: 0px 9px;
                        background-color: #f5f5f5;
                        padding-bottom: 10px;
                       textarea{
                            border-radius: 2px;
                            border: solid 1px #e6e6e6;
                            resize: none;
                            width: 100%;
                            height: 36px;

                            &.st-input-danger{
                                border: 1px solid red;
                            }
                        }
                   }
               }
           }

           .time{
               border-top: 10px solid#f6f6f6;
               margin-top: 20px;
               .reg-birthday {
                    position: relative;
                    margin-top: 15px;
                    padding: 0px 12px;

                    ._item {
                            display: flex;
                            font-size: 14px;
                            color: #222222;
                            z-index: 2;
                            white-space: nowrap;
                            text-transform: capitalize;
                            font-family: 'SlatePro-Medium';
                    } 

                    .reg-birthday-flex {
                        display: flex;
                        height: 30px;
                        line-height: 30px;

                        ._saveValue{
                            width: 100%;
                            font-size: 12px;
                            color: #666666;
                        }
                    }

                    #reg-birthday-input {
                        position: absolute;
                        display: inline-block;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        opacity: 0;
                    }
                }
           }

           .description{
               border-top: 10px solid#f6f6f6;
               padding: 0px 12px;
               ._hd{
                    font-family: 'SlatePro-Medium';
                    font-size: 14px;
                    color: #222222;
                    margin-top: 15px;
               }

               ._bd{
                   margin-top: 10px;
                   textarea{
                        width: 100%;
                        height: 100px;
                        background-color: #f5f5f5;
                        border-radius: 2px;
                        border: solid 1px #eeeeee;
                        resize: none;
                        color: #bbbbbb;
                        font-size: 12px;
                        padding: 10px;

                        &.st-input-danger{
                            border: 1px solid red;
                        }
                   }
               }

               ._num{
                    font-size: 12px;
                    color: #999999;
                    text-align: right;
                }
           }

           .upload-image{
               border-top: 10px solid#f6f6f6;
               padding: 0px 12px;
               margin-top: 15px;
               ._hd{
                    font-family: 'SlatePro-Medium';
                    font-size: 14px;
                    color: #222222;
                    margin-top: 15px;

                   & p{
                       font-size: 12px;
                        color: #999999;
                        line-height: 25px;
                   }
               }

               ._bd{
                   .upload-container{
                        overflow:hidden;
                        .upload-img{
                            float:left;
                            margin:5px;
                            width: fit-content;
                            background-size:100%;
                            position: relative;
                            background-color: #f5f5f5;
	                        border: solid 1px #eeeeee;
                            input{
                                display:inline-block;
                                height:70px;
                                width:70px;
                                opacity: 0;
                                position: relative;
                                z-index: 2;
                            }
                            .addbtn{
                                position: absolute;
                                font-size: 23px;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%, -50%);
                                z-index: 0;
                                color: #cccccc;
                            }
                        }
                        .uploadImage{
                            position:relative;
                            height:70px;
                            width:70px;
                            float:left;
                            margin:5px;
                            overflow: hidden;
                            img{
                                width:100%;
                            }
                            .removeImg{
                                width: 18px;
                                line-height: 18px;
                                font-size: 18px;
                                text-align: center;
                                display: block;
                                border-radius: 50%;
                                background-color: #222222;
                                color: #ffffff;
                                position: absolute;
                                top: 0px;
                                right: 0px;
                            }
                        }
                    }
               }
           }

           .color-1{
               color: #e64545;
           }

           .border-red-1{
               border: 1px solid red;
           }
       }

       .sett-address-footer{
            width: 100%;
            position: fixed;
            bottom: 51px;
            left: 0px;
            right: 0px;
            text-align: center;
            padding: 0px 13px 20px 13px;
            background-color: #fff;

            .add-address{
                height: 42px;
                line-height: 42px;
                background-color: #222222;
                font-family: SlatePro-Medium;
                font-size: 17px;
                color: #ffffff;
            }
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    .st-is-danger{
        color: red;
    }

    .success-container{
        position: fixed;
        top:44px;
        left: 0px;
        background-color: #ffffff;
        width: 100%;
        height: 100%;
        z-index: 2;
        padding-top: 50px;
        text-align: center;
        ._hd{
            color: rgb(32, 183, 89);

            & .iconfont{
                font-size: 50px;
            }
        }

        ._title1{
            font-family: 'SlatePro-Medium';
            font-size: 18px;
            color: #000000;
            margin-top: 20px;
        }

        ._title2{
            font-size: 12px;
            line-height: 16px;
            color: #666666;
            margin-top: 5px;
            padding: 0px 30px;
        }
    }

    .uper-enter-active, .uper-leave-to{
        top:44px;
    }

    .uper-enter-active , .uper-leave-active{
        transition: top .3s;
    }

    .uper-leave-active , .uper-enter{
        top: 100%;
    }
</style>