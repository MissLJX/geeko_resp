<template>
    <div class="size-fit">
        <div class="_hd">
            <span>{{$t("model.size_fit")}}</span>
        </div>

        <div class="_bd">
            <table v-for="(item,index) in modelStatureValue" :key="index+item.name" class="sizetable">
                <tr>
                    <td rowspan="2">{{item.name}}</td>
                    <td v-for="(model,index2) in item.detail" :key="index2+model" class="td-2">{{model.title}}</td>
                </tr>

                <tr>
                    <td class="td-3" v-for="(model2,index3) in item.detail" :key="index3+model2">{{model2.content}}</td>
                </tr>
                {{changeModelStature}}
            </table>
        </div>
    </div>
</template>


<script>
    import { getModelStature } from "../util/utils.js";

    export default {
        name:"ModelSizeFitPc",
        props:{
            model:{
                type: Object
            },
            active:{
                type:String
            }
        },
        computed:{
            modelStatureValue:function(){
                let model = this.modelStature(this.model);
                let modeCM = model.modeCM;
                let modeInch = model.modeInch;
                return this.active == "0" ?  modeInch : modeCM;
            }
        },
        methods:{
            modelStature:function(model){
                let modeCM = getModelStature(model.modelListOnCm,"cm");
                let modeInch = getModelStature(model.modelListOnInch,"inch");
                return {modeCM,modeInch};
            }
        }
    }
</script>

<style scoped lang="scss">
    .size-fit{
        border-bottom: 1px solid #eeeeee;
        margin-bottom: 10px;

        ._hd{
            font-size: 14px;
            color: #222222;
            font-family: 'AcuminPro-Bold';
            margin-top: 17px;
        }

        ._bd{
            margin-top: 10px;
            margin-bottom: 13px;

            .sizetable{
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 10px;
                border: none;
                text-align: center;

                & tr{
                    td{
                        border: 1px solid #e6e6e6;
                        font-size: 12px;
                        padding: 10px 0px;
                    }

                    &:first-child{
                        & > td{
                            &:first-child{
                                width: 54px;
                                background-color: #f5f5f5;
                                font-family: 'SlatePro-Medium';
                                vertical-align: middle;
                            }
                        }
                    }

                    .td-2{
                        color: #666666;
                    }

                    .td-3{
                        color: #222222;
                    }
                }
            }
        }

        
    }
</style>