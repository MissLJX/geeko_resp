<template>
    <!-- <div class="tbl">
        <div class="totalPoints tcl">
            <p><span class="f-red f-28">{{me.points}}</span><span class="f-12">=${{pointsMoney}}</span></p>
            <p class="f-15">Total Credits</p>
        </div>
        <div class="tcl bg-line">
            <div class="line"></div>
        </div>
        <div class="expiringPoints tcl">
            <p class="f-red f-20">{{me.overduePoints}}</p>
            <p class="f-12 m-t" @click="isShow">Credits expiring soon<i class="iconfont">&#xe732;</i></p>
            <div class="msg-tips" v-if="seen">{{message.message}}.</div>
        </div>
    </div> -->

    <div class="credits-header">
        <div class="st-table credits-hd">
            <div class="st-cell st-v-m">
                <div class="circle">
                    <span class="iconfont __icon">&#xe76e;</span>
                </div>
            </div>
            <div class="st-cell el-credits-discount st-v-m">
                <span>{{me.points}}</span>
                <!-- <span>=${{pointsMoney}}</span> -->
            </div>

            <div class="st-cell el-credits-right st-v-m">
                <span>=${{pointsMoney}}</span>
            </div>
        </div>

        <div class="expiring-points">
            <span class="overduepoints">{{me.overduePoints}} </span>
            <span class="exping-soon">points expiring soon </span>
             <div class="__question" @click="seen = !seen;">
                 <span>?</span>
             </div>

             <div class="msg-tips" v-if="seen">{{message.message}}.</div>
        </div>
    </div>
</template>



<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex'
    export default {
        props: {
            me: {
                type: Object,
                required: true
            }
        },
        computed: {
            pointsMoney(){
                return this.me.points > 0 ? this.me.points/100 : this.me.points
            },
            ...mapGetters('me', ['message']),
        },
        data(){
            return{
                seen:false
            }
        },
        created(){
            this.$store.dispatch('me/getMessage', 'M1138')
        }
    }
</script>

<style scoped lang="scss">
    @font-face {
        font-family: 'iconfont';  /* project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_oqd9vvi72n.eot');
        src: url('//at.alicdn.com/t/font_384296_oqd9vvi72n.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_384296_oqd9vvi72n.woff') format('woff'),
        url('//at.alicdn.com/t/font_384296_oqd9vvi72n.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_384296_oqd9vvi72n.svg#iconfont') format('svg');
    }
    .iconfont{
        font-family:"iconfont" !important;
        font-size:14px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }

    .credits-header{
        padding: 0px 20px;
        .credits-hd{
            .circle{
                display: inline-block;
                height: 41px;
                width: 41px;
                line-height: 43px;
                background-color: #ffcb53;
                text-align: center;
                border-radius: 50%;
                border: none;
                .__icon{
                    color: #de801d;
                    font-size: 33px;
                }
            }

            .el-credits-discount{
                padding-left: 4px;
                & > span{
                    font-family: SlatePro-Medium;
                    font-size: 24px;
                    color: #222222;
                }
            }

            .el-credits-right{
                & > span{
                    font-family: SlatePro-Medium;
                    font-size: 16px;
                    color: #222222;
                }
            }
        }

        .expiring-points{
            padding: 10px 0px;
            position: relative;
            .overduepoints{
                font-size: 16px;
                color: #f0526a;
                vertical-align: middle;
            }

            .exping-soon{
                font-size: 16px;
                color: #222222;
                vertical-align: middle;
            }

            .__question{
                display: inline-block;
                width: 18px;
                height: 18px;
                line-height: 18px;
                text-align: center;
                color: #cacaca;
                border-radius: 50%;
                border: 1px solid #cacaca;
                vertical-align: middle;
                cursor: pointer;

                & > span{
                    font-size: 15px;
                }
            }

            .msg-tips{
                width: 200px;
                height: 60px;
                padding: 10px;
                position: absolute;
                background-color: white;
                color: #666;
                border: 1px solid #efefef;
                font-size: 12px;
                right: 0px;
                top: 35px;
                text-align: left;
            }
        }
    }
</style>