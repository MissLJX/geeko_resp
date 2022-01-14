<template>
  <div class="confirm_page">
      <div >
          <span class="iconfont success_icon">&#xe6b7;</span>
            <div class="page_title">Order Confirmed Successfully</div>
            <div class="credit-con">
                <p>You’ve got <strong class="color_red">xxx points</strong> in your account.</p>
                <p>100 points = $1 USD.</p>
            </div>
      </div>
        

        <div class="btn_box">
            <div class="v-btn" @click="shopnow">{{$t('shopnow')}}</div>
            <div class="v-btn" @click="getPoints">get more points</div>
        </div>

        <div class="productBox">
            <div class="listTitle">Often Bought With</div>

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
    props:{
        tipContent:{
            type:String,
            default:''
        }
    },
    data(){
            return {
                loading: false,
                finished: false,
                tipContent: ''
            }
        },
        computed:{
            ...mapGetters(["oftenBoughtWithList"])
        },
        methods:{
            listingHandle(){
                this.loading = true
                this.$store.dispatch("getOftenBoughtWithList", {id:'3a6fa19d-8b19-4e54-ab03-5f7a7012d62c'}).then((res) => {
                    console.log(res)
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
        },
        created(){
            this.listingHandle();
            var t = `<img src='https://image.geeko.ltd/chicme/2021111101/right_icon.png' alt='ModalPoints' style='width:54px;'><div style="font-family: 'ACUMINPRO-BOLD';font-size: 18px;font-weight: normal;font-stretch: normal;letter-spacing: 0px;color: #222222;margin-top: 18px;margin-bottom: 14px;">Order Confirmed Successfully</div><div style="font-family: 'SLATEPRO';font-size: 14px;font-weight: normal;font-stretch: normal;line-height: 16px;letter-spacing: 0px;color: #222222;margin-bottom: 40px;"><p>You’ve got <strong style="color:#e64545;">xxx points</strong> in your account.</p><p>100 points = $1 USD.</p></div>`
            if(this.$route.params.tipContent){
                this.tipContent = this.$route.params.tipContent
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