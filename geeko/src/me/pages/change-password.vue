<template>
    <div class="el-change-pass-body">
        <nav-bar>
            <i class="iconfont el-back-font" slot="left" @click="$router.go(-1)">&#xe693;</i>
            <span slot="center">{{$t('label.changePassword')}}</span>
        </nav-bar>

        <div class="el-change-body">
            <form ref="changeDom">
                <div class="el-change-block">
                    <label class="el-change-label">Current Password</label>
                    <p class="st-control el-change-control">
                        <input name="oldPassword" v-model="info.oldPassword" v-validate="'required'"
                               :class="{'st-input':true, 'st-input-danger':errors.has('oldPassword')}" type="text"/>
                        <span v-show="errors.has('oldPassword')" class="st-is-danger">{{errors.first('oldPassword')}}</span>
                    </p>
                </div>

                <div class="el-change-block">
                    <label class="el-change-label">New Password</label>
                    <p class="st-control el-change-control">
                        <input name="password" v-model="info.newPassword" v-validate="{ required: true, min: 6, max:20 }"
                               :class="{'st-input':true, 'st-input-danger':errors.has('password')}" type="text"/>
                        <span v-show="errors.has('password')" class="st-is-danger">{{errors.first('password')}}</span>
                    </p>
                </div>


                <div class="el-change-block">
                    <label class="el-change-label">Confirm</label>
                    <p class="st-control el-change-control">
                        <input name="confirmPassword"  v-validate="'required'" v-model="info.confirmPassword"
                               :class="{'st-input':true, 'st-input-danger':!confirmed || errors.has('confirmPassword')}" type="text"/>
                        <span v-show="errors.has('confirmPassword')" class="st-is-danger">{{errors.first('confirmPassword')}}</span>
                        <span v-show="!confirmed" class="st-is-danger">Confirm Password must equals to the new password. </span>
                    </p>
                </div>
            </form>
        </div>

        <div class="sett-name-footer">
            <div class="change-password-save"  @click="changePasswordHandle">Save</div>
        </div>
    </div>
</template>

<style scoped lang="scss">

    .el-change-body{
        padding: 15px 10px;

        .el-change-block{
            margin-top: 15px;
            &:first-child{
                margin-top: 0;
            }
        }
    }

    .el-change-control{
        input{
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
        margin-top: 5px;
    }

    .el-change-pass-body{
        background-color: #fff;

        .sett-name-footer{
            width: 100%;
            position: fixed;
            bottom: 51px;
            left: 0px;
            right: 0px;
            text-align: center;
            padding: 0px 13px 20px 13px;

            .change-password-save{
                height: 42px;
                line-height: 42px;
                background-color: #222222;
                font-family: SlatePro-Medium;
                font-size: 17px;
                color: #ffffff;
            }
        }
    }
</style>

<script type="text/ecmascript-6">
    import NavBar from '../components/nav-bar.vue'

    export default{
        data(){
            return {
                info:{
                    oldPassword:null,
                    newPassword:null,
                    confirmPassword: null
                },
                confirmed: true,
                isLoadingShow:false
            }
        },
        methods:{
            changePasswordHandle(){
                this.$validator.validateAll().then((result) => {
                    this.confirmed = this.info.confirmPassword === this.info.newPassword;
                    if (result && this.confirmed) {
                        if(this.info.oldPassword === this.info.newPassword){
                            alert("The old and new passwords cannot be the same.");
                            return;
                        }
                        this.$store.dispatch('me/changePassword', this.info).then(() => {
                            alert("Success");
                            this.$router.go(-1)
                        }).catch(e => {
                            alert(e.result)
                        })
                        return;
                    }
                });
            }

        },
        components: {
            NavBar
        }
    }
</script>