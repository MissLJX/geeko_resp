<template>
    <div class="el-me-body">
        <!-- v-html="tipContent" -->
        <div id="test" v-html="tipContent">
            <span class="iconfont success_icon">&#xe6b7;</span>
            <div class="page_title">Verified Successfully!</div>
            <div class="credit-con">
                <p>Your registered email address is:</p>
                <p>dhfilafhiods@1111.com</p>
                <p>You’ve got <strong>100 points</strong> for verifying the first time.</p>
            </div>

            <div class="points_get_box" >
                <span class="iconfont points_icon">&#xe6d9;</span>
                <div>
                    <div><strong>100 points</strong> in your account</div>
                    <div>
                        100 points = $1 USD.
                        <span class="iconfont" @click="toPolicy">&#xe73f;</span>
                    </div>
                </div>
            </div>
        </div>
        

        <div class="v-btn" @click="shopnow">{{$t('shopnow')}}</div>
        <div class="v-btn" @click="getPoints">{{$t("points_mall.get_more_points")}}</div>
    </div>
</template>

<script>
import {getMessage} from '../api/index';
    export default {
        data(){
            return {
                tipContent: ''
            }
        },
        created(){
            getMessage().then(res => {
                console.log(res)
            })
        },
        mounted(){
            let dom = document.getElementById('test')
            console.log(dom)
            let text = `<div style='text-align: center;margin-bottom:30px;'><img src='https://image.geeko.ltd/chicme/2021111101/right_icon.png' alt='ModalPoints' style='width:54px;'><div style="font-family: 'ACUMINPRO-BOLD';font-size: 18px;color: #222222;margin-top: 18px;margin-bottom: 14px;">Verified Successfully!</div><div class="font-family: 'SLATEPRO';font-size: 14px;line-height: 16px;letter-spacing: 0px;color: #222222;margin-bottom: 18px;"><p>Your registered email address is:</p><p>#email#</p><p>You’ve got <strong>100 points</strong> for verifying the first time.</p></div></div><div style="display: flex;align-items: center;justify-content: center;width: 400px;height: 76px;background-color: #fff1f4;border-radius: 2px;margin: 0 auto;margin-top:18px;color: #f4546d;margin-bottom: 30px;" ><img src='https://image.geeko.ltd/20220113/message-points.png' alt='Question' style='width: 22px;height: 22px;margin-right:30px'><div><div><strong style="font-family: 'ACUMINPRO-BOLD';">100 points</strong> in your account</div><div>100 points = $1 USD.<a href='/fs/points-policy' style='vertical-align: middle;'><img src='https://image.geeko.ltd/chicme/2021111101/question.png' alt='Question' style='width: 14px;height: 14px;'></a></div></div></div>`
            this.tipContent = text
        },
        methods:{
            shopnow(){
                window.location.href = '/'
            },
            getPoints(){
                this.$router.push("/me/m/credits")
            },
            toPolicy(){
                window.location.href = '/fs/points-policy'
            }
        }
    }
</script>

<style scoped lang="scss">
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
    .el-me-body{
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
        margin-bottom: 18px;
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
    .v-btn{
        width: 400px;
        height: 44px;
        background-color: #222222;
        margin: 0 auto;
        margin-bottom: 22px;
        font-family: 'ACUMINPRO-BOLD';
        font-size: 20px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        text-align: center;
        line-height: 44px;
        text-transform: uppercase;
    }
</style>