<template>
    <div class="credits-points">
        <div class="points">
            <div class="tot-credits fl-l">
                <p><span class="p-red">{{me.points}}</span><span>=${{pointsMoney}}</span></p>
                <p style="font-size: 16px">{{$t('totalcre')}}</p>
            </div>
            <div class="line fl-l"></div>
            <div class="overdue-credits fl-l">
                <p class="p-red smaller">{{me.overduePoints}}</p>
                <div class="p-rla">
                    <span>{{$t('creditsexpiring')}}<i class="iconfont"  @click="isShow()">&#xe73f;</i></span>
                    <div class="tips" v-if="seen">{{message.message}}.</div>
                </div>
            </div>
        </div>

        <div class="r-u">
            <div class="rec fl-l" @click="changeMethod()" :class="{ active: isActive }">{{$t('received')}}</div>
            <div class="use fl-l" @click="changeMethod()" :class="{ active: !isActive }">{{$t('used')}}</div>
        </div>

        <div class="c-options">
            <select class="x-select" v-model="selectedYear">
                <option v-for="item in creditsYear" v-bind:value="item">{{item}}</option>
            </select>
            <select class="x-select" v-model="selectedMonth">
                <option v-for="item in creditsMonth" v-bind:value="item">{{item}}</option>
            </select>
        </div>

        <div class="credits" v-if="isActive">
            <div class="tbl c-header">
                <div class="tbl-cell createTime">{{$t('Date')}}</div>
                <div class="tbl-cell c-name">{{$t('Transaction')}}</div>
                <div class="tbl-cell c-points">{{$t('Amount')}}</div>
            </div>
            <div class="tbl" v-if="!isHaveRec">
                <div class="tbl-cell">{{$t('nomoredata')}}</div>
            </div>
            <div class="tbl" v-for="item in currCredit" v-if="item.points > 0">
                <div class="tbl-cell createTime">{{getDate(item.createTime)}}</div>
                <div class="tbl-cell c-name">{{item.eventName}}</div>
                <div class="tbl-cell c-points">{{item.points}}</div>
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
            </div>
        </div>

        <div class="get-method">
            <div class="c-hd">{{$t('howtogetcre')}}</div>
            <div class="method-con">
                <a :href="indexUrl">
                    <i class="iconfont">&#xe739;</i>
                    <p>{{$t('shareitem')}}</p>
                    <span>+30</span>
                </a>
            </div>
            <div class="method-con">
                <a :href="shoppingcartUrl">
                    <i class="iconfont">&#xe735;</i>
                    <p>{{$t('makepur')}}</p>
                    <span>+30</span>
                </a>
            </div>
            <div class="method-con special">
                <a :href="confirmEmailUrl">
                    <i class="iconfont">&#xe73a;</i>
                    <p>{{$t('confirmemail')}}</p>
                    <span>+50</span>
                </a>
            </div>
            <div class="method-con">
                <a :href="makeSuggestionUrl">
                    <i class="iconfont">&#xe736;</i>
                    <p>{{$t('makesug')}}</p>
                    <span>+200</span>
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
                return utils.ROUTER_PATH_ME + '/m/changeEmail'
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
                isHaveUse:false
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
    .smaller{
        font-size: 30px !important;
    }
    .credits-points{
        margin-top: -50px;
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
            font-size: 40px;
        }
        .tot-credits{
            font-size: 20px;
            color: #222;
            p{
                margin-bottom: 14px;
            }
        }
        .overdue-credits{
            p{
                margin-bottom: 14px;
            }
            i{
                margin-left: 10px;
                cursor: pointer;
            }
            .p-rla{
                span{
                    font-size: 16px;
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
    .r-u{
        width:460px;
        border-radius: 4px;
        margin: 30px auto;
        border: solid 1px #cacaca;
        font-size: 16px;
        .rec{
            width: 230px;
            text-align: center;
            line-height: 40px;
            cursor: pointer;
        }
        .use{
            width: 228px;
            text-align: center;
            line-height: 40px;
            cursor: pointer;
        }
        .fl-l{
            float: left;
        }
        &:after{
            content: '';
            display: block;
            clear: both;
        }
        .active{
            background-color: #000000 !important;
            color: white !important;
        }
    }
    .c-options{
        .x-select{
            width: 125px;
            height: 30px;
            border: 1px solid #e6e6e6;
            font-size: 14px;
            color: #646464;
            margin-bottom: 10px;
            margin-right: 7px;
            cursor: pointer;
            background-color: #ffffff !important;
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
            text-align: center;
            color: #222;
            background-color: #f5f5f5;
            font-size: 16px;
            color: #222;
            font-weight: bold;
        }
        .method-con{
            position: relative;
            color: #222;
            width: 180px;
            text-align: center;
            padding-top: 75px;
            float: left;
            cursor: pointer;
            i{
                font-size: 36px;
                &:hover{
                    opacity: .8;
                }
            }
            p{
                font-size: 14px;
                line-height: 30px;
            }
            span{
                color: #E64545;
                position: absolute;
                top: 45px;
                left: 100px;
            }
        }
        &:after{
            display: block;
            clear: both;
            content: '';
        }
    }

</style>