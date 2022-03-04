<template>
    <div class="product-size">
        <div class="size-container">
            <div class="_hdader">
                {{$t('label.size')}}:
            </div>

            <div class="_body">
                <div 
                    v-for="(variant,index) in product.variants" 
                    :key="index+variant.id"
                    :class="variant.id === variantId ? 'active' : ''"
                    @click="$emit('update:variantId',variant.id)"
                >{{variant.size2}}</div>
            </div>

            <div class="size-message" v-html="disposeDescription(variantProduct.description)" v-if="variantProduct.description"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"ProductSize",
        props:{
            product:{
                type:Object,
                required:true
            },
            variantId:{
                type:String,
                required:true
            },
            variantProduct:{
                type:Object,
                required:true
            }
        },
        methods:{
            disposeDescription(description){
                return description.replace(/:[\w|\d|\-|(|)|\.]+;/g,function(value){
                    return '<span style="color:#999;margin-right: 5px;">'+value+' </span>'
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .product-size{
        margin-top: 15px;
        .size-container{
            ._hdader{
                font-family: SlatePro-Medium;
                font-size: 14px;
            }

            ._body{
                display: flex;
                flex-wrap: wrap;
                margin-top: 8px;

                & > div{
                    display: inline-block;
                    min-width: 56px;
                    height: 24px;
                    border: solid 1px #ddd;
                    cursor: pointer;
                    text-align: center;
                    line-height: 24px;
                    border-radius: 4px;
                    margin-right: 8px;
                    margin-bottom: 12px;

                    &.active{
                        border-color: #222;
                    }
                }
            }

            .size-message{
                line-height: 20px;
                font-size: 12px;
                text-transform: capitalize;
            }
        }
    }
</style>