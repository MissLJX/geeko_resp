<template>
    <div class="points-container">
        <div class="_title">
            {{$t("point.points_details")}}
        </div>
        <div class="c-options">
            <div class="_change">
                <p>
                    <router-link :to="{name:'points-all'}" replace>
                        <span :class="{'active' : 'points-all' == this.$route.name || 'points-all2' == this.$route.name}">{{$t("point.all")}}</span>
                    </router-link>
                </p>
                <p>
                    <router-link :to="{name:'points-recived'}" replace>
                        <span :class="{'active' : 'points-recived' == this.$route.name}">{{$t("point.recived")}}</span>
                    </router-link>
                </p>
                <p>
                    <router-link :to="{name:'points-used'}" replace>
                        <span :class="{'active' : 'points-used' == this.$route.name}">{{$t("point.used")}}</span>
                    </router-link>
                </p>
                <p>
                    <router-link :to="{name:'points-expired'}" replace>
                        <span :class="{'active' : 'points-expired' == this.$route.name}">{{$t("point.expired")}}</span>
                    </router-link>
                </p>
            </div>

            <!-- <div class="_select">
                <select class="x-select" v-model="selectedYear">
                    <option v-for="item in creditsYear" v-bind:value="item">{{item}}</option>
                </select>
                <select class="x-select" v-model="selectedMonth">
                    <option v-for="item in creditsMonth" v-bind:value="item">{{item}}</option>
                </select>
            </div> -->
        </div>

        <div class="_bd">
            <div class="tbl c-header">
                <div class="tbl-cell createTime">{{$t('Date')}}</div>
                <div class="tbl-cell c-name">{{$t('Transaction')}}</div>
                <div class="tbl-cell c-points">{{$t('Amount')}}</div>
                <div class="tbl-cell c-points">{{$t('point.expiration')}}</div>
            </div>

            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'
    export default {
        name:"PointsContainer",
        data(){
            return {
                isActive:true,
                selectedYear:"",
                selectedMonth:"",
            }
        },
        methods:{
            // currCredit(){
            //     let arr =[];
            //     this.credits.forEach(credit =>{
            //         if(this.getYear(credit.createTime) === this.selectedYear && this.getMonth(credit.createTime) === this.selectedMonth){
            //             arr.push(credit)
            //         }
            //     })
            //     arr.forEach(point =>{
            //         if(point.points > 0){
            //             this.isHaveRec = true
            //         }
            //         if(point.points < 0){
            //             this.isHaveUse = true
            //         }
            //     })

            //     return arr
            // },
        }
    }
</script>

<style scoped lang="scss">
    .points-container{
        ._title{
            font-family: 'SlatePro-Medium';
            font-size: 24px;
            color: #000000;
            margin: 50px 0px 5px;
        }

        ._bd{
            border: 1px solid #e6e6e6;
            position: relative;
        }

        .c-header{
            color: #222222;
            border-bottom: 1px solid #e6e6e6;
            background-color: #f5f5f5;
            padding-bottom: 10px;
            padding-top: 10px;
            .c-points{
                color: #222222 !important;
            }

            .createTime{
                font-size: 14px;
                color: #222222;
                text-align: left;
                font-family: 'SlatePro-Medium';
            }

            .c-name{
                text-align: left;
                font-family: 'SlatePro-Medium';
                font-size: 14px;
            }
            .c-points{
                width: 180px;
                color: #E64545;
                font-family: 'SlatePro-Medium';
            }
            .tbl-cell{
                display: table-cell;
                text-align: center;
                width: 25%;
            }
        }

        .tbl{
            width: 100%;
            display: table;
        }

        .c-options{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 20px 0px;

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
        }
        .credits{
            max-height: 450px;
            overflow-y: auto;
            padding: 10px 0;
            border: 1px solid #e6e6e6;
            .createTime{
                width: 350px;
                padding: 5px 0 5px 40px;
                font-size: 14px;
                color: #999;
                text-align: left;
            }
            .c-points-green{
                width: 180px;
                color: #59b3b2;
            }
        }
    }
</style>