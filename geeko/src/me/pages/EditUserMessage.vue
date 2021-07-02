<template>
    <div class="edit-user-message">
        <nav-bar>
            <i class="iconfont el-back-font" slot="left" @click="$router.go(-1)">&#xe693;</i>
            <span slot="center">Edit Profile</span>
        </nav-bar>

        <div class="edit-container">
            <div class="edit-file">
                <div class="edit-image">
                    <div class="_header-icon" :style="{'background-image':'url('+headerImage+'),url('+baseHeaderUrl+')'}">
                        <span class="_bg">
                            <span class="iconfont _icon">&#xe621;</span>
                        </span>
                    </div>
                </div>
                <form ref="file"><input name="imageFile" class="el-birth-input" type="file" @change="headerImageHandle"/></form>
            </div>

            <div class="sett-name-flex">
                <animation-input
                    :inputValue.sync="info.name.firstName"
                    label="l-vue-first-name"
                    title="First Name"
                ></animation-input>

                <animation-input
                    :inputValue.sync="info.name.lastName"
                    :label="'l-vue-last-name'"
                    :title="'Last name'"
                ></animation-input>
            </div>

            <div class="reg-birthday">
                <div style="position: relative;">
                    <div class="reg-birthday-flex">
                        <div class="_item">
                            <div style="margin-right: 5px;">{{" change " + $t('label.birthday')}}</div>
                            <div class="birth">
                                <span class="problem" @click="showMask">?</span>
                            </div>
                        </div>

                        <div class="_saveValue">
                            {{birth}}
                        </div>
                        
                        <div>
                            <div class="iconfont birth">&#xe694;</div>
                        </div>
                    </div>
                    <input type="date" id="reg-birthday-input" v-model="info.birthday">
                </div>
                
            </div>

            <div class="sett-change-password">
                <router-link :to="{name:'change-password'}">
                    <div class="st-table change-password">
                        <div class="st-cell st-v-m">
                            <span class="_title">Change password</span>
                        </div>
                        <div class="st-cell st-v-m">
                            <span class="iconfont _icon">&#xe694;</span>
                        </div>
                    </div>
                </router-link>
            </div>

            <div class="sett-change-password">
                <router-link :to="{name:'change-email'}">
                    <div class="st-table change-password">
                        <div class="st-cell st-v-m">
                            <span class="_title">Change email</span>
                        </div>
                        <div class="st-cell st-v-m">
                            <span class="iconfont _icon">&#xe694;</span>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>

        <div class="sett-name-footer">
            <div class="change-password-save"  @click="infoSaveHandle">Save</div>
        </div>

        <div id="settings-interact-container" v-show="isMaskShow">
            <div class="setting-interact-content">
                <div>
                    <span class="iconfont" @click="closeMask" style="cursor: pointer;">&#xe69a;</span>
                </div>
                <div>
                    Please make sure your date-of-birth is accurate to receive a coupon on your birthday!
                </div>
            </div>

            <div id="settings-interact-mask"></div>
        </div>

        <loading v-if="isLoadingShow"></loading>
            
    </div>
</template>

