<template>
    <div class="el-email-body">
        <nav-bar>
            <i class="iconfont el-back-font" slot="left" @click="$router.go(-1)">&#xe693;</i>
            <span slot="center">{{$t('label.changeEmail')}}</span>
        </nav-bar>

        <div class="el-email-block" style="margin-top: 0"> 
            <div>
                <form @submit.prevent="changeAcountHandle">
                    <p class="_title">{{$t('label.your_new_account')}}:</p>
                    <p class="st-control el-email-control">
                        <input name="email" v-model="account.email" type="text"/>
                    </p>

                    <p class="_title">{{$t('label.password')}}</p>
                    <p class="st-control el-email-control">
                        <input name="password" v-model="account.password" type="password"/>
                    </p>

                    <div class="el-email-send-container">
                        <btn type="submit" class="fill el-email-send">{{$t('label.send_confirm_email')}}</btn>
                    </div>
                </form>
            </div>
            <div></div>
        </div>


        <div class="el-email-block chan-email-padding">
            <div>
                <p class="__font">{{$t('label.your_address')}}:</p>
                <div class="st-flex st-justify-b el-email-hor">
                    <div>
                        <p class="st-control el-email-control" style="margin-top: 0">
                            <input name="communicationEmail" v-validate="'required|email'" v-model="subEmail.email"
                                   :class="{'st-input':true, 'st-input-danger':errors.has('communicationEmail')}"
                                   type="text" class="specific-input"/>
                            <span v-show="errors.has('communicationEmail')"
                                  class="st-is-danger">{{errors.first('communicationEmail')}}</span>
                        </p>
                    </div>
                    <div>
                        <btn class="fill el-email-save" @click.native="changeEmailHandle">{{$t('label.save')}}</btn>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

    .el-email-body {
        // background-color: #efefef;

        .chan-email-padding{
            border-top: 8px solid #f7f7f7;
            padding-top: 20px;

            .__font{
                font-family: SlatePro;
                font-size: 16px;
                color: #222222;
            }
        }
    }

    .el-email-block {
        background-color: #fff;
        padding: 0px 10px 15px;
        margin-top: 10px;

        ._title{
            font-family: SlatePro;
	        font-size: 16px;
            color: #666666;
            margin-top: 15px;
        }
    }

    .el-email-control {
        input {
            width: 100%;
            border: none;
            border-bottom: 1px solid #e6e6e6;
            outline: none;
            box-shadow: none;
            font-family: SlatePro;
            color: #222222;
            font-size: 16px;
            padding: 8px 5px 5px 0px;
        }
        
        .specific-input{
            height: 42px;
            border-radius: 2px;
            border: solid 1px #cccccc;
            padding: 0px 0px 0px 10px;
        }
    }

    .el-email-send {
        width: 100%;
        height: 42px;
        padding: 0 !important;
        line-height: 42px;
        font-family: SlatePro-Medium;
	    font-size: 16px;
    }

    .el-email-send-container {
        text-align: center;
        margin-top: 20px;
    }

    .el-email-hor {
        margin-top: 5px;
        & > div {
            &:first-child {
                width: calc(100% - 80px);
            }
        }
    }

    .el-email-save {
        width: 70px;
        height: 42px;
        padding: 0 !important;
        line-height: 28px;
        font-size: 15px;
    }
</style>

<script type="text/ecmascript-6">

    import NavBar from '../components/nav-bar.vue'
    import Btn from '../../components/btn.vue'

    export default{
        data(){
            return {
                account: {
                    email: null,
                    password: null
                },
                subEmail: {
                    email: null
                }
            }
        },
        methods: {
            changeAcountHandle(){
                if(!this.account.email){
                    // 邮箱为空
                    this.modalShow("The email address cannot be empty, please enter the valid email address.","");
                    return;
                }else if(!this.validataEmail(this.account.email)){
                    // 邮箱格式错误
                    this.modalShow("The email address is not available, please enter the valid email address.","",() => {
                        this.account.email = null;
                    });
                    return;
                }

                if(!this.account.password){
                    // 密码为空
                    this.modalShow(
                        "The password cannot be empty, please enter the password for this account.",
                        "Temporarily do not support other accounts (Google, Facebook, Apple, etc.) to change email."
                    );
                    return;
                }


                this.$store.dispatch("globalLoadingShow",true);
                this.$store.dispatch('me/changeAccountEmail', this.account).then((data) => {
                    // 发送邮件成功
                    this.modalShow("A verification link has been sent to your email address, please check your mailbox.","",() => {
                        this.account.email = null;
                        this.account.password = null;
                    });
                    this.$store.dispatch("globalLoadingShow",false);
                }).catch((data) => {
                    let code = data.code;
                    this.errorValidataMessage(code,data.result);
                    
                })
            },
            changeEmailHandle(){
                let _this = this;
                this.$store.dispatch("globalLoadingShow",true);
                this.$validator.validate('communicationEmail', this.subEmail.email).then((result) => {
                    _this.$store.dispatch('me/changeEmail', this.subEmail).then(() => {
                        _this.$store.dispatch("globalLoadingShow",false);
                        _this.modalShow("Success! We will send our latest newsletter to your new email address.","");
                    });
                })
            },
            validataEmail(email){
                let rule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
                return rule.test(email);
            },
            modalShow(message,message2,callback){
                let _this = this;
                _this.$store.dispatch('confirmShow', {
                    show: true,
                    cfg: {
                        btnFont:{
                            yes:"OK",
                        },
                        message: message,
                        message2:message2,
                        yes: function () {
                            _this.$store.dispatch('closeConfirm').then(() => {
                                if(callback) callback();
                            });
                        },
                        no: function () {
                        }
                    }
                })
            },
            errorValidataMessage(code,errorMessage){
                let message = "";
                let name = "";
                let message2 = "";
                if(code === 401){
                    // 邮箱已经被注册的错误提示  401
                    message = "This email address is already registered, please change to another valid email address.";
                    name = "email";
                }else if(code === 402){
                    // 密码错误的错误提示              402
                    message = "Password is incorrect, please enter a valid password for this account.";
                    message2 = "Temporarily do not support other accounts (Google, Facebook, Apple, etc.) to change email.";
                    name = "password";
                }else{
                    message = errorMessage;
                }
                this.modalShow(message,message2,() => {
                    if(name) this.account[name] = null;
                });
                this.$store.dispatch("globalLoadingShow",false);
            }
        },
        components: {
            'btn': Btn,
            NavBar
        },
        created(){
            this.subEmail.email = this.$store.getters['me/me'].communicationEmail
        }
    }
</script>