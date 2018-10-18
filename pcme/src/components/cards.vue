<template>
    <div class="el-cards">
        <div class="el-card">
            <div class="el-card-info tbl" v-for="card in creditcards" :style="{'background-color': card.style && card.style.color ? card.style.color : '#fff'}">
                <div class="tbl-cell el-card-img">
                    <img :src="card.cardStyle && card.style.imageURL ? card.style.imageURL : 'https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/chicme/Credit+Card.png'">
                </div>
                <div class="tbl-cell">
                    <p class="el-card-name">{{card.style.name==='other' ? '' : card.style.name}}</p>
                    <p class="el-card-num">{{card.quickpayRecord.cardNumber}}</p>
                </div>
                <div class="tbl-cell el-card-del" @click="isAlert=true;cardId=card.quickpayRecord.id;cardMethod=card.quickpayRecord.payMethod">
                    <i class="iconfont">&#xe629;</i>
                </div>
            </div>
        </div>
        <div class="mask" v-if="isAlert">
            <div class="confirm-con">
                <p class="cancel-btn" @click="deleteCard(0)">X</p>
                <p>{{$t('removecard')}}</p>
                <div class="btn-arr">
                    <div class="n-btn" @click="deleteCard(0)">{{$t('no')}}</div>
                    <div class="y-btn" @click="deleteCard('1')">{{$t('yes')}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        data(){
            return{
                isAlert:false,
                cardId:'',
                cardMethod:'',
            }
        },
        computed: {
            ...mapGetters(['creditcards'])
        },
        created() {
            this.$store.dispatch('getCreditCards');
        },
        methods:{
            deleteCard(flag){
                this.isAlert = false;
                if(flag === '1'){
                    if(this.cardMethod === '19'){
                        this.$store.dispatch('deleteMercadoCard', {cardId:this.cardId}).then(()=>{
                            this.$store.dispatch('getCreditCards');
                        });
                    }else{
                        this.$store.dispatch('deleteCreditCard', {cardId:this.cardId}).then(()=>{
                            this.$store.dispatch('getCreditCards');
                        });
                    }
                }
            }
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
    .el-cards{
        .el-card{
            .el-card-info{
                width: 337px;
                border: 1px solid #e6e6e6;
                float: left;
                margin: 0 25px 25px 0;
                .el-card-img{
                    width: 60px;
                    padding: 15px 15px 15px 15px;
                }
                img{
                    width: 47px;
                    height: 47px;
                }
                .el-card-del{
                    width: 50px;
                    height: 100%;
                    background-color: #f9f9f9;
                    text-align: center;
                    cursor: pointer;
                    i{
                        &:hover{
                            opacity: .8;
                        }
                    }
                }
                &:after{
                    display:block;
                    clear: both;
                    content: '';
                }
            }
            .tbl{
                display: table;
                .tbl-cell{
                    display: table-cell;
                    vertical-align: middle;
                }
            }
        }
    }
    .mask{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.4);
        text-align: center;
        .confirm-con{
            width: 485px;
            height: 175px;
            margin:0 auto;
            position: relative;
            top: calc(50% - 82px);
            background-color: white;
            color: #222;
            font-size: 14px;
            padding: 20px;
            .cancel-btn{
                font-size: 18px;
                color: #666666;
                text-align: right;
                cursor: pointer;
                margin-bottom: 15px;
            }
            .btn-arr{
                padding-top: 25px;
                width: 355px;
                margin: 0 auto;
                .n-btn, .y-btn{
                    width: 170px;
                    line-height: 32px;
                    text-align: center;
                    color: #fff;
                    float: left;
                    cursor: pointer;
                }
                .n-btn{
                    background-color: #e5004f;
                }
                .y-btn{
                    background-color: #cacaca;
                    margin-left: 15px;
                }
                &:after{
                    display: block;
                    content: '';
                    clear: both;
                }
            }
        }
    }
</style>