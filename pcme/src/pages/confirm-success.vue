<template>
    <div class="el-me-body">
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
</template>

<script>
    export default {
        methods:{
            shopnow(){
                window.location.href = '/'
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