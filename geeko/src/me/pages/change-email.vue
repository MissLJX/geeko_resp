<template>
    <div class="el-email-body">
        <page-header>{{$t('label.changeEmail')}}</page-header>

        <div class="el-email-block" style="margin-top: 0">
            <div>
                <form @submit.prevent="changeAcountHandle">
                    <p>Your new account:</p>
                    <p class="st-control el-email-control">
                        <input name="email" v-validate="'required|email'" v-model="account.email"
                               :class="{'st-input':true, 'st-input-danger':errors.has('email')}" type="text"
                               placeholder="Account"/>
                        <span v-show="errors.has('email')" class="st-is-danger">{{errors.first('email')}}</span>
                    </p>

                    <p class="st-control el-email-control">
                        <input name="password" v-validate="'required'" v-model="account.password"
                               :class="{'st-input':true, 'st-input-danger':errors.has('password')}" type="password"
                               placeholder="Password"/>
                        <span v-show="errors.has('password')" class="st-is-danger">{{errors.first('password')}}</span>
                    </p>

                    <div class="el-email-send-container">
                        <btn type="submit" class="fill el-email-send">Send a confirm email</btn>
                    </div>
                </form>
            </div>
            <div></div>
        </div>


        <div class="el-email-block">
            <div>
                <p>Your contact / subscription address:</p>
                <div class="st-flex st-justify-b el-email-hor">
                    <div>
                        <p class="st-control el-email-control" style="margin-top: 0">
                            <input name="communicationEmail" v-validate="'required|email'" v-model="subEmail.email"
                                   :class="{'st-input':true, 'st-input-danger':errors.has('communicationEmail')}"
                                   type="text"/>
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
        background-color: #efefef;
    }

    .el-email-block {
        background-color: #fff;
        padding: 15px 10px;
        margin-top: 10px;
    }

    .el-email-control {
        input {
            height: 30px;
            width: 100%;
            background-color: #eee;
            padding-left: 10px;
        }
        margin-top: 15px;
    }

    .el-email-send {
        width: 200px;
        height: 30px;
        padding: 0 !important;
        line-height: 28px;
        font-size: 15px;
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
        height: 30px;
        padding: 0 !important;
        line-height: 28px;
        font-size: 15px;
    }
</style>

<script type="text/ecmascript-6">

    import PageHeader from '../components/page-header.vue'
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
            'page-header': PageHeader,
            'btn': Btn
        },
        created(){
            this.subEmail.email = this.$store.getters['me/me'].communicationEmail
        }
    }
</script>