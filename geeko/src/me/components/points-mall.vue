<template>
    <div class="pointsProductBox">
        <div class="pointsDetail">
            <div class="pointsTitle">{{$t("points_mall.points_mall")}}</div>
            <img class="leftIcon" src="https://image.geeko.ltd/2021-11-01-lottery/2021-11-01-lottery-points.png"/>
            <img class="rightIcon" src="https://image.geeko.ltd/2021-11-01-lottery/2021-11-01-lottery-points.png"/>
        </div>
        <div class="productDetail">
            <div class="blackBack" style="background:#222;width: 100%;z-index: 3;">
                <div class="productTabBox">
                    <div :class="{'productItem':true, 'productItemSelect':tagShow==1}" @click="changeTag(1)">{{$t("points_mall.points_credit")}}</div>
                    <div :class="{'productItem':true, 'productItemSelect':tagShow==2}" @click="changeTag(2)">{{$t("points_mall.points_redemption")}}</div>
                    <div :class="{'productItem':true, 'productItemSelect':tagShow==3}" @click="changeTag(3)">{{$t("points_mall.points_coupon")}}</div>
                </div>
            </div>
            <div class="productContentBox">
                <product-list 
                    v-if="tagShow !== 3"
                    :products="products" 
                    :loading="loading" 
                    :finished="finished" 
                    @listing="listingHandle"
                    calssify-name="points"
                    event-title="me_points"
                    :requestId="requestId"
                    :experimentId="experimentId"
                    :isPointsMall='true'
                />
                <div v-if="tagShow == 3">
                    <div class="couponItemBox">
                        <div class="couponInfoBox">
                            <div class="couponToward">For Everything</div>
                            <div class="couponNumber">30%OFF</div>
                            <div class="couponDate">{{$t("points_mall.points_date")}}: dd/mm/yyyy ~ dd/mm/yyyy </div>
                        </div>
                        <div class="couponRedeemBox">
                            <div class="couponPoints">100 {{$t("points_mall.points_points")}}</div>
                            <div class="couponRedeemBtn" @click="redeemCoupon()">{{$t("points_mall.points_redeem")}}</div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <div v-show="loading && tagShow!==1 && tagShow!==2" class="el-list-loading"><i class="iconfont">&#xe69f;</i></div>

        <points-message :maskShow="maskShow" 
                        :content="maskContent"
                        :btnList="btnList"
                        @btnClick="(type)=>btnClick(type)"
                        ></points-message>
        
        <div class="pointsCouponExchange" v-if="couponExchangeShow">
            <div class="successImg">
                <span class="iconfont">&#xe6f0;</span>
            </div>
            <div class="successContent">{{$t("points_mall.points_redeem_success")}}</div>
            <div class="couponItemBox">
                <div class="couponInfoBox">
                    <div class="couponToward">For Everything</div>
                    <div class="couponNumber">30%OFF</div>
                    <div class="couponDate">{{$t("points_mall.points_date")}}: dd/mm/yyyy ~ dd/mm/yyyy </div>
                </div>
                <div class="couponRedeemBox1">
                    <div class="couponPoints">100 {{$t("points_mall.points_points")}}</div>
                </div>
            </div>
            <div class="goShoppingBtn" @click="goShopping()">{{$t("survey.survey_go_shopping")}}</div>
        </div>
        
    </div>
</template>

