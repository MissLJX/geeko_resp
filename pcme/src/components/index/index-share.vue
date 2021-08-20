<template>
    <div class="index-share">
        <div class="_hd">
            {{$t("share_get")}}
        </div>

        <p>{{$t("index.share_luck_draw_your_friends")}}</p>

        <div class="_bd">
            <div id="face-share">
                <div class="_icon">
                    <span class="iconfont">&#xe647;</span>
                </div>
                <p>{{$t("index.facebook")}}</p>
            </div>
            <div id="face-messenger" v-if="showShare">
                <div class="_icon" style="line-height:29px;">
                    <span class="iconfont">&#xe66a;</span>
                </div>
                <p>{{$t("index.messenger")}}</p>
            </div>
            <div @click="isShowEmail = true;">
                <div class="_icon">
                    <span class="iconfont" style="font-size:12px;">&#xe73e;</span>
                </div>
                <p>{{$t('email')}}</p>
            </div>
            <div @click="$emit('update:isShowCopy',true)">
                <div class="_icon">
                    <span class="iconfont">&#xe739;</span>
                </div>
                <p>{{$t("index.copy")}}</p>
            </div>
        </div>

        <div class="term" @click="$emit('update:isshowTerm',true)">
            <span class="_font">{{$t('termandconditions')}}</span>
            <i class="iconfont">&#xe73f;</i>
        </div>

        <index-share-eamil v-if="isShowEmail" :isShowEmail.sync="isShowEmail" v-bind="$attrs" v-on="$listeners"></index-share-eamil>
    </div>
</template>

<script>
    import IndexShareEmail from "./index-share-eamil.vue"
    import { mapGetters } from "vuex"

    export default {
        name:"IndexShare",
        data(){
            return {
                isShowEmail:false
            }
        },
        components:{
            "index-share-eamil":IndexShareEmail
        },
        computed:{
            ...mapGetters(['sharekey']),
            showShare(){
                return !!window.showShare
            },
            facebook_key(){
                return '/i/share/register?key='+this.sharekey
            },
        },
        created:function(){
            // store.dispatch('getShareKey','facebook')
        }
    }
</script>

<style scoped lang="scss">
    .index-share{
        background-image: linear-gradient(45deg, 
		#ff8174 0%, 
		#ffd955 100%);
	    border-radius: 6px;
        width: 100%;
        position: relative;
        padding: 20px 0px;

        ._hd{
            font-size: 18px;
            color: #ffffff;
            text-align: center;
            font-family: AcuminPro-Bold;
            text-transform: uppercase;
            width: 300px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            margin: 0 auto;
        }

        p{
            font-size: 12px;
            color:#ffffff;
            text-align: center;
            margin-top: 5px;
        }

        ._bd{
            display: flex;
            justify-content: space-between;
            width: 60%;
            margin: 0 auto;
            margin-top: 20px;

            ._icon{
                width: 32px;
                height: 32px;
                text-align: center;
                line-height: 32px;
                color: #ffffff;
                border: 1px solid #ffffff;
                border-radius: 50%;
                margin: 0 auto;
                cursor: pointer;
            }
        }

        .term{
            position: absolute;
            right: 20px;
            top: 23px;
            color: #ffffff;
            font-size: 12px;
            cursor: pointer;

            ._font{
                font-size: 12px;
                color: #ffffff;
                margin-right: 1px;
                text-decoration: underline;
            }

            .iconfont{
                font-size: 13px;
                position: relative;
                top: 1px;
            }
        }
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