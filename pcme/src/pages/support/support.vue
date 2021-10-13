<template>
  <div>
        <div class="_hd">
            <!-- {{$t("index.my_measurements")}} -->
            Support
        </div>
        <div class="entryBtnBox">
            <div class="entryBtnItem" v-for="(item, index) in buttonList" :key="index" @click="toFaq(item.content)">
                <span class="iconfont entryIcon" v-html="item.imgUrl"></span>
                <span>{{item.txt}}</span>
            </div>
        </div>
        <div class="toFaq">
            For all Q&As Please Click on our 
            <a href="javaScript:;" @click="toFaq()">FAQ</a>
            page
        </div>

        <div class="contactUs">
            <div class="contactTxt">Can't find the answer you are looking for?</div>
            <div class="contactBtn">
                <span class="iconfont">&#xe6e9;</span>
                <span>Customer Us</span> 
            </div>
        </div>
  </div>
</template>


<script>
import * as utils from '../../utils/geekoutil'
let buttonList = [
    {
        imgUrl: "&#xe6ee;",
        txt: "Order Processing",
        to: `${(window.ctx || '')}/support/faq`,
        content:"order",
        type:""
    },
    {
        imgUrl: "&#xe6f1;",
        txt: "Logistics Tracking",
        to: `${(window.ctx || '')}/support/faq`,
        content:"delivery",
        type:""
    },
    {
        imgUrl: "&#xe6ed;",
        txt: "Return & Refund",
        to:`${(window.ctx || '')}/support/faq`,
        content:"return",
        type:""
    },
    {
        imgUrl: "&#xe6ec;",
        txt: "Product & Stock",
        to: `${(window.ctx || '')}/support/faq`,
        content:"payment",
        type:""
    },
    {
        imgUrl: "&#xe6ef;",
        txt: "Payment & Promos",
        to: `${(window.ctx || '')}/support/faq`,
        content:"products",
        type:""
    },
    {
        imgUrl: "&#xe6f2;",
        txt: "Account Issues",
        to: `${(window.ctx || '')}/support/faq`,
        content:"account",
        type:""
    },
]
export default {
  data(){
    return {
        buttonList,

    }
  },
  methods:{
      toFaq(e){
          this.$router.push({ path: utils.ROUTER_PATH_ME + '/m/faq/faq', query: {type: e} })
      }
  }
}
</script>


<style lang="scss" scoped>
    ._hd{
        font-size: 24px;
        color: #222222;
        font-family: 'AcuminPro-Bold';
        text-align: center;
        // margin-bottom: 42px;
    }
    .entryBtnBox{
        margin-top: 18px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        min-width: 842px;
        justify-content: space-between;

        .entryBtnItem{
            width: 268px;
            height: 140px;
            background-color: #f6f6f6;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            margin-bottom: 16px;
            font-family: Roboto-Regular;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 14px;
            letter-spacing: 0px;
            color: #222222;
            cursor: pointer;

            .entryIcon{
                color: #000;
                font-size: 35px;
                line-height: 36px;
                margin-bottom: 16px;
            }
        }
    }
    .toFaq{
        font-family: Roboto-Regular;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 14px;
        letter-spacing: 0px;
        color: #666666;
        margin-top: 25px;
        text-align: center;
        border-bottom: 1px solid #e6e6e6;
        padding-bottom: 18px;

        a{
            font-family: Roboto-Regular;
            text-decoration: underline;
            font-size: 14px;
            font-weight: normal;
            letter-spacing: 0px;
            color: #222222;
        }
    }
    .contactUs{
        text-align: center;
        margin-top: 23px;

        .contactTxt{
            font-family: Roboto-Medium;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 14px;
            letter-spacing: 0px;
            color: #222222;
            margin-bottom: 29px;
        }

        .contactBtn{
            width: 180px;
            height: 32px;
            background-color: #222222;
            border-radius: 2px;
            color: #fff;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            cursor: pointer;

            .iconfont{
                font-size: 17px;
                line-height: 18px;
                margin-right: 10px;
            }
        }
    }
</style>