<script>
    import NavBar from '../components/nav-bar.vue'
    import Loading from '../../components/loading.vue'
    import AnimationInput from '../../components/animation-input.vue'

    import { mapGetters } from 'vuex'
    import _ from 'lodash'
    import fecha from 'fecha'

    export default {
        name:"edit-user-message",
        data(){
            return {
                firstNameActive:false,
                lastNameActive:false,
                isMaskShow:false,
                info:null,
                isLoadingShow:false
            }
        },
        components:{
            NavBar,Loading,AnimationInput
        },
        created:function(){
            this.info = _.cloneDeep(this.me);
            if(_.trim(this.info.name.firstName) && this.info.name.firstName.length > 0){
                this.firstNameActive = true;
            }
            if(_.trim(this.info.name.lastName) && this.info.name.lastName.length > 0){
                this.lastNameActive = true;
            }
        },
        computed:{
            ...mapGetters('me',['me','headerImage']),
            baseHeaderUrl() {
                if (window.name == 'chicme') {
                    return 'https://image.geeko.ltd/site/pc/icon35.png';
                } else if (window.name == 'ivrose') {
                    return 'https://image.geeko.ltd/site/ivrose/icon47.png';
                } else {
                    return 'https://image.geeko.ltd/site/bouti/logo02.png';
                }
            },
            birth(){
                if(this.info.birthday && this.info.birthday.length > 0){
                    var d = new Date(Date.parse(this.info.birthday.replace(/-/g,"/")));
                    var curDate = new Date();
                    if(d >=curDate){
                        alert("Date of birth must be less than the current time！");
                        return fecha.format(new Date(), 'mediumDate')
                    }else{
                        return fecha.format(new Date(this.info.birthday), 'mediumDate')
                    }
                }else{
                   return; 
                }
                
            }
        },
        methods:{
            closeMask:function(){
                this.isMaskShow = false;
            },
            showMask:function(){
                this.isMaskShow = true;
            },
            headerImageHandle(evt){
                var files = evt.target.files,file = files[0];
                var src = window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1 ? window.webkitURL.createObjectURL(file) : window.URL.createObjectURL(file);

                var formData = new FormData(this.$refs.file);
                console.log("src",src);
                this.$store.dispatch('me/setHeaderImage', {formData,imageUrl: src});
            },
            infoSaveHandle(){
                // console.log("this.info",this.info)
                var postData = {
                    'id': this.info.id,
                    'name.firstName': this.info.name.firstName,
                    'name.lastName': this.info.name.lastName,
                    'gender':this.info.gender,
                    'birthday':this.info.birthday
                }

                if(!this.info.name.firstName){
                    alert('First Name is required.')
                    return;
                }

                if(!this.info.name.lastName){
                    alert('Last Name is required.')
                    return;
                }

                this.isLoadingShow = true;

                this.$store.dispatch('me/postProfile', postData).then(() => {
                    return this.$store.dispatch('me/getMe');
                }).then(() => {
                    this.isLoadingShow = false;
                    alert('success');
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .edit-user-message{
        .edit-container{
            padding: 0px 10px;
            .edit-file{
                position: relative;
                .edit-image{
                    ._header-icon{
                        width: 88px;
                        height: 88px;
                        background: no-repeat 50%/cover;
                        border-radius: 50%;
                        margin: 0px auto;
                        position: relative;

                        ._bg{
                            width: 25px;
                            height: 25px;
                            line-height: 28px;
                            background-color: #222222;
                            border-radius: 50%;
                            display: inline-block;
                            position: absolute;
                            right: 0px;
                            bottom: 0px;
                            text-align: center;
                            ._icon{
                                color: #ffffff;
                            }
                        }

                        
                    }
                }

                .el-birth-input{
                    position: absolute;
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    opacity: 0;
                }
            }
            

            .sett-name-flex{
                display: flex;
                justify-content: space-between;
                -webkit-justify-content: space-between;
                width: 100%;
                margin-top: 40px;

                & > div{
                    width: calc(50% - 15px);
                    position: relative;

                    & input{
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

                    & label{
                        font-family: SlatePro;
                        font-size: 14px;
                        color: #666666;
                        position: absolute;
                        left: 0;
                        top: 10px;
                        transform: scale(1) translate(0, 0);
                        transition: all .1s linear;
                        z-index: 1;
                        text-transform: uppercase;
                    }

                    & .focus-scale{
                        transform: scale(1) translate(0, -25px);
	                    color: #999999;
                    }
                }
            }

            .sett-change-password{
                .change-password{
                    width: 100%;
                    border-bottom: 1px solid #dcdcdc;
                    height: 45px;
                    margin-top: 20px;

                    & > div:last-child{
                        text-align: right;
                    }

                    ._title{
                        font-family: SlatePro;
                        font-size: 16px;
                        color: #222222;
                    }

                    ._icon{
                        color:#9b9b9b;
                    }
                }
            }

            .el-setting-birth{
                margin-top: 20px;
                position: relative;
                // border-bottom: 1px solid #e6e6e6;
                .birth{
                    text-align: center;
                    cursor: pointer;
                    .problem{
                        background-color: #dddddd;
                        color: #888888;
                        border-radius: 50%;
                        width: 16px;
                        height: 16px;
                        display: inline-block;
                        line-height: 16px;
                    }
                }

                .el-birth-input, .el-gender-select{
                    position: absolute;
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    opacity: 0;
                }
            }

            .reg-birthday {
                position: relative;
                margin-top:30px;
                border-bottom: 1px solid #e6e6e6;

                .reg-birthday-flex {
                    display: flex;
                    height: 40px;
                    line-height: 40px;
                    // justify-content: space-between;
                    margin-top: 20px;

                    ._saveValue{
                        width: 100%;
                        padding-left: 20px;
                    }

                    ._item {
                        display: flex;
                        font-size: 16px;
                        color: #222222;
                        z-index: 2;
                        white-space: nowrap;
                        text-transform: capitalize;
                    }

                    .birth {
                        font-size: 12px;
                        cursor: pointer;
                        text-align: center;

                        .problem {
                            background-color: #dddddd;
                            color: #888888;
                            border-radius: 50%;
                            width: 16px;
                            height: 16px;
                            display: inline-block;
                            line-height: 16px;
                        }
                    }
                }

                #reg-birthday-input {
                    position: absolute;
                    display: inline-block;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                }
            }
        }

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

        #settings-interact-container{
            .setting-interact-content{
                height: 90px;
                width: calc(100% - 40px);
                position: fixed;
                padding: 5px;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                background-color: #ffffff;
                border-radius: 4px;
                z-index: 151;

                & > div:first-child{
                    text-align: right;
                }

                & > div:last-child{
                    padding: 10px;
                    font-size: 14px;
                    color: #222222;
                }
            }

            #settings-interact-mask{
                position: fixed;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background-color: rgba(0, 0, 0, 0.4);
                z-index: 150;
            }
        }
    }
</style>