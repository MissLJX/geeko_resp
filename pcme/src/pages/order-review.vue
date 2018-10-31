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

            <div class="commet-area">
                <span class="remnant">{{remnant1}}/1000</span>
                <div class="t-area">
                    <textarea v-model="comment.content" style="resize:none;" maxlength="1000" ></textarea>
                </div>
            </div>

            <!--<div class="uploadimg">
                <p>Upload Photo:</p>
                <upload-img @getImgFiles="getImgFiles"></upload-img>
            </div>-->

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
                files:null,
                fits: [
                    {label: 'Too Small', value: '3'},
                    {label: 'Good Fit', value: '2'},
                    {label: 'Too Large', value: '1'}
                ],
                isconfirm:false,
                isissatisfy:true,
                alertMess:'',
                isempty:false,
            }
        },
        components: {
            'link-image': LinkImage,
            'star-list': StarList,
            'upload-img':uploadImg,
            'comment-alert':CommentAlert,
            'loding':loding
        },
        computed:{
            ...mapGetters(['orderdetail','comment']),
            remnant1(){
                if(this.comment && this.comment.content){
                    return this.comment.content.length
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
                    let formData = new FormData();
                    formData.append('content', this.comment.content);
                    formData.append('id', this.comment.id);
                    formData.append('productId', this.orderpro.productId);
                    formData.append('score', this.comment.score);
                    formData.append('sizingRecommendation', this.comment.sizingRecommendation);


                    if(!!!_this.comment.productId)
                        _this.comment.productId = this.orderpro.productId

                    _this.$store.dispatch('sendComment', {reply:formData, files}).then(() => {
                        this.isloding = false
                        alert("Success!");
                        this.$router.go(-1);
                    }).catch((e) => {
                        alert(e);
                        this.isloding = false
                    });
                }else{
                    _this.isempty=true;
                }
            },
            backOrderPage(){
                this.$router.go(-1);
            },
        },
        created(){
            this.$store.dispatch('getOrder',this.$route.query.orderid).then(()=>{
                this.order = this.orderdetail.order
                if(this.order && this.orderdetail.order.orderItems){
                    this.orderdetail.order.orderItems.forEach(item =>{
                        if(item.productId === this.$route.query.productid){
                            this.orderpro = item
                        }
                    })
                }
                this.shipping = this.orderdetail.order.shippingDetail
                this.shippingstate = this.orderdetail.order.shippingDetail.state
                this.shippingcountry =this.orderdetail.order.shippingDetail.country
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
        border: 1px solid #cacaca;
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
</style>