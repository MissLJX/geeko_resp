<template>
    <div class="el-me-body">

        <div class="el-me-wall" :style="{'background':background}">
            <div class="el-me-bg" :style="{'background':background_float}">
                <div class="st-table el-me-header-area">
                    <div class="st-cell st-v-m">
                        <router-link :to="{name: 'settings'}">
                            <span class="el-setting-icon"><i class="iconfont el-setting-font">&#xe68a;</i></span>
                        </router-link>
                    </div>
                    <div class="st-cell st-v-m">
                        <div class="el-me-headerImage">
                            <div>
                                <div :style="{'background-image': 'url('+headerImage+'),url('+baseHeaderUrl+')' }"></div>
                            </div>
                        </div>
                    </div>
                    <div class="st-cell st-v-m">
                        <router-link :to="{name: 'notification-promotion'}"
                                     :class="{'el-noti-count':notificationCount > 0}">
                            <span class="el-setting-icon"><i class="iconfont el-setting-font">&#xe60b;</i></span>
                            <span class="el-noti-num">{{notificationCount}}</span>
                        </router-link>
                    </div>
                </div>

                <div class="el-me-info">
                    <p class="el-name">{{fullName}}</p>
                    <p class="el-email">{{me.email}}</p>
                </div>
            </div>
        </div>


        <div class="el-me-order-area">
            <!--邮件确认
            <div class="con-email">
                <router-link :to="{name: 'confirm-email'}">
                    <email-confirm class="el-confirm-email"></email-confirm>
                </router-link>
            </div>
            end 邮件确认-->
            <div class="hd">
                <a :href="orderHref">
                    <touch-go class="el-me-order-touch" :label1="$t('label.order')" :label2="orderhreflabel"
                              :label2Style="{color:'#e5004f', fontWeight:'bold'}">
                        <i slot="icon" class="iconfont" style="font-size:18px;">&#xe600;</i>
                    </touch-go>
                </a>
            </div>
            <!--<div class="bd">
                <div class="line">
                    <div>
                        <a :href="getOrderHref('processing')">
                            <i class="iconfont">&#xe60a;</i>
                            <span>{{$t('label.processing')}}</span>
                            <span v-if="orderCountProcessing > 0"
                                  class="el-me-order-count">{{orderCountProcessing}}</span>
                        </a>
                    </div>
                    <div>
                        <a :href="getOrderHref('shipped')">
                            <i class="iconfont">&#xe609;</i>
                            <span>{{$t('label.shipped')}}</span>
                            <span v-if="orderCountShipped > 0" class="el-me-order-count">{{orderCountShipped}}</span>
                        </a>
                    </div>
                </div>
                <div class="line">
                    <div>
                        <a :href="getOrderHref('confirmed')">
                            <i class="iconfont">&#xe607;</i>
                            <span>{{$t('label.confirmed')}}</span>
                            <span v-if="orderCountReceipt > 0" class="el-me-order-count">{{orderCountReceipt}}</span>
                        </a>
                    </div>
                    <div>
                        <a :href="getOrderHref('canceled')">
                            <i class="iconfont">&#xe608;</i>
                            <span>{{$t('label.canceled')}}</span>
                            <span v-if="orderCountCanceled > 0" class="el-me-order-count">{{orderCountCanceled}}</span>
                        </a>
                    </div>
                </div>
            </div>-->
        </div>

        <ul class="el-me-tool-list">
            <!--<li>
                <router-link class="el-me-tool-list-item" :to="{name: 'address-book'}">
                    <touch-go class="el-me-tool-list-touch" :label1="$t('label.addressBook')">
                        <i slot="icon" class="iconfont">&#xe60f;</i>
                    </touch-go>
                </router-link>
            </li>-->

            <li>
                <router-link class="el-me-tool-list-item" :to="{name: 'coupons'}">
                    <touch-go class="el-me-tool-list-touch" :label1="$t('label.coupons')">
                        <i slot="icon" class="iconfont">&#xe616;</i>
                    </touch-go>
                </router-link>
            </li>

            <li>
                <router-link class="el-me-tool-list-item" :to="{name: 'credits'}">
                    <touch-go class="el-me-tool-list-touch" :label1="$t('label.credits')">
                        <i slot="icon" class="iconfont">&#xe614;</i>
                    </touch-go>
                </router-link>
            </li>

            <li>
                <router-link class="el-me-tool-list-item" :to="{name: 'wishlist'}">
                    <touch-go class="el-me-tool-list-touch" :label1="$t('label.wishlist')">
                        <i slot="icon" class="iconfont">&#xe615;</i>
                    </touch-go>
                </router-link>
            </li>

            <!--Wallet-->
            <li>
                <router-link class="el-me-tool-list-item" :to="{name: 'creditcards'}">
                    <touch-go class="el-me-tool-list-touch" :label1="$t('label.creditcard')">
                        <i slot="icon" class="iconfont">&#xe60f;</i>
                    </touch-go>
                </router-link>
            </li>

        </ul>

        <you-likes class="el-me-like-area" :products="youlikes"/>

    </div>
</template>

