<template>
    <div class="detailCon">
        <table class="infotabel">
            <tr>
                <td>
                    <link-image href="#" :src="orderpro.productImageUrl" :title="orderpro.productName"/>
                </td>
                <td>
                    <p>{{orderpro.productName}}</p>
                    <p class="grey">{{orderpro.color}} {{orderpro.size}} <span style="margin-left: 10px">X{{orderpro.quantity}}</span></p>
                </td>
                <td>
                    <p class="price">{{realprice}}</p>
                </td>
            </tr>
        </table>

        <div class="review-con">
            <div class="rating-con">
                <div>{{$t('howtheitem')}}</div>
                <star-list id="stars" :score="comment.score" @star="starClickHandle"/>
            </div>
            <div class="rating-con">
                <div>{{$t('howthispro')}}</div>
                <div class="radio-beauty-container">
                    <label v-for="(fit,index) in fits" >
                        <input type="radio" @click="fitClickHandle" :value="fit.value" name="radioName" :id="index" hidden :checked="fit.value === comment.sizingRecommendation"/>
                        <label :for="index" class="radio-beauty"></label>
                        <span class="radio-name">{{fit.label}}</span>
                    </label>
                </div>
            </div>

            <div id="review-measure-area">
                <p>Your Measurements (Optional) </p>
                <table>
                    <tr>
                        <td>
                            <span class="_title">Height:</span>
                            <input class="_input" type="text" v-model="comment.height"/>
                            <span class="_size">cm/ in</span>
                        </td>
                        <td>
                            <span class="_title">Weight:</span>
                            <input class="_input" type="text" v-model="comment.weight"/>
                            <span class="_size">kg/ lbs</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="_title">Bust:</span>
                            <input class="_input" type="text" v-model="comment.bust"/>
                            <span class="_size">cm/ in</span>
                        </td>
                        <td>
                            <span class="_title">Hips:</span>
                            <input class="_input" type="text" v-model="comment.hips"/>
                            <span class="_size">cm/ in</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="_title">Waist:</span>
                            <input class="_input" type="text" v-model="comment.waist"/>
                            <span class="_size">cm/ in</span>
                        </td>
                    </tr>
                </table>

            </div>

            <div class="commet-area">
                <span class="remnant">{{remnant1}}/1000</span>
                <div class="t-area">
                    <textarea v-model="comment.content" style="resize:none;" maxlength="1000" ></textarea>
                </div>
            </div>
            <div class="upload-container" id="imgboxid">
                <ul v-if="uploadedImages && uploadedImages.length">
                    <li v-for="(image,index) in uploadedImages" class="uploadImage" >
                        <img :src="image"/>
                        <span class="removeImg" @click="removeImg(index)">&times;</span>
                    </li>
                </ul>
                <div class="upload-img" id="uploadimg" v-show="uploadedImages.length<5">
                    <form ref="imageLoader">
                        <input type="file" name="imageFiles" multiple="multiple" @change="loadImg" accept="image/jpg,image/jpeg,image/png,image/gif">
                    </form>
                    <div class="addbtn">+</div>
                    <div class="addnum">{{addnum}} / 5</div>
                </div>
            </div>

            <div class="v-btn" @click="sendComment">{{$t('submit')}}</div>
        </div>

        <div v-if="isconfirm">
            <div class="mask"></div>
            <comment-alert :data="commentAler" @hideAlert="backOrderPage"></comment-alert>
        </div>
        <loding v-if="isloding"></loding>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import * as utils from '../utils/geekoutil';
    import LinkImage from '../components/link-image.vue';
    import StarList from '../components/star-list.vue';
    import uploadImg from '../components/upload-img.vue';
    import CommentAlert from '../components/comment-alert.vue';
    import loding from '../components/loding.vue';
    import HtmlImageCompress from 'html-image-compress';

    export default {
        data(){
            return {
                order:'',
                shipping:'',
                shippingstate:'',
                shippingcountry:'',
                orderpro:'',
                /*remnant1:0,*/
                isloding:false,
                fits: [
                    {label: "Small", value: '3'},
                    {label: "True to size", value: '2'},
                    {label: "Large", value: '1'}
                ],
                isconfirm:false,
                isissatisfy:true,
                alertMess:'',
                isempty:false,
                uploadedImages: [],
                files:[],
                addnum:0,
                newfiles:[],
            }
        },
        components: {
            'link-image': LinkImage,
            'star-list': StarList,
            'upload-img':uploadImg,
            'comment-alert':CommentAlert,
            'loding':loding,
            HtmlImageCompress
        },
        computed:{
            ...mapGetters(['orderdetail','comment']),
            remnant1(){
                if(this.comment && this.comment.content){
                    return this.comment.content.length
                }else{
                    return '0'
                }
            },
            getDate(){
                if(this.order.paymentTime){
                    return utils.enTime(new Date(this.order.paymentTime))
                }else{
                    return '-'
                }
            },
            getStatus(){
                return utils.STATUS_LABEL(this.order.status)
            },
            realprice(){
                if(this.orderpro && this.orderpro.realPrice && this.orderpro.realPrice.unit){
                    return this.orderpro.realPrice.unit+this.orderpro.realPrice.amount
                }
            },
            shippingprice(){
                if(this.order && this.order.shippingPrice){
                    return this.order.shippingPrice.unit+this.order.shippingPrice.amount
                }
            },
            total(){
                if(this.order && this.order.orderTotal){
                    return this.order.orderTotal.unit+this.order.orderTotal.amount
                }
            },
            confirmedOrder(){
                if(this.order && this.order.status===10){
                    return true
                }
            },
            commentAler(){
                return{
                    'isagree':this.issatisfy,
                    'message':this.alertMess,
                    'agreeText':'Yes'
                }
            },
        },
        methods:{
            sharePro(){
                this.$store.dispatch('shareProduct',this.orderdetail.productId)
            },
            starClickHandle(data){
                this.comment.score = Number(data.star);
            },
            /*descInput1() {
                let txtVal = this.comment.content.length;
                this.remnant1 = txtVal;
            },*/
            getImgFiles(files){
                this.files = files;
            },
            fitClickHandle(evt){
                evt.preventDefault()
                let fitNum = evt.target.getAttribute('value')
                this.comment.sizingRecommendation = fitNum
            },
            sendComment(evt){
                this.isloding=true
                var _this = this;

                if(_this.comment.content!==''){
                    _this.isempty=false;
                    let files = this.files;
                    let promises = this.files.map(file => new HtmlImageCompress(file, {quality:.7, imageType:file.type}))


                    Promise.all(promises).then(results => {
                        let _files = results.map(result => result.file);
                        var formData = new FormData();
                        formData.append('content', this.comment.content);
                        if(!!this.comment.id && this.comment.id != null){
                            formData.append('id', this.comment.id);
                        }else{
                            formData.append('variantId', this.$route.query.variantId);
                        }

                        
                        // formData.append('productId', this.$route.query.productid);
                        formData.append('score', this.comment.score);
                        formData.append('sizingRecommendation', this.comment.sizingRecommendation);

                        if(!!_this.$route.query.orderid){
                            formData.append('orderId',this.$route.query.orderid);
                        }

                        _files.forEach((file,index) => {
                            formData.append("imageFiles",  new File([file], files[index].name));
                        });

                        if(_this.comment.height && _this.comment.height != null){
                            formData.append('height', this.comment.height);
                        }
                        if(_this.comment.weight && _this.comment.weight != null){
                            formData.append('weight', this.comment.weight);
                        }
                        if(_this.comment.bust && _this.comment.bust != null){
                            formData.append('bust', this.comment.bust);
                        }
                        if(_this.comment.hips && _this.comment.hips != null){
                            formData.append('hips', this.comment.hips);
                        }
                        if(_this.comment.waist && _this.comment.waist != null){
                            formData.append('waist', this.comment.waist);
                        }

                        if(!!!_this.comment.productId)
                            _this.comment.productId = this.orderpro.productId
                        _this.$store.dispatch('sendComment', {reply:formData}).then(() => {
                            this.isloding = false
                            // alert("Success!");
                            // this.$router.go(-1);
                            let tipContent = ''
                            if(res.prompt && res.prompt.html){
                                tipContent = res.prompt.html
                            }
                            this.$router.push({name:'reviewConfirm', params:{tipContent: tipContent}})
                        }).catch((e) => {
                            alert(e);
                            this.isloding = false
                        });
                    })
                }else{
                    _this.isempty=true;
                }
            },
            backOrderPage(){
                this.$router.go(-1);
            },
            loadImg(event) {
                this.newfiles = [...event.target.files];
                this.files = this.files.concat(this.newfiles);
                var files = this.newfiles;
                _.each(files, (file) => {
                    this.addnum = this.addnum + 1;
                    var src = window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1 ? window.webkitURL.createObjectURL(file) : window.URL.createObjectURL(file);
                    this.uploadedImages.push(src)
                })

                console.log("this.uploadedImages",this.uploadedImages);

                if (this.uploadedImages.length > 5) {
                    this.uploadedImages.splice(5, this.uploadedImages.length - 5);
                    this.files.splice(5, this.files.length - 5)
                }
            },
            removeImg(index) {
                this.uploadedImages.splice(index, 1)
                this.files.splice(index, 1);
                this.addnum = this.addnum - 1;
            }
        },
        created(){
            this.$store.dispatch('getOrder',this.$route.query.orderid).then(()=>{
                this.order = this.orderdetail
                if(this.order && this.orderdetail.orderItems){
                    this.orderdetail.orderItems.forEach(item =>{
                        if(item.productId === this.$route.query.productid){
                            this.orderpro = item
                        }
                    })
                }
                this.shipping = this.orderdetail.shippingDetail
                this.shippingstate = this.orderdetail.shippingDetail.state
                this.shippingcountry =this.orderdetail.shippingDetail.country
            })
            this.$store.dispatch('loadComment', this.$route.query.productid).then(()=>{


                /*this.orderpro = data*/
            });
        }
    }
