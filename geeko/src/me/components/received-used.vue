<template>
    <div class="content">
        <!-- <div class="received" @click="changeMethod(true)" v-bind:class="{ active: isActive }">Received</div>
        <div class="used" @click="changeMethod(false)" v-bind:class="{ active: !isActive }">Used</div> -->
        
        <div class="earnings">
            <div class="__cart">
                <div>
                    <span class="iconfont">&#xe6b2;</span>
                </div>
                <div>$100=+100</div>
                <div>Make purchase</div>
            </div>
            <div class="__review">
                <div>
                    <span class="iconfont">&#xe76b;</span>
                </div>
                <div>+100</div>
                <div>Leave a review</div>
            </div>
            <div class="__suggestion">
                <div>
                    <span class="iconfont">&#xe736;</span>
                </div>
                <div>+200</div>
                <div>Make suggestion</div>
            </div>
        </div>

        <div class="impose">
            <select v-model="selectValue" @change="$emit('showUsed',selectValue)">
                <option value="0">All</option>
                <option value="1">Received</option>
                <option value="2">Used</option>
            </select>
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
    .content{
        .impose{
            padding-left: 20px;
            margin-top: 20px;
            select{
                width: 120px;
                height: 32px;
                border: solid 1px #e6e6e6;
                background-color: #ffffff;
                padding-left: 10px;
            }
        }
        

        .earnings{
            display: flex;
            padding: 27px 20px 25px 20px;
            background-color: #fffbf1;
            & > div{
                flex: 1;
                text-align: center;

                & > div:first-child{
                    width: 54px;
                    height: 54px;
                    line-height: 52px;
                    border: solid 2px #f7c143;
                    border-radius: 50%;
                    margin:0 auto;

                    & > span.iconfont{
                        font-size: 30px;
                        color: #f7c143;
                    }
                }

                & > div:nth-child(2){
                    font-size: 12px;
                    line-height: 22px;
                    color: #222222;
                    font-family: SlatePro-Medium;
                }

                & > div:last-child{
                    font-family: SlatePro-Medium;
                    font-size: 14px;
                    color: #deaa4f;
                }
            }

            .__cart{
                
            }

            .__review{

            }

            .__suggestion{

            }
        }
    }

</style>