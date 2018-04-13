<template>
    <div class="c-product-row">
        <div class="cells">
            <product-item :product="product0" @size-color-select="handleSizeColor" />
            <plus-icon/>
            <product-item :product="product1" @size-color-select="handleSizeColor"/>
            <plus-icon/>
            <product-item :product="product2" @size-color-select="handleSizeColor"/>
            <shop-now :msg="productVO" :variantsid="getVariantsId" v-on:click.native="handleAdd"/>
        </div>

        <hide-wrapper v-if="isShow" :groupId="selectedGroupId" :productId="selectedProductId"
                      :variantId="selectedVariantId" :size="selectedSize" @variant-select="confirmHandle" @handle-close="handleClose"/>
    </div>
</template>

<script>

    import ProductItem from './product-item.vue'
    import PlusIcon from './plus-icon.vue'
    import * as api from '../api/shoppable'

    import ShopNow from './shop-now.vue'
    import HideWrapper from './hide-wrapper.vue'

    export default {
        name: "product-row",
        props: ['productVO', 'isEditing'],
        components: {
            ProductItem,
            PlusIcon,
            HideWrapper,
            ShopNow
        },
        data: function () {
            return {
                relatedId: this.productVO.product.id,
                product0: null,
                product1: null,
                product2: null,
                selectedProductId: null,
                selectedVariantId: null,
                selectedGroupId: null,
                selectedSize: null,
                showSelector: false
            };
        },
        computed: {
            isShow() {
                return this.isEditing && this.showSelector;
            },
            getVariantsId(){
                return [this.product0.variants.find(v => v.selected).id,this.product1.variants.find(v => v.selected).id,this.product2.variants.find(v => v.selected).id];
            }
        },
        created() {
            if (!this.productVO || this.productVO.products.length < 2)
                throw "product vo is empty";

            this.product0 = this.productGeneator(this.productVO.product);
            this.product1 = this.productGeneator(this.productVO.products[0]);
            this.product2 = this.productGeneator(this.productVO.products[1]);
            this.product0.variants[0].selected = true;
            this.product1.variants[0].selected = true;
            this.product2.variants[0].selected = true;
        },
        methods: {
            handleSizeColor({groupId, productId, variant}) {
                this.selectedProductId = productId;
                this.selectedVariantId = variant.id;
                this.selectedGroupId = groupId;
                this.selectedSize = variant.size;
                this.showSelector = true;
                this.$emit('edit', this.relatedId)
            },
            handleClose(flag){
                this.showSelector=flag;
            },
            getRealPrice(p) {
                if (p.promotion && p.promotion.enabled) {
                    return p.promotion.promotionPrice;
                }
                return p.price;
            },
            productGeneator(p) {
                let realPrice = this.getRealPrice(p)
                return {
                    id: p.id,
                    pcMainImage: p.pcMainImage,
                    price: realPrice,
                    groupId: p.groupId,
                    variants: p.variants.map(v => ({
                        id: v.id,
                        size: v.size,
                        color: v.color,
                        selected: false
                    }))
                }
            },
            confirmHandle({selectProduct, selectedVariantId}) {
                if (this.product0.groupId === selectProduct.groupId) {
                    this.freshProduct(this.product0, selectProduct, selectedVariantId)
                }

                if (this.product1.groupId === selectProduct.groupId) {
                    this.freshProduct(this.product1, selectProduct, selectedVariantId)
                }

                if (this.product2.groupId === selectProduct.groupId) {
                    this.freshProduct(this.product2, selectProduct, selectedVariantId)
                }

            },
            freshProduct(p, selectProduct, selectedVariantId){
                p.id = selectProduct.id;
                p.pcMainImage = selectProduct.pcMainImage
                p.variants = selectProduct.variants.map(v => ({
                    id: v.id,
                    size: v.size,
                    color: v.color,
                    selected: selectedVariantId === v.id
                }))
            },

            handleAdd(){
                api.addtocart(this.getVariantsId.join(","))
            }
        },
    }
</script>

<style scoped>

    .c-product-row {
        position: relative;
        margin-top: 40px;
        border-bottom: 1px solid #e3e3e3;
    }

    .c-product-row .cells::after {
        content: '';
        display: block;
        clear: both;
    }
</style>