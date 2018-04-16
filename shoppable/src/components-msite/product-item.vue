<template>
    <div class="product-item">
        <a class="item-img" :href="producturl">
            <img :src="image">
            <span>{{price}}</span>
        </a>
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
            },
            producturl(){
                let name = this.product.name.replace(/\s/g,'_');
                return `/product/${name}/${this.product.id}.html`
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
        display: block;
        text-decoration: none;
        img{
            width: 100%;
            height: 116px;
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
