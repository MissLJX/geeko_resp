<template>
    <div class="el-setting-body">
        <page-header>
            <span>{{$t('label.settings')}}</span>
            <span slot="oplabel" @click="infoSaveHandle">{{$t('label.save')}}</span>
        </page-header>
        <div class="el-setting-blocks">
            <div class="el-setting-block">
                <div class="el-setting-header-image el-setting-birth">
                    <div class="st-table el-setting-picture-area">
                        <div class="st-cell st-v-m el-setting-label">
                            {{$t('label.changProfilePicture')}}
                        </div>
                        <div class="st-cell st-v-m st-t-r">
                            <span class="el-setting-picture"
                                  :style="{'background-image':'url('+headerImage+')'}"></span>
                        </div>
                        <div class="st-cell st-v-m st-t-r">
                            <i class="iconfont el-setting-go">&#xe694;</i>
                        </div>
                    </div>
                    <form ref="file"><input name="imageFile" class="el-birth-input" type="file" @change="headerImageHandle"/></form>

                </div>


                <div class="st-table el-setting-li-01">
                    <div class="st-cell st-v-m">
                        <span class="el-setting-label">{{$t('label.firstName')}}</span>
                    </div>
                    <div class="st-cell st-v-m">
                        <input v-model="info.name.firstName"/>
                    </div>

                </div>


                <div class="st-table el-setting-li-01">
                    <div class="st-cell st-v-m">
                        <span class="el-setting-label">{{$t('label.lastName')}}</span>
                    </div>
                    <div class="st-cell st-v-m">
                        <input v-model="info.name.lastName"/>
                    </div>
                </div>

                <!--<div class="el-setting-gender">
                    <div class="st-table el-setting-li-01">
                        <div class="st-cell st-v-m">
                            <span class="el-setting-label">{{$t('label.gender')}}</span>
                        </div>
                        <div class="st-cell st-v-m">
                            <span class="el-setting-value">{{gender}}</span>
                        </div>
                        <div class="st-cell st-v-m st-t-r">
                            <i class="iconfont el-setting-go">&#xe694;</i>
                        </div>
                    </div>
                    <select class="el-gender-select" v-model="info.gender">
                        <option value="1">Man</option>
                        <option value="2">Woman</option>
                        <option value="3">Other</option>
                    </select>

                </div>


                <div class="el-setting-birth">
                    <div class="st-table el-setting-li-01">
                        <div class="st-cell st-v-m">
                            <span class="el-setting-label">{{$t('label.birthday')}}</span>
                        </div>
                        <div class="st-cell st-v-m">
                            <span class="el-setting-value">{{birth}}</span>
                        </div>
                        <div class="st-cell st-v-m st-t-r">
                            <i class="iconfont el-setting-go">&#xe694;</i>
                        </div>
                    </div>

                    <input class="el-birth-input" type="date" v-model="info.birthday"/>
                </div>-->
            </div>


            <div class="el-setting-block">
                <router-link class="el-setting-router-link" :to="{name: 'change-password'}">
                    <div class="st-table el-setting-li-02" style="border-top:none">
                        <div class="st-cell st-v-m">
                            <span class="el-setting-label">{{$t('label.changePassword')}}</span>
                        </div>
                        <div class="st-cell st-v-m st-t-r">
                            <i class="iconfont el-setting-go">&#xe694;</i>
                        </div>
                    </div>
                </router-link>

                <router-link class="el-setting-router-link" :to="{name: 'change-email'}">
                    <div class="st-table el-setting-li-02">
                        <div class="st-cell st-v-m">
                            <span class="el-setting-label">{{$t('label.changeEmail')}}</span>
                        </div>
                        <div class="st-cell st-v-m st-t-r">
                            <i class="iconfont el-setting-go">&#xe694;</i>
                        </div>
                    </div>
                </router-link>


                <div class="el-setting-gender">
                    <div class="st-table el-setting-li-01">
                        <div class="st-cell st-v-m">
                            <span class="el-setting-label">{{$t('label.changeCurrency')}}</span>
                        </div>
                        <div class="st-cell st-v-m">
                            <span class="el-setting-value">{{currency.label}}</span>
                        </div>
                        <div class="st-cell st-v-m st-t-r">
                            <i class="iconfont el-setting-go">&#xe694;</i>
                        </div>
                    </div>
                    <select class="el-gender-select" @change="currencyChangeHandle">
                        <option :selected="cu.value == currency.value" v-if="curriencies && curriencies.length > 0" v-for="cu in curriencies" :value="JSON.stringify(cu)">
                            {{cu.label}}
                        </option>
                    </select>
                </div>

                <div class="el-del-account" @click="toggle">
                    <div class="st-table el-setting-li-02" style="border-top:none">
                        <div class="st-cell st-v-m">
                            <span class="el-setting-label">Delete Account</span>
                        </div>
                        <div class="st-cell st-v-m st-t-r">
                            <i class="iconfont el-setting-go">&#xe694;</i>
                        </div>
                    </div>
                </div>
            </div>
            <button class="el-logout-btn" @click="logoutHandle">{{$t('label.logout')}}</button>
        </div>

        <div v-show="isShow" class="del-reason">
            <ul class="reason-select">
                <li>
                    <input type="radio" id="one" value="Too many marketing mails" v-model="pickedReason">
                    <label for="one">Too many marketing mails</label>
                </li>
                <li>
                    <input type="radio" id="two" value="For privacy reason" v-model="pickedReason">
                    <label for="two">For privacy reason</label>
                </li>
                <li>
                    <input type="radio" id="three" value="No products favord on the website" v-model="pickedReason">
                    <label for="one">No products favord on the website</label>
                </li>
                <li>
                    <input type="radio" id="four" value="Dissatisfied with the product" v-model="pickedReason">
                    <label for="two">Dissatisfied with the product</label>
                </li>
                <li>
                    <input type="radio" id="five" value="Dissatisfied with the shipping " v-model="pickedReason">
                    <label for="one">Dissatisfied with the shipping</label>
                </li>
                <li>
                    <input type="radio" id="six" value="Others" v-model="pickedReason">
                    <label for="two">Others</label>
                </li>
                <textarea v-if="(this.pickedReason=='Others')" v-model="inputReason" class="inputReason" placeholder="Would you please tell us why?" required></textarea>
                <button class="cancel-btn" @click="cancelDel">Cancel</button>
                <button class="del-btn" @click="delAccount">Delete</button>
            </ul>
        </div>
    </div>

