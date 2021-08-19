<template>
    <div class="about-policy">
        <nav-bar>
            <i class="iconfont el-back-font" slot="left" @click="$router.go(-1)">&#xe693;</i>
            <span slot="center">{{$t('index.about')}} {{GLOBAL.sitename}}</span>
        </nav-bar>

        <div class="policy-container">
            <ul class="el-me-tool-list">
                <li>
                    <a href="/fs/shipping-policy" class="el-me-tool-list-item">
                        <touch-go class="el-me-tool-list-touch" :label1="$t('index.shipping_policy')">
                        </touch-go>
                    </a>
                </li>

                <li>
                    <a href="/fs/return-policy" class="el-me-tool-list-item">
                        <touch-go class="el-me-tool-list-touch" :label1="$t('index.return_policy')">
                        </touch-go>
                    </a>
                </li>

                <li>
                    <a href="/fs/privacy-security-policy" class="el-me-tool-list-item">
                        <touch-go class="el-me-tool-list-touch" :label1="$t('index.privacy_policy')">
                        </touch-go>
                    </a>
                </li>

                <li>
                    <a href="/fs/out-of-stock" class="el-me-tool-list-item">
                        <touch-go class="el-me-tool-list-touch" :label1="$t('index.out_of_stock_policy')">
                        </touch-go>
                    </a>
                </li>

                <!-- <li>
                    <router-link class="el-me-tool-list-item" :to="{name: 'change-password'}">
                        <touch-go class="el-me-tool-list-touch" :label1="'Intellectual Property Rights'">
                        </touch-go>
                    </router-link>
                </li> -->

                <li>
                    <a href="/fs/terms-conditions-notice" class="el-me-tool-list-item">
                        <touch-go class="el-me-tool-list-touch" :label1="$t('index.terms_conditions')">
                        </touch-go>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import NavBar from '../components/nav-bar.vue'
    import TouchGo from '../../components/touch-go.vue'

    export default {
        name:"AboutPolicy",
        components: {
            'nav-bar': NavBar,
            'touch-go':TouchGo
        }
    }
</script>

<style scoped lang="scss">
    .policy-container{
        .el-me-tool-list{
            // padding-left: 10px;

            &._b-top{
                border-top: 10px solid #f6f6f6;
            }

            & > li{
                border-top: 1px solid #eeeeee;

                & > a{
                    display: block;
                }
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
</style>