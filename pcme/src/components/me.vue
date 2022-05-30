<template>
    <div class="me">
        <div class="_left-container">
            <div class="_top">
                <!-- 顶部头像组件 -->
                <index-header-icon 
                    :me="me"
                    :feed="feed"
                    :isShowConfirm.sync="isShowConfirm"
                    :isloding.sync="isloding"
                ></index-header-icon>
                <div class="view-more">
                    <router-link :to="getUrl('/me/m/updateProfile')">
                        {{$t("index.my_profile")}} >
                    </router-link>
                </div>

                <index-points-modal :index-message="dobulePoints.me.message" v-if="dobulePoints && dobulePoints.me"></index-points-modal>
            </div>

            <!-- order -->
            <div class="_order m-top">
                <index-order-container
                    :feed="feed"
                ></index-order-container>
            </div>

            <!-- wishlist -->
            <div class="wishlist global-class m-top">
                <index-wishlist :isloding.sync="isloding"></index-wishlist>
            </div>

            <!-- <div class="share m-top">
                <index-share 
                    :isloding="isloding" 
                    @changeLoadin="changeLoadin"
                    :isShowCopy.sync="isShowCopy"
                    :isshowTerm.sync="isshowTerm"
                ></index-share>

            </div> -->
        </div>

        <div class="_right-container">
            <!-- right service -->
            <div class="_top">
                <index-service-container :me="me"></index-service-container>
            </div>

            <!-- right you map also likes -->
            <div class="_you-likes m-top">
                <index-you-likes></index-you-likes>
            </div>
        </div>

        <div class="mask" v-if="isShowCopy">
            <div class="confirm-con confirm-con-l">
                <h3>{{$t('invitationlink')}}</h3>
                <p class="cancel-btn" @click="isShowCopy=false"><i class="iconfont">&#xe69a;</i></p>
                <div><input type="text" :value="this.copy_link"/></div>
                <button class="n-btn tag-read" :data-clipboard-text="this.copy_link" @click="copy">{{$t('copylink')}}</button>
            </div>
        </div>

        <div class="mask mask-s" v-if="isshowTerm">
            <div class="confirm-con confirm-con-s ">
                <h3>{{$t('termandconditions')}}</h3>
                <p class="cancel-btn" @click="isshowTerm=false"><i class="iconfont">&#xe69a;</i></p>
                <p class="term-info">
                    *Up to 50% OFF is valid only for new customers
                </p>
                <p class="term-info">
                    If customers want to use the discount of up to  50% off, the referred person must (i) be a new customer, 
                    (ii) use a referral link to obtain the discount and (iii) make a purchase on  {{this.GLOBAL.siteurl}} 
                    specified in the referral offer prior to the discount's expiration. Referring customers will also receive 
                    a $10 coupon in their  {{this.GLOBAL.siteurl}} account after the referred person pay for the order.  
                    And $10 coupon can be used when the order amount is more than $59. Custom-ers may not refer anyone who has an 
                    existing  {{this.GLOBAL.siteurl}} account under an alternate email address. The discount is only valid 
                    for one month and the referred person can only use the discount once.
                </p>
                <p class="term-info">
                    Any abuse of this offer, as determined by us in our sole discretion, may result in the 
                    rescission of the refer-ring customer's referral discount and the referred person's discount 
                    as well as both parties' inability to partici-pate in this or future promotions. Discount cannot 
                    be applied to previous purchases, and is not redeemable for cash. This referral program is subject to 
                    modification or termination at any time without notice in our sole discretion.
                </p>
            </div>
        </div>

        <div class="mask" v-if="isShowConfirm">
            <div class="confirm-con confirm-con-l">
                <p class="cancel-btn" @click="isShowConfirm=false"><i class="iconfont">&#xe69a;</i></p>
                <p><i class="iconfont">&#xe73c;</i>{{$t('checkmailbox')}}</p>
                <button class="n-btn tag-read" @click="isShowConfirm=false">{{$t('okay')}}</button>
            </div>
        </div>

        <loding v-if="isloding"></loding>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import * as utils from '../utils/geekoutil';
    import Clipboard from 'clipboard';
    import loding from './loding.vue';
    import store from "../store/index.js"

    import IndexHeaderIcon from "../components/index/index-header-icon.vue"
    import IndexOrderContainer from "../components/index/index-order-container.vue"
    import IndexServiceContainer from "../components/index/index-service-container.vue"
    import IndexWishList from "../components/index/index-wishlist.vue"
    import IndexYouLikes from "../components/index/index-you-likes.vue"
    import IndexShare from "../components/index/index-share.vue"
    import IndexPointsModal from "../components/index/index-points-modal.vue"

    export default {
        data(){
            return{
                isloding:false,
                isshowTerm:false,
                isShowCopy:false,
                isShowConfirm:false
            }
        },
        components: {
            'loding':loding,
            "index-header-icon":IndexHeaderIcon,
            "index-order-container":IndexOrderContainer,
            "index-service-container":IndexServiceContainer,
            "index-wishlist":IndexWishList,
            "index-you-likes":IndexYouLikes,
            "index-share":IndexShare,
            "index-points-modal":IndexPointsModal
        },
        computed:{
            ...mapGetters(['me',"feed","copylink","dobulePoints"]),
            pointsCustomer(){
                return this.$store.getters["point/pointsCustomerNum"];
            },
            copy_link(){
                return window.site + '/i/share/register?key='+this.copylink
            }
        },
        mounted(){
        },
        methods:{
            showCopy(){
                this.isShowCopy = true;
            },
            copy(){
                let clipboard = new Clipboard('.tag-read');
                clipboard.on('success', e => {
                    alert('Content copied!')
                })
            },
            changeLoadin(flag){
                this.isloding = flag;
            },
            getUrl(suffix){
                return utils.PROJECT + suffix;
            },
        },
        created(){
            store.dispatch("point/getCustomerPointsNum");
            store.dispatch('getShareKey','copy');
            store.dispatch("getIsShowVipConfig");
            !(this.dobulePoints && this.dobulePoints.me) && store.dispatch("getDobulePointsData","M1578");
        }
    }

