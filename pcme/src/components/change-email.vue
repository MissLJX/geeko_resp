<template>
    <div>
        <div class="p-hd">
            <div class="p-l">
                <strong>{{$t('regsiteremail')}}</strong>
            </div>
            <div class="p-l line">|</div>
            <div class="p-l tips">
                1.Email verification is required to make this change,Please enter your new email address and check your inbox for the confirmation link.<br/><br/>
                2.Confirm email address and <span>get 100 credits</span>.
            </div>
        </div>
        <div class="p-bd">
            <form @submit.prevent="changeAcountHandle">
                <div class="curr-email">
                    <strong>{{$t('curremail')}}</strong>
                    <input type="text" :value="me.email" disabled class="i-disabled">
                </div>
                <div class="new-email">
                    <strong>{{$t('newemail')}}</strong>
                    <input name="email" v-validate="'required|email'" v-model="account.email"
                           :class="{'st-input':true, 'st-input-danger':errors.has('email')}" type="text"
                           :placeholder="$t('newemail')"/>
                    <span v-show="errors.has('email')" class="st-is-danger">{{errors.first('email')}}</span>
                </div>
                <button class="v-btn">{{$t('send')}}</button>
            </form>
        </div>
        <div class="bgline"></div>
        <div class="p-hd">
            <div class="p-l">
                <strong>{{$t('contactemail')}}</strong>
            </div>
            <div class="p-l line">|</div>
            <div class="p-l tips">
                Here, you can set and change your contact email address, it's convenient for us to send a message to your contact.Email will not be publicly displayed.
            </div>
        </div>
        <div class="p-bd">
            <div class="contact-email">
                <strong>{{$t('contactemail')}}</strong>
                <input name="communicationEmail" v-validate="'required|email'" v-model="subEmail.email"
                       :class="{'st-input':true, 'st-input-danger':errors.has('communicationEmail')}"
                       type="text"/>
                <span v-show="errors.has('communicationEmail')"
                      class="st-is-danger">{{errors.first('communicationEmail')}}</span>
            </div>
            <div class="v-btn" @click="changeEmailHandle">{{$t('submit')}}</div>
        </div>

        <div class="mask" v-if="isAlert">
            <div class="confirm-con">
                <p class="cancel-btn" @click="isAlert=false"><i class="iconfont">&#xe69a;</i></p>
                <p><i class="iconfont">&#xe73c;</i>Please check your current email address inbox for an activation link.</p>
                <div class="n-btn" @click="isAlert=false">{{$t('okay')}}</div>
            </div>
        </div>

        <loding v-if="isLoading"></loding>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import Loding from "./loding.vue";

    export default{
        components: {Loding},
        data(){
            return {
                account: {
                    email: null,
                },
                subEmail: {
                    email: null
                },
                isAlert:false,
                isLoading:false
            }
        },
        computed:{
        ...mapGetters([
                'me',
            ])
        },
        methods: {
            changeAcountHandle(){
                this.$validator.validateAll({
                    email: this.account.email,
                }).then((result) => {
                    if (result) {
                        this.isLoading = true;
                        this.$store.dispatch('confirmEmail', this.account.email).then(() => {
                            this.isAlert = true;
                            this.isLoading = false;
                        }).catch((data) => {
                            alert(data.result);
                            this.isLoading = false;
                        })
                    }
                });
            },
            changeEmailHandle(){
                this.isLoading = true;
                this.$validator.validate('communicationEmail', this.subEmail.email).then((result) => {
                    alert(this.$t('success'))
                    this.isLoading = false;
                    this.$store.dispatch('changeEmail', this.subEmail)
                }).catch((data) => {
                    this.isLoading = false;
                    alert(data.result)
                })
            }
        },
        created(){
            this.$store.dispatch('getMe').then(() => {
                this.subEmail.email = this.$store.getters['me'].communicationEmail
            })
        }
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
    button{
        outline: none;
    }
    .i-disabled{
        background-color: #ffffff;
        color: #999;
        cursor: not-allowed;
    }
    .bgline{
        width: 100%;
        height: 1px;
        background-color: #e6e6e6;
        margin: 30px 0;
    }
    .p-hd{
        color: #666;
        strong{
            color: #222;
            font-size: 16px;
        }
        .p-l{
            float: left;
        }
        .line{
            margin: 0 13px;
        }
        .tips{
            width: 738px;
            span{
                color: #E64545;
            }
        }
        &:after{
            display: block;
            content: '';
            clear: both;
        }
    }
    .p-bd{
        text-align: left;
        margin-left: 180px;
        padding-top: 40px;
        margin-bottom: 12px;
        strong{
            display: block;
            font-size: 16px;
            color: #222;
            padding: 20px 0 15px 0;
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
                color: #E64545;
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
            font-family: HelveticaNeue;
            margin-top: 30px;
            cursor: pointer;
        }
        button{
            border: none;
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
            height: 175px;
            margin:0 auto;
            position: relative;
            top: calc(50% - 82px);
            background-color: white;
            color: #222;
            font-size: 14px;
            padding: 40px 65px 55px 65px;
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
                    color: #666;
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
            p{
                i{
                    color: #57b936;
                    font-size: 32px;
                    position: relative;
                    top: 6px;
                    right: 10px;
                }
            }
        }
    }
</style>