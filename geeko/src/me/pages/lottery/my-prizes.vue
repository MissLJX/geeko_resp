<template>
    <div id="myPrizesPage" class="myPrizesPage">
        <!-- 标题 -->
        <nav-bar v-if="!isApp">
            <i class="iconfont el-back-font" slot="left" @click="$router.go(-1)">&#xe693;</i>
            <span slot="center">{{$t("my_prize.my_prizes")}}</span>
        </nav-bar>
        <div class="myPrizesContentBox">
            <div class="infoContentBox">
                <ul class="myPrizesUl">
                    <li v-for="(item,index) in pointsHistoryList" :key="index">
                        <div class="getPoints" @click="toCollection(item.url?item.url:'')">
                            <span class='quanIcon iconfont' v-if="item.icon && !item.isThanks" v-html="item.icon"></span>
                            <span class='quanIcon iconfont' style="font-size: 12px;" v-if="item.icon && item.isThanks" v-html="item.icon"></span>
                            <img class="quanIcon" style="background: none;" v-if="item.image" :src="item.image"/>
                            <div v-if="!item.url">{{item.name}}</div>
                            <div v-if="item.url" style="cursor:pointer;text-decoration:underline;">{{item.name}}</div>
                        </div>
                        <div class="getDate">
                            {{item.date}}
                        </div>
                    </li>
                </ul>
            </div>
            <div class="myPrizesInfo">
                <div>
                    {{$t("my_prize.rules1",{'website':GLOBAL.sitename})}}
                    <strong>{{$t("my_prize.rules2")}}</strong>
                    {{$t("my_prize.rules3")}}
                </div>

                {{$t("my_prize.rules4")}}<a @click="toNewPage" href="javascript:;">{{$t("my_prize.click_here")}}</a>.
            </div>
        </div>
        
    </div>
</template>

<script>
import {getPointsHistory} from '../../api/index'
import NavBar from '../../components/nav-bar.vue';
export default {
    data(){
        return{
            pointsHistoryList:[]
        }
    },
    created(){
        this.getList()
        // console.log("window.isApp",window.isApp);
    },
    components:{
        "nav-bar":NavBar
    },
    computed:{
        isApp(){
            return window.isApp == 'true'
        }
    },
    methods:{
        toCollection(url){
            if(url){
                window.location.href = url;
            }
        },
        getList(){
            getPointsHistory(0,50).then(res=>{
                // console.log(res)
                if(res && res.result && res.result.length > 0){
                    for(let i = 0; i < res.result.length; i++){

                        let item = res.result[i];
                        if(item.prize){
                            let date = new Date(item.luckDrawDate).toString().split(" GMT")[0];
                            let dateList = date.split(" ");
                            date = dateList[1]+"."+dateList[2]+"."+dateList[3]+ " "+dateList[4];
                            item['date'] = date;
                            if(item.prize.type == 1){
                                // 积分
                                item['name'] = item.prize.name
                                item['icon'] = '&#xe7e1;'
                            } else if(item.prize.type == 2 || item.prize.type == 5){
                                // 优惠券
                                item['name'] = item.prize.name
                                item['icon'] = '&#xe7e0;'
                            } else if(item.prize.type == 6){
                                // 美妆实物
                                item['name'] = item.prize.name
                                item['icon'] = '&#xe6f8;'
                                // item['url'] = window.ctx || '' + "/collection/lucky-draw-chicmex/" + item.prize.data + '.html?collectionId='+item.prize.data+'&id='+item.prize.data
                                if(this.isApp){
                                    item['url'] = 'chic-me://chic.me/shoppingcart'
                                } else {
                                    item['url'] = (window.ctx || '') + '/cart'
                                }
                                
                            } else if(item.prize.type == 1){
                                // 生活好物
                                item['name'] = item.prize.name
                                item['icon'] = '&#xe7df;'
                            } else if(item.prize.type == 3){
                                // iphone 13
                                item['name'] = item.prize.name
                                item['image'] = 'https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/2021-11-01-lottery/2021-11-10-jiugongge-mask-iphone.png'
                            } else {
                                item['name'] = item.prize.name
                                item['icon'] = '&#xe7e3;'
                                item['isThanks'] = true
                            }
                            
                        }
                        
                    }
                    this.pointsHistoryList = res.result;
                }
            })

        },
        toNewPage(){
            if(this.isApp){
                window.location.href = window.ctx||''+'/policy/bonus-point?isApp=1'
            } else {
                window.location.href = window.ctx||''+'/policy/bonus-point'
            }
            
        }
    }
}
</script>

<style scoped lang="scss">
    @font-face {
  font-family: 'iconfont';  /* Project id 384296 */
  src: url('//at.alicdn.com/t/font_384296_jwzi5i781r9.woff2?t=1636964763299') format('woff2'),
       url('//at.alicdn.com/t/font_384296_jwzi5i781r9.woff?t=1636964763299') format('woff'),
       url('//at.alicdn.com/t/font_384296_jwzi5i781r9.ttf?t=1636964763299') format('truetype');
}
    .quanIcon{
        display: block;
        width: 26px;
        height: 26px;
        background: #fc6f62;
        color: #fff;
        border-radius: 50%;
        font-weight: 500;
        text-align: center;
        line-height: 26px;
        margin-right: 4px;
    }
    // my prizes 页面
    .myPrizesPage{
        background-color: #f6f6f6;
        min-height: 100vh;
        width: 100%;
        margin: 0 auto;
    }
    #myPrizesPage{
        background-color: #f6f6f6;
        min-height: 100vh;
        width: 100%;
        margin: 0 auto;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 30;
    }
    .myPrizesContentBox{
        height: calc(100vh - 44px);
        overflow: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        border-top: 1px solid #f6f6f6;
    }
    .myPrizesPage .infoContentBox > ul{
        display: block;
        background-color: #fff;
    }
    .myPrizesPage .infoContentBox > ul > li {
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 60px;
        font-family: Roboto;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 60px;
        letter-spacing: 0px;
        color: #000000;
        margin: 0 auto;
        border-bottom: 1px solid #f6f6f6;
        width: 93.5%;
    }
    .myPrizesPage .infoContentBox > ul > li > .getPoints{
        font-family: Roboto;
        font-size: 12px;
        font-weight: 600;
        font-stretch: normal;
        line-height: 16px;
        letter-spacing: 0px;
        color: #ff3f00;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
    .myPrizesPage .infoContentBox > ul > li > .getPoints > img{
        width: 22px;
        height: 23px;
        /* background-color: #eee; */
        margin-right: 8px;
    }
    .myPrizesPage .infoContentBox > ul > li > .getDate {
        font-family: Roboto;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 16px;
        letter-spacing: 0px;
        color: #666666;
    }
    .myPrizesPage .myPrizesInfo{
        font-family: Roboto;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 14px;
        letter-spacing: 0px;
        color: #999999;
        width: 93.5%;
        margin: 0 auto;
        margin-bottom: 30px;
    }
    .myPrizesPage .myPrizesInfo > div {
        margin: 20px 0 14px 0;
    }
    .myPrizesPage .myPrizesInfo > div > strong{
        color: #ff3f00;
    }
    .myPrizesPage .myPrizesInfo > a{
        color: #5e7ded;
        text-decoration: underline;
    }
    .myPrizesPage .infoContentBox > .mine{
        height: 54px;
        margin-bottom: 12px;
    }
    .myPrizesPage .infoContentBox > .mine > li{
        margin-bottom: 10px;
        margin-top: 5px;
    }
</style>