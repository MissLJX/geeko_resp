<template>
    <div
        class="product"
        :product-id="sensorProductId"
        :data-product-position="sensorProductPosition"
        :data-title="sensorResourceTitle"
        :data-position="sensorResourcePosition"
        :data-type="sensorResourceType"
        :data-content="sensorResourceContent"
        :data-price="sensorProductPrice"
        ref="productRef">
        <div class="_image">
            <a :href="getProUrl(product)" @click="toDetailPage($event)">
                <img :src="imageUrl(product.pcMainImage)" alt="MainIMage">
            </a>
        </div>
        <div class="p-info-price">
            <span class="f-red">{{price(product)}}</span>
            <del class="f-gray">{{delPrice(product)}}</del>
        </div>
    </div>
</template>

<script>
    import * as utils from "../../utils/geekoutil.js"

    export default {
        name:"Product",
        props:{
            product:{
                type:Object
            },
            sensors:{
                type: Object,
                default: {}
            },
            index:{
                type: Number,
                default: 0
            }
        },
        computed:{
            sensorProductId(){
                return this.product?.id || ''
            },
            sensorProductPosition(){
                return this.index + 1
            },
            sensorResourceTitle(){
                return this.sensors?.resourcepage_title
            },
            sensorResourceType(){
                return this.sensors?.resource_type
            },
            sensorResourceContent(){
                return this.sensors?.resource_content
            },
            sensorResourcePosition(){
                return this.sensors?.resource_position
            },
            sensorProductPrice(){
                return this.product?.usdPrice?.amount || 0
            },
        },
        methods:{
            getProUrl(product){
                return (window.ctx || '') + '/' + utils.producturl(product)
            },
            imageUrl(imgurl){
                return utils.imageutil.getMedium(imgurl)
            },
            price(product){
                if (product.promotion && product.promotion.enabled) {
                    return utils.unitPrice(product.promotion.promotionPrice)
                }
                return utils.unitPrice(product.price)
            },
            delPrice(product){
                if (product.msrp && product.msrp.amount > 0)
                    return utils.unitPrice(product.msrp)
                if (product.promotion && product.promotion.enabled)
                    return utils.unitPrice(product.price)
                return ''
            },
            toDetailPage(e){
                e.preventDefault();
                let sensorsObj = {
                        ...this.sensors,
                        price: this.product?.usdPrice?.amount || '',
                        product_id: this.product?.id,
                        product_position: this.index + 1
                    }
                let url = utils.getSensorsUrl(
                    this.getProUrl(this.product),
                    sensorsObj
                )

                if(window.GeekoSensors){
                    window.GeekoSensors.Track('ProductListClick', sensorsObj)
                }
                window.location.href = url
                return
            }
        },
        mounted(){
            let value = this.$refs.productRef;
            if (window.productListObserver && Object.keys(this.sensors)?.length > 0) {
                window.productListObserver.observe(value)
            }
        },
    }
</script>

<style scoped lang="scss">
    .product{
        ._image{
            a{
                position: relative;
                overflow: hidden;
                display: block;
                background-color: #f1f1f1;
                img{
                    display: block;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                }

                &::after{
                    content: '';
                    display: block;
                    margin-top: 125%;
                }
            }
        }

        .p-info-price{
            margin-top: 5px;
            .f-red{
                font-family: 'SlatePro-Medium';
                font-size: 14px;
                color: #000000;
            }

            .f-gray{
                font-size: 12px;
                color: #999999;
            }
        }
    }
</style>