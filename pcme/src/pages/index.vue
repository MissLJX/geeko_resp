<template>
    <div class="el-me-body">
        <div class="el-me-hd">
            <p>{{$t('home')}} > {{$t('me')}}</p>
        </div>
        <div class="el-me-bd">
            <div class="el-me-nav">
                <h3><router-link to="/me/m">{{$t('me')}}</router-link></h3>
                <ul>
                    <li><router-link to="/me/m/orders">{{$t('myorders')}}</router-link></li>
                    <li><router-link to="/me/m/tickets">{{$t('mytickets')}}</router-link></li>
                    <li><router-link to="/me/m/coupons">{{$t('mycoupons')}}</router-link></li>
                    <li><router-link to="/me/m/credits">{{$t('mycredits')}}</router-link></li>
                    <li><router-link to="/me/m/cards">{{$t('mycreditscards')}}</router-link></li>
                    <li><router-link to="/me/m/wishlist">{{$t('mywishlist')}}</router-link></li>
                    <li><router-link to="/me/m/addressBook">{{$t('addressBook')}}</router-link></li>
                    <li><router-link to="/me/m/changeEmail">{{$t('changeEmail')}}</router-link></li>
                    <li><router-link to="/me/m/changePwd">{{$t('changepwd')}}</router-link></li>
                    <li><router-link to="/me/m/updateProfile">{{$t('updatepro')}}</router-link></li>
                    <li><router-link to="/me/m/makeSug">{{$t('makesug')}}</router-link></li>
                    <li @click="logoutHandle">{{$t('logout')}}</li>
                </ul>
            </div>
            <div class="el-me-con">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        methods:{
            logoutHandle(){
                this.$store.dispatch('logout').then(() => {
                    window.location.href = '/'
                })
            }
        }
    }
</script>
<style scoped lang="scss">
    .el-me-body{
        width: 1141px;
        margin: 0 auto;
        .el-me-hd{
            font-size: 14px;
            color: #222;
            padding: 30px 0;
        }
        .el-me-bd{
            .el-me-nav{
                width: 225px;
                float: left;
                h3{
                    padding-bottom: 30px;
                    a{
                        text-decoration: none;
                        color: #000000;
                    }
                }
                ul li {
                    padding: 10px 0;
                    cursor: pointer;
                    color: #666666;
                    a{
                        font-size: 14px;
                        color: #666666;
                        text-decoration: none;
                        padding: 12px 0;
                    }
                }
            }
            .el-me-con{
                width: 916px;
                float: left;
            }
            &:after{
                display: block;
                content: '';
                clear: both;
            }
        }
    }
</style>