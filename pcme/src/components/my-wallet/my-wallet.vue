<template>
    <div class="myWalletPage">
        <div class="pageTitle">{{$t("my_wallet.my_wallet")}}</div>

        <div class="creditBox">
            <div class="creditTitle">
                <span class="iconfont">&#xe6dd;</span>
                <span class="titleContent">{{$t("my_wallet.wallet_credit")}}</span>
                <a class="walletRule" href="/policy/wallet-policy">{{$t("my_wallet.whats_this")}}?</a>
            </div>
            <div class="creditContent">
                <div>{{$t("total")}}</div>
                <div class="creditNum">{{walletNum}}</div>
                <div class="creditTip">{{$t("my_wallet.only_apply",{website:websiteName})}}</div>
            </div>
        </div>

        <div class="historyBox">
            <div class="creditTitle">
                <img class="iconImg" src="https://image.geeko.ltd/chicme/20220801/PC-wallet-list.svg" alt="">
                <span class="titleContent">{{$t("my_wallet.wallet_history")}}</span>
            </div>
            <div class="historyTypeBox">
                <div :class="{'historyType':true, 'historyTypeSelected':seletedHistoryType == 'all' }" @click="typeChange('all')">{{$t("my_wallet.wallet_all")}}</div>
                <div :class="{'historyType':true, 'historyTypeSelected':seletedHistoryType == 'recived' }" @click="typeChange('recived')">{{$t("my_wallet.wallet_earned")}}</div>
                <div :class="{'historyType':true, 'historyTypeSelected':seletedHistoryType == 'used' }" @click="typeChange('used')">{{$t("my_wallet.wallet_used")}}</div>
                <div :class="{'historyType':true, 'historyTypeSelected':seletedHistoryType == 'expired' }" @click="typeChange('expired')">{{$t("my_wallet.wallet_expired")}}</div>
            </div>

            <div class="tableBox">
                <table>
                    <tr class="tableHeader">
                        <th>{{$t("my_wallet.date_and_time")}}</th>
                        <th>{{$t("my_wallet.type")}}</th>
                        <th>{{$t("my_wallet.amount")}}</th>
                        <th>{{$t("my_wallet.expiration_date")}}</th>
                    </tr>
                    <tr class="tableLine" v-for="(item, index) in cashHistory" :key="index">
                        <td>{{getTime(item.createTime)}}</td>
                        <td>    
                            <div>{{item.name}}</div>
                            <div class="status" v-if="item.targetId">{{$t("my_wallet.order")}} # {{item.targetId}}</div>
                            <div class="status" v-if="!item.targetId && item.expired">{{$t("my_wallet.wallet_expired")}}</div>
                            <div class="status" v-if="!item.targetId && !item.expired && item.expiredDate">{{$t("my_wallet.expired_on")}} {{getTime(item.expiredDate)}}</div>
                            <div class="status" v-if="!item.targetId && !item.expired && !item.expiredDate">{{$t("my_wallet.wallet_earned")}}</div>
                        </td>
                        <td>
                            <span :class="{'loseCash':item.positive}">
                                <span v-if="item.positive">+</span>
                                <span v-if="!item.positive">-</span>
                                {{getMoney(item.amount || 0)}}
                            </span>
                            
                        </td>
                        <td>
                            {{getTime(item.expiredDate)}}
                        </td>
                    </tr>
                </table>
                
            </div>
        </div>

    </div>
</template>

<script>
import * as utils from "../../utils/geekoutil"
import {mapGetters} from 'vuex'
import {getUserCash} from '../../api/index'

