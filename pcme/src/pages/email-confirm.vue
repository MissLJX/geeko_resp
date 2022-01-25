<template>
<div>
    <div class="el-me-body" v-if="!showOld">
        <!-- v-html="tipContent" -->
        <div id="test" v-html="tipContent">
            <!-- <span class="iconfont success_icon">&#xe6b7;</span>
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
            </div> -->
        </div>
        

        <div class="v-btn" @click="shopnow">{{$t('shopnow')}}</div>
        <div class="v-btn" @click="getPoints">{{$t("points_mall.get_more_points")}}</div>
    </div>

    <div class="el-me-body-old" v-if="showOld">
        <p><i class="iconfont">&#xe73c;</i>{{$t('sucesschanged')}}</p>
        <div class="credit-con">
            <strong>100 {{$t('points')}}</strong>
            <p>100 {{$t('pointsyougot')}}</p>
            <i class="iconfont">&#xe747;</i>
            <i class="iconfont">&#xe747;</i>
            <i class="iconfont">&#xe747;</i>
        </div>
        <div class="v-btn" @click="shopnow">{{$t('shopnow')}}</div>
    </div>
</div>
    
</template>

<script>
import { parse } from 'fecha';
import {getMessage} from '../api/index';
    export default {
        data(){
            return {
                emailAddress:'',
                pointsPolicy: '',
                tipContent: '',
                pointsNum: '',
                showOld: false,
            }
        },
        created(){
            const {query} = this.$route;
            // console.log(query)
            if(Object.keys(query).length > 0) {
                this.showOld = false
                query.email && (this.emailAddress = query.email)
                query.pointsForCash && (this.pointsPolicy = query.pointsForCash)
                query.bonusPoints && (this.pointsNum = query.bonusPoints)
            } else {
                this.showOld = true
            }
        },
        mounted(){
            // https://www.chicme.xyz/me/m/confirmSuccess?email=gongmengjian%40163.com&bonusPoints=100&pointsForCash=100%20points%20%3D%20%241%20usd
            // https://www.chicme.xyz/me/m/confirmSuccess?email=hsdjkahjkdhk%40qq.com&bonusPoints=100&pointsForCash=dsadasdsada
            let reg = /(#email#)/
            let policy = /(#pointsPolicy#)/
            let points = /(#points#)/
            let policyUrl = /(\/fs\/points-policy)/
            getMessage('M1621').then(res => {
                // console.log(res.message)
                if(res && res.message){
                    let text = res.message
                    let text1 = this.emailAddress ? text.replace(reg, this.emailAddress): text
                    let text2 = this.pointsNum ? text1.replace(points, this.pointsNum): text1 
                    let text3 = this.pointsNum ? text2.replace(points, this.pointsNum): text2
                    let text4 = text3.indexOf('/fs/points-policy') != -1 ? text3.replace(policyUrl, '/fs/points-policy-pc'): text3
                    this.tipContent = this.pointsPolicy ? text4.replace(policy, this.pointsPolicy): text4
                } else {
                    let text = "<div style='text-align: center;margin-bottom:30px;'><img src='https://image.geeko.ltd/chicme/2021111101/right_icon.png' alt='ModalPoints' style='width:54px;'><div style='font-family: ACUMINPRO-BOLD;font-size: 18px;color: #222222;margin-top: 18px;margin-bottom: 14px;'>Verified Successfully!</div><div class='font-family: SLATEPRO;font-size: 14px;line-height: 16px;letter-spacing: 0px;color: #222222;margin-bottom: 18px;'><p>Your registered email address is:</p><p>#email#</p><p>You’ve got <strong>#points# points</strong> for verifying the first time.</p></div></div><div style='display: flex;align-items: center;justify-content: center;width: 400px;height: 76px;background-color: #fff1f4;border-radius: 2px;margin: 0 auto;margin-top:18px;color: #f4546d;margin-bottom: 30px;' ><img src='https://image.geeko.ltd/20220113/message-points.png' alt='Question' style='width: 22px;height: 22px;margin-right:30px'><div><div><strong style='font-family: ACUMINPRO-BOLD;'>#points# points</strong> in your account</div><div>100 points = $#pointsPolicy# <a href='/fs/points-policy' style='vertical-align: middle;'><img src='https://image.geeko.ltd/chicme/2021111101/question.png' alt='Question' style='width: 14px;height: 14px;'></a></div></div></div>"
                    let text1 = this.emailAddress ? text.replace(reg, this.emailAddress): text
                    let text2 = this.pointsNum ? text1.replace(points, this.pointsNum): text1 
                    let text3 = this.pointsNum ? text2.replace(points, this.pointsNum): text2
                    let text4 = text3.indexOf('/fs/points-policy') != -1 ? text3.replace(policyUrl, '/fs/points-policy-pc'): text3
                    this.tipContent = this.pointsPolicy ? text4.replace(policy, this.pointsPolicy): text4
                }
            })
            
        },
        methods:{
            shopnow(){
                window.location.href = '/'
            },
            getPoints(){
                this.$router.push("/me/m/credits")
            },
            toPolicy(){
                window.location.href = '/fs/points-policy-pc'
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
    // 老的
    .el-me-body-old{
        width: 1141px;
        margin: 0 auto;
        text-align: center;
        padding-top: 75px;
        p{
            font-size: 16px;
            color: #222;
            i{
                font-size: 32px;
                color: #57b936;
                position: relative;
                top: 6px;
                margin-right: 10px;
            }
        }
        .credit-con{
            width: 420px;
            height: 100px;
            background-color: #f5f5f5;
            border-radius: 2px;
            border: solid 1px #e6e6e6;
            margin: 30px auto;
            padding-top: 25px;
            position: relative;
            overflow: hidden;
            i{
                font-size: 20px;
                color: #dbdbdb;
                opacity: .6;
                &:last-child{
                    position: absolute;
                    top: 25px;
                    left: 81px;
                    transform: rotate(-35deg);
                }
                &:nth-last-child(2){
                    position: absolute;
                    top: 25px;
                    right: 55px;
                    transform: rotate(35deg);
                }
                &:nth-last-child(3){
                    position: absolute;
                    bottom: -5px;
                    right: 29px;
                    transform: rotate(-35deg);
                }
            }
            strong{
                color: #e7004d;
                font-size: 24px;
                margin-top: 25px;
            }
            p{
                font-size: 14px;
                color: #222;
            }
        }
        .v-btn{
            text-align: center;
            color: #fff;
            font-weight: bold;
            line-height: 40px;
            background-color: #222;
            padding: 0 60px;
            display: inline-block;
            border-radius: 2px;
            cursor: pointer;
        }
    }
</style>