<script>
    import ProductList from '../../components/product-list.vue'
    import store from '../../store/index.js'
    import {getPointsMallCollectionId, getPointsCouponList, pointsCouponExchange, getPointsGoShoppingId} from '../api/index'
    import PointsMessage from '../components/points-message.vue'

    export default {
        data(){
            return{
                tagShow: 1, // 1.全积分兑换 2. 部分积分兑换 3.优惠券
                loading:false,
                finished: false,
                empty: false,
                requestId:"",
                experimentId:"",
                collectionId: '1l6f3T5c8m4U1W2Q1b6h2e1p5',
                allPointsCollection:'',
                partPointsCollection:'',
                couponList: [],
                maskShow: false,
                maskContent:'',
                couponExchangeShow: false,
                goShoppongCollectionId: '',
                btnList:[
                    {
                        color: 'black',
                        content: this.$t("points_mall.points_confirm"),
                        type: '2'
                    },
                    {
                        color: 'white',
                        content: this.$t("points_mall.points_cancel"),
                        type: '1'
                    },
                ]
            }
        },
        computed: {
            products(){
                return store.getters['me/pointsMallProducts']
            },
            skip(){
                return store.getters['me/pointsMallProductsSkip']
            },
            isLogin(){
                return this.$store.getters["me/isLogin"];
            },
        },
        methods: {
            getCollectionId(){
                getPointsGoShoppingId().then(res=>{
                    console.log(res)
                    if(res.code == 200){
                        this.goShoppongCollectionId = JSON.parse(res.result.message).goShoppongCollectionId
                    }
                })
            },
            changeTag(type){
                console.log('...',this.loading)
                if(this.loading){
                    return 
                }
                this.tagShow = type
                store.dispatch("me/clearPointsMallProducts")
                store.dispatch("me/clearPointsMallSkip")
                this.finished = false
                this.empty = false
                if(type==1){
                    this.collectionId = this.allPointsCollection
                    if(window.GeekoSensors){
                        window.GeekoSensors.Track('ProductListExposure', {
                            referrer: document.referrer,
                            page_content: "points_credits",
                            page_sort:'pointmall',
                        })
                    }
                }
                if(type == 2){
                    this.collectionId = this.partPointsCollection;
                    if(window.GeekoSensors){
                        window.GeekoSensors.Track('ProductListExposure', {
                            referrer: document.referrer,
                            page_content: "points_redeem",
                            page_sort:'pointmall',
                        })
                    }
                }
                if(type == 1 || type == 2){
                    this.listingHandle()
                } else {
                    if(window.GeekoSensors){
                        window.GeekoSensors.Track('ProductListExposure', {
                            referrer: document.referrer,
                            page_content: "coupon",
                            page_sort:'pointmall',
                            coupon:true
                        })
                    }
                    this.getCouponList()
                }
            },
            getTagsCollectionId(){
                getPointsMallCollectionId().then(res => {
                    console.log(res)
                    if(res && res.code==200){
                        // for(let i = 0; i < res.result.length; i++){
                            // if(res.result[i]['name'].indexOf('全') != -1){
                                this.allPointsCollection = res.result[0]['id']
                                // console.log('全部',this.allPointsCollection)
                            // }
                            // if(res.result[i]['name'].indexOf('部分') != -1){
                                this.partPointsCollection = res.result[1]['id']
                                // console.log('部分',this.partPointsCollection)
                            // }
                        // }
                    }
                    this.changeTag(1)
                })
            },
            getCouponList(){
                getPointsCouponList().then(data => {
                    console.log(data)
                })
            },
            exchangeCoupon(id){
                if(!id)return
                exchangeCoupon(id).then(res => {
                    console.log(res)
                    if(window.GeekoSensors){
                        window.GeekoSensors.Track('ProductListClick', {
                            referrer: document.referrer,
                            page_content: "coupon",
                            page_sort:'pointmall',
                            is_redeem:'是',
                            fail_reason:'积分不足'
                        })
                    }
                    this.maskContent = this.$t("points_mall.points_not_enough_text")
                    this.btnList = [
                        {
                            color: 'black',
                            content: this.$t("points_mall.points_confirm"),
                            type: '1'
                        },
                    ]
                    if(window.GeekoSensors){
                        window.GeekoSensors.Track('ProductListClick', {
                            referrer: document.referrer,
                            page_content: "coupon",
                            page_sort:'pointmall',
                            is_redeem:'是',
                            fail_reason:'重复兑换'
                        })
                    }
                    this.maskContent = this.$t("points_mall.points_have_same_text")
                    this.btnList = [
                        {
                            color: 'white',
                            content: this.$t("points_mall.points_cancel"),
                            type: '1'
                        },
                        {
                            color: 'black',
                            content: this.$t("points_mall.points_go_shopping"),
                            type: '4'
                        },
                    ]
                })
            },
            listingHandle(){
                this.loading = true
                store.dispatch("me/getPointsMallProducts", {skip: this.skip, collectionId:this.collectionId}).then(({empty, finished,requestId,experimentId}) => {
                    if(finished) this.finished = finished
                    if(empty) this.empty = empty
                    this.loading = false
                    store.dispatch("me/getPointsMallSkip")

                    if(requestId) this.requestId = requestId;
                    if(experimentId) this.experimentId = experimentId;
                })
            },
            redeemCoupon(){
                // You do not have enough points to redeem this coupon.
                // You already have a coupon for the same, so go and pick up your favourite item!
                if(this.isLogin){
                    this.maskContent = this.$t("points_mall.points_check_redeem_text",{points:'200'})
                    this.btnList = [
                        {
                            color: 'black',
                            content: this.$t("points_mall.points_confirm"),
                            type: '2'
                        },
                        {
                            color: 'white',
                            content: this.$t("points_mall.points_cancel"),
                            type: '1'
                        },
                    ]
                } else {
                    this.maskContent = this.$t("points_mall.points_sign_text")
                    this.btnList = [
                        {
                            color: 'black',
                            content: this.$t("points_mall.points_sign"),
                            type: '3'
                        },
                        {
                            color: 'white',
                            content: this.$t("points_mall.points_cancel"),
                            type: '1'
                        },
                    ]
                }
                this.maskShow = true;
                this.bodyStick();
            },
            btnClick(e){
                // console.log(e)
                switch (e){
                    case 1:
                        // 关闭弹窗
                        this.closeMask();
                        return
                    case 2:
                        // 确认兑换
                        this.closeMask();
                        this.couponExchangeShow = true;
                        this.bodyStick();
                        return    
                    case 3:
                        // 未登录
                        window.location.href = this.GLOBAL.getUrl(`/i/login?redirectUrl=/me/m`);
                        return;
                    case 4:
                        this.goShopping();
                        return
                    default:
                        this.closeMask();
                        return
                }
            },
            closeMask(){
                this.rollBack()
                this.maskShow = false;
                if(window.GeekoSensors){
                    window.GeekoSensors.Track('ProductListClick', {
                        referrer: document.referrer,
                        page_content: "coupon",
                        page_sort:'pointmall',
                        is_redeem:'否',
                    })
                }
            },
            goShopping(){
                if(window.GeekoSensors){
                    window.GeekoSensors.Track('ProductListClick', {
                        referrer: document.referrer,
                        page_content: "coupon",
                        page_sort:'pointmall',
                        is_redeem:'是',
                        go_shopping:'是'
                    })
                }
                window.location.href = (window.ctx||'')+'/collection/hot-sale/'+goShoppingCollection+'.html';
            },
            bodyStick(){
                let body = document.getElementsByTagName('body')[0];
                body.style.position = 'fixed'
                body = null
            },
            rollBack(){
                let body = document.getElementsByTagName('body')[0];
                body.style.position = 'unset'
                body = null
            },
            scroll(){
                let pointsDetail = document.getElementsByClassName('pointsDetail')[0];
                // let tabBox = document.getElementsByClassName("productTabBox")[0];
                let tabBox = document.getElementsByClassName("blackBack")[0];

                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop // 滚动条偏移量
            　　let isFixedPoints = scrollTop > 441 ? true : false;
                let isFixedTab = scrollTop > 531 ? true : false;
                // console.log(scrollTop)
                
                if(isFixedPoints){
                    pointsDetail.style.position = 'fixed';
                    pointsDetail.style.top = '44px';
                } else {
                    pointsDetail.style.position = 'relative';
                    pointsDetail.style.top = '0px';
                }
                if(isFixedPoints){
                    tabBox.style.position = 'fixed';
                    tabBox.style.top = '84px';
                } else {
                    tabBox.style.position = 'relative';
                    tabBox.style.top = '0px';
                }
            }
        },
        components: {
            'product-list': ProductList,
            'points-message':PointsMessage
        },
        created(){
            // this.loading = true;

            if(this.products && this.products.length > 0){
                return;
            }
            this.getTagsCollectionId()
            // this.listingHandle()
            document.addEventListener("scroll", this.scroll)
        },
        beforeDestroy(){
            document.addEventListener("remove", this.scroll)
        }
    }
