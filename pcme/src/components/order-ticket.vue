<template>
    <div class="orderTicket" v-if="ticket">
        <div class="s-hd">
            <h3 @click="close"><i class="iconfont">&#xe693;</i>{{$t('ticket')}}</h3>
        </div>
        <div class="s-bd">
            <div class="orderInfo">
                <i @click="selectorder" class="iconfont">&#xe66b;</i>
                <p><span>{{$t('orderno')}} </span>{{ticket.id}}</p>
                <p><span>{{$t('timeofpayment')}} </span>{{getDate(ticket.paymentTime)}}</p>
            </div>
            <div class="help">
                <h3>{{$t('howcanwehelp')}}</h3>
                <select v-model="selected">
                    <option v-for="option in options" v-bind:value="option.value">
                        {{ option.text }}
                    </option>
                </select>
                <span>{{$t('Expectedtime')}}</span>
            </div>
        </div>
        <div class="s-cd" >
            <div v-if="ticket_con">
                <div v-for="item in ticket_con.ticketReplies">
                    <div class="buyer" v-if="item.sender === 'buyers'">
                        <div class="el-me-headerImage" :style="{'background-image': 'url('+headerImage+'),url('+baseHeaderUrl+')' }"></div>
                        <div class="cet" v-if="item.message!=='-'">
                            <div class="sanjiao-right"></div>
                            <div class="txtcontent">{{item.message}}</div>
                        </div>
                        <div class="cet" v-if="item.imageUrls">
                            <div class="sanjiao-right"></div>
                            <div class="imgarea">
                                <img v-for="img in item.imageUrls" :src="imgUrl(img)">
                            </div>
                        </div>
                    </div>
                    <div class="buyer" v-if="item.sender === 'seller'">
                        <div class="el-me-headerImage fl" :style="{'background-image': 'url('+sellerheaderImage+'' }" style="margin-right: 10px"></div>
                        <div class="cet fl">
                            <div class="sanjiao-left"></div>
                            <div class="txtcontent">
                                <p>{{item.message}}</p>
                                <div v-if="item.imageUrls">
                                    <img v-for="img in item.imageUrls" :src="imgUrl(img)">
                                </div>
                            </div>
                        </div>
                        <!--<div class="cet" v-if="item.imageUrls">
                            <div class="sanjiao-left"></div>
                            <div class="imgarea">
                                <img v-for="img in item.imageUrls" :src="imgUrl(img)">
                            </div>
                        </div>-->
                    </div>
                </div>
            </div>
        </div>
        <div class="s-sd">
            <textarea placeholder="Type a message..." v-model="msg"></textarea>
            <div class="upimg">
                <form ref="imageLoader">
                    <input @change="imghandle" name="imageFiles" multiple="" type="file" accept="image/jpg,image/jpeg,image/png,image/gif">
                </form>
            </div>
            <div class="rate-con">
                <div v-if="canBeRated" class="rate-tbl">
                    <i class="iconfont rate-cell">&#xe60d;</i>
                    <span class="rate-cell rate-click" @click="() => {this.showRater = true}">{{$t("rateMyService")}}</span>
                </div>
                <div class="rate-star" v-if="showRater">
                    <div class="rate-positive" >
                        <div class="rate-tit">{{$t("pleaserateMyService")}}</div>
                        <star-list id="stars" :score="rateData.rate" @star="starClickHandle"/>
                        <textarea v-model="rateData.message" style="resize:none;padding: 10px;height: 84px;" maxlength="500" :placeholder="$t('ratecontent')"></textarea>
                        <div class="rate-btn" @click="sendRateData">{{$t("confirm")}}</div>
                        <div class="rate-absolute"></div>
                    </div>

                </div>
            </div>
            <div class="sendbtn" @click="sendticket">{{$t('send')}}</div>
        </div>
    </div>
</template>

