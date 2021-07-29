<template>
    <div class="received-used">
        <div class="_hd">
            How to get points?
        </div>

        <div class="_bd">
            <div class="review">
                <div>
                    <span class="iconfont">&#xe6d1;</span>
                </div>
                <div class="_font">
                    <p>Review</p>
                    <p>0~2000 points</p>
                </div>
            </div>
            <div class="survey">
                <div>
                    <span class="iconfont">&#xe6cf;</span>
                </div>
                <div class="_font">
                    <p>Survey</p>
                    <p>0~300 points</p>
                </div>
            </div>
            <div class="suggestion">
                <div>
                    <span class="iconfont">&#xe6d0;</span>
                </div>
                <div class="_font">
                    <p>Suggestion</p>
                    <p>0~200 points</p>
                </div>
            </div>
            <div class="download">
                <div>
                    <span class="iconfont">&#xe6d2;</span>
                </div>
                <div class="_font">
                    <p>Download App</p>
                    <p>Get More points</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                selectValue:0
            }
        }
    }
</script>

<style scoped lang="scss">
    .received-used{
        margin-bottom: 15px;
        ._hd{
            font-size: 14px;
            color: #222222;
            font-family: 'AcuminPro-Bold';
            padding: 25px 0px 10px 0px;
        }

        ._bd{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            & > div{
                width: calc(50% - 5px);
                display: flex;
                align-items: center;
                justify-content: center;
                height: 72px;
                margin-bottom: 10px;

                & .iconfont{
                    font-size: 30px;
                    color: #ffffff;
                    margin-right: 10px;
                }

                & ._font{
                    & > p:first-child{
                        font-size: 14px;
                        color: #ffffff;
                        font-family: 'AcuminPro-Bold';
                    }

                    & > p:last-child{
                        font-size: 12px;
	                    color: #ffffff;
                    }
                }
            }

            .review{
                background-image: linear-gradient(124deg, 
                    #ff8976 0%, 
                    #ffcca8 100%);
                border-radius: 4px;
            }

            .survey{
                background-image: linear-gradient(124deg, 
                    #b886b4 0%, 
                    #dab1db 100%);
                border-radius: 4px;
            }

            .suggestion{
                background-image: linear-gradient(124deg, 
                #77efbf 0%, 
                #7dede2 100%);
                border-radius: 4px;
            }

            .download{
                background-image: linear-gradient(124deg, 
                    #a7a7a7 0%, 
                    #d9d9d9 100%);
                border-radius: 4px;

                & .iconfont{
                    font-size: 27px;
                }
            }
        }
    }

</style>