<template>
  <div class="confirm_page">
      <div v-html="tipContent">
          <!-- <span class="iconfont success_icon">&#xe6b7;</span>
            <div class="page_title">Order Confirmed Successfully</div>
            <div class="credit-con">
                <p>You’ve got <strong class="color_red">xxx points</strong> in your account.</p>
                <p>100 points = $1 USD.</p>
            </div> -->
      </div>
        

        <div class="btn_box">
            <div class="v-btn" @click="viewOrder">{{$t('points_mall.viewOrder')}}</div>
            <div class="v-btn" @click="toReview">{{$t("points_mall.to_review")}}</div>
        </div>

        <div class="productBox">
            <div class="listTitle">{{$t("points_mall.often_bought_with")}}</div>

            <div class="_bd">
                <you-likes-list :products="oftenBoughtWithList" :loading="loading" :finished="finished" @listing="listingHandle"></you-likes-list>
            </div>
        </div>
        
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import YouLikesList from "../components/often-bougth-with.vue"
export default {
    data(){
            return {
                loading: false,
                finished: false,
                tipContent: '',
                orderId: '',
            }
        },
        computed:{
            ...mapGetters(["oftenBoughtWithList"])
        },
        methods:{
            listingHandle(){
                this.loading = true
                this.$store.dispatch("getOftenBoughtWithList", {id:'3a6fa19d-8b19-4e54-ab03-5f7a7012d62c'}).then((res) => {
                    // console.log(res)
                    // if(finished) this.finished = finished;
                    this.loading = false
                    // if(!!empty){
                    //     this.$store.dispatch("getYouLikeProductsSkip");
                    // }
                    
                })
            },
            shopnow(){
                window.location.href = '/'
            },
            getPoints(){
                this.$router.push("/me/m/credits")
            },
            viewOrder(){
                if(this.orderId){
                    this.$router.push("/me/m/order/"+this.orderId)
                } else {
                    this.$router.go(-1);
                }
            },
            toReview(){
                this.$router.push("/me/m/order?type=review'")
            }
        },
        created(){
            this.listingHandle();
            this.$route.params.id && (this.orderId = this.$route.params.id)
            var t = `<img src='https://image.geeko.ltd/chicme/2021111101/right_icon.png' alt='ModalPoints' style='width:54px;'><div style="font-family: 'ACUMINPRO-BOLD';font-size: 18px;font-weight: normal;font-stretch: normal;letter-spacing: 0px;color: #222222;margin-top: 18px;margin-bottom: 14px;">Order Confirmed Successfully</div><div style="font-family: 'SLATEPRO';font-size: 14px;font-weight: normal;font-stretch: normal;line-height: 16px;letter-spacing: 0px;color: #222222;margin-bottom: 40px;"><p>You’ve got <strong style="color:#e64545;">100 points</strong> in your account.</p><p>100 points = $1 USD.</p></div>`
            if(this.$route.params.tipContent){
                let policyUrl = /(\/fs\/points-policy)/
                let text = this.$route.params.tipContent.indexOf('/policy/bonus-point') != -1 ? this.$route.params.tipContent.replace(policyUrl, '/policy/bonus-point-pc'): this.$route.params.tipContent
                this.tipContent = text
            } else {
                this.tipContent = t
            }
        },
        components:{
            "you-likes-list":YouLikesList
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
        color: #222222;
        margin-bottom: 24px;
        padding-left: 22px;
    }
</style>