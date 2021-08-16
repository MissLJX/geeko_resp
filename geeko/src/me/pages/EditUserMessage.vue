<template>
    <div class="edit-user-message">
        <nav-bar>
            <i class="iconfont el-back-font" slot="left" @click="$router.go(-1)">&#xe693;</i>
            <span slot="center">{{$t("point.my_points")}}</span>
        </nav-bar>

        <div class="edit-container">
            <div class="edit-file">
                <div class="_title">
                    {{$t("index.change_profile_picture")}}
                </div>

                <div>
                    <div class="edit-image">
                        <div class="_header-icon" :style="{'background-image':'url('+headerImage+'),url('+baseHeaderUrl+')'}"></div>
                    </div>
                    <form ref="file">
                        <input name="imageFile" class="el-birth-input" type="file" @change="headerImageHandle"/>
                    </form>
                </div>
                <i class="iconfont el-go">&#xe694;</i>
            </div>
        </div>

        <div class="other-container">
            <div class="global-padding">
                <router-link :to="{name:'edit-name'}">
                    <div class="st-table st-fullwidth">
                        <div class="st-cell st-v-m">
                            <span class="_name">{{$t("index.name")}}</span>
                        </div>
                        <div class="st-cell st-v-m st-t-r">
                            <span class="_message" v-if="!fullName"></span>
                            <span class="_font" v-if="fullName">{{fullName}}</span>
                            <i class="iconfont el-go">&#xe694;</i>
                        </div>
                    </div>
                </router-link>
            </div>

            <div class="global-padding">
                <router-link :to="{name:'edit-nickname'}">
                    <div class="st-table st-fullwidth">
                        <div class="st-cell st-v-m">
                            <!-- <span class="_red">*</span> -->
                            <span class="_name">{{$t("index.nickName")}}</span>
                        </div>
                        <div class="st-cell st-v-m st-t-r">
                            <span class="_message" v-if="!getNikeName"></span>
                            <span class="_font" v-if="getNikeName">{{getNikeName}}</span>
                            <i class="iconfont el-go">&#xe694;</i>
                        </div>
                    </div>
                </router-link>
            </div>

            <div class="global-padding">
                <router-link :to="{name:'edit-bio'}">
                    <div class="st-table st-fullwidth">
                        <div class="st-cell st-v-m">
                            <span class="_name">{{$t("index.bio")}}</span>
                        </div>
                        <div class="st-cell st-v-m st-t-r">
                            <span class="_message" v-if="!getUserBio"></span>
                            <span class="_font" v-if="getUserBio">{{getUserBio}}</span>
                            <i class="iconfont el-go">&#xe694;</i>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>

        <div class="other-container">
            <div class="global-padding">
                <router-link :to="{name:'my-preference'}">
                    <div class="my-preference">
                        <div class="_first">
                            <span class="_name">{{$t("index.my_preference")}}</span>
                        </div>

                        <div v-if="getMyPreference && getMyPreference.length >0" class="_secoed">
                            <div class="_preference" v-for="(item,index) in getMyPreference.slice(0,3)" :key="index+item">
                                {{item.label}}
                            </div>

                            <div style="display:inline-block;" v-if="getMyPreference.length > 3">...</div>
                        </div>

                        <div class="_three">
                            <!-- <span class="_message"></span> -->
                            <!-- <span class="_font">About me…About me…About me…About me…</span> -->
                            <i class="iconfont el-go">&#xe694;</i>
                        </div>
                    </div>
                </router-link>
            </div>

            <div class="global-padding">
                <router-link :to="{name:'my-measurements'}">
                    <div class="st-table st-fullwidth">
                        <div class="st-cell st-v-m">
                            <span class="_name">{{$t("index.my_measurements")}}</span>
                        </div>
                        <div class="st-cell st-v-m st-t-r">
                            <!-- <span class="_message"></span> -->
                            <i class="iconfont el-go">&#xe694;</i>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>

        <!-- <div class="sett-name-footer">
            <div class="change-password-save"  @click="infoSaveHandle">Save</div>
        </div> -->

        <loading v-if="isLoadingShow"></loading>
            
    </div>
</template>

<script>
    import NavBar from '../components/nav-bar.vue'
    import Loading from '../../components/loading.vue'

    import { mapGetters } from 'vuex'
    import _ from 'lodash'
    import fecha from 'fecha'

    export default {
        name:"edit-user-message",
        data(){
            return {
                isMaskShow:false,
                isLoadingShow:false
            }
        },
        components:{
            NavBar,Loading
        },
        computed:{
            ...mapGetters('me',['me','headerImage']),
            baseHeaderUrl() {
                if (window.name === 'chicme') {
                    return 'https://image.geeko.ltd/chicme/20210813/icon.png';
                } else if (window.name === 'ivrose') {
                    return 'https://image.geeko.ltd/chicme/20210813/iv.png';
                } else {
                    return 'https://image.geeko.ltd/chicme/20210813/bq.png';
                }
            },
            fullName() {
                return this.getName(this.me.name.firstName) + ' ' + this.getName(this.me.name.lastName);
            },
            getNikeName(){
                return this.getName(this.me.nickname);
            },
            getUserBio(){
                return this.getName(this.me.bio);
            },
            getMyPreference(){
                let mypreference = this.me.myPreference;
                console.log("this.me.myPreference",this.me.myPreference)
                if(mypreference){
                    let arr = _.concat(mypreference.favoriteCategories,mypreference.favoriteStyles,mypreference.usuallyBuyClothesFor);
                    return arr;
                }

                return "";
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

            },
            getName(value){
                return value ? value : '';
            }
        }
    }
</script>

<style lang="scss" scoped>
    .edit-user-message{
        background-color: #ffffff;
        .edit-container{
            padding: 0px 10px;
            .edit-file{
                position: relative;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                height: 60px;

                .edit-image{
                    margin-right: 5px;
                    ._header-icon{
                        width: 42px;
                        height: 42px;
                        background: no-repeat 50%/cover;
                        border-radius: 50%;
                        position: relative;
                    }
                }

                ._title{
                    margin-right: auto;
                    font-size: 14px;
                    color: #000000;
                }
            }

            .el-birth-input{
                position: absolute;
                display: inline-block;
                width: 50%;
                height: 100%;
                top: 0;
                right: 0;
                opacity: 0;
            }
        }

        .other-container{
            padding: 0px 10px;
            border-top: 10px solid #f5f5f5;

            .global-padding{
                padding: 15px 0px;

                & > a{
                    display: block;
                }

                & ._message{
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    background-color: red;
                    border-radius: 50%;
                    vertical-align: middle;
                    position: relative;
                    top: -2px;
                }

                ._preference{
                    display: inline-block;
                    background-color: #eeeeee;
                    padding: 5px 8px;
                    font-size: 12px;
                    color: #666666;
                    position: relative;
                    margin-left: 6px;
                }

                & ._red{
                    font-size: 14px;
                    color: #e64545;
                }

                & ._name{
                    font-size: 14px;
                    color: #000000;
                }

                & ._font{
                    font-size: 14px;
                    color: #999999;
                    display: inline-block;
                    position: relative;
                    position: relative;
                    top: -2px;
                    vertical-align: middle;
                    width: 150px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
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

        .el-go{
            color: #cccccc;
        }

        .my-preference{
            display: flex;
            align-items: center;
            justify-content: space-between;

            & ._first{
                width:100px;
            }

            & ._secoed{
                white-space: nowrap;
                overflow: hidden;
                flex: 1;
            }

            & ._three{
                width: 30px;
                text-align: right;
            }
        }
    }
</style>