<template>
    <div class="credits-points">
        <div class="_header">
            <p>MY POINTS</p>
            <a href="/fs/points-policy">
                Learn about {{this.GLOBAL.sitename}} points
                <span class="iconfont">&#xe73f;</span>
            </a>
        </div>

        <div class="points">
            <div class="tot-credits fl-l">
                <p><span class="p-red">{{me.points}}</span></p>
                <p style="font-size: 12px;color: #222222;"><span>= {{pointsMoney}} US Dollars</span></p>
            </div>
            <div class="line fl-l"></div>
            <div class="overdue-credits fl-l">
                <p class="p-red">{{me.overduePoints}}</p>
                <div class="p-rla">
                    <span>{{$t('creditsexpiring')}}<i class="iconfont"  @click="isShow()">&#xe73f;</i></span>
                    <div class="tips" v-if="seen">{{message.message}}.</div>
                </div>
            </div>
        </div>

        <!-- <div class="r-u">
            <div class="rec fl-l" @click="changeMethod()" :class="{ active: isActive }">{{$t('received')}}</div>
            <div class="use fl-l" @click="changeMethod()" :class="{ active: !isActive }">{{$t('used')}}</div>
        </div> -->

        <div class="_title">
            POINTS DETAILS
        </div>

        <div class="c-options">
            <div class="_change">
                <p @click="isReceived = '0'">
                    <span :class="{'active' : isReceived == '0'}">All</span>
                </p>
                <p @click="isReceived = '1'">
                    <span :class="{'active' : isReceived == '1'}">Earned</span>
                </p>
                <p @click="isReceived = '2'">
                    <span :class="{'active' : isReceived == '2'}">Used</span>
                </p>
                <p @click="isReceived = '3'">
                    <span :class="{'active' : isReceived == '3'}">Expired</span>
                </p>
            </div>

            <div class="_select">
                <select class="x-select" v-model="selectedYear">
                    <option v-for="item in creditsYear" v-bind:value="item">{{item}}</option>
                </select>
                <select class="x-select" v-model="selectedMonth">
                    <option v-for="item in creditsMonth" v-bind:value="item">{{item}}</option>
                </select>
            </div>
        </div>

        <div class="credits" v-if="isActive">
            <div class="tbl c-header">
                <div class="tbl-cell createTime">{{$t('Date')}}</div>
                <div class="tbl-cell c-name">{{$t('Transaction')}}</div>
                <div class="tbl-cell c-points">{{$t('Amount')}}</div>
                <div class="tbl-cell c-points">Expiration</div>
            </div>
            <div class="tbl" v-if="!isHaveRec">
                <div class="tbl-cell">{{$t('nomoredata')}}</div>
            </div>
            <div class="tbl" v-for="item in currCredit" v-if="item.points > 0">
                <div class="tbl-cell createTime">{{getDate(item.createTime)}}</div>
                <div class="tbl-cell c-name">{{item.eventName}}</div>
                <div class="tbl-cell c-points">{{item.points}}</div>
                <div class="tbl-cell">1</div>
            </div>
        </div>
        <div class="credits" v-if="!isActive">
            <div class="tbl c-header">
                <div class="tbl-cell createTime">{{$t('Date')}}</div>
                <div class="tbl-cell c-name">{{$t('Transaction')}}</div>
                <div class="tbl-cell c-points">{{$t('Amount')}}</div>
            </div>
            <div class="tbl" v-if="!isHaveUse">
                <div class="tbl-cell">{{$t('nomoredata')}}</div>
            </div>
            <div class="tbl" v-for="item in currCredit" v-if="item.points < 0">
                <div class="tbl-cell createTime">{{getDate(item.createTime)}}</div>
                <div class="tbl-cell c-name">{{item.eventName}}</div>
                <div class="tbl-cell c-points-green">{{item.points}}</div>
                <div class="tbl-cell">2</div>
            </div>
        </div>

        <table>
            <thead>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
            </thead>
        </table>

        <div class="get-method">
            <div class="c-hd">HOW TO EARN POINTS?</div>
            <div class="_bd">
                <a href="/me/m/order/confirmed">
                    <div class="review">
                        <div>
                            <span class="iconfont">&#xe6d1;</span>
                        </div>
                        <div class="_font">
                            <p>Review</p>
                            <p>0~2000 points</p>
                        </div>
                    </div>
                </a>
                
                <router-link :to="{name:'survey'}">
                    <div class="survey">
                        <div>
                            <span class="iconfont">&#xe6cf;</span>
                        </div>
                        <div class="_font">
                            <p>Survey</p>
                            <p>0~300 points</p>
                        </div>
                    </div>
                </router-link>
                
                <router-link :to="{name:'make-sug'}">
                    <div class="suggestion">
                        <div>
                            <span class="iconfont">&#xe6d0;</span>
                        </div>
                        <div class="_font">
                            <p>Suggestion</p>
                            <p>0~200 points</p>
                        </div>
                    </div>
                </router-link>
                
                <a href="/i/download">
                    <div class="download">
                        <div class="_image">
                            <img src="https://image.geeko.ltd/chicme/20210415/code.png" alt="code">
                        </div>
                        <div class="_font">
                            <p>Download App</p>
                            <p>Get More points</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import * as utils from '../utils/geekoutil';
    import _ from 'lodash'
    export default {
        computed: {
            ...mapGetters(['credits','message','me']),

            pointsMoney(){
                return this.me.points > 0 ? this.me.points/100 : this.me.points
            },
            creditsYear(){
                let arr =[];
                this.credits.forEach(credit =>{
                    arr.push(this.getYear(credit.createTime))
                })
                this.yearArr = _.uniq(arr)
                this.selectedYear = this.yearArr[0]
                return _.uniq(arr)
            },
            creditsMonth(){
                let arr =[];
                this.credits.forEach(credit =>{
                    arr.push(this.getMonth(credit.createTime))
                })
                this.monthArr = _.uniq(arr)
                this.selectedMonth = this.monthArr[0]
                return _.uniq(arr)
            },
            currCredit(){
                let arr =[];
                this.credits.forEach(credit =>{
                    if(this.getYear(credit.createTime) === this.selectedYear && this.getMonth(credit.createTime) === this.selectedMonth){
                        arr.push(credit)
                    }
                })
                arr.forEach(point =>{
                    if(point.points > 0){
                        this.isHaveRec = true
                    }
                    if(point.points < 0){
                        this.isHaveUse = true
                    }
                })

                return arr
            },
            indexUrl(){
                return utils.PROJECT + '/'
            },
            shoppingcartUrl(){
                return utils.PROJECT + '/cart'
            },
            confirmEmailUrl(){
                return utils.ROUTER_PATH_ME + '/m/change-email'
            },
            makeSuggestionUrl(){
                return utils.ROUTER_PATH_ME + '/m/makeSug'
            }
        },
        data(){
            return{
                seen:false,
                isActive:true,
                yearArr:[],
                monthArr:[],
                selectedYear:{},
                selectedMonth:{},
                isHaveRec:false,
                isHaveUse:false,
                isReceived:'0'
            }
        },
        methods: {
            isShow: function(){
                this.seen = !this.seen;

            },
            getDate(time){
                if(time == null){
                    return ''
                }
                return utils.enTime(new Date(time))
            },
            getYear(time){
                if(time == null){
                    return ''
                }
                return utils.enYear(new Date(time))
            },
            getMonth(time){
                if(time == null){
                    return ''
                }
                return utils.enMonth(new Date(time))
            },
            changeMethod:function(){
                this.isActive = !this.isActive
            },
        },
        created(){
            this.$store.dispatch('getMessage', 'M1138');
            this.$store.dispatch('getCredits',{skip:0});
            this.$store.dispatch('getMe');
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
    .credits-points{
        margin-top: -50px;

        ._header{
            text-align: center;

            & p{
                font-family: 'SlatePro-Medium';
                font-size: 30px;
                color: #000000;
            }

            & a{
                font-size: 16px;
                color: #666666;
                margin:13px 0px 36px;
                display: inline-block;

                & .iconfont{
                    color: #cccccc;
                }

                &:hover{
                    text-decoration: underline;
                    color: #222;
                }
            }
        }

        ._title{
            font-family: 'SlatePro-Medium';
            font-size: 24px;
            color: #000000;
            margin: 50px 0px 5px;
        }
    }
    .c-header{
        color: #999;
        border-bottom: 1px solid #e6e6e6;
        padding-bottom: 10px;
        margin-bottom: 20px;
        .c-points{
            color: #999 !important;
        }
    }
    .points{
        width: 915px;
        height: 145px;
        background-color: #f9f9f9;
        .fl-l{
            float: left;
        }
        .line{
            width: 1px;
            height: 115px;
            margin: 15px 0;
            background-color: #e6e6e6;
        }
        .tot-credits, .overdue-credits{
            width: 457px;
            text-align: center;
            padding-top: 35px;
        }
        .p-red{
            color: #E64545;
            font-family: 'SlatePro-Medium';
            font-size: 40px;
        }
        .tot-credits{
            font-size: 20px;
            color: #222;
            p{
                margin-bottom: 5px;
            }
        }
        .overdue-credits{
            p{
                margin-bottom: 5px;
            }
            i{
                margin-left: 10px;
                cursor: pointer;
            }
            .p-rla{
                span{
                    font-size: 12px;
                    color: #222222;
                }
                i{
                    color: #999;
                    &:hover{
                        opacity: .8;
                    }
                }
                position: relative;
                .tips{
                    position: absolute;
                    top: 30px;
                    right: 0;
                    width: 420px;
                    height: 113px;
                    background-color: #ffffff;
                    border-radius: 4px;
                    border: solid 1px #e6e6e6;
                    text-align: left;
                    padding: 20px 0 0 20px;
                    color: #666;
                }
            }
        }
    }
    .c-options{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0px;

        ._select{
            .x-select{
                width: 125px;
                height: 30px;
                border: 1px solid #e6e6e6;
                font-size: 14px;
                color: #646464;
                cursor: pointer;
                background-color: #ffffff !important;
            }
        }

        ._change{
            & > p{
                padding-right: 45px;
                display: inline-block;
                cursor: pointer;

                & span.active{
                    border-bottom: 2px solid #000000;
                    padding-bottom: 3px;
                }
            }
        }
    }
    .credits{
        max-height: 450px;
        overflow-y: auto;
        padding: 10px 0;
        border: 1px solid #e6e6e6;
        .tbl{
            width: 100%;
            display: table;
        }
        .tbl-cell{
            display: table-cell;
            text-align: center;
        }
        .createTime{
            width: 350px;
            padding: 5px 0 5px 40px;
            font-size: 14px;
            color: #999;
            text-align: left;
        }
        .c-name{
            text-align: left;
        }
        .c-points{
            width: 180px;
            color: #E64545;
        }
        .c-points-green{
            width: 180px;
            color: #59b3b2;
        }
    }
    .special{
        i{
            font-size: 30px !important;
            display: inline-block;
            margin-bottom: 6px;
            top: 3px;
        }
    }
    .get-method{
        padding-top: 40px;
        .c-hd{
            width: 100%;
            line-height: 48px;
            font-size: 24px;
            color: #000000;
            font-family: 'SlatePro-Medium';
            text-transform: uppercase;
        }

        ._bd{
            display: flex;

            & > a{
                width: 210px;
                height: 100px;
                margin-bottom: 10px;
                display: inline-block;
                cursor: pointer;
                border-radius: 4px;
                margin-right: 10px;

                & > div{
                    height: 100%;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                & .iconfont{
                    font-size: 42px;
                    color: #ffffff;
                    margin-right: 10px;
                }

                & ._font{
                    & > p:first-child{
                        font-size: 14px;
                        color: #ffffff;
                        font-family: 'AcuminPro-Bold';
                    }

                    & > p:last-child{
                        font-size: 12px;
	                    color: #ffffff;
                    }
                }
            }

            .review{
                background-image: linear-gradient(124deg, 
                    #ff8976 0%, 
                    #ffcca8 100%);
                border-radius: 4px;
            }

            .survey{
                background-image: linear-gradient(124deg, 
                    #b886b4 0%, 
                    #dab1db 100%);
                border-radius: 4px;
            }

            .suggestion{
                background-image: linear-gradient(124deg, 
                #77efbf 0%, 
                #7dede2 100%);
                border-radius: 4px;
            }

            .download{
                background-image: linear-gradient(124deg, 
                    #a7a7a7 0%, 
                    #d9d9d9 100%);
                border-radius: 4px;

                & .iconfont{
                    font-size: 27px;
                }

                ._image{
                    width: 42px;
                    height: 42px;
                    margin-right: 10px;

                    & > img{
                        width: 100%;
                        display: block;
                    }
                }
            }
        }
    }

</style>