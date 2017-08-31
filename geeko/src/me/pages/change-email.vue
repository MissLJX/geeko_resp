<template>
    <div class="el-email-body">
        <page-header>{{$t('label.changeEmail')}}</page-header>

        <div class="el-email-block" style="margin-top: 0">
            <div>
                <form>
                    <p>Your registered account:</p>
                    <p class="st-control el-email-control">
                        <input name="email" v-validate="'required|email'" v-model="account.email"
                               :class="{'st-input':true, 'st-input-danger':errors.has('email')}" type="text"/>
                        <span v-show="errors.has('email')" class="st-is-danger">{{errors.first('email')}}</span>
                    </p>

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


        <div class="el-email-block">
            <div>
                <p>Your contact / subscription address:</p>
                <form>
                    <div class="st-flex st-justify-b el-email-hor">
                        <div>
                            <p class="st-control el-email-control" style="margin-top: 0">
                                <input name="subEmail" v-validate="'required|email'" v-model="subEmail.email"
                                       :class="{'st-input':true, 'st-input-danger':errors.has('subEmail')}"
                                       type="text"/>
                                <span v-show="errors.has('subEmail')"
                                      class="st-is-danger">{{errors.first('subEmail')}}</span>
                            </p>
                        </div>
                        <div>
                            <btn class="fill el-email-save">Save</btn>
                        </div>
                    </div>
                </form>


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
        components: {
            'page-header': PageHeader,
            'btn': Btn
        }
    }
</script>