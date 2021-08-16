<template>
    <div class="my-preference-item">
        <div class="preference">
            <div class="_hd">
                {{title}}
            </div>

            <div class="_bd">
                <div 
                    v-for="(item,index) in category" 
                    :key="index+item.value" 
                    @click="getFavoriteValue(item.value)"
                    :class="{'active' : verifyActive(item.value)}"
                >
                    {{item.label}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"MyPreferenceItem",
        props:{
            title:{
                type:String
            },
            category:{
                type:Array,
                default:function(){
                    return []
                }
            },
            favorite:{
                type:Array
            }
        },
        data(){
            return {
                favoriteValue:[]
            }
        },
        mounted(){
            this.favoriteValue = this.favorite;
        },
        methods:{
            getFavoriteValue(value){
                let flag = this.favoriteValue.indexOf(value);
                if(flag >= 0){
                    this.favoriteValue.splice(flag,1);
                }else{
                    this.favoriteValue.push(value);
                }
                this.$emit("getValue",this.favoriteValue);
                console.log("this.favoriteValue",this.favoriteValue);
            },
            verifyActive(value){
                return this.favoriteValue.indexOf(value) >= 0;
            }
        }
    }
</script>

<style scoped lang="scss">
    .my-preference-item{
        .preference{
            padding: 0px 12px;
            ._hd{
                font-size: 14px;
                color: #222222;
                margin-top: 20px;
                font-family: 'SlatePro-Medium';
            }

            ._bd{
                display: flex;
                flex-wrap: wrap;
                margin-top: 12px;

                & > div{
                    background-color: #f5f5f5;
                    margin: 0px 10px 10px 0px;
                    padding: 8px 15px;
                    font-size: 12px;
                    color: #666666;
                    position: relative;
                    border: 1px solid #f5f5f5;

                    &.active{
                        border: 1px solid #222;

                        &::after{
                            display: inline-block;
                            font-family: "iconfont";
                            content: '\e680';
                            position: absolute;
                            top: 0;
                            right: -1px;
                            font-size: 17px;
                            color: #222;
                        }
                    }
                }
            }
        }
    }
</style>