</script>

<style scoped lang="scss">
    .pointsProductBox{
        width: 100%;
        background: #222;
        color: #fff;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
    }
    .pointsDetail{
        width: 100%;
        height: 40px;
        text-align: center;
        padding: 4px 0;
        line-height: 32px;
        position: relative;
        // top: 44px;
        z-index: 10;
        background: #222;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        overflow:hidden;
    }

    .leftIcon{
        position: absolute;
        top: 30px;
        left: 10px;
        width: 18px;
        opacity: 0.8;
    }
    .rightIcon{
        position: absolute;
        top: -10px;
        right: -5px;
        width: 31px;
        height: 31px;
        opacity: 0.8;
    }
    .pointsTitle{
        font-family: 'ACUMINPRO-BOLD';
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        
    }
    .pointsNumber{
        font-family: 'SLATEPRO-MEDIUM';
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #fcc202;
        display: flex;
        align-items:center;
        justify-content:center;
    }
    .pointsNumber > img{
        width: 10px;
    }
    .productDetail{
        width: 100%;
        min-height: 300px;
        background: #fff;
        color: #222;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        .productContentBox{
            padding: 5px 10px 0;
        }
    }
    .productTabBox{
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-family: 'ACUMINPRO-BOLD';
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #666666;
        padding-top: 12px;
        border-bottom: 1px solid #f6f6f6;
        // position: sticky;
        // top: 84px;
        z-index: 10;
        background: #fff;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        width: 100%;
        position: relative;

    }
    .productItem{
        padding-bottom: 6px;
        cursor:pointer;
    }
    .productItemSelect{
        padding-bottom: 4px;
        border-bottom: 2px solid #222;
        color:#222;
    }
    
    
    .couponItemBox{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: calc(100vw * 0.27);
        width: 92%;
        margin: 0 auto;
        background: url(https://image.geeko.ltd/2021-11-01-lottery/2021-11-01-lottery-coupon-background.png) no-repeat;
        background-size: 100% 100%;
        margin-top: 10px;
    }
    .couponInfoBox{
        flex: 100;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: center;
        height: 100%;
    }
    .couponToward{
        height: 19px;
        background-color: #ff7d2e;
        border-radius: 8px;
        font-family: 'SLATEPRO-MEDIUM';
        font-size: 10px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #fff5ed;
        line-height: 19px;
        padding: 0 8px;
        transform: scale(0.83);
        margin-left: 10px;
    }
    .couponNumber{
        font-family: 'ACUMINPRO-BOLD';
        font-size: 50px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ff7d2e;
        line-height: 58px;
        margin-left: 18px;
    }
    .couponDate{
        font-family: 'SLATEPRO';
        font-size: 10px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ff7d2e;
        transform: scale(0.83);
    }
    .couponRedeemBox{
        flex:38;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        height: 100%;
    }
    .couponRedeemBox1{
        flex:38;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100%;
    }
    .couponRedeemBox::before{
        content:'';
        display:block;
        width:10px;
        height: 0px;
        margin-top: 10px;
    }
    .couponPoints{
        font-family: 'ACUMINPRO-BOLD';
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffeadb;
    }
    .couponRedeemBtn{
        background-image: linear-gradient(180deg, #fff6ef 0%, #ffeadb 100%);
        box-shadow: 0px 2px 13px 0px rgba(0,0,0,0.12);
        border-radius: 10px;
        font-family: 'ACUMINPRO-BOLD';
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ff7d2e;
        width: 60px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        margin-bottom: 10px;
        cursor: pointer;
    }

    .el-list-loading {
        text-align: center;
        padding: 10px 0;
        i {
            font-size: 24px;
            display: inline-block;
            animation: list-loading 1.5s infinite linear;
        }
    }

    .pointsCouponExchange{
        position: fixed;
        top: 0;
        background: #fff;
        z-index:10;
        width:100%;
        height:100vh;
        padding: 44px 10px 0;
        margin-top: 10px;
    }
    .successImg{
        width: 54px;
        height: 54px;
        text-align: center;
        line-height:54px;
        background: #ff8031;
        color: #fff;
        border-radius: 50%;
        margin: 0 auto;
    }
    .successImg > .iconfont{
        font-size: 35px;
        margin-top: 10px;
    }
    .successContent{
        font-family: 'SLATEPRO-MEDIUM';
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #222222;
        margin: 16px 0;
        text-align: center;
    }
    .pointsCouponExchange > .couponItemBox{
        width:100%;
    }
    .pointsCouponExchange > .goShoppingBtn{
        height: 41px;
        background-color: #222222;
        border-radius: 2px;
        width: 100%;
        text-align: center;
        line-height: 41px;
        color: #fff;
        margin-top: 30px;
        font-family: 'AcuminPro-Bold';
        cursor: pointer;
    }

</style>

