<template>
    <div class="el-setting-body">
        <nav-bar>
            <i class="iconfont el-back-font" slot="left" @click="$router.go(-1)">&#xe693;</i>
            <span slot="center">{{$t('label.settings')}}</span>
        </nav-bar>

        <div class="setting-container">
            <ul class="el-me-tool-list">
                <li>
                    <router-link class="el-me-tool-list-item" :to="{name: 'settings'}">
                        <touch-go class="el-me-tool-list-touch" :label1="'Change Currency'">
                        </touch-go>
                    </router-link>
                </li>

                <li>
                    <router-link class="el-me-tool-list-item" :to="{name: 'coupons'}">
                        <touch-go class="el-me-tool-list-touch" :label1="'Notification Setting'">
                        </touch-go>
                    </router-link>
                </li>
            </ul>

            <ul class="el-me-tool-list _b-top">
                <li>
                    <router-link class="el-me-tool-list-item" :to="{name: 'creditcards'}">
                        <touch-go class="el-me-tool-list-touch" :label1="'Shipping Policy'">
                        </touch-go>
                    </router-link>
                </li>

                <li>
                    <router-link class="el-me-tool-list-item" :to="{name: 'creditcards'}">
                        <touch-go class="el-me-tool-list-touch" :label1="'Return Policy'">
                        </touch-go>
                    </router-link>
                </li>

                <li>
                    <router-link class="el-me-tool-list-item" :to="{name: 'creditcards'}">
                        <touch-go class="el-me-tool-list-touch" :label1="'Out of stock'">
                        </touch-go>
                    </router-link>
                </li>

                <li>
                    <router-link class="el-me-tool-list-item" :to="{name: 'creditcards'}">
                        <touch-go class="el-me-tool-list-touch" :label1="'Privacy&Security Policy'">
                        </touch-go>
                    </router-link>
                </li>

                <li>
                    <router-link class="el-me-tool-list-item" :to="{name: 'creditcards'}">
                        <touch-go class="el-me-tool-list-touch" :label1="'Intellectual Property Rights'">
                        </touch-go>
                    </router-link>
                </li>

                <li>
                    <router-link class="el-me-tool-list-item" :to="{name: 'creditcards'}">
                        <touch-go class="el-me-tool-list-touch" :label1="'Contact Us'">
                        </touch-go>
                    </router-link>
                </li>

                <li>
                    <router-link class="el-me-tool-list-item" :to="{name: 'creditcards'}">
                        <touch-go class="el-me-tool-list-touch" :label1="'Terms & Conditions Notice'">
                        </touch-go>
                    </router-link>
                </li>
            </ul>

            <ul class="el-me-tool-list _b-top">
                <li>
                    <router-link class="el-me-tool-list-item" :to="{name: 'settings'}">
                        <touch-go class="el-me-tool-list-touch" :label1="'Feedback'">
                        </touch-go>
                    </router-link>
                </li>

                <li>
                    <router-link class="el-me-tool-list-item" :to="{name: 'coupons'}">
                        <touch-go class="el-me-tool-list-touch" :label1="'Rate App'">
                        </touch-go>
                    </router-link>
                </li>

                <li>
                    <router-link class="el-me-tool-list-item" :to="{name: 'settings'}">
                        <touch-go class="el-me-tool-list-touch" :label1="'Clear Cache'">
                        </touch-go>
                    </router-link>
                </li>

                <li>
                    <router-link class="el-me-tool-list-item" :to="{name: 'coupons'}">
                        <touch-go class="el-me-tool-list-touch" :label1="'Delete Account'">
                        </touch-go>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
    body{
        background-color: #ffffff;
    }

    .el-setting-body{
        background: #ffffff;
        .setting-container{
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
                }
            }
        }
    }
</style>

<script type="text/ecmascript-6">
    import NavBar from '../components/nav-bar.vue'
    import TouchGo from '../../components/touch-go.vue'

    import {mapGetters} from 'vuex'
    import fecha from 'fecha'
    import _ from 'lodash'

    export default{
        data(){
            return {
                info: null,
                currency: null,
                isShow:false,
                pickedReason: 'Too many marketing mails',
                showOthers:false,
                inputReason:'',
                isMaskShow:false
            }
        },
        computed: {
            
        },
        methods: {
            
        },
        components: {
            'nav-bar': NavBar,
            'touch-go':TouchGo
        },
        created(){

        }
    }
</script>