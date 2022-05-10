<template>
    <div class="vip-grade-item" :style="`background-image:url(${levelItem.cardImageURL});`">
        <span class="expired-time" v-if="expiredTime">
            <span>{{ $t('label.expired_in') }} {{expiredTime}}</span>
            <span class="iconfont" @click="expiredEvent">&#xe718;</span>

            <div class="expired-message" v-if="showExpired">
                {{expiredDescription}}
            </div>
        </span>

        <div class="vip-level-condition" v-if="showProgress && Object.keys(progress).length > 0">
            <div class="condition">
                <span>({{progress.title}})</span>
                <span class="iconfont" @click="conditionEvent">&#xe718;</span>

                <template v-if="showCondition">
                    <div class="condition-message" >
                        {{progress.description}}
                    </div>

                    <span class="condition-jt" v-if="showCondition"></span>
                </template>
            </div>
            
            <div class="progress">
                <span>
                    <span :style="`width:${progress.speed}%;background-color:${levelItem.theme.highlight};`"></span>
                </span>
            </div>

            <div class="level">
                <div>V{{levelItem.level}}</div>
                <div>V{{levelItem.level+1}}</div>
            </div>
        </div>

        <div class="view-rules">
            <a :href="GLOBAL.getUrl(`/fs/vip-policy`)">{{ $t('label.view_rules') }} ></a>
        </div>
    </div>
</template>

<script>
    export default {
        name:"VipGradeItems",
        data(){
            return {
                showExpired:false,
                showCondition:false
            }
        },
        computed:{
            showProgress(){
                return this.levelItem.level == this.userLevel;
            }
        },
        props:{
            levelItem:{
                type:Object,
                required:true,
                default:function(){
                    return {}
                }
            },
            expiredTime:{
                type:String,
                default:''
            },
            userLevel:{
                type:Number,
                default:0
            },
            progress:{
                type:Object,
                default:function(){
                    return {}
                }
            },
            expiredDescription:{
                type:String,
                default:''
            }
        },
        methods:{
            expiredEvent(){
                this.showExpired = true;

                setTimeout(() =>{
                    this.showExpired = false;
                },3000);
            },
            conditionEvent(){
                this.showCondition = true;

                setTimeout(() =>{
                    this.showCondition = false;
                },3000);
            }
        }
    }
</script>

<style scoped lang="scss">
    .vip-grade-item{
        background-repeat: no-repeat;
        background-size: cover;
        background-image: url(https://image.geeko.ltd/chicme/2022050503/V0-card.png);
        width: 100%;
        height: 100%;
        border-radius: 5px;
        position: relative;

        .expired-time{
            position: absolute;
            display: inline-block;
            color: #bababa;
            font-size: 12px;
            top: 14px;
            right: 12px;

            & > span{
                vertical-align: middle;

                &:first-child{
                    margin-right: 3px;
                }
            }

            & .iconfont{
                cursor: pointer;
            }

            .expired-message{
                position: absolute;
                background-color: #fff;
                z-index: 2;
                right: -25px;
                top: 26px;
                width: 63vw;
                color: #222222;
                font-size: 12px;
                text-align: center;
                padding: 8px;
                -os-box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.3);
                -ms-box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.3);
                box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.3);
                border-radius: 2px;

                &::after{
                    content: ' ';
                    position: absolute;
                    width: 8px;
                    height: 10px;
                    right:12%;
                    top: -4px;
                    background-color: #ffffff;
                    transform:rotate(315deg);
                    -moz-transform:rotate(315deg); 	/* Firefox */
                    -webkit-transform:rotate(315deg); /* Safari 和 Chrome */
                    box-shadow: 0px 0px 0px 0 transparent, 0 0px 0px 0px transparent, 0 0 0 0 transparent, 1px -1px 2px -1px rgba(0,0,0,0.25);
                }
            }

            @media screen and (min-width: 300px) and (max-width: 321px){
                .expired-message{
                    &::after{
                        right: 14%;
                    }
                }
            }

            @media screen and (min-width: 325px) and (max-width: 376px){
                .expired-message{
                    &::after{
                        right: 12%;
                    }
                }
            }

            @media screen and (min-width: 380px) and (max-width: 415px){
                .expired-message{
                    &::after{
                        right: 11%;
                    }
                }
            }
        }

        .vip-level-condition{
            position: absolute;
            left: 15px;
            bottom: 17px;
            width: 70%;

            .progress{
                font-size: 12px;
                width: 80%;

                & > span{
                    width: 100%;
                    height: 6px;
                    background-color: #222222;
                    display: inline-block;
                    position: relative;
                    vertical-align: middle;
                    border-radius: 3px;

                    & > span{
                        height: 6px;
                        display: inline-block;
                        background-color: #b8cce4;
                        position: absolute;
                        top: 0;
                        left: 0;
                        border-radius: 3px
                    }
                }
            }

            .condition{
                color: #bababa;
                font-size: 12px;
                display: inline-block;
                position: relative;

                & > span{
                    vertical-align: middle;

                    &:first-child{
                        margin-right: 3px;
                        display: inline-block;
                        max-width: 50vw;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }

                & .iconfont{
                    cursor: pointer;
                }

                .condition-message{
                    position: absolute;
                    background-color: #fff;
                    z-index: 2;
                    left: -25px;
                    width: 63vw;
                    top: 26px;
                    color: #222222;
                    font-size: 12px;
                    text-align: center;
                    padding: 8px;
                    -os-box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.3);
                    -ms-box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.3);
                    box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.3);
                    border-radius: 2px;
                }

                .condition-jt{
                    position: absolute;
                    width: 8px;
                    height: 10px;
                    top: 22px;
                    right: 4px;
                    background-color: #ffffff;
                    transform:rotate(315deg);
                    -moz-transform:rotate(315deg); 	/* Firefox */
                    -webkit-transform:rotate(315deg); /* Safari 和 Chrome */
                    box-shadow: 0px 0px 0px 0 transparent, 0 0px 0px 0px transparent, 0 0 0 0 transparent, 1px -1px 2px -1px rgba(0,0,0,0.25);
                    z-index: 3;
                }

                // @media screen and (min-width: 300px) and (max-width: 321px){
                //     .condition-message{
                //         &::after{
                //             right: 8%;
                //         }
                //     }
                // }

                // @media screen and (min-width: 325px) and (max-width: 376px){
                //     .condition-message{
                //         &::after{
                //             right: 18%;
                //         }
                //     }
                // }

                // @media screen and (min-width: 380px) and (max-width: 415px){
                //     .condition-message{
                //         &::after{
                //             right: 25%;
                //         }
                //     }
                // }
            }

            .level{
                width: 80%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                
                & > div{
                    font-size: 12px;
                    color: #ffffff;
                }
            }
        }

        .view-rules{
            position: absolute;
            right: 12px;
            bottom: 17px;

            & > a{
                text-decoration: underline;
                font-size: 12px;
                color: #bababa;
            }
        }
    }
</style>