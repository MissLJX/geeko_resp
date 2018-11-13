<template>
    <div>
        <div class="m-hd">
            <div class="el-me-headerImage" :style="{'background-image': 'url('+headerImage+'),url('+baseHeaderUrl+')' }"></div>
            <div class="el-me-info">
                <p class="el-me-fullname">{{fullName}}</p>
                <p class="el-me-email">
                    {{me.email}}
                    <span class="verify" v-if="!me.isConfirmEmail" @click="confirmEmail">{{$t('verify')}}</span>
                    <span class="have-verify" v-if="me.isConfirmEmail"><i class="iconfont">&#xe73d;</i>{{$t('verified')}}</span>
                </p>
            </div>
        </div>
        <p class="mt-15">You have <span class="txr">{{me.points}}</span> credits {{this.GLOBAL.sitename}} Credits now, learn more about {{this.GLOBAL.sitename}} Bonus Credits program, <a :href="creditstUrl">Click Here.</a></p>
        <div class="referfriend">
            <h3>{{$t('refer')}}</h3>
            <div class="refer-con">
                <img src="https://dgzfssf1la12s.cloudfront.net/upgrade/20180920/gift.png">
                <p>
                    <span class="refer-info">SHARE UP TO 50% OFF , GET $15</span><br/>
                    <span class="refer-info-1">Share lucky draw with your friends who will get UP TO 50% OFF discount. And you'll get $15 when they make a purchase.</span>
                </p>
                <div class="bgline"></div>
                <div class="refer-method">
                    <div id="face-share">
                        <img src="https://dgzfssf1la12s.cloudfront.net/upgrade/20180920/Facebook.png"><br/><span>Facebook</span>
                    </div>
                    <div @click="showEmail">
                        <img src="https://dgzfssf1la12s.cloudfront.net/upgrade/20180920/email.png"><br/><span>{{$t('email')}}</span>
                    </div>
                    <div @click="showCopy">
                        <img src="https://dgzfssf1la12s.cloudfront.net/upgrade/20180920/copy.png"/><br/><span>Copy</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="term" @click="isshowTerm=true"><span style="text-transform: uppercase">{{$t('termandconditions')}}</span><i class="iconfont">&#xe73f;</i></div>
        <div class="mask" v-if="isShowCopy">
            <div class="confirm-con confirm-con-l">
                <h3>{{$t('invitationlink')}}</h3>
                <p class="cancel-btn" @click="isShowCopy=false"><i class="iconfont">&#xe69a;</i></p>
                <div><input type="text" :value="this.copy_link"/></div>
                <button class="n-btn tag-read" :data-clipboard-text="this.copy_link" @click="copy">{{$t('copylink')}}</button>
            </div>
        </div>

        <div class="mask" v-if="isShowEmail">
            <div class="confirm-con">
                <h3>{{$t('shareemail')}}</h3>
                <p class="cancel-btn" @click="isShowEmail=false"><i class="iconfont">&#xe69a;</i></p>
                <form @submit.prevent="sendEmailHandle" accept-charset="utf-8">
                    <div class="email_area">
                        <h4>{{$t('to')}}</h4>
                        <div v-for="item in inviteCount">
                            <label>{{$t('friendemail')}}:</label>
                            <input type="email" v-model="item.emailvalue"/>
                        </div>
                    </div>
                    <p v-if="maxCount" class="maxtip">*{{$t('linkcanbeshare')}}</p>
                    <div v-if="!maxCount" class="share-invite-button" @click="inviteMore">+{{$t('invitemore')}}</div>
                    <div class="subject">
                        <label>{{$t('subject')}}:</label>
                        <input type="text" v-model="subinfo"/>
                    </div>
                    <div class="note">
                        <label>{{$t('note')}}:</label>
                        <textarea v-model="noteinfo">{{noteinfo}}</textarea>
                    </div>

                    <button class="share-email-button">{{$t('send')}}</button>
                </form>
            </div>
        </div>

        <div class="mask mask-s" v-if="isshowTerm">
            <div class="confirm-con confirm-con-s ">
                <h3>{{$t('termandconditions')}}</h3>
                <p class="cancel-btn" @click="isshowTerm=false"><i class="iconfont">&#xe69a;</i></p>
                <p class="term-info">
                    *Up to 50% OFF is valid only for new customers
                </p>
                <p class="term-info">
                    If customers want to use the discount of up to  50% off, the referred person must (i) be a new customer, (ii) use a referral link to obtain the discount and (iii) make a purchase on  https://www.{{this.GLOBAL.sitename}}.com specified in the referral offer prior to the discount's expiration. Referring customers will also receive a $15 coupon in their  https://www.{{this.GLOBAL.sitename}}.com account after the referred person pay for the order.  And $15 coupon can be used when the order amount is more than $59. Custom-ers may not refer anyone who has an existing  https://www.{{this.GLOBAL.sitename}}.com account under an alternate email address. The discount is only valid for one month and the referred person can only use the discount once.
                </p>
                <p class="term-info">
                Any abuse of this offer, as determined by us in our sole discretion, may result in the rescission of the refer-ring customer's referral discount and the referred person's discount as well as both parties' inability to partici-pate in this or future promotions. Discount cannot be applied to previous purchases, and is not redeemable for cash. This referral program is subject to modification or termination at any time without notice in our sole discretion.
                </p>
            </div>
        </div>

        <div class="mask" v-if="isShowConfirm">
            <div class="confirm-con confirm-con-l">
                <p class="cancel-btn" @click="isShowConfirm=false"><i class="iconfont">&#xe69a;</i></p>
                <p><i class="iconfont">&#xe73c;</i>{{$t('checkmailbox')}}</p>
                <button class="n-btn tag-read" @click="isShowConfirm=false">{{$t('okay')}}</button>
            </div>
        </div>

        <loding v-if="isloding"></loding>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import * as utils from '../utils/geekoutil';
    import Clipboard from 'clipboard';
    import loding from './loding.vue';

    export default {
        data(){
            return{
                isloding:false,
                isshowTerm:false,
                isShowCopy:false,
                isShowEmail:false,
                isShowConfirm:false,
                inviteCount:[{'emailvalue':''},{'emailvalue':''}],
                count:3,
                maxCount:false,
                subinfo:'Sending you up to 50% OFF',
                noteinfo:'This site has so many must-haves. Check out their new arrivals and get up to 50% OFF for your first order!! You’re welcome'
            }
        },
        components: {
            'loding':loding
        },
        computed:{
            ...mapGetters(['me','sharekey','copylink']),
            baseHeaderUrl() {
                return 'https://dgzfssf1la12s.cloudfront.net/site/pc/icon35.png';
            },
            headerImage(){
                if(this.me.id){
                    return utils.imageutil.getHeaderImg(this.me.id)
                }
            },
            fullName() {
                if(this.me.name){
                    return this.me.name.firstName + ' ' + this.me.name.lastName;
                }
            },
            facebook_key(){
                return '/i/share/register?key='+this.sharekey
            },
            copy_link(){
                return window.site + '/i/share/register?key='+this.copylink
            },
            creditstUrl(){
                return utils.ROUTER_PATH_ME + '/m/credits'
            }
        },
        mounted(){
        },
        methods:{
            showCopy(){
                this.isShowCopy = true;
            },
            copy(){
                let clipboard = new Clipboard('.tag-read');
                clipboard.on('success', e => {
                    alert('Content copied!')
                })
            },
            showEmail(){
                this.isShowEmail = true;
            },
            inviteMore(){
                if(this.count>10){
                    this.maxCount = true;
                }else{
                    this.inviteCount.push({'emailvalue':''});
                    this.count +=1
                }
            },
            sendEmailHandle(){

                let emails ='';
                _.each(this.inviteCount, (email) => {
                    if(email.emailvalue){
                        emails = email.emailvalue +','
                    }
                });

                if(emails!==''){
                    let shareInfo={'emails':emails.slice(0,-1),'subject':this.subinfo,'content':this.noteinfo}
                    this.$store.dispatch('sendShareEmail', shareInfo).then(() => {
                        alert("success");
                        this.isShowEmail = false;
                    })
                }else{
                    isAlert("Please enter at least one email address");
                }
            },
            confirmEmail(){
                this.isloding = true;
                this.$store.dispatch('confirmEmail', this.me.email).then(() => {
                    this.isloding = false;
                    this.isShowConfirm = true;
                }).catch((data) => {
                    this.isloding = false;
                    alert(data.result)
                })
            }
        },
        created(){
            this.$store.dispatch('getMe')
            this.$store.dispatch('getShareKey','facebook')
            this.$store.dispatch('getShareKey','copy')


        }
    }