<script>
    import GeekoSelect from './geeko-select';
    import {mapGetters,mapActions } from 'vuex';
    import * as utils from '../utils/geekoutil';
    import StarList from '../components/star-list.vue';

    export default {
        data (){
            return{
                selected: '0',
                options: [
                    { text: this.$t('sizecolorpre'), value: '0' },
                    { text: this.$t('changeshippingaddress'), value: '2' },
                    { text: this.$t('shippingstatus'), value: '3' },
                    { text: this.$t('wrongitem'), value: '4' },
                    { text: this.$t('upgrade'), value: '5' },
                    { text: this.$t('returnorexchange'), value: '6' },
                    { text: this.$t('cancelorder'), value: '8' },
                    { text: this.$t('others'), value: '7' },
                ],
                msg:'',
                addticket:'',
                showRater:false,
                rateData: {
                    rate: 5,
                    message: '',
                    id: '',
                    reviewMsg:[]
                },
            }
        },
        components: {
            'star-list': StarList,
        },
        computed: {
            ...mapGetters(['ticket','ticket_con','ticketid']),
            baseHeaderUrl() {
                return 'https://dgzfssf1la12s.cloudfront.net/site/pc/icon35.png';
            },
            headerImage(){
                if(this.ticket_con.customerId){
                    return utils.imageutil.getHeaderImg(this.ticket_con.customerId)
                }
            },
            sellerheaderImage(){
                return 'https://dgzfssf1la12s.cloudfront.net/icon/support.jpg'
            },
            canBeRated(){
                if(this.ticket_con && this.ticket_con.canBeRated){
                    this.rateData.rate = this.ticket_con && this.ticket_con.ticketRateService ? this.ticket_con.ticketRateService.rate : 5;
                    this.rateData.message = this.ticket_con && this.ticket_con.ticketRateService ? this.ticket_con.ticketRateService.message : ''
                    this.rateData.id = this.ticket_con ? this.ticket_con.id: null
                }
                return this.ticket_con && this.ticket_con.canBeRated
            },
        },
        created() {
        },
        methods: {
            getDate(paymentTime){
                if(paymentTime == null){
                    return '-'
                }
                return utils.enTime(new Date(paymentTime))
            },
            imghandle(evt){
                var files = this.files;
                var formData = new FormData(this.$refs.imageLoader);
                formData.append("message", '-')
                formData.append("operaId",this.ticket_con.operaId)
                formData.append("subject",this.selected)

                this.$store.dispatch('addTicket', formData).then(() => {
                    this.$store.dispatch('getTicket',this.ticketid)
                    this.msg = ''
                }).catch(e => {
                    alert(e.result)
                })
            },
            close(){
                this.$emit('closeSelect');
            },
            selectorder(){
                this.$emit('selectOrder');
            },
            sendticket(){
                let formData = new FormData();
                if(!this.msg) {
                    return ''
                }else{
                    formData.append("message",this.msg)
                }

                if(this.ticket_con && this.ticket_con.operaId){
                    formData.append("operaId",this.ticket_con.operaId)
                }else{
                    formData.append("operaId",this.ticket.id)
                }

                formData.append("subject",this.selected)

                this.$store.dispatch('addTicket', formData).then(() => {
                    this.$store.dispatch('getTicket',this.ticketid)
                    this.msg = ''
                }).catch(e => {
                    alert(e.result)
                })
            },
            imgUrl(url){
                return 'https://dgzfssf1la12s.cloudfront.net/ticket/'+url
            },
            starClickHandle(data){
                this.rateData.rate = Number(data.star);
            },
            sendRateData(){
                var formData = new FormData();
                formData.append("rate", this.rateData.rate)
                formData.append("message",this.rateData.message)
                formData.append("id",this.rateData.id)
                formData.append("reviewMsg",this.rateData.reviewMsg)
                this.$store.dispatch('rate', formData).then(() => {
                    this.ticket_con.ticketRateService = this.rateData
                    this.showRater = false
                })
            }
        },
    };
