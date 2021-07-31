<template>
    <div class="credits-header">
        <!-- <div class="st-table credits-hd">
            <div class="st-cell st-v-m">
                <div class="circle">
                    <span class="iconfont __icon">&#xe76e;</span>
                </div>
            </div>
            <div class="st-cell el-credits-discount st-v-m">
                <span></span>
                <span>=${{pointsMoney}}</span>
            </div>

            <div class="st-cell el-credits-right st-v-m">
                <span>=${{pointsMoney}}</span>
            </div>
        </div> -->

        <!-- <div class="expiring-points">
            <span class="overduepoints"></span>
            
        </div> -->

        <div class="credits-header-container">
            <div class="item1">
                <span>{{me.points}}</span>
                <p>={{pointsMoney}} US Dollars</p>
            </div>
            <div class="item2">
                <p class="over-points">{{me.overduePoints}}</p>
                <span class="exping-soon">points expiring soon </span>
                <span class="__question" @click="seen = !seen;">
                    <span>?</span>
                </span>

                <router-link :to="{name:'points-history'}">
                    <p class="points-history">Points History ></p>
                </router-link>

                <div class="msg-tips" v-if="seen">{{message.message}}.</div>
            </div>
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
        background-image: linear-gradient(44deg, 
            #f0d192 0%, 
            #f9e5be 100%);
        border-radius: 4px;

        .credits-header-container{
            display: flex;
            justify-content: space-between;
            padding: 20px;
            // align-items: center;

            & > div{
                width: 50%;
                text-align: center;
                padding: 10px 0px;
                position: relative;
            }

            .item1{
                border-right: 1px dashed #eac89c;

                & span{
                    font-size: 36px;
                    font-family: 'AcuminPro-Bold';
                    color: #9d6929;
                }

                & p{
                    font-size: 12px;
                    color: #be8f55;
                }
            }

            .item2{
                .over-points{
                    font-size: 36px;
                    font-family: 'AcuminPro-Bold';
                    color: #9d6929;
                }

                .exping-soon{
                    font-size: 12px;
	                color: #be8f55;
                    vertical-align: middle;
                    margin-right: 3px;
                }

                .__question{
                    display: inline-block;
                    width: 14px;
                    height: 14px;
                    line-height: 11px;
                    text-align: center;
                    color: #cacaca;
                    border-radius: 50%;
                    border: 1px solid #cacaca;
                    vertical-align: middle;
                    cursor: pointer;

                    & > span{
                        font-size: 13px;
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
                    top: 70px;
                    text-align: left;
                }

                .points-history{
                    font-family: 'SlatePro-Medium';
                    font-size: 12px;
                    color: #9d6929;
                    text-align: right;
                    margin-top: 10px;
                }
            }
        }





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