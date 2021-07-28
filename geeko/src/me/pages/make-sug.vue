<template>
    <div class="make-sug">
        <nav-bar>
            <i class="iconfont el-back-font" slot="left" @click="$router.go(-1)">&#xe693;</i>
            <span slot="center">Suggestion</span>
        </nav-bar>

        <div class="make-sug-container">
            <div class="question-type">
                <div class="_hd">
                    <span class="color-1">*</span><span>Question Type</span>
                </div>

                <div class="_bd">
                    <div class="st-table st-fullwidth _container" @click="questionShow = !questionShow">
                        <div class="st-cell _title">Screen Freeze</div>
                        <div class="st-cell st-t-r _icon">
                            <span class="iconfont">&#xe695;</span>
                        </div>
                    </div>

                    <transition name="fade">
                        <ul class="_screen-list" v-show="questionShow">
                            <li :class="{'active' : question == 'Screen Freeze'}">
                                <input type="radio" id="question1" name="screenFreeze" value="Screen Freeze" v-model="question">
                                <label for="question1"></label>
                                <span>Screen Freeze</span>
                            </li>
                            <li :class="{'active' : question == 'App crush'}">
                                <input type="radio" id="question2" name="screenFreeze" value="App crush" v-model="question">
                                <label for="question2"></label>
                                <span>App crush</span>
                            </li>
                            <li :class="{'active' : question == 'Balck screen'}">
                                <input type="radio" id="question3" name="screenFreeze" value="Balck screen" v-model="question">
                                <label for="question3"></label>
                                <span>Balck screen</span>
                            </li>
                            <li :class="{'active' : question == 'Device reboot'}">
                                <input type="radio" id="question4" name="screenFreeze" value="Device reboot" v-model="question">
                                <label for="question4"></label>
                                <span>Device reboot</span>
                            </li>
                            <li :class="{'active' : question == 'Running slowly'}">
                                <input type="radio" id="question5" name="screenFreeze" value="Running slowly" v-model="question">
                                <label for="question5"></label>
                                <span>Running slowly</span>
                            </li>
                            <li :class="{'active' : question == 'Other error'}">
                                <input type="radio" id="question6" name="screenFreeze" value="Other error" v-model="question">
                                <label for="question6"></label>
                                <span>Other error</span>
                            </li>
                        </ul>
                    </transition>

                    <div class="question-error" v-show="questionShow">
                        <textarea maxlength="150"></textarea>
                    </div>
                </div>
            </div>

            <div class="time">
                <div class="reg-birthday">
                    <div class="_item">
                        <div>
                            <span class="color-1">*</span><span>Time</span>
                        </div>
                    </div>
                    <div style="position: relative;">
                        <div class="reg-birthday-flex">
                            <div class="_saveValue">
                                {{birth}}
                            </div>
                            
                            <div>
                                <div class="iconfont birth">&#xe694;</div>
                            </div>
                        </div>
                        <input type="date" id="reg-birthday-input" v-model="datatime">
                    </div>
                </div>
            </div>

            <div class="description">
                <div class="_hd">
                    <span class="color-1">*</span><span>Description</span>
                </div>

                <div class="_bd">
                    <textarea maxlength="1000" placeholder="Sorry for the inconvenience, we wii fix the problem as soon as possible…" v-model="descriptionAnswer"></textarea>
                </div>

                <p class="_num">{{descriptionNum}}/1000</p>
            </div>

            <div class="upload-image">
                <div class="_hd">
                    <span class="color-1">*</span><span>Upload image</span>
                    <p>Maximum of 3 photos, only JPEG, GIF or PNG.</p>
                </div>

                <div class="_bd">
                    <div class="upload-container imgboxid">
                        <ul v-if="images && images.length">
                            <li v-for="(image,index) in images" class="uploadImage" :key="index+image">
                                <img :src="image"/>
                                <span class="removeImg" @click="removeImg(index)">&times;</span>
                            </li>
                        </ul>
                        <div class="upload-img uploadimg" v-show="images && images.length < 6">
                            <form ref="imageLoader">
                                <input type="file" name="imageFiles" multiple="multiple" @change="loadImg(index,$event)" accept="image/jpg,image/jpeg,image/png,image/gif">
                            </form>
                            <div class="addbtn iconfont">&#xe6d3;</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="sett-address-footer">
            <div class="add-address">Add New Address</div>
        </div>
    </div>