</script>

<style scoped lang="scss">
    .grey{
        color: #999;
    }
    .infotabel{
        border: 1px solid #e6e6e6;
        width: 100%;
        margin: 20px 0 30px 0;
        td{
            padding: 14px;
            vertical-align: middle;
            font-size: 14px;
            line-height: 25px;
            text-align: center;
            i{
                font-size: 18px;
                margin-right: 6px;
            }
            a{
                text-decoration: underline;
                cursor: pointer;
            }
        }
        tr{
            td:first-child{
                width: 120px;
            }
            td:nth-child(2){
                text-align: left;
            }
            td:last-child{
                text-align: right;
                padding-left: 30px;
                font-size: 20px;
                color: #E64545;
            }
        }
        img{
            width: 90px;
            height: 120px;
        }
    }
    .tbl-cell{
        display: table-cell;
    }
    .detailCon {
        width: 916px;
        margin: 0 auto;
        padding-top: 60px;
    }
    .review-con{
        .star{
            font-size: 20px;
            color: #E64545;
        }
    }
    .rating-con{
        div{
            float: left;
            font-size: 16px;
            margin-right: 30px;
            margin-bottom: 20px;
        }
        &:after{
            display: block;
            content: '';
            clear: both;
        }

        .radio-beauty-container {
            font-size: 0;
            $bgc: #E64545;
            %common {
                padding: 2px;
                background-color: $bgc;
                background-clip: content-box;
            }
            .radio-name {
                vertical-align: middle;
                font-size: 16px;
            }
            .radio-beauty {
                width: 18px;
                height: 18px;
                box-sizing: border-box;
                display: inline-block;
                border: 1px solid #cacaca;
                vertical-align: middle;
                margin: 0 10px 0 45px;
                border-radius: 50%;
                cursor: pointer;
            }
            input[type="radio"]:checked+.radio-beauty {
                @extend %common;
            }
        }
    }

    #review-measure-area{
        padding-bottom: 15px;
        & > table{
            width: 50%;
            & > tr{
                & > td{
                    vertical-align: middle;
                    padding: 10px;

                    ._title{
                        font-size: 14px;
                        color: #999999;
                    }

                    ._size{
                        font-size: 14px;
                        color: #222222;
                    }

                    ._input{
                        border:none;
                        border-bottom:1px solid #dddddd;
                        width:calc(50% - 25px);
                        text-align: center;
                    }
                }
            }
        }

        & > p{
            font-size: 16px;
            padding-bottom: 5px;
        }
    }

    .commet-area{
        width: 100%;
        height: 176px;
        position: relative;
        .remnant{
            position: absolute;
            right: 10px;
            bottom: 10px;
            z-index: 333;
            color: #666;
        }
        .t-area{
            position: relative;
            span{
                position: absolute;
                right: -90px;
                top: 0;
                color: red;
                font-size: 18px;
            }
            textarea{
                width: 100%;
                height: 176px;
                padding: 15px;
                border: 1px solid #cacaca;
                border-radius: 3px;
            }
        }

    }
    .uploadimg{
        margin: 20px 0 0 0;
        p{
            font-size: 16px;
        }
    }
    .v-btn{
        width: 240px;
        height: 40px;
        margin-top: 50px;
        background-color: #222222;
        border-radius: 2px;
        text-align: center;
        line-height: 40px;
        color: #fff;
        margin-bottom: 20px;
        cursor: pointer;
    }

    .upload-container{
        overflow:hidden;
        padding-top: 20px;
        .upload-img{
            float:left;
            width: fit-content;
            /*background-image: url("https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/promotion/1129/chicme-23.png");*/
            background-size:100%;
            position: relative;
            border: 1px dashed #999;
            input{
                display:inline-block;
                height:144px;
                width:144px;
                opacity: 0;
                position: relative;
                z-index: 99;
            }
            .addbtn{
                position: absolute;
                top: calc(50% - 25px);
                left: calc(50% - 8px);
                font-size: 34px;
                z-index: 0;
                color: #999;
            }
            .addnum{
                position: absolute;
                top: 70%;
                left: calc(50% - 10px);
                font-size: 12px;
                z-index: 0;
                color: #999;
            }
        }
        .uploadImage{
            position:relative;
            height:107.5px;
            width:88px;
            float:left;
            margin:5px;
            overflow: hidden;
            img{
                width:100%;
            }
            .removeImg{
                width:20px;
                line-height:20px;
                font-size: 21px;
                text-align: center;
                display: block;
                border-radius: 50%;
                background-color: #cccccc;
                color:#ffffff;
                position:absolute;
                top:6px;
                right:4px;
            }
        }
    }
</style>