</script>

<style scoped lang="scss">
    .mt-15{
        margin-top: 15px;
    }
    .txr{
        color: #E64545;
    }
    a{
        text-decoration: underline;
        color: #666666;
        cursor: pointer;
    }
    .referfriend{
        margin-top: 65px;
        .refer-con{
            width: 100%;
            height: 131px;
            margin-top: 8px;
            background-color: #ffffff;
            border: solid 1px #fedddd;
            padding: 17px 22px 27px 22px;
            img{
                width: 81px;
                height: 81px;
            }
            p{
                display: inline-block;
                position: relative;
                line-height: 20px;
                left: 10px;
                width: 515px;
                overflow-wrap: break-word;
                .refer-info{
                    color: #e64545;
                    font-size: 30px;
                    font-weight: bold;
                }
                .refer-info-1{
                    font-size: 14px;
                    color: #222222;
                    line-height: 20px;
                    display: inline-block;
                    margin-top: 10px;
                }
            }
            .bgline{
                display: inline-block;
                width: 2px;
                height: 47px;
                background-color:#e6e6e6;
                margin-left: 25px;
                position: relative;
                top: -5px;
            }
            .refer-method{
                display: inline-block;
                position: relative;
                top: -3px;
                a{
                    text-decoration: none;
                }
                & > div{
                    float: left;
                    text-align: center;
                    padding: 0 14px;
                    cursor: pointer;
                    img{
                        width: 32px;
                        height: 32px;
                    }
                }
                &:after{
                    display: block;
                    content: '';
                    clear: both;
                }
            }
        }
    }
    .term{
        text-align: right;
        color: #999;
        font-size: 12px;
        margin-top: 15px;
        cursor: pointer;
        span{
            text-decoration: underline;
            margin-right: 6px;
        }
    }
    .m-hd{
        padding-bottom: 16px;
        border-bottom: 1px solid #e6e6e6;
        .el-me-headerImage {
            width: 70px;
            height: 70px;
            background: no-repeat center/cover;
            border-radius: 50%;
            float: left;
        }
        .el-me-info{
            float: left;
            height: 70px;
            line-height: 22px;
            padding-top: 14px;
            padding-left: 16px;
            .el-me-fullname{
                font-size: 16px;
                color: #222;
            }
            .el-me-email{
                font-size: 14px;
                color: #666;
                span{
                    margin-left: 10px;
                }
                .verify{
                    color: #E64545;
                    text-decoration: underline;
                    cursor: pointer;
                }
                .have-verify{
                    color: #57b936;
                    font-size: 14px;
                }
            }
        }
        &:after{
            display: block;
            clear: both;
            content: '';
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
        overflow-y: auto;
        z-index: 999;
        .confirm-con-s{
            width: 484px !important;
            top: calc(50% - 245px);
        }
        .confirm-con-l{
            top: calc(50% - 150px);
            padding-bottom: 90px !important;
            p{
                i{
                    color: #57b936;
                    font-size: 32px;
                    position: relative;
                    top: 6px;
                    right: 10px;
                }
            }
            button{
                outline: none;
            }
        }
        .confirm-con{
            width: 642px;
            margin:40px auto;
            position: relative;
            background-color: white;
            color: #222;
            font-size: 14px;
            padding: 35px 50px;
            text-align: left;
            .term-info{
                color: #666;
                font-size: 12px;
                margin-bottom: 10px;
            }
            .share-invite-button{
                width: 240px;
                line-height: 40px;
                border: 1px solid #cacaca;
                color: #222;
                margin-top: 15px;
                text-transform: uppercase;
                text-align: center;
                cursor: pointer;
            }
            .maxtip{
                color: #E64545;
                font-size: 12px;
                margin-top: 10px;
            }
            .email_area{
                label{
                    display: block;
                    color: #666;
                    margin-bottom: 4px;
                    margin-top: 10px;
                }
            }
            .subject{

                label{
                    display: block;
                    margin-bottom: 4px;
                    margin-top: 20px;
                    font-weight: bold;
                }
            }
            .note{
                label{
                    display: block;
                    margin-bottom: 4px;
                    margin-top: 10px;
                    font-weight: bold;
                }
                textarea{
                    height: 102px;
                    border-radius: 2px;
                    border: solid 1px #cacaca;
                    width: 100%;
                    padding: 10px;
                    color: #4b5056;
                    resize: none;
                }
            }
            .share-email-button{
                outline: none;
                width: 240px;
                height: 40px;
                background-color: #222;
                border-radius: 2px;
                line-height: 40px;
                text-align: center;
                color: #fff;
                text-transform: uppercase;
                font-size: 16px;
                margin-top: 20px;
                border: none;
                outline: none;
                box-shadow:none;
                -webkit-appearance: none;
                cursor: pointer;
            }
            input
            {
                width: 514px;
                line-height: 38px;
                border: 1px solid #cacaca;
                padding-left: 10px;
                color: #4b5056;
            }
            h3{
                margin-bottom: 20px;
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
                border: none;
            }
        }
    }

</style>