</script>

<style scoped lang="scss">
    .me{
        display: flex;
        justify-content: space-between;

        ._left-container{
            width: 642px;

            ._top{
                position: relative;
                background-color: #ffffff;
                padding: 24px 20px;
            }

            ._order{
                background-color: #ffffff;
                padding: 24px 0px;
            }

            .global-class{
                background-color: #ffffff;
                padding: 24px 20px;
            }

            .wishlist{
                padding-bottom: 0px;
            }

            .m-top{
                margin-top: 20px;
            }

            .view-more{
                position: absolute;
                top: 24px;
                right: 20px;
                font-family: 'SlatePro-Medium';
                font-size: 14px;
                color: #666666;

                a{
                    color: #666666;
                    text-decoration: none;
                }
            }
        }

        ._right-container{
            width: 250px;

            ._top{
                padding: 19px 0px;
                padding-bottom: 9px;
                background-color: #ffffff;
            }

            .m-top{
                margin-top: 20px;
            }

            ._you-likes{
                background-color: #ffffff;
                padding-top: 10px;
            }
        }
    }

    .mt-15{
        margin-top: 15px;
    }
    .txr{
        color: #E64545;
    }
    a{
        text-decoration: underline;
        color: #666666;
        cursor: pointer;
    }

    .mask{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.4);
        text-align: center;
        overflow-y: auto;
        z-index: 999;
        .confirm-con-s{
            width: 484px !important;
            top: calc(50% - 245px);
        }
        .confirm-con-l{
            top: calc(50% - 150px);
            padding-bottom: 90px !important;
            p{
                i{
                    color: #57b936;
                    font-size: 32px;
                    position: relative;
                    top: 6px;
                    right: 10px;
                }
            }
            button{
                outline: none;
            }
        }
        .confirm-con{
            width: 642px;
            margin:40px auto;
            position: relative;
            background-color: white;
            color: #222;
            font-size: 14px;
            padding: 35px 50px;
            text-align: left;
            .term-info{
                color: #666;
                font-size: 12px;
                margin-bottom: 10px;
            }
            .share-invite-button{
                width: 240px;
                line-height: 40px;
                border: 1px solid #cacaca;
                color: #222;
                margin-top: 15px;
                text-transform: uppercase;
                text-align: center;
                cursor: pointer;
            }
            .maxtip{
                color: #E64545;
                font-size: 12px;
                margin-top: 10px;
            }
            .email_area{
                label{
                    display: block;
                    color: #666;
                    margin-bottom: 4px;
                    margin-top: 10px;
                }
            }
            .subject{

                label{
                    display: block;
                    margin-bottom: 4px;
                    margin-top: 20px;
                    font-weight: bold;
                }
            }
            .note{
                label{
                    display: block;
                    margin-bottom: 4px;
                    margin-top: 10px;
                    font-weight: bold;
                }
                textarea{
                    height: 102px;
                    border-radius: 2px;
                    border: solid 1px #cacaca;
                    width: 100%;
                    padding: 10px;
                    color: #4b5056;
                    resize: none;
                }
            }
            .share-email-button{
                outline: none;
                width: 240px;
                height: 40px;
                background-color: #222;
                border-radius: 2px;
                line-height: 40px;
                text-align: center;
                color: #fff;
                text-transform: uppercase;
                font-size: 16px;
                margin-top: 20px;
                border: none;
                outline: none;
                box-shadow:none;
                -webkit-appearance: none;
                cursor: pointer;
            }
            input
            {
                width: 514px;
                line-height: 38px;
                border: 1px solid #cacaca;
                padding-left: 10px;
                color: #4b5056;
            }
            h3{
                margin-bottom: 20px;
            }
            .cancel-btn{
                position: absolute;
                top: 20px;
                right: 16px;
                font-size: 18px;
                color: #666666;
                text-align: right;
                cursor: pointer;
                margin-bottom: 15px;
                i{
                    font-size: 20px;
                }
            }
            .n-btn{
                width: 170px;
                line-height: 32px;
                text-align: center;
                background-color: #222;
                color: #fff;
                margin: 0 auto;
                cursor: pointer;
                margin-top: 26px;
                float: left;
                border-radius: 2px;
                border: none;
            }
        }
    }
</style>