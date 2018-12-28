<template>
    <div class="el-me-body">
        <div class="el-me-hd">
            <p style="text-transform:capitalize"><span @click="window.location.href = '/'">{{$t('home')}}</span><router-link to="/me/m"> > {{$t('me')}}</router-link><span v-if="isActive!=='Me'"> > {{isActive}}</span></p>
        </div>
        <div class="el-me-bd">
            <div class="el-me-nav">
                <h3  @click="changeClass('me')"><router-link to="/me/m">{{$t('me')}}</router-link></h3>
                <ul>
                    <li :class="{'active':isActive==='orders'}" @click="changeClass('orders')"><router-link to="/me/m/order">{{$t('myorders')}}</router-link></li>
                    <li :class="{'active':isActive==='tickets'}" @click="changeClass('tickets')"><router-link to="/me/m/tickets">{{$t('mytickets')}}</router-link></li>
                    <li :class="{'active':isActive==='coupons'}" @click="changeClass('coupons')"><router-link to="/me/m/coupons">{{$t('mycoupons')}}</router-link></li>
                    <li :class="{'active':isActive==='credits'}" @click="changeClass('credits')"><router-link to="/me/m/credits">{{$t('mycredits')}}</router-link></li>
                    <li :class="{'active':isActive==='cards'}" @click="changeClass('cards')"><router-link to="/me/m/cards">{{$t('mycreditscards')}}</router-link></li>
                    <li :class="{'active':isActive==='wishlist'}" @click="changeClass('wishlist')"><router-link to="/me/m/wishlist">{{$t('mywishlist')}}</router-link></li>
                    <li :class="{'active':isActive==='addressBook'}" @click="changeClass('addressBook')"><router-link to="/me/m/addressBook">{{$t('addressBook')}}</router-link></li>
                    <li :class="{'active':isActive==='changeEmail'}" @click="changeClass('changeEmail')"><router-link to="/me/m/changeEmail">{{$t('changeEmail')}}</router-link></li>
                    <li :class="{'active':isActive==='changePwd'}" @click="changeClass('changePwd')"><router-link to="/me/m/changePwd">{{$t('changepwd')}}</router-link></li>
                    <li :class="{'active':isActive==='updateProfile'}" @click="changeClass('updateProfile')"><router-link to="/me/m/updateProfile">{{$t('updatepro')}}</router-link></li>
                    <li :class="{'active':isActive==='makeSug'}" @click="changeClass('makeSug')"><router-link to="/me/m/makeSug">{{$t('makesug')}}</router-link></li>
                    <li @click="logoutHandle">{{$t('logout')}}</li>
                </ul>
            </div>
            <div class="el-me-con">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
          return{
              isActive:'Me'
          }
        },
        methods:{
            logoutHandle(){
                this.$store.dispatch('logout').then(() => {
                    window.location.href = '/'
                })
            },
            changeClass(currIndex){
                this.isActive = currIndex
            }
        }
    }
</script>
<style scoped lang="scss">
    .active a{
        color: #222 !important;
        font-weight: bold;
    }
    .el-me-body{
        width: 1141px;
        margin: 0 auto;
        .el-me-hd{
            font-size: 14px;
            color: #666;
            padding:30px 0 60px 0;
            p{
                a{
                    color:#666;
                }
            }
        }
        .el-me-bd{
            .el-me-nav{
                width: 225px;
                float: left;
                h3{
                    padding-bottom: 30px;
                    font-size: 18px;
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
                        &:hover{
                            color: #222;
                            /*font-weight: bold;*/
                        }
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