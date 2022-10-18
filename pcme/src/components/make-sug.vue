<template>
    <div class="make-sug">
        <div class="p-hd">
            <p>{{$t('makesug')}}</p>
            <p>{{$t("point.we_welcome_your_comments")}}</p>
        </div>
        <div class="p-bd">
            <p>{{$t("point.we_are_committed_to_prod")}}</p>
            <p>{{$t("point.please_leave_your")}}</p>
            <!-- <div class="m_email" @click="isAlert=true"><a>{{communicationEmail}}</a><i class="iconfont">&#xe61f;</i></div> -->
            <div class="commet-area commet-area1">
                <p>
                    <span>*</span><span style="color:#000000;">{{$t('sugcom')}}</span>
                </p>
                <div class="t-area">
                    <textarea  
                        style="resize:none;" 
                        maxlength="1000" 
                        @input ="descInput" 
                        v-model="subject" 
                        v-validate="'required'" 
                        name="suggestion" 
                        :class="{'st-input-danger':errors.has('suggestion')}"
                        :placeholder="$t('point.sorry_inconvenience')"
                    ></textarea>
                </div>
                <div class="remnant">{{remnant}}/1000</div>
                <span v-show="errors.has('suggestion')" class="st-is-danger">{{errors.first('suggestion')}}</span>
            </div>
            <!-- <div class="commet-area">
                <p>My Comments are  in reference to my experience with(Optional):</p>
                <span class="remnant">{{remnant1}}/1000</span>
                <div class="t-area">
                    <textarea style="resize:none;" maxlength="1000" @input ="descInput1" v-model="info.message"></textarea>
                </div>
            </div> -->
            <div class="up-img">
                <p>{{$t('uploadscreen')}}:</p>
                <p class="_title">{{$t("point.maxinum_three_photos")}}</p>
                <upload-img @getImgFiles="getImgFiles"></upload-img>
            </div>
            <div class="v-btn" @click="submsg">{{$t('submit')}}</div>
        </div>
        <!-- <div class="mask" v-if="isAlert">
            <div class="confirm-con">
                <h3>{{$t('changeEmail')}}</h3>
                <p class="cancel-btn" @click="isAlert=false"><i class="iconfont">&#xe69a;</i></p>
                <div><input name="email" v-validate="'required|email'" v-model="nemail"
                            :class="{'st-input':true, 'st-input-danger':errors.has('email')}" type="text"
                            :placeholder="$t('newemailaddress')"/>
                    <span v-show="errors.has('email')" class="st-is-danger">{{errors.first('email')}}</span></div>
                <div class="n-btn" @click="changeEmail">{{$t('submit')}}</div>
            </div>
        </div> -->
        <div class="tip_mask" @click.self="closeMask" v-if="showTip">
            <div class="tip_content" >
                <!-- <span class="iconfont success_icon">&#xe6b7;</span>
                <div class="points_num">Submitted Successfully</div>
                <div class="points_policy">
                    100points = 1$
                    <span class="iconfont points_icon" @click="toPointsPolicy">&#xe73f;</span>
                </div> -->
                <div class="points_content" v-html="tipContent">

                </div>
                <div class="points_btn_box">
                    <div class="points_btn" @click="()=>goShopping()">
                        {{$t("points_mall.shop_now")}}
                    </div>
                    <div class="points_btn" @click="()=>viewPoints()">
                        {{$t("points_mall.get_more_points")}}
                    </div>
                </div>
            </div>
        </div>
        <loding v-if="isloding"></loding>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import uploadImg from './upload-img2.vue'
    import loding from './loding.vue'

    export default {
        data(){
            return{
                remnant:0,
                remnant1:0,
                subject:null,
                info:{
                    subject:null,
                    message:null,
                },
                files:null,
                cemail:null,
                nemail:'',
                // isAlert:false,
                isloding:false,
                showTip: false,
                tipContent: '',
                points: 100,
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
                this.remnant = 1000 - this.subject.length;
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
                        // if(this.cemail === ''){
                        //     formData.append('subject', this.me.communicationEmail);
                        // }else{
                        //     formData.append('subject', this.cemail);
                        // }
                        formData.append('message', this.subject);

                        this.$store.dispatch('makeSuggestion', formData).then((res) => {
                            // alert("success")
                            if(res.prompt && res.prompt.html){
                                this.tipContent = res.prompt.html;
                            }
                            this.showTip = true;
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
            // changeEmail(){
            //     this.$validator.validateAll().then((result) => {
            //         if(this.nemail){
            //             this.cemail = this.nemail
            //             this.isAlert = false
            //         }
            //     })
            // },
            closeMask(){
                this.showTip = false;
            },
            goShopping(){
                window.location.href = `${window.ctx || ''}/`
            },
            viewPoints(){
                window.location.href = `${window.ctx || ''}/me/m/credits`
            },
        },
        created(){
            this.$store.dispatch('getMe')
            this.tipContent = "<div style='text-align: center;'> <img src='https://image.geeko.ltd/chicme/2021111101/right_icon.png' alt='ModalPoints' style='width:54px;'> <p style='font-weight:bold;font-size:18px;margin: 0;line-height:28px;color: #000000;'>Submitted Successfully</p> <p style='margin: 0;font-size: 12px;font-family: Roboto-Regular;line-height:16px;margin-top:8px;'> We have successfully received your suggestion and it will take few days to process this issue, we will reach out to you if we need any information. Please check our reply at your email address. Accepted suggestions will earn <span style='color: #e64545;font-weight: bold;font-family: Roboto-Regular;'>200 points</span>. Thanks for your cooperation. </p> <p style='margin: 0;font-size: 12px;'> <span>100 points = $1 USD.</span> <a href='/policy/bonus-point' style='vertical-align: middle;'><img src='https://image.geeko.ltd/chicme/2021111101/question.png' alt='Question' style='width: 14px;height: 14px;'></a> </p> </div>"
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
    .p-bd{
        // padding-left: 150px;
        // padding-top: 50px;
        p{
            font-size: 14px;
            line-height: 18px;
            color: #222222;
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
            width: 100%;
            position: relative;
            margin-top: 37px;
            p{
                font-family: 'SlatePro-Medium';
                font-size: 24px;
                color: #000000;
                line-height: normal;
                margin-bottom: 10px;
            }  

            .remnant{
                position: absolute;
                right: 0px;
                bottom: -15px;
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
                    width: 100%;
                    height: 198px;
                    border: none;
                    border-radius: 3px;
                    padding: 15px;
                    background-color: #f9f9f9;
                }
            }

        }
        .up-img{
            margin-top: 40px;
            p{
                font-family: 'SlatePro-Medium';
                font-size: 24px;
                color: #000000;
                line-height: normal;
            }

            ._title{
                font-family: 'SlatePro';
                font-size: 14px;
                color: #222222;
            }
        }
        .v-btn{
            width: 240px;
            line-height: 40px;
            background-color: #222;
            border-radius: 2px;
            color: #fff;
            text-align: center;
            margin: 50px 0 20px 00px;
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

    .make-sug{
        margin-top: -50px;
        .p-hd{
            text-align: center;
            & > p{
                &:first-child{
                    font-family: 'SlatePro-Medium';
                    font-size: 30px;
                    color: #000000;
                }

                &:last-child{
                    font-size: 16px;
                    color: #999999;
                    margin-bottom: 17px;
                    margin-top: 3px;
                }
            }
        }
    }
    .tip_mask{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0,0,0,0.6);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .success_icon{
        font-size: 54px;
        line-height: 54px;
        color: #20b759;
    }
    .tip_content{
        width: 471px;
        min-height: 200px;
        background-color: #ffffff;
        padding: 18px 36px 30px;
        text-align: center;
    }
    .points_num{
        font-family: 'ACUMINPRO-BOLD';
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #222222;
        margin: 25px 0 30px;
    }
    .points_policy{
        font-family: 'SLATEPRO';
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 16px;
        letter-spacing: 0px;
        color: #222222;
        margin-bottom: 8px;
        display: none;
    }
    .points_icon{
        font-size: 12px !important;
        cursor: pointer;    
    }
    .points_content{
        font-family: 'SLATEPRO';
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #222222;
        margin-bottom: 20px;

        span{
            font-family: 'ACUMINPRO-BOLD';
        }
    }
    .points_btn{
        height: 44px;
        background-color: #222222;
        border-radius: 2px;
        line-height: 44px;
        color: #fff;
        font-family: 'ACUMINPRO-BOLD';
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        cursor: pointer;
        margin-bottom: 16px;
        text-transform: uppercase;

        &:last-child{
            margin: 0;
        }
    }
    .color_red{
        color:#e64545;
        font-family: 'ACUMINPRO-BOLD';
    }
</style>