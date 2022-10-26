<template>
    <div class="product-color-item">
        <template 
            v-for="(product, index) in products" 
        >
            <a 
                :class="['color-item','beauty-color',productId == product.id ? 'active':'']"
                :key="product.id+index"
                v-if="isBeauty"
                @click="()=>handleChange(product.id)"
            >
                <span 
                    class="normal-color"
                    :style="{
                        backgroundColor: `${getColor(product.variants[0].color)}`,
                        backgroundImage: product.variants[0].colorImage ? `url(${product.variants[0].colorImage})`: undefined
                    }"
                ></span>
                <span class="hot-color" v-if="!!product.hotColor">
                    <span>Hot</span>
                </span>
            </a>
            <a 
                :class="['color-item','regular-color',productId == product.id ? 'active':'']" 
                v-else
                :key="product.id+index"
            >
                <span 
                    class="normal-color"
                    :style="{
                        backgroundColor: `${getColor(product.variants[0].color)}`,
					    backgroundImage: `url(${imagePrefix}/small/${product.variants[0].image || product.pcMainImage})`
                    }"
                    @click="()=>handleChange(product.id)"
                ></span>
                <span class="hot-color" v-if="!!product.hotColor">
                    <span>Hot</span>
                </span>
            </a>  
        </template>
        
    </div>
</template>

<script>
    import { IMAGE_PREFIX } from "../../utils/geekoutils"

    export default {
        name:"ProductColorItem",
        data(){
            return {
                imagePrefix:IMAGE_PREFIX
            }
        },
        props:{
            products:{
                type:Array,
                default:() =>{
                    return [];
                }
            },
            isBeauty:{
                type:Boolean,
                default:false
            },
            productId:{
                type:String,
                required:true
            }
        },
        methods:{
            getColor(color){
                return color?.replace(/\s/g, '').toLowerCase()
            },
            handleChange(productId){
                this.$emit("changeProduct",productId);
            }
        }
    }
</script>

<style scoped lang="scss">
    .product-color-item{
        display: flex;
        flex-wrap: wrap;

        .color-item {
            .hot-color{
                background: #FEECE8;
                border-radius: actual(2);
                display: inline-block;
                position: absolute;
                top: -4px;
                right: -8px;
                line-height: 10px;

                & > span{
                    font-size: 12px;
                    text-transform: capitalize;
                    color: #E64545;
                    display: inline-block;
                    transform: scale(0.7);
                }
            }
        }
        

        .regular-color{
            width: 36px;
            height: 36px;
            cursor: pointer;
            border-radius: 50%;
            padding: 2px;
            border: 1px solid #D9D9D8;
            margin-right: 10px;
            margin-top: 5px;
            position: relative;
            
            .normal-color{
                display: inline-block;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-size: cover;
                background-repeat: no-repeat;
            }

            &.active {
                border-color: #222;
            }
        }

        .beauty-color{
            width: 32px;
            height: 32px;
            cursor: pointer;
            border-radius: 50%;
            padding: 2px;
            border: 1px solid transparent;
            margin-right: 10px;
            margin-top: 5px;
            position: relative;
            
            .normal-color{
                display: inline-block;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-size: cover;
                background-repeat: no-repeat;
            }

            &.active {
                border-color: #222;
            }
        }
    }
</style>