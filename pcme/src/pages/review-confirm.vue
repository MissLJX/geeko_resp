<template>
  <div class="confirm_page">
      <div v-html="tipContent">
          <!-- <span class="iconfont success_icon">&#xe6b7;</span>
            <div class="page_title">Reviewed Successfully</div>
            <div class="credit-con">
                <p>Thanks for your time!</p>
                <p>Accepted review will earn <strong class="color_red">xxx points</strong>, have a look and enjoy shopping at ChicMe!</p>
            </div> -->
      </div>
        

        <div class="btn_box">
            <div class="v-btn" @click="shopnow">{{$t('points_mall.shop_now')}}</div>
            <div class="v-btn" @click="getPoints">{{$t("points_mall.get_more_points")}}</div>
        </div>

        <div class="productBox">
            <div class="listTitle">
                <span :class="{'selected':listShow==1}" v-if="reviewOrderList && reviewOrderList.length > 0" @click="()=>chanegData(1)">{{$t("points_mall.awaitingReview")}}</span>
                <span :class="{'selected':listShow==2}" @click="()=>chanegData(2)">{{$t("points_mall.highlyReview")}}</span>
            </div>

            <div class="_bd">
                <!-- 等待评价的订单列表  -->
                <div v-if="listShow==1 && reviewOrderList && reviewOrderList.length > 0">
                    <review-order-list :orderList="reviewOrderList"></review-order-list>
                </div>

                <you-likes-list v-if="listShow==2" :products="list" :loading="loading" :finished="finished" @listing="listingHandle"></you-likes-list>
            </div>
        </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import YouLikesList from "../components/often-bougth-with.vue"
import ReviewOrderList from '../components/review-order-list.vue'
export default {
    data(){
        return {
            loading: false,
            finished: false,
            listShow: 1,
            tipContent:''
        }
    },
    computed:{
        ...mapGetters(["oftenBoughtWithList", "reviewOrderList"]),
        list(){
            return this.oftenBoughtWithList ? this.oftenBoughtWithList : []
        },

    },
    methods:{
        listingHandle(){
            this.loading = true
            this.$store.dispatch("getOftenBoughtWithList", {id:'3a6fa19d-8b19-4e54-ab03-5f7a7012d62c'}).then((res) => {
                this.loading = false
            })
        },
        shopnow(){
            window.location.href = '/'
        },
        getPoints(){
            this.$router.push("/me/m/credits")
        },
        chanegData(type){
            this.listShow = type;
            if(type == 1){
                this.getReviewOrder()
            }
            if(type == 2){
                this.listingHandle();
            }
        },
        getReviewOrder(){
            this.$store.dispatch("getReviewOrder").then(res => {
                if(!this.reviewOrderList || this.reviewOrderList.length <= 0){
                    this.chanegData(2)
                }
            })
        },
    },
    created(){
        //  this.listingHandle();
        this.getReviewOrder()
        let t = "<img src='https://image.geeko.ltd/chicme/2021111101/right_icon.png' alt='ModalPoints' style='width:54px;vertical-align: middle;'><div style='font-family: ACUMINPRO-BOLD;font-size: 18px;font-weight: normal;font-stretch: normal;letter-spacing: 0px;color: #222222;margin-top: 18px;margin-bottom: 14px;'>Reviewed Successfully</div><div style='font-family: SLATEPRO;font-size: 14px;font-weight: normal;font-stretch: normal;line-height: 16px;letter-spacing: 0px;color: #222222;margin-bottom: 40px;'><p>Thanks for your time!</p><p>Accepted review will earn <strong style='color:#e64545;'>100 points</strong>, have a look and enjoy shopping at ChicMe!</p><p>100 points = $1 <a href='/policy/bonus-point' style='vertical-align: middle;'><img src='https://image.geeko.ltd/chicme/2021111101/question.png' alt='Question' style='width: 14px;height: 14px;'></a></p></div>"
        if(this.$route.params.tipContent){
            // let policyUrl = /(\/fs\/points-policy)/
            // let text = this.$route.params.tipContent.indexOf('/policy/bonus-point') != -1 ? this.$route.params.tipContent.replace(policyUrl, '/policy/bonus-point-pc'): this.$route.params.tipContent
            this.tipContent = this.$route.params.tipContent
        } else {
            this.tipContent = t
        }
    },
    components:{
        "you-likes-list":YouLikesList,
        "review-order-list":ReviewOrderList
    }
}
</script>

<style scoped>
    @font-face {
        font-family: 'iconfont';  /* project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_a0e3ctpqj68.eot');
        src: url('//at.alicdn.com/t/font_384296_a0e3ctpqj68.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_384296_a0e3ctpqj68.woff') format('woff'),
        url('//at.alicdn.com/t/font_384296_a0e3ctpqj68.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_384296_a0e3ctpqj68.svg#iconfont') format('svg');
    }
    .iconfont{
        font-family:"iconfont" !important;
        font-size:16px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }
    .color_red{
        color:#e64545;
    }
    .confirm_page{
        width: 1200px;
        margin: 0 auto;
        text-align: center;
        padding-top: 75px;
    }
    .success_icon{
        font-size: 54px;
        color: #20b759;
    }
    .page_title{
        font-family: 'ACUMINPRO-BOLD';
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #222222;
        margin-top: 18px;
        margin-bottom: 14px;
    }
    .credit-con{
        font-family: 'SLATEPRO';
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 16px;
        letter-spacing: 0px;
        color: #222222;
        margin-bottom: 40px;
    }
    .credit-con strong,
    .points_get_box strong {
        font-family: 'ACUMINPRO-BOLD';
    }
    .points_get_box{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 400px;
        height: 76px;
        background-color: #fff1f4;
        border-radius: 2px;
        margin: 0 auto;
        color: #f4546d;
        margin-bottom: 30px;
    }
    .points_icon{
        font-size: 22px;
        color: #f4546d;
        margin-right: 30px;
    }
    .btn_box{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .v-btn{
        width: 400px;
        height: 44px;
        background-color: #222222;
        margin: 0 14px;
        font-family: 'ACUMINPRO-BOLD';
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        text-align: center;
        line-height: 44px;
        text-transform: uppercase;
        cursor: pointer;
    }
    .productBox{
        text-align: left;
        margin-top: 60px;
    }
    .listTitle{
        font-family: 'ACUMINPRO-BOLD';
        font-size: 24px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #666;
        margin-bottom: 24px;
        padding-left: 22px;
    }
    .listTitle .selected {
        color: #222;
    }
    .listTitle span{
        cursor: pointer;
    }
    .listTitle span:first-child{
        margin-right: 40px;
    }
</style>