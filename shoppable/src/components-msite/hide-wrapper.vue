<template>
    <div class="c-variant-selecor">
        <div class="c-close"><i class="iconfont" @click="handleClose">&#xe69a;</i></div>
        <div v-show="isloading" class="c-loading">
            <span class="x-loading">
              <span></span>
              <span></span>
              <span></span>
            </span>
        </div>
        <div v-show="isGetInfo">
            <color-list :products="products" @color-select="handleColor"/>
            <size-list v-if="hasSize" :variants="variants" @size-select="handleSize"/>
            <div class="confirm-btn" @click="handleConfirm">Confirm</div>
        </div>
    </div>
</template>

<script>
    import * as api from '../api/shoppable'
    import ColorList from './color-list.vue'
    import SizeList from './size-list.vue'
    export default {
        name: "HideWrapper",
        components:{
            SizeList,
            ColorList,
        },
        data(){
            return{
                products: [],
                variants: [],
                selectedProductId: this.productId,
                selectedVariantId: this.variantId,
                selectedSize: this.size,
                isloading:false,
                isGetInfo:false,
            }
        },
        computed: {
            hasSize:function(){
                return this.variants.length > 1 || (this.variants.length === 1 && this.variants[0].size)
            }
        },
        methods: {
            initGroupProducts(){
                if(!this.isloading){
                    this.isloading = true
                    api.getgroupproducts(this.groupId).then((pds) => {
                        this.products = pds.map(p => this.productGenerator(p));
                        this.variants = this.products.find(p => p.selected).variants.map(v => this.variantGenerator(v));
                        this.isloading = false;
                        this.isGetInfo = true;
                    })
                }
            },


            refreshProducts(spid, s){
                this.products.forEach(pd => {
                     pd.selected = pd.id === spid
                })

                let vs = this.products.find(pd => pd.id === spid).variants

                let hasSelected = false;
                for(let i = 0, len = vs.length; i < len; i++){
                    vs[i].selected = vs[i].size === s;
                    if(vs[i].size === s){
                        this.selectedVariantId = vs[i].id;
                        hasSelected = true;
                    }
                }

                if(!hasSelected){
                    this.selectedVariantId = vs[0].id;
                    vs[0].selected = true;
                }


                this.variants = vs;
            },

            freshVariants(vid){
                this.variants.forEach(v => {
                    v.selected = v.id === vid
                })
            },

            productGenerator(product){
                let __this = this;
                return {
                    id: product.id,
                    selected: product.id === __this.productId,
                    groupId: product.groupId,
                    pcMainImage: product.pcMainImage,
                    variants: product.variants.map(v => {
                        return {
                            id: v.id,
                            size: v.size,
                            color: v.color,
                            selected:v.id=== __this.variantId,
                        }
                    })
                }
            },

            variantGenerator(variant){
                let __this = this;
                return {
                    id: variant.id,
                    size: variant.size,
                    selected: variant.selected
                }

            },

            handleColor(productId){
                this.selectedProductId = productId
                this.refreshProducts(productId, this.selectedSize);
            },

            handleSize(v){
                this.selectedVariantId = v.id
                this.selectedSize = v.size
                this.freshVariants(v.id)
            },

            handleConfirm(event){
                let _product = this.products.find(p => p.id === this.selectedProductId)
                this.$emit('variant-select', {selectProduct: _product, selectedVariantId: this.selectedVariantId})
                this.$emit("handle-close",false)
            },

            handleClose(){
                this.$emit("handle-close",false)
            }
        },
        props:["groupId","productId","variantId","size"],
        watch:{
            groupId: function(){
                this.initGroupProducts()
            }
        },
        created(){
            this.initGroupProducts()
        }
    }
</script>

<style lang="scss" scoped>
    @font-face {
        font-family: 'iconfont';  /* project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_w5h6r2li72v5cdi.eot');
        src: url('//at.alicdn.com/t/font_384296_w5h6r2li72v5cdi.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_384296_w5h6r2li72v5cdi.woff') format('woff'),
        url('//at.alicdn.com/t/font_384296_w5h6r2li72v5cdi.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_384296_w5h6r2li72v5cdi.svg#iconfont') format('svg');
    }
    .iconfont{
        font-family:"iconfont" !important;
        font-size:16px;
        font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }
    .c-variant-selecor{
        position: absolute;
        background-color: #fff;
        border: 1px solid #e3e3e3;
        cursor: pointer;
        width: 94%;
        top: 183px;
        left: 0;
        z-index: 2;
        .c-close{
            width: 100%;
            height: 18px;
            line-height: 18px;
            background-color: #e3e3e3;
            i{
                float: right;
                font-size: 16px;

                margin-right: 10px;
                color: white;
                cursor: pointer;
            }
        }
        .confirm-btn{
            font-size: 14px;
            width: 106px;
            height: 32px;
            margin: 0 auto;
            margin-bottom: 15px;
            line-height: 32px;
            cursor: pointer;
            text-align: center;
            background-color: #f5b2a2;
            color: white;

        }
        .c-loading{
            text-align: center;
            .x-loading {
                display: inline-block;
                & > span {
                    display: inline-block;
                    background-color: #909393;
                    width: 5px;
                    margin-left: 2px;
                    &:nth-child(1) {
                        height: 8px;
                        margin-left: 0;
                        animation-delay: 0s;
                    }
                    &:nth-child(2) {
                        height: 10px;
                        animation-delay: 0.25s;
                    }
                    &:nth-child(3) {
                        height: 12px;
                        animation-delay: 0.5s;
                    }

                    animation-name: x-loading-move;
                    animation-duration: 0.5s;
                    animation-iteration-count: infinite;
                }
            }
        }
        @keyframes x-loading-move {
            0% {
                background-color: #909393;
            }
            50% {
                background-color: #000;
            }
            100% {
                background-color: #909393;
            }
        }
    }
</style>