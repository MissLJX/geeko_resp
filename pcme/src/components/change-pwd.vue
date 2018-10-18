<template>
    <div>
        <div class="p-hd">
            <strong>{{$t('changepwd')}}</strong> &nbsp;| &nbsp; if you want to change your password,you can edit it here.
        </div>
        <div class="p-bd">
            <div class="curr-pwd">
                <strong>{{$t('currpwd')}}</strong>
                <input name="oldPassword" v-model="info.oldPassword" v-validate="'required'"
                       :class="{'st-input-danger':errors.has('oldPassword')}" type="text"/>
                <span v-show="errors.has('oldPassword')" class="st-is-danger">{{errors.first('oldPassword')}}</span>
                <a @click="forgetpwd">{{$t('forgetyourpwd')}}?</a>
            </div>
            <div class="new-pwd">
                <strong>{{$t('newpwd')}}</strong>
                <input name="password" v-model="info.newPassword" v-validate="{ required: true, min: 6, max:20 }"
                       :class="{'st-input-danger':errors.has('password')}" type="text"/>
                <span v-show="errors.has('password')" class="st-is-danger">{{errors.first('password')}}</span>
                <p><span>*</span>{{$t('newpwdatleast')}}</p>
            </div>
            <div class="confirm-pwd">
                <strong>Confirm Password</strong>
                <input name="confirmPassword"  v-validate="'required'" v-model="info.confirmPassword"
                       :class="{'st-input-danger':!confirmed || errors.has('confirmPassword')}" type="text"/>
                <span v-show="errors.has('confirmPassword')" class="st-is-danger">{{errors.first('confirmPassword')}}</span>
                <span v-show="!confirmed" class="st-is-danger">{{$t('mustequals')}}</span>
            </div>
            <div class="v-btn" @click="changePasswordHandle">{{$t('submit')}}</div>
        </div>

        <div class="mask" v-if="isAlert">
            <div class="confirm-con">
                <h3>{{$t('forgetpwd')}}</h3>
                <p class="cancel-btn" @click="isAlert=false"><i class="iconfont">&#xe69a;</i></p>
                <p>{{tipmsg}}</p>
                <div class="n-btn" @click="isAlert=false">{{$t('okay')}}</div>
            </div>
        </div>
        <loding v-if="isloding"></loding>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import loding from './loding.vue'

    export default {
        data(){
            return{
                info:{
                    oldPassword:null,
                    newPassword:null,
                    confirmPassword: null
                },
                confirmed: true,
                isAlert:false,
                tipmsg:'',
                isloding:false
            }
        },
        components: {
            'loding':loding
        },
        methods:{
            forgetpwd(){
                this.isloding = true
                this.$store.dispatch("forgetPwd").then((data)=>{
                    this.isloding = false
                    this.tipmsg = data
                    this.isAlert = true;
                });
            },
            changePasswordHandle(){
                this.$validator.validateAll().then((result) => {
                    this.confirmed = this.info.confirmPassword === this.info.newPassword
                    if (result && this.confirmed) {
                        this.isloding = true
                        this.$store.dispatch('changePassword', this.info).then(() => {
                            this.isloding = false
                            alert('Success!')
                        }).catch(e => {
                            this.isloding = false
                            alert(e.result)
                        })
                        return;
                    }
                });
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
    .p-hd{
        color: #666;
        strong{
            color: #222;
            font-size: 16px;
        }
    }
    .p-bd{
        text-align: left;
        margin-left: 180px;
        padding-top: 62px;
        strong{
            display: block;
            font-size: 16px;
            color: #222;
            margin-bottom: 16px;
        }
        input{
            width: 520px;
            height: 40px;
            margin-bottom: 8px;
            padding-left: 10px;
            border: 1px solid #cacaca;
        }
        .st-input-danger{
            border-color: red;
        }
        .st-is-danger{
            color: red;
        }
        span{
            display: block;
        }
        a{
            display: block;
            font-size: 14px;
            color: #666;
            margin-bottom: 45px;
            text-decoration: underline;
            cursor: pointer;
        }
        p{
            font-size: 14px;
            color: #666;
            margin-bottom: 45px;
            span{
                color: #e5004f;
                display: inline-block;
            }
        }
        .v-btn{
            width: 240px;
            height: 40px;
            line-height: 40px;
            background-color: #222222;
            border-radius: 2px;
            color: #fff;
            font-size: 16px;
            text-align: center;
            font-family: HelveticaNeue-Medium;
            margin-top: 30px;
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
                background-color: #e5004f;
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