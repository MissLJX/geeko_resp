<template>
    <div id="me">
        <nav-bar>
            <span slot="center">My Account</span>
            <!-- <router-link :to="{name: 'settings'}" slot="right">
                <span class="iconfont" style="font-size:20px;">&#xe699;</span>
            </router-link> -->
        </nav-bar>

        <div class="header-portrait">
            <div>
                <div class="icon" :style="{'background-image': 'url('+headerImage+'),url('+baseHeaderUrl+')' }"></div>
            </div>
            <div>
                <div>{{fullName}}</div>
                <div>{{me.email}}</div>
            </div>
        </div>

         <div class="me-main">
                <ul class="el-me-tool-list">
                    <li>
                        <a :href="orderHref">
                            <touch-go class="el-me-tool-list-touch" :label1="'My Order'" :label2="orderhreflabel" :label2Style="{color:'#e5004f', fontWeight:'bold'}">
                                <span class="iconfont _icon" slot="icon">&#xe68f;</span>
                            </touch-go>
                        </a>
                    </li>

                    <li>
                        <router-link :to="{name: 'track-order'}">
                            <touch-go class="el-me-tool-list-touch" :label1="'Track Order'">
                                <span class="iconfont _icon f-icon-17" slot="icon">&#xe69c;</span>
                            </touch-go>
                        </router-link>
                    </li>
                </ul>

                <ul class="el-me-tool-list _b-top">
                    <li>
                        <router-link class="el-me-tool-list-item" :to="{name: 'edit-user-message'}">
                            <touch-go class="el-me-tool-list-touch" :label1="'My Details'">
                                <span class="iconfont _icon f-icon-18" slot="icon">&#xe6a3;</span>
                            </touch-go>
                        </router-link>
                    </li>

                    <li>
                        <router-link class="el-me-tool-list-item" :to="{name: 'coupons'}">
                            <touch-go class="el-me-tool-list-touch" :label1="'Coupons'">
                                <span class="iconfont _icon f-icon-15" slot="icon">&#xe697;</span>
                            </touch-go>
                        </router-link>
                    </li>

                    <li>
                        <router-link class="el-me-tool-list-item" :to="{name: 'credits'}">
                            <touch-go class="el-me-tool-list-touch" :label1="'Ponits'">
                                <span class="iconfont _icon f-icon-18" slot="icon">&#xe698;</span>
                            </touch-go>
                        </router-link>
                    </li>

                    <li>
                        <router-link class="el-me-tool-list-item" :to="{name: 'creditcards'}">
                            <touch-go class="el-me-tool-list-touch" :label1="'Wallet'">
                                <span class="iconfont _icon f-icon-14" slot="icon">&#xe6a1;</span>
                            </touch-go>
                        </router-link>
                    </li>
                </ul>

                <ul class="el-me-tool-list _b-top">
                    <li>
                        <router-link class="el-me-tool-list-item" :to="{name: 'wishlist'}">
                            <touch-go class="el-me-tool-list-touch" :label1="$t('label.wishlist')">
                                <span class="iconfont _icon" slot="icon">&#xe6a2;</span>
                            </touch-go>
                        </router-link>
                    </li>

                    <li>
                        <router-link class="el-me-tool-list-item" :to="{name: 'address-book'}">
                            <touch-go class="el-me-tool-list-touch" :label1="$t('label.addressBook')">
                                <span class="iconfont _icon f-icon-18" slot="icon">&#xe691;</span>
                            </touch-go>
                        </router-link>
                    </li>

                    <li>
                        <a class="el-me-tool-list-item" href="/share">
                            <touch-go class="el-me-tool-list-touch" :label1="'Share & Get $15'">
                                <span class="iconfont _icon f-icon-18" slot="icon">&#xe69b;</span>
                            </touch-go>
                        </a>
                    </li>

                    <li>
                        <a href="/support">
                            <touch-go class="el-me-tool-list-touch" :label1="'Support'">
                                <span class="iconfont _icon" slot="icon">&#xe6a0;</span>
                            </touch-go>
                        </a>
                    </li>
                </ul>
        </div>

        <div class="me-btn" @click="logoutHandle">{{$t('label.logout')}}</div>
    </div>
</template>

