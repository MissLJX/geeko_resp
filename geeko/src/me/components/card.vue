<template>
    <div class="el-card st-table" :style="{'background-color':bgColor}">
        <div class="el-card-info st-cell">
            <img :src="cardIconUrl">
        </div>
        <div class="el-card-num st-cell" :style="{'color':fontColor}">
            <span>{{cardName}}</span>
            <span>{{cardNumber}}</span>
        </div>
        <div class="el-card-del st-cell"  @click="deleteCard">
            <i class="iconfont">&#xe629;</i>
        </div>

        <div v-if="isShow">
            <div class="mask"></div>
            <div class="confirm-window">
                <p>{{$t('label.remove_credit_card')}}</p>
                <p :style="{'color':promptTextColor}">
                    <span @click="deleteHandle('0')">{{$t('label.no')}}</span>
                    <span @click="deleteHandle('1')">{{$t('label.yes')}}</span>
                </p>

            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "card",
        data(){
            return{
                isShow:false
            }
        },
        props: {
            quickpayRecord: {
                type: Object
            },
            cardStyle:{
                type: Object
            }
        },
        methods:{
            deleteCard(){
                this.isShow = true ;
            },
            deleteHandle(isTrue){
                this.isShow = false;
                if(isTrue === '1'){
                    let cardId = this.quickpayRecord.id
                    if(this.quickpayRecord.payMethod == '19'){
                        cardId = this.quickpayRecord.quickpayId
                    }
                    this.$emit('delete', cardId , this.quickpayRecord.payMethod)
                }
            }
        },
        computed:{
            cardIconUrl(){
                if(this.cardStyle){
                    return this.cardStyle.imageURL;
                }else{
                    return 'https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/chicme/Credit+Card.png'
                }
            },
            cardName(){
                if(this.cardStyle){
                    if(this.cardStyle.name && this.cardStyle.name !== 'other'){
                        return this.cardStyle.name;
                    }else{
                        return ''
                    }
                }else{
                    return ''
                }
            },
            cardNumber(){
                if(this.quickpayRecord){
                    return this.quickpayRecord.cardNumber;
                }
            },
            fontColor(){
                if(this.cardStyle){
                    return this.cardStyle.fontColor;
                }else{
                    return '#000'
                }
            },
            bgColor(){
                if(this.cardStyle) {
                    return this.cardStyle.color
                } else{
                    return '#fff'
                }
            },
            promptTextColor() {
                if (window.name === 'chicme') {
                    return '#e5004f';
                } else if (window.name === 'ivrose') {
                    return '#e9546b';
                } else {
                    return '#337ab7';
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    @font-face {
        font-family: 'iconfont';  /* project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_7lsehg5wzva.eot');
        src: url('//at.alicdn.com/t/font_384296_7lsehg5wzva.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_384296_7lsehg5wzva.woff') format('woff'),
        url('//at.alicdn.com/t/font_384296_7lsehg5wzva.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_384296_7lsehg5wzva.svg#iconfont') format('svg');
    }
    .iconfont{
        font-family:"iconfont" !important;
        font-size:16px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;}
    .st-cell{
        vertical-align: middle;
    }
    .el-card{
        width: 90%;
        margin: 0 auto;
        margin-top: 14px;
        padding-left: 10px;
        border: 1px solid #e6e6e6;
        .el-card-info{
            width: 20%;
            padding: 10px 0;
            img{
                width: 50px;
                height: 50px;
            }
        }
        .el-card-num{
            width: 65%;
            span{
                display: block;
                line-height: 24px;
            }
        }
        .el-card-del{
            text-align: center;
            background-color: #f9f9f9;
            i{
                color: #666;
            }
        }
    }
    .mask{
        background: rgba(0,0,0,.2);
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 10;
        position: fixed;
    }
    .confirm-window {
        width: 80%;
        max-width: 400px;
        position:fixed;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
        z-index:11;
        background-color: white;
        padding: 20px;
        p{
            width: 100%;
            &:last-child{
                text-align: right;
                color: #e9546b;
                margin-top: 30px;
                span{
                    margin-right: 20px;
                }
            }
        }
    }
</style>