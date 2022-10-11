<template>
    <div class="el-credit-body">
        <nav-bar style="position:sticky;top:0;background:#fff;z-index: 11;">
            <i class="iconfont el-back-font" slot="left" @click="$router.go(-1)">&#xe693;</i>
            <span slot="center">{{$t("point.my_points")}}</span>
            <a href="/fs/points-policy" slot="right">
                <span class="iconfont" style="font-size:20px;color:#222222;">&#xe73f;</span>
            </a>
        </nav-bar>

        <credit-header :me="pointsCustomerNum"></credit-header>

        <div class="_container">
            <received-used></received-used>
            <points-list v-if="!showPointsMall"></points-list>
        </div>

        <points-mall v-if="showPointsMall"></points-mall>

        <Loading v-if="isGetCustomerLoadingShow"></Loading>
    </div>
</template>

<style scoped lang="scss">
    .el-credits-total {
        text-align: center;
        margin-top: 10px;
    }
    .el-credit-body{
        background-color: #fff;

        ._container{
            padding: 0px 12px;
            margin-top: 10px;
        }
    }
</style>

<script type="text/ecmascript-6">

    import {mapGetters} from 'vuex'
    import store from '../../store'
    import CreditHeader from '../components/credit-header.vue'
    import ReceivedUsed from '../components/received-used.vue'
    import NavBar from '../components/nav-bar.vue'
    import PointsList from '../components/points-list.vue'

    import Loading from '../../components/loading.vue'
    import PointsMall from '../components/points-mall.vue'

    export default{
        data(){
            return {
                received: 0,
                used: 0,
                isGetCustomerLoadingShow:false,
                
            }
        },
        computed: {
            ...mapGetters('me', ['me','pointsCustomerNum']),
            showPointsMall(){
                return window.showPointsMall
            },
/*
            receivedPoints(){
                this.allPoints.forEach(points=>{
                    points.points>0 ? this.received += points.points : this.used += points.points
                })
            },*/
        },
        created:function(){
            let _this = this;
            _this.isGetCustomerLoadingShow = true;
            this.$store.dispatch("me/getCustomerPointsNum").then(() => {
                _this.isGetCustomerLoadingShow = false;
            });
        },
        components: {
            'credit-header': CreditHeader,
            'received-used': ReceivedUsed,
            'nav-bar':NavBar,
            'points-list':PointsList,
            "Loading":Loading,
            'points-mall':PointsMall,
        },
        methods:{
            btnClick(e){
                // console.log(e)
            }   
        }
    }
</script>