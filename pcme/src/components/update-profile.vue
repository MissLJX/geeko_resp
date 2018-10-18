<template>
    <div>
        <div class="p-hd">
            <strong>{{$t('updatepro')}}</strong> &nbsp;| &nbsp; Complete your profile for a more customized shopping experience.
        </div>
        <div class="p-bd">
            <div class="imgarea">
                <div class="el-me-headerImage" :style="{'background-image': 'url('+headerImage+'),url('+baseHeaderUrl+')' }"></div>
                <!--<div class="img-upload">
                    <p>{{$t('uploadphoto')}}</p>
                    <input type="file" name="image" accept="image/*"
                           style="font-size: 1.2em; padding: 10px 0;"
                           @change="setImage" />
                </div>-->
            </div>
            <div class="namearea">
                <div class="firstname">
                    <label>{{$t('firstName')}}:</label>
                    <input v-model="firstname"/>
                </div>
                <div class="lastname">
                    <label>{{$t('lastName')}}:</label>
                    <div class="st-cell st-v-m">
                        <input v-model="lastname"/>
                    </div>
                </div>

                <div class="v-btn" @click="infoSaveHandle">{{$t('submit')}}</div>
            </div>
        </div>

        <div class="mask" v-if="isAlert">
            <div class="img-con">
                <p class="cancel-btn" @click="uploadImg(0)">X</p>
                <h3>{{$t('uploadphoto')}}</h3>
                <div class="l-img" @click="cropImage">
                    <vue-cropper
                            ref='cropper'
                            :guides="true"
                            :view-mode="1"
                            drag-mode="crop"
                            :auto-crop-area="1"
                            :min-container-width="390"
                            :min-container-height="390"
                            :background="true"
                            :rotatable="true"
                            :src="imgSrc"
                            alt="Source Image"
                            :img-style="{ 'width': '390px', 'height': '390px' }">
                    </vue-cropper>
                </div>
                <div class="s-img">
                    <img  :src="cropImg ? cropImg : imgSrc" alt="Cropped Image" />
                    <div class="v-btn" @click="uploadImg(1)">{{$t('okay')}}</div>
                </div>
            </div>
        </div>
        <loding v-if="isloding"></loding>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import * as utils from '../utils/geekoutil';
    import loding from './loding.vue';
    import uploadAvatar from './upload-avatar.vue'

    export default {
        data() {
            return {
                imgSrc: '',
                cropImg: '',
                isAlert:false,
                imgfile:'',
                firstname:'',
                lastname:'',
                isloding:false
            };
        },
        components: {
            'loding':loding,
        },
        computed:{
            ...mapGetters(['me']),
            baseHeaderUrl() {
                return 'https://dgzfssf1la12s.cloudfront.net/site/pc/icon35.png';
            },
            headerImage(){
                if(this.me.id){
                    return utils.imageutil.getHeaderImg(this.me.id)
                }
            }
        },
        methods:{
            /*setImage(e) {
                this.isAlert=true;

                const file = e.target.files[0];
                if (!file.type.includes('image/')) {
                    alert('Please select an image file');
                    return;
                }

                if (typeof FileReader === 'function') {
                    const reader = new FileReader();

                    reader.onload = (event) => {
                        this.imgSrc = event.target.result;
                        this.$refs.cropper.replace(event.target.result);
                    };

                    reader.readAsDataURL(file);
                } else {
                    alert('Sorry, FileReader API not supported');
                }
            },
            cropImage() {
                this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
            },
            uploadImg(flag){
                this.isAlert = false;
                if(flag === 1){
                    var formData = new FormData();
                    this.cropImg ? this.imgfile = this.cropImg : this.imgfile = this.imgSrc
                    this.imgfile = this.convertImgDataToBlob(this.imgfile)
                    formData.append('imageFile', this.imgfile);
                    this.$store.dispatch('setHeaderImage', formData)
                }
            },*/
            infoSaveHandle(){
                let postData = {
                    'id': this.me.id,
                    'name.firstName': this.firstname,
                    'name.lastName': this.lastname,
                    'gender':this.me.gender,
                    'birthday':this.me.birthday
                }
                if(!this.firstname){
                    alert('First Name is required.')
                    return;
                }
                if(!this.lastname){
                    alert('Last Name is required.')
                    return;
                }
                this.isloding = true
                this.$store.dispatch('postProfile', postData).then(() => {
                    this.isloding = false
                }).then(() => {
                    alert('success')
                })
            },
            /*convertImgDataToBlob(base64Data){
                var format = "image/jpeg";               
                var base64 = base64Data;                
                var code = window.atob(base64.split(",")[1]);                
                var aBuffer = new window.ArrayBuffer(code.length);                
                var uBuffer = new window.Uint8Array(aBuffer);                
                for (var i = 0; i < code.length; i++) {                    
                    uBuffer[i] = code.charCodeAt(i) & 0xff;                
                }                
                var blob = null;                
                try {                    
                    blob = new Blob([uBuffer], {                        
                        type: format                    
                    });                
                } catch (e) {                    
                    window.BlobBuilder =window.BlobBuilder || window.WebKitBlobBuilder ||window.MozBlobBuilder ||window.MSBlobBuilder;                    
                    if (e.name == "TypeError" && window.BlobBuilder) {                        
                        var bb = new window.BlobBuilder();                        
                        bb.append(uBuffer.buffer);                        
                        blob = bb.getBlob("image/jpeg");                    
                    } else if (e.name == "InvalidStateError") {                        
                        blob = new Blob([aBuffer], {                            
                            type: format                        
                        });                    
                    } else {}                
                }                
                return blob;
            }*/
        },
        created(){
            this.$store.dispatch('getMe').then(()=>{
                this.firstname = this.me.name.firstName
                this.lastname = this.me.name.lastName
            })
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
    .mask{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.4);
        text-align: center;
        .img-con{
            width: 640px;
            height: 535px;
            background-color: #fff;
            position: relative;
            left: calc(50% - 320px);
            top: calc(50% - 267px);
            padding: 16px 16px 50px 64px;
            text-align: left;
            h3{
                margin-bottom: 17px;
            }
            .cancel-btn{
                font-size: 18px;
                color: #666666;
                text-align: right;
                cursor: pointer;
                margin-bottom: 15px;
            }
        }
        .l-img{
            width: 390px;
            height: 390px;
            float: left;
        }
        .s-img{
            width: 100px;
            height: 100px;
            float: left;
            margin-left: 15px;
            img{
                width: 100%;
                height: 100%;
            }
            .v-btn{
                width: 100px;
                line-height: 26px;
                background-color: #e5004f;
                color: #fff;
                text-align: center;
                margin-top: 15px;
                cursor: pointer;
            }
        }
        &:after{
            display: block;
            content: '';
            clear: both;
        }
    }
    .p-hd{
        color: #666;
        strong{
            color: #222;
            font-size: 16px;
        }
    }
    .p-bd{
        margin-top: 40px;
        .imgarea{
            float: left;
            padding: 10px;
            .el-me-headerImage {
                width: 140px;
                height: 140px;
                background: no-repeat center/cover;
                border-radius: 50%;
                border: 1px solid #cdcdcd;
                background-size: cover;
            }
            .img-upload{
                margin-top: 34px;
                width: 150px;
                line-height: 40px;
                border-radius: 2px;
                border: solid 1px #222222;
                text-align: center;
                position: relative;
                input{
                    opacity: 0;
                    position: absolute;
                    top: 0;
                    left: 0;
                    cursor: pointer;
                }
            }
        }
        .namearea{
            float: left;
            margin-left: 110px;
            .firstname,.lastname{
                margin-bottom: 40px;
                label{
                    font-size: 16px;
                    color: #222;
                    display: block;
                    font-weight: bold;
                    margin-bottom: 16px;
                }
                input{
                    width: 520px;
                    height: 40px;
                    padding-left: 10px;

                }
            }
            .v-btn{
                width: 240px;
                height: 40px;
                background-color: #222222;
                border-radius: 2px;
                text-align: center;
                line-height: 40px;
                color: #fff;
                cursor: pointer;
            }
        }
    }
</style>