</template>

<style scoped lang="scss">

    .el-setting-router-link{
        color: #4b5056;
        text-decoration: none;
    }
    .el-setting-body {
        background-color: #efefef;
    }

    .el-setting-block {
        background-color: #fff;
    }

    .el-setting-blocks {
        & > .el-setting-block {
            margin-top: 10px;
            &:first-child {
                margin-top: 0;
            }
        }
    }

    .el-setting-picture-area {
        width: 100%;
        .el-setting-picture {
            width: 65px;
            height: 65px;
            display: inline-block;
            background: no-repeat center/cover;
            border-radius: 50%;
        }

        & > div:last-child {
            width: 30px;
        }

        padding: 10px 10px;
    }

    .el-setting-label {
        color: #4b5056;
        font-size: 14px;
    }

    .el-setting-go {
        font-size: 16px;
    }

    .el-setting-li-01, .el-setting-li-02 {
        border-top: 1px solid #dcdcdc;
        height: 45px;
        width: 100%;
        padding: 0 10px;

    }

    .el-setting-li-01 {
        input {
            border: none;
            height: 100%;
            color: #888e9a;
        }
        & > div:first-child {
            width: 125px;
        }
    }

    .el-setting-value {
        color: #888e9a;
    }

    .el-setting-birth,.el-setting-gender {
        position: relative;
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
    .el-logout-btn{
        outline: none;
        box-shadow: none;
        background-color: #222928;
        color: #fff;
        border: none;
        width: 80%;
        margin: 20px auto;
        display: block;
        height: 40px;
        font-size: 16px;
        cursor: pointer;
    }
    .el-del-account{
        border-top: 1px solid #e3e3e3;
    }
    .del-reason{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        padding: 20px 0;
        background-color: rgba(0,0,0,0.3);
    }
    .reason-select{
        width: 85%;
        margin: 150px auto;
        padding: 20px 30px;
        background-color: white;
    }
    .reason-select li{
        width: 100%;
        font-size: 14px;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #eeeeee;
    }
    li:nth-child(6){
        border-bottom: none;
    }
    .cancel-btn,.del-btn{
        width: 49%;
        height: 30px;
        line-height: 30px;
        margin-top: 20px;
    }
    .inputReason{
        width: 100%;
        height: 50px;
    }

</style>

<script type="text/ecmascript-6">

    import PageHeader from '../components/page-header.vue'
    import {mapGetters} from 'vuex'
    import fecha from 'fecha'
    import _ from 'lodash'

    export default{
        data(){
            return {
                info: null,
                currency: null,
                isShow:false,
                pickedReason: 'Too many marketing mails',
                showOthers:false,
                inputReason:''
            }
        },
        computed: {
            ...mapGetters('me', ['me', 'headerImage']),
            curriencies(){
                return this.$store.getters.currencies
            },
            birth(){
                return fecha.format(new Date(this.info.birthday), 'mediumDate')
            },
            gender(){
                return this.info.gender == 1 ? 'Man' : (this.info.gender == 2 ? 'Woman' : 'Other')
            }
        },
        methods: {
            infoSaveHandle(){
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



                this.$store.dispatch('me/postProfile', postData).then(() => {
                    return this.$store.dispatch('me/getMe')
                }).then(() => {
                    alert('success')
                })
            },
            headerImageHandle(evt){
                var files = evt.target.files,file = files[0]
                var src = window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1 ? window.webkitURL.createObjectURL(file) : window.URL.createObjectURL(file);

                var formData = new FormData(this.$refs.file)

                this.$store.dispatch('me/setHeaderImage', {formData,imageUrl: src})
            },
            logoutHandle(){
                this.$store.dispatch('logout').then(() => {
                    window.location.href = '/'
                })
            },
            currencyChangeHandle(evt){
                var value = evt.target.value
                this.currency = JSON.parse(value)
                this.$store.dispatch('me/changeCurrency', this.currency)
            },
            toggle:function(){
                this.isShow = !this.isShow;
            },
            cancelDel:function(){
                this.isShow = false
            },
            delAccount:function(){
                if(this.pickedReason === 'Others'){
                    this.pickedReason = this.inputReason
                }
                this.$store.dispatch('logoff',this.pickedReason).then(() => {
                    window.location.href = '/'
                })
            }
        },
        components: {
            'page-header': PageHeader
        },
        created(){
            this.info = _.cloneDeep(this.me)
            this.currency = _.cloneDeep(this.me.currency)

            this.$store.dispatch('getCurrencies').then(() => {

            })
        }
    }
</script>