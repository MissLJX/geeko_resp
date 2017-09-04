<template>
    <div class="el-me-body">

        <div class="el-me-wall">
            <div class="st-table el-me-header-area">
                <div class="st-cell st-v-m">
                    <router-link to="/me/settings">
                        <span class="el-setting-icon"><i class="iconfont el-setting-font">&#xe68a;</i></span>
                    </router-link>
                </div>
                <div class="st-cell st-v-m">
                    <div class="el-me-headerImage">
                        <div>
                            <div :style="{'background-image': 'url('+headerImage+')' }"></div>
                        </div>
                    </div>
                </div>
                <div class="st-cell st-v-m">
                    <router-link to="/me/notification">
                        <span class="el-setting-icon"><i class="iconfont el-setting-font">&#xe633;</i></span>
                    </router-link>
                </div>
            </div>

            <div class="el-me-info">
                <p class="el-name">{{fullName}}</p>
                <p class="el-email">{{me.email}}</p>
            </div>
        </div>


        <div class="el-me-order-area">
            <div class="hd">
                <touch-go class="el-me-order-touch" :label1="$t('label.order')"/>
            </div>
            <div class="bd">
                <div class="line">
                    <div>
                        <i class="iconfont">&#xe600;</i>
                        <span>{{$t('label.processing')}}</span>
                    </div>
                    <div>
                        <i class="iconfont">&#xe600;</i>
                        <span>{{$t('label.shipped')}}</span>
                    </div>
                </div>
                <div class="line">
                    <div>
                        <i class="iconfont">&#xe600;</i>
                        <span>{{$t('label.confirmed')}}</span>
                    </div>
                    <div>
                        <i class="iconfont">&#xe600;</i>
                        <span>{{$t('label.canceled')}}</span>
                    </div>
                </div>
            </div>
        </div>

        <ul class="el-me-tool-list">
            <li>
                <router-link class="el-me-tool-list-item" to="/me/address-book">
                    <touch-go class="el-me-tool-list-touch" :label1="$t('label.addressBook')"/>
                </router-link>
            </li>

            <li>
                <router-link class="el-me-tool-list-item" to="/me/coupons">
                    <touch-go class="el-me-tool-list-touch" :label1="$t('label.coupons')"/>
                </router-link>
            </li>

            <li>
                <router-link class="el-me-tool-list-item" to="/me/credits">
                    <touch-go class="el-me-tool-list-touch" :label1="$t('label.credits')"/>
                </router-link>
            </li>

            <li>
                <router-link class="el-me-tool-list-item" to="/me/wishlist">
                    <touch-go class="el-me-tool-list-touch" :label1="$t('label.wishlist')"/>
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
        background: url(http://peach-1254218975.cossh.myqcloud.com/image/%E9%9F%A9%E5%9B%BD%E5%A5%B3%E7%A5%9E%E5%A7%9C%E6%95%8F%E4%BA%AC%E9%AB%98%E6%B8%85%E8%89%BA%E6%9C%AF%E6%91%84%E5%BD%B1%E6%A1%8C%E9%9D%A2%E5%A3%81%E7%BA%B8%E6%AC%A3%E8%B5%8F.jpg) no-repeat center/cover;
        padding: 10px;
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
        line-height: 39px;
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

        & > .bd {
            border-top: 1px solid #dcdcdc;

            & > .line {
                display: flex;
                & > div {
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
                }
                padding: 15px 0;
                border-top: 1px solid #dcdcdc;
                &:first-child {
                    border-top: none;
                }
            }
        }
    }

    .el-me-tool-list {
        background-color: #fff;
        margin-top: 15px;
        padding-left: 10px;

        & > li {
            border-top: 1px solid #dcdcdc;
            &:first-child {
                border-top: none;
            }
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
</style>

<script type="text/ecmascript-6">

    import {mapGetters, mapActions} from 'vuex'
    import store from '../../store'
    import TouchGo from '../../components/touch-go.vue'
    import YouLikes from '../../components/you-likes.vue'
    import * as utils from '../../utils/geekoutils'


    export default{
        computed: {
            ...mapGetters('me', [
                'me', 'youlikes'
            ]),
            fullName(){
                return this.me.name.firstName + ' ' + this.me.name.lastName;
            },
            headerImage(){
                return utils.IMAGE_PREFIX + '/icon/' + this.me.id
            }
        },
        methods: {},
        components: {
            'touch-go': TouchGo,
            'you-likes': YouLikes
        },
        created(){
            store.dispatch('me/getYoulikes')
        }
    }
</script>