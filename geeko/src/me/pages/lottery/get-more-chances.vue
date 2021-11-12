<template>
    <div class="getMorePage" >
        <!-- 标题 -->
        <nav-bar>
            <i class="iconfont el-back-font" slot="left" @click="$router.go(-1)">&#xe693;</i>
            <span slot="center">Get More Chances</span>
        </nav-bar>
		<div id="getMorePage">            
			<div class="rulesItem how" v-for="(item, index) in list" :key="index">
				<!-- <div class="rulesIndex">1.</div> -->
                <!-- daily check -->
                <div v-if="item.type == 'daily'" class="rulesContent">
					<div class="positionBox">
						<div class="contentTxt">
							<div class="contentTitle daily">
								<span>{{item.title}} </span>
                                <div class="contentBtnBox" @click="linkTo(item.btnUrl)">
                                    {{item.btnTxt}}
                                </div>
							</div>
							<div class="contentInfo">
								{{item.info}}
							</div>
						</div>
						
					</div>
				</div>

                <!-- share -->
                <div v-if="item.type == 'share'" class="rulesContent">
					<div class="positionBox">
                        <div class="contentTxt">
                            <div class="contentTitle exchange">
                                <span>{{item.title}}</span> 
                                <span>({{item.timeUsed}}/{{item.times}})</span>
                            </div>
                            <div class="contentInfo">
                                {{item.info}}
                            </div>
                        </div>
                        <div class="flexBox">
                            <span class="iconfont appBtnBox" 
                                  v-for="(item1,index1) in item.targetApp" 
                                  @click="linkTo(item1.link)" 
                                  :key="index1"
                                  v-html="item.btnTxt"
                                  >
                                
                            </span>
                        </div>
					</div>
				</div>

                <!-- exchange -->
				<div v-if="item.type == 'exchange'" class="rulesContent">09
					<div class="positionBox">
						<div class="contentTxt">
							<div class="contentTitle exchange">
								<span>{{item.title}}</span> 
                                <span>({{item.timeUsed}}/{{item.times}})</span>
							</div>
							<div class="contentInfo">
								{{item.info}}
							</div>
						</div>
						<div class="contentBtnBox" @click="linkTo(item.btnUrl)">
							{{item.btnTxt}}
						</div>
					</div>
				</div>

                <!-- oneline & others -->
				<div v-if="item.type == 'linkGo'" class="rulesContent">
					<div class="positionBox">
						<div class="contentTxt">
							<div class="contentTitle daily">
								<span>{{item.title}} </span>
                                <div class="contentBtnBox" @click="linkTo(item.btnUrl)">
                                    {{item.btnTxt}}
                                </div>
							</div>
						</div>
					</div>
				</div>
                
			</div>
		</div>
	</div>
</template>

<script>
import NavBar from '../../components/nav-bar.vue';
let exchangeList = [
    {
        type: 'daily',
        times: 3,
        timeUsed: 0,
        btnUrl: '',
        btnTxt: 'Check in',
        title: 'Daily check in ('+0+'/'+3+') days',
        info: ''
    },
    {
        type: 'share',
        times: 2,
        timeUsed: 0,
        btnUrl: '',
        btnTxt: '',
        title: 'Share the link with your friends',
        info: 'check in check incheck incheck incheck incheck incheck incheck incheck incheck incheck incheck incheck in',
        targetApp: [{
            icon: '',
            link: ''
        },{
            icon: '',
            link: ''
        },{
            icon: '',
            link: ''
        },{
            icon: '',
            link: ''
        }]
    },
    {
        type: 'exchange',
        times: 2,
        timeUsed: 0,
        btnUrl: '',
        btnTxt: 'Exchange',
        title: 'Exchange points for more chances.',
        info: '20 points=1 chance; you can only do this up to 2 times a day.',
    },
    {
        type: 'linkGo',
        times: 3,
        timeUsed: 0,
        btnUrl: '',
        btnTxt: 'Go',
        title: 'View Hot Items',
    },
    {
        type: 'linkGo',
        times: 1,
        timeUsed: 0,
        btnUrl: '',
        btnTxt: 'Go',
        title: 'Add items to shopping bag',
    },
    {
        type: 'linkGo',
        btnUrl: '',
        btnTxt: 'Go',
        title: 'Verify email',
    },
    {
        type: 'linkGo',
        times: 3,
        timeUsed: 0,
        btnUrl: '',
        btnTxt: 'Go',
        title: 'Turn on the App notification',
    },
]
export default {
    data(){
        return{
            list: exchangeList
        }
    },
    components:{
        "nav-bar":NavBar
    },
    methods:{
        linkTo(url){
            window.location.href = url;
        }
    }
}
</script>

