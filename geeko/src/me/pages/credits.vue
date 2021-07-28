<template>
    <div class="el-credit-body">

        <nav-bar>
            <i class="iconfont el-back-font" slot="left" @click="$router.go(-1)">&#xe693;</i>
            <span slot="center">My Points</span>
            <a href="/fs/points-policy" slot="right">
                <span class="iconfont" style="font-size:20px;color:#222222;">&#xe73f;</span>
            </a>
        </nav-bar>

        <div class="_container">
            <credit-header :me="me"></credit-header>
            <received-used @showUsed="changeMethod"></received-used>
            <points-list></points-list>
        </div>
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

    export default{
        data(){
            return {
                received: 0,
                used: 0,
            }
        },
        computed: {
            ...mapGetters('me', ['feed','me']),
/*
            receivedPoints(){
                this.allPoints.forEach(points=>{
                    points.points>0 ? this.received += points.points : this.used += points.points
                })
            },*/
        },
        components: {
            'credit-header': CreditHeader,
            'received-used': ReceivedUsed,
            'nav-bar':NavBar,
            'points-list':PointsList
        }
    }
</script>