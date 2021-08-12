<template>
    <div class="size-fit">
        <div class="_hd">
            <span>{{$t("model.size_fit")}}</span>
        </div>

        <div class="_bd">
            <table v-for="(item,index) in modelStatureValue" :key="index+item.name" class="sizetable">
                <tr v-for="(model,index2,index3) in item.detail" :key="index2+model.name">
                    <td v-if="index3 == 0" :rowspan="Object.keys(item.detail).length">{{item.name}}</td>
                    <td class="td-2">{{model.title}}</td>
                    <td class="td-3">{{model.content}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>


<script>
    import { getModelStature } from "../util/utils.js";

    export default {
        name:"ModelSizeFit",
        props:{
            model:{
                type: Object
            },
            active:{
                type:Boolean
            }
        },
        computed:{
            modelStatureValue:function(){
                let model = this.modelStature(this.model);
                let modeCM = model.modeCM;
                let modeInch = model.modeInch;
                return this.active ?  modeInch : modeCM;
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
        border-top: 10px solid #f7f7f7;
        padding: 0px 10px;
        margin-bottom: 10px;

        ._hd{
            font-size: 14px;
            color: #222222;
            font-family: 'AcuminPro-Bold';
            margin-top: 17px;
        }

        ._bd{
            margin-top: 10px;

            .sizetable{
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 6px;
                border: none;
                text-align: center;

                & tr{
                    td{
                        border: 1px solid #e6e6e6;
                        font-size: 12px;
                        padding: 7px 0px;
                    }

                    &:first-child{
                        & > td{
                            &:first-child{
                                width: 20%;
                                background-color: #f5f5f5;
                                font-family: 'SlatePro-Medium';
                            }

                            &:nth-child(2){
                                width: 40%;
                            }

                            &:last-child{
                                width: 40%;
                            }
                        }
                    }

                    .td-2{
                        color: #666666;
                    }

                    .td-3{
                        color: #222222;
                        font-family: 'SlatePro-Medium';
                    }
                }
            }
        }

        
    }
</style>