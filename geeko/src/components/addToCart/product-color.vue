<template>
    <div class="product-color">
        <div class="color-container">
            <div class="_color">Color</div>
            <div class="_select">You selected {{variantProduct.color}}</div>
        </div>

        <div class="color-swiper">
            <product-swiper 
                v-bind="$attrs" 
                v-on='$listeners'
                :type="2" 
                :productId="productId"
            ></product-swiper>
        </div>
        
    </div>
</template>

<script>
    import ProductSwiper from "./product-swiper.vue"

    export default {
        name:"ProductColor",
        components:{
            "product-swiper":ProductSwiper
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
            margin-top: 8px;
        }
    }
</style>