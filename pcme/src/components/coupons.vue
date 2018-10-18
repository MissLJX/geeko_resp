<template>
    <div class="coupons">
        <div class="coupon" v-for="item in coupons">
            <div class="fl-l">
                <p class="amount">{{item.coupon.amount}} <span>{{$t('off')}}</span></p>
                <p class="name">{{item.coupon.name}}</p>
                <p class="time">{{getDate(item.coupon.beginDate)}} - {{getDate(item.coupon.endDate)}}</p>
                <i class="iconfont" v-if="!item.isAvailable">&#xe748;</i>
            </div>
            <div class="fl-r">
                <div class="bg">
                    <div class="usenow" :class="{'unabled':!item.isAvailable}" v-if="!item.isAvailable">{{$t('usenow')}}</div>
                    <div @click="useHandle(item.coupon.id)" class="usenow" v-if="item.isAvailable">{{$t('usenow')}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import * as utils from '../utils/geekoutil';

    export default {
        computed: {
            ...mapGetters([
                'coupons'
            ])
        },
        created(){
            this.$store.dispatch('getCoupons')
        },
        methods:{
            getDate(time){
                if(time == null){
                    return ''
                }
                return utils.enDate(new Date(time))
            },
            useHandle(id){
                this.$store.dispatch('useCoupon',id).then(() => {
                    window.location.href = '/cart'
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    @font-face {
        font-family: 'iconfont';  /* project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_m72f720tkb.eot');
        src: url('//at.alicdn.com/t/font_384296_m72f720tkb.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_384296_m72f720tkb.woff') format('woff'),
        url('//at.alicdn.com/t/font_384296_m72f720tkb.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_384296_m72f720tkb.svg#iconfont') format('svg');
    }
    .iconfont{
        font-family:"iconfont" !important;
        font-size:16px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;}
    .coupons{
        .coupon{
            width: 438px;
            height: 125px;
            border: solid 1px #e6e6e6;
            float: left;
            margin-bottom: 20px;
            .fl-l{
                width: 69%;
                float: left;
                padding: 10px;
                position: relative;
                i{
                    position: absolute;
                    right: 15px;
                    bottom: 5px;
                    font-size: 50px;
                    color: #e6e6e6;
                }
            }
            .fl-r{
                float: right;
                background-color: #f04f73;
                width: 31%;
                height: 100%;
                background: radial-gradient(transparent 0, transparent 4px, #f04f73 4px);
                background-size: 15px 14px;
                background-position: 8px 0px;
                padding-left: 5px;
                .bg{
                    width: 100%;
                    height: 100%;
                    padding: 48px 20px;
                    background-color: #f04f73;
                    .usenow{
                        border: 1px solid #ffffff;
                        border-radius: 20px;
                        color: white;
                        text-align: center;
                        cursor: pointer;
                        line-height: 26px;
                    }
                    .unabled{
                        color: rgba(255,255,255,.5);
                        border: 1px solid rgba(255,255,255,.5);
                        cursor: not-allowed;
                    }
                }
            }
            &:nth-child(n){
                margin-right: 20px;
            }
            .amount{
                color: #f04f73;
                font-size: 34px;
                font-weight: bold;
                span{
                    font-size: 18px;
                    font-weight: normal;
                }
            }
            .name{
                font-size: 16px;
                color: #222;
                margin: 6px 0;
            }
            .time{
                font-size: 14px;
                color: #666;
            }
        }

        &:after{
            display: block;
            clear: both;
            content: '';
        }
    }
</style>