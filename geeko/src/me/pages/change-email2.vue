<template>
    <div class="el-email-body">
        <nav-bar>
            <i class="iconfont el-back-font" slot="left" @click="$router.go(-1)">&#xe693;</i>
            <span slot="center">{{$t('label.changeEmail')}}</span>
        </nav-bar>

        <div class="el-email-block" style="margin-top: 0">
            <div>
                <form @submit.prevent="changeAcountHandle">
                    <p class="_title">Your new account:</p>
                    <p class="st-control el-email-control">
                        <input name="email" v-validate="'required|email'" v-model="account.email"
                               :class="{'st-input':true, 'st-input-danger':errors.has('email')}" type="text"/>
                        <span v-show="errors.has('email')" class="st-is-danger">{{errors.first('email')}}</span>
                    </p>


                    <p class="_title">password</p>
                    <p class="st-control el-email-control">
                        <input name="password" v-validate="'required'" v-model="account.password"
                               :class="{'st-input':true, 'st-input-danger':errors.has('password')}" type="password"/>
                        <span v-show="errors.has('password')" class="st-is-danger">{{errors.first('password')}}</span>
                    </p>

                    <div class="el-email-send-container">
                        <btn type="submit" class="fill el-email-send">Send a confirm email</btn>
                    </div>
                </form>
            </div>
            <div></div>
        </div>


        <div class="el-email-block chan-email-padding">
            <div>
                <p class="__font">Your contact / subscription address:</p>
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
                        <btn class="fill el-email-save" @click.native="changeEmailHandle">Save</btn>
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
                this.$validator.validateAll({
                    email: this.account.email,
                    password: this.account.password
                }).then((result) => {
                    if (result) {
                        this.$store.dispatch('me/changeAccountEmail', this.account).then(() => {
                            alert('Successed!')
                        }).catch((data) => {
                            alert(data.result)
                        })
                    }
                });
            },
            changeEmailHandle(){
                this.$validator.validate('communicationEmail', this.subEmail.email).then((result) => {
                    this.$store.dispatch('me/changeEmail', this.subEmail)
                })
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