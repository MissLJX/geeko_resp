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
                            <div class="sanjiao"></div>
                            <div class="txtcontent">{{item.message}}</div>
                        </div>
                        <div class="cet" v-if="item.imageUrls">
                            <div class="sanjiao"></div>
                            <div class="imgarea">
                                <img v-for="img in item.imageUrls" :src="imgUrl(img)">
                            </div>
                        </div>
                    </div>
                    <div class="buyer" v-if="item.sender === 'seller'">
                        <div class="el-me-headerImage fl" :style="{'background-image': 'url('+sellerheaderImage+'' }"></div>
                        <div class="cet fl">
                            <div class="sanjiao"></div>
                            <div class="txtcontent">{{item.message}}</div>
                        </div>
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
            <div class="sendbtn" @click="sendticket">{{$t('send')}}</div>
        </div>
    </div>
</template>

<script>
    import GeekoSelect from './geeko-select';
    import {mapGetters,mapActions } from 'vuex';
    import * as utils from '../utils/geekoutil';

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
                addticket:''
            }
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
                    .sanjiao {
                        position: absolute;
                        top: 15px;
                        transform: rotate(-45deg);
                        right: -6px;
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