</template>

<script>
    import NavBar from '../components/nav-bar.vue'
    import fecha from 'fecha'
    export default {
        name:"MakeSug",
        components:{
            'nav-bar':NavBar,
        },
        data(){
            return {
                question:"Screen Freeze",
                datatime:"",
                descriptionAnswer:"",
                images:["https://dgzfssf1la12s.cloudfront.net/medium/1c5o8V8y2f9086427H414j481Y-79912",
                    "https://dgzfssf1la12s.cloudfront.net/medium/1c6e0c403y0L0z7x1f4P4D9g96-32414",
                    "https://dgzfssf1la12s.cloudfront.net/medium/1u6g1v5Z9c4c9O8a7l5u8o2b8x-40973"
                    ],
                questionShow:false
            }
        },
        computed:{
            birth(){
                if(this.datatime && this.datatime.length > 0){
                    var d = new Date(Date.parse(this.datatime.replace(/-/g,"/")));
                    var curDate = new Date();
                    if(d >=curDate){
                        alert("Date of birth must be less than the current time！");
                        return fecha.format(new Date(), 'YYYY/MM/DD')
                    }else{
                        return fecha.format(new Date(this.datatime), 'YYYY/MM/DD')
                    }
                }else{
                   return; 
                }
                
            },
            descriptionNum(){
                return this.descriptionAnswer ? 1000 - this.descriptionAnswer.length : 0;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .make-sug{
        padding-bottom: 40px;
       .make-sug-container{
           .question-type{
                padding: 0px 12px;
               ._hd{
                   font-family: 'SlatePro-Medium';
                   font-size: 14px;
                    color: #222222;
               }

               ._bd{
                   ._title{
                        font-size: 12px;
                        color: #666666;
                   }

                   ._icon{
                       .iconfont{
                           color: #222222;
                       }
                   }

                   ._container{
                        height: 30px;
                        line-height: 30px;
                        padding-left: 10px;
                    }

                   ._screen-list{
                       & li{
                            padding: 10px 0px;
                            background-color: #f5f5f5;
                            border-radius: 2px;
                            margin-bottom: 3px;
                            font-size: 12px;
                            color: #666666;
                            position: relative;
                            padding-left: 25px;

                            & > input[type="radio"]{
                                display: none;
                            }

                            & > label{
                                position: absolute;
                                top: 50%;
                                left: 5px;
                                width: 14px;
                                height: 14px;
                                border-radius: 50%;
                                border: 1px solid #999999;
                                transform: translateY(-50%);
                            }

                            // & > span{
                                
                            // }

                            &.active{
                                & > label{
                                    border: 1px solid #222222;
                                    &::after{
                                        position: absolute;
                                        content: "";
                                        width: 8px;
                                        height: 8px;
                                        background-color: #222222;
                                        border-radius: 50%;
                                        left: 50%;
                                        top: 50%;
                                        transform: translate(-50%,-50%);
                                    }
                                }
                            }

                            &:last-child{
                                margin-bottom: 0px;
                            }
                       }
                   }

                   .question-error{
                        padding: 0px 9px;
                        background-color: #f5f5f5;
                        padding-bottom: 10px;
                       textarea{
                            border-radius: 2px;
                            border: solid 1px #e6e6e6;
                            resize: none;
                            width: 100%;
                            height: 36px;
                        }
                   }
               }
           }

           .time{
               border-top: 10px solid#f6f6f6;
               margin-top: 20px;
               .reg-birthday {
                    position: relative;
                    margin-top: 15px;
                    padding: 0px 12px;

                    ._item {
                            display: flex;
                            font-size: 14px;
                            color: #222222;
                            z-index: 2;
                            white-space: nowrap;
                            text-transform: capitalize;
                            font-family: 'SlatePro-Medium';
                    }

                    .reg-birthday-flex {
                        display: flex;
                        height: 30px;
                        line-height: 30px;

                        ._saveValue{
                            width: 100%;
                            font-size: 12px;
                            color: #666666;
                        }
                    }

                    #reg-birthday-input {
                        position: absolute;
                        display: inline-block;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        opacity: 0;
                    }
                }
           }

           .description{
               border-top: 10px solid#f6f6f6;
               padding: 0px 12px;
               ._hd{
                    font-family: 'SlatePro-Medium';
                    font-size: 14px;
                    color: #222222;
                    margin-top: 15px;
               }

               ._bd{
                   margin-top: 10px;
                   textarea{
                        width: 100%;
                        height: 100px;
                        background-color: #f5f5f5;
                        border-radius: 2px;
                        border: solid 1px #eeeeee;
                        resize: none;
                        color: #bbbbbb;
                        font-size: 12px;
                        padding: 10px;
                   }
               }

               ._num{
                    font-size: 12px;
                    color: #999999;
                    text-align: right;
                }
           }

           .upload-image{
               border-top: 10px solid#f6f6f6;
               padding: 0px 12px;
               margin-top: 15px;
               ._hd{
                    font-family: 'SlatePro-Medium';
                    font-size: 14px;
                    color: #222222;
                    margin-top: 15px;

                   & p{
                       font-size: 12px;
                        color: #999999;
                        line-height: 25px;
                   }
               }

               ._bd{
                   .upload-container{
                        overflow:hidden;
                        .upload-img{
                            float:left;
                            margin:5px;
                            width: fit-content;
                            background-size:100%;
                            position: relative;
                            background-color: #f5f5f5;
	                        border: solid 1px #eeeeee;
                            input{
                                display:inline-block;
                                height:70px;
                                width:70px;
                                opacity: 0;
                                position: relative;
                                z-index: 2;
                            }
                            .addbtn{
                                position: absolute;
                                font-size: 23px;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%, -50%);
                                z-index: 0;
                                color: #cccccc;
                            }
                        }
                        .uploadImage{
                            position:relative;
                            height:70px;
                            width:70px;
                            float:left;
                            margin:5px;
                            overflow: hidden;
                            img{
                                width:100%;
                            }
                            .removeImg{
                                width: 18px;
                                line-height: 18px;
                                font-size: 18px;
                                text-align: center;
                                display: block;
                                border-radius: 50%;
                                background-color: #222222;
                                color: #ffffff;
                                position: absolute;
                                top: 0px;
                                right: 0px;
                            }
                        }
                    }
               }
           }

           .color-1{
               color: #e64545;
           }
       }

       .sett-address-footer{
            width: 100%;
            position: fixed;
            bottom: 0px;
            left: 0px;
            right: 0px;
            text-align: center;
            padding: 0px 13px 20px 13px;
            background-color: #fff;

            .add-address{
                height: 42px;
                line-height: 42px;
                background-color: #222222;
                font-family: SlatePro-Medium;
                font-size: 17px;
                color: #ffffff;
            }
        }
    }

    // .fade-enter-active, .fade-leave-active {
    //     transition: opacity .5s;
    // }
    // .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    //     opacity: 0;
    // }

    .fade-enter{// demo元素显示动画 开始状态的效果i的css
        opacity:0;  
    }
    .fade-enter-acitve{//active用于添加过度时间,插入过程
        transition:all  2s;
    }
    .fade-leave-active{//添加过度时间，离开过程
    transition:all 2s;
    }     
    .fade-leave-to {//to 结束动画时，结束状态的效果
        opacity:1 ;
    }

</style>