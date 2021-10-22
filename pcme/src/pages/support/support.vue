<template>
  <div>
        <div class="_hd">
            <!-- {{$t("index.my_measurements")}} -->
            {{$t("support.s_support")}}
        </div>
        <div class="entryBtnBox">
            <div class="entryBtnItem" v-for="(item, index) in buttonList" :key="index" @click="toFaq(item.content)">
                <span class="iconfont entryIcon" v-html="item.imgUrl"></span>
                <span>{{item.txt}}</span>
            </div>
        </div>
        <div class="toFaq">
            {{$t("support.s_clickToFaq")}}
            <a href="javaScript:;" @click="toFaq()">{{$t("support.s_faq")}}</a>
            {{$t("support.s_page")}}
        </div>

        <div class="contactUs">
            <div class="contactTxt">{{$t("support.s_not_found")}}</div>
            <div class="contactBtn" id="pc_support_home_customer_us">
                <span class="iconfont">&#xe6e9;</span>
                <span >{{$t("support.s_customer_us")}}</span> 
            </div>
        </div>
  </div>
</template>


<script>
import * as utils from '../../utils/geekoutil'
export default {
  data(){
    return {
        buttonList:[
            {
                imgUrl: "&#xe6ee;",
                txt: this.$t("support.s_order"),
                to: `${(window.ctx || '')}/support/faq`,
                content:"order",
                type:""
            },
            {
                imgUrl: "&#xe6f1;",
                txt: this.$t("support.s_logistics"),
                to: `${(window.ctx || '')}/support/faq`,
                content:"delivery",
                type:""
            },
            {
                imgUrl: "&#xe6ed;",
                txt: this.$t("support.s_return"),
                to:`${(window.ctx || '')}/support/faq`,
                content:"return",
                type:""
            },
            {
                imgUrl: "&#xe6ec;",
                txt:this.$t("support.s_product"),
                to: `${(window.ctx || '')}/support/faq`,
                content:"products",
                type:""
            },
            {
                imgUrl: "&#xe6ef;",
                txt: this.$t("support.s_payment"), 
                to: `${(window.ctx || '')}/support/faq`,
                content:"payment",
                type:""
            },
            {
                imgUrl: "&#xe6f2;",
                txt: this.$t("support.s_account"),
                to: `${(window.ctx || '')}/support/faq`,
                content:"account",
                type:""
            },
        ],
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
        text-transform: capitalize;
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
            text-transform: uppercase;
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