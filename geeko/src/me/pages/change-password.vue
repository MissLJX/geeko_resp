<template>
    <div>
        <page-header>
            <span>{{$t('label.changePassword')}}</span>
            <span slot="oplabel" @click="changePasswordHandle">{{$t('label.save')}}</span>
        </page-header>

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
                        <input name="newPassword" v-model="info.newPassword" v-validate="'required'"
                               :class="{'st-input':true, 'st-input-danger':errors.has('newPassword')}" type="text"/>
                        <span v-show="errors.has('newPassword')" class="st-is-danger">{{errors.first('newPassword')}}</span>
                    </p>
                </div>


                <div class="el-change-block">
                    <label class="el-change-label">Confirm</label>
                    <p class="st-control el-change-control">
                        <input name="confirmPassword"  v-validate="'required'" v-model="info.confirmPassword"
                               :class="{'st-input':true, 'st-input-danger':!confirmed || errors.has('confirmPassword')}" type="text"/>
                        <span v-show="errors.has('confirmPassword')" class="st-is-danger">{{errors.first('confirmPassword')}}</span>
                        <span v-show="!confirmed" class="st-is-danger">请确认您的密码.</span>
                    </p>
                </div>
            </form>
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
            height: 30px;
            width: 100%;
            background-color: #eee;
        }
        margin-top: 5px;
    }
</style>

<script type="text/ecmascript-6">

    import PageHeader from '../components/page-header.vue'

    export default{
        data(){
            return {
                info:{
                    oldPassword:null,
                    newPassword:null,
                    confirmPassword: null
                },
                confirmed: true
            }
        },
        methods:{
            changePasswordHandle(){
                this.$validator.validateAll().then((result) => {
                    this.confirmed = this.info.confirmPassword === this.info.newPassword
                    if (result && this.confirmed) {
                        alert('From Submitted!')
                        return;
                    }
                    alert('Correct them errors!')
                });
            }

        },
        components: {
            'page-header': PageHeader
        }
    }
</script>