<style scoped lang="scss">

    .el-me-body {
        background-color: #efefef;
    }

    .el-me-wall {
        height: 150px;
        background-size: cover !important;
        position: relative;
        .el-me-bg{
            position: absolute;
            width: 100%;
            height: 150px;
            padding: 10px;
            background-color:rgba(0,0,0,0.66) ;
        }
    }

    .el-me-headerImage {
        border: 2px solid rgba(0, 0, 0, 0.2);
        padding: 2px;
        border-radius: 50%;
        margin: 0 25px;
        & > div {
            border: 4px solid rgba(0, 0, 0, 0.2);
            border-radius: 50%;
            & > div {
                width: 70px;
                height: 70px;
                background: no-repeat center/cover;
                border-radius: 50%;
            }
        }
    }

    .el-me-header-area {
        margin: auto;
    }

    .el-me-info {
        text-align: center;

        .el-name {
            font-weight: bold;
            font-size: 16px;
            color: #fff;
        }

        .el-email {
            font-size: 14px;
            color: #fff;
        }
    }

    .el-setting-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.2);
        text-align: center;
        line-height: 38px;
        display: inline-block;

        & > .el-setting-font {
            font-size: 22px;
            color: #fff;
        }
    }

    .el-me-order-touch {
        width: 100%;
        height: 50px;
    }

    .el-me-order-area {
        background-color: #fff;
        & > .hd {
            padding: 0 10px;
        }

        & > .con-email {
            padding: 0 10px;
            background-color: #eeeeee;
            color: #666666;
            line-height: 26px;
            border-bottom: 1px solid #e4e3e3;
        }

        & > .bd {
            border-top: 1px solid #dcdcdc;

            & > .line {
                display: flex;
                & > div {
                    position: relative;
                    width: 50%;
                    text-align: center;
                    border-left: 1px solid #dcdcdc;
                    &:first-child {
                        border-left: none;
                    }

                    i {
                        display: block;
                        font-size: 26px;
                        color: #666;
                    }

                    span {
                        display: block;
                        color: #666;
                        margin-top: 5px;
                    }

                    .el-me-order-count {
                        position: absolute;
                        background-color: #e5004f;
                        color: #fff;
                        font-size: 12px;
                        border-radius: 15px;
                        padding: 4px 8px;
                        top: -16px;
                        left: calc(50% + 5px);
                    }
                }
                padding: 15px 0;
                border-top: 1px solid #dcdcdc;
                &:first-child {
                    border-top: none;
                }
            }

            a {
                text-decoration: none;
            }

        }
    }

    .el-me-tool-list {
        background-color: #fff;
        padding-left: 10px;
        & > li {
            border-top: 1px solid #dcdcdc;
        }

        .el-me-tool-list-item {
            text-decoration: none;
            display: block;
            color: #222928;
            .el-me-tool-list-touch {
                height: 40px;
                width: 100%;
                padding-right: 10px;
            }
        }
    }

    .el-me-like-area {
        background-color: #fff;
        margin-top: 15px;
    }

    .el-noti-num {
        display: none;
    }

    .el-noti-count {
        display: inline-block;
        position: relative;
        .el-noti-num {
            display: inline-block;
            background-color: #fff;
            color: #e5004f;
            border-radius: 20px;
            position: absolute;
            top: -9px;
            right: -9px;
            padding: 3px 7px;
        }
    }

    .el-confirm-email {
        width: 100%;
    }
</style>

<script type="text/ecmascript-6">

    import {mapGetters, mapActions} from 'vuex';
    import store from '../../store';
    import TouchGo from '../../components/touch-go.vue';
    import YouLikes from '../../components/you-likes.vue';
    import EmailConfirm from '../../components/confirm-email.vue';
    import * as utils from '../../utils/geekoutils';


    export default {
        computed: {
            ...mapGetters('me', [
                'me', 'youlikes', 'feed', 'headerImage', 'notificationCount', 'orderCountProcessing', 'orderCountShipped', 'orderCountReceipt', 'orderCountCanceled', 'orderCountUnpaid'
            ]),
            fullName() {
                return this.me.name.firstName + ' ' + this.me.name.lastName;
            },
            orderHref() {
                let path = '';
                if (this.orderCountUnpaid > 0)
                    path = 'unpaid'
                return utils.PROJECT + '/me/m/order/' + path;
            },
            confirmHref() {
                return utils.PROJECT + '/me/m/order/confirm-email';
            },
            orderhreflabel() {
                return this.orderCountUnpaid ? `${this.$t('label.unpaid')}(${this.orderCountUnpaid})` : ''
            },
            background() {
                if (site == 'chicme') {
                    return 'url("https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/chicme/msite_bg.jpg")';
                } else if (site == 'ivrose') {
                    return '#e9546b';
                } else {
                    return '#337ab7';
                }
            },
            background_float() {
                if (site == 'chicme') {
                    return '';
                } else if (site == 'ivrose') {
                    return '#e9546b';
                } else {
                    return '#337ab7';
                }
            },
            baseHeaderUrl() {
                if (site == 'chicme') {
                    return 'https://dgzfssf1la12s.cloudfront.net/site/pc/icon35.png';
                } else if (site == 'ivrose') {
                    return 'https://dgzfssf1la12s.cloudfront.net/site/ivrose/icon47.png';
                } else {
                    return 'https://dgzfssf1la12s.cloudfront.net/site/bouti/logo02.png';
                }
            }
        },

        methods: {
            getOrderHref(path) {
                return utils.PROJECT + '/me/m/order/' + path;
            }
        },
        components: {
            'touch-go': TouchGo,
            'you-likes': YouLikes,
            'email-confirm': EmailConfirm,
        },
        created() {
            if (!this.youlikes || !this.youlikes.length) {
                store.dispatch('me/getYoulikes');
            }

            store.dispatch('me/countNotifications');

            store.dispatch('me/getOrderCountProcessing');

            store.dispatch('me/getOrderCountShipped');

            store.dispatch('me/getOrderCountReceipt');

            store.dispatch('me/getOrderCountCanceled');

            store.dispatch('me/getOrderCountUnpaid');
        }
    };
</script>
