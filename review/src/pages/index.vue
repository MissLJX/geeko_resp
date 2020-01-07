<template>
    <div class="reviewArea" id="reviewArea">
        <div class="reviewHeader">
            <div class="summary">
                <div class="scoreStar">
                    <span v-for="item in avgScore" v-if="commentSummary">
                        <i v-if="item===0" class="iconfont">&#xe76b;</i>
                        <i v-if="item===1" class="iconfont">&#xe768;</i>
                        <i v-if="item===2" class="iconfont">&#xe769;</i>
                    </span>
                    <span v-for="item in 5" v-if="!commentSummary">
                        <i class="iconfont">&#xe76b;</i>
                    </span>
                </div>
                <span v-if="commentSummary">{{reviewCount}} Reviews</span>
            </div>
            <div id="write" class="writeReviewBtn" @click="ifShowDialog = true">Write a review</div>
        </div>
        <div class="reviewTip" v-if="!commentSummary">Be the first to <span @click="ifShowDialog = true">write a review</span></div>
        <div class="reviewContent">
            <div class="reviewBox" v-for="i in commentsArrayLen" v-if="commentsArrayLen >= countFlag">
                <div class="reviewItem" v-for="j in Math.ceil(commentsArray.length / commentsArrayLen)" @click="quickView(i,j)" v-if="((j-1)*commentsArrayLen + i - 1) < commentsArray.length">
                    <div class="review_image" v-if="commentsArray[(j-1)*commentsArrayLen + i-1 ].images">
                        <img :src="getImage(commentsArray[(j-1)*commentsArrayLen + i-1 ].images[0])" />
                    </div>
                    <div style="padding: 10px">
                        <div class="review_name">{{commentsArray[(j-1)*commentsArrayLen + i-1 ].customerFirstName}} {{commentsArray[(j-1)*commentsArrayLen + i-1 ].customerLastName}}</div>
                        <div class="review_date">
                            {{getDate(commentsArray[(j-1)*commentsArrayLen + i-1 ].createDate)}}
                        </div>
                        <div class="review_score">
                        <span v-for="i in commentsArray[(j-1)*commentsArrayLen + i-1 ].score">
                            <i class="iconfont">&#xe768;</i>
                        </span>
                        <span v-for="i in (5- commentsArray[(j-1)*commentsArrayLen + i-1 ].score)">
                            <i class="iconfont" style="position: relative;left: -4px;">&#xe76b;</i>
                        </span>
                        </div>
                        <div class="review_content">{{commentsArray[(j-1)*commentsArrayLen + i-1 ].content}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="reviewQuick" v-show="isQuickView && quickViewReview">
            <div class="reviewQuickContent">
                <div class="quickImage" v-if="quickViewReview.images">
                    <img :src="getImage(quickViewReview.images[0])" />
                </div>
                <div class="quickBox">
                    <div class="review_name">{{quickViewReview.customerFirstName}} {{quickViewReview.customerLastName}}</div>
                    <div class="review_date">
                        {{getDate(quickViewReview.createDate)}}
                    </div>
                    <div class="review_score">
                        <span v-for="i in quickViewReview.score">
                            <i class="iconfont">&#xe768;</i>
                        </span>
                    </div>
                    <div class="review_content">{{quickViewReview.content}}</div>
                </div>
                <div class="close-btn" @click="isQuickView=false">✕</div>
            </div>
        </div>
        <div class="reviewDialog" v-show="ifShowDialog">
            <div class="dialogContent">
                <div class="wizard">
                    <div class="loading" v-if="isLoading"><i class="iconfont icon-spin">&#xe62d;</i></div>
                    <div class="slide rate-item" :style="{top: positionHeight + 'px'}">
                        <h3>How would you rate this item?</h3>
                        <div class="button" v-for="(btn,index) in buttonArr" @click="chooseScore(index)" :class="{chooseButton: btn.checked}">
                            <span class="star">
                                <i class="iconfont" v-for="i in btn.star1">&#xe768;</i>
                                <i class="iconfont" v-for="i in (5 - btn.star1)">&#xe76b;</i>
                            </span>
                            <span class="text">{{btn.description}}</span>
                        </div>
                        <div class="closeDialog" @click="ifShowDialog = false">×</div>
                    </div>
                    <div class="slide image-upload" :style="{top: (positionHeight + 500) + 'px'}">
                        <h2>SHOW IT OFF</h2>
                        <h3>We'd love to see it in action!</h3>
                        <div class="upload-img">
                            <div class="button">
                                <span>choose photo</span>
                                <form ref="imageLoader">
                                    <input type="file" name="imageFiles" multiple="multiple" @change="uploadImg" accept="image/jpg,image/jpeg,image/png,image/gif">
                                </form>
                            </div>
                        </div>

                        <div class="progressor"><div class="full" style="width: 50%;"></div><div class="text"></div></div>
                        <div class="back" @click="positionHeight = positionHeight + 500 ">Back</div>
                        <div class="skip" @click="positionHeight = positionHeight - 500 ">Skip</div>
                    </div>
                    <div class="slide textual-review" :style="{top: (positionHeight + 1000) + 'px'}">
                        <h2>Tell us more!</h2>
                        <div style="padding:0 50px 0 30px;">
                            <textarea id="review" placeholder="Share your experience" class="review-text" :class="{redBorder:redBorder}" v-model="content" @input="redBorder = false" required></textarea>
                            <div @click="content ? positionHeight = positionHeight - 500 : redBorder = true" class="button">Next</div>
                        </div>
                        <div class="progressor"><div class="full" style="width: 75%;"></div><div class="text"></div></div>
                        <div class="back" @click="positionHeight = positionHeight + 500 ">Back</div>
                    </div>
                    <div class="slide personal-details" :style="{top: (positionHeight + 1500) + 'px'}">
                        <h2>about you</h2>
                        <div style="margin:0 auto;max-width:400px;">
                            <div style="width:45%;margin-right:5%;" class="field-wrap float">
                                <input type="text" id="first_name" placeholder="First name *" v-model="firstName" :class="{redBorder:hasFirstName}" required>
                            </div>
                            <div style="width:50%;" class="field-wrap float">
                                <input type="text" id="last_name" placeholder="Last name" v-model="lastName">
                            </div>
                        </div>
                        <div class="field-wrap">
                            <input type="email" id="email" placeholder="Email *" v-model="email" :class="{redBorder:hasEmail}" required>
                        </div>
                        <div class="legal">By submitting, I know my review will be publicly posted and shared online.</div>
                        <div @click="addCommentHandle" class="button submit-review">Done</div>
                        <div class="back" @click="positionHeight = positionHeight + 500 ">Back</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="es6">
    import store from '../store/index.js'
    import * as utils from '../util/util.js';
    import md5 from 'js-md5';

    export default {
        name: 'index',
        components: {
        },
        data(){
            return {
                commentData : '',
                countFlag:5,
                isChoose:false,
                ifShowDialog:false,
                redBorder:false,
                hasFirstName:false,
                hasEmail:false,
                score:5,
                content:'',
                file:'',
                firstName:'',
                lastName:'',
                email:'',
                productId:window.currProductId,
                webServer:window.webServer,
                isLoading:false,
                /*productId:'4252404973603',
                webServer:'viviangela',*/
                time:'',
                isQuickView:false,
                quickViewReview:'',
                buttonArr:[
                    {
                        star1:5,
                        checked:false,
                        description:'Love it!'
                    },
                    {
                        star1:4,
                        checked:false,
                        description:'Like it'
                    },
                    {
                        star1:3,
                        checked:false,
                        description:'It\'s okay'
                    },
                    {
                        star1:2,
                        checked:false,
                        description:'Didn\'t like it'
                    },
                    {
                        star1:1,
                        checked:false,
                        description:'Hate it'
                    }
                ],
                positionHeight:0
            }
        },
        computed: {
            commentSummary(){
                return this.commentData.commentSummary //Object
            },
            commentsArray(){
                return this.commentData.comments //Array
            },
            commentsArrayLen(){
                if(this.commentData){
                    let len = this.commentData.length < 5 ? this.commentData.length : 5;
                    let sUserAgent = navigator.userAgent;
                    if (sUserAgent.indexOf('Android') > -1 || sUserAgent.indexOf('iPhone') > -1 || sUserAgent.indexOf('iPad') > -1 || sUserAgent.indexOf('iPod') > -1 || sUserAgent.indexOf('Symbian') > -1) {
                        len = this.commentData.length < 2 ? this.commentData.length : 2;
                        this.countFlag = 2
                    }
                    return len
                }
            },
            reviewCount(){
                if(this.commentSummary){
                    let _count = this.commentSummary.score1 + this.commentSummary.score2 + this.commentSummary.score3 + this.commentSummary.score4 + this.commentSummary.score5
                    return _count
                }
            },
            avgScore(){
                if(this.commentSummary){
                    let scoreCount = this.commentSummary.score1 + this.commentSummary.score2 + this.commentSummary.score3 + this.commentSummary.score4 + this.commentSummary.score5
                    let avgCount = (this.commentSummary.score1 *1 + this.commentSummary.score2 *2 + this.commentSummary.score3*3 + this.commentSummary.score4*4 + this.commentSummary.score5*5)/scoreCount
                    let hasDecimal= avgCount % 1 !== 0;  //是否有效数
                    let arr = []; //0：空星 1：全星 2：半星
                    for(let i = 1; i < avgCount ; i++){
                        arr.push(1)
                    }

                    if(hasDecimal){
                        arr.push(2)
                    }else{
                        arr.push(1)
                    }

                    for(let i = avgCount; i < 4 ; i++){
                        arr.push(0)
                    }
                    return arr
                }
            },
            currTime(){
                return utils.enTime(new Date())
            },
            getMD5(){
                this.time = this.currTime
                let currMD5  = md5(this.webServer + this.time)
                return currMD5
            }
        },
        methods:{
            chooseScore:function(index) {
                this.positionHeight = this.positionHeight -500;
                for(let i in this.buttonArr){
                    if( i == index){
                        this.buttonArr[i].checked = true
                    }else{
                        this.buttonArr[i].checked = false
                    }
                };
                this.score = (5 - index);
            },
            getDate(time){
                if(time == null){
                    return ''
                }
                return utils.enDateReview(new Date(time))
            },
            getImage(img){
                return this.commentData.cdnImageServer +'/'+ img
            },
            uploadImg(event) {
                this.file = event.target.files[0];
                this.positionHeight = this.positionHeight - 500;
            },
            addCommentHandle(){
                if(this.firstName && this.email){
                    this.isLoading = true;
                    let authorization = this.getMD5;
                    let formData = new FormData();
                    formData.append('productId', this.productId);
                    formData.append('webServer', this.webServer);
                    formData.append('time', this.time);
                    formData.append('content', this.content);
                    formData.append('score', this.score);
                    formData.append('customerFirstName', this.firstName);
                    if(this.lastName){
                        formData.append('customerLastName', this.lastName);
                    }
                    formData.append('customerEmail', this.email);
                    if(this.file){
                        formData.append("imageFiles", this.file, this.file.name);
                    }
                    store.dispatch('sendComment', {reply:formData,authorization}).then(() => {
                        this.isLoading = false;
                        this.ifShowDialog = false;
                        this.positionHeight = 0;
                        store.dispatch('loadComment', {id:this.productId,server:this.webServer}).then((data)=>{
                            this.commentData  = store.getters.comment.result
                        });
                    }).catch((e) => {
                        this.isLoading = false;
                        alert(e);
                    });
                }else{
                    if(!this.firstName){
                        this.hasFirstName = true
                    }
                    if(!this.hasEmail){
                        this.hasEmail = true
                    }
                }
            },
            quickView(i,j){
                this.isQuickView = true;
                this.quickViewReview = this.commentsArray[i+j*5-6];
            },
        },
        created() {
            console.log("产品id："+window.currProductId)
            store.dispatch('loadComment', {id:this.productId,server:this.webServer}).then((data)=>{
                this.commentData  = store.getters.comment.result
            });
        },
    };
</script>

<style scoped lang="scss">
    $theme-color: #e64545;
    $font-color-normal: #fff;
    @import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
    @font-face {
        font-family: 'iconfont';  /* project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_x3rno5bpky.eot');
        src: url('//at.alicdn.com/t/font_384296_x3rno5bpky.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_384296_x3rno5bpky.woff2') format('woff2'),
        url('//at.alicdn.com/t/font_384296_x3rno5bpky.woff') format('woff'),
        url('//at.alicdn.com/t/font_384296_x3rno5bpky.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_384296_x3rno5bpky.svg#iconfont') format('svg');
    }
    .iconfont{
        font-family:"iconfont" !important;
        font-size:16px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }
    body{
        font-family: "Open Sans", sans-serif;
    }

    .reviewArea{
        font-family: "Open Sans", sans-serif;
        max-width: 1200px;
        margin: 0 auto;
    }
    .reviewHeader{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: solid 1px #DEDEDE;
        margin: 20px auto 7px;
        padding: 0 7px 7px;
        position: relative;
        .summary{
            .scoreStar{
                display: inline-block;
            }
            i{
                font-size: 22px;
                color: $theme-color;
            }
        }
        .writeReviewBtn{
            padding: 4px 12px;
            font-size: 16px;
            color: #222;
            display: inline-block;
            cursor: pointer;
            border-radius: 2px;
            border: solid 1px #222;
            background: transparent;
            transition-duration: 0.2s;
            transition-timing-function: ease-in-out;
        }
        .writeReviewBtn:focus, .writeReviewBtn:hover {
            background:$theme-color;
            color:$font-color-normal;
            outline:0;
            border: solid 1px $theme-color;
        }
    }
    .reviewTip{
        text-align: center;
        padding-top: 30px;
        padding-bottom: 30px;
        span{
            text-decoration: underline;
            cursor: pointer;
        }
    }
    .reviewContent{
        display: flex;
        flex-direction: row;
        .reviewBox{
            display: flex;
            flex-direction: column;
            width: calc(100% / 5);
            .reviewItem{
                word-break: break-all;
                overflow: hidden;
                white-space: initial;
                box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
                background: #fff;
                margin: 7px;
                font-size: 16px;
                cursor: pointer;
                &:hover{
                    background-color: rgba(0, 0, 0, 0.1);
                }
                .review_name{
                    font-weight: bold;
                    font-size: 16px;
                }
                .review_date{
                    color: #a3a3a3;
                    font-size: 11px;
                    padding: 5px 0 0;
                    height: 20px;
                    display: none;
                }
                .review_score{
                    padding: 5px 0 0;
                    height: 25px;
                    color: $theme-color;
                    i{
                        font-size: 13px;
                    }
                }
                .review_image{
                    img{
                        display: block;
                        width: 100%;
                        max-width: 100%;
                        margin: 0 auto;
                        position: relative;
                        max-height:300px;
                        cursor: zoom-in;
                    }
                }
                .review_content{
                    padding: 5px 0;
                    font-size: 14px;
                }
            }
        }
    }
    .reviewDialog{
        width: 100%;
        height: 100%;
        position: fixed;
        font-family: Arial, Helvetica, sans-serif;
        inset: 0px;
        z-index: 214;
        opacity: 1;
        transition: opacity 400ms ease-in 0s;
        overflow-y: scroll;
        background: rgba(238, 238, 238, 0.9);
        overflow: hidden;
        top:0;
        left: 0;
        .dialogContent{
            position: relative;
            min-height: 100%;
            max-width: 900px;
            margin: 5% auto 0;
            .wizard{
                height: 500px;
                width: 100%;
                max-width: 900px;
                margin: 0 auto;
                position: relative;
                overflow: hidden;
                background-color: #fff;
                border: solid 1px #a2a2a2;
                border-radius: 2px;
                font-family: "Open Sans", sans-serif;
                .loading{
                    width: 100%;
                    height: 500px;
                    background-color: rgba(238, 238, 238, 0.4);
                    z-index: 344;
                    position: absolute;
                    text-align: center;
                    line-height: 500px;
                    @keyframes rotate {
                        0% {
                            -webkit-transform: rotate(0deg);
                            transform: rotate(0deg);
                        }
                        100% {
                            -webkit-transform: rotate(359deg);
                            transform: rotate(359deg);
                        }
                    }
                    i{
                        font-size: 35px;
                        display: block;
                        color: #999;
                        -webkit-animation: rotate 2.5s 0s linear infinite;
                        animation: rotate 2.5s 0s linear infinite;
                    }
                }
                .slide{
                    display: none;
                    position: absolute;
                    width: 100%;
                    transition-property: top, opacity;
                    transition-duration: 0.5s;
                    transition-timing-function: ease-in-out;
                    background-color: #fff;
                }
                .rate-item{
                    height: 500px;
                    display: block;
                    opacity: 1;
                    h3{
                        font-size: 24px;
                        color: #1C1C1C;
                        font-weight: bold;
                        text-align: center;
                        max-width: 500px;
                        text-transform: uppercase;
                        margin: 50px auto 10px;
                    }
                    .button{
                        max-width: 400px;
                        margin: 15px auto 0;
                        display: block;
                        text-align: center;
                        width: 100%;
                        border: solid 1px #222;
                        color: #222;
                        background: transparent;
                        border-radius: 2px;
                        transition-property: background, color;
                        transition-duration: 0.2s;
                        transition-timing-function: ease-in-out;
                        padding:5px;
                        cursor: pointer;
                        &:hover,&:focus{
                            background:$theme-color;
                            color:$font-color-normal;
                            outline:0;
                            border: solid 1px $theme-color;
                            span.star{
                                color: #fff;
                            }
                        }
                        span{
                            display: inline-block;
                            text-align: left;
                        }
                        span.star{
                            line-height: 36px;
                            font-size: 12px;
                            width: 110px;
                            color: $theme-color;
                        }
                        span.text{
                            width: 140px;
                            font-size: 18px;
                        }
                    }
                    .chooseButton{
                        background:$theme-color;
                        color:$font-color-normal;
                        border: solid 1px $theme-color;
                        outline:0;
                        span.star{
                            color: #fff;
                        }
                    }
                }
                .image-upload{
                    height: 500px;
                    display: block;
                    padding-top: 20px;
                    text-transform: uppercase;
                    h2{
                        text-align: center;
                        color: #222;
                    }
                    h3{
                        color:#888;
                        text-align: center;
                        letter-spacing: 1.2px;
                        font-weight: 200;
                    }
                    .upload-img{
                        .button{
                            position: relative;
                        }
                        form{
                            position: absolute;
                            width: 100%;
                            max-width:400px;
                            top: 0;
                            left: 0;
                        }
                        input{
                            display:inline-block;
                            width: 100%;
                            opacity: 0;
                            z-index: 99;
                            padding: 5px;
                        }
                    }
                }
                .textual-review{
                    height: 500px;
                    display: block;
                    padding-top: 20px;
                    text-transform: uppercase;
                    h2{
                        text-align: center;
                        color: #222;
                    }
                    @media only screen and (min-width: 680px){
                        .review-text {
                            height: 255px;
                        }
                    }
                    .review-text {
                        height: 200px;
                        width: 100%;
                        font-size: 18px;
                        border: solid 1px #282828;
                        padding: 10px;
                        outline: 0;
                    }
                    textarea {
                        overflow: auto;
                        font-family: "Open Sans", sans-serif;
                    }
                }
                .personal-details{
                    height: 500px;
                    display: block;
                    padding-top: 20px;
                    text-transform: uppercase;
                    h2{
                        text-align: center;
                        color: #222;
                    }
                    .field-wrap{
                        padding: 0 0 20px;
                        max-width: 400px;
                        margin: 15px auto;
                        input{
                            padding: 10px 0 10px 10px;
                            font-size: 20px;
                            width: 100%;
                            display: block;
                            border: solid 1px #c1c1c1;
                        }
                    }
                    .legal {
                        max-width: 400px;
                        margin: 12px auto 0;
                        text-align: center;
                        font-size: 13px;
                        color: #999;
                        text-transform: capitalize;
                    }
                    .float {
                        float: left;
                        clear: none;
                    }
                }
                .closeDialog{
                    background: #606061;
                    color: #FFFFFF;
                    line-height: 25px;
                    position: absolute;
                    right: 10px;
                    text-align: center;
                    top: 10px;
                    width: 24px;
                    text-decoration: none;
                    font-weight: bold;
                    -webkit-border-radius: 12px;
                    -moz-border-radius: 12px;
                    border-radius: 12px;
                    -moz-box-shadow: 1px 1px 3px #000;
                    -webkit-box-shadow: 1px 1px 3px #000;
                    box-shadow: 1px 1px 3px #000;
                    cursor: pointer;
                }
            }
        }
        .progressor{
            position: absolute;
            border: solid 1px #282828;
            bottom: 60px;
            left: 45%;
            width: 10%;
            height: 25px;
            margin: 0 auto;
            text-align: center;
            .full{
                position: absolute;
                width: 0;
                height: 100%;
                background-color: #282828;
            }
            .text{
                color: #000;
                position: relative;
            }
        }
        .back{
            position: absolute;
            bottom: 35px;
            left: 30px;
            text-transform: capitalize;
            cursor: pointer;
        }
        .skip{
            position: absolute;
            bottom: 35px;
            right: 30px;
            text-transform: capitalize;
            cursor: pointer;
        }
        .button {
            max-width: 400px;
            margin: 15px auto 0;
            display: block;
            text-align: center;
            width: 100%;
            border: solid 1px #222;
            color: #222;
            background: transparent;
            border-radius: 2px;
            transition-property: background, color;
            transition-duration: 0.2s;
            transition-timing-function: ease-in-out;
            padding: 5px;
            cursor: pointer;
            text-transform: capitalize;
            font-size: 22px;
            letter-spacing: 1px;

            &:hover, &:focus {
                background: $theme-color;
                color: $font-color-normal;
                border: solid 1px $theme-color;
                outline: 0;
            }
        }
        .redBorder{
            border-color:#E64545 !important;
        }
    }
    .reviewQuick{
        width: 100%;
        height: 100%;
        position: fixed;
        font-family: Arial, Helvetica, sans-serif;
        inset: 0px;
        z-index: 2147483647;
        opacity: 1;
        transition: opacity 400ms ease-in 0s;
        overflow-y: scroll;
        background: rgba(238, 238, 238, 0.9);
        .reviewQuickContent{
            position: relative;
            margin: 30px auto 0;
            height: 100%;
            max-width: 900px;
            padding: 2% 2% 0 2%;
            display: flex;
            justify-content: center;
            .quickImage{
                width: 58%;
                margin: 1%;
                img{
                    width: 100%;
                }
            }
            .quickBox{
                width: 38%;
                background: #fff;
                padding: 20px;
                box-shadow: 0 0 15px 0 #ccc;
                position: relative;
                height: fit-content;
                margin: 1%;
                .review_name{
                    font-weight: bold;
                    font-size: 16px;
                }
                .review_date{
                    color: #a3a3a3;
                    font-size: 11px;
                    padding: 5px 0 0;
                    height: 20px;
                }
                .review_score{
                    padding: 5px 0 0;
                    height: 25px;
                    color: $theme-color;
                    i{
                        font-size: 12px;
                    }
                }
            }
            .close-btn{
                position: absolute;
                top: -4px;
                right: 38px;
                line-height: 30px;
                text-align: center;
                font-size: 30px;
                cursor: pointer;
            }
        }
    }
    @media (min-width: 645px){
        .close-btn {
            top: -15px;
            right: 25px;
        }
    }
    @media (min-width: 620px){
        .reviewQuickContent{
            margin-top: 30px;
            margin-bottom: 30px;
        }
    }
    @media only screen and (max-width: 500px) {
        .reviewHeader .summary i{
            font-size: 19px;
        }
        .reviewHeader .writeReviewBtn{
            font-size: 9px;
        }
        .reviewBox{
            width: calc(100% / 2) !important;
        }
        .reviewDialog .dialogContent .wizard .rate-item .button{
            max-width:340px !important;
        }
        .reviewDialog .dialogContent .wizard .rate-item h3{
            font-size: 18px !important;
        }
        .reviewQuickContent{
            display: block !important;
            padding: 5% !important;
            .quickImage{
                width: 100% !important;
            }
            .quickBox{
                width: 88% !important;
            }
        }
        .reviewDialog .dialogContent .wizard .image-upload .upload-img .button{
            width: 90% !important;
        }
    }
</style>