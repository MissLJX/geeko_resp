<template>
    <div class="product-color">
        <div class="color-container">
            <div class="_color">{{$t('label.color')}}</div>
            <div class="_select">{{$t('label.you_selected')}} {{variantProduct.color}}</div>
        </div>

        <div class="color-swiper">
            <!-- <product-swiper 
                v-bind="$attrs" 
                v-on='$listeners'
                :type="2" 
                :productId="productId"
            ></product-swiper> -->
            <product-color-item
                v-bind="$attrs" 
                v-on='$listeners'
                :product-id="productId"
            />
        </div>
        
    </div>
</template>

<script>
    import ProductColorItem from "./product-color-item.vue"

    export default {
        name:"ProductColor",
        components:{
            "product-color-item":ProductColorItem
        },
        props:{
            variantProduct:{
                type:Object,
                required:true
            },
            productId:{
                type:String,
                required:true
            }
        }
    }
</script>

<style scoped lang="scss">
    .product-color{
        margin-top: 15px;
        .color-container{
            display: flex;
            align-items: center;
            justify-content: space-between;

            ._color{
                font-family: SlatePro-Medium;
                font-size: 12px;
                color: #222222;
            }

            ._select{
                text-transform: capitalize;
                font-size: 12px;
            }
        }

        .color-swiper{
            // margin-top: 8px;
        }
    }
</style>