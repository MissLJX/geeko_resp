<template>
    <div class="el-setting-body">
        <page-header>
            <span>{{$t('label.editProfile')}}</span>
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

                <div class="el-setting-gender">
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
                </div>
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
            </div>
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
            width: 100px;
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

</style>

<script type="text/ecmascript-6">

    import PageHeader from '../components/page-header.vue'
    import {mapGetters} from 'vuex'
    import fecha from 'fecha'
    import _ from 'lodash'

    export default{
        data(){
            return {
                info: null
            }
        },
        computed: {
            ...mapGetters('me', ['me', 'headerImage']),
            birth(){
                return fecha.format(new Date(this.info.birthday), 'mediumDate')
            },
            gender(){
                return this.info.gender == 1 ? 'Men' : (this.info.gender == 2 ? 'Woman' : 'Other')
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
            }
        },
        components: {
            'page-header': PageHeader
        },
        created(){
            this.info = _.cloneDeep(this.me)
        }
    }
</script>