<script type="text/ecmascript-6">
    import NavBar from '../components/nav-bar.vue'
    import {mapGetters, mapActions} from 'vuex';
    import store from '../../store';
    import TouchGo from '../../components/touch-go.vue';
    import YouLikes from '../../components/you-likes.vue';
    import EmailConfirm from '../../components/confirm-email.vue';
    import * as utils from '../../utils/geekoutils.js';


    export default {
        computed: {
            ...mapGetters('me', [
                'me', /*'youlikes'*/, 'feed', 'headerImage', 'notificationCount', 'orderCountProcessing', 'orderCountShipped', 'orderCountReceipt', 'orderCountCanceled', 'orderCountUnpaid'
            ]),
            fullName() {
                    return this.getName(this.me.name.firstName) + ' ' + this.getName(this.me.name.lastName);
            },
            orderHref() {
                let path = 'all';
                if (this.orderCountUnpaid > 0)
                    path = 'unpaid'
                    // /me/m/order/
                return utils.PROJECT + '/me/m/order/' + path;
            },
            confirmHref() {
                return utils.PROJECT + '/me/m/order/confirm-email';
            },
            orderhreflabel() {
                return this.orderCountUnpaid ? `${this.$t('label.unpaid')}(${this.orderCountUnpaid})` : ''
            },
            background() {
                if (window.name === 'chicme') {
                    return 'url("https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/chicme/msite_bg.jpg")';
                } else if (window.name === 'ivrose') {
                    return '#e9546b';
                } else {
                    return '#337ab7';
                }
            },
            background_float() {
                if (window.name === 'chicme') {
                    return '';
                } else if (window.name === 'ivrose') {
                    return '#e9546b';
                } else {
                    return '#337ab7';
                }
            },
            baseHeaderUrl() {
                if (window.name === 'chicme') {
                    return 'https://image.geeko.ltd/site/pc/icon35.png';
                } else if (window.name === 'ivrose') {
                    return 'https://image.geeko.ltd/site/ivrose/icon47.png';
                } else {
                    return 'https://image.geeko.ltd/site/bouti/logo02.png';
                }
            },
            isConfirmEmail(){
                return !this.me.isConfirmEmail&&this.me.email
            }
        },

        methods: {
            getOrderHref(path) {
                return utils.PROJECT + '/me/m/order/' + path;
            },
            getName(value){
                return value ? value : '';
            },
            logoutHandle:function(){
                store.dispatch('logout').then(() => {
                    window.location.href = "/";
                });
            }
        },
        components: {
            'touch-go': TouchGo,
            'you-likes': YouLikes,
            'email-confirm': EmailConfirm,
            'nav-bar':NavBar
        },
        created() {
/*            if (!this.youlikes || !this.youlikes.length) {
                store.dispatch('me/getYoulikes');
            }*/

            store.dispatch('me/countNotifications');

            store.dispatch('me/getOrderCountProcessing');

            store.dispatch('me/getOrderCountShipped');

            store.dispatch('me/getOrderCountReceipt');

            store.dispatch('me/getOrderCountCanceled');

            store.dispatch('me/getOrderCountUnpaid');
        }
    };
</script>


<style scoped lang="scss">
    #me{
        padding-bottom: 30px;
        background-color: #fff;
        .header-portrait{
            padding: 20px 22px;
            display: table;
            .icon{
                background: url(https://amour-erp.oss-cn-shanghai.aliyuncs.com/image/product/1c6a1m1L1N3l1c350K9K0h7u9q.jpg) top center/cover;
                width: 80px;
                height: 80px;
                border-radius: 50%;
            }

            & > div{
                display: table-cell;
            }

            & > div:last-child{
                vertical-align: middle;
                padding-left: 15px;

                & > div:first-child{
                    font-family: SlatePro-Medium;
	                font-size: 15px;
                    color: #222222;
                    margin-bottom: 8px;
                }

                & > div:last-child{
                    font-family: SlatePro;
                    font-size: 14px;
                    color: #666666;
                }
            }
        }

        .me-main{
            .el-me-tool-list{
                padding-left: 10px;

                &._b-top{
                    border-top: 10px solid #f6f6f6;
                }

                & > li{
                    border-top: 1px solid #eeeeee;
                }

                & > li:first-child{
                    border-top: none;
                }

                .el-me-tool-list-touch{
                    height: 50px;
                    width: 100%;
                    padding: 0px 10px;

                    .iconfont._icon{
                        &.f-icon-17{
                            font-size: 17px;
                        }

                        &.f-icon-15{
                            font-size: 15px;
                        }

                        &.f-icon-18{
                            font-size: 18px;
                        }

                        &.f-icon-14{
                            font-size: 14px;
                        }
                    }
                }
            }
        }

        .me-btn{
            width: 140px;
            height: 30px;
            line-height: 30px;
            background-color: #121314;
            border-radius: 2px;
            margin: 0 auto;
            font-family: SlatePro-Medium;
            font-size: 14px;
            color: #ffffff;
            text-align: center;
            margin-top: 27px;
        }
    }
</style>