<template>
    <div>
        <div class="p-hd">
            <strong>{{$t('updatepro')}}</strong> &nbsp;| &nbsp; Complete your profile for a more customized shopping experience.
        </div>
        <div class="p-bd">
            <div class="imgarea">
                <!--<img :src="imgDataUrl">-->
                <div class="el-me-headerImage" :style="{'background-image': 'url('+headerImage+'),url('+baseHeaderUrl+')' }"></div>
                <div>
                    <div class="img-upload">
                        <p @click="toggleShow">{{$t('uploadphoto')}}</p>
                        <my-upload field="imageFile"
                                @crop-success="cropSuccess"
                                @crop-upload-success="cropUploadSuccess"
                                @crop-upload-fail="cropUploadFail"
                                v-model="show"
                                :width="300"
                                :height="300"
                                url="/v9/customer/upload-icon"
                                :headers="headers"
                                img-format="png"
                                langType="en"
                        ></my-upload>
                    </div>
                </div>
                

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

                <div class="birthday">
                    <select-birthday :yearSon="birthday.year" :monthSon="birthday.month" :daySon="birthday.day" @getChildDate="getChildDate"></select-birthday>
                </div>

                <div class="v-btn" @click="infoSaveHandle">{{$t('submit')}}</div>
            </div>
        </div>
        <loding v-if="isloding"></loding>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import * as utils from '../utils/geekoutil';
    import loding from './loding.vue';
    import myUpload from 'vue-image-crop-upload';
    
    import selectBirthday from './select-birthday.vue'

    export default {
        data() {
            return {
                imgSrc: '',
                isAlert:false,
                firstname:'',
                lastname:'',
                isloding:false,
                show: false,
                headers: {
                    smail: '*_~'
                },
                headerImage:'',
                birthday:{
                    year:0,
                    month:0,
                    day:0
                }
            };
        },
        components: {
            'loding':loding,
            'my-upload': myUpload,
            'select-birthday':selectBirthday
        },
        computed:{
            ...mapGetters(['me']),
            baseHeaderUrl() {
                return 'https://image.geeko.ltd/site/pc/icon35.png';
            },
            getConfireValue:function(){
                if(!!this.birthday.month && !!this.birthday.day && this.birthday.month > 0 && this.birthday.day > 0){
                    return this.birthday.year + "-" + this.pZone(this.birthday.month) + "-" + this.pZone(this.birthday.day);
                }
                return null;
            }
            /*headerImage(){
                if(this.me.id){
                    return
                }
            }*/
        },
        methods:{
            /*
            var formData = new FormData();
            this.cropImg ? this.imgfile = this.cropImg : this.imgfile = this.imgSrc
            this.imgfile = this.convertImgDataToBlob(this.imgfile)
            formData.append('imageFile', this.imgfile);
            this.$store.dispatch('setHeaderImage', formData)
            */
            getChildDate:function(value){
                console.log(value);
                this.birthday = value;
            },
            infoSaveHandle(){
                console.log("getConfireValue",this.getConfireValue)
                let postData = {
                    'id': this.me.id,
                    'name.firstName': this.firstname,
                    'name.lastName': this.lastname,
                    'gender':this.me.gender,
                    'birthday':this.getConfireValue
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
            toggleShow() {
                this.show = !this.show;
            },
            cropSuccess(imgDataUrl, field){
                console.log('-------- crop success --------');
                this.headerImage = imgDataUrl;
            },
            cropUploadSuccess(jsonData, field){
                console.log('-------- upload success --------');
                console.log(jsonData);
                console.log('field: ' + field);
            },
            cropUploadFail(status, field){
                console.log('-------- upload fail --------');
                console.log(status);
                console.log('field: ' + field);
            },
            pZone:function(value){
                return value < 10 ? '0' + value : value;
            }
        },
        created(){
            this.$store.dispatch('getMe').then(()=>{
                this.firstname = this.me.name.firstName
                this.lastname = this.me.name.lastName
                this.headerImage = utils.imageutil.getHeaderImg(this.me.id)
                // this.me.birthday = "2020-04-04";
                if(!!this.me.birthday && this.me.birthday != null){
                    let obj = utils.getDYD(this.me.birthday);
                    this.birthday.year = obj.year;
                    this.birthday.month = obj.month;
                    this.birthday.day = obj.day;
                }else{
                    this.birthday.year = 1;
                }
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
                background-color: #E64545;
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
            padding: 10px 10px 10px 0px;
            display: table;
            .el-me-headerImage {
                width: 100px;
                height: 100px;
                background: no-repeat center/cover;
                border-radius: 50%;
                border: 1px solid #cdcdcd;
                background-size: cover;
                margin-left: 14px;
            }
            .img-upload{
                width: 120px;
	            height: 36px;
                line-height: 36px;
                border-radius: 2px;
                border: none;
                text-align: center;
                position: relative;
                background-color: #fff1f4;
                font-size: 15px;
                color: #e64545;
                p{
                    height: 36px;
                    line-height: 36px;
                    cursor: pointer;
                }
                input{
                    opacity: 0;
                    position: absolute;
                    top: 0;
                    left: 0;
                    cursor: pointer;
                }
            }

            & > div{
                display: table-cell;
                vertical-align: middle;
            }

            & > div:last-child{
                padding-left: 20px;
            }
        }
        .namearea{
            margin-top: 20px;
            .firstname,.lastname{
                margin-bottom: 25px;
                label{
                    font-size: 15px;
                    color: #222;
                    display: block;
                    margin-bottom: 10px;
                }
                input{
                    width: 520px;
                    height: 40px;
                    padding-left: 10px;
                    border: solid 1px #cccccc;
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

            .birthday{
                margin-bottom: 25px;
            }
        }
    }
</style>