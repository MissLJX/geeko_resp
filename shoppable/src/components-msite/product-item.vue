<template>
    <div class="product-item">
        <div class="item-img">
            <img :src="image">
            <span>{{price}}</span>
        </div>
        <item-selector :variant="selectedVariant" @size-color-select="handleSizeColor"/>
    </div>
</template>

<script>
    import ItemSelector from './item-selector.vue'

    export default {
        name: 'ProductItem',
        props:['product'],
        components: {
            ItemSelector
        },
        computed:{
            image(){
                return `https://dgzfssf1la12s.cloudfront.net/medium/${this.product.pcMainImage}`;
            },
            price(){
                return this.product.price.unit + this.product.price.amount;
            },
            selectedVariant(){
                return this.product.variants.find(v => v.selected)
            }

        },
        methods: {
            handleSizeColor(variant){
                this.$emit('size-color-select',{groupId:this.product.groupId, productId:this.product.id, variant});
            }
        }
    }
</script>

<style lang="scss" scoped>
.product-item{
    float: left;
    width: 28%;
    .item-img{
        img{
            width: 100%;
            height: 150px;
        }
        span{
            display: block;
            font-size: 10px;
            color: #000;
            margin: 10px 0;
            font-weight: bold;
        }
    }
}
</style>