export default {
    data(){
        return {
            seletedHistoryType: 'all',
            loading: false,
            finished: false,
            skip: 0,
            limit: 20,
            userWallet: '',
            data: [],
        }
    },
    computed:{
         ...mapGetters(['cashHistory','cashFinished']),
         walletNum(){
            if(this.userWallet){
                return this.getMoney(this.userWallet)
            }
            return '0.00'
         },
         websiteName(){
            return this.GLOBAL.sitename || 'ChicMe';
        },
    },
    activated(){
        window.addEventListener('scroll', this.scrollHandle)
        this.$store.dispatch("clearCashHistory").then(res => {
            this.getCashHistoryByType(this.seletedHistoryType)
        })
        getUserCash().then(res => {
            if(res && res.code == 200){
                this.userWallet = res.result
            }
        }).catch(err => {
            alert(err.result || err)
        })
    },
    deactivated(){
        this.$store.dispatch("clearCashHistory")
        window.removeEventListener('scroll', this.scrollHandle)
    },
    methods:{
        typeChange(type){
            this.skip = 0;
            this.seletedHistoryType = type
            this.$store.dispatch("clearCashHistory").then(res => {
                this.getCashHistoryByType(type)
            })
        },
        getCashHistoryByType(type){
            if(!this.loading){
                this.loading = true
                this.$store.dispatch("getCashHistoryData",{skip: this.skip, limit:this.limit, type}).then(res => {
                    // console.log(res)
                    this.loading = false
                    if(res && res.code){
                        this.data = res.result
                        this.skip += 20
                    }
                }).catch(err => {
                    alert(err.result || err)
                    this.loading = false
                })
            }
        },
        scrollHandle(evt){
            evt.preventDefault()
            let [scrollTop, documentHeight, windowHeight] = [
                document.documentElement.scrollTop || document.body.scrollTop,
                document.body.clientHeight,
                window.screen.height
            ]


            if (scrollTop + windowHeight >= documentHeight - 100) {
                if (!this.loading && !this.cashFinished) {
                    this.getCashHistoryByType(this.seletedHistoryType)
                }
            }
        },
        getTime(date){
            return date ? utils.dateFormatFunc(date) : '-'
        },
        getMoney(money){
            return money ? utils.unitprice(money) : '0.00'
        }
    }
}
</script>

<style lang="scss" scoped>
    .myWalletPage{

        .pageTitle{
            text-align: center;
            font-family: 'ACUMINPRO-BOLD';
            font-size: 24px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #222222;
            margin-bottom: 20px;
        }

        .creditTitle{
            display: flex;
            align-items: center;
            justify-content: flex-start;

            .iconfont{
                font-size: 20px;
                line-height: 17px;
                color: #000;
            }

            .iconImg{
                width: 20px;
                height: 17px;
            }

            .titleContent{
                font-size: 16px;
                font-family: Roboto-Bold, Roboto;
                font-weight: bold;
                color: #222222;
                line-height: 19px;
                margin-left: 10px;
            }

            .walletRule{
                font-size: 12px;
                font-family: Roboto-Regular, Roboto;
                font-weight: 400;
                color: #2D68A8;
                line-height: 14px;
                margin-top: 3px;
                margin-left: 4px;
                text-decoration: underline;
            }
        }

        .creditBox{
            margin-top: 44px;

            .creditContent{
                width: 889px;
                height: 130px;
                background: #F7F7F7;
                text-align: center;
                margin-top: 22px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-direction: column;
                font-size: 14px;
                font-family: Roboto-Regular, Roboto;
                font-weight: 400;
                color: #222222;
                line-height: 16px;
                padding: 17px 0;

                .creditNum{
                    font-size: 30px;
                    font-family: Roboto-Bold, Roboto;
                    font-weight: bold;
                    color: #222222;
                    line-height: 35px;
                }

                .creditTip{
                    font-size: 12px;
                    font-family: Roboto-Regular, Roboto;
                    font-weight: 400;
                    color: #BBBBBB;
                    line-height: 14px;
                }
            }
        }

        .historyBox{
            margin-top: 34px;

            .historyTypeBox{
                display: flex;
                align-items: center;
                justify-content: flex-start;
                margin-top: 23px;

                .historyType{
                    font-size: 14px;
                    font-family: Roboto-Regular, Roboto;
                    font-weight: 400;
                    color: #222222;
                    line-height: 16px;
                    display: block;
                    margin-right: 64px;
                    border-bottom: 2px solid transparent;
                    padding-bottom: 2px;
                    text-transform: capitalize;
                    cursor: pointer;
                }

                .historyTypeSelected{
                    font-size: 14px;
                    font-family: Roboto-Bold, Roboto;
                    font-weight: bold;
                    color: #222222;
                    line-height: 16px;
                    border-bottom: 2px solid #222;
                    padding-bottom: 2px;
                }
            }

            .tableBox{
                width: 889px;
                border-collapse: collapse;
                margin-top: 30px;

                &>table{
                    width: 100%;
                    vertical-align: middle;

                    &>tr{

                        th,td{
                            border: 1px solid #999;
                            min-height: 40px;
                            padding: 15px 0;
                            vertical-align: middle;

                            &:nth-child(1){
                                width: 323px;
                            }
                            &:nth-child(2){
                                width: 323px;
                            }
                            &:nth-child(3){
                                width: 171px;
                            }
                            &:nth-child(4){
                                width: 199px;
                            }
                        }

                        th{
                            background: #f7f7f7;
                        }

                        td{
                            text-align: center;
                            line-height: 20px;
                            
                            .status{
                                color: #666;
                                font-size: 14px;
                            }
                        }

                        .loseCash{
                            color: #198055;
                        }
                        
                    }
                }
            }
        }
    }
</style>