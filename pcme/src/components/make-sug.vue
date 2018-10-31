<template>
    <div>
        <div class="p-hd">
            <strong>{{$t('makesug')}}</strong> &nbsp;| &nbsp; We Welcome Your Comments and Suggestions.
        </div>
        <div class="p-bd">
            <p>We are committed to providing quality products with convenient and professional service.Your comments help us to continue to improve our website and service</p>
            <p>Please leave your thoughts in the comment box below. We welcome them.In return, we will give you <span>200 credits</span> if your comment is adopted. We will notify you by email:  </p>
            <div class="m_email" @click="isAlert=true"><a>{{communicationEmail}}</a><i class="iconfont">&#xe61f;</i></div>
            <div class="commet-area commet-area1">
                <p>{{$t('sugcom')}}</p>
                <div class="remnant">{{remnant}}/1000</div>
                <div class="t-area">
                    <textarea  style="resize:none;" maxlength="1000" @input ="descInput" v-model="info.subject" v-validate="'required'" name="suggestion" :class="{'st-input-danger':errors.has('suggestion')}"></textarea>
                    <span>*</span>
                </div>
                <span v-show="errors.has('suggestion')" class="st-is-danger">{{errors.first('suggestion')}}</span>
            </div>
            <div class="commet-area">
                <p>My Comments are  in reference to my experience with(Optional):</p>
                <span class="remnant">{{remnant1}}/1000</span>
                <div class="t-area">
                    <textarea style="resize:none;" maxlength="1000" @input ="descInput1" v-model="info.message"></textarea>
                </div>
            </div>
            <div class="up-img">
                <p>{{$t('uploadscreen')}}:</p>
                <upload-img @getImgFiles="getImgFiles"></upload-img>
            </div>
            <div class="v-btn" @click="submsg">{{$t('submit')}}</div>
        </div>
        <div class="mask" v-if="isAlert">
            <div class="confirm-con">
                <h3>{{$t('changeEmail')}}</h3>
                <p class="cancel-btn" @click="isAlert=false"><i class="iconfont">&#xe69a;</i></p>
                <div><input name="email" v-validate="'required|email'" v-model="nemail"
                            :class="{'st-input':true, 'st-input-danger':errors.has('email')}" type="text"
                            :placeholder="$t('newemailaddress')"/>
                    <span v-show="errors.has('email')" class="st-is-danger">{{errors.first('email')}}</span></div>
                <div class="n-btn" @click="changeEmail">{{$t('submit')}}</div>
            </div>
        </div>
        <loding v-if="isloding"></loding>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import uploadImg from './upload-img.vue'
    import loding from './loding.vue'

    export default {
        data(){
            return{
                remnant:0,
                remnant1:0,
                info:{
                    subject:null,
                    message:null,
                },
                files:null,
                cemail:null,
                nemail:'',
                isAlert:false,
                isloding:false
            }
        },
        components:{
            'upload-img':uploadImg,
            'loding':loding
        },
        computed:{
            ...mapGetters([
                'me',
            ]),
            communicationEmail(){
                if(this.cemail === null && this.me.communicationEmail){
                    this.cemail =  this.me.communicationEmail
                }
                return this.cemail
            },
            message(){
                return "Suggestion: "+this.info.subject+"<br\/>Experence: "+this.info.message
            }
        },
        methods:{
            descInput() {
                let txtVal = this.info.subject.length;
                this.remnant = txtVal;
            },
            descInput1() {
                let txtVal = this.info.message.length;
                this.remnant1 = txtVal;
            },
            submsg(){
                this.$validator.validateAll().then((result) => {
                    if (result && this.info) {
                        this.isloding = true
                        var formData = new FormData();
                        _.each(this.files, (file) => {
                            formData.append('imageFiles', file);
                        });
                        if(this.cemail === ''){
                            formData.append('subject', this.me.communicationEmail);
                        }else{
                            formData.append('subject', this.cemail);
                        }
                        formData.append('message', this.message);

                        this.$store.dispatch('makeSuggestion', formData).then(() => {
                            alert("success")
                            this.isloding = false
                        }).catch(e => {
                            this.isloding = false
                            alert(e.result)
                        })
                    }
                });
            },
            getImgFiles(files){
                this.files = files;
            },
            changeEmail(){
                this.$validator.validateAll().then((result) => {
                    if(this.nemail){
                        this.cemail = this.nemail
                        this.isAlert = false
                    }
                })
            }
        },
        created(){
            this.$store.dispatch('getMe')
        },
    }