</script>
<style scoped lang="scss">
    .orderTicket{
        width: 500px;
        position: fixed;
        right: 0;
        top: 0;
        border: 1px solid #cacaca;
        border-right: none;
        padding-top: 50px;
        z-index: 30000000;
        .s-hd{
            width: 100%;
            height: 50px;
            line-height: 50px;
            background-color: #efefef;
            text-align: left;
            padding-left: 25px;
            position: absolute;
            top: 0;
            h3{
                line-height: 50px;
                font-size: 18px;
            }
            i{
                margin-right: 20px;
                cursor: pointer;
                display: inline-block;
                transform: rotateY(180deg);
            }
        }
        .s-bd{
            background-color: #fff;
            text-align: left;
            color: #222;
            padding:24px 24px;
            position: relative;
            .orderInfo{
                height: 80px;
                border-bottom: 1px solid #e6e6e6;
                cursor: pointer;
                i{
                    position: absolute;
                    right: 20px;
                    top:35px;
                }
                p{
                    line-height: 30px;
                    span{
                        color: #999;
                    }
                }
            }
            .help{
                width: 100%;
                padding-top: 23px;
                text-align: center;
                h3{
                    text-align: center;
                }
                select{
                    width: 452px;
                    margin: 24px auto 9px auto;
                    height: 40px;
                    background-color: #ffffff;
                    border-radius: 2px;
                    border: solid 1px #cacaca;
                    padding-left: 10px;
                }
                span{
                    font-size: 14px;
                    color: #999;
                }
            }
        }
        .s-cd{
            width: 100%;
            height:  calc(100vh - 512px);
            overflow-y: auto;
            background-color: white;
            text-align: right;
            padding: 0 25px;
            .buyer{
                margin: 20px 0;
                .cet{
                   float: right;
                    position: relative;
                    padding: 15px 10px;
                    background-color: rgb(26, 149, 211);
                    border-radius: 4px;
                    color: #fff;
                    margin-right: 15px;
                    max-width: 300px;
                    .sanjiao-right {
                        position: absolute;
                        top: 15px;
                        transform: rotate(-45deg);
                        right: -6px;
                        width: 12px;
                        height: 12px;
                        background-color: rgb(26, 149, 211);
                    }
                    .sanjiao-left {
                        position: absolute;
                        top: 15px;
                        transform: rotate(-45deg);
                        left: -6px;
                        width: 12px;
                        height: 12px;
                        background-color: rgb(26, 149, 211);
                    }
                    .txtcontent{
                        text-align: left;
                    }
                    .imgarea{
                        max-width: 150px;
                        float: right;
                        img{
                            width: 100%;
                        }
                    }
                }
                .el-me-headerImage {
                    float: right;
                    width: 48px;
                    height: 48px;
                    background: no-repeat center/cover;
                    border-radius: 50%;
                }
                .fl{
                    float: left !important;
                }

                &:after{
                    display: block;
                    clear: both;
                    content: '';
                }
            }
        }
        .s-sd{
            width: 100%;
            padding: 0 25px;
            background-color: #fff;
            textarea{
                width: 100%;
                height: 120px;
                border: 1px solid #cacaca;
                resize: none;
                margin: 14px 0;
                padding: 15px;
            }
            .upimg{
                width: 50px;
                height: 40px;
                border-radius: 3px;
                border-width: 1px;
                border-style: solid;
                border-color: rgb(214, 214, 214);
                border-image: initial;
                background: url(https://dgzfssf1la12s.cloudfront.net/site/pc/icon61.png) center center / 60% no-repeat;
                float: left;
                input{
                    width: 40px;
                    height: 30px;
                    opacity: 0;
                    -webkit-appearance: none;
                    box-shadow: none;
                    outline: none;
                }
            }
            .rate-con{
                position: relative;
                .rate-tbl{
                    float: left;
                    line-height: 40px;
                    margin-left: 14px;
                    display: table;
                    color: #22aeec;
                    .rate-cell{
                        display: table-cell;
                    }
                    i{
                        font-size: 32px;
                    }
                    .rate-click{
                        position: relative;
                        top: -5px;
                        left: 5px;
                        cursor: pointer;
                        text-decoration: underline;
                    }
                }
                .rate-star{
                    position: absolute;
                    width: 304px;
                    height: 203px;
                    border: 1px solid #999;
                    bottom: 10px;
                    background-color: #fff;
                    z-index: 999;
                    padding: 10px 15px;
                    text-align: left;
                    .rate-tit{
                        font-size: 14px;
                        color: #222;
                    }
                    .rate-positive{
                        position: relative;
                    }
                    .rate-positive:after{
                        display: block;
                        clear: both;
                        content: '';
                    }
                    .rate-absolute{
                        width: 10px;
                        height: 10px;
                        position: absolute;
                        content: '';
                        border-right: 0;
                        border-top: 0;
                        border-bottom: 1px solid #999;
                        border-left: 1px solid #999;
                        transform:rotate(-45deg);
                        top: 187px;
                        left: 58px;
                        background-color: #fff;
                    }
                }
                .star-list{
                    margin-top: 5px;
                }
                .rate-btn{
                    height: 26px;
                    line-height: 26px;
                    background-color: #222222;
                    border-radius: 2px;
                    text-align: center;
                    color: #fff;
                    float: right;
                    padding: 0 25px;
                    cursor: pointer;
                }
/*                &:after{
                    display: block;
                    content: '';
                    clear: both;
                }*/
            }

            .sendbtn{
                float: right;
                width: 120px;
                line-height: 40px;
                background-color: #222222;
                border-radius: 2px;
                text-align: center;
                color: #fff;
                margin-bottom: 10px;
                cursor: pointer;
            }
            &:after{
                display: block;
                clear: both;
                content: '';
            }
        }
    }





</style>