<style lang="scss" scoped>
    /* exchange页面 */
    .getMorePage{
        background-color: #fff;
        min-height: 100vh;
        margin: 0 auto;
    }
    #getMorePage{
        background-color: #fff;
        width: 100%;
        margin: 0 auto;
        // height: calc(100vh - 44px);
        border-top: 1px solid #eee;
        // overflow: scroll;
    }
    .getMorePage .pageHeader{
        width: 100%;
        height: 44px;
        text-align: center;
        line-height: 44px;
        position: relative;
        font-family: Roboto;
        font-size: 16px;
        font-weight: 600;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #212121;
        background-color: #fff;
        border-bottom: 1px solid #e2e2e2;
    }
    .getMorePage .pageHeader > .back {
        /* width: 11px;
        height: 18px; */
        position: absolute;
        /* top: 13px; */
        left: 12px;
        /*border: 1px solid;*/
    }
    .getMorePage .rulesItem{
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        margin-bottom: 11px;
        cursor: pointer;
        width: 100%;
        padding: 0 20px;
        margin:0 auto;
        // height: 126px;
    }
    .getMorePage .rulesItem:not(:last-child){
        border-bottom: 1px solid #f2f2f2;
    }

    .getMorePage .rulesIndex{
        font-family: Zurich;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 21px;
        letter-spacing: 0px;
        color: #000000;
        margin-right: 10px;
        font-weight: 600;
        margin-top: 20px;
    }
    .getMorePage .rulesContent{
        font-family: Roboto;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 16px;
        letter-spacing: 0px;
        color: #000000;
        flex-grow: 1;
        line-height: 16px;
        font-weight: 600;
        margin-top: 23px;
    }
    .getMorePage .rulesContent > div > img {
        display: block;
        width: 70px;
        height: 70px;
        margin-top: 8px;
        background-color: #eee;
    }
    .getMorePage .rulesContentDown{
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
    }
    .getMorePage .rulesContent > .downloadBtn{
        width: 100px;
        height: 26px;
        background-color: #000;
        color: #fff;
        text-align: center;
        line-height: 26px;
        border-radius: 13px;
        overflow: hidden;
        font-family: Roboto;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        margin-top: -8px;
        padding: 0 3px;
    }
    .positionBox{
        margin-bottom: 20px;
    }
    .contentTitle{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .getMorePage .rulesContent > .positionBox > .contentTxt > .contentInfo{
        font-family: Roboto;
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 16px;
        letter-spacing: 0px;
        color: #666666;
        margin-top: 2px;
    }
    .getMorePage .rulesContent > .positionBox > .contentImgBox{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-top: 8px;
    }
    .getMorePage .rulesContent > .positionBox > .contentImgBox > div{
        cursor: pointer;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        /* background-color: #000; */
        margin-top: 3px;
        overflow: hidden;
    }
    .getMorePage .rulesContent > .positionBox > .contentImgBox > div > img{
        display: block;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        /* background-color: #000; */
        /* margin-top: 3px; */
        overflow: hidden;
    }
    .getMorePage .rulesContent > .positionBox > .contentImgBox > div:nth-child(2){
        background-color: #000;
    }
    .getMorePage .rulesContent > .positionBox > .contentImgBox > div:nth-child(2) > img{
        width: 20px;
        height: 20px;
        margin: 5px auto;
    }
    .getMorePage .rulesContent > .positionBox > .contentImgBox > div:not(:last-child){
        margin-right: 16px;
    }
    .getMorePage .rulesContent > .positionBox > .contentBtnBox{
        cursor: pointer;
        border-radius: 14px;
        width: 110px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        background-color: #000;
        font-family: Roboto;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        margin-top: 12px;
    }
    .daily{

        .contentBtnBox{
            cursor: pointer;
            border-radius: 14px;
            min-width: 90px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            background-color: #000;
            font-family: Roboto;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #ffffff;
        }
    }
    .flexBox{
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .appBtnBox{
            display: block;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            overflow:hidden;
            background: #000;
            margin-right: 15px;
            margin-top: 15px;
        }
    }
</style>