</script>

<style scoped lang="scss">
    @font-face {
        font-family: 'iconfont';  /* project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_a0e3ctpqj68.eot');
        src: url('//at.alicdn.com/t/font_384296_a0e3ctpqj68.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_384296_a0e3ctpqj68.woff') format('woff'),
        url('//at.alicdn.com/t/font_384296_a0e3ctpqj68.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_384296_a0e3ctpqj68.svg#iconfont') format('svg');
    }
    .iconfont{
        font-family:"iconfont" !important;
        font-size:16px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }
    .st-input-danger{
        border-color: red !important;
    }
    .st-is-danger{
        color: red;
    }
    .p-hd{
        color: #666;
        strong{
            color: #222;
            font-size: 16px;
        }
    }
    .p-bd{
        padding-left: 150px;
        padding-top: 50px;
        p{
            font-size: 14px;
            line-height: 18px;
            color: #222;
            margin-top: 10px;
            span{
                color: #E64545;
            }
        }
        .m_email{
            color: #4d93cb;
            margin-left: 300px;
            margin-top: 20px;
            a{
                text-decoration: underline;
                color: #4d93cb;
            }
            i{
                margin-left: 10px;
                cursor: pointer;
            }
        }
        .commet-area{
            width: 520px;
            height: 100px;
            position: relative;
            margin-top: 50px;
            padding-left: 70px;
            h4,p{
                margin: 10px 0;
            }
            .remnant{
                position: absolute;
                right: -60px;
                bottom: -20px;
                color: #666;
            }
            .t-area{
                position: relative;
                span{
                    position: absolute;
                    right: -90px;
                    top: 0;
                    color: red;
                    font-size: 18px;
                }
                textarea{
                    width: 520px;
                    height: 100px;
                    border: 1px solid #cacaca;
                    border-radius: 3px;
                    padding: 15px;
                }
            }

        }
        .up-img{
            padding-left: 70px;
            margin-top: 40px;
            p{
                margin-bottom: 20px;
            }
        }
        .v-btn{
            width: 240px;
            line-height: 40px;
            background-color: #222;
            border-radius: 2px;
            color: #fff;
            text-align: center;
            margin: 50px 0 20px 70px;
            cursor: pointer;
        }
    }
    .mask{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.4);
        text-align: center;
        z-index: 999;
        .confirm-con{
            width: 642px;
            height: 214px;
            margin:0 auto;
            position: relative;
            top: calc(50% - 82px);
            background-color: white;
            color: #222;
            font-size: 14px;
            padding: 55px 65px 55px 65px;
            text-align: left;
            input
            {
                width: 514px;
                line-height: 38px;
                border: 1px solid #cacaca;
                padding-left: 10px;
            }
            h3{
                margin-bottom: 13px;
            }
            .cancel-btn{
                position: absolute;
                top: 20px;
                right: 16px;
                font-size: 18px;
                color: #666666;
                text-align: right;
                cursor: pointer;
                margin-bottom: 15px;
                i{
                    font-size: 20px;
                }
            }
            .n-btn{
                width: 170px;
                line-height: 32px;
                text-align: center;
                background-color: #222;
                color: #fff;
                margin: 0 auto;
                cursor: pointer;
                margin-top: 26px;
                float: left;
                border-radius: 2px;
            